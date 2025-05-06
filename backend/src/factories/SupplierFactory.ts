import { fakerES_MX as faker } from "@faker-js/faker";
import _ from "lodash";
import { FactoryInt, CreateOptions } from "@/types/factory";
import { Supplier } from "@/models/supplier";
import Factory from "@/factories/Factory";
import AvatarFactory from "@/factories/AvatarFactory";

class SupplierFactory implements FactoryInt {
  public making() {
    return {
      name: faker.company.name(),
      address: {
        street: faker.location.streetAddress(),
        state: faker.location.state(),
        zipCode: +faker.location.zipCode("#####"),
        neighborhood: faker.location.direction(),
      },
      contact: {
        phoneNumber: faker.number.int({ min: 10, max: 10 }),
        email: faker.internet.email(),
      },
      socialMedia: faker.helpers.multiple(
        () => ({
          url: faker.internet.url(),
        }),
        { count: { min: 3, max: 6 } }
      ),
      image: AvatarFactory.making(),
    };
  }

  public async create({ count }: CreateOptions) {
    const docs = Array.from({ length: count }, () => this.making());
    try {
      await Supplier.insertMany(docs, {
        ordered: false,
      });
      return true;
    } catch (e) {
      console.log("[supplier] - error: ", e);
      return false;
    }
  }
}

export default Factory.define(SupplierFactory);
