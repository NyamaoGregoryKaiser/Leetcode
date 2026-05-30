import random

def quick_sort(arr, pivot_choice="last"):
    """
    Sorts an array using the Quick Sort algorithm.

    Quick Sort is a highly efficient, in-place, comparison-based sorting algorithm.
    It works by selecting a 'pivot' element from the array and partitioning the
    other elements into two sub-arrays, according to whether they are less than
    or greater than the pivot. The sub-arrays are then sorted recursively.

    Args:
        arr (list): The list of comparable elements to be sorted.
        pivot_choice (str): Strategy for choosing the pivot.
                            Options: "last", "first", "middle", "random".
                            Default is "last".

    Time Complexity:
        - Worst Case: O(n^2) - Occurs when the pivot selection consistently results in
                               highly unbalanced partitions (e.g., already sorted array
                               with last element as pivot, or all elements are same).
        - Average Case: O(n log n) - Achieved with good pivot selection that creates
                                     balanced partitions.
        - Best Case: O(n log n) - When the pivot consistently divides the array into
                                  two equal halves.

    Space Complexity:
        - O(log n) - Average case for the recursive call stack.
        - O(n) - Worst case for the recursive call stack (unbalanced partitions).
                 This is generally considered "in-place" because the auxiliary space
                 is for the call stack, not for storing duplicates of the data.

    Stability:
        - Unstable: Quick Sort is generally not stable. The relative order of equal
                    elements may not be preserved due to swapping elements far apart
                    during partitioning.
    """
    _quick_sort_recursive(arr, 0, len(arr) - 1, pivot_choice)

def _quick_sort_recursive(arr, low, high, pivot_choice):
    """
    Recursive helper function for Quick Sort.
    """
    if low < high:
        # pi is partitioning index, arr[pi] is now at right place
        pi = _partition(arr, low, high, pivot_choice)

        # Separately sort elements before partition and after partition
        _quick_sort_recursive(arr, low, pi - 1, pivot_choice)
        _quick_sort_recursive(arr, pi + 1, high, pivot_choice)

def _partition(arr, low, high, pivot_choice):
    """
    Partition scheme (Lomuto Partition Scheme is commonly used).
    It places the pivot element at its correct sorted position and places
    all smaller elements to its left and all greater elements to its right.
    """
    # 1. Choose Pivot
    if pivot_choice == "first":
        pivot_idx = low
    elif pivot_choice == "middle":
        pivot_idx = (low + high) // 2
    elif pivot_choice == "random":
        pivot_idx = random.randint(low, high)
    else: # Default and "last"
        pivot_idx = high

    pivot_value = arr[pivot_idx]

    # Move pivot to the end (if not already there) to simplify partition logic
    # This prepares the array for Lomuto's partition scheme where pivot is at the end.
    if pivot_idx != high:
        arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
    # Now the pivot is arr[high]

    i = low - 1  # Index of smaller element

    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot_value:
            # Increment index of smaller element and swap
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    # Swap the pivot element (currently at arr[high]) with the element at i + 1
    # This places the pivot in its correct sorted position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1 # Return the index of the pivot element

# Alternative Partition Scheme (Hoare's Partition Scheme)
# Hoare's scheme is generally more efficient than Lomuto's because it does fewer swaps
# on average, especially for arrays with many duplicate elements.
# It places the pivot such that elements before it are less than or equal to,
# and elements after it are greater than or equal to the pivot.
def _hoare_partition(arr, low, high, pivot_choice):
    """
    Hoare's Partition Scheme.
    """
    # 1. Choose Pivot
    if pivot_choice == "first":
        pivot_idx = low
    elif pivot_choice == "middle":
        pivot_idx = (low + high) // 2
    elif pivot_choice == "random":
        pivot_idx = random.randint(low, high)
    else: # Default and "last"
        pivot_idx = high

    pivot_value = arr[pivot_idx]
    # Move pivot to the beginning
    arr[pivot_idx], arr[low] = arr[low], arr[pivot_idx]
    # Now pivot is arr[low]

    i = low - 1
    j = high + 1

    while True:
        i += 1
        while arr[i] < pivot_value:
            i += 1

        j -= 1
        while arr[j] > pivot_value:
            j -= 1

        if i >= j:
            return j # Return the split point

        arr[i], arr[j] = arr[j], arr[i]

# To use Hoare's partition:
# Change `pi = _partition(arr, low, high, pivot_choice)` to `pi = _hoare_partition(arr, low, high, pivot_choice)`
# And change recursive calls to:
# `_quick_sort_recursive(arr, low, pi, pivot_choice)`
# `_quick_sort_recursive(arr, pi + 1, high, pivot_choice)`
```