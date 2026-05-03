import unittest
import sys
import os

# Add the parent directory to the path to allow importing modules from 'algorithms'
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from algorithms import dp_problems

class TestDPProblems(unittest.TestCase):

    # --- Fibonacci Sequence Tests ---
    def test_fibonacci_base_cases(self):
        self.assertEqual(dp_problems.fibonacci_memoized(0), 0)
        self.assertEqual(dp_problems.fibonacci_tabulation(0), 0)
        self.assertEqual(dp_problems.fibonacci_space_optimized(0), 0)

        self.assertEqual(dp_problems.fibonacci_memoized(1), 1)
        self.assertEqual(dp_problems.fibonacci_tabulation(1), 1)
        self.assertEqual(dp_problems.fibonacci_space_optimized(1), 1)

    def test_fibonacci_small_numbers(self):
        expected_fib = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
        for i in range(len(expected_fib)):
            with self.subTest(n=i):
                self.assertEqual(dp_problems.fibonacci_memoized(i), expected_fib[i])
                self.assertEqual(dp_problems.fibonacci_tabulation(i), expected_fib[i])
                self.assertEqual(dp_problems.fibonacci_space_optimized(i), expected_fib[i])

    def test_fibonacci_larger_numbers(self):
        self.assertEqual(dp_problems.fibonacci_memoized(20), 6765)
        self.assertEqual(dp_problems.fibonacci_tabulation(20), 6765)
        self.assertEqual(dp_problems.fibonacci_space_optimized(20), 6765)

        self.assertEqual(dp_problems.fibonacci_memoized(30), 832040)
        self.assertEqual(dp_problems.fibonacci_tabulation(30), 832040)
        self.assertEqual(dp_problems.fibonacci_space_optimized(30), 832040)

        self.assertEqual(dp_problems.fibonacci_memoized(40), 102334155)
        self.assertEqual(dp_problems.fibonacci_tabulation(40), 102334155)
        self.assertEqual(dp_problems.fibonacci_space_optimized(40), 102334155)

    # --- 0/1 Knapsack Tests ---
    def test_knapsack_empty(self):
        weights = []
        values = []
        capacity = 10
        self.assertEqual(dp_problems.knapsack_memoized(weights, values, capacity), 0)
        self.assertEqual(dp_problems.knapsack_tabulation(weights, values, capacity), 0)
        self.assertEqual(dp_problems.knapsack_space_optimized(weights, values, capacity), 0)

    def test_knapsack_zero_capacity(self):
        weights = [1, 2, 3]
        values = [10, 20, 30]
        capacity = 0
        self.assertEqual(dp_problems.knapsack_memoized(weights, values, capacity), 0)
        self.assertEqual(dp_problems.knapsack_tabulation(weights, values, capacity), 0)
        self.assertEqual(dp_problems.knapsack_space_optimized(weights, values, capacity), 0)

    def test_knapsack_small_cases(self):
        weights = [10, 20, 30]
        values = [60, 100, 120]
        capacity = 50
        # Items 10 (60) and 20 (100) = 160. Items 20 (100) and 30 (120) = 220. Max is 220.
        self.assertEqual(dp_problems.knapsack_memoized(weights, values, capacity), 220)
        self.assertEqual(dp_problems.knapsack_tabulation(weights, values, capacity), 220)
        self.assertEqual(dp_problems.knapsack_space_optimized(weights, values, capacity), 220)

    def test_knapsack_all_items_fit(self):
        weights = [10, 20, 30]
        values = [60, 100, 120]
        capacity = 60 # All items fit
        self.assertEqual(dp_problems.knapsack_memoized(weights, values, capacity), 280)
        self.assertEqual(dp_problems.knapsack_tabulation(weights, values, capacity), 280)
        self.assertEqual(dp_problems.knapsack_space_optimized(weights, values, capacity), 280)

    def test_knapsack_no_items_fit(self):
        weights = [10, 20, 30]
        values = [60, 100, 120]
        capacity = 5
        self.assertEqual(dp_problems.knapsack_memoized(weights, values, capacity), 0)
        self.assertEqual(dp_problems.knapsack_tabulation(weights, values, capacity), 0)
        self.assertEqual(dp_problems.knapsack_space_optimized(weights, values, capacity), 0)

    def test_knapsack_complex_case(self):
        weights = [1, 2, 3, 8, 7, 4]
        values = [20, 5, 10, 40, 15, 25]
        capacity = 10
        # Expected:
        # Items (weight, value): (1,20), (2,5), (3,10), (8,40), (7,15), (4,25)
        # Capacity 10
        # Optimal: (1,20) + (8,40) = 60, weight 9
        # (4,25) + (3,10) + (2,5) = 40, weight 9
        # (4,25) + (1,20) = 45, weight 5
        # It's (1,20) + (2,5) + (3,10) + (4,25) = 60. Weight 10.
        # Or (8,40) + (1,20) = 60. Weight 9.
        # The result should be 60.
        self.assertEqual(dp_problems.knapsack_memoized(weights, values, capacity), 60)
        self.assertEqual(dp_problems.knapsack_tabulation(weights, values, capacity), 60)
        self.assertEqual(dp_problems.knapsack_space_optimized(weights, values, capacity), 60)

    # --- Longest Common Subsequence (LCS) Tests ---
    def test_lcs_empty_strings(self):
        self.assertEqual(dp_problems.lcs_memoized("", ""), 0)
        self.assertEqual(dp_problems.lcs_tabulation("", ""), 0)
        self.assertEqual(dp_problems.lcs_space_optimized("", ""), 0)

    def test_lcs_one_empty_string(self):
        self.assertEqual(dp_problems.lcs_memoized("abc", ""), 0)
        self.assertEqual(dp_problems.lcs_tabulation("abc", ""), 0)
        self.assertEqual(dp_problems.lcs_space_optimized("abc", ""), 0)

        self.assertEqual(dp_problems.lcs_memoized("", "xyz"), 0)
        self.assertEqual(dp_problems.lcs_tabulation("", "xyz"), 0)
        self.assertEqual(dp_problems.lcs_space_optimized("", "xyz"), 0)

    def test_lcs_no_common_subsequence(self):
        self.assertEqual(dp_problems.lcs_memoized("abc", "def"), 0)
        self.assertEqual(dp_problems.lcs_tabulation("abc", "def"), 0)
        self.assertEqual(dp_problems.lcs_space_optimized("abc", "def"), 0)

    def test_lcs_full_match(self):
        self.assertEqual(dp_problems.lcs_memoized("abc", "abc"), 3)
        self.assertEqual(dp_problems.lcs_tabulation("abc", "abc"), 3)
        self.assertEqual(dp_problems.lcs_space_optimized("abc", "abc"), 3)

    def test_lcs_example_cases(self):
        # Example 1: "abcde", "ace" -> "ace", length 3
        self.assertEqual(dp_problems.lcs_memoized("abcde", "ace"), 3)
        self.assertEqual(dp_problems.lcs_tabulation("abcde", "ace"), 3)
        self.assertEqual(dp_problems.lcs_space_optimized("abcde", "ace"), 3)

        # Example 2: "abc", "abc" -> "abc", length 3
        self.assertEqual(dp_problems.lcs_memoized("abc", "abc"), 3)
        self.assertEqual(dp_problems.lcs_tabulation("abc", "abc"), 3)
        self.assertEqual(dp_problems.lcs_space_optimized("abc", "abc"), 3)

        # Example 3: "abc", "def" -> "", length 0
        self.assertEqual(dp_problems.lcs_memoized("abc", "def"), 0)
        self.assertEqual(dp_problems.lcs_tabulation("abc", "def"), 0)
        self.assertEqual(dp_problems.lcs_space_optimized("abc", "def"), 0)

        # Custom case: "AGGTAB", "GXTXAYB" -> "GTAB", length 4
        self.assertEqual(dp_problems.lcs_memoized("AGGTAB", "GXTXAYB"), 4)
        self.assertEqual(dp_problems.lcs_tabulation("AGGTAB", "GXTXAYB"), 4)
        self.assertEqual(dp_problems.lcs_space_optimized("AGGTAB", "GXTXAYB"), 4)
        
        # Custom case 2: "ABCDGH", "AEDFHR" -> "ADH", length 3
        self.assertEqual(dp_problems.lcs_memoized("ABCDGH", "AEDFHR"), 3)
        self.assertEqual(dp_problems.lcs_tabulation("ABCDGH", "AEDFHR"), 3)
        self.assertEqual(dp_problems.lcs_space_optimized("ABCDGH", "AEDFHR"), 3)

    def test_lcs_long_strings(self):
        s1 = "abcdefghijklm" * 5
        s2 = "axbyczdwevfgh" * 5
        # common chars are a,b,c,d,e,f,g,h (length 8) repeated 5 times = 40
        self.assertEqual(dp_problems.lcs_memoized(s1, s2), 40)
        self.assertEqual(dp_problems.lcs_tabulation(s1, s2), 40)
        self.assertEqual(dp_problems.lcs_space_optimized(s1, s2), 40)

    # --- Coin Change (Minimum Coins) Tests ---
    def test_coin_change_base_cases(self):
        self.assertEqual(dp_problems.coin_change_memoized([1, 2, 5], 0), 0)
        self.assertEqual(dp_problems.coin_change_tabulation([1, 2, 5], 0), 0)

    def test_coin_change_examples(self):
        # Example 1: coins = [1,2,5], amount = 11 -> 3 (5+5+1)
        self.assertEqual(dp_problems.coin_change_memoized([1, 2, 5], 11), 3)
        self.assertEqual(dp_problems.coin_change_tabulation([1, 2, 5], 11), 3)

        # Example 2: coins = [2], amount = 3 -> -1
        self.assertEqual(dp_problems.coin_change_memoized([2], 3), -1)
        self.assertEqual(dp_problems.coin_change_tabulation([2], 3), -1)

        # Example 3: coins = [1], amount = 0 -> 0
        self.assertEqual(dp_problems.coin_change_memoized([1], 0), 0)
        self.assertEqual(dp_problems.coin_change_tabulation([1], 0), 0)

        # Example 4: coins = [1], amount = 1 -> 1
        self.assertEqual(dp_problems.coin_change_memoized([1], 1), 1)
        self.assertEqual(dp_problems.coin_change_tabulation([1], 1), 1)

        # Example 5: coins = [1], amount = 2 -> 2
        self.assertEqual(dp_problems.coin_change_memoized([1], 2), 2)
        self.assertEqual(dp_problems.coin_change_tabulation([1], 2), 2)

    def test_coin_change_no_solution(self):
        self.assertEqual(dp_problems.coin_change_memoized([7, 10], 13), -1)
        self.assertEqual(dp_problems.coin_change_tabulation([7, 10], 13), -1)

        self.assertEqual(dp_problems.coin_change_memoized([5, 6], 3), -1)
        self.assertEqual(dp_problems.coin_change_tabulation([5, 6], 3), -1)

    def test_coin_change_larger_amount(self):
        self.assertEqual(dp_problems.coin_change_memoized([1, 3, 4, 5], 7), 2) # (3+4) or (1+1+5) or (1+1+1+4)
        self.assertEqual(dp_problems.coin_change_tabulation([1, 3, 4, 5], 7), 2)

        self.assertEqual(dp_problems.coin_change_memoized([186, 419, 83, 408], 6249), 20)
        self.assertEqual(dp_problems.coin_change_tabulation([186, 419, 83, 408], 6249), 20)
        
    def test_coin_change_single_coin_too_large(self):
        self.assertEqual(dp_problems.coin_change_memoized([10], 3), -1)
        self.assertEqual(dp_problems.coin_change_tabulation([10], 3), -1)

    def test_coin_change_only_one_denomination(self):
        self.assertEqual(dp_problems.coin_change_memoized([5], 15), 3)
        self.assertEqual(dp_problems.coin_change_tabulation([5], 15), 3)
        self.assertEqual(dp_problems.coin_change_memoized([5], 13), -1)
        self.assertEqual(dp_problems.coin_change_tabulation([5], 13), -1)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)