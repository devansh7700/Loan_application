import morgan, { StreamOptions } from "morgan";

// Stream for Morgan to write to console
const stream: StreamOptions = {
  write: (message) => console.log(message.trim()),
};

// Skip logging in test environment
const skip = () => process.env.NODE_ENV === "test";

// Morgan middleware with combined format
export const loggerMiddleware = morgan("combined", { stream, skip });
