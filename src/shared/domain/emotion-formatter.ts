import { EMOTION_ICON, EMOTION_NAME, EMOTION_COLOR } from '@/shared/constants/emotion';

export function emotionFormatter(type: string, emotion: string) {
  if (type === 'icon') return EMOTION_ICON[emotion];
  if (type === 'name') return EMOTION_NAME[emotion];
  return EMOTION_COLOR[emotion];
}
