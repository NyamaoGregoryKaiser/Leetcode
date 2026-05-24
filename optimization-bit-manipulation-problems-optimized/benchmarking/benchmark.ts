```typescript
// This file can be run directly using `ts-node benchmarking/benchmark.ts`
// or via `npm run benchmark`. It's independent of Jest tests.

import {
    countSetBits_iterative,
    countSetBits_brianKernighan,
    countSetBits_lookupTable
} from '../src/problems/countSetBits';

import {
    singleNumber_hashMap,
    singleNumber_xor,
    singleNumber_threeTimes
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

interface BenchmarkConfig {
    name: string;
    func: (...args: any[]) => any;
    args: any[];
}

const ITERATIONS_PER_FUNCTION = 5_000_000; // Increased iterations for more stable results
const WARMUP_ITERATIONS = 1_000_000; // Warmup to prime JIT compiler

function runFunctionWithWarmup(func: (...args: any[]) => any, args: any[], iterations: number, warmupIterations: number) {
    // Warmup phase
    for (let i = 0; i < warmupIterations; i++) {
        func(...args);
    }

    // Actual benchmark
    const start = process.hrtime.bigint();
    for (let i = 0; i < iterations; i++) {
        func(...args);
    }
    const end = process.hrtime.bigint();
    return Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds
}

function runBenchmarkSuite(title: string, configs: BenchmarkConfig[]) {
    console.log(`\n--- ${title} ---`);
    console.log(`Running each function ${ITERATIONS_PER_FUNCTION} times after ${WARMUP_ITERATIONS} warmup iterations.`);

    const results: { name: string; time: number }[] = [];

    for (const config of configs) {
        process.stdout.write(`Benchmarking ${config.name}... `);
        const time = runFunctionWithWarmup(config.func, config.args, ITERATIONS_PER_FUNCTION, WARMUP_ITERATIONS);
        console.log(`${time.toFixed(4)} ms`);
        results.push({ name: config.name, time: time });
    }

    console.log('\nSummary:');
    results.sort((a, b) => a.time - b.time);
    results.forEach((res, index) => {
        console.log(`${index + 1}. ${res.name}: ${res.time.toFixed(4)} ms`);
    });
}

// --- Benchmark Definitions ---

// Count Set Bits
const numCountSetBits = 43261596; // 00000010100101000001111010011100 (10 set bits)
const numAllOnes = 0xFFFFFFFF; // All 32 bits set

const countSetBitsBenchmarks: BenchmarkConfig[] = [
    { name: 'countSetBits_iterative (sparse)', func: countSetBits_iterative, args: [numCountSetBits] },
    { name: 'countSetBits_brianKernighan (sparse)', func: countSetBits_brianKernighan, args: [numCountSetBits] },
    { name: 'countSetBits_lookupTable (sparse)', func: countSetBits_lookupTable, args: [numCountSetBits] },
    { name: 'countSetBits_iterative (dense)', func: countSetBits_iterative, args: [numAllOnes] },
    { name: 'countSetBits_brianKernighan (dense)', func: countSetBits_brianKernighan, args: [numAllOnes] },
    { name: 'countSetBits_lookupTable (dense)', func: countSetBits_lookupTable, args: [numAllOnes] },
];

// Single Number
const N_ELEMENTS_SINGLE = 1000; // Smaller for array-based problems
const singleNumberArray: number[] = [];
for (let i = 0; i < N_ELEMENTS_SINGLE / 2; i++) {
    singleNumberArray.push(i, i);
}
singleNumberArray.push(N_ELEMENTS_SINGLE);
// Shuffle to make it realistic
for (let i = singleNumberArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [singleNumberArray[i], singleNumberArray[j]] = [singleNumberArray[j], singleNumberArray[i]];
}

const singleNumberBenchmarks: BenchmarkConfig[] = [
    { name: 'singleNumber_hashMap', func: singleNumber_hashMap, args: [singleNumberArray] },
    { name: 'singleNumber_xor', func: singleNumber_xor, args: [singleNumberArray] },
];

// Single Number (Three Times)
const N_ELEMENTS_THREE_TIMES = 1000;
const singleNumberThreeTimesArray: number[] = [];
for (let i = 0; i < N_ELEMENTS_THREE_TIMES / 3; i++) {
    singleNumberThreeTimesArray.push(i, i, i);
}
singleNumberThreeTimesArray.push(N_ELEMENTS_THREE_TIMES);
for (let i = singleNumberThreeTimesArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [singleNumberThreeTimesArray[i], singleNumberThreeTimesArray[j]] = [singleNumberThreeTimesArray[j], singleNumberThreeTimesArray[i]];
}

const singleNumberThreeTimesBenchmarks: BenchmarkConfig[] = [
    { name: 'singleNumber_threeTimes', func: singleNumber_threeTimes, args: [singleNumberThreeTimesArray] },
];


// Is Power of Two
const powerOfTwoNum = 2147483648; // 2^31
const notPowerOfTwoNum = 2147483647; // 2^31 - 1

const isPowerOfTwoBenchmarks: BenchmarkConfig[] = [
    { name: 'isPowerOfTwo_iterative (true)', func: isPowerOfTwo_iterative, args: [powerOfTwoNum] },
    { name: 'isPowerOfTwo_logarithm (true)', func: isPowerOfTwo_logarithm, args: [powerOfTwoNum] },
    { name: 'isPowerOfTwo_bitwise (true)', func: isPowerOfTwo_bitwise, args: [powerOfTwoNum] },
    { name: 'isPowerOfTwo_iterative (false)', func: isPowerOfTwo_iterative, args: [notPowerOfTwoNum] },
    { name: 'isPowerOfTwo_logarithm (false)', func: isPowerOfTwo_logarithm, args: [notPowerOfTwoNum] },
    { name: 'isPowerOfTwo_bitwise (false)', func: isPowerOfTwo_bitwise, args: [notPowerOfTwoNum] },
];

// Reverse Bits
const numToReverse = 43261596;
const numToReverseAllOnes = 0xFFFFFFFF;

const reverseBitsBenchmarks: BenchmarkConfig[] = [
    { name: 'reverseBits_iterative (sparse)', func: reverseBits_iterative, args: [numToReverse] },
    { name: 'reverseBits_divideAndConquer (sparse)', func: reverseBits_divideAndConquer, args: [numToReverse] },
    { name: 'reverseBits_iterative (dense)', func: reverseBits_iterative, args: [numToReverseAllOnes] },
    { name: 'reverseBits_divideAndConquer (dense)', func: reverseBits_divideAndConquer, args: [numToReverseAllOnes] },
];

// --- Run all benchmarks ---
async function main() {
    console.log('Starting Bit Manipulation Benchmarks...');
    console.log('Node.js version:', process.version);
    console.log('Platform:', process.platform);

    runBenchmarkSuite('Count Set Bits', countSetBitsBenchmarks);
    runBenchmarkSuite('Single Number (appears twice)', singleNumberBenchmarks);
    runBenchmarkSuite('Single Number (appears three times)', singleNumberThreeTimesBenchmarks);
    runBenchmarkSuite('Is Power of Two', isPowerOfTwoBenchmarks);
    runBenchmarkSuite('Reverse Bits', reverseBitsBenchmarks);

    console.log('\nBenchmarks finished.');
}

main().catch(console.error);
```