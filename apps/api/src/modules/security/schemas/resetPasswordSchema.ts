import Joi from 'joi';
import { requiredStringValidator } from '../../../utils/index.ts';

export default Joi.object(
  ((messageKey) => ({
    token: requiredStringValidator(messageKey, 'token'),
    password: requiredStringValidator(messageKey, 'newPassword'),
    confirmPassword: requiredStringValidator(messageKey, 'confirmPassword'),
  }))('resetPassword')
).options({ stripUnknown: true });
