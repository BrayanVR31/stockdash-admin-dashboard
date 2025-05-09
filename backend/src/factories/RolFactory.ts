import { fakerES_MX as faker } from "@faker-js/faker";
import { Rol, IRol } from "@/models/rol";
import Factory from "@/factories/Factory";
import PermissionFactory from "@/factories/Permission";
import { Permission, IPermission } from "@/models/permission";

class RolFactory extends Factory<IRol> {
  private permissions: IPermission[] = [];

  protected async init() {
    if (this.permissions.length === 0) {
      await new PermissionFactory().create({ count: 80 });
      const permissionDocs = await Permission.find({}).lean();
      this.permissions = permissionDocs;
    }
  }

  public making() {
    return {
      name: faker.helpers.arrayElement(["admin", "employee", "manager"]),
      description: faker.lorem.lines({ min: 3, max: 5 }),
      permissions: this.permissions,
    };
  }

  protected async save(docs: IRol[]): Promise<void> {
    await Rol.insertMany(docs, { ordered: false });
  }

  protected async delete() {
    await Rol.deleteMany();
  }
}

export default RolFactory;
