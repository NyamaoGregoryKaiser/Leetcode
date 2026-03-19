```java
package com.graphinterview.algorithms;

import java.util.LinkedList;
import java.util.Queue;

/**
 * Problem: Number of Islands
 * Given an m x n 2D binary grid, where '1' represents land and '0' represents water,
 * return the number of islands. An island is surrounded by water and is formed by
 * connecting adjacent lands horizontally or vertically. You may assume all four
 * edges of the grid are all surrounded by water.
 *
 * Example:
 * Input: grid = [
 *   ["1","1","1","1","0"],
 *   ["1","1","0","1","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","0","0","0"]
 * ]
 * Output: 1
 *
 * Input: grid = [
 *   ["1","1","0","0","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","1","0","0"],
 *   ["0","0","0","1","1"]
 * ]
 * Output: 3
 */
public class NumberOfIslands {

    // Directions for 4-directional movement (up, down, left, right)
    private static final int[][] DIRECTIONS = {
            {-1, 0}, // Up
            {1, 0},  // Down
            {0, -1}, // Left
            {0, 1}   // Right
    };

    /**
     * Solution 1: Depth-First Search (DFS) Approach
     *
     * Strategy:
     * Iterate through each cell of the grid. If a cell contains '1' (land), it signifies
     * the start of a new island. Increment the island count and then perform a DFS
     * from this cell to explore and mark all connected land cells as '0' (visited/water)
     * to prevent recounting them as part of another island.
     *
     * Time Complexity: O(rows * cols)
     *   - Each cell is visited at most a few times (once by the outer loop, and once by DFS if it's land).
     * Space Complexity: O(rows * cols)
     *   - In the worst case (grid full of land), the DFS recursion stack can go as deep as
     *     rows * cols, consuming O(rows * cols) space.
     *
     * @param grid The 2D character grid representing land and water.
     * @return The total number of islands.
     */
    public int numIslandsDFS(char[][] grid) {
        if (grid == null || grid.length == 0 || grid[0].length == 0) {
            return 0;
        }

        int rows = grid.length;
        int cols = grid[0].length;
        int numIslands = 0;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    numIslands++;
                    // Found a new island, explore all its connected parts and mark them visited
                    dfsExplore(grid, r, c, rows, cols);
                }
            }
        }
        return numIslands;
    }

    /**
     * Helper function for DFS to explore a connected component of land.
     * Marks visited land cells as '0' to prevent revisiting.
     *
     * @param grid The grid.
     * @param r    Current row.
     * @param c    Current column.
     * @param rows Total rows in the grid.
     * @param cols Total columns in the grid.
     */
    private void dfsExplore(char[][] grid, int r, int c, int rows, int cols) {
        // Base cases for recursion:
        // 1. Out of bounds
        // 2. Current cell is water ('0') or already visited
        if (!isValid(r, c, rows, cols) || grid[r][c] == '0') {
            return;
        }

        // Mark the current cell as visited by changing '1' to '0'
        grid[r][c] = '0';

        // Explore all 4 adjacent directions
        for (int[] dir : DIRECTIONS) {
            dfsExplore(grid, r + dir[0], c + dir[1], rows, cols);
        }
    }

    /**
     * Solution 2: Breadth-First Search (BFS) Approach
     *
     * Strategy:
     * Similar to DFS, iterate through each cell. If a '1' is found, increment island count.
     * Then, perform a BFS from this cell, adding all connected land cells to a queue and
     * marking them as '0'. Continue until the queue is empty, signifying the entire island
     * has been explored.
     *
     * Time Complexity: O(rows * cols)
     *   - Each cell is visited at most a few times (once by the outer loop, once by BFS if it's land).
     * Space Complexity: O(rows * cols)
     *   - In the worst case (grid full of land), the queue can hold up to min(rows, cols) * 2 cells
     *     at a given level, but potentially all cells in the queue if a large island is narrow.
     *     Effectively, the queue can hold up to O(rows * cols) elements.
     *
     * @param grid The 2D character grid representing land and water.
     * @return The total number of islands.
     */
    public int numIslandsBFS(char[][] grid) {
        if (grid == null || grid.length == 0 || grid[0].length == 0) {
            return 0;
        }

        int rows = grid.length;
        int cols = grid[0].length;
        int numIslands = 0;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    numIslands++;
                    // Found a new island, explore all its connected parts using BFS
                    bfsExplore(grid, r, c, rows, cols);
                }
            }
        }
        return numIslands;
    }

    /**
     * Helper function for BFS to explore a connected component of land.
     * Marks visited land cells as '0' to prevent revisiting.
     *
     * @param grid The grid.
     * @param r    Starting row.
     * @param c    Starting column.
     * @param rows Total rows.
     * @param cols Total columns.
     */
    private void bfsExplore(char[][] grid, int r, int c, int rows, int cols) {
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{r, c});
        grid[r][c] = '0'; // Mark as visited immediately

        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int currR = current[0];
            int currC = current[1];

            // Explore all 4 adjacent directions
            for (int[] dir : DIRECTIONS) {
                int nextR = currR + dir[0];
                int nextC = currC + dir[1];

                if (isValid(nextR, nextC, rows, cols) && grid[nextR][nextC] == '1') {
                    grid[nextR][nextC] = '0'; // Mark as visited
                    queue.offer(new int[]{nextR, nextC});
                }
            }
        }
    }

    /**
     * Helper function to check if a given cell (r, c) is within the grid boundaries.
     *
     * @param r    Row index.
     * @param c    Column index.
     * @param rows Total rows.
     * @param cols Total columns.
     * @return True if (r, c) is a valid cell, false otherwise.
     */
    private boolean isValid(int r, int c, int rows, int cols) {
        return r >= 0 && r < rows && c >= 0 && c < cols;
    }

    public static void main(String[] args) {
        NumberOfIslands solver = new NumberOfIslands();

        // Example 1
        char[][] grid1_dfs = {
                {'1', '1', '1', '1', '0'},
                {'1', '1', '0', '1', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '0', '0', '0'}
        };
        System.out.println("DFS Example 1: " + solver.numIslandsDFS(grid1_dfs)); // Expected: 1

        char[][] grid1_bfs = { // Need to re-initialize grid as it's modified
                {'1', '1', '1', '1', '0'},
                {'1', '1', '0', '1', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '0', '0', '0'}
        };
        System.out.println("BFS Example 1: " + solver.numIslandsBFS(grid1_bfs)); // Expected: 1

        // Example 2
        char[][] grid2_dfs = {
                {'1', '1', '0', '0', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '1', '0', '0'},
                {'0', '0', '0', '1', '1'}
        };
        System.out.println("DFS Example 2: " + solver.numIslandsDFS(grid2_dfs)); // Expected: 3

        char[][] grid2_bfs = {
                {'1', '1', '0', '0', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '1', '0', '0'},
                {'0', '0', '0', '1', '1'}
        };
        System.out.println("BFS Example 2: " + solver.numIslandsBFS(grid2_bfs)); // Expected: 3

        // Edge case: Empty grid
        char[][] emptyGrid = {};
        System.out.println("DFS Empty Grid: " + solver.numIslandsDFS(emptyGrid)); // Expected: 0
        System.out.println("BFS Empty Grid: " + solver.numIslandsBFS(emptyGrid)); // Expected: 0

        // Edge case: Grid with only water
        char[][] waterGrid = {{'0', '0'}, {'0', '0'}};
        System.out.println("DFS Water Grid: " + solver.numIslandsDFS(waterGrid)); // Expected: 0
        System.out.println("BFS Water Grid: " + solver.numIslandsBFS(waterGrid)); // Expected: 0

        // Edge case: Single cell island
        char[][] singleIslandGrid = {{'1'}};
        System.out.println("DFS Single Island Grid: " + solver.numIslandsDFS(singleIslandGrid)); // Expected: 1
        char[][] singleIslandGrid2 = {{'1'}}; // Re-init
        System.out.println("BFS Single Island Grid: " + solver.numIslandsBFS(singleIslandGrid2)); // Expected: 1
    }
}
```