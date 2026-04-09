import Joi from 'joi';
import { requiredStringValidator } from '../../../utils/index.ts';

export default Joi.object(
  ((messageKey) => ({
    oldPassword: requiredStringValidator(messageKey, 'oldPassword'),
    newPassword: requiredStringValidator(messageKey, 'newPassword'),
    confirmPassword: requiredStringValidator(messageKey, 'confirmPassword'),
  }))('changePassword')
).options({ stripUnknown: true });
