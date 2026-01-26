import { SOURCE_ICON, SOURCE_NAME, SOURCE_COLOR } from '@/shared/constants/source';

export function sourceFormatter(type: string, source: string) {
  if (type === 'icon') return SOURCE_ICON[source];
  if (type === 'name') return SOURCE_NAME[source];
  return SOURCE_COLOR[source];
}
