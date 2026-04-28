# Fibonacci Sequence Diagrams

## 1. Brute Force Recursion Tree (F(5))

This diagram shows the redundant computations that occur in a pure recursive solution without memoization.
Each `F(k)` node recalculates its value, even if it has been computed before in another branch.

```
                         F(5)
                       /      \
                     F(4)      F(3)
                   /    \     /    \
                 F(3)   F(2) F(2)   F(1)
                /   \   / \  / \    |
              F(2) F(1) F(1)F(0)F(1)F(0)  1
             / \    |   |   |   |   |
           F(1)F(0)  1   1   0   1   0
            |   |
            1   0
```

Notice `F(3)` is computed twice, `F(2)` three times, etc. This leads to exponential time complexity O(2^n).

## 2. Memoization (Top-Down DP) with Cache (F(5))

With memoization, once a subproblem `F(k)` is computed, its result is stored.
Subsequent calls to `F(k)` retrieve the stored result directly, avoiding re-computation.

```
                                  F(5)
                                /      \
    (Memo check, not in cache)F(4)      F(3) (Memo check, not in cache for this branch)
                             /    \     /    \
    (Memo check, not in cache)F(3) F(2) F(2)   F(1)
                            /   \   / \  / \    |
                          F(2) F(1) F(1)F(0)F(1)F(0)  1
                         / \    |   |   |   |   |
                       F(1)F(0)  1   1   0   1   0
                        |   |
                        1   0

Legend:
- Redundant calls like F(3) and F(2) on the right branch will hit the memoization cache
  and immediately return the pre-computed value from the left branch,
  without expanding into further recursion.

Memo table after computing F(5):
memo[0] = 0
memo[1] = 1
memo[2] = 1
memo[3] = 2
memo[4] = 3
memo[5] = 5

Calls (simplified path, cache hits):
1. F(5) -> call F(4), F(3)
2. F(4) -> call F(3), F(2)
3. F(3) -> call F(2), F(1)
4. F(2) -> call F(1), F(0)
5. F(1) -> returns 1, memo[1]=1
6. F(0) -> returns 0, memo[0]=0
7. F(2) = memo[1]+memo[0] = 1+0 = 1, memo[2]=1
8. F(1) -> returns memo[1]=1
9. F(3) = memo[2]+memo[1] = 1+1 = 2, memo[3]=2
10. F(2) -> returns memo[2]=1
11. F(4) = memo[3]+memo[2] = 2+1 = 3, memo[4]=3
12. F(3) -> returns memo[3]=2 (CACHE HIT!)
13. F(5) = memo[4]+memo[3] = 3+2 = 5, memo[5]=5

Only unique subproblems are computed once. Time complexity: O(n).
```

## 3. Tabulation (Bottom-Up DP) Table (F(5))

Tabulation iteratively builds the solution from base cases up to the desired result.

```
dp array:
Index: | 0 | 1 | 2 | 3 | 4 | 5 |
-------|---|---|---|---|---|---|
Value: | 0 | 1 |   |   |   |   |  (Initialize dp[0]=0, dp[1]=1)

Iteration i = 2:
dp[2] = dp[1] + dp[0] = 1 + 0 = 1
Index: | 0 | 1 | 2 | 3 | 4 | 5 |
-------|---|---|---|---|---|---|
Value: | 0 | 1 | 1 |   |   |   |

Iteration i = 3:
dp[3] = dp[2] + dp[1] = 1 + 1 = 2
Index: | 0 | 1 | 2 | 3 | 4 | 5 |
-------|---|---|---|---|---|---|
Value: | 0 | 1 | 1 | 2 |   |   |

Iteration i = 4:
dp[4] = dp[3] + dp[2] = 2 + 1 = 3
Index: | 0 | 1 | 2 | 3 | 4 | 5 |
-------|---|---|---|---|---|---|
Value: | 0 | 1 | 1 | 2 | 3 |   |

Iteration i = 5:
dp[5] = dp[4] + dp[3] = 3 + 2 = 5
Index: | 0 | 1 | 2 | 3 | 4 | 5 |
-------|---|---|---|---|---|---|
Value: | 0 | 1 | 1 | 2 | 3 | 5 |

Result: dp[5] = 5

Time complexity: O(n). Space complexity: O(n).
```

## 4. Tabulation with Space Optimization (O(1) Space) (F(5))

Only the previous two values are needed to compute the next.

```
Variables:
a (F(i-2))
b (F(i-1))
currentFib (F(i))

Initial state (for n=0, n=1 handled separately):
a = 0 (F(0))
b = 1 (F(1))

Loop for i from 2 to 5:

i = 2:
  currentFib = a + b = 0 + 1 = 1
  a = b = 1
  b = currentFib = 1
  (now a=1, b=1)

i = 3:
  currentFib = a + b = 1 + 1 = 2
  a = b = 1
  b = currentFib = 2
  (now a=1, b=2)

i = 4:
  currentFib = a + b = 1 + 2 = 3
  a = b = 2
  b = currentFib = 3
  (now a=2, b=3)

i = 5:
  currentFib = a + b = 2 + 3 = 5
  a = b = 3
  b = currentFib = 5
  (now a=3, b=5)

Result: currentFib = 5

Time complexity: O(n). Space complexity: O(1).
```