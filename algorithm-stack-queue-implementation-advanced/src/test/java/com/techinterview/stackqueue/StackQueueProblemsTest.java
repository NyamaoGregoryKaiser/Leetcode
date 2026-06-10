```java
package com.techinterview.stackqueue;

import com.techinterview.stackqueue.problems.StackQueueProblems;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for {@link StackQueueProblems}.
 */
public class StackQueueProblemsTest {

    private StackQueueProblems problems;

    @BeforeEach
    void setUp() {
        problems = new StackQueueProblems();
    }

    // --- Valid Parentheses Tests ---

    @Test
    @DisplayName("isValidParentheses: Should return true for valid parentheses strings")
    void testValidParentheses_TrueCases() {
        assertTrue(problems.isValidParentheses("()"));
        assertTrue(problems.isValidParentheses("()[]{}"));
        assertTrue(problems.isValidParentheses("{[]}"));
        assertTrue(problems.isValidParentheses("([{}])"));
        assertTrue(problems.isValidParentheses("")); // Empty string is considered valid
        assertTrue(problems.isValidParentheses("{{(())}}[]"));
    }

    @Test
    @DisplayName("isValidParentheses: Should return false for invalid parentheses strings")
    void testValidParentheses_FalseCases() {
        assertFalse(problems.isValidParentheses("(]"));      // Mismatched closing bracket
        assertFalse(problems.isValidParentheses("([)]"));    // Incorrect order
        assertFalse(problems.isValidParentheses("{"));       // Unclosed opening bracket
        assertFalse(problems.isValidParentheses("}"));       // Unopened closing bracket
        assertFalse(problems.isValidParentheses("]]"));      // Multiple unopened closing brackets
        assertFalse(problems.isValidParentheses("({["));     // Multiple unclosed opening brackets
        assertFalse(problems.isValidParentheses("[])"));     // Incorrect pairing and order
        assertFalse(problems.isValidParentheses("((("));
        assertFalse(problems.isValidParentheses(")))"));
    }

    @Test
    @DisplayName("isValidParentheses: Should handle long valid strings")
    void testValidParentheses_LongString() {
        String longValid = "(([[{{}}]]))".repeat(100); // 2400 chars
        assertTrue(problems.isValidParentheses(longValid));
    }

    // --- Daily Temperatures Tests ---

    @Test
    @DisplayName("dailyTemperatures: Should return correct wait days for standard input")
    void testDailyTemperatures_Standard() {
        int[] temperatures = {73, 74, 75, 71, 69, 72, 76, 73};
        int[] expected = {1, 1, 4, 2, 1, 1, 0, 0};
        assertArrayEquals(expected, problems.dailyTemperatures(temperatures));
    }

    @Test
    @DisplayName("dailyTemperatures: Should handle strictly increasing temperatures")
    void testDailyTemperatures_Increasing() {
        int[] temperatures = {30, 40, 50, 60};
        int[] expected = {1, 1, 1, 0};
        assertArrayEquals(expected, problems.dailyTemperatures(temperatures));
    }

    @Test
    @DisplayName("dailyTemperatures: Should handle strictly decreasing temperatures")
    void testDailyTemperatures_Decreasing() {
        int[] temperatures = {60, 50, 40, 30};
        int[] expected = {0, 0, 0, 0};
        assertArrayEquals(expected, problems.dailyTemperatures(temperatures));
    }

    @Test
    @DisplayName("dailyTemperatures: Should handle all same temperatures")
    void testDailyTemperatures_Same() {
        int[] temperatures = {70, 70, 70, 70};
        int[] expected = {0, 0, 0, 0};
        assertArrayEquals(expected, problems.dailyTemperatures(temperatures));
    }

    @Test
    @DisplayName("dailyTemperatures: Should handle empty array")
    void testDailyTemperatures_Empty() {
        int[] temperatures = {};
        int[] expected = {};
        assertArrayEquals(expected, problems.dailyTemperatures(temperatures));
    }

    @Test
    @DisplayName("dailyTemperatures: Should handle single element array")
    void testDailyTemperatures_SingleElement() {
        int[] temperatures = {100};
        int[] expected = {0};
        assertArrayEquals(expected, problems.dailyTemperatures(temperatures));
    }

    // --- Number of Islands Tests ---

    @Test
    @DisplayName("numIslands: Should count islands correctly in a typical grid")
    void testNumIslands_TypicalGrid() {
        char[][] grid = {
                {'1', '1', '1', '1', '0'},
                {'1', '1', '0', '1', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '0', '0', '0'}
        };
        assertEquals(1, problems.numIslands(grid));

        char[][] grid2 = {
                {'1', '1', '0', '0', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '1', '0', '0'},
                {'0', '0', '0', '1', '1'}
        };
        assertEquals(3, problems.numIslands(grid2));
    }

    @Test
    @DisplayName("numIslands: Should handle grid with no islands")
    void testNumIslands_NoIslands() {
        char[][] grid = {
                {'0', '0', '0'},
                {'0', '0', '0'}
        };
        assertEquals(0, problems.numIslands(grid));
    }

    @Test
    @DisplayName("numIslands: Should handle grid full of islands (connected component)")
    void testNumIslands_FullIsland() {
        char[][] grid = {
                {'1', '1', '1'},
                {'1', '1', '1'},
                {'1', '1', '1'}
        };
        assertEquals(1, problems.numIslands(grid));
    }

    @Test
    @DisplayName("numIslands: Should handle empty grid")
    void testNumIslands_EmptyGrid() {
        char[][] grid = {};
        assertEquals(0, problems.numIslands(grid));
        char[][] grid2 = {{}};
        assertEquals(0, problems.numIslands(grid2));
    }

    @Test
    @DisplayName("numIslands: Should handle grid with single cell island")
    void testNumIslands_SingleCellIsland() {
        char[][] grid = {
                {'0', '1', '0'},
                {'0', '0', '0'}
        };
        assertEquals(1, problems.numIslands(grid));
    }

    @Test
    @DisplayName("numIslands: Should handle large grid with complex island shapes")
    void testNumIslands_LargeComplexGrid() {
        char[][] grid = {
                {'1','1','1','1','0','0','0','1','1','1'},
                {'1','1','0','1','0','1','0','0','1','0'},
                {'1','1','0','0','0','1','0','0','1','0'},
                {'0','0','0','0','0','0','0','0','0','0'},
                {'1','0','1','0','1','0','1','0','1','0'},
                {'0','1','0','1','0','1','0','1','0','1'}
        };
        // Expected islands:
        // Top-left block: 1
        // Middle block (row 1, col 5): 1
        // Right block (row 0, col 7 to row 2, col 8): 1
        // Row 4 individual 1s: 5
        // Total: 1+1+1+5 = 8 if each '1' in row 4 is isolated from the previous block.
        // Let's trace carefully:
        // (0,0) (0,1) (0,2) (0,3) (1,0) (1,1) (1,3) (2,0) (2,1) -> Island 1
        // (0,7) (0,8) (0,9) (1,8) (2,8) -> Island 2
        // (1,5) (2,5) (3,5) -- oh, grid[3][5] is 0, (2,5) is part of nothing in the provided grid.
        // let's re-evaluate:
        // First pass, (0,0) hits '1'. BFS explores all connected '1's.
        // It consumes (0,0),(0,1),(0,2),(0,3),(1,0),(1,1),(1,3),(2,0),(2,1). This is one island. Count = 1.
        // Next unvisited '1' might be (0,7). BFS consumes (0,7),(0,8),(0,9),(1,8),(2,8). This is island 2. Count = 2.
        // Next unvisited '1' (4,0). Consumes (4,0). Island 3. Count = 3.
        // Next unvisited '1' (4,2). Consumes (4,2). Island 4. Count = 4.
        // Next unvisited '1' (4,4). Consumes (4,4). Island 5. Count = 5.
        // Next unvisited '1' (4,6). Consumes (4,6). Island 6. Count = 6.
        // Next unvisited '1' (4,8). Consumes (4,8). Island 7. Count = 7.
        // Correct is 7.
        assertEquals(7, problems.numIslands(grid));
    }
}
```