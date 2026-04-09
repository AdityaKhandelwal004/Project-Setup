import type { JSX } from 'react';

export type Status = 'ACTIVE' | 'INACTIVE';

export type BasicObject = Record<string, unknown>;

export type Id = string | number | undefined | null;

export interface MetaData<T> {
  order: keyof T | '';
  direction: 'asc' | 'desc';
  total: number;
  page: number;
  limit: number;
  filters: Record<string, string>;
  allowedFilters: Array<string>;
}

export interface PagedEntity<T> {
  metadata: MetaData<T>;
  records: T[];
  requestDate?: Date;
}

export interface PaginatedEntity {
  key: string;
  name: string;
  api: string;
}

export interface Option {
  id: number | string;
  label: string;
}

export const getDefaultMetaData = <T,>(): MetaData<T> => ({
  order: '',
  direction: 'asc',
  total: 0,
  page: 1,
  limit: 10,
  filters: {},
  allowedFilters: [],
});

export const getDefaultOptionMetaData = <T,>(): MetaData<T> => ({
  order: '',
  direction: 'asc',
  total: 0,
  page: 1,
  limit: 50,
  filters: {},
  allowedFilters: [],
});

export interface ModalActionProps {
  title: string;
  body: string | ((closePopup: () => void) => JSX.Element);
  resolveText?: string;
  resolveMessage?: string;
  rejectText?: string;
  data?: { [id: string]: string };
  className?: string;
  resolveDisabled?: boolean;
  rejectDisabled?: boolean;

  resolve?(): void;

  resolveWithPromise?(): Promise<void>;

  reject?(): void;

  rejectWithPromise?(): Promise<void>;
}

export interface ModalState {
  show: boolean;
  title: string;
  body: string | ((closePopup: () => void) => JSX.Element);
  className: string;
  resolveText?: string;
  resolveMessage?: string;
  rejectText?: string;
  data: { [id: string]: string };
  resolveDisabled: boolean;
  resolveWithPromise: () => Promise<void>;
  rejectDisabled: boolean;
  rejectWithPromise: () => Promise<void>;

  resolve(): Promise<void>;

  reject(): Promise<void>;
}

export const getDefaultModalState = (): ModalState => ({
  show: false,
  title: '',
  body: '',
  className: '',
  resolveText: '',
  resolveMessage: '',
  rejectText: '',
  data: {},
  resolveDisabled: false,
  resolveWithPromise: () => Promise.resolve(),
  rejectDisabled: false,
  rejectWithPromise: () => Promise.resolve(),
  reject: () => Promise.reject(),
  resolve: () => Promise.resolve(),
});

export interface ModalProps {
  onCancel: () => void;
  onSuccess: () => void;
}


export enum TabModule {
  OPTIMISE = 'OPTIMISE',
  PROTECT = 'PROTECT',
  MAXIMISE = 'MAXIMISE'
}

export enum MethodValue {
  OTP = "OTP",
}


export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  schoolId: string;
  lastLogin: string;
  role: string[];
  status: string;
  // phoneNumber: string;
  // dialCode: string;
  profilePhoto: string;
  mobile?: string;
}
