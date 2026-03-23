# Dynamic Programming Visual Diagrams (ASCII Art)

Visualizing the state transitions and dependencies in Dynamic Programming can greatly aid understanding.

---

## 1. Fibonacci Number - Recursive Call Tree

The recursive solution for Fibonacci shows repeated computations (overlapping subproblems).

```
          fib(5)
         /      \
      fib(4)   fib(3)
     /    \    /    \
  fib(3) fib(2) fib(2) fib(1)
 /   \   /   \   /   \
fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)
/   \
fib(1) fib(0)
```
- `fib(3)` is computed twice.
- `fib(2)` is computed three times.
- `fib(1)` and `fib(0)` are computed even more times.

With **Memoization**, each unique `fib(k)` is computed only once, and its result is stored. When `fib(3)` is called a second time, it retrieves the stored result instead of recomputing its entire subtree.

With **Tabulation**, we fill an array from left to right:
`dp = [0, 1, 1, 2, 3, 5, ...]`
`dp[0] = 0`
`dp[1] = 1`
`dp[2] = dp[1] + dp[0] = 1 + 0 = 1`
`dp[3] = dp[2] + dp[1] = 1 + 1 = 2`
`dp[4] = dp[3] + dp[2] = 2 + 1 = 3`
etc.

---

## 3. Longest Common Subsequence (LCS) - DP Table Example

Let `text1 = "ACE"`, `text2 = "ABCDE"`.
`m = text1.length = 3`, `n = text2.length = 5`.
`dp` table of size `(m+1) x (n+1) = 4 x 6`.

`dp[i][j]` stores LCS of `text1[0...i-1]` and `text2[0...j-1]`.

```
        "" A B C D E  (text2)
     "" [0][0][0][0][0][0]
     A  [0][1][1][1][1][1]
(text1)C  [0][1][1][2][2][2]
     E  [0][1][1][2][2][3]
```

**How cells are filled:**

*   **Base cases**: First row and first column are all `0`.
*   `dp[1][1]` (A vs A): `text1[0] === text2[0]` ('A' === 'A'). Match!
    `dp[1][1] = 1 + dp[0][0] = 1 + 0 = 1`.
*   `dp[1][2]` (A vs AB): `text1[0] !== text2[1]` ('A' !== 'B'). No match.
    `dp[1][2] = max(dp[0][2], dp[1][1]) = max(0, 1) = 1`. (Take max of cell above, or cell to the left)
*   `dp[2][3]` (AC vs ABC): `text1[1] === text2[2]` ('C' === 'C'). Match!
    `dp[2][3] = 1 + dp[1][2] = 1 + 1 = 2`. (LCS of "A" and "AB" was 1. Add 1 for 'C')
*   `dp[3][5]` (ACE vs ABCDE): `text1[2] === text2[4]` ('E' === 'E'). Match!
    `dp[3][5] = 1 + dp[2][4] = 1 + 2 = 3`. (LCS of "AC" and "ABCD" was 2. Add 1 for 'E')

Final answer `dp[3][5] = 3`. The LCS is "ACE".

---

## 4. 0/1 Knapsack Problem - DP Table Example

`weights = [10, 20, 30]`, `values = [60, 100, 120]`, `capacity = 50`.
`n = 3`, `W = 50`.
`dp` table of size `(n+1) x (W+1) = 4 x 51`.
`dp[i][w]` stores max value using first `i` items with capacity `w`.

`item i-1: (weight, value)`

```
  Capacity -> 0  ... 10  ... 20  ... 30  ... 40  ... 50
Items   [0]  [0]  ... [0]  ... [0]  ... [0]  ... [0]  ... [0]  (Base case: 0 items)
----------------------------------------------------------------------------------
Item 1: (10, 60)
[1]  [0]  ... [60] ... [60] ... [60] ... [60] ... [60]  (If capacity >= 10, take item 1)
----------------------------------------------------------------------------------
Item 2: (20, 100)
[2]  [0]  ... [60] ... [100] ... [160] ... [160] ... [160] (If capacity >= 20, take item 2)
                                                (cap 30: max(dp[1][30], 100 + dp[1][10]) = max(60, 100+60) = 160)
----------------------------------------------------------------------------------
Item 3: (30, 120)
[3]  [0]  ... [60] ... [100] ... [160] ... [180] ... [220] (If capacity >= 30, take item 3)
                                                (cap 40: max(dp[2][40], 120 + dp[2][10]) = max(160, 120+60) = 180)
                                                (cap 50: max(dp[2][50], 120 + dp[2][20]) = max(160, 120+100) = 220)
```

**How cells are filled (e.g., `dp[3][50]`):**

*   **Current item (Item 3):** `weights[2] = 30`, `values[2] = 120`. Current capacity `w = 50`.
*   `currentWeight (30) <= w (50)` is true.
*   **Option 1 (Take Item 3):**
    `values[2] + dp[3-1][50 - weights[2]] = 120 + dp[2][50-30] = 120 + dp[2][20]`.
    From table `dp[2][20] = 100`. So, `120 + 100 = 220`.
*   **Option 2 (Skip Item 3):**
    `dp[3-1][50] = dp[2][50]`.
    From table `dp[2][50] = 160`.
*   `dp[3][50] = Math.max(220, 160) = 220`.

Final answer `dp[3][50] = 220`.

---
```