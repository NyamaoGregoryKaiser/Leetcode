```java
package com.techinterview.stackqueue.problems;

import java.util.LinkedList;
import java.util.Queue;

/**
 * Problem: Walls and Gates
 * You are given an m x n grid. Each cell can have one of three values:
 * -1: a wall or an obstacle
 * 0: a gate
 * INF: (2^31 - 1, representing an empty room)
 *
 * Fill each empty room with the distance to its nearest gate. If it is impossible
 * to reach a gate, leave INF.
 *
 * Example:
 * Input:
 * INF  -1  0  INF
 * INF INF INF  -1
 * INF  -1 INF  -1
 * 0  -1 INF INF
 *
 * Output:
 * 3  -1   0   1
 * 2  2   1  -1
 * 1  -1   2  -1
 * 0  -1   3   4
 *
 * Constraints:
 * - m == rooms.length
 * - n == rooms[i].length
 * - 1 <= m, n <= 200
 * - rooms[i][j] is -1, 0, or 2^31 - 1.
 */
public class WallsAndGates {

    // Define INF as a large integer
    public static final int INF = Integer.MAX_VALUE;

    /**
     * Finds the shortest distance from each empty room to the nearest gate.
     * This problem is a classic multi-source Breadth-First Search (BFS) problem.
     *
     * Approach: Multi-source BFS
     * 1. Initialize a queue with all gate positions. These gates are distance 0.
     * 2. Perform a BFS. When exploring neighbors from a current cell (r, c):
     *    - If a neighbor (nr, nc) is an empty room (INF) and not a wall (-1) or another gate (0),
     *      it means we've found the shortest path to this room from *some* gate.
     *    - Update `rooms[nr][nc]` to `rooms[r][c] + 1`.
     *    - Add the neighbor (nr, nc) to the queue for further exploration.
     *
     * Why Multi-source BFS?
     * Traditional BFS starts from a single source. Here, we want to find the shortest
     * distance from *any* gate. By adding all gates to the queue initially and running
     * a single BFS, the algorithm naturally finds the shortest distance to all reachable
     * empty rooms. The "wave" of distance propagation starts from all gates simultaneously.
     * The first time an empty room is reached, it's guaranteed to be the shortest path.
     *
     * Time Complexity: O(M * N), where M is the number of rows and N is the number of columns.
     *   Each cell is visited and processed at most once by the BFS algorithm.
     * Space Complexity: O(M * N) in the worst case.
     *   The queue could potentially hold all empty rooms in the grid if they are all
     *   reachable from gates (e.g., a grid full of 'INF's).
     */
    public void wallsAndGates(int[][] rooms) {
        if (rooms == null || rooms.length == 0 || rooms[0].length == 0) {
            return;
        }

        int m = rooms.length;
        int n = rooms[0].length;

        // Queue for BFS, storing {row, col} pairs
        Queue<int[]> queue = new LinkedList<>();

        // Directions for moving to neighbors (up, down, left, right)
        int[] dr = {-1, 1, 0, 0};
        int[] dc = {0, 0, -1, 1};

        // 1. Initialize the queue with all gate positions (distance 0).
        // Iterate through the grid to find all gates.
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (rooms[r][c] == 0) { // Found a gate
                    queue.offer(new int[]{r, c});
                }
            }
        }

        // 2. Perform BFS from all gates simultaneously.
        // The distance is implicitly tracked by the BFS levels.
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int r = current[0];
            int c = current[1];

            // Explore neighbors
            for (int i = 0; i < 4; i++) {
                int nr = r + dr[i]; // Neighbor row
                int nc = c + dc[i]; // Neighbor column

                // Check boundary conditions and if the neighbor is an empty room (INF)
                // We only process empty rooms because:
                // - Walls (-1) are obstacles.
                // - Gates (0) are already processed as starting points and don't need updates.
                // - Rooms that already have a distance less than or equal to `rooms[r][c] + 1`
                //   have already been visited with an equal or shorter path, so we don't re-process them.
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr][nc] == INF) {
                    rooms[nr][nc] = rooms[r][c] + 1; // Update distance
                    queue.offer(new int[]{nr, nc}); // Add to queue for further exploration
                }
            }
        }
    }

    /**
     * Alternative Approach: Multiple BFS runs (less efficient)
     *
     * One could iterate through the grid, and for each gate (0), run a separate BFS
     * starting from that gate to update distances to empty rooms.
     *
     * Example Sketch:
     * public void wallsAndGatesMultipleBFS(int[][] rooms) {
     *     if (rooms == null || rooms.length == 0 || rooms[0].length == 0) {
     *         return;
     *     }
     *     int m = rooms.length;
     *     int n = rooms[0].length;
     *
     *     for (int r = 0; r < m; r++) {
     *         for (int c = 0; c < n; c++) {
     *             if (rooms[r][c] == 0) { // Found a gate
     *                 bfs(rooms, r, c); // Run BFS from this single gate
     *             }
     *         }
     *     }
     * }
     *
     * private void bfs(int[][] rooms, int startR, int startC) {
     *     Queue<int[]> queue = new LinkedList<>();
     *     queue.offer(new int[]{startR, startC});
     *     int[] dr = {-1, 1, 0, 0};
     *     int[] dc = {0, 0, -1, 1};
     *
     *     while (!queue.isEmpty()) {
     *         int[] current = queue.poll();
     *         int r = current[0];
     *         int c = current[1];
     *
     *         for (int i = 0; i < 4; i++) {
     *             int nr = r + dr[i];
     *             int nc = c + dc[i];
     *
     *             // If neighbor is valid, not a wall, AND its current distance is greater
     *             // than the path from the current gate, update and enqueue.
     *             if (nr >= 0 && nr < rooms.length && nc >= 0 && nc < rooms[0].length &&
     *                 rooms[nr][nc] != -1 && rooms[nr][nc] > rooms[r][c] + 1) {
     *                 rooms[nr][nc] = rooms[r][c] + 1;
     *                 queue.offer(new int[]{nr, nc});
     *             }
     *         }
     *     }
     * }
     *
     * Analysis of Alternative:
     * - Time Complexity: O(K * M * N) in the worst case, where K is the number of gates.
     *   If K is large, this is significantly slower than the multi-source BFS.
     *   Each individual BFS explores the grid, potentially many times.
     * - Space Complexity: O(M * N) for the queue.
     *
     * The multi-source BFS is significantly more efficient because each cell update (rooms[nr][nc] = ...)
     * happens only once with its final shortest distance, preventing redundant computations.
     */
}
```