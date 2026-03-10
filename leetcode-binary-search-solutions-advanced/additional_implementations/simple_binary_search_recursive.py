"""
Problem: Standard Binary Search (Recursive Version)

This file provides a recursive implementation of the standard binary search algorithm.
It's functionally equivalent to the iterative version but uses recursion instead of a loop.

Constraints are the same as `main_algorithms/simple_binary_search.py`.
"""

from typing import List

def _binary_search_recursive_helper(nums: List[int], target: int, left: int, right: int) -> int:
    """
    Helper function for recursive binary search.
    """
    if left > right:
        return -1 # Base case: search space is empty, target not found

    mid = left + (right - left) // 2

    if nums[mid] == target:
        return mid # Target found
    elif nums[mid] < target:
        # Target is in the right half
        return _binary_search_recursive_helper(nums, target, mid + 1, right)
    else: # nums[mid] > target
        # Target is in the left half
        return _binary_search_recursive_helper(nums, target, left, mid - 1)

def binary_search_recursive(nums: List[int], target: int) -> int:
    """
    Performs a recursive binary search to find the target in a sorted list.

    Args:
        nums (List[int]): A sorted list of integers in ascending order.
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, otherwise -1.

    Time Complexity: O(log N)
        Similar to the iterative version, the search space is halved in each recursive call.
        The number of calls is logarithmic with respect to N.

    Space Complexity: O(log N)
        Due to the recursive calls, the function call stack will grow up to O(log N) depth
        in the worst case. This is the auxiliary space used.
    """
    if not nums:
        return -1
    return _binary_search_recursive_helper(nums, target, 0, len(nums) - 1)

# Example usage (for testing purposes)
if __name__ == "__main__":
    test_cases = [
        ([-1,0,3,5,9,12], 9, 4),
        ([-1,0,3,5,9,12], 2, -1),
        ([5], 5, 0),
        ([1, 2, 3, 4, 5], 1, 0),
        ([1, 2, 3, 4, 5], 5, 4),
        ([], 7, -1),
        ([1, 3, 5, 7, 9], 0, -1),
        ([1, 3, 5, 7, 9], 10, -1),
    ]

    for nums, target, expected in test_cases:
        result = binary_search_recursive(nums, target)
        print(f"Array: {nums}, Target: {target}, Expected: {expected}, Got: {result}")
        assert result == expected, f"Failed for nums={nums}, target={target}. Expected {expected}, got {result}"
    print("All test cases passed for recursive binary search!")