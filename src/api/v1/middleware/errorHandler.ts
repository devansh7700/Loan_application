import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[ERROR] ${err.message}`);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      timestamp: new Date().toISOString(),
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      statusCode: 500,
      timestamp: new Date().toISOString(),
    });
  }
};