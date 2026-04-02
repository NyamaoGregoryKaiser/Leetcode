```python
import unittest
from algorithms.min_cost_climbing_stairs import MinCostClimbingStairs

class TestMinCostClimbingStairs(unittest.TestCase):

    def setUp(self):
        # Clear memoization caches before each test
        MinCostClimbingStairs.min_cost_memoization.cache_clear()

    def _get_memoized_result(self, cost_list):
        """Helper to get memoized result by considering both start points."""
        cost_tuple = tuple(cost_list)
        return min(
            MinCostClimbingStairs.min_cost_memoization(cost_tuple, 0),
            MinCostClimbingStairs.min_cost_memoization(cost_tuple, 1)
        )

    def _run_all_methods(self, cost, expected):
        """Helper to run all non-bruteforce methods and assert results."""
        self.assertEqual(self._get_memoized_result(cost), expected,
                         f"Memoization failed for cost={cost}")
        MinCostClimbingStairs.min_cost_memoization.cache_clear() # Clear after specific call
        self.assertEqual(MinCostClimbingStairs.min_cost_tabulation(cost), expected,
                         f"Tabulation failed for cost={cost}")
        self.assertEqual(MinCostClimbingStairs.min_cost_space_optimized(cost), expected,
                         f"Space Optimized Tabulation failed for cost={cost}")

    def test_min_cost_basic_cases(self):
        cost1 = [10, 15, 20]
        expected1 = 15 # Start at index 1, pay 15, then climb two steps to top (total 15).
        self.assertEqual(MinCostClimbingStairs.min_cost_recursive_bruteforce(cost1), expected1)
        self._run_all_methods(cost1, expected1)

        cost2 = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
        expected2 = 6 # Path 0->2->3->4->6->7->9, total 1+1+1+1+1+1 = 6
        self.assertEqual(MinCostClimbingStairs.min_cost_recursive_bruteforce(cost2), expected2)
        self._run_all_methods(cost2, expected2)

    def test_min_cost_edge_cases(self):
        # Empty cost array
        cost_empty = []
        expected_empty = 0
        # Brute force raises IndexError for empty list if not handled internally, but for
        # this problem, an empty list usually means 0 cost to reach top.
        self.assertEqual(MinCostClimbingStairs.min_cost_tabulation(cost_empty), expected_empty)
        self.assertEqual(MinCostClimbingStairs.min_cost_space_optimized(cost_empty), expected_empty)
        # Memoization and brute force often don't handle empty list as gracefully without explicit checks
        # if problem implies cost.length >= 2, but 0 is a valid case. Let's add specific handling.
        # min_cost_recursive_bruteforce(cost_empty) will attempt solve(0) on empty list, which is problematic.
        # Updated min_cost_space_optimized to handle n=0, n=1.

        # Single step
        cost_single = [10]
        expected_single = 0 # Can start at index 1 (which is past index 0), so cost 0.
        self.assertEqual(MinCostClimbingStairs.min_cost_tabulation(cost_single), expected_single)
        self.assertEqual(MinCostClimbingStairs.min_cost_space_optimized(cost_single), expected_single)
        # min_cost_recursive_bruteforce(cost_single) will yield min(10+0, 0) = 0
        self.assertEqual(MinCostClimbingStairs.min_cost_recursive_bruteforce(cost_single), expected_single)
        self._run_all_methods(cost_single, expected_single)

        # Two steps
        cost_two = [10, 1]
        expected_two = 1 # Start at index 1, pay 1, then climb two steps to top.
        self.assertEqual(MinCostClimbingStairs.min_cost_recursive_bruteforce(cost_two), expected_two)
        self._run_all_methods(cost_two, expected_two)

        cost_two_alt = [1, 10]
        expected_two_alt = 1 # Start at index 0, pay 1, then climb two steps to top.
        self.assertEqual(MinCostClimbingStairs.min_cost_recursive_bruteforce(cost_two_alt), expected_two_alt)
        self._run_all_methods(cost_two_alt, expected_two_alt)

    def test_min_cost_all_same_costs(self):
        cost = [5, 5, 5, 5]
        expected = 10 # (0->2->top, 5+5) or (1->3->top, 5+5)
        self.assertEqual(MinCostClimbingStairs.min_cost_recursive_bruteforce(cost), expected)
        self._run_all_methods(cost, expected)

        cost_long_same = [1] * 10
        expected_long_same = 5 # 10/2 = 5 if taking 2 steps always
        self.assertEqual(MinCostClimbingStairs.min_cost_recursive_bruteforce(cost_long_same), expected_long_same)
        self._run_all_methods(cost_long_same, expected_long_same)


if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
```