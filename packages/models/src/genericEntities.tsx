export interface LoaderState {
  visibility?: boolean;
}

export interface ShowAnimation {
  visibility?:boolean;
}
export interface StepFormState{
  currentPage: number;
  forms: { [key: string]: any };
  validationErrors: {[key: string]: any };
}

export interface FormValue {
  value?: any;
  error?: string;
}

export interface TeamEntity   {
  "id": number,
  "company": {
      "id": number,
      "name": string
  },
  "team": {
      "id": number,
      "name": string
  },
  "startDate": string,
  "endDate": string,
  "status": string,
  "location" : string,
  "isScheduled":boolean,

  "employeeAssessments" : {
    "total":number,
    "totalSent":number,
    "totalCompleted":number
  }
}

export interface EmployeeEntity     {
  "id": number,
  "name": string,
  "email": string,
  "status": string,
  "sentOn": string,
  "totalAnswered": number,
  "progress": string,
  "dateOfCompletion": string,
  "reminderStatus": any,
  "totalQuestions": number
  "firstName"?: string,
  "lastName"?: string
  "role"?: string
}

export interface StakeholderEntity {
  "id": number,
  "employee": {
      "id": number,
      "firstName": string,
      "lastName": string,
      "email": string
  },
  "company": {
      "id": number,
      "name": string
  },
  "team" : {
      "id": number,
      "name": string
  }
  "status": string,
  "stakeholderLevel"?: any
}

export interface OverviewEntity {
  "id": number,
  "team": {
      "id": number,
      "name": string
  },
  company: {
      "id": number,
      "name": string
  },
  "totalEmployees": number,
  "startDate": string,
  "endDate": string,
  "status": string,
  "teamCreatedOn": string
}

export interface CompanyOptions {
  metadata: {
    order: string;
    direction: string;
    page: number;
    limit: number;
    total: number;
    filters: object;
    allowedFilters: string[];
  };
  records: CompanyEntity[]; // An array of CompanyEntity objects
}

export interface CompanyEntity {
  id: string;
  name: string;
}

export interface Params {
  id: string; 
}

export interface OptionsMenuProps {
  row: any;
  applyFilters: () => void;
  teamId?: string;
  teamAssessmentId?: string;
  teamAssessment?:any;
  data?:any
  selectedEmployeeIds?: any
  selectedStakeholderIds?: any
  isBulkOptions?: any
  setAnchorEl?:any
  anchorEl?: any
  menuAnchorEl?: any
  setMenuOpen?: any
  assessmentStatus?: string
  overviewOptions?: any
}

export interface MembersProps {
  overviewOptions: any
  refreshEntity?: () => void
}

export interface MatrixProps{
  overviewOptions: object
  status:string
}

  export enum ToastType {
  SUCCESS = "success",
  ERROR= "error",
  INFO = "info",
  WARNING = "warning",
}