import heapq
from collections import Counter
import sys

# Assume ListNode is defined elsewhere or locally for Merge K Sorted Lists problem
# For this project, we'll define a simple one here.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __lt__(self, other):
        # This is crucial for comparison in the heap for ListNode objects.
        # When two ListNode objects have the same value, their relative order
        # in the heap depends on their memory address in Python 3.
        # We need a deterministic comparison, so we compare by value.
        # If values are equal, we can compare by a unique ID or use list index later.
        return self.val < other.val

# --- Problem 1: Kth Largest Element in an Array ---
def find_kth_largest(nums: list[int], k: int) -> int:
    """
    Finds the k-th largest element in an array using a min-heap.

    Approach:
    1. Initialize a min-heap.
    2. Iterate through the array `nums`.
    3. For each number, push it onto the heap.
    4. If the size of the heap exceeds `k`, pop the smallest element (root of min-heap).
       This ensures that the heap always contains the `k` largest elements encountered so far.
    5. After processing all numbers, the root of the min-heap will be the k-th largest element.

    Time Complexity: O(N log k)
        - N iterations, each involving a heap push/pop operation (log k).
    Space Complexity: O(k)
        - The heap stores at most k elements.
    """
    if not nums or k <= 0 or k > len(nums):
        raise ValueError("Invalid input: nums cannot be empty, k must be positive and within array bounds.")

    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)

    return min_heap[0] if min_heap else None

# --- Problem 2: Merge K Sorted Lists ---
def merge_k_sorted_lists(lists: list[ListNode]) -> ListNode:
    """
    Merges k sorted linked lists into one sorted linked list using a min-heap.

    Approach:
    1. Initialize a min-heap.
    2. For each linked list in `lists`, if it's not empty, push its first node
       (ListNode object) onto the heap. The `ListNode` class must implement `__lt__` for comparison.
    3. Initialize a dummy head for the merged list and a pointer `current` to it.
    4. While the heap is not empty:
       a. Pop the smallest node from the heap.
       b. Append this node to the merged list (`current.next = popped_node`).
       c. Move `current` to the newly added node (`current = current.next`).
       d. If the popped node has a `next` node, push that `next` node onto the heap.
    5. Return the `next` of the dummy head.

    Time Complexity: O(N log k)
        - N is the total number of nodes across all lists.
        - k is the number of lists.
        - Each node is pushed and popped from the heap once. Heap operations take O(log k).
    Space Complexity: O(k)
        - The heap stores at most k nodes (one from each list).
    """
    if not lists:
        return None

    min_heap = []
    # Push the head of each list into the min-heap
    for i, lst in enumerate(lists):
        if lst:
            # We push a tuple (node.val, i, node) to handle potential tie-breaking
            # if ListNode's __lt__ isn't robust or to avoid comparing Node objects directly.
            # However, for simplicity and assuming __lt__ for ListNode, we push just the node.
            # If ListNode itself doesn't implement __lt__, we'd use (lst.val, i, lst)
            # The 'i' (index) would be used for tie-breaking if vals are equal.
            # For this setup, ListNode.__lt__ is sufficient.
            heapq.heappush(min_heap, lst)

    dummy = ListNode(0)
    current = dummy

    while min_heap:
        smallest_node = heapq.heappop(min_heap)
        current.next = smallest_node
        current = current.next
        if smallest_node.next:
            heapq.heappush(min_heap, smallest_node.next)

    return dummy.next

# --- Problem 3: Top K Frequent Elements ---
def top_k_frequent(nums: list[int], k: int) -> list[int]:
    """
    Finds the k most frequent elements in an array using a min-heap.

    Approach:
    1. Count the frequency of each number using a hash map (Counter).
    2. Initialize a min-heap.
    3. Iterate through the (number, frequency) pairs from the hash map.
    4. For each pair, push `(frequency, number)` onto the min-heap.
       The heap will naturally order by frequency.
    5. If the size of the heap exceeds `k`, pop the element with the smallest frequency.
       This ensures the heap always contains the `k` pairs with the highest frequencies.
    6. After processing all pairs, the heap contains the `k` most frequent elements.
       Extract the numbers from these pairs.

    Time Complexity: O(N + M log k)
        - N for counting frequencies (M is number of unique elements, M <= N).
        - M for iterating through unique elements and pushing/popping from heap (log k).
        - In worst case, M=N, so O(N log k).
    Space Complexity: O(M) for the frequency map + O(k) for the heap.
        - In worst case, O(N + k) = O(N).
    """
    if not nums or k <= 0:
        raise ValueError("Invalid input: nums cannot be empty, k must be positive.")
    if k > len(nums): # Edge case: k can be greater than unique elements, but not total elements
        # If k is greater than unique elements, we should return all unique elements
        return list(Counter(nums).keys())

    freq_map = Counter(nums)
    min_heap = [] # Stores (frequency, number) tuples

    for num, freq in freq_map.items():
        heapq.heappush(min_heap, (freq, num))
        if len(min_heap) > k:
            heapq.heappop(min_heap)

    # Extract the numbers from the heap
    result = [item[1] for item in min_heap]
    return result

# --- Problem 4: Find Medians in a Data Stream ---
class MedianFinder:
    """
    Finds the median of numbers added to a data stream.

    Approach:
    Uses two heaps:
    1. `max_heap`: Stores the smaller half of the numbers. It's a max-heap (implemented using min-heap
       by negating values in Python's heapq) so its root is the largest element in the smaller half.
    2. `min_heap`: Stores the larger half of the numbers. Its root is the smallest element in the larger half.

    Balancing:
    - After adding a number, `max_heap` can have at most one more element than `min_heap`.
    - `min_heap` and `max_heap` should have sizes that differ by at most 1.

    When `addNum(num)`:
    - Add `num` to `max_heap` (negated).
    - Move the largest element from `max_heap` to `min_heap` to maintain order (`-heapq.heappop(max_heap)`).
    - If `max_heap` becomes too small (its size < `min_heap`'s size), move the smallest element from `min_heap`
      back to `max_heap` (negated).

    When `findMedian()`:
    - If total count is odd, median is the root of `max_heap` (negated).
    - If total count is even, median is the average of (root of `max_heap` negated + root of `min_heap`).

    Time Complexity:
        - `addNum`: O(log N), where N is the number of elements added so far. (Heap operations)
        - `findMedian`: O(1)
    Space Complexity: O(N) to store all numbers in the heaps.
    """
    def __init__(self):
        # max_heap stores the smaller half of numbers (negated to simulate max-heap with heapq)
        self.max_heap = []
        # min_heap stores the larger half of numbers
        self.min_heap = []

    def addNum(self, num: int) -> None:
        # Add to max_heap first (smaller half)
        heapq.heappush(self.max_heap, -num)

        # Ensure elements are in correct halves:
        # Transfer largest from max_heap to min_heap
        if self.max_heap and self.min_heap and (-self.max_heap[0] > self.min_heap[0]):
            val = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, val)

        # Balance sizes: max_heap can have at most 1 more element than min_heap
        if len(self.max_heap) > len(self.min_heap) + 1:
            val = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, val)
        elif len(self.min_heap) > len(self.max_heap):
            val = heapq.heappop(self.min_heap)
            heapq.heappush(self.max_heap, -val)

    def findMedian(self) -> float:
        if not self.max_heap and not self.min_heap:
            raise ValueError("No numbers added yet.")

        if len(self.max_heap) == len(self.min_heap):
            # Even number of elements, median is average of two middle elements
            return (-self.max_heap[0] + self.min_heap[0]) / 2.0
        else:
            # Odd number of elements, median is the root of max_heap
            return float(-self.max_heap[0])

# --- Problem 5: Smallest Range Covering Elements from K Lists ---
def smallest_range_covering_elements(nums: list[list[int]]) -> list[int]:
    """
    Finds the smallest range that includes at least one number from each of the k sorted lists.

    Approach:
    1. Initialize a min-heap.
    2. Maintain `current_max` (the maximum value currently in the heap) and `min_range_start`, `min_range_end`.
       Initially, `min_range_start = 0`, `min_range_end = infinity`.
    3. For each of the `k` lists, push its first element `(value, list_index, element_index)`
       into the min-heap. Update `current_max` if a new element is larger.
    4. While the heap contains an element from each of the `k` lists (i.e., `len(min_heap) == k`):
       a. Get the smallest element `(val, list_idx, elem_idx)` from the heap.
       b. Compare `current_max - val` with `min_range_end - min_range_start`. If the current range is smaller,
          update `min_range_start` to `val` and `min_range_end` to `current_max`.
       c. If there's a next element in the list from which `val` was taken (`nums[list_idx][elem_idx + 1]`):
          i. Pop `val` from the heap.
          ii. Push the next element `(next_val, list_idx, elem_idx + 1)` into the heap.
          iii. Update `current_max` if `next_val` is larger.
       d. If there's no next element in the list, then we cannot form a range covering all lists anymore.
          Break the loop.

    Time Complexity: O(N log k)
        - N is the total number of elements across all lists.
        - k is the number of lists.
        - Each element is pushed and popped from the heap at most once. Heap operations take O(log k).
    Space Complexity: O(k)
        - The heap stores at most k elements (one from each list).
    """
    if not nums:
        return []

    min_heap = [] # Stores (value, list_index, element_index)
    current_max = -sys.maxsize - 1 # Track the maximum value currently in the heap

    # Initialize heap with the first element from each list
    for i in range(len(nums)):
        if nums[i]: # Ensure list is not empty
            val = nums[i][0]
            heapq.heappush(min_heap, (val, i, 0))
            current_max = max(current_max, val)

    # Initialize the smallest range found so far
    min_range_start = min_heap[0][0] # Smallest value in heap
    min_range_end = current_max # Current max value across all heaps
    
    # Check if any list was initially empty, preventing `len(min_heap) == k`
    if len(min_heap) < len(nums):
         # If not all lists contributed an element, return the initial range if any, or empty if no elements at all.
         return [min_range_start, min_range_end] if min_heap else []

    while True:
        min_val, list_idx, elem_idx = heapq.heappop(min_heap)

        # Update the smallest range if current range is smaller
        if current_max - min_val < min_range_end - min_range_start:
            min_range_start = min_val
            min_range_end = current_max
        elif current_max - min_val == min_range_end - min_range_start:
            # Tie-breaking: choose the range with the smallest start
            if min_val < min_range_start:
                min_range_start = min_val
                min_range_end = current_max

        # Move to the next element in the list from which min_val was taken
        if elem_idx + 1 < len(nums[list_idx]):
            next_val = nums[list_idx][elem_idx + 1]
            heapq.heappush(min_heap, (next_val, list_idx, elem_idx + 1))
            current_max = max(current_max, next_val)
        else:
            # If one list is exhausted, we cannot cover all k lists anymore
            break

    return [min_range_start, min_range_end]