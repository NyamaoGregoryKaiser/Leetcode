```java
package com.example.mathproblems.benchmarking;

import com.example.mathproblems.FibonacciCalculator;
import com.example.mathproblems.GCDCalculator;
import com.example.mathproblems.PrimeSieve;

import java.math.BigInteger;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Performance benchmarking class for the Math Problems algorithms.
 * Compares the execution time of different implementations for GCD, Prime Sieve, and Fibonacci.
 *
 * To run this benchmark using Maven:
 * mvn exec:java@run-benchmark
 */
public class MathProblemsBenchmarker {

    private static final int WARMUP_ITERATIONS = 5;
    private static final int MEASUREMENT_ITERATIONS = 10;

    public static void main(String[] args) {
        System.out.println("--- Math Problems Benchmarking ---");
        System.out.println("Warmup iterations: " + WARMUP_ITERATIONS);
        System.out.println("Measurement iterations: " + MEASUREMENT_ITERATIONS);
        System.out.println("----------------------------------");

        runGCDBenchmarks();
        System.out.println("\n----------------------------------");
        runPrimeSieveBenchmarks();
        System.out.println("\n----------------------------------");
        runFibonacciBenchmarks();
        System.out.println("\n--- Benchmarking Complete ---");
    }

    private static void runGCDBenchmarks() {
        System.out.println("\nBenchmarking GCD Algorithms:");
        GCDCalculator gcdCalculator = new GCDCalculator();

        long num1 = 1234567890L;
        long num2 = 9876543210L;

        System.out.printf("  GCD of %d and %d:\n", num1, num2);

        // Warmup
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            gcdCalculator.gcdIterative(num1, num2);
            gcdCalculator.gcdRecursive(num1, num2);
            gcdCalculator.gcdBinary(num1, num2);
        }

        measure("GCD Iterative", () -> gcdCalculator.gcdIterative(num1, num2));
        measure("GCD Recursive", () -> gcdCalculator.gcdRecursive(num1, num2));
        measure("GCD Binary", () -> gcdCalculator.gcdBinary(num1, num2));
        measure("LCM (uses iterative GCD)", () -> gcdCalculator.lcm(num1, num2));
    }

    private static void runPrimeSieveBenchmarks() {
        System.out.println("\nBenchmarking Prime Sieve Algorithms:");
        PrimeSieve primeSieve = new PrimeSieve();

        int limitMedium = 100_000;
        int limitLarge = 1_000_000;

        // Warmup for Sieve (Medium)
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            primeSieve.sieveOfEratosthenes(limitMedium);
        }
        System.out.printf("  Sieve of Eratosthenes up to %d:\n", limitMedium);
        measure("Sieve (Medium)", () -> primeSieve.sieveOfEratosthenes(limitMedium));

        // Warmup for Sieve (Large)
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            primeSieve.sieveOfEratosthenes(limitLarge);
        }
        System.out.printf("  Sieve of Eratosthenes up to %d:\n", limitLarge);
        measure("Sieve (Large)", () -> primeSieve.sieveOfEratosthenes(limitLarge));


        System.out.println("\n  Benchmarking isPrimeTrialDivision:");
        int primeToCheck1 = 999983; // A large prime
        int nonPrimeToCheck1 = 999981; // 3 * 333327

        // Warmup for isPrimeTrialDivision
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            primeSieve.isPrimeTrialDivision(primeToCheck1);
            primeSieve.isPrimeTrialDivision(nonPrimeToCheck1);
        }
        measure("isPrimeTrialDivision (Prime)", () -> primeSieve.isPrimeTrialDivision(primeToCheck1));
        measure("isPrimeTrialDivision (Non-Prime)", () -> primeSieve.isPrimeTrialDivision(nonPrimeToCheck1));

    }

    private static void runFibonacciBenchmarks() {
        System.out.println("\nBenchmarking Fibonacci Algorithms:");
        FibonacciCalculator fibCalculator = new FibonacciCalculator();

        int n_small = 20;
        int n_medium = 90;
        int n_large = 100_000;
        int n_very_large = 1_000_000;

        System.out.printf("  Fibonacci for n = %d (small enough for naive recursive):\n", n_small);
        // Warmup for small n
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            fibCalculator.fibonacciNaiveRecursive(n_small);
            fibCalculator.fibonacciIterativeDP(n_small);
            fibCalculator.fibonacciMatrixExponentiation(n_small);
        }
        measure("Fibonacci Naive Recursive (n=" + n_small + ")", () -> fibCalculator.fibonacciNaiveRecursive(n_small));
        measure("Fibonacci Iterative DP (n=" + n_small + ")", () -> fibCalculator.fibonacciIterativeDP(n_small));
        measure("Fibonacci Matrix Exp. (n=" + n_small + ")", () -> fibCalculator.fibonacciMatrixExponentiation(n_small));


        System.out.printf("\n  Fibonacci for n = %d (too slow for naive recursive, fits Long for iterative):\n", n_medium);
        // Warmup for medium n (only optimized)
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            fibCalculator.fibonacciIterativeDP(n_medium);
            fibCalculator.fibonacciMatrixExponentiation(n_medium);
        }
        // Skipped naive recursive for n_medium, it's too slow.
        measure("Fibonacci Iterative DP (n=" + n_medium + ")", () -> fibCalculator.fibonacciIterativeDP(n_medium));
        measure("Fibonacci Matrix Exp. (n=" + n_medium + ")", () -> fibCalculator.fibonacciMatrixExponentiation(n_medium));


        System.out.printf("\n  Fibonacci for n = %d (requires BigInteger, matrix exp. shines):\n", n_large);
        // Warmup for large n (only optimized)
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            fibCalculator.fibonacciIterativeDP(n_large);
            fibCalculator.fibonacciMatrixExponentiation(n_large);
        }
        measure("Fibonacci Iterative DP (n=" + n_large + ")", () -> fibCalculator.fibonacciIterativeDP(n_large));
        measure("Fibonacci Matrix Exp. (n=" + n_large + ")", () -> fibCalculator.fibonacciMatrixExponentiation(n_large));

        System.out.printf("\n  Fibonacci for n = %d (even larger, matrix exp. is crucial):\n", n_very_large);
        // Warmup for very large n (only optimized)
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            fibCalculator.fibonacciMatrixExponentiation(n_very_large);
        }
        // Iterative DP will be very slow for this N due to BigInteger operations, usually TLE in interviews.
        // Uncomment below if you want to observe its slowness, but be prepared to wait.
        // measure("Fibonacci Iterative DP (n=" + n_very_large + ")", () -> fibCalculator.fibonacciIterativeDP(n_very_large));
        measure("Fibonacci Matrix Exp. (n=" + n_very_large + ")", () -> fibCalculator.fibonacciMatrixExponentiation(n_very_large));
    }


    /**
     * Measures the average execution time of a given task over a number of iterations.
     * @param taskName The name of the task being measured.
     * @param task The Runnable representing the task to execute.
     */
    private static void measure(String taskName, Runnable task) {
        long totalTime = 0;
        for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
            long startTime = System.nanoTime();
            task.run();
            long endTime = System.nanoTime();
            totalTime += (endTime - startTime);
        }
        long averageTimeNanos = totalTime / MEASUREMENT_ITERATIONS;
        System.out.printf("    %-40s : %d us (avg over %d runs)\n", taskName, TimeUnit.NANOSECONDS.toMicros(averageTimeNanos), MEASUREMENT_ITERATIONS);
    }
}
```