import Joi from "joi";
import {
  nullableDateValidator,
  stringEmailValidator,
  stringValidator,
} from "../../../utils/index.ts";

export default Joi.object(
  ((messageKey) => ({
    firstName: stringValidator(messageKey, "firstName"),
    lastName: stringValidator(messageKey, "lastName"),
    email: stringEmailValidator(messageKey, "email"),
    dateOfBirth: nullableDateValidator(messageKey, "dateOfBirth", {
      onlyPast: true,
    }),
  }))("profile")
).options({ stripUnknown: true });
