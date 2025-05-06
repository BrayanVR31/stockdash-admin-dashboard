import Seeder from "@/seeders/Seeder";
import ProductFactory from "@/factories/ProductFactory";

abstract class ProductSeeder extends Seeder {
  public static async exec() {
    try {
      await ProductFactory.create({ count: 5 });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }
}

export default ProductSeeder;
