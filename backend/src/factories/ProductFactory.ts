import { fakerES_MX as faker } from "@faker-js/faker";
import { FactoryInt, CreateOptions } from "@/types/factory";
import { Product } from "@/models/product";
import Factory from "@/factories/Factory";
import AvatarFactory from "@/factories/AvatarFactory";
import { Supplier } from "@/models/supplier";
import { Category } from "@/models/category";

type RefModel = Record<string, string>;

class ProductFactory implements FactoryInt {
  private suppliers: RefModel[] = [];
  private categories: RefModel[] = [];

  public async init() {
    if (this.suppliers.length === 0) {
      this.suppliers = (await Supplier.find(
        {},
        {
          address: 0,
          contact: 0,
          deletedAt: 0,
          createdAt: 0,
          updatedAt: 0,
          image: 0,
          name: 0,
          socialMedia: 0,
          _id: 1,
        }
      ).lean()) as unknown as RefModel[];
    }

    if (this.categories.length === 0) {
      this.categories = (await Category.find(
        {},
        {
          name: 0,
          _id: 1,
          createdAt: 0,
          updatedAt: 0,
        }
      ).lean()) as unknown as RefModel[];
    }
  }

  public async making() {
    const randSuppliers = faker.helpers.arrayElements(this.suppliers, {
      min: 3,
      max: 7,
    });
    const randCategories = faker.helpers.arrayElements(this.categories, {
      min: 1,
      max: 7,
    });

    return {
      name: faker.commerce.productName(),
      price: {
        purchase: faker.commerce.price({
          min: 50,
          max: 300,
        }),
        sale: faker.commerce.price({
          min: 301,
          max: 500,
        }),
      },
      description: faker.commerce.productDescription(),
      quantity: faker.number.int({ min: 1, max: 200 }),
      status: faker.datatype.boolean(0.75),
      images: faker.helpers.multiple(() => AvatarFactory.making()),
      suppliers: randSuppliers.map((doc) => doc._id),
      categories: randCategories.map((doc) => doc._id),
    };
  }

  public async create({ count }: CreateOptions) {
    try {
      await this.init();
      await Product.insertMany(
        Array.from({ length: count }, () => this.making()),
        {
          ordered: false,
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default Factory.define(ProductFactory);
