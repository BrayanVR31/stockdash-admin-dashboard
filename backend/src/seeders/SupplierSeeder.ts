import Seeder from "@/seeders/Seeder";
import SupplierFactory from "@/factories/SupplierFactory";

abstract class SupplierSeeder extends Seeder {
  public static async exec() {
    try {
      await SupplierFactory.create({ count: 100 });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }
}

export default SupplierSeeder;
