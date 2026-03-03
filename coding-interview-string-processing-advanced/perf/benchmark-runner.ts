```typescript
import { runBenchmarks, BenchmarkTestCase } from '../src/utils/benchmark-utils';

// Import all algorithms from src/algorithms
import * as OptimalValidPalindromeII from '../src/algorithms/valid-palindrome-ii';
import * as OptimalGroupAnagrams from '../src/algorithms/group-anagrams';
import * as OptimalLongestSubstring from '../src/algorithms/longest-substring-without-repeating-characters';
import * as OptimalStringCompression from '../src/algorithms/string-compression';

// Import alternative solutions from solutions-comparison
// Valid Palindrome II
import { validPalindrome as bruteForceVP } from '../solutions-comparison/valid-palindrome-ii/brute-force';
import { validPalindrome as recursiveVP } from '../solutions-comparison/valid-palindrome-ii/recursive-variant';
import { validPalindrome as optimalVP } from '../solutions-comparison/valid-palindrome-ii/optimal-two-pointers';

// Group Anagrams
import { groupAnagrams as sortAndMapGA } from '../solutions-comparison/group-anagrams/sort-and-map';
import { groupAnagrams as charCountAndMapGA } from '../solutions-comparison/group-anagrams/char-count-and-map';

// Longest Substring Without Repeating Characters
import { lengthOfLongestSubstring as naiveBruteForceLS } from '../solutions-comparison/longest-substring-without-repeating-characters/naive-brute-force';
import { lengthOfLongestSubstring as optimalSlidingWindowLS } from '../solutions-comparison/longest-substring-without-repeating-characters/optimal-sliding-window';

// String Compression
import { stringCompression as iterativeBuilderSC } from '../solutions-comparison/string-compression/iterative-builder';
import { stringCompression as arrayPushJoinSC } from '../solutions-comparison/string-compression/using-array-push-join';

console.log('--- Starting Benchmarks ---');

// --- Valid Palindrome II Benchmarks ---
runBenchmarks(
  'Valid Palindrome II',
  {
    'Optimal (Two Pointers)': optimalVP,
    'Brute Force (Substrings + Palindrome Check)': bruteForceVP,
    'Recursive Variant (Memoization not included here)': recursiveVP, // Note: Recursion might be slower in JS for deep calls
  },
  [
    { name: 'Short Palindrome (aba)', inputs: ['aba'], expected: true },
    { name: 'Short Non-Palindrome (abc)', inputs: ['abc'], expected: false },
    { name: 'One Deletion (abca)', inputs: ['abca'], expected: true },
    {
      name: 'One Deletion (long, middle)',
      inputs: ['abacabaXabacaba'],
      expected: true,
    },
    {
      name: 'Long Palindrome (5000 chars)',
      inputs: ['a'.repeat(2500) + 'b' + 'a'.repeat(2500)],
      expected: true,
    },
    {
      name: 'Long Palindrome (10000 chars, one mismatch)',
      inputs: ['a'.repeat(4999) + 'b' + 'a' + 'c' + 'a'.repeat(4999)], // 'b' and 'c' are the mismatches
      expected: false,
    },
    {
      name: 'Long Palindrome (10000 chars, one char off in middle)',
      inputs: ['a'.repeat(5000) + 'b' + 'a'.repeat(4999)],
      expected: true,
    },
    {
      name: 'Long Palindrome (10000 chars, one char off at start/end)',
      inputs: ['z' + 'a'.repeat(9999)],
      expected: true,
    },
  ],
);

// --- Group Anagrams Benchmarks ---
const commonAnagrams = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat', 'cab', 'bac', 'top', 'pot', 'opt'];
const longWords = Array.from({ length: 50 }, (_, i) => String.fromCharCode(97 + i % 26).repeat(5)); // e.g., "aaaaa", "bbbbb"
const longAnagrams: string[] = [];
for (let i = 0; i < 50; i++) {
  const base = 'abcdefghijklmnopqrstuvwxyz'.slice(0, 10); // "abcdefghij"
  const shuffled = base
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
  longAnagrams.push(shuffled + i.toString()); // Make distinct for some (no real anagrams)
  longAnagrams.push(base + i.toString());
}
const largeInputAnagrams = Array(1000)
  .fill(0)
  .flatMap(() => commonAnagrams)
  .map((s, idx) => s + (idx % 2 === 0 ? '' : 'x')); // Introduce variations

runBenchmarks(
  'Group Anagrams',
  {
    'Optimal (Char Count Map)': charCountAndMapGA,
    'Sort and Map': sortAndMapGA,
  },
  [
    { name: 'Small set', inputs: [commonAnagrams], expected: OptimalGroupAnagrams.groupAnagrams(commonAnagrams) },
    {
      name: 'Medium set (many duplicates)',
      inputs: [Array(100).fill('abc').concat(Array(100).fill('bca'))],
      expected: OptimalGroupAnagrams.groupAnagrams(Array(100).fill('abc').concat(Array(100).fill('bca'))),
    },
    {
      name: 'Large set of distinct long words',
      inputs: [longWords],
      expected: OptimalGroupAnagrams.groupAnagrams(longWords),
    },
    {
      name: 'Large set of anagrams',
      inputs: [largeInputAnagrams],
      expected: OptimalGroupAnagrams.groupAnagrams(largeInputAnagrams),
    },
    {
      name: 'Very large set of simple anagrams',
      inputs: [Array(10000).fill('a').concat(Array(10000).fill('aa'))],
      expected: OptimalGroupAnagrams.groupAnagrams(Array(10000).fill('a').concat(Array(10000).fill('aa'))),
    },
  ],
);

// --- Longest Substring Without Repeating Characters Benchmarks ---
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const longUniqueString = alphabet.repeat(100); // 2600 chars
const longRepeatingString = 'abcde'.repeat(200); // 1000 chars
const mediumAlternating = 'abacaba'.repeat(500); // 3500 chars

runBenchmarks(
  'Longest Substring Without Repeating Characters',
  {
    'Optimal (Sliding Window)': optimalSlidingWindowLS,
    'Naive Brute Force': naiveBruteForceLS,
  },
  [
    { name: 'Short string (abcabcbb)', inputs: ['abcabcbb'], expected: 3 },
    { name: 'All repeating (bbbbb)', inputs: ['bbbbb'], expected: 1 },
    { name: 'All unique (abcdefg)', inputs: ['abcdefg'], expected: 7 },
    { name: 'Medium string (pwwkew)', inputs: ['pwwkew'], expected: 3 },
    { name: 'Long unique string', inputs: [longUniqueString], expected: 26 },
    { name: 'Long repeating string', inputs: [longRepeatingString], expected: 5 },
    { name: 'Medium alternating string', inputs: [mediumAlternating], expected: 3 }, // "bac" or "cab"
    {
      name: 'Very long mixed string',
      inputs: ['abacdefghijklmnopqrsatuvwxzya'.repeat(100)],
      expected: 25, // "bcdefghijklmnopqrsatuvwxzy"
    },
  ],
);

// --- String Compression Benchmarks ---
runBenchmarks(
  'String Compression',
  {
    'Optimal (Iterative Builder)': iterativeBuilderSC, // This is the main one from src/algorithms
    'Array Push and Join': arrayPushJoinSC, // This is essentially the same as Optimal, demonstrating pattern
  },
  [
    { name: 'Short compress (aabcccccaaa)', inputs: ['aabcccccaaa'], expected: 'a2b1c5a3' },
    { name: 'Short no compress (aabbcc)', inputs: ['aabbcc'], expected: 'aabbcc' },
    { name: 'Long compress (a100b50c1)', inputs: ['a'.repeat(100) + 'b'.repeat(50) + 'c'.repeat(1)], expected: 'a100b50c1' },
    {
      name: 'Long partial compress',
      inputs: ['a'.repeat(10) + 'b' + 'a'.repeat(10) + 'c' + 'a'.repeat(10)],
      expected: 'a10b1a10c1a10',
    },
    {
      name: 'Very long no compress',
      inputs: [alphabet.repeat(500)], // 26 * 500 = 13000 chars
      expected: alphabet.repeat(500),
    },
    {
      name: 'Very long full compress',
      inputs: ['z'.repeat(10000)],
      expected: 'z10000',
    },
    {
      name: 'Very long mixed compress',
      inputs: ['a'.repeat(1000) + 'b'.repeat(1000) + 'c'.repeat(1000) + 'd'.repeat(1000)],
      expected: 'a1000b1000c1000d1000',
    },
  ],
);

console.log('\n--- Benchmarks Finished ---');
```