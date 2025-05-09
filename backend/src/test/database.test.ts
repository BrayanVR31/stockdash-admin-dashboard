import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import "dotenv/config";
import { Database } from "@/config/database";

beforeAll(async () => {
  Database.getInstance();
  await Database.connect();
});

afterAll(async () => {
  Database.getInstance();
  await Database.closeConnection();
  expect(Database.dbStatus()).toEqual("disconnected");
});

describe("Database class connection", () => {
  it("should return a connected status when db credentials are valid", () => {
    expect(Database.dbStatus()).toEqual("connected");
  });
  it("should disconnect the current db connection and return 'disconnected' status", async () => {
    expect.assertions(1);
    try {
      await Database.closeConnection();
      expect(Database.dbStatus()).toEqual("disconnected");
    } catch (e) {}
  });
  it("should return true if the database was refreshed", async () => {
    await Database.connect();
    const isRefreshed = await Database.refreshDB("stockdash");
    expect(isRefreshed).toBeTruthy();
  });
});
