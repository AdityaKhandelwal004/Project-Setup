import Joi from 'joi';
import {
  ACTION_TYPE,
  getEnumArrayFromObj,
  nullableStringValidator,
  requiredEnumValidator,
  requiredIdValidator,
  requiredStringValidator,
} from '../../../utils/index.ts';

export default Joi.object(
  ((messageKey) => ({
    actionType: requiredEnumValidator(
      getEnumArrayFromObj(ACTION_TYPE) || [],
      messageKey,
      'actionType'
    ),
    methodId: requiredIdValidator(messageKey, 'methodId'),
    senderDetail: requiredStringValidator(messageKey, 'senderDetail'),
    verificationToken: nullableStringValidator(messageKey, 'verificationToken'),
    newMethodVerificationToken: nullableStringValidator(
      messageKey,
      'newMethodVerificationToken'
    ),
  }))('setTwoFa')
).options({ stripUnknown: true });
