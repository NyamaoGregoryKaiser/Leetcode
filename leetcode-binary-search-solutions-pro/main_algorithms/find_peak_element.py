"""
This module contains an optimal binary search solution for finding a peak element
in an array.
"""

from typing import List

def find_peak_element(nums: List[int]) -> int:
    """
    Finds a peak element in an array.

    A peak element is an element that is strictly greater than its neighbors.
    Given an integer array `nums`, where `nums[i] != nums[i+1]` for all valid `i`,
    find a peak element and return its index. If the array contains multiple peaks,
    return the index to any of them.

    You may imagine that `nums[-1] = nums[n] = -infinity`. This assumption simplifies
    boundary conditions, as elements at the ends of the array can be peaks if they
    are greater than their single neighbor.

    Args:
        nums (List[int]): The input array of integers.

    Returns:
        int: The index of any peak element found.

    Approach:
    This problem can be solved using binary search because of the 'strictly greater'
    condition and the implicit -infinity boundaries.
    1.  If `mid` is a peak, we return `mid`.
    2.  If `nums[mid] < nums[mid+1]`, it means we are on the "uphill" slope towards
        a peak on the right side. So, we discard the left half and search in `[mid+1, high]`.
        A peak must exist on the right because `nums[high]` could be a peak (if `high+1` is -infinity),
        or `nums[mid+1]` itself could be on an uphill slope leading to a peak.
    3.  If `nums[mid] > nums[mid+1]`, it means we are on the "downhill" slope towards
        a peak on the left side (or `mid` itself is a peak, handled in step 1), or `mid` *is* a peak.
        We discard the right half and search in `[low, mid]`. A peak must exist on the left because
        `nums[low]` could be a peak (if `low-1` is -infinity), or `nums[mid-1]` could be on an uphill
        slope leading to a peak. We keep `mid` in the search space (`high = mid`) because `mid` could
        be the peak we are looking for.

    The loop invariant is `low < high`. When `low == high`, that index is the peak.

    Time Complexity: O(log N) - The search space is halved in each step.
    Space Complexity: O(1) - Uses a constant amount of extra space.
    """
    low, high = 0, len(nums) - 1

    # Edge case: empty array
    if not nums:
        return -1
    # Edge case: single element array
    if len(nums) == 1:
        return 0

    while low < high:
        mid = low + (high - low) // 2

        # Compare mid with its right neighbor. We don't need to check mid-1
        # because the logic ensures we always move towards a peak.
        if nums[mid] < nums[mid+1]:
            # We are on an ascending slope, a peak must be to the right of mid.
            # Example: [1, 2, 3, 1], mid=1 (value 2). 2 < 3. Peak is to the right.
            low = mid + 1
        else:
            # We are on a descending slope OR at a peak.
            # Example: [1, 3, 2, 1], mid=1 (value 3). 3 > 2. Mid could be the peak.
            # Or [1, 2, 1, 0], mid=1 (value 2). 2 > 1. Mid could be the peak.
            # So, we keep mid in the search space, discarding the right half.
            high = mid
            
    return low # When low == high, we found a peak

if __name__ == '__main__':
    # Test cases
    print("--- Find Peak Element ---")

    # Example from problem description
    arr1 = [1, 2, 3, 1]
    print(f"Array: {arr1}: Peak index {find_peak_element(arr1)} (Expected: 2)") # nums[2]=3

    arr2 = [1, 2, 1, 3, 5, 6, 4]
    # Here, both index 1 (value 2) and index 5 (value 6) are peaks.
    # The algorithm might return either depending on the mid calculation and comparisons.
    # For [1, 2, 1, 3, 5, 6, 4]:
    # low=0, high=6, mid=3 (val 3). nums[3] < nums[4] (3 < 5). low=4.
    # low=4, high=6, mid=5 (val 6). nums[5] > nums[6] (6 > 4). high=5.
    # low=4, high=5, mid=4 (val 5). nums[4] < nums[5] (5 < 6). low=5.
    # low=5, high=5. Loop ends. Returns 5.
    print(f"Array: {arr2}: Peak index {find_peak_element(arr2)} (Expected: 1 or 5)")

    # Edge cases
    arr3 = [1]
    print(f"Array: {arr3}: Peak index {find_peak_element(arr3)} (Expected: 0)")

    arr4 = [1, 2] # 2 is peak
    print(f"Array: {arr4}: Peak index {find_peak_element(arr4)} (Expected: 1)")

    arr5 = [2, 1] # 2 is peak
    print(f"Array: {arr5}: Peak index {find_peak_element(arr5)} (Expected: 0)")

    arr6 = [3, 2, 1] # 3 is peak
    print(f"Array: {arr6}: Peak index {find_peak_element(arr6)} (Expected: 0)")

    arr7 = [1, 2, 3] # 3 is peak
    print(f"Array: {arr7}: Peak index {find_peak_element(arr7)} (Expected: 2)")

    arr8 = [10, 20, 15, 2, 23, 90, 67]
    print(f"Array: {arr8}: Peak index {find_peak_element(arr8)} (Expected: 1 or 5)") # 20 or 90

    arr9 = []
    print(f"Array: {arr9}: Peak index {find_peak_element(arr9)} (Expected: -1)")