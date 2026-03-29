import random

def insertion_sort(arr: list) -> None:
    """
    Sorts an array in-place using the Insertion Sort algorithm.

    Insertion sort builds the final sorted array (or list) one item at a time.
    It iterates through the input array and removes one element at a time,
    finds the place where it belongs within the already sorted part, and inserts it there.

    Args:
        arr: The list of elements to be sorted. Modified in-place.

    Time Complexity:
        - Worst Case: O(N^2) - When the array is reverse sorted. Each element
          might need to be shifted all the way to the beginning.
        - Average Case: O(N^2)
        - Best Case: O(N) - When the array is already sorted. Each element
          is compared only once with its preceding element.
    Space Complexity:
        - O(1) - It's an in-place sorting algorithm, requiring minimal
          additional space.
    """
    n = len(arr)
    if n <= 1:
        return

    for i in range(1, n):
        # Pick current element to be inserted
        key = arr[i]
        j = i - 1

        # Move elements of arr[0..i-1], that are greater than key,
        # to one position ahead of their current position
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def merge_sort(arr: list) -> list:
    """
    Sorts an array using the Merge Sort algorithm.

    Merge sort is a divide-and-conquer algorithm. It recursively divides an
    array in half until it gets to single-element arrays, then merges
    those halves back together in sorted order.

    Args:
        arr: The list of elements to be sorted.

    Returns:
        A new list containing the sorted elements. The original list is not
        modified directly (though temporary lists are created during recursion).

    Time Complexity:
        - Worst Case: O(N log N)
        - Average Case: O(N log N)
        - Best Case: O(N log N) (or O(N) if optimization for already sorted
          halves is added, but typically not counted for overall complexity)
    Space Complexity:
        - O(N) - Due to the auxiliary space required for merging sub-arrays.
          Each merge operation needs temporary arrays proportional to the
          size of the merged segments.
    """
    n = len(arr)
    if n <= 1:
        return arr

    mid = n // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    # Recursively sort both halves
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)

    # Merge the sorted halves
    return _merge(left_sorted, right_sorted)

def _merge(left: list, right: list) -> list:
    """
    Helper function for Merge Sort to merge two sorted lists into one sorted list.

    Args:
        left: The first sorted list.
        right: The second sorted list.

    Returns:
        A new list containing all elements from `left` and `right` in sorted order.
    """
    merged_list = []
    i = j = 0 # Pointers for left and right lists

    # Compare elements from both lists and append the smaller one
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged_list.append(left[i])
            i += 1
        else:
            merged_list.append(right[j])
            j += 1

    # Append any remaining elements (if one list is exhausted before the other)
    merged_list.extend(left[i:])
    merged_list.extend(right[j:])
    return merged_list

def quick_sort(arr: list) -> None:
    """
    Sorts an array in-place using the Quick Sort algorithm.

    Quick Sort is a divide-and-conquer algorithm. It picks an element as a pivot
    and partitions the given array around the picked pivot. The pivot is placed
    at its correct sorted position in the array. This process is applied recursively
    to the sub-arrays on either side of the pivot.

    Args:
        arr: The list of elements to be sorted. Modified in-place.

    Time Complexity:
        - Worst Case: O(N^2) - Occurs when the pivot selection consistently
          results in highly unbalanced partitions (e.g., always picking the
          smallest or largest element in an already sorted array).
        - Average Case: O(N log N) - With a good pivot selection strategy,
          partitions are relatively balanced.
        - Best Case: O(N log N)
    Space Complexity:
        - O(log N) average-case for the recursion stack.
        - O(N) worst-case for the recursion stack (if partitions are highly
          unbalanced, similar to the worst-case time complexity).
    """
    def _quicksort_recursive(arr_internal: list, low: int, high: int) -> None:
        if low < high:
            # pi is partitioning index, arr[pi] is now at right place
            pi = _partition_lomuto(arr_internal, low, high)
            # pi = _partition_hoare(arr_internal, low, high) # Uncomment for Hoare partition

            # Separately sort elements before partition and after partition
            _quicksort_recursive(arr_internal, low, pi - 1)
            _quicksort_recursive(arr_internal, pi + 1, high)

    # To avoid worst-case O(N^2) for already sorted or reverse sorted arrays,
    # a common practice is to choose a random pivot or median-of-three.
    # Here, for simplicity, we use the last element as pivot for Lomuto.
    # For Hoare, often the middle element or a random element is chosen.
    _quicksort_recursive(arr, 0, len(arr) - 1)

def _partition_lomuto(arr: list, low: int, high: int) -> int:
    """
    Lomuto partition scheme for Quick Sort.
    Picks the last element as pivot.
    Places the pivot element at its correct position in sorted array,
    and places all smaller (than pivot) to left of pivot and all greater
    elements to right of pivot.

    Args:
        arr: The list of elements.
        low: Starting index of the sub-array.
        high: Ending index of the sub-array (inclusive).

    Returns:
        The index of the pivot element after partitioning.
    """
    pivot = arr[high]  # Choose the last element as the pivot
    i = low - 1        # Index of smaller element

    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i] # Swap if element is smaller

    arr[i + 1], arr[high] = arr[high], arr[i + 1] # Place pivot in correct position
    return i + 1

# Alternative: Hoare partition scheme (often more efficient but slightly trickier to implement correctly)
# def _partition_hoare(arr: list, low: int, high: int) -> int:
#     """
#     Hoare partition scheme for Quick Sort.
#     Picks the first element as pivot.
#     Places elements smaller than pivot to its left and greater to its right.
#     Returns an index `p` such that all elements `arr[low...p]` are less than
#     or equal to `arr[p]` and all elements `arr[p+1...high]` are greater than
#     or equal to `arr[p]`.
#
#     Args:
#         arr: The list of elements.
#         low: Starting index of the sub-array.
#         high: Ending index of the sub-array (inclusive).
#
#     Returns:
#         The index where the partition ends.
#     """
#     pivot = arr[low]
#     i = low - 1
#     j = high + 1
#
#     while True:
#         i += 1
#         while arr[i] < pivot:
#             i += 1
#
#         j -= 1
#         while arr[j] > pivot:
#             j -= 1
#
#         if i >= j:
#             return j # Return j, or i, it indicates the split point
#
#         arr[i], arr[j] = arr[j], arr[i]