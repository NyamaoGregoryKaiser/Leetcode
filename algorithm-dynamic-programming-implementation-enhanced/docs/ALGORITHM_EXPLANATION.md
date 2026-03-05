# Dynamic Programming: Algorithm Explanation

This document provides a theoretical overview of Dynamic Programming (DP) and detailed explanations of the problems implemented in this project.

## What is Dynamic Programming?

Dynamic Programming is a powerful algorithmic technique primarily used for optimization problems. It solves complex problems by breaking them down into simpler subproblems. It's applicable to problems that exhibit two key characteristics:

1.  **Optimal Substructure:** An optimal solution to the problem can be constructed from optimal solutions to its subproblems. If a solution is optimal, then all of its sub-parts must also be optimal.
    *   *Example:* The shortest path from A to C through B must contain the shortest path from A to B.

2.  **Overlapping Subproblems:** The same subproblems are encountered multiple times when solving the larger problem. Instead of recomputing the solution to these subproblems every time, DP stores their results and reuses them.
    *   *Example:* Calculating `Fib(5)` requires `Fib(4)` and `Fib(3)`. `Fib(4)` requires `Fib(3)` and `Fib(2)`. Notice `Fib(3)` is computed twice.

### How Dynamic Programming Works

DP typically follows one of two main approaches to handle overlapping subproblems:

#### 1. Memoization (Top-Down DP)

*   **Approach:** This is essentially a recursive solution with a cache (memoization table).
*   **Process:**
    1.  Start with the main problem and recursively break it down into subproblems.
    2.  Before computing a subproblem, check if its result is already in the cache. If yes, return the cached result.
    3.  If not, compute the subproblem's result, store it in the cache, and then return it.
*   **Characteristics:**
    *   Intuitive, often closely mirrors the recursive definition of the problem.
    *   Only computes subproblems that are necessary for the final solution.
    *   Space complexity includes the recursion stack in addition to the cache.

#### 2. Tabulation (Bottom-Up DP)

*   **Approach:** This is an iterative solution that builds up the solution from the base cases.
*   **Process:**
    1.  Identify the base cases for the smallest subproblems.
    2.  Create a DP table (usually an array or 2D array) to store the solutions to subproblems.
    3.  Iteratively fill the DP table, starting from the base cases and moving towards the final solution, ensuring that all necessary subproblem solutions are computed before they are needed.
*   **Characteristics:**
    *   Eliminates recursion overhead, potentially faster in practice due to better cache locality.
    *   Computes all subproblems up to the target, even if some are not strictly necessary.
    *   Often allows for space optimization, reducing the DP table size.

#### Space Optimization

*   In many tabulation problems, the current state `dp[i]` only depends on a few previous states (e.g., `dp[i-1]`, `dp[i-2]`). In such cases, the entire DP table doesn't need to be stored. We can reduce the space complexity by only keeping track of the immediately preceding states.

---

## Problems Explained

### 1. Fibonacci Number

**Problem Statement:** Given an integer `n`, return the `n`-th Fibonacci number.
`F(0) = 0`, `F(1) = 1`, `F(n) = F(n - 1) + F(n - 2)` for `n > 1`.

**Recursive Relation:** `F(n) = F(n-1) + F(n-2)`
**Base Cases:** `F(0) = 0`, `F(1) = 1`

#### Brute Force (Recursive)

```
fib(n):
  if n <= 0: return 0
  if n == 1: return 1
  return fib(n-1) + fib(n-2)
```
*   **Overlapping Subproblems:** `fib(3)` is computed multiple times in `fib(5)`.
    ```
    fib(5)
    ├── fib(4)
    │   ├── fib(3)
    │   │   ├── fib(2)
    │   │   │   ├── fib(1)
    │   │   │   └── fib(0)
    │   │   └── fib(1)
    │   └── fib(2)
    │       ├── fib(1)
    │       └── fib(0)
    └── fib(3)
        ├── fib(2)
        │   ├── fib(1)
        │   └── fib(0)
        └── fib(1)
    ```
*   **Complexity:** O(2^N) time, O(N) space (recursion stack).

#### Memoization (Top-Down)

Store `F(k)` values in a map/array as they are computed.
```
fib_memo(n, memo = {}):
  if n <= 0: return 0
  if n == 1: return 1
  if memo[n] exists: return memo[n]

  result = fib_memo(n-1, memo) + fib_memo(n-2, memo)
  memo[n] = result
  return result
```
*   **Complexity:** O(N) time, O(N) space (memo table + recursion stack).

#### Tabulation (Bottom-Up)

Build up from `F(0)` and `F(1)` to `F(n)`.
```
fib_tab(n):
  if n <= 0: return 0
  if n == 1: return 1

  dp = array of size (n+1)
  dp[0] = 0
  dp[1] = 1

  for i from 2 to n:
    dp[i] = dp[i-1] + dp[i-2]

  return dp[n]
```
*   **DP Table (for N=5):**
    ```
    Index:  0   1   2   3   4   5
    Value:  0   1   1   2   3   5
    ```
*   **Complexity:** O(N) time, O(N) space.

#### Space-Optimized Tabulation

Notice `F(i)` only depends on `F(i-1)` and `F(i-2)`. We only need to store the last two values.
```
fib_space_opt(n):
  if n <= 0: return 0
  if n == 1: return 1

  a = 0  // F(i-2)
  b = 1  // F(i-1)

  for i from 2 to n:
    current = a + b
    a = b
    b = current

  return b // b holds F(n)
```
*   **Complexity:** O(N) time, O(1) space.

---

### 2. Unique Paths

**Problem Statement:** A robot is at `(0,0)` of an `m x n` grid. It can only move down or right. How many unique paths to `(m-1, n-1)`?

**Recursive Relation:** To reach `(r, c)`, the robot must come from `(r-1, c)` (down move) or `(r, c-1)` (right move).
So, `paths(r, c) = paths(r-1, c) + paths(r, c-1)`.
**Base Cases:**
*   `paths(r, c) = 0` if `r >= m` or `c >= n` (out of bounds).
*   `paths(m-1, n-1) = 1` (destination reached).

#### Brute Force (Recursive)

```
uniquePaths_rec(m, n, r=0, c=0):
  if r >= m or c >= n: return 0  // Out of bounds
  if r == m-1 and c == n-1: return 1 // Reached destination

  return uniquePaths_rec(m, n, r+1, c) + uniquePaths_rec(m, n, r, c+1)
```
*   **Complexity:** O(2^(M+N)) time, O(M+N) space.

#### Memoization (Top-Down)

Store `paths(r, c)` in a 2D array `memo[r][c]`.
```
uniquePaths_memo(m, n, r=0, c=0, memo):
  if r >= m or c >= n: return 0
  if r == m-1 and c == n-1: return 1
  if memo[r][c] is computed: return memo[r][c]

  result = uniquePaths_memo(m, n, r+1, c, memo) + uniquePaths_memo(m, n, r, c+1, memo)
  memo[r][c] = result
  return result
```
*   **Complexity:** O(M*N) time, O(M*N) space.

#### Tabulation (Bottom-Up)

`dp[r][c]` represents the number of paths from `(0,0)` to `(r,c)`.
```
uniquePaths_tab(m, n):
  dp = 2D array (m x n) initialized to 0

  // Base cases: first row and first column have 1 path to each cell
  for r from 0 to m-1: dp[r][0] = 1
  for c from 0 to n-1: dp[0][c] = 1

  // Fill the table
  for r from 1 to m-1:
    for c from 1 to n-1:
      dp[r][c] = dp[r-1][c] + dp[r][c-1]

  return dp[m-1][n-1]
```
*   **DP Table (for 3x3 grid):**
    ```
    Initial:
    [1, 1, 1]
    [1, 0, 0]
    [1, 0, 0]

    After filling:
    [1, 1, 1]
    [1, 2, 3]  (dp[1][1]=dp[0][1]+dp[1][0]=1+1=2, dp[1][2]=dp[0][2]+dp[1][1]=1+2=3)
    [1, 3, 6]  (dp[2][1]=dp[1][1]+dp[2][0]=2+1=3, dp[2][2]=dp[1][2]+dp[2][1]=3+3=6)

    Result: 6
    ```
*   **Complexity:** O(M*N) time, O(M*N) space.

#### Space-Optimized Tabulation

Notice `dp[r][c]` only depends on `dp[r-1][c]` (element directly above) and `dp[r][c-1]` (element to its left in the current row).
We can use a 1D array of size `n` to represent the current row's path counts.
`dp[c]` (new value) = `dp[c]` (value from previous row) + `dp[c-1]` (value from current row, left cell).
```
uniquePaths_space_opt(m, n):
  dp = array of size n, initialized to 1 // Represents first row

  for r from 1 to m-1:
    for c from 1 to n-1:
      // dp[c] is currently dp[r-1][c]
      // dp[c-1] is currently dp[r][c-1] (already updated in this row iteration)
      dp[c] = dp[c] + dp[c-1]

  return dp[n-1]
```
*   **Example Trace (m=3, n=3):**
    *   `dp = [1, 1, 1]` (initial for row 0)
    *   **Row 1 (r=1):**
        *   `c=1`: `dp[1] = dp[1] (prev row) + dp[0] (curr row)` => `1 + 1 = 2`. `dp = [1, 2, 1]`
        *   `c=2`: `dp[2] = dp[2] (prev row) + dp[1] (curr row)` => `1 + 2 = 3`. `dp = [1, 2, 3]`
    *   **Row 2 (r=2):**
        *   `c=1`: `dp[1] = dp[1] (prev row) + dp[0] (curr row)` => `2 + 1 = 3`. `dp = [1, 3, 3]`
        *   `c=2`: `dp[2] = dp[2] (prev row) + dp[1] (curr row)` => `3 + 3 = 6`. `dp = [1, 3, 6]`
    *   Return `dp[n-1]` which is `dp[2] = 6`.
*   **Complexity:** O(M*N) time, O(N) space.

---

### 3. Coin Change

**Problem Statement:** Given `coins` (denominations) and an `amount`, find the fewest number of `coins` to make the `amount`. Return `-1` if impossible. Infinite coins available.

**Recursive Relation:** `minCoins(amount) = min(1 + minCoins(amount - coin_i))` for all `coin_i` in `coins`.
**Base Cases:**
*   `minCoins(0) = 0`
*   `minCoins(amount) = Infinity` if `amount < 0` (or if no coins can make it).

#### Brute Force (Recursive)

```
coinChange_rec(coins, amount):
  if amount < 0: return Infinity
  if amount == 0: return 0

  min_count = Infinity
  for coin in coins:
    res = coinChange_rec(coins, amount - coin)
    if res != Infinity:
      min_count = min(min_count, res + 1)

  return min_count
```
*   **Complexity:** O(C^A) time (C = num coins, A = amount), O(A) space.

#### Memoization (Top-Down)

Store `minCoins(amount)` in `memo[amount]`.
```
coinChange_memo(coins, amount, memo={}):
  if amount < 0: return Infinity
  if amount == 0: return 0
  if memo[amount] is computed: return memo[amount]

  min_count = Infinity
  for coin in coins:
    res = coinChange_memo(coins, amount - coin, memo)
    if res != Infinity:
      min_count = min(min_count, res + 1)

  memo[amount] = min_count
  return min_count
```
*   **Complexity:** O(A*C) time, O(A) space.

#### Tabulation (Bottom-Up)

`dp[i]` stores the minimum coins for amount `i`.
```
coinChange_tab(coins, amount):
  dp = array of size (amount+1), initialized to Infinity
  dp[0] = 0 // 0 coins for amount 0

  for i from 1 to amount:
    for coin in coins:
      if i - coin >= 0 and dp[i - coin] != Infinity:
        dp[i] = min(dp[i], dp[i - coin] + 1)

  return dp[amount] if dp[amount] != Infinity else -1
```
*   **DP Table Example (coins = [1, 2, 5], amount = 11):**
    ```
    i:     0   1   2   3   4   5   6   7   8   9  10  11
    dp:  [ 0,  1,  1,  2,  2,  1,  2,  2,  3,  3,  2,  3 ]

    Trace for dp[11]:
    dp[11] = min(dp[11], dp[11-1]+1, dp[11-2]+1, dp[11-5]+1)
           = min(Inf, dp[10]+1, dp[9]+1, dp[6]+1)
           = min(Inf, 2+1, 3+1, 2+1)
           = min(Inf, 3, 4, 3) = 3
    ```
*   **Complexity:** O(A*C) time, O(A) space.

---

### 4. Longest Increasing Subsequence (LIS)

**Problem Statement:** Given an array `nums`, find the length of the longest strictly increasing subsequence.

**Recursive Relation:** To find LIS ending at `nums[i]`, look for `LIS(nums[j])` where `j < i` and `nums[j] < nums[i]`.
`LIS(i) = 1 + max(LIS(j))` for all `j < i` and `nums[j] < nums[i]`. If no such `j`, `LIS(i) = 1`.
Overall LIS is `max(LIS(i))` for all `i`.

#### Brute Force (Recursive)

This involves iterating through all possible subsequences. A common way is to consider for each element whether to include it or not.
```
lis_rec(nums, currentIdx, prevIdx):
  if currentIdx == nums.length: return 0

  // Option 1: Exclude current element
  lenExclude = lis_rec(nums, currentIdx + 1, prevIdx)

  // Option 2: Include current element if valid
  lenInclude = 0
  if prevIdx == -1 or nums[currentIdx] > nums[prevIdx]:
    lenInclude = 1 + lis_rec(nums, currentIdx + 1, currentIdx)

  return max(lenExclude, lenInclude)
```
*   **Complexity:** O(2^N) time, O(N) space.

#### Memoization (Top-Down)

Store `LIS(currentIdx, prevIdx)` in a 2D array `memo[currentIdx][prevIdx+1]`. `prevIdx+1` handles `prevIdx = -1`.
```
lis_memo(nums, currentIdx, prevIdx, memo):
  if currentIdx == nums.length: return 0
  if memo[currentIdx][prevIdx+1] is computed: return memo[currentIdx][prevIdx+1]

  lenExclude = lis_memo(nums, currentIdx + 1, prevIdx, memo)
  lenInclude = 0
  if prevIdx == -1 or nums[currentIdx] > nums[prevIdx]:
    lenInclude = 1 + lis_memo(nums, currentIdx + 1, currentIdx, memo)

  result = max(lenExclude, lenInclude)
  memo[currentIdx][prevIdx+1] = result
  return result
```
*   **Complexity:** O(N^2) time, O(N^2) space.

#### Tabulation (Bottom-Up)

`dp[i]` stores the length of LIS ending at `nums[i]`.
```
lis_tab(nums):
  if nums.length == 0: return 0
  dp = array of size N, initialized to 1

  for i from 1 to N-1:
    for j from 0 to i-1:
      if nums[i] > nums[j]:
        dp[i] = max(dp[i], dp[j] + 1)

  return max value in dp array
```
*   **DP Table Example (nums = [10, 9, 2, 5, 3, 7, 101, 18]):**
    ```
    nums: [10,  9,  2,  5,  3,  7, 101, 18]
    dp:   [ 1,  1,  1,  1,  1,  1,   1,  1] (initial)

    i=1 (num=9): 9 !> 10. dp[1]=1
    i=2 (num=2): 2 !> 10, 2 !> 9. dp[2]=1
    i=3 (num=5):
        5 > 2 (dp[2]=1). dp[3]=max(1, dp[2]+1) = 2
        5 !> 9, 5 !> 10.
    i=4 (num=3):
        3 > 2 (dp[2]=1). dp[4]=max(1, dp[2]+1) = 2
    i=5 (num=7):
        7 > 2 (dp[2]=1). dp[5]=max(1, dp[2]+1) = 2
        7 > 5 (dp[3]=2). dp[5]=max(2, dp[3]+1) = 3
        7 > 3 (dp[4]=2). dp[5]=max(3, dp[4]+1) = 3
    ... and so on.

    Final dp: [ 1,  1,  1,  2,  2,  3,  4,  4] (example for [10, 9, 2, 5, 3, 7, 101, 18])
    Max in dp = 4. (Correct LIS for this example is [2,3,7,18])
    ```
*   **Complexity:** O(N^2) time, O(N) space.

#### N log N Approach (Patience Sorting / Binary Search)

This is a more advanced technique that uses a `tails` array. `tails[k]` stores the smallest ending element of all increasing subsequences of length `k+1`. The `tails` array is always sorted.
```
lis_nLogn(nums):
  if nums.length == 0: return 0
  tails = [] // stores smallest end element for LIS of length i+1

  for num in nums:
    // Find index 'i' in tails such that tails[i-1] < num <= tails[i]
    // Use binary search (lower_bound) to find first element >= num
    i = binary_search_insert_position(tails, num)

    if i == tails.length:
      tails.push(num) // Extend longest subsequence
    else:
      tails[i] = num // Replace to allow for potentially longer subsequences later
  return tails.length
```
*   **Example Trace (nums = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]):**
    *   `num=0`: `tails = [0]`
    *   `num=8`: `tails = [0, 8]`
    *   `num=4`: `tails = [0, 4]` (8 is replaced by 4, as [0,4] is a shorter end to LIS of length 2)
    *   `num=12`: `tails = [0, 4, 12]`
    *   `num=2`: `tails = [0, 2, 12]` (4 replaced by 2)
    *   `num=10`: `tails = [0, 2, 10]` (12 replaced by 10)
    *   `num=6`: `tails = [0, 2, 6]` (10 replaced by 6)
    *   ...and so on.
    The length of `tails` correctly represents the LIS length.
*   **Complexity:** O(N log N) time, O(N) space.

---

### 5. 0/1 Knapsack Problem

**Problem Statement:** Given `n` items (each with `weight[i]` and `value[i]`) and a `capacity`, find the maximum total `value` that can be carried in the knapsack without exceeding `capacity`. Each item can be included (1) or excluded (0).

**Recursive Relation:** `knapsack(idx, current_capacity)`
If `weights[idx-1] > current_capacity`:
    `knapsack(idx, current_capacity) = knapsack(idx-1, current_capacity)` (cannot include item)
Else:
    `knapsack(idx, current_capacity) = max(`
        `knapsack(idx-1, current_capacity),` // Exclude item
        `values[idx-1] + knapsack(idx-1, current_capacity - weights[idx-1])` // Include item
    `)`
**Base Cases:** `knapsack(0, current_capacity) = 0` or `knapsack(idx, 0) = 0`.

#### Brute Force (Recursive)

```
knapsack_rec(weights, values, capacity, n):
  if n == 0 or capacity == 0: return 0

  if weights[n-1] > capacity:
    return knapsack_rec(weights, values, capacity, n-1)
  else:
    include = values[n-1] + knapsack_rec(weights, values, capacity - weights[n-1], n-1)
    exclude = knapsack_rec(weights, values, capacity, n-1)
    return max(include, exclude)
```
*   **Complexity:** O(2^N) time, O(N) space.

#### Memoization (Top-Down)

Store `knapsack(idx, current_capacity)` in `memo[idx][current_capacity]`.
```
knapsack_memo(weights, values, capacity, n, memo):
  if n == 0 or capacity == 0: return 0
  if memo[n][capacity] is computed: return memo[n][capacity]

  if weights[n-1] > capacity:
    result = knapsack_memo(weights, values, capacity, n-1, memo)
  else:
    include = values[n-1] + knapsack_memo(weights, values, capacity - weights[n-1], n-1, memo)
    exclude = knapsack_memo(weights, values, capacity, n-1, memo)
    result = max(include, exclude)

  memo[n][capacity] = result
  return result
```
*   **Complexity:** O(N*C) time, O(N*C) space (N=num items, C=capacity).

#### Tabulation (Bottom-Up)

`dp[i][j]` stores the maximum value using first `i` items with capacity `j`.
```
knapsack_tab(weights, values, capacity):
  n = weights.length
  dp = 2D array ((n+1) x (capacity+1)), initialized to 0

  for i from 1 to n: // Iterate through items
    for j from 1 to capacity: // Iterate through capacities
      current_weight = weights[i-1]
      current_value = values[i-1]

      if current_weight <= j:
        // Option 1: Include item (value + max value of prev items with remaining capacity)
        // Option 2: Exclude item (max value of prev items with same capacity)
        dp[i][j] = max(current_value + dp[i-1][j - current_weight], dp[i-1][j])
      else:
        // Cannot include item, take value from previous items
        dp[i][j] = dp[i-1][j]

  return dp[n][capacity]
```
*   **DP Table Example (weights=[1,2,3], values=[6,10,12], capacity=5):**
    ```
    dp table (rows=items, cols=capacity):
             0  1  2  3  4  5 (capacity)
          -------------------
    Item 0 (no items): [0, 0, 0, 0, 0, 0]
    Item 1 (w=1,v=6):  [0, 6, 6, 6, 6, 6]
    Item 2 (w=2,v=10): [0, 6, 10,16,16,16]
    Item 3 (w=3,v=12): [0, 6, 10,18,22,22]

    Result: dp[3][5] = 22
    ```
*   **Complexity:** O(N*C) time, O(N*C) space.

#### Space-Optimized Tabulation

`dp[j]` represents the max value for the current items considered with capacity `j`.
Iterating `j` from `capacity` down to `current_weight` ensures `dp[j - current_weight]` refers to the previous row's value, maintaining the 0/1 property.
```
knapsack_space_opt(weights, values, capacity):
  n = weights.length
  dp = array of size (capacity+1), initialized to 0

  for i from 0 to n-1: // Iterate through items
    current_weight = weights[i]
    current_value = values[i]

    // Iterate capacity from right to left
    for j from capacity down to current_weight:
      dp[j] = max(dp[j], current_value + dp[j - current_weight])

  return dp[capacity]
```
*   **Complexity:** O(N*C) time, O(C) space.

---

This covers the fundamental concepts of Dynamic Programming and provides detailed breakdowns for each problem's various solutions. Understanding these approaches is crucial for mastering DP and excelling in coding interviews.

---