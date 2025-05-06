import { fakerES_MX as faker } from "@faker-js/faker";
import { FactoryInt, CreateOptions } from "@/types/factory";
import Factory from "@/factories/Factory";
import { Permission } from "@/models/permission";

class PermissionFactory implements FactoryInt {
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

  public async create({ count }: CreateOptions) {
    const docs = Array.from({ length: count }, () => this.making());
    await Permission.insertMany(docs);
    return true;
  }
}

export default Factory.define(PermissionFactory);
