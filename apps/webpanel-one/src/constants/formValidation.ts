import messages from '../messages';

export interface FormField {
  value: string;
  error?: string;
  success?: string;
}

export type FormFields = Record<string, FormField>;

export const validateField = (
  fieldName: string,
  value: string,
  currentFields: FormFields
): FormFields => {
  const newFields = { ...currentFields };
  newFields[fieldName] = { ...newFields[fieldName], value };

  switch (fieldName) {
    case 'firstName':
      if (!value.trim()) {
        newFields.firstName.error = "We'd love to know your name!";
        newFields.firstName.success = undefined;
      } else {
        newFields.firstName.error = undefined;
        newFields.firstName.success = `Nice to meet you, ${value}!`;
      }
      break;

    case 'lastName':
      if (!value.trim()) {
        newFields.lastName.error = 'Your last name helps us personalize your experience!';
        newFields.lastName.success = undefined;
      } else {
        newFields.lastName.error = undefined;
        newFields.lastName.success = 'Perfect!';
      }
      break;

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        newFields.email.error = 'Your email is your gateway to wealth building!';
        newFields.email.success = undefined;
      } else if (!emailRegex.test(value)) {
        newFields.email.error = "Hmm, that doesn't look quite right";
        newFields.email.success = undefined;
      } else {
        newFields.email.error = undefined;
        newFields.email.success = messages?.general?.error?.email?.success;
      }
      break;

    case 'password':
      if (!value) {
        newFields.password.error = 'A strong password protects your financial journey! 🔒';
        newFields.password.success = undefined;
      } else if (value.length < 8) {
        newFields.password.error = 'Make it at least 8 characters - future you will thank you!';
        newFields.password.success = undefined;
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        newFields.password.error = 'Mix it up! Try uppercase, lowercase, and numbers';
        newFields.password.success = undefined;
      } else {
        newFields.password.error = undefined;
        newFields.password.success = "That's a fortress-level password!";
      }
      break;

    case 'confirmPassword':
      if (!value) {
        newFields.confirmPassword.error = 'Just double-checking for security!';
        newFields.confirmPassword.success = undefined;
      } else if (value !== newFields.password.value) {
        newFields.confirmPassword.error = "Passwords don't match - let's try that again!";
        newFields.confirmPassword.success = undefined;
      } else {
        newFields.confirmPassword.error = undefined;
        newFields.confirmPassword.success = "Perfect match! You're all set!";
      }
      break;
  }

  return newFields;
};
