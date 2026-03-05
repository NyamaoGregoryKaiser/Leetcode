from typing import List

class SortColors:
    """
    Implements the Dutch National Flag problem (Sort Colors).
    Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place
    so that objects of the same color are adjacent, with the colors in the order red,
    white, and blue. We use the integers 0, 1, and 2 to represent red, white, and blue,
    respectively.
    """

    @staticmethod
    def _swap(arr: List[int], i: int, j: int) -> None:
        """Helper function to swap two elements in an array."""
        arr[i], arr[j] = arr[j], arr[i]

    @staticmethod
    def sort_colors_dutch_national_flag(nums: List[int]) -> None:
        """
        Sorts the array in-place using the Dutch National Flag algorithm (3-way partitioning).
        This algorithm uses three pointers (low, mid, high) to partition the array
        into three sections: 0s, 1s, and 2s.

        Time Complexity: O(N)
            - Each element is visited and potentially swapped at most a constant number of times.
        Space Complexity: O(1)
            - It's an in-place sorting algorithm.

        Args:
            nums (List[int]): The list of integers (0, 1, or 2) to be sorted.
        """
        n = len(nums)
        if n < 2: # Already sorted or empty
            return

        low = 0      # Pointer for the boundary of 0s (elements before `low` are 0)
        mid = 0      # Pointer for the current element being examined
        high = n - 1 # Pointer for the boundary of 2s (elements after `high` are 2)

        while mid <= high:
            if nums[mid] == 0:
                # If current element is 0, swap it with the element at `low`.
                # Then increment both `low` and `mid`.
                SortColors._swap(nums, low, mid)
                low += 1
                mid += 1
            elif nums[mid] == 1:
                # If current element is 1, it's already in its correct "middle" place.
                # Just increment `mid`.
                mid += 1
            else: # nums[mid] == 2
                # If current element is 2, swap it with the element at `high`.
                # Decrement `high`. DO NOT increment `mid` because the element
                # swapped from `high` might be a 0 or 1, and needs to be re-evaluated.
                SortColors._swap(nums, mid, high)
                high -= 1

    @staticmethod
    def sort_colors_counting_sort(nums: List[int]) -> None:
        """
        Sorts the array using a counting sort approach.
        This is an alternative, often simpler to implement, but uses O(K) space
        where K is the number of distinct values (here K=3).

        Time Complexity: O(N + K)
            - First pass to count frequencies: O(N)
            - Second pass to rewrite array: O(N)
            - K is constant (3), so overall O(N).
        Space Complexity: O(K)
            - To store counts (here, an array of size 3).

        Args:
            nums (List[int]): The list of integers (0, 1, or 2) to be sorted.
        """
        n = len(nums)
        if n < 2:
            return

        counts = [0, 0, 0] # counts[0] for 0s, counts[1] for 1s, counts[2] for 2s

        # First pass: count frequencies of each color
        for num in nums:
            if 0 <= num <= 2: # Validate input
                counts[num] += 1
            else:
                raise ValueError("Array elements must be 0, 1, or 2.")

        # Second pass: overwrite the array based on counts
        index = 0
        for color in range(3):
            for _ in range(counts[color]):
                nums[index] = color
                index += 1
    
    @staticmethod
    def sort_colors_python_sort(nums: List[int]) -> None:
        """
        Sorts the array using Python's built-in sort (Timsort).
        This is generally the "brute-force" or "lazy" solution in an interview
        context for this specific problem, as it doesn't leverage the specific
        properties of the data (only 3 distinct values).

        Time Complexity: O(N log N)
        Space Complexity: O(N) or O(log N) (depending on Timsort implementation details)

        Args:
            nums (List[int]): The list of integers (0, 1, or 2) to be sorted.
        """
        nums.sort()


if __name__ == '__main__':
    print("--- Sort Colors (Dutch National Flag) ---")
    test_cases = [
        ([2, 0, 2, 1, 1, 0], [0, 0, 1, 1, 2, 2]),
        ([2, 0, 1], [0, 1, 2]),
        ([0], [0]),
        ([1], [1]),
        ([2], [2]),
        ([], []),
        ([0, 0, 0], [0, 0, 0]),
        ([2, 2, 2], [2, 2, 2]),
        ([1, 1, 1], [1, 1, 1]),
        ([0, 1, 2], [0, 1, 2]),
        ([2, 1, 0], [0, 1, 2]),
        ([1, 0, 2, 0, 1, 2], [0, 0, 1, 1, 2, 2]),
    ]

    for i, (orig_arr, expected_arr) in enumerate(test_cases):
        print(f"\nTest Case {i+1}:")

        # Test Dutch National Flag
        arr_dnf = list(orig_arr) # Copy array for modification
        SortColors.sort_colors_dutch_national_flag(arr_dnf)
        print(f"  DNF: Original: {orig_arr}, Sorted: {arr_dnf}, Expected: {expected_arr} -> {'PASS' if arr_dnf == expected_arr else 'FAIL'}")

        # Test Counting Sort
        arr_counting = list(orig_arr)
        SortColors.sort_colors_counting_sort(arr_counting)
        print(f"  Counting Sort: Original: {orig_arr}, Sorted: {arr_counting}, Expected: {expected_arr} -> {'PASS' if arr_counting == expected_arr else 'FAIL'}")
        
        # Test Python Built-in Sort
        arr_python = list(orig_arr)
        SortColors.sort_colors_python_sort(arr_python)
        print(f"  Python Sort: Original: {orig_arr}, Sorted: {arr_python}, Expected: {expected_arr} -> {'PASS' if arr_python == expected_arr else 'FAIL'}")

    # Test error handling for invalid input
    print("\n--- Sort Colors - Edge Cases (Error Handling) ---")
    try:
        SortColors.sort_colors_counting_sort([0, 1, 3])
    except ValueError as e:
        print(f"  Counting Sort with invalid element: {e}")