import unittest
from src.n_queens import solve_n_queens

class TestNQueens(unittest.TestCase):

    def _normalize_solutions(self, list_of_solutions):
        """Helper to sort the list of solutions for consistent comparison."""
        # Each solution (list of strings) is sorted as a tuple of strings
        # Then the overall list of solutions is sorted.
        return sorted([tuple(s) for s in list_of_solutions])

    def test_n_equals_1(self):
        n = 1
        expected = [["Q"]]
        self.assertEqual(self._normalize_solutions(solve_n_queens(n)),
                         self._normalize_solutions(expected))

    def test_n_equals_2(self):
        n = 2
        expected = [] # No solutions for N=2
        self.assertEqual(self._normalize_solutions(solve_n_queens(n)),
                         self._normalize_solutions(expected))

    def test_n_equals_3(self):
        n = 3
        expected = [] # No solutions for N=3
        self.assertEqual(self._normalize_solutions(solve_n_queens(n)),
                         self._normalize_solutions(expected))

    def test_n_equals_4(self):
        n = 4
        expected = [
            [".Q..",  # Solution 1
             "...Q",
             "Q...",
             "..Q."],

            ["..Q.",  # Solution 2
             "Q...",
             "...Q",
             ".Q.."]
        ]
        self.assertEqual(self._normalize_solutions(solve_n_queens(n)),
                         self._normalize_solutions(expected))

    def test_n_equals_5(self):
        n = 5
        # For N=5, there are 10 solutions. We don't need to list all, just verify count.
        solutions = solve_n_queens(n)
        self.assertEqual(len(solutions), 10)
        # Check if a known solution exists
        self.assertIn(tuple([
            "Q....",
            "..Q..",
            "....Q",
            ".Q...",
            "...Q."
        ]), self._normalize_solutions(solutions))

    def test_n_equals_8(self):
        n = 8
        # For N=8, there are 92 solutions. Only check count.
        solutions = solve_n_queens(n)
        self.assertEqual(len(solutions), 92)

    def test_n_equals_0_edge_case(self):
        # Although constraints typically say N >= 1, it's good to consider 0.
        # An empty board with 0 queens is a valid "solution"
        n = 0
        expected = [[]]
        self.assertEqual(self._normalize_solutions(solve_n_queens(n)),
                         self._normalize_solutions(expected))

    def test_n_equals_negative_edge_case(self):
        # If N is negative, it's an invalid input for the problem as stated
        # Current implementation handles n=0, but not n < 0.
        # For this problem's constraints (1 <= N <= 9), negative N is out of scope.
        pass

if __name__ == '__main__':
    unittest.main()