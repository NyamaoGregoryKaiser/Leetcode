package benchmarking;

import com.greedyalgorithms.project.GreedyAlgorithms;
import com.greedyalgorithms.project.alternative.ActivitySelectionBruteForce;
import com.greedyalgorithms.project.alternative.CoinChangeDP;
import com.greedyalgorithms.project.utils.Activity;
import com.greedyalgorithms.project.utils.Item;
import com.greedyalgorithms.project.utils.Job;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * Simple performance benchmarking for Greedy Algorithms.
 * This class uses System.nanoTime() for basic timing. For more rigorous
 * benchmarking, consider using JMH (Java Microbenchmark Harness).
 *
 * It compares the greedy approach with alternative solutions (e.g., brute-force
 * for Activity Selection, DP for Coin Change) where applicable to highlight
 * performance differences.
 */
public class PerformanceBenchmark {

    private static final int WARMUP_ITERATIONS = 5;
    private static final int MEASUREMENT_ITERATIONS = 10;
    private static final int LARGE_N = 100000;
    private static final int MAX_TIME = 10000; // Max time for activities/trains
    private static final int MAX_CAPACITY = 10000;
    private static final int MAX_PROFIT = 1000;
    private static final int MAX_DEADLINE = 5000;
    private static final int MAX_AMOUNT = 10000;


    private final Random random = new Random(42); // Seed for reproducibility

    public static void main(String[] args) {
        PerformanceBenchmark benchmark = new PerformanceBenchmark();
        System.out.println("--- Starting Greedy Algorithms Benchmarks ---");

        benchmark.benchmarkActivitySelection();
        benchmark.benchmarkFractionalKnapsack();
        benchmark.benchmarkCoinChange();
        benchmark.benchmarkJobSequencing();
        benchmark.benchmarkMinPlatforms();

        System.out.println("--- Benchmarks Finished ---");
    }

    private void runBenchmark(String name, Runnable task) {
        System.out.println("\nBenchmarking: " + name);
        long totalExecutionTime = 0;

        // Warmup
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            task.run();
        }

        // Measurement
        for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
            long startTime = System.nanoTime();
            task.run();
            long endTime = System.nanoTime();
            totalExecutionTime += (endTime - startTime);
        }

        long averageTimeNanos = totalExecutionTime / MEASUREMENT_ITERATIONS;
        System.out.printf("Average execution time: %.3f ms%n", TimeUnit.NANOSECONDS.toMicros(averageTimeNanos) / 1000.0);
    }

    private List<Activity> generateRandomActivities(int count, int maxTime) {
        List<Activity> activities = new ArrayList<>(count);
        for (int i = 0; i < count; i++) {
            int start = random.nextInt(maxTime);
            int finish = start + 1 + random.nextInt(maxTime / 10); // Finish time after start
            activities.add(new Activity("A" + i, start, finish));
        }
        return activities;
    }

    private List<Item> generateRandomItems(int count, int maxWeight, int maxValue) {
        List<Item> items = new ArrayList<>(count);
        for (int i = 0; i < count; i++) {
            int weight = 1 + random.nextInt(maxWeight); // Weight > 0
            int value = random.nextInt(maxValue);
            items.add(new Item("I" + i, weight, value));
        }
        return items;
    }

    private List<Job> generateRandomJobs(int count, int maxDeadline, int maxProfit) {
        List<Job> jobs = new ArrayList<>(count);
        for (int i = 0; i < count; i++) {
            int deadline = 1 + random.nextInt(maxDeadline); // Deadline > 0
            int profit = random.nextInt(maxProfit); // Profit >= 0
            jobs.add(new Job("J" + i, deadline, profit));
        }
        return jobs;
    }

    private int[] generateRandomTimes(int count, int maxTime) {
        int[] times = new int[count];
        for (int i = 0; i < count; i++) {
            times[i] = random.nextInt(maxTime);
        }
        return times;
    }

    public void benchmarkActivitySelection() {
        GreedyAlgorithms greedy = new GreedyAlgorithms();
        ActivitySelectionBruteForce bruteForce = new ActivitySelectionBruteForce();

        List<Activity> activitiesSmall = generateRandomActivities(20, 100);
        List<Activity> activitiesLarge = generateRandomActivities(LARGE_N, MAX_TIME);

        // Brute Force (only for small N, as it's exponential)
        if (activitiesSmall.size() <= 20) { // Limit brute force to very small N
             runBenchmark("Activity Selection (Brute Force, N=20)", () ->
                bruteForce.solve(activitiesSmall)
             );
        } else {
             System.out.println("Skipping Brute Force Activity Selection for N=" + activitiesSmall.size() + " (too large for exponential complexity)");
        }


        runBenchmark("Activity Selection (Greedy, N=" + activitiesSmall.size() + ")", () ->
            greedy.activitySelection(activitiesSmall)
        );

        runBenchmark("Activity Selection (Greedy, N=" + LARGE_N + ")", () ->
            greedy.activitySelection(activitiesLarge)
        );
    }

    public void benchmarkFractionalKnapsack() {
        GreedyAlgorithms greedy = new GreedyAlgorithms();

        List<Item> itemsSmall = generateRandomItems(20, 100, 1000);
        List<Item> itemsLarge = generateRandomItems(LARGE_N, 1000, 10000);
        int capacitySmall = random.nextInt(MAX_CAPACITY);
        int capacityLarge = random.nextInt(MAX_CAPACITY);


        runBenchmark("Fractional Knapsack (Greedy, N=" + itemsSmall.size() + ")", () ->
            greedy.fractionalKnapsack(capacitySmall, itemsSmall)
        );

        runBenchmark("Fractional Knapsack (Greedy, N=" + LARGE_N + ")", () ->
            greedy.fractionalKnapsack(capacityLarge, itemsLarge)
        );
    }

    public void benchmarkCoinChange() {
        GreedyAlgorithms greedy = new GreedyAlgorithms();
        CoinChangeDP dp = new CoinChangeDP();

        int[] canonicalCoins = {1, 5, 10, 25, 50, 100}; // Canonical system
        int[] nonCanonicalCoins = {1, 3, 4, 7, 10}; // Example where greedy might fail

        int amountSmall = 500;
        int amountLarge = MAX_AMOUNT;

        runBenchmark("Coin Change (Greedy, Canonical, Amount=" + amountSmall + ")", () ->
            greedy.coinChangeGreedy(canonicalCoins, amountSmall)
        );
        runBenchmark("Coin Change (DP, Canonical, Amount=" + amountSmall + ")", () ->
            dp.coinChangeDP(canonicalCoins, amountSmall)
        );
         runBenchmark("Coin Change (Greedy, Canonical, Amount=" + amountLarge + ")", () ->
            greedy.coinChangeGreedy(canonicalCoins, amountLarge)
        );
        runBenchmark("Coin Change (DP, Canonical, Amount=" + amountLarge + ")", () ->
            dp.coinChangeDP(canonicalCoins, amountLarge)
        );


        System.out.println("\nBenchmarking Coin Change with Non-Canonical System (N=" + nonCanonicalCoins.length + ", Amount=" + amountSmall + ")");
        // Demonstrate greedy failure but benchmark its speed
        int greedyResult = greedy.coinChangeGreedy(nonCanonicalCoins, amountSmall);
        int dpResult = dp.coinChangeDP(nonCanonicalCoins, amountSmall);
        System.out.println( "  Greedy result for " + amountSmall + ": " + greedyResult + " coins. Optimal (DP): " + dpResult + " coins.");


        runBenchmark("Coin Change (Greedy, Non-Canonical, Amount=" + amountSmall + ")", () ->
            greedy.coinChangeGreedy(nonCanonicalCoins, amountSmall)
        );
        runBenchmark("Coin Change (DP, Non-Canonical, Amount=" + amountSmall + ")", () ->
            dp.coinChangeDP(nonCanonicalCoins, amountSmall)
        );
    }

    public void benchmarkJobSequencing() {
        GreedyAlgorithms greedy = new GreedyAlgorithms();

        List<Job> jobsSmall = generateRandomJobs(20, 10, 100);
        List<Job> jobsLarge = generateRandomJobs(LARGE_N, MAX_DEADLINE, MAX_PROFIT);

        runBenchmark("Job Sequencing (Greedy, N=" + jobsSmall.size() + ")", () ->
            greedy.jobSequencing(jobsSmall)
        );

        runBenchmark("Job Sequencing (Greedy, N=" + LARGE_N + ")", () ->
            greedy.jobSequencing(jobsLarge)
        );
    }

    public void benchmarkMinPlatforms() {
        GreedyAlgorithms greedy = new GreedyAlgorithms();

        int[] arrivalSmall = generateRandomTimes(20, 1000);
        int[] departureSmall = Arrays.stream(arrivalSmall)
                                    .map(a -> a + 1 + random.nextInt(200)) // Ensure departure after arrival
                                    .toArray();

        int[] arrivalLarge = generateRandomTimes(LARGE_N, MAX_TIME);
        int[] departureLarge = Arrays.stream(arrivalLarge)
                                     .map(a -> a + 1 + random.nextInt(MAX_TIME / 10))
                                     .toArray();

        // Need to ensure valid arrival/departure pairs. For large sets, it's fine if some are close.
        // A more robust generator would create non-overlapping intervals or ensure departure > arrival
        // For benchmarking purposes, simple generation is usually fine.
        int[] finalArrivalLarge = arrivalLarge;
        int[] finalDepartureLarge = departureLarge;

        runBenchmark("Min Platforms (Greedy, N=" + arrivalSmall.length + ")", () ->
            greedy.minPlatforms(arrivalSmall, departureSmall)
        );

        runBenchmark("Min Platforms (Greedy, N=" + LARGE_N + ")", () ->
            greedy.minPlatforms(finalArrivalLarge, finalDepartureLarge)
        );
    }
}