```typescript
import {
    countSetBits_iterative,
    countSetBits_brianKernighan,
    countSetBits_lookupTable
} from '../src/problems/countSetBits';

import {
    singleNumber_hashMap,
    singleNumber_xor
} from '../src/problems/singleNumber';

import {
    isPowerOfTwo_iterative,
    isPowerOfTwo_logarithm,
    isPowerOfTwo_bitwise
} from '../src/problems/isPowerOfTwo';

import {
    reverseBits_iterative,
    reverseBits_divideAndConquer
} from '../src/problems/reverseBits';

describe('Performance Benchmarks', () => {
    // Number of iterations for benchmark
    const ITERATIONS = 1000000;
    const NUM_RUNS = 5; // Run multiple times to average out
    const MAX_32_BIT_UNSIGNED = 0xFFFFFFFF; // 2^32 - 1

    function runBenchmark(name: string, func: (...args: any[]) => any, ...args: any[]): number {
        let totalTime = 0;
        for (let r = 0; r < NUM_RUNS; r++) {
            const start = process.hrtime.bigint();
            for (let i = 0; i < ITERATIONS; i++) {
                func(...args);
            }
            const end = process.hrtime.bigint();
            totalTime += Number(end - start); // Convert BigInt to Number for sum
        }
        const averageTime = totalTime / NUM_RUNS / 1_000_000; // Convert nanoseconds to milliseconds
        console.log(`  ${name}: ${averageTime.toFixed(4)} ms`);
        return averageTime;
    }

    // Adjust test timeout for benchmarks
    jest.setTimeout(60000); // 60 seconds

    it('should compare performance of Count Set Bits algorithms', () => {
        console.log('\n--- Benchmarking Count Set Bits ---');
        const numToTest = 43261596; // A number with a moderate number of set bits (10)
        const numAllOnes = MAX_32_BIT_UNSIGNED; // All 32 bits set

        console.log(`Testing with N = ${numToTest} (binary: ${numToTest.toString(2).padStart(32, '0')})`);
        runBenchmark('countSetBits_iterative', countSetBits_iterative, numToTest);
        runBenchmark('countSetBits_brianKernighan', countSetBits_brianKernighan, numToTest);
        runBenchmark('countSetBits_lookupTable', countSetBits_lookupTable, numToTest);

        console.log(`\nTesting with N = ${numAllOnes} (binary: ${numAllOnes.toString(2).padStart(32, '0')}) (worst case for Brian Kernighan)`);
        runBenchmark('countSetBits_iterative (all ones)', countSetBits_iterative, numAllOnes);
        runBenchmark('countSetBits_brianKernighan (all ones)', countSetBits_brianKernighan, numAllOnes);
        runBenchmark('countSetBits_lookupTable (all ones)', countSetBits_lookupTable, numAllOnes);
    });

    it('should compare performance of Single Number algorithms', () => {
        console.log('\n--- Benchmarking Single Number ---');
        // Generate a large array for testing
        const N_ELEMENTS = 10000;
        const testArray: number[] = [];
        for (let i = 0; i < N_ELEMENTS / 2; i++) {
            testArray.push(i, i); // Add duplicates
        }
        testArray.push(N_ELEMENTS); // Add the single unique number

        // Shuffle the array to avoid best-case scenarios for hashmap for example
        for (let i = testArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [testArray[i], testArray[j]] = [testArray[j], testArray[i]];
        }

        console.log(`Testing with array of ${testArray.length} elements (one unique)`);
        runBenchmark('singleNumber_hashMap', singleNumber_hashMap, testArray);
        runBenchmark('singleNumber_xor', singleNumber_xor, testArray);

        // Additional benchmark for singleNumber_threeTimes
        const testArrayThreeTimes: number[] = [];
        for (let i = 0; i < N_ELEMENTS / 3; i++) {
            testArrayThreeTimes.push(i, i, i); // Add three times duplicates
        }
        testArrayThreeTimes.push(N_ELEMENTS); // Add the single unique number
        for (let i = testArrayThreeTimes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [testArrayThreeTimes[i], testArrayThreeTimes[j]] = [testArrayThreeTimes[j], testArrayThreeTimes[i]];
        }
        console.log(`\nTesting singleNumber_threeTimes with array of ${testArrayThreeTimes.length} elements (one unique, others three times)`);
        runBenchmark('singleNumber_threeTimes', singleNumber_threeTimes, testArrayThreeTimes);
    });

    it('should compare performance of Is Power of Two algorithms', () => {
        console.log('\n--- Benchmarking Is Power of Two ---');
        const powerOfTwo = 2147483648; // 2^31
        const notPowerOfTwo = 2147483647; // 2^31 - 1

        console.log(`Testing with power of two: ${powerOfTwo}`);
        runBenchmark('isPowerOfTwo_iterative (true)', isPowerOfTwo_iterative, powerOfTwo);
        runBenchmark('isPowerOfTwo_logarithm (true)', isPowerOfTwo_logarithm, powerOfTwo);
        runBenchmark('isPowerOfTwo_bitwise (true)', isPowerOfTwo_bitwise, powerOfTwo);

        console.log(`\nTesting with not a power of two: ${notPowerOfTwo}`);
        runBenchmark('isPowerOfTwo_iterative (false)', isPowerOfTwo_iterative, notPowerOfTwo);
        runBenchmark('isPowerOfTwo_logarithm (false)', isPowerOfTwo_logarithm, notPowerOfTwo);
        runBenchmark('isPowerOfTwo_bitwise (false)', isPowerOfTwo_bitwise, notPowerOfTwo);
    });

    it('should compare performance of Reverse Bits algorithms', () => {
        console.log('\n--- Benchmarking Reverse Bits ---');
        const numToReverse = 43261596; // LeetCode example
        const numAllOnes = MAX_32_BIT_UNSIGNED;

        console.log(`Testing with N = ${numToReverse} (binary: ${numToReverse.toString(2).padStart(32, '0')})`);
        runBenchmark('reverseBits_iterative', reverseBits_iterative, numToReverse);
        runBenchmark('reverseBits_divideAndConquer', reverseBits_divideAndConquer, numToReverse);

        console.log(`\nTesting with N = ${numAllOnes} (binary: ${numAllOnes.toString(2).padStart(32, '0')})`);
        runBenchmark('reverseBits_iterative (all ones)', reverseBits_iterative, numAllOnes);
        runBenchmark('reverseBits_divideAndConquer (all ones)', reverseBits_divideAndConquer, numAllOnes);
    });
});
```