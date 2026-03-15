import unittest
from src.problems import HashTableProblems

class TestHashTableProblems(unittest.TestCase):

    def setUp(self):
        self.solver = HashTableProblems()

    # --- Test Cases for Two Sum ---
    def test_two_sum_basic(self):
        self.assertIn(self.solver.two_sum([2, 7, 11, 15], 9), [[0, 1], [1, 0]])
        self.assertIn(self.solver.two_sum_brute_force([2, 7, 11, 15], 9), [[0, 1], [1, 0]])

    def test_two_sum_different_order(self):
        self.assertIn(self.solver.two_sum([3, 2, 4], 6), [[1, 2], [2, 1]])
        self.assertIn(self.solver.two_sum_brute_force([3, 2, 4], 6), [[1, 2], [2, 1]])

    def test_two_sum_duplicates_target_sum(self):
        self.assertIn(self.solver.two_sum([3, 3], 6), [[0, 1], [1, 0]])
        self.assertIn(self.solver.two_sum_brute_force([3, 3], 6), [[0, 1], [1, 0]])

    def test_two_sum_negative_numbers(self):
        self.assertIn(self.solver.two_sum([-1, -2, -3, -4, -5], -8), [[2, 4], [4, 2]])
        self.assertIn(self.solver.two_sum_brute_force([-1, -2, -3, -4, -5], -8), [[2, 4], [4, 2]])

    def test_two_sum_zero_and_positive(self):
        self.assertIn(self.solver.two_sum([0, 4, 3, 0], 0), [[0, 3], [3, 0]])
        self.assertIn(self.solver.two_sum_brute_force([0, 4, 3, 0], 0), [[0, 3], [3, 0]])

    def test_two_sum_large_numbers(self):
        self.assertIn(self.solver.two_sum([10**9, 2*10**9, 3*10**9], 4*10**9), [[0, 2], [2, 0]])

    # --- Test Cases for Group Anagrams ---
    def test_group_anagrams_basic(self):
        strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
        expected = [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
        # Sort inner lists and outer list to ensure consistent comparison
        result_sorted_key = sorted([sorted(group) for group in self.solver.group_anagrams(strs)])
        result_char_count_key = sorted([sorted(group) for group in self.solver.group_anagrams_char_count(strs)])
        expected_sorted = sorted([sorted(group) for group in expected])
        self.assertEqual(result_sorted_key, expected_sorted)
        self.assertEqual(result_char_count_key, expected_sorted)

    def test_group_anagrams_empty_list(self):
        self.assertEqual(self.solver.group_anagrams([]), [])
        self.assertEqual(self.solver.group_anagrams_char_count([]), [])

    def test_group_anagrams_empty_strings(self):
        strs = [""]
        expected = [[""]]
        self.assertEqual(self.solver.group_anagrams(strs), expected)
        self.assertEqual(self.solver.group_anagrams_char_count(strs), expected)

    def test_group_anagrams_single_char_strings(self):
        strs = ["a", "b", "c"]
        expected = [["a"], ["b"], ["c"]]
        result_sorted_key = sorted([sorted(group) for group in self.solver.group_anagrams(strs)])
        result_char_count_key = sorted([sorted(group) for group in self.solver.group_anagrams_char_count(strs)])
        expected_sorted = sorted([sorted(group) for group in expected])
        self.assertEqual(result_sorted_key, expected_sorted)
        self.assertEqual(result_char_count_key, expected_sorted)

    def test_group_anagrams_no_anagrams(self):
        strs = ["abc", "def", "ghi"]
        expected = [["abc"], ["def"], ["ghi"]]
        result_sorted_key = sorted([sorted(group) for group in self.solver.group_anagrams(strs)])
        result_char_count_key = sorted([sorted(group) for group in self.solver.group_anagrams_char_count(strs)])
        expected_sorted = sorted([sorted(group) for group in expected])
        self.assertEqual(result_sorted_key, expected_sorted)
        self.assertEqual(result_char_count_key, expected_sorted)

    def test_group_anagrams_all_anagrams(self):
        strs = ["listen", "silent", "enlist"]
        expected = [["listen", "silent", "enlist"]]
        result_sorted_key = sorted([sorted(group) for group in self.solver.group_anagrams(strs)])
        result_char_count_key = sorted([sorted(group) for group in self.solver.group_anagrams_char_count(strs)])
        expected_sorted = sorted([sorted(group) for group in expected])
        self.assertEqual(result_sorted_key, expected_sorted)
        self.assertEqual(result_char_count_key, expected_sorted)
    
    # --- Test Cases for Longest Consecutive Sequence ---
    def test_lcs_basic(self):
        nums = [100, 4, 200, 1, 3, 2]
        self.assertEqual(self.solver.longest_consecutive_sequence(nums), 4)
        self.assertEqual(self.solver.longest_consecutive_sequence_sort_first(nums), 4)

    def test_lcs_unsorted_with_duplicates(self):
        nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
        self.assertEqual(self.solver.longest_consecutive_sequence(nums), 9) # Sequence is 0-8
        self.assertEqual(self.solver.longest_consecutive_sequence_sort_first(nums), 9)

    def test_lcs_empty_array(self):
        self.assertEqual(self.solver.longest_consecutive_sequence([]), 0)
        self.assertEqual(self.solver.longest_consecutive_sequence_sort_first([]), 0)

    def test_lcs_single_element(self):
        self.assertEqual(self.solver.longest_consecutive_sequence([1]), 1)
        self.assertEqual(self.solver.longest_consecutive_sequence_sort_first([1]), 1)

    def test_lcs_no_consecutive(self):
        nums = [1, 5, 9, 13]
        self.assertEqual(self.solver.longest_consecutive_sequence(nums), 1)
        self.assertEqual(self.solver.longest_consecutive_sequence_sort_first(nums), 1)

    def test_lcs_negative_numbers(self):
        nums = [-3, -2, -1, 0, 1, 5, 6, 7]
        self.assertEqual(self.solver.longest_consecutive_sequence(nums), 5) # Sequence -3 to 1
        self.assertEqual(self.solver.longest_consecutive_sequence_sort_first(nums), 5)

    def test_lcs_all_same_number(self):
        nums = [5, 5, 5, 5]
        self.assertEqual(self.solver.longest_consecutive_sequence(nums), 1)
        self.assertEqual(self.solver.longest_consecutive_sequence_sort_first(nums), 1)

    # --- Test Cases for Subarray Sum Equals K ---
    def test_ssk_basic(self):
        nums = [1, 1, 1]
        k = 2
        self.assertEqual(self.solver.subarray_sum_equals_k(nums, k), 2)
        self.assertEqual(self.solver.subarray_sum_equals_k_brute_force(nums, k), 2)
        self.assertEqual(self.solver.subarray_sum_equals_k_prefix_sum_array(nums, k), 2)

    def test_ssk_single_element_array(self):
        nums = [1]
        k = 1
        self.assertEqual(self.solver.subarray_sum_equals_k(nums, k), 1)
        self.assertEqual(self.solver.subarray_sum_equals_k_brute_force(nums, k), 1)
        self.assertEqual(self.solver.subarray_sum_equals_k_prefix_sum_array(nums, k), 1)
        nums = [1]
        k = 0
        self.assertEqual(self.solver.subarray_sum_equals_k(nums, k), 0)
        self.assertEqual(self.solver.subarray_sum_equals_k_brute_force(nums, k), 0)
        self.assertEqual(self.solver.subarray_sum_equals_k_prefix_sum_array(nums, k), 0)

    def test_ssk_empty_array(self):
        self.assertEqual(self.solver.subarray_sum_equals_k([], 0), 0)
        self.assertEqual(self.solver.subarray_sum_equals_k_brute_force([], 0), 0)
        self.assertEqual(self.solver.subarray_sum_equals_k_prefix_sum_array([], 0), 0)

    def test_ssk_negative_numbers_and_zero(self):
        nums = [1, -1, 0]
        k = 0
        self.assertEqual(self.solver.subarray_sum_equals_k(nums, k), 3) # [1,-1], [0], [1,-1,0]
        self.assertEqual(self.solver.subarray_sum_equals_k_brute_force(nums, k), 3)
        self.assertEqual(self.solver.subarray_sum_equals_k_prefix_sum_array(nums, k), 3)

    def test_ssk_multiple_occurrences(self):
        nums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        k = 0
        # For N zeros, number of subarrays is N*(N+1)/2
        self.assertEqual(self.solver.subarray_sum_equals_k(nums, k), 55)
        self.assertEqual(self.solver.subarray_sum_equals_k_brute_force(nums, k), 55)
        self.assertEqual(self.solver.subarray_sum_equals_k_prefix_sum_array(nums, k), 55)

    def test_ssk_no_match(self):
        nums = [1, 2, 3, 4, 5]
        k = 100
        self.assertEqual(self.solver.subarray_sum_equals_k(nums, k), 0)
        self.assertEqual(self.solver.subarray_sum_equals_k_brute_force(nums, k), 0)
        self.assertEqual(self.solver.subarray_sum_equals_k_prefix_sum_array(nums, k), 0)

    def test_ssk_positive_numbers_only(self):
        nums = [1, 2, 3, 4, 5]
        k = 6
        self.assertEqual(self.solver.subarray_sum_equals_k(nums, k), 2) # [1,2,3], [2,4]
        self.assertEqual(self.solver.subarray_sum_equals_k_brute_force(nums, k), 2)
        self.assertEqual(self.solver.subarray_sum_equals_k_prefix_sum_array(nums, k), 2)

if __name__ == '__main__':
    unittest.main()