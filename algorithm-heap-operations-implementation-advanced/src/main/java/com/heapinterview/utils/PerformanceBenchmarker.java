```java
package com.heapinterview.utils;

import java.util.function.Supplier;

/**
 * PerformanceBenchmarker: A utility class to measure the execution time
 * of various methods or code blocks. Useful for comparing the performance
 * of different algorithm implementations.
 */
public class PerformanceBenchmarker {

    /**
     * Measures the execution time of a given Runnable (a void method).
     *
     * @param description A descriptive string for the benchmark.
     * @param task The Runnable task to be benchmarked.
     * @return The elapsed time in nanoseconds.
     */
    public static long measureTime(String description, Runnable task) {
        long startTime = System.nanoTime();
        task.run();
        long endTime = System.nanoTime();
        long duration = (endTime - startTime);
        System.out.printf("Benchmark '%s': %d ns (%.3f ms)%n", description, duration, duration / 1_000_000.0);
        return duration;
    }

    /**
     * Measures the execution time of a given Supplier (a method that returns a value).
     *
     * @param description A descriptive string for the benchmark.
     * @param task The Supplier task to be benchmarked.
     * @param <T> The return type of the Supplier.
     * @return A Pair containing the elapsed time in nanoseconds and the result of the task.
     */
    public static <T> Pair<Long, T> measureTimeWithResult(String description, Supplier<T> task) {
        long startTime = System.nanoTime();
        T result = task.get();
        long endTime = System.nanoTime();
        long duration = (endTime - startTime);
        System.out.printf("Benchmark '%s': %d ns (%.3f ms)%n", description, duration, duration / 1_000_000.0);
        return new Pair<>(duration, result);
    }

    /**
     * A simple generic Pair class to return two values.
     * @param <K> Type of the first element.
     * @param <V> Type of the second element.
     */
    public static class Pair<K, V> {
        private K key;
        private V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }

        @Override
        public String toString() {
            return "(" + key + ", " + value + ")";
        }
    }
}
```