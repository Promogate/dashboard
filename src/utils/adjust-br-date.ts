export function AdjustPtDate(value: Date) {
  return new Intl.DateTimeFormat("pt-BR").format(value);
}