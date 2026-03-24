# This file contains implementations of standard sorting algorithms.
# These are provided for completeness and general utility, not directly
# as solutions to the specific problems in `sorting_problems/`.

# --- Merge Sort ---
# Time Complexity: O(N log N) in all cases (best, average, worst).
# Space Complexity: O(N) due to the auxiliary arrays created during merging.
# Stable: Yes (maintains the relative order of equal elements).
# Paradigms: Divide and Conquer. Recursive.

def merge_sort(arr: list) -> list:
    """
    Sorts a list using the Merge Sort algorithm.

    Merge Sort is a divide and conquer algorithm. It divides the input array
    into two halves, calls itself for the two halves, and then merges the two
    sorted halves. The merge() function is used for merging two halves.

    Args:
        arr (list): The list to be sorted.

    Returns:
        list: A new sorted list. The original list is not modified.
    """
    n = len(arr)
    if n <= 1:
        return arr # Base case: a list of 0 or 1 element is already sorted

    mid = n // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    # Recursively sort the two halves
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)

    # Merge the sorted halves
    return _merge(left_sorted, right_sorted)

def _merge(left: list, right: list) -> list:
    """
    Merges two sorted lists into a single sorted list.

    Args:
        left (list): The first sorted list.
        right (list): The second sorted list.

    Returns:
        list: A new list containing all elements from both input lists, sorted.
    """
    merged_list = []
    i = j = 0 # Pointers for left and right lists

    # Compare elements from both lists and append the smaller one
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: # Use <= for stability
            merged_list.append(left[i])
            i += 1
        else:
            merged_list.append(right[j])
            j += 1

    # Append any remaining elements from left list
    while i < len(left):
        merged_list.append(left[i])
        i += 1

    # Append any remaining elements from right list
    while j < len(right):
        merged_list.append(right[j])
        j += 1

    return merged_list


# --- Quick Sort ---
# Time Complexity: O(N log N) on average, O(N^2) in worst case.
# Space Complexity: O(log N) on average for recursion stack, O(N) in worst case.
# Stable: No (does not preserve the relative order of equal elements).
# Paradigms: Divide and Conquer. Recursive.

def quick_sort(arr: list, low: int = 0, high: int = -1) -> None:
    """
    Sorts a list in-place using the Quick Sort algorithm.

    Quick Sort is a divide and conquer algorithm. It picks an element as a pivot
    and partitions the given array around the picked pivot.

    Args:
        arr (list): The list to be sorted (modified in-place).
        low (int): The starting index of the subarray to be sorted.
        high (int): The ending index of the subarray to be sorted.
                    Defaults to -1, which means the end of the list.
    """
    if high == -1:
        high = len(arr) - 1

    if low < high:
        # pi is partitioning index, arr[pi] is now at right place
        pi = _partition_quick_sort(arr, low, high)

        # Recursively sort elements before partition and after partition
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def _partition_quick_sort(arr: list, low: int, high: int) -> int:
    """
    Partitions a subarray `arr[low...high]` around a pivot.
    This implementation uses the last element as the pivot (Lomuto partition scheme).

    Args:
        arr (list): The list being sorted.
        low (int): The starting index of the subarray.
        high (int): The ending index of the subarray (pivot element).

    Returns:
        int: The final index of the pivot element after partitioning.
    """
    pivot = arr[high] # Choose the last element as the pivot
    i = (low - 1)      # Index of smaller element

    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i] # Swap if smaller

    arr[i + 1], arr[high] = arr[high], arr[i + 1] # Swap pivot to its correct position
    return i + 1

# Note on pivot choice for Quick Sort:
# - Choosing the last element (Lomuto partition scheme) can lead to O(N^2)
#   in worst-case if the array is already sorted or reverse-sorted.
# - Choosing the first element (Hoare partition scheme) can also suffer from worst-case.
# - Choosing a random pivot, or median-of-three, helps to achieve O(N log N) on average.
# The `_quickselect_kth` in `k_largest_element.py` uses a random pivot for better average performance.