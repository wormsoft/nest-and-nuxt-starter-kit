export function parseBool(raw: string): boolean {
  return ['true', 'yes', 'yea', '1'].includes(raw);
}
