```typescript
import { twoSum } from '../src/problems/twoSum';
import { twoSumBruteForce } from '../src/problems/twoSumBruteForce';
import { longestConsecutiveSequence } from '../src/problems/longestConsecutiveSequence';
import { LRUCache } from '../src/problems/lruCache';
import { groupAnagrams } from '../src/problems/groupAnagrams';

// --- Utility for measuring performance ---
function measurePerformance(name: string, func: Function, ...args: any[]): number {
    const start = process.hrtime.bigint();
    func(...args);
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_000_000;
    console.log(`[${name}] Duration: ${durationMs.toFixed(3)} ms`);
    return durationMs;
}

function runBenchmark(title: string, testCases: { name: string, input: any[], func: Function }[]) {
    console.log(`\n--- Benchmarking: ${title} ---`);
    testCases.forEach(testCase => {
        measurePerformance(testCase.name, testCase.func, ...testCase.input);
    });
}

// --- Benchmark Test Cases ---

// Two Sum
const twoSumSmallNums = [2, 7, 11, 15];
const twoSumSmallTarget = 9;
const twoSumMediumNums = Array.from({ length: 1000 }, (_, i) => i);
const twoSumMediumTarget = 1999; // For 999 + 1000
const twoSumLargeNums = Array.from({ length: 10000 }, (_, i) => i);
const twoSumLargeTarget = 19999; // For 9999 + 10000

runBenchmark('Two Sum', [
    { name: 'TwoSum (Optimal) - Small', func: twoSum, input: [twoSumSmallNums, twoSumSmallTarget] },
    { name: 'TwoSum (Brute Force) - Small', func: twoSumBruteForce, input: [twoSumSmallNums, twoSumSmallTarget] },
    { name: 'TwoSum (Optimal) - Medium (1k)', func: twoSum, input: [twoSumMediumNums, twoSumMediumTarget] },
    { name: 'TwoSum (Brute Force) - Medium (1k)', func: twoSumBruteForce, input: [twoSumMediumNums, twoSumMediumTarget] },
    { name: 'TwoSum (Optimal) - Large (10k)', func: twoSum, input: [twoSumLargeNums, twoSumLargeTarget] },
    // Brute force for 10k elements would be too slow (10^8 operations), skipping for practical reasons.
    // { name: 'TwoSum (Brute Force) - Large (10k)', func: twoSumBruteForce, input: [twoSumLargeNums, twoSumLargeTarget] },
]);

// Longest Consecutive Sequence
const lcsSmallNums = [100, 4, 200, 1, 3, 2];
const lcsMediumNums = Array.from({ length: 10000 }, (_, i) => Math.floor(Math.random() * 20000)); // 10k random numbers
const lcsLargeNums = Array.from({ length: 100000 }, (_, i) => i + Math.floor(Math.random() * 100)); // Mostly consecutive, some gaps

runBenchmark('Longest Consecutive Sequence', [
    { name: 'LCS (Optimal) - Small', func: longestConsecutiveSequence, input: [lcsSmallNums] },
    { name: 'LCS (Optimal) - Medium (10k random)', func: longestConsecutiveSequence, input: [lcsMediumNums] },
    { name: 'LCS (Optimal) - Large (100k near-consecutive)', func: longestConsecutiveSequence, input: [lcsLargeNums] },
]);

// LRU Cache
function runLruCacheBenchmark(capacity: number, numOperations: number): Function {
    return () => {
        const lRUCache = new LRUCache(capacity);
        for (let i = 0; i < numOperations; i++) {
            const key = Math.floor(Math.random() * (capacity * 2)); // Keys can be outside capacity range
            const value = Math.floor(Math.random() * 1000);
            if (i % 2 === 0) { // Simulate roughly 50% get, 50% put
                lRUCache.get(key);
            } else {
                lRUCache.put(key, value);
            }
        }
    };
}

runBenchmark('LRU Cache', [
    { name: 'LRU Cache - Small (Cap:10, Ops:1k)', func: runLruCacheBenchmark(10, 1000), input: [] },
    { name: 'LRU Cache - Medium (Cap:100, Ops:10k)', func: runLruCacheBenchmark(100, 10000), input: [] },
    { name: 'LRU Cache - Large (Cap:1000, Ops:100k)', func: runLruCacheBenchmark(1000, 100000), input: [] },
]);

// Group Anagrams
const gaSmallStrs = ["eat", "tea", "tan", "ate", "nat", "bat"];
const gaMediumStrs = Array.from({ length: 1000 }, (_, i) => {
    const len = Math.floor(Math.random() * 10) + 3; // String length 3-12
    return Array.from({ length: len }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
});
const gaLargeStrs = Array.from({ length: 10000 }, (_, i) => {
    const len = Math.floor(Math.random() * 15) + 5; // String length 5-20
    return Array.from({ length: len }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
});

runBenchmark('Group Anagrams', [
    { name: 'Group Anagrams (Optimal) - Small', func: groupAnagrams, input: [gaSmallStrs] },
    { name: 'Group Anagrams (Optimal) - Medium (1k strings)', func: groupAnagrams, input: [gaMediumStrs] },
    { name: 'Group Anagrams (Optimal) - Large (10k strings)', func: groupAnagrams, input: [gaLargeStrs] },
]);
```