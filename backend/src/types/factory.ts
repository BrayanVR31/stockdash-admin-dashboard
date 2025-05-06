export type CreateOptions = {
  count: number;
};

export interface FactoryInt {
  making: () => Record<string, any>;
  create: (opts: CreateOptions) => Promise<boolean>;
}
