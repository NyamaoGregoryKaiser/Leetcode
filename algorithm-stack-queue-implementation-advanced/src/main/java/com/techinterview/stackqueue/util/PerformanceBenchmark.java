```java
package com.techinterview.stackqueue.util;

import java.util.function.Supplier;

/**
 * Utility class for simple performance benchmarking of methods.
 */
public class PerformanceBenchmark {

    /**
     * Measures the execution time of a given code block.
     *
     * @param runnable The code block to measure (a lambda expression or Runnable).
     * @param iterations Number of times to run the code block for averaging.
     * @param description A description of the benchmark task.
     * @return The average execution time in nanoseconds.
     */
    public static long measureTime(Runnable runnable, int iterations, String description) {
        if (iterations <= 0) {
            throw new IllegalArgumentException("Iterations must be positive.");
        }

        long totalTime = 0;
        // Warm-up phase to allow JIT compiler to optimize
        for (int i = 0; i < iterations / 10; i++) { // Run for 10% of iterations as warm-up
            runnable.run();
        }

        System.out.println(String.format("Starting benchmark: %s (iterations: %d)...", description, iterations));
        long startTime = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            runnable.run();
        }
        long endTime = System.nanoTime();
        totalTime = endTime - startTime;

        long averageTime = totalTime / iterations;
        System.out.println(String.format("  Average time for %s: %,d nanoseconds (%,.3f ms)",
                description, averageTime, averageTime / 1_000_000.0));
        return averageTime;
    }

    /**
     * Measures the execution time of a given code block that returns a result.
     *
     * @param supplier The code block to measure (a lambda expression or Supplier).
     * @param iterations Number of times to run the code block for averaging.
     * @param description A description of the benchmark task.
     * @param <T> The type of the result returned by the supplier.
     * @return The average execution time in nanoseconds.
     */
    public static <T> long measureTimeWithResult(Supplier<T> supplier, int iterations, String description) {
        if (iterations <= 0) {
            throw new IllegalArgumentException("Iterations must be positive.");
        }

        // Warm-up phase
        for (int i = 0; i < iterations / 10; i++) {
            supplier.get();
        }

        System.out.println(String.format("Starting benchmark: %s (iterations: %d)...", description, iterations));
        long startTime = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            supplier.get();
        }
        long endTime = System.nanoTime();
        long totalTime = endTime - startTime;

        long averageTime = totalTime / iterations;
        System.out.println(String.format("  Average time for %s: %,d nanoseconds (%,.3f ms)",
                description, averageTime, averageTime / 1_000_000.0));
        return averageTime;
    }

    /**
     * Prints the results of a benchmark.
     *
     * @param description A description of the benchmark.
     * @param durationNs The duration in nanoseconds.
     * @param iterations The number of iterations.
     */
    public static void printBenchmarkResult(String description, long durationNs, int iterations) {
        System.out.println(String.format("  Benchmark Result: %s", description));
        System.out.println(String.format("    Total Time: %,d nanoseconds (%,.3f ms)", durationNs, durationNs / 1_000_000.0));
        System.out.println(String.format("    Iterations: %,d", iterations));
        System.out.println(String.format("    Average Time Per Iteration: %,d nanoseconds (%,.3f ms)", durationNs / iterations, (durationNs / iterations) / 1_000_000.0));
    }
}
```