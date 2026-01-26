export function stringCutter(text: string, limit: number): string {
  if (!text) return '';
  return text.length <= limit ? text : `${text.slice(0, limit)}...`;
}

export function writeContent(text: string): string {
  return text.replace(/\n/g, '<br />');
}

export function stringMarker(
  content: string,
  keywords: string[],
  color = '#FFFF00'
): string {
  if (!keywords?.length) return content;

  const escaped = keywords
    .filter(Boolean)
    .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (!escaped.length) return content;

  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  return content.replace(
    regex,
    `<mark style="background:${color}">$&</mark>`
  );
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
