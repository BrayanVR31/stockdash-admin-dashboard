import { fakerES_MX as faker } from "@faker-js/faker";
import { Sale, ISale } from "@/models/sale";
import { User } from "@/models/user";
import Factory from "@/factories/Factory";
import { Types } from "mongoose";
import { Product } from "@/models";

class SaleFactory extends Factory<ISale> {
  private products: Types.ObjectId[] = [];
  private user: string | Types.ObjectId;

  protected async init() {
    if (this.products.length === 0) {
      const productDocs = await Product.find(
        {},
        {
          _id: 1,
        }
      )
        .limit(15)
        .lean();
      this.products = productDocs.map((doc) => doc._id);
    }
    if (!this.user) {
      const userDoc = await User.findOne(
        {},
        {
          _id: 1,
        }
      );
      this.user = userDoc._id;
    }
  }

  public making() {
    return {
      products: faker.helpers.arrayElements(this.products),
      totalAmount: faker.number.int({ min: 100, max: 1000 }),
      saleDate: faker.helpers.arrayElement([
        faker.date.past(),
        faker.date.recent(),
        faker.date.future(),
      ]),
      user: this.user,
      status: faker.helpers.arrayElement(["completed", "pending", "canceled"]),
    };
  }

  protected async save(docs: ISale[]): Promise<void> {
    await Sale.insertMany(docs, { ordered: false });
  }

  protected async delete() {
    await Sale.deleteMany();
  }
}

export default SaleFactory;
