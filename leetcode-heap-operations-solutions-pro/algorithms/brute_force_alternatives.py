from collections import Counter
import sys

# Assume ListNode is defined elsewhere or locally for Merge K Sorted Lists problem
# Re-define or import it if necessary.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# --- Problem 1: Kth Largest Element in an Array (Brute Force/Sorting) ---
def find_kth_largest_brute_force(nums: list[int], k: int) -> int:
    """
    Finds the k-th largest element in an array using sorting.

    Approach:
    1. Sort the array in descending order.
    2. Return the element at index `k-1`.

    Time Complexity: O(N log N) due to sorting.
    Space Complexity: O(log N) or O(N) depending on the sorting algorithm
                      (e.g., Timsort in Python is O(N) in worst case for list slice, O(logN) for in-place).
                      Here, it's often considered O(N) due to list copy for `sorted()`.
    """
    if not nums or k <= 0 or k > len(nums):
        raise ValueError("Invalid input: nums cannot be empty, k must be positive and within array bounds.")

    sorted_nums = sorted(nums, reverse=True)
    return sorted_nums[k - 1]

# --- Problem 2: Merge K Sorted Lists (Alternative - Iterative Merging) ---
def merge_k_sorted_lists_iterative(lists: list[ListNode]) -> ListNode:
    """
    Merges k sorted linked lists iteratively by repeatedly merging two lists.

    Approach:
    1. If `lists` is empty, return None.
    2. Initialize `merged_list` with the first list.
    3. Iterate through the remaining lists:
       a. Merge `merged_list` with the current list from `lists`.
       b. Update `merged_list` with the result of the merge.
    4. Return the final `merged_list`.

    Helper function `_merge_two_lists(l1, l2)`:
    Merges two sorted linked lists similar to the standard LeetCode problem.

    Time Complexity: O(N * k) in the worst case.
        - N is the total number of nodes across all lists.
        - Merging two lists of size `m` and `n` takes O(m+n).
        - In the worst case, you merge lists of increasing size.
        - For example, merging list1 (size L) with list2 (size L), then result (2L) with list3 (L), etc.
        - This accumulates to roughly N + 2N + 3N + ... + (k-1)N, which is O(N * k^2) actually,
          if implemented naively by picking next list from original `lists`.
          If done pairwise (like merge sort), it can be O(N log k).
          The iterative approach (linear merge) is O(N * k).
    Space Complexity: O(1) (excluding output list), O(N) for recursion stack if `_merge_two_lists` is recursive.
                      Typically O(1) for iterative `_merge_two_lists`.
    """
    if not lists:
        return None
    if len(lists) == 1:
        return lists[0]

    def _merge_two_lists(l1: ListNode, l2: ListNode) -> ListNode:
        dummy = ListNode(0)
        curr = dummy
        while l1 and l2:
            if l1.val < l2.val:
                curr.next = l1
                l1 = l1.next
            else:
                curr.next = l2
                l2 = l2.next
            curr = curr.next
        if l1:
            curr.next = l1
        elif l2:
            curr.next = l2
        return dummy.next

    merged_list = lists[0]
    for i in range(1, len(lists)):
        merged_list = _merge_two_lists(merged_list, lists[i])

    return merged_list

# --- Problem 3: Top K Frequent Elements (Alternative - Counter + Sort) ---
def top_k_frequent_sort(nums: list[int], k: int) -> list[int]:
    """
    Finds the k most frequent elements using `collections.Counter` and sorting.

    Approach:
    1. Count the frequency of each number using `collections.Counter`.
    2. Convert the frequency map items into a list of `(number, frequency)` tuples.
    3. Sort this list based on frequency in descending order.
    4. Take the first `k` elements' numbers.

    Time Complexity: O(N + M log M)
        - N for counting frequencies using Counter.
        - M is the number of unique elements. M log M for sorting the M items.
        - In worst case, M = N, so O(N log N).
    Space Complexity: O(M) for the frequency map and sorted list.
        - In worst case, O(N).
    """
    if not nums or k <= 0:
        raise ValueError("Invalid input: nums cannot be empty, k must be positive.")
    if k > len(nums):
        return list(Counter(nums).keys())

    freq_map = Counter(nums)
    # Sort items by frequency in descending order
    sorted_items = sorted(freq_map.items(), key=lambda item: item[1], reverse=True)

    # Extract the top k elements
    result = [item[0] for item in sorted_items[:k]]
    return result

# --- Problem 4: Find Medians in a Data Stream (Alternative - Sorted List Insertion) ---
class MedianFinderSortedList:
    """
    Finds the median of numbers added to a data stream by maintaining a sorted list.

    Approach:
    When `addNum(num)`:
    - Insert `num` into the `data` list while maintaining sorted order. This can be done
      by finding the correct insertion point using binary search (`bisect_left`) and
      then inserting.
    When `findMedian()`:
    - If the list size is odd, return the middle element.
    - If the list size is even, return the average of the two middle elements.

    Time Complexity:
        - `addNum`: O(N) for insertion in a list, O(log N) for binary search + O(N) for list insertion.
        - `findMedian`: O(1)
    Space Complexity: O(N) to store all numbers.
    """
    def __init__(self):
        self.data = []

    def addNum(self, num: int) -> None:
        # A simple linear scan insertion (for clarity, less efficient than bisect+insert)
        # For true efficiency: import bisect; bisect.insort_left(self.data, num)
        # Using simple approach here for "brute-force" comparison to heap method
        i = 0
        while i < len(self.data) and self.data[i] < num:
            i += 1
        self.data.insert(i, num)

    def findMedian(self) -> float:
        if not self.data:
            raise ValueError("No numbers added yet.")

        n = len(self.data)
        if n % 2 == 1:
            return float(self.data[n // 2])
        else:
            mid1 = self.data[n // 2 - 1]
            mid2 = self.data[n // 2]
            return (mid1 + mid2) / 2.0

# --- Problem 5: Smallest Range Covering Elements from K Lists (Alternative - Brute Force/Sliding Window on Merged List) ---
# A truly brute-force approach would involve checking all possible sub-arrays of a merged list.
# A more optimized, but still not heap-based, approach could involve merging all lists and then
# using a sliding window with frequency counts to track coverage. This is complex and might
# not be simpler than the heap, so we'll just outline it for conceptual understanding.
# The `merge_k_sorted_lists_iterative` could be a starting point.
# After merging all elements and storing them with their origin list index:
# e.g., `[(0, list_idx_0), (1, list_idx_1), ..., (N-1, list_idx_k)]`
# Then apply a sliding window, expanding the right pointer and contracting the left pointer,
# maintaining a count of how many unique lists are covered. This is still quite complex
# for a "brute-force" example, making the heap solution look much cleaner.
# We'll skip a full implementation for this one, as it would be extensive and still not truly "brute force"
# but another complex optimized approach.
def smallest_range_covering_elements_conceptual_alternative(nums: list[list[int]]) -> list[int]:
    """
    Conceptual alternative to Smallest Range: Merge all elements with origin info, then use sliding window.

    This approach is NOT implemented fully here as it would be very long and complicated,
    and doesn't qualify as simple "brute-force" but rather another form of optimization.
    It demonstrates that the heap approach is often superior in clarity and efficiency for this type of problem.

    Conceptual Steps:
    1. Flatten all lists into a single list of tuples `(value, list_idx)`.
       Example: `[(4,0), (10,0), (15,0), (24,0), (26,0), (0,1), (9,1), ..., (5,2), (18,2), ...]`
    2. Sort this flattened list by value:
       Example: `[(0,1), (4,0), (5,2), (9,1), (10,0), (12,1), (15,0), (18,2), (20,1), (22,2), (24,0), (26,0), (30,2)]`
    3. Use a sliding window `[left, right]` on this sorted list.
       Maintain a frequency map `counts` of `list_idx` within the current window.
       Keep track of `num_covered_lists`.
    4. Expand `right`: Add `nums[right].list_idx` to `counts`. If `counts[list_idx]` becomes 1, increment `num_covered_lists`.
    5. Contract `left`: While `num_covered_lists == k` (all lists covered):
       a. Update min range if current range (`nums[right].value - nums[left].value`) is smaller.
       b. Remove `nums[left].list_idx` from `counts`. If `counts[list_idx]` becomes 0, decrement `num_covered_lists`.
       c. Increment `left`.
    6. Return the `min_range_start` and `min_range_end`.

    Time Complexity: O(N log N) for flattening and sorting, then O(N) for sliding window. Total O(N log N).
                     (N is total elements across all lists).
    Space Complexity: O(N) for the flattened list and frequency map.

    This is worse than the heap solution (O(N log k)) when k << N.
    """
    print("This function is a conceptual outline, not a full implementation.")
    print("The heap-based solution is generally more efficient and simpler for this problem.")
    return []