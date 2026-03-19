import math

class Fibonacci:
    """
    Class containing various implementations for calculating Fibonacci numbers.
    The Fibonacci sequence is a series of numbers where each number is the sum
    of the two preceding ones, usually starting with 0 and 1.
    F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.
    """

    @staticmethod
    def fib_recursive_naive(n: int) -> int:
        """
        Calculates the nth Fibonacci number using a naive recursive approach.

        This method directly implements the recursive definition F(n) = F(n-1) + F(n-2).
        It suffers from redundant calculations (e.g., F(3) is calculated multiple times
        when computing F(5)).

        Time Complexity: O(2^n)
            - Exponential. Each call makes two more calls, leading to a rapidly growing
              number of computations.
        Space Complexity: O(n)
            - Due to the recursion stack depth. In the worst case, the stack can grow
              up to `n` calls deep.

        Args:
            n (int): The index of the Fibonacci number to calculate (non-negative).

        Returns:
            int: The nth Fibonacci number.
        """
        if not isinstance(n, int):
            raise TypeError("Input must be an integer.")
        if n < 0:
            raise ValueError("Input must be a non-negative integer.")
        if n == 0:
            return 0
        if n == 1:
            return 1
        return Fibonacci.fib_recursive_naive(n - 1) + Fibonacci.fib_recursive_naive(n - 2)

    @staticmethod
    def fib_recursive_memoized(n: int, memo: dict = None) -> int:
        """
        Calculates the nth Fibonacci number using recursion with memoization (top-down DP).

        This approach stores the results of expensive function calls and returns the
        cached result when the same inputs occur again, avoiding redundant computations.

        Time Complexity: O(n)
            - Each Fibonacci number from 0 to n is computed only once.
        Space Complexity: O(n)
            - For the memoization dictionary and the recursion stack depth.

        Args:
            n (int): The index of the Fibonacci number to calculate (non-negative).
            memo (dict): Dictionary to store computed Fibonacci numbers.

        Returns:
            int: The nth Fibonacci number.
        """
        if not isinstance(n, int):
            raise TypeError("Input must be an integer.")
        if n < 0:
            raise ValueError("Input must be a non-negative integer.")

        if memo is None:
            memo = {} # Initialize memoization dictionary for the first call

        if n in memo:
            return memo[n]
        if n == 0:
            return 0
        if n == 1:
            return 1

        result = Fibonacci.fib_recursive_memoized(n - 1, memo) + \
                 Fibonacci.fib_recursive_memoized(n - 2, memo)
        memo[n] = result
        return result

    @staticmethod
    def fib_iterative_dp(n: int) -> int:
        """
        Calculates the nth Fibonacci number using an iterative dynamic programming approach (bottom-up).

        This method builds up the sequence from the base cases (F(0), F(1)) to F(n),
        storing all intermediate results in an array.

        Time Complexity: O(n)
            - A single loop runs `n` times.
        Space Complexity: O(n)
            - To store the `n+1` Fibonacci numbers in an array.

        Args:
            n (int): The index of the Fibonacci number to calculate (non-negative).

        Returns:
            int: The nth Fibonacci number.
        """
        if not isinstance(n, int):
            raise TypeError("Input must be an integer.")
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

    @staticmethod
    def fib_iterative_space_optimized(n: int) -> int:
        """
        Calculates the nth Fibonacci number using an iterative approach with O(1) space complexity.

        Instead of storing the entire sequence, this method only keeps track of the
        two most recent Fibonacci numbers needed to compute the next one.

        Time Complexity: O(n)
            - A single loop runs `n` times.
        Space Complexity: O(1)
            - Only a constant number of variables are used.

        Args:
            n (int): The index of the Fibonacci number to calculate (non-negative).

        Returns:
            int: The nth Fibonacci number.
        """
        if not isinstance(n, int):
            raise TypeError("Input must be an integer.")
        if n < 0:
            raise ValueError("Input must be a non-negative integer.")
        if n == 0:
            return 0
        if n == 1:
            return 1

        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b

    @staticmethod
    def _multiply_matrices(A: list[list[int]], B: list[list[int]]) -> list[list[int]]:
        """Helper function to multiply two 2x2 matrices."""
        a = A[0][0] * B[0][0] + A[0][1] * B[1][0]
        b = A[0][0] * B[0][1] + A[0][1] * B[1][1]
        c = A[1][0] * B[0][0] + A[1][1] * B[1][0]
        d = A[1][0] * B[0][1] + A[1][1] * B[1][1]
        return [[a, b], [c, d]]

    @staticmethod
    def _matrix_power(M: list[list[int]], p: int) -> list[list[int]]:
        """Helper function to raise a 2x2 matrix to the power `p`."""
        res = [[1, 0], [0, 1]]  # Identity matrix
        base = M

        while p > 0:
            if p % 2 == 1:
                res = Fibonacci._multiply_matrices(res, base)
            base = Fibonacci._multiply_matrices(base, base)
            p //= 2
        return res

    @staticmethod
    def fib_matrix_exponentiation(n: int) -> int:
        """
        Calculates the nth Fibonacci number using matrix exponentiation.

        This method uses the property that:
        | F(n+1) |   | 1  1 |^n   | F(1) |
        | F(n)   | = | 1  0 |   * | F(0) |

        Specifically, if M = [[1, 1], [1, 0]], then M^n = [[F(n+1), F(n)], [F(n), F(n-1)]].
        We can compute M^n efficiently using binary exponentiation (exponentiation by squaring).

        Time Complexity: O(log n)
            - Matrix multiplication is constant time for 2x2 matrices.
              We perform log(n) matrix multiplications.
        Space Complexity: O(log n)
            - Due to the recursion stack for `_matrix_power` if implemented recursively,
              or O(1) if `_matrix_power` is iterative (as implemented here).

        Args:
            n (int): The index of the Fibonacci number to calculate (non-negative).

        Returns:
            int: The nth Fibonacci number.
        """
        if not isinstance(n, int):
            raise TypeError("Input must be an integer.")
        if n < 0:
            raise ValueError("Input must be a non-negative integer.")
        if n == 0:
            return 0
        if n == 1:
            return 1

        # M = [[1, 1], [1, 0]]
        T = [[1, 1], [1, 0]]
        
        # Calculate T^(n-1) to get F(n) in the top-left or top-right.
        # F(n) is T^(n-1)[0][0] or T^(n-1)[0][1].
        # Using the standard definition and matrix setup, M^n has F(n+1) F(n) in first row.
        # So we need M^(n-1) if we want F(n).
        # T^(n-1) = [[F(n), F(n-1)], [F(n-1), F(n-2)]]
        result_matrix = Fibonacci._matrix_power(T, n - 1)
        return result_matrix[0][0] # F(n) is at result_matrix[0][0] and result_matrix[0][1]

# Example Usage:
if __name__ == "__main__":
    test_n = 10
    print(f"--- Fibonacci Numbers up to F({test_n}) ---")
    print(f"F({test_n}) Naive Recursive: {Fibonacci.fib_recursive_naive(test_n)}") # F(10) = 55
    print(f"F({test_n}) Recursive Memoized: {Fibonacci.fib_recursive_memoized(test_n)}") # F(10) = 55
    print(f"F({test_n}) Iterative DP: {Fibonacci.fib_iterative_dp(test_n)}") # F(10) = 55
    print(f"F({test_n}) Iterative Space Optimized: {Fibonacci.fib_iterative_space_optimized(test_n)}") # F(10) = 55
    print(f"F({test_n}) Matrix Exponentiation: {Fibonacci.fib_matrix_exponentiation(test_n)}") # F(10) = 55

    test_n_large = 30
    print(f"\n--- Larger Fibonacci (N={test_n_large}) ---")
    # Naive recursive would be too slow for N=30
    # print(f"F({test_n_large}) Naive Recursive: {Fibonacci.fib_recursive_naive(test_n_large)}")
    print(f"F({test_n_large}) Recursive Memoized: {Fibonacci.fib_recursive_memoized(test_n_large)}")
    print(f"F({test_n_large}) Iterative DP: {Fibonacci.fib_iterative_dp(test_n_large)}")
    print(f"F({test_n_large}) Iterative Space Optimized: {Fibonacci.fib_iterative_space_optimized(test_n_large)}")
    print(f"F({test_n_large}) Matrix Exponentiation: {Fibonacci.fib_matrix_exponentiation(test_n_large)}")
    # Expected F(30) = 832040

    # Test F(0) and F(1)
    print(f"\nF(0) Naive Recursive: {Fibonacci.fib_recursive_naive(0)}") # Expected: 0
    print(f"F(1) Iterative Space Optimized: {Fibonacci.fib_iterative_space_optimized(1)}") # Expected: 1
    print(f"F(0) Matrix Exponentiation: {Fibonacci.fib_matrix_exponentiation(0)}") # Expected: 0
    print(f"F(1) Matrix Exponentiation: {Fibonacci.fib_matrix_exponentiation(1)}") # Expected: 1

    # Edge cases / Type and Value errors
    try:
        Fibonacci.fib_iterative_dp(-5)
    except ValueError as e:
        print(f"Error (expected): {e}")
    try:
        Fibonacci.fib_iterative_dp(3.5)
    except TypeError as e:
        print(f"Error (expected): {e}")
---