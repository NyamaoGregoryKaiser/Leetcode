```typescript
import { groupAnagrams } from '../src/algorithms/group-anagrams';

describe('groupAnagrams', () => {
  // Helper to sort the inner arrays and the outer array for consistent comparison
  const sortResult = (arr: string[][]): string[][] => {
    const sortedInner = arr.map((group) => group.sort());
    return sortedInner.sort((a, b) => a[0].localeCompare(b[0]));
  };

  test('should return an empty array for an empty input', () => {
    expect(groupAnagrams([])).toEqual([]);
  });

  test('should group basic anagrams correctly', () => {
    const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    const expected = [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']];
    expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
  });

  test('should handle single character strings', () => {
    const strs = ['a', 'b', 'c'];
    const expected = [['a'], ['b'], ['c']];
    expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
  });

  test('should handle a single group of identical anagrams', () => {
    const strs = ['top', 'pot', 'opt'];
    const expected = [['opt', 'pot', 'top']];
    expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
  });

  test('should handle an array with only one string', () => {
    const strs = ['hello'];
    const expected = [['hello']];
    expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
  });

  test('should handle strings with different cases (case-sensitive as per problem usually implies)', () => {
    // Assuming 'a' and 'A' are different characters and do not form anagrams.
    // If case-insensitivity was desired, strings would be converted to lower/upper case first.
    const strs = ['a', 'A', 'aa', 'Aa', 'aA', 'AA'];
    const expected = [['A'], ['AA'], ['Aa'], ['a'], ['aA'], ['aa']];
    expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
  });

  test('should handle empty strings', () => {
    const strs = ['', ''];
    const expected = [['', '']];
    expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
  });

  test('should handle a mix of empty strings and others', () => {
    const strs = ['a', '', 'b', '', 'c'];
    const expected = [[''], [''], ['a'], ['b'], ['c']]; // Empty strings group together
    expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
  });

  test('should handle strings with numbers or special characters if allowed (problem statement usually specifies)', () => {
    // Assuming characters are standard alphanumeric or special chars.
    // The current charCodeAt logic handles any Unicode character.
    // For English letters only (a-z), `char.charCodeAt(0) - 'a'.charCodeAt(0)` is specific.
    // Here, we adapt the expectation based on the default `charCodeAt` behavior.
    // If problem specifies only 'a'-'z', this test would need adjustment or removal.
    const strs = ['123', '321', 'ab1', 'ba1', '!!!', '! ! !'];
    const expected = [['!!!'], ['! ! !'], ['123', '321'], ['ab1', 'ba1']];
    expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
  });

  test('should handle long strings', () => {
    const longStr1 = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
    const longStr2 = 'zyxwuvtsrqponmlkjihgfedcbazyxwuvtsrqponmlkjihgfedcba'; // Anagram of longStr1
    const longStr3 = 'someotherlongstringwhichisnotananagram';
    const strs = [longStr1, longStr3, longStr2];
    const expected = [[longStr3], [longStr1, longStr2]];
    expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
  });

  test('should handle cases where no anagrams exist', () => {
    const strs = ['abc', 'def', 'ghi'];
    const expected = [['abc'], ['def'], ['ghi']];
    expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
  });
});
```