"""
This module contains optimal binary search implementations for finding elements,
and their first/last occurrences in a sorted array.
"""

from typing import List, Tuple

def binary_search_iterative(arr: List[int], target: int) -> int:
    """
    Performs an iterative binary search to find the target element in a sorted array.

    Args:
        arr (List[int]): The sorted list of integers to search within.
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, otherwise -1.

    Time Complexity: O(log N) - The search space is halved in each step.
    Space Complexity: O(1) - Uses a constant amount of extra space.
    """
    low, high = 0, len(arr) - 1

    while low <= high:
        # Calculate mid to prevent potential integer overflow for very large low/high values
        # This is a common practice in C++/Java. In Python, integers handle arbitrary size,
        # but the pattern `low + (high - low) // 2` is still good for readability and cross-language consistency.
        mid = low + (high - low) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else: # arr[mid] > target
            high = mid - 1
    
    return -1


def find_first_occurrence(arr: List[int], target: int) -> int:
    """
    Finds the first occurrence of the target element in a sorted array that may contain duplicates.

    Args:
        arr (List[int]): The sorted list of integers to search within.
        target (int): The integer value to search for.

    Returns:
        int: The index of the first occurrence of the target if found, otherwise -1.

    Time Complexity: O(log N) - The search space is halved in each step.
    Space Complexity: O(1) - Uses a constant amount of extra space.
    """
    low, high = 0, len(arr) - 1
    first_occurrence = -1

    while low <= high:
        mid = low + (high - low) // 2

        if arr[mid] == target:
            first_occurrence = mid  # Found a potential first occurrence
            high = mid - 1          # Try to find an earlier occurrence in the left half
        elif arr[mid] < target:
            low = mid + 1
        else: # arr[mid] > target
            high = mid - 1
            
    return first_occurrence


def find_last_occurrence(arr: List[int], target: int) -> int:
    """
    Finds the last occurrence of the target element in a sorted array that may contain duplicates.

    Args:
        arr (List[int]): The sorted list of integers to search within.
        target (int): The integer value to search for.

    Returns:
        int: The index of the last occurrence of the target if found, otherwise -1.

    Time Complexity: O(log N) - The search space is halved in each step.
    Space Complexity: O(1) - Uses a constant amount of extra space.
    """
    low, high = 0, len(arr) - 1
    last_occurrence = -1

    while low <= high:
        mid = low + (high - low) // 2

        if arr[mid] == target:
            last_occurrence = mid   # Found a potential last occurrence
            low = mid + 1           # Try to find a later occurrence in the right half
        elif arr[mid] < target:
            low = mid + 1
        else: # arr[mid] > target
            high = mid - 1
            
    return last_occurrence


def find_first_and_last_occurrence(arr: List[int], target: int) -> Tuple[int, int]:
    """
    Finds both the first and last occurrences of the target element in a sorted array.

    Args:
        arr (List[int]): The sorted list of integers to search within.
        target (int): The integer value to search for.

    Returns:
        Tuple[int, int]: A tuple containing the index of the first occurrence and
                         the index of the last occurrence. Returns (-1, -1) if
                         the target is not found.

    Time Complexity: O(log N) - Calls two O(log N) functions.
    Space Complexity: O(1) - Uses a constant amount of extra space.
    """
    first = find_first_occurrence(arr, target)
    if first == -1: # Target not found at all
        return (-1, -1)
    
    last = find_last_occurrence(arr, target)
    return (first, last)

if __name__ == '__main__':
    # Test cases for standard binary search
    print("--- Standard Binary Search (Iterative) ---")
    print(f"[{1, 2, 3, 4, 5}], target 3: {binary_search_iterative([1, 2, 3, 4, 5], 3)} (Expected: 2)")
    print(f"[{1, 2, 3, 4, 5}], target 1: {binary_search_iterative([1, 2, 3, 4, 5], 1)} (Expected: 0)")
    print(f"[{1, 2, 3, 4, 5}], target 5: {binary_search_iterative([1, 2, 3, 4, 5], 5)} (Expected: 4)")
    print(f"[{1, 2, 3, 4, 5}], target 6: {binary_search_iterative([1, 2, 3, 4, 5], 6)} (Expected: -1)")
    print(f"[], target 1: {binary_search_iterative([], 1)} (Expected: -1)")
    print(f"[{5}], target 5: {binary_search_iterative([5], 5)} (Expected: 0)")
    print(f"[{5}], target 1: {binary_search_iterative([5], 1)} (Expected: -1)")

    # Test cases for first occurrence
    print("\n--- Find First Occurrence ---")
    print(f"[{1, 2, 3, 3, 3, 4, 5}], target 3: {find_first_occurrence([1, 2, 3, 3, 3, 4, 5], 3)} (Expected: 2)")
    print(f"[{3, 3, 3, 4, 5}], target 3: {find_first_occurrence([3, 3, 3, 4, 5], 3)} (Expected: 0)")
    print(f"[{1, 2, 3, 4, 5}], target 3: {find_first_occurrence([1, 2, 3, 4, 5], 3)} (Expected: 2)")
    print(f"[{1, 2, 4, 5}], target 3: {find_first_occurrence([1, 2, 4, 5], 3)} (Expected: -1)")
    print(f"[], target 1: {find_first_occurrence([], 1)} (Expected: -1)")
    print(f"[{5}], target 5: {find_first_occurrence([5], 5)} (Expected: 0)")

    # Test cases for last occurrence
    print("\n--- Find Last Occurrence ---")
    print(f"[{1, 2, 3, 3, 3, 4, 5}], target 3: {find_last_occurrence([1, 2, 3, 3, 3, 4, 5], 3)} (Expected: 4)")
    print(f"[{1, 2, 3, 3, 3}], target 3: {find_last_occurrence([1, 2, 3, 3, 3], 3)} (Expected: 4)")
    print(f"[{1, 2, 3, 4, 5}], target 3: {find_last_occurrence([1, 2, 3, 4, 5], 3)} (Expected: 2)")
    print(f"[{1, 2, 4, 5}], target 3: {find_last_occurrence([1, 2, 4, 5], 3)} (Expected: -1)")
    print(f"[], target 1: {find_last_occurrence([], 1)} (Expected: -1)")
    print(f"[{5}], target 5: {find_last_occurrence([5], 5)} (Expected: 0)")

    # Test cases for first and last occurrence
    print("\n--- Find First and Last Occurrence ---")
    print(f"[{1, 2, 3, 3, 3, 4, 5}], target 3: {find_first_and_last_occurrence([1, 2, 3, 3, 3, 4, 5], 3)} (Expected: (2, 4))")
    print(f"[{1, 2, 3, 4, 5}], target 3: {find_first_and_last_occurrence([1, 2, 3, 4, 5], 3)} (Expected: (2, 2))")
    print(f"[{1, 2, 4, 5}], target 3: {find_first_and_last_occurrence([1, 2, 4, 5], 3)} (Expected: (-1, -1))")
    print(f"[], target 1: {find_first_and_last_occurrence([], 1)} (Expected: (-1, -1))")
    print(f"[{5}], target 5: {find_first_and_last_occurrence([5], 5)} (Expected: (0, 0))")
    print(f"[{1, 1, 1, 1, 1}], target 1: {find_first_and_last_occurrence([1, 1, 1, 1, 1], 1)} (Expected: (0, 4))")