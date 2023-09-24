function isLongEnough(value: string, limit: number): boolean {
  if(value.length > limit) {
    return true;
  }
  return false;
}

export function truncateString(value: string, limit: number = 48): string {
  if (isLongEnough(value, limit)) {
    return value.slice(0, limit) + "...";
  }
  return value;
}