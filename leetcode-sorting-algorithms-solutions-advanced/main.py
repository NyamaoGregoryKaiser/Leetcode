import random
from sorting_problems.k_largest_element import (
    find_kth_largest_quickselect,
    find_kth_largest_sort,
    find_kth_largest_heap
)
from sorting_problems.merge_intervals import merge_intervals_optimal
from sorting_problems.group_anagrams import (
    group_anagrams_sort_key,
    group_anagrams_count_key
)
from sorting_problems.wiggle_sort import (
    wiggle_sort_ii_optimal,
    wiggle_sort_ii_simple
)

def run_k_largest_demo():
    print("\n--- Kth Largest Element Demo ---")
    nums = [3, 2, 1, 5, 6, 4]
    k = 2
    print(f"Array: {nums}, k: {k}")

    res_quickselect = find_kth_largest_quickselect(list(nums), k)
    print(f"Quickselect (Optimal): {res_quickselect}")

    res_sort = find_kth_largest_sort(list(nums), k)
    print(f"Sorting: {res_sort}")

    res_heap = find_kth_largest_heap(list(nums), k)
    print(f"Min-Heap: {res_heap}")

    nums_large = [random.randint(0, 1000) for _ in range(100)]
    k_large = 10
    print(f"\nArray (large, first 10): {nums_large[:10]}, k: {k_large}")
    res_quickselect_large = find_kth_largest_quickselect(list(nums_large), k_large)
    print(f"Quickselect (Optimal) for large array: {res_quickselect_large}")


def run_merge_intervals_demo():
    print("\n--- Merge Overlapping Intervals Demo ---")
    intervals1 = [[1, 3], [2, 6], [8, 10], [15, 18]]
    print(f"Intervals 1: {intervals1}")
    print(f"Merged 1: {merge_intervals_optimal(intervals1)}") # Expected: [[1,6],[8,10],[15,18]]

    intervals2 = [[1, 4], [4, 5]]
    print(f"Intervals 2: {intervals2}")
    print(f"Merged 2: {merge_intervals_optimal(intervals2)}") # Expected: [[1,5]]

    intervals3 = [[1, 4], [0, 4]]
    print(f"Intervals 3: {intervals3}")
    print(f"Merged 3: {merge_intervals_optimal(intervals3)}") # Expected: [[0,4]]

    intervals4 = [[1, 4], [0, 0]]
    print(f"Intervals 4: {intervals4}")
    print(f"Merged 4: {merge_intervals_optimal(intervals4)}") # Expected: [[0,0],[1,4]]

    intervals5 = [[1, 4], [0, 1]]
    print(f"Intervals 5: {intervals5}")
    print(f"Merged 5: {merge_intervals_optimal(intervals5)}") # Expected: [[0,4]]


def run_group_anagrams_demo():
    print("\n--- Group Anagrams Demo ---")
    strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
    print(f"Strings: {strs}")

    res_sort_key = group_anagrams_sort_key(list(strs))
    print(f"Sort Key Approach: {res_sort_key}")

    res_count_key = group_anagrams_count_key(list(strs))
    print(f"Count Key Approach: {res_count_key}")

    strs2 = ["a"]
    print(f"Strings: {strs2}")
    print(f"Sort Key Approach: {group_anagrams_sort_key(list(strs2))}")


def run_wiggle_sort_demo():
    print("\n--- Wiggle Sort II Demo ---")
    nums1 = [1, 5, 1, 1, 6, 4]
    print(f"Original: {nums1}")
    nums1_copy_optimal = list(nums1)
    wiggle_sort_ii_optimal(nums1_copy_optimal)
    print(f"Optimal Wiggle Sorted: {nums1_copy_optimal}") # Expected: [1,6,1,5,1,4] or similar

    nums2 = [1, 3, 2, 2, 3, 1]
    print(f"Original: {nums2}")
    nums2_copy_simple = list(nums2)
    wiggle_sort_ii_simple(nums2_copy_simple)
    print(f"Simple Wiggle Sorted: {nums2_copy_simple}") # Expected: [2,3,1,3,1,2] or similar

    nums3 = [4, 5, 5, 6]
    print(f"Original: {nums3}")
    nums3_copy_optimal = list(nums3)
    wiggle_sort_ii_optimal(nums3_copy_optimal)
    print(f"Optimal Wiggle Sorted: {nums3_copy_optimal}") # Expected: [5,6,4,5] or similar


if __name__ == "__main__":
    print("Welcome to the Sorting Algorithms Interview Project!")
    print("This script demonstrates the usage of the implemented solutions.\n")

    run_k_largest_demo()
    run_merge_intervals_demo()
    run_group_anagrams_demo()
    run_wiggle_sort_demo()

    print("\nDemonstrations complete. Refer to `tests/` for unit tests and `docs/` for detailed explanations.")