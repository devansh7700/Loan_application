import { assignUserRole, getUserRole } from "../src/api/v1/controllers/roleController";
import admin from "../src/config/firebase";

// ✅ Mock Firebase Admin SDK
jest.mock("../src/config/firebase", () => ({
  auth: jest.fn(() => ({
    setCustomUserClaims: jest.fn(),
    getUser: jest.fn(),
  })),
}));

describe("Firebase Custom Claims (Roles)", () => {
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it("should assign a role successfully", async () => {
    const mockSetClaims = jest.fn().mockResolvedValue(undefined);
    (admin.auth as jest.Mock).mockReturnValue({ setCustomUserClaims: mockSetClaims });

    const req: any = { body: { uid: "user123", role: "officer" } };
    const res = mockResponse();

    await assignUserRole(req, res, jest.fn());

    expect(mockSetClaims).toHaveBeenCalledWith("user123", { role: "officer" });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should handle missing uid or role", async () => {
    const req: any = { body: { uid: "", role: "" } };
    const res = mockResponse();

    await assignUserRole(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "UID and role are required" })
    );
  });

  it("should retrieve a user’s role successfully", async () => {
    const mockGetUser = jest.fn().mockResolvedValue({
      uid: "123",
      customClaims: { role: "reviewer" },
    });
    (admin.auth as jest.Mock).mockReturnValue({ getUser: mockGetUser });

    const req: any = { params: { uid: "123" } };
    const res = mockResponse();

    await getUserRole(req, res, jest.fn());

    expect(mockGetUser).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      uid: "123",
      role: "reviewer",
    });
  });

  it("should handle missing uid when getting user role", async () => {
    const req: any = { params: { uid: "" } };
    const res = mockResponse();

    await getUserRole(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "UID is required" })
    );
  });
});
