import { format, addHours } from 'date-fns';
import { MONTHS } from '@/shared/constants/month';

export function dateFormatterID(
  date: string,
  short = false,
  showTime = false,
  plus7 = false
) {
  const lang = localStorage.getItem('mv6_lang') || 'id';
  const base = plus7 ? addHours(new Date(date), 7) : new Date(date);

  const day = format(base, 'dd');
  const year = format(base, 'yyyy');
  const month = MONTHS[lang][+format(base, 'M') - 1];
  const time = showTime ? format(base, 'HH:mm:ss') : '';

  return `${day} ${short ? month.slice(0, 3) : month} ${year}${time && ' ' + time}`;
}

export function dateFormatterParams(date: string): string {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
}
