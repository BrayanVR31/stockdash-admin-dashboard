import { fakerES_MX as faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { FactoryInt, CreateOptions } from "@/types/factory";
import { User } from "@/models/user";
import Factory from "@/factories/Factory";
import AvatarFactory from "@/factories/AvatarFactory";
import { Rol } from "@/models/rol";

class UserFactory implements FactoryInt {
  public async making() {
    const randName = faker.helpers.arrayElement([
      "admin",
      "manager",
      "employee",
    ]);
    const randRol = await Rol.findOne({
      name: randName,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash("faker_isajslibraryPassword", salt);
    return {
      email: faker.internet.email(),
      password: hashedPass,
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
        avatar: AvatarFactory.making(),
      },
      rol: randRol._id,
    };
  }

  public async create({ count }: CreateOptions) {
    try {
      const users = await Promise.all(
        Array.from({ length: count }, () => this.making())
      );
      await User.insertMany(users, {
        ordered: false,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default Factory.define(UserFactory);
