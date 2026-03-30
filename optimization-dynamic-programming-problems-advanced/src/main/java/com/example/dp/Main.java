```java
package com.example.dp;

import com.example.dp.problems.CoinChangeProblem;
import com.example.dp.problems.KnapsackProblem;
import com.example.dp.problems.LongestCommonSubsequence;
import com.example.dp.utils.PerformanceBenchmark;

import java.util.Arrays;

/**
 * Main class to demonstrate the Dynamic Programming problem solutions.
 * This provides a simple command-line interface to run examples and
 * compare performance of different approaches.
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("--- Dynamic Programming Interview Project ---");
        System.out.println("Demonstrating various DP problems and their solutions.\n");

        runLCSExamples();
        System.out.println("\n--------------------------------------------\n");
        runKnapsackExamples();
        System.out.println("\n--------------------------------------------\n");
        runCoinChangeExamples();
        System.out.println("\n--- End of Demonstrations ---");
    }

    private static void runLCSExamples() {
        System.out.println("### Longest Common Subsequence (LCS) ###");
        LongestCommonSubsequence lcsSolver = new LongestCommonSubsequence();

        String s1 = "AGGTAB";
        String s2 = "GXTXAYB";
        // Expected LCS: "GTAB", length 4

        System.out.printf("Strings: \"%s\", \"%s\"%n", s1, s2);

        // Brute Force
        PerformanceBenchmark.BenchmarkResult<Integer> bfResult =
                PerformanceBenchmark.measure(() -> lcsSolver.solveBruteForce(s1, s2));
        System.out.println("Brute Force LCS Length: " + bfResult.result() + " (Time: " + bfResult.durationMillis() + " ms)");

        // Memoized
        PerformanceBenchmark.BenchmarkResult<Integer> memResult =
                PerformanceBenchmark.measure(() -> lcsSolver.solveMemoized(s1, s2));
        System.out.println("Memoized LCS Length:    " + memResult.result() + " (Time: " + memResult.durationMillis() + " ms)");

        // Iterative
        PerformanceBenchmark.BenchmarkResult<Integer> iterResult =
                PerformanceBenchmark.measure(() -> lcsSolver.solveIterative(s1, s2));
        System.out.println("Iterative LCS Length:   " + iterResult.result() + " (Time: " + iterResult.durationMillis() + " ms)");

        // Space Optimized
        PerformanceBenchmark.BenchmarkResult<Integer> soResult =
                PerformanceBenchmark.measure(() -> lcsSolver.solveSpaceOptimized(s1, s2));
        System.out.println("Space-Opt LCS Length:   " + soResult.result() + " (Time: " + soResult.durationMillis() + " ms)");

        // Reconstruction Example
        int[][] dpTable = lcsSolver.getLCSDpTableIterative(s1, s2);
        String lcsString = lcsSolver.reconstructLCS(s1, s2, dpTable);
        System.out.println("Reconstructed LCS String: \"" + lcsString + "\"");

        // Test with larger strings (where brute force would be too slow)
        String s3 = "ABCBDAB";
        String s4 = "BDCABA";
        System.out.printf("\nStrings: \"%s\", \"%s\"%n", s3, s4);

        PerformanceBenchmark.BenchmarkResult<Integer> iterResult2 =
                PerformanceBenchmark.measure(() -> lcsSolver.solveIterative(s3, s4));
        System.out.println("Iterative LCS Length:   " + iterResult2.result() + " (Time: " + iterResult2.durationMillis() + " ms)");
        dpTable = lcsSolver.getLCSDpTableIterative(s3, s4);
        lcsString = lcsSolver.reconstructLCS(s3, s4, dpTable);
        System.out.println("Reconstructed LCS String: \"" + lcsString + "\""); // Expected "BCBA" or "BDAB"
    }

    private static void runKnapsackExamples() {
        System.out.println("### 0/1 Knapsack Problem ###");
        KnapsackProblem knapsackSolver = new KnapsackProblem();

        int[] weights = {10, 20, 30};
        int[] values = {60, 100, 120};
        int capacity = 50;
        // Expected Max Value: 220 (by taking items with weights 20 and 30)

        System.out.printf("Items: Weights=%s, Values=%s, Capacity=%d%n",
                Arrays.toString(weights), Arrays.toString(values), capacity);

        // Brute Force
        PerformanceBenchmark.BenchmarkResult<Integer> bfResult =
                PerformanceBenchmark.measure(() -> knapsackSolver.solveBruteForce(weights, values, capacity));
        System.out.println("Brute Force Max Value:     " + bfResult.result() + " (Time: " + bfResult.durationMillis() + " ms)");

        // Memoized
        PerformanceBenchmark.BenchmarkResult<Integer> memResult =
                PerformanceBenchmark.measure(() -> knapsackSolver.solveMemoized(weights, values, capacity));
        System.out.println("Memoized Max Value:        " + memResult.result() + " (Time: " + memResult.durationMillis() + " ms)");

        // Iterative
        PerformanceBenchmark.BenchmarkResult<Integer> iterResult =
                PerformanceBenchmark.measure(() -> knapsackSolver.solveIterative(weights, values, capacity));
        System.out.println("Iterative Max Value:       " + iterResult.result() + " (Time: " + iterResult.durationMillis() + " ms)");

        // Space Optimized
        PerformanceBenchmark.BenchmarkResult<Integer> soResult =
                PerformanceBenchmark.measure(() -> knapsackSolver.solveSpaceOptimized(weights, values, capacity));
        System.out.println("Space-Opt Max Value:       " + soResult.result() + " (Time: " + soResult.durationMillis() + " ms)");

        // Test with more items (brute force would be very slow)
        int[] weights2 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int[] values2 = {1, 5, 2, 8, 3, 9, 4, 10, 5, 11};
        int capacity2 = 20;
        System.out.printf("\nItems: Weights=%s, Values=%s, Capacity=%d%n",
                Arrays.toString(weights2), Arrays.toString(values2), capacity2);

        PerformanceBenchmark.BenchmarkResult<Integer> iterResult2 =
                PerformanceBenchmark.measure(() -> knapsackSolver.solveIterative(weights2, values2, capacity2));
        System.out.println("Iterative Max Value:       " + iterResult2.result() + " (Time: " + iterResult2.durationMillis() + " ms)");

        PerformanceBenchmark.BenchmarkResult<Integer> soResult2 =
                PerformanceBenchmark.measure(() -> knapsackSolver.solveSpaceOptimized(weights2, values2, capacity2));
        System.out.println("Space-Opt Max Value:       " + soResult2.result() + " (Time: " + soResult2.durationMillis() + " ms)");
    }

    private static void runCoinChangeExamples() {
        System.out.println("### Coin Change Problem ###");
        CoinChangeProblem coinChangeSolver = new CoinChangeProblem();

        int[] coins1 = {1, 2, 5};
        int amount1 = 11;
        // Expected Min Coins: 3 (5+5+1)
        // Expected Number of Ways: 11 for [1,2,5] (1,1,1,1,1,1,1,1,1,1,1 | 1,1,1,1,1,1,1,1,2 | ... | 5,5,1)

        System.out.printf("Coins: %s, Amount: %d%n", Arrays.toString(coins1), amount1);

        System.out.println("\n--- Minimum Coins ---");
        // Brute Force
        PerformanceBenchmark.BenchmarkResult<Integer> minBfResult =
                PerformanceBenchmark.measure(() -> coinChangeSolver.minCoinsBruteForce(coins1, amount1));
        System.out.println("Brute Force Min Coins:   " + minBfResult.result() + " (Time: " + minBfResult.durationMillis() + " ms)");

        // Memoized
        PerformanceBenchmark.BenchmarkResult<Integer> minMemResult =
                PerformanceBenchmark.measure(() -> coinChangeSolver.minCoinsMemoized(coins1, amount1));
        System.out.println("Memoized Min Coins:      " + minMemResult.result() + " (Time: " + minMemResult.durationMillis() + " ms)");

        // Iterative
        PerformanceBenchmark.BenchmarkResult<Integer> minIterResult =
                PerformanceBenchmark.measure(() -> coinChangeSolver.minCoinsIterative(coins1, amount1));
        System.out.println("Iterative Min Coins:     " + minIterResult.result() + " (Time: " + minIterResult.durationMillis() + " ms)");


        System.out.println("\n--- Number of Ways ---");
        int amount2 = 5; // For num ways example
        int[] coins2 = {1, 2, 5}; // For num ways example
        System.out.printf("Coins: %s, Amount: %d%n", Arrays.toString(coins2), amount2);
        // Expected num ways for [1,2,5], amount 5:
        // 5 = 1+1+1+1+1
        // 5 = 1+1+1+2
        // 5 = 1+2+2
        // 5 = 5
        // Total 4 ways.

        // Memoized
        PerformanceBenchmark.BenchmarkResult<Long> waysMemResult =
                PerformanceBenchmark.measure(() -> coinChangeSolver.numWaysMemoized(coins2, amount2));
        System.out.println("Memoized Num Ways:       " + waysMemResult.result() + " (Time: " + waysMemResult.durationMillis() + " ms)");

        // Iterative
        PerformanceBenchmark.BenchmarkResult<Long> waysIterResult =
                PerformanceBenchmark.measure(() -> coinChangeSolver.numWaysIterative(coins2, amount2));
        System.out.println("Iterative Num Ways:      " + waysIterResult.result() + " (Time: " + waysIterResult.durationMillis() + " ms)");

        // Test for impossible case
        int[] coins3 = {2, 4};
        int amount3 = 3;
        System.out.printf("\nCoins: %s, Amount: %d%n", Arrays.toString(coins3), amount3);
        PerformanceBenchmark.BenchmarkResult<Integer> impossibleMinResult =
                PerformanceBenchmark.measure(() -> coinChangeSolver.minCoinsIterative(coins3, amount3));
        System.out.println("Min Coins (impossible):  " + impossibleMinResult.result() + " (Expected -1)");

        PerformanceBenchmark.BenchmarkResult<Long> impossibleWaysResult =
                PerformanceBenchmark.measure(() -> coinChangeSolver.numWaysIterative(coins3, amount3));
        System.out.println("Num Ways (impossible):   " + impossibleWaysResult.result() + " (Expected 0)");
    }
}
```