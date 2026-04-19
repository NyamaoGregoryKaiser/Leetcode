import unittest
import sys
import os

# Add the project root to the sys.path to allow imports from 'algorithms'
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from algorithms.unique_paths import unique_paths_recursive, unique_paths_memo, unique_paths_tabulation, unique_paths_space_optimized, unique_paths_combinatorial

class TestUniquePaths(unittest.TestCase):

    def test_unique_paths_recursive(self):
        # m, n, expected
        test_cases = [
            (3, 7, 28),
            (3, 2, 3),
            (7, 3, 28),
            (1, 1, 1),
            (1, 5, 1),
            (5, 1, 1),
            (2, 2, 2), # RR, DD, RD, DR
            (2, 1, 1),
            (1, 2, 1)
        ]

        for m, n, exp in test_cases:
            with self.subTest(m=m, n=n):
                if m < 12 and n < 12: # Limit for brute-force tests due to RecursionError and slowness
                    self.assertEqual(unique_paths_recursive(m, n, 0, 0), exp)
                else:
                    # Skip very large inputs for brute-force due to performance
                    pass

    def test_unique_paths_memo(self):
        # m, n, expected
        test_cases = [
            (3, 7, 28),
            (3, 2, 3),
            (7, 3, 28),
            (1, 1, 1),
            (1, 5, 1),
            (5, 1, 1),
            (2, 2, 2),
            (2, 1, 1),
            (1, 2, 1),
            (10, 10, 48620), # Known value for 10x10 grid
            (18, 18, 2333606220), # Larger case
        ]

        for m, n, exp in test_cases:
            with self.subTest(m=m, n=n):
                self.assertEqual(unique_paths_memo(m, n, 0, 0, {}), exp)
        
        # Test with edge case zero rows/cols
        self.assertEqual(unique_paths_memo(0, 5, 0, 0, {}), 0) # Robot starts at 0,0. m=0 means grid is 0 rows high. Impossible.
        self.assertEqual(unique_paths_memo(5, 0, 0, 0, {}), 0)
        self.assertEqual(unique_paths_memo(0, 0, 0, 0, {}), 0) # Should ideally be 0, or handle as exception.
                                                              # Current recursive/memo code will hit r >= m or c >= n -> 0.

    def test_unique_paths_tabulation(self):
        # m, n, expected
        test_cases = [
            (3, 7, 28),
            (3, 2, 3),
            (7, 3, 28),
            (1, 1, 1),
            (1, 5, 1),
            (5, 1, 1),
            (2, 2, 2),
            (2, 1, 1),
            (1, 2, 1),
            (10, 10, 48620),
            (18, 18, 2333606220),
        ]

        for m, n, exp in test_cases:
            with self.subTest(m=m, n=n):
                self.assertEqual(unique_paths_tabulation(m, n), exp)
        
        # Test with edge case zero rows/cols
        self.assertEqual(unique_paths_tabulation(0, 5), 0)
        self.assertEqual(unique_paths_tabulation(5, 0), 0)
        self.assertEqual(unique_paths_tabulation(0, 0), 0)


    def test_unique_paths_space_optimized(self):
        # m, n, expected
        test_cases = [
            (3, 7, 28),
            (3, 2, 3),
            (7, 3, 28),
            (1, 1, 1),
            (1, 5, 1),
            (5, 1, 1),
            (2, 2, 2),
            (2, 1, 1),
            (1, 2, 1),
            (10, 10, 48620),
            (18, 18, 2333606220),
        ]

        for m, n, exp in test_cases:
            with self.subTest(m=m, n=n):
                self.assertEqual(unique_paths_space_optimized(m, n), exp)
        
        # Test with edge case zero rows/cols
        self.assertEqual(unique_paths_space_optimized(0, 5), 0)
        self.assertEqual(unique_paths_space_optimized(5, 0), 0)
        self.assertEqual(unique_paths_space_optimized(0, 0), 0)

    def test_unique_paths_combinatorial(self):
        # m, n, expected
        test_cases = [
            (3, 7, 28),
            (3, 2, 3),
            (7, 3, 28),
            (1, 1, 1),
            (1, 5, 1),
            (5, 1, 1),
            (2, 2, 2),
            (2, 1, 1),
            (1, 2, 1),
            (10, 10, 48620),
            (18, 18, 2333606220),
            (100, 100, 45519236166887375168904555815307558661877029571060960505199658097003004000000) # C(198, 99)
        ]

        for m, n, exp in test_cases:
            with self.subTest(m=m, n=n):
                self.assertEqual(unique_paths_combinatorial(m, n), exp)
        
        # Test with edge case zero rows/cols
        self.assertEqual(unique_paths_combinatorial(0, 5), 0)
        self.assertEqual(unique_paths_combinatorial(5, 0), 0)
        self.assertEqual(unique_paths_combinatorial(0, 0), 0)


if __name__ == '__main__':
    unittest.main()