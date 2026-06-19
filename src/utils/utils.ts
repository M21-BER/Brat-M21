export const clientUrl = "http://localhost:3004/";
const BASE_URL = "http://localhost:3004";
export const API_URL = `${BASE_URL}/api/v1.0`;
export const URL = `${BASE_URL}/`;
export const TOKEN_KEY = "tokenData";

export function handleError(
  err: any,
  defaultMessage = "something went wrong",
): string {
  if (err.response?.data?.message === "Validation Error") {
    const details = err.response?.data?.details;
    return Array.isArray(details) && details.length > 0
      ? details.join(", ")
      : defaultMessage;
    // return "Please fill all required fields";
  } else if (err.response?.data?.error) {
    return err.response?.data?.error?.message || defaultMessage;
  } else if (err.message) return err.message;
  else if (err.error.message) return err.error.message;
  return defaultMessage;
}

export function toValidDate(val: unknown): Date {
  if (val instanceof Date) return val;
  if (typeof val === "string" || typeof val === "number") {
    const date = new Date(val);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date value: ${val}`);
    }
    return date;
  }
  throw new Error(`Cannot convert value to Date: ${val}`);
}
