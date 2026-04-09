import { Container } from 'typedi';
import { routes, featureLevel, get, post } from '../../utils/index.ts';
import { Right } from '../../auth/index.ts';
import TwoFaService from './twoFaService.ts';
import verifyTwoFa from './schemas/verifyTwoFa.ts';
import { setTwoFa } from './schemas/index.ts';
import type {
  CurrentUser,
  RequestMetadata,
} from '../../models/genericTypes.ts';

export default () => {
  get(
    featureLevel.production,
    Right.twoFa.GET_TWO_FA_METHODS,
    routes.twoFa.GET_TWO_FA_METHODS,
    async () => {
      const service = Container.get(TwoFaService);
      return await service.getTwoFaMethods();
    }
  );

  get(
    featureLevel.production,
    Right.twoFa.USER_TWO_FA_METHODS,
    routes.twoFa.USER_TWO_FA_METHODS,
    async (req) => {
      const service = Container.get(TwoFaService);
      return await service.getUserTwoFaMethods({
        ...(req.currentUser as CurrentUser),
      });
    }
  );

  post(
    featureLevel.production,
    Right.twoFa.SET_UP_TWO_FA,
    routes.twoFa.TWO_FA,
    async (req) => {
      const service = Container.get(TwoFaService);
      const dto = await setTwoFa.validateAsync(req.body);
      const { 'user-agent': userAgent } = req.headers;
      const requestMetadata: RequestMetadata = {
        userAgent: userAgent ?? '',
        ip: req.ip ?? '',
      };
      if (!dto.actionType) {
        return await service.setTwoFa(dto, {
          ...requestMetadata,
          ...(req.currentUser as CurrentUser),
        });
      }

      return await service.updateTwoFa(dto, {
        ...requestMetadata,
        ...(req.currentUser as CurrentUser),
      });
    }
  );

  post(
    featureLevel.production,
    Right.twoFa.VERIFY_TWO_FA,
    routes.twoFa.VERIFY_TWO_FA,
    async (req) => {
      const service = Container.get(TwoFaService);
      const dto = await verifyTwoFa.validateAsync(req.body);
      const { 'user-agent': userAgent } = req.headers;
      const requestMetadata: RequestMetadata = {
        userAgent: userAgent ?? '',
        ip: req.ip ?? '',
      };
      return await service.confirmTwoFa(dto, {
        ...(req.currentUser as CurrentUser),
        ...requestMetadata,
      });
    }
  );
};
