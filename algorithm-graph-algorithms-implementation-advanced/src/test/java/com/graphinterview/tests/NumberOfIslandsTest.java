```java
package com.graphinterview.tests;

import com.graphinterview.algorithms.NumberOfIslands;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test class for NumberOfIslands algorithm.
 */
public class NumberOfIslandsTest {

    private NumberOfIslands solver;

    @BeforeEach
    void setUp() {
        solver = new NumberOfIslands();
    }

    // --- Test cases for DFS approach ---

    @Test
    @DisplayName("DFS: Example 1 - Single large island")
    void testNumIslandsDFS_Example1() {
        char[][] grid = {
                {'1', '1', '1', '1', '0'},
                {'1', '1', '0', '1', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '0', '0', '0'}
        };
        assertEquals(1, solver.numIslandsDFS(grid));
    }

    @Test
    @DisplayName("DFS: Example 2 - Multiple islands")
    void testNumIslandsDFS_Example2() {
        char[][] grid = {
                {'1', '1', '0', '0', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '1', '0', '0'},
                {'0', '0', '0', '1', '1'}
        };
        assertEquals(3, solver.numIslandsDFS(grid));
    }

    @Test
    @DisplayName("DFS: Edge Case - Empty grid")
    void testNumIslandsDFS_EmptyGrid() {
        char[][] grid = {};
        assertEquals(0, solver.numIslandsDFS(grid));
    }

    @Test
    @DisplayName("DFS: Edge Case - Null grid")
    void testNumIslandsDFS_NullGrid() {
        char[][] grid = null;
        assertEquals(0, solver.numIslandsDFS(grid));
    }

    @Test
    @DisplayName("DFS: Edge Case - Grid with empty rows")
    void testNumIslandsDFS_EmptyRowsGrid() {
        char[][] grid = {{}};
        assertEquals(0, solver.numIslandsDFS(grid));
    }


    @Test
    @DisplayName("DFS: Edge Case - Grid with only water")
    void testNumIslandsDFS_OnlyWater() {
        char[][] grid = {
                {'0', '0', '0'},
                {'0', '0', '0'},
                {'0', '0', '0'}
        };
        assertEquals(0, solver.numIslandsDFS(grid));
    }

    @Test
    @DisplayName("DFS: Edge Case - Grid with single island")
    void testNumIslandsDFS_SingleIsland() {
        char[][] grid = {{'1'}};
        assertEquals(1, solver.numIslandsDFS(grid));
    }

    @Test
    @DisplayName("DFS: Edge Case - Grid with disconnected single cells")
    void testNumIslandsDFS_DisconnectedCells() {
        char[][] grid = {
                {'1', '0', '1'},
                {'0', '0', '0'},
                {'1', '0', '1'}
        };
        assertEquals(4, solver.numIslandsDFS(grid));
    }

    @Test
    @DisplayName("DFS: Large grid, diagonal land does not count (4-directional)")
    void testNumIslandsDFS_DiagonalLand() {
        char[][] grid = {
                {'1', '0', '1'},
                {'0', '1', '0'},
                {'1', '0', '1'}
        };
        // Expect 5 islands as (1,1) is isolated from (0,0), (0,2), (2,0), (2,2) in 4-dir
        assertEquals(5, solver.numIslandsDFS(grid));
    }

    @Test
    @DisplayName("DFS: Complex island shape")
    void testNumIslandsDFS_ComplexShape() {
        char[][] grid = {
                {'1', '1', '0', '1', '1'},
                {'1', '0', '0', '0', '1'},
                {'1', '1', '0', '1', '1'}
        };
        assertEquals(1, solver.numIslandsDFS(grid)); // All connected forming one large island
    }

    // --- Test cases for BFS approach ---
    // Note: Since both DFS and BFS are valid traversal methods,
    // their correctness for counting islands should yield the same results.
    // We can reuse the same grid setups, but need to make a deep copy
    // if the grid is modified by the algorithm (which it is in this case).

    private char[][] deepCopy(char[][] original) {
        if (original == null) {
            return null;
        }
        char[][] copy = new char[original.length][];
        for (int i = 0; i < original.length; i++) {
            copy[i] = original[i] != null ? original[i].clone() : null;
        }
        return copy;
    }

    @Test
    @DisplayName("BFS: Example 1 - Single large island")
    void testNumIslandsBFS_Example1() {
        char[][] originalGrid = {
                {'1', '1', '1', '1', '0'},
                {'1', '1', '0', '1', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '0', '0', '0'}
        };
        assertEquals(1, solver.numIslandsBFS(deepCopy(originalGrid)));
    }

    @Test
    @DisplayName("BFS: Example 2 - Multiple islands")
    void testNumIslandsBFS_Example2() {
        char[][] originalGrid = {
                {'1', '1', '0', '0', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '1', '0', '0'},
                {'0', '0', '0', '1', '1'}
        };
        assertEquals(3, solver.numIslandsBFS(deepCopy(originalGrid)));
    }

    @Test
    @DisplayName("BFS: Edge Case - Empty grid")
    void testNumIslandsBFS_EmptyGrid() {
        char[][] originalGrid = {};
        assertEquals(0, solver.numIslandsBFS(deepCopy(originalGrid)));
    }

    @Test
    @DisplayName("BFS: Edge Case - Null grid")
    void testNumIslandsBFS_NullGrid() {
        char[][] originalGrid = null;
        assertEquals(0, solver.numIslandsBFS(deepCopy(originalGrid)));
    }

    @Test
    @DisplayName("BFS: Edge Case - Grid with empty rows")
    void testNumIslandsBFS_EmptyRowsGrid() {
        char[][] originalGrid = {{}};
        assertEquals(0, solver.numIslandsBFS(deepCopy(originalGrid)));
    }

    @Test
    @DisplayName("BFS: Edge Case - Grid with only water")
    void testNumIslandsBFS_OnlyWater() {
        char[][] originalGrid = {
                {'0', '0', '0'},
                {'0', '0', '0'},
                {'0', '0', '0'}
        };
        assertEquals(0, solver.numIslandsBFS(deepCopy(originalGrid)));
    }

    @Test
    @DisplayName("BFS: Edge Case - Grid with single island")
    void testNumIslandsBFS_SingleIsland() {
        char[][] originalGrid = {{'1'}};
        assertEquals(1, solver.numIslandsBFS(deepCopy(originalGrid)));
    }

    @Test
    @DisplayName("BFS: Edge Case - Grid with disconnected single cells")
    void testNumIslandsBFS_DisconnectedCells() {
        char[][] originalGrid = {
                {'1', '0', '1'},
                {'0', '0', '0'},
                {'1', '0', '1'}
        };
        assertEquals(4, solver.numIslandsBFS(deepCopy(originalGrid)));
    }

    @Test
    @DisplayName("BFS: Large grid, diagonal land does not count (4-directional)")
    void testNumIslandsBFS_DiagonalLand() {
        char[][] originalGrid = {
                {'1', '0', '1'},
                {'0', '1', '0'},
                {'1', '0', '1'}
        };
        assertEquals(5, solver.numIslandsBFS(deepCopy(originalGrid)));
    }

    @Test
    @DisplayName("BFS: Complex island shape")
    void testNumIslandsBFS_ComplexShape() {
        char[][] originalGrid = {
                {'1', '1', '0', '1', '1'},
                {'1', '0', '0', '0', '1'},
                {'1', '1', '0', '1', '1'}
        };
        assertEquals(1, solver.numIslandsBFS(deepCopy(originalGrid)));
    }

}
```