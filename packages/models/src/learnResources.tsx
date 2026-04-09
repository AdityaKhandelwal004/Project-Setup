import type { Status, PaginatedEntity } from './baseEntities';

export interface LearnResourceType {
  id: number;
  name: string;
  description: string | null;
  status: Status;
  createdOn: string;
}

export interface LearnResourceCategory {
  id: number;
  name: string;
  code: string;
  description: string | null;
  status: Status;
  createdOn: string;
}

export interface Tag {
  id: number;
  name: string;
  status: Status;
  createdOn: string;
  description: string | null;
}

export interface LearnResource {
  id: number;
  title: string;
  learnResourceType: LearnResourceType;
  learnResourceCategory: LearnResourceCategory;
  tags: Tag[];
  thumbnailUrl: string | null;
  resourceUrl: string;
  author: string | null;
  searchKeywords: string | null;
  description: string | null;
  status: Status;
  createdOn: string;
}

export const LEARN_RESOURCES_ENTITY: PaginatedEntity = {
  key: 'learnResources',
  name: 'LEARN_RESOURCES',
  api: '/api/learn-resources/filter',
};

export const LEARN_RESOURCE_CATEGORIES_ENTITY: PaginatedEntity = {
  key: 'learnResourceCategories',
  name: 'LEARN_RESOURCE_CATEGORIES',
  api: '/api/learn-resource/categories/filter',
};
