"""
Problem: Standard Binary Search

Given a sorted array of integers `nums` and an integer `target`,
return the index of `target` if it is found in the array, otherwise return -1.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1

Constraints:
1 <= nums.length <= 10^4
-10^4 < nums[i], target < 10^4
All the integers in nums are unique.
nums is sorted in ascending order.
"""

from typing import List

def binary_search_iterative(nums: List[int], target: int) -> int:
    """
    Performs an iterative binary search to find the target in a sorted list.

    The algorithm works by repeatedly dividing the search interval in half.
    If the value of the search key is less than the item in the middle of the interval,
    narrow the interval to the lower half. Otherwise, narrow it to the upper half.
    Repeatedly check until the value is found or the interval is empty.

    Args:
        nums (List[int]): A sorted list of integers in ascending order.
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, otherwise -1.

    Time Complexity: O(log N)
        In each step, the search space is halved. For an array of size N,
        it takes approximately log2(N) steps to find the element or determine
        it's not present.

    Space Complexity: O(1)
        The algorithm uses a constant amount of extra space for variables
        like `left`, `right`, and `mid`, regardless of the input array size.
    """
    left, right = 0, len(nums) - 1

    while left <= right:
        # Calculate the middle index.
        # Using (left + right) // 2 can lead to integer overflow if left and right are very large.
        # A safer way is left + (right - left) // 2.
        mid = left + (right - left) // 2

        if nums[mid] == target:
            # Target found at mid index.
            return mid
        elif nums[mid] < target:
            # Target is in the right half (mid to right).
            # We move 'left' to 'mid + 1' to exclude 'mid' as it's too small.
            left = mid + 1
        else: # nums[mid] > target
            # Target is in the left half (left to mid).
            # We move 'right' to 'mid - 1' to exclude 'mid' as it's too large.
            right = mid - 1

    # If the loop finishes, it means the target was not found in the array.
    return -1

# Example usage (for testing purposes, not part of the core function)
if __name__ == "__main__":
    test_cases = [
        ([-1,0,3,5,9,12], 9, 4),
        ([-1,0,3,5,9,12], 2, -1),
        ([5], 5, 0),
        ([1, 2, 3, 4, 5], 1, 0),
        ([1, 2, 3, 4, 5], 5, 4),
        ([], 7, -1),
        ([1, 3, 5, 7, 9], 0, -1), # Target smaller than smallest
        ([1, 3, 5, 7, 9], 10, -1), # Target larger than largest
    ]

    for nums, target, expected in test_cases:
        result = binary_search_iterative(nums, target)
        print(f"Array: {nums}, Target: {target}, Expected: {expected}, Got: {result}")
        assert result == expected, f"Failed for nums={nums}, target={target}. Expected {expected}, got {result}"
    print("All test cases passed for iterative binary search!")