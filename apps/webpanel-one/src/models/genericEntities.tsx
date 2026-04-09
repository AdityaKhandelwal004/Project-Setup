import { Id } from './baseEntities';
import {
  Status, 
} from './modules';

// export interface UserActionConfig {
//   type: UserActionType;
//   id: Id;
//   isUpdate?: boolean;
// }

export interface Company {
  id: string;
  customerName: string;
  businessName: string;
  noOfLocations: number;
  noOfCompanyAdmins: number;
  status: Status;
  createdOn: Date;
}

export interface Locations {
  villageId: string;
  villageName: string;
  noOfVillageAdmins: number;
  noOfVillageManagers: number;
  noOfActiveResidents: number;
  status: Status;
}

export interface CompanyInformation extends Company {
  address: string;
  registeredAddress: string;
  billingEmail: string;
  abn: string;
  dns: string;
  logo: string;
  website: string;
}

export interface LocationInformation {
  villageId: string;
  villageName: string;
  status: Status;
  address: string;
  primaryColor: string;
  secondaryColor: string;
  buttonColor: string;
  buttonTextColor: string;
}

export interface LoaderState {
  visibility?: boolean;
}

export interface LocationType {
  state?: { id: string; villageId: string };
}

export interface CompanyAdmins {
  id: Id;
  name: string;
  email: string;
  status: Status;
  createdOn: Date;
}

// export interface VillageAdmins {
//   id: Id;
//   name: string;
//   email: string;
//   status: Status;
//   userType: UserRoles;
//   createdOn: Date;
//   assignedModules: Array<any>;
//   isAllModulesAssigned: boolean;
// }

// export interface UserRolesType {
//   name: UserRoles;
//   id: Id;
// }

// export interface UserModules {
//   modules: Array<{
//     name: Right;
//     id: Id;
//   }>;
// }

export interface CustomerIdType{
  customerId?: string;
  locationId?: string;
}
export interface StepFormState{
  currentPage: number;
  forms: { [key: string]: any };
  validationErrors: {[key: string]: any };
}