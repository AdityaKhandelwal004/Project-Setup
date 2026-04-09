import type { Id } from "../../../models/genericTypes.ts";
import { filterUndefinedFromObject } from "../../../utils/index.ts";

type FilterObj = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string | null;
  updatedBy: Id;
  profilePicture?: string | null;
};

export default (user: FilterObj) => {
  const map = {
    first_name: user?.firstName,
    last_name: user?.lastName,
    date_of_birth: user?.dateOfBirth,
    updated_by: user?.updatedBy,
    profile_picture_path: user?.profilePicture,
  };

  return filterUndefinedFromObject(map);
};
