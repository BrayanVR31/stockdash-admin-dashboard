import Seeder from "@/seeders/Seeder";
import CategoryFactory from "@/factories/CategoryFactory";

abstract class CategorySeeder {
  private static instance: CategoryFactory;

  public static async exec() {
    if (!this.instance) {
      this.instance = new CategoryFactory();
    }
    await this.instance.create({ count: 60 });
  }

  public static async down() {
    if (this.instance) {
      await this.instance.bulkDelete();
    }
  }
}

export default CategorySeeder;
