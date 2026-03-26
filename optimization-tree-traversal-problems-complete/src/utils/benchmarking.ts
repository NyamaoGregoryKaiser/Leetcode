```typescript
/**
 * src/utils/benchmarking.ts
 *
 * Utility functions for benchmarking algorithm performance.
 */

/**
 * Measures the execution time of a given function.
 *
 * @param func The function to benchmark.
 * @param args Arguments to pass to the function.
 * @returns An object containing the result of the function and its execution time in milliseconds.
 */
export function benchmarkFunction<T extends (...args: any[]) => any>(
    func: T,
    ...args: Parameters<T>
): { result: ReturnType<T>; timeMs: number } {
    const start = process.hrtime.bigint(); // High-resolution time
    const result = func(...args);
    const end = process.hrtime.bigint();
    const timeNs = end - start;
    const timeMs = Number(timeNs) / 1_000_000; // Convert nanoseconds to milliseconds

    return { result, timeMs };
}

/**
 * Runs a function multiple times and calculates average execution time.
 *
 * @param func The function to benchmark.
 * @param numRuns The number of times to run the function.
 * @param args Arguments to pass to the function.
 * @returns An object containing the last result, average execution time, and all run times.
 */
export function benchmarkFunctionAverage<T extends (...args: any[]) => any>(
    func: T,
    numRuns: number,
    ...args: Parameters<T>
): { lastResult: ReturnType<T>; averageTimeMs: number; allTimesMs: number[] } {
    if (numRuns <= 0) {
        throw new Error("Number of runs must be positive.");
    }

    let lastResult: ReturnType<T>;
    let totalTimeMs = 0;
    const allTimesMs: number[] = [];

    for (let i = 0; i < numRuns; i++) {
        const { result, timeMs } = benchmarkFunction(func, ...args);
        lastResult = result;
        totalTimeMs += timeMs;
        allTimesMs.push(timeMs);
    }

    const averageTimeMs = totalTimeMs / numRuns;

    // Type assertion for lastResult as it will be assigned at least once.
    return { lastResult: lastResult!, averageTimeMs, allTimesMs };
}

// Example usage (can be put in a separate benchmark script or test)
/*
import { TreeNode, buildTreeFromArray } from '../data-structures/TreeNode';
import { inorderTraversalRecursive, inorderTraversalIterative } from '../algorithms/treeTraversals';

function runBenchmarks() {
    console.log("--- Benchmarking Tree Traversals ---");

    // Create a large tree
    const largeArray = Array.from({ length: 100000 }, (_, i) => i + 1); // Skewed tree example
    const largeTree = buildTreeFromArray(largeArray);

    const balancedArray = [];
    for (let i = 1; i <= 65535; i++) { // 2^16 - 1 nodes for a balanced tree of depth 15
        balancedArray.push(i);
    }
    const balancedTree = buildTreeFromArray(balancedArray);


    const numRuns = 10;

    console.log("\nBenchmarking Inorder Traversal (Recursive) on large skewed tree:");
    const { averageTimeMs: recursiveSkewedTime } = benchmarkFunctionAverage(inorderTraversalRecursive, numRuns, largeTree);
    console.log(`  Average time (recursive, skewed): ${recursiveSkewedTime.toFixed(4)} ms`);

    console.log("Benchmarking Inorder Traversal (Iterative) on large skewed tree:");
    const { averageTimeMs: iterativeSkewedTime } = benchmarkFunctionAverage(inorderTraversalIterative, numRuns, largeTree);
    console.log(`  Average time (iterative, skewed): ${iterativeSkewedTime.toFixed(4)} ms`);

    console.log("\nBenchmarking Inorder Traversal (Recursive) on large balanced tree:");
    const { averageTimeMs: recursiveBalancedTime } = benchmarkFunctionAverage(inorderTraversalRecursive, numRuns, balancedTree);
    console.log(`  Average time (recursive, balanced): ${recursiveBalancedTime.toFixed(4)} ms`);

    console.log("Benchmarking Inorder Traversal (Iterative) on large balanced tree:");
    const { averageTimeMs: iterativeBalancedTime } = benchmarkFunctionAverage(inorderTraversalIterative, numRuns, balancedTree);
    console.log(`  Average time (iterative, balanced): ${iterativeBalancedTime.toFixed(4)} ms`);
}

// To run this:
// 1. Ensure `tsconfig.json` allows `esModuleInterop` and `moduleResolution: "node"`.
// 2. Compile `tsc src/utils/benchmarking.ts --outDir dist`
// 3. Run `node dist/utils/benchmarking.js` (or integrate into test suite)
*/
```