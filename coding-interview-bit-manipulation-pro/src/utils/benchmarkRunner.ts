```typescript
/**
 * @file benchmarkRunner.ts
 * @description Script to run performance benchmarks for bit manipulation algorithms.
 *              Execute with `npm run benchmark`.
 */

import { benchmarkSolutions } from './benchmark';
import { allBitManipulationSolutions } from '../algorithms/bitManipulationProblems';
import { UInt32 } from '../algorithms/types';

// Define some typical test cases for benchmarking
const COUNT_SET_BITS_TEST_CASE: UInt32 = 0b10110101110101011011110010101010; // A mix of set and clear bits
const POWER_OF_TWO_TEST_CASE: UInt32 = 1073741824; // 2^30
const REVERSE_BITS_TEST_CASE: UInt32 = 0b10101010101010101010101010101010; // Alternating bits
const SINGLE_NUMBER_TEST_CASE: number[] = Array.from({ length: 10000 }).flatMap((_, i) => [i + 1, i + 1]).concat([99999]); // Large array
const INSERT_M_INTO_N_TEST_CASE = { N: 0b10000000000, M: 0b10011, i: 2, j: 6 };

// Run benchmarks for each problem
function runAllBenchmarks() {
    // Problem 1: Count Set Bits
    benchmarkSolutions(
        "Count Set Bits",
        [
            allBitManipulationSolutions.countSetBits.bruteForce,
            allBitManipulationSolutions.countSetBits.brianKernighan,
            allBitManipulationSolutions.countSetBits.lookupTable,
        ],
        COUNT_SET_BITS_TEST_CASE,
        500000 // More iterations for these fast ops
    );

    // Problem 2: Is Power of Two
    benchmarkSolutions(
        "Is Power of Two",
        [
            allBitManipulationSolutions.isPowerOfTwo.bruteForce,
            allBitManipulationSolutions.isPowerOfTwo.bitManipulation,
        ],
        POWER_OF_TWO_TEST_CASE,
        1000000 // Very fast, need many iterations
    );

    // Problem 3: Reverse Bits
    benchmarkSolutions(
        "Reverse Bits",
        [
            allBitManipulationSolutions.reverseBits.iterative,
            allBitManipulationSolutions.reverseBits.lookupTable,
        ],
        REVERSE_BITS_TEST_CASE,
        500000 // More iterations
    );

    // Problem 4: Single Number
    benchmarkSolutions(
        "Single Number",
        [
            allBitManipulationSolutions.singleNumber.hashMap,
            allBitManipulationSolutions.singleNumber.xor,
        ],
        SINGLE_NUMBER_TEST_CASE,
        100 // Fewer iterations for large array inputs
    );

    // Problem 5: Insert M into N
    benchmarkSolutions(
        "Insert M into N",
        [
            allBitManipulationSolutions.insertMIntoN.optimal,
        ],
        INSERT_M_INTO_N_TEST_CASE,
        500000 // More iterations
    );
}

runAllBenchmarks();
```