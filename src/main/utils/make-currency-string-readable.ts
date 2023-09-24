function parseCurrency(value: number): unknown {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2
  }).format(value);
}

export function makeCurrencyStringReadable(value: string) {
  return parseCurrency(Number(value));
}