```javascript
/**
 * Dynamic Programming: Unique Paths
 *
 * Problem: A robot is located at the top-left corner of an `m x n` grid.
 * The robot can only move either down or right at any point in time.
 * The robot is trying to reach the bottom-right corner of the grid.
 * How many possible unique paths are there?
 *
 * Example:
 * m = 3, n = 7 (a 3x7 grid)
 * Output: 28
 *
 * Example Grid:
 * S . . . . . .
 * . . . . . . .
 * . . . . . . F
 *
 * S = Start (0,0)
 * F = Finish (m-1, n-1)
 */

/**
 * Approach 1: Memoization (Top-Down Dynamic Programming)
 *
 * This approach uses recursion with memoization. The state `(r, c)` represents the number of unique
 * paths from cell `(r, c)` to the bottom-right corner.
 *
 * Recurrence Relation:
 * `paths(r, c) = paths(r + 1, c) + paths(r, c + 1)`
 *   (Number of paths from (r,c) is sum of paths from moving down + paths from moving right)
 *
 * Base Cases:
 * `paths(r, c) = 1` if `r == m-1` AND `c == n-1` (reached destination)
 * `paths(r, c) = 0` if `r == m` OR `c == n` (out of bounds)
 *
 * Time Complexity: O(m * n) - Each state `(r, c)` is computed only once.
 * Space Complexity: O(m * n) - For the memoization table and recursion stack.
 *
 * @param {number} m The number of rows in the grid.
 * @param {number} n The number of columns in the grid.
 * @param {number} r Current row index (starts at 0 for initial call).
 * @param {number} c Current column index (starts at 0 for initial call).
 * @param {Object} memo An object used as a cache for storing computed results.
 * @returns {number} The number of unique paths.
 */
function uniquePathsMemoization(m, n, r = 0, c = 0, memo = {}) {
    // Base cases for out of bounds
    if (r >= m || c >= n) {
        return 0;
    }
    // Base case for reaching the destination
    if (r === m - 1 && c === n - 1) {
        return 1;
    }

    // Check if result is already memoized
    const key = `${r}-${c}`;
    if (key in memo) {
        return memo[key];
    }

    // Calculate paths by moving down and moving right
    const pathsDown = uniquePathsMemoization(m, n, r + 1, c, memo);
    const pathsRight = uniquePathsMemoization(m, n, r, c + 1, memo);

    // Store the result in memo
    memo[key] = pathsDown + pathsRight;
    return memo[key];
}


/**
 * Approach 2: Tabulation (Bottom-Up Dynamic Programming)
 *
 * This approach builds a 2D DP table `dp` where `dp[r][c]` stores the number of unique
 * paths from the starting cell `(0,0)` to cell `(r,c)`.
 *
 * Alternatively, we can define `dp[r][c]` as the number of paths from `(r,c)` to `(m-1, n-1)`.
 * Let's use the latter, as it aligns better with the recurrence of `paths(r,c) = paths(r+1,c) + paths(r,c+1)`.
 * We'll fill the table starting from the destination backwards.
 *
 * Initialization:
 * `dp[m-1][n-1] = 1` (1 path from destination to itself)
 * Cells on the last row/column before destination are 1 as there's only one way to move.
 *
 * Iteration:
 * For `r` from `m-1` down to `0`:
 *   For `c` from `n-1` down to `0`:
 *     If `(r, c)` is the destination `(m-1, n-1)`, `dp[r][c] = 1`.
 *     Else: `dp[r][c] = dp[r+1][c] + dp[r][c+1]` (handle boundary conditions carefully)
 *
 * Time Complexity: O(m * n) - Two nested loops iterate through all cells of the DP table.
 * Space Complexity: O(m * n) - For the 2D DP table.
 *
 * @param {number} m The number of rows in the grid.
 * @param {number} n The number of columns in the grid.
 * @returns {number} The number of unique paths.
 */
function uniquePathsTabulation(m, n) {
    // dp[r][c] will store the number of unique paths from (r,c) to (m-1, n-1)
    const dp = Array(m).fill(0).map(() => Array(n).fill(0));

    // Fill the table from bottom-right to top-left
    for (let r = m - 1; r >= 0; r--) {
        for (let c = n - 1; c >= 0; c--) {
            // Base case: If we are at the destination, there is 1 path (itself)
            if (r === m - 1 && c === n - 1) {
                dp[r][c] = 1;
            } else {
                // Number of paths from (r,c) = paths from (r+1,c) + paths from (r,c+1)
                // If moving down (r+1) is out of bounds, it contributes 0 paths.
                const pathsDown = (r + 1 < m) ? dp[r + 1][c] : 0;
                // If moving right (c+1) is out of bounds, it contributes 0 paths.
                const pathsRight = (c + 1 < n) ? dp[r][c + 1] : 0;

                dp[r][c] = pathsDown + pathsRight;
            }
        }
    }

    // The result is the number of paths from the starting cell (0,0)
    return dp[0][0];
}

/**
 * Approach 3: Space-Optimized Tabulation
 *
 * We can optimize the space complexity from O(m * n) to O(n) or O(m).
 * When filling the DP table, to calculate `dp[r][c]`, we only need `dp[r+1][c]` (from the row below)
 * and `dp[r][c+1]` (from the current row, to the right).
 * This means we only need to keep track of the current row and the previous row (or effectively,
 * `n` columns if we iterate rows downwards, or `m` rows if we iterate columns rightwards).
 *
 * Using a 1D array `dp` of size `n` (for columns):
 * `dp[c]` will store the number of paths to the end from `(current_row, c)`.
 *
 * Time Complexity: O(m * n) - Two nested loops.
 * Space Complexity: O(n) - Uses a single 1D array.
 *
 * @param {number} m The number of rows in the grid.
 * @param {number} n The number of columns in the grid.
 * @returns {number} The number of unique paths.
 */
function uniquePathsSpaceOptimized(m, n) {
    // dp array of size `n` to represent the number of paths for each column in the current row.
    // Initialize dp with 1s, effectively assuming we are on the last row and there's 1 path to the right
    // for each cell on the last row (excluding the last cell if `n-1` is current column)
    const dp = Array(n).fill(1); // Represents paths for row `m-1`

    // Iterate from the second-to-last row up to the first row (r = m-2 down to 0)
    // For each row, we update the dp array.
    for (let r = m - 2; r >= 0; r--) {
        // For each cell in the current row, starting from the second-to-last column up to the first column (c = n-2 down to 0)
        // (The last column `dp[n-1]` will only have `pathsDown` = dp[n-1] from previous row, `pathsRight` = 0.
        // So effectively, `dp[n-1]` remains unchanged from previous row, or 1 if it's the last row.)
        for (let c = n - 2; c >= 0; c--) {
            // dp[c] (current cell in current row) = dp[c] (cell directly below it, which is the old dp[c])
            //                                      + dp[c+1] (cell to its right, in the current row calculation)
            dp[c] = dp[c] + dp[c + 1];
        }
        // After iterating through columns for a row, dp array now holds path counts for row `r`.
    }

    // The result is at dp[0], which represents the number of paths from (0,0) to (m-1,n-1)
    return dp[0];
}

module.exports = {
    uniquePathsMemoization,
    uniquePathsTabulation,
    uniquePathsSpaceOptimized,
};
```