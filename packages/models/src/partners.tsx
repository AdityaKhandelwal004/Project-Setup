import type { Status, PaginatedEntity } from './baseEntities.tsx';

export interface PartnerCategory {
  id: number;
  name: string;
  description: string | null;
  status: Status;
  createdOn: string;
}

export interface Partner {
  id: number;
  category: PartnerCategory;
  name: string;
  thumbnailUrl: string | null;
  partnerUrl: string | null;
  description: string | null;
  status: Status;
  createdOn: string;
}

export const PARTNERS_ENTITY: PaginatedEntity = {
  key: 'partners',
  name: 'PARTNERS',
  api: '/api/partners/filter',
};
