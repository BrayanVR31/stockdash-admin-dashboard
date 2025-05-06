import { fakerES_MX as faker } from "@faker-js/faker";
import _ from "lodash";
import { FactoryInt, CreateOptions } from "@/types/factory";
import { Category } from "@/models/category";
import Factory from "@/factories/Factory";

class CategoryFactory implements FactoryInt {
  public making() {
    return {
      name: faker.commerce.productAdjective(),
    };
  }

  public async create({ count }: CreateOptions) {
    const docs = Array.from({ length: count }, () => this.making());
    const uniqueDocs = _.uniqBy(docs, "name");
    try {
      await Category.insertMany(uniqueDocs, {
        ordered: false,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default Factory.define(CategoryFactory);
