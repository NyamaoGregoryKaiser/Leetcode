import unittest
import collections
from sorting_problems.wiggle_sort import (
    wiggle_sort_ii_optimal,
    wiggle_sort_ii_simple
)

class TestWiggleSortII(unittest.TestCase):

    def setUp(self):
        self.functions = [
            (wiggle_sort_ii_optimal, "Optimal (Quickselect + Partition)"),
            (wiggle_sort_ii_simple, "Simple (Sort + Interleave)")
        ]

    def _is_wiggle_sorted(self, nums: list[int]) -> bool:
        """Helper to check if an array is wiggle sorted."""
        n = len(nums)
        if n <= 1:
            return True
        for i in range(n - 1):
            if i % 2 == 0: # Even index, expect nums[i] < nums[i+1]
                if not (nums[i] < nums[i+1]):
                    return False
            else: # Odd index, expect nums[i] > nums[i+1]
                if not (nums[i] > nums[i+1]):
                    return False
        return True

    def _test_all_functions(self, nums_original):
        """Helper to test all implemented functions against a single case."""
        for func, name in self.functions:
            with self.subTest(msg=f"Testing {name} for input {nums_original}"):
                nums_copy = list(nums_original) # Work on a copy as functions modify in-place
                func(nums_copy)
                self.assertTrue(self._is_wiggle_sorted(nums_copy), 
                                f"Array {nums_copy} is not wiggle sorted by {name} from {nums_original}")
                
                # Also check if elements are preserved (multiset equality)
                self.assertEqual(collections.Counter(nums_copy), collections.Counter(nums_original),
                                 f"Elements changed or lost by {name}")

    def test_basic_cases(self):
        self._test_all_functions([1, 5, 1, 1, 6, 4]) # Expected: [1,6,1,5,1,4] or similar
        self._test_all_functions([1, 3, 2, 2, 3, 1]) # Expected: [2,3,1,3,1,2] or similar
        self._test_all_functions([4, 5, 5, 6])     # Expected: [5,6,4,5] or similar
        self._test_all_functions([1, 2, 3, 4])     # Expected: [2,4,1,3] or similar

    def test_small_arrays(self):
        self._test_all_functions([1])
        self._test_all_functions([1, 2]) # Expected: [1,2]
        self._test_all_functions([2, 1]) # Expected: [1,2]
        self._test_all_functions([1, 2, 3]) # Expected: [1,3,2]

    def test_all_elements_same(self):
        # This problem usually implies distinct enough elements to satisfy strict inequality.
        # If all elements are the same, it's impossible to satisfy strict inequality.
        # The problem statement assumes a valid answer always exists.
        # This implies that the elements are such that a wiggle sort is possible.
        # E.g., for [2,2,2], it's impossible to make 2 < 2 > 2.
        # If such an input is given, the output might be non-wiggle sorted or raise an error.
        # Our current optimal solution would find median 2, split into [][2,2,2][],
        # then try to populate [_,2,_,2,_,2].
        # The test _is_wiggle_sorted will fail. This is expected behavior for an invalid input for Wiggle Sort II.
        
        # Test case for elements which are "almost" equal, but can still wiggle
        self._test_all_functions([1,1,1,1,2,2,2,2]) # e.g., [1,2,1,2,1,2,1,2] is not valid due to count of 1s and 2s
        # Need to ensure enough smaller/larger elements.
        # For [1,1,1,1,2,2,2,2], median is 1.5. Split to `1`s and `2`s.
        # `smaller` = [1,1,1,1], `larger` = [2,2,2,2]. `equal` = []
        # `wiggle_sort_ii_optimal` would create something like [1,2,1,2,1,2,1,2]. This is `1<2>1<2>1<2>1<2`.
        # This works if there are equal counts of smaller and larger than median.
        
        # Example where `median` might be one of the frequent numbers
        self._test_all_functions([2,1,1,1,1,2,2,2]) # median is 1.
        # smaller: [], equal:[1,1,1,1], larger:[2,2,2]
        # odd_idx: nums[1], nums[3], nums[5], nums[7] -> take from larger (2,2,2), then equal (1)
        # even_idx: nums[0], nums[2], nums[4], nums[6] -> take from equal (1,1,1)
        # Expected: [1,2,1,2,1,2,1,1] - not quite right.
        # The optimal requires carefully chosen median from `(n-1)//2` or `n//2` for robustness.
        # For the median to be strictly `< median <`, the median should not be one of the boundary values.
        # The current implementation of optimal may have issues if many elements are equal to the median.
        # This is a known subtlety with Wiggle Sort II.
        
        # Example from LeetCode: [1,1,2,1,2,2,1] -> median is 1.
        # smaller: [], equal: [1,1,1,1], larger: [2,2,2]
        # Expected: [1,2,1,2,1,2,1] - this should pass. Let's add it.
        self._test_all_functions([1,1,2,1,2,2,1])

    def test_longer_arrays(self):
        self._test_all_functions([10, 20, 30, 40, 50, 60, 70, 80, 90])
        self._test_all_functions([9, 8, 7, 6, 5, 4, 3, 2, 1])
        self._test_all_functions([5, 1, 4, 2, 3, 6]) # e.g., [3,6,2,5,1,4]
        self._test_all_functions([1,1,1,1,1,1,2,2,2,2,2,2]) # many duplicates, 6 ones, 6 twos. median is 1.5.
        # Expected from `wiggle_sort_ii_optimal`: [1,2,1,2,1,2,1,2,1,2,1,2]

    def test_random_arrays(self):
        for _ in range(10):
            n = random.randint(1, 20)
            nums = [random.randint(1, 100) for _ in range(n)]
            self._test_all_functions(nums)
        
        # Larger random array
        n = 100
        nums = [random.randint(1, 500) for _ in range(n)]
        self._test_all_functions(nums)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)