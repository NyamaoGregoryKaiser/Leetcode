/**
 * benchmarks/benchmark.js
 *
 * This file contains performance benchmarks for the different algorithm implementations.
 * It uses the 'benchmark' npm package (or native Node.js 'perf_hooks' for simpler cases)
 * to compare the execution time of various approaches for the same problem.
 */

const Benchmark = require('benchmark');
const {
    reverseStringIterative,
    reverseStringTwoPointersInPlace,
    reverseStringRecursiveInPlace
} = require('../src/algorithms/reverseString');
const {
    isValidParenthesesUsingArrayAsStack,
    isValidParenthesesUsingCustomStack
} = require('../src/algorithms/validParentheses');
const {
    lengthOfLongestSubstringBruteForce,
    lengthOfLongestSubstringSlidingWindowSet,
    lengthOfLongestSubstringSlidingWindowMap
} = require('../src/algorithms/longestSubstringWithoutRepeatingCharacters');
const {
    groupAnagramsSortingKey,
    groupAnagramsCountingKey
} = require('../src/algorithms/groupAnagrams');

console.log('--- Benchmarking String Manipulation Algorithms ---');

// --- Helper for creating large test data ---
const generateLongString = (length, uniqueChars = 26) => {
    let result = '';
    const chars = 'abcdefghijklmnopqrstuvwxyz'.slice(0, uniqueChars);
    for (let i = 0; i < length; i++) {
        result += chars[i % uniqueChars];
    }
    return result;
};

const generateLongCharArr = (length, uniqueChars = 26) => {
    return generateLongString(length, uniqueChars).split('');
};

const generateParenthesesString = (length, density = 0.5) => {
    let s = '';
    const open = ['(', '{', '['];
    const close = [')', '}', ']'];
    const stack = [];

    for (let i = 0; i < length; i++) {
        if (stack.length === 0 || Math.random() < density) { // Tendency to add open bracket
            const char = open[Math.floor(Math.random() * open.length)];
            s += char;
            stack.push(char);
        } else { // Tendency to add close bracket
            const lastOpen = stack.pop();
            switch (lastOpen) {
                case '(': s += ')'; break;
                case '{': s += '}'; break;
                case '[': s += ']'; break;
            }
        }
    }
    // Close any remaining open brackets
    while (stack.length > 0) {
        const lastOpen = stack.pop();
        switch (lastOpen) {
            case '(': s += ')'; break;
            case '{': s += '}'; break;
            case '[': s += ']'; break;
        }
    }
    return s;
};

const generateAnagramsList = (numStrings, avgLength, numGroups) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const result = [];
    const baseWords = [];

    // Generate base words
    for (let i = 0; i < numGroups; i++) {
        let word = '';
        for (let j = 0; j < avgLength; j++) {
            word += chars[Math.floor(Math.random() * chars.length)];
        }
        baseWords.push(word);
    }

    // Generate anagrams
    for (let i = 0; i < numStrings; i++) {
        const base = baseWords[i % numGroups];
        result.push(base.split('').sort(() => 0.5 - Math.random()).join('')); // Shuffle
    }
    return result;
};


// --- Reverse String Benchmarks ---
console.log('\n--- Reverse String ---');
const reverseStringLongInput = generateLongCharArr(10000); // 10,000 chars

new Benchmark.Suite('Reverse String')
    .add('reverseStringIterative (New String)', () => {
        // This function expects a string, not char array
        reverseStringIterative(reverseStringLongInput.join(''));
    })
    .add('reverseStringTwoPointersInPlace', () => {
        // Must clone array for in-place modification benchmarks
        const testArr = [...reverseStringLongInput];
        reverseStringTwoPointersInPlace(testArr);
    })
    .add('reverseStringRecursiveInPlace', () => {
        const testArr = [...reverseStringLongInput];
        reverseStringRecursiveInPlace(testArr);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });


// --- Valid Parentheses Benchmarks ---
console.log('\n--- Valid Parentheses ---');
const validParenthesesLongInput = generateParenthesesString(100000, 0.6); // 100,000 chars

new Benchmark.Suite('Valid Parentheses')
    .add('isValidParenthesesUsingArrayAsStack', () => {
        isValidParenthesesUsingArrayAsStack(validParenthesesLongInput);
    })
    .add('isValidParenthesesUsingCustomStack', () => {
        isValidParenthesesUsingCustomStack(validParenthesesLongInput);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });


// --- Longest Substring Without Repeating Characters Benchmarks ---
console.log('\n--- Longest Substring Without Repeating Characters ---');
const longUniqueString = generateLongString(500, 26); // Longer unique
const longRepeatedString = generateLongString(2000, 5); // Longer with repeats

new Benchmark.Suite('Longest Substring (Unique Chars)')
    .add('LSS_BruteForce (Unique)', () => {
        lengthOfLongestSubstringBruteForce(longUniqueString);
    })
    .add('LSS_SlidingWindowSet (Unique)', () => {
        lengthOfLongestSubstringSlidingWindowSet(longUniqueString);
    })
    .add('LSS_SlidingWindowMap (Unique)', () => {
        lengthOfLongestSubstringSlidingWindowMap(longUniqueString);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });

new Benchmark.Suite('Longest Substring (Repeated Chars)')
    .add('LSS_BruteForce (Repeated)', () => {
        lengthOfLongestSubstringBruteForce(longRepeatedString);
    })
    .add('LSS_SlidingWindowSet (Repeated)', () => {
        lengthOfLongestSubstringSlidingWindowSet(longRepeatedString);
    })
    .add('LSS_SlidingWindowMap (Repeated)', () => {
        lengthOfLongestSubstringSlidingWindowMap(longRepeatedString);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });


// --- Group Anagrams Benchmarks ---
console.log('\n--- Group Anagrams ---');
const largeAnagramsList = generateAnagramsList(5000, 10, 100); // 5000 strings, avg len 10, 100 groups
const veryLargeAnagramsList = generateAnagramsList(10000, 20, 500); // 10000 strings, avg len 20, 500 groups

new Benchmark.Suite('Group Anagrams (Small K)')
    .add('GroupAnagrams_SortingKey (Small K)', () => {
        groupAnagramsSortingKey(largeAnagramsList);
    })
    .add('GroupAnagrams_CountingKey (Small K)', () => {
        groupAnagramsCountingKey(largeAnagramsList);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });

new Benchmark.Suite('Group Anagrams (Larger K)')
    .add('GroupAnagrams_SortingKey (Larger K)', () => {
        groupAnagramsSortingKey(veryLargeAnagramsList);
    })
    .add('GroupAnagrams_CountingKey (Larger K)', () => {
        groupAnagramsCountingKey(veryLargeAnagramsList);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });