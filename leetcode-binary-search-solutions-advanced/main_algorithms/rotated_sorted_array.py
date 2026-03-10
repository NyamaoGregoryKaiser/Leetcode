"""
Problem: Search in Rotated Sorted Array

There is an integer array `nums` sorted in ascending order (with distinct values).

Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k`
(0 <= k < nums.length) such that the resulting array is
`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed).
For example, `[0,1,2,4,5,6,7]` might be rotated at pivot index 3 and become `[4,5,6,7,0,1,2]`.

Given the array `nums` after the possible rotation and an integer `target`,
return the index of `target` if it is in `nums`, or -1 if it is not in `nums`.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Example 2:
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

Example 3:
Input: nums = [1], target = 0
Output: -1

Constraints:
1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
All values of nums are unique.
nums is an ascending array that is possibly rotated.
-10^4 <= target <= 10^4
"""

from typing import List

def search_rotated_sorted_array(nums: List[int], target: int) -> int:
    """
    Searches for a target in a rotated sorted array using a modified binary search.

    The key idea is that even though the entire array is rotated, one half of the
    array (either left or right) will always be sorted. We identify which half
    is sorted and then check if the target falls within that sorted range. If it does,
    we search that half. Otherwise, we search the unsorted half (which will eventually
    become sorted as the search space shrinks).

    Args:
        nums (List[int]): The rotated sorted list of integers.
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, otherwise -1.

    Time Complexity: O(log N)
        In each iteration, the search space is halved, similar to a standard binary search.

    Space Complexity: O(1)
        Only a constant amount of extra space is used for `left`, `right`, and `mid` variables.
    """
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid

        # Determine which half is sorted
        # Case 1: Left half is sorted (nums[left] <= nums[mid])
        if nums[left] <= nums[mid]:
            # Check if target is within the sorted left half
            if nums[left] <= target < nums[mid]:
                # If target is in the left sorted half, search there
                right = mid - 1
            else:
                # If target is not in the left sorted half, it must be in the right (unsorted or sorted) half
                left = mid + 1
        # Case 2: Right half is sorted (nums[mid] < nums[right])
        else:
            # Check if target is within the sorted right half
            if nums[mid] < target <= nums[right]:
                # If target is in the right sorted half, search there
                left = mid + 1
            else:
                # If target is not in the right sorted half, it must be in the left (unsorted or sorted) half
                right = mid - 1

    # Target not found
    return -1

# Example usage (for testing purposes)
if __name__ == "__main__":
    test_cases = [
        ([4,5,6,7,0,1,2], 0, 4),
        ([4,5,6,7,0,1,2], 3, -1),
        ([1], 0, -1),
        ([1], 1, 0),
        ([1,3], 3, 1),
        ([3,1], 1, 1),
        ([3,5,1], 3, 0),
        ([5,1,3], 3, 2),
        ([5,1,3], 5, 0),
        ([1,3,5], 1, 0),
        ([1,3,5], 5, 2),
        ([1,3,5], 0, -1),
        ([1,3,5], 6, -1),
        ([4,5,6,7,8,1,2,3], 8, 4),
        ([4,5,6,7,8,1,2,3], 1, 5),
        ([4,5,6,7,8,1,2,3], 3, 7),
    ]

    for nums, target, expected in test_cases:
        result = search_rotated_sorted_array(nums, target)
        print(f"Array: {nums}, Target: {target}, Expected: {expected}, Got: {result}")
        assert result == expected, f"Failed for nums={nums}, target={target}. Expected {expected}, got {result}"
    print("All test cases passed for search in rotated sorted array!")