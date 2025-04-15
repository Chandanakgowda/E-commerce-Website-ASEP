import request from "supertest";
import app from "./main.js";

describe("GET /", () => {
  it("should return API is working", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("API is working");
  });
});