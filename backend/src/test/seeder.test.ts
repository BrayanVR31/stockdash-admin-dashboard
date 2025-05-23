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
import PurchaseSeeder from "@/seeders/PurchaseSeeder";
import SaleSeeder from "@/seeders/SaleSeeder";
import { Sale } from "@/models/sale";
import { Purchase } from "@/models/purchase";

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

describe("Sale seed", () => {
  it(
    "should insert 120 docs in sale collection",
    async () => {
      await UserSeeder.exec();
      await SupplierSeeder.exec();
      await ProductSeeder.exec();
      await SaleSeeder.exec();
      const sales = await Sale.find({});
      expect(sales?.length).toBe(120);
    },
    testTimeout,
  );
  it("should remove 120 docs in sale collection", async () => {
    await SaleSeeder.down();
    const sales = await Sale.find({});
    expect(sales?.length).toBe(0);
  });
});

describe("Purchase seed", () => {
  it(
    "should insert 120 docs in purchase collection",
    async () => {
      await UserSeeder.exec();
      await SupplierSeeder.exec();
      await ProductSeeder.exec();
      await PurchaseSeeder.exec();
      const purchases = await Purchase.find({});
      expect(purchases?.length).toBe(120);
    },
    testTimeout,
  );
  it("should remove 120 docs in purchase collection", async () => {
    await PurchaseSeeder.down();
    const purchases = await Purchase.find({});
    expect(purchases?.length).toBe(0);
  });
});
