-- =========================================================
-- MATERIALIZED VIEW: Add investment allocation tracking
-- =========================================================

-- Drop the existing materialized view and recreate with investment allocation tracking
DROP MATERIALIZED VIEW IF EXISTS user_fund_allocation_summary CASCADE;
DROP FUNCTION IF EXISTS refresh_user_fund_allocation_summary() CASCADE;

-- =========================================================
-- MATERIALIZED VIEW CREATION
-- =========================================================
CREATE MATERIALIZED VIEW user_fund_allocation_summary AS
SELECT 
    u.id as user_id,
    
    -- User Income (renamed from total_income)
    COALESCE(income_data.total_income, 0) as user_income,
    
    -- User Savings (renamed from total_savings)
    COALESCE(savings_data.total_savings, 0) as user_savings,
    
    -- Budget Allocations
    COALESCE(budget_data.total_expense_allocation, 0) as total_expense_allocation,
    COALESCE(budget_data.total_savings_allocation, 0) as total_savings_allocation,
    
    -- Specific Category Allocations (this reflects remaining after deductions)
    COALESCE(savings_category.allocation_amount, 0) as savings_category_allocation,
    COALESCE(investment_category.allocation_amount, 0) as investment_category_allocation,
    
    -- Used Savings Allocation (from module ledgers with source_type='INCOME')
    COALESCE(used_savings_allocation.used_amount, 0) as used_savings_allocation,
    
    -- Used Investment Allocation (from module ledgers with source_type='INCOME')
    COALESCE(used_investment_allocation.used_amount, 0) as used_investment_allocation

FROM users u

-- Total Income per user
LEFT JOIN (
    SELECT 
        user_id,
        SUM(amount) as total_income
    FROM user_income 
    WHERE status = 'ACTIVE'
    GROUP BY user_id
) income_data ON u.id = income_data.user_id

-- Total Savings per user (without deductions)
LEFT JOIN (
    SELECT 
        us.user_id,
        us.amount as total_savings
    FROM user_saving us
    WHERE us.status = 'ACTIVE'
) savings_data ON u.id = savings_data.user_id

-- Budget Allocations per user
LEFT JOIN (
    SELECT 
        ubp.user_id,
        SUM(CASE WHEN ubpa.allocation_type = 'EXPENSE' THEN COALESCE(ubpa.allocation_amount, 0) ELSE 0 END) as total_expense_allocation,
        SUM(CASE WHEN ubpa.allocation_type = 'SAVING' THEN COALESCE(ubpa.allocation_amount, 0) ELSE 0 END) as total_savings_allocation
    FROM user_budget_plan ubp
    JOIN user_budget_plan_allocation ubpa ON ubp.id = ubpa.user_budget_id
    WHERE ubp.status = 'ACTIVE' AND ubpa.status = 'ACTIVE'
    GROUP BY ubp.user_id
) budget_data ON u.id = budget_data.user_id

-- Savings Category Allocation
LEFT JOIN (
    SELECT 
        ubp.user_id,
        ubpa.allocation_amount
    FROM user_budget_plan ubp
    JOIN user_budget_plan_allocation ubpa ON ubp.id = ubpa.user_budget_id
    JOIN system_budget_categories sbc ON ubpa.system_budget_category_id = sbc.id
    WHERE ubp.status = 'ACTIVE' 
    AND ubpa.status = 'ACTIVE' 
    AND ubpa.allocation_type = 'SAVING'
    AND sbc.code = 'SAVINGS'
) savings_category ON u.id = savings_category.user_id

-- Investment Category Allocation
LEFT JOIN (
    SELECT 
        ubp.user_id,
        ubpa.allocation_amount
    FROM user_budget_plan ubp
    JOIN user_budget_plan_allocation ubpa ON ubp.id = ubpa.user_budget_id
    JOIN system_budget_categories sbc ON ubpa.system_budget_category_id = sbc.id
    WHERE ubp.status = 'ACTIVE' 
    AND ubpa.status = 'ACTIVE' 
    AND ubpa.allocation_type = 'SAVING'
    AND sbc.code = 'INVESTMENT'
) investment_category ON u.id = investment_category.user_id

-- Used Savings Allocation (from module ledgers with source_type='INCOME')
-- Used Savings Allocation (from module ledgers with source_type='INCOME')
LEFT JOIN (
    SELECT 
        user_id,
        SUM(amount) as used_amount
    FROM (
        -- Safety Net allocations from income (only if table exists)
        SELECT usng.user_id, usnl.amount 
        FROM user_safety_net_ledger usnl
        JOIN user_safety_net_goals usng ON usnl.user_safety_net_goal_id = usng.id
        WHERE usnl.transaction_type = 'CONTRIBUTION' AND usnl.source_type = 'INCOME'
        AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_safety_net_ledger')
        UNION ALL
        -- Savings Goal allocations from income (only if table exists)
        SELECT usg.user_id, usgl.amount 
        FROM user_savings_goal_ledger usgl
        JOIN user_savings_goals usg ON usgl.user_savings_goal_id = usg.id
        WHERE usgl.transaction_type = 'CONTRIBUTION' AND usgl.source_type = 'INCOME'
        AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_savings_goal_ledger')
        UNION ALL    
        -- Debt Accelerator allocations from income (only if table exists)
        SELECT uda.user_id, uda.accelerator_allocated_amount 
        FROM user_debt_accelerator uda
        WHERE uda.accelerator_allocated_amount > 0
        AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_debt_accelerator')
    ) combined_savings_allocations
    GROUP BY user_id
) used_savings_allocation ON u.id = used_savings_allocation.user_id

-- Used Investment Allocation (from module ledgers with source_type='INCOME')
LEFT JOIN (
    SELECT 
        user_id,
        SUM(amount) as used_amount
    FROM (
        -- Investment allocations from income (only if table exists)
        SELECT ui.user_id, uil.amount 
        FROM user_investment_ledger uil
        JOIN user_investments ui ON uil.user_investment_id = ui.id
        WHERE uil.transaction_type = 'CONTRIBUTION' AND uil.source_type = 'INCOME'
        AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_investment_ledger')
    ) combined_investment_allocations
    GROUP BY user_id
) used_investment_allocation ON u.id = used_investment_allocation.user_id

WHERE u.status = 'ACTIVE';

CREATE UNIQUE INDEX idx_user_fund_allocation_summary_user_id 
ON user_fund_allocation_summary (user_id);

CREATE OR REPLACE FUNCTION refresh_user_fund_allocation_summary()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_fund_allocation_summary;
END;
$$ LANGUAGE plpgsql;

SELECT refresh_user_fund_allocation_summary();