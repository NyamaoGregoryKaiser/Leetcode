```java
package docs; // Placed in 'docs' for standalone execution, assuming package is 'docs' when compiled directly.
// If run from IDE, it might be in default package or you might move it to com.example.greedy
// and adjust package declaration. For command line compilation, `docs` as the package is fine.

import com.example.greedy.GreedyAlgorithms;
import com.example.greedy.models.Activity;
import com.example.greedy.models.Item;
import com.example.greedy.models.Job;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

/**
 * Performance benchmarking utility for the Greedy Algorithms implemented in GreedyAlgorithms.java.
 * This class measures the execution time of different greedy algorithms with varying input sizes.
 *
 * To run:
 * 1. Compile the main project (mvn clean install).
 * 2. Compile this file from the project root:
 *    `javac -cp "target/classes" docs/PerformanceBenchmarking.java -d target/benchmarks-classes`
 * 3. Run from the project root:
 *    `java -cp "target/classes:target/benchmarks-classes" docs.PerformanceBenchmarking`
 */
public class PerformanceBenchmarking {

    private static final int WARMUP_ITERATIONS = 5;
    private static final int MEASUREMENT_ITERATIONS = 10;
    private static final int[] N_VALUES = {100, 1_000, 10_000, 100_000}; // Input sizes

    public static void main(String[] args) {
        System.out.println("--- Greedy Algorithms Performance Benchmarking ---");
        GreedyAlgorithms greedyAlgorithms = new GreedyAlgorithms();
        Random random = new Random();

        for (int N : N_VALUES) {
            System.out.println("\n--- Benchmarking with N = " + N + " ---");

            // --- 1. Activity Selection Problem ---
            List<Activity> activities = generateActivities(N, random);
            runBenchmark(N, "Activity Selection", () -> {
                greedyAlgorithms.selectMaxActivities(new ArrayList<>(activities)); // Pass a copy to preserve original for multiple runs
            });

            // --- 2. Fractional Knapsack Problem ---
            Item[] items = generateItems(N, random);
            int capacity = N * 50; // Dynamic capacity based on N
            runBenchmark(N, "Fractional Knapsack", () -> {
                greedyAlgorithms.fractionalKnapsack(items.clone(), capacity); // Pass a clone to preserve original
            });

            // --- 3. Coin Change Problem (Greedy Variant) ---
            int[] denominations = {1, 5, 10, 25, 100}; // Canonical US currency
            int amount = N * 123; // Larger amount for larger N
            runBenchmark(N, "Greedy Coin Change", () -> {
                greedyAlgorithms.greedyCoinChange(denominations.clone(), amount); // Pass a clone
            });

            // --- 4. Minimum Number of Platforms Problem ---
            int[] arrival = new int[N];
            int[] departure = new int[N];
            generateTrainTimes(N, arrival, departure, random);
            runBenchmark(N, "Min Platforms", () -> {
                greedyAlgorithms.findMinPlatforms(arrival.clone(), departure.clone()); // Pass clones
            });

            // --- 5. Job Sequencing with Deadlines Problem ---
            Job[] jobs = generateJobs(N, random);
            runBenchmark(N, "Job Sequencing", () -> {
                greedyAlgorithms.jobSequencingWithDeadlines(jobs.clone()); // Pass a clone
            });
        }
    }

    /**
     * General benchmark runner.
     * @param n The input size.
     * @param algorithmName The name of the algorithm being benchmarked.
     * @param runnable The code to benchmark.
     */
    private static void runBenchmark(int n, String algorithmName, Runnable runnable) {
        // Warm-up phase
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            runnable.run();
        }

        long totalTime = 0;
        for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
            long startTime = System.nanoTime();
            runnable.run();
            long endTime = System.nanoTime();
            totalTime += (endTime - startTime);
        }

        long averageTimeNanos = totalTime / MEASUREMENT_ITERATIONS;
        double averageTimeMillis = averageTimeNanos / 1_000_000.0;
        System.out.printf("%-30s: %.3f ms%n", algorithmName, averageTimeMillis);
    }

    // --- Data Generation Helper Methods ---

    private static List<Activity> generateActivities(int n, Random random) {
        List<Activity> activities = new ArrayList<>(n);
        int maxTime = n * 10;
        for (int i = 0; i < n; i++) {
            int start = random.nextInt(maxTime);
            int finish = start + random.nextInt(maxTime / 10) + 1; // Ensure finish > start
            activities.add(new Activity(start, finish));
        }
        return activities;
    }

    private static Item[] generateItems(int n, Random random) {
        Item[] items = new Item[n];
        for (int i = 0; i < n; i++) {
            int weight = random.nextInt(100) + 1; // 1 to 100
            int value = random.nextInt(200) + 1;  // 1 to 200
            items[i] = new Item(weight, value);
        }
        return items;
    }

    private static void generateTrainTimes(int n, int[] arrival, int[] departure, Random random) {
        int maxTime = n * 5; // Max time point for events
        for (int i = 0; i < n; i++) {
            int arr = random.nextInt(maxTime);
            int dep = arr + random.nextInt(maxTime / 10) + 1; // Ensure dep > arr
            arrival[i] = arr;
            departure[i] = dep;
        }
    }

    private static Job[] generateJobs(int n, Random random) {
        Job[] jobs = new Job[n];
        int maxDeadline = Math.max(n / 2, 1); // Deadlines from 1 to N/2 or at least 1
        int maxProfit = n * 10;
        for (int i = 0; i < n; i++) {
            char id = (char) ('A' + (i % 26)); // Cycle through A-Z
            int deadline = random.nextInt(maxDeadline) + 1; // Deadlines at least 1
            int profit = random.nextInt(maxProfit) + 1;
            jobs[i] = new Job(id, deadline, profit);
        }
        return jobs;
    }
}
```