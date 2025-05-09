import PurchaseFactory from "@/factories/PurchaseFactory";

abstract class PurchaseSeeder {
  private static instance: PurchaseFactory;

  public static async exec() {
    if (!this.instance) {
      this.instance = new PurchaseFactory();
    }
    await this.instance.create({ count: 120 });
  }

  public static async down() {
    if (this.instance) {
      await this.instance.bulkDelete();
    }
  }
}

export default PurchaseSeeder;
