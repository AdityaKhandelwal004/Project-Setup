import Joi from 'joi';
import {
  ACTION_TYPE,
  getEnumArrayFromObj,
  nullableEnumValidator,
  requiredIdValidator,
  requiredStringValidator,
} from '../../../utils/index.ts';

export default Joi.object(
  ((messageKey) => ({
    methodId: requiredIdValidator(messageKey, 'methodId'),
    senderDetail: requiredStringValidator(messageKey, 'senderDetail'),
    actionType: nullableEnumValidator(
      getEnumArrayFromObj(ACTION_TYPE) || [],
      messageKey,
      'actionType'
    ),
  }))('twoFa')
).options({ stripUnknown: true });
