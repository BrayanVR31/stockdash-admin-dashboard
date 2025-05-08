import SupplierFactory from "@/factories/SupplierFactory";

class SupplierSeeder {
  private static supplierFactory: SupplierFactory;
  public static async exec() {
    if (!this.supplierFactory) {
      this.supplierFactory = new SupplierFactory();
    }
    return await this.supplierFactory.create({ count: 120 });
  }

  public static async down() {
    if (!this.supplierFactory) {
      this.supplierFactory = new SupplierFactory();
    }
    await this.supplierFactory.bulkDelete();
    this.supplierFactory = null;
  }
}

export default SupplierSeeder;
