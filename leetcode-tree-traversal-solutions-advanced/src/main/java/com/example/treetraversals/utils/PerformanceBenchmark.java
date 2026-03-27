```java
package com.example.treetraversals.utils;

import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;

/**
 * A utility class for benchmarking the performance (execution time) of methods.
 * It provides a generic way to run a task multiple times and report average execution time.
 */
public class PerformanceBenchmark {

    /**
     * Measures the execution time of a given task.
     *
     * @param taskName A descriptive name for the task being benchmarked.
     * @param runnable The code to be executed and benchmarked, provided as a Runnable.
     * @param iterations The number of times to run the task for averaging.
     */
    public static void measurePerformance(String taskName, Runnable runnable, int iterations) {
        System.out.println("--- Benchmarking: " + taskName + " ---");
        long totalExecutionTimeMillis = 0;
        long totalCpuTimeNanos = 0;

        // Warm-up phase to allow JIT compilation
        for (int i = 0; i < Math.min(iterations / 2, 10); i++) { // Small warm-up
            runnable.run();
        }

        ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();
        boolean cpuTimeEnabled = threadMXBean.isThreadCpuTimeSupported() && threadMXBean.isThreadCpuTimeEnabled();
        long threadId = Thread.currentThread().getId();

        for (int i = 0; i < iterations; i++) {
            long startTime = System.nanoTime();
            long startCpuTime = 0;
            if (cpuTimeEnabled) {
                startCpuTime = threadMXBean.getThreadCpuTime(threadId);
            }

            runnable.run();

            long endTime = System.nanoTime();
            long endCpuTime = 0;
            if (cpuTimeEnabled) {
                endCpuTime = threadMXBean.getThreadCpuTime(threadId);
            }

            totalExecutionTimeMillis += TimeUnit.NANOSECONDS.toMillis(endTime - startTime);
            if (cpuTimeEnabled) {
                totalCpuTimeNanos += (endCpuTime - startCpuTime);
            }
        }

        double averageExecutionTimeMillis = (double) totalExecutionTimeMillis / iterations;
        System.out.printf("  Average Wall Clock Time: %.4f ms (over %d iterations)\n", averageExecutionTimeMillis, iterations);

        if (cpuTimeEnabled) {
            double averageCpuTimeMillis = (double) TimeUnit.NANOSECONDS.toMillis(totalCpuTimeNanos) / iterations;
            System.out.printf("  Average CPU Time: %.4f ms (over %d iterations)\n", averageCpuTimeMillis, iterations);
        } else {
            System.out.println("  CPU time measurement not available or enabled.");
            System.out.println("  To enable CPU time, run with -Djava.rmi.server.hostname=127.0.0.1 -Dcom.sun.management.jmxremote (or similar JMX config)");
        }
        System.out.println("------------------------------------");
    }

    /**
     * Measures the execution time of a supplier task (a task that returns a result).
     *
     * @param taskName A descriptive name for the task being benchmarked.
     * @param supplier The code to be executed and benchmarked, provided as a Supplier.
     * @param iterations The number of times to run the task for averaging.
     * @param <T> The type of the result returned by the supplier.
     * @return The result of the last execution of the supplier.
     */
    public static <T> T measurePerformance(String taskName, Supplier<T> supplier, int iterations) {
        T result = null; // Store the last result
        System.out.println("--- Benchmarking: " + taskName + " ---");
        long totalExecutionTimeMillis = 0;
        long totalCpuTimeNanos = 0;

        // Warm-up phase to allow JIT compilation
        for (int i = 0; i < Math.min(iterations / 2, 10); i++) {
            supplier.get();
        }

        ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();
        boolean cpuTimeEnabled = threadMXBean.isThreadCpuTimeSupported() && threadMXBean.isThreadCpuTimeEnabled();
        long threadId = Thread.currentThread().getId();


        for (int i = 0; i < iterations; i++) {
            long startTime = System.nanoTime();
            long startCpuTime = 0;
            if (cpuTimeEnabled) {
                startCpuTime = threadMXBean.getThreadCpuTime(threadId);
            }

            result = supplier.get(); // Execute and get result

            long endTime = System.nanoTime();
            long endCpuTime = 0;
            if (cpuTimeEnabled) {
                endCpuTime = threadMXBean.getThreadCpuTime(threadId);
            }

            totalExecutionTimeMillis += TimeUnit.NANOSECONDS.toMillis(endTime - startTime);
            if (cpuTimeEnabled) {
                totalCpuTimeNanos += (endCpuTime - startCpuTime);
            }
        }

        double averageExecutionTimeMillis = (double) totalExecutionTimeMillis / iterations;
        System.out.printf("  Average Wall Clock Time: %.4f ms (over %d iterations)\n", averageExecutionTimeMillis, iterations);

        if (cpuTimeEnabled) {
            double averageCpuTimeMillis = (double) TimeUnit.NANOSECONDS.toMillis(totalCpuTimeNanos) / iterations;
            System.out.printf("  Average CPU Time: %.4f ms (over %d iterations)\n", averageCpuTimeMillis, iterations);
        } else {
            System.out.println("  CPU time measurement not available or enabled.");
        }
        System.out.println("------------------------------------");
        return result; // Return the result of the last execution
    }
}
```