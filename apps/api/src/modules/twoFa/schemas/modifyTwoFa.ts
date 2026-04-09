import Joi from 'joi';
import {
  ACTION_TYPE,
  getEnumArrayFromObj,
  requiredEnumValidator,
  requiredIdValidator,
  requiredStringValidator,
} from '../../../utils/index.ts';

export default Joi.object(
  ((messageKey) => ({
    methodId: requiredIdValidator(messageKey, 'methodId'),
    senderDetail: requiredStringValidator(messageKey, 'senderDetail'),
    actionType: requiredEnumValidator(
      getEnumArrayFromObj(ACTION_TYPE) || [],
      messageKey,
      'actionType'
    ),
  }))('setTwoFa')
).options({ stripUnknown: true });
