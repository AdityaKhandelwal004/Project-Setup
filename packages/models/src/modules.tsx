export interface ProfileState {
  id: number;
  name: string;
  email: string;
  role: {
    id: string;
  };
  profilePhoto: string;
}

export enum Status {
  active = 'ACTIVE',
  inactive = 'INACTIVE',
}
