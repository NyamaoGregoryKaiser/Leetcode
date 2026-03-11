import unittest
import timeit
import sys
import os

# Add the parent directory of 'main_algorithms' to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main_algorithms.string_problems import StringProblems
from main_algorithms.brute_force_solutions import BruteForceStringProblems
from main_algorithms.optimized_solutions import OptimizedStringProblems
from utils.helpers import TestHelpers

class PerformanceTest(unittest.TestCase):

    # --- Performance for Longest Palindromic Substring ---
    def test_lps_performance(self):
        print("\n--- Longest Palindromic Substring Performance Comparison ---")
        
        # Test cases for different string lengths
        lengths = [10, 50, 100, 200, 500] # For N^2 algorithms
        # For Manacher, might test even longer if needed, but the bottleneck for tests might be N^2 ones
        # and generating the string itself.

        algorithms = {
            "Brute Force (O(N^3))": BruteForceStringProblems.longest_palindromic_substring_brute_force,
            "DP (O(N^2))": StringProblems.longest_palindromic_substring_dp,
            "Expand Around Center (O(N^2))": StringProblems.longest_palindromic_substring_expand_around_center,
            "Manacher's (O(N))": OptimizedStringProblems.longest_palindromic_substring_manacher
        }

        # Number of repetitions for timeit
        number_of_runs = 100
        
        # String generation options
        char_set = string.ascii_lowercase

        for length in lengths:
            # Generate a string where a long palindrome is likely, to hit worst-case for some algorithms
            test_string_palindrome = TestHelpers.generate_random_palindromic_string(length, char_set)
            # Generate a more random string
            test_string_random = TestHelpers.generate_random_string(length, char_set)

            print(f"\nString Length: {length}")
            
            for name, func in algorithms.items():
                # Test with a string known to contain a long palindrome
                setup_code_palindrome = f"""
from main_algorithms.string_problems import StringProblems
from main_algorithms.brute_force_solutions import BruteForceStringProblems
from main_algorithms.optimized_solutions import OptimizedStringProblems
s = '{test_string_palindrome}'
func = {func.__module__}.{func.__name__}
"""
                time_taken_palindrome = timeit.timeit("func(s)", setup=setup_code_palindrome, number=number_of_runs)
                print(f"  {name:<30} (Palindrome Worst-Case): {time_taken_palindrome/number_of_runs:.6f} seconds/run")

                # Test with a more random string (average case)
                setup_code_random = f"""
from main_algorithms.string_problems import StringProblems
from main_algorithms.brute_force_solutions import BruteForceStringProblems
from main_algorithms.optimized_solutions import OptimizedStringProblems
s = '{test_string_random}'
func = {func.__module__}.{func.__name__}
"""
                time_taken_random = timeit.timeit("func(s)", setup=setup_code_random, number=number_of_runs)
                print(f"  {name:<30} (Random Average-Case): {time_taken_random/number_of_runs:.6f} seconds/run")
                
                # Assert correctness with a baseline check for larger lengths if brute force is skipped
                if name != "Brute Force (O(N^3))" and length <= 500: # Manacher for 500 might be too slow for DP/EAC comparisons
                    expected_palindrome = StringProblems.longest_palindromic_substring_expand_around_center(test_string_palindrome)
                    actual_palindrome = func(test_string_palindrome)
                    self.assertTrue(len(actual_palindrome) == len(expected_palindrome), f"Mismatch in length for {name} on {test_string_palindrome}")
                    
                    expected_random = StringProblems.longest_palindromic_substring_expand_around_center(test_string_random)
                    actual_random = func(test_string_random)
                    self.assertTrue(len(actual_random) == len(expected_random), f"Mismatch in length for {name} on {test_string_random}")


    # --- Performance for Group Anagrams ---
    def test_group_anagrams_performance(self):
        print("\n--- Group Anagrams Performance Comparison ---")

        # Test cases: varying number of words (N) and word length (K)
        test_configs = [
            {"num_words": 10, "word_length": 5, "runs": 100},
            {"num_words": 50, "word_length": 10, "runs": 50},
            {"num_words": 100, "word_length": 15, "runs": 20},
            {"num_words": 500, "word_length": 20, "runs": 5}, # Larger N
            {"num_words": 10, "word_length": 100, "runs": 50}, # Larger K
        ]

        algorithms = {
            "Brute Force (O(N^2 * K log K))": BruteForceStringProblems.group_anagrams_brute_force,
            "Sorted String Key (O(N * K log K))": StringProblems.group_anagrams,
            "Char Count Key (O(N * K))": OptimizedStringProblems.group_anagrams_char_count
        }

        for config in test_configs:
            num_words = config["num_words"]
            word_length = config["word_length"]
            number_of_runs = config["runs"]

            test_strs = TestHelpers.generate_random_anagram_list(num_words, word_length)
            
            print(f"\nNum Words: {num_words}, Word Length: {word_length}, Runs: {number_of_runs}")

            # Use one known-correct implementation as baseline for correctness check
            expected_groups = StringProblems.group_anagrams(test_strs)
            
            for name, func in algorithms.items():
                # Brute Force can be very slow for larger inputs
                if "Brute Force" in name and (num_words > 100 or word_length > 20):
                    print(f"  {name:<30} (Skipped due to expected high runtime)")
                    continue

                setup_code = f"""
from main_algorithms.string_problems import StringProblems
from main_algorithms.brute_force_solutions import BruteForceStringProblems
from main_algorithms.optimized_solutions import OptimizedStringProblems
test_strs = {test_strs!r}
func = {func.__module__}.{func.__name__}
"""
                time_taken = timeit.timeit("func(test_strs)", setup=setup_code, number=number_of_runs)
                print(f"  {name:<30}: {time_taken/number_of_runs:.6f} seconds/run")

                # Basic correctness check
                actual_groups = func(test_strs)
                
                # Helper to sort groups for comparison
                canonical_actual = sorted([sorted(group) for group in actual_groups])
                canonical_expected = sorted([sorted(group) for group in expected_groups])
                self.assertEqual(canonical_actual, canonical_expected, f"Mismatch for {name} with N={num_words}, K={word_length}")


if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)