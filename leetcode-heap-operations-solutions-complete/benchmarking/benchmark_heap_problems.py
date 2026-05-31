import time
import random
import collections
from src.heap_problems import KthLargestInStream, MergeKSortedLists, MedianFinder, TopKFrequentElements
from src.utils import ListNode, list_to_linked_list, linked_list_to_list
import heapq # For direct comparison with custom heap implementations

def run_benchmark(name, func, *args, **kwargs):
    """Utility to run and time a function."""
    start_time = time.perf_counter()
    result = func(*args, **kwargs)
    end_time = time.perf_counter()
    print(f"  {name}: {end_time - start_time:.6f} seconds")
    return result

def benchmark_kth_largest():
    print("\n--- Benchmarking Kth Largest Element in a Stream ---")
    k = 100
    initial_size = 10000
    stream_size = 50000
    
    initial_nums = [random.randint(1, 1_000_000) for _ in range(initial_size)]
    stream_data = [random.randint(1, 1_000_000) for _ in range(stream_size)]

    print(f"Parameters: k={k}, initial_elements={initial_size}, stream_elements_to_add={stream_size}")

    # Optimal Heap Solution
    def run_heap_solution():
        kth_largest = KthLargestInStream(k, initial_nums)
        for val in stream_data:
            kth_largest.add(val)
    run_benchmark("Optimal Heap Solution", run_heap_solution)

    # Brute-force/Less Optimal: Store all and sort each time (very slow, just conceptual)
    # This is often too slow to actually run for large inputs.
    # We will simulate it for a smaller subset or just comment on it.
    print("  (Note: Brute-force for Kth Largest in Stream is extremely slow for large N, skipping full run.)")
    print("  Brute-force (sort all on each add): O(N log N) per add. Would take hours/days.")

def benchmark_merge_k_lists():
    print("\n--- Benchmarking Merge K Sorted Lists ---")
    k_lists = 100
    elements_per_list = 1000
    
    # Generate sorted lists
    lists_arrs = []
    for _ in range(k_lists):
        start_val = random.randint(0, 10_000)
        current_list = sorted([random.randint(start_val, start_val + 10_000) for _ in range(elements_per_list)])
        lists_arrs.append(current_list)
    
    total_elements = k_lists * elements_per_list
    print(f"Parameters: k_lists={k_lists}, elements_per_list={elements_per_list}, total_elements={total_elements}")

    mkl_solver = MergeKSortedLists()

    # Optimal Heap Solution
    lists_nodes_heap = [list_to_linked_list(arr) for arr in lists_arrs] # Convert for each run to avoid side effects
    result_heap = run_benchmark("Optimal Heap Solution", mkl_solver.mergeKLists, lists_nodes_heap)
    # print(f"    Result length: {len(linked_list_to_list(result_heap))}")

    # Brute-force/Less Optimal: Concatenate and Sort
    lists_nodes_brute_force = [list_to_linked_list(arr) for arr in lists_arrs]
    result_brute_force = run_benchmark("Brute-force (Concat & Sort)", mkl_solver.mergeKLists_brute_force, lists_nodes_brute_force)
    # print(f"    Result length: {len(linked_list_to_list(result_brute_force))}")

    # Verify results (optional, can be slow for large outputs)
    # merged_heap_list = linked_list_to_list(result_heap)
    # merged_brute_force_list = linked_list_to_list(result_brute_force)
    # assert merged_heap_list == merged_brute_force_list, "Results do not match!"
    # print("    Results verified for correctness.")

def benchmark_median_finder():
    print("\n--- Benchmarking Find Median from Data Stream ---")
    num_operations = 100000
    
    data_stream = [random.randint(1, 1_000_000) for _ in range(num_operations)]

    print(f"Parameters: num_operations={num_operations} (addNum + findMedian)")

    # Optimal Two-Heaps Solution
    def run_two_heaps():
        mf = MedianFinder()
        for i, num in enumerate(data_stream):
            mf.addNum(num)
            if i % 2 == 0: # Only call findMedian for some ops, or every time for worst case
                mf.findMedian()
    run_benchmark("Optimal Two-Heaps Solution", run_two_heaps)

    # Less Optimal: Store all and sort on each findMedian (extremely slow)
    def run_naive_median():
        arr = []
        for i, num in enumerate(data_stream):
            arr.append(num)
            if i % 2 == 0:
                arr.sort() # O(N log N) for each sort
                n = len(arr)
                if n % 2 == 1:
                    median = arr[n // 2]
                else:
                    median = (arr[n // 2 - 1] + arr[n // 2]) / 2.0
    # For large num_operations, this will be very slow.
    # run_benchmark("Naive (Store & Sort)", run_naive_median) # Commented out to prevent very long run times

    print("  (Note: Naive 'Store & Sort' for Median Finder is extremely slow for large N, skipping full run.)")
    print("  Naive 'Store & Sort' (O(N log N) per median find): would take significantly longer.")


def benchmark_top_k_frequent():
    print("\n--- Benchmarking Top K Frequent Elements ---")
    array_size = 100000
    k = 100
    
    # Generate array with some frequency distribution
    nums = [random.choice(range(5000)) for _ in range(array_size)] # Values from 0-4999
    
    print(f"Parameters: array_size={array_size}, k={k}")

    tkf_solver = TopKFrequentElements()

    # Optimal Heap Solution
    run_benchmark("Optimal Heap Solution", tkf_solver.topKFrequent, nums, k)

    # Bucket Sort Solution (often fastest for integer inputs)
    run_benchmark("Bucket Sort Solution", tkf_solver.topKFrequent_bucket_sort, nums, k)

    # Brute-force/Less Optimal: Count and Sort All
    def brute_force_top_k(nums, k):
        freq_map = collections.Counter(nums)
        # Convert to list of (freq, num) and sort by freq descending
        sorted_items = sorted(freq_map.items(), key=lambda item: item[1], reverse=True)
        return [item[0] for item in sorted_items[:k]]
    run_benchmark("Brute-force (Count & Sort All)", brute_force_top_k, nums, k)


if __name__ == "__main__":
    print("Starting Heap Operations Benchmarks...")
    
    benchmark_kth_largest()
    benchmark_merge_k_lists()
    benchmark_median_finder()
    benchmark_top_k_frequent()
    
    print("\nHeap Operations Benchmarks Finished.")