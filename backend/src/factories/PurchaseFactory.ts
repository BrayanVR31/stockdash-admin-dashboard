import { fakerES_MX as faker } from "@faker-js/faker";
import { Purchase, IPurchase } from "@/models/purchase";
import Factory from "@/factories/Factory";
import { Types } from "mongoose";
import { Product } from "@/models";
import { IImage } from "@/models/image";
import AvatarFactory from "./AvatarFactory";

class PurchaseFactory extends Factory<IPurchase> {
  private products: Types.ObjectId[] = [];
  private user: string | Types.ObjectId = "";
  private images: IImage[] = [];
  private supplier: Types.ObjectId;

  protected async init() {
    if (this.products.length === 0) {
      const productDocs = await Product.find(
        {},
        {
          _id: 1,
        },
      ).lean();
      this.products = productDocs.map((doc) => doc._id);
    }
    if (!this.user) {
      const userDoc = await Product.findOne(
        {},
        {
          _id: 1,
        },
      ).lean();
      this.user = userDoc._id;
    }
    if (this.images.length === 0) {
      const imgs = new AvatarFactory();
      this.images = Array.from({ length: 30 }, () => imgs.making());
    }
    if (!this.supplier) {
      const supplierDoc = await Product.findOne(
        {},
        {
          _id: 1,
        },
      ).lean();
      this.supplier = supplierDoc._id;
    }
  }

  making() {
    return {
      user: this.user,
      products: faker.helpers.arrayElements(this.products, {
        min: 1,
        max: 5,
      }),
      totalQuantity: faker.number.int({ min: 1, max: 10 }),
      totalPrice: faker.number.float({ min: 100, max: 1000 }),
      purchaseDate: faker.helpers.arrayElement([
        faker.date.past(),
        faker.date.recent(),
        faker.date.future(),
      ]),
      ticketImages: faker.helpers.arrayElements(this.images, {
        min: 1,
        max: 5,
      }),
      supplier: this.supplier,
    };
  }

  protected async save(docs: IPurchase[]): Promise<void> {
    await Purchase.insertMany(docs, { ordered: false });
  }

  protected async delete() {
    await Purchase.deleteMany();
  }
}

export default PurchaseFactory;
