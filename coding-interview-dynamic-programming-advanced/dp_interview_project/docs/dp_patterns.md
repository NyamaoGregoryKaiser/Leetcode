```markdown
# Dynamic Programming Patterns and Variations

Dynamic Programming problems often fall into recognizable patterns. Identifying these patterns can help in quickly formulating a solution. This document outlines common DP patterns and discusses variations for the problems implemented in this project.

## Common DP Patterns

1.  **0/1 Knapsack Type:**
    *   **Description:** Given a set of items, each with a weight and a value, determine which items to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible. Each item can only be chosen once (0 or 1).
    *   **Characteristics:** Decision for each item (take or leave), limited capacity.
    *   **Variations:**
        *   **Subset Sum:** Is there a subset of a given set (or array) whose elements sum up to a specific target? (A boolean version of 0/1 Knapsack where values == weights).
        *   **Equal Sum Partition:** Can a set be partitioned into two subsets such that the sum of elements in both subsets is equal? (Variant of Subset Sum).
        *   **Count Subsets with Given Sum:** How many subsets sum to a target?
        *   **Minimum Subset Sum Difference:** Partition a set into two subsets such that the absolute difference between their sums is minimized.
    *   **Implemented Problem:** `knapsack_01.py`

2.  **Unbounded Knapsack / Coin Change Type:**
    *   **Description:** Similar to 0/1 Knapsack, but each item can be chosen multiple times (unlimited supply).
    *   **Characteristics:** Items can be reused.
    *   **Variations:**
        *   **Coin Change (Minimum Coins):** Given a set of coin denominations and a target amount, find the minimum number of coins needed to make up that amount.
        *   **Coin Change (Number of Ways):** Given a set of coin denominations and a target amount, find the number of ways to make up that amount.
        *   **Rod Cutting:** Given a rod of length `N` and prices for different lengths, find the maximum profit by cutting the rod and selling the pieces.

3.  **Longest Common Subsequence (LCS) Type:**
    *   **Description:** Finding commonalities or differences between two sequences (strings, arrays).
    *   **Characteristics:** Involves two input sequences, often using a 2D DP table.
    *   **Variations:**
        *   **Longest Common Substring:** A contiguous subsequence (substring).
        *   **Edit Distance (Levenshtein Distance):** Minimum operations (insertions, deletions, substitutions) to transform one string into another.
        *   **Longest Palindromic Subsequence:** Find the longest subsequence of a string that is also a palindrome.
        *   **Shortest Common Supersequence:** Find the shortest sequence that contains both given sequences as subsequences.
    *   **Implemented Problem:** `longest_common_subsequence.py`

4.  **Matrix Chain Multiplication Type:**
    *   **Description:** Problems involving breaking down a sequence into optimal partitions, often related to finding optimal parenthesization or operations.
    *   **Characteristics:** Often involves `dp[i][j]` representing the optimal solution for a subproblem from index `i` to `j`. The iteration usually involves a 'gap' or 'length' parameter.
    *   **Variations:**
        *   **Palindrome Partitioning:** Minimum cuts to partition a string into palindromic substrings.
        *   **Burst Balloons:** Maximize coins by bursting balloons.
        *   **Optimal Binary Search Tree:** Construct a BST with minimum search cost.

5.  **Grid / Pathfinding DP:**
    *   **Description:** Finding optimal paths or counting ways in a grid (2D matrix).
    *   **Characteristics:** `dp[i][j]` represents the solution for reaching cell `(i, j)`. Transitions usually come from `(i-1, j)` or `(i, j-1)`.
    *   **Variations:**
        *   **Unique Paths:** Number of unique paths from top-left to bottom-right in a grid.
        *   **Minimum Path Sum:** Minimum sum path in a grid.
        *   **Dungeon Game:** Minimum initial health to exit a dungeon.
        *   **Min Cost Climbing Stairs (1D version of pathfinding).**
    *   **Implemented Problem:** `min_cost_climbing_stairs.py` (a 1D version of pathfinding)

6.  **String DP:**
    *   **Description:** Problems involving operations or properties of strings.
    *   **Characteristics:** Often involves substrings, prefixes, or suffixes. `dp[i]` or `dp[i][j]` might relate to prefixes/substrings.
    *   **Variations:**
        *   **Regular Expression Matching / Wildcard Matching:** Does a pattern match a string?
        *   **Longest Palindromic Substring:** (Also falls under Matrix Chain Multiplication type if `dp[i][j]` is used for substring `s[i...j]`).
        *   **Decode Ways:** Number of ways to decode a digit string into letters.
    *   **Implemented Problem:** `word_break.py`

## Variations for Implemented Problems

### Fibonacci Numbers
*   **Variations:**
    *   **Tribonacci Sequence:** `T(n) = T(n-1) + T(n-2) + T(n-3)`. Generalizes to N-bonacci sequences.
    *   **Climbing Stairs (Ways to Climb):** If you can climb 1 or 2 steps, how many distinct ways to climb `n` stairs? (Directly analogous to Fibonacci).
    *   **House Robber:** Find the maximum amount you can rob from houses in a line without robbing adjacent houses. (A slightly more complex recurrence).

### 0/1 Knapsack Problem
*   **Variations:**
    *   **Unbounded Knapsack:** Items can be taken multiple times (e.g., Coin Change).
    *   **Fractional Knapsack:** Items can be broken into pieces (solvable with greedy approach, not DP).
    *   **Bounded Knapsack:** Each item has a limited count (e.g., `k_i` units of item `i`). More complex DP states.
    *   **Subset Sum / Partition Problems:** (As mentioned in pattern #1 above).

### Longest Common Subsequence (LCS)
*   **Variations:**
    *   **Print LCS:** Instead of just the length, reconstruct one actual LCS string. This involves backtracking through the DP table.
    *   **Shortest Common Supersequence (SCS):** Find the shortest string that has both `text1` and `text2` as subsequences. `Length(SCS) = Length(text1) + Length(text2) - Length(LCS)`.
    *   **Longest Palindromic Subsequence:** Find the LCS of a string and its reverse.
    *   **Minimum Insertions/Deletions to transform A to B:** `Min_Ops = (Length(A) - Length(LCS)) + (Length(B) - Length(LCS))`.

### Word Break Problem
*   **Variations:**
    *   **Word Break II:** Instead of just `True`/`False`, return *all* possible valid segmentations of the string. This often requires backtracking from the DP table or modifying the memoization to store possible breaks.
    *   **Concatenated Words:** Given a list of words, find all words that are formed by concatenating two or more words from the same list. (Often uses a Trie + DP).

### Min Cost Climbing Stairs
*   **Variations:**
    *   **Climbing Stairs (Ways to Climb):** As mentioned under Fibonacci, if costs are all 0, it becomes the number of ways to climb.
    *   **Minimum Path Sum in a Grid:** A 2D extension where you find the min cost path from top-left to bottom-right.
    *   **Triangle:** Find the minimum path sum from top to bottom.
    *   **House Robber:** Similar state transitions (can't use adjacent items), but applies to costs/values.
    *   **Delete and Earn:** Similar logic of choosing items while avoiding dependencies.

Understanding these patterns and their variations will significantly improve your ability to identify and solve a wide range of DP problems. Practice is key!
```