import Joi from 'joi';
import {
  LOGIN_TOKEN_TYPE,
  getEnumArrayFromObj,
  requiredEmailValidator,
  requiredEnumValidator,
  requiredIdValidator,
  requiredStringValidator,
} from '../../../utils/index.ts';

export default Joi.object(
  ((messageKey) => ({
    email: requiredEmailValidator(messageKey, 'email'),
    password: requiredStringValidator(messageKey, 'password'),
    actionType: requiredEnumValidator(
      getEnumArrayFromObj(LOGIN_TOKEN_TYPE) || [],
      messageKey,
      'actionType'
    ),
    token: requiredIdValidator(messageKey, 'token'),
  }))('verifyToken')
).options({ stripUnknown: true });
