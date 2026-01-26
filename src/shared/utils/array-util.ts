export function assignNullSeriesData(length: number): number[] {
  return Array.from({ length }, () => 0);
}

export function arrayCounter(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}
