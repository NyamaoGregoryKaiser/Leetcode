"""
Module for core Binary Search implementations and variations.

This file includes:
1. Standard iterative binary search.
2. Standard recursive binary search.
3. Binary search template for finding the leftmost (first occurrence) element.
4. Binary search template for finding the rightmost (last occurrence) element.
5. A brute-force linear search for comparison.

All functions include detailed comments, time and space complexity analysis.
"""

from typing import List, Optional


def linear_search(arr: List[int], target: int) -> int:
    """
    Brute-force linear search to find the target in an array.

    Iterates through the array sequentially until the target is found.

    Args:
        arr (List[int]): The list of integers to search in. Not necessarily sorted.
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, -1 otherwise.

    Time Complexity: O(N) in the worst case, where N is the number of elements in arr.
                     This is because, in the worst case, we might have to check every element.
    Space Complexity: O(1) as it uses a constant amount of extra space.
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1


def binary_search_iterative(arr: List[int], target: int) -> int:
    """
    Performs an iterative binary search on a sorted array to find the target.
    This version finds *any* occurrence of the target.

    Args:
        arr (List[int]): The sorted list of integers to search in.
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, -1 otherwise.

    Time Complexity: O(log N), where N is the number of elements in arr.
                     This is because the search space is halved in each step.
    Space Complexity: O(1) as it uses a constant amount of extra space.
    """
    if not arr:
        return -1

    low, high = 0, len(arr) - 1

    while low <= high:
        # Calculate mid to avoid potential overflow issues with `(low + high) // 2`
        # This is more critical in languages like C++/Java with fixed-size integers.
        mid = low + (high - low) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            # Target is in the right half
            low = mid + 1
        else:
            # Target is in the left half
            high = mid - 1
    return -1  # Target not found


def _binary_search_recursive_helper(arr: List[int], target: int, low: int, high: int) -> int:
    """
    Helper function for the recursive binary search.
    """
    if low > high:
        return -1  # Base case: search space is empty, target not found

    mid = low + (high - low) // 2

    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        # Target is in the right half
        return _binary_search_recursive_helper(arr, target, mid + 1, high)
    else:
        # Target is in the left half
        return _binary_search_recursive_helper(arr, target, low, mid - 1)


def binary_search_recursive(arr: List[int], target: int) -> int:
    """
    Performs a recursive binary search on a sorted array to find the target.
    This version finds *any* occurrence of the target.

    Args:
        arr (List[int]): The sorted list of integers to search in.
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, -1 otherwise.

    Time Complexity: O(log N), where N is the number of elements in arr.
                     Each recursive call halves the search space.
    Space Complexity: O(log N) due to the recursion stack depth. In the worst case,
                      the stack depth can be log N.
    """
    if not arr:
        return -1
    return _binary_search_recursive_helper(arr, target, 0, len(arr) - 1)


def binary_search_template_leftmost(arr: List[int], target: int) -> int:
    """
    Binary search template to find the *first occurrence* of the target
    or the *insertion point* (index of the first element >= target).

    This template is useful for `lower_bound` functionality.

    Args:
        arr (List[int]): The sorted list of integers to search in.
        target (int): The integer value to search for.

    Returns:
        int: The index of the first occurrence of the target.
             If the target is not found, returns the index where it would be inserted
             to maintain order (i.e., the index of the first element greater than target).
             Returns `len(arr)` if all elements are less than the target.

    Time Complexity: O(log N)
    Space Complexity: O(1)
    """
    if not arr:
        return 0  # Target would be inserted at index 0 in an empty array

    low, high = 0, len(arr) - 1
    ans = len(arr)  # Initialize answer to len(arr) (potential insertion point if target > all elements)

    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] >= target:
            # arr[mid] is a potential answer (or could be better, smaller index)
            ans = mid
            # Try to find an even smaller index in the left half
            high = mid - 1
        else:
            # arr[mid] is too small, target must be in the right half
            low = mid + 1
    return ans


def binary_search_template_rightmost(arr: List[int], target: int) -> int:
    """
    Binary search template to find the *last occurrence* of the target
    or the *insertion point* (index of the first element > target, or `len(arr)`).

    This template is useful for `upper_bound` functionality (finding the index
    of the first element strictly greater than the target). To get the index of
    the last occurrence, we would typically subtract 1 from the result of this
    template if the element at `result - 1` is actually the target.

    Args:
        arr (List[int]): The sorted list of integers to search in.
        target (int): The integer value to search for.

    Returns:
        int: The index of the first element strictly greater than the target.
             If the target is not found, or if all elements are less than or equal to target,
             returns `len(arr)`.
             To find the index of the *last occurrence* of the target:
             If result > 0 and arr[result-1] == target, then result-1 is the index.
             Otherwise, target is not found.

    Time Complexity: O(log N)
    Space Complexity: O(1)
    """
    if not arr:
        return 0

    low, high = 0, len(arr) - 1
    ans = len(arr)  # Initialize answer to len(arr)

    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] > target:
            # arr[mid] is a potential answer (first element strictly greater than target)
            ans = mid
            # Try to find an even smaller index in the left half
            high = mid - 1
        else:
            # arr[mid] is less than or equal to target, so we need to look in the right half
            low = mid + 1
    return ans


def find_last_occurrence_using_rightmost_template(arr: List[int], target: int) -> int:
    """
    Finds the index of the last occurrence of the target in a sorted array.
    This function leverages the `binary_search_template_rightmost`.

    Args:
        arr (List[int]): The sorted list of integers to search in.
        target (int): The integer value to search for.

    Returns:
        int: The index of the last occurrence of the target if found, -1 otherwise.

    Time Complexity: O(log N)
    Space Complexity: O(1)
    """
    if not arr:
        return -1

    # `binary_search_template_rightmost` returns the index of the first element strictly greater than target.
    # If we subtract 1 from this index, we get the index of the last element that is <= target.
    # We then need to check if this element is actually the target.
    idx = binary_search_template_rightmost(arr, target)
    
    # After the loop, `idx` will be the index of the first element > target.
    # So, `idx - 1` would be the index of the last element <= target.
    if idx > 0 and arr[idx - 1] == target:
        return idx - 1
    return -1


def find_first_occurrence_using_leftmost_template(arr: List[int], target: int) -> int:
    """
    Finds the index of the first occurrence of the target in a sorted array.
    This function leverages the `binary_search_template_leftmost`.

    Args:
        arr (List[int]): The sorted list of integers to search in.
        target (int): The integer value to search for.

    Returns:
        int: The index of the first occurrence of the target if found, -1 otherwise.

    Time Complexity: O(log N)
    Space Complexity: O(1)
    """
    if not arr:
        return -1

    # `binary_search_template_leftmost` returns the index of the first element >= target.
    idx = binary_search_template_leftmost(arr, target)
    
    # Check if the found index is valid and if the element at that index is indeed the target.
    if idx < len(arr) and arr[idx] == target:
        return idx
    return -1