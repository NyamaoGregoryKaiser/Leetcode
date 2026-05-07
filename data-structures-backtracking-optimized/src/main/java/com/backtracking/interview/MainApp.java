```java
package com.backtracking.interview;

import com.backtracking.interview.algorithms.BacktrackingProblems;
import com.backtracking.interview.algorithms.BruteForceSolutions;
import com.backtracking.interview.algorithms.MemoryEfficientSolutions;
import com.backtracking.interview.utils.GridUtils;

import java.util.List;
import java.util.Arrays;

/**
 * Main application class to demonstrate the usage of Backtracking algorithms.
 * This class provides examples for each implemented backtracking problem.
 */
public class MainApp {
    public static void main(String[] args) {
        System.out.println("--- Backtracking Interview Project Demonstrations ---");
        System.out.println("===================================================");

        BacktrackingProblems problems = new BacktrackingProblems();

        // Problem 1: N-Queens
        System.out.println("\n--- N-Queens Problem (N=4) ---");
        List<List<String>> nQueensSolutions = problems.solveNQueens(4);
        System.out.println("Number of solutions: " + nQueensSolutions.size());
        for (int i = 0; i < nQueensSolutions.size(); i++) {
            System.out.println("Solution " + (i + 1) + ":");
            GridUtils.printBoard(nQueensSolutions.get(i));
        }

        // Problem 2: Sudoku Solver
        System.out.println("\n--- Sudoku Solver Problem ---");
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
        System.out.println("Original Sudoku Board:");
        GridUtils.printSudokuBoard(sudokuBoard);
        boolean solved = problems.solveSudoku(sudokuBoard);
        if (solved) {
            System.out.println("Solved Sudoku Board:");
            GridUtils.printSudokuBoard(sudokuBoard);
        } else {
            System.out.println("Failed to solve Sudoku board.");
        }

        // Problem 3: Combination Sum II
        System.out.println("\n--- Combination Sum II Problem ---");
        int[] candidates1 = {10, 1, 2, 7, 6, 1, 5};
        int target1 = 8;
        System.out.println("Candidates: " + Arrays.toString(candidates1) + ", Target: " + target1);
        List<List<Integer>> combinations1 = problems.combinationSum2(candidates1, target1);
        System.out.println("Combinations: " + combinations1);

        int[] candidates2 = {2, 5, 2, 1, 2};
        int target2 = 5;
        System.out.println("Candidates: " + Arrays.toString(candidates2) + ", Target: " + target2);
        List<List<Integer>> combinations2 = problems.combinationSum2(candidates2, target2);
        System.out.println("Combinations: " + combinations2);

        // Problem 4: Permutations II
        System.out.println("\n--- Permutations II Problem ---");
        int[] nums1 = {1, 1, 2};
        System.out.println("Input: " + Arrays.toString(nums1));
        List<List<Integer>> permutations1 = problems.permuteUnique(nums1);
        System.out.println("Unique Permutations: " + permutations1);

        int[] nums2 = {1, 2, 3};
        System.out.println("Input: " + Arrays.toString(nums2));
        List<List<Integer>> permutations2 = problems.permuteUnique(nums2);
        System.out.println("Unique Permutations: " + permutations2);

        // Problem 5: Word Search
        System.out.println("\n--- Word Search Problem ---");
        char[][] board1 = {
                {'A', 'B', 'C', 'E'},
                {'S', 'F', 'C', 'S'},
                {'A', 'D', 'E', 'E'}
        };
        String word1 = "ABCCED";
        System.out.println("Board:");
        GridUtils.printCharGrid(board1);
        System.out.println("Word: \"" + word1 + "\" -> Found: " + problems.exist(board1, word1)); // Expected: true

        String word2 = "SEE";
        System.out.println("Word: \"" + word2 + "\" -> Found: " + problems.exist(board1, word2)); // Expected: true

        String word3 = "ABCB";
        System.out.println("Word: \"" + word3 + "\" -> Found: " + problems.exist(board1, word3)); // Expected: false

        // Brute Force and Memory Efficient N-Queens demonstrations
        System.out.println("\n--- Brute Force N-Queens (N=4) ---");
        BruteForceSolutions bruteForceSolutions = new BruteForceSolutions();
        List<List<String>> bruteQueens = bruteForceSolutions.solveNQueens(4);
        System.out.println("Number of solutions (Brute Force): " + bruteQueens.size());

        System.out.println("\n--- Memory Efficient (Bitwise) N-Queens (N=4) ---");
        MemoryEfficientSolutions memEfficientSolutions = new MemoryEfficientSolutions();
        List<List<String>> memEfficientQueens = memEfficientSolutions.solveNQueens(4);
        System.out.println("Number of solutions (Bitwise): " + memEfficientQueens.size());
        for (int i = 0; i < memEfficientQueens.size(); i++) {
            System.out.println("Solution " + (i + 1) + ":");
            GridUtils.printBoard(memEfficientQueens.get(i));
        }
        System.out.println("===================================================");
    }
}
```