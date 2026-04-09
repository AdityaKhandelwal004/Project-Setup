import type express from 'express';
import type { ParsedFilter } from './genericTypes.ts';

type Request = express.Request;

interface QueryParams {
  page?: string;
  limit?: string;
  order?: string;
  direction?: 'asc' | 'desc';
  allResults?: string;
  filter?: Record<string, string>;
}

const FILTER_MAP = {
  GENERAL: ['search'],
  FETCH_FILTERED_BUDGET_ALLOCATIONS: ['status', 'allocationType'],
  PARTNERS_LIST: ['search', 'status', 'partnerCategoryId'],
  PARTNER_CATEGORIES_LIST: ['search', 'status'],
  LEARN_RESOURCE_TYPES_LIST: ['search', 'status'],
  LEARN_RESOURCE_TAGS_LIST: ['search', 'status'],
  LEARN_RESOURCES_LIST: [
    'search',
    'status',
    'learnResourceTypeId',
    'learnResourceCategoryId',
    'learnResourceCategoryCode',
    'tagId',
  ],
  LEARN_RESOURCE_CATEGORIES_LIST: ['search', 'status'],
  FETCH_FILTERED_INCOMES: ['search', 'frequency', 'payDay', 'type', 'status'],
  FETCH_FILTERED_SAVINGS: ['status'],
  FETCH_FILTERED_EXPENSES: ['status'],
  FETCH_FILTERED_VAULT_FOLDERS: ['parentId', 'status', 'search'],
  FETCH_FILTERED_VAULT_CATEGORIES: ['status', 'search'],
  FETCH_FILTERED_VAULT_AUDIT_LOGS: ['documentId', 'search'],
  FETCH_FILTERED_VAULT_TAGS: ['status', 'search'],
  FETCH_FILTERED_VAULT_DOCUMENTS: [
    'folderId',
    'categoryId',
    'tagId',
    'status',
    'search',
    'parentId',
  ],
  ASSETS_LIST: ['status'],
  ASSET_TYPES_LIST: ['status'],
  INSURANCE_POLICY_TYPES_LIST: ['status'],
  INSURANCE_POLICIES_LIST: ['status'],
  SYSTEM_BADGES_LIST: ['status'],
  CUSTOMERS_LIST: [
    'status',
    'search',
    'subscriptionType',
    'subscriptionExpiryStartDate',
    'subscriptionExpiryEndDate',
  ],
  GET_FILTERED_CUSTOMER_PAYMENTS: [],
  FETCH_FILTERED_USER_PAYMENTS: [],
  RECENT_ACTIVITIES_LIST: ['search', 'activityType'],
  FILTERED_USER_EXPENSES: ['toDate', 'fromDate'],
} as const;

type FilterType = keyof typeof FILTER_MAP;

class Filter {
  static types = Object.freeze(FILTER_MAP);

  static getAllowedFilter(filter: FilterType): string[] {
    return Array.from(Filter.types[filter] || []);
  }

  static fromRequest(
    req: Request,
    type: FilterType,
    isExport: boolean = false
  ): ParsedFilter {
    const filter: ParsedFilter = {
      allowedFilters: [...Filter.getAllowedFilter(type)],
      page: 0,
      limit: 50,
      filters: {},
      direction: 'asc',
    };

    const params = req.query as QueryParams;

    const page = params.page ? Math.max(0, parseInt(params.page, 10) - 1) : 0;
    const limit = params.limit ? parseInt(params.limit, 10) : 50;

    filter.page = page;
    filter.limit = limit;

    if (params.order) filter.order = params.order;
    if (params.direction) filter.direction = params.direction;
    if (params.allResults) {
      filter.allResults = params.allResults.toLowerCase() === 'true';
    }

    if (isExport) {
      filter.allResults = true;
    }

    if (params.filter) {
      for (const key of filter.allowedFilters) {
        if (params.filter[key]) {
          filter.filters[key] = params.filter[key];
        }
      }
    }

    return {
      ...filter,
      allowedFilters: [...filter.allowedFilters],
      filters: { ...filter.filters },
    };
  }
}

export default Filter;
