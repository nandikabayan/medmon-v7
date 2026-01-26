import { SENTIMENT_ICON, SENTIMENT_NAME, SENTIMENT_COLOR } from '@/shared/constants/sentiment';

export function sentimentFormatter(type: string, sentiment: any) {
  const key =
    sentiment === 1 || sentiment === 'positif'
      ? 'positif'
      : sentiment === -1 || sentiment === 'negatif'
      ? 'negatif'
      : 'netral';

  if (type === 'icon') return SENTIMENT_ICON[key];
  if (type === 'name') return SENTIMENT_NAME[key];
  return SENTIMENT_COLOR[key];
}
