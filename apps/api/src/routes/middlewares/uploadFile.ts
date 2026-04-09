import multer from 'multer';
import type { FileFilterCallback } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import type { NextFunction, Request, Response } from 'express';
import {
  FILE_MIMES,
  IMAGE_MIMES,
  IMAGE_VIDEO_MIMES,
  MAX_FILE_SIZE,
  MAX_NUM_FILES,
} from '../../utils/index.ts';

export type MulterFiles =
  | { [fieldname: string]: Express.Multer.File[] }
  | Express.Multer.File[]
  | undefined;

interface UploadedFileMeta {
  filename: string;
  mimeType: string;
  originalName: string;
}

interface ExtendedRequest extends Request {
  filenames?: UploadedFileMeta[];
}

function fileFilterFunction(mimes: string[]) {
  return function fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ): void {
    if (mimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('error.upload.invalidFileType'));
    }
  };
}

const storage = multer.diskStorage({
  destination(
    req: Request,
    file: Express.Multer.File,
    cb: (_error: Error | null, _destination: string) => void
  ) {
    cb(null, 'uploads/');
  },
  filename(
    req: ExtendedRequest,
    file: Express.Multer.File,
    cb: (_error: Error | null, _filename: string) => void
  ) {
    const uniqueFilename: string = `${uuidv4()}${path.extname(file.originalname)}`;
    if (!req.filenames) {
      req.filenames = [];
    }
    req.filenames.push({
      filename: uniqueFilename,
      mimeType: file.mimetype,
      originalName: file.originalname,
    });
    cb(null, uniqueFilename);
  },
});

function uploadMiddlewareFunction(mimes: string[]) {
  const upload = multer({
    storage,
    fileFilter: fileFilterFunction(mimes),
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
  });

  const uploadFiles = upload.array('files', MAX_NUM_FILES);

  return function uploadMiddleware(
    req: ExtendedRequest & { file?: Express.Multer.File },
    res: Response,
    next: NextFunction
  ) {
    uploadFiles(req, res, (err) => {
      if (err) {
        switch (err.code) {
          case 'LIMIT_UNEXPECTED_FILE':
            res.status(400).send({
              message: 'error.upload.exceededMaxNumberOfFiles',
            });
            return;
          case 'LIMIT_FILE_SIZE':
            res.status(400).send({
              message: 'error.upload.exceededMaxFileSize',
            });
            return;
          case 'LIMIT_FILE_COUNT':
            res.status(400).send({
              message: 'error.upload.exceededMaxNumberOfFilesAllowed',
            });
            return;
          default:
            console.log('[ERROR] FROM MULTER: ', err);
            res.status(400).send({
              message: err.message,
            });
            return;
        }
      }

      if (Array.isArray(req.files)) {
        if (req.files.length === 1) {
          req.file = req.files[0];
        }
      } else if (req.files && typeof req.files === 'object') {
        const allFiles = Object.values(req.files).flat();
        if (allFiles.length === 1) {
          req.file = allFiles[0];
        }
      }

      next();
    });
  };
}

export const uploadImage = uploadMiddlewareFunction(IMAGE_MIMES);
export const uploadImageVideo = uploadMiddlewareFunction(IMAGE_VIDEO_MIMES);
export const uploadFile = uploadMiddlewareFunction(FILE_MIMES);
