"""
Problem: Fibonacci Numbers

The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones,
usually starting with 0 and 1.

F(0) = 0
F(1) = 1
F(n) = F(n-1) + F(n-2) for n > 1

Given an integer n, calculate the nth Fibonacci number.

Example:
n = 0  => 0
n = 1  => 1
n = 2  => 1 (0 + 1)
n = 3  => 2 (1 + 1)
n = 4  => 3 (1 + 2)
n = 5  => 5 (2 + 3)
"""

def fib_recursive(n: int) -> int:
    """
    Approach 1: Brute Force Recursion

    This is the most straightforward implementation based directly on the
    mathematical definition of the Fibonacci sequence.

    Logic:
    - Base cases: F(0) = 0, F(1) = 1.
    - Recursive step: F(n) = F(n-1) + F(n-2).

    Drawbacks:
    - Highly inefficient due to redundant calculations of overlapping subproblems.
      For example, to calculate fib(5), fib(4) and fib(3) are needed.
      To calculate fib(4), fib(3) and fib(2) are needed.
      Notice fib(3) is calculated twice. This redundancy grows exponentially.

    Time Complexity: O(2^n) - Each call potentially makes two more calls,
                     leading to an exponential growth in computations.
    Space Complexity: O(n) - Due to the recursion stack depth.
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer.")
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fib_recursive(n - 1) + fib_recursive(n - 2)


def fib_memo(n: int, memo: dict = None) -> int:
    """
    Approach 2: Memoization (Top-Down Dynamic Programming)

    This approach optimizes the brute-force recursion by storing the results
    of expensive function calls and returning the cached result when the same
    inputs occur again. This addresses the "overlapping subproblems" property.

    Logic:
    - Initialize a dictionary `memo` to store computed Fibonacci numbers.
    - Before computing F(n), check if it's already in `memo`. If yes, return it.
    - Otherwise, compute F(n) recursively, store it in `memo`, and then return it.

    Time Complexity: O(n) - Each Fibonacci number from 0 to n is computed only once.
                     The recursive calls form a linear chain, and each step takes O(1)
                     after the initial computation.
    Space Complexity: O(n) - For the `memo` dictionary and the recursion stack.
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer.")

    if memo is None:
        memo = {}

    if n in memo:
        return memo[n]

    if n == 0:
        return 0
    if n == 1:
        return 1

    # Compute and store the result
    result = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    memo[n] = result
    return result


def fib_tabulation(n: int) -> int:
    """
    Approach 3: Tabulation (Bottom-Up Dynamic Programming)

    This approach solves the problem iteratively by building up solutions from
    the smallest subproblems to the target problem. It typically uses an array
    (often called a DP table) to store intermediate results.

    Logic:
    - Create a DP array `dp` of size `n+1`.
    - Initialize base cases: `dp[0] = 0`, `dp[1] = 1`.
    - Iterate from `i = 2` to `n`, calculating `dp[i]` using the recurrence relation:
      `dp[i] = dp[i-1] + dp[i-2]`.
    - The result is `dp[n]`.

    Time Complexity: O(n) - A single loop runs n times.
    Space Complexity: O(n) - For the `dp` array.
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer.")
    if n == 0:
        return 0
    if n == 1:
        return 1

    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


def fib_space_optimized(n: int) -> int:
    """
    Approach 4: Space-Optimized Tabulation

    This is an optimization of the tabulation approach. Since `F(n)` only depends
    on `F(n-1)` and `F(n-2)`, we don't need to store the entire `dp` array. We
    only need to keep track of the two most recent Fibonacci numbers.

    Logic:
    - Initialize `a = 0` (representing F(i-2)) and `b = 1` (representing F(i-1)).
    - For `n = 0`, return `a`.
    - For `n = 1`, return `b`.
    - Iterate from `i = 2` to `n`:
      - Calculate `current_fib = a + b`.
      - Update `a` to `b`.
      - Update `b` to `current_fib`.
    - The final `b` will be F(n).

    Time Complexity: O(n) - A single loop runs n times.
    Space Complexity: O(1) - Only a constant number of variables are used.
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer.")
    if n == 0:
        return 0
    if n == 1:
        return 1

    a, b = 0, 1
    for _ in range(2, n + 1):
        next_fib = a + b
        a = b
        b = next_fib
    return b

if __name__ == "__main__":
    print("--- Fibonacci Number Calculation ---")
    test_n_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 35]

    for n in test_n_values:
        print(f"\nCalculating fib({n}):")
        # Recursive (Brute Force) - Commented out for larger N as it's too slow
        if n < 35: # Only run for smaller N
            res_recursive = fib_recursive(n)
            print(f"  Recursive: {res_recursive}")
        else:
            print("  Recursive: Skipped (too slow for large N)")

        res_memo = fib_memo(n)
        print(f"  Memoization: {res_memo}")

        res_tab = fib_tabulation(n)
        print(f"  Tabulation: {res_tab}")

        res_space_optimized = fib_space_optimized(n)
        print(f"  Space-Optimized: {res_space_optimized}")

        assert res_memo == res_tab == res_space_optimized, f"Mismatch for n={n}"
        print(f"  All optimized methods match for n={n}")

    # Test edge cases
    try:
        fib_recursive(-1)
    except ValueError as e:
        print(f"\nCaught expected error for fib_recursive(-1): {e}")

    try:
        fib_memo(-1)
    except ValueError as e:
        print(f"Caught expected error for fib_memo(-1): {e}")

    try:
        fib_tabulation(-1)
    except ValueError as e:
        print(f"Caught expected error for fib_tabulation(-1): {e}")

    try:
        fib_space_optimized(-1)
    except ValueError as e:
        print(f"Caught expected error for fib_space_optimized(-1): {e}")