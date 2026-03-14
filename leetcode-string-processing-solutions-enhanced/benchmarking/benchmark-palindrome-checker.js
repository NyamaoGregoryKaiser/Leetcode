```javascript
/**
 * @fileoverview Performance benchmark for Palindrome Checker algorithms.
 * Compares `isPalindromeTwoPointers`, `isPalindromeReverseAndCompare`,
 * and `isPalindromeTwoPointersInPlace` using `perf_hooks`.
 */

const { performance } = require('perf_hooks');
const chalk = require('chalk'); // For colorful console output

const {
    isPalindromeTwoPointers,
    isPalindromeReverseAndCompare,
    isPalindromeTwoPointersInPlace
} = require('../src/algorithms/palindrome-checker');

// --- Helper Functions for Benchmarking ---

/**
 * Runs a given function multiple times and measures its average execution time.
 * @param {Function} func The function to benchmark.
 * @param {string} funcName The name of the function.
 * @param {*} input The input to pass to the function.
 * @param {number} iterations The number of times to run the function.
 */
function benchmarkFunction(func, funcName, input, iterations) {
    let totalTime = 0;
    let result;

    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        result = func(input);
        const end = performance.now();
        totalTime += (end - start);
    }

    const averageTime = totalTime / iterations;
    console.log(`  ${chalk.cyan(funcName)}: ${chalk.yellow(averageTime.toFixed(4))} ms (Result: ${result})`);
    return averageTime;
}

/**
 * Generates a random palindrome string of a given length, considering only alphanumeric.
 * @param {number} length
 * @returns {string}
 */
function generateRandomPalindrome(length) {
    if (length <= 0) return "";
    let halfLength = Math.floor(length / 2);
    let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomHalf = '';
    for (let i = 0; i < halfLength; i++) {
        randomHalf += chars[Math.floor(Math.random() * chars.length)];
    }
    let palindrome = randomHalf;
    if (length % 2 !== 0) {
        palindrome += chars[Math.floor(Math.random() * chars.length)];
    }
    palindrome += randomHalf.split('').reverse().join('');
    return palindrome;
}

/**
 * Generates a random non-palindrome string of a given length, ensuring it's not a palindrome.
 * @param {number} length
 * @returns {string}
 */
function generateRandomNonPalindrome(length) {
    if (length <= 0) return "";
    let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    // Ensure it's not a palindrome. A simple way is to flip first and last char if they match.
    if (str.length > 1 && str[0] === str[str.length - 1]) {
        let newChar = chars[Math.floor(Math.random() * chars.length)];
        // Make sure it's different from the original char
        while (newChar === str[0]) {
            newChar = chars[Math.floor(Math.random() * chars.length)];
        }
        str = newChar + str.substring(1, str.length - 1) + str[str.length - 1];
    }
    return str;
}


// --- Benchmark Configuration ---
const ITERATIONS = 10000; // Number of times to run each function for average calculation
const TEST_STRING_LENGTHS = [10, 100, 1000, 10000]; // Different input sizes

console.log(chalk.bold.underline('\n--- Palindrome Checker Benchmarks ---'));
console.log(`Running each function ${chalk.magenta(ITERATIONS)} times for averaging.`);

TEST_STRING_LENGTHS.forEach(length => {
    // Generate a long palindrome string for testing
    const palindromeStr = generateRandomPalindrome(length);
    // Generate a long non-palindrome string
    const nonPalindromeStr = generateRandomNonPalindrome(length);
    // Generate a string with many non-alphanumeric chars for 'in-place' test case
    const complexStr = "!@#$%^&*" + generateRandomPalindrome(Math.floor(length / 2)) + generateRandomPalindrome(Math.floor(length / 2)) + "()*&^%$#@!";

    console.log(chalk.blue(`\n--- Input String Length: ${length} ---`));

    // Palindrome case
    console.log(chalk.green(`\n  Testing with Palindrome string (length ${palindromeStr.length}):`));
    benchmarkFunction(isPalindromeTwoPointers, 'Two-Pointers (Optimal)', palindromeStr, ITERATIONS);
    benchmarkFunction(isPalindromeReverseAndCompare, 'Reverse-and-Compare', palindromeStr, ITERATIONS);
    benchmarkFunction(isPalindromeTwoPointersInPlace, 'Two-Pointers (In-Place)', palindromeStr, ITERATIONS);

    // Non-Palindrome case
    console.log(chalk.red(`\n  Testing with Non-Palindrome string (length ${nonPalindromeStr.length}):`));
    benchmarkFunction(isPalindromeTwoPointers, 'Two-Pointers (Optimal)', nonPalindromeStr, ITERATIONS);
    benchmarkFunction(isPalindromeReverseAndCompare, 'Reverse-and-Compare', nonPalindromeStr, ITERATIONS);
    benchmarkFunction(isPalindromeTwoPointersInPlace, 'Two-Pointers (In-Place)', nonPalindromeStr, ITERATIONS);

    // Complex string with many non-alphanumeric characters
    console.log(chalk.magenta(`\n  Testing with Complex string (length ${complexStr.length}, many special chars):`));
    benchmarkFunction(isPalindromeTwoPointers, 'Two-Pointers (Optimal)', complexStr, ITERATIONS);
    benchmarkFunction(isPalindromeReverseAndCompare, 'Reverse-and-Compare', complexStr, ITERATIONS);
    benchmarkFunction(isPalindromeTwoPointersInPlace, 'Two-Pointers (In-Place)', complexStr, ITERATIONS);
});

console.log(chalk.bold.underline('\n--- Benchmarks Complete ---'));
```