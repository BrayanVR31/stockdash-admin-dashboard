import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import "dotenv/config";
import { Database } from "@/config/database";
import SupplierSeeder from "@/seeders/SupplierSeeder";
import UserSeeder from "@/seeders/UserSeeder";
import ProductSeeder from "@/seeders/ProductSeeder";
import { Supplier } from "@/models/supplier";
import { User } from "@/models/user";
import { Product } from "@/models/product";
import CategorySeeder from "@/seeders/CategorySeeder";

const testTimeout = 75_000;

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
  it(
    "should insert 120 docs in supplier collection",
    async () => {
      await SupplierSeeder.exec();
      const suppliers = await Supplier.find({});
      expect(suppliers.length).toBe(120);
    },
    testTimeout,
  );
  it(
    "should remove 120 docs in supplier collection",
    async () => {
      await SupplierSeeder.down();
      const suppliers = await Supplier.find({});
      expect(suppliers.length).toBe(0);
    },
    testTimeout,
  );
});

describe("User seed", () => {
  it(
    "should insert 120 docs in user collection",
    async () => {
      await UserSeeder.exec();
      const users = await User.find({});
      expect(users?.length).toBe(120);
    },
    testTimeout,
  );
  it(
    "should remove 120 docs in user collection",
    async () => {
      await UserSeeder.down();
      const users = await User.find({});
      expect(users?.length).toBe(0);
    },
    testTimeout,
  );
});

describe("Product seed", () => {
  it(
    "should insert 120 docs in product collection",
    async () => {
      await CategorySeeder.exec();
      await SupplierSeeder.exec();
      await ProductSeeder.exec();
      const products = await Product.find({});
      expect(products?.length).toBe(120);
    },
    testTimeout,
  );
  it(
    "should remove 120 docs in product collection",
    async () => {
      await ProductSeeder.down();
      const products = await Product.find({});
      expect(products?.length).toBe(0);
    },
    testTimeout,
  );
});
