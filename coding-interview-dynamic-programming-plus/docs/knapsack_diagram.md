# 0/1 Knapsack Problem Diagrams

## Problem Description Recap:

Given weights `w[]` and values `v[]` of `n` items, put these items in a knapsack of capacity `W`
to get the maximum total value. Each item can either be taken or not taken (0/1 choice).

Example:
Items:
1.  Weight: 1, Value: 6
2.  Weight: 2, Value: 10
3.  Weight: 3, Value: 12
Knapsack Capacity (W): 5

## 1. Brute Force Recursion Tree (Example with W=3, items (w:1,v:6), (w:2,v:10))

Let `knapsack(items_count, current_capacity)` be the function.

```
                  knapsack(2, 3)  (items: (1,6), (2,10), Capacity: 3)
                 /              \
    (Exclude Item 2)             (Include Item 2 - (w:2,v:10))
    knapsack(1, 3)               val[1] + knapsack(1, 3-2=1)
   (items: (1,6), Cap: 3)       10 + knapsack(1, 1)
   /          \                       /          \
(Exclude Item 1)  (Include Item 1)   (Exclude Item 1) (Include Item 1)
knapsack(0, 3)    val[0] + knapsack(0, 3-1=2)  knapsack(0, 1)    val[0] + knapsack(0, 1-1=0)
  |                 |                          |                  |
  0                 6 + knapsack(0,2)=0        0                  6 + knapsack(0,0)=0
  Result: 6         Result: 6                 Result: 0          Result: 6

knapsack(1,3) = max(knapsack(0,3), 6 + knapsack(0,2)) = max(0, 6) = 6
knapsack(1,1) = max(knapsack(0,1), 6 + knapsack(0,0)) = max(0, 6) = 6

knapsack(2,3) = max(knapsack(1,3), 10 + knapsack(1,1)) = max(6, 10 + 6) = max(6, 16) = 16

Optimal value for W=3: 16 (Take item 1 (1,6) and item 2 (2,10))
Wait, 1+2=3, 6+10=16. This works.
The tree shows significant overlapping subproblems like `knapsack(0,X)`.
Time complexity: O(2^n).
```

## 2. Tabulation (Bottom-Up DP) Table (with example above)

`dp[i][w]` represents the maximum value using the first `i` items with capacity `w`.
`i` refers to `i-1` in the 0-indexed `weights` and `values` arrays.

Items:
1.  `i=1`: w=1, v=6
2.  `i=2`: w=2, v=10
3.  `i=3`: w=3, v=12
Capacity (W): 5

`dp` table size: `(n+1) x (W+1)` => `(3+1) x (5+1)` => `4 x 6`

Initialize `dp` table with 0s:

```
dp array (rows = item index, cols = capacity):
        Capacity (w) ->
Items | 0 | 1 | 2 | 3 | 4 | 5 |
------|---|---|---|---|---|---|
i=0   | 0 | 0 | 0 | 0 | 0 | 0 |  (Base case: 0 items, 0 value)
------|---|---|---|---|---|---|
i=1   | 0 |   |   |   |   |   |
------|---|---|---|---|---|---|
i=2   | 0 |   |   |   |   |   |
------|---|---|---|---|---|---|
i=3   | 0 |   |   |   |   |   |
```

Filling the table:

**Item 1 (w=1, v=6) - Row `i=1`**
Iterate `w` from 1 to 5:
*   `w=0`: `dp[1][0] = 0` (base)
*   `w=1`: `w >= weights[0]` (1 >= 1). `dp[1][1] = max( values[0] + dp[0][1-1], dp[0][1] )`
    `dp[1][1] = max( 6 + dp[0][0], dp[0][1] ) = max( 6 + 0, 0 ) = 6`
*   `w=2`: `w >= weights[0]` (2 >= 1). `dp[1][2] = max( values[0] + dp[0][2-1], dp[0][2] )`
    `dp[1][2] = max( 6 + dp[0][1], dp[0][2] ) = max( 6 + 0, 0 ) = 6`
*   ... and so on for `w=3,4,5`. All will be 6.

```
        Capacity (w) ->
Items | 0 | 1 | 2 | 3 | 4 | 5 |
------|---|---|---|---|---|---|
i=0   | 0 | 0 | 0 | 0 | 0 | 0 |
------|---|---|---|---|---|---|
i=1   | 0 | 6 | 6 | 6 | 6 | 6 | (After considering item 1)
------|---|---|---|---|---|---|
i=2   | 0 |   |   |   |   |   |
------|---|---|---|---|---|---|
i=3   | 0 |   |   |   |   |   |
```

**Item 2 (w=2, v=10) - Row `i=2`**
Iterate `w` from 1 to 5:
*   `w=1`: `w < weights[1]` (1 < 2). `dp[2][1] = dp[1][1] = 6`
*   `w=2`: `w >= weights[1]` (2 >= 2). `dp[2][2] = max( values[1] + dp[1][2-2], dp[1][2] )`
    `dp[2][2] = max( 10 + dp[1][0], dp[1][2] ) = max( 10 + 0, 6 ) = 10`
*   `w=3`: `w >= weights[1]` (3 >= 2). `dp[2][3] = max( values[1] + dp[1][3-2], dp[1][3] )`
    `dp[2][3] = max( 10 + dp[1][1], dp[1][3] ) = max( 10 + 6, 6 ) = 16` (Take item 1 (1,6) & item 2 (2,10))
*   `w=4`: `w >= weights[1]` (4 >= 2). `dp[2][4] = max( values[1] + dp[1][4-2], dp[1][4] )`
    `dp[2][4] = max( 10 + dp[1][2], dp[1][4] ) = max( 10 + 6, 6 ) = 16`
*   `w=5`: `w >= weights[1]` (5 >= 2). `dp[2][5] = max( values[1] + dp[1][5-2], dp[1][5] )`
    `dp[2][5] = max( 10 + dp[1][3], dp[1][5] ) = max( 10 + 6, 6 ) = 16`

```
        Capacity (w) ->
Items | 0 | 1 | 2 | 3 | 4 | 5 |
------|---|---|---|---|---|---|
i=0   | 0 | 0 | 0 | 0 | 0 | 0 |
------|---|---|---|---|---|---|
i=1   | 0 | 6 | 6 | 6 | 6 | 6 |
------|---|---|---|---|---|---|
i=2   | 0 | 6 | 10| 16| 16| 16| (After considering item 2)
------|---|---|---|---|---|---|
i=3   | 0 |   |   |   |   |   |
```

**Item 3 (w=3, v=12) - Row `i=3`**
Iterate `w` from 1 to 5:
*   `w=1`: `w < weights[2]` (1 < 3). `dp[3][1] = dp[2][1] = 6`
*   `w=2`: `w < weights[2]` (2 < 3). `dp[3][2] = dp[2][2] = 10`
*   `w=3`: `w >= weights[2]` (3 >= 3). `dp[3][3] = max( values[2] + dp[2][3-3], dp[2][3] )`
    `dp[3][3] = max( 12 + dp[2][0], dp[2][3] ) = max( 12 + 0, 16 ) = 16`
*   `w=4`: `w >= weights[2]` (4 >= 3). `dp[3][4] = max( values[2] + dp[2][4-3], dp[2][4] )`
    `dp[3][4] = max( 12 + dp[2][1], dp[2][4] ) = max( 12 + 6, 16 ) = 18` (Take item 1 (1,6) & item 3 (3,12))
*   `w=5`: `w >= weights[2]` (5 >= 3). `dp[3][5] = max( values[2] + dp[2][5-3], dp[2][5] )`
    `dp[3][5] = max( 12 + dp[2][2], dp[2][5] ) = max( 12 + 10, 16 ) = 22` (Take item 2 (2,10) & item 3 (3,12))

```
        Capacity (w) ->
Items | 0 | 1 | 2 | 3 | 4 | 5 |
------|---|---|---|---|---|---|
i=0   | 0 | 0 | 0 | 0 | 0 | 0 |
------|---|---|---|---|---|---|
i=1   | 0 | 6 | 6 | 6 | 6 | 6 |
------|---|---|---|---|---|---|
i=2   | 0 | 6 | 10| 16| 16| 16|
------|---|---|---|---|---|---|
i=3   | 0 | 6 | 10| 16| 18| 22| (After considering item 3)
```

Final Result: `dp[3][5] = 22`.

Time Complexity: O(n*W). Space Complexity: O(n*W).

## 3. Tabulation with Space Optimization (1D DP Array)

We observe that `dp[i][w]` only depends on `dp[i-1][...]`. This means we can reduce the space complexity
to O(W) by using a single 1D array.

The trick is to iterate `w` from `W` down to `weights[i-1]` (current item's weight). This ensures
that `dp[w - weights[i-1]]` refers to the value from the *previous* item's calculation, not the current one.
If we iterate `w` upwards, `dp[w - weights[i-1]]` would already be updated for the *current* item,
leading to multiple uses of the same item (unbounded knapsack), which is incorrect for 0/1 Knapsack.

`dp` array size: `(W+1)` => `(5+1)` => `6`

Initialize `dp` table with 0s:
```
dp array (capacity):
Index: | 0 | 1 | 2 | 3 | 4 | 5 |
-------|---|---|---|---|---|---|
Value: | 0 | 0 | 0 | 0 | 0 | 0 |  (Initial: max value for capacity w, using no items)
```

Filling the table:

**Item 1 (w=1, v=6)**
Iterate `w` from 5 down to `weights[0]` (1):
*   `w=5`: `dp[5] = max(dp[5], 6 + dp[5-1]) = max(0, 6 + 0) = 6`
*   `w=4`: `dp[4] = max(dp[4], 6 + dp[4-1]) = max(0, 6 + 0) = 6`
*   `w=3`: `dp[3] = max(dp[3], 6 + dp[3-1]) = max(0, 6 + 0) = 6`
*   `w=2`: `dp[2] = max(dp[2], 6 + dp[2-1]) = max(0, 6 + 0) = 6`
*   `w=1`: `dp[1] = max(dp[1], 6 + dp[1-1]) = max(0, 6 + 0) = 6`

```
dp array:
Index: | 0 | 1 | 2 | 3 | 4 | 5 |
-------|---|---|---|---|---|---|
Value: | 0 | 6 | 6 | 6 | 6 | 6 | (After considering item 1)
```

**Item 2 (w=2, v=10)**
Iterate `w` from 5 down to `weights[1]` (2):
*   `w=5`: `dp[5] = max(dp[5], 10 + dp[5-2]) = max(6, 10 + dp[3]) = max(6, 10 + 6) = 16`
*   `w=4`: `dp[4] = max(dp[4], 10 + dp[4-2]) = max(6, 10 + dp[2]) = max(6, 10 + 6) = 16`
*   `w=3`: `dp[3] = max(dp[3], 10 + dp[3-2]) = max(6, 10 + dp[1]) = max(6, 10 + 6) = 16`
*   `w=2`: `dp[2] = max(dp[2], 10 + dp[2-2]) = max(6, 10 + dp[0]) = max(6, 10 + 0) = 10`

```
dp array:
Index: | 0 | 1 | 2 | 3 | 4 | 5 |
-------|---|---|---|---|---|---|
Value: | 0 | 6 | 10| 16| 16| 16| (After considering item 2)
```

**Item 3 (w=3, v=12)**
Iterate `w` from 5 down to `weights[2]` (3):
*   `w=5`: `dp[5] = max(dp[5], 12 + dp[5-3]) = max(16, 12 + dp[2]) = max(16, 12 + 10) = 22`
*   `w=4`: `dp[4] = max(dp[4], 12 + dp[4-3]) = max(16, 12 + dp[1]) = max(16, 12 + 6) = 18`
*   `w=3`: `dp[3] = max(dp[3], 12 + dp[3-3]) = max(16, 12 + dp[0]) = max(16, 12 + 0) = 16`

```
dp array:
Index: | 0 | 1 | 2 | 3 | 4 | 5 |
-------|---|---|---|---|---|---|
Value: | 0 | 6 | 10| 16| 18| 22| (After considering item 3)
```

Final Result: `dp[5] = 22`.

Time Complexity: O(n*W). Space Complexity: O(W).