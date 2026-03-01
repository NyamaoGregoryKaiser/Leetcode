# Dynamic Programming Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the concepts behind Dynamic Programming, particularly recursion trees and DP tables.

---

## 1. Fibonacci Sequence: Recursion Tree & Memoization

**Problem**: `fib(5)`

### a) Pure Recursive `fib(5)` (Brute Force)
Notice the repeated calculations (overlapping subproblems).

```
          fib(5)
         /      \
      fib(4)   fib(3)
     /    \    /    \
  fib(3) fib(2) fib(2) fib(1)
 /    \  / \   / \
fib(2)fib(1)fib(1)fib(0) fib(1)fib(0)
/ \
fib(1)fib(0)
```

**Key Takeaway**: `fib(3)` is computed twice, `fib(2)` is computed three times, `fib(1)` multiple times. This leads to exponential time complexity.

---

### b) Memoized `fib(5)` (Top-Down DP)
With memoization, each subproblem is computed only once. Subsequent calls retrieve the cached result.

Assume `memo` array initialized with `undefined` or `-1`.

```
          fib(5)
         /      \
      fib(4)   [fib(3) result already in memo]
     /    \
  fib(3) fib(2)
 /    \  / \
fib(2)fib(1)fib(1)fib(0)  (Once fib(3), fib(2), fib(1), fib(0) are computed, their values are stored)
/ \
fib(1)fib(0)
```

**Memoization Table (conceptual state during computation):**

When `fib(5)` is called:
1. `fib(5)` needs `fib(4)` and `fib(3)`.
2. `fib(4)` needs `fib(3)` and `fib(2)`.
3. `fib(3)` needs `fib(2)` and `fib(1)`.
4. `fib(2)` needs `fib(1)` and `fib(0)`.
5. `fib(0)` -> 0 (Base case, store `memo[0]=0`)
6. `fib(1)` -> 1 (Base case, store `memo[1]=1`)
7. `fib(2)` computes `memo[0]+memo[1] = 0+1 = 1` (store `memo[2]=1`)
8. `fib(3)` computes `memo[1]+memo[2] = 1+1 = 2` (store `memo[3]=2`)
9. `fib(2)` is called again for `fib(4)` but `memo[2]` already exists, returns 1.
10. `fib(4)` computes `memo[3]+memo[2] = 2+1 = 3` (store `memo[4]=3`)
11. `fib(3)` is called again for `fib(5)` but `memo[3]` already exists, returns 2.
12. `fib(5)` computes `memo[4]+memo[3] = 3+2 = 5` (store `memo[5]=5`)

**Final Memo Table:**
`memo = [0, 1, 1, 2, 3, 5]`
Indices: `0  1  2  3  4  5`

---

### c) Tabulated `fib(5)` (Bottom-Up DP)
Build the solution iteratively from base cases.

**DP Table (conceptual array `dp`):**

`dp = [?, ?, ?, ?, ?, ?]` (Initialized for `n+1` elements)
Indices: `0  1  2  3  4  5`

1.  **Base Cases**:
    `dp[0] = 0`
    `dp[1] = 1`
    `dp = [0, 1, ?, ?, ?, ?]`

2.  **`i = 2`**: `dp[2] = dp[1] + dp[0] = 1 + 0 = 1`
    `dp = [0, 1, 1, ?, ?, ?]`

3.  **`i = 3`**: `dp[3] = dp[2] + dp[1] = 1 + 1 = 2`
    `dp = [0, 1, 1, 2, ?, ?]`

4.  **`i = 4`**: `dp[4] = dp[3] + dp[2] = 2 + 1 = 3`
    `dp = [0, 1, 1, 2, 3, ?]`

5.  **`i = 5`**: `dp[5] = dp[4] + dp[3] = 3 + 2 = 5`
    `dp = [0, 1, 1, 2, 3, 5]`

**Result**: `dp[5] = 5`

---

## 2. Longest Common Subsequence (LCS): DP Table

**Problem**: `LCS("AGGTAB", "GXTXAYB")`

**Strings**:
`s1 = "AGGTAB"` (length `m=6`)
`s2 = "GXTXAYB"` (length `n=7`)

**DP Table**: `dp[i][j]` stores LCS length of `s1[0...i-1]` and `s2[0...j-1]`.
Dimensions: `(m+1) x (n+1) = 7 x 8`

Initialize with `0`s for `i=0` or `j=0` (empty string cases).

```
   "" A G G T A B
""  0 0 0 0 0 0 0
G   0 0 1 1 1 1 1
X   0 0 1 1 1 1 1
T   0 0 1 1 2 2 2
X   0 0 1 1 2 2 2
A   0 1 1 1 2 3 3
Y   0 1 1 1 2 3 3
B   0 1 2 2 2 3 4  <- Final Answer: dp[6][7] = 4
```

**State Transitions**:
For `dp[i][j]`:
*   If `s1[i-1] == s2[j-1]` (characters match):
    `dp[i][j] = 1 + dp[i-1][j-1]` (take diagonal value + 1)
*   If `s1[i-1] != s2[j-1]` (characters don't match):
    `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (take max from cell above or cell to the left)

**Example Walkthrough for `dp[6][7]` (LCS("AGGTAB", "GXTXAYB"))**:
`s1[5] = B`, `s2[6] = B`. They match!
`dp[6][7] = 1 + dp[5][6]`

Now, `dp[5][6]` (LCS("AGGTA", "GXTXAY"))
`s1[4] = A`, `s2[5] = Y`. They don't match.
`dp[5][6] = max(dp[4][6], dp[5][5])`

This process continues until all cells are filled, leading to the final result `dp[6][7] = 4`.

---

## 3. Unique Paths: DP Table

**Problem**: `uniquePaths(3, 3)` (3x3 grid)

**DP Table**: `dp[r][c]` stores the number of unique paths from `(0,0)` to `(r,c)`.
Dimensions: `m x n = 3 x 3`

Initialize first row and first column with `1`s (only one way to reach these cells).

```
    C0 C1 C2
R0 [ 1  1  1 ]
R1 [ 1  ?  ? ]
R2 [ 1  ?  ? ]
```

**State Transitions**:
For `dp[r][c]` (where `r > 0` and `c > 0`):
`dp[r][c] = dp[r-1][c] + dp[r][c-1]` (sum paths from above and from left)

**Filling the table**:

1.  **Base Cases**:
    `dp[0][0]=1, dp[0][1]=1, dp[0][2]=1`
    `dp[1][0]=1, dp[2][0]=1`

    ```
    1 1 1
    1 ? ?
    1 ? ?
    ```

2.  **`dp[1][1]`**: `dp[0][1] + dp[1][0] = 1 + 1 = 2`

    ```
    1 1 1
    1 2 ?
    1 ? ?
    ```

3.  **`dp[1][2]`**: `dp[0][2] + dp[1][1] = 1 + 2 = 3`

    ```
    1 1 1
    1 2 3
    1 ? ?
    ```

4.  **`dp[2][1]`**: `dp[1][1] + dp[2][0] = 2 + 1 = 3`

    ```
    1 1 1
    1 2 3
    1 3 ?
    ```

5.  **`dp[2][2]`**: `dp[1][2] + dp[2][1] = 3 + 3 = 6`

    ```
    1 1 1
    1 2 3
    1 3 6  <- Final Answer: dp[2][2] = 6
    ```

**Result**: `dp[2][2] = 6`

---

## 4. House Robber: DP Array

**Problem**: `houseRobber([2, 7, 9, 3, 1])`

**DP Array**: `dp[i]` stores the maximum amount of money that can be robbed up to house `i` (including or excluding house `i`).
Length of array `n=5`. `dp` will have `n` elements.

```
nums = [2, 7, 9, 3, 1]
dp   = [?, ?, ?, ?, ?]
Indices: 0  1  2  3  4
```

**State Transitions**:
For `dp[i]` (where `i >= 2`):
`dp[i] = max(nums[i] + dp[i-2], dp[i-1])`

**Filling the array**:

1.  **Base Cases**:
    *   If `n=0`, `dp` is empty, return 0.
    *   If `n=1`, `dp[0] = nums[0] = 2`.
    *   If `n=2`, `dp[1] = max(nums[0], nums[1]) = max(2, 7) = 7`.

    ```
    nums = [2, 7, 9, 3, 1]
    dp   = [2, 7, ?, ?, ?]
    ```

2.  **`i = 2`**: `nums[2] = 9`
    `dp[2] = max(nums[2] + dp[0], dp[1])`
    `dp[2] = max(9 + 2, 7)`
    `dp[2] = max(11, 7) = 11`

    ```
    nums = [2, 7, 9, 3, 1]
    dp   = [2, 7, 11, ?, ?]
    ```

3.  **`i = 3`**: `nums[3] = 3`
    `dp[3] = max(nums[3] + dp[1], dp[2])`
    `dp[3] = max(3 + 7, 11)`
    `dp[3] = max(10, 11) = 11`

    ```
    nums = [2, 7, 9, 3, 1]
    dp   = [2, 7, 11, 11, ?]
    ```

4.  **`i = 4`**: `nums[4] = 1`
    `dp[4] = max(nums[4] + dp[2], dp[3])`
    `dp[4] = max(1 + 11, 11)`
    `dp[4] = max(12, 11) = 12`

    ```
    nums = [2, 7, 9, 3, 1]
    dp   = [2, 7, 11, 11, 12] <- Final Answer: dp[4] = 12
    ```

**Result**: `dp[4] = 12`

---

### Space-Optimized `houseRobber([2, 7, 9, 3, 1])`

We only need `prev1` (for `dp[i-1]`) and `prev2` (for `dp[i-2]`).

```
nums = [2, 7, 9, 3, 1]
Indices: 0  1  2  3  4
```

1.  **Base Cases**:
    `prev2 = nums[0] = 2`
    `prev1 = max(nums[0], nums[1]) = max(2, 7) = 7`
    (`currentMax` is for `dp[i]`)

2.  **`i = 2`**: `nums[2] = 9`
    `currentMax = max(nums[2] + prev2, prev1) = max(9 + 2, 7) = max(11, 7) = 11`
    `prev2 = prev1 = 7`
    `prev1 = currentMax = 11`

3.  **`i = 3`**: `nums[3] = 3`
    `currentMax = max(nums[3] + prev2, prev1) = max(3 + 7, 11) = max(10, 11) = 11`
    `prev2 = prev1 = 11`
    `prev1 = currentMax = 11`

4.  **`i = 4`**: `nums[4] = 1`
    `currentMax = max(nums[4] + prev2, prev1) = max(1 + 11, 11) = max(12, 11) = 12`
    `prev2 = prev1 = 11`
    `prev1 = currentMax = 12`

**Result**: After loop, `prev1 = 12`.