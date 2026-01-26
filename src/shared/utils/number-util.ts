export function thousandSeparator(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function kmbtNumberFormatter(num: number): string {
  if (num < 1000) return num.toLocaleString('id');
  const units = ['K', 'M', 'B', 'T'];
  const exp = Math.floor(Math.log10(num) / 3);
  return `${(num / 10 ** (exp * 3)).toFixed(1)}${units[exp - 1]}`;
}

export function numberPercent(num = 0): string {
  return `${num}%`;
}

export function formatRupiah(num = 0): string {
  return `Rp. ${thousandSeparator(num)}`;
}
