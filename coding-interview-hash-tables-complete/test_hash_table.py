```python
import unittest
from hash_table_problems import two_sum, is_anagram, group_anagrams, longest_consecutive

class TestHashTableProblems(unittest.TestCase):
    def test_two_sum(self):
        self.assertEqual(two_sum([2, 7, 11, 15], 9), [0, 1])
        self.assertEqual(two_sum([3, 2, 4], 6), [1, 2])
        self.assertIsNone(two_sum([3, 3], 6)) #test edge case of only one solution

    def test_is_anagram(self):
        self.assertTrue(is_anagram("anagram", "nagaram"))
        self.assertFalse(is_anagram("rat", "car"))
        self.assertTrue(is_anagram("","")); #empty string edge case

    def test_group_anagrams(self):
      #This test needs refinement for comprehensive coverage.
      self.assertEqual(group_anagrams(["eat","tea","tan","ate","nat","bat"]), [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']])

    def test_longest_consecutive(self):
        self.assertEqual(longest_consecutive([100, 4, 200, 1, 3, 2]), 4)
        self.assertEqual(longest_consecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]), 9)


if __name__ == '__main__':
    unittest.main()
```