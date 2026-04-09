import Joi from "joi";
import {
  requiredBooleanValidator,
  requiredDateValidator,
  requiredEmailValidator,
  requiredStringValidator,
} from "../../../utils/index.ts";

export default Joi.object(
  ((messageKey) => ({
    firstName: requiredStringValidator(messageKey, "firstName"),
    lastName: requiredStringValidator(messageKey, "lastName"),
    email: requiredEmailValidator(messageKey, "email"),
    password: requiredStringValidator(messageKey, "password"),
    dateOfBirth: requiredDateValidator(messageKey, "dateOfBirth", {
      onlyPast: true,
    }),
    termAccepted: requiredBooleanValidator(messageKey, "termAccepted"),
    privacyPolicyAccepted: requiredBooleanValidator(messageKey, "privacyPolicyAccepted"),
  }))("signup")
).options({ stripUnknown: true });
