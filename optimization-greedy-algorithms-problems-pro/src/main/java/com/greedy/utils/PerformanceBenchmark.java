package com.greedy.utils;

import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;

/**
 * Utility class for benchmarking the performance (execution time) of code blocks.
 * It provides methods to execute a given `Runnable` or `Supplier` and measure its duration.
 */
public class PerformanceBenchmark {

    /**
     * Executes a given Runnable and measures its execution time in milliseconds.
     *
     * @param taskName A descriptive name for the task being benchmarked.
     * @param task     The Runnable containing the code to be executed and benchmarked.
     * @return The execution time of the task in milliseconds.
     */
    public static long measureTime(String taskName, Runnable task) {
        long startTime = System.nanoTime(); // Use nanoTime for higher precision
        task.run();
        long endTime = System.nanoTime();
        long durationMillis = TimeUnit.NANOSECONDS.toMillis(endTime - startTime);

        System.out.printf("[%s] Execution time: %d ms%n", taskName, durationMillis);
        return durationMillis;
    }

    /**
     * Executes a given Supplier and measures its execution time in milliseconds,
     * returning the result of the Supplier's operation.
     *
     * @param taskName A descriptive name for the task being benchmarked.
     * @param task     The Supplier containing the code to be executed and benchmarked,
     *                 which also returns a result.
     * @param <T>      The type of the result returned by the Supplier.
     * @return A Pair containing the result of the Supplier and its execution time in milliseconds.
     */
    public static <T> DataStructures.Pair<T, Long> measureTimeAndResult(String taskName, Supplier<T> task) {
        long startTime = System.nanoTime();
        T result = task.get();
        long endTime = System.nanoTime();
        long durationMillis = TimeUnit.NANOSECONDS.toMillis(endTime - startTime);

        System.out.printf("[%s] Execution time: %d ms%n", taskName, durationMillis);
        return new DataStructures.Pair<>(result, durationMillis);
    }

    /**
     * A simple method to simulate some work for testing the benchmark utility.
     * @param milliseconds Duration to sleep
     */
    public static void simulateWork(long milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); // Restore the interrupted status
            System.err.println("Work simulation interrupted: " + e.getMessage());
        }
    }
}