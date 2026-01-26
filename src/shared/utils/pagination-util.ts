import { thousandSeparator } from '@/shared/utils/number-util';

export function dataCountFormatter(
  page: number,
  item: number,
  total: number,
  showed: number
): string {
  if (!showed) return '0 - 0 dari 0 Data';
  const start = (page - 1) * item + 1;
  const end = Math.min(page * item, total);
  return `${thousandSeparator(start)} - ${thousandSeparator(end)} dari ${thousandSeparator(total)} Data`;
}

export function setPaginationLength(item: number, length: number): number {
  return Math.max(1, Math.ceil(length / item));
}
