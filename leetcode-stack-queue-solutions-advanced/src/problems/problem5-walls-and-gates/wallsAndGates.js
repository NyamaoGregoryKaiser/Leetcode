/**
 * @file Implements the solution for the Walls and Gates problem using Multi-Source BFS.
 * @module problems/wallsAndGates
 */

const Queue = require('../../data-structures/Queue');

/**
 * Represents an empty room, distance to gate is initially unknown (infinity).
 * Value: 2^31 - 1, which is `2147483647`.
 */
const INF = 2147483647;
/**
 * Represents a wall or an obstacle.
 * Value: -1.
 */
const WALL = -1;
/**
 * Represents a gate.
 * Value: 0.
 */
const GATE = 0;

/**
 * Fills each empty room in an `m x n` grid with the distance to its nearest gate.
 * If an empty room cannot reach a gate, it should remain `INF`.
 *
 * This problem is solved using a **Multi-Source Breadth-First Search (BFS)**.
 * Instead of running BFS from each empty room to find the nearest gate (which would be
 * inefficient, O(M*N * M*N)), we start BFS from all gates simultaneously.
 *
 * Algorithm Steps:
 * 1. Initialize a queue and add the coordinates of all gates (rooms with value `0`) to it.
 *    These gates are the starting points for our BFS.
 * 2. Define possible directions for movement (up, down, left, right).
 * 3. While the queue is not empty:
 *    a. Dequeue a cell's coordinates `[row, col]`.
 *    b. For each of its four neighbors:
 *       i. Calculate neighbor's coordinates `[nRow, nCol]`.
 *       ii. Check if the neighbor is within grid bounds.
 *       iii. Check if the neighbor is an empty room (`INF`) that has not yet been visited/updated.
 *            We know it's unvisited if its current value is still `INF`.
 *       iv. If all conditions are met, update the neighbor's distance: `grid[nRow][nCol] = grid[row][col] + 1`.
 *           This means the neighbor is one step further from a gate than the current cell.
 *       v. Enqueue the neighbor's coordinates `[nRow, nCol]` to continue the BFS.
 *
 * @param {number[][]} rooms The `m x n` grid representing rooms.
 *                           - `INF` (2147483647) represents an empty room.
 *                           - `0` represents a gate.
 *                           - `-1` represents a wall or an obstacle.
 * @returns {void} The input `rooms` grid is modified in-place.
 *
 * @example
 * const rooms1 = [
 *   [INF, -1, 0, INF],
 *   [INF, INF, INF, -1],
 *   [INF, -1, INF, -1],
 *   [0, -1, INF, INF]
 * ];
 * wallsAndGates(rooms1);
 * // rooms1 will be:
 * // [
 * //   [3, -1, 0, 1],
 * //   [2, 2, 1, -1],
 * //   [1, -1, 2, -1],
 * //   [0, -1, 3, 4]
 * // ]
 *
 * const rooms2 = [
 *   [INF, -1, 0],
 *   [INF, INF, INF],
 *   [INF, -1, INF]
 * ];
 * wallsAndGates(rooms2);
 * // rooms2 will be:
 * // [
 * //   [1, -1, 0],
 * //   [2, 1, 1],
 * //   [3, -1, 2]
 * // ]
 *
 * const rooms3 = [[-1]];
 * wallsAndGates(rooms3); // rooms3 remains [[-1]]
 *
 * const rooms4 = [[0]];
 * wallsAndGates(rooms4); // rooms4 remains [[0]]
 */
function wallsAndGates(rooms) {
    if (!rooms || rooms.length === 0 || rooms[0].length === 0) {
        return;
    }

    const m = rooms.length;
    const n = rooms[0].length;
    const queue = new Queue();

    // Directions for moving (row_offset, col_offset)
    const directions = [
        [-1, 0], // Up
        [1, 0],  // Down
        [0, -1], // Left
        [0, 1]   // Right
    ];

    // 1. Initialize BFS by adding all gates to the queue.
    // Gates are the "source" nodes with distance 0.
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (rooms[r][c] === GATE) {
                queue.enqueue([r, c]);
            }
        }
    }

    // 2. Perform BFS.
    // The `rooms` grid itself acts as the `visited` array and stores distances.
    // When a room's value is updated from INF to a number, it's considered visited.
    while (!queue.isEmpty()) {
        const [row, col] = queue.dequeue();

        // Explore all four neighbors
        for (const [dr, dc] of directions) {
            const nRow = row + dr;
            const nCol = col + dc;

            // Check boundary conditions and if it's an unvisited empty room
            // Only update and enqueue if it's a valid empty room (INF)
            if (
                nRow >= 0 && nRow < m &&
                nCol >= 0 && nCol < n &&
                rooms[nRow][nCol] === INF // Ensure it's an empty room AND unvisited
            ) {
                // The distance to this neighbor is one more than the current cell's distance
                rooms[nRow][nCol] = rooms[row][col] + 1;
                queue.enqueue([nRow, nCol]);
            }
        }
    }
}

/**
 * Time Complexity Analysis:
 * O(M * N), where M is the number of rows and N is the number of columns in the grid.
 * Each cell in the grid is visited and enqueued/dequeued at most once. For each cell,
 * we perform constant-time operations (checking neighbors).
 *
 * Space Complexity Analysis:
 * O(M * N) in the worst case.
 * This is the space required for the queue. In the worst case (e.g., a grid full of empty
 * rooms with gates around the perimeter), the queue might hold up to all M*N cells.
 */

// Export constants for easier use in tests or other modules
wallsAndGates.INF = INF;
wallsAndGates.WALL = WALL;
wallsAndGates.GATE = GATE;

module.exports = wallsAndGates;