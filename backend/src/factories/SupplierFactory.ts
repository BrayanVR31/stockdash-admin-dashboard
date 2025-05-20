import { fakerES_MX as faker } from "@faker-js/faker";
import _ from "lodash";
import { Supplier, ISupplier } from "@/models/supplier";
import Factory from "@/factories/Factory";
import AvatarFactory from "@/factories/AvatarFactory";
import Base from "@/factories/Base";

class SupplierFactory extends Factory<ISupplier> {
  making() {
    const avatar = new AvatarFactory();
    return {
      name: faker.company.name(),
      address: {
        street: faker.location.streetAddress(),
        state: faker.location.state(),
        zipCode: +faker.location.zipCode("#####"),
        neighborhood: faker.location.direction(),
      },
      contact: {
        phoneNumber: faker.number.int({ min: 10, max: 10 }).toString(),
        phoneNumber: faker.number.int({ min: 10, max: 10 }).toString(),
        email: faker.internet.email(),
      },
      socialMedia: faker.helpers.multiple(
        () => ({
          url: faker.internet.url(),
        }),
        { count: { min: 3, max: 6 } },
      ),
      image: avatar.making(),
    };
  }

  protected async save(docs: ISupplier[]): Promise<void> {
    await Supplier.insertMany(docs, { ordered: false });
  }

  protected async delete() {
    await Supplier.deleteMany();
  }
}

export default SupplierFactory;
export default SupplierFactory;
