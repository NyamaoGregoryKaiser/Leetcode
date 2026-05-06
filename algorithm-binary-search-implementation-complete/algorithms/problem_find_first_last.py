"""
Module for solving the "Find First and Last Position of Element in Sorted Array" problem.

Problem Description:
Given an array of integers `nums` sorted in non-decreasing order, find the starting and
ending position of a given `target` value.

If `target` is not found in the array, return `[-1, -1]`.

You must write an algorithm with `O(log n)` runtime complexity.

This file includes:
1. Optimal O(log N) solution using two binary searches (one for first, one for last).
2. Brute-force O(N) solution using linear scan.
"""

from typing import List

def _find_first_occurrence(nums: List[int], target: int) -> int:
    """
    Helper function to find the first occurrence of the target using binary search.
    This is a specialized version of the 'leftmost' binary search template.
    """
    idx = -1
    low, high = 0, len(nums) - 1

    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            idx = mid       # Found a potential first occurrence
            high = mid - 1  # Try to find an even earlier occurrence in the left half
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return idx


def _find_last_occurrence(nums: List[int], target: int) -> int:
    """
    Helper function to find the last occurrence of the target using binary search.
    This is a specialized version of the 'rightmost' binary search template.
    """
    idx = -1
    low, high = 0, len(nums) - 1

    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            idx = mid       # Found a potential last occurrence
            low = mid + 1   # Try to find an even later occurrence in the right half
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return idx


def find_first_last_optimal(nums: List[int], target: int) -> List[int]:
    """
    Finds the starting and ending position of a given target value in a sorted array.
    Uses two separate binary searches: one to find the first occurrence and another
    to find the last occurrence.

    Args:
        nums (List[int]): The sorted list of integers.
        target (int): The integer value to search for.

    Returns:
        List[int]: A list `[start_index, end_index]` representing the range of the
                   target. Returns `[-1, -1]` if the target is not found.

    Time Complexity: O(log N) because it performs two independent binary searches,
                     each taking O(log N) time.
    Space Complexity: O(1) as it uses a constant amount of extra space.
    """
    if not nums:
        return [-1, -1]

    first_occurrence = _find_first_occurrence(nums, target)
    if first_occurrence == -1:
        # If the first occurrence is not found, the target is not in the array at all.
        return [-1, -1]
    
    # Only search for the last occurrence if the first one was found.
    last_occurrence = _find_last_occurrence(nums, target)
    
    return [first_occurrence, last_occurrence]


def find_first_last_brute_force(nums: List[int], target: int) -> List[int]:
    """
    Finds the starting and ending position of a given target value in a sorted array
    using a linear scan. This is the brute-force approach for comparison.

    Args:
        nums (List[int]): The sorted list of integers.
        target (int): The integer value to search for.

    Returns:
        List[int]: A list `[start_index, end_index]` representing the range of the
                   target. Returns `[-1, -1]` if the target is not found.

    Time Complexity: O(N), where N is the number of elements in nums.
                     In the worst case, we might iterate through the entire array
                     twice (once to find the first, once to find the last).
    Space Complexity: O(1) as it uses a constant amount of extra space.
    """
    first_idx = -1
    last_idx = -1

    # Find the first occurrence
    for i in range(len(nums)):
        if nums[i] == target:
            first_idx = i
            break
    
    # If first occurrence not found, target is not in array
    if first_idx == -1:
        return [-1, -1]

    # Find the last occurrence, starting from the potential first occurrence
    # (or from the end for efficiency if we are certain first_idx is valid)
    for i in range(len(nums) - 1, -1, -1):
        if nums[i] == target:
            last_idx = i
            break

    return [first_idx, last_idx]