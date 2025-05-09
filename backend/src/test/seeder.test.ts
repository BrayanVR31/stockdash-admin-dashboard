import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import "dotenv/config";
import { Database } from "@/config/database";
import SupplierSeeder from "@/seeders/SupplierSeeder";
import UserSeeder from "@/seeders/UserSeeder";
import { Supplier } from "@/models/supplier";
import { User } from "@/models/user";

beforeAll(async () => {
  Database.getInstance();
  await Database.connect();
  await Database.refreshDB("stockdash");
});

afterAll(async () => {
  Database.getInstance();
  await Database.closeConnection();
  expect(Database.dbStatus()).toEqual("disconnected");
});

describe("Supplier seed", () => {
  it("should insert 120 docs in supplier collection", async () => {
    await SupplierSeeder.exec();
    const suppliers = await Supplier.find({});
    expect(suppliers.length).toBe(120);
  });
  it("should remove 120 docs in supplier collection", async () => {
    await SupplierSeeder.down();
    const suppliers = await Supplier.find({});
    expect(suppliers.length).toBe(0);
  });
});

describe("User seed", () => {
  it("should insert 120 docs in user collection", async () => {
    await UserSeeder.exec();
    const users = await User.find({});
    console.log("array: ", users);
    expect(users?.length).toBe(120);
  }, 15_000);
  it("should remove 120 docs in user collection", async () => {
    await UserSeeder.down();
    const users = await User.find({});
    expect(users?.length).toBe(0);
  });
});
