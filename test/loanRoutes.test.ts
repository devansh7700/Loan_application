import request from "supertest";
import app from "../src/app";

describe("High-Risk Loan API Endpoints", () => {

  it("GET /api/v1/loans - should return list of loans", async () => {
    const res = await request(app).get("/api/v1/loans");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("List of all loan applications.");
  });

  it("POST /api/v1/loans - should create a new loan", async () => {
    const res = await request(app).post("/api/v1/loans").send({});
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Loan application created successfully.");
  });

  it("GET /api/v1/loans/:id - should return loan details", async () => {
    const res = await request(app).get("/api/v1/loans/123");
    expect(res.status).toBe(200);
    expect(res.body.message).toContain("123");
  });

  it("PUT /api/v1/loans/:id/approve - should approve loan", async () => {
    const res = await request(app).put("/api/v1/loans/123/approve");
    expect(res.status).toBe(200);
    expect(res.body.message).toContain("approved");
  });

  it("PUT /api/v1/loans/:id/reject - should reject loan", async () => {
    const res = await request(app).put("/api/v1/loans/123/reject");
    expect(res.status).toBe(200);
    expect(res.body.message).toContain("rejected");
  });

});
