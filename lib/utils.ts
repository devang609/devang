const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

export function formatDate(str: string | null | undefined): string {
  if (!str) return '';
  const match = str.match(/^(\d{4})-(\d{2})$/);
  if (!match) return str.toUpperCase();
  return `${MONTHS[parseInt(match[2], 10) - 1]} ${match[1]}`;
}
