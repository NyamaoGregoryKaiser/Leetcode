```javascript
const { twoSum, isAnagram, groupAnagrams } = require('./hashTable');

describe('Hash Table Problems', () => {
  describe('Two Sum', () => {
    it('should find indices of two numbers that add up to the target', () => {
      expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
      expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
      expect(twoSum([3, 3], 6)).toEqual([0, 1]);
    });
    it('should return null if no solution is found', () => {
      expect(twoSum([3, 1], 5)).toEqual(null);
    });
  });

  describe('Valid Anagram', () => {
    it('should return true if two strings are anagrams', () => {
      expect(isAnagram("anagram", "nagaram")).toBe(true);
      expect(isAnagram("rat", "car")).toBe(false);
    });
    it('should handle empty strings', () => {
      expect(isAnagram("", "")).toBe(true);
    });
  });

  //Add tests for groupAnagrams, longestConsecutiveSequence, and minimumWindowSubstring here.
});

```