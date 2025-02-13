const delay = <T>(promise: Promise<T>, ms: number = 1200) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  }).then(() => promise);

export default delay;
