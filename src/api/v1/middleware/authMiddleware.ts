import { Request, Response, NextFunction } from "express";
import admin from "../../../config/firebase";
import { AppError } from "../errors/AppError";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Missing or invalid authorization header", HTTP_STATUS.UNAUTHORIZED));
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
      return next(new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED));
    }

    (req as any).user = decodedToken;
    next();
  } catch (error: any) {
    if (error.code === "auth/id-token-expired") {
      next(new AppError("Token expired", HTTP_STATUS.UNAUTHORIZED));
    } else {
      next(new AppError("Authentication failed", HTTP_STATUS.UNAUTHORIZED));
    }
  }
};
