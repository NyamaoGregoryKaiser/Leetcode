```java
package com.backtracking.interview.algorithms;

import com.backtracking.interview.utils.GridUtils;
import com.backtracking.interview.utils.PermutationUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for {@link BacktrackingProblems}.
 * Contains comprehensive test cases for N-Queens, Sudoku Solver, Combination Sum II,
 * Permutations II, and Word Search.
 */
class BacktrackingProblemsTest {

    private BacktrackingProblems solver;

    @BeforeEach
    void setUp() {
        solver = new BacktrackingProblems();
    }

    // --- N-Queens Tests ---
    @Test
    void testSolveNQueens_N1() {
        List<List<String>> expected = Collections.singletonList(Collections.singletonList("Q"));
        assertEquals(expected, solver.solveNQueens(1));
    }

    @Test
    void testSolveNQueens_N4() {
        List<List<String>> expected = Arrays.asList(
                Arrays.asList(".Q..", "...Q", "Q...", "..Q."),
                Arrays.asList("..Q.", "Q...", "...Q", ".Q..")
        );
        List<List<String>> actual = solver.solveNQueens(4);
        assertEquals(expected.size(), actual.size());
        assertTrue(actual.containsAll(expected) && expected.containsAll(actual));
    }

    @Test
    void testSolveNQueens_N8() {
        List<List<String>> solutions = solver.solveNQueens(8);
        assertEquals(92, solutions.size());
        // Can add a check for a specific solution if desired
    }

    @Test
    void testSolveNQueens_N0() {
        List<List<String>> expected = new ArrayList<>();
        assertEquals(expected, solver.solveNQueens(0)); // Should return empty list
    }

    @Test
    void testSolveNQueens_N2() {
        List<List<String>> expected = new ArrayList<>();
        assertEquals(expected, solver.solveNQueens(2)); // N=2 has no solutions
    }

    @Test
    void testSolveNQueens_N3() {
        List<List<String>> expected = new ArrayList<>();
        assertEquals(expected, solver.solveNQueens(3)); // N=3 has no solutions
    }


    // --- Sudoku Solver Tests ---
    @Test
    void testSolveSudoku_ValidBoard() {
        char[][] board = {
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
        char[][] expected = {
                {'5', '3', '4', '6', '7', '8', '9', '1', '2'},
                {'6', '7', '2', '1', '9', '5', '3', '4', '8'},
                {'1', '9', '8', '3', '4', '2', '5', '6', '7'},
                {'8', '5', '9', '7', '6', '1', '4', '2', '3'},
                {'4', '2', '6', '8', '5', '3', '7', '9', '1'},
                {'7', '1', '3', '9', '2', '4', '8', '5', '6'},
                {'9', '6', '1', '5', '3', '7', '2', '8', '4'},
                {'2', '8', '7', '4', '1', '9', '6', '3', '5'},
                {'3', '4', '5', '2', '8', '6', '1', '7', '9'}
        };
        char[][] boardCopy = GridUtils.cloneCharGrid(board); // Make a copy as solveSudoku modifies in-place
        assertTrue(solver.solveSudoku(boardCopy));
        assertArrayEquals(expected, boardCopy);
    }

    @Test
    void testSolveSudoku_EmptyBoard() {
        char[][] board = new char[9][9];
        for (int i = 0; i < 9; i++) {
            Arrays.fill(board[i], '.');
        }
        char[][] boardCopy = GridUtils.cloneCharGrid(board);
        assertTrue(solver.solveSudoku(boardCopy));
        // Verify it's a valid solved sudoku board (e.g., all cells are digits, no conflicts)
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                assertTrue(boardCopy[r][c] >= '1' && boardCopy[r][c] <= '9');
            }
        }
        // Additional rigorous check for a solved board (can be moved to a helper for reusability)
        // This implicitly tests the isValidSudokuPlacement logic with final board state.
        for (int i = 0; i < 9; i++) {
            assertTrue(isValidSolvedLine(boardCopy[i])); // Check rows
            assertTrue(isValidSolvedLine(getColumn(boardCopy, i))); // Check columns
            assertTrue(isValidSolvedLine(getBox(boardCopy, i / 3 * 3, i % 3 * 3))); // Check 3x3 boxes
        }
    }

    private boolean isValidSolvedLine(char[] line) {
        Set<Character> seen = new HashSet<>();
        for (char c : line) {
            if (c == '.') return false; // Should be full
            if (!seen.add(c)) return false; // Duplicate found
        }
        return seen.size() == 9; // All 9 unique digits
    }

    private char[] getColumn(char[][] board, int colIndex) {
        char[] column = new char[9];
        for (int i = 0; i < 9; i++) {
            column[i] = board[i][colIndex];
        }
        return column;
    }

    private char[] getBox(char[][] board, int startRow, int startCol) {
        char[] box = new char[9];
        int k = 0;
        for (int r = startRow; r < startRow + 3; r++) {
            for (int c = startCol; c < startCol + 3; c++) {
                box[k++] = board[r][c];
            }
        }
        return box;
    }

    @Test
    void testSolveSudoku_NoSolution() {
        char[][] board = {
                {'8', '8', '.', '.', '.', '.', '.', '.', '.'}, // Invalid start, two 8s in same row
                {'.', '.', '.', '.', '.', '.', '.', '.', '.'},
                {'.', '.', '.', '.', '.', '.', '.', '.', '.'},
                {'.', '.', '.', '.', '.', '.', '.', '.', '.'},
                {'.', '.', '.', '.', '.', '.', '.', '.', '.'},
                {'.', '.', '.', '.', '.', '.', '.', '.', '.'},
                {'.', '.', '.', '.', '.', '.', '.', '.', '.'},
                {'.', '.', '.', '.', '.', '.', '.', '.', '.'},
                {'.', '.', '.', '.', '.', '.', '.', '.', '.'}
        };
        char[][] boardCopy = GridUtils.cloneCharGrid(board);
        assertFalse(solver.solveSudoku(boardCopy));
    }


    // --- Combination Sum II Tests ---
    @Test
    void testCombinationSum2_Basic() {
        int[] candidates = {10, 1, 2, 7, 6, 1, 5};
        int target = 8;
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1, 1, 6),
                Arrays.asList(1, 2, 5),
                Arrays.asList(1, 7),
                Arrays.asList(2, 6)
        );
        List<List<Integer>> actual = solver.combinationSum2(candidates, target);
        assertTrue(PermutationUtils.areListsOfListsEqual(expected, actual));
    }

    @Test
    void testCombinationSum2_WithDuplicates() {
        int[] candidates = {2, 5, 2, 1, 2};
        int target = 5;
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1, 2, 2),
                Arrays.asList(5)
        );
        List<List<Integer>> actual = solver.combinationSum2(candidates, target);
        assertTrue(PermutationUtils.areListsOfListsEqual(expected, actual));
    }

    @Test
    void testCombinationSum2_NoSolution() {
        int[] candidates = {1, 2, 3};
        int target = 7;
        List<List<Integer>> expected = new ArrayList<>();
        List<List<Integer>> actual = solver.combinationSum2(candidates, target);
        assertEquals(expected, actual);
    }

    @Test
    void testCombinationSum2_TargetZero() {
        int[] candidates = {1, 2, 3};
        int target = 0;
        List<List<Integer>> expected = Collections.singletonList(Collections.emptyList()); // Only empty list if target is 0
        List<List<Integer>> actual = solver.combinationSum2(candidates, target);
        assertTrue(PermutationUtils.areListsOfListsEqual(expected, actual));
    }

    @Test
    void testCombinationSum2_LargeNumbers() {
        int[] candidates = {100, 10, 20, 70, 60, 10, 50};
        int target = 80;
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(10, 10, 60),
                Arrays.asList(10, 20, 50),
                Arrays.asList(10, 70),
                Arrays.asList(20, 60)
        );
        List<List<Integer>> actual = solver.combinationSum2(candidates, target);
        assertTrue(PermutationUtils.areListsOfListsEqual(expected, actual));
    }

    // --- Permutations II Tests ---
    @Test
    void testPermuteUnique_BasicDuplicates() {
        int[] nums = {1, 1, 2};
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1, 1, 2),
                Arrays.asList(1, 2, 1),
                Arrays.asList(2, 1, 1)
        );
        List<List<Integer>> actual = solver.permuteUnique(nums);
        assertTrue(PermutationUtils.areListsOfListsEqual(expected, actual));
    }

    @Test
    void testPermuteUnique_NoDuplicates() {
        int[] nums = {1, 2, 3};
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1, 2, 3),
                Arrays.asList(1, 3, 2),
                Arrays.asList(2, 1, 3),
                Arrays.asList(2, 3, 1),
                Arrays.asList(3, 1, 2),
                Arrays.asList(3, 2, 1)
        );
        List<List<Integer>> actual = solver.permuteUnique(nums);
        assertTrue(PermutationUtils.areListsOfListsEqual(expected, actual));
    }

    @Test
    void testPermuteUnique_SingleElement() {
        int[] nums = {1};
        List<List<Integer>> expected = Collections.singletonList(Collections.singletonList(1));
        List<List<Integer>> actual = solver.permuteUnique(nums);
        assertEquals(expected, actual);
    }

    @Test
    void testPermuteUnique_AllDuplicates() {
        int[] nums = {2, 2, 2};
        List<List<Integer>> expected = Collections.singletonList(Arrays.asList(2, 2, 2));
        List<List<Integer>> actual = solver.permuteUnique(nums);
        assertEquals(expected, actual);
    }

    @Test
    void testPermuteUnique_EmptyArray() {
        int[] nums = {};
        List<List<Integer>> expected = Collections.singletonList(Collections.emptyList());
        List<List<Integer>> actual = solver.permuteUnique(nums);
        assertEquals(expected, actual);
    }

    // --- Word Search Tests ---
    @Test
    void testExist_WordFound() {
        char[][] board = {
                {'A', 'B', 'C', 'E'},
                {'S', 'F', 'C', 'S'},
                {'A', 'D', 'E', 'E'}
        };
        assertTrue(solver.exist(GridUtils.cloneCharGrid(board), "ABCCED"));
        assertTrue(solver.exist(GridUtils.cloneCharGrid(board), "SEE"));
    }

    @Test
    void testExist_WordNotFound() {
        char[][] board = {
                {'A', 'B', 'C', 'E'},
                {'S', 'F', 'C', 'S'},
                {'A', 'D', 'E', 'E'}
        };
        assertFalse(solver.exist(GridUtils.cloneCharGrid(board), "ABCB"));
    }

    @Test
    void testExist_SingleCellBoard() {
        char[][] board = {{'A'}};
        assertTrue(solver.exist(GridUtils.cloneCharGrid(board), "A"));
        assertFalse(solver.exist(GridUtils.cloneCharGrid(board), "B"));
    }

    @Test
    void testExist_EmptyBoard() {
        char[][] board = {};
        assertFalse(solver.exist(board, "A"));
        char[][] emptyBoard = {{}};
        assertFalse(solver.exist(emptyBoard, "A"));
    }

    @Test
    void testExist_EmptyWord() {
        char[][] board = {{'A', 'B'}};
        assertTrue(solver.exist(GridUtils.cloneCharGrid(board), "")); // Empty word is always found (conventionally true or handled per problem spec)
    }

    @Test
    void testExist_LongWord() {
        char[][] board = {
                {'A', 'B', 'C', 'D', 'E'},
                {'F', 'G', 'H', 'I', 'J'},
                {'K', 'L', 'M', 'N', 'O'},
                {'P', 'Q', 'R', 'S', 'T'},
                {'U', 'V', 'W', 'X', 'Y'}
        };
        assertTrue(solver.exist(GridUtils.cloneCharGrid(board), "ABCDE"));
        assertTrue(solver.exist(GridUtils.cloneCharGrid(board), "AFKPU"));
        assertTrue(solver.exist(GridUtils.cloneCharGrid(board), "MLK"));
        assertFalse(solver.exist(GridUtils.cloneCharGrid(board), "AZZZZ"));
    }

    @Test
    void testExist_WordTooLong() {
        char[][] board = {{'A', 'B'}};
        assertFalse(solver.exist(GridUtils.cloneCharGrid(board), "ABC"));
    }
}
```