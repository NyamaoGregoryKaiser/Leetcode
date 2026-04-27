```typescript
/**
 * tests/performance/benchmark.test.ts
 *
 * This file contains performance benchmarks for different bit manipulation algorithms.
 * It uses Jest to run tests and `performance.now()` for timing.
 *
 * To run only benchmarks, use: `npm run benchmark`
 */

import {
    countSetBits_LSB,
    countSetBits_BrianKernighan,
    countSetBits_LookupTable
} from '../../src/algorithms/countSetBits';
import {
    isPowerOfTwo_Iterative,
    isPowerOfTwo_BitManipulation
} from '../../src/algorithms/isPowerOfTwo';
import {
    reverseBits_Iterative,
    reverseBits_GroupedSwaps
} from '../../src/algorithms/reverseBits';
import {
    singleNumber_HashMap,
    singleNumber_XOR
} from '../../src/algorithms/singleNumber';
import {
    generateSubsets_Bitmasking,
    generateSubsets_Backtracking
} from '../../src/algorithms/generateSubsets';


// --- Configuration ---
const ITERATIONS = 1000000; // Number of times to run each function for benchmarking
const LARGE_ARRAY_SIZE = 1000;
const SUBSET_N_MAX = 15; // Max N for subsets, 2^20 is too slow for 1M iterations


// Helper for consistent benchmarking output
function benchmarkFunction(
    name: string,
    func: Function,
    args: any[],
    iterations: number = ITERATIONS
) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        func(...args);
    }
    const end = performance.now();
    const duration = (end - start);
    console.log(`  ${name}: ${duration.toFixed(3)} ms for ${iterations} iterations`);
    return duration;
}

describe('Bit Manipulation Algorithm Benchmarks', () => {

    beforeAll(() => {
        console.log(`\n--- Running Performance Benchmarks (Iterations: ${ITERATIONS}) ---`);
    });

    // --- Benchmark: Count Set Bits (Hamming Weight) ---
    describe('Count Set Bits (Hamming Weight)', () => {
        const testNumSmallSetBits = 1234567; // 0x12D687 (7 set bits)
        const testNumManySetBits = 0xFFFFFFFF; // All 32 bits set
        const testNumFewSetBits = 1 << 30; // 1 set bit (MSB)

        test('should compare performance for different set bit counts', () => {
            console.log('\nBenchmarking Count Set Bits:');

            console.log(`\n  Input: ${testNumSmallSetBits} (7 set bits)`);
            benchmarkFunction('LSB Iteration', countSetBits_LSB, [testNumSmallSetBits]);
            benchmarkFunction('Brian Kernighan', countSetBits_BrianKernighan, [testNumSmallSetBits]);
            benchmarkFunction('Lookup Table', countSetBits_LookupTable, [testNumSmallSetBits]);

            console.log(`\n  Input: ${testNumManySetBits} (32 set bits)`);
            benchmarkFunction('LSB Iteration', countSetBits_LSB, [testNumManySetBits]);
            benchmarkFunction('Brian Kernighan', countSetBits_BrianKernighan, [testNumManySetBits]);
            benchmarkFunction('Lookup Table', countSetBits_LookupTable, [testNumManySetBits]);

            console.log(`\n  Input: ${testNumFewSetBits} (1 set bit)`);
            benchmarkFunction('LSB Iteration', countSetBits_LSB, [testNumFewSetBits]);
            benchmarkFunction('Brian Kernighan', countSetBits_BrianKernighan, [testNumFewSetBits]);
            benchmarkFunction('Lookup Table', countSetBits_LookupTable, [testNumFewSetBits]);
        });
    });

    // --- Benchmark: Is Power of Two ---
    describe('Is Power of Two', () => {
        const testNumPower = 1073741824; // 2^30
        const testNumNotPower = 1073741823; // 2^30 - 1

        test('should compare performance for power of two check', () => {
            console.log('\nBenchmarking Is Power of Two:');

            console.log(`\n  Input: ${testNumPower} (Power of Two)`);
            benchmarkFunction('Iterative Division', isPowerOfTwo_Iterative, [testNumPower]);
            benchmarkFunction('Bit Manipulation', isPowerOfTwo_BitManipulation, [testNumPower]);

            console.log(`\n  Input: ${testNumNotPower} (Not Power of Two)`);
            benchmarkFunction('Iterative Division', isPowerOfTwo_Iterative, [testNumNotPower]);
            benchmarkFunction('Bit Manipulation', isPowerOfTwo_BitManipulation, [testNumNotPower]);
        });
    });

    // --- Benchmark: Reverse Bits ---
    describe('Reverse Bits', () => {
        const testNum = 43261596; // 00000010100101000001111010011100
        const testNumComplex = 0xDEADBEEF;

        test('should compare performance for reversing bits', () => {
            console.log('\nBenchmarking Reverse Bits:');

            console.log(`\n  Input: ${testNum}`);
            benchmarkFunction('Iterative Bit-by-Bit', reverseBits_Iterative, [testNum]);
            benchmarkFunction('Grouped Bit Swapping', reverseBits_GroupedSwaps, [testNum]);

            console.log(`\n  Input: ${testNumComplex}`);
            benchmarkFunction('Iterative Bit-by-Bit', reverseBits_Iterative, [testNumComplex]);
            benchmarkFunction('Grouped Bit Swapping', reverseBits_GroupedSwaps, [testNumComplex]);
        });
    });

    // --- Benchmark: Single Number ---
    describe('Single Number', () => {
        // Create a large array with one unique number
        const largeArray: number[] = [];
        for (let i = 0; i < LARGE_ARRAY_SIZE / 2; i++) {
            largeArray.push(i, i); // Add pairs
        }
        largeArray.push(99999); // The single number
        // Shuffle to avoid predictable patterns
        for (let i = largeArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [largeArray[i], largeArray[j]] = [largeArray[j], largeArray[i]];
        }

        test('should compare performance for finding single number', () => {
            console.log(`\nBenchmarking Single Number (Array Size: ${largeArray.length}):`);
            benchmarkFunction('Hash Map', singleNumber_HashMap, [largeArray]);
            benchmarkFunction('Bit Manipulation (XOR)', singleNumber_XOR, [largeArray]);
        });
    });

    // --- Benchmark: Generate Subsets ---
    describe('Generate Subsets', () => {
        const subsetInputSmall = [1, 2, 3, 4]; // 2^4 = 16 subsets
        const subsetInputMedium = Array.from({ length: SUBSET_N_MAX }, (_, i) => i + 1); // Up to SUBSET_N_MAX elements
        const iterationsSubsets = 100; // Reduce iterations for larger N due to N*2^N complexity

        test(`should compare performance for generating subsets (N=${subsetInputSmall.length})`, () => {
            console.log(`\nBenchmarking Generate Subsets (Input N: ${subsetInputSmall.length}):`);
            benchmarkFunction('Bitmasking', generateSubsets_Bitmasking, [subsetInputSmall], iterationsSubsets);
            benchmarkFunction('Backtracking', generateSubsets_Backtracking, [subsetInputSmall], iterationsSubsets);
        });

        if (SUBSET_N_MAX <= 15) { // Ensure it's feasible
            test(`should compare performance for generating subsets (N=${SUBSET_N_MAX})`, () => {
                console.log(`\nBenchmarking Generate Subsets (Input N: ${SUBSET_N_MAX}, Iterations: ${iterationsSubsets}):`);
                benchmarkFunction('Bitmasking', generateSubsets_Bitmasking, [subsetInputMedium], iterationsSubsets);
                benchmarkFunction('Backtracking', generateSubsets_Backtracking, [subsetInputMedium], iterationsSubsets);
            });
        } else {
            console.log(`\nSkipping Generate Subsets benchmark for N > 15 due to high complexity (N=${SUBSET_N_MAX}).`);
        }
    });

    afterAll(() => {
        console.log('\n--- Benchmarks Finished ---');
    });
});
```