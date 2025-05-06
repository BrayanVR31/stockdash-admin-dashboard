import Seeder from "@/seeders/Seeder";
import PermissionFactory from "@/factories/Permission";

abstract class PermissionSeeder extends Seeder {
  public static async exec() {
    await PermissionFactory.create({ count: 20 });
  }
}

export default PermissionSeeder;
