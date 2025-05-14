import Seeder from "@/seeders/Seeder";
import ProductFactory from "@/factories/ProductFactory";

abstract class ProductSeeder extends Seeder {
  private static instance: ProductFactory;

  public static async exec() {
    if (!this.instance) {
      this.instance = new ProductFactory();
    }
    await this.instance.create({ count: 5_500 });
  }

  public static async down() {
    if (this.instance) {
      await this.instance.bulkDelete();
    }
  }
}

export default ProductSeeder;
