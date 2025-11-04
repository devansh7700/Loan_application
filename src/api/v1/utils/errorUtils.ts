import { AppError } from "../errors/AppError";

export const formatError = (err: unknown) => {
  if (err instanceof AppError) {
    return {
      message: err.message,
      statusCode: err.statusCode,
      timestamp: new Date().toISOString(),
    };
  }

  // fallback for unknown errors
  return {
    message: "Internal server error",
    statusCode: 500,
    timestamp: new Date().toISOString(),
  };
};
