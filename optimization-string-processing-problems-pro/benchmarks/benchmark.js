```javascript
/**
 * @fileoverview Benchmarking script for string manipulation problems.
 * This script runs multiple algorithms against various large test cases and measures their execution time,
 * providing insights into their performance characteristics.
 */

const { longestPalindromeExpandAroundCenter, longestPalindromeDP } = require('../src/problems/longestPalindromicSubstring');
const { groupAnagramsSorting, groupAnagramsCounting } = require('../src/problems/groupAnagrams');
const { strStrBruteForce, strStrKMP } = require('../src/problems/kmpStringMatching');
const { minWindow } = require('../src/problems/minimumWindowSubstring');
const testData = require('./data'); // Import test data

/**
 * Executes a function and measures its execution time.
 * @param {function} func - The function to benchmark.
 * @param {Array} args - Arguments to pass to the function.
 * @param {number} [iterations=1] - Number of times to run the function for averaging.
 * @returns {number} The average execution time in milliseconds.
 */
function measureExecutionTime(func, args, iterations = 1) {
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = process.hrtime.bigint();
        func(...args);
        const end = process.hrtime.bigint();
        totalTime += Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds
    }
    return totalTime / iterations;
}

/**
 * Helper to print results in a formatted table.
 * @param {string} title - Title of the benchmark section.
 * @param {Array<Object>} results - Array of result objects {name, functionName, time}.
 */
function printResults(title, results) {
    console.log(`\n--- ${title} ---`);
    console.log(`| Test Case                 | Algorithm                 | Time (ms)    |`);
    console.log(`|---------------------------|---------------------------|--------------|`);
    results.forEach(res => {
        const time = res.time.toFixed(4);
        console.log(`| ${res.name.padEnd(25)} | ${res.functionName.padEnd(25)} | ${time.padEnd(12)} |`);
    });
    console.log(`|---------------------------|---------------------------|--------------|`);
}

/**
 * Runs benchmarks for Longest Palindromic Substring.
 */
function benchmarkLPS() {
    console.log("\n### Benchmarking Longest Palindromic Substring ###");
    const results = [];
    const iterations = 5; // Increase iterations for more accurate average on faster functions

    for (const data of testData.lpsData) {
        // Expand Around Center
        const timeExpand = measureExecutionTime(longestPalindromeExpandAroundCenter, [data.s], iterations);
        results.push({
            name: data.name,
            functionName: 'ExpandAroundCenter',
            time: timeExpand
        });

        // Dynamic Programming
        const timeDP = measureExecutionTime(longestPalindromeDP, [data.s], iterations);
        results.push({
            name: data.name,
            functionName: 'Dynamic Programming',
            time: timeDP
        });
    }
    printResults('Longest Palindromic Substring', results);
}

/**
 * Runs benchmarks for Group Anagrams.
 */
function benchmarkGroupAnagrams() {
    console.log("\n### Benchmarking Group Anagrams ###");
    const results = [];
    const iterations = 3; // Reduced iterations for larger inputs

    for (const data of testData.anagramsData) {
        // Sorting Characters
        const timeSorting = measureExecutionTime(groupAnagramsSorting, [data.strs], iterations);
        results.push({
            name: data.name,
            functionName: 'Sorting Chars',
            time: timeSorting
        });

        // Character Counting
        const timeCounting = measureExecutionTime(groupAnagramsCounting, [data.strs], iterations);
        results.push({
            name: data.name,
            functionName: 'Char Counting',
            time: timeCounting
        });
    }
    printResults('Group Anagrams', results);
}

/**
 * Runs benchmarks for KMP String Matching.
 */
function benchmarkKMP() {
    console.log("\n### Benchmarking KMP String Matching ###");
    const results = [];
    const iterations = 10; // More iterations for often faster string algorithms

    for (const data of testData.kmpData) {
        // Brute Force
        const timeBruteForce = measureExecutionTime(strStrBruteForce, [data.haystack, data.needle], iterations);
        results.push({
            name: data.name,
            functionName: 'Brute Force',
            time: timeBruteForce
        });

        // KMP Algorithm
        const timeKMP = measureExecutionTime(strStrKMP, [data.haystack, data.needle], iterations);
        results.push({
            name: data.name,
            functionName: 'KMP',
            time: timeKMP
        });
    }
    printResults('KMP String Matching', results);
}

/**
 * Runs benchmarks for Minimum Window Substring.
 */
function benchmarkMWS() {
    console.log("\n### Benchmarking Minimum Window Substring ###");
    const results = [];
    const iterations = 5;

    for (const data of testData.mwsData) {
        const timeMWS = measureExecutionTime(minWindow, [data.s, data.t], iterations);
        results.push({
            name: data.name,
            functionName: 'Sliding Window',
            time: timeMWS
        });
    }
    printResults('Minimum Window Substring', results);
}

// --- Main Benchmark Execution ---
console.log("Starting all benchmarks...");

benchmarkLPS();
benchmarkGroupAnagrams();
benchmarkKMP();
benchmarkMWS();

console.log("\nAll benchmarks completed.");
```