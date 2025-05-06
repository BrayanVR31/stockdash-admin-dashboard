import Seeder from "@/seeders/Seeder";
import UserFactory from "@/factories/UserFactory";

abstract class UserSeeder extends Seeder {
  public static async exec() {
    try {
      await UserFactory.create({ count: 120 });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }
}

export default UserSeeder;
