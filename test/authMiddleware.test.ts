import { authMiddleware } from "../src/api/v1/middleware/authMiddleware";
import admin from "../src/config/firebase";
import { AppError } from "../src/api/v1/errors/AppError";
import { HTTP_STATUS } from "../src/constants/httpStatus";

jest.mock("../src/config/firebase", () => ({
  auth: jest.fn(() => ({
    verifyIdToken: jest.fn(),
  })),
}));

describe("Authentication Middleware", () => {
  const mockNext = jest.fn();
  const mockRequest = (token?: string) => ({
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });
  const mockResponse: any = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should authenticate valid token", async () => {
    const mockVerify = jest.fn().mockResolvedValue({ uid: "user123" });
    (admin.auth as jest.Mock).mockReturnValue({ verifyIdToken: mockVerify });

    const req: any = mockRequest("validToken");

    await authMiddleware(req, mockResponse, mockNext);

    expect(mockVerify).toHaveBeenCalledWith("validToken");
    expect(req.user.uid).toBe("user123");
    expect(mockNext).toHaveBeenCalled();
  });

  it("should handle missing token", async () => {
    const req: any = mockRequest();
    await authMiddleware(req, mockResponse, mockNext);

    const error = mockNext.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
    expect(error.message).toBe("Missing or invalid authorization header");
  });

  it("should handle invalid token", async () => {
    const mockVerify = jest.fn().mockRejectedValue(new Error("Invalid token"));
    (admin.auth as jest.Mock).mockReturnValue({ verifyIdToken: mockVerify });

    const req: any = mockRequest("badToken");

    await authMiddleware(req, mockResponse, mockNext);

    const error = mockNext.mock.calls[0][0] as AppError;
    expect(error.message).toBe("Authentication failed");
  });

});
