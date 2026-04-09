import Joi from 'joi';
import { requiredEmailValidator } from '../../../utils/index.ts';

export default Joi.object(
  ((messageKey) => ({
    email: requiredEmailValidator(messageKey, 'email'),
  }))('forgotPassword')
).options({ stripUnknown: true });
