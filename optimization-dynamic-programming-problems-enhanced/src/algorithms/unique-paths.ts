/**
 * src/algorithms/unique-paths.ts
 *
 * This file implements various approaches to solve the "Unique Paths" problem.
 * A robot is located at the top-left corner of an `m x n` grid. The robot can
 * only move either down or right at any point in time. The goal is to find
 * the number of unique paths to reach the bottom-right corner.
 * This problem is a classic example of 2D DP for grid traversal.
 */

/**
 * Approach 1: Recursive (Brute Force)
 *
 * Calculates the number of unique paths using plain recursion.
 * Explores all possible paths, leading to redundant computations for overlapping subproblems.
 *
 * Time Complexity: O(2^(m+n)) in the worst case (exponential).
 *   - Each move generates two new recursive calls.
 * Space Complexity: O(m+n)
 *   - Due to the recursion stack depth.
 *
 * @param m Number of rows in the grid.
 * @param n Number of columns in the grid.
 * @param r Current row index (initially 0).
 * @param c Current column index (initially 0).
 * @returns The number of unique paths.
 */
export function uniquePathsRecursive(m: number, n: number, r: number = 0, c: number = 0): number {
    // Base cases:
    // If reached the destination
    if (r === m - 1 && c === n - 1) {
        return 1;
    }
    // If moved out of bounds
    if (r >= m || c >= n) {
        return 0;
    }

    // Recursive step: sum paths from moving right and moving down
    return uniquePathsRecursive(m, n, r + 1, c) + uniquePathsRecursive(m, n, r, c + 1);
}


/**
 * Approach 2: Memoization (Top-Down Dynamic Programming)
 *
 * Calculates the number of unique paths using recursion with memoization.
 * Stores results of subproblems in a 2D array (DP table) to avoid recomputing.
 *
 * Time Complexity: O(m*n)
 *   - Each state (r, c) is computed only once.
 * Space Complexity: O(m*n)
 *   - For the memoization table and recursion stack.
 *
 * @param m Number of rows in the grid.
 * @param n Number of columns in the grid.
 * @param r Current row index (initially 0).
 * @param c Current column index (initially 0).
 * @param memo Optional: A 2D array (matrix) used for memoization.
 * @returns The number of unique paths.
 */
export function uniquePathsMemoization(m: number, n: number, r: number = 0, c: number = 0, memo?: number[][]): number {
    // Initialize memo table if not provided (first call)
    if (memo === undefined) {
        // memo[r][c] will store unique paths from (r, c) to (m-1, n-1)
        // Initialize with -1 to indicate uncomputed states
        memo = Array(m).fill(0).map(() => Array(n).fill(-1));
    }

    // Base cases:
    // If reached the destination
    if (r === m - 1 && c === n - 1) {
        return 1;
    }
    // If moved out of bounds
    if (r >= m || c >= n) {
        return 0;
    }

    // Check if the result for this state (r, c) is already computed
    if (memo[r][c] !== -1) {
        return memo[r][c];
    }

    // Compute and store the result
    // Sum paths from moving right and moving down
    memo[r][c] = uniquePathsMemoization(m, n, r + 1, c, memo) + uniquePathsMemoization(m, n, r, c + 1, memo);

    return memo[r][c];
}

/**
 * Approach 3: Tabulation (Bottom-Up Dynamic Programming)
 *
 * Calculates the number of unique paths iteratively using a 2D DP table.
 * Builds up the solution from the destination (or from starting point, depending on perspective).
 * Here, we build from top-left (start) to bottom-right (end).
 *
 * Time Complexity: O(m*n)
 *   - Two nested loops iterate m*n times.
 * Space Complexity: O(m*n)
 *   - For the DP table.
 *
 * @param m Number of rows in the grid.
 * @param n Number of columns in the grid.
 * @returns The number of unique paths.
 */
export function uniquePathsTabulation(m: number, n: number): number {
    // Create a DP table. dp[i][j] will store the number of unique paths
    // from (0,0) to (i,j).
    const dp: number[][] = Array(m).fill(0).map(() => Array(n).fill(0));

    // Initialize base cases:
    // All cells in the first row and first column have only 1 way to reach them.
    // Robot can only move right to fill first row, or down to fill first column.
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1;
    }

    // Fill the DP table
    // For any cell (i, j), the number of ways to reach it is the sum of
    // ways to reach (i-1, j) (from above) and (i, j-1) (from left).
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    // The result is stored at the bottom-right corner of the DP table
    return dp[m - 1][n - 1];
}

/**
 * Approach 4: Space-Optimized Tabulation
 *
 * Calculates the number of unique paths iteratively using only two rows (or one row)
 * of the DP table, significantly reducing space complexity.
 * Since dp[i][j] only depends on dp[i-1][j] and dp[i][j-1], we only need the
 * previous row and the current row being computed.
 *
 * Time Complexity: O(m*n)
 *   - Two nested loops iterate m*n times.
 * Space Complexity: O(n)
 *   - We only need to store one row (of size n) at a time.
 *     We can optimize further to just use a single 1D array of size n.
 *
 * @param m Number of rows in the grid.
 * @param n Number of columns in the grid.
 * @returns The number of unique paths.
 */
export function uniquePathsSpaceOptimized(m: number, n: number): number {
    // We only need a 1D array representing a row of the grid.
    // `dp` array stores the number of ways to reach the current cell in the current row.
    // dp[j] will represent dp[current_row][j].
    const dp: number[] = Array(n).fill(1); // Initialize first row values to 1

    // Iterate through rows starting from the second row (i=1)
    for (let i = 1; i < m; i++) {
        // Iterate through columns
        for (let j = 1; j < n; j++) {
            // The number of ways to reach dp[i][j] is dp[i-1][j] + dp[i][j-1].
            // In our 1D array:
            // dp[j] (current value) represents dp[i][j-1] (path from left in current row)
            // dp[j] (before update) represents dp[i-1][j] (path from above in previous row)
            dp[j] = dp[j] + dp[j - 1];
        }
    }

    // The result is the last element in the DP array after processing all rows
    return dp[n - 1];
}

/**
 * Approach 5: Mathematical Solution (Combinatorics)
 *
 * The problem can also be solved using combinatorics. To reach (m-1, n-1) from (0,0),
 * the robot must make a total of (m-1) down moves and (n-1) right moves.
 * The total number of moves will be (m-1) + (n-1) = m + n - 2.
 * This is equivalent to finding the number of ways to choose (m-1) down moves
 * (or (n-1) right moves) from a total of (m+n-2) moves.
 *
 * This can be calculated using the binomial coefficient "C(N, K)" which is N! / (K! * (N-K)!).
 * Here, N = m + n - 2, and K = m - 1 (or n - 1).
 *
 * Time Complexity: O(min(m, n))
 *   - The factorial calculation can be optimized to iterate fewer times.
 * Space Complexity: O(1)
 *
 * @param m Number of rows in the grid.
 * @param n Number of columns in the grid.
 * @returns The number of unique paths.
 */
export function uniquePathsCombinatorial(m: number, n: number): number {
    // Ensure m is always less than or equal to n to minimize iterations for calculations.
    // This is because C(N, K) = C(N, N-K).
    // So, C(m+n-2, m-1) = C(m+n-2, n-1). We pick the smaller K.
    if (m > n) {
        [m, n] = [n, m]; // Swap m and n if m > n
    }

    let N = m + n - 2;
    let K = m - 1; // Number of 'down' moves

    if (K < 0) return 0; // Invalid grid size, no paths possible if m or n is 0

    let res = 1;
    // Calculate C(N, K) = (N * (N-1) * ... * (N-K+1)) / (K * (K-1) * ... * 1)
    // This avoids computing large factorials directly.
    for (let i = 0; i < K; i++) {
        res = res * (N - i) / (i + 1);
    }

    return res;
}