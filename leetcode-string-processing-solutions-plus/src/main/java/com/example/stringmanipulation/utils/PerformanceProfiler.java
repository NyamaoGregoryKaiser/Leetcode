```java
package com.example.stringmanipulation.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Supplier;

/**
 * PerformanceProfiler
 * A utility class to measure the execution time of methods or code blocks.
 * It provides functionality to run a given task multiple times, collect execution times,
 * and report statistics like average, min, and max execution times.
 */
public class PerformanceProfiler {

    /**
     * Profiles the execution time of a given Runnable task.
     * The task is executed a specified number of times, and performance statistics are collected.
     *
     * @param task The Runnable task to profile.
     * @param taskName A descriptive name for the task being profiled.
     * @param iterations The number of times to run the task for profiling.
     * @return A ProfilerResult object containing the statistics.
     * @throws IllegalArgumentException if iterations is less than 1.
     */
    public static ProfilerResult profileMethod(Runnable task, String taskName, int iterations) {
        if (iterations < 1) {
            throw new IllegalArgumentException("Iterations must be at least 1.");
        }

        List<Long> runtimesNs = new ArrayList<>(); // Store runtimes in nanoseconds

        System.out.println(String.format("Starting profiling for '%s' over %d iterations...", taskName, iterations));

        for (int i = 0; i < iterations; i++) {
            long startTime = System.nanoTime();
            task.run(); // Execute the task
            long endTime = System.nanoTime();
            runtimesNs.add(endTime - startTime);
        }

        System.out.println(String.format("Finished profiling for '%s'.", taskName));

        return calculateStats(taskName, iterations, runtimesNs);
    }

    /**
     * Profiles the execution time of a given Supplier task.
     * The task is executed a specified number of times, and performance statistics are collected.
     * This version can be used for methods that return a value.
     *
     * @param task The Supplier task to profile.
     * @param taskName A descriptive name for the task being profiled.
     * @param iterations The number of times to run the task for profiling.
     * @param <T> The return type of the Supplier task.
     * @return A ProfilerResult object containing the statistics.
     * @throws IllegalArgumentException if iterations is less than 1.
     */
    public static <T> ProfilerResult profileMethod(Supplier<T> task, String taskName, int iterations) {
        if (iterations < 1) {
            throw new IllegalArgumentException("Iterations must be at least 1.");
        }

        List<Long> runtimesNs = new ArrayList<>(); // Store runtimes in nanoseconds
        // You might want to store the last result to prevent dead code elimination if it's the only usage
        T lastResult = null;

        System.out.println(String.format("Starting profiling for '%s' over %d iterations...", taskName, iterations));

        for (int i = 0; i < iterations; i++) {
            long startTime = System.nanoTime();
            lastResult = task.get(); // Execute the task and get result
            long endTime = System.nanoTime();
            runtimesNs.add(endTime - startTime);
        }

        System.out.println(String.format("Finished profiling for '%s'. Last result: %s", taskName, lastResult));

        return calculateStats(taskName, iterations, runtimesNs);
    }

    /**
     * Calculates performance statistics (min, max, average) from a list of runtimes.
     *
     * @param taskName The name of the task.
     * @param iterations The number of iterations performed.
     * @param runtimesNs A list of execution times in nanoseconds.
     * @return A ProfilerResult object.
     */
    private static ProfilerResult calculateStats(String taskName, int iterations, List<Long> runtimesNs) {
        if (runtimesNs.isEmpty()) {
            return new ProfilerResult(taskName, iterations, 0, 0, 0);
        }

        long minNs = Collections.min(runtimesNs);
        long maxNs = Collections.max(runtimesNs);
        long totalNs = runtimesNs.stream().mapToLong(Long::longValue).sum();
        long averageNs = totalNs / iterations;

        return new ProfilerResult(taskName, iterations, minNs, maxNs, averageNs);
    }

    /**
     * Helper class to hold and present profiling results.
     */
    public static class ProfilerResult {
        private final String taskName;
        private final int iterations;
        private final long minTimeNs;
        private final long maxTimeNs;
        private final long averageTimeNs;

        public ProfilerResult(String taskName, int iterations, long minTimeNs, long maxTimeNs, long averageTimeNs) {
            this.taskName = taskName;
            this.iterations = iterations;
            this.minTimeNs = minTimeNs;
            this.maxTimeNs = maxTimeNs;
            this.averageTimeNs = averageTimeNs;
        }

        public String getTaskName() { return taskName; }
        public int getIterations() { return iterations; }
        public long getMinTimeNs() { return minTimeNs; }
        public long getMaxTimeNs() { return maxTimeNs; }
        public long getAverageTimeNs() { return averageTimeNs; }

        public double getMinTimeMs() { return minTimeNs / 1_000_000.0; }
        public double getMaxTimeMs() { return maxTimeNs / 1_000_000.0; }
        public double getAverageTimeMs() { return averageTimeNs / 1_000_000.0; }

        @Override
        public String toString() {
            return String.format(
                "--- Profiling Result for '%s' (%d iterations) ---\n" +
                "  Min Time: %.3f ms (%,d ns)\n" +
                "  Max Time: %.3f ms (%,d ns)\n" +
                "  Avg Time: %.3f ms (%,d ns)\n" +
                "---------------------------------------------------\n",
                taskName, iterations,
                getMinTimeMs(), minTimeNs,
                getMaxTimeMs(), maxTimeNs,
                getAverageTimeMs(), averageTimeNs
            );
        }
    }
}
```