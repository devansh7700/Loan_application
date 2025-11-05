import { Request, Response, NextFunction } from "express";
import { UnauthorizedError, ForbiddenError } from "../errors/AppError";

interface AuthOptions {
  roles?: string[];
  allowSameUser?: boolean;
}

export const authorize = (options: AuthOptions = {}) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return next(new UnauthorizedError("User not authenticated"));
    }

    const { roles = [], allowSameUser = false } = options;

    // If user role isn’t in allowed roles
    if (roles.length && !roles.includes(user.role)) {
      // Allow same-user access if enabled
      if (allowSameUser && req.params.id === user.uid) {
        return next();
      }
      return next(new ForbiddenError("Access denied"));
    }

    next();
  };
};
