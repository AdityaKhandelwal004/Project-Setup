import type { Id, Option } from "@mono/models";
import messages from "../messages";
import { routes } from "../myUtils";

 
export enum LearningResourceTabs {
  TYPES = "Types",
  TAGS= "Tags",
}
 
 export const learningTabs = [
    {
      id: LearningResourceTabs.TYPES,
      label:  messages?.learnResouce?.types,
      route : routes.learningResourcesTypes
    },
    {
      id: LearningResourceTabs.TAGS,
      label:  messages?.learnResouce?.tags,
      route : routes.learningResourcesTags
    }
  ];


export const getActiveTab = (tabPath?: string) => {
  switch(tabPath) {
    case 'types':
      return LearningResourceTabs.TYPES;
    case 'tags':
      return LearningResourceTabs.TAGS;
  }
}

export const FILTER_OPTION: Option[] = [
  {
    id: "ACTIVE",
    label: messages?.general?.active,
  },
  {
    id: "INACTIVE",
    label: messages?.general?.inactive,
  },
];



export interface TableMetadata {
  order: string | null;
  page: number;
  limit: number;
  total: number;
  filters: Record<string, unknown>;
  allowedFilters: string[];
  direction: "asc" | "desc";
}


export interface ResourceRecord {
  id: Id;
  name: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

export interface ResourceEntity {
  metadata: TableMetadata;
  records: ResourceRecord[];
}