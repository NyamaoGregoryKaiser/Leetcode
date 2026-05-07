```java
package perf;

import com.backtracking.interview.algorithms.BacktrackingProblems;
import com.backtracking.interview.algorithms.BruteForceSolutions;
import com.backtracking.interview.algorithms.MemoryEfficientSolutions;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Performance benchmarking class for comparing different backtracking solutions.
 * This helps illustrate the efficiency gains of optimized approaches.
 *
 * To run this:
 * 1. Compile the project: `mvn clean install`
 * 2. Run this specific class: `mvn compile && mvn exec:java -Dexec.mainClass="perf.Benchmarking"`
 *    (Note: This class is intentionally placed in a separate `perf` package outside `src/main/java`
 *    and `src/test/java` for demonstration purposes. Maven might require `mvn compile` first.)
 */
public class Benchmarking {

    private static final int WARMUP_ITERATIONS = 5;
    private static final int MEASUREMENT_ITERATIONS = 10;

    public static void main(String[] args) {
        System.out.println("--- Backtracking Algorithm Benchmarking ---");
        System.out.println("Warming up JVM for " + WARMUP_ITERATIONS + " iterations...");
        System.out.println("Measuring for " + MEASUREMENT_ITERATIONS + " iterations...\n");

        // N-Queens Benchmarking
        benchmarkNQueens(4); // Small N to verify correctness quickly
        benchmarkNQueens(8); // Standard N
        benchmarkNQueens(10); // Larger N to see performance differences more clearly

        // Sudoku Solver (can't easily benchmark different approaches, only the main one)
        System.out.println("\n--- Sudoku Solver Benchmark (N=9) ---");
        char[][] sudokuBoard = {
                {'5', '3', '.', '.', '7', '.', '.', '.', '.'},
                {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
                {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
                {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
                {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
                {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
                {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
                {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
                {'.', '.', '.', '.', '8', '.', '.', '7', '9'}
        };
        char[][] emptySudoku = new char[9][9];
        for (int i = 0; i < 9; i++) {
            java.util.Arrays.fill(emptySudoku[i], '.');
        }

        runBenchmark("Sudoku Solver (Partial Board)", () -> {
            char[][] boardCopy = copySudokuBoard(sudokuBoard);
            new BacktrackingProblems().solveSudoku(boardCopy);
        });

        // Uncomment with caution - solving a completely empty Sudoku can be very time-consuming
        // runBenchmark("Sudoku Solver (Empty Board)", () -> {
        //     char[][] boardCopy = copySudokuBoard(emptySudoku);
        //     new BacktrackingProblems().solveSudoku(boardCopy);
        // });

        System.out.println("\n--- Permutations II Benchmark (N=8) ---");
        int[] permNums = {1, 1, 2, 2, 3, 3, 4, 5}; // Example with duplicates
        runBenchmark("Permutations II", () -> {
            new BacktrackingProblems().permuteUnique(permNums);
        });

        System.out.println("\n--- Word Search Benchmark (Board 5x5, Word Length 10) ---");
        char[][] wordSearchBoard = {
                {'A', 'B', 'C', 'E', 'D'},
                {'S', 'F', 'C', 'S', 'E'},
                {'A', 'D', 'E', 'E', 'F'},
                {'G', 'H', 'I', 'J', 'K'},
                {'L', 'M', 'N', 'O', 'P'}
        };
        String wordToFind = "ABCCEDFGHI"; // A longer path
        runBenchmark("Word Search", () -> {
            new BacktrackingProblems().exist(copyCharGrid(wordSearchBoard), wordToFind);
        });

        System.out.println("\n--- Benchmarking Complete ---");
    }

    private static void benchmarkNQueens(int n) {
        System.out.println("\n--- N-Queens (N=" + n + ") ---");

        // Optimized solution
        runBenchmark("BacktrackingProblems.solveNQueens", () -> {
            new BacktrackingProblems().solveNQueens(n);
        });

        // Memory-efficient (bitwise) solution
        runBenchmark("MemoryEfficientSolutions.solveNQueens (Bitwise)", () -> {
            new MemoryEfficientSolutions().solveNQueens(n);
        });

        // Brute-force-like (less optimized safety check) solution
        if (n <= 10) { // Brute-force is significantly slower, limit N
            runBenchmark("BruteForceSolutions.solveNQueens", () -> {
                new BruteForceSolutions().solveNQueens(n);
            });
        } else {
            System.out.println("  BruteForceSolutions.solveNQueens skipped for N=" + n + " (too slow).");
        }
    }

    private static void runBenchmark(String name, Runnable task) {
        // Warmup
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            task.run();
        }

        long totalTime = 0;
        for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
            long startTime = System.nanoTime();
            task.run();
            long endTime = System.nanoTime();
            totalTime += (endTime - startTime);
        }

        long averageTimeNanos = totalTime / MEASUREMENT_ITERATIONS;
        System.out.printf("  %s: Average time = %.3f ms (Total solutions not reported here)\n",
                name, TimeUnit.NANOSECONDS.toMicros(averageTimeNanos) / 1000.0);
    }

    private static char[][] copySudokuBoard(char[][] original) {
        char[][] copy = new char[original.length][];
        for (int i = 0; i < original.length; i++) {
            copy[i] = java.util.Arrays.copyOf(original[i], original[i].length);
        }
        return copy;
    }

    private static char[][] copyCharGrid(char[][] original) {
        char[][] copy = new char[original.length][];
        for (int i = 0; i < original.length; i++) {
            copy[i] = java.util.Arrays.copyOf(original[i], original[i].length);
        }
        return copy;
    }
}
```