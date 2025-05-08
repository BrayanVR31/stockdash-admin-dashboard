export type CreateOptions = {
  count: number;
};

export interface FactoryInt<T> {
  making: () => Omit<T, "id" | "createdAt" | "updatedAt" | "deletedAt">;
  create: (opts: CreateOptions) => Promise<boolean>;
  bulkDelete: () => Promise<boolean>;
}
