import { FactoryInt, CreateOptions } from "@/types/factory";

abstract class BaseFactory<T> implements FactoryInt<T> {
  abstract making(): Omit<T, "id" | "createdAt" | "updatedAt" | "deletedAt">;

  public async create({ count }: CreateOptions): Promise<boolean> {
    const docs = Array.from({ length: count }, () => this.making());
    try {
      await this.save(docs);
      return true;
    } catch (error) {
      console.error("Error creating documents:", error);
      return false;
    }
  }

  public async bulkDelete(): Promise<boolean> {
    try {
      await this.delete();
      return true;
    } catch (error) {
      console.error("Error deleting documents:", error);
      return false;
    }
  }

  protected abstract save(
    docs: Omit<T, "id" | "createdAt" | "updatedAt" | "deletedAt">[]
  ): Promise<void>;
  protected abstract delete(): Promise<void>;
}
export default BaseFactory;
