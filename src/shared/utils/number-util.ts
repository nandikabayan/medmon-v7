export function thousandSeparator(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function numberPercent(number = 0): string {
  return `${Number.isInteger(number) ? number : number.toFixed(2)}%`;
}
