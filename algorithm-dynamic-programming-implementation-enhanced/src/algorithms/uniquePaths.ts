```typescript
/**
 * @fileoverview Implementations for calculating the number of unique paths
 * in an m x n grid, moving only down or right.
 */

/**
 * 1. Recursive (Brute Force)
 * Calculates the number of unique paths from (0,0) to (m-1, n-1) using
 * a naive recursive approach. This method explores all possible paths,
 * leading to redundant calculations for overlapping subproblems.
 *
 * Time Complexity: O(2^(m+n)) - Exponential, due to recomputing subproblems.
 * Space Complexity: O(m+n) - Due to recursion stack depth.
 *
 * @param m The number of rows in the grid.
 * @param n The number of columns in the grid.
 * @returns The total number of unique paths.
 */
export function uniquePaths_recursive(m: number, n: number): number {
    // Helper function to handle current row and column
    function countPaths(currentRow: number, currentCol: number): number {
        // Base cases:
        // If we go out of bounds, this is not a valid path.
        if (currentRow >= m || currentCol >= n) {
            return 0;
        }
        // If we reach the destination, we found one valid path.
        if (currentRow === m - 1 && currentCol === n - 1) {
            return 1;
        }

        // Recursive step: sum paths moving down and paths moving right.
        return countPaths(currentRow + 1, currentCol) + countPaths(currentRow, currentCol + 1);
    }

    // Start from the top-left corner (0,0)
    return countPaths(0, 0);
}

/**
 * 2. Memoization (Top-Down Dynamic Programming)
 * Calculates the number of unique paths using memoization to store
 * results of subproblems. This avoids redundant calculations.
 *
 * Time Complexity: O(m*n) - Each cell (i,j) is computed once.
 * Space Complexity: O(m*n) - For the memoization table (cache) and recursion stack.
 *
 * @param m The number of rows in the grid.
 * @param n The number of columns in the grid.
 * @returns The total number of unique paths.
 */
export function uniquePaths_memoized(m: number, n: number): number {
    // Initialize a 2D array (memoization table) with -1 to indicate uncomputed states.
    const memo: number[][] = Array(m)
        .fill(0)
        .map(() => Array(n).fill(-1));

    function countPaths(currentRow: number, currentCol: number): number {
        // Base cases:
        if (currentRow >= m || currentCol >= n) {
            return 0; // Out of bounds
        }
        if (currentRow === m - 1 && currentCol === n - 1) {
            return 1; // Reached destination
        }

        // Check if the result is already computed
        if (memo[currentRow][currentCol] !== -1) {
            return memo[currentRow][currentCol];
        }

        // Compute and store the result
        const paths =
            countPaths(currentRow + 1, currentCol) + countPaths(currentRow, currentCol + 1);
        memo[currentRow][currentCol] = paths;
        return paths;
    }

    // Start from the top-left corner (0,0)
    return countPaths(0, 0);
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 * Calculates the number of unique paths iteratively using a 2D DP table.
 * It builds the solution from base cases (destination) up to the starting point.
 * Each cell `dp[i][j]` represents the number of unique paths from `(i,j)` to `(m-1, n-1)`.
 * Or, more commonly, `dp[i][j]` represents the number of unique paths from `(0,0)` to `(i,j)`.
 * We'll use the latter approach which is often more intuitive for tabulation.
 *
 * `dp[i][j] = dp[i-1][j] + dp[i][j-1]`
 *
 * Time Complexity: O(m*n) - Iterates through each cell of the m x n grid once.
 * Space Complexity: O(m*n) - For the DP table of size m x n.
 *
 * @param m The number of rows in the grid.
 * @param n The number of columns in the grid.
 * @returns The total number of unique paths.
 */
export function uniquePaths_tabulated(m: number, n: number): number {
    // Create a DP table. dp[i][j] will store the number of paths from (0,0) to (i,j).
    const dp: number[][] = Array(m)
        .fill(0)
        .map(() => Array(n).fill(0));

    // Base cases:
    // A robot at (0,0) can reach itself in 1 way.
    // All cells in the first row can only be reached by moving right from (0,0), so 1 path each.
    // All cells in the first column can only be reached by moving down from (0,0), so 1 path each.
    for (let r = 0; r < m; r++) {
        dp[r][0] = 1;
    }
    for (let c = 0; c < n; c++) {
        dp[0][c] = 1;
    }

    // Fill the DP table
    // For each cell (r, c), the number of paths to it is the sum of paths
    // from the cell above (r-1, c) and the cell to its left (r, c-1).
    for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {
            dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
        }
    }

    // The result is stored at the bottom-right corner of the DP table.
    return dp[m - 1][n - 1];
}

/**
 * 4. Space-Optimized Tabulation
 * Calculates the number of unique paths iteratively with reduced space complexity.
 * Since `dp[r][c]` only depends on `dp[r-1][c]` (current row's previous state)
 * and `dp[r][c-1]` (previous row's current state), we can optimize space
 * by only keeping track of the current row and the previous row.
 * We can further optimize to just one row if we iterate carefully.
 *
 * Time Complexity: O(m*n) - Still iterates through each cell.
 * Space Complexity: O(min(m, n)) - If we choose to optimize based on the smaller dimension,
 *                                  or O(n) if we always iterate through rows and keep one column.
 *                                  Here, we optimize to O(n) (number of columns).
 *
 * @param m The number of rows in the grid.
 * @param n The number of columns in the grid.
 * @returns The total number of unique paths.
 */
export function uniquePaths_spaceOptimized(m: number, n: number): number {
    // To optimize space, we can maintain an array for a single row (or column)
    // and update it based on the previous values.
    // Let's use an array representing one row, effectively 'dp[c]' will be the
    // number of ways to reach (currentRow, c).
    // `dp[c]` = `dp[c]` (from previous row) + `dp[c-1]` (from current row, left cell)

    // dp array represents the current row's path counts.
    // Initialize with 1s, as all cells in the first row/column have 1 path to reach them.
    // If we consider `dp[c]` as paths to (current_row, c)
    // The first row (row 0) will all be 1s.
    const dp: number[] = new Array(n).fill(1);

    // Iterate for each row starting from the second row (index 1)
    for (let r = 1; r < m; r++) {
        // For each column in the current row
        // The first column (c=0) will always have 1 path, as it can only come from above.
        // So, dp[0] remains 1.
        for (let c = 1; c < n; c++) {
            // dp[c] (new value) = dp[c] (value from previous row, same column) + dp[c-1] (value from current row, previous column)
            dp[c] = dp[c] + dp[c - 1];
        }
    }

    // The result is in the last cell of the dp array.
    return dp[n - 1];
}
```