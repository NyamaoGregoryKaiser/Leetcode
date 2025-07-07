```javascript
const { twoSum, isAnagram, groupAnagrams, longestConsecutive } = require('./hashTable');
const { describe, it, expect } = require('@jest/globals');


describe('Two Sum', () => {
  it('should find the indices of two numbers that add up to the target', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });
});

describe('Valid Anagram', () => {
  it('should return true if two strings are anagrams', () => {
    expect(isAnagram("anagram", "nagaram")).toBe(true);
    expect(isAnagram("rat", "car")).toBe(false);
  });
});

describe('Group Anagrams', () => {
  it('should group anagrams together', () => {
    expect(groupAnagrams(["eat","tea","tan","ate","nat","bat"])).toEqual([['eat','tea','ate'],['tan','nat'],['bat']]);

  });
});

describe('Longest Consecutive Sequence', () => {
    it('should return the length of the longest consecutive sequence', () => {
        expect(longestConsecutive([100,4,200,1,3,2])).toBe(4);
        expect(longestConsecutive([0,3,7,2,5,8,4,6,0,1])).toBe(9);
    })
})


```