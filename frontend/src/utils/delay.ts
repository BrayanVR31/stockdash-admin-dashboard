const delay = <T>(promise: Promise<T>, ms: number = 360) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  }).then(() => promise);

export default delay;
