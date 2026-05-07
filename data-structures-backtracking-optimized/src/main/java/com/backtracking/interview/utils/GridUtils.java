```java
package com.backtracking.interview.utils;

import java.util.List;

/**
 * Utility class for printing and manipulating grid-based data structures.
 */
public class GridUtils {

    /**
     * Prints a chessboard represented as List<String>.
     * Each string represents a row, with 'Q' for queen and '.' for empty.
     * @param board The board to print.
     */
    public static void printBoard(List<String> board) {
        for (String row : board) {
            System.out.println(row);
        }
        System.out.println();
    }

    /**
     * Prints a Sudoku board represented as char[][].
     * @param board The Sudoku board to print.
     */
    public static void printSudokuBoard(char[][] board) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                System.out.print(board[i][j] + " ");
                if ((j + 1) % 3 == 0 && j != board[i].length - 1) {
                    System.out.print("| ");
                }
            }
            System.out.println();
            if ((i + 1) % 3 == 0 && i != board.length - 1) {
                System.out.println("---------------------");
            }
        }
        System.out.println();
    }

    /**
     * Prints a generic character grid.
     * @param grid The character grid to print.
     */
    public static void printCharGrid(char[][] grid) {
        for (char[] row : grid) {
            for (char c : row) {
                System.out.print(c + " ");
            }
            System.out.println();
        }
        System.out.println();
    }

    /**
     * Helper to clone a 2D char array, useful for testing in-place modifications
     * like Sudoku solver.
     * @param original The original char[][] to clone.
     * @return A deep copy of the original array.
     */
    public static char[][] cloneCharGrid(char[][] original) {
        if (original == null) {
            return null;
        }
        char[][] clone = new char[original.length][];
        for (int i = 0; i < original.length; i++) {
            clone[i] = original[i].clone();
        }
        return clone;
    }
}
```