import heapq
import random

def find_kth_largest_sort(nums, k):
    """
    Problem 3: Kth Largest Element in an Array - Approach 1: Sort and Pick.
    Finds the k-th largest element in an unsorted array by sorting the entire array
    and then picking the element at the (n - k)th index (for 0-indexed array).

    Args:
        nums (list): The unsorted list of integers.
        k (int): The k-th largest element to find.

    Returns:
        int: The k-th largest element.

    Time Complexity:
        - O(n log n) - Dominated by the sorting step.

    Space Complexity:
        - O(log n) or O(n) - Depends on the sorting algorithm used by Python's `sort()`
                             (Timsort is typically O(n) worst case, O(log n) best case).
                             If a new sorted list is returned, it would be O(n).
    """
    if not nums or k <= 0 or k > len(nums):
        raise ValueError("Invalid input: nums is empty, k is out of bounds.")

    nums.sort() # Sorts in ascending order
    # The k-th largest element will be at index len(nums) - k
    return nums[len(nums) - k]

def find_kth_largest_min_heap(nums, k):
    """
    Problem 3: Kth Largest Element in an Array - Approach 2: Min-Heap.
    Finds the k-th largest element using a min-heap.
    The idea is to maintain a min-heap of size `k`.
    Iterate through the array:
    1. If the heap size is less than `k`, add the element.
    2. If the heap size is `k`, and the current element is greater than the smallest element
       in the heap (heap's root), then remove the root and add the current element.
    After iterating through all elements, the root of the min-heap will be the k-th largest element.

    Args:
        nums (list): The unsorted list of integers.
        k (int): The k-th largest element to find.

    Returns:
        int: The k-th largest element.

    Time Complexity:
        - O(N log K) - Each of N elements is processed. For each element, a heap
                       operation (push/pop) takes O(log K) time since the heap
                       size is at most K.

    Space Complexity:
        - O(K) - To store the min-heap of K elements.
    """
    if not nums or k <= 0 or k > len(nums):
        raise ValueError("Invalid input: nums is empty, k is out of bounds.")

    min_heap = [] # Python's heapq implements a min-heap
    for num in nums:
        if len(min_heap) < k:
            heapq.heappush(min_heap, num)
        elif num > min_heap[0]: # If current num is greater than the smallest in heap
            heapq.heapreplace(min_heap, num) # Pop smallest, push new num
            # This is equivalent to:
            # heapq.heappop(min_heap)
            # heapq.heappush(min_heap, num)

    return min_heap[0] # The root of the min-heap is the Kth largest element

# Note: The Quickselect approach (O(N) average time) is implemented in
# `additional_implementations/quickselect.py` as it's a more advanced
# variation of Quick Sort partitioning.
```