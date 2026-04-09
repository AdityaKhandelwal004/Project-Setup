import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import helmet from 'helmet';
import routes from '../routes/index.ts';
import config from '../config/index.ts';
import qs from 'qs';
import { HttpException } from '../utils/index.ts';
import { logOrigin } from '../utils/commonFunctions.ts';
import { handleCors, handleErrorResponse } from '../utils/expressHelpers.ts';
import { formatErrorResponse } from '../utils/apiResponses.ts';
import type { Application, NextFunction, Request, Response } from 'express';
import type { CustomError } from '../models/genericTypes.ts';

const { allowedOrigins } = config.cors;
const allowedOriginsCS = allowedOrigins ? allowedOrigins.split(',') : [];

interface AppLoadersParams {
  app: Application;
}

interface ErrorMetadata {
  [key: string]: any;
}

interface ExceptionType {
  message: string;
  status: number;
  metaData: ErrorMetadata;
}

/**
 * Initialize the express middleware here
 * @param {{ app: Express }}
 */
export default ({ app }: AppLoadersParams) => {
  app.disable('x-powered-by');

  app.use(logger(':method :url :status :response-time ms'));

  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(
    cors({
      origin(origin, callback) {
        logOrigin(origin, allowedOriginsCS);
        handleCors(origin, allowedOriginsCS, callback);
      },
      methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH',
      allowedHeaders:
        'Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin',
      exposedHeaders: 'Authorization',
      credentials: true,
    })
  );

  // Middleware that transforms the raw string of req.body into json
  app.use(
    bodyParser.json({
      limit: '2mb',
    })
  );

  // Middleware to handle form data requests for file upload
  app.use(bodyParser.urlencoded({ extended: true }));

  // Middleware to parse query strings
  app.set('query parser', (str: string) => qs.parse(str));

  // Load API routes
  app.use(routes());

  // / catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new HttpException.NotFound(
      formatErrorResponse('general', 'notFound')
    );
    next(err);
  });

  app.use(
    helmet({
      xFrameOptions: {
        action: 'deny',
      },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'"],
          styleSrc: null,
          fontSrc: null,
          baseUri: null,
          formAction: null,
          frameAncestors: null,
          imgSrc: null,
          objectSrc: null,
          scriptSrc: null,
          scriptSrcAttr: null,
          upgradeInsecureRequests: null,
        },
      },
    })
  );

  // / error handlers
  app.use(
    (err: ExceptionType, _req: Request, res: Response, _next: NextFunction) => {
      const error = err as CustomError;
      const isJoiError = (err as any)?.isJoi || (err as any)?.details;
      const statusCode = isJoiError ? 400 : err?.status || 500;
      res.status(statusCode);
      handleErrorResponse(error, res);
    }
  );
};
