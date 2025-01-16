/**
 * This function simulate an artificial delay
 * in a promise
 */
function delayPromise(time: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * This function add some delay
 * on mutation execution
 */
const delayedMutation = async ({ promise }: DelayedMutationArgs) => {
  await delayPromise();
  return promise;
};

interface DelayedMutationArgs {
  promise: Promise<unknown>;
}

export { delayedMutation };
