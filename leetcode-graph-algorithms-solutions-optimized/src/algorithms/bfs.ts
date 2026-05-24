```typescript
import { GridCoord } from '../types';
import { get8DirectionalNeighbors } from '../utils/graph-helpers';

/**
 * Breadth-First Search (BFS) implementation for finding the shortest path in an unweighted grid.
 *
 * Problem: Shortest Path in Binary Matrix
 * Given an n x n binary matrix `grid`, return the length of the shortest clear path in the matrix.
 * A clear path is a path from (0, 0) to (n-1, n-1) such that all visited cells are 0.
 * Cells are connected 8-directionally. If no clear path, return -1.
 */

/**
 * Finds the shortest clear path in a binary matrix using BFS.
 *
 * A "clear path" means all cells in the path must be 0.
 * The path can move 8-directionally (horizontally, vertically, or diagonally).
 *
 * Time Complexity: O(R * C) where R is the number of rows and C is the number of columns in the grid.
 *                  In the worst case, every cell and every edge (up to 8 per cell) is visited once.
 * Space Complexity: O(R * C) for the queue and the `distances` (or `visited`) array.
 *                   In the worst case, all cells might be added to the queue.
 *
 * @param grid The n x n binary matrix.
 * @returns The length of the shortest clear path, or -1 if no such path exists.
 */
export function shortestPathBinaryMatrix(grid: number[][]): number {
    const n = grid.length;

    // Edge case: If the start or end cell is blocked (1), no path exists.
    if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) {
        return -1;
    }

    // Edge case: If the grid is just one cell and it's clear, path length is 1.
    if (n === 1) {
        return 1;
    }

    // Queue for BFS. Stores tuples of [row, col, distance].
    // The queue will hold coordinates that need to be visited, along with their distance from the start.
    const queue: [number, number, number][] = [];

    // `distances` matrix to store the shortest distance to each cell from (0,0).
    // Initialize all distances to Infinity.
    const distances: number[][] = Array(n).fill(0).map(() => Array(n).fill(Infinity));

    // Start BFS from (0,0). Distance to (0,0) is 1 (as per problem definition, path length).
    queue.push([0, 0, 1]);
    distances[0][0] = 1;

    let head = 0; // Manual queue pointer for performance optimization (instead of shift)

    while (head < queue.length) {
        const [r, c, dist] = queue[head++];

        // If we reached the destination, return its distance.
        // This is the shortest distance because BFS explores layer by layer.
        if (r === n - 1 && c === n - 1) {
            return dist;
        }

        // Get 8-directional neighbors
        const neighbors = get8DirectionalNeighbors(r, c, n, n);

        for (const [nr, nc] of neighbors) {
            // Check if neighbor is within bounds, is a clear path (value 0),
            // AND if we found a shorter path to it than previously known.
            // `distances[nr][nc] > dist + 1` condition ensures we only process
            // a cell if we found a shorter path to it, which also serves
            // as a visited check for BFS in distance problems.
            if (grid[nr][nc] === 0 && distances[nr][nc] === Infinity) {
                distances[nr][nc] = dist + 1;
                queue.push([nr, nc, dist + 1]);
            }
        }
    }

    // If the queue becomes empty and we haven't reached the destination,
    // it means no clear path exists.
    return -1;
}

/**
 * --- Alternative BFS approach for general graph traversal (not specifically shortest path in grid) ---
 * This function demonstrates a more general BFS pattern using an adjacency list.
 * It's not directly related to the `shortestPathBinaryMatrix` problem but illustrates basic BFS traversal.
 *
 * @param graph An AdjacencyList representing the graph.
 * @param startNode The starting node for BFS.
 * @returns An array of nodes in BFS order.
 */
export function bfsTraversal(graph: Map<number, number[]>, startNode: number): number[] {
    const visited = new Set<number>();
    const queue: number[] = [];
    const result: number[] = [];

    visited.add(startNode);
    queue.push(startNode);
    let head = 0;

    while (head < queue.length) {
        const currentNode = queue[head++];
        result.push(currentNode);

        // For each neighbor of the current node
        for (const neighbor of graph.get(currentNode) || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return result;
}
```