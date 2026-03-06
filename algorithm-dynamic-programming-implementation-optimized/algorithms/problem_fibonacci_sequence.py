import functools

"""
Problem: Fibonacci Sequence

The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones,
usually starting with 0 and 1.
F(0) = 0
F(1) = 1
F(n) = F(n-1) + F(n-2) for n > 1

Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

Goal: Calculate the Nth Fibonacci number.
"""

def fibonacci_recursive(n: int) -> int:
    """
    Approach 1: Brute Force Recursion
    Calculates the Nth Fibonacci number using direct recursion.

    Logic:
    The direct mathematical definition F(n) = F(n-1) + F(n-2) is translated
    directly into a recursive function. Base cases are F(0)=0 and F(1)=1.

    This approach recomputes the same subproblems many times, leading to
    exponential time complexity. For example, to calculate F(5), it needs F(4) and F(3).
    F(4) needs F(3) and F(2). F(3) is computed multiple times.

    Time Complexity: O(2^n) - Each call generates two more calls (roughly), leading to a
                     binary tree of calls with depth 'n'.
    Space Complexity: O(n) - Due to the recursion stack depth.
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer")
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)


def fibonacci_memoization(n: int) -> int:
    """
    Approach 2: Memoization (Top-Down Dynamic Programming)
    Calculates the Nth Fibonacci number using recursion with memoization.

    Logic:
    This approach builds upon the recursive solution but stores the results of
    expensive function calls and returns the cached result when the same inputs
    occur again. A dictionary (or an array) `memo` is used to store computed
    Fibonacci numbers. Before computing F(n), we check if it's already in `memo`.
    If yes, return it. Otherwise, compute it, store it in `memo`, and then return it.

    This avoids redundant computations, significantly reducing the time complexity.

    Time Complexity: O(n) - Each Fibonacci number from F(2) to F(n) is computed only once.
    Space Complexity: O(n) - For the memoization table (dictionary) and the recursion stack.
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer")

    # Use a dictionary for memoization. Keys are n, values are F(n).
    memo = {}

    def solve(k):
        if k == 0:
            return 0
        if k == 1:
            return 1
        if k in memo:
            return memo[k]

        # If not in memo, compute and store
        memo[k] = solve(k - 1) + solve(k - 2)
        return memo[k]

    return solve(n)

# Python's `functools.lru_cache` can automatically apply memoization
# It's a convenient way to implement the memoization pattern.
@functools.lru_cache(maxsize=None) # maxsize=None means unlimited cache size
def fibonacci_memoization_lru_cache(n: int) -> int:
    """
    Approach 2.1: Memoization using functools.lru_cache
    A more concise way to implement the memoization approach using Python's built-in decorator.
    `lru_cache` automatically caches the results of function calls.

    Time Complexity: O(n)
    Space Complexity: O(n) (for the cache and recursion stack)
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer")
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fibonacci_memoization_lru_cache(n - 1) + fibonacci_memoization_lru_cache(n - 2)


def fibonacci_tabulation(n: int) -> int:
    """
    Approach 3: Tabulation (Bottom-Up Dynamic Programming)
    Calculates the Nth Fibonacci number iteratively using a table (array).

    Logic:
    This approach computes the Fibonacci sequence from the base cases upwards.
    We create an array `dp` of size `n+1` where `dp[i]` will store F(i).
    Initialize `dp[0] = 0` and `dp[1] = 1`.
    Then, iterate from `i = 2` up to `n`, calculating `dp[i] = dp[i-1] + dp[i-2]`.
    Finally, `dp[n]` will contain the desired result.

    This avoids recursion overhead and stack space.

    Time Complexity: O(n) - A single loop from 2 to n.
    Space Complexity: O(n) - For the `dp` array.
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer")
    if n == 0:
        return 0
    if n == 1:
        return 1

    # Create a DP table to store results up to n
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1

    # Fill the table bottom-up
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


def fibonacci_space_optimized(n: int) -> int:
    """
    Approach 4: Space-Optimized Tabulation
    Calculates the Nth Fibonacci number by only storing the last two numbers,
    reducing space complexity to O(1).

    Logic:
    Notice that to calculate F(n), we only need F(n-1) and F(n-2). We don't
    need the entire DP array. We can maintain two variables, `a` and `b`,
    representing F(i-2) and F(i-1) respectively. In each iteration, we calculate
    `current = a + b`, then update `a = b` and `b = current`.

    This is the most efficient solution in terms of both time and space.

    Time Complexity: O(n) - A single loop from 2 to n.
    Space Complexity: O(1) - Only a few constant extra variables are used.
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer")
    if n == 0:
        return 0
    if n == 1:
        return 1

    # Initialize a and b to F(0) and F(1) respectively
    a, b = 0, 1

    # Iterate from 2 up to n
    for _ in range(2, n + 1):
        next_fib = a + b
        a = b
        b = next_fib

    return b # b now holds F(n)

# Example usage:
if __name__ == "__main__":
    test_cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30]
    expected_results = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 6765, 832040]

    print("--- Fibonacci Sequence Calculation ---")

    for n, expected in zip(test_cases, expected_results):
        print(f"\nN = {n}:")
        print(f"  Recursive (Brute Force): {fibonacci_recursive(n)} (Expected: {expected})")
        print(f"  Memoization (Top-Down): {fibonacci_memoization(n)} (Expected: {expected})")
        print(f"  Memoization (lru_cache): {fibonacci_memoization_lru_cache(n)} (Expected: {expected})")
        print(f"  Tabulation (Bottom-Up): {fibonacci_tabulation(n)} (Expected: {expected})")
        print(f"  Space-Optimized: {fibonacci_space_optimized(n)} (Expected: {expected})")

    # Demonstrating large N (recursive will be too slow for n=30)
    # print("\n--- Testing with larger N (e.g., N=35) ---")
    # try:
    #     # This will take a very long time
    #     print(f"  Recursive (Brute Force) F(35): {fibonacci_recursive(35)}")
    # except RecursionError:
    #     print("  Recursive (Brute Force) for N=35 hit RecursionError (or is too slow)")

    print(f"  Memoization (Top-Down) F(35): {fibonacci_memoization(35)}")
    print(f"  Memoization (lru_cache) F(35): {fibonacci_memoization_lru_cache(35)}")
    print(f"  Tabulation (Bottom-Up) F(35): {fibonacci_tabulation(35)}")
    print(f"  Space-Optimized F(35): {fibonacci_space_optimized(35)}")
    print(f"  Expected F(35): 9227465") # F(35) value