import { FactoryInt, CreateOptions } from "@/types/factory";
import { MongooseError } from "mongoose";

abstract class Factory<T> implements FactoryInt<T> {
  abstract making(): Omit<T, "_id" | "createdAt" | "updatedAt" | "deletedAt">;

  protected async init(): Promise<void> {}

  public async create({ count }: CreateOptions): Promise<boolean> {
    try {
      await this.init();
      const docs = Array.from({ length: count }, () => this.making());
      await this.save(docs);
      return true;
    } catch (error) {
      // console.log("Error on factory class: ", error);
      return false;
    }
  }

  public async bulkDelete() {
    try {
      await this.delete();
    } catch (error) {
      console.log("Error on factory class: ", error);
      return false;
    }
  }

  protected abstract save(
    docs: Omit<T, "_id" | "createdAt" | "updatedAt" | "deletedAt">[],
  ): Promise<void>;
  protected abstract delete(): Promise<void>;
}

export default Factory;
