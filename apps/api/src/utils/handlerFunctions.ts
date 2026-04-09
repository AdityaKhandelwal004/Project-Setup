import type { Schema } from "joi";
import { HttpException, formatErrorResponse } from "../utils/index.ts";

type UploadedFile = Express.Multer.File; // Adjust if you're not using Multer
type RequestSource = "body" | "query" | "params";
type RequestWithSources = {
  body?: any;
  query?: any;
  params?: any;
  [key: string]: any;
};

/**
 * Checks if at least one file is provided
 * @param {UploadedFile[]} files
 * @param {string} messageKey
 */
export const basicFileValidation = (
  files: UploadedFile[] | undefined,
  messageKey: string
): void => {
  if (!files) {
    throw new HttpException.BadRequest(
      formatErrorResponse(messageKey, "filesNotProvided")
    );
  }
  if (!Array.isArray(files)) {
    console.log("messageKey", files);
    throw new HttpException.BadRequest(
      formatErrorResponse(messageKey, "invalidData")
    );
  }
  if (files.length === 0) {
    throw new HttpException.BadRequest(
      formatErrorResponse(messageKey, "noFilesProvided")
    );
  }
};

/**
 * Handles errors with proper logging
 * @param {Error} error
 * @param {string} messageKey
 * @param {string} fallbackErrorMessage
 */
export const handleError = (
  error: Error,
  messageKey: string,
  fallbackErrorMessage: string
): never => {
  console.log("-----");
  console.log(`[ERROR][${messageKey}] error Handler:`);
  console.dir(error, { depth: 4 });
  console.log("-----");
  throw new HttpException.ServerError(
    formatErrorResponse(messageKey, fallbackErrorMessage)
  );
};

export const validateRequest = async <T>(
  schema: Schema<T>,
  req: RequestWithSources,
  source: RequestSource
): Promise<T> => {
  try {
    const validatedData = await schema.validateAsync(req[source], {
      stripUnknown: true,
    });

    return validatedData;
  } catch (error: any) {
    const message =
      error?.details?.map((d: any) => d.message).join(", ") ||
      "Validation error";

    throw new HttpException.BadRequest(formatErrorResponse(source, message));
  }
};
