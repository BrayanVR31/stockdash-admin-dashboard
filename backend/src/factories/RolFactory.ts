import { fakerES_MX as faker } from "@faker-js/faker";
import _ from "lodash";
import { FactoryInt, CreateOptions } from "@/types/factory";
import { Rol } from "@/models/rol";
import Factory from "@/factories/Factory";
import Permission from "@/factories/Permission";

class RolFactory implements FactoryInt {
  public making() {
    const randCount = faker.number.int({ min: 3, max: 7 });
    const permissions = Array.from({ length: randCount }, () =>
      Permission.making()
    );
    return {
      name: faker.helpers.arrayElement(["admin", "employee", "manager"]),
      description: faker.lorem.lines({ min: 3, max: 5 }),
      permissions,
    };
  }

  public async create({ count }: CreateOptions) {
    const docs = Array.from({ length: count }, () => this.making());
    const uniqueDocs = _.uniqBy(docs, "name");
    try {
      await Rol.insertMany(uniqueDocs, {
        ordered: false,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default Factory.define(RolFactory);
