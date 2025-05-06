import UserSeeder from "@/seeders/UserSeeder";
import RolSeeder from "@/seeders/RolSeeder";
import CategorySeeder from "@/seeders/CategorySeeder";
import SupplierSeeder from "@/seeders/SupplierSeeder";
import ProductSeeder from "@/seeders/ProductSeeder";

abstract class DocFactory {
  public static async run() {
    await RolSeeder.exec();
    await CategorySeeder.exec();
    await SupplierSeeder.exec();
    await ProductSeeder.exec();
    await UserSeeder.exec();
  }
}

export default DocFactory;
