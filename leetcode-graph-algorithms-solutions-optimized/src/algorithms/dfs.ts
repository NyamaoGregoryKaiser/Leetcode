```typescript
import { GridCoord } from '../types';
import { get4DirectionalNeighbors } from '../utils/graph-helpers';

/**
 * Depth-First Search (DFS) implementation for various graph problems.
 *
 * Problem: Number of Islands
 * Given an m x n 2D binary grid, count the number of islands.
 * An island is formed by connecting adjacent lands horizontally or vertically.
 */

/**
 * Counts the number of islands in a 2D binary grid using DFS.
 *
 * An island is a group of '1's (land) connected horizontally or vertically.
 * '0's represent water.
 *
 * Time Complexity: O(R * C) where R is the number of rows and C is the number of columns.
 *                  Every cell in the grid is visited at most once.
 * Space Complexity: O(R * C) in the worst case for the recursion stack (if the entire grid is one island)
 *                   or for the explicit stack in the iterative version.
 *
 * @param grid The m x n 2D binary grid.
 * @returns The total number of islands.
 */
export function numIslands(grid: string[][]): number {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;

    // We'll modify the grid in-place to mark visited land ('1' -> '0'),
    // effectively "sinking" the island as we explore it.
    // This avoids using a separate `visited` array and keeps space complexity slightly lower (excluding recursion stack).

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                islandCount++;
                // Start DFS from this land cell to explore and mark its entire island
                // recursiveDfs(grid, r, c, rows, cols); // Use recursive version
                iterativeDfs(grid, r, c, rows, cols); // Use iterative version
            }
        }
    }
    return islandCount;
}

/**
 * Helper function: Recursive DFS to explore an island and mark its cells as visited ('0').
 *
 * @param grid The mutable grid.
 * @param r Current row.
 * @param c Current column.
 * @param rows Total number of rows.
 * @param cols Total number of columns.
 */
function recursiveDfs(grid: string[][], r: number, c: number, rows: number, cols: number): void {
    // Base cases for recursion:
    // 1. Out of bounds
    // 2. Current cell is water ('0') or already visited/sunk
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
        return;
    }

    // Mark current cell as visited/sunk by changing '1' to '0'
    grid[r][c] = '0';

    // Explore 4-directional neighbors
    const neighbors = get4DirectionalNeighbors(r, c, rows, cols);
    for (const [nr, nc] of neighbors) {
        recursiveDfs(grid, nr, nc, rows, cols);
    }
}


/**
 * Helper function: Iterative DFS to explore an island and mark its cells as visited ('0').
 * Uses an explicit stack instead of the call stack.
 *
 * @param grid The mutable grid.
 * @param startR Starting row.
 * @param startC Starting column.
 * @param rows Total number of rows.
 * @param cols Total number of columns.
 */
function iterativeDfs(grid: string[][], startR: number, startC: number, rows: number, cols: number): void {
    const stack: GridCoord[] = [[startR, startC]];

    while (stack.length > 0) {
        const [r, c] = stack.pop()!; // Get the top element from the stack

        // Check if current cell is valid and '1' (land)
        // This check is important here because we might push already visited cells if we don't check
        // before pushing. Doing the check *after* popping is fine, as long as we eventually mark it '0'.
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            continue; // Skip if invalid or already processed
        }

        // Mark current cell as visited/sunk
        grid[r][c] = '0';

        // Add 4-directional neighbors to the stack
        const neighbors = get4DirectionalNeighbors(r, c, rows, cols);
        for (const [nr, nc] of neighbors) {
            // Only push neighbors that are land ('1') and not yet visited.
            // By marking `grid[r][c] = '0'` for the current cell, we ensure
            // we don't re-add it or its direct neighbors that are part of the same island again.
            // A more robust iterative DFS might add a `visited` set to avoid reprocessing.
            // However, for "Number of Islands", modifying the grid is a common and efficient trick.
            if (grid[nr][nc] === '1') { // Only push land cells
                stack.push([nr, nc]);
            }
        }
    }
}

/**
 * --- General DFS Traversal (Recursive) ---
 * This function demonstrates a more general DFS traversal for an adjacency list graph.
 *
 * @param graph An AdjacencyList where values are arrays of neighbor node IDs (unweighted for simplicity).
 * @param startNode The starting node for DFS.
 * @returns An array of nodes in DFS order.
 */
export function generalDfsTraversalRecursive(graph: Map<number, number[]>, startNode: number): number[] {
    const visited = new Set<number>();
    const result: number[] = [];

    const dfs = (node: number) => {
        visited.add(node);
        result.push(node);

        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    };

    dfs(startNode);
    return result;
}

/**
 * --- General DFS Traversal (Iterative) ---
 * This function demonstrates an iterative DFS traversal for an adjacency list graph using an explicit stack.
 *
 * @param graph An AdjacencyList where values are arrays of neighbor node IDs (unweighted for simplicity).
 * @param startNode The starting node for DFS.
 * @returns An array of nodes in DFS order.
 */
export function generalDfsTraversalIterative(graph: Map<number, number[]>, startNode: number): number[] {
    const visited = new Set<number>();
    const stack: number[] = [];
    const result: number[] = [];

    stack.push(startNode);
    // Push the start node, then immediately mark it as visited.
    // This is a common pattern for iterative DFS to avoid processing a node multiple times.

    while (stack.length > 0) {
        const currentNode = stack.pop()!;

        if (visited.has(currentNode)) {
            continue; // Already processed this node via a different path
        }

        visited.add(currentNode);
        result.push(currentNode);

        // Add neighbors to stack. For DFS, we want to explore "deeply" first.
        // Pushing in reverse order (if graph stores neighbors sorted) or
        // simply iterating (if order doesn't matter) is fine.
        // To mimic recursive DFS stack behavior, pushing in reverse order of desired traversal might be needed.
        // Here, we just iterate.
        const neighbors = graph.get(currentNode) || [];
        // Optional: reverse neighbors to process them in the same order as a recursive DFS
        // (if the recursive DFS iterated them in forward order and pushed to stack)
        // For general traversal order doesn't strictly matter as long as all nodes are visited.
        for (let i = neighbors.length - 1; i >= 0; i--) {
            const neighbor = neighbors[i];
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        }
    }
    return result;
}
```