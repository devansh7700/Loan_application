import { authorize } from "../src/api/v1/middleware/authorizationMiddleware";
import { UnauthorizedError, ForbiddenError } from "../src/api/v1/errors/AppError";

describe("Authorization Middleware", () => {
  const mockNext = jest.fn();
  const mockRes = {};

  beforeEach(() => mockNext.mockClear());

  it("allows access for valid role", () => {
    const req: any = { user: { uid: "1", role: "admin" } };
    authorize({ roles: ["admin", "officer"] })(req, mockRes as any, mockNext);
    expect(mockNext).toHaveBeenCalledWith(); // no error
  });

  it("denies access for insufficient role", () => {
    const req: any = { user: { uid: "1", role: "user" } };
    authorize({ roles: ["admin"] })(req, mockRes as any, mockNext);
    expect(mockNext).toHaveBeenCalledWith(expect.any(ForbiddenError));
  });

  it("allows same-user access when enabled", () => {
    const req: any = { user: { uid: "123", role: "user" }, params: { id: "123" } };
    authorize({ roles: ["admin"], allowSameUser: true })(req, mockRes as any, mockNext);
    expect(mockNext).toHaveBeenCalledWith(); // allowed since same user
  });

  it("throws UnauthorizedError when no user attached", () => {
    const req: any = {};
    authorize({ roles: ["admin"] })(req, mockRes as any, mockNext);
    expect(mockNext).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });
});
