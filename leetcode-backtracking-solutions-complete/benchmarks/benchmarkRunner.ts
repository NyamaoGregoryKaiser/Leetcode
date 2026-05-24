import { solveNQueens, solveNQueensOptimizedSpace, subsetsWithDup, combinationSum2, permuteUnique } from '@problems/index';
import { performance } from 'perf_hooks';

/**
 * @fileoverview
 * This file contains performance benchmarking code for the backtracking algorithms.
 * It measures the execution time for different problems with varying input sizes.
 */

interface BenchmarkResult {
    problem: string;
    inputDescription: string;
    timeMs: number;
    iterations: number;
    notes?: string;
}

const runBenchmark = <TArgs extends any[], TResult>(
    name: string,
    func: (...args: TArgs) => TResult,
    inputArgs: TArgs,
    inputDescription: string,
    iterations: number = 1
): BenchmarkResult => {
    let totalTime = 0;
    let lastResult: TResult | undefined;

    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        lastResult = func(...inputArgs);
        const endTime = performance.now();
        totalTime += (endTime - startTime);
    }

    return {
        problem: name,
        inputDescription,
        timeMs: totalTime / iterations,
        iterations,
        notes: `Result count: ${Array.isArray(lastResult) ? lastResult.length : 'N/A'}`
    };
};

const printBenchmarkResults = (results: BenchmarkResult[]) => {
    console.log("\n--- Backtracking Algorithm Benchmarks ---");
    console.log("-----------------------------------------");
    results.forEach(res => {
        console.log(`Problem: ${res.problem}`);
        console.log(`  Input: ${res.inputDescription}`);
        console.log(`  Avg Time: ${res.timeMs.toFixed(3)} ms`);
        console.log(`  Iterations: ${res.iterations}`);
        if (res.notes) {
            console.log(`  Notes: ${res.notes}`);
        }
        console.log("-----------------------------------------");
    });
    console.log("--- End Benchmarks ---\n");
};

const main = () => {
    const allResults: BenchmarkResult[] = [];

    console.log("Running benchmarks... This may take some time for larger inputs.");

    // --- N-Queens ---
    console.log("\nBenchmarking N-Queens...");
    allResults.push(runBenchmark('N-Queens (N=4)', solveNQueens, [4], 'n=4', 1000));
    allResults.push(runBenchmark('N-Queens (N=4) (Optimized Space)', solveNQueensOptimizedSpace, [4], 'n=4', 1000));
    allResults.push(runBenchmark('N-Queens (N=8)', solveNQueens, [8], 'n=8', 10)); // N=8 is 92 solutions
    allResults.push(runBenchmark('N-Queens (N=8) (Optimized Space)', solveNQueensOptimizedSpace, [8], 'n=8', 10));
    allResults.push(runBenchmark('N-Queens (N=10)', solveNQueens, [10], 'n=10', 1)); // N=10 is 724 solutions
    allResults.push(runBenchmark('N-Queens (N=10) (Optimized Space)', solveNQueensOptimizedSpace, [10], 'n=10', 1));
    allResults.push(runBenchmark('N-Queens (N=12)', solveNQueens, [12], 'n=12', 1)); // N=12 is 14200 solutions, very slow
    // Skipping N=12 for optimized space for now as it's just a space optimization, not a huge speedup.
    // If you need to run N=12 for optimized space, uncomment below. It might still be slow.
    // allResults.push(runBenchmark('N-Queens (N=12) (Optimized Space)', solveNQueensOptimizedSpace, [12], 'n=12', 1));


    // --- Subsets With Duplicates ---
    console.log("\nBenchmarking Subsets With Duplicates...");
    allResults.push(runBenchmark('SubsetsWithDup', subsetsWithDup, [[1, 2, 2]], '[1,2,2]', 1000));
    allResults.push(runBenchmark('SubsetsWithDup', subsetsWithDup, [[1, 1, 1, 1, 2]], '[1,1,1,1,2]', 100)); // N=5, many duplicates
    allResults.push(runBenchmark('SubsetsWithDup', subsetsWithDup, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], '1-10 unique', 10)); // N=10, 2^10 = 1024 subsets
    allResults.push(runBenchmark('SubsetsWithDup', subsetsWithDup, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]], '10 ones', 100)); // N=10, fewer unique subsets (11)
    allResults.push(runBenchmark('SubsetsWithDup', subsetsWithDup, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]], '1-12 unique', 1)); // N=12, 2^12 = 4096 subsets

    // --- Combination Sum II ---
    console.log("\nBenchmarking Combination Sum II...");
    allResults.push(runBenchmark('CombinationSum2', combinationSum2, [[10, 1, 2, 7, 6, 1, 5], 8], '[10,1,2,7,6,1,5], target=8', 1000));
    allResults.push(runBenchmark('CombinationSum2', combinationSum2, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 20], '20 ones, target=20', 100)); // N=20, one solution
    allResults.push(runBenchmark('CombinationSum2', combinationSum2, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 20], '1-15 unique, target=20', 10)); // N=15, varied solutions
    allResults.push(runBenchmark('CombinationSum2', combinationSum2, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 30], '1-20 unique, target=30', 1)); // N=20
    allResults.push(runBenchmark('CombinationSum2', combinationSum2, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 15], '30 ones, target=15', 10)); // N=30, one solution

    // --- Permutations With Duplicates ---
    console.log("\nBenchmarking Permutations With Duplicates...");
    allResults.push(runBenchmark('PermuteUnique', permuteUnique, [[1, 1, 2]], '[1,1,2]', 1000));
    allResults.push(runBenchmark('PermuteUnique', permuteUnique, [[1, 2, 3, 4]], '[1,2,3,4]', 100)); // N=4, 4! = 24 permutations
    allResults.push(runBenchmark('PermuteUnique', permuteUnique, [[1, 1, 2, 2]], '[1,1,2,2]', 100)); // N=4, 4!/(2!2!) = 6 permutations
    allResults.push(runBenchmark('PermuteUnique', permuteUnique, [[1, 2, 3, 4, 5]], '[1,2,3,4,5]', 10)); // N=5, 5! = 120 permutations
    allResults.push(runBenchmark('PermuteUnique', permuteUnique, [[1, 1, 1, 2, 3]], '[1,1,1,2,3]', 10)); // N=5, 5!/3! = 20 permutations
    allResults.push(runBenchmark('PermuteUnique', permuteUnique, [[1, 2, 3, 4, 5, 6]], '[1,2,3,4,5,6]', 1)); // N=6, 6! = 720 permutations
    allResults.push(runBenchmark('PermuteUnique', permuteUnique, [[1, 1, 1, 1, 2, 3]], '[1,1,1,1,2,3]', 1)); // N=6, 6!/4! = 30 permutations


    printBenchmarkResults(allResults);
};

main();