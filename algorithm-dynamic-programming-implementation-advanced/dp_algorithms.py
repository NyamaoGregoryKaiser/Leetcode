```python
import time

def fibonacci_iterative(n):
    """
    Calculates the nth Fibonacci number iteratively.
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

def fibonacci_recursive_memo(n, memo={}):
    """
    Calculates the nth Fibonacci number recursively with memoization.
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_recursive_memo(n - 1, memo) + fibonacci_recursive_memo(n - 2, memo)
    return memo[n]

def knapsack_01(weights, values, capacity):
    """
    Solves the 0/1 knapsack problem using dynamic programming.
    Time Complexity: O(nW), where n is the number of items and W is the capacity.
    Space Complexity: O(nW)
    """
    n = len(weights)
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][capacity]

def lcs_length(seq1, seq2):
    """
    Finds the length of the longest common subsequence of two sequences using dynamic programming.
    Time Complexity: O(m*n), where m and n are lengths of seq1 and seq2.
    Space Complexity: O(m*n)
    """
    m = len(seq1)
    n = len(seq2)
    dp = [[0 for _ in range(n + 1)] for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if seq1[i - 1] == seq2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]

```