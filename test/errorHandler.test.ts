import { Request, Response, NextFunction } from "express";
import { AppError } from "../api/v1/errors/AppError";
import { errorHandler } from "../api/v1/middleware/errorHandler";

describe("Global Error Handling Middleware", () => {
  it("should format AppError correctly", () => {
    const req = {} as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = {} as NextFunction;

    const error = new AppError("Test error", 400);
    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Test error",
        statusCode: 400,
        timestamp: expect.any(String),
      })
    );
  });

  it("should handle unknown errors as 500", () => {
    const req = {} as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = {} as NextFunction;

    const unknownError = new Error("Something went wrong");
    errorHandler(unknownError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Internal server error",
        statusCode: 500,
        timestamp: expect.any(String),
      })
    );
  });
});
