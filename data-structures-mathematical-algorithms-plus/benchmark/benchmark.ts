/**
 * benchmark/benchmark.ts
 *
 * This file contains the benchmarking logic for comparing the performance of
 * different algorithm implementations for each problem.
 * It uses `process.hrtime.bigint()` for high-resolution timing in Node.js.
 */

import {
    Problem1GCD,
    Problem2PrimeFactorization,
    Problem3PowerFunction,
    Problem4NthFibonacci
} from '../src/algorithms';
import { BenchmarkResult } from '../utils/types';

// Helper for high-resolution timing
function measurePerformance<TArgs extends any[], TResult>(
    func: (...args: TArgs) => TResult,
    args: TArgs
): { result: TResult | undefined; durationMs: number; error?: string } {
    let result: TResult | undefined;
    let error: string | undefined;
    const start = process.hrtime.bigint();
    try {
        result = func(...args);
    } catch (e: any) {
        error = e.message;
    }
    const end = process.hrtime.bigint();
    const durationNs = end - start;
    return {
        result,
        durationMs: Number(durationNs) / 1_000_000, // Convert nanoseconds to milliseconds
        error
    };
}

// === Problem 1: Greatest Common Divisor (GCD) ===
function benchmarkGCD(): BenchmarkResult[] {
    const results: BenchmarkResult[] = [];
    const inputs = [
        { a: 48, b: 18 },
        { a: 1000000, b: 1 },
        { a: 999999999, b: 999999997 }, // Large, relatively prime (worst case for brute force)
        { a: 1234567890, b: 9876543210 }, // Large, multiple factors
        { a: 0, b: 1234567890 },
    ];

    console.log("\n--- Benchmarking GCD ---");

    for (const input of inputs) {
        console.log(`\nInput: a=${input.a}, b=${input.b}`);

        // Brute Force
        const bf = measurePerformance(Problem1GCD.gcdBruteForce, [input.a, input.b]);
        results.push({ name: 'GCD Brute Force', input: input, durationMs: bf.durationMs, error: bf.error });
        console.log(`  Brute Force: ${bf.durationMs.toFixed(3)} ms`);

        // Euclidean Recursive
        const er = measurePerformance(Problem1GCD.gcdEuclideanRecursive, [input.a, input.b]);
        results.push({ name: 'GCD Euclidean Recursive', input: input, durationMs: er.durationMs, error: er.error });
        console.log(`  Euclidean Recursive: ${er.durationMs.toFixed(3)} ms`);

        // Euclidean Iterative
        const ei = measurePerformance(Problem1GCD.gcdEuclideanIterative, [input.a, input.b]);
        results.push({ name: 'GCD Euclidean Iterative', input: input, durationMs: ei.durationMs, error: ei.error });
        console.log(`  Euclidean Iterative: ${ei.durationMs.toFixed(3)} ms`);
    }
    return results;
}

// === Problem 2: Prime Factorization ===
function benchmarkPrimeFactors(): BenchmarkResult[] {
    const results: BenchmarkResult[] = [];
    const inputs = [
        { n: 12 },
        { n: 997 }, // A prime number
        { n: 1000000 },
        { n: 999999 },
        { n: Problem2PrimeFactorization.MAX_SIEVE_LIMIT - 1 }, // Max for Sieve (composite)
        { n: Problem2PrimeFactorization.MAX_SIEVE_LIMIT } // Max for Sieve (power of 2 and 5)
    ];

    // Prepare Sieve once for multiple queries
    // Ensure sieve is initialized only once for fair comparison of query time
    Problem2PrimeFactorization.primeFactorsSieve(2); // Initialize sieve

    console.log("\n--- Benchmarking Prime Factorization ---");

    for (const input of inputs) {
        console.log(`\nInput: n=${input.n}`);

        // Trial Division
        const td = measurePerformance(Problem2PrimeFactorization.primeFactorsTrialDivision, [input.n]);
        results.push({ name: 'Prime Factors Trial Division', input: input, durationMs: td.durationMs, error: td.error });
        console.log(`  Trial Division: ${td.durationMs.toFixed(3)} ms`);

        // Sieve-based (query part)
        // Note: The precomputation for Sieve is not timed per query here.
        // It's assumed to be done once.
        let sieveResult;
        if (input.n <= Problem2PrimeFactorization.MAX_SIEVE_LIMIT) {
            sieveResult = measurePerformance(Problem2PrimeFactorization.primeFactorsSieve, [input.n]);
            results.push({ name: 'Prime Factors Sieve (query)', input: input, durationMs: sieveResult.durationMs, error: sieveResult.error });
            console.log(`  Sieve (query): ${sieveResult.durationMs.toFixed(3)} ms`);
        } else {
            console.log(`  Sieve (query): N=${input.n} is too large for current MAX_SIEVE_LIMIT.`);
            results.push({ name: 'Prime Factors Sieve (query)', input: input, durationMs: NaN, error: `N=${input.n} > MAX_SIEVE_LIMIT` });
        }
    }
    return results;
}

// === Problem 3: Power Function (x^n) ===
function benchmarkPower(): BenchmarkResult[] {
    const results: BenchmarkResult[] = [];
    const inputs = [
        { x: 2, n: 10 },
        { x: 2, n: 30 },
        { x: 2, n: 100 },
        { x: 2, n: 100000 },
        { x: 1.000001, n: 1000000 },
        { x: 0.5, n: -100 },
        { x: 0.5, n: -100000 }
    ];

    console.log("\n--- Benchmarking Power Function ---");

    for (const input of inputs) {
        console.log(`\nInput: x=${input.x}, n=${input.n}`);

        // Naive Iterative
        const ni = measurePerformance(Problem3PowerFunction.powerNaiveIterative, [input.x, input.n]);
        results.push({ name: 'Power Naive Iterative', input: input, durationMs: ni.durationMs, error: ni.error });
        console.log(`  Naive Iterative: ${ni.durationMs.toFixed(3)} ms`);

        // Binary Exponentiation
        const be = measurePerformance(Problem3PowerFunction.powerBinaryExponentiation, [input.x, input.n]);
        results.push({ name: 'Power Binary Exponentiation', input: input, durationMs: be.durationMs, error: be.error });
        console.log(`  Binary Exponentiation: ${be.durationMs.toFixed(3)} ms`);
    }
    return results;
}

// === Problem 4: Nth Fibonacci Number ===
function benchmarkFibonacci(): BenchmarkResult[] {
    const results: BenchmarkResult[] = [];
    const inputs = [
        { n: 10 },
        { n: 20 },
        { n: 40 },
        { n: 50 },
        { n: 70 },
        { n: 78 } // Max exact integer in JS
    ];

    console.log("\n--- Benchmarking Nth Fibonacci Number ---");

    for (const input of inputs) {
        console.log(`\nInput: n=${input.n}`);

        // Dynamic Programming (O(N) space optimized)
        const dp = measurePerformance(Problem4NthFibonacci.fibonacciDynamicProgramming, [input.n]);
        results.push({ name: 'Fibonacci DP (O(1) space)', input: input, durationMs: dp.durationMs, error: dp.error });
        console.log(`  DP (O(1) space): ${dp.durationMs.toFixed(3)} ms`);

        // Matrix Exponentiation (O(log N))
        const me = measurePerformance(Problem4NthFibonacci.fibonacciMatrixExponentiation, [input.n]);
        results.push({ name: 'Fibonacci Matrix Exponentiation', input: input, durationMs: me.durationMs, error: me.error });
        console.log(`  Matrix Exponentiation: ${me.durationMs.toFixed(3)} ms`);
    }
    return results;
}


// --- Main Benchmark Runner ---
async function runAllBenchmarks() {
    console.log("Starting benchmarks...");

    const allResults: BenchmarkResult[] = [];

    // Reset sieve state for a clean run if it was previously initialized
    Problem2PrimeFactorization.resetSieveForTesting();

    allResults.push(...benchmarkGCD());
    allResults.push(...benchmarkPrimeFactors());
    allResults.push(...benchmarkPower());
    allResults.push(...benchmarkFibonacci());

    console.log("\n--- All Benchmarks Complete ---");
    // Optionally, you could process or log `allResults` in a more structured way here.
}

runAllBenchmarks();