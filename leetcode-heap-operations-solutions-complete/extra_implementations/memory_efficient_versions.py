import collections
import heapq

"""
This file explores memory efficiency considerations for heap problems.
While heap-based solutions are generally efficient, certain contexts might
call for specific memory optimizations or alternative data structures
depending on constraints.

For many heap problems, the heap itself is the primary memory consumer,
and its O(K) or O(M) complexity is already quite good.
This file focuses on illustrating where memory considerations might arise
and how other approaches sometimes gain memory efficiency.
"""

# Problem: Kth Largest Element in a Stream
# Memory consideration: The Min-Heap of size K is already very memory efficient (O(K)).
# A brute-force approach storing ALL elements would be O(N) which is worse for large N and small K.
# There isn't a significantly more memory-efficient version using different core logic
# than the Min-Heap of size K for this streaming problem.

# Problem: Merge K Sorted Lists
# Memory consideration: The Min-Heap of size K is already memory efficient (O(K)) compared
# to O(N) for storing all elements in an array for brute-force sorting.
# No immediate "more memory-efficient" heap version, as K is the bottleneck for heap size.

# Problem: Find Median from Data Stream
# Memory consideration: Two heaps take O(N) memory to store all N elements.
# This is the fundamental requirement for this problem. No obvious way to reduce O(N) storage
# unless the data stream has very specific properties (e.g., all numbers within a small range),
# which would allow a frequency array/tree structure. But for general integers, O(N) is minimum.

# Problem: Top K Frequent Elements
# Memory consideration:
#   - Optimal Heap solution: O(M) for frequency map + O(K) for heap = O(M) overall.
#   - Bucket Sort solution: O(M) for frequency map + O(N) for buckets array = O(N) overall.
#   Where M is unique elements, N is total elements.
# If N is very large and M is also large, but k is small, O(M) can be significant.
# The `collections.Counter` (hash map) can consume a fair bit of memory for many unique keys.
# Let's consider a scenario where values are integers within a *known, limited range*
# and `M` (number of unique elements) might still be large, but `N` (total elements)
# is the main factor. In such a case, a simple array for frequency counting can be
# more memory-efficient than a hash map if the range is tight.

class TopKFrequentElementsMemoryOptimizedRange:
    """
    Memory-optimized version for Top K Frequent Elements when input numbers
    are guaranteed to be within a small, non-negative integer range (e.g., 0 to MAX_VAL).
    
    Instead of `collections.Counter` (hash map), use a fixed-size array for frequency counting.
    This can save memory if the keys are dense in the small range, avoiding hash map overhead.
    """
    def topKFrequent(self, nums: list[int], k: int, max_val: int) -> list[int]:
        if k == 0:
            return []
            
        # Optimization 1: Use a fixed-size array for frequency counting
        # This assumes all nums are >= 0 and <= max_val
        # If numbers can be negative or span a very large range (sparse keys),
        # a hash map (collections.Counter) is better.
        freq_array = [0] * (max_val + 1) # O(max_val) space
        for num in nums:
            if 0 <= num <= max_val:
                freq_array[num] += 1
            else:
                # Handle error or ignore numbers out of range
                raise ValueError(f"Number {num} out of expected range [0, {max_val}]")
        
        # The rest of the logic remains similar to the optimal heap solution:
        # Use a min-heap to keep track of the k most frequent elements
        min_heap = [] # Stores (frequency, number)
        
        # Iterate through the frequency array
        # This is O(max_val) iterations.
        for num_val, freq in enumerate(freq_array):
            if freq > 0: # Only consider numbers that appeared
                if len(min_heap) < k:
                    heapq.heappush(min_heap, (freq, num_val))
                elif freq > min_heap[0][0]: # If current freq > smallest in heap
                    heapq.heapreplace(min_heap, (freq, num_val))
                
        # Extract results
        result = [item[1] for item in min_heap]
        
        return result

    # The Bucket Sort method (from heap_problems.py) is also memory-efficient and O(N) overall
    # and would use a similar frequency array if applicable.
    # def topKFrequent_bucket_sort_optimized(self, nums: list[int], k: int, max_val: int) -> list[int]:
    #     if k == 0:
    #         return []

    #     freq_array = [0] * (max_val + 1)
    #     for num in nums:
    #         if 0 <= num <= max_val:
    #             freq_array[num] += 1
    #         else:
    #             raise ValueError(f"Number {num} out of expected range [0, {max_val}]")

    #     # Max frequency can be N, so bucket size is N+1.
    #     # This means the buckets array could be O(N) even if max_val is small.
    #     # Max frequency can also be max_val if N is less than max_val.
    #     # So, the actual size of buckets array would be min(N, max_val) + 1.
    #     max_possible_freq = len(nums) # Actual max freq
    #     buckets = [[] for _ in range(max_possible_freq + 1)] 

    #     for num_val, freq in enumerate(freq_array):
    #         if freq > 0:
    #             buckets[freq].append(num_val)

    #     result = []
    #     for i in range(max_possible_freq, 0, -1):
    #         for num in buckets[i]:
    #             result.append(num)
    #             if len(result) == k:
    #                 return result
    #     return result


if __name__ == "__main__":
    print("--- Memory-Efficient Top K Frequent Elements (Bounded Range) ---")
    tkf_mem_opt = TopKFrequentElementsMemoryOptimizedRange()

    # Scenario 1: Numbers in a small, dense range
    nums_small_range = [random.randint(0, 99) for _ in range(10000)] # Values 0-99
    k_val = 5
    max_range = 99
    result1 = tkf_mem_opt.topKFrequent(nums_small_range, k_val, max_range)
    
    # Verify correctness (using collections.Counter as ground truth)
    true_counts = collections.Counter(nums_small_range)
    sorted_true = sorted(true_counts.items(), key=lambda x: x[1], reverse=True)
    expected_top_k = {item[0] for item in sorted_true[:k_val]}
    print(f"Numbers: {nums_small_range[:10]}... (Total {len(nums_small_range)})")
    print(f"K={k_val}, Max Value in Range={max_range}")
    print(f"Memory-optimized result: {result1}")
    print(f"Expected top K (set): {expected_top_k}")
    assert set(result1) == expected_top_k, "Memory-optimized result incorrect!"
    print("Test passed for small range.")
    
    print("\n--- Another scenario ---")
    nums_mid_range = [random.randint(100, 200) for _ in range(5000)] # Values 100-200
    k_val_2 = 3
    max_range_2 = 200
    result2 = tkf_mem_opt.topKFrequent(nums_mid_range, k_val_2, max_range_2)
    
    true_counts_2 = collections.Counter(nums_mid_range)
    sorted_true_2 = sorted(true_counts_2.items(), key=lambda x: x[1], reverse=True)
    expected_top_k_2 = {item[0] for item in sorted_true_2[:k_val_2]}
    print(f"K={k_val_2}, Max Value in Range={max_range_2}")
    print(f"Memory-optimized result: {result2}")
    print(f"Expected top K (set): {expected_top_k_2}")
    assert set(result2) == expected_top_k_2, "Memory-optimized result incorrect!"
    print("Test passed for mid range.")

    print("\n--- Example of ValueError ---")
    try:
        tkf_mem_opt.topKFrequent([1, 5, 100], 1, 10)
    except ValueError as e:
        print(f"Caught expected error: {e}")

    # Note on trade-offs:
    # Using an array for frequency counting (O(max_val) space) is better than a hash map (O(M) space)
    # when max_val is significantly smaller than M, or when max_val is small and M is very large.
    # However, if `max_val` is very large (e.g., 10^9), the array becomes impractical,
    # and a hash map (like `collections.Counter`) is the only viable `O(M)` solution.