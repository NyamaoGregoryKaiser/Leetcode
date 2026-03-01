import heapq
from collections import Counter

# --- Memory Efficiency in Heap Operations ---
# Heap-based solutions are often inherently memory-efficient due to their design,
# especially when compared to full sorting or storing all data explicitly.

# Problem 1: Kth Largest Element in an Array (Memory Efficient)
def find_kth_largest_memory_efficient(nums: list[int], k: int) -> int:
    """
    Finds the k-th largest element using a min-heap, highlighting its memory efficiency.

    This solution is identical to the one in `heap_problems.py`, but it explicitly
    demonstrates the memory efficiency aspect.

    Memory Efficiency Rationale:
    - Instead of sorting the entire array (which might require O(N) or O(N log N)
      extra space depending on the sort implementation, or O(N) if a copy is made),
      the heap only stores `k` elements at any given time.
    - If `k` is much smaller than `N` (e.g., k=100, N=10^7), this offers significant
      memory savings.

    Time Complexity: O(N log k)
    Space Complexity: O(k)
    """
    if not nums or k <= 0 or k > len(nums):
        raise ValueError("Invalid input: nums cannot be empty, k must be positive and within array bounds.")

    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)

    # The result is the smallest element in the min-heap of size k, which is the k-th largest.
    return min_heap[0]

# Problem 3: Top K Frequent Elements (Memory Efficient)
def top_k_frequent_memory_efficient(nums: list[int], k: int) -> list[int]:
    """
    Finds the k most frequent elements, highlighting memory efficiency.

    This solution is identical to the one in `heap_problems.py`.

    Memory Efficiency Rationale:
    - `collections.Counter` stores frequencies, which takes O(M) space where M is
      the number of unique elements (M <= N).
    - The min-heap then only stores `k` (frequency, number) pairs.
    - If `k` is small, this approach is more memory-efficient than sorting all
      `M` unique elements if `M` is large. For example, if `M` is large but `k` is small,
      sorting `M` elements then picking `k` would involve sorting a large list,
      whereas the heap only ever maintains `k` elements.

    Time Complexity: O(N + M log k)
    Space Complexity: O(M + k)
    """
    if not nums or k <= 0:
        raise ValueError("Invalid input: nums cannot be empty, k must be positive.")
    if k > len(nums):
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

# --- General Notes on Memory Efficiency with Heaps ---
# 1. Fixed-size Heaps: When finding "K-th largest/smallest" or "Top K",
#    heaps of size `k` are used. This makes them highly memory-efficient
#    if `k` is significantly smaller than the total input size `N`.
#    Space complexity: O(k).
#
# 2. Priority Queues: When a heap acts as a priority queue (e.g., in Dijkstra's, A*),
#    it stores elements currently awaiting processing. The maximum size of the heap
#    can vary, but it typically doesn't store ALL data simultaneously in the same way
#    a fully sorted array would. For problems like "Merge K Sorted Lists",
#    it stores `k` elements, not `N`. Space complexity: O(k).
#
# 3. Two-Heap Median Finder: This uses two heaps, each potentially storing about N/2 elements.
#    So, the total space is O(N). While it uses memory proportional to N, it allows for O(log N)
#    additions and O(1) median retrieval, which is much better than O(N) additions for a sorted list.
#
# Compared to other data structures:
# - Sorting: O(N log N) time, O(N) or O(log N) space (in-place vs copy). Heap is O(N log k) time, O(k) space.
# - Hash Maps: O(N) time (average) for counts, O(N) space. Heaps can augment this to filter for top K efficiently.
#
# The key takeaway for memory efficiency is that heaps provide a mechanism
# to process a large stream of data or a large dataset while only keeping a
# bounded, usually small, portion of it in memory (e.g., the `k` most relevant items).
# This is particularly powerful for large-scale data processing or when memory
# constraints are tight.