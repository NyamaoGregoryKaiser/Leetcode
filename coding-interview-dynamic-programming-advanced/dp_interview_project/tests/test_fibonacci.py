```python
import unittest
from algorithms.fibonacci import Fibonacci

class TestFibonacci(unittest.TestCase):

    def setUp(self):
        # Clear memoization caches before each test to ensure fresh runs
        Fibonacci.fib_memoization_lru_cache.cache_clear()
        # Custom memoization cache is per decorator instance, can't easily clear globally without re-decorating.
        # For a more robust test, one might pass the cache explicitly or re-decorate.
        # For now, we'll assume it doesn't cause issues for different inputs or tests.
        # Or simply don't use custom_memoize if lru_cache is sufficient for problem scope.
        # Given this is for interview, lru_cache is often sufficient.

    def _run_all_methods(self, n, expected):
        """Helper to run all non-bruteforce methods and assert results."""
        # Brute-force is often too slow for larger N, so we test it separately with smaller N.
        # For fib_memoization_custom, its cache is persistent per instance. If needed,
        # re-import or re-decorate for truly fresh start. For simplicity in this project,
        # we'll consider it okay for different N values.
        self.assertEqual(Fibonacci.fib_memoization_lru_cache(n), expected, f"Memoization (lru_cache) failed for n={n}")
        # Note: fib_memoization_custom needs to be re-decorated or its cache managed if inputs overlap
        # across test cases, for true independence. For unique `n` per test, it's fine.
        # Or, just test a few times for very small n.
        # For simplicity, we'll exclude custom_memoize from general _run_all_methods.
        # self.assertEqual(Fibonacci.fib_memoization_custom(n), expected, f"Memoization (custom) failed for n={n}")
        self.assertEqual(Fibonacci.fib_tabulation(n), expected, f"Tabulation failed for n={n}")
        self.assertEqual(Fibonacci.fib_space_optimized(n), expected, f"Space Optimized failed for n={n}")

    def test_fibonacci_small_numbers(self):
        self.assertEqual(Fibonacci.fib_recursive_bruteforce(0), 0)
        self.assertEqual(Fibonacci.fib_recursive_bruteforce(1), 1)
        self.assertEqual(Fibonacci.fib_recursive_bruteforce(2), 1)
        self.assertEqual(Fibonacci.fib_recursive_bruteforce(3), 2)
        self.assertEqual(Fibonacci.fib_recursive_bruteforce(4), 3)
        self._run_all_methods(0, 0)
        self._run_all_methods(1, 1)
        self._run_all_methods(2, 1)
        self._run_all_methods(3, 2)
        self._run_all_methods(4, 3)

    def test_fibonacci_medium_numbers(self):
        self._run_all_methods(5, 5)
        self._run_all_methods(6, 8)
        self._run_all_methods(7, 13)
        self._run_all_methods(8, 21)
        self._run_all_methods(9, 34)
        self._run_all_methods(10, 55)

    def test_fibonacci_larger_numbers(self):
        self._run_all_methods(20, 6765)
        self._run_all_methods(30, 832040)
        self._run_all_methods(40, 102334155)
        self._run_all_methods(50, 12586269025)

    def test_fibonacci_edge_cases(self):
        self.assertEqual(Fibonacci.fib_recursive_bruteforce(0), 0)
        self.assertEqual(Fibonacci.fib_memoization_lru_cache(0), 0)
        self.assertEqual(Fibonacci.fib_tabulation(0), 0)
        self.assertEqual(Fibonacci.fib_space_optimized(0), 0)

        self.assertEqual(Fibonacci.fib_recursive_bruteforce(1), 1)
        self.assertEqual(Fibonacci.fib_memoization_lru_cache(1), 1)
        self.assertEqual(Fibonacci.fib_tabulation(1), 1)
        self.assertEqual(Fibonacci.fib_space_optimized(1), 1)

    def test_fibonacci_negative_input(self):
        with self.assertRaises(ValueError):
            Fibonacci.fib_recursive_bruteforce(-1)
        with self.assertRaises(ValueError):
            Fibonacci.fib_memoization_lru_cache(-5)
        with self.assertRaises(ValueError):
            Fibonacci.fib_tabulation(-10)
        with self.assertRaises(ValueError):
            Fibonacci.fib_space_optimized(-100)

    def test_fib_memoization_custom_specific(self):
        # Test custom memoization for a few values
        self.assertEqual(Fibonacci.fib_memoization_custom(0), 0)
        self.assertEqual(Fibonacci.fib_memoization_custom(1), 1)
        self.assertEqual(Fibonacci.fib_memoization_custom(10), 55)
        self.assertEqual(Fibonacci.fib_memoization_custom(20), 6765)
        with self.assertRaises(ValueError):
            Fibonacci.fib_memoization_custom(-1)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
```