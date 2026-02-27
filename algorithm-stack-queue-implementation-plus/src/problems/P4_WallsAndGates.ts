```typescript
/**
 * @fileoverview Problem: Walls and Gates (Multi-Source BFS)
 *
 * You are given an `m x n` `grid` representing a 2D map.
 * - `-1` represents a wall or an obstacle.
 * - `0` represents a gate.
 * - `INF` (represented by `2^31 - 1` or `Number.MAX_SAFE_INTEGER` in our case)
 *   represents an empty room.
 *
 * Fill each empty room with the distance to its nearest gate. If an empty room
 * cannot reach a gate, it should remain `INF`.
 * The distance between two rooms is the number of steps in a four-directional
 * movement (up, down, left, right).
 *
 * Example:
 * Input:
 * INF  -1  0  INF
 * INF INF INF  -1
 * INF  -1 INF  -1
 *   0  -1 INF INF
 *
 * Output:
 *   3  -1  0   1
 *   2   2  1  -1
 *   1  -1  2  -1
 *   0  -1  3   4
 *
 * Constraints:
 * - `m == grid.length`
 * - `n == grid[i].length`
 * - `1 <= m, n <= 250`
 * - `grid[i][j]` is `-1`, `0`, or `2^31 - 1`.
 */

import { OptimizedQueue } from '../data-structures/Queue'; // Using our optimized Queue implementation

// Represents infinity, as per problem description (2^31 - 1)
export const INF: number = 2147483647;

/**
 * Approach: Multi-Source Breadth-First Search (BFS)
 *
 * This problem is a classic application of BFS. Instead of running BFS from each empty
 * room to find the nearest gate (which would be too slow, O(M*N * M*N)), we can
 * reverse the perspective. We want to find the shortest distance *from* gates *to*
 * all reachable empty rooms.
 *
 * Since BFS naturally finds the shortest path in an unweighted graph, we can perform
 * a BFS starting simultaneously from all gates. This is known as Multi-Source BFS.
 *
 * Algorithm:
 * 1. **Initialization:**
 *    - Create an empty queue.
 *    - Iterate through the entire `grid`.
 *    - For every cell `(r, c)` that contains a `0` (a gate), add its coordinates
 *      `[r, c]` to the queue. These are our starting points.
 *    - Do not modify `INF` values yet, as they represent unvisited rooms.
 *
 * 2. **BFS Traversal:**
 *    - While the queue is not empty:
 *      a. Dequeue a cell `[r, c]`.
 *      b. Consider its four neighbors: `(r+1, c)`, `(r-1, c)`, `(r, c+1)`, `(r, c-1)`.
 *      c. For each neighbor `(nr, nc)`:
 *         i. **Boundary Check:** Ensure `(nr, nc)` is within the grid boundaries.
 *         ii. **Obstacle/Gate Check:** If `grid[nr][nc]` is a wall (`-1`) or
 *             already a gate (`0`), skip it. We don't traverse through walls,
 *             and gates already have their distance (0).
 *         iii. **Visited Check:** If `grid[nr][nc]` is *not* `INF`, it means this
 *              room has already been reached by a gate (and its distance is already
 *              set to a shorter or equal value from another path/gate). Skip it.
 *              This is crucial to ensure we only update `INF` rooms with shorter distances.
 *         iv. **Update Distance and Enqueue:** If `grid[nr][nc]` is `INF` (meaning it's
 *             an empty, unvisited room), update its value to `grid[r][c] + 1`. This
 *             represents the distance from the nearest gate. Then, enqueue `[nr, nc]`
 *             to continue the BFS from this new room.
 *
 * Time Complexity: O(M * N), where M is the number of rows and N is the number of columns.
 *    Each cell in the grid is visited and enqueued/dequeued at most once.
 *    Checking neighbors is a constant time operation for each cell.
 *
 * Space Complexity: O(M * N) in the worst case.
 *    The queue can hold up to M * N elements (e.g., if all cells are empty rooms
 *    connected to a single gate, or if all cells are gates initially).
 *
 * Note: The problem asks to modify the grid in-place, so the function returns `void`.
 */
export function wallsAndGates(grid: number[][]): void {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    const queue = new OptimizedQueue<[number, number]>(); // Use our optimized queue

    // Directions for moving (up, down, left, right)
    const directions: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    // 1. Initialize queue with all gates (multi-source BFS starting points)
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 0) {
                queue.enqueue([r, c]);
            }
        }
    }

    // 2. Perform BFS traversal
    while (!queue.isEmpty()) {
        const [r, c] = queue.dequeue()!; // `!` because we check !isEmpty()

        // Explore neighbors
        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            // Check boundary conditions
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
                continue;
            }

            // Check if it's a wall or already a gate
            if (grid[nr][nc] === -1 || grid[nr][nc] === 0) {
                continue;
            }

            // If it's an INF room AND we found a shorter path, update it.
            // Since BFS explores layer by layer, the first time we reach an INF room,
            // it's guaranteed to be the shortest path from *any* gate.
            if (grid[nr][nc] === INF) {
                grid[nr][nc] = grid[r][c] + 1; // Distance is 1 more than current cell's distance
                queue.enqueue([nr, nc]); // Add neighbor to queue to explore further
            }
            // If grid[nr][nc] is not INF and not -1/0, it means it was already visited
            // by another gate with an equal or shorter path, so we don't need to re-process.
            // This is implicitly handled by the `grid[nr][nc] === INF` check.
        }
    }
}

/*
 * Brute Force / Naive Approach (Not optimal for this problem)
 *
 * A brute force approach would be to:
 * 1. Iterate through every cell `(r, c)` in the grid.
 * 2. If `grid[r][c]` is `INF` (an empty room):
 *    a. Perform a separate BFS starting from `(r, c)` to find the *nearest gate*.
 *       During this BFS, keep track of the distance.
 *    b. If a gate is found, update `grid[r][c]` with the distance.
 *       If no gate is found (all paths lead to walls or grid boundaries), it remains `INF`.
 *
 * Time Complexity of Brute Force:
 * - In the worst case, every cell `(M*N)` is an `INF` room.
 * - For each `INF` room, a BFS is performed, which can take O(M*N) time in the worst case.
 * - Total Time: O((M*N) * (M*N)) = O((M*N)^2).
 *
 * For a grid of 250x250, (250*250)^2 = (62500)^2 = ~3.9 * 10^9 operations, which is too slow.
 * The multi-source BFS is significantly more efficient at O(M*N).
 */
```