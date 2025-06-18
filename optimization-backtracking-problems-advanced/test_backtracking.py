```python
import unittest
from backtracking import n_queens, subsets, permutations

class TestBacktracking(unittest.TestCase):
    def test_n_queens(self):
        self.assertEqual(len(n_queens(4)), 2)  #Example test case, adjust as needed

    def test_subsets(self):
        self.assertEqual(subsets([1,2,3]), [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]])

    def test_permutations(self):
        self.assertEqual(sorted(permutations("abc")), sorted(["abc", "acb", "bac", "bca", "cab", "cba"]))


if __name__ == '__main__':
    unittest.main()
```