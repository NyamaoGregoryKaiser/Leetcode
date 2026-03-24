# Dynamic Programming Visual Diagrams (ASCII Art)

Visualizing the state transitions and dependencies in Dynamic Programming can be extremely helpful. Here are some ASCII art diagrams for common DP patterns.

---

## 1. Fibonacci Sequence

**Problem:** `F(n) = F(n-1) + F(n-2)`

### Recursive Call Tree (Brute Force)

This shows how `F(5)` leads to redundant computations of `F(3)`, `F(2)`, `F(1)`, `F(0)`.

```
        F(5)
       /    \
     F(4)    F(3)
    /   \   /   \
  F(3)  F(2) F(2)  F(1)
 /   \ /  \ /  \
F(2) F(1) F(1) F(0) F(1) F(0)
/  \
F(1) F(0)
```

### Memoization / Tabulation Dependency

Each `F(i)` only depends on `F(i-1)` and `F(i-2)`.

```
dp[0] = 0
dp[1] = 1
dp[2] = dp[1] + dp[0]  (1 + 0 = 1)
dp[3] = dp[2] + dp[1]  (1 + 1 = 2)
dp[4] = dp[3] + dp[2]  (2 + 1 = 3)
dp[5] = dp[4] + dp[3]  (3 + 2 = 5)

Table:
Index: 0  1  2  3  4  5 ... n
Value: 0  1  1  2  3  5 ... F(n)

Dependencies:
dp[i] <--- dp[i-1]
  ^
  |
  +-- dp[i-2]
```

### Space-Optimized Fibonacci

Only two previous values are needed at any time.

```
i=0: prev2 = 0, prev1 = 1  (F(0), F(1))
i=2: current = prev1 + prev2 = 1 + 0 = 1 (F(2))
     prev2 = prev1 (1)
     prev1 = current (1)
i=3: current = prev1 + prev2 = 1 + 1 = 2 (F(3))
     prev2 = prev1 (1)
     prev1 = current (2)
i=4: current = prev1 + prev2 = 2 + 1 = 3 (F(4))
     prev2 = prev1 (2)
     prev1 = current (3)

... and so on.
```

---

## 2. Coin Change (Minimum Coins)

**Problem:** `dp[amount] = min(dp[amount - coin_i] + 1)`

### DP Table Visualization (Tabulation)

`dp[i]` = min coins for amount `i`.
Coins: `[1, 2, 5]`, Amount: `11`

```
dp table (size amount + 1):
Index:  0  1  2  3  4  5  6  7  8  9 10 11
Init:   0  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞

Coin 1:
        0  1  2  3  4  5  6  7  8  9 10 11  (dp[i] = dp[i-1]+1)

Coin 2: (For each i, dp[i] = min(dp[i], dp[i-2]+1))
        0  1  1  2  2  3  3  4  4  5  5  6  (dp[2]=min(dp[2],dp[0]+1)=1, dp[3]=min(dp[3],dp[1]+1)=2, etc.)

Coin 5: (For each i, dp[i] = min(dp[i], dp[i-5]+1))
        0  1  1  2  2  1  2  2  3  3  2  3  (dp[5]=min(dp[5],dp[0]+1)=1, dp[6]=min(dp[6],dp[1]+1)=2, dp[7]=min(dp[7],dp[2]+1)=2, dp[10]=min(dp[10],dp[5]+1)=2, dp[11]=min(dp[11],dp[6]+1)=3)

Result: dp[11] = 3
```

---

## 3. Longest Common Subsequence (LCS)

**Problem:** `LCS(text1, text2)`

### DP Table Visualization (Tabulation)

`dp[i][j]` = LCS of `text1[0...i-1]` and `text2[0...j-1]`
`text1 = "ACE"`, `text2 = "ABCDE"`

```
       "" A B C D E
    "" 0  0 0 0 0 0
    A  0  1 1 1 1 1
    C  0  1 1 2 2 2
    E  0  1 1 2 2 3

Example Calculation (dp[3][5] for "ACE", "ABCDE"):
text1[2] = 'E', text2[4] = 'E'. They match!
dp[3][5] = 1 + dp[2][4] (LCS("AC", "ABCD"))
         = 1 + 2 = 3

Example Calculation (dp[2][3] for "AC", "ABC"):
text1[1] = 'C', text2[2] = 'C'. They match!
dp[2][3] = 1 + dp[1][2] (LCS("A", "AB"))
         = 1 + 1 = 2

Example Calculation (dp[2][4] for "AC", "ABCD"):
text1[1] = 'C', text2[3] = 'D'. They don't match!
dp[2][4] = max(dp[1][4], dp[2][3])
         = max(LCS("A", "ABCD"), LCS("AC", "ABC"))
         = max(1, 2) = 2
```

### Dependencies (2D DP)

```
dp[i][j] <--- dp[i-1][j-1] (if match)
  ^
  |
  +--- dp[i-1][j] (if no match, exclude text1[i-1])
  |
  +--- dp[i][j-1] (if no match, exclude text2[j-1])
```

---

## 4. 0/1 Knapsack Problem

**Problem:** `dp[i][j]` = max value using first `i` items with capacity `j`.

### DP Table Visualization (Tabulation)

Weights: `[10, 20, 30]`, Values: `[60, 100, 120]`, Capacity `W = 50`

```
      Capacity (j) ->
      0  10 20 30 40 50
Item i
(val,w)
"" (0,0) 0  0  0  0  0  0   (Base case: no items or no capacity)
(60,10) 0 60 60 60 60 60   (If item 1 (60,10) is chosen, max capacity 10 is 60. max capacity 50 is 60)
(100,20)0 60 100 160 160 160  (For cap 30: max(dp[prev][30], 100+dp[prev][30-20]) = max(60, 100+60) = 160)
(120,30)0 60 100 160 180 220  (For cap 50: max(dp[prev][50], 120+dp[prev][50-30]) = max(160, 120+100) = 220)

Result: dp[3][50] = 220
```

### Dependencies (2D DP)

```
dp[i][j] <--- dp[i-1][j]                  (Exclude current item i)
  ^
  |
  +--- dp[i-1][j - weight[i-1]] + value[i-1] (Include current item i)
```

### Space-Optimized Knapsack (1D array)

Iterate `j` from `W` down to `weight[i-1]`.
`dp[j]` for current `i` depends on `dp[j]` (from previous `i-1`) and `dp[j - weight[i-1]]` (from previous `i-1`).
The reverse loop order ensures `dp[j - weight[i-1]]` is from the previous `i-1` row.

```
Weights: [10, 20, 30], Values: [60, 100, 120], Capacity W = 50

dp table (size W+1):
Init: [0,0,0,...,0]

Item (60,10): (j from 50 down to 10)
dp[10]=max(dp[10], 60+dp[0])=60
dp[20]=max(dp[20], 60+dp[10])=60
...
dp[50]=max(dp[50], 60+dp[40])=60
Result after item 1: [0,0,...,60,60,60,60,60,60,...] (all up to 10 are 0, from 10 to 50 are 60)

Item (100,20): (j from 50 down to 20)
dp[20]=max(dp[20], 100+dp[0])=max(60, 100+0)=100
dp[30]=max(dp[30], 100+dp[10])=max(60, 100+60)=160
dp[40]=max(dp[40], 100+dp[20])=max(60, 100+60)=160
dp[50]=max(dp[50], 100+dp[30])=max(60, 100+60)=160
Result after item 2: [0,0,...,60(for 10-19),100(for 20),160(for 30),160(for 40),160(for 50)]

Item (120,30): (j from 50 down to 30)
dp[30]=max(dp[30], 120+dp[0])=max(160, 120+0)=160
dp[40]=max(dp[40], 120+dp[10])=max(160, 120+60)=180
dp[50]=max(dp[50], 120+dp[20])=max(160, 120+100)=220
Result after item 3: ... dp[50]=220

Final Result: dp[50] = 220
```

---

## 5. House Robber

**Problem:** `dp[i]` = max money robbed up to house `i`.

### DP Table Visualization (Tabulation)

`nums = [2, 7, 9, 3, 1]`

```
dp table (size N):
Index:  0  1  2  3  4
nums:   2  7  9  3  1
Init:

i=0: dp[0] = nums[0] = 2

i=1: dp[1] = max(nums[0], nums[1]) = max(2, 7) = 7

i=2: dp[2] = max(dp[1], nums[2] + dp[0])
         = max(7, 9 + 2) = max(7, 11) = 11

i=3: dp[3] = max(dp[2], nums[3] + dp[1])
         = max(11, 3 + 7) = max(11, 10) = 11

i=4: dp[4] = max(dp[3], nums[4] + dp[2])
         = max(11, 1 + 11) = max(11, 12) = 12

Result: dp[4] = 12
```

### Dependencies (1D DP)

```
dp[i] <--- dp[i-1] (Don't rob current house i)
  ^
  |
  +--- dp[i-2] + nums[i] (Rob current house i)
```

### Space-Optimized House Robber

Only two previous values (`prev1`, `prev2`) are needed.

```
nums = [2, 7, 9, 3, 1]

Init:
prev2 = 0  (represents dp[-1])
prev1 = nums[0] = 2 (represents dp[0])

i=1 (house 7):
  current = max(prev1, nums[1] + prev2) = max(2, 7 + 0) = 7
  prev2 = prev1 (2)
  prev1 = current (7)

i=2 (house 9):
  current = max(prev1, nums[2] + prev2) = max(7, 9 + 2) = 11
  prev2 = prev1 (7)
  prev1 = current (11)

i=3 (house 3):
  current = max(prev1, nums[3] + prev2) = max(11, 3 + 7) = 11
  prev2 = prev1 (11)
  prev1 = current (11)

i=4 (house 1):
  current = max(prev1, nums[4] + prev2) = max(11, 1 + 11) = 12
  prev2 = prev1 (11)
  prev1 = current (12)

Final Result: prev1 = 12
```