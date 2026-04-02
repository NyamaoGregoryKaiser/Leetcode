```typescript
/**
 * @fileoverview Performance benchmarking for array manipulation algorithms.
 * Compares optimal solutions against brute-force/alternative approaches using Jest.
 */

import {
    rotateArray,
    productExceptSelf,
    mergeIntervals,
    trapRainWater,
} from '../../src/algorithms/array-manipulation';
import {
    rotateArrayBruteForce,
    productExceptSelfBruteForceWithDivision,
    mergeIntervalsBruteForce,
    trapRainWaterDP,
} from '../../src/algorithms/brute-force-solutions';
import { deepCloneArray, generateUniqueRandomArray, generateSortedRandomArray } from '../../src/utils/array-helpers';

// Helper function for benchmarking
function benchmarkFunction(name: string, func: (...args: any[]) => any, ...args: any[]): number {
    const start = process.hrtime.bigint();
    func(...args);
    const end = process.hrtime.bigint();
    const durationNs = Number(end - start);
    return durationNs / 1_000_000; // Convert nanoseconds to milliseconds
}

// Disable console.log for benchmarks to avoid output pollution
const originalLog = console.log;
beforeAll(() => {
    console.log = () => {};
});
afterAll(() => {
    console.log = originalLog;
});

describe('Algorithm Performance Benchmarking', () => {
    const N_SMALL = 100;
    const N_MEDIUM = 1000;
    const N_LARGE = 10000;
    const N_VERY_LARGE = 100000;

    // --- Benchmarking Rotate Array ---
    describe('Rotate Array Benchmarking', () => {
        it(`should compare rotateArray (O(N)) vs rotateArrayBruteForce (O(N) space) for N=${N_VERY_LARGE}`, () => {
            const arr = Array.from({ length: N_VERY_LARGE }, (_, i) => i);
            const k = N_VERY_LARGE / 2;

            const arrCopy1 = deepCloneArray(arr);
            const timeOptimal = benchmarkFunction('rotateArray (Optimal)', rotateArray, arrCopy1, k);

            const arrCopy2 = deepCloneArray(arr);
            const timeBruteForce = benchmarkFunction(
                'rotateArrayBruteForce (Auxiliary Array)',
                rotateArrayBruteForce,
                arrCopy2,
                k
            );

            originalLog(`Rotate Array (N=${N_VERY_LARGE}, k=${k}):`);
            originalLog(`  Optimal (O(1) space): ${timeOptimal.toFixed(3)} ms`);
            originalLog(`  Brute-Force (O(N) space): ${timeBruteForce.toFixed(3)} ms`);

            // Optimal solution (in-place) should be faster or comparable, especially when N is large
            // and memory allocations for auxiliary array become significant.
            // On some systems, memory access patterns might make the copy faster for small N.
            // But for N_VERY_LARGE, the O(N) space version should show a penalty.
            expect(timeOptimal).toBeLessThan(timeBruteForce * 1.5); // Allow some leeway
        }, 10000); // Increase timeout for large tests

        it(`should compare rotateArray (O(N)) vs rotateArrayBruteForce (O(N) space) for N=${N_MEDIUM}`, () => {
            const arr = Array.from({ length: N_MEDIUM }, (_, i) => i);
            const k = N_MEDIUM / 2;

            const arrCopy1 = deepCloneArray(arr);
            const timeOptimal = benchmarkFunction('rotateArray (Optimal)', rotateArray, arrCopy1, k);

            const arrCopy2 = deepCloneArray(arr);
            const timeBruteForce = benchmarkFunction(
                'rotateArrayBruteForce (Auxiliary Array)',
                rotateArrayBruteForce,
                arrCopy2,
                k
            );

            originalLog(`Rotate Array (N=${N_MEDIUM}, k=${k}):`);
            originalLog(`  Optimal (O(1) space): ${timeOptimal.toFixed(3)} ms`);
            originalLog(`  Brute-Force (O(N) space): ${timeBruteForce.toFixed(3)} ms`);

            // Optimal should still be comparable or faster
            expect(timeOptimal).toBeLessThan(timeBruteForce * 1.5);
        });
    });

    // --- Benchmarking Product of Array Except Self ---
    describe('Product Except Self Benchmarking', () => {
        it(`should compare productExceptSelf (O(N), no division) vs productExceptSelfBruteForceWithDivision (O(N), with division) for N=${N_VERY_LARGE}`, () => {
            const arr = Array.from({ length: N_VERY_LARGE }, (_, i) => (i % 5 === 0 ? 1 : i + 1)); // Avoid too many zeros
            // Ensure no number becomes too big to cause overflow in JS numbers if multiplication isn't careful
            // For typical interview questions, numbers fit 32-bit. JS uses 64-bit floats, so safe for a while.

            const timeOptimal = benchmarkFunction('productExceptSelf (Optimal)', productExceptSelf, arr);
            const timeBruteForce = benchmarkFunction(
                'productExceptSelfBruteForceWithDivision (with division)',
                productExceptSelfBruteForceWithDivision,
                arr
            );

            originalLog(`Product Except Self (N=${N_VERY_LARGE}):`);
            originalLog(`  Optimal (O(N), no division): ${timeOptimal.toFixed(3)} ms`);
            originalLog(`  Brute-Force (O(N), with division): ${timeBruteForce.toFixed(3)} ms`);

            // Both are O(N), but the number of operations and memory access patterns might differ.
            // Division can sometimes be slower.
            expect(timeOptimal).toBeLessThan(timeBruteForce * 2); // Division might be slower
        }, 10000);

        it(`should compare productExceptSelf (O(N), no division) vs productExceptSelfBruteForceWithDivision (O(N), with division) for N=${N_MEDIUM}`, () => {
            const arr = Array.from({ length: N_MEDIUM }, (_, i) => (i % 5 === 0 ? 1 : i + 1));

            const timeOptimal = benchmarkFunction('productExceptSelf (Optimal)', productExceptSelf, arr);
            const timeBruteForce = benchmarkFunction(
                'productExceptSelfBruteForceWithDivision (with division)',
                productExceptSelfBruteForceWithDivision,
                arr
            );

            originalLog(`Product Except Self (N=${N_MEDIUM}):`);
            originalLog(`  Optimal (O(N), no division): ${timeOptimal.toFixed(3)} ms`);
            originalLog(`  Brute-Force (O(N), with division): ${timeBruteForce.toFixed(3)} ms`);

            expect(timeOptimal).toBeLessThan(timeBruteForce * 2);
        });
    });

    // --- Benchmarking Merge Intervals ---
    describe('Merge Intervals Benchmarking', () => {
        const generateIntervals = (count: number, maxVal: number, overlapFactor: number): number[][] => {
            const intervals: number[][] = [];
            let currentStart = 0;
            for (let i = 0; i < count; i++) {
                const start = Math.floor(Math.random() * (maxVal / count) + currentStart);
                const end = start + Math.floor(Math.random() * (maxVal / count / 2) + 1);
                intervals.push([start, end]);
                currentStart = end - Math.floor(Math.random() * end * overlapFactor); // Create overlaps
            }
            return intervals.sort((a, b) => Math.random() - 0.5); // Randomize order
        };

        it(`should compare mergeIntervals (O(N log N)) vs mergeIntervalsBruteForce (O(N^2)) for N=${N_MEDIUM}`, () => {
            const intervals = generateIntervals(N_MEDIUM, N_MEDIUM * 10, 0.5);

            const intervalsCopy1 = deepCloneArray(intervals);
            const timeOptimal = benchmarkFunction('mergeIntervals (Optimal)', mergeIntervals, intervalsCopy1);

            const intervalsCopy2 = deepCloneArray(intervals);
            const timeBruteForce = benchmarkFunction(
                'mergeIntervalsBruteForce (Brute Force)',
                mergeIntervalsBruteForce,
                intervalsCopy2
            );

            originalLog(`Merge Intervals (N=${N_MEDIUM}):`);
            originalLog(`  Optimal (O(N log N)): ${timeOptimal.toFixed(3)} ms`);
            originalLog(`  Brute-Force (O(N^2)): ${timeBruteForce.toFixed(3)} ms`);

            // O(N log N) should be significantly faster than O(N^2)
            expect(timeOptimal).toBeLessThan(timeBruteForce / 5); // Should be much faster
        }, 10000);

        it(`should compare mergeIntervals (O(N log N)) vs mergeIntervalsBruteForce (O(N^2)) for N=${N_SMALL}`, () => {
            const intervals = generateIntervals(N_SMALL, N_SMALL * 10, 0.5);

            const intervalsCopy1 = deepCloneArray(intervals);
            const timeOptimal = benchmarkFunction('mergeIntervals (Optimal)', mergeIntervals, intervalsCopy1);

            const intervalsCopy2 = deepCloneArray(intervals);
            const timeBruteForce = benchmarkFunction(
                'mergeIntervalsBruteForce (Brute Force)',
                mergeIntervalsBruteForce,
                intervalsCopy2
            );

            originalLog(`Merge Intervals (N=${N_SMALL}):`);
            originalLog(`  Optimal (O(N log N)): ${timeOptimal.toFixed(3)} ms`);
            originalLog(`  Brute-Force (O(N^2)): ${timeBruteForce.toFixed(3)} ms`);

            expect(timeOptimal).toBeLessThan(timeBruteForce / 2); // Still noticeably faster
        }, 5000);
    });

    // --- Benchmarking Trapping Rain Water ---
    describe('Trap Rain Water Benchmarking', () => {
        const generateTerrain = (count: number, maxH: number): number[] => {
            return Array.from({ length: count }, () => Math.floor(Math.random() * maxH));
        };

        it(`should compare trapRainWater (O(N), O(1) space) vs trapRainWaterDP (O(N), O(N) space) for N=${N_VERY_LARGE}`, () => {
            const terrain = generateTerrain(N_VERY_LARGE, 1000);

            const timeOptimal = benchmarkFunction('trapRainWater (Optimal)', trapRainWater, terrain);
            const timeDP = benchmarkFunction('trapRainWaterDP (DP)', trapRainWaterDP, terrain);

            originalLog(`Trap Rain Water (N=${N_VERY_LARGE}):`);
            originalLog(`  Optimal (O(N), O(1) space): ${timeOptimal.toFixed(3)} ms`);
            originalLog(`  DP (O(N), O(N) space): ${timeDP.toFixed(3)} ms`);

            // Both are O(N) time. The O(1) space version might be slightly faster due to less memory allocation/access.
            expect(timeOptimal).toBeLessThan(timeDP * 1.5); // Allow some overhead for DP's array creations
        }, 10000);

        it(`should compare trapRainWater (O(N), O(1) space) vs trapRainWaterDP (O(N), O(N) space) for N=${N_MEDIUM}`, () => {
            const terrain = generateTerrain(N_MEDIUM, 100);

            const timeOptimal = benchmarkFunction('trapRainWater (Optimal)', trapRainWater, terrain);
            const timeDP = benchmarkFunction('trapRainWaterDP (DP)', trapRainWaterDP, terrain);

            originalLog(`Trap Rain Water (N=${N_MEDIUM}):`);
            originalLog(`  Optimal (O(N), O(1) space): ${timeOptimal.toFixed(3)} ms`);
            originalLog(`  DP (O(N), O(N) space): ${timeDP.toFixed(3)} ms`);

            expect(timeOptimal).toBeLessThan(timeDP * 1.5);
        });
    });
});
```