export const parseCurrency = (value: string | number): string => {
  if (typeof value === "string") {
    return Number(value).toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  }

  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
};

export const parseCurrencyWithoutSign = (value: string | number): string => {
  if (typeof value === "string") {
    return Number(value).toLocaleString("pt-br", { minimumFractionDigits: 2 });
  }

  return value.toLocaleString("pt-br", { minimumFractionDigits: 2 });
};
