import Joi from "joi";
import {
  requiredStringValidator,
} from "../../../utils/index.ts";

export default Joi.object(
  ((messageKey) => ({
    token: requiredStringValidator(messageKey, "token"),
  }))("verifyEmail")
).options({ stripUnknown: true });
