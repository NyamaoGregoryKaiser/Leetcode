"""
This module provides a brute-force (linear scan) solution for searching in a rotated
sorted array, primarily for comparison with the binary search implementation.
"""

from typing import List

def bruteforce_search_rotated_array(nums: List[int], target: int) -> int:
    """
    Searches for a target value in a rotated sorted array using a linear scan.

    Args:
        nums (List[int]): The rotated sorted array.
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, otherwise -1.

    Time Complexity: O(N) - In the worst case, it iterates through all elements.
    Space Complexity: O(1) - Uses a constant amount of extra space.
    """
    for i, num in enumerate(nums):
        if num == target:
            return i
    return -1

if __name__ == '__main__':
    # Example usage for comparison
    arr1 = [4, 5, 6, 7, 0, 1, 2]
    print(f"Array: {arr1}, Target 0: {bruteforce_search_rotated_array(arr1, 0)} (Expected: 4)")
    print(f"Array: {arr1}, Target 3: {bruteforce_search_rotated_array(arr1, 3)} (Expected: -1)")

    arr2 = [1, 2, 3, 4, 5] # No rotation
    print(f"Array: {arr2}, Target 3: {bruteforce_search_rotated_array(arr2, 3)} (Expected: 2)")

    arr3 = [1] # Single element
    print(f"Array: {arr3}, Target 1: {bruteforce_search_rotated_array(arr3, 1)} (Expected: 0)")

    arr4 = [] # Empty array
    print(f"Array: {arr4}, Target 5: {bruteforce_search_rotated_array(arr4, 5)} (Expected: -1)")