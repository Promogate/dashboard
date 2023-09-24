export function makeUniqueStoreName(value: string | undefined): string | undefined {
  if (value !== undefined) {
    return value.toLowerCase().trim().replace(/[\s]/g, "-").normalize("NFD").replace(/[\u0300-\u036f%;,\\/^=+*!@#$¨&()?{}[\]`"']/g, "");
  }
  return undefined;
};