import functools
from typing import List, Dict, Tuple, Optional

# --- Problem 1: Fibonacci Sequence ---

# Problem Description:
# Given an integer n, return the nth Fibonacci number.
# The Fibonacci sequence is defined as F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.

# Approach 1: Recursive with Memoization (Top-Down DP)
# Time Complexity: O(n) - Each Fibonacci number is computed once and stored.
# Space Complexity: O(n) - For the recursion stack and the memoization dictionary/cache.
@functools.lru_cache(None) # Python's built-in memoization decorator
def fibonacci_memoized(n: int) -> int:
    """
    Computes the nth Fibonacci number using recursion with memoization.
    This is a top-down dynamic programming approach.
    """
    if n <= 1:
        return n
    return fibonacci_memoized(n - 1) + fibonacci_memoized(n - 2)

# Approach 2: Iterative with Tabulation (Bottom-Up DP)
# Time Complexity: O(n) - We iterate from 2 up to n, performing constant work.
# Space Complexity: O(n) - For the DP table (array).
def fibonacci_tabulation(n: int) -> int:
    """
    Computes the nth Fibonacci number using iteration with tabulation.
    This is a bottom-up dynamic programming approach.
    """
    if n <= 1:
        return n

    # dp[i] will store the ith Fibonacci number
    dp: List[int] = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]

# Approach 3: Space-Optimized Iterative
# Time Complexity: O(n) - Same as tabulation.
# Space Complexity: O(1) - We only store the last two Fibonacci numbers.
def fibonacci_space_optimized(n: int) -> int:
    """
    Computes the nth Fibonacci number using a space-optimized iterative approach.
    This reduces the space complexity from O(n) to O(1).
    """
    if n <= 1:
        return n

    a, b = 0, 1 # a = F(i-2), b = F(i-1)

    for _ in range(2, n + 1):
        # F(i) = F(i-1) + F(i-2)
        # new_b = b + a
        # a becomes old b, b becomes new_b
        a, b = b, a + b

    return b

# --- Problem 2: 0/1 Knapsack Problem ---

# Problem Description:
# Given weights and values of N items, and a knapsack capacity W.
# Find the maximum value that can be put into the knapsack.
# Each item can either be taken or not taken (0/1 property).

# Approach 1: Recursive with Memoization (Top-Down DP)
# Time Complexity: O(N * W) - Each state (index, capacity) is computed once.
# Space Complexity: O(N * W) - For the memoization table (dictionary) and recursion stack.
def knapsack_memoized(weights: List[int], values: List[int], capacity: int) -> int:
    """
    Solves the 0/1 Knapsack problem using recursion with memoization (top-down DP).
    """
    n = len(weights)
    memo: Dict[Tuple[int, int], int] = {}

    def solve(idx: int, current_capacity: int) -> int:
        # Base Case: If no items left or no capacity, no value can be added.
        if idx == n or current_capacity == 0:
            return 0

        # Check memoization table
        if (idx, current_capacity) in memo:
            return memo[(idx, current_capacity)]

        # Option 1: Exclude the current item
        # We move to the next item, capacity remains the same.
        exclude_val = solve(idx + 1, current_capacity)

        # Option 2: Include the current item (if possible)
        include_val = 0
        if weights[idx] <= current_capacity:
            # We add its value and move to the next item with reduced capacity.
            include_val = values[idx] + solve(idx + 1, current_capacity - weights[idx])

        # Store and return the maximum of the two options
        memo[(idx, current_capacity)] = max(exclude_val, include_val)
        return memo[(idx, current_capacity)]

    return solve(0, capacity)

# Approach 2: Iterative with Tabulation (Bottom-Up DP)
# Time Complexity: O(N * W) - Two nested loops.
# Space Complexity: O(N * W) - For the 2D DP table.
def knapsack_tabulation(weights: List[int], values: List[int], capacity: int) -> int:
    """
    Solves the 0/1 Knapsack problem using iteration with tabulation (bottom-up DP).
    dp[i][j] represents the maximum value that can be obtained with items from 0 to i-1
    and a knapsack capacity of j.
    """
    n = len(weights)
    # dp table with (n+1) rows and (capacity+1) columns
    # dp[i][j] will store the max value using first `i` items with capacity `j`
    dp: List[List[int]] = [[0] * (capacity + 1) for _ in range(n + 1)]

    # Fill the DP table
    # i represents the current item being considered (from 1 to n)
    # j represents the current capacity (from 0 to capacity)
    for i in range(1, n + 1):
        for j in range(capacity + 1):
            # The current item's weight and value (using 0-based indexing for arrays)
            current_weight = weights[i - 1]
            current_value = values[i - 1]

            # Option 1: Exclude current item
            # The value is the same as the value without this item (i.e., from row i-1)
            dp[i][j] = dp[i - 1][j]

            # Option 2: Include current item (if its weight doesn't exceed current capacity)
            if current_weight <= j:
                # Value if included = current_value + max value from previous items
                # with remaining capacity (j - current_weight)
                include_val = current_value + dp[i - 1][j - current_weight]
                dp[i][j] = max(dp[i][j], include_val)

    return dp[n][capacity]

# Space-optimized version for knapsack (not explicitly requested as a separate problem,
# but a common optimization for 0/1 Knapsack)
# Time Complexity: O(N * W)
# Space Complexity: O(W) - Uses only two rows or one row (if iterating carefully)
def knapsack_space_optimized(weights: List[int], values: List[int], capacity: int) -> int:
    """
    Solves the 0/1 Knapsack problem using space-optimized iteration (bottom-up DP).
    Reduces space complexity from O(N*W) to O(W).
    """
    n = len(weights)
    # dp[j] will store the maximum value for a knapsack of capacity j.
    # We only need the previous row's values, so we can optimize to 1D array.
    dp: List[int] = [0] * (capacity + 1)

    for i in range(n):  # Iterate through each item
        current_weight = weights[i]
        current_value = values[i]

        # Iterate backwards through capacity. This is CRUCIAL for 0/1 Knapsack.
        # If we iterate forwards, an item might be considered multiple times,
        # making it an unbounded knapsack. Iterating backwards ensures that
        # when we access dp[j - current_weight], it refers to the state from the *previous* item iteration.
        for j in range(capacity, current_weight - 1, -1):
            # Option 1: Exclude the current item (dp[j] already holds this from the previous iteration)
            # Option 2: Include the current item
            # Compare with value obtained by including the current item:
            # current_value + max value from previous items with remaining capacity
            dp[j] = max(dp[j], current_value + dp[j - current_weight])

    return dp[capacity]


# --- Problem 3: Longest Common Subsequence (LCS) ---

# Problem Description:
# Given two strings `text1` and `text2`, return the length of their longest common subsequence.
# If there is no common subsequence, return 0.
# A subsequence of a string is a new string generated from the original string with some characters
# (can be none) deleted without changing the relative order of the remaining characters.
# For example, "ace" is a subsequence of "abcde".

# Approach 1: Recursive with Memoization (Top-Down DP)
# Time Complexity: O(m * n) - Each state (i, j) is computed once.
# Space Complexity: O(m * n) - For the memoization table (dictionary) and recursion stack.
def lcs_memoized(text1: str, text2: str) -> int:
    """
    Computes the length of the Longest Common Subsequence (LCS)
    using recursion with memoization (top-down DP).
    """
    len1, len2 = len(text1), len(text2)
    memo: Dict[Tuple[int, int], int] = {}

    def solve(i: int, j: int) -> int:
        # Base Case: If either string is exhausted, no more common characters.
        if i == len1 or j == len2:
            return 0

        # Check memoization table
        if (i, j) in memo:
            return memo[(i, j)]

        if text1[i] == text2[j]:
            # If characters match, they are part of the LCS. Add 1 and recurse for remaining strings.
            memo[(i, j)] = 1 + solve(i + 1, j + 1)
        else:
            # If characters don't match, we have two options:
            # 1. Skip character from text1 and try to match text2[j] with text1[i+1...].
            # 2. Skip character from text2 and try to match text1[i] with text2[j+1...].
            # Take the maximum of these two options.
            memo[(i, j)] = max(solve(i + 1, j), solve(i, j + 1))

        return memo[(i, j)]

    return solve(0, 0)

# Approach 2: Iterative with Tabulation (Bottom-Up DP)
# Time Complexity: O(m * n) - Two nested loops.
# Space Complexity: O(m * n) - For the 2D DP table.
def lcs_tabulation(text1: str, text2: str) -> int:
    """
    Computes the length of the Longest Common Subsequence (LCS)
    using iteration with tabulation (bottom-up DP).
    dp[i][j] stores the length of the LCS of text1[:i] and text2[:j].
    """
    len1, len2 = len(text1), len(text2)
    # dp table with (len1+1) rows and (len2+1) columns
    # dp[i][j] will store the LCS length for text1 up to index i-1 and text2 up to index j-1
    dp: List[List[int]] = [[0] * (len2 + 1) for _ in range(len1 + 1)]

    # Fill the DP table
    for i in range(1, len1 + 1):
        for j in range(1, len2 + 1):
            # If characters match, extend the LCS by 1 from the diagonal element
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                # If characters don't match, take the maximum from skipping a character
                # from text1 (dp[i-1][j]) or text2 (dp[i][j-1])
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[len1][len2]

# Space-optimized version for LCS (using O(min(m,n)) space)
# Time Complexity: O(m * n)
# Space Complexity: O(min(m, n)) - Uses two rows, where one row is min(len1, len2)
def lcs_space_optimized(text1: str, text2: str) -> int:
    """
    Computes the length of the Longest Common Subsequence (LCS)
    using space-optimized iteration (bottom-up DP).
    Reduces space complexity from O(m*n) to O(min(m,n)).
    """
    # Ensure text1 is the shorter string for space optimization
    if len(text1) < len(text2):
        text1, text2 = text2, text1

    len1, len2 = len(text1), len(text2) # len1 >= len2 now

    # dp array for current row, prev_dp for previous row
    # Each row corresponds to a column (len2)
    prev_dp: List[int] = [0] * (len2 + 1)
    curr_dp: List[int] = [0] * (len2 + 1)

    for i in range(1, len1 + 1): # Iterate through rows (length of text1)
        for j in range(1, len2 + 1): # Iterate through columns (length of text2)
            if text1[i - 1] == text2[j - 1]:
                # Diagonal element from prev_dp, plus 1
                curr_dp[j] = 1 + prev_dp[j - 1]
            else:
                # Max of element above (from prev_dp) or element to the left (from curr_dp)
                curr_dp[j] = max(prev_dp[j], curr_dp[j - 1])
        # After filling curr_dp for current 'i', it becomes prev_dp for the next 'i'
        prev_dp = list(curr_dp) # Make a copy

    return prev_dp[len2]


# --- Problem 4: Coin Change Problem (Minimum Coins) ---

# Problem Description:
# You are given an integer array `coins` representing coin denominations and an integer `amount`
# representing a total amount of money.
# Return the fewest number of coins that you need to make up that amount.
# If that amount cannot be made up by any combination of the coins, return -1.
# You may assume that you have an infinite number of each kind of coin.

# Approach 1: Recursive with Memoization (Top-Down DP)
# Time Complexity: O(amount * N) - Where N is number of coin denominations.
# Space Complexity: O(amount) - For the memoization table (dictionary) and recursion stack.
def coin_change_memoized(coins: List[int], amount: int) -> int:
    """
    Solves the Coin Change problem (minimum coins) using recursion with memoization.
    """
    memo: Dict[int, int] = {}

    def solve(target: int) -> int:
        # Base Cases:
        if target == 0:
            return 0  # 0 coins needed for amount 0
        if target < 0:
            return float('inf') # Cannot make a negative amount

        # Check memoization table
        if target in memo:
            return memo[target]

        min_coins = float('inf')
        for coin in coins:
            # Try using each coin
            res = solve(target - coin)
            if res != float('inf'): # If subproblem is solvable
                min_coins = min(min_coins, 1 + res) # 1 (for current coin) + min coins for remaining amount

        # Store and return the result
        memo[target] = min_coins
        return min_coins

    result = solve(amount)
    return result if result != float('inf') else -1

# Approach 2: Iterative with Tabulation (Bottom-Up DP)
# Time Complexity: O(amount * N) - Where N is number of coin denominations.
# Space Complexity: O(amount) - For the 1D DP table.
def coin_change_tabulation(coins: List[int], amount: int) -> int:
    """
    Solves the Coin Change problem (minimum coins) using iteration with tabulation.
    dp[i] represents the minimum number of coins to make up amount i.
    """
    # Initialize dp array. dp[0] = 0 (0 coins for amount 0).
    # All other values are float('inf') initially, as we haven't found a way to make them.
    dp: List[float] = [float('inf')] * (amount + 1)
    dp[0] = 0

    # Iterate through each possible amount from 1 to `amount`
    for i in range(1, amount + 1):
        # For each amount, consider all available coin denominations
        for coin in coins:
            # If the current coin can be used to form amount 'i'
            if i - coin >= 0:
                # Update dp[i] with the minimum of its current value
                # and (1 + dp[i - coin])
                # (1 for the current coin, plus the minimum coins needed for the remaining amount)
                dp[i] = min(dp[i], 1 + dp[i - coin])

    # If dp[amount] is still float('inf'), it means the amount cannot be made.
    return int(dp[amount]) if dp[amount] != float('inf') else -1

# Note: For Coin Change (minimum coins), the tabulation approach is already
# space-optimized to O(amount) because `dp[i]` only depends on `dp[i - coin_val]`,
# which are values already computed in the `dp` array. No separate space-optimized
# version is typically needed as `fibonacci_space_optimized` or `lcs_space_optimized`.