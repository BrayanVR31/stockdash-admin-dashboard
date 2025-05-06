class Factory {
  public static define<T>(classRef: new () => T) {
    let instance: T;
    if (!instance) {
      instance = new classRef();
    }
    return instance;
  }
}

export default Factory;
