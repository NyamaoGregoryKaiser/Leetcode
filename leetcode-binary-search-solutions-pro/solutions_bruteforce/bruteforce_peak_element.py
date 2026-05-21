"""
This module provides a brute-force (linear scan) solution for finding a peak element
in an array, primarily for comparison with the binary search implementation.
"""

from typing import List

def bruteforce_find_peak_element(nums: List[int]) -> int:
    """
    Finds a peak element in an array using a linear scan.

    A peak element is an element that is strictly greater than its neighbors.
    You may imagine that `nums[-1] = nums[n] = -infinity`.

    Args:
        nums (List[int]): The input array of integers.

    Returns:
        int: The index of any peak element found. Returns -1 if no peak is found
             (which shouldn't happen for a non-empty array based on problem constraints
             and infinite boundaries).

    Time Complexity: O(N) - Iterates through all elements in the worst case.
    Space Complexity: O(1) - Uses a constant amount of extra space.
    """
    n = len(nums)
    if n == 0:
        return -1
    if n == 1:
        return 0

    for i in range(n):
        # Check left neighbor: Imagine nums[-1] = -infinity
        is_greater_than_left = (i == 0) or (nums[i] > nums[i-1])
        
        # Check right neighbor: Imagine nums[n] = -infinity
        is_greater_than_right = (i == n - 1) or (nums[i] > nums[i+1])

        if is_greater_than_left and is_greater_than_right:
            return i
            
    return -1 # Should not be reached for valid inputs given problem constraints

if __name__ == '__main__':
    # Test cases
    print("--- Brute-force Find Peak Element ---")

    arr1 = [1, 2, 3, 1]
    print(f"Array: {arr1}: Peak index {bruteforce_find_peak_element(arr1)} (Expected: 2)")

    arr2 = [1, 2, 1, 3, 5, 6, 4]
    print(f"Array: {arr2}: Peak index {bruteforce_find_peak_element(arr2)} (Expected: 1 or 5)")

    arr3 = [1]
    print(f"Array: {arr3}: Peak index {bruteforce_find_peak_element(arr3)} (Expected: 0)")

    arr4 = [1, 2]
    print(f"Array: {arr4}: Peak index {bruteforce_find_peak_element(arr4)} (Expected: 1)")

    arr5 = [2, 1]
    print(f"Array: {arr5}: Peak index {bruteforce_find_peak_element(arr5)} (Expected: 0)")

    arr6 = []
    print(f"Array: {arr6}: Peak index {bruteforce_find_peak_element(arr6)} (Expected: -1)")

    arr7 = [10, 20, 15, 2, 23, 90, 67]
    print(f"Array: {arr7}: Peak index {bruteforce_find_peak_element(arr7)} (Expected: 1 or 5)")