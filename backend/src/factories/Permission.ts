import { fakerES_MX as faker } from "@faker-js/faker";
import Factory from "@/factories/Factory";
import { Permission, IPermission } from "@/models/permission";

class PermissionFactory extends Factory<IPermission> {
  public making() {
    return {
      title: faker.lorem.sentence({ min: 3, max: 6 }),
      action: faker.helpers.arrayElement([
        "create",
        "read",
        "update",
        "delete",
      ]),
      description: faker.lorem.lines({ min: 1, max: 3 }),
      resource: faker.helpers.arrayElement([
        "Category",
        "Supplier",
        "User",
        "Permission",
        "Rol",
        "Purchase",
        "Sale",
        "Product",
      ]),
    };
  }

  protected async save(docs: IPermission[]): Promise<void> {
    await Permission.insertMany(docs, { ordered: false });
  }

  protected async delete() {
    await Permission.deleteMany();
  }
}

export default PermissionFactory;
