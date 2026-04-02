```python
import unittest
from algorithms.word_break import WordBreak

class TestWordBreak(unittest.TestCase):

    def setUp(self):
        # Clear memoization caches before each test
        # The memoization function takes start_index, so clearing is needed for each test case
        WordBreak.word_break_memoization.cache_clear()

    def _run_all_methods(self, s, word_dict, expected):
        """Helper to run all non-bruteforce methods and assert results."""
        # For memoization, word_dict must be hashable, so pass a frozenset
        self.assertEqual(WordBreak.word_break_memoization(s, frozenset(word_dict), 0), expected,
                         f"Memoization failed for '{s}', {word_dict}")
        WordBreak.word_break_memoization.cache_clear() # Clear after each specific test call
        self.assertEqual(WordBreak.word_break_tabulation(s, word_dict), expected,
                         f"Tabulation failed for '{s}', {word_dict}")

    def test_word_break_basic_cases(self):
        s1 = "leetcode"
        word_dict1 = {"leet", "code"}
        expected1 = True
        self.assertEqual(WordBreak.word_break_recursive_bruteforce(s1, word_dict1), expected1)
        self._run_all_methods(s1, word_dict1, expected1)

        s2 = "applepenapple"
        word_dict2 = {"apple", "pen"}
        expected2 = True
        self.assertEqual(WordBreak.word_break_recursive_bruteforce(s2, word_dict2), expected2)
        self._run_all_methods(s2, word_dict2, expected2)

        s3 = "catsandog"
        word_dict3 = {"cats", "dog", "sand", "and", "cat"}
        expected3 = False
        self.assertEqual(WordBreak.word_break_recursive_bruteforce(s3, word_dict3), expected3)
        self._run_all_methods(s3, word_dict3, expected3)

    def test_word_break_edge_cases(self):
        # Empty string
        self.assertEqual(WordBreak.word_break_recursive_bruteforce("", {"a", "b"}), True)
        self._run_all_methods("", {"a", "b"}, True) # Empty string can always be segmented (no words needed)

        # Empty dictionary
        self.assertEqual(WordBreak.word_break_recursive_bruteforce("abc", set()), False)
        self._run_all_methods("abc", set(), False)
        self.assertEqual(WordBreak.word_break_recursive_bruteforce("", set()), True) # Empty string, empty dict

        # String cannot be broken
        s = "programmer"
        word_dict = {"program", "mer"}
        expected = False # 'mer' needs to be 'mer', not end of string 'er'
        self.assertEqual(WordBreak.word_break_recursive_bruteforce(s, word_dict), expected)
        self._run_all_methods(s, word_dict, expected)

        # Single character string
        self.assertEqual(WordBreak.word_break_recursive_bruteforce("a", {"a"}), True)
        self._run_all_methods("a", {"a"}, True)
        self.assertEqual(WordBreak.word_break_recursive_bruteforce("a", {"b"}), False)
        self._run_all_methods("a", {"b"}, False)

    def test_word_break_long_string_and_dict(self):
        s = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
        word_dict = {"a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"}
        expected = False # Ends with 'b', which is not in dictionary.

        # Brute force might be too slow for this one, or hit recursion limit.
        # self.assertEqual(WordBreak.word_break_recursive_bruteforce(s, word_dict), expected)

        self._run_all_methods(s, word_dict, expected)

        s_long_true = "ab" * 200 # A very long string
        word_dict_long_true = {"a", "b", "ab"}
        expected_long_true = True
        self._run_all_methods(s_long_true, word_dict_long_true, expected_long_true)

    def test_word_break_no_split(self):
        s = "helloworld"
        word_dict = {"hello", "world"}
        expected = True
        self.assertEqual(WordBreak.word_break_recursive_bruteforce(s, word_dict), expected)
        self._run_all_methods(s, word_dict, expected)

        s = "helloworld"
        word_dict = {"hell", "o", "world"}
        expected = True # hell o world
        self.assertEqual(WordBreak.word_break_recursive_bruteforce(s, word_dict), expected)
        self._run_all_methods(s, word_dict, expected)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
```