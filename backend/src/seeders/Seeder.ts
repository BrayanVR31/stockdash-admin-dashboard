import Factory from "@/factories/Factory";

class Seeder<T> {
  public factory: T;

  public constructor() {
    this.factory = Factory.define(this.constructor as new () => T);
  }
  public static exec: () => Promise<void | boolean>;
  public static down: () => Promise<void | boolean>;
  public static init: () => void;
}

export default Seeder;
