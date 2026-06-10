```java
package com.techinterview.stackqueue;

import com.techinterview.stackqueue.problems.MinStack;
import com.techinterview.stackqueue.problems.QueueUsingStacks;
import com.techinterview.stackqueue.problems.RecentCounter;
import com.techinterview.stackqueue.problems.StackQueueProblems;
import com.techinterview.stackqueue.problems.WallsAndGates;
import com.techinterview.stackqueue.util.PerformanceBenchmark;

import java.util.Arrays;

/**
 * Main application class to demonstrate the usage of the implemented Stack and Queue problems
 * and to run performance benchmarks.
 */
public class MainApp {

    public static void main(String[] args) {
        System.out.println("--- Stack and Queue Interview Project Demonstrations ---");
        System.out.println("------------------------------------------------------\n");

        demonstrateMinStack();
        System.out.println("\n------------------------------------------------------\n");
        demonstrateQueueUsingStacks();
        System.out.println("\n------------------------------------------------------\n");
        demonstrateRecentCounter();
        System.out.println("\n------------------------------------------------------\n");
        demonstrateValidParentheses();
        System.out.println("\n------------------------------------------------------\n");
        demonstrateWallsAndGates();
        System.out.println("\n------------------------------------------------------\n");
        demonstrateDailyTemperatures();
        System.out.println("\n------------------------------------------------------\n");
        demonstrateNumIslands();
        System.out.println("\n--- Benchmarking ---");
        runBenchmarks();
    }

    private static void demonstrateMinStack() {
        System.out.println("1. Min Stack Demonstration:");
        MinStack minStack = new MinStack();
        minStack.push(-2);
        minStack.push(0);
        minStack.push(-3);
        System.out.println("  Pushed: -2, 0, -3");
        System.out.println("  getMin(): " + minStack.getMin()); // Expected: -3
        minStack.pop();
        System.out.println("  Popped one element.");
        System.out.println("  top(): " + minStack.top());     // Expected: 0
        System.out.println("  getMin(): " + minStack.getMin()); // Expected: -2

        minStack.push(-4);
        minStack.push(1);
        System.out.println("  Pushed: -4, 1");
        System.out.println("  top(): " + minStack.top()); // Expected: 1
        System.out.println("  getMin(): " + minStack.getMin()); // Expected: -4
        minStack.pop();
        System.out.println("  Popped one element.");
        System.out.println("  getMin(): " + minStack.getMin()); // Expected: -4
    }

    private static void demonstrateQueueUsingStacks() {
        System.out.println("2. Queue Using Stacks Demonstration:");
        QueueUsingStacks myQueue = new QueueUsingStacks();
        myQueue.push(1);
        myQueue.push(2);
        System.out.println("  Pushed: 1, 2");
        System.out.println("  peek(): " + myQueue.peek()); // Expected: 1
        System.out.println("  pop(): " + myQueue.pop());   // Expected: 1
        System.out.println("  push(3)");
        myQueue.push(3);
        System.out.println("  peek(): " + myQueue.peek()); // Expected: 2
        System.out.println("  pop(): " + myQueue.pop());   // Expected: 2
        System.out.println("  empty(): " + myQueue.empty()); // Expected: false
        myQueue.pop(); // Pop 3
        System.out.println("  Popped one element.");
        System.out.println("  empty(): " + myQueue.empty()); // Expected: true
    }

    private static void demonstrateRecentCounter() {
        System.out.println("3. Recent Counter Demonstration:");
        RecentCounter recentCounter = new RecentCounter();
        System.out.println("  ping(1): " + recentCounter.ping(1));     // Expected: 1 (requests = [1])
        System.out.println("  ping(100): " + recentCounter.ping(100));  // Expected: 2 (requests = [1, 100])
        System.out.println("  ping(3001): " + recentCounter.ping(3001)); // Expected: 3 (requests = [1, 100, 3001])
        System.out.println("  ping(3002): " + recentCounter.ping(3002)); // Expected: 3 (requests = [1, 100, 3001] -> remove 1 -> [100, 3001, 3002])
        System.out.println("  ping(3003): " + recentCounter.ping(3003)); // Expected: 3 (requests = [100, 3001, 3002] -> remove 100 -> [3001, 3002, 3003])
        System.out.println("  ping(7000): " + recentCounter.ping(7000)); // Expected: 1 (requests = [3001, 3002, 3003] -> remove 3001,3002,3003 -> [7000])
    }

    private static void demonstrateValidParentheses() {
        System.out.println("4. Valid Parentheses Demonstration:");
        StackQueueProblems problems = new StackQueueProblems();
        System.out.println("  \"()\": " + problems.isValidParentheses("()"));       // Expected: true
        System.out.println("  \"()[]{}\": " + problems.isValidParentheses("()[]{}")); // Expected: true
        System.out.println("  \"(]\": " + problems.isValidParentheses("(]"));        // Expected: false
        System.out.println("  \"([)]\": " + problems.isValidParentheses("([)]"));    // Expected: false
        System.out.println("  \"{[]}\": " + problems.isValidParentheses("{[]}"));    // Expected: true
        System.out.println("  \"{\": " + problems.isValidParentheses("{"));         // Expected: false (unclosed)
        System.out.println("  \")\": " + problems.isValidParentheses(")"));         // Expected: false (unopened)
    }

    private static void demonstrateWallsAndGates() {
        System.out.println("5. Walls and Gates Demonstration:");
        int INF = WallsAndGates.INF;
        int[][] rooms1 = {
                {INF, -1, 0, INF},
                {INF, INF, INF, -1},
                {INF, -1, INF, -1},
                {0, -1, INF, INF}
        };
        int[][] expected1 = {
                {3, -1, 0, 1},
                {2, 2, 1, -1},
                {1, -1, 2, -1},
                {0, -1, 3, 4}
        };

        System.out.println("  Input Grid:");
        printGrid(rooms1);
        new WallsAndGates().wallsAndGates(rooms1);
        System.out.println("  Output Grid (Distances to nearest gate):");
        printGrid(rooms1);
        System.out.println("  Expected Output Grid:");
        printGrid(expected1);

        int[][] rooms2 = {
                {INF, -1},
                {0, INF}
        };
        int[][] expected2 = {
                {1, -1},
                {0, 1}
        };
        System.out.println("\n  Input Grid 2:");
        printGrid(rooms2);
        new WallsAndGates().wallsAndGates(rooms2);
        System.out.println("  Output Grid 2:");
        printGrid(rooms2);
        System.out.println("  Expected Output Grid 2:");
        printGrid(expected2);
    }

    private static void demonstrateDailyTemperatures() {
        System.out.println("6. Daily Temperatures Demonstration:");
        StackQueueProblems problems = new StackQueueProblems();
        int[] temps1 = {73, 74, 75, 71, 69, 72, 76, 73};
        int[] result1 = problems.dailyTemperatures(temps1);
        System.out.println("  Temperatures: " + Arrays.toString(temps1));
        System.out.println("  Wait days:    " + Arrays.toString(result1)); // Expected: [1, 1, 4, 2, 1, 1, 0, 0]

        int[] temps2 = {30, 40, 50, 60};
        int[] result2 = problems.dailyTemperatures(temps2);
        System.out.println("  Temperatures: " + Arrays.toString(temps2));
        System.out.println("  Wait days:    " + Arrays.toString(result2)); // Expected: [1, 1, 1, 0]

        int[] temps3 = {30, 60, 90};
        int[] result3 = problems.dailyTemperatures(temps3);
        System.out.println("  Temperatures: " + Arrays.toString(temps3));
        System.out.println("  Wait days:    " + Arrays.toString(result3)); // Expected: [1, 1, 0]
    }

    private static void demonstrateNumIslands() {
        System.out.println("7. Number of Islands Demonstration:");
        StackQueueProblems problems = new StackQueueProblems();
        char[][] grid1 = {
                {'1', '1', '1', '1', '0'},
                {'1', '1', '0', '1', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '0', '0', '0'}
        };
        System.out.println("  Grid 1:");
        printGrid(grid1);
        System.out.println("  Number of islands: " + problems.numIslands(grid1)); // Expected: 1

        char[][] grid2 = {
                {'1', '1', '0', '0', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '1', '0', '0'},
                {'0', '0', '0', '1', '1'}
        };
        System.out.println("\n  Grid 2:");
        printGrid(grid2);
        System.out.println("  Number of islands: " + problems.numIslands(grid2)); // Expected: 3
    }


    private static void printGrid(int[][] grid) {
        for (int[] row : grid) {
            for (int cell : row) {
                if (cell == WallsAndGates.INF) {
                    System.out.printf("%4s", "INF");
                } else {
                    System.out.printf("%4d", cell);
                }
            }
            System.out.println();
        }
    }

    private static void printGrid(char[][] grid) {
        for (char[] row : grid) {
            for (char cell : row) {
                System.out.print(cell + " ");
            }
            System.out.println();
        }
    }

    private static void runBenchmarks() {
        int largeN = 100000;
        int smallM = 20;

        // Benchmark MinStack
        PerformanceBenchmark.measureTime(() -> {
            MinStack ms = new MinStack();
            for (int i = 0; i < largeN; i++) {
                ms.push(i);
            }
            for (int i = 0; i < largeN / 2; i++) {
                ms.getMin();
                ms.pop();
            }
        }, 100, "MinStack Operations (Mixed Push/Pop/GetMin)");

        // Benchmark QueueUsingStacks
        PerformanceBenchmark.measureTime(() -> {
            QueueUsingStacks q = new QueueUsingStacks();
            for (int i = 0; i < largeN; i++) {
                q.push(i);
            }
            for (int i = 0; i < largeN / 2; i++) {
                q.peek();
                q.pop();
            }
        }, 100, "QueueUsingStacks Operations (Mixed Push/Pop/Peek)");

        // Benchmark RecentCounter
        RecentCounter rc = new RecentCounter();
        PerformanceBenchmark.measureTime(() -> {
            int t = 0;
            for (int i = 0; i < largeN; i++) {
                t += (int) (Math.random() * 5); // simulate increasing timestamps
                rc.ping(t);
            }
        }, 100, "RecentCounter ping Operations");

        // Benchmark Valid Parentheses (average case)
        String longValidParentheses = "()".repeat(largeN / 2);
        PerformanceBenchmark.measureTime(() -> {
            new StackQueueProblems().isValidParentheses(longValidParentheses);
        }, 1000, "Valid Parentheses (Long Valid String)");

        // Benchmark WallsAndGates (M*N grid)
        int[][] largeGrid = new int[smallM][smallM];
        for (int i = 0; i < smallM; i++) {
            for (int j = 0; j < smallM; j++) {
                largeGrid[i][j] = WallsAndGates.INF;
            }
        }
        largeGrid[0][0] = 0; // One gate
        largeGrid[smallM - 1][smallM - 1] = 0; // Another gate
        largeGrid[smallM / 2][smallM / 2] = -1; // Some wall

        PerformanceBenchmark.measureTime(() -> {
            int[][] currentGrid = new int[smallM][smallM];
            for (int i = 0; i < smallM; i++) {
                System.arraycopy(largeGrid[i], 0, currentGrid[i], 0, smallM);
            }
            new WallsAndGates().wallsAndGates(currentGrid);
        }, 10, "WallsAndGates (Medium Grid)"); // Grid operations are more expensive, lower iterations

        // Benchmark Daily Temperatures
        int[] largeTemps = new int[largeN];
        for (int i = 0; i < largeN; i++) {
            largeTemps[i] = 30 + (int) (Math.random() * 70); // temperatures between 30 and 99
        }
        PerformanceBenchmark.measureTime(() -> {
            new StackQueueProblems().dailyTemperatures(largeTemps);
        }, 100, "Daily Temperatures (Large Array)");

        // Benchmark Number of Islands
        char[][] largeIslandGrid = new char[smallM][smallM];
        for (int i = 0; i < smallM; i++) {
            for (int j = 0; j < smallM; j++) {
                largeIslandGrid[i][j] = (Math.random() < 0.5) ? '1' : '0';
            }
        }
        // Ensure at least one island for testing
        largeIslandGrid[0][0] = '1';

        PerformanceBenchmark.measureTime(() -> {
            char[][] currentGrid = new char[smallM][smallM];
            for (int i = 0; i < smallM; i++) {
                System.arraycopy(largeIslandGrid[i], 0, currentGrid[i], 0, smallM);
            }
            new StackQueueProblems().numIslands(currentGrid);
        }, 10, "Number of Islands (Medium Grid)");
    }
}
```