```java
package com.graphinterview.tests;

import com.graphinterview.algorithms.ShortestPathBinaryMatrix;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test class for ShortestPathBinaryMatrix algorithm.
 */
public class ShortestPathBinaryMatrixTest {

    private ShortestPathBinaryMatrix solver;

    @BeforeEach
    void setUp() {
        solver = new ShortestPathBinaryMatrix();
    }

    // Helper to deep copy a 2D int array, as the algorithm modifies the grid
    private int[][] deepCopy(int[][] original) {
        if (original == null) {
            return null;
        }
        int[][] copy = new int[original.length][];
        for (int i = 0; i < original.length; i++) {
            copy[i] = original[i] != null ? original[i].clone() : null;
        }
        return copy;
    }

    @Test
    @DisplayName("Example 1: Basic 2x2 grid path")
    void testShortestPath_Example1() {
        int[][] grid = {{0, 1}, {1, 0}};
        assertEquals(2, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }

    @Test
    @DisplayName("Example 2: 3x3 grid with obstacles")
    void testShortestPath_Example2() {
        int[][] grid = {{0, 0, 0}, {1, 1, 0}, {1, 1, 0}};
        assertEquals(4, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }

    @Test
    @DisplayName("Example 3: No clear path (start blocked)")
    void testShortestPath_NoPathStartBlocked() {
        int[][] grid = {{1, 0, 0}, {1, 1, 0}, {1, 1, 0}};
        assertEquals(-1, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }

    @Test
    @DisplayName("Example 4: No clear path (end blocked)")
    void testShortestPath_NoPathEndBlocked() {
        int[][] grid = {{0, 0, 0}, {0, 0, 0}, {0, 0, 1}};
        assertEquals(-1, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }

    @Test
    @DisplayName("Example 5: No clear path (surrounded)")
    void testShortestPath_NoPathSurrounded() {
        int[][] grid = {{0, 0, 0}, {0, 1, 0}, {0, 0, 0}};
        // Path: (0,0)->(0,1)->(0,2)->(1,2)->(2,2) length=5
        // (0,0)->(1,0)->(2,0)->(2,1)->(2,2) length=5
        // This is a valid path.
        assertEquals(5, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }

    @Test
    @DisplayName("Example 6: Single cell grid (0,0) to (0,0)")
    void testShortestPath_SingleCellGrid() {
        int[][] grid = {{0}};
        assertEquals(1, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }

    @Test
    @DisplayName("Example 7: Single cell grid, blocked (0,0) to (0,0)")
    void testShortestPath_SingleCellGridBlocked() {
        int[][] grid = {{1}};
        assertEquals(-1, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }

    @Test
    @DisplayName("Edge Case: Empty grid")
    void testShortestPath_EmptyGrid() {
        int[][] grid = {};
        assertEquals(-1, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }

    @Test
    @DisplayName("Edge Case: Null grid")
    void testShortestPath_NullGrid() {
        int[][] grid = null;
        assertEquals(-1, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }

    @Test
    @DisplayName("Edge Case: Grid with empty rows")
    void testShortestPath_EmptyRowsGrid() {
        int[][] grid = {{}};
        assertEquals(-1, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }

    @Test
    @DisplayName("Larger grid with direct diagonal path")
    void testShortestPath_LargeDirectDiagonal() {
        int[][] grid = {
                {0, 0, 0, 0},
                {0, 0, 0, 0},
                {0, 0, 0, 0},
                {0, 0, 0, 0}
        };
        // Path (0,0)->(1,1)->(2,2)->(3,3) length=4
        assertEquals(4, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }

    @Test
    @DisplayName("Larger grid with winding path")
    void testShortestPath_WindingPath() {
        int[][] grid = {
                {0, 0, 0, 1, 0},
                {0, 1, 0, 1, 0},
                {0, 1, 0, 1, 0},
                {0, 1, 0, 1, 0},
                {0, 0, 0, 0, 0}
        };
        // Path: (0,0)->(1,0)->(2,0)->(3,0)->(4,0)->(4,1)->(4,2)->(3,2)->(2,2)->(1,2)->(0,2)->(0,3-blocked) X
        // Path: (0,0)->(1,0)->(2,0)->(3,0)->(4,0)->(4,1)->(4,2)->(4,3)->(4,4) = 9
        assertEquals(9, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }

    @Test
    @DisplayName("Grid with large obstacle in middle")
    void testShortestPath_LargeObstacle() {
        int[][] grid = {
                {0, 0, 0, 0, 0},
                {0, 1, 1, 1, 0},
                {0, 1, 1, 1, 0},
                {0, 1, 1, 1, 0},
                {0, 0, 0, 0, 0}
        };
        // Path along top or bottom/left or right edges
        // (0,0)->(0,1)->(0,2)->(0,3)->(0,4)->(1,4)->(2,4)->(3,4)->(4,4) length=9
        assertEquals(9, solver.shortestPathBinaryMatrix(deepCopy(grid)));
    }
}
```