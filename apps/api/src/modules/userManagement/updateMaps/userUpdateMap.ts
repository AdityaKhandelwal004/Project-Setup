import type { Id } from '../../../models/genericTypes.ts';
import {
  filterUndefinedFromObject,
} from '../../../utils/index.ts';

type FilterObj = {
  status?: string;
  email?: string;
  updatedBy?: Id;
}

export default (user : FilterObj) => {
  const map = {
    status: user?.status,
    email: user?.email,
    updated_by: user?.updatedBy,
  };

  return filterUndefinedFromObject(map);
};
