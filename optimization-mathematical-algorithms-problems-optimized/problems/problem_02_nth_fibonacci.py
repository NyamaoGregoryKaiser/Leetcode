"""
Problem 02: Nth Fibonacci Number

Given an integer `n`, return the `n`-th Fibonacci number.
The Fibonacci sequence is defined as F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.

Examples:
- fibonacci(0) == 0
- fibonacci(1) == 1
- fibonacci(2) == 1 (0 + 1)
- fibonacci(3) == 2 (1 + 1)
- fibonacci(4) == 3 (1 + 2)
- fibonacci(10) == 55
"""

import sys

# Increase recursion limit for naive recursive approach for larger N
# Be cautious with this in production code; it's mostly for demonstrating the approach.
sys.setrecursionlimit(2000)

def fibonacci_naive_recursive(n: int) -> int:
    """
    Approach 1: Naive Recursive Solution
    Directly applies the recursive definition F(n) = F(n-1) + F(n-2).

    Algorithm:
    1. Base cases:
        a. If `n` is 0, return 0.
        b. If `n` is 1, return 1.
    2. Recursive step:
        a. Return `fibonacci_naive_recursive(n-1) + fibonacci_naive_recursive(n-2)`.

    Time Complexity: O(2^n). This is due to redundant calculations.
                     Each call branches into two more calls, forming a binary tree
                     where many subproblems are re-computed multiple times.
                     E.g., fib(5) calls fib(4) and fib(3). fib(4) calls fib(3) and fib(2).
                     fib(3) is computed twice.
    Space Complexity: O(n) due to the recursion stack depth.
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer.")
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fibonacci_naive_recursive(n - 1) + fibonacci_naive_recursive(n - 2)

# Using a dictionary for memoization
memo = {}
def fibonacci_memoized(n: int, memo: dict[int, int] = None) -> int:
    """
    Approach 2: Memoized (Top-Down Dynamic Programming)
    Improves the naive recursive solution by storing the results of expensive
    function calls and returning the cached result when the same inputs occur again.

    Algorithm:
    1. Initialize a `memo` dictionary (or pass it along).
    2. Base cases:
        a. If `n` is 0, return 0.
        b. If `n` is 1, return 1.
    3. Check memo:
        a. If `n` is already in `memo`, return `memo[n]`.
    4. Recursive step with memoization:
        a. Calculate `result = fibonacci_memoized(n-1, memo) + fibonacci_memoized(n-2, memo)`.
        b. Store `result` in `memo[n]`.
        c. Return `result`.

    Time Complexity: O(n). Each Fibonacci number from F(2) to F(n) is computed only once.
    Space Complexity: O(n) for the recursion stack and O(n) for the `memo` dictionary.
                      Total O(n).
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer.")
    if n == 0:
        return 0
    if n == 1:
        return 1

    if memo is None:
        memo = {}

    if n in memo:
        return memo[n]

    result = fibonacci_memoized(n - 1, memo) + fibonacci_memoized(n - 2, memo)
    memo[n] = result
    return result

def fibonacci_iterative_dp(n: int) -> int:
    """
    Approach 3: Iterative (Bottom-Up Dynamic Programming)
    Builds the solution iteratively from the base cases up to `n`.
    This is generally the preferred approach for Fibonacci in interviews
    due to its efficiency and simplicity.

    Algorithm:
    1. Handle base cases:
        a. If `n` is 0, return 0.
        b. If `n` is 1, return 1.
    2. Initialize `a = 0` (F(0)) and `b = 1` (F(1)).
    3. Loop from `i = 2` to `n`:
        a. Calculate `next_fib = a + b`.
        b. Update `a = b`.
        c. Update `b = next_fib`.
    4. Return `b` (which holds F(n)).

    Time Complexity: O(n). We perform a constant number of operations for each number up to `n`.
    Space Complexity: O(1). We only need to store a few variables (`a`, `b`, `next_fib`).
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

# Matrix Exponentiation for very large N (e.g., up to 10^18)
# This approach uses the property that:
# | F(n+1) |   | 1  1 | ^ n   | F(1) |
# | F(n)   | = | 1  0 |     * | F(0) |
#
# Where | F(1) | = | 1 |
#       | F(0) |   | 0 |
#
# So, | F(n+1) |   | 1  1 | ^ n   | 1 |
#     | F(n)   | = | 1  0 |     * | 0 |
#
# We need to compute (M^n) efficiently using binary exponentiation (exponentiation by squaring).

def _multiply_matrices(A: list[list[int]], B: list[list[int]]) -> list[list[int]]:
    """Helper function to multiply two 2x2 matrices."""
    # | a b |   | e f |   | ae+bg  af+bh |
    # | c d | * | g h | = | ce+dg  cf+dh |
    a, b = A[0][0], A[0][1]
    c, d = A[1][0], A[1][1]
    e, f = B[0][0], B[0][1]
    g, h = B[1][0], B[1][1]

    return [
        [a*e + b*g, a*f + b*h],
        [c*e + d*g, c*f + d*h]
    ]

def _power_matrix(M: list[list[int]], n: int) -> list[list[int]]:
    """Helper function to compute M^n using binary exponentiation."""
    # Identity matrix for 2x2
    result = [[1, 0], [0, 1]]

    # The base matrix for Fibonacci
    base = M

    while n > 0:
        if n % 2 == 1: # If n is odd
            result = _multiply_matrices(result, base)
        base = _multiply_matrices(base, base) # Square the base matrix
        n //= 2 # Halve n

    return result

def fibonacci_matrix_exponentiation(n: int) -> int:
    """
    Approach 4: Matrix Exponentiation (for very large N)
    This method is efficient for extremely large values of `n` (e.g., up to 10^18),
    as it computes F(n) in O(log n) time.

    Algorithm:
    1. Handle base cases:
        a. If `n` is 0, return 0.
        b. If `n` is 1, return 1.
    2. Define the base Fibonacci matrix `M = [[1, 1], [1, 0]]`.
    3. Compute `M_n = M^(n-1)` using binary exponentiation (similar to `pow(x, n)`).
       We use `n-1` because `M^1` gives F(2), F(1). So `M^(n-1)` gives F(n), F(n-1).
    4. The Nth Fibonacci number F(n) is then `M_n[0][0] * F(1) + M_n[0][1] * F(0)`.
       Since F(1)=1 and F(0)=0, this simplifies to `M_n[0][0]`.

    Time Complexity: O(log n). Matrix multiplication is a constant-time operation for 2x2 matrices.
                     The binary exponentiation reduces `n` logarithmically.
    Space Complexity: O(1) for storing matrices.
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer.")
    if n == 0:
        return 0
    if n == 1:
        return 1

    # Base matrix
    fib_matrix = [[1, 1], [1, 0]]

    # Compute (fib_matrix)^(n-1)
    # The result_matrix[0][0] will be F(n)
    # result_matrix[0][1] will be F(n-1)
    # result_matrix[1][0] will be F(n-1)
    # result_matrix[1][1] will be F(n-2)
    powered_matrix = _power_matrix(fib_matrix, n - 1)

    # F(n) is the top-left element of the powered matrix,
    # specifically (M^(n-1))[0][0] if we're careful with definitions.
    # More generally, F(n) = M^(n-1)[0][0]*F(1) + M^(n-1)[0][1]*F(0) which is M^(n-1)[0][0]*1 + M^(n-1)[0][1]*0 = M^(n-1)[0][0]
    return powered_matrix[0][0]


# Helper to choose the default approach for general use (e.g. for tests)
def get_nth_fibonacci(n: int) -> int:
    """
    Wrapper function to use the most commonly preferred (iterative DP) approach by default.
    """
    return fibonacci_iterative_dp(n)

# --- Interview Tips & Variations ---
# 1. Negative N: The problem statement usually implies non-negative N. If allowed,
#    the definition of F(-N) can be derived from F(N) = F(N-1) + F(N-2).
#    F(N-2) = F(N) - F(N-1). This implies F(-N) = (-1)^(N+1) * F(N).
# 2. Large N and Modulo: For very large N, Fibonacci numbers grow very quickly.
#    If the interviewer asks for F(N) % M, then all intermediate additions and multiplications
#    in iterative DP or matrix exponentiation should be done modulo M.
#    The matrix exponentiation approach is particularly good for this.
# 3. Space Optimization: Iterative DP already achieves O(1) space.
# 4. Tail Recursion: Python does not optimize tail recursion, so it offers no
#    performance benefit over standard recursion for Fibonacci.
# 5. Iterative DP is usually the most balanced solution for N up to ~10^6 - 10^7.
#    Matrix exponentiation is for N > 10^7, typically where N can be 10^9 or 10^18.


if __name__ == "__main__":
    print("--- Naive Recursive ---")
    print(f"fibonacci_naive_recursive(0): {fibonacci_naive_recursive(0)}")
    print(f"fibonacci_naive_recursive(1): {fibonacci_naive_recursive(1)}")
    print(f"fibonacci_naive_recursive(5): {fibonacci_naive_recursive(5)}")
    # print(f"fibonacci_naive_recursive(30): {fibonacci_naive_recursive(30)}") # Too slow for large N

    print("\n--- Memoized DP ---")
    print(f"fibonacci_memoized(0): {fibonacci_memoized(0, {})}")
    print(f"fibonacci_memoized(1): {fibonacci_memoized(1, {})}")
    print(f"fibonacci_memoized(5): {fibonacci_memoized(5, {})}")
    print(f"fibonacci_memoized(30): {fibonacci_memoized(30, {})}")
    print(f"fibonacci_memoized(100): {fibonacci_memoized(100, {})}")

    print("\n--- Iterative DP ---")
    print(f"fibonacci_iterative_dp(0): {fibonacci_iterative_dp(0)}")
    print(f"fibonacci_iterative_dp(1): {fibonacci_iterative_dp(1)}")
    print(f"fibonacci_iterative_dp(5): {fibonacci_iterative_dp(5)}")
    print(f"fibonacci_iterative_dp(30): {fibonacci_iterative_dp(30)}")
    print(f"fibonacci_iterative_dp(100): {fibonacci_iterative_dp(100)}")
    print(f"fibonacci_iterative_dp(1000): {fibonacci_iterative_dp(1000)}")

    print("\n--- Matrix Exponentiation ---")
    print(f"fibonacci_matrix_exponentiation(0): {fibonacci_matrix_exponentiation(0)}")
    print(f"fibonacci_matrix_exponentiation(1): {fibonacci_matrix_exponentiation(1)}")
    print(f"fibonacci_matrix_exponentiation(2): {fibonacci_matrix_exponentiation(2)}")
    print(f"fibonacci_matrix_exponentiation(5): {fibonacci_matrix_exponentiation(5)}")
    print(f"fibonacci_matrix_exponentiation(30): {fibonacci_matrix_exponentiation(30)}")
    print(f"fibonacci_matrix_exponentiation(100): {fibonacci_matrix_exponentiation(100)}")
    print(f"fibonacci_matrix_exponentiation(1000): {fibonacci_matrix_exponentiation(1000)}")
    # Note: For very large N, the standard Python int type handles arbitrary precision,
    # but the numbers become extremely large very quickly. Matrix method is good for
    # _number of operations_, not necessarily for printing the whole massive number
    # without special output handling.
    # E.g., print(fibonacci_matrix_exponentiation(100000)) # This number is huge, just printing will take time.