export type CreateOptions = {
  count: number;
};

export interface FactoryInt<T> {
  making: () => T | Omit<T, "_id" | "createdAt" | "updatedAt" | "deletedAt">;
  create: (opts: CreateOptions) => Promise<boolean>;
}
