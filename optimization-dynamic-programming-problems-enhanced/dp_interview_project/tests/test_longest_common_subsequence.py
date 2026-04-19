import unittest
import sys
import os

# Add the project root to the sys.path to allow imports from 'algorithms'
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from algorithms.longest_common_subsequence import lcs_recursive, lcs_memo, lcs_tabulation

class TestLongestCommonSubsequence(unittest.TestCase):

    def test_lcs_recursive(self):
        # s1, s2, expected
        test_cases = [
            ("AGGTAB", "GXTXAYB", 4),
            ("ABCDGH", "AEDFHR", 3),
            ("ABC", "ACB", 2),
            ("ABC", "ABC", 3),
            ("ABC", "DEF", 0),
            ("", "ABC", 0),
            ("ABC", "", 0),
            ("A", "A", 1),
            ("A", "B", 0),
        ]

        for s1, s2, exp in test_cases:
            with self.subTest(s1=s1, s2=s2):
                m, n = len(s1), len(s2)
                if m < 15 and n < 15: # Limit for brute-force tests
                    self.assertEqual(lcs_recursive(s1, s2, m, n), exp)
                else:
                    # Skip very large inputs for brute-force due to performance
                    pass

    def test_lcs_memo(self):
        # s1, s2, expected
        test_cases = [
            ("AGGTAB", "GXTXAYB", 4),
            ("ABCDGH", "AEDFHR", 3),
            ("ABC", "ACB", 2),
            ("ABC", "ABC", 3),
            ("ABC", "DEF", 0),
            ("", "ABC", 0),
            ("ABC", "", 0),
            ("A", "A", 1),
            ("A", "B", 0),
            ("ABAZDC", "BACBAD", 4),
            ("LONGWORD", "ANOTHER", 3),
            ("XMJYAUZ", "MZJAWXU", 4) # MJAU
        ]

        for s1, s2, exp in test_cases:
            with self.subTest(s1=s1, s2=s2):
                m, n = len(s1), len(s2)
                self.assertEqual(lcs_memo(s1, s2, m, n, {}), exp)

        # Test with larger strings
        s1_large = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" * 2
        s2_large = "XBCYDEFZGHAIJKLBMNOCDPQRSTUVW" * 2
        # LCS will be 26*2 = 52. (all letters appear in order)
        self.assertEqual(lcs_memo(s1_large, s2_large, len(s1_large), len(s2_large), {}), 52)

    def test_lcs_tabulation(self):
        # s1, s2, expected
        test_cases = [
            ("AGGTAB", "GXTXAYB", 4),
            ("ABCDGH", "AEDFHR", 3),
            ("ABC", "ACB", 2),
            ("ABC", "ABC", 3),
            ("ABC", "DEF", 0),
            ("", "ABC", 0),
            ("ABC", "", 0),
            ("A", "A", 1),
            ("A", "B", 0),
            ("ABAZDC", "BACBAD", 4),
            ("LONGWORD", "ANOTHER", 3),
            ("XMJYAUZ", "MZJAWXU", 4)
        ]

        for s1, s2, exp in test_cases:
            with self.subTest(s1=s1, s2=s2):
                self.assertEqual(lcs_tabulation(s1, s2), exp)

        # Test with larger strings
        s1_large = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" * 2
        s2_large = "XBCYDEFZGHAIJKLBMNOCDPQRSTUVW" * 2
        self.assertEqual(lcs_tabulation(s1_large, s2_large), 52)
        
        # Test with no common characters, long strings
        s1_no_common = "ABCDEF" * 10
        s2_no_common = "GHIJKL" * 10
        self.assertEqual(lcs_tabulation(s1_no_common, s2_no_common), 0)


if __name__ == '__main__':
    unittest.main()