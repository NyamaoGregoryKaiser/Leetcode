# tests/test_n_queens.py

import unittest
from src.backtracking_problems import BacktrackingSolutions
from src.utils import compare_list_of_lists, pretty_print_n_queens_board

class TestNQueens(unittest.TestCase):
    def setUp(self):
        self.solver = BacktrackingSolutions()

    def test_n_is_1(self):
        n = 1
        expected = [["Q"]]
        result = self.solver.n_queens(n)
        self.assertEqual(len(result), 1)
        self.assertTrue(compare_list_of_lists(expected, result))
        # print(f"\nN={n} Solutions:")
        # for board in result:
        #     pretty_print_n_queens_board(board)

    def test_n_is_2(self):
        n = 2
        expected = [] # No solutions for N=2
        result = self.solver.n_queens(n)
        self.assertEqual(len(result), 0)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_n_is_3(self):
        n = 3
        expected = [] # No solutions for N=3
        result = self.solver.n_queens(n)
        self.assertEqual(len(result), 0)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_n_is_4(self):
        n = 4
        expected = [
            [".Q..", "...Q", "Q...", "..Q."],
            ["..Q.", "Q...", "...Q", ".Q.."]
        ]
        result = self.solver.n_queens(n)
        self.assertEqual(len(result), 2)
        self.assertTrue(compare_list_of_lists(expected, result))
        # print(f"\nN={n} Solutions:")
        # for board in result:
        #     pretty_print_n_queens_board(board)

    def test_n_is_5(self):
        n = 5
        # There are 10 solutions for N=5. We'll just check the count.
        result = self.solver.n_queens(n)
        self.assertEqual(len(result), 10)
        # print(f"\nN={n} Solutions:")
        # for board in result:
        #     pretty_print_n_queens_board(board)

    def test_n_is_8(self):
        n = 8
        # There are 92 solutions for N=8. We'll just check the count.
        result = self.solver.n_queens(n)
        self.assertEqual(len(result), 92)
        # print(f"\nN={n} Solutions:")
        # for i, board in enumerate(result):
        #     if i < 3: # Print first 3 solutions for brevity
        #         pretty_print_n_queens_board(board)
        # print("...") # Indicate more solutions exist

    def test_n_is_0_invalid_input(self):
        # The problem constraints usually imply N >= 1.
        # Our current implementation will return an empty list if n=0.
        n = 0
        expected = [[]] if 0 == 0 else [] # If n=0, an empty board is a trivial solution if board representation allows for it.
                                            # Our build_board_representation would produce an empty list.
        result = self.solver.n_queens(n)
        # For N=0, the definition of an empty board varies.
        # If n=0, the loop range(n) won't run, `results.append(build_board_representation())`
        # will append an empty list, so `[[]]` is the expected behavior.
        self.assertEqual(len(result), 1)
        self.assertTrue(compare_list_of_lists([[]], result))


if __name__ == '__main__':
    unittest.main()