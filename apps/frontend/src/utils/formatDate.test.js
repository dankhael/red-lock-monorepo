import { formatDate } from './formatDate';

describe('formatDate', () => {
  test('formats a valid date string', () => {
    const result = formatDate('2023-06-15T10:00:00Z');
    expect(result).toMatch(/2023/);
    expect(result).toMatch(/15/);
  });

  test('returns "Unknown Date" for null', () => {
    expect(formatDate(null)).toBe('Unknown Date');
  });

  test('returns "Unknown Date" for undefined', () => {
    expect(formatDate(undefined)).toBe('Unknown Date');
  });

  test('returns "Unknown Date" for empty string', () => {
    expect(formatDate('')).toBe('Unknown Date');
  });

  test('returns "Invalid Date" for invalid date string', () => {
    expect(formatDate('not-a-date')).toBe('Invalid Date');
  });

  test('handles ISO date format', () => {
    const result = formatDate('2024-06-15T12:00:00Z');
    expect(result).toMatch(/2024/);
  });
});
