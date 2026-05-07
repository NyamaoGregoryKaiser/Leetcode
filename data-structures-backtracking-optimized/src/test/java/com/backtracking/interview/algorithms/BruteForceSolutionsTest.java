```java
package com.backtracking.interview.algorithms;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test class for {@link BruteForceSolutions}.
 * Focuses on testing the less optimized N-Queens solution.
 */
class BruteForceSolutionsTest {

    private BruteForceSolutions solver;

    @BeforeEach
    void setUp() {
        solver = new BruteForceSolutions();
    }

    // --- N-Queens Brute Force Tests ---
    @Test
    void testSolveNQueensBruteForce_N1() {
        List<List<String>> expected = Collections.singletonList(Collections.singletonList("Q"));
        assertEquals(expected, solver.solveNQueens(1));
    }

    @Test
    void testSolveNQueensBruteForce_N4() {
        List<List<String>> expected = Arrays.asList(
                Arrays.asList(".Q..", "...Q", "Q...", "..Q."),
                Arrays.asList("..Q.", "Q...", "...Q", ".Q..")
        );
        List<List<String>> actual = solver.solveNQueens(4);
        assertEquals(expected.size(), actual.size());
        assertTrue(actual.containsAll(expected) && expected.containsAll(actual));
    }

    @Test
    void testSolveNQueensBruteForce_N0() {
        List<List<String>> expected = new ArrayList<>();
        assertEquals(expected, solver.solveNQueens(0)); // Should return empty list
    }

    @Test
    void testSolveNQueensBruteForce_N2() {
        List<List<String>> expected = new ArrayList<>();
        assertEquals(expected, solver.solveNQueens(2)); // N=2 has no solutions
    }

    @Test
    void testSolveNQueensBruteForce_N3() {
        List<List<String>> expected = new ArrayList<>();
        assertEquals(expected, solver.solveNQueens(3)); // N=3 has no solutions
    }

    @Test
    void testSolveNQueensBruteForce_N5() {
        List<List<String>> solutions = solver.solveNQueens(5);
        assertEquals(10, solutions.size());
    }
}
```