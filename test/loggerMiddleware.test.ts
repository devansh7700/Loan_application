import { loggerMiddleware } from "../src/api/v1/middleware/loggerMiddleware";

describe("Logger Middleware", () => {
  it("should be defined", () => {
    expect(loggerMiddleware).toBeDefined();
  });

  it("should be a function (morgan middleware)", () => {
    expect(typeof loggerMiddleware).toBe("function");
  });
});