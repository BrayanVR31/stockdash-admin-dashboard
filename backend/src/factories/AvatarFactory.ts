import { fakerES_MX as faker } from "@faker-js/faker";
import { FactoryInt, CreateOptions } from "@/types/factory";
import { Image } from "@/models/image";
import Factory from "@/factories/Factory";

class AvatarFactory implements FactoryInt {
  public making() {
    return {
      path: faker.image.avatar(),
      extension: faker.system.fileExt("image/png"),
      size: faker.number.int({ min: 0, max: 1 * 1_024 * 1_024 }),
      refId: faker.database.mongodbObjectId(),
    };
  }

  public async create({ count }: CreateOptions) {
    const docs = Array.from({ length: count }, () => this.making());
    await Image.insertMany(docs);
    return true;
  }
}

export default Factory.define(AvatarFactory);
