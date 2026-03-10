"""
Brute Force Solution: Linear Search

This file provides a simple linear search implementation for comparison with binary search.
It iterates through the array sequentially to find the target.

Constraints are the same as `main_algorithms/simple_binary_search.py`.
"""

from typing import List

def linear_search(nums: List[int], target: int) -> int:
    """
    Performs a linear search to find the target in a list.
    This is a brute-force approach, iterating through each element.

    Args:
        nums (List[int]): A list of integers (can be sorted or unsorted, but
                          for comparison with binary search, assume sorted).
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, otherwise -1.

    Time Complexity: O(N)
        In the worst case (target at the end or not present), the algorithm
        has to check every element in the list.

    Space Complexity: O(1)
        The algorithm uses a constant amount of extra space.
    """
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1

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
        result = linear_search(nums, target)
        print(f"Array: {nums}, Target: {target}, Expected: {expected}, Got: {result}")
        assert result == expected, f"Failed for nums={nums}, target={target}. Expected {expected}, got {result}"
    print("All test cases passed for linear search!")