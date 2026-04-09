import moment from 'moment';
import type { Moment } from 'moment';
import type { Id } from '../../models/genericTypes.ts';
import { formatErrorResponse, HttpException } from '../index.ts';

export const parserId = (
  id: string | number | undefined | null,
  message?: string
): Id => {
  const messageKey = message || 'id';
  if (!id) {
    throw new HttpException.BadRequest(
      formatErrorResponse(messageKey, 'required')
    );
  } else if (Number.isNaN(parseInt(id.toString(), 10))) {
    throw new HttpException.BadRequest(
      formatErrorResponse(messageKey, 'invalid')
    );
  }
  return parseInt(id.toString(), 10);
};

export const parserDate = (
  date: string | Date | null | undefined
): Moment | null => (date ? moment(date) : null);

export const parserBoolean = (value: any): boolean => !!value;

export const parserInteger = (value: any): number | null =>
  value != null ? parseInt(value, 10) : null;

export const parserFloat = (value: any): number | null =>
  value != null ? parseFloat(value) : null;

export const parserJson = (value: string | null | undefined): any | null => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (error) {
    console.log('Error parsing Json: ', error);
    return null;
  }
};
