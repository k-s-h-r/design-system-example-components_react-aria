export function formatSize(bytes: number, precision: number | null = null): string {
  if (bytes === 0) {
    return '0B';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  const base = 1024;
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(base)), units.length - 1);
  const decimals = precision !== null ? precision : unitIndex > 0 ? 1 : 0;

  return `${parseFloat((bytes / base ** unitIndex).toFixed(decimals))}${units[unitIndex]}`;
}

export function parseSize(value?: string): number | undefined {
  if (!value) {
    return undefined;
  }

  const matched = value.trim().match(/^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)$/i);
  if (!matched) {
    return undefined;
  }

  const [, amount, unit] = matched;
  const normalizedUnit = unit.toUpperCase();
  const multipliers: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
  };

  return Number(amount) * multipliers[normalizedUnit];
}
