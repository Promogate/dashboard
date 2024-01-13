export function makeUniqueStoreName(value: string): string {
  return value.toLowerCase().trim().replace(/[\s]/g, "-").normalize("NFD").replace(/[\u0300-\u036f%;,\\/^=+*!@#$¨&()?{}[\]`"']/g, "");
}