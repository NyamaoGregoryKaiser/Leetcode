```python
import unittest
from dp_algorithms import fibonacci_iterative, fibonacci_recursive_memo, knapsack_01, lcs_length

class TestDPAlgorithms(unittest.TestCase):
    def test_fibonacci(self):
        self.assertEqual(fibonacci_iterative(0), 0)
        self.assertEqual(fibonacci_iterative(1), 1)
        self.assertEqual(fibonacci_iterative(5), 5)
        self.assertEqual(fibonacci_recursive_memo(0), 0)
        self.assertEqual(fibonacci_recursive_memo(1), 1)
        self.assertEqual(fibonacci_recursive_memo(5), 5)

    def test_knapsack(self):
        weights = [10, 20, 30]
        values = [60, 100, 120]
        capacity = 50
        self.assertEqual(knapsack_01(weights, values, capacity), 220) # 20 + 200

    def test_lcs(self):
        seq1 = "AGGTAB"
        seq2 = "GXTXAYB"
        self.assertEqual(lcs_length(seq1, seq2), 4)  # "GTAB"


if __name__ == '__main__':
    unittest.main()
```