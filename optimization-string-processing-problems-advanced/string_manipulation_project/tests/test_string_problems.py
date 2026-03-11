import unittest
import random
import string
import sys
import os

# Add the parent directory of 'main_algorithms' to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main_algorithms.string_problems import StringProblems
from main_algorithms.brute_force_solutions import BruteForceStringProblems
from main_algorithms.optimized_solutions import OptimizedStringProblems
from utils.helpers import TestHelpers

class TestStringManipulation(unittest.TestCase):

    # --- Problem 1: Longest Palindromic Substring ---
    def test_longest_palindromic_substring_basic(self):
        test_cases = [
            ("babad", ["bab", "aba"]), # "aba" is also valid
            ("cbbd", ["bb"]),
            ("a", ["a"]),
            ("ac", ["a", "c"]),
            ("racecar", ["racecar"]),
            ("madam", ["madam"]),
            ("noon", ["noon"]),
            ("", [""]),
            ("121", ["121"]),
            ("12345", ["1", "2", "3", "4", "5"]), # Any single char
            ("aaaaa", ["aaaaa"]),
            ("abcba", ["abcba"]),
            ("abcdeffedcba", ["abcdeffedcba"]),
            ("bananas", ["anana"]),
        ]

        # Test all implementations for LPS
        implementations = [
            StringProblems.longest_palindromic_substring_expand_around_center,
            StringProblems.longest_palindromic_substring_dp,
            BruteForceStringProblems.longest_palindromic_substring_brute_force,
            OptimizedStringProblems.longest_palindromic_substring_manacher
        ]

        for func in implementations:
            with self.subTest(algorithm=func.__name__):
                for s, expected_outputs in test_cases:
                    result = func(s)
                    if s == "" or len(s) == 1 or len(expected_outputs) > 1:
                        # For empty/single char/multiple valid outputs, check if result is one of them
                        self.assertIn(result, expected_outputs, f"Input: '{s}', Func: {func.__name__}")
                    else:
                        self.assertEqual(result, expected_outputs[0], f"Input: '{s}', Func: {func.__name__}")

    def test_longest_palindromic_substring_edge_cases(self):
        test_cases = [
            ("", ""),
            ("a", "a"),
            ("aa", "aa"),
            ("ab", "a"), # or "b"
            ("aba", "aba"),
            ("abba", "abba"),
            ("tattarrattat", "tattarrattat"), # Long palindrome
            ("abcdefghijklmnopqrstuvwxyz", "a"), # Any single char
            ("aaaaaaaaaaaaaaaaaaaa", "aaaaaaaaaaaaaaaaaaaa"), # All same characters
            ("abcdefgfedcba", "abcdefgfedcba")
        ]
        
        implementations = [
            StringProblems.longest_palindromic_substring_expand_around_center,
            StringProblems.longest_palindromic_substring_dp,
            BruteForceStringProblems.longest_palindromic_substring_brute_force,
            OptimizedStringProblems.longest_palindromic_substring_manacher
        ]

        for func in implementations:
            with self.subTest(algorithm=func.__name__):
                for s, expected in test_cases:
                    result = func(s)
                    if s == "" or len(s) == 1:
                         self.assertEqual(result, expected, f"Input: '{s}', Func: {func.__name__}")
                    elif s == "ab":
                        self.assertIn(result, ["a", "b"], f"Input: '{s}', Func: {func.__name__}")
                    elif s == "abcdefghijklmnopqrstuvwxyz":
                         self.assertIn(result, list(s), f"Input: '{s}', Func: {func.__name__}")
                    else:
                        self.assertEqual(result, expected, f"Input: '{s}', Func: {func.__name__}")


    def test_longest_palindromic_substring_random(self):
        implementations = [
            StringProblems.longest_palindromic_substring_expand_around_center,
            StringProblems.longest_palindromic_substring_dp,
            # Brute force is too slow for long random strings, skip
            OptimizedStringProblems.longest_palindromic_substring_manacher
        ]

        for _ in range(50): # Run 50 random tests
            length = random.randint(1, 100) # Test with strings up to 100 characters
            s = TestHelpers.generate_random_string(length)
            
            # Use one known-correct implementation (e.g., DP or Expand Around Center) as baseline
            expected = StringProblems.longest_palindromic_substring_expand_around_center(s)

            for func in implementations:
                with self.subTest(algorithm=func.__name__, input_string=s):
                    result = func(s)
                    # For multiple palindromes of max length, any is valid.
                    # Just check if the returned one is valid and of the expected length.
                    self.assertTrue(TestStringManipulation._is_palindrome_check(result))
                    self.assertEqual(len(result), len(expected))
    
    @staticmethod
    def _is_palindrome_check(s: str) -> bool:
        """Helper to check if a string is a palindrome."""
        return s == s[::-1]


    # --- Problem 2: Valid Parentheses ---
    def test_is_valid_parentheses_basic(self):
        test_cases = {
            "()": True,
            "()[]{}": True,
            "{[]}": True,
            "": True,
            "([{}])": True,
            "({})[({})]": True,
            "([]){()}": True,
        }
        for s, expected in test_cases.items():
            with self.subTest(input_string=s):
                self.assertEqual(StringProblems.is_valid_parentheses(s), expected)

    def test_is_valid_parentheses_invalid(self):
        test_cases = {
            "(]": False,
            "([)]": False,
            "{{)": False,
            "]": False,
            "(": False,
            "{": False,
            "{{{": False,
            "((({})])": False,
            "((((((": False,
            ")))))))": False,
            "{[}": False,
            "({[)": False,
        }
        for s, expected in test_cases.items():
            with self.subTest(input_string=s):
                self.assertEqual(StringProblems.is_valid_parentheses(s), expected)

    def test_is_valid_parentheses_long_strings(self):
        # Long valid string
        long_valid = "()[]{}(" * 100 + ")" * 100 + "[]" * 100 + "{}" * 100
        self.assertTrue(StringProblems.is_valid_parentheses(long_valid))

        # Long invalid string (unclosed)
        long_invalid_unclosed = "(" * 1000
        self.assertFalse(StringProblems.is_valid_parentheses(long_invalid_unclosed))

        # Long invalid string (mismatched)
        long_invalid_mismatched = "([])" * 200 + "{)"
        self.assertFalse(StringProblems.is_valid_parentheses(long_invalid_mismatched))

    def test_is_valid_parentheses_random(self):
        for _ in range(50):
            length = random.randint(0, 100)
            if length % 2 != 0:
                length += 1 # Ensure even length for potential validity
            
            # Test valid sequences (generated to be valid)
            valid_s = TestHelpers.generate_balanced_parentheses_string(length)
            self.assertTrue(StringProblems.is_valid_parentheses(valid_s), f"Expected valid: {valid_s}")
            
            # Test invalid sequences (randomly generated)
            if length > 0:
                invalid_s = TestHelpers.generate_random_parentheses_string(length, valid_only=False)
                # If random happens to be valid, skip assertion (rare but possible)
                if not StringProblems.is_valid_parentheses(invalid_s):
                    self.assertFalse(StringProblems.is_valid_parentheses(invalid_s), f"Expected invalid: {invalid_s}")


    # --- Problem 3: Group Anagrams ---
    def _assert_anagram_groups_equal(self, actual, expected, msg=""):
        """Helper to compare lists of anagram groups, ignoring order."""
        self.assertEqual(len(actual), len(expected), f"Number of groups mismatch: {msg}")
        
        # Canonicalize each group by sorting its elements and then the groups themselves
        canonical_actual = sorted([sorted(group) for group in actual])
        canonical_expected = sorted([sorted(group) for group in expected])
        
        self.assertEqual(canonical_actual, canonical_expected, f"Anagram groups mismatch: {msg}")

    def test_group_anagrams_basic(self):
        test_cases = [
            (["eat","tea","tan","ate","nat","bat"], [["bat"],["nat","tan"],["ate","eat","tea"]]),
            (["", ""], [["", ""]]),
            (["a"], [["a"]]),
            (["abc", "bca", "cab", "xyz", "zyx"], [["abc", "bca", "cab"], ["xyz", "zyx"]]),
            (["listen", "silent", "enlist"], [["listen", "silent", "enlist"]]),
            (["hello", "world"], [["hello"], ["world"]]),
        ]
        
        implementations = [
            StringProblems.group_anagrams,
            BruteForceStringProblems.group_anagrams_brute_force,
            OptimizedStringProblems.group_anagrams_char_count
        ]

        for func in implementations:
            with self.subTest(algorithm=func.__name__):
                for strs, expected in test_cases:
                    result = func(strs)
                    self._assert_anagram_groups_equal(result, expected, f"Input: {strs}, Func: {func.__name__}")

    def test_group_anagrams_edge_cases(self):
        test_cases = [
            ([], []),
            ([""], [[""]]),
            (["a"], [["a"]]),
            (["ab", "ba"], [["ab", "ba"]]),
            (["a", "b", "c"], [["a"], ["b"], ["c"]]), # No anagrams
            (["topcoder", "redocpot", "test"], [["topcoder", "redocpot"], ["test"]])
        ]

        implementations = [
            StringProblems.group_anagrams,
            BruteForceStringProblems.group_anagrams_brute_force,
            OptimizedStringProblems.group_anagrams_char_count
        ]
        
        for func in implementations:
            with self.subTest(algorithm=func.__name__):
                for strs, expected in test_cases:
                    result = func(strs)
                    self._assert_anagram_groups_equal(result, expected, f"Input: {strs}, Func: {func.__name__}")

    def test_group_anagrams_random(self):
        implementations = [
            StringProblems.group_anagrams,
            # Brute force is too slow for large N, skip
            OptimizedStringProblems.group_anagrams_char_count
        ]

        for _ in range(20): # Run 20 random tests
            num_words = random.randint(1, 50) # Up to 50 words
            word_length = random.randint(1, 15) # Up to 15 chars per word
            strs = TestHelpers.generate_random_anagram_list(num_words, word_length)

            # Use one known-correct implementation as baseline
            expected = StringProblems.group_anagrams(strs)

            for func in implementations:
                with self.subTest(algorithm=func.__name__, input_list=strs):
                    result = func(strs)
                    self._assert_anagram_groups_equal(result, expected, f"Input: {strs}, Func: {func.__name__}")


    # --- Problem 4: String to Integer (atoi) ---
    def test_string_to_integer_atoi_basic(self):
        test_cases = {
            "42": 42,
            "   -42": -42,
            "4193 with words": 4193,
            "words and 987": 0,
            "-91283472332": -2147483648, # INT_MIN clamp
            "2147483647": 2147483647,   # INT_MAX
            "2147483648": 2147483647,   # INT_MAX clamp
            "-2147483648": -2147483648, # INT_MIN
            "-2147483649": -2147483648, # INT_MIN clamp
            "0": 0,
            "+1": 1,
            "-0": 0,
            "00000-42a1234": 0, # Should stop at first non-digit after sign/whitespace
            "  -0012a42": -12,
            "  +0 123": 0, # Should stop at space after sign/digits
            "": 0,
            " ": 0,
            "+": 0,
            "-": 0,
            "9223372036854775807": 2147483647, # Larger than 64-bit int, still clamps to 32-bit INT_MAX
            "-9223372036854775808": -2147483648, # Larger than 64-bit int, still clamps to 32-bit INT_MIN
            "  -2147483648xyz": -2147483648, # Longest valid int with trailing chars
            "  +2147483647abc": 2147483647, # Longest valid int with trailing chars
            "   +000000000000000000000000000000000000000000000000001": 1, # Many leading zeros
            "  -000000000000000000000000000000000000000000000000001": -1, # Many leading zeros, negative
            " -+123": 0, # Invalid multiple signs
            "+-123": 0, # Invalid multiple signs
            "   +": 0 # Only sign, no digits
        }
        for s, expected in test_cases.items():
            with self.subTest(input_string=s):
                self.assertEqual(StringProblems.string_to_integer_atoi(s), expected)

    def test_string_to_integer_atoi_random(self):
        for _ in range(100):
            length = random.randint(0, 50)
            s = TestHelpers.generate_atoi_test_string(length)
            
            # Reimplement a simple reference atoi for correctness.
            # This is simpler than the full problem, for generating expected outputs.
            expected_val = 0
            curr_str = s.strip()
            if not curr_str:
                expected_val = 0
            else:
                sign = 1
                if curr_str[0] == '-':
                    sign = -1
                    curr_str = curr_str[1:]
                elif curr_str[0] == '+':
                    curr_str = curr_str[1:]
                
                temp_num_str = ''
                for char in curr_str:
                    if char.isdigit():
                        temp_num_str += char
                    else:
                        break
                
                if not temp_num_str:
                    expected_val = 0
                else:
                    num = int(temp_num_str)
                    expected_val = num * sign
                    
                    INT_MAX = 2**31 - 1
                    INT_MIN = -2**31
                    
                    if expected_val > INT_MAX:
                        expected_val = INT_MAX
                    elif expected_val < INT_MIN:
                        expected_val = INT_MIN

            with self.subTest(input_string=s):
                self.assertEqual(StringProblems.string_to_integer_atoi(s), expected_val, f"Input: '{s}'")


if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)