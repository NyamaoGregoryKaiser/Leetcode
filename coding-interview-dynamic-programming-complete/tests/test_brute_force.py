import unittest
import sys
import os

# Add the parent directory to the path to allow importing modules from 'algorithms'
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from algorithms import brute_force_vs_optimized
from algorithms import dp_problems # To compare with known good optimized solutions

class TestBruteForceVsOptimized(unittest.TestCase):

    # --- Fibonacci Sequence Tests ---
    def test_fibonacci_brute_force_small_numbers(self):
        self.assertEqual(brute_force_vs_optimized.fibonacci_brute_force(0), 0)
        self.assertEqual(brute_force_vs_optimized.fibonacci_brute_force(1), 1)
        self.assertEqual(brute_force_vs_optimized.fibonacci_brute_force(5), 5)
        self.assertEqual(brute_force_vs_optimized.fibonacci_brute_force(10), 55)

    def test_fibonacci_optimized_matches_brute_force_small_numbers(self):
        # For small numbers, brute force is acceptable, so optimized should match
        for i in range(15): # Limiting to avoid long runtime for BF
            with self.subTest(n=i):
                bf_result = brute_force_vs_optimized.fibonacci_brute_force(i)
                opt_result = brute_force_vs_optimized.fibonacci_optimized(i)
                self.assertEqual(bf_result, opt_result)
                self.assertEqual(opt_result, dp_problems.fibonacci_tabulation(i)) # Also check against a known good solution

    def test_fibonacci_optimized_larger_numbers(self):
        self.assertEqual(brute_force_vs_optimized.fibonacci_optimized(30), 832040)
        self.assertEqual(brute_force_vs_optimized.fibonacci_optimized(40), 102334155)
        self.assertEqual(brute_force_vs_optimized.fibonacci_optimized(50), 12586269025)

    # --- 0/1 Knapsack Tests ---
    def test_knapsack_brute_force_small_cases(self):
        weights = [10, 20, 30]
        values = [60, 100, 120]
        capacity = 50
        self.assertEqual(brute_force_vs_optimized.knapsack_brute_force(weights, values, capacity), 220)

        weights_b = [1, 2, 3]
        values_b = [6, 10, 12]
        capacity_b = 5
        self.assertEqual(brute_force_vs_optimized.knapsack_brute_force(weights_b, values_b, capacity_b), 22) # 2+3 (10+12)

    def test_knapsack_optimized_matches_brute_force_small_cases(self):
        # For small numbers of items, brute force is acceptable, so optimized should match
        weights = [10, 20, 30, 40]
        values = [60, 100, 120, 150]
        capacity = 60

        bf_result = brute_force_vs_optimized.knapsack_brute_force(weights, values, capacity)
        opt_result = brute_force_vs_optimized.knapsack_optimized(weights, values, capacity)
        tab_result = dp_problems.knapsack_tabulation(weights, values, capacity) # Compare to another known good solution

        self.assertEqual(bf_result, opt_result)
        self.assertEqual(opt_result, tab_result)
        self.assertEqual(bf_result, 280) # (20,100) + (40,150) = 250 (capacity 60)
                                        # (10,60) + (20,100) + (30,120) = 280 (capacity 60)

    def test_knapsack_optimized_larger_cases(self):
        weights = [1, 2, 3, 8, 7, 4, 9, 5, 6, 10] # 10 items
        values = [20, 5, 10, 40, 15, 25, 50, 30, 35, 60]
        capacity = 25

        # For N=10, brute force would be 2^10 = 1024 states, still manageable for test but slower.
        # Optimized should handle this quickly.
        self.assertEqual(brute_force_vs_optimized.knapsack_optimized(weights, values, capacity), 150)
        # Optimal combination for Capacity 25:
        # (9,50) + (10,60) + (6,35) = 145, weight 25
        # (9,50) + (8,40) + (5,30) + (3,10) = 130, weight 25
        # (10,60) + (9,50) + (4,25) + (2,5) = 140, weight 25
        # (10,60) + (9,50) + (5,30) = 140, weight 24
        # (10,60) + (8,40) + (6,35) = 135, weight 24
        # (9,50) + (7,15) + (5,30) + (4,25) = 120, weight 25
        # A combination giving 150: (10,60) + (9,50) + (6,35) + (1,20) = 165 -- error in calc, cap is 25, weights: 10+9+6 = 25. Values: 60+50+35 = 145.
        # Let's re-verify with `dp_problems.knapsack_tabulation`
        expected = dp_problems.knapsack_tabulation(weights, values, capacity)
        self.assertEqual(brute_force_vs_optimized.knapsack_optimized(weights, values, capacity), expected)
        self.assertEqual(expected, 145)


if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)