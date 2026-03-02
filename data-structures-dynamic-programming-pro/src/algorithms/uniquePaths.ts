/**
 * src/algorithms/uniquePaths.ts
 *
 * Problem: Unique Paths
 * A robot is located at the top-left corner of an m x n grid (cell (0,0)).
 * The robot can only move either down or right at any point in time.
 * The robot is trying to reach the bottom-right corner of the grid (cell (m-1, n-1)).
 * How many possible unique paths are there?
 */

import { createMemoCache, getMemoKey } from '../utils/memoizationCache';
import { MemoCache } from '../types';

// --- Approach 1: Recursive (Brute Force) ---
/**
 * Calculates the number of unique paths using a naive recursive approach.
 * This method explores all possible paths, recalculating subproblems.
 *
 * Time Complexity: O(2^(M+N)) - In the worst case, as it recomputes many overlapping subproblems.
 * Space Complexity: O(M+N) - Due to the recursion stack depth.
 *
 * @param m The number of rows in the grid.
 * @param n The number of columns in the grid.
 * @returns The number of unique paths.
 */
export function uniquePaths_bruteForce(m: number, n: number): number {
    if (m <= 0 || n <= 0) {
        throw new Error("Grid dimensions must be positive integers.");
    }
    // Base cases: If robot is at the target or beyond, or if it's on an edge
    if (m === 1 || n === 1) {
        return 1; // Only one path (all rights or all downs)
    }
    // Recursive step: sum of paths from moving down and moving right
    return uniquePaths_bruteForce(m - 1, n) + uniquePaths_bruteForce(m, n - 1);
}

// --- Approach 2: Recursive with Memoization (Top-Down Dynamic Programming) ---
/**
 * Calculates the number of unique paths using recursion with memoization.
 * Stores the results of subproblems to avoid recomputing them.
 *
 * Time Complexity: O(M * N) - Each cell (i, j) is visited and computed once.
 * Space Complexity: O(M * N) - For the memoization cache and the recursion stack depth.
 *
 * @param m The number of rows in the grid.
 * @param n The number of columns in the grid.
 * @param memo Optional: A cache to store computed path counts.
 * @returns The number of unique paths.
 */
export function uniquePaths_memoized(m: number, n: number, memo?: MemoCache<number>): number {
    if (m <= 0 || n <= 0) {
        throw new Error("Grid dimensions must be positive integers.");
    }

    if (!memo) {
        memo = createMemoCache<number>();
    }

    const key = getMemoKey(m, n);
    if (memo.has(key)) {
        return memo.get(key)!;
    }

    // Base cases
    if (m === 1 || n === 1) {
        memo.set(key, 1);
        return 1;
    }

    // Recursive step with memoization
    const paths = uniquePaths_memoized(m - 1, n, memo) + uniquePaths_memoized(m, n - 1, memo);
    memo.set(key, paths);
    return paths;
}

// --- Approach 3: Iterative with Tabulation (Bottom-Up Dynamic Programming) ---
/**
 * Calculates the number of unique paths using an iterative, bottom-up approach with tabulation.
 * It builds a 2D DP table where dp[i][j] represents the number of unique paths to reach cell (i, j).
 *
 * Time Complexity: O(M * N) - Two nested loops iterate M*N times.
 * Space Complexity: O(M * N) - For the 2D DP table.
 *
 * @param m The number of rows in the grid.
 * @param n The number of columns in the grid.
 * @returns The number of unique paths.
 */
export function uniquePaths_tabulated(m: number, n: number): number {
    if (m <= 0 || n <= 0) {
        throw new Error("Grid dimensions must be positive integers.");
    }

    // Create a 2D DP table initialized with zeros
    // dp[i][j] will store the number of unique paths to reach cell (i, j)
    const dp: number[][] = Array(m).fill(0).map(() => Array(n).fill(0));

    // Base cases:
    // Cells in the first row can only be reached by moving right, so 1 path each.
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1;
    }
    // Cells in the first column can only be reached by moving down, so 1 path each.
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1;
    }

    // Fill the DP table
    // For any cell (i, j), the number of paths is the sum of paths from (i-1, j) (move down)
    // and paths from (i, j-1) (move right).
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    // The result is stored at the bottom-right corner of the DP table
    return dp[m - 1][n - 1];
}

// --- Approach 4: Iterative with Space Optimization (O(N) space) ---
/**
 * Calculates the number of unique paths using an iterative approach with space optimization.
 * It observes that to calculate the current row, we only need the values from the previous row.
 * This reduces the space complexity from O(M*N) to O(N).
 *
 * Time Complexity: O(M * N) - Two nested loops iterate M*N times.
 * Space Complexity: O(N) - Only a single 1D array of size N is used.
 *
 * @param m The number of rows in the grid.
 * @param n The number of columns in the grid.
 * @returns The number of unique paths.
 */
export function uniquePaths_spaceOptimized(m: number, n: number): number {
    if (m <= 0 || n <= 0) {
        throw new Error("Grid dimensions must be positive integers.");
    }

    // Create a 1D DP array representing the current row or a column.
    // dp[j] will store the number of unique paths to reach cell (current_row, j).
    // Initialize with 1s, as the first row (or column if thinking vertically) has 1 path for each cell.
    const dp: number[] = Array(n).fill(1);

    // Iterate through rows starting from the second row (index 1)
    for (let i = 1; i < m; i++) {
        // For each cell in the current row, calculate paths.
        // The first cell (dp[0]) in each row can only be reached from above, so it remains 1.
        // For subsequent cells, dp[j] = dp[j] (paths from above, i.e., dp[i-1][j]) + dp[j-1] (paths from left, i.e., dp[i][j-1])
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j - 1];
        }
    }

    // The result is the last element in the DP array after processing all rows.
    // This element corresponds to dp[m-1][n-1] in the 2D table.
    return dp[n - 1];
}