```java
package com.bitmanipulation.performance;

import com.bitmanipulation.algorithms.BitManipulationAlgorithms;

import java.util.Random;

/**
 * This class provides a simple performance benchmark to compare different
 * implementations of the `countSetBits` problem. It measures the execution
 * time for a large number of random inputs for each approach.
 *
 * To run this benchmark, execute the main method. If using Maven:
 * `mvn exec:java -Dexec.mainClass="com.bitmanipulation.performance.PerformanceBenchmarker"`
 */
public class PerformanceBenchmarker {

    private static final int NUM_TESTS = 1_000_000; // Number of test cases
    private static final int NUM_WARMUP = 100_000; // Warm-up iterations to allow JIT compilation

    public static void main(String[] args) {
        System.out.println("Starting Bit Manipulation Performance Benchmark...");
        System.out.println("Number of test iterations per method: " + NUM_TESTS);
        System.out.println("Number of warm-up iterations: " + NUM_WARMUP);
        System.out.println("--------------------------------------------------");

        BitManipulationAlgorithms algorithms = new BitManipulationAlgorithms();
        Random random = new Random(42); // Seed for reproducibility

        // Generate a consistent set of random numbers for all tests
        int[] testNumbers = new int[NUM_TESTS];
        for (int i = 0; i < NUM_TESTS; i++) {
            testNumbers[i] = random.nextInt(); // Generates any 32-bit int, positive or negative
        }

        // --- Warm-up phase ---
        System.out.println("Warm-up phase (JIT compilation)...");
        for (int i = 0; i < NUM_WARMUP; i++) {
            algorithms.countSetBitsLoop(random.nextInt());
            algorithms.countSetBitsBrianKernighan(random.nextInt());
            algorithms.countSetBitsLookupTable(random.nextInt());
            algorithms.countSetBitsJavaAPI(random.nextInt());
        }
        System.out.println("Warm-up complete. Starting actual benchmarks.\n");


        // --- Benchmark 1: Loop and Check LSB ---
        long startTime = System.nanoTime();
        for (int n : testNumbers) {
            algorithms.countSetBitsLoop(n);
        }
        long endTime = System.nanoTime();
        double durationMs = (endTime - startTime) / 1_000_000.0;
        System.out.printf("countSetBitsLoop:                 %10.2f ms%n", durationMs);


        // --- Benchmark 2: Brian Kernighan's Algorithm ---
        startTime = System.nanoTime();
        for (int n : testNumbers) {
            algorithms.countSetBitsBrianKernighan(n);
        }
        endTime = System.nanoTime();
        durationMs = (endTime - startTime) / 1_000_000.0;
        System.out.printf("countSetBitsBrianKernighan:       %10.2f ms%n", durationMs);


        // --- Benchmark 3: Lookup Table ---
        startTime = System.nanoTime();
        for (int n : testNumbers) {
            algorithms.countSetBitsLookupTable(n);
        }
        endTime = System.nanoTime();
        durationMs = (endTime - startTime) / 1_000_000.0;
        System.out.printf("countSetBitsLookupTable:          %10.2f ms%n", durationMs);


        // --- Benchmark 4: Java API `Integer.bitCount()` ---
        startTime = System.nanoTime();
        for (int n : testNumbers) {
            algorithms.countSetBitsJavaAPI(n);
        }
        endTime = System.nanoTime();
        durationMs = (endTime - startTime) / 1_000_000.0;
        System.out.printf("countSetBitsJavaAPI (Integer.bitCount): %10.2f ms%n", durationMs);

        System.out.println("\nBenchmark complete. Results may vary based on hardware and JVM.");
    }
}
```