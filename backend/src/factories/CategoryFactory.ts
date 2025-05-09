import { fakerES_MX as faker } from "@faker-js/faker";
import { Category, ICategory } from "@/models/category";
import Factory from "@/factories/Factory";

class CategoryFactory extends Factory<ICategory> {
  public making() {
    return {
      name: faker.commerce.productAdjective(),
    };
  }

  protected async save(docs: ICategory[]): Promise<void> {
    await Category.insertMany(docs, { ordered: false });
  }

  protected async delete() {
    await Category.deleteMany();
  }
}

export default CategoryFactory;
