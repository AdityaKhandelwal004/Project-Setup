/* eslint-disable max-classes-per-file */

interface ErrorMetadata {
  [key: string]: any;
}

abstract class HttpError extends Error {
  status: number;
  metaData?: ErrorMetadata;

  constructor(
    msg: string,
    status: number,
    metaData: ErrorMetadata | null = null
  ) {
    super(msg);
    this.status = status;

    // Set the prototype explicitly for proper instanceof behavior
    Object.setPrototypeOf(this, new.target.prototype);

    if (metaData) {
      this.metaData = metaData;
    }
  }
}

export class BadRequest extends HttpError {
  constructor(msg: string, metaData = null) {
    super(msg, 400, metaData);
  }
}

export class Unauthorized extends HttpError {
  constructor(msg: string, metaData = null) {
    super(msg, 401, metaData);
  }
}

export class Forbidden extends HttpError {
  constructor(msg: string, metaData = null) {
    super(msg, 403, metaData);
  }
}

export class NotFound extends HttpError {
  constructor(msg: string, metaData = null) {
    super(msg, 404, metaData);
  }
}

export class Conflict extends HttpError {
  constructor(msg: string, metaData = null) {
    super(msg, 409, metaData);
  }
}

export class UpgradeRequired extends HttpError {
  constructor(msg: string, metaData = null) {
    super(msg, 426, metaData);
  }
}

export class ServerError extends HttpError {
  constructor(msg: string, metaData = null) {
    super(msg, 506, metaData);
  }
}
