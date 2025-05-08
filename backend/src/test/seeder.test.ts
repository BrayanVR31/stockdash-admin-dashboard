import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";
import "dotenv/config";
import { Database } from "@/config/database";
import UserSeeder from "@/seeders/UserSeeder";
import ProductSeeder from "@/seeders/ProductSeeder";
import CategorySeeder from "@/seeders/CategorySeeder";
import SupplierSeeder from "@/seeders/SupplierSeeder";
import { User } from "@/models/user";
import { Product } from "@/models/product";
import { Supplier } from "@/models/supplier";

beforeAll(async () => {
  Database.getInstance();
  await Database.connect();
  await Database.refreshDB("stockdash");
});

afterAll(async () => {
  await Database.closeConnection();
});

describe("Seeder", () => {
  it("should seed 120 user docs on database", async () => {
    await UserSeeder.exec();
    const users = await User.find({});
    expect(users.length).toBe(120);
  }, 200_000);
  it("should seed 120 product docs on database", async () => {
    await CategorySeeder.exec();
    await SupplierSeeder.exec();
    await ProductSeeder.exec();
    const products = await User.find({});
    expect(products.length).toBe(120);
    await SupplierSeeder.down();
  }, 200_000);
  it("should remove all supplier docs on database", async () => {
    await SupplierSeeder.exec();
    const created = await Supplier.find({});
    console.log("length data: ", created.length);
    await SupplierSeeder.down();
    const deleted = await Supplier.find({});
    console.log("length data: ", deleted.length);
    expect(deleted.length).toBe(0);
  }, 200_000);
  /*
  it("should seed 120 supplier docs on database", async () => {
    // await SupplierSeeder.exec();
    const suppliers = await Supplier.find({});
    console.log(suppliers);
    expect(suppliers.length).toBe(120);
  }, 200_000);
  */
});
