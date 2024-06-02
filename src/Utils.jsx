class Utils {
  static copyObjectWith(currentObject, diff) {
    const obj = structuredClone(currentObject);

    const keys = Object.keys(diff);

    keys.forEach(key => {
      obj[key] = diff[key];
    });

    return obj;
  }
}

export default Utils;
