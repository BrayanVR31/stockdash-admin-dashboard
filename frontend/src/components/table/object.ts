export interface GenericObject {
  [key: string]: any;
}

const getDeepValueFromObj = <T extends GenericObject>(
  object: T,
  key: string
) => {
  // Handle dot notation in the key (e.g., "contact.email")
  const keyParts = key.split(".");

  return keyParts.reduce((prev, current) => {
    if (prev === null || prev === undefined) return null;
    return prev[current];
  }, object);
};

const getDeepValues = <T extends GenericObject>(
  object: T,
  ...keys: string[]
) => {
  return keys.map((key) => getDeepValueFromObj(object, key));
};

export { getDeepValues, getDeepValueFromObj };
