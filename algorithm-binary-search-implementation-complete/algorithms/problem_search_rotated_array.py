"""
Module for solving the "Search in Rotated Sorted Array" problem.

Problem Description:
There is an integer array `nums` sorted in ascending order (with distinct values).
Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k`
(0 <= k < nums.length) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], ..., nums[k-1]]`.
For example, `[0,1,2,4,5,6,7]` might be rotated at pivot index 3 and become `[4,5,6,7,0,1,2]`.

Given the array `nums` after the possible rotation and an integer `target`,
return the index of `target` if it is in `nums`, or -1 if it is not in `nums`.

You must write an algorithm with `O(log n)` runtime complexity.

This file includes:
1. Optimal O(log N) solution using modified binary search.
2. Brute-force O(N) solution using linear scan.

"""

from typing import List


def search_rotated_array_optimal(nums: List[int], target: int) -> int:
    """
    Searches for a target in a rotated sorted array using a modified binary search.

    The key idea is that one half of the array (from `low` to `mid` or from `mid` to `high`)
    will *always* be sorted. We identify the sorted half and check if the target
    falls within its range. If it does, we narrow our search to that sorted half.
    Otherwise, the target must be in the unsorted half.

    Args:
        nums (List[int]): The rotated sorted array of integers.
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, -1 otherwise.

    Time Complexity: O(log N), where N is the number of elements in nums.
                     The search space is halved in each iteration.
    Space Complexity: O(1) as it uses a constant amount of extra space.
    """
    if not nums:
        return -1

    low, high = 0, len(nums) - 1

    while low <= high:
        mid = low + (high - low) // 2

        if nums[mid] == target:
            return mid

        # Determine which half is sorted
        if nums[low] <= nums[mid]:
            # The left half (from low to mid) is sorted
            # Check if target is in this sorted left half
            if nums[low] <= target < nums[mid]:
                high = mid - 1  # Target is in the left sorted half
            else:
                low = mid + 1   # Target is in the right unsorted half
        else:
            # The right half (from mid to high) is sorted
            # Check if target is in this sorted right half
            if nums[mid] < target <= nums[high]:
                low = mid + 1   # Target is in the right sorted half
            else:
                high = mid - 1  # Target is in the left unsorted half

    return -1  # Target not found


def search_rotated_array_brute_force(nums: List[int], target: int) -> int:
    """
    Searches for a target in a rotated sorted array using a linear scan.
    This is the brute-force approach for comparison.

    Args:
        nums (List[int]): The rotated sorted array of integers.
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, -1 otherwise.

    Time Complexity: O(N), where N is the number of elements in nums.
                     In the worst case, we might have to check every element.
    Space Complexity: O(1) as it uses a constant amount of extra space.
    """
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1