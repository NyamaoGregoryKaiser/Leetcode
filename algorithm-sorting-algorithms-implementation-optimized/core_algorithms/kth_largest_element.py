import heapq
import random
from typing import List

class KthLargestElement:
    """
    Finds the Kth largest element in an unsorted array using various approaches.
    """

    @staticmethod
    def _swap(arr: List[int], i: int, j: int) -> None:
        """Helper function to swap two elements in an array."""
        arr[i], arr[j] = arr[j], arr[i]

    @staticmethod
    def _lomuto_partition(arr: List[int], low: int, high: int) -> int:
        """
        Lomuto partition scheme.
        Picks the last element as pivot.
        """
        pivot = arr[high]
        i = low - 1
        for j in range(low, high):
            if arr[j] <= pivot:
                i += 1
                KthLargestElement._swap(arr, i, j)
        KthLargestElement._swap(arr, i + 1, high)
        return i + 1

    @staticmethod
    def _randomized_partition(arr: List[int], low: int, high: int) -> int:
        """
        Randomly selects a pivot index and swaps it with the element at 'high',
        then performs Lomuto partitioning.
        """
        rand_idx = random.randint(low, high)
        KthLargestElement._swap(arr, rand_idx, high)
        return KthLargestElement._lomuto_partition(arr, low, high)

    @staticmethod
    def find_kth_largest_quickselect(nums: List[int], k: int) -> int:
        """
        Finds the Kth largest element using the Quickselect algorithm.
        This is an average O(N) time complexity solution.

        The problem asks for the Kth largest, which is equivalent to finding the
        (N - K)th smallest element in a 0-indexed array.

        Time Complexity:
            - Average: O(N)
            - Worst: O(N^2) (can be mitigated with randomized pivot)
        Space Complexity:
            - Average: O(log N) (due to recursion stack)
            - Worst: O(N) (due to recursion stack in unbalanced partitions)

        Args:
            nums (List[int]): The list of integers.
            k (int): The Kth largest element to find (1-indexed).

        Returns:
            int: The Kth largest element.

        Raises:
            ValueError: If k is out of bounds or nums is empty.
        """
        if not nums:
            raise ValueError("Input array cannot be empty.")
        if not (1 <= k <= len(nums)):
            raise ValueError("k is out of bounds for the array.")

        # Convert k (1-indexed Kth largest) to target index (0-indexed N-Kth smallest)
        # For example, in [3,2,1,5,6,4], K=2 (2nd largest) is 5.
        # This is (6-2) = 4th smallest, so index 3 (0-indexed).
        target_idx = len(nums) - k

        def _quickselect_recursive(arr: List[int], low: int, high: int) -> int:
            if low == high:
                return arr[low]

            # Use randomized partition to improve average case performance
            pivot_idx = KthLargestElement._randomized_partition(arr, low, high)

            if pivot_idx == target_idx:
                return arr[pivot_idx]
            elif pivot_idx < target_idx:
                # Kth smallest is in the right partition
                return _quickselect_recursive(arr, pivot_idx + 1, high)
            else:
                # Kth smallest is in the left partition
                return _quickselect_recursive(arr, low, pivot_idx - 1)

        # Create a mutable copy of nums because quickselect modifies in-place
        nums_copy = list(nums)
        return _quickselect_recursive(nums_copy, 0, len(nums_copy) - 1)

    @staticmethod
    def find_kth_largest_heap(nums: List[int], k: int) -> int:
        """
        Finds the Kth largest element using a min-heap (priority queue).
        This approach maintains a heap of size K, ensuring that the smallest element
        in the heap is always the Kth largest overall among elements processed so far.

        Time Complexity: O(N log K)
            - Building the initial heap of K elements: O(K log K)
            - Processing remaining N-K elements: (N-K) * O(log K)
            - Total: O(K log K + (N-K) log K) = O(N log K)
        Space Complexity: O(K) (for storing the heap)

        Args:
            nums (List[int]): The list of integers.
            k (int): The Kth largest element to find (1-indexed).

        Returns:
            int: The Kth largest element.

        Raises:
            ValueError: If k is out of bounds or nums is empty.
        """
        if not nums:
            raise ValueError("Input array cannot be empty.")
        if not (1 <= k <= len(nums)):
            raise ValueError("k is out of bounds for the array.")

        # Python's `heapq` is a min-heap.
        # To find Kth largest, we need a min-heap of size K.
        # If an element is larger than the heap's smallest (root),
        # pop the smallest and push the new element.
        # This way, the heap always contains the K largest elements seen so far,
        # and its root is the Kth largest among them.
        min_heap = []

        for num in nums:
            if len(min_heap) < k:
                heapq.heappush(min_heap, num)
            elif num > min_heap[0]: # If current number is larger than the smallest in heap
                heapq.heapreplace(min_heap, num) # Pop smallest, push new number

        return min_heap[0] # The root of the min-heap is the Kth largest

    @staticmethod
    def find_kth_largest_sort(nums: List[int], k: int) -> int:
        """
        Finds the Kth largest element by sorting the entire array.
        This is a straightforward but generally less optimal approach for just finding
        the Kth element, as it sorts the whole array even if only one element is needed.

        Time Complexity: O(N log N) (due to sorting)
            - Python's Timsort is O(N log N).
        Space Complexity: O(N) or O(log N) depending on the sort implementation.
            - Python's Timsort typically uses O(N) auxiliary space in worst case.

        Args:
            nums (List[int]): The list of integers.
            k (int): The Kth largest element to find (1-indexed).

        Returns:
            int: The Kth largest element.

        Raises:
            ValueError: If k is out of bounds or nums is empty.
        """
        if not nums:
            raise ValueError("Input array cannot be empty.")
        if not (1 <= k <= len(nums)):
            raise ValueError("k is out of bounds for the array.")

        # Create a copy to avoid modifying the original list
        sorted_nums = sorted(nums)
        # The Kth largest element will be at index len(nums) - k
        return sorted_nums[len(nums) - k]

if __name__ == '__main__':
    print("--- Kth Largest Element ---")
    test_cases = [
        ([3, 2, 1, 5, 6, 4], 2, 5),  # 2nd largest is 5
        ([3, 2, 3, 1, 2, 4, 5, 5, 6], 4, 4), # 4th largest is 4
        ([1], 1, 1),
        ([7, 6, 5, 4, 3, 2, 1], 1, 7), # 1st largest
        ([7, 6, 5, 4, 3, 2, 1], 7, 1), # 7th largest
        ([1, 1, 1, 1, 1], 3, 1),
        ([10, 20, 30, 40, 50], 3, 30),
        ([50, 40, 30, 20, 10], 3, 30),
    ]

    for nums, k, expected in test_cases:
        print(f"\nArray: {nums}, k: {k}")
        
        # Quickselect
        try:
            result_qs = KthLargestElement.find_kth_largest_quickselect(nums, k)
            print(f"  Quickselect Result: {result_qs} (Expected: {expected}) -> {'PASS' if result_qs == expected else 'FAIL'}")
        except ValueError as e:
            print(f"  Quickselect Error: {e}")

        # Heap
        try:
            result_heap = KthLargestElement.find_kth_largest_heap(nums, k)
            print(f"  Heap Result: {result_heap} (Expected: {expected}) -> {'PASS' if result_heap == expected else 'FAIL'}")
        except ValueError as e:
            print(f"  Heap Error: {e}")
            
        # Sort
        try:
            result_sort = KthLargestElement.find_kth_largest_sort(nums, k)
            print(f"  Sort Result: {result_sort} (Expected: {expected}) -> {'PASS' if result_sort == expected else 'FAIL'}")
        except ValueError as e:
            print(f"  Sort Error: {e}")

    # Test edge cases for value errors
    print("\n--- Kth Largest Element - Edge Cases (Error Handling) ---")
    try:
        KthLargestElement.find_kth_largest_quickselect([], 1)
    except ValueError as e:
        print(f"  Quickselect with empty array: {e}")
    
    try:
        KthLargestElement.find_kth_largest_heap([1,2,3], 0)
    except ValueError as e:
        print(f"  Heap with k=0: {e}")

    try:
        KthLargestElement.find_kth_largest_sort([1,2,3], 4)
    except ValueError as e:
        print(f"  Sort with k > len(nums): {e}")