import moment from 'moment';
import { Id, Option } from '../models';

export const convertIsoDatoToIsoDateTime = (
  date?: string,
): string | undefined => {
  if (!date) {
    return undefined;
  }
  return `${date}T${moment().format('HH:mm:ssZ')}`;
};

export const convertToIsoDateTime = (date?: string): string | undefined => {
  if (!date) {
    return undefined;
  }
  return moment(date).format('YYYY-MM-DDTHH:mm:ssZ');
};

export const convertToIsoDate = (date?: string): string | undefined => {
  if (!date) {
    return undefined;
  }
  return moment(date).format('YYYY-MM-DD');
};

export const isUndefined = (value: unknown): boolean => value === undefined;
export const isNull = (value: unknown): boolean => value === null;

export const getApiDate = (
  value: string | moment.Moment | undefined | null,
): string | undefined | null => {
  if (isNull(value)) return null;
  if (isUndefined(value)) return undefined;
  return convertToIsoDate(value as string);
};

export const convertToMomentDate = (
  value: string | moment.Moment | undefined | null,
): moment.Moment | undefined | null => {
  if (isNull(value)) return null;
  if (isUndefined(value)) return undefined;
  return moment(value);
};

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export const getEditUrl = (route: string) => (entity: any): string => route.replace(':id', entity?.id);

export const convertSingleToDoubleDigit = (
  value?: number,
): string | undefined => {
  if (isNull(value)) return null;
  if (isUndefined(value)) return undefined;

  if (value >= 0 && value <= 9) {
    return `0${value}`;
  }
  return `${value}`;
};

export const fileSizeCheckFunction = (
  fileSize: number,
  acceptedFileSize: number,
) => {
  if (fileSize / 1024 / 1024 >= acceptedFileSize) {
    return true;
  }
  return false;
};

export const capitalizeLegend = (str?: string) => {
  if (str === null || str === undefined) {
    return str;
  }
  return `${str?.charAt(0)?.toUpperCase()}${str
    ?.slice(1)
    ?.toLowerCase()
    .replace('_', ' ')}`;
};

export const mapIdNameToOption = (entity: {
  id: Id;
  name: string;
}): Option => ({ id: entity?.id, label: capitalizeLegend(entity?.name) });

export const underscoreChangeFunction = (str: string): string => {
  if (!str.includes('_')) {
    return str;
  }
  return str.replace('_', ' ');
};

export const trimWordWrapper = (str: string): string => str.trim();
