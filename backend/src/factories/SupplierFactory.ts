import { fakerES_MX as faker } from "@faker-js/faker";
import _ from "lodash";
import { FactoryInt, CreateOptions } from "@/types/factory";
import { Supplier, ISupplier } from "@/models/supplier";
import Factory from "@/factories/Factory";
import AvatarFactory from "@/factories/AvatarFactory";
import Base from "@/factories/Base";

class SupplierFactory extends Base<ISupplier> {
  making() {
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
      return false;
    }
  }

  protected async save(
    docs: Omit<ISupplier, "id" | "createdAt" | "updatedAt" | "deletedAt">[]
  ): Promise<void> {
    try {
      await Supplier.insertMany(docs, {
        ordered: false,
      });
    } catch (error) {
      console.error("Error creating documents:", error);
      throw error;
    }
  }

  protected async delete(): Promise<void> {
    try {
      await Supplier.deleteMany({});
    } catch (error) {
      console.error("Error deleting documents:", error);
      throw error;
    }
  }

  public async bulkDelete() {
    try {
      this.delete();
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default SupplierFactory;
