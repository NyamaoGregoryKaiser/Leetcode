```java
package com.arraymanipulation.utils;

import com.arraymanipulation.problems.SolutionApproach;

import java.util.function.Supplier;

/**
 * A utility class to track the performance (execution time) of methods.
 * It provides a simple way to measure how long a block of code takes to run.
 */
public class PerformanceTracker {

    /**
     * Measures the execution time of a given Runnable (a method with no return value).
     *
     * @param description A string describing the operation being timed.
     * @param approach    The {@link SolutionApproach} used for the operation.
     * @param action      The Runnable representing the code to be executed and timed.
     */
    public static void measureTime(String description, SolutionApproach approach, Runnable action) {
        long startTime = System.nanoTime();
        action.run();
        long endTime = System.nanoTime();
        long durationMs = (endTime - startTime) / 1_000_000; // Convert nanoseconds to milliseconds

        System.out.printf("[%s] Approach: %-15s | Time: %d ms%n", description, approach.name(), durationMs);
    }

    /**
     * Measures the execution time of a given Supplier (a method with a return value).
     *
     * @param description A string describing the operation being timed.
     * @param approach    The {@link SolutionApproach} used for the operation.
     * @param action      The Supplier representing the code to be executed and timed.
     * @param <T>         The return type of the Supplier.
     * @return The result of the Supplier's execution.
     */
    public static <T> T measureTime(String description, SolutionApproach approach, Supplier<T> action) {
        long startTime = System.nanoTime();
        T result = action.get();
        long endTime = System.nanoTime();
        long durationMs = (endTime - startTime) / 1_000_000; // Convert nanoseconds to milliseconds

        System.out.printf("[%s] Approach: %-15s | Time: %d ms%n", description, approach.name(), durationMs);
        return result;
    }
}

```