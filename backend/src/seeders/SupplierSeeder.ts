import SupplierFactory from "@/factories/SupplierFactory";

abstract class SupplierSeeder {
  private static instance: SupplierFactory;

  public static async exec() {
    if (!this.instance) {
      this.instance = new SupplierFactory();
    }
    await this.instance.create({ count: 1_000 });
  }

  public static async down() {
    if (this.instance) {
      await this.instance.bulkDelete();
    }
  }
}

export default SupplierSeeder;
