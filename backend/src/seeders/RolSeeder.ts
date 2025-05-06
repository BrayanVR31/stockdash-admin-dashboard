import Seeder from "@/seeders/Seeder";
import RolFactory from "@/factories/RolFactory";

abstract class RolSeeder extends Seeder {
  public static async exec() {
    try {
      await RolFactory.create({ count: 30 });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }
}

export default RolSeeder;
