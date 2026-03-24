import heapq
import random

# Problem: Kth Largest Element in an Array
# Given an integer array `nums` and an integer `k`, return the k-th largest element in the array.
# Note that it is the k-th largest element in the sorted order, not the k-th distinct element.

# --- Approach 1: Quickselect (Optimal Average Case) ---
# Time Complexity: O(N) on average, O(N^2) in worst case (though rare with good pivot choice).
# Space Complexity: O(log N) for recursion stack on average, O(N) in worst case.
# Quickselect is a selection algorithm to find the k-th smallest (or largest) element in an unsorted list.
# It is a variant of QuickSort and shares its average time complexity.
# The core idea is to partition the array around a pivot element.
# If the pivot is at the correct position (i.e., it's the k-th largest), we return it.
# Otherwise, we recurse on the appropriate subarray.

def _partition(nums, left, right, pivot_index):
    """
    Partitions the subarray `nums[left...right]` around the pivot element.
    Moves pivot to end, places elements smaller than pivot to its left,
    and larger elements to its right. Returns the final pivot index.
    """
    pivot_value = nums[pivot_index]
    # Move pivot to the end
    nums[pivot_index], nums[right] = nums[right], nums[pivot_index]
    store_index = left
    # Iterate through the subarray and move elements smaller than pivot to the left
    for i in range(left, right):
        if nums[i] < pivot_value:
            nums[store_index], nums[i] = nums[i], nums[store_index]
            store_index += 1
    # Move pivot to its final sorted position
    nums[right], nums[store_index] = nums[store_index], nums[right]
    return store_index

def _quickselect(nums, left, right, k_smallest):
    """
    Recursive function to find the k_smallest element in `nums[left...right]`.
    `k_smallest` is 0-indexed.
    """
    if left == right: # Base case: if the list contains only one element, return that element
        return nums[left]

    # Pick a random pivot index to ensure average O(N) performance
    pivot_index = random.randint(left, right)

    # Partition the array around the pivot
    final_pivot_index = _partition(nums, left, right, pivot_index)

    # The pivot is at its sorted position (final_pivot_index)
    if k_smallest == final_pivot_index:
        return nums[k_smallest]
    elif k_smallest < final_pivot_index:
        # If k_smallest is to the left of the pivot, recurse on the left subarray
        return _quickselect(nums, left, final_pivot_index - 1, k_smallest)
    else:
        # If k_smallest is to the right of the pivot, recurse on the right subarray
        return _quickselect(nums, final_pivot_index + 1, right, k_smallest)

def find_kth_largest_quickselect(nums: list[int], k: int) -> int:
    """
    Finds the k-th largest element in the array using Quickselect algorithm.
    The k-th largest element is equivalent to the (N - k)-th smallest element
    in a 0-indexed array of size N.

    Args:
        nums (list[int]): The input array of integers.
        k (int): The rank of the largest element to find (1-indexed).

    Returns:
        int: The k-th largest element.

    Raises:
        ValueError: If k is out of bounds or nums is empty.
    """
    n = len(nums)
    if not nums or not (1 <= k <= n):
        raise ValueError("Invalid k or empty array.")

    # Convert k-th largest to (N - k)-th smallest (0-indexed)
    k_smallest_idx = n - k
    return _quickselect(nums, 0, n - 1, k_smallest_idx)


# --- Approach 2: Sorting (Simpler, Less Optimal) ---
# Time Complexity: O(N log N) due to sorting.
# Space Complexity: O(log N) or O(N) depending on the sort implementation (e.g., Timsort in Python).
def find_kth_largest_sort(nums: list[int], k: int) -> int:
    """
    Finds the k-th largest element by sorting the array.

    Args:
        nums (list[int]): The input array of integers.
        k (int): The rank of the largest element to find (1-indexed).

    Returns:
        int: The k-th largest element.

    Raises:
        ValueError: If k is out of bounds or nums is empty.
    """
    n = len(nums)
    if not nums or not (1 <= k <= n):
        raise ValueError("Invalid k or empty array.")

    nums.sort() # Sorts in ascending order
    return nums[n - k] # The k-th largest element is at index (N - k)


# --- Approach 3: Min-Heap (Good for Streaming Data or when K is small) ---
# Time Complexity: O(N log K) - N elements inserted, each takes log K time.
# Space Complexity: O(K) to store elements in the heap.
# Maintain a min-heap of size k. Iterate through the array:
# - If heap size is less than k, add the element.
# - If heap size is k and current element is greater than heap's smallest (root),
#   remove the smallest and add the current element.
# The root of the min-heap will be the k-th largest element after processing all elements.

def find_kth_largest_heap(nums: list[int], k: int) -> int:
    """
    Finds the k-th largest element using a min-heap.

    Args:
        nums (list[int]): The input array of integers.
        k (int): The rank of the largest element to find (1-indexed).

    Returns:
        int: The k-th largest element.

    Raises:
        ValueError: If k is out of bounds or nums is empty.
    """
    n = len(nums)
    if not nums or not (1 <= k <= n):
        raise ValueError("Invalid k or empty array.")

    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num) # Push current element onto the heap
        if len(min_heap) > k:
            heapq.heappop(min_heap) # If heap size exceeds k, remove the smallest element

    # The smallest element in the min-heap of size k is the k-th largest element overall
    return min_heap[0]