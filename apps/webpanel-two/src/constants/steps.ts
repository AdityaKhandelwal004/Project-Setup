import { StepData } from '../components/HorizontalStepper';

export interface VerticalStepData {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'current' | 'future';
}

// Horizontal Stepper Steps (for legacy components)
export const OPTIMISE_STEPS: StepData[] = [
  { id: 'budget', name: 'Budget', status: 'completed' },
  { id: 'safety-net', name: 'Safety Net', status: 'current' },
  { id: 'debt', name: 'Debt', status: 'future' },
  { id: 'save', name: 'Save', status: 'future' },
];

export const MAXIMISE_STEPS: StepData[] = [
  { id: 'superannuation', name: 'Superannuation', status: 'future' },
  { id: 'invest', name: 'Invest', status: 'future' },
];

export const PROTECT_STEPS: StepData[] = [
  { id: 'insurance', name: 'Insurance', status: 'future' },
  { id: 'asset-protection', name: 'Asset Protection', status: 'future' },
  { id: 'estate-planning', name: 'Estate Planning', status: 'future' },
];

// Vertical Stepper Steps (for sidebar layout) - 9 Simple Steps
export const OPTIMISE_VERTICAL_STEPS: VerticalStepData[] = [
  {
    id: 'budget',
    name: 'Budget',
    description: 'Allocate your income before you spend it',
    status: 'completed',
  },
  {
    id: 'safety-net',
    name: 'Safety Net',
    description: 'Create your Safety Net',
    status: 'current',
  },
  {
    id: 'debt',
    name: 'Debt',
    description: 'Deal with your Debt',
    status: 'future',
  },
  {
    id: 'save',
    name: 'Save',
    description: 'Set your Financial Savings Goals',
    status: 'future',
  },
];

export const MAXIMISE_VERTICAL_STEPS: VerticalStepData[] = [
  {
    id: 'invest',
    name: 'Invest',
    description: 'Small amounts over time make a big difference',
    status: 'future',
  },
  {
    id: 'superannuation',
    name: 'Superannuation',
    description: 'Super? Enough to retire on?',
    status: 'future',
  },
];

export const PROTECT_VERTICAL_STEPS: VerticalStepData[] = [
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Do I have Insurance I need?',
    status: 'future',
  },
  {
    id: 'asset-protection',
    name: 'Asset Protection',
    description: 'Are my assets protected?',
    status: 'future',
  },
  {
    id: 'estate-planning',
    name: 'Estate Planning',
    description: "Who's in charge when I can't be?",
    status: 'future',
  },
];

// Helper function to get all steps in order (1-9)
export const ALL_STEPS_ORDER = [
  ...OPTIMISE_VERTICAL_STEPS,
  ...MAXIMISE_VERTICAL_STEPS,
  ...PROTECT_VERTICAL_STEPS,
];

// Helper function to get step number by id
export const getStepNumber = (stepId: string): number => {
  const stepIndex = ALL_STEPS_ORDER.findIndex(step => step.id === stepId);
  return stepIndex !== -1 ? stepIndex + 1 : 0;
};

// Helper function to get step by number
export const getStepByNumber = (stepNumber: number): VerticalStepData | undefined => {
  return ALL_STEPS_ORDER[stepNumber - 1];
};
