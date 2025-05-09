import UserFactory from "@/factories/UserFactory";

abstract class UserSeeder {
  private static instance: UserFactory;

  public static async exec() {
    if (!this.instance) {
      this.instance = new UserFactory();
    }
    await this.instance.create({ count: 120 });
  }

  public static async down() {
    if (this.instance) {
      await this.instance.bulkDelete();
    }
  }
}

export default UserSeeder;
