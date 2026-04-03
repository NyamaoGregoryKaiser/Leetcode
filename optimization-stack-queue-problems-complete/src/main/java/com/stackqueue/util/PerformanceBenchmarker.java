```java
package com.stackqueue.util;

import com.stackqueue.problems.StackAndQueueProblems;

import java.util.Arrays;
import java.util.Random;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * Utility class for performance benchmarking of various solutions.
 * It provides methods to measure the execution time of a given task
 * over multiple iterations and reports average, min, and max times.
 */
public class PerformanceBenchmarker {

    private static final int DEFAULT_ITERATIONS = 50;
    private static final int WARMUP_ITERATIONS = 10; // Warm-up JVM before actual measurements

    /**
     * Benchmarks a Runnable task (no return value, no parameters).
     *
     * @param taskName   Name of the task being benchmarked.
     * @param runnable   The task to execute.
     * @param iterations Number of times to run the task for measurement.
     */
    public static void benchmark(String taskName, Runnable runnable, int iterations) {
        System.out.println("--- Benchmarking: " + taskName + " ---");

        // Warm-up phase
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            runnable.run();
        }

        long totalTime = 0;
        long minTime = Long.MAX_VALUE;
        long maxTime = Long.MIN_VALUE;

        System.out.println("Starting " + iterations + " iterations...");
        for (int i = 0; i < iterations; i++) {
            long startTime = System.nanoTime();
            runnable.run();
            long endTime = System.nanoTime();
            long duration = (endTime - startTime) / 1_000_000; // Convert to milliseconds

            totalTime += duration;
            minTime = Math.min(minTime, duration);
            maxTime = Math.max(maxTime, duration);

            // Optional: Print progress for long benchmarks
            if (iterations > 100 && i % (iterations / 10) == 0) {
                System.out.print(".");
            }
        }
        System.out.println("\n");

        System.out.printf("Results for %s (ms):\n", taskName);
        System.out.printf("  Total iterations: %d\n", iterations);
        System.out.printf("  Average time: %.2f ms\n", (double) totalTime / iterations);
        System.out.printf("  Minimum time: %d ms\n", minTime);
        System.out.printf("  Maximum time: %d ms\n", maxTime);
        System.out.println("----------------------------------------\n");
    }

    /**
     * Benchmarks a Consumer task (takes a parameter, no return value).
     *
     * @param taskName   Name of the task being benchmarked.
     * @param consumer   The task to execute.
     * @param inputSupplier A supplier to generate input for each iteration.
     * @param iterations Number of times to run the task for measurement.
     * @param <T>        Type of the input parameter.
     */
    public static <T> void benchmark(String taskName, Consumer<T> consumer, Supplier<T> inputSupplier, int iterations) {
        System.out.println("--- Benchmarking: " + taskName + " ---");

        // Warm-up phase
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            consumer.accept(inputSupplier.get());
        }

        long totalTime = 0;
        long minTime = Long.MAX_VALUE;
        long maxTime = Long.MIN_VALUE;

        System.out.println("Starting " + iterations + " iterations...");
        for (int i = 0; i < iterations; i++) {
            T input = inputSupplier.get(); // Generate new input for each run
            long startTime = System.nanoTime();
            consumer.accept(input);
            long endTime = System.nanoTime();
            long duration = (endTime - startTime) / 1_000_000; // Convert to milliseconds

            totalTime += duration;
            minTime = Math.min(minTime, duration);
            maxTime = Math.max(maxTime, duration);

            if (iterations > 100 && i % (iterations / 10) == 0) {
                System.out.print(".");
            }
        }
        System.out.println("\n");

        System.out.printf("Results for %s (ms):\n", taskName);
        System.out.printf("  Total iterations: %d\n", iterations);
        System.out.printf("  Average time: %.2f ms\n", (double) totalTime / iterations);
        System.out.printf("  Minimum time: %d ms\n", minTime);
        System.out.printf("  Maximum time: %d ms\n", maxTime);
        System.out.println("----------------------------------------\n");
    }

    /**
     * Benchmarks a Function task (takes a parameter, returns a value).
     *
     * @param taskName   Name of the task being benchmarked.
     * @param function   The task to execute.
     * @param inputSupplier A supplier to generate input for each iteration.
     * @param iterations Number of times to run the task for measurement.
     * @param <T>        Type of the input parameter.
     * @param <R>        Type of the return value.
     */
    public static <T, R> void benchmark(String taskName, Function<T, R> function, Supplier<T> inputSupplier, int iterations) {
        System.out.println("--- Benchmarking: " + taskName + " ---");

        // Warm-up phase
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            function.apply(inputSupplier.get());
        }

        long totalTime = 0;
        long minTime = Long.MAX_VALUE;
        long maxTime = Long.MIN_VALUE;

        System.out.println("Starting " + iterations + " iterations...");
        for (int i = 0; i < iterations; i++) {
            T input = inputSupplier.get(); // Generate new input for each run
            long startTime = System.nanoTime();
            function.apply(input);
            long endTime = System.nanoTime();
            long duration = (endTime - startTime) / 1_000_000; // Convert to milliseconds

            totalTime += duration;
            minTime = Math.min(minTime, duration);
            maxTime = Math.max(maxTime, duration);

            if (iterations > 100 && i % (iterations / 10) == 0) {
                System.out.print(".");
            }
        }
        System.out.println("\n");

        System.out.printf("Results for %s (ms):\n", taskName);
        System.out.printf("  Total iterations: %d\n", iterations);
        System.out.printf("  Average time: %.2f ms\n", (double) totalTime / iterations);
        System.out.printf("  Minimum time: %d ms\n", minTime);
        System.out.printf("  Maximum time: %d ms\n", maxTime);
        System.out.println("----------------------------------------\n");
    }

    // --- Main method to run specific benchmarks ---
    public static void main(String[] args) {
        StackAndQueueProblems problems = new StackAndQueueProblems();
        Random random = new Random();

        // Benchmark Daily Temperatures
        int dailyTempArraySize = 100_000;
        Supplier<int[]> tempArraySupplier = () -> {
            int[] arr = new int[dailyTempArraySize];
            for (int i = 0; i < dailyTempArraySize; i++) {
                arr[i] = 30 + random.nextInt(71); // Temps between 30 and 100
            }
            return arr;
        };

        benchmark("Daily Temperatures - Monotonic Stack", problems::dailyTemperatures, tempArraySupplier, DEFAULT_ITERATIONS);
        benchmark("Daily Temperatures - Brute Force", problems::dailyTemperaturesBruteForce, tempArraySupplier, DEFAULT_ITERATIONS);


        // Benchmark Sliding Window Maximum
        int slidingWindowArraySize = 100_000;
        int k = 1000; // Window size
        Supplier<int[]> slidingWindowArraySupplier = () -> {
            int[] arr = new int[slidingWindowArraySize];
            for (int i = 0; i < slidingWindowArraySize; i++) {
                arr[i] = random.nextInt(200_001) - 100_000; // Values between -100,000 and 100,000
            }
            return arr;
        };
        
        // Function for maxSlidingWindow takes int[] and int, need to adapt
        // Or create a wrapper lambda
        Function<int[], int[]> optimizedSlidingWindowFunc = arr -> problems.maxSlidingWindow(arr, k);
        benchmark("Sliding Window Max - Deque (k=" + k + ")", optimizedSlidingWindowFunc, slidingWindowArraySupplier, DEFAULT_ITERATIONS);

        Function<int[], int[]> bruteForceSlidingWindowFunc = arr -> problems.maxSlidingWindowBruteForce(arr, k);
        // Note: Brute force for sliding window max will be extremely slow for large N and K.
        // Reduce N and K or iterations for quick test.
        // Example with smaller N and K for brute force demonstration:
        int smallerN = 5_000;
        int smallerK = 100;
        Supplier<int[]> smallerSlidingWindowArraySupplier = () -> {
            int[] arr = new int[smallerN];
            for (int i = 0; i < smallerN; i++) {
                arr[i] = random.nextInt(200_001) - 100_000;
            }
            return arr;
        };
        Function<int[], int[]> bruteForceSlidingWindowSmallFunc = arr -> problems.maxSlidingWindowBruteForce(arr, smallerK);
        benchmark("Sliding Window Max - Brute Force (N=" + smallerN + ", k=" + smallerK + ")", bruteForceSlidingWindowSmallFunc, smallerSlidingWindowArraySupplier, DEFAULT_ITERATIONS);


        // Benchmark Valid Parentheses
        int stringLength = 1_000_000;
        Supplier<String> stringSupplier = () -> {
            StringBuilder sb = new StringBuilder();
            char[] brackets = {'(', ')', '{', '}', '[', ']'};
            for (int i = 0; i < stringLength; i++) {
                sb.append(brackets[random.nextInt(brackets.length)]);
            }
            return sb.toString();
        };

        benchmark("Valid Parentheses", problems::isValid, stringSupplier, DEFAULT_ITERATIONS);
    }
}
```