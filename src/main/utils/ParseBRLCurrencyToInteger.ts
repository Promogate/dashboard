export function parseBRLCurrencytoInteger(value: string): string {
  return value.trim().replace(/[.]/, "").replace(/[,]/, ".");
};