import { filterUndefinedFromObject } from '../../../utils/index.ts';

type FilterObj = {
  hashedPassword?: string
}

export default (user : FilterObj) => {
  const map = {
    password: user?.hashedPassword,
  };

  return filterUndefinedFromObject(map);
};
