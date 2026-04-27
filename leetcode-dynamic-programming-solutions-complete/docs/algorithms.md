# Dynamic Programming: Concepts, Problems, and Interview Tips

Dynamic Programming (DP) is a powerful algorithmic technique for solving optimization problems by breaking them down into smaller, overlapping subproblems and storing the results of these subproblems to avoid redundant computations. It's often used when a problem has two key properties:

1.  **Overlapping Subproblems**: The problem can be broken down into subproblems that are reused multiple times. Instead of recomputing solutions to these subproblems, DP stores their results (memoization or tabulation).
2.  **Optimal Substructure**: An optimal solution to the problem can be constructed from optimal solutions of its subproblems.

## DP Paradigms

There are two main approaches to Dynamic Programming:

### 1. Memoization (Top-Down DP)

*   **Approach**: This is a recursive approach where the solution to a problem is expressed in terms of solutions to smaller subproblems. The results of these subproblems are stored (cached) in a data structure (e.g., an array or hash map) as they are computed. If a subproblem is encountered again, its cached result is returned directly, avoiding recomputation.
*   **Pros**: Often more intuitive to write as it directly follows the recursive definition. Only computes subproblems that are actually needed.
*   **Cons**: Can lead to recursion stack overflow for very large inputs. Overhead of recursive calls.

### 2. Tabulation (Bottom-Up DP)

*   **Approach**: This is an iterative approach where the solution is built up from the base cases to the final solution. A DP table (usually an array or 2D array) is filled systematically, starting with the smallest subproblems.
*   **Pros**: Generally avoids recursion stack overflow. Can be more space-efficient (e.g., if only previous row/column is needed).
*   **Cons**: May compute subproblems that are not strictly necessary if the problem structure doesn't demand it. Can be less intuitive to derive the iteration order.

## Common Steps to Solve a DP Problem

1.  **Identify if it's a DP problem**: Look for overlapping subproblems and optimal substructure.
2.  **Define the state**: What does `dp[i]` or `dp[i][j]` represent? This is crucial. It should capture all necessary information to solve the subproblem.
3.  **Define the base cases**: What are the smallest, trivial subproblems whose solutions are known?
4.  **Formulate the recurrence relation**: How do you compute `dp[i]` or `dp[i][j]` based on previously computed states?
5.  **Determine the order of computation**:
    *   **Memoization**: Natural (recursive calls).
    *   **Tabulation**: Usually ascending (from base cases to target).
6.  **Consider space optimization**: Can the DP table be reduced if only a few previous states are needed?

---

## Problems Covered in This Project

### 1. Fibonacci Sequence

**Problem Description**:
Calculate the `n`th Fibonacci number.
`F(0) = 0`, `F(1) = 1`
`F(n) = F(n-1) + F(n-2)` for `n > 1`

**Recurrence Relation (for `F(n)`):**
*   `F(n) = F(n-1) + F(n-2)`
*   Base cases: `F(0) = 0`, `F(1) = 1`

**DP State**: `dp[i]` represents the `i`th Fibonacci number.

**Visualizing Recursion with Memoization:**
```
fib(5)
  |--fib(4) + fib(3)
  |    |--fib(3) + fib(2)  (fib(3) computed first)
  |    |    |--fib(2) + fib(1)
  |    |    |    |--fib(1) + fib(0) -> 1 + 0 = 1
  |    |    |    `--return 1
  |    |    `--fib(1) -> 1
  |    |    `--fib(2) = 1 + 1 = 2
  |    |--fib(1) -> 1
  |    |--fib(0) -> 0
  |    `--fib(3) = 2 + 1 = 3
  |    `--fib(2) (already in memo) -> 2
  |    `--fib(4) = 3 + 2 = 5
  `--fib(3) (already in memo) -> 3
  `--fib(5) = 5 + 3 = 8
```
Without memoization, `fib(3)` and `fib(2)` would be recomputed multiple times.

**Solution Approaches & Complexities:**

1.  **Recursive (Brute Force)**:
    *   Time: O(2^n) - Exponential.
    *   Space: O(n) - Recursion stack.
2.  **Memoization (Top-Down DP)**:
    *   Time: O(n) - Each subproblem computed once.
    *   Space: O(n) - Memoization table + recursion stack.
3.  **Tabulation (Bottom-Up DP)**:
    *   Time: O(n) - Single loop.
    *   Space: O(n) - DP table.
    *   **DP Table Build-Up (Example: n=5)**:
        `dp` array of size `n+1`.
        `dp[0] = 0` (base case)
        `dp[1] = 1` (base case)
        `dp[2] = dp[1] + dp[0] = 1 + 0 = 1`
        `dp[3] = dp[2] + dp[1] = 1 + 1 = 2`
        `dp[4] = dp[3] + dp[2] = 2 + 1 = 3`
        `dp[5] = dp[4] + dp[3] = 3 + 2 = 5`
4.  **Space-Optimized Tabulation**:
    *   Time: O(n) - Single loop.
    *   Space: O(1) - Only two variables (`a`, `b`) needed.

---

### 2. Coin Change (Minimum Number of Coins)

**Problem Description**:
Given `coins` (denominations) and an `amount`, find the fewest number of coins to make up the `amount`. If impossible, return -1. Infinite supply of each coin.

**Recurrence Relation (for `minCoins(amount)`):**
*   `minCoins(amount) = 1 + min(minCoins(amount - c_1), minCoins(amount - c_2), ..., minCoins(amount - c_k))`
    where `c_i` are the coin denominations.
*   Base cases: `minCoins(0) = 0`, `minCoins(amount < 0) = infinity` (unreachable).

**DP State**: `dp[i]` represents the minimum number of coins needed to make amount `i`.

**DP Table Build-Up (Tabulation Example: coins=[1, 2, 5], amount=11)**:
Initialize `dp` array of size `amount+1` with `Infinity`, `dp[0] = 0`.

```
Amount i: 0   1   2   3   4   5   6   7   8   9   10  11
dp[i]:    0  inf inf inf inf inf inf inf inf inf inf inf
```

Iterate `i` from 1 to `amount`:
For each `i`, iterate through each `coin` in `coins`:
`dp[i] = min(dp[i], dp[i - coin] + 1)` if `i - coin >= 0` and `dp[i - coin]` is not `Infinity`.

*   **i=1**:
    *   `coin=1`: `dp[1] = min(inf, dp[0]+1) = 1`
    `dp: [0, 1, inf, inf, ...]`
*   **i=2**:
    *   `coin=1`: `dp[2] = min(inf, dp[1]+1) = 2`
    *   `coin=2`: `dp[2] = min(2, dp[0]+1) = 1`
    `dp: [0, 1, 1, inf, ...]`
*   ...
*   **i=5**:
    *   `coin=1`: `dp[5] = min(inf, dp[4]+1) = min(inf, 3+1) = 4` (e.g. 1+1+1+1+1)
    *   `coin=2`: `dp[5] = min(4, dp[3]+1) = min(4, 2+1) = 3` (e.g. 1+2+2)
    *   `coin=5`: `dp[5] = min(3, dp[0]+1) = min(3, 0+1) = 1` (e.g. 5)
    `dp: [0, 1, 1, 2, 2, 1, ...]`
*   ...
*   **i=11**:
    *   `coin=1`: `dp[11] = min(inf, dp[10]+1) = min(inf, 2+1) = 3` (e.g. (10->5+5)+1)
    *   `coin=2`: `dp[11] = min(3, dp[9]+1) = min(3, 3+1) = 3` (e.g. (9->5+2+2)+2)
    *   `coin=5`: `dp[11] = min(3, dp[6]+1) = min(3, 2+1) = 3` (e.g. (6->5+1)+5)
    Final `dp[11] = 3`.

**Solution Approaches & Complexities:**

1.  **Recursive (Brute Force)**:
    *   Time: O(amount^num_coins) - Exponential, very slow.
    *   Space: O(amount) - Recursion stack.
2.  **Memoization (Top-Down DP)**:
    *   Time: O(amount * num_coins) - Each subproblem `amount` computed once, each requiring iteration through `num_coins`.
    *   Space: O(amount) - Memoization table + recursion stack.
3.  **Tabulation (Bottom-Up DP)**:
    *   Time: O(amount * num_coins) - Two nested loops.
    *   Space: O(amount) - DP table.

---

### 3. Longest Common Subsequence (LCS)

**Problem Description**:
Given two strings, `text1` and `text2`, find the length of their longest common subsequence.

**Recurrence Relation (for `LCS(i, j)` - length of LCS of `text1[0...i-1]` and `text2[0...j-1]`):**
*   If `text1[i-1] === text2[j-1]` (characters match):
    `LCS(i, j) = 1 + LCS(i-1, j-1)`
*   If `text1[i-1] !== text2[j-1]` (characters don't match):
    `LCS(i, j) = max(LCS(i-1, j), LCS(i, j-1))` (try skipping char from `text1` or `text2`)
*   Base cases: `LCS(i, 0) = 0`, `LCS(0, j) = 0`

**DP State**: `dp[i][j]` represents the length of the LCS of the first `i` characters of `text1` and the first `j` characters of `text2`.

**DP Table Build-Up (Tabulation Example: text1="abcde", text2="ace")**
`m = text1.length = 5`, `n = text2.length = 3`
`dp` table of size `(m+1) x (n+1)` initialized with 0s.

```
      "" a c e (text2)
    ------------------
""  | 0  0 0 0
a   | 0  ? ? ?
b   | 0  ? ? ?
c   | 0  ? ? ?
d   | 0  ? ? ?
e   | 0  ? ? ?
(text1)
```

Fill `dp[i][j]` for `i` from 1 to `m` and `j` from 1 to `n`:
*   If `text1[i-1] === text2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]` (diagonal + 1)
*   Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (max of top and left)

```
      ""  a  c  e
    ------------------
""  | 0   0  0  0
a   | 0   1  1  1   (a == a, dp[1][1] = 1 + dp[0][0] = 1)
b   | 0   1  1  1   (b != a, dp[2][1] = max(dp[1][1], dp[2][0]) = max(1,0) = 1)
c   | 0   1  2  2   (c == c, dp[3][2] = 1 + dp[2][1] = 1+1=2)
d   | 0   1  2  2
e   | 0   1  2  3   (e == e, dp[5][3] = 1 + dp[4][2] = 1+2=3)
```
Result `dp[5][3] = 3`.

**Solution Approaches & Complexities:**

1.  **Recursive (Brute Force)**:
    *   Time: O(2^(m+n)) - Exponential.
    *   Space: O(m+n) - Recursion stack.
2.  **Memoization (Top-Down DP)**:
    *   Time: O(m*n) - Each state computed once.
    *   Space: O(m*n) - Memoization table + recursion stack.
3.  **Tabulation (Bottom-Up DP)**:
    *   Time: O(m*n) - Two nested loops.
    *   Space: O(m*n) - DP table.
    *   (Can be space-optimized to O(min(m,n)) or O(max(m,n)) by only keeping two rows/columns).

---

### 4. 0/1 Knapsack Problem

**Problem Description**:
Given items with `weights` and `values`, and a `capacity` for a knapsack, find the maximum total value of items that can be placed in the knapsack without exceeding capacity. Each item can only be taken once (0 or 1).

**Recurrence Relation (for `knapsack(i, w)` - max value from first `i` items with `w` capacity):**
*   If `weights[i-1] > w` (current item too heavy):
    `knapsack(i, w) = knapsack(i-1, w)` (exclude current item)
*   Else (`weights[i-1] <= w`):
    `knapsack(i, w) = max(`
        `values[i-1] + knapsack(i-1, w - weights[i-1]),` // Include current item
        `knapsack(i-1, w)`                                 // Exclude current item
    `)`
*   Base cases: `knapsack(0, w) = 0`, `knapsack(i, 0) = 0`

**DP State**: `dp[i][w]` represents the maximum value that can be obtained using the first `i` items with a knapsack capacity of `w`.

**DP Table Build-Up (Tabulation Example: weights=[1,2,3], values=[6,10,12], capacity=5)**
`n = 3` items, `W = 5` capacity.
`dp` table of size `(n+1) x (W+1)` initialized with 0s.

```
       0  1  2  3  4  5 (Capacity)
    -------------------
0 Items| 0  0  0  0  0  0
1 Item | 0  ?  ?  ?  ?  ?  (Item 1: weight=1, value=6)
2 Items| 0  ?  ?  ?  ?  ?  (Item 2: weight=2, value=10)
3 Items| 0  ?  ?  ?  ?  ?  (Item 3: weight=3, value=12)
(Items)
```

Fill `dp[i][w]` for `i` from 1 to `n` and `w` from 1 to `W`:
*   If `weights[i-1] > w`: `dp[i][w] = dp[i-1][w]` (take value from cell directly above)
*   Else: `dp[i][w] = max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]])`

```
Item (i) | W | Weight | Value | Capacity (w) ->
         |   |        |       | 0   1   2   3   4   5
---------------------------------------------------------
Base (0) | - | -      | -     | 0   0   0   0   0   0
---------------------------------------------------------
1 (w=1,v=6)| 1 | 6    | 0   6   6   6   6   6
   (i=1) |
      w=1: w[0]=1 <= 1 -> max(dp[0][1], 6+dp[0][0]) = max(0, 6+0) = 6
      w=2: w[0]=1 <= 2 -> max(dp[0][2], 6+dp[0][1]) = max(0, 6+0) = 6
...
---------------------------------------------------------
2 (w=2,v=10)| 2 | 10   | 0   6   10  16  16  16
   (i=2) |
      w=1: w[1]=2 > 1  -> dp[1][1] = 6
      w=2: w[1]=2 <= 2 -> max(dp[1][2], 10+dp[1][0]) = max(6, 10+0) = 10
      w=3: w[1]=2 <= 3 -> max(dp[1][3], 10+dp[1][1]) = max(6, 10+6) = 16
      w=4: w[1]=2 <= 4 -> max(dp[1][4], 10+dp[1][2]) = max(6, 10+10) = 16 (Not 20, dp[1][2] is 6 for 1 item, so 10+6=16) -> Corrected: dp[1][2] is 6
          Original calculations (10+dp[1][2])
          dp[1][2] is max value for 1 item and cap 2, which is item 1 (val 6).
          So 10 + 6 = 16.
      w=5: w[1]=2 <= 5 -> max(dp[1][5], 10+dp[1][3]) = max(6, 10+6) = 16
---------------------------------------------------------
3 (w=3,v=12)| 3 | 12   | 0   6   10  16  18  22
   (i=3) |
      w=1: w[2]=3 > 1  -> dp[2][1] = 6
      w=2: w[2]=3 > 2  -> dp[2][2] = 10
      w=3: w[2]=3 <= 3 -> max(dp[2][3], 12+dp[2][0]) = max(16, 12+0) = 16
      w=4: w[2]=3 <= 4 -> max(dp[2][4], 12+dp[2][1]) = max(16, 12+6) = 18
      w=5: w[2]=3 <= 5 -> max(dp[2][5], 12+dp[2][2]) = max(16, 12+10) = 22
---------------------------------------------------------
```
Result `dp[3][5] = 22`.

**Solution Approaches & Complexities:**

1.  **Recursive (Brute Force)**:
    *   Time: O(2^n) - Exponential.
    *   Space: O(n) - Recursion stack.
2.  **Memoization (Top-Down DP)**:
    *   Time: O(n*W) - Each state computed once.
    *   Space: O(n*W) - Memoization table + recursion stack.
3.  **Tabulation (Bottom-Up DP)**:
    *   Time: O(n*W) - Two nested loops.
    *   Space: O(n*W) - DP table.
    *   (Can be space-optimized to O(W) if only the previous row is needed).

---

## Edge Cases and Gotchas

*   **Empty inputs**: Empty strings (LCS), empty coin arrays (Coin Change), empty item lists (Knapsack). Often result in 0 or -1.
*   **Zero/Negative values**: Target amount 0 (Coin Change -> 0 coins). Negative numbers for Fibonacci (should throw error or define behavior).
*   **Large inputs**: Exponential algorithms will fail/timeout. This is where DP shines.
*   **Integer Overflow**: For very large Fibonacci numbers, standard `number` types might overflow. JavaScript numbers are 64-bit floats, which can represent large integers but precision issues might arise for extremely large numbers (beyond `2^53 - 1`). For interview settings, assume numbers fit, or mention `BigInt` if specific to JS.
*   **`Infinity` handling**: In Coin Change, using `Infinity` as a placeholder for unreachable states is common. Ensure `Infinity + 1` correctly remains `Infinity`.

## Interview Tips and Variations

### General DP Interview Strategy:

1.  **Recognize DP**: Look for optimization problems, counting problems, or problems asking for "maximum/minimum/longest/shortest/number of ways". If a recursive solution recomputes the same subproblems, it's a strong indicator.
2.  **Brute Force/Recursive Solution**: Start with the naive recursive solution. This helps in defining the state and recurrence relation. Don't worry about efficiency at this stage.
3.  **Memoize (Top-Down)**: Add a cache to your recursive solution. This is usually the easiest transition from brute force to DP.
4.  **Tabulate (Bottom-Up)**: Convert your memoized solution to an iterative one. This often involves figuring out the correct order to fill the DP table.
5.  **Space Optimization**: If possible, reduce the space complexity by observing if `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`, etc.
6.  **Walk Through an Example**: Manually trace your DP table with a small example to ensure your recurrence and base cases are correct.
7.  **Complexity Analysis**: Clearly state and justify the time and space complexity for each approach.

### Common DP Patterns:

*   **1D DP**: Problems like Fibonacci, Climbing Stairs, House Robber. `dp[i]` depends on `dp[i-1]`, `dp[i-2]`.
*   **2D DP**: Problems like LCS, Knapsack, Edit Distance, Grid Unique Paths. `dp[i][j]` depends on `dp[i-1][j]`, `dp[i][j-1]`, `dp[i-1][j-1]`.
*   **Interval DP**: Problems where subproblems are defined over an interval (e.g., matrix chain multiplication). `dp[i][j]` depends on `dp[i][k]` and `dp[k+1][j]`.
*   **Subset Sum/Partition**: Problems like Coin Change (number of ways or min coins), Subset Sum, Partition Equal Subset Sum. Often involve a DP table where `dp[i][j]` refers to `i` items and target `j`.

### Follow-up Questions & Variations:

*   **Reconstruct the path/items**: Instead of just the count/value, how would you find the actual coins used (Coin Change) or items taken (Knapsack)? (Requires backtracking using the DP table or storing choices).
*   **Variations of existing problems**:
    *   **Coin Change**: "Number of ways" to make change (different recurrence).
    *   **Knapsack**: Unbounded Knapsack (items can be taken multiple times).
    *   **LCS**: Longest Common Substring (contiguous), Shortest Common Supersequence.
*   **Constraints**: What if `N` is very large, but the values are small? Or vice versa? This might hint at a different DP state or approach.
*   **Time/Space Trade-offs**: Discuss scenarios where one approach (e.g., memoization vs. tabulation) might be preferred, or if space optimization comes at a cost (e.g., not being able to reconstruct path easily).

Mastering Dynamic Programming requires practice. Start with simple problems, understand the core concepts, and gradually tackle more complex ones. The process of identifying the state, recurrence, and base cases is key.

---
**End of `docs/algorithms.md`**