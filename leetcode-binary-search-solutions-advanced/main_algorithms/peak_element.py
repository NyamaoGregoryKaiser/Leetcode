"""
Problem: Find Peak Element

A peak element is an element that is strictly greater than its neighbors.

Given a 0-indexed integer array `nums`, find a peak element, and return its index.
If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that `nums[-1] = nums[n] = -∞`.
This means that an element at index 0 is a peak if `nums[0] > nums[1]` (if `n > 1`),
and an element at index `n-1` is a peak if `nums[n-1] > nums[n-2]` (if `n > 1`).
For a single-element array, the only element is a peak.

You must write an algorithm that runs in O(log n) time.

Example 1:
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.

Example 2:
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2,
             or index number 5 where the peak element is 6.

Constraints:
1 <= nums.length <= 1000
-10^9 <= nums[i] <= 10^9
nums[i] != nums[i+1] for all valid i.
"""

from typing import List

def find_peak_element(nums: List[int]) -> int:
    """
    Finds a peak element in an array using binary search.

    The problem guarantees that `nums[i] != nums[i+1]`, meaning there are no plateaus.
    Also, `nums[-1] = nums[n] = -∞`, which simplifies boundary conditions:
    - If `nums[mid] > nums[mid+1]`, it means we are on a descending slope or at a peak.
      The peak must be at `mid` or to its left. So, we search `[left, mid]`.
    - If `nums[mid] < nums[mid+1]`, it means we are on an ascending slope.
      The peak must be to the right of `mid`. So, we search `[mid+1, right]`.

    Since we are guaranteed that a peak always exists (because of the -∞ boundaries),
    this binary search will always converge to a peak.

    Args:
        nums (List[int]): A list of integers where `nums[i] != nums[i+1]`.

    Returns:
        int: The index of any peak element.

    Time Complexity: O(log N)
        The search space is halved in each iteration.

    Space Complexity: O(1)
        Only a constant amount of extra space is used for `left`, `right`, and `mid` variables.
    """
    left, right = 0, len(nums) - 1

    while left < right: # Loop until left and right pointers meet
        mid = left + (right - left) // 2

        # Compare mid with its right neighbor
        # Note: we only need to compare with one neighbor due to the problem constraints
        # and the nature of finding *any* peak.
        if nums[mid] > nums[mid + 1]:
            # We are on a descending slope, or 'mid' is a peak.
            # The peak must be at 'mid' or to its left.
            # So, we potentially update our candidate peak and search the left half.
            right = mid
        else: # nums[mid] < nums[mid + 1]
            # We are on an ascending slope.
            # The peak must be to the right of 'mid'.
            # So, we move to the right half, excluding 'mid' as it cannot be a peak itself.
            left = mid + 1

    # When left == right, we have converged to a single element, which must be a peak.
    return left

# Example usage (for testing purposes)
if __name__ == "__main__":
    test_cases = [
        ([1,2,3,1], 2), # Expected 2 (value 3)
        ([1,2,1,3,5,6,4], 5), # Expected 5 (value 6), but 1 (value 2) is also a peak
        ([1,2], 1), # Expected 1 (value 2)
        ([2,1], 0), # Expected 0 (value 2)
        ([1], 0),   # Single element
        ([1,2,3,4,5], 4), # Peak at end
        ([5,4,3,2,1], 0), # Peak at start
        ([3,4,3,2,1], 1), # Peak in middle
        ([1,6,5,4,3,2,1], 1) # Another middle peak
    ]

    for nums, _ in test_cases: # _ is ignored because any valid peak index is fine
        result_idx = find_peak_element(nums)
        # Verify the result: nums[result_idx] must be greater than its neighbors
        is_peak = True
        if result_idx > 0 and nums[result_idx] < nums[result_idx - 1]:
            is_peak = False
        if result_idx < len(nums) - 1 and nums[result_idx] < nums[result_idx + 1]:
            is_peak = False

        print(f"Array: {nums}, Found Peak Index: {result_idx}, Peak Value: {nums[result_idx]}, Is Valid Peak: {is_peak}")
        assert is_peak, f"Failed for nums={nums}. Index {result_idx} (value {nums[result_idx]}) is not a valid peak."
    print("All test cases passed for find peak element!")