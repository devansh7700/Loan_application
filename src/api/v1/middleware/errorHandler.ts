import { Request, Response, NextFunction } from "express";
import { formatError } from "../utils/errorUtils";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorResponse = formatError(err);
  
  // You can log full error here for debugging
  console.error(err);

  res.status(errorResponse.statusCode).json(errorResponse);
};
