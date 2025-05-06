import Seeder from "@/seeders/Seeder";
import CategoryFactory from "@/factories/CategoryFactory";

abstract class CategorySeeder extends Seeder {
  public static async exec() {
    try {
      await CategoryFactory.create({ count: 100 });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }
}

export default CategorySeeder;
