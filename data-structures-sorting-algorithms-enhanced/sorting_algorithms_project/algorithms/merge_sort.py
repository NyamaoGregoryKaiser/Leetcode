def merge_sort(arr):
    """
    Sorts an array using the Merge Sort algorithm.

    Merge Sort is a divide-and-conquer algorithm. It works by recursively
    breaking down an array into two or more subarrays until each subarray
    contains only one element (which is by definition sorted). Then, these
    subarrays are merged back together in a sorted manner.

    Args:
        arr (list): The list of comparable elements to be sorted.

    Returns:
        list: A new sorted list. Note that this implementation is not in-place
              as it creates new lists for the halves and then merges them.
              An in-place merge sort is possible but significantly more complex
              and generally not preferred due to performance overheads.

    Time Complexity:
        - Worst Case: O(n log n)
        - Average Case: O(n log n)
        - Best Case: O(n log n) (even if already sorted, it still divides and merges)

    Space Complexity:
        - O(n) - Due to the temporary arrays created during the merge step (left_half, right_half)
                 and the recursive call stack.

    Stability:
        - Stable: It preserves the relative order of equal elements during the merge step.
    """
    n = len(arr)
    if n <= 1:
        return arr # Base case: an array with 0 or 1 element is already sorted

    mid = n // 2
    left_half = arr[:mid]      # Divide the array into two halves
    right_half = arr[mid:]

    left_half = merge_sort(left_half)    # Recursively sort the first half
    right_half = merge_sort(right_half)  # Recursively sort the second half

    return _merge(left_half, right_half) # Merge the sorted halves

def _merge(left, right):
    """
    Helper function to merge two sorted lists into a single sorted list.
    """
    merged = []
    i = 0 # Pointer for the left list
    j = 0 # Pointer for the right list

    # Compare elements from both lists and append the smaller one to the merged list
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: # Use <= for stability
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1

    # Append any remaining elements from the left list (if any)
    while i < len(left):
        merged.append(left[i])
        i += 1

    # Append any remaining elements from the right list (if any)
    while j < len(right):
        merged.append(right[j])
        j += 1

    return merged

# Example of an in-place merge sort for comparison, though often less practical for interviews
# due to complexity and actual performance.
def merge_sort_in_place(arr):
    """
    An *attempt* at an in-place merge sort.
    True in-place merge sort is very complex and often not practical.
    This version modifies the original array `arr` but still uses O(N) auxiliary space
    for the `temp` array during merging, which is common for practical "in-place"
    implementations that prioritize speed over strict O(1) space.
    """
    _merge_sort_recursive_in_place(arr, 0, len(arr) - 1)

def _merge_sort_recursive_in_place(arr, left_idx, right_idx):
    if left_idx >= right_idx:
        return

    mid_idx = (left_idx + right_idx) // 2
    _merge_sort_recursive_in_place(arr, left_idx, mid_idx)
    _merge_sort_recursive_in_place(arr, mid_idx + 1, right_idx)
    _merge_in_place(arr, left_idx, mid_idx, right_idx)

def _merge_in_place(arr, left_idx, mid_idx, right_idx):
    """
    Merges two sorted subarrays arr[left_idx...mid_idx] and arr[mid_idx+1...right_idx]
    back into arr. This requires O(N) auxiliary space for the temporary array.
    """
    left_start = left_idx
    right_start = mid_idx + 1
    temp = []

    while left_start <= mid_idx and right_start <= right_idx:
        if arr[left_start] <= arr[right_start]:
            temp.append(arr[left_start])
            left_start += 1
        else:
            temp.append(arr[right_start])
            right_start += 1

    while left_start <= mid_idx:
        temp.append(arr[left_start])
        left_start += 1

    while right_start <= right_idx:
        temp.append(arr[right_start])
        right_start += 1

    # Copy elements from temp back to the original array
    for i in range(len(temp)):
        arr[left_idx + i] = temp[i]
```