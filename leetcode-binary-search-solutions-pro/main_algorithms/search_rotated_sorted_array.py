"""
This module implements binary search for finding an element in a sorted array
that has been rotated at some unknown pivot.
"""

from typing import List

def search_rotated_array(nums: List[int], target: int) -> int:
    """
    Searches for a target value in a rotated sorted array.

    A rotated sorted array is formed by taking a sorted array and moving an initial
    part of it to the end. For example, [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2].

    Args:
        nums (List[int]): The rotated sorted array.
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, otherwise -1.

    Approach:
    The key idea is that even after rotation, one half of the array (from `low` to `mid`
    or from `mid` to `high`) will *always* be sorted. We determine which half is sorted
    and then check if the target falls within that sorted range. If it does, we narrow
    our search to that half. Otherwise, we search the other (unsorted/rotated) half.

    Time Complexity: O(log N) - The search space is halved in each step.
    Space Complexity: O(1) - Uses a constant amount of extra space.
    """
    low, high = 0, len(nums) - 1

    while low <= high:
        mid = low + (high - low) // 2

        if nums[mid] == target:
            return mid

        # Determine which half is sorted:
        # Case 1: Left half (from low to mid) is sorted.
        if nums[low] <= nums[mid]:
            # Check if target is in the sorted left half
            if nums[low] <= target < nums[mid]:
                high = mid - 1 # Target is in the left sorted half, search there
            else:
                low = mid + 1  # Target is in the right (unsorted) half, search there
        # Case 2: Right half (from mid to high) is sorted.
        else: # nums[mid] < nums[high]
            # Check if target is in the sorted right half
            if nums[mid] < target <= nums[high]:
                low = mid + 1  # Target is in the right sorted half, search there
            else:
                high = mid - 1 # Target is in the left (unsorted) half, search there
                
    return -1

if __name__ == '__main__':
    # Test cases
    print("--- Search in Rotated Sorted Array ---")

    # Example from problem description
    arr1 = [4, 5, 6, 7, 0, 1, 2]
    print(f"Array: {arr1}, Target 0: {search_rotated_array(arr1, 0)} (Expected: 4)")
    print(f"Array: {arr1}, Target 3: {search_rotated_array(arr1, 3)} (Expected: -1)")
    print(f"Array: {arr1}, Target 4: {search_rotated_array(arr1, 4)} (Expected: 0)")
    print(f"Array: {arr1}, Target 2: {search_rotated_array(arr1, 2)} (Expected: 6)")
    print(f"Array: {arr1}, Target 7: {search_rotated_array(arr1, 7)} (Expected: 3)")


    # No rotation
    arr2 = [1, 2, 3, 4, 5]
    print(f"Array: {arr2}, Target 3: {search_rotated_array(arr2, 3)} (Expected: 2)")
    print(f"Array: {arr2}, Target 1: {search_rotated_array(arr2, 1)} (Expected: 0)")
    print(f"Array: {arr2}, Target 5: {search_rotated_array(arr2, 5)} (Expected: 4)")
    print(f"Array: {arr2}, Target 0: {search_rotated_array(arr2, 0)} (Expected: -1)")

    # Single element
    arr3 = [1]
    print(f"Array: {arr3}, Target 1: {search_rotated_array(arr3, 1)} (Expected: 0)")
    print(f"Array: {arr3}, Target 0: {search_rotated_array(arr3, 0)} (Expected: -1)")

    # Two elements
    arr4 = [3, 1] # Rotated from [1, 3]
    print(f"Array: {arr4}, Target 1: {search_rotated_array(arr4, 1)} (Expected: 1)")
    print(f"Array: {arr4}, Target 3: {search_rotated_array(arr4, 3)} (Expected: 0)")

    # Duplicates (This implementation assumes distinct elements, but it often works with duplicates.
    # For full duplicate support, handling `nums[low] == nums[mid]` might require `low += 1`.)
    arr5 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1]
    print(f"Array: {arr5}, Target 2: {search_rotated_array(arr5, 2)} (Expected: 13)")
    print(f"Array: {arr5}, Target 1: {search_rotated_array(arr5, 1)} (Expected: Any index of 1, depends on `low` vs `high` movement when `nums[mid] == target` - but typically finds one, then moves. This problem is usually posed without duplicates.)")
    print(f"Array: {arr5}, Target 0: {search_rotated_array(arr5, 0)} (Expected: -1)")

    # Empty array
    arr6 = []
    print(f"Array: {arr6}, Target 5: {search_rotated_array(arr6, 5)} (Expected: -1)")