-- =========================================================
-- SYSTEM CHALLENGES & BADGES
-- =========================================================
-----------
-- System Challenge Templates
CREATE TABLE IF NOT EXISTS system_challenge_templates (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(70) UNIQUE NOT NULL,
  type VARCHAR(70) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  meta_data JSONB NOT NULL,
  status status_enum NOT NULL DEFAULT 'ACTIVE',
  reserve1 VARCHAR(1),
  reserve2 VARCHAR(1),
  reserve3 VARCHAR(1),
  reserve4 VARCHAR(1),
  created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  created_by BIGINT NOT NULL,
  updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_system_challenge_templates_modtime BEFORE
UPDATE ON system_challenge_templates 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- System Badges
CREATE TABLE IF NOT EXISTS system_badges (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(70) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon_url TEXT,
  status status_enum NOT NULL DEFAULT 'ACTIVE',
  reserve1 VARCHAR(1),
  reserve2 VARCHAR(1),
  reserve3 VARCHAR(1),
  reserve4 VARCHAR(1),
  created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  created_by BIGINT NOT NULL,
  updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_system_badges_modtime BEFORE
UPDATE ON system_badges 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- System Challenges
CREATE TABLE IF NOT EXISTS system_challenges (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(70) UNIQUE NOT NULL,
  system_challenge_template_id BIGINT REFERENCES system_challenge_templates ON UPDATE CASCADE ON DELETE RESTRICT,
  awarded_badge_id BIGINT REFERENCES system_badges ON UPDATE CASCADE ON DELETE RESTRICT,
  presentation_meta_data JSONB NOT NULL,
  configuration_meta_data JSONB,
  day_number INT,
  status status_enum NOT NULL DEFAULT 'ACTIVE',
  reserve1 VARCHAR(1),
  reserve2 VARCHAR(1),
  reserve3 VARCHAR(1),
  reserve4 VARCHAR(1),
  created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  created_by BIGINT NOT NULL,
  updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_system_challenges_modtime BEFORE
UPDATE ON system_challenges 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- USER CHALLENGES & BADGES
-- =========================================================
-----------
-- User Challenge Templates
CREATE TABLE IF NOT EXISTS user_challenge_templates (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE RESTRICT,
  code VARCHAR(70) NOT NULL,
  type VARCHAR(70) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  meta_data JSONB NOT NULL,
  started_on TIMESTAMPTZ,
  completed_on TIMESTAMPTZ,
  status VARCHAR(40) NOT NULL,
  reserve1 VARCHAR(1),
  reserve2 VARCHAR(1),
  reserve3 VARCHAR(1),
  reserve4 VARCHAR(1),
  created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  created_by BIGINT NOT NULL,
  updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_challenge_templates_modtime BEFORE
UPDATE ON user_challenge_templates 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- User Challenges
CREATE TABLE IF NOT EXISTS user_challenges (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE RESTRICT,
  user_challenge_template_id BIGINT REFERENCES user_challenge_templates ON UPDATE CASCADE ON DELETE RESTRICT,
  awarded_badge_id BIGINT REFERENCES system_badges ON UPDATE CASCADE ON DELETE RESTRICT,
  code VARCHAR(70) NOT NULL,
  presentation_meta_data JSONB NOT NULL,
  configuration_meta_data JSONB,
  day_number INT,
  started_on TIMESTAMPTZ,
  completed_on TIMESTAMPTZ,
  saved_amount BIGINT,
  completion_note TEXT,
  status VARCHAR(40) NOT NULL,
  reserve1 VARCHAR(1),
  reserve2 VARCHAR(1),
  reserve3 VARCHAR(1),
  reserve4 VARCHAR(1),
  created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  created_by BIGINT NOT NULL,
  updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_challenges_modtime BEFORE
UPDATE ON user_challenges 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- User Badges
CREATE TABLE IF NOT EXISTS user_badges (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE RESTRICT,
  system_badge_id BIGINT NOT NULL REFERENCES system_badges ON UPDATE CASCADE ON DELETE RESTRICT,
  user_challenge_id BIGINT REFERENCES user_challenges ON UPDATE CASCADE ON DELETE RESTRICT,
  granted_on TIMESTAMPTZ NOT NULL,
  granted_reason TEXT,
  status VARCHAR(40) NOT NULL,
  reserve1 VARCHAR(1),
  reserve2 VARCHAR(1),
  reserve3 VARCHAR(1),
  reserve4 VARCHAR(1),
  created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  created_by BIGINT NOT NULL,
  updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_badges_modtime BEFORE
UPDATE ON user_badges 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- Permissions
-- =========================================================
INSERT INTO permissions (name, description, status)
VALUES 
  ('CHALLENGE_MANAGEMENT', 'Participate in and complete system challenges', 'ACTIVE'),
  ('BADGE_MANAGEMENT', 'Earn and view badges awarded through challenges or achievements', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
VALUES
  (
    (SELECT id FROM roles WHERE type = 'OBIE_USER'),
    (SELECT id FROM permissions WHERE name = 'CHALLENGE_MANAGEMENT')
  ),
  (
    (SELECT id FROM roles WHERE type = 'OBIE_USER'),
    (SELECT id FROM permissions WHERE name = 'BADGE_MANAGEMENT')
  )
ON CONFLICT DO NOTHING;

-- =========================================================
-- SEED DATA FOR system_badges
-- =========================================================
INSERT INTO system_badges (code, name, description, icon_url, status, created_by, updated_by)
VALUES
  ('BUDGET_NAILED', 'Budget Nailed', 'Awarded for successfully setting up your budget.', NULL, 'ACTIVE', 1, 1),
  ('SAFETY_NET_SORTED', 'Safety Net Sorted', 'Awarded for completing your safety net setup.', NULL, 'ACTIVE', 1, 1),
  ('DEBT_FREE_PLAN_SET', 'Debt Free Plan Set', 'Awarded for creating your debt-free plan.', NULL, 'ACTIVE', 1, 1),
  ('SAVINGS_GOAL_SET', 'Savings Goal Set', 'Awarded for setting a savings goal.', NULL, 'ACTIVE', 1, 1),
  ('SUPER_MAXIMISED', 'Super Maximised', 'Awarded for optimising your superannuation.', NULL, 'ACTIVE', 1, 1),
  ('AUTO_INVEST_SET', 'Auto Invest Set', 'Awarded for setting up automatic investments.', NULL, 'ACTIVE', 1, 1),
  ('INSURANCE_REVIEWED', 'Insurance Reviewed', 'Awarded for reviewing your insurance plans.', NULL, 'ACTIVE', 1, 1),
  ('WILL_INSTRUCTIONS_DONE', 'Will Instructions Done', 'Awarded for completing your will instructions.', NULL, 'ACTIVE', 1, 1),
  ('ASSET_MANAGED', 'Asset Managed', 'Awarded for organising and tracking your personal assets.', NULL, 'ACTIVE', 1, 1),
  ('MONEY_MASTERED', 'Money Mastered', 'Awarded for achieving all major financial milestones.', NULL, 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;

-- =========================================================
-- SEED DATA FOR SYSTEM CHALLENGES
-- =========================================================
INSERT INTO system_challenge_templates (code, type, name, description, meta_data, status, created_by, updated_by)
VALUES
(
  '28_DAY_CHALLENGE',
  'STREAK_CONTINUOUS',
  '28 Day Challenge',
  'Take the 28-day Obie Money Challenge! Each day, complete a small, practical task that helps you save more and spend smarter. Stay consistent and hit your 500 AUD savings goal by the end of the month.',
  jsonb_build_object(
    'duration_days', 28,
    'streak_type', 'continuous',
    'goal', 'Complete at least one activity per day for 28 consecutive days'
  ),
  'ACTIVE',
  1,
  1
)
ON CONFLICT (code) DO NOTHING;

INSERT INTO system_challenges (
  code,
  system_challenge_template_id,
  presentation_meta_data,
  configuration_meta_data,
  day_number,
  status,
  created_by,
  updated_by
)
VALUES
('28_DAY_CHALLENGE_DAY_1',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Set Your Goal',
    'description', 'Welcome to the 28-day money-saving challenge! 🎉 Your target: save 500 AUD by the end of the month. Start by setting up a separate savings account and adding 5 AUD to it today to kick things off.'
 ),
 jsonb_build_object('suggested_saving', 5, 'currency', 'AUD'), 1, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_2',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Track Your Spending',
    'description', 'Track all your spending today. Use an app or a simple notebook. No spending yet, just awareness. Add 3 AUD to your savings for taking the time to get real about your money! 📊'
 ),
 jsonb_build_object('suggested_saving', 3, 'currency', 'AUD'), 2, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_3',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Make Coffee at Home',
    'description', 'Skip your usual $7 coffee run and brew your favourite coffee at home. Put that 7 AUD into your savings today. ☕💰'
 ),
 jsonb_build_object('suggested_saving', 7, 'currency', 'AUD'), 3, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_4',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Cancel Unused Subscriptions',
    'description', 'Check for subscriptions you’re not using and cancel them. Save at least 15 AUD this month. Add 10 AUD to your savings today. 🧹'
 ),
 jsonb_build_object('suggested_saving', 10, 'currency', 'AUD'), 4, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_5',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Avoid Impulse Purchases',
    'description', 'Don’t buy anything today that you don’t need. Put the money you would’ve spent (10 AUD) into your savings. 👛'
 ),
 jsonb_build_object('suggested_saving', 10, 'currency', 'AUD'), 5, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_6',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Meal Prep for the Week',
    'description', 'Skip takeout and cook at home. Meal prepping today can save you at least 12 AUD by avoiding lunch runs. Add that 12 AUD to your savings. 🍴'
 ),
 jsonb_build_object('suggested_saving', 12, 'currency', 'AUD'), 6, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_7',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'No-Spend Day',
    'description', 'Today is a no-spend day! No purchases, no coffees, no snacks. Add 15 AUD to your savings. 💸'
 ),
 jsonb_build_object('suggested_saving', 15, 'currency', 'AUD'), 7, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_8',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Sell Unused Items',
    'description', 'Go through your closet or garage and sell an item you don’t need. Whether it’s clothes, books, or gadgets, make at least 20 AUD. Add that to your savings. 💵'
 ),
 jsonb_build_object('suggested_saving', 20, 'currency', 'AUD'), 8, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_9',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Skip the Takeaway',
    'description', 'Skip your usual takeaway lunch or dinner today. Save at least 15 AUD by cooking at home. Put that money into your savings! 🍔'
 ),
 jsonb_build_object('suggested_saving', 15, 'currency', 'AUD'), 9, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_10',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Switch to Store Brands',
    'description', 'Buy store-brand products instead of name brands today. Save 8 AUD by making this simple switch. Add that 8 AUD to your savings. 🏷️'
 ),
 jsonb_build_object('suggested_saving', 8, 'currency', 'AUD'), 10, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_11',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Try Public Transport',
    'description', 'Take public transport or walk instead of driving. Save on petrol and parking fees. Add 10 AUD to your savings today. 🚶‍♂️'
 ),
 jsonb_build_object('suggested_saving', 10, 'currency', 'AUD'), 11, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_12',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Review Your Budget',
    'description', 'Take a look at your budget today and adjust where necessary. By tightening things up, you can save an extra 15 AUD this month. Add that 15 AUD to your savings today. 💰'
 ),
 jsonb_build_object('suggested_saving', 15, 'currency', 'AUD'), 12, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_13',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'No Online Shopping',
    'description', 'No online shopping today! Save 20 AUD by resisting the urge to splurge. Add that 20 AUD into your savings. 🛑'
 ),
 jsonb_build_object('suggested_saving', 20, 'currency', 'AUD'), 13, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_14',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Find Discount Codes',
    'description', 'Search for discount codes for things you need. Whether it’s a store, groceries, or online shopping — find 10 AUD in savings and add that to your savings account today. 🏷️'
 ),
 jsonb_build_object('suggested_saving', 10, 'currency', 'AUD'), 14, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_15',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Cut Down on Alcohol',
    'description', 'Skip your usual drinks out today. Save 15 AUD by staying in. Add that 15 AUD to your savings today! 🍷'
 ),
 jsonb_build_object('suggested_saving', 15, 'currency', 'AUD'), 15, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_16',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Shop Your Pantry',
    'description', 'Before heading to the store, check what you already have in your pantry. Save 10 AUD by using what’s on hand instead of buying new. Add that 10 AUD to your savings. 🥘'
 ),
 jsonb_build_object('suggested_saving', 10, 'currency', 'AUD'), 16, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_17',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Swap Your Entertainment',
    'description', 'Instead of spending on entertainment, try free options like outdoor activities, YouTube, or a free event. Save 10 AUD by avoiding paid entertainment today. 🎬'
 ),
 jsonb_build_object('suggested_saving', 10, 'currency', 'AUD'), 17, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_18',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Find a Cheaper Phone Plan',
    'description', 'Review your phone plan and see if you can downgrade to something cheaper. Save at least 15 AUD today by switching. 📱'
 ),
 jsonb_build_object('suggested_saving', 15, 'currency', 'AUD'), 18, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_19',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Refinance a Loan or Credit Card',
    'description', 'Call your bank and ask about refinancing or lowering your interest rate. Even a small change can save you 20 AUD this month. 🏦'
 ),
 jsonb_build_object('suggested_saving', 20, 'currency', 'AUD'), 19, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_20',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Bring Your Own Lunch',
    'description', 'Instead of buying lunch, bring leftovers or a packed meal. Save 10 AUD by doing this today. 🍱'
 ),
 jsonb_build_object('suggested_saving', 10, 'currency', 'AUD'), 20, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_21',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Declutter and Sell More Stuff',
    'description', 'Find another item to sell! Whether it’s furniture, old electronics, or something else — aim to make 25 AUD today. 🏷️'
 ),
 jsonb_build_object('suggested_saving', 25, 'currency', 'AUD'), 21, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_22',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Cancel Unnecessary Insurance',
    'description', 'Take a look at your insurance policies today. Can you downgrade or cancel anything you don’t need? Save at least 20 AUD by making adjustments. 🛡️'
 ),
 jsonb_build_object('suggested_saving', 20, 'currency', 'AUD'), 22, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_23',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Do It Yourself',
    'description', 'Fix, clean, or handle something yourself today that you’d normally pay for. Whether it’s fixing a leaky tap or cleaning your car, save 15 AUD doing it yourself. 🛠️'
 ),
 jsonb_build_object('suggested_saving', 15, 'currency', 'AUD'), 23, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_24',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'No Expensive Snacks',
    'description', 'Avoid buying snacks or junk food today. Save 10 AUD by sticking to what’s already in your kitchen. 🍫'
 ),
 jsonb_build_object('suggested_saving', 10, 'currency', 'AUD'), 24, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_25',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Skip the Uber',
    'description', 'Take a walk, bike, or use public transport instead of Uber or a taxi today. Save 15 AUD on transport costs and add that to your savings. 🚗'
 ),
 jsonb_build_object('suggested_saving', 15, 'currency', 'AUD'), 25, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_26',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Review Your Energy Plan',
    'description', 'Switch to a cheaper energy plan today. Saving on your electricity or gas bills could save you 20 AUD a month. ⚡'
 ),
 jsonb_build_object('suggested_saving', 20, 'currency', 'AUD'), 26, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_27',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Make Your Own Gifts',
    'description', 'Instead of buying expensive gifts, make something thoughtful or give an experience. Save 15-20 AUD today by being creative. 🎁'
 ),
 jsonb_build_object('suggested_saving', 20, 'currency', 'AUD'), 27, 'ACTIVE', 1, 1),

('28_DAY_CHALLENGE_DAY_28',
 (SELECT id FROM system_challenge_templates WHERE code = '28_DAY_CHALLENGE'),
 jsonb_build_object(
    'title', 'Reflect & Celebrate',
    'description', 'You did it! 🎉 Check how much you saved over the last 28 days. Did you hit your 500 AUD goal? Celebrate your success and set new money goals for the next month! 💸'
 ),
 NULL, 28, 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;
