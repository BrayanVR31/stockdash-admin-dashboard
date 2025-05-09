import SaleFactory from "@/factories/SaleFactory";

abstract class SaleSeeder {
  private static instance: SaleFactory;

  public static async exec() {
    if (!this.instance) {
      this.instance = new SaleFactory();
    }
    await this.instance.create({ count: 120 });
  }

  public static async down() {
    if (this.instance) {
      await this.instance.bulkDelete();
    }
  }
}

export default SaleSeeder;
