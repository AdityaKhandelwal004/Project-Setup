export interface ProfileState {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  dialCode: string;
  role: {
    id: string;
  };
  profilePhoto: string;
}

export enum Status {
  active = 'ACTIVE',
  inactive = 'INACTIVE',
}
