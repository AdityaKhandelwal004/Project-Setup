
export interface Question {
  id: string;
  title: string;
  subtitle: string;
  type: 'single' | 'multiple';
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
}

export const questions: Question[] = [
  {
    id: 'motivation',
    title: 'What brings you to your financial future?',
    subtitle: "Let's understand what sparked this amazing decision!",
    type: 'single',
    options: [
      {
        value: 'more_from_money',
        label: 'I want to get more from my money',
        description: 'Turn every dollar into multiple dollars',
      },
      {
        value: 'financial_security',
        label: 'I want to build my financial security',
        description: "Sleep better knowing you're covered",
      },
      {
        value: 'knowledge_confidence',
        label: 'I want to improve my financial knowledge and confidence',
        description: "Become the financial guru you've always wanted to be",
      },
    ],
  },
  {
    id: 'current_state',
    title: 'Where are you on your money journey?',
    subtitle: "No judgment here - we're all learning! Every expert was once a beginner",
    type: 'single',
    options: [
      {
        value: 'optimizing',
        label: "I'm already managing well, let's optimize!",
        description: 'Ready to level up from good to great',
      },
      {
        value: 'starting_fresh',
        label: "I'm starting fresh with my finances",
        description: 'Perfect time to build strong foundations',
      },
      {
        value: 'struggling',
        label: "I'm struggling to keep up",
        description: "Let's turn this around together",
      },
      {
        value: 'inconsistent',
        label: "I'm inconsistent with my money habits",
        description: 'Time to create sustainable systems',
      },
    ],
  },
  {
    id: 'priorities',
    title: 'What are your top financial priorities?',
    subtitle: 'Select all that resonate with you - your goals matter!',
    type: 'multiple',
    options: [
      {
        value: 'emergency_fund',
        label: 'Building an emergency fund',
        description: 'Your financial safety net',
      },
      {
        value: 'debt_payoff',
        label: 'Paying off debt',
        description: 'Freedom from financial burden',
      },
      {
        value: 'saving_goals',
        label: 'Saving for specific goals',
        description: 'House, car, vacation, or other dreams',
      },
      {
        value: 'investment_growth',
        label: 'Growing wealth through investments',
        description: 'Making your money work harder',
      },
      {
        value: 'retirement_planning',
        label: 'Planning for retirement',
        description: 'Securing your future self',
      },
      {
        value: 'budgeting_control',
        label: 'Getting better control of my budget',
        description: 'Know where every dollar goes',
      },
    ],
  },
  {
    id: 'biggest_challenge',
    title: "What's your biggest money challenge right now?",
    subtitle: "Let's tackle what's keeping you up at night",
    type: 'single',
    options: [
      {
        value: 'not_enough_income',
        label: 'Not enough income',
        description: 'Feeling stretched thin every month',
      },
      {
        value: 'overspending',
        label: 'Spending more than I should',
        description: 'Money seems to disappear too quickly',
      },
      {
        value: 'no_savings_plan',
        label: 'No clear savings plan',
        description: 'Want to save but not sure how',
      },
      {
        value: 'debt_overwhelming',
        label: 'Debt feels overwhelming',
        description: 'Multiple payments and high interest',
      },
      {
        value: 'investment_confusion',
        label: 'Confused about investing',
        description: 'Want to invest but feel lost',
      },
      {
        value: 'lack_of_knowledge',
        label: 'Lack of financial knowledge',
        description: 'Need to learn the basics',
      },
    ],
  },
  {
    id: 'time_commitment',
    title: 'How much time can you realistically dedicate to improving your finances?',
    subtitle: 'Be honest - consistency beats perfection every time!',
    type: 'single',
    options: [
      {
        value: '15_minutes_daily',
        label: '15 minutes daily',
        description: 'Quick daily check-ins',
      },
      {
        value: '30_minutes_daily',
        label: '30 minutes daily',
        description: 'Solid daily foundation',
      },
      {
        value: '1_hour_weekly',
        label: '1 hour weekly',
        description: 'Weekly financial review',
      },
      {
        value: '2_hours_weekly',
        label: '2+ hours weekly',
        description: 'Deep dive sessions',
      },
      {
        value: 'varies',
        label: 'It varies week to week',
        description: 'Flexible approach works best',
      },
    ],
  },
  {
    id: 'learning_style',
    title: 'How do you prefer to learn about money?',
    subtitle: 'Everyone learns differently - what works best for you?',
    type: 'multiple',
    options: [
      {
        value: 'step_by_step_guides',
        label: 'Step-by-step guides',
        description: 'Clear, actionable instructions',
      },
      {
        value: 'video_tutorials',
        label: 'Video tutorials',
        description: 'Visual learning with examples',
      },
      {
        value: 'interactive_tools',
        label: 'Interactive tools and calculators',
        description: 'Hands-on learning experience',
      },
      {
        value: 'real_examples',
        label: 'Real-life examples and case studies',
        description: 'Learn from others experiences',
      },
      {
        value: 'quick_tips',
        label: 'Quick tips and bite-sized content',
        description: 'Easy to digest information',
      },
      {
        value: 'community_support',
        label: 'Community support and discussions',
        description: 'Learn with others on the journey',
      },
    ],
  },
  {
    id: 'success_definition',
    title: 'What would financial success look like for you?',
    subtitle: 'Dream big - your vision guides your journey!',
    type: 'multiple',
    options: [
      {
        value: 'stress_free_money',
        label: 'Never stressing about money',
        description: 'Peace of mind with finances',
      },
      {
        value: 'financial_independence',
        label: 'Being financially independent',
        description: 'Not relying on others financially',
      },
      {
        value: 'early_retirement',
        label: 'Retiring early',
        description: 'Freedom to choose how to spend time',
      },
      {
        value: 'help_family',
        label: 'Being able to help family and friends',
        description: 'Generosity without sacrifice',
      },
      {
        value: 'pursue_passions',
        label: 'Pursuing passions without money worries',
        description: 'Follow dreams without financial constraints',
      },
      {
        value: 'leave_legacy',
        label: 'Leaving a legacy for the next generation',
        description: 'Building generational wealth',
      },
    ],
  },
];
