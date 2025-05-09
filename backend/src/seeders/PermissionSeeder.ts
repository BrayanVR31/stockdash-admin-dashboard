import Seeder from "@/seeders/Seeder";
import PermissionFactory from "@/factories/Permission";

abstract class PermissionSeeder extends Seeder {
  private static instance: PermissionFactory;

  public static async exec() {
    if (!this.instance) {
      this.instance = new PermissionFactory();
    }
    await this.instance.create({ count: 90 });
  }

  public static async down() {
    if (this.instance) {
      await this.instance.bulkDelete();
    }
  }
}

export default PermissionSeeder;
