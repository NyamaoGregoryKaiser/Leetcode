```markdown
# DIAGRAMS.md - Visual DP Table Examples (ASCII Art)

This document provides ASCII art diagrams to help visualize how the DP tables are filled for some of the classic problems. Understanding the table filling process is crucial for grasping the bottom-up iterative DP approach.

---

## 1. Longest Common Subsequence (LCS)

**Example:**
`S1 = "ABCBDAB"` (m=7)
`S2 = "BDCABA"` (n=6)

Let's trace the iterative DP table `dp[i][j]`, where `i` corresponds to `S1` and `j` to `S2`.
`dp[i][j]` = length of LCS of `S1[0...i-1]` and `S2[0...j-1]`.

```
        "" B D C A B A
      +-----------------
""  0 | 0 0 0 0 0 0 0
A   1 | 0 0 0 0 1 1 1  <- (S1[0]=A, S2[3]=A) match, 1 + dp[0][3] = 1+0=1
B   2 | 0 1 1 1 1 2 2  <- (S1[1]=B, S2[0]=B) match, 1 + dp[1][0] = 1+0=1. (S1[1]=B, S2[4]=B) match, 1 + dp[1][4] = 1+1=2
C   3 | 0 1 1 2 2 2 2  <- (S1[2]=C, S2[2]=C) match, 1 + dp[2][2] = 1+1=2
B   4 | 0 1 1 2 2 3 3  <- (S1[3]=B, S2[0]=B) match, 1+dp[3][0]=1+0=1. (S1[3]=B, S2[4]=B) match, 1+dp[3][4]=1+2=3
D   5 | 0 1 2 2 2 3 3  <- (S1[4]=D, S2[1]=D) match, 1+dp[4][1]=1+1=2
A   6 | 0 1 2 2 3 3 4  <- (S1[5]=A, S2[3]=A) match, 1+dp[5][3]=1+2=3. (S1[5]=A, S2[5]=A) match, 1+dp[5][5]=1+3=4
B   7 | 0 1 2 2 3 4 4  <- (S1[6]=B, S2[0]=B) match, 1+dp[6][0]=1+0=1. (S1[6]=B, S2[4]=B) match, 1+dp[6][4]=1+3=4
```

**Final LCS Length:** `dp[7][6] = 4`.
Possible LCS strings: "BCBA", "BDAB". The reconstruction algorithm will pick one (e.g., "BCBA").

**Reconstruction Example (from `dp[7][6]`):**
`i=7, j=6` (`S1[6]=B`, `S2[5]=A`) -> Mismatch. `dp[6][6]=4`, `dp[7][5]=4`. `dp[6][6]` (up) is not greater than `dp[7][5]` (left), so we go left. `j=5`.
`i=7, j=5` (`S1[6]=B`, `S2[4]=B`) -> Match! `LCS = B`. `i=6, j=4`.
`i=6, j=4` (`S1[5]=A`, `S2[3]=A`) -> Match! `LCS = AB`. `i=5, j=3`.
`i=5, j=3` (`S1[4]=D`, `S2[2]=C`) -> Mismatch. `dp[4][3]=2`, `dp[5][2]=2`. Go left. `j=2`.
`i=5, j=2` (`S1[4]=D`, `S2[1]=D`) -> Match! `LCS = DAB`. `i=4, j=1`.
`i=4, j=1` (`S1[3]=B`, `S2[0]=B`) -> Match! `LCS = BDAB`. `i=3, j=0`.
`i=3, j=0` -> Base case. Stop.

Reversed LCS: "BDAB".

---

## 2. 0/1 Knapsack Problem

**Example:**
`N=3` items:
*   Item 1: `(weight=10, value=60)`
*   Item 2: `(weight=20, value=100)`
*   Item 3: `(weight=30, value=120)`
`Capacity W=50`

`dp[i][w]` = maximum value with first `i` items and capacity `w`.

```
        Capacity (w)
        0  10 20 30 40 50
    +---------------------
0 items | 0  0  0  0  0  0
    +---------------------
1 item  | 0 60 60 60 60 60  <- Item 1 (10, 60).
(w=10,v=60)   (dp[1][10] = max(dp[0][10], 60+dp[0][0]) = max(0, 60) = 60)
              (dp[1][20] = max(dp[0][20], 60+dp[0][10]) = max(0, 60) = 60)

    +---------------------
2 items | 0 60 100 160 160 160 <- Item 2 (20, 100).
(w=20,v=100)  (dp[2][20] = max(dp[1][20], 100+dp[1][0]) = max(60, 100) = 100)
              (dp[2][30] = max(dp[1][30], 100+dp[1][10]) = max(60, 100+60) = 160)

    +---------------------
3 items | 0 60 100 160 180 220 <- Item 3 (30, 120).
(w=30,v=120)  (dp[3][30] = max(dp[2][30], 120+dp[2][0]) = max(160, 120) = 160)
              (dp[3][40] = max(dp[2][40], 120+dp[2][10]) = max(160, 120+60) = 180)
              (dp[3][50] = max(dp[2][50], 120+dp[2][20]) = max(160, 120+100) = 220)
```

**Final Max Value:** `dp[3][50] = 220`.

---

## 3. Coin Change Problem (Minimum Coins)

**Example:**
`coins = {1, 2, 5}`
`amount = 11`

`dp[i]` = minimum coins to make amount `i`.
Initialize `dp[0]=0`, `dp[i]=infinity` for `i>0`.

`dp` array: `[0, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf]`

**Process coin = 1:**
`dp` values:
`dp[0]=0`
`dp[1]=min(inf, 1+dp[0]) = 1`
`dp[2]=min(inf, 1+dp[1]) = 2`
...
`dp[11]=min(inf, 1+dp[10]) = 11`
After coin 1: `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]`

**Process coin = 2:**
`dp` values:
`dp[0]=0`
`dp[1]=1` (no change, `dp[1-2]` is out of bounds for coin 2)
`dp[2]=min(dp[2], 1+dp[0]) = min(2, 1+0) = 1` (Using two 1s vs one 2: 2 vs 1)
`dp[3]=min(dp[3], 1+dp[1]) = min(3, 1+1) = 2` (Using three 1s vs one 2+one 1: 3 vs 2)
`dp[4]=min(dp[4], 1+dp[2]) = min(4, 1+1) = 2` (Using four 1s vs two 2s: 4 vs 2)
...
`dp[11]=min(dp[11], 1+dp[9]) = min(11, 1+5) = 6` (From `dp[9]` which uses nine 1s or 2s)
After coin 2: `[0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6]`

**Process coin = 5:**
`dp` values:
`dp[0]=0`
...
`dp[4]=2`
`dp[5]=min(dp[5], 1+dp[0]) = min(3, 1+0) = 1` (Using one 5)
`dp[6]=min(dp[6], 1+dp[1]) = min(3, 1+1) = 2` (Using one 5 + one 1)
...
`dp[10]=min(dp[10], 1+dp[5]) = min(5, 1+1) = 2` (Using two 5s)
`dp[11]=min(dp[11], 1+dp[6]) = min(6, 1+2) = 3` (Using two 5s + one 1)
After coin 5: `[0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3]`

**Final Minimum Coins:** `dp[11] = 3`.

---

## 4. Coin Change Problem (Number of Ways)

**Example:**
`coins = {1, 2, 5}`
`amount = 5`

`dp[i]` = number of ways to make amount `i`.
Initialize `dp[0]=1`, `dp[i]=0` for `i>0`.

`dp` array: `[1, 0, 0, 0, 0, 0]`

**Process coin = 1:**
`dp` values:
`dp[0]=1`
`dp[1]+=dp[0] = 0+1=1`
`dp[2]+=dp[1] = 0+1=1`
`dp[3]+=dp[2] = 0+1=1`
`dp[4]+=dp[3] = 0+1=1`
`dp[5]+=dp[4] = 0+1=1`
After coin 1: `[1, 1, 1, 1, 1, 1]` (All amounts can be made in 1 way using only 1s)

**Process coin = 2:**
`dp` values (starting `j` from `coin`):
`dp[0]=1`
`dp[1]=1`
`dp[2]+=dp[0] = 1+1 = 2` (1,1 ; 2)
`dp[3]+=dp[1] = 1+1 = 2` (1,1,1 ; 1,2)
`dp[4]+=dp[2] = 1+2 = 3` (1,1,1,1 ; 1,1,2 ; 2,2)
`dp[5]+=dp[3] = 1+2 = 3` (1,1,1,1,1 ; 1,1,1,2 ; 1,2,2)
After coin 2: `[1, 1, 2, 2, 3, 3]`

**Process coin = 5:**
`dp` values (starting `j` from `coin`):
`dp[0]=1`
...
`dp[4]=3`
`dp[5]+=dp[0] = 3+1 = 4` (Previous 3 ways: (1,1,1,1,1), (1,1,1,2), (1,2,2) PLUS new way (5))
After coin 5: `[1, 1, 2, 2, 3, 4]`

**Final Number of Ways:** `dp[5] = 4`.
```