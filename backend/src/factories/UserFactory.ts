import { fakerES_MX as faker } from "@faker-js/faker";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import { User, IUser } from "@/models/user";
import Factory from "@/factories/Factory";
import AvatarFactory from "@/factories/AvatarFactory";
import { Rol } from "@/models/rol";
import { Image, IImage } from "@/models/image";

class UserFactory extends Factory<IUser> {
  private roles: (string | Types.ObjectId)[] = [];
  private hashedPass: string = "";
  private images: IImage[] = [];

  private async init() {
    if (this.roles.length === 0) {
      const rolDocs = await Rol.find(
        {},
        {
          address: 0,
          contact: 0,
          deletedAt: 0,
          createdAt: 0,
          updatedAt: 0,
          image: 0,
          name: 0,
          socialMedia: 0,
          _id: 1,
        },
      ).lean();
      this.roles = rolDocs.map((doc) => doc._id);
    }
    if (!this.hashedPass) {
      const salt = await bcrypt.genSalt(10);
      this.hashedPass = await bcrypt.hash("faker_isajslibraryPassword", salt);
    }
    if (this.images.length === 0) {
      const avatar = new AvatarFactory();
      this.images = Array.from({ length: 50 }, () => avatar.making());
    }
  }

  making() {
    return {
      email: faker.internet.email(),
      password: this.hashedPass,
      status: faker.datatype.boolean(0.75),
      username: faker.internet.username(),
      profile: {
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: faker.string.numeric(10),
        address: {
          city: faker.location.city(),
          country: faker.location.country(),
          state: faker.location.state(),
          street: faker.location.streetAddress(),
          zipCode: +faker.location.zipCode("#####"),
        },
        avatar: faker.helpers.arrayElement(this.images),
      },
      rol: faker.helpers.arrayElement(this.roles),
    };
  }

  protected async save(docs: IUser[]): Promise<void> {
    await this.init();
    await User.insertMany(docs, { ordered: false });
  }

  protected async delete() {
    await User.deleteMany();
  }
}

export default UserFactory;
