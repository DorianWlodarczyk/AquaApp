function convertKeysToCamelCase<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item)) as any;
  }

  const camelCaseObj: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_match, letter) => {
        return letter.toUpperCase();
      });
      camelCaseObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
    }
  }

  return camelCaseObj as T;
}
export default convertKeysToCamelCase;
