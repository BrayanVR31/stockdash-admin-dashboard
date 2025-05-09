import { fakerES_MX as faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { Product, IProduct } from "@/models/product";
import Factory from "@/factories/Factory";
import AvatarFactory from "@/factories/AvatarFactory";
import { Supplier } from "@/models/supplier";
import { Category } from "@/models/category";
import { Image, IImage } from "@/models/image";

class ProductFactory extends Factory<IProduct> {
  private suppliers: Types.ObjectId[] = [];
  private categories: Types.ObjectId[] = [];
  private images: IImage[] = [];

  protected async init() {
    if (this.suppliers.length === 0) {
      const supplierDocs = await Supplier.find(
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
        },
      ).lean();
      this.suppliers = supplierDocs.map((doc) => doc._id);
    }
    if (this.categories.length === 0) {
      const categoryDocs = await Category.find(
        {},
        {
          name: 0,
          _id: 1,
          createdAt: 0,
          updatedAt: 0,
        },
      ).lean();
      this.categories = categoryDocs.map((doc) => doc._id);
    }
    if (!this.images) {
      const imgs = new AvatarFactory();
      this.images = Array.from({ length: 50 }, () => imgs.making());
    }
  }

  making() {
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
        purchase: +faker.commerce.price({
          min: 50,
          max: 300,
        }),
        sale: +faker.commerce.price({
          min: 301,
          max: 500,
        }),
      },
      description: faker.commerce.productDescription(),
      quantity: faker.number.int({ min: 1, max: 200 }),
      status: faker.datatype.boolean(0.75),
      images: faker.helpers.arrayElements(this.images),
      suppliers: randSuppliers,
      categories: randCategories,
    };
  }

  protected async save(docs: IProduct[]): Promise<void> {
    await Product.insertMany(docs, { ordered: false });
  }

  protected async delete() {
    await Product.deleteMany();
  }
}

export default ProductFactory;
