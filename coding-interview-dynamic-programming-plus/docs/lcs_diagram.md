# Longest Common Subsequence (LCS) Diagrams

## Problem Description Recap:

Given two strings `text1` and `text2`, return the length of their longest common subsequence.
A subsequence maintains relative order.

Example:
`text1 = "abcde"`
`text2 = "ace"`
Expected LCS length: 3 ("ace")

## 1. Tabulation (Bottom-Up DP) Table

`dp[i][j]` represents the length of the LCS of `text1[0...i-1]` and `text2[0...j-1]`.
The `dp` table will have `(m+1)` rows and `(n+1)` columns, where `m = text1.length` and `n = text2.length`.

`text1 = "abcde"` (m=5)
`text2 = "ace"`   (n=3)

`dp` table size: `(5+1) x (3+1)` => `6 x 4`

Initialize `dp` table with 0s:

```
        "" a c e (text2)
      -----------------
""    | 0 | 0 | 0 | 0 |
  a   | 0 |   |   |   |
  b   | 0 |   |   |   |
  c   | 0 |   |   |   |
  d   | 0 |   |   |   |
  e   | 0 |   |   |   |
(text1)
```

Filling the table:

`dp[i][j]` is determined by comparing `text1[i-1]` and `text2[j-1]`.
*   If `text1[i-1] === text2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]` (diagonal)
*   Else: `dp[i][j] = max( dp[i-1][j], dp[i][j-1] )` (top or left)

Let's fill the table step-by-step:

### Row `i=1` (comparing `text1[0]` = 'a')

*   `j=1` (`text2[0]` = 'a'): `text1[0] == text2[0]` ('a'=='a'). `dp[1][1] = 1 + dp[0][0] = 1 + 0 = 1`
*   `j=2` (`text2[1]` = 'c'): `text1[0] != text2[1]` ('a'!='c'). `dp[1][2] = max(dp[0][2], dp[1][1]) = max(0, 1) = 1`
*   `j=3` (`text2[2]` = 'e'): `text1[0] != text2[2]` ('a'!='e'). `dp[1][3] = max(dp[0][3], dp[1][2]) = max(0, 1) = 1`

```
        "" a c e (text2)
      -----------------
""    | 0 | 0 | 0 | 0 |
  a   | 0 | 1 | 1 | 1 |
  b   | 0 |   |   |   |
  c   | 0 |   |   |   |
  d   | 0 |   |   |   |
  e   | 0 |   |   |   |
(text1)
```

### Row `i=2` (comparing `text1[1]` = 'b')

*   `j=1` (`text2[0]` = 'a'): `text1[1] != text2[0]` ('b'!='a'). `dp[2][1] = max(dp[1][1], dp[2][0]) = max(1, 0) = 1`
*   `j=2` (`text2[1]` = 'c'): `text1[1] != text2[1]` ('b'!='c'). `dp[2][2] = max(dp[1][2], dp[2][1]) = max(1, 1) = 1`
*   `j=3` (`text2[2]` = 'e'): `text1[1] != text2[2]` ('b'!='e'). `dp[2][3] = max(dp[1][3], dp[2][2]) = max(1, 1) = 1`

```
        "" a c e (text2)
      -----------------
""    | 0 | 0 | 0 | 0 |
  a   | 0 | 1 | 1 | 1 |
  b   | 0 | 1 | 1 | 1 |
  c   | 0 |   |   |   |
  d   | 0 |   |   |   |
  e   | 0 |   |   |   |
(text1)
```

### Row `i=3` (comparing `text1[2]` = 'c')

*   `j=1` (`text2[0]` = 'a'): `text1[2] != text2[0]` ('c'!='a'). `dp[3][1] = max(dp[2][1], dp[3][0]) = max(1, 0) = 1`
*   `j=2` (`text2[1]` = 'c'): `text1[2] == text2[1]` ('c'=='c'). `dp[3][2] = 1 + dp[2][1] = 1 + 1 = 2`
*   `j=3` (`text2[2]` = 'e'): `text1[2] != text2[2]` ('c'!='e'). `dp[3][3] = max(dp[2][3], dp[3][2]) = max(1, 2) = 2`

```
        "" a c e (text2)
      -----------------
""    | 0 | 0 | 0 | 0 |
  a   | 0 | 1 | 1 | 1 |
  b   | 0 | 1 | 1 | 1 |
  c   | 0 | 1 | 2 | 2 |
  d   | 0 |   |   |   |
  e   | 0 |   |   |   |
(text1)
```

### Row `i=4` (comparing `text1[3]` = 'd')

*   `j=1` (`text2[0]` = 'a'): `text1[3] != text2[0]` ('d'!='a'). `dp[4][1] = max(dp[3][1], dp[4][0]) = max(1, 0) = 1`
*   `j=2` (`text2[1]` = 'c'): `text1[3] != text2[1]` ('d'!='c'). `dp[4][2] = max(dp[3][2], dp[4][1]) = max(2, 1) = 2`
*   `j=3` (`text2[2]` = 'e'): `text1[3] != text2[2]` ('d'!='e'). `dp[4][3] = max(dp[3][3], dp[4][2]) = max(2, 2) = 2`

```
        "" a c e (text2)
      -----------------
""    | 0 | 0 | 0 | 0 |
  a   | 0 | 1 | 1 | 1 |
  b   | 0 | 1 | 1 | 1 |
  c   | 0 | 1 | 2 | 2 |
  d   | 0 | 1 | 2 | 2 |
  e   | 0 |   |   |   |
(text1)
```

### Row `i=5` (comparing `text1[4]` = 'e')

*   `j=1` (`text2[0]` = 'a'): `text1[4] != text2[0]` ('e'!='a'). `dp[5][1] = max(dp[4][1], dp[5][0]) = max(1, 0) = 1`
*   `j=2` (`text2[1]` = 'c'): `text1[4] != text2[1]` ('e'!='c'). `dp[5][2] = max(dp[4][2], dp[5][1]) = max(2, 1) = 2`
*   `j=3` (`text2[2]` = 'e'): `text1[4] == text2[2]` ('e'=='e'). `dp[5][3] = 1 + dp[4][2] = 1 + 2 = 3`

```
        "" a c e (text2)
      -----------------
""    | 0 | 0 | 0 | 0 |
  a   | 0 | 1 | 1 | 1 |
  b   | 0 | 1 | 1 | 1 |
  c   | 0 | 1 | 2 | 2 |
  d   | 0 | 1 | 2 | 2 |
  e   | 0 | 1 | 2 | 3 |
(text1)
```

Final Result: `dp[5][3] = 3`. This is the length of "ace".

Time Complexity: O(m*n). Space Complexity: O(m*n).