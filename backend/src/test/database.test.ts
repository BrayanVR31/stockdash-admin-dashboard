import { describe, it, expect } from "@jest/globals";
import "dotenv/config";
import { Database } from "@/config/database";

describe("Database class", () => {
  it("should return true when the database connection is success", async () => {
    const isConnected = await Database.connect();
    expect(isConnected).toBeTruthy();
  });
});
