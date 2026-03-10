"""
Problem: Find First and Last Position of Element in Sorted Array

Given an array of integers `nums` sorted in non-decreasing order,
find the starting and ending position of a given `target` value.

If `target` is not found in the array, return `[-1, -1]`.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Example 2:
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Example 3:
Input: nums = [], target = 0
Output: [-1,-1]

Constraints:
0 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9
nums is a non-decreasing array.
-10^9 <= target <= 10^9
"""

from typing import List

def find_first_occurrence(nums: List[int], target: int) -> int:
    """
    Helper function to find the first occurrence of the target in a sorted list.
    It returns the index of the first occurrence, or -1 if not found.

    Args:
        nums (List[int]): The sorted list of integers.
        target (int): The integer value to search for.

    Returns:
        int: The index of the first occurrence of the target, or -1.
    """
    idx = -1
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            idx = mid  # Found a potential first occurrence, try to find an earlier one
            right = mid - 1 # Search in the left half
        elif nums[mid] < target:
            left = mid + 1
        else: # nums[mid] > target
            right = mid - 1
    return idx

def find_last_occurrence(nums: List[int], target: int) -> int:
    """
    Helper function to find the last occurrence of the target in a sorted list.
    It returns the index of the last occurrence, or -1 if not found.

    Args:
        nums (List[int]): The sorted list of integers.
        target (int): The integer value to search for.

    Returns:
        int: The index of the last occurrence of the target, or -1.
    """
    idx = -1
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            idx = mid  # Found a potential last occurrence, try to find a later one
            left = mid + 1  # Search in the right half
        elif nums[mid] < target:
            left = mid + 1
        else: # nums[mid] > target
            right = mid - 1
    return idx

def find_first_last_position(nums: List[int], target: int) -> List[int]:
    """
    Finds the starting and ending position of a given target value in a sorted array.

    This function utilizes two separate binary search calls:
    1. One to find the first occurrence of the target.
    2. Another to find the last occurrence of the target.

    Args:
        nums (List[int]): A sorted list of integers.
        target (int): The integer value to search for.

    Returns:
        List[int]: A list containing the starting and ending indices of the target.
                   Returns [-1, -1] if the target is not found.

    Time Complexity: O(log N)
        Both `find_first_occurrence` and `find_last_occurrence` perform a binary search,
        each taking O(log N) time. The overall complexity is dominated by these two searches.

    Space Complexity: O(1)
        The algorithm uses a constant amount of extra space.
    """
    first = find_first_occurrence(nums, target)
    last = find_last_occurrence(nums, target)
    return [first, last]

# Example usage (for testing purposes)
if __name__ == "__main__":
    test_cases = [
        ([5,7,7,8,8,10], 8, [3,4]),
        ([5,7,7,8,8,10], 6, [-1,-1]),
        ([], 0, [-1,-1]),
        ([1], 1, [0,0]),
        ([1,1,1,1,1], 1, [0,4]),
        ([1,2,3,4,5], 3, [2,2]),
        ([1,2,3,4,5], 0, [-1,-1]),
        ([1,2,3,4,5], 6, [-1,-1]),
        ([1,1,2,2,3,3,3,4,4,5], 3, [4,6]),
        ([1,1,2,2,3,3,3,4,4,5], 1, [0,1]),
        ([1,1,2,2,3,3,3,4,4,5], 5, [9,9]),
    ]

    for nums, target, expected in test_cases:
        result = find_first_last_position(nums, target)
        print(f"Array: {nums}, Target: {target}, Expected: {expected}, Got: {result}")
        assert result == expected, f"Failed for nums={nums}, target={target}. Expected {expected}, got {result}"
    print("All test cases passed for find first and last position!")