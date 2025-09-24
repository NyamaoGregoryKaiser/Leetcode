```python
import unittest
from backtracking import n_queens, subsets, permutations


class TestBacktracking(unittest.TestCase):
    def test_n_queens(self):
        self.assertEqual(len(n_queens(4)), 2)  #Example: 2 solutions for 4 queens

    def test_subsets(self):
        self.assertEqual(subsets([1,2,3]), [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]])

    def test_permutations(self):
        self.assertEqual(permutations([1,2,3]), [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]])

if __name__ == '__main__':
    unittest.main()
```