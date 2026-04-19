"""
Problem: Unique Paths

A robot is located at the top-left corner of a m x n grid.
The robot can only move either down or right at any point in time.
The robot is trying to reach the bottom-right corner of the grid.
How many unique paths are there from the top-left corner to the bottom-right corner?

Example:
m = 3, n = 7

Start (0,0) -> Finish (2,6)

Grid representation:
S _ _ _ _ _ _
_ _ _ _ _ _ _
_ _ _ _ _ _ F

Expected output for 3x7: 28

Constraints:
- 1 <= m, n <= 100
- The answer will be less than or equal to 2 * 10^9.
"""

def unique_paths_recursive(m: int, n: int, r: int, c: int) -> int:
    """
    Approach 1: Brute Force Recursion

    This approach explores all possible paths from (r, c) to the bottom-right corner.

    Logic:
    - Base Case 1: If the robot goes out of bounds (`r >= m` or `c >= n`), it's an invalid path, so return 0.
    - Base Case 2: If the robot reaches the target (`r == m-1` and `c == n-1`), it's one valid path, so return 1.
    - Recursive Step: From `(r, c)`, the robot can move either down or right.
      The total unique paths from `(r, c)` is the sum of unique paths from `(r+1, c)` (move down)
      and `(r, c+1)` (move right).
      `unique_paths(m, n, r+1, c) + unique_paths(m, n, r, c+1)`

    Time Complexity: O(2^(m+n)) - In the worst case, each step can branch into two,
                     leading to an exponential number of calculations.
    Space Complexity: O(m+n) - Due to the recursion stack depth.
    """
    # Base Case 1: Out of bounds -> invalid path
    if r >= m or c >= n:
        return 0
    # Base Case 2: Reached the destination -> 1 valid path
    if r == m - 1 and c == n - 1:
        return 1

    # Recursive Step: Sum of paths moving right and paths moving down
    paths_right = unique_paths_recursive(m, n, r, c + 1)
    paths_down = unique_paths_recursive(m, n, r + 1, c)

    return paths_right + paths_down


def unique_paths_memo(m: int, n: int, r: int, c: int, memo: dict = None) -> int:
    """
    Approach 2: Memoization (Top-Down Dynamic Programming)

    This optimizes the brute-force recursion by storing the results of subproblems
    (number of unique paths from a given cell `(r, c)`) in a memoization table
    to avoid redundant calculations.

    Logic:
    - The state is defined by `(r, c)`, representing the current row and column.
    - Before computing `unique_paths(r, c)`, check if `memo[(r, c)]` exists. If yes,
      return the cached value.
    - Otherwise, compute it using the same recursive logic as `unique_paths_recursive`,
      store the result in `memo`, and then return it.

    Time Complexity: O(m * n) - Each state `(r, c)` is computed only once.
                     There are `m * n` unique subproblems.
    Space Complexity: O(m * n) - For the `memo` dictionary and recursion stack.
    """
    if memo is None:
        memo = {}

    # Check if the result for this subproblem is already computed
    if (r, c) in memo:
        return memo[(r, c)]

    # Base Case 1: Out of bounds -> invalid path
    if r >= m or c >= n:
        return 0
    # Base Case 2: Reached the destination -> 1 valid path
    if r == m - 1 and c == n - 1:
        return 1

    # Recursive Step: Sum of paths moving right and paths moving down
    paths_right = unique_paths_memo(m, n, r, c + 1, memo)
    paths_down = unique_paths_memo(m, n, r + 1, c, memo)
    result = paths_right + paths_down

    # Store the computed result in memo table
    memo[(r, c)] = result
    return result


def unique_paths_tabulation(m: int, n: int) -> int:
    """
    Approach 3: Tabulation (Bottom-Up Dynamic Programming)

    This approach builds a 2D DP table `dp` where `dp[i][j]` stores the number
    of unique paths from cell `(i, j)` to the bottom-right corner.
    Alternatively, and more commonly, `dp[i][j]` stores the number of unique
    paths from the top-left corner `(0,0)` to cell `(i,j)`.
    We will use the latter definition here.

    DP Table: `dp[i][j]`
        `i`: Represents the current row (from 0 to `m-1`).
        `j`: Represents the current column (from 0 to `n-1`).

    Logic (Paths from top-left to `(i,j)`):
    - Initialize a `dp` table of size `m x n` with zeros.
    - Base Case: `dp[0][0] = 1` (There's one way to reach the starting cell itself).
      Alternatively, `dp[i][0] = 1` for all `i` (only down moves), and `dp[0][j] = 1` for all `j` (only right moves).
    - Iterate `i` from 0 to `m-1` (rows):
      - Iterate `j` from 0 to `n-1` (columns):
        - If `(i, j)` is `(0, 0)`, `dp[i][j] = 1`.
        - Else, `dp[i][j] = dp[i-1][j]` (paths from above) + `dp[i][j-1]` (paths from left).
          Handle boundary conditions where `i-1` or `j-1` are out of bounds (treat as 0 paths).

    Visualizing the DP table for m=3, n=3:
    (S=start, F=finish)

    S 1 1
    1 2 3
    1 3 6 F

       0  1  2  <- columns (j)
    0: 1  1  1
    1: 1  2  3
    2: 1  3  6

    The final answer is `dp[m-1][n-1]`.

    Time Complexity: O(m * n) - Two nested loops.
    Space Complexity: O(m * n) - For the `dp` table.
    """
    if m <= 0 or n <= 0:
        return 0
    if m == 1 and n == 1:
        return 1

    # dp[i][j] will store the number of unique paths to reach (i, j)
    dp = [[0 for _ in range(n)] for _ in range(m)]

    # Initialize the first row and first column
    # There is only one way to reach any cell in the first row (by moving right only)
    for j in range(n):
        dp[0][j] = 1
    # There is only one way to reach any cell in the first column (by moving down only)
    for i in range(m):
        dp[i][0] = 1

    # Fill the rest of the dp table
    for i in range(1, m):
        for j in range(1, n):
            # Paths to (i,j) = Paths to (i-1,j) + Paths to (i,j-1)
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]

    return dp[m - 1][n - 1]


def unique_paths_space_optimized(m: int, n: int) -> int:
    """
    Approach 4: Space-Optimized Tabulation

    This optimizes the tabulation approach by observing that to compute the current
    row `dp[i][...]`, we only need values from the previous row `dp[i-1][...]`
    and the current row's previous elements `dp[i][j-1]`.
    We can reduce the space complexity from O(m*n) to O(n) by using only one 1D array.

    Logic:
    - Create a 1D DP array `dp` of size `n`, initialized with 1s. This `dp` array
      will represent the "previous row" (or current row being built).
    - `dp[j]` will store the number of ways to reach cell `(current_row, j)`.
    - Iterate `i` from 1 to `m-1` (starting from the second row):
      - For each `i`, `dp[0]` remains 1 (since there's only one way to reach any cell in the first column).
      - Iterate `j` from 1 to `n-1` (columns, skipping the first one):
        - `dp[j] = dp[j]` (paths from cell above) + `dp[j-1]` (paths from cell to its left in current row).
          Here, `dp[j]` on the RHS is the value from the *previous* row for the same column,
          and `dp[j-1]` on the RHS is the value from the *current* row for the previous column.

    Example for m=3, n=3:
    Initial `dp` (row 0): [1, 1, 1]

    Row 1 (i=1):
    `dp[0]` remains 1.
    `dp[1] = dp[1] (prev row) + dp[0] (curr row)` -> `1 + 1 = 2`
    `dp[2] = dp[2] (prev row) + dp[1] (curr row)` -> `1 + 2 = 3`
    `dp` becomes: [1, 2, 3]

    Row 2 (i=2):
    `dp[0]` remains 1.
    `dp[1] = dp[1] (prev row) + dp[0] (curr row)` -> `2 + 1 = 3`
    `dp[2] = dp[2] (prev row) + dp[1] (curr row)` -> `3 + 3 = 6`
    `dp` becomes: [1, 3, 6]

    The final answer is `dp[n-1]`.

    Time Complexity: O(m * n) - Two nested loops.
    Space Complexity: O(n) - For the 1D `dp` array.
    """
    if m <= 0 or n <= 0:
        return 0
    if m == 1 and n == 1:
        return 1

    # dp array stores paths to reach cells in the current row
    # Initialize with 1s, because there's 1 way to reach any cell in the first row.
    dp = [1] * n

    # Iterate from the second row up to the last row
    for i in range(1, m):
        # For each row, iterate from the second column up to the last column
        for j in range(1, n):
            # The number of paths to current cell (i, j) is the sum of:
            # 1. Paths to cell directly above (i-1, j) -- which is dp[j] from previous iteration (row i-1)
            # 2. Paths to cell directly to the left (i, j-1) -- which is dp[j-1] from current iteration (row i)
            dp[j] = dp[j] + dp[j - 1]
    
    # The result is the number of paths to the bottom-right corner (last cell of the last row)
    return dp[n - 1]

# Alternative mathematically optimal solution using Combinatorics:
# The robot needs to make a total of (m-1) down moves and (n-1) right moves.
# Total moves = (m-1) + (n-1).
# The problem is equivalent to finding the number of ways to arrange (m-1) 'D's and (n-1) 'R's.
# This is a combination problem: C((m-1)+(n-1), m-1) or C((m-1)+(n-1), n-1).
# Example: m=3, n=7. Total moves = (3-1) + (7-1) = 2 + 6 = 8 moves.
# Number of ways to choose 2 down moves out of 8 total moves: C(8, 2) = 8! / (2! * 6!) = (8*7)/(2*1) = 28.
# This method is O(m+n) for calculating factorial or O(min(m,n)) for optimized combinations.
# However, this project focuses on DP solutions.

import math
def unique_paths_combinatorial(m: int, n: int) -> int:
    """
    Approach 5: Combinatorial Solution (Not DP, but the most efficient)
    This approach directly calculates the number of paths using combinations.
    
    Logic:
    To reach the bottom-right corner from the top-left, the robot must make
    exactly `m-1` 'down' moves and `n-1` 'right' moves.
    The total number of moves will be `(m-1) + (n-1)`.
    The problem then becomes: "How many ways can we arrange `m-1` 'D's and `n-1` 'R's?"
    This is a binomial coefficient problem: C(total_moves, down_moves) or C(total_moves, right_moves).
    C(N, K) = N! / (K! * (N-K)!)
    Here, N = (m-1) + (n-1)
          K = (m-1) or (n-1)
    
    Time Complexity: O(min(m, n)) - For calculating the binomial coefficient efficiently.
    Space Complexity: O(1)
    """
    if m <= 0 or n <= 0:
        return 0
    if m == 1 and n == 1:
        return 1

    total_steps = (m - 1) + (n - 1)
    # Number of down steps (or right steps, choose the smaller for calculation efficiency)
    down_steps = min(m - 1, n - 1)

    # C(total_steps, down_steps)
    # Using math.comb for Python 3.8+
    # For older Python versions, implement combination manually (e.g., using math.factorial or iterative multiplication/division)
    
    # Manual calculation for broader compatibility or interview context without specific library:
    # result = 1
    # for i in range(down_steps):
    #     result = result * (total_steps - i) // (i + 1)
    # return result
    
    return math.comb(total_steps, down_steps)


if __name__ == "__main__":
    print("--- Unique Paths Problem ---")

    test_cases = [
        (3, 7, 28),
        (3, 2, 3), # (0,0)->(0,1)->(0,2), (0,0)->(1,0)->(1,1), (0,0)->(1,0)->(0,1)
                   # For m=3, n=2: (0,0)->(2,1)
                   # (R, D, D), (D, R, D), (D, D, R) => 3 paths
        (7, 3, 28),
        (1, 1, 1),
        (1, 5, 1), # Only right moves
        (5, 1, 1), # Only down moves
        (2, 2, 2), # RR, DD, RD, DR
        (2, 1, 1),
        (1, 2, 1) # Note: Example in many places uses 1-based indexing for m, n, so a 1x2 grid means (0,0) to (0,1)
                   # If interpreted as "1 row, 2 cols", then it's [S, F], 1 path.
                   # If interpreted as "2 rows, 1 col", then it's [S], [F], 1 path.
                   # My internal logic uses 0-indexed (m-1, n-1) as destination.
                   # (1,2) grid: 1 row, 2 cols. (0,0) -> (0,1). 1 path (Right).
    ]

    for m_val, n_val, expected in test_cases:
        print(f"\nGrid size: {m_val}x{n_val}")

        # Recursive (Brute Force) - For larger grids, this will be too slow
        if m_val < 15 and n_val < 15: # Heuristic
            res_recursive = unique_paths_recursive(m_val, n_val, 0, 0)
            print(f"  Recursive: {res_recursive}")
            assert res_recursive == expected, f"Recursive failed for {m_val}x{n_val}. Expected {expected}, got {res_recursive}"
        else:
            print("  Recursive: Skipped (inputs too large for brute force)")

        # Memoization (Top-Down DP)
        memo = {}
        res_memo = unique_paths_memo(m_val, n_val, 0, 0, memo)
        print(f"  Memoization: {res_memo}")
        assert res_memo == expected, f"Memoization failed for {m_val}x{n_val}. Expected {expected}, got {res_memo}"

        # Tabulation (Bottom-Up DP)
        res_tab = unique_paths_tabulation(m_val, n_val)
        print(f"  Tabulation: {res_tab}")
        assert res_tab == expected, f"Tabulation failed for {m_val}x{n_val}. Expected {expected}, got {res_tab}"

        # Space-Optimized Tabulation
        res_space_opt = unique_paths_space_optimized(m_val, n_val)
        print(f"  Space-Optimized: {res_space_opt}")
        assert res_space_opt == expected, f"Space-Optimized failed for {m_val}x{n_val}. Expected {expected}, got {res_space_opt}"
        
        # Combinatorial (Optimal)
        res_comb = unique_paths_combinatorial(m_val, n_val)
        print(f"  Combinatorial: {res_comb}")
        assert res_comb == expected, f"Combinatorial failed for {m_val}x{n_val}. Expected {expected}, got {res_comb}"


        print(f"  All optimized methods match expected result {expected}")