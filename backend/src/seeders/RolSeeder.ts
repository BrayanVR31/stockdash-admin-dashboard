import Seeder from "@/seeders/Seeder";
import RolFactory from "@/factories/RolFactory";

abstract class RolSeeder extends Seeder {
  private static instance: RolFactory;

  public static async exec() {
    if (!this.instance) {
      this.instance = new RolFactory();
    }
    await this.instance.create({ count: 120 });
  }

  public static async down() {
    if (this.instance) {
      await this.instance.bulkDelete();
    }
  }
}

export default RolSeeder;
