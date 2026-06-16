```markdown
# Dynamic Programming (DP) Algorithms Explanation

This document provides a comprehensive overview of Dynamic Programming (DP), its core principles, and detailed explanations of the problems implemented in this project.

## Table of Contents
1.  [What is Dynamic Programming?](#what-is-dynamic-programming)
    *   [Key Characteristics](#key-characteristics)
    *   [Two Approaches to DP](#two-approaches-to-dp)
    *   [Steps to Solve a DP Problem](#steps-to-solve-a-dp-problem)
2.  [Problems Explained](#problems-explained)
    *   [Longest Common Subsequence (LCS)](#longest-common-subsequence-lcs-problem-explanation)
    *   [0/1 Knapsack Problem](#01-knapsack-problem-explanation)
    *   [Coin Change (Minimum Coins)](#coin-change-minimum-coins-problem-explanation)
    *   [Edit Distance (Levenshtein Distance)](#edit-distance-levenshtein-distance-problem-explanation)

---

## 1. What is Dynamic Programming?

Dynamic Programming is a powerful algorithmic technique for solving optimization problems by breaking them down into simpler subproblems. It's applicable to problems that exhibit two key characteristics: **Optimal Substructure** and **Overlapping Subproblems**.

### Key Characteristics

1.  **Optimal Substructure**: An optimal solution to a problem can be constructed from optimal solutions of its subproblems.
    *   **Example**: The shortest path between two nodes in a graph contains shortest paths between intermediate nodes. If the path A -> B -> C is the shortest path from A to C, then A -> B must be the shortest path from A to B.

2.  **Overlapping Subproblems**: The problem can be broken down into subproblems that are reused multiple times. Instead of recomputing the same subproblem, DP stores the result of a subproblem the first time it's computed and reuses it later.
    *   **Example**: Calculating `Fibonacci(5)` requires `Fibonacci(4)` and `Fibonacci(3)`. `Fibonacci(4)` in turn requires `Fibonacci(3)` and `Fibonacci(2)`. Notice `Fibonacci(3)` is computed twice. DP avoids this redundancy.

### Two Approaches to DP

1.  **Memoization (Top-Down DP)**:
    *   This is essentially recursive programming combined with caching.
    *   Start from the main problem and recursively break it down.
    *   Store the result of each subproblem in a "memo" (usually an array or hash map) when it's first computed.
    *   Before computing a subproblem, check if its result is already in the memo. If yes, return the cached result. Otherwise, compute and store.
    *   **Pros**: Often more intuitive to write (mimics the recursive definition), only computes necessary subproblems.
    *   **Cons**: Can lead to recursion stack overflow for very large inputs, overhead of recursive calls.

2.  **Tabulation (Bottom-Up DP)**:
    *   This is an iterative approach.
    *   Start from the smallest, most trivial subproblems and solve them first.
    *   Build up solutions to larger subproblems using the solutions of previously solved smaller subproblems.
    *   Typically involves filling a DP table (array) in a specific order.
    *   **Pros**: No recursion overhead, avoids stack overflow, often slightly faster due to iterative nature.
    *   **Cons**: Can be less intuitive to define the iteration order, might compute unnecessary subproblems if not all are strictly required for the final answer.

### Steps to Solve a DP Problem

1.  **Identify if it's a DP problem**: Look for optimal substructure and overlapping subproblems.
2.  **Define the state**: What does `dp[i]`, `dp[i][j]`, or `dp[i][j][k]` represent? This is crucial.
3.  **Formulate the recurrence relation**: How do you compute the current state based on previous (smaller) states?
4.  **Identify base cases**: What are the simplest subproblems whose solutions are known without further recursion?
5.  **Determine the order of computation**:
    *   **Memoization**: Natural recursive call order.
    *   **Tabulation**: Determine the order to fill the DP table (e.g., usually increasing `i` and `j`).
6.  **Analyze Time and Space Complexity**: Based on the number of states and the work done per state.
7.  **(Optional) Space Optimization**: Can you reduce the space complexity by observing that some previous states are no longer needed?

---

## 2. Problems Explained

### Longest Common Subsequence (LCS) Problem Explanation

*   **Problem Statement**: Given two strings `text1` and `text2`, find the length of their longest common subsequence. A subsequence is formed by deleting zero or more characters from a string without changing the relative order of the remaining characters.

*   **Optimal Substructure**:
    If `text1[i-1] == text2[j-1]`, then this character is part of the LCS. The problem reduces to finding LCS of `text1[0...i-2]` and `text2[0...j-2]`, plus 1 for the matching character.
    If `text1[i-1] != text2[j-1]`, then `text1[i-1]` cannot be matched with `text2[j-1]`. We must find the LCS of `text1[0...i-2]` and `text2[0...j-1]`, or `text1[0...i-1]` and `text2[0...j-2]`, and take the maximum.

*   **Overlapping Subproblems**: Many recursive calls like `LCS(text1[0...k], text2[0...l])` will be made multiple times.

*   **State Definition**:
    `dp[i][j]` = length of the LCS of `text1[0...i-1]` and `text2[0...j-1]`.
    (Here `i` and `j` represent the lengths of the prefixes of `text1` and `text2` being considered.)

*   **Base Cases**:
    *   `dp[0][j] = 0` (LCS of an empty string with any string is 0).
    *   `dp[i][0] = 0` (LCS of any string with an empty string is 0).

*   **Recurrence Relation**:
    ```
    If text1[i-1] == text2[j-1]:
        dp[i][j] = 1 + dp[i-1][j-1]
    Else (text1[i-1] != text2[j-1]):
        dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    ```

*   **Computation Order (Tabulation)**:
    Fill the `dp` table row by row, from `i=1` to `m` and `j=1` to `n`.

*   **Complexity**:
    *   **Time**: O(m*n), where `m` and `n` are lengths of `text1` and `text2`.
    *   **Space**: O(m*n) for the DP table.
    *   **Space Optimized**: O(min(m, n)) by using only two rows (current and previous).

### 0/1 Knapsack Problem Explanation

*   **Problem Statement**: Given a set of items, each with a weight and a value, determine which items to include in a collection so that the total weight is less than or equal to a given capacity, and the total value is as large as possible. Each item can only be picked once (0 or 1 times).

*   **Optimal Substructure**:
    Consider the `i`-th item and a knapsack capacity `W`.
    1.  **If the `i`-th item's weight > `W`**: We cannot include this item. The maximum value is the same as considering only the first `i-1` items with capacity `W`.
    2.  **If the `i`-th item's weight <= `W`**: We have two choices:
        *   **Exclude the `i`-th item**: Max value is from first `i-1` items with capacity `W`.
        *   **Include the `i`-th item**: Max value is `value[i]` + (max value from first `i-1` items with capacity `W - weight[i]`).
    We choose the maximum of these two options.

*   **Overlapping Subproblems**: Many subproblems like "max value using first `k` items with capacity `c`" will be recomputed.

*   **State Definition**:
    `dp[i][w]` = maximum value that can be obtained using the first `i` items with a knapsack capacity of `w`.

*   **Base Cases**:
    *   `dp[0][w] = 0` (No items, no value).
    *   `dp[i][0] = 0` (No capacity, no value).

*   **Recurrence Relation**:
    ```
    If weight[i-1] > w:
        dp[i][w] = dp[i-1][w]
    Else:
        dp[i][w] = max(dp[i-1][w],          // Exclude item i
                       value[i-1] + dp[i-1][w - weight[i-1]]) // Include item i
    ```
    (Note: `i-1` is used for array indexing `weights` and `values` as they are 0-indexed, while `i` in `dp[i][w]` typically represents count of items from 1 to N.)

*   **Computation Order (Tabulation)**:
    Fill the `dp` table row by row, from `i=1` to `N` and `w=1` to `W`.

*   **Complexity**:
    *   **Time**: O(N*W), where `N` is the number of items and `W` is the knapsack capacity.
    *   **Space**: O(N*W) for the DP table.
    *   **Space Optimized**: O(W) by using a single 1D array. Iterating `w` from `W` down to `weight[i]` ensures that `dp[w - weight[i]]` refers to the value from the *previous* item's consideration.

### Coin Change (Minimum Coins) Problem Explanation

*   **Problem Statement**: Given an array of coin denominations `coins` and a target `amount`, return the fewest number of coins needed to make up that amount. You have an infinite number of each kind of coin. Return -1 if the amount cannot be made.

*   **Optimal Substructure**:
    To find the minimum coins for `amount A`, we can try using each coin `c` in `coins`. If we use coin `c`, the remaining problem is to find the minimum coins for `A - c`.
    So, `min_coins(A) = 1 + min(min_coins(A - c_1), min_coins(A - c_2), ..., min_coins(A - c_k))` for all `c_i <= A`.

*   **Overlapping Subproblems**: Many recursive calls for `min_coins(X)` where `X` is a specific amount will be repeated.

*   **State Definition**:
    `dp[a]` = minimum number of coins required to make amount `a`.

*   **Base Cases**:
    *   `dp[0] = 0` (0 coins for 0 amount).
    *   `dp[a] = Infinity` for `a > 0` initially (or `NOT_POSSIBLE` sentinel), indicating not yet computed or impossible.

*   **Recurrence Relation**:
    For each `currentAmount` from `1` to `amount`:
    ```
    dp[currentAmount] = Infinity // Or the value from previous iteration
    For each coin in coins:
        If currentAmount - coin >= 0 and dp[currentAmount - coin] != Infinity:
            dp[currentAmount] = min(dp[currentAmount], 1 + dp[currentAmount - coin])
    ```

*   **Computation Order (Tabulation)**:
    Fill the `dp` array from `currentAmount = 1` to `amount`. For each `currentAmount`, iterate through all `coins`.

*   **Complexity**:
    *   **Time**: O(C*A), where `C` is the number of coin denominations and `A` is the target amount.
    *   **Space**: O(A) for the DP array.
    *   **Space Optimized**: A single 1D array is already the space-optimized version for this problem.

### Edit Distance (Levenshtein Distance) Problem Explanation

*   **Problem Statement**: Given two strings `word1` and `word2`, return the minimum number of operations (insert, delete, replace) required to convert `word1` to `word2`.

*   **Optimal Substructure**:
    Consider `word1[0...i-1]` and `word2[0...j-1]`.
    1.  **If `word1[i-1] == word2[j-1]`**: The last characters match. No operation needed for them. The problem reduces to finding the edit distance for `word1[0...i-2]` and `word2[0...j-2]`.
    2.  **If `word1[i-1] != word2[j-1]`**: We must perform an operation:
        *   **Delete**: Delete `word1[i-1]`. Cost is 1 + `edit_distance(word1[0...i-2], word2[0...j-1])`.
        *   **Insert**: Insert `word2[j-1]` into `word1`. Cost is 1 + `edit_distance(word1[0...i-1], word2[0...j-2])`. (Effectively, `word1[i-1]` is matched with an imaginary `word2[j-1]`-equivalent character, and `word2[j-1]` is handled).
        *   **Replace**: Replace `word1[i-1]` with `word2[j-1]`. Cost is 1 + `edit_distance(word1[0...i-2], word2[0...j-2])`.
    We choose the minimum of these three options.

*   **Overlapping Subproblems**: Many subproblems of `edit_distance(prefix1, prefix2)` will be recomputed.

*   **State Definition**:
    `dp[i][j]` = minimum edit distance to convert `word1[0...i-1]` to `word2[0...j-1]`.

*   **Base Cases**:
    *   `dp[i][0] = i` (To convert `word1` prefix of length `i` to an empty string, `i` deletions are needed).
    *   `dp[0][j] = j` (To convert an empty string to `word2` prefix of length `j`, `j` insertions are needed).

*   **Recurrence Relation**:
    ```
    If word1[i-1] == word2[j-1]:
        dp[i][j] = dp[i-1][j-1]
    Else:
        dp[i][j] = 1 + min(dp[i-1][j],       // Delete word1[i-1]
                           dp[i][j-1],       // Insert word2[j-1]
                           dp[i-1][j-1])      // Replace word1[i-1] with word2[j-1]
    ```

*   **Computation Order (Tabulation)**:
    Initialize the first row and column, then fill the `dp` table row by row, from `i=1` to `m` and `j=1` to `n`.

*   **Complexity**:
    *   **Time**: O(m*n), where `m` and `n` are lengths of `word1` and `word2`.
    *   **Space**: O(m*n) for the DP table.
    *   **Space Optimized**: O(min(m, n)) by using only two rows (current and previous).

---

```