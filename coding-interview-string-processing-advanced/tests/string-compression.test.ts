```typescript
import { stringCompression } from '../src/algorithms/string-compression';

describe('stringCompression', () => {
  test('should return an empty string for an empty input', () => {
    expect(stringCompression('')).toBe('');
  });

  test('should return the original string if compression does not make it smaller (single char)', () => {
    expect(stringCompression('a')).toBe('a');
  });

  test('should return the original string if compression does not make it smaller (two chars)', () => {
    expect(stringCompression('aa')).toBe('aa'); // compressed: "a2", same length
  });

  test('should return the original string if compression does not make it smaller (alternating chars)', () => {
    expect(stringCompression('aabbcc')).toBe('aabbcc'); // compressed: "a2b2c2", same length
  });

  test('should compress simple repeating characters', () => {
    expect(stringCompression('aaa')).toBe('a3');
  });

  test('should compress mixed repeating characters', () => {
    expect(stringCompression('aabcccccaaa')).toBe('a2b1c5a3');
  });

  test('should compress with only one type of character and long repetition', () => {
    expect(stringCompression('AAAAABBBBBCCCCCCDDDDDEEEEEFFFFFF')).toBe('A5B5C6D5E5F6');
  });

  test('should handle mixed case letters correctly (case-sensitive)', () => {
    expect(stringCompression('aaAAbBCCccc')).toBe('a2A2b1B1C2c3');
  });

  test('should return original for string with no repetitions', () => {
    expect(stringCompression('abcdefg')).toBe('abcdefg'); // compressed "a1b1c1d1e1f1g1" is longer
  });

  test('should return original for string where compressed is longer', () => {
    expect(stringCompression('abacaba')).toBe('abacaba'); // compressed "a1b1a1c1a1b1a1" is longer
  });

  test('should handle a single character repeated many times', () => {
    expect(stringCompression('zzzzzzzzzz')).toBe('z10'); // Length 10 -> Length 3, clearly smaller
  });

  test('should handle complex string compression', () => {
    expect(stringCompression('KKKLLMNNNNNNOOOO')).toBe('K3L2M1N6O4');
  });

  test('should handle very long string with full compression', () => {
    const longString = 'a'.repeat(100) + 'b'.repeat(50) + 'c'.repeat(1);
    expect(stringCompression(longString)).toBe('a100b50c1');
  });

  test('should handle very long string with minimal compression', () => {
    const longString = 'abcdefghijklmnopqrstuvwxyza'.repeat(50);
    expect(stringCompression(longString)).toBe(longString); // compressed will be much longer
  });
});
```