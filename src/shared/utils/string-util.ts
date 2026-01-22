export function stringCutter(text: string, limit: number): string {
  if (!text) return '';
  return text.length <= limit ? text : text.substring(0, limit) + '...';
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
