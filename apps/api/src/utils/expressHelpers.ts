import type { CustomError } from "../models/genericTypes.ts";
import { messageResponse } from "./apiResponses.ts";
import type { Response } from "express";

export const handleCors = (
  origin: string | undefined,
  allowedOriginsCS: string[],
  callback: (_err: Error | null, _allow?: boolean) => void
): void => {
  if (
    !origin ||
    allowedOriginsCS.some((x) => origin && origin.indexOf(x) !== -1)
  ) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};

export const handleErrorResponse = (err: CustomError, res: Response): void => {
  if (err.metaData) {
    res.json(messageResponse(err.message, err.metaData));
  } else {
    res.json(messageResponse(err.message));
  }
};
