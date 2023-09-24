export function parseStoreNameToUrl(value: string): string {
  const parsed = value.toLowerCase().replace(/\s/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return parsed;
}