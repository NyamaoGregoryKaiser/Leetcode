```typescript
import * as Algorithms from './algorithms';

/**
 * This is the main entry point for the algorithms.
 * You can import and use any of the exported functions from `src/algorithms`.
 *
 * Example usage:
 * console.log(Algorithms.validPalindrome("aba")); // true
 * console.log(Algorithms.groupAnagrams(["eat","tea","tan"])); // [["eat","tea"],["tan"]]
 */

console.log('String Manipulation Algorithms Project');
console.log('------------------------------------');

// Example usage of a few algorithms:

console.log('1. Valid Palindrome II ("abca"):', Algorithms.validPalindrome('abca')); // true
console.log('1. Valid Palindrome II ("abc"):', Algorithms.validPalindrome('abc')); // false

console.log('\n2. Group Anagrams (["eat","tea","tan","ate","nat","bat"]):');
console.log(Algorithms.groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// Expected: [["bat"],["nat","tan"],["ate","eat","tea"]] (order might vary)

console.log('\n3. Longest Substring Without Repeating Characters ("pwwkew"):');
console.log(Algorithms.lengthOfLongestSubstring('pwwkew')); // 3

console.log('\n4. String Compression ("aabcccccaaa"):');
console.log(Algorithms.stringCompression('aabcccccaaa')); // "a2b1c5a3"
console.log('4. String Compression ("aabbcc"):');
console.log(Algorithms.stringCompression('aabbcc')); // "aabbcc"
```