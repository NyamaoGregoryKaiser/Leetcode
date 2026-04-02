```python
import unittest
from algorithms.knapsack_01 import Knapsack01

class TestKnapsack01(unittest.TestCase):

    def setUp(self):
        # Clear memoization caches before each test to ensure fresh runs
        # Knapsack01.knapsack_memoization is decorated outside, so clearing its cache is possible.
        Knapsack01.knapsack_memoization.cache_clear()

    def _run_all_methods(self, weights, values, capacity, expected):
        """Helper to run all non-bruteforce methods and assert results."""
        # For memoization, weights and values must be hashable, so pass tuples
        self.assertEqual(Knapsack01.knapsack_memoization(tuple(weights), tuple(values), capacity), expected,
                         f"Memoization failed for W={weights}, V={values}, C={capacity}")
        Knapsack01.knapsack_memoization.cache_clear() # Clear after each test case within _run_all_methods
        self.assertEqual(Knapsack01.knapsack_tabulation(weights, values, capacity), expected,
                         f"Tabulation failed for W={weights}, V={values}, C={capacity}")
        self.assertEqual(Knapsack01.knapsack_tabulation_space_optimized(weights, values, capacity), expected,
                         f"Space Optimized Tabulation failed for W={weights}, V={values}, C={capacity}")

    def test_knapsack_basic_cases(self):
        weights1 = [1, 2, 3]
        values1 = [6, 10, 12]
        capacity1 = 5
        expected1 = 22 # Items 2 (w=2,v=10) and 3 (w=3,v=12) => 2+3=5, 10+12=22
        self.assertEqual(Knapsack01.knapsack_recursive_bruteforce(weights1, values1, capacity1), expected1)
        self._run_all_methods(weights1, values1, capacity1, expected1)

        weights2 = [10, 20, 30]
        values2 = [60, 100, 120]
        capacity2 = 50
        expected2 = 220 # Items 20 (v=100) and 30 (v=120) => 20+30=50, 100+120=220
        self.assertEqual(Knapsack01.knapsack_recursive_bruteforce(weights2, values2, capacity2), expected2)
        self._run_all_methods(weights2, values2, capacity2, expected2)

    def test_knapsack_no_items_fit(self):
        weights = [10, 20, 30]
        values = [60, 100, 120]
        capacity = 5
        expected = 0 # No item fits
        self.assertEqual(Knapsack01.knapsack_recursive_bruteforce(weights, values, capacity), expected)
        self._run_all_methods(weights, values, capacity, expected)

    def test_knapsack_all_items_fit(self):
        weights = [1, 2, 3]
        values = [6, 10, 12]
        capacity = 10
        expected = 28 # All items fit: 6+10+12=28
        self.assertEqual(Knapsack01.knapsack_recursive_bruteforce(weights, values, capacity), expected)
        self._run_all_methods(weights, values, capacity, expected)

    def test_knapsack_single_item(self):
        weights = [10]
        values = [100]
        capacity = 5
        expected = 0 # Item too heavy
        self.assertEqual(Knapsack01.knapsack_recursive_bruteforce(weights, values, capacity), expected)
        self._run_all_methods(weights, values, capacity, expected)

        weights = [10]
        values = [100]
        capacity = 10
        expected = 100 # Item fits perfectly
        self.assertEqual(Knapsack01.knapsack_recursive_bruteforce(weights, values, capacity), expected)
        self._run_all_methods(weights, values, capacity, expected)

    def test_knapsack_empty_inputs(self):
        weights = []
        values = []
        capacity = 10
        expected = 0
        self.assertEqual(Knapsack01.knapsack_recursive_bruteforce(weights, values, capacity), expected)
        self._run_all_methods(weights, values, capacity, expected)

        weights = [1, 2]
        values = [10, 20]
        capacity = 0
        expected = 0
        self.assertEqual(Knapsack01.knapsack_recursive_bruteforce(weights, values, capacity), expected)
        self._run_all_methods(weights, values, capacity, expected)

    def test_knapsack_complex_case(self):
        weights = [2, 3, 4, 5]
        values = [3, 4, 5, 6]
        capacity = 5
        expected = 7 # Items (2,3) and (3,4) gives 3+4=7, weights 2+3=5.
                     # Item (5,6) gives 6, weights 5.
                     # Max is 7
        self.assertEqual(Knapsack01.knapsack_recursive_bruteforce(weights, values, capacity), expected)
        self._run_all_methods(weights, values, capacity, expected)

    def test_knapsack_duplicate_weights_values(self):
        weights = [2, 2, 3]
        values = [10, 10, 15]
        capacity = 4
        expected = 20 # Pick two items of (w=2,v=10). You can't pick both for 0/1, so this is wrong.
                      # Oh, each item is unique. So if items are [ (2,10), (2,10), (3,15) ]
                      # Capacity 4:
                      # Option 1: item 1 (2,10), then remaining cap 2, can't take item 2 (w=2, cap=2, 10+10=20)
                      # Option 2: item 1 (2,10), then remaining cap 2, cannot take item 3 (w=3)
                      # So if we take item 1 and item 2: (2,10) + (2,10) => 20 (W=4). This is the max.
                      # No, the problem statement says "put some items". If weights list has [2,2,3],
                      # these are distinct items. So taking 'item 0' (w=2, v=10) and 'item 1' (w=2, v=10)
                      # is valid and gives 20.
        self.assertEqual(Knapsack01.knapsack_recursive_bruteforce(weights, values, capacity), expected)
        self._run_all_methods(weights, values, capacity, expected)


if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
```