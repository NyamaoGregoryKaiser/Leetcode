import time
import random
import sys
import os

# Add the project root to the path to allow importing modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from algorithms.heap_problems import find_kth_largest, top_k_frequent, MedianFinder, ListNode, merge_k_sorted_lists
from algorithms.brute_force_alternatives import find_kth_largest_brute_force, top_k_frequent_sort, MedianFinderSortedList, merge_k_sorted_lists_iterative
from utils.helper_functions import generate_random_int_list, generate_random_frequencies_list, generate_random_k_sorted_lists

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

# Helper function to convert ListNode to list (for validation)
def linkedlist_to_list(node):
    arr = []
    current = node
    while current:
        arr.append(current.val)
        current = current.next
    return arr

def run_benchmark(func, *args, **kwargs):
    """Utility to run a function and measure its execution time."""
    start_time = time.perf_counter()
    result = func(*args, **kwargs)
    end_time = time.perf_counter()
    return end_time - start_time, result

def benchmark_kth_largest():
    print("\n--- Benchmarking Kth Largest Element ---")
    sizes = [10**4, 10**5, 10**6]
    k_values = [10, 100, 1000] # k small, k medium, k large relative to N

    for N in sizes:
        print(f"\nDataset size N = {N}")
        nums = generate_random_int_list(N, 1, N)
        
        for k_ratio in [0.001, 0.01, 0.1]: # K values relative to N
            k = int(N * k_ratio)
            if k == 0: k = 1 # Ensure k is at least 1
            if k > N: k = N # Ensure k is not larger than N

            print(f"  k = {k} (approx {k_ratio*100:.1f}% of N)")

            # Heap-based solution
            time_heap, res_heap = run_benchmark(find_kth_largest, list(nums), k) # Use list(nums) to ensure copy
            print(f"    Heap-based: {time_heap:.6f} seconds. Result: {res_heap}")

            # Sorting-based (brute force)
            time_sort, res_sort = run_benchmark(find_kth_largest_brute_force, list(nums), k)
            print(f"    Sorting-based: {time_sort:.6f} seconds. Result: {res_sort}")
            
            assert res_heap == res_sort, "Results mismatch for Kth Largest!"
            print(f"    Heap is {time_sort/time_heap:.2f}x faster than sorting.")


def benchmark_top_k_frequent():
    print("\n--- Benchmarking Top K Frequent Elements ---")
    sizes = [10**4, 10**5, 10**6]
    unique_ratios = [0.1, 0.5, 0.9] # Ratio of unique elements to total size
    k_values = [5, 50, 500] # K values

    for N in sizes:
        print(f"\nDataset size N = {N}")
        for unique_ratio in unique_ratios:
            num_unique = int(N * unique_ratio)
            if num_unique == 0: num_unique = 1 # At least one unique
            if num_unique > N: num_unique = N

            nums = generate_random_frequencies_list(N, num_unique, 1, 2*N) # Range larger than N
            
            for k in k_values:
                if k > num_unique: k = num_unique # K can't be greater than unique count
                if k == 0: k = 1

                print(f"  Unique count: {num_unique}, k = {k}")

                # Heap-based solution
                time_heap, res_heap = run_benchmark(top_k_frequent, list(nums), k)
                print(f"    Heap-based: {time_heap:.6f} seconds. Result (sample): {res_heap[:5]}...")

                # Sorting-based solution
                time_sort, res_sort = run_benchmark(top_k_frequent_sort, list(nums), k)
                print(f"    Sorting-based: {time_sort:.6f} seconds. Result (sample): {res_sort[:5]}...")
                
                # Use assertCountEqual for lists where order doesn't matter
                if sorted(res_heap) != sorted(res_sort): # Fallback to sorted if order specific
                    print(f"    WARNING: Top K results may differ in order. Validating content...")
                assert set(res_heap) == set(res_sort), "Results mismatch for Top K Frequent!"
                print(f"    Heap is {time_sort/time_heap:.2f}x faster than sorting.")


def benchmark_median_finder():
    print("\n--- Benchmarking Median Finder ---")
    sizes = [10**4, 10**5] # Number of addNum calls

    for N in sizes:
        print(f"\nNumber of addNum calls N = {N}")
        numbers = generate_random_int_list(N, 1, N)

        # Heap-based MedianFinder
        mf_heap = MedianFinder()
        time_heap_add = 0
        time_heap_find = 0
        last_median_heap = None
        for i, num in enumerate(numbers):
            t_add, _ = run_benchmark(mf_heap.addNum, num)
            time_heap_add += t_add
            if i % 100 == 0: # Find median less frequently to avoid distorting total add time
                t_find, last_median_heap = run_benchmark(mf_heap.findMedian)
                time_heap_find += t_find
        print(f"    Heap-based: Add: {time_heap_add:.6f}s, Find: {time_heap_find:.6f}s. Last Median: {last_median_heap}")

        # SortedList-based MedianFinder (Brute Force)
        mf_list = MedianFinderSortedList()
        time_list_add = 0
        time_list_find = 0
        last_median_list = None
        for i, num in enumerate(numbers):
            t_add, _ = run_benchmark(mf_list.addNum, num)
            time_list_add += t_add
            if i % 100 == 0:
                t_find, last_median_list = run_benchmark(mf_list.findMedian)
                time_list_find += t_find
        print(f"    Sorted List-based: Add: {time_list_add:.6f}s, Find: {time_list_find:.6f}s. Last Median: {last_median_list}")
        
        assert last_median_heap == last_median_list, "Results mismatch for MedianFinder!"
        print(f"    Heap is {time_list_add/time_heap_add:.2f}x faster for addNum.")


def benchmark_merge_k_sorted_lists():
    print("\n--- Benchmarking Merge K Sorted Lists ---")
    k_values = [10, 50, 100]
    total_elements_target = 10**5 # Keep total elements constant for fairer comparison

    for k in k_values:
        print(f"\nNumber of lists k = {k}")
        avg_list_size = total_elements_target // k
        if avg_list_size == 0: avg_list_size = 1

        # Generate K sorted lists
        list_of_lists_data = generate_random_k_sorted_lists(k, avg_list_size, 0, total_elements_target * 2)
        
        # Convert to ListNode objects for heap solution
        lists_heap = [list_to_linkedlist(lst) for lst in list_of_lists_data]
        # Convert to ListNode objects for iterative solution (needs a fresh copy)
        lists_iterative = [list_to_linkedlist(lst) for lst in list_of_lists_data]

        # Heap-based solution
        time_heap, res_heap_node = run_benchmark(merge_k_sorted_lists, lists_heap)
        res_heap = linkedlist_to_list(res_heap_node)
        print(f"    Heap-based: {time_heap:.6f} seconds. Merged list length: {len(res_heap)}")

        # Iterative merging solution (brute force)
        time_iterative, res_iterative_node = run_benchmark(merge_k_sorted_lists_iterative, lists_iterative)
        res_iterative = linkedlist_to_list(res_iterative_node)
        print(f"    Iterative-merge: {time_iterative:.6f} seconds. Merged list length: {len(res_iterative)}")
        
        assert res_heap == res_iterative, "Results mismatch for Merge K Sorted Lists!"
        print(f"    Heap is {time_iterative/time_heap:.2f}x faster than iterative merge.")


if __name__ == "__main__":
    benchmark_kth_largest()
    benchmark_top_k_frequent()
    benchmark_median_finder()
    benchmark_merge_k_sorted_lists()
    print("\n--- All Benchmarks Complete ---")