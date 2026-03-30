```java
package com.example.dp.utils;

import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;

/**
 * Utility class for performance benchmarking of algorithms.
 * It measures the execution time of a given task (Supplier<T>).
 */
public class PerformanceBenchmark {

    /**
     * Measures the execution time of a task and returns its result along with the time taken.
     *
     * @param task A Supplier representing the code to be benchmarked.
     *             It should return the result of the computation.
     * @param <T> The type of the result returned by the task.
     * @return A BenchmarkResult containing the task's result and its execution time in milliseconds.
     */
    public static <T> BenchmarkResult<T> measure(Supplier<T> task) {
        long startTime = System.nanoTime();
        T result = task.get();
        long endTime = System.nanoTime();
        long durationMillis = TimeUnit.NANOSECONDS.toMillis(endTime - startTime);
        return new BenchmarkResult<>(result, durationMillis);
    }

    /**
     * Record class to hold the result of a benchmark and its execution time.
     * @param <T> The type of the result.
     */
    public record BenchmarkResult<T>(T result, long durationMillis) {
        @Override
        public String toString() {
            return "Result: " + result + ", Time: " + durationMillis + " ms";
        }
    }

    /**
     * Example usage for benchmarking.
     */
    public static void main(String[] args) {
        // Example 1: Benchmarking a simple sum
        BenchmarkResult<Long> sumResult = measure(() -> {
            long sum = 0;
            for (int i = 0; i < 1_000_000; i++) {
                sum += i;
            }
            return sum;
        });
        System.out.println("Sum Benchmark: " + sumResult);

        // Example 2: Benchmarking a sleep operation
        BenchmarkResult<String> sleepResult = measure(() -> {
            try {
                Thread.sleep(100); // Simulate some work
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return "Task completed after sleep";
        });
        System.out.println("Sleep Benchmark: " + sleepResult);

        // Example 3: Benchmarking a potentially slow operation
        BenchmarkResult<Integer> fibResult = measure(() -> {
            // A simple recursive Fibonacci, known to be slow for large n
            return fibonacci(30);
        });
        System.out.println("Fibonacci(30) Benchmark: " + fibResult);
    }

    // Helper method for example 3 (recursive Fibonacci)
    private static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
```