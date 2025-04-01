export interface GenericObject {
  [key: string]: any;
}

const getDeepValueFromObj = <T extends GenericObject>(
  object: T,
  ...keys: string[]
) => {
  return keys.reduce((prev, current) => prev?.[current] || null, object);
};

const getDeepValues = <T extends GenericObject>(
  object: T,
  ...keys: string[]
) => {
  const parsedKeys = keys.map((key) =>
    key
      .replace(/(\[|\]|\.)/g, " ")
      .split(" ")
      .filter((key) => key.length !== 0)
  );
  return parsedKeys.map((key) => getDeepValueFromObj(object, ...key));
};

export { getDeepValues, getDeepValueFromObj };
