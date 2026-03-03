```typescript
import { lengthOfLongestSubstring } from '../src/algorithms/longest-substring-without-repeating-characters';

describe('lengthOfLongestSubstring', () => {
  test('should return 0 for an empty string', () => {
    expect(lengthOfLongestSubstring('')).toBe(0);
  });

  test('should return 1 for a string with one character', () => {
    expect(lengthOfLongestSubstring('a')).toBe(1);
  });

  test('should return 1 for a string with all repeating characters', () => {
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
  });

  test('should return correct length for "abcabcbb"', () => {
    // "abc" is the longest (length 3)
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
  });

  test('should return correct length for "pwwkew"', () => {
    // "wke" is the longest (length 3), not "pwke" (subsequence)
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  });

  test('should return correct length for "dvdf"', () => {
    // "vdf" is the longest (length 3)
    expect(lengthOfLongestSubstring('dvdf')).toBe(3);
  });

  test('should return correct length for "abcdefg"', () => {
    // All unique characters, length is string length (7)
    expect(lengthOfLongestSubstring('abcdefg')).toBe(7);
  });

  test('should return correct length for " " (space character)', () => {
    expect(lengthOfLongestSubstring(' ')).toBe(1);
  });

  test('should handle string with various characters including spaces', () => {
    // "au" -> 2
    expect(lengthOfLongestSubstring('au')).toBe(2);
  });

  test('should handle string with multiple repeating characters in different places', () => {
    // "bcar" -> 4
    expect(lengthOfLongestSubstring('abcbdcad')).toBe(4);
  });

  test('should handle long strings with many unique characters', () => {
    const longUnique = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    expect(lengthOfLongestSubstring(longUnique)).toBe(longUnique.length); // 62
  });

  test('should handle long strings with internal repetitions', () => {
    // "abccdefgh" -> "cdefgh" (6)
    expect(lengthOfLongestSubstring('abccdefghijkxyzabcd')).toBe(11); // cdefghijkxy (length 11)
  });

  test('should handle a string with all same characters except one', () => {
    expect(lengthOfLongestSubstring('aaaaaaab')).toBe(2); // "ab"
    expect(lengthOfLongestSubstring('baaaaaaa')).toBe(2); // "ba"
  });

  test('should handle string with only two repeating characters', () => {
    expect(lengthOfLongestSubstring('tmmzuxt')).toBe(5); // "mzuxt"
  });
});
```