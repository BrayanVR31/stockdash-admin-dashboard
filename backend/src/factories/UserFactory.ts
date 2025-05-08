import { fakerES_MX as faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { FactoryInt, CreateOptions } from "@/types/factory";
import { User } from "@/models/user";
import Factory from "@/factories/Factory";
import AvatarFactory from "@/factories/AvatarFactory";
import { Rol } from "@/models/rol";

class UserFactory implements FactoryInt {
  private roles: Record<string, string> = {};
  private hashedPass: string = "";

  private async init() {
    if (!this.hashedPass) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash("faker_isajslibraryPassword", salt);
      this.hashedPass = hashedPass;
    }

    const countRoles = Object.keys(this.roles).length;
    if (countRoles === 0) {
      const roles = await Rol.find({});
      roles.forEach((rol) => {
        this.roles[rol.name] = rol._id.toString();
      });
    }
  }

  public async making() {
    const randRol = faker.helpers.arrayElement([
      "admin",
      "manager",
      "employee",
    ]);

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
        avatar: AvatarFactory.making(),
      },
      rol: this.roles[randRol],
    };
  }

  public async create({ count }: CreateOptions) {
    try {
      await this.init();
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
