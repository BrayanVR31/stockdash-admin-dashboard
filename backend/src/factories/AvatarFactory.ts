import { fakerES_MX as faker } from "@faker-js/faker";
import { Image, IImage } from "@/models/image";
import Factory from "@/factories/Factory";

class AvatarFactory extends Factory<IImage> {
  public making() {
    return {
      path: faker.image.avatar(),
      extension: faker.system.fileExt("image/png"),
      size: faker.number.int({ min: 0, max: 1 * 1_024 * 1_024 }),
      refId: faker.database.mongodbObjectId(),
    };
  }

  protected async save(docs: IImage[]): Promise<void> {
    await Image.insertMany(docs, { ordered: false });
  }

  protected async delete() {
    await Image.deleteMany();
  }
}

export default AvatarFactory;
