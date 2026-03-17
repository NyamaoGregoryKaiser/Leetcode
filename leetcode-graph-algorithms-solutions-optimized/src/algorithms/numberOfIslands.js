```javascript
/**
 * numberOfIslands.js
 *
 * Problem: Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water),
 * return the number of islands. An island is surrounded by water and is formed by connecting
 * adjacent lands horizontally or vertically. You may assume all four edges of the grid are
 * all surrounded by water.
 *
 * This file provides two optimal solutions: one using Breadth-First Search (BFS)
 * and another using Depth-First Search (DFS).
 */

/**
 * --- Approach 1: Breadth-First Search (BFS) ---
 *
 * Algorithm:
 * 1. Initialize `numIslands` to 0.
 * 2. Iterate through each cell `(r, c)` in the grid.
 * 3. If `grid[r][c]` is '1' (land):
 *    a. Increment `numIslands`.
 *    b. Start a BFS from this cell:
 *       i. Mark `grid[r][c]` as '0' (visited water) to avoid re-counting.
 *       ii. Add `(r, c)` to a queue.
 *       iii. While the queue is not empty:
 *           - Dequeue a cell `(currR, currC)`.
 *           - Explore its four neighbors (up, down, left, right):
 *             - For each valid neighbor `(nR, nC)` (within grid bounds, and `grid[nR][nC]` is '1'):
 *               - Mark `grid[nR][nC]` as '0'.
 *               - Enqueue `(nR, nC)`.
 * 4. After iterating through all cells, `numIslands` will hold the total count.
 *
 * Time Complexity: O(R * C)
 *   - Each cell is visited at most a constant number of times (once by the outer loop, and
 *     once by the BFS if it's part of an island).
 *   - R is the number of rows, C is the number of columns.
 * Space Complexity: O(R * C)
 *   - In the worst case (grid full of land), the queue for BFS could hold up to R*C elements.
 *   - The visited set is implicitly handled by modifying the grid in-place. If in-place
 *     modification isn't allowed, an explicit `visited` 2D array of size R*C would be used.
 */
function numberOfIslandsBFS(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let numIslands = 0;

    // Directions for exploring neighbors: [row_offset, col_offset]
    const directions = [
        [-1, 0], // Up
        [1, 0],  // Down
        [0, -1], // Left
        [0, 1]   // Right
    ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // If we find a '1' (land) that hasn't been visited yet, it's a new island
            if (grid[r][c] === '1') {
                numIslands++;
                // Start BFS from this land cell to mark all connected land cells
                const queue = [[r, c]];
                grid[r][c] = '0'; // Mark as visited (change '1' to '0')

                while (queue.length > 0) {
                    const [currR, currC] = queue.shift(); // Dequeue

                    // Explore all 4 neighbors
                    for (const [dr, dc] of directions) {
                        const newR = currR + dr;
                        const newC = currC + dc;

                        // Check if the neighbor is within grid bounds and is land ('1')
                        if (newR >= 0 && newR < rows &&
                            newC >= 0 && newC < cols &&
                            grid[newR][newC] === '1') {
                            grid[newR][newC] = '0'; // Mark as visited
                            queue.push([newR, newC]); // Enqueue for further exploration
                        }
                    }
                }
            }
        }
    }

    return numIslands;
}


/**
 * --- Approach 2: Depth-First Search (DFS) ---
 *
 * Algorithm:
 * 1. Initialize `numIslands` to 0.
 * 2. Iterate through each cell `(r, c)` in the grid.
 * 3. If `grid[r][c]` is '1' (land):
 *    a. Increment `numIslands`.
 *    b. Start a DFS from this cell:
 *       i. Call a helper function `dfs(r, c)`:
 *          - Mark `grid[r][c]` as '0' (visited water) to avoid re-counting.
 *          - Recursively call `dfs` for all valid (in-bounds and '1') neighbors.
 * 4. After iterating through all cells, `numIslands` will hold the total count.
 *
 * Time Complexity: O(R * C)
 *   - Similar to BFS, each cell is visited at most a constant number of times.
 * Space Complexity: O(R * C)
 *   - In the worst case (grid full of land), the recursion stack for DFS could go as deep as R*C elements.
 *   - Implicit visited handling by modifying the grid.
 */
function numberOfIslandsDFS(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let numIslands = 0;

    // Helper function for DFS traversal
    const dfs = (r, c) => {
        // Base case: out of bounds or water ('0')
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }

        grid[r][c] = '0'; // Mark current cell as visited by changing '1' to '0'

        // Recursively visit all four neighbors
        dfs(r + 1, c); // Down
        dfs(r - 1, c); // Up
        dfs(r, c + 1); // Right
        dfs(r, c - 1); // Left
    };

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // If we find an unvisited '1' (land), it means we found a new island
            if (grid[r][c] === '1') {
                numIslands++;
                dfs(r, c); // Start DFS to explore and mark all connected land cells
            }
        }
    }

    return numIslands;
}

/**
 * --- Alternative DFS (Iterative) ---
 * Some interviewers prefer iterative solutions to avoid recursion stack limits,
 * or to demonstrate understanding of how recursion translates to iteration.
 * This uses an explicit stack instead of the call stack.
 */
function numberOfIslandsDFS_Iterative(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let numIslands = 0;

    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                numIslands++;
                const stack = [[r, c]];
                grid[r][c] = '0'; // Mark as visited

                while (stack.length > 0) {
                    const [currR, currC] = stack.pop(); // Pop from stack for DFS behavior

                    for (const [dr, dc] of directions) {
                        const newR = currR + dr;
                        const newC = currC + dc;

                        if (newR >= 0 && newR < rows &&
                            newC >= 0 && newC < cols &&
                            grid[newR][newC] === '1') {
                            grid[newR][newC] = '0'; // Mark as visited
                            stack.push([newR, newC]); // Push to stack
                        }
                    }
                }
            }
        }
    }

    return numIslands;
}


module.exports = {
    numberOfIslandsBFS,
    numberOfIslandsDFS,
    numberOfIslandsDFS_Iterative
};
```