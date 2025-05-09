import UserSeeder from "@/seeders/UserSeeder";
import RolSeeder from "@/seeders/RolSeeder";
import CategorySeeder from "@/seeders/CategorySeeder";
import SupplierSeeder from "@/seeders/SupplierSeeder";
import ProductSeeder from "@/seeders/ProductSeeder";
import SaleSeeder from "@/seeders/SaleSeeder";
import PurchaseSeeder from "@/seeders/PurchaseSeeder";

abstract class DocFactory {
  public static async run() {
    await RolSeeder.exec();
    await CategorySeeder.exec();
    await SupplierSeeder.exec();
    await ProductSeeder.exec();
    await UserSeeder.exec();
    await SaleSeeder.exec();
    await PurchaseSeeder.exec();
  }
}

export default DocFactory;
