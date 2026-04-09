import Joi from 'joi';
import { requiredStringValidator } from '../../../utils/index.ts';

export default Joi.object(
  ((messageKey) => ({
    email: requiredStringValidator(messageKey, 'email'),
    password: requiredStringValidator(messageKey, 'password'),
  }))('login')
).options({ stripUnknown: true });
