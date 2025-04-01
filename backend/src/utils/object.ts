interface BaseObject {
  [key: string]: any;
}

/**
 * Check if at least the targeted object has
 * one or more keys from compared object.
 */
const hasSomeKeys = (comparedObj: BaseObject, targetedObj: BaseObject) => {
  if (
    typeof targetedObj === "undefined" ||
    targetedObj === null ||
    typeof targetedObj !== "object"
  )
    return false;
  return Object.keys(comparedObj).some((key) => targetedObj?.[key]);
};

const isObject = (object: BaseObject) => {
  return typeof object === "object" && object !== null;
};

const cloneObject = (templateObject: BaseObject) => {
  const clonedObject = Object.create({});

  function mergeObject(object: BaseObject) {
    for (const key in templateObject) {
      console.log("iteration: ", templateObject);
      // Deep nested level object's key
      if (isObject(templateObject[key])) {
        console.log(templateObject[key]);
        //mergeObject(templateObject[key]);
      }
      // First level object's key
      else clonedObject[key] = object[key] || templateObject[key];
    }
    return clonedObject;
  }
  return { mergeObject };
};

export { cloneObject };
