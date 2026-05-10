package com.greedy;

import com.greedy.problems.ActivitySelection;
import com.greedy.problems.CoinChange;
import com.greedy.problems.FractionalKnapsack;
import com.greedy.problems.JobSequencing;
import com.greedy.problems.MinimizeCashFlow;
import com.greedy.utils.DataStructures;
import com.greedy.utils.DataStructures.Activity;
import com.greedy.utils.DataStructures.Item;
import com.greedy.utils.DataStructures.Job;
import com.greedy.utils.DataStructures.Transaction;
import com.greedy.utils.PerformanceBenchmark;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

/**
 * Main class to demonstrate the usage of various greedy algorithms
 * and their associated utilities like performance benchmarking.
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("--- Greedy Algorithms Project Demonstrations ---");
        System.out.println("----------------------------------------------");

        runActivitySelectionDemo();
        System.out.println("\n----------------------------------------------");

        runCoinChangeDemo();
        System.out.println("\n----------------------------------------------");

        runFractionalKnapsackDemo();
        System.out.println("\n----------------------------------------------");

        runJobSequencingDemo();
        System.out.println("\n----------------------------------------------");

        runMinimizeCashFlowDemo();
        System.out.println("\n----------------------------------------------");

        runPerformanceBenchmarkDemo();
        System.out.println("\n--- End of Demonstrations ---");
    }

    private static void runActivitySelectionDemo() {
        System.out.println("1. Activity Selection Problem:");
        ActivitySelection solver = new ActivitySelection();

        Activity[] activities1 = {
                new Activity(1, 4), new Activity(3, 5), new Activity(0, 6),
                new Activity(5, 7), new Activity(3, 8), new Activity(5, 9),
                new Activity(6, 10), new Activity(8, 11), new Activity(8, 12),
                new Activity(2, 13), new Activity(12, 14)
        };
        List<Activity> selected1 = solver.selectActivities(activities1);
        System.out.println("Activities: " + Arrays.toString(activities1));
        System.out.println("Selected Activities (Max Non-Overlapping): " + selected1);
        System.out.println("Number of selected activities: " + selected1.size());

        Activity[] activities2 = {
                new Activity(0, 10), new Activity(1, 2), new Activity(3, 4),
                new Activity(5, 6), new Activity(7, 8), new Activity(9, 10)
        };
        List<Activity> selected2 = solver.selectActivities(activities2);
        System.out.println("\nActivities: " + Arrays.toString(activities2));
        System.out.println("Selected Activities (Max Non-Overlapping): " + selected2);
        System.out.println("Number of selected activities: " + selected2.size());
    }

    private static void runCoinChangeDemo() {
        System.out.println("2. Coin Change Problem (Greedy vs. DP):");
        CoinChange solver = new CoinChange();

        // Example where greedy works (canonical system)
        int[] denominations1 = {1, 2, 5, 10, 20, 50, 100}; // Euro coins
        int amount1 = 123;
        System.out.println("Denominations (Canonical): " + Arrays.toString(denominations1) + ", Amount: " + amount1);
        int coinsGreedy1 = solver.findMinCoinsGreedy(denominations1.clone(), amount1);
        int coinsDP1 = solver.findMinCoinsDP(denominations1.clone(), amount1);
        System.out.println("  Greedy Min Coins: " + coinsGreedy1);
        System.out.println("  DP Min Coins:     " + coinsDP1); // Should be same as greedy

        // Example where greedy fails (non-canonical system)
        int[] denominations2 = {1, 3, 4};
        int amount2 = 6;
        System.out.println("\nDenominations (Non-Canonical): " + Arrays.toString(denominations2) + ", Amount: " + amount2);
        int coinsGreedy2 = solver.findMinCoinsGreedy(denominations2.clone(), amount2);
        int coinsDP2 = solver.findMinCoinsDP(denominations2.clone(), amount2);
        System.out.println("  Greedy Min Coins: " + coinsGreedy2 + " (Incorrect for this system)");
        System.out.println("  DP Min Coins:     " + coinsDP2 + " (Correct)");

        // Edge cases
        int[] denominations3 = {2, 5};
        int amount3 = 3;
        System.out.println("\nDenominations: " + Arrays.toString(denominations3) + ", Amount: " + amount3);
        int coinsGreedy3 = solver.findMinCoinsGreedy(denominations3.clone(), amount3);
        int coinsDP3 = solver.findMinCoinsDP(denominations3.clone(), amount3);
        System.out.println("  Greedy Min Coins: " + coinsGreedy3 + " (Cannot make, returns -1)");
        System.out.println("  DP Min Coins:     " + coinsDP3 + " (Cannot make, returns -1)");

        int[] denominations4 = {1, 5};
        int amount4 = 0;
        System.out.println("\nDenominations: " + Arrays.toString(denominations4) + ", Amount: " + amount4);
        System.out.println("  Greedy Min Coins: " + solver.findMinCoinsGreedy(denominations4.clone(), amount4));
        System.out.println("  DP Min Coins:     " + solver.findMinCoinsDP(denominations4.clone(), amount4));
    }

    private static void runFractionalKnapsackDemo() {
        System.out.println("3. Fractional Knapsack Problem:");
        FractionalKnapsack solver = new FractionalKnapsack();

        Item[] items1 = {
                new Item(10, 60), // v/w = 6.0
                new Item(20, 100), // v/w = 5.0
                new Item(30, 120)  // v/w = 4.0
        };
        int capacity1 = 50;
        double maxValue1 = solver.solveFractionalKnapsack(capacity1, items1.clone());
        System.out.println("Items: " + Arrays.toString(items1) + ", Capacity: " + capacity1);
        System.out.printf("Max Value: %.2f%n", maxValue1); // Expected: 60 (item A) + 100 (item B) + 20 (2/3 of item C) = 180.0

        Item[] items2 = {
                new Item(10, 100), new Item(20, 120), new Item(30, 60)
        };
        // Items sorted by value/weight: (10,100) -> 10, (20,120) -> 6, (30,60) -> 2
        int capacity2 = 30;
        double maxValue2 = solver.solveFractionalKnapsack(capacity2, items2.clone());
        System.out.println("\nItems: " + Arrays.toString(items2) + ", Capacity: " + capacity2);
        System.out.printf("Max Value: %.2f%n", maxValue2); // Expected: 100 (item 1) + 10 (1/2 of item 2) * 6 = 100 + 60 = 160.0
    }

    private static void runJobSequencingDemo() {
        System.out.println("4. Job Sequencing with Deadlines Problem:");
        JobSequencing solver = new JobSequencing();

        Job[] jobs1 = {
                new Job('a', 2, 100), // d=2, p=100
                new Job('b', 1, 19),  // d=1, p=19
                new Job('c', 2, 27),  // d=2, p=27
                new Job('d', 1, 25),  // d=1, p=25
                new Job('e', 3, 15)   // d=3, p=15
        };
        System.out.println("Jobs: " + Arrays.toString(jobs1));
        int maxProfit1 = solver.findMaxProfit(jobs1.clone());
        // Expected order by profit: a (100), c (27), d (25), e (15), b (19)
        // Schedule:
        // 'a' (deadline 2) -> slot 1
        // 'c' (deadline 2) -> slot 0
        // 'd' (deadline 1) -> no slot <=0 available
        // 'e' (deadline 3) -> slot 2
        // Profit: 100 + 27 + 15 = 142
        // Actual output: a(100),c(27),e(15) -> 142. If d was processed before c: a(100), d(25), e(15) -> 140.
        // It relies on placing job as late as possible.
        System.out.println("Max Profit: " + maxProfit1);

        Job[] jobs2 = {
                new Job('a', 4, 20),
                new Job('b', 1, 10),
                new Job('c', 1, 40),
                new Job('d', 1, 30)
        };
        System.out.println("\nJobs: " + Arrays.toString(jobs2));
        int maxProfit2 = solver.findMaxProfit(jobs2.clone());
        // Expected order by profit: c (40), d (30), a (20), b (10)
        // Schedule:
        // 'c' (deadline 1) -> slot 0. Total Profit = 40.
        // 'd' (deadline 1) -> no slot <=0 available.
        // 'a' (deadline 4) -> slot 3. Total Profit = 40 + 20 = 60.
        // 'b' (deadline 1) -> no slot <=0 available.
        // Final schedule: [c, _, _, a] (slots 0,1,2,3). Max Profit = 60.
        System.out.println("Max Profit: " + maxProfit2);
    }

    private static void runMinimizeCashFlowDemo() {
        System.out.println("5. Minimize Cash Flow Problem:");
        MinimizeCashFlow solver = new MinimizeCashFlow();

        List<String> transactions1 = Arrays.asList(
                "A,B,100",
                "B,C,50",
                "C,A,75"
        );
        System.out.println("Initial Transactions: " + transactions1);
        List<Transaction> minimized1 = solver.minimize(transactions1);
        // Balances:
        // A: -100 (pays B) + 75 (receives from C) = -25 (Debtor)
        // B: +100 (receives from A) - 50 (pays C) = +50 (Creditor)
        // C: +50 (receives from B) - 75 (pays A) = -25 (Debtor)
        //
        // 1. Max Creditor: B (+50), Max Debtor: A (-25)
        //    A pays B: 25.
        //    Balances: A: 0, B: +25, C: -25
        //    Transaction: A pays B $25.00
        //
        // 2. Max Creditor: B (+25), Max Debtor: C (-25)
        //    C pays B: 25.
        //    Balances: A: 0, B: 0, C: 0
        //    Transaction: C pays B $25.00
        System.out.println("Minimized Transactions: " + minimized1);

        List<String> transactions2 = Arrays.asList(
                "Alice,Bob,100",
                "Bob,Charlie,50",
                "David,Alice,200",
                "Charlie,David,30"
        );
        System.out.println("\nInitial Transactions: " + transactions2);
        List<Transaction> minimized2 = solver.minimize(transactions2);
        System.out.println("Minimized Transactions: " + minimized2);
        // Balances:
        // Alice: -100 (pays Bob) + 200 (receives from David) = +100 (Creditor)
        // Bob:   +100 (receives from Alice) - 50 (pays Charlie) = +50 (Creditor)
        // Charlie: +50 (receives from Bob) - 30 (pays David) = +20 (Creditor)
        // David:   +30 (receives from Charlie) - 200 (pays Alice) = -170 (Debtor)
        //
        // Initial Non-zero balances: Alice: 100, Bob: 50, Charlie: 20, David: -170
        //
        // 1. Max Creditor: Alice (100), Max Debtor: David (-170)
        //    David pays Alice: 100
        //    Balances: Alice: 0, Bob: 50, Charlie: 20, David: -70
        //    Transaction: David pays Alice $100.00
        //
        // 2. Max Creditor: Bob (50), Max Debtor: David (-70)
        //    David pays Bob: 50
        //    Balances: Alice: 0, Bob: 0, Charlie: 20, David: -20
        //    Transaction: David pays Bob $50.00
        //
        // 3. Max Creditor: Charlie (20), Max Debtor: David (-20)
        //    David pays Charlie: 20
        //    Balances: Alice: 0, Bob: 0, Charlie: 0, David: 0
        //    Transaction: David pays Charlie $20.00
        //
        // Expected output transactions:
        // David pays Alice $100.00
        // David pays Bob $50.00
        // David pays Charlie $20.00
        // The order might vary based on how max debtor/creditor are chosen if ties exist,
        // but the set of transactions and amounts should be the same.
    }

    private static void runPerformanceBenchmarkDemo() {
        System.out.println("6. Performance Benchmark Utility Demo:");

        // Benchmark a simple task
        PerformanceBenchmark.measureTime("Simple Loop", () -> {
            long sum = 0;
            for (int i = 0; i < 1_000_000; i++) {
                sum += i;
            }
            // System.out.println("Sum: " + sum); // Avoid printing inside benchmark for cleaner results
        });

        // Benchmark a task that returns a result
        DataStructures.Pair<Long, Long> resultAndDuration = PerformanceBenchmark.measureTimeAndResult(
                "Complex Calculation", () -> {
                    long product = 1;
                    for (int i = 1; i < 1000; i++) {
                        product *= i;
                        product %= 1_000_000_007; // Keep number manageable
                    }
                    return product;
                });
        System.out.println("Result of complex calculation: " + resultAndDuration.getKey());
        System.out.println("Duration from pair: " + resultAndDuration.getValue() + " ms");


        // Example with a greedy algorithm
        ActivitySelection activitySolver = new ActivitySelection();
        Activity[] largeActivities = new Activity[100000];
        for (int i = 0; i < largeActivities.length; i++) {
            largeActivities[i] = new Activity(i, i + (int)(Math.random() * 10) + 1); // Random finish time a bit after start
        }
        System.out.println("\nBenchmarking Activity Selection for 100,000 activities:");
        PerformanceBenchmark.measureTime("ActivitySelection (100k activities)", () -> {
            activitySolver.selectActivities(largeActivities);
        });

        // Example with Coin Change DP for large amount
        CoinChange coinChangeSolver = new CoinChange();
        int[] denominations = {1, 5, 10, 25, 50, 100};
        int largeAmount = 10000;
        System.out.println("\nBenchmarking Coin Change DP for Amount " + largeAmount + " and " + denominations.length + " denominations:");
        PerformanceBenchmark.measureTime("CoinChange DP (Large Amount)", () -> {
            coinChangeSolver.findMinCoinsDP(denominations, largeAmount);
        });

        // Example with Coin Change Greedy for large amount (faster for canonical)
        System.out.println("\nBenchmarking Coin Change Greedy for Amount " + largeAmount + " and " + denominations.length + " denominations:");
        PerformanceBenchmark.measureTime("CoinChange Greedy (Large Amount)", () -> {
            coinChangeSolver.findMinCoinsGreedy(denominations, largeAmount);
        });
    }
}