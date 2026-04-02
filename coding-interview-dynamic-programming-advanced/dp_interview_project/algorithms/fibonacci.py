```python
import functools
from utils.decorators import custom_memoize

class Fibonacci:
    """
    Implementations for calculating Fibonacci numbers using various approaches.
    Fibonacci sequence: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.
    """

    @staticmethod
    def fib_recursive_bruteforce(n: int) -> int:
        """
        Calculates the n-th Fibonacci number using a naive recursive approach.
        This method has overlapping subproblems and redundant computations.

        Time Complexity: O(2^n) - Each call makes two more calls, leading to exponential growth.
                                  The recursion tree branches out twice at each step.
        Space Complexity: O(n) - Due to the recursion stack depth.
        """
        if n < 0:
            raise ValueError("Input must be a non-negative integer.")
        if n <= 1:
            return n
        return Fibonacci.fib_recursive_bruteforce(n - 1) + Fibonacci.fib_recursive_bruteforce(n - 2)

    @staticmethod
    @functools.lru_cache(maxsize=None)
    def fib_memoization_lru_cache(n: int) -> int:
        """
        Calculates the n-th Fibonacci number using memoization (top-down Dynamic Programming)
        with functools.lru_cache.
        Stores results of subproblems to avoid re-computation.

        Time Complexity: O(n) - Each Fibonacci number from 0 to n is computed only once.
        Space Complexity: O(n) - For the recursion stack and the cache storage.
        """
        if n < 0:
            raise ValueError("Input must be a non-negative integer.")
        if n <= 1:
            return n
        return Fibonacci.fib_memoization_lru_cache(n - 1) + Fibonacci.fib_memoization_lru_cache(n - 2)

    @staticmethod
    @custom_memoize
    def fib_memoization_custom(n: int) -> int:
        """
        Calculates the n-th Fibonacci number using memoization (top-down Dynamic Programming)
        with a custom decorator.
        This manually demonstrates the caching mechanism.

        Time Complexity: O(n) - Each Fibonacci number from 0 to n is computed only once.
        Space Complexity: O(n) - For the recursion stack and the cache storage.
        """
        if n < 0:
            raise ValueError("Input must be a non-negative integer.")
        if n <= 1:
            return n
        return Fibonacci.fib_memoization_custom(n - 1) + Fibonacci.fib_memoization_custom(n - 2)

    @staticmethod
    def fib_tabulation(n: int) -> int:
        """
        Calculates the n-th Fibonacci number using tabulation (bottom-up Dynamic Programming).
        Builds up the solution from base cases iteratively.

        Time Complexity: O(n) - A single loop iterates n times.
        Space Complexity: O(n) - For storing the DP table (array).
        """
        if n < 0:
            raise ValueError("Input must be a non-negative integer.")
        if n <= 1:
            return n

        # dp[i] will store the i-th Fibonacci number
        dp = [0] * (n + 1)
        dp[0] = 0
        dp[1] = 1

        for i in range(2, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]

        return dp[n]

    @staticmethod
    def fib_space_optimized(n: int) -> int:
        """
        Calculates the n-th Fibonacci number using a space-optimized tabulation approach.
        Since F(n) only depends on F(n-1) and F(n-2), we only need to store the
        last two computed values instead of the entire DP table.

        Time Complexity: O(n) - A single loop iterates n times.
        Space Complexity: O(1) - Only a constant number of variables are used.
        """
        if n < 0:
            raise ValueError("Input must be a non-negative integer.")
        if n <= 1:
            return n

        a, b = 0, 1  # F(0), F(1)
        for _ in range(2, n + 1):
            next_fib = a + b
            a = b
            b = next_fib
        return b # b will hold F(n)

# Example Usage:
if __name__ == '__main__':
    print("--- Fibonacci Numbers ---")
    n_val = 10

    print(f"\nCalculating F({n_val})")

    # Brute-force
    try:
        print(f"Recursive Brute Force: {Fibonacci.fib_recursive_bruteforce(n_val)}")
    except RecursionError:
        print(f"Recursive Brute Force: Recursion depth exceeded for n={n_val}. Try a smaller n.")

    # Memoization (lru_cache)
    print(f"Memoization (lru_cache): {Fibonacci.fib_memoization_lru_cache(n_val)}")
    Fibonacci.fib_memoization_lru_cache.cache_clear() # Clear cache for fresh runs if needed

    # Memoization (custom)
    print(f"Memoization (custom): {Fibonacci.fib_memoization_custom(n_val)}")
    # Note: custom_memoize maintains its cache within the decorator's scope,
    # to clear it, you'd need to re-decorate or access its internal cache.

    # Tabulation
    print(f"Tabulation: {Fibonacci.fib_tabulation(n_val)}")

    # Space-optimized
    print(f"Space Optimized: {Fibonacci.fib_space_optimized(n_val)}")

    # Test edge cases
    print("\n--- Edge Cases ---")
    print(f"F(0): {Fibonacci.fib_space_optimized(0)}") # Expected: 0
    print(f"F(1): {Fibonacci.fib_space_optimized(1)}") # Expected: 1
    try:
        Fibonacci.fib_space_optimized(-1)
    except ValueError as e:
        print(f"F(-1) error: {e}")
```