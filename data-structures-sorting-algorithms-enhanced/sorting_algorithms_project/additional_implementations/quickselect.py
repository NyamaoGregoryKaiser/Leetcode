import random

def find_kth_largest_quickselect(nums, k):
    """
    Problem 3: Kth Largest Element in an Array - Approach 3: Quickselect.
    Finds the k-th largest element using the Quickselect algorithm.
    Quickselect is a selection algorithm to find the k-th smallest (or k-th largest)
    element in an unsorted list. It is a variant of the Quick Sort algorithm.

    Unlike Quick Sort, which sorts both sides of the pivot, Quickselect only
    recurs on the side where the desired element (k-th largest) is expected to be.
    This reduces the average time complexity to O(N).

    Args:
        nums (list): The unsorted list of integers. It will be modified in-place.
        k (int): The k-th largest element to find.

    Returns:
        int: The k-th largest element.

    Raises:
        ValueError: If `nums` is empty, `k` is non-positive, or `k` is greater than
                    the length of `nums`.

    Time Complexity:
        - Average Case: O(N) - On average, the algorithm halves the search space
                               with each partition.
        - Worst Case: O(N^2) - Occurs if the pivot selection consistently
                               results in highly unbalanced partitions (similar to Quick Sort).
                               This can be mitigated by choosing a random pivot.

    Space Complexity:
        - O(log N) - Average case for the recursive call stack.
        - O(N) - Worst case for the recursive call stack (unbalanced partitions).
    """
    if not nums or k <= 0 or k > len(nums):
        raise ValueError("Invalid input: nums is empty, k is out of bounds.")

    # Convert k-th largest to k-th smallest index for 0-indexed array logic
    # If we want the 2nd largest in [3,2,1,5,6,4] (N=6), sorted is [1,2,3,4,5,6].
    # 2nd largest is 5, which is at index 4. This is N - k.
    # So, we are looking for the (len(nums) - k)th smallest element.
    target_index = len(nums) - k

    return _quickselect_recursive(nums, 0, len(nums) - 1, target_index)

def _quickselect_recursive(arr, low, high, target_index):
    """
    Recursive helper function for Quickselect.
    """
    if low == high: # Base case: if the list contains only one element
        return arr[low]

    # Choose a random pivot index to minimize worst-case scenario
    pivot_idx = random.randint(low, high)
    # Move pivot to the end for Lomuto partition scheme
    arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
    
    # Partition the array and get the final position of the pivot
    pivot_final_idx = _partition_lomuto(arr, low, high)

    # If pivot is at target_index, we found our element
    if pivot_final_idx == target_index:
        return arr[pivot_final_idx]
    # If target_index is less than pivot_final_idx, search in the left partition
    elif target_index < pivot_final_idx:
        return _quickselect_recursive(arr, low, pivot_final_idx - 1, target_index)
    # If target_index is greater than pivot_final_idx, search in the right partition
    else: # target_index > pivot_final_idx
        return _quickselect_recursive(arr, pivot_final_idx + 1, high, target_index)

def _partition_lomuto(arr, low, high):
    """
    Lomuto Partition Scheme for Quickselect (same as in Quick Sort).
    Uses the element at `arr[high]` as the pivot (after potentially swapping a random one there).
    Rearranges elements such that all elements less than or equal to the pivot
    come before it, and all elements greater than the pivot come after it.
    Returns the final index of the pivot.
    """
    pivot_value = arr[high] # Pivot is now at the end
    i = low - 1 # Index of smaller element

    for j in range(low, high):
        # If current element is smaller than or equal to the pivot
        if arr[j] <= pivot_value:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    # Place the pivot in its correct sorted position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```