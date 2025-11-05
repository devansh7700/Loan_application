import { NotFoundError, ForbiddenError, BadRequestError, UnauthorizedError } from "../src/api/v1/errors/AppError";

import { HTTP_STATUS } from "../src/constants/httpStatus";

describe("Custom Error Classes", () => {
  it("NotFoundError should have correct message and status", () => {
    const error = new NotFoundError("Loan not found");
    expect(error.message).toBe("Loan not found");
    expect(error.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(error.isOperational).toBe(true);
  });

  it("BadRequestError should have correct message and status", () => {
    const error = new BadRequestError("Invalid request");
    expect(error.message).toBe("Invalid request");
    expect(error.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(error.isOperational).toBe(true);
  });

  it("UnauthorizedError should have correct message and status", () => {
    const error = new UnauthorizedError();
    expect(error.message).toBe("Unauthorized");
    expect(error.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
  });

  it("ForbiddenError should have correct message and status", () => {
    const error = new ForbiddenError();
    expect(error.message).toBe("Forbidden");
    expect(error.statusCode).toBe(HTTP_STATUS.FORBIDDEN);
  });
});
