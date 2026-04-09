import messages from "@mono/messages";
import moment, { type Moment } from "moment";

// Helper function to format date
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Not set";
    }
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Not set";
  }
};

// Format date for display
export const formatDateForDisplay = (
  dateString: Date | string | null | undefined,
): string => {
  if (!dateString || dateString === "Not set") {
    return "Not set";
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Not set";
    }

    const day = date.getDate();
    const month = date.toLocaleDateString("en-GB", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch {
    return "Not set";
  }
};

export const formatDateWithMoment = (
  dateString: Moment | Date | string | null | undefined,
  format: string = "DD MMM YYYY",
): string => {
  if (!dateString) {
    return "-";
  }
  try {
    const date = moment(dateString);
    if (!date.isValid()) {
      return "-";
    }
    return date.format(format);
  } catch {
    return "-";
  }
};

export const sanitizeServerError = (error?: string) => {
  if (error === null || error === undefined || error?.trim() === "") {
    return messages.general.errors.serverError;
  }
  return error;
};

export const toCapitalCase = (str?: string): string => {
  if (!str) return "";
  return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
};

