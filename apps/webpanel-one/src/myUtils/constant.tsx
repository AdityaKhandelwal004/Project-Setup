import type { Option } from '@mono/models';

export const TeamStatusOptions: Option[] = [
  { id: 'ASSESSMENT_ENDED', label: 'Assessment Ended' },
  { id: 'COMPLETED', label: 'Completed' },
  { id: 'SCHEDULED', label: 'Scheduled' },
  { id: 'NOT_STARTED', label: 'Not Started' },
  { id: 'IN_PROGRESS', label: 'In Progress' },
  { id: 'NOT_SENT', label: 'Not Sent' },
  { id: 'REPORT_SENT', label: 'Report Sent' },
];

export const EmployeeStatusOptions: Option[] = [
  { id: 'COMPLETED', label: 'Completed' },
  { id: 'NOT_STARTED', label: 'Not Started' },
  { id: 'IN_PROGRESS', label: 'In Progress' },
  { id: 'QUEUED', label: 'In Queue' },
  { id: 'NOT_SENT', label: 'Not Sent' },
];

export const LevelOptions: Option[] = [
  { id: 'COMPANY', label: 'Company' },
  { id: 'TEAM', label: 'Team' },
];

export const TEAM_ASSESSMENT_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  REPORT_SENT: 'REPORT_SENT',
};

export const EMPLOYEE_ASSESSMENT_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  NOT_SENT: 'NOT_SENT',
  QUEUED: 'QUEUED',
};

export const countryOptions = [
  {
    id: 'AUSTRALIA',
    label: 'Australia',
  },
  {
    id: 'USA',
    label: 'U.S.A',
  },
];

export const entryTypeOptions = [
  {
    id: 'MANUAL',
    label: 'Manual',
  },
  {
    id: 'SELECT_EXISTING',
    label: 'Select from existing',
  },
];

export const stakeholderOptions = [
  {
    id: 'TEAM',
    label: 'Add as Team Stakeholder',
  },
  {
    id: 'COMPANY',
    label: 'Add as Company Stakeholder',
  },
];

export const incomeSourceOptions: Option[] = [
  { id: 'employment', label: 'Employment' },
  { id: 'self-employed', label: 'Self-employed' },
  { id: 'business', label: 'Business' },
  { id: 'investment', label: 'Investment' },
  { id: 'pension', label: 'Pension' },
  { id: 'other', label: 'Other' },
];

export const payFrequencyOptions: Option[] = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'fortnightly', label: 'Fortnightly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'annually', label: 'Annually' },
];

export const funEntertainmentCategoryOptions: Option[] = [
  { id: 'dining', label: 'Dining Out' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'sports', label: 'Sports & Fitness' },
  { id: 'travel', label: 'Travel' },
  { id: 'shopping', label: 'Shopping' },
];



export const MAX_FILE_SIZE = 4;