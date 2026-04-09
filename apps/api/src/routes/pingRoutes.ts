import {
  routes, featureLevel, get, publicGet,
  messageResponse
} from '../utils/index.ts';
import { Right } from '../auth/index.ts';

/**
   * Token/Health Check endpoints
 * */
export default () => {
  publicGet(
    featureLevel.production,
    routes.healthCheck,
    async () => messageResponse('ok'),
  );

  get(
    featureLevel.production,
    Right.general.PING,
    routes.ping,
    async () => messageResponse('ok'),
  );
};
