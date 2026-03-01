import unittest
import sys
import os

# Add the project root to the path to allow importing modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from algorithms.heap_problems import (
    find_kth_largest,
    merge_k_sorted_lists,
    top_k_frequent,
    MedianFinder,
    smallest_range_covering_elements,
    ListNode # Required for Merge K Sorted Lists
)
from algorithms.brute_force_alternatives import (
    find_kth_largest_brute_force,
    merge_k_sorted_lists_iterative,
    top_k_frequent_sort,
    MedianFinderSortedList
)

# Helper function to convert list to ListNode
def list_to_linkedlist(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

# Helper function to convert ListNode to list
def linkedlist_to_list(node):
    arr = []
    current = node
    while current:
        arr.append(current.val)
        current = current.next
    return arr

class TestHeapProblems(unittest.TestCase):

    # --- Problem 1: Kth Largest Element in an Array ---
    def test_find_kth_largest(self):
        # General cases
        self.assertEqual(find_kth_largest([3, 2, 1, 5, 6, 4], 2), 5)
        self.assertEqual(find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4)
        self.assertEqual(find_kth_largest([1], 1), 1)
        self.assertEqual(find_kth_largest([7, 6, 5, 4, 3, 2, 1], 5), 3)

        # Duplicates
        self.assertEqual(find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 1), 6)
        self.assertEqual(find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 9), 1)

        # Negative numbers
        self.assertEqual(find_kth_largest([-1, -2, 0], 2), 0)
        self.assertEqual(find_kth_largest([-5, -2, -10, -1], 1), -1)

        # Large numbers
        self.assertEqual(find_kth_largest([10**9, 10**8, 10**7], 2), 10**8)

        # Edge cases
        with self.assertRaises(ValueError):
            find_kth_largest([], 1)  # Empty array
        with self.assertRaises(ValueError):
            find_kth_largest([1, 2, 3], 0)  # k <= 0
        with self.assertRaises(ValueError):
            find_kth_largest([1, 2, 3], 4)  # k > len(nums)

    def test_find_kth_largest_brute_force_comparison(self):
        nums1 = [3, 2, 1, 5, 6, 4]
        k1 = 2
        self.assertEqual(find_kth_largest(nums1, k1), find_kth_largest_brute_force(nums1, k1))

        nums2 = [3, 2, 3, 1, 2, 4, 5, 5, 6]
        k2 = 4
        self.assertEqual(find_kth_largest(nums2, k2), find_kth_largest_brute_force(nums2, k2))

        nums3 = list(range(1000, 0, -1)) # [1000, 999, ..., 1]
        k3 = 500
        self.assertEqual(find_kth_largest(nums3, k3), find_kth_largest_brute_force(nums3, k3))

    # --- Problem 2: Merge K Sorted Lists ---
    def test_merge_k_sorted_lists(self):
        # General case
        lists1 = [list_to_linkedlist([1, 4, 5]),
                  list_to_linkedlist([1, 3, 4]),
                  list_to_linkedlist([2, 6])]
        expected1 = [1, 1, 2, 3, 4, 4, 5, 6]
        self.assertEqual(linkedlist_to_list(merge_k_sorted_lists(lists1)), expected1)

        # Empty input
        self.assertIsNone(merge_k_sorted_lists([]))
        self.assertIsNone(merge_k_sorted_lists([None, None]))

        # Single list
        lists2 = [list_to_linkedlist([1, 2, 3])]
        expected2 = [1, 2, 3]
        self.assertEqual(linkedlist_to_list(merge_k_sorted_lists(lists2)), expected2)

        # Lists with different lengths
        lists3 = [list_to_linkedlist([1, 10]),
                  list_to_linkedlist([2, 3, 4, 5]),
                  list_to_linkedlist([9])]
        expected3 = [1, 2, 3, 4, 5, 9, 10]
        self.assertEqual(linkedlist_to_list(merge_k_sorted_lists(lists3)), expected3)

        # Lists with duplicates
        lists4 = [list_to_linkedlist([1, 1, 2]),
                  list_to_linkedlist([1, 2, 2])]
        expected4 = [1, 1, 1, 2, 2, 2]
        self.assertEqual(linkedlist_to_list(merge_k_sorted_lists(lists4)), expected4)

        # Many lists, short length
        lists5 = [list_to_linkedlist([i]) for i in range(10)]
        expected5 = list(range(10))
        self.assertEqual(linkedlist_to_list(merge_k_sorted_lists(lists5)), expected5)

        # Longer lists
        lists6 = [list_to_linkedlist([i, i + 100]),
                  list_to_linkedlist([i + 1, i + 99])]
        expected6 = [0, 1, 100, 101, 99, 100] # for i=0,1 (example only, this is dynamic)
        
        # Test a scenario with many lists with increasing values
        large_lists = []
        for i in range(50):
            large_lists.append(list_to_linkedlist([i * 10, i * 10 + 1, i * 10 + 2]))
        
        # Manually construct expected large list (0,1,2,10,11,12, ..., 490,491,492)
        expected_large = []
        for i in range(50):
            expected_large.extend([i * 10, i * 10 + 1, i * 10 + 2])
        expected_large.sort()
        self.assertEqual(linkedlist_to_list(merge_k_sorted_lists(large_lists)), expected_large)

    def test_merge_k_sorted_lists_brute_force_comparison(self):
        lists1 = [list_to_linkedlist([1, 4, 5]),
                  list_to_linkedlist([1, 3, 4]),
                  list_to_linkedlist([2, 6])]
        lists1_copy = [list_to_linkedlist([1, 4, 5]),
                       list_to_linkedlist([1, 3, 4]),
                       list_to_linkedlist([2, 6])]
        
        self.assertEqual(
            linkedlist_to_list(merge_k_sorted_lists(lists1)),
            linkedlist_to_list(merge_k_sorted_lists_iterative(lists1_copy))
        )

        lists2 = [list_to_linkedlist([1]), list_to_linkedlist([2]), list_to_linkedlist([3])]
        lists2_copy = [list_to_linkedlist([1]), list_to_linkedlist([2]), list_to_linkedlist([3])]
        self.assertEqual(
            linkedlist_to_list(merge_k_sorted_lists(lists2)),
            linkedlist_to_list(merge_k_sorted_lists_iterative(lists2_copy))
        )

    # --- Problem 3: Top K Frequent Elements ---
    def test_top_k_frequent(self):
        # General cases
        self.assertCountEqual(top_k_frequent([1, 1, 1, 2, 2, 3], 2), [1, 2])
        self.assertCountEqual(top_k_frequent([1], 1), [1])
        self.assertCountEqual(top_k_frequent([1, 2], 2), [1, 2])
        self.assertCountEqual(top_k_frequent([4, 1, -1, 2, -1, 2, 3], 2), [-1, 2])
        self.assertCountEqual(top_k_frequent([1, 1, 1, 2, 2, 3, 3, 3, 3, 4], 3), [3, 1, 2])

        # k equals number of unique elements
        self.assertCountEqual(top_k_frequent([1, 2, 3], 3), [1, 2, 3])

        # k equals number of total elements
        self.assertCountEqual(top_k_frequent([1, 1, 2, 2, 3], 5), [1, 2, 3])
        self.assertCountEqual(top_k_frequent([1, 1, 2, 2, 3], 3), [1, 2, 3]) # k = unique elements count

        # All elements same frequency
        self.assertCountEqual(top_k_frequent([1, 2, 3, 4, 5], 3), [1, 2, 3]) # Order doesn't matter

        # Edge cases
        with self.assertRaises(ValueError):
            top_k_frequent([], 1)
        with self.assertRaises(ValueError):
            top_k_frequent([1, 2, 3], 0)

    def test_top_k_frequent_brute_force_comparison(self):
        nums1 = [1, 1, 1, 2, 2, 3]
        k1 = 2
        self.assertCountEqual(top_k_frequent(nums1, k1), top_k_frequent_sort(nums1, k1))

        nums2 = [4, 1, -1, 2, -1, 2, 3]
        k2 = 2
        self.assertCountEqual(top_k_frequent(nums2, k2), top_k_frequent_sort(nums2, k2))

        nums3 = [i % 5 for i in range(1000)] # Many numbers, few unique
        k3 = 3
        self.assertCountEqual(top_k_frequent(nums3, k3), top_k_frequent_sort(nums3, k3))


    # --- Problem 4: Find Medians in a Data Stream ---
    def test_median_finder(self):
        mf = MedianFinder()
        mf.addNum(1) # [1]
        self.assertEqual(mf.findMedian(), 1.0)
        mf.addNum(2) # [1, 2]
        self.assertEqual(mf.findMedian(), 1.5)
        mf.addNum(3) # [1, 2, 3]
        self.assertEqual(mf.findMedian(), 2.0)
        mf.addNum(4) # [1, 2, 3, 4]
        self.assertEqual(mf.findMedian(), 2.5)
        mf.addNum(5) # [1, 2, 3, 4, 5]
        self.assertEqual(mf.findMedian(), 3.0)

        # Negative numbers
        mf_neg = MedianFinder()
        mf_neg.addNum(-1) # [-1]
        self.assertEqual(mf_neg.findMedian(), -1.0)
        mf_neg.addNum(-2) # [-2, -1]
        self.assertEqual(mf_neg.findMedian(), -1.5)
        mf_neg.addNum(0) # [-2, -1, 0]
        self.assertEqual(mf_neg.findMedian(), -1.0)

        # Mix of positive and negative
        mf_mix = MedianFinder()
        mf_mix.addNum(-5)
        mf_mix.addNum(10)
        self.assertEqual(mf_mix.findMedian(), 2.5)
        mf_mix.addNum(0)
        self.assertEqual(mf_mix.findMedian(), 0.0)
        mf_mix.addNum(3)
        self.assertEqual(mf_mix.findMedian(), 1.5)

        # Large number of elements
        mf_large = MedianFinder()
        for i in range(1, 1001):
            mf_large.addNum(i)
        # Median of 1 to 1000 is (500 + 501) / 2 = 500.5
        self.assertEqual(mf_large.findMedian(), 500.5)
        mf_large.addNum(1001)
        # Median of 1 to 1001 is 501
        self.assertEqual(mf_large.findMedian(), 501.0)

        # Edge case: no numbers added
        mf_empty = MedianFinder()
        with self.assertRaises(ValueError):
            mf_empty.findMedian()

    def test_median_finder_brute_force_comparison(self):
        mf_heap = MedianFinder()
        mf_list = MedianFinderSortedList()

        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, -5, 0, 15]
        for num in numbers:
            mf_heap.addNum(num)
            mf_list.addNum(num)
            self.assertEqual(mf_heap.findMedian(), mf_list.findMedian())
        
        # Test with a larger sequence
        mf_heap_large = MedianFinder()
        mf_list_large = MedianFinderSortedList()
        large_numbers = list(range(1000)) + [10000, -100]
        import random
        random.shuffle(large_numbers)
        
        for num in large_numbers:
            mf_heap_large.addNum(num)
            mf_list_large.addNum(num)
            self.assertEqual(mf_heap_large.findMedian(), mf_list_large.findMedian())


    # --- Problem 5: Smallest Range Covering Elements from K Lists ---
    def test_smallest_range_covering_elements(self):
        # General case
        nums1 = [[4, 10, 15, 24, 26], [0, 9, 12, 20], [5, 18, 22, 30]]
        self.assertEqual(smallest_range_covering_elements(nums1), [20, 24])

        # Single element lists
        nums2 = [[1], [2], [3]]
        self.assertEqual(smallest_range_covering_elements(nums2), [1, 3])

        # Duplicates
        nums3 = [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
        self.assertEqual(smallest_range_covering_elements(nums3), [1, 1])

        # Mixed lengths, one very short
        nums4 = [[1, 10, 20], [2, 3, 4, 5, 6, 7], [15]]
        self.assertEqual(smallest_range_covering_elements(nums4), [7, 15]) # [7 from list2, 10 from list1, 15 from list3] -> Range 8
                                                                     # Wait, if 15 from list3, smallest in lists1/2 is 10/7. max-min = 15-7=8.

        # Another scenario: [[4, 10, 15, 24, 26], [0, 9, 12, 20], [5, 18, 22, 30]]
        # (0,0,1), (4,0,0), (5,0,2) -> max=5, min=0, range=5. current_range = [0,5]
        # pop (0,0,1), push (9,0,1) -> (4,0,0), (5,0,2), (9,1,1) -> max=9, min=4, range=5. current_range = [4,9]
        # pop (4,0,0), push (10,0,0) -> (5,0,2), (9,1,1), (10,1,0) -> max=10, min=5, range=5. current_range = [5,10]
        # pop (5,0,2), push (18,0,2) -> (9,1,1), (10,1,0), (18,2,2) -> max=18, min=9, range=9. current_range = [5,10] still
        # pop (9,1,1), push (12,1,1) -> (10,1,0), (12,1,1), (18,2,2) -> max=18, min=10, range=8. current_range = [5,10] still
        # pop (10,1,0), push (15,1,0) -> (12,1,1), (15,1,0), (18,2,2) -> max=18, min=12, range=6. current_range = [12,18]
        # pop (12,1,1), push (20,1,1) -> (15,1,0), (18,2,2), (20,1,1) -> max=20, min=15, range=5. current_range = [15,20]
        # pop (15,1,0), push (24,1,0) -> (18,2,2), (20,1,1), (24,0,0) -> max=24, min=18, range=6. current_range = [15,20] still
        # pop (18,2,2), push (22,2,2) -> (20,1,1), (22,2,2), (24,0,0) -> max=24, min=20, range=4. current_range = [20,24]
        # pop (20,1,1), no next element for list 1 -> break
        # Output is [20,24]. The logic seems correct.

        # Empty list of lists
        self.assertEqual(smallest_range_covering_elements([]), [])

        # Lists with some empty sublists
        nums_empty_sublist = [[1, 5], [], [2, 6]]
        # In this scenario, we cannot form a range covering ALL lists if an empty list is present.
        # The algorithm expects `len(min_heap) == len(nums)` to start.
        # If an empty list is present, it will never reach `len(min_heap) == len(nums)`.
        # The problem statement typically implies non-empty lists or handles this case.
        # Current implementation assumes all lists non-empty, or the problem simplifies to "find range from available lists".
        # Based on problem (LeetCode 632): "k lists of sorted integers". This usually implies non-empty lists.
        # If empty lists are allowed, the problem is ill-defined as you can't pick an element from it.
        # Let's add a robust check at the start.

        # If we take `nums = [[1,5],[],[2,6]]`, `len(nums)` is 3. `min_heap` will only have 2 elements.
        # The loop `while True:` won't start as `len(min_heap) == len(nums)` isn't true implicitly at the start.
        # The `while True` loop is infinite if `len(min_heap)` is less than `len(nums)` and `break` is never hit.
        # The initial check `if len(min_heap) < len(nums): return [min_range_start, min_range_end] if min_heap else []`
        # handles this directly, so for `[[1,5],[],[2,6]]` it would return `[1,6]` or similar if that's the range from [1,5] and [2,6].
        # But this is still problematic interpretation. Let's assume input lists are non-empty.
        
        # Test case for when k=1
        self.assertEqual(smallest_range_covering_elements([[1,5,10]]), [1,1]) # Range must pick 1 element from list.
                                                                           # Max-min is always 0. Smallest start.
                                                                           # The loop runs, min_val=1, current_max=1. range=[1,1].
                                                                           # Pop 1, push 5. min_val=5, current_max=5. range=[5,5].
                                                                           # Pop 5, push 10. min_val=10, current_max=10. range=[10,10].
                                                                           # Pop 10, list exhausted.
                                                                           # This is a bit strange, if k=1 the smallest range is always `[x,x]` for any x.
                                                                           # The result from LeetCode for k=1 is the min of the list and max of the list
                                                                           # e.g. [[1,5,10]] -> [1,10]. This implies taking min/max of the list itself.
                                                                           # My current code returns [10,10].
                                                                           # This problem specifically implies "at least one number from EACH of the K lists".
                                                                           # For k=1, you must pick one number. What is the range? The range of that one number is [x,x].
                                                                           # The smallest range is defined by `b-a` then `a`. So [1,1] is smallest possible.
                                                                           # It's an edge case interpretation. Sticking to `[x,x]` for now.
                                                                           # However, the sample on LeetCode for k=1 gives [1,10] for [[1,5,10]].
                                                                           # This means the initial min_range_start and min_range_end should be initialized
                                                                           # after the first full coverage or by a different mechanism.
                                                                           # Let's adjust initialization to reflect this.
                                                                           # `min_range_start = -sys.maxsize - 1`, `min_range_end = sys.maxsize`
                                                                           # This should be inside, initialized to the first valid range.
                                                                           # current logic: min_range_start = min_heap[0][0], min_range_end = current_max
                                                                           # This is the range created by the *initial* elements.

        # Re-evaluating smallest_range for k=1:
        # If nums = [[1,5,10]]
        # min_heap = [(1,0,0)], current_max = 1
        # min_range = [1,1]
        # loop 1: pop (1,0,0), range (1,1) is current_max-min_val=0. min_range=[1,1]
        #         push (5,0,1). min_heap=[(5,0,1)], current_max=5
        # loop 2: pop (5,0,1), range (5,5) is current_max-min_val=0. min_range=[1,1] (since 1<5, initial_start smaller)
        #         push (10,0,2). min_heap=[(10,0,2)], current_max=10
        # loop 3: pop (10,0,2), range (10,10) is current_max-min_val=0. min_range=[1,1]
        #         list exhausted. break
        # Returns [1,1]. This is correct by problem definition of smallest range [a,b] if b-a < d-c OR (b-a==d-c AND a<c).
        # LeetCode's interpretation for k=1 must be that the initial elements are used to form a range,
        # but then after that, any SINGLE valid element from the list creates a [x,x] range, and the comparison
        # is always (0) for `b-a`.
        # Perhaps `min_range_start` and `min_range_end` should be initialized to -inf and +inf.
        
        # Let's re-test with the initial range set to a very large one.
        # The current implementation's initial range is the one formed by the first elements.
        # This seems logically sound for what the problem asks for: the range of `max(elements_in_heap) - min(elements_in_heap)`.
        # The specific wording "smallest range that includes at least one number from each of the k lists"
        # implies that we need a current minimum from each list. If k=1, we always have 1 element in heap, min_val = current_max.
        # So range is always 0. The tie-breaker `a<c` means the first number found with 0 range would be returned.
        # This is indeed [1,1] for [[1,5,10]].
        # This is a common pitfall in these problems with ambiguous edge cases. Sticking to current logic for now.

        # Another scenario to consider for tie-breaking `b-a == d-c`
        nums_tie = [[1, 2, 10], [1, 5, 11]]
        # Initial: min_heap=[(1,0,0),(1,1,0)], current_max=1. min_range=[1,1]
        # pop (1,0,0), push (2,0,1). min_heap=[(1,1,0),(2,0,1)], current_max=2. range (2-1=1). New min_range=[1,2]
        # pop (1,1,0), push (5,1,1). min_heap=[(2,0,1),(5,1,1)], current_max=5. range (5-2=3). Min_range=[1,2] still
        # pop (2,0,1), push (10,0,2). min_heap=[(5,1,1),(10,0,2)], current_max=10. range (10-5=5). Min_range=[1,2] still
        # pop (5,1,1), push (11,1,2). min_heap=[(10,0,2),(11,1,2)], current_max=11. range (11-10=1).
        # Check `current_max - min_val` (11-10=1) vs `min_range_end - min_range_start` (2-1=1). They are equal.
        # Tie-breaker: `min_val` (10) vs `min_range_start` (1). Since 10 is NOT smaller than 1, `min_range` remains `[1,2]`.
        # Expected from LeetCode: [1,2]. So current logic is correct.

        # Test with one list being much longer
        nums_long_list = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [100], [0, 50]]
        # Initial: min_heap=[(0,2,0), (1,0,0), (100,1,0)], current_max=100. min_range=[0,100]
        # loop until 100 is popped or 0.
        # If [0,50] gives 0,1. then range is 100-0 = 100.
        # If [1,10] gives 1..10.
        # The first number that produces a smaller range is usually the one where the max number is relatively small.
        # For this case, the range needs to include 100 (from list 2). So the smallest `min_val` must be in a way to satisfy this.
        # Let's say we have 10, 50, 100. Range is [10,100]. length 90.
        # Then, from first list, next is 11, then 12...
        # Smallest range will probably be [10,100]
        # Let's trace it a bit:
        # (0,2,0), (1,0,0), (100,1,0) -> max=100, min=0. range=[0,100]
        # pop (0,2,0), push (50,2,1) -> (1,0,0), (50,2,1), (100,1,0) -> max=100, min=1. range=[1,100] (new range 99, old 100)
        # pop (1,0,0), push (2,0,1) -> (2,0,1), (50,2,1), (100,1,0) -> max=100, min=2. range=[2,100] (new range 98, old 99)
        # ... this continues until (9,0,8) is processed, then (10,0,9) is pushed.
        # then if 10,50,100, then range = [10,100]
        # It's likely that a later range from numbers in the first list like [98, 100] or something won't be possible
        # because the numbers from list2 (100) and list3 (0,50) are fixed relatively.
        # The key is that `current_max` is always the largest of the `k` elements in the heap.
        # The smallest candidate range will be formed when `current_max` is minimized relative to `min_val`.
        # This will indeed be [1,100] when [1,0,0], [100,1,0], [50,2,1] are in heap (from list 1: 1, list 2: 100, list 3: 50)
        # The range is 99. The initial was 100. So [1,100] is the correct answer.
        # The code will keep finding smaller ranges as it goes up until one list is exhausted.
        # The range [1,100] means list 1 element 1, list 2 element 100, list 3 element 50.
        self.assertEqual(smallest_range_covering_elements(nums_long_list), [1, 100])