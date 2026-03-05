import random
from typing import List

class QuickSort:
    """
    Implements the Quicksort algorithm using different partitioning schemes.
    Quicksort is an efficient, in-place, comparison-based sorting algorithm.
    It works by selecting a 'pivot' element from the array and partitioning the other
    elements into two sub-arrays, according to whether they are less than or greater
    than the pivot. The sub-arrays are then sorted recursively.
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
        Places the pivot element at its correct position in sorted array,
        and places all smaller (than pivot) to left of pivot
        and all greater elements to right of pivot.
        """
        pivot = arr[high]  # Choose the last element as the pivot
        i = low - 1        # Index of smaller element

        for j in range(low, high):
            # If current element is smaller than or equal to pivot
            if arr[j] <= pivot:
                i += 1
                QuickSort._swap(arr, i, j)

        # Place the pivot in its correct position
        QuickSort._swap(arr, i + 1, high)
        return i + 1

    @staticmethod
    def _hoare_partition(arr: List[int], low: int, high: int) -> int:
        """
        Hoare partition scheme.
        Picks the first element as pivot.
        This scheme is more efficient on average than Lomuto.
        It works with two pointers, `i` and `j`, that start from the ends of the
        array and move towards each other, swapping elements that are on the
        wrong side of the pivot.
        """
        pivot = arr[low]  # Choose the first element as the pivot
        i = low - 1
        j = high + 1

        while True:
            # Find leftmost element greater than or equal to pivot
            i += 1
            while arr[i] < pivot:
                i += 1

            # Find rightmost element smaller than or equal to pivot
            j -= 1
            while arr[j] > pivot:
                j -= 1

            # If pointers cross, partition is complete
            if i >= j:
                return j # Return j, as elements up to j are <= pivot, and from j+1 are >= pivot

            # Swap elements that are on the wrong side
            QuickSort._swap(arr, i, j)

    @staticmethod
    def _randomized_partition(arr: List[int], low: int, high: int, partition_func) -> int:
        """
        Selects a random pivot, swaps it with the element at 'high' (for Lomuto)
        or 'low' (for Hoare), and then calls the chosen partition function.
        """
        rand_idx = random.randint(low, high)
        if partition_func == QuickSort._lomuto_partition:
            QuickSort._swap(arr, rand_idx, high) # Lomuto expects pivot at high
        elif partition_func == QuickSort._hoare_partition:
            QuickSort._swap(arr, rand_idx, low)  # Hoare expects pivot at low
        return partition_func(arr, low, high)

    @staticmethod
    def sort(arr: List[int], use_hoare: bool = False, randomized: bool = False) -> None:
        """
        Sorts an array in-place using the Quicksort algorithm.
        
        Time Complexity:
            - Average: O(N log N)
            - Worst: O(N^2) (can be mitigated with randomized pivot)
        Space Complexity:
            - Average: O(log N) (due to recursion stack)
            - Worst: O(N) (due to recursion stack in unbalanced partitions)
        
        Args:
            arr (List[int]): The list of integers to be sorted.
            use_hoare (bool): If True, uses Hoare's partition scheme. Otherwise, uses Lomuto's.
            randomized (bool): If True, uses a random pivot selection strategy.
        """
        def _quicksort_recursive(arr_ref: List[int], low: int, high: int) -> None:
            if low < high:
                partition_scheme = QuickSort._hoare_partition if use_hoare else QuickSort._lomuto_partition
                if randomized:
                    # For Hoare, the pivot is at low, and the partition index `p` divides the array.
                    # Elements from `low` to `p` are one partition, and `p+1` to `high` is another.
                    # For Lomuto, the pivot is at high, and the partition index `p` is the pivot's final spot.
                    # Elements from `low` to `p-1` are one partition, and `p+1` to `high` is another.
                    # The `randomized_partition` function handles swapping the random pivot to the correct
                    # expected position for the chosen partition scheme.
                    p_idx = QuickSort._randomized_partition(arr_ref, low, high, partition_scheme)
                else:
                    p_idx = partition_scheme(arr_ref, low, high)

                if use_hoare:
                    # For Hoare, `p_idx` is the index of the last element in the left partition.
                    # The next recursive calls are `low` to `p_idx` and `p_idx + 1` to `high`.
                    _quicksort_recursive(arr_ref, low, p_idx)
                    _quicksort_recursive(arr_ref, p_idx + 1, high)
                else: # Lomuto
                    # For Lomuto, `p_idx` is the final position of the pivot itself.
                    # The next recursive calls are `low` to `p_idx - 1` and `p_idx + 1` to `high`.
                    _quicksort_recursive(arr_ref, low, p_idx - 1)
                    _quicksort_recursive(arr_ref, p_idx + 1, high)

        _quicksort_recursive(arr, 0, len(arr) - 1)


class MergeSort:
    """
    Implements the Mergesort algorithm.
    Mergesort is an efficient, stable, comparison-based sorting algorithm.
    It uses a divide-and-conquer strategy.
    """

    @staticmethod
    def sort(arr: List[int]) -> List[int]:
        """
        Sorts a list using the Mergesort algorithm.
        
        Time Complexity:
            - Best, Average, Worst: O(N log N)
        Space Complexity:
            - Worst: O(N) (due to auxiliary array used in merge step)
            
        Args:
            arr (List[int]): The list of integers to be sorted.
            
        Returns:
            List[int]: A new sorted list. The original list is not modified in-place
                       by this common recursive implementation (though variations exist).
        """
        if len(arr) <= 1:
            return arr

        # Divide the array into two halves
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]

        # Recursively sort both halves
        left_half = MergeSort.sort(left_half)
        right_half = MergeSort.sort(right_half)

        # Merge the sorted halves
        return MergeSort._merge(left_half, right_half)

    @staticmethod
    def _merge(left: List[int], right: List[int]) -> List[int]:
        """
        Merges two sorted lists into a single sorted list.
        This is the core of the Mergesort algorithm.
        """
        merged_arr = []
        i = j = 0 # Pointers for left and right arrays

        # Compare elements from both lists and append the smaller one
        while i < len(left) and j < len(right):
            if left[i] <= right[j]: # Using <= ensures stability
                merged_arr.append(left[i])
                i += 1
            else:
                merged_arr.append(right[j])
                j += 1

        # Append any remaining elements (one of the lists might have elements left)
        while i < len(left):
            merged_arr.append(left[i])
            i += 1
        while j < len(right):
            merged_arr.append(right[j])
            j += 1

        return merged_arr

    @staticmethod
    def sort_in_place(arr: List[int]) -> None:
        """
        Sorts an array in-place using a bottom-up (iterative) Mergesort.
        This version aims for in-place modification, but generally still requires
        O(N) auxiliary space for the merge step, it just manages it differently
        or uses a pre-allocated buffer. The standard in-place recursive mergesort
        is complex to implement truly in-place without sacrificing performance
        or increasing complexity significantly (e.g., using O(1) space with
        linked lists or intricate array manipulations).
        
        This implementation will use an auxiliary array for merging, making it
        in-place in terms of modifying the original array object, but not
        O(1) auxiliary space.
        
        Time Complexity: O(N log N)
        Space Complexity: O(N)
        """
        if not arr or len(arr) <= 1:
            return

        n = len(arr)
        aux = [0] * n # Auxiliary array for merging

        # Iteratively merge sub-arrays of increasing size
        # `curr_size` is the size of sub-arrays to be merged (e.g., 1, 2, 4, 8...)
        curr_size = 1
        while curr_size < n:
            # `left_start` is the starting index of the left sub-array
            # `mid_point` is the end index of the left sub-array
            # `right_end` is the end index of the right sub-array
            left_start = 0
            while left_start < n - 1:
                mid_point = min(left_start + curr_size - 1, n - 1)
                right_end = min(left_start + 2 * curr_size - 1, n - 1)

                # Merge arr[left_start...mid_point] and arr[mid_point+1...right_end]
                MergeSort._merge_in_place(arr, aux, left_start, mid_point, right_end)

                left_start += 2 * curr_size
            curr_size *= 2

    @staticmethod
    def _merge_in_place(arr: List[int], aux: List[int], left: int, mid: int, right: int) -> None:
        """
        Helper to merge two sorted sub-arrays in arr using an auxiliary array.
        Copies the relevant portion of arr to aux, then merges back into arr.
        """
        # Copy elements from arr to aux
        for k in range(left, right + 1):
            aux[k] = arr[k]

        i = left        # Pointer for the left sub-array in aux
        j = mid + 1     # Pointer for the right sub-array in aux
        
        # Merge back into arr
        for k in range(left, right + 1):
            if i > mid:  # Left sub-array exhausted
                arr[k] = aux[j]
                j += 1
            elif j > right: # Right sub-array exhausted
                arr[k] = aux[i]
                i += 1
            elif aux[j] < aux[i]: # Element from right sub-array is smaller
                arr[k] = aux[j]
                j += 1
            else: # Element from left sub-array is smaller or equal (for stability)
                arr[k] = aux[i]
                i += 1

if __name__ == '__main__':
    # --- QuickSort Demonstrations ---
    print("--- QuickSort ---")
    test_arrays = [
        [],
        [1],
        [5, 4, 3, 2, 1],
        [1, 2, 3, 4, 5],
        [3, 1, 4, 1, 5, 9, 2, 6],
        [7, 7, 7, 7, 7],
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ]

    for i, arr_orig in enumerate(test_arrays):
        arr_lomuto = list(arr_orig) # Copy for Lomuto
        arr_hoare = list(arr_orig)  # Copy for Hoare
        arr_random_lomuto = list(arr_orig) # Copy for Randomized Lomuto
        arr_random_hoare = list(arr_orig)  # Copy for Randomized Hoare

        print(f"\nOriginal Array {i}: {arr_orig}")

        QuickSort.sort(arr_lomuto, use_hoare=False, randomized=False)
        print(f"  Lomuto Sorted: {arr_lomuto}")
        
        QuickSort.sort(arr_hoare, use_hoare=True, randomized=False)
        print(f"  Hoare Sorted: {arr_hoare}")

        QuickSort.sort(arr_random_lomuto, use_hoare=False, randomized=True)
        print(f"  Randomized Lomuto Sorted: {arr_random_lomuto}")
        
        QuickSort.sort(arr_random_hoare, use_hoare=True, randomized=True)
        print(f"  Randomized Hoare Sorted: {arr_random_hoare}")

    # --- MergeSort Demonstrations ---
    print("\n--- MergeSort ---")
    test_arrays_merge = [
        [],
        [1],
        [5, 4, 3, 2, 1],
        [1, 2, 3, 4, 5],
        [3, 1, 4, 1, 5, 9, 2, 6],
        [7, 7, 7, 7, 7],
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ]

    for i, arr_orig in enumerate(test_arrays_merge):
        arr_out_of_place = list(arr_orig)
        arr_in_place = list(arr_orig)
        
        print(f"\nOriginal Array {i}: {arr_orig}")
        
        sorted_arr_out = MergeSort.sort(arr_out_of_place)
        print(f"  Out-of-place Sorted: {sorted_arr_out}")
        
        MergeSort.sort_in_place(arr_in_place)
        print(f"  In-place Sorted: {arr_in_place}")