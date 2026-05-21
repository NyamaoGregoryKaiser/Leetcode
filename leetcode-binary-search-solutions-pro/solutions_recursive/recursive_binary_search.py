"""
This module provides recursive implementations of binary search and finding
first/last occurrences in a sorted array.
"""

from typing import List, Tuple

def binary_search_recursive(arr: List[int], target: int, low: int = 0, high: int = -1) -> int:
    """
    Performs a recursive binary search to find the target element in a sorted array.

    Args:
        arr (List[int]): The sorted list of integers to search within.
        target (int): The integer value to search for.
        low (int): The starting index of the current search segment. Defaults to 0.
        high (int): The ending index of the current search segment. Defaults to len(arr) - 1.
                    Uses -1 as a sentinel to initialize high to len(arr)-1 if not provided.

    Returns:
        int: The index of the target if found, otherwise -1.

    Time Complexity: O(log N) - Each recursive call halves the search space.
    Space Complexity: O(log N) - Due to the recursion call stack depth.
    """
    if high == -1: # Initial call setup
        high = len(arr) - 1
    
    if low > high:
        return -1 # Base case: search space is empty

    mid = low + (high - low) // 2

    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, high) # Search right half
    else: # arr[mid] > target
        return binary_search_recursive(arr, target, low, mid - 1) # Search left half


def find_first_occurrence_recursive(arr: List[int], target: int, low: int = 0, high: int = -1) -> int:
    """
    Recursively finds the first occurrence of the target element in a sorted array.

    Args:
        arr (List[int]): The sorted list of integers.
        target (int): The integer value to search for.
        low (int): The starting index.
        high (int): The ending index.

    Returns:
        int: The index of the first occurrence, or -1 if not found.

    Time Complexity: O(log N)
    Space Complexity: O(log N)
    """
    if high == -1:
        high = len(arr) - 1

    if low > high:
        return -1

    mid = low + (high - low) // 2
    
    if arr[mid] == target:
        # Found a potential first occurrence. Try to find an even earlier one.
        result = find_first_occurrence_recursive(arr, target, low, mid - 1)
        return result if result != -1 else mid # If no earlier found, this is the first
    elif arr[mid] < target:
        return find_first_occurrence_recursive(arr, target, mid + 1, high)
    else: # arr[mid] > target
        return find_first_occurrence_recursive(arr, target, low, mid - 1)


def find_last_occurrence_recursive(arr: List[int], target: int, low: int = 0, high: int = -1) -> int:
    """
    Recursively finds the last occurrence of the target element in a sorted array.

    Args:
        arr (List[int]): The sorted list of integers.
        target (int): The integer value to search for.
        low (int): The starting index.
        high (int): The ending index.

    Returns:
        int: The index of the last occurrence, or -1 if not found.

    Time Complexity: O(log N)
    Space Complexity: O(log N)
    """
    if high == -1:
        high = len(arr) - 1

    if low > high:
        return -1

    mid = low + (high - low) // 2
    
    if arr[mid] == target:
        # Found a potential last occurrence. Try to find an even later one.
        result = find_last_occurrence_recursive(arr, target, mid + 1, high)
        return result if result != -1 else mid # If no later found, this is the last
    elif arr[mid] < target:
        return find_last_occurrence_recursive(arr, target, mid + 1, high)
    else: # arr[mid] > target
        return find_last_occurrence_recursive(arr, target, low, mid - 1)


def find_first_and_last_occurrence_recursive(arr: List[int], target: int) -> Tuple[int, int]:
    """
    Combines recursive first and last occurrence searches.

    Args:
        arr (List[int]): The sorted list of integers.
        target (int): The integer value to search for.

    Returns:
        Tuple[int, int]: A tuple containing the index of the first occurrence and
                         the index of the last occurrence. Returns (-1, -1) if
                         the target is not found.
    Time Complexity: O(log N)
    Space Complexity: O(log N)
    """
    first = find_first_occurrence_recursive(arr, target)
    if first == -1:
        return (-1, -1)
    last = find_last_occurrence_recursive(arr, target)
    return (first, last)


if __name__ == '__main__':
    # Test cases for recursive binary search
    print("--- Recursive Binary Search ---")
    print(f"[{1, 2, 3, 4, 5}], target 3: {binary_search_recursive([1, 2, 3, 4, 5], 3)} (Expected: 2)")
    print(f"[{1, 2, 3, 4, 5}], target 1: {binary_search_recursive([1, 2, 3, 4, 5], 1)} (Expected: 0)")
    print(f"[{1, 2, 3, 4, 5}], target 5: {binary_search_recursive([1, 2, 3, 4, 5], 5)} (Expected: 4)")
    print(f"[{1, 2, 3, 4, 5}], target 6: {binary_search_recursive([1, 2, 3, 4, 5], 6)} (Expected: -1)")
    print(f"[], target 1: {binary_search_recursive([], 1)} (Expected: -1)")
    print(f"[{5}], target 5: {binary_search_recursive([5], 5)} (Expected: 0)")
    print(f"[{5}], target 1: {binary_search_recursive([5], 1)} (Expected: -1)")

    # Test cases for recursive first occurrence
    print("\n--- Recursive Find First Occurrence ---")
    print(f"[{1, 2, 3, 3, 3, 4, 5}], target 3: {find_first_occurrence_recursive([1, 2, 3, 3, 3, 4, 5], 3)} (Expected: 2)")
    print(f"[{3, 3, 3, 4, 5}], target 3: {find_first_occurrence_recursive([3, 3, 3, 4, 5], 3)} (Expected: 0)")
    print(f"[{1, 2, 4, 5}], target 3: {find_first_occurrence_recursive([1, 2, 4, 5], 3)} (Expected: -1)")
    print(f"[{1, 1, 1, 1, 1}], target 1: {find_first_occurrence_recursive([1, 1, 1, 1, 1], 1)} (Expected: 0)")

    # Test cases for recursive last occurrence
    print("\n--- Recursive Find Last Occurrence ---")
    print(f"[{1, 2, 3, 3, 3, 4, 5}], target 3: {find_last_occurrence_recursive([1, 2, 3, 3, 3, 4, 5], 3)} (Expected: 4)")
    print(f"[{1, 2, 3, 3, 3}], target 3: {find_last_occurrence_recursive([1, 2, 3, 3, 3], 3)} (Expected: 4)")
    print(f"[{1, 2, 4, 5}], target 3: {find_last_occurrence_recursive([1, 2, 4, 5], 3)} (Expected: -1)")
    print(f"[{1, 1, 1, 1, 1}], target 1: {find_last_occurrence_recursive([1, 1, 1, 1, 1], 1)} (Expected: 4)")

    # Test cases for recursive first and last occurrence
    print("\n--- Recursive Find First and Last Occurrence ---")
    print(f"[{1, 2, 3, 3, 3, 4, 5}], target 3: {find_first_and_last_occurrence_recursive([1, 2, 3, 3, 3, 4, 5], 3)} (Expected: (2, 4))")
    print(f"[{1, 2, 4, 5}], target 3: {find_first_and_last_occurrence_recursive([1, 2, 4, 5], 3)} (Expected: (-1, -1))")
    print(f"[{1, 1, 1, 1, 1}], target 1: {find_first_and_last_occurrence_recursive([1, 1, 1, 1, 1], 1)} (Expected: (0, 4))")
    print(f"[], target 1: {find_first_and_last_occurrence_recursive([], 1)} (Expected: (-1, -1))")
    print(f"[{5}], target 5: {find_first_and_last_occurrence_recursive([5], 5)} (Expected: (0, 0))")