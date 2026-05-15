import { SELF } from "cloudflare:test";
import { describe, it, expect } from "vitest";

// SELF is imported directly from cloudflare:test in newer versions of the pool

describe("Users API", () => {
  it("P0: GET /users should return a list of users", async () => {
    const res = await SELF.fetch("http://example.com/users");
    expect(res.status).toBe(200);

    const body = await res.json() as any;
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it("P0: POST /users should create a new user", async () => {
    const res = await SELF.fetch("http://example.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
      }),
    });
    expect(res.status).toBe(201);

    const body = await res.json() as any;
    expect(body.success).toBe(true);
    expect(body.data.name).toBe("Test User");
  });

  it("P1: POST /users should fail with invalid email", async () => {
    const res = await SELF.fetch("http://example.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "invalid-email",
      }),
    });
    expect(res.status).toBe(400);

    const body = await res.json() as any;
    expect(body.success).toBe(false);
  });
});
