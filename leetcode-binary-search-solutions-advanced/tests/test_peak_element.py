import pytest
from main_algorithms.peak_element import find_peak_element

# Helper function to verify if an index is a valid peak
def is_valid_peak(nums, index):
    n = len(nums)
    if not (0 <= index < n):
        return False

    left_val = nums[index-1] if index > 0 else float('-inf')
    right_val = nums[index+1] if index < n - 1 else float('-inf')

    return nums[index] > left_val and nums[index] > right_val

@pytest.mark.parametrize("nums", [
    ([1,2,3,1]), # Peak at 2 (value 3)
    ([1,2,1,3,5,6,4]), # Peaks at 1 (value 2) or 5 (value 6)
    ([1,2]), # Peak at 1 (value 2)
    ([2,1]), # Peak at 0 (value 2)
    ([1]),   # Single element, peak at 0
    ([1,2,3,4,5]), # Peak at 4 (value 5)
    ([5,4,3,2,1]), # Peak at 0 (value 5)
    ([3,4,3,2,1]), # Peak at 1 (value 4)
    ([1,6,5,4,3,2,1]), # Peak at 1 (value 6)
    ([10, 20, 15, 2, 23, 90, 67]), # Peaks at 1 (20) or 5 (90)
    ([1, 2, 3, 4, 3, 2, 1]), # Peak at 3 (4)
    ([1, 10, 2, 9, 3, 8]), # Peaks at 1 (10) or 3 (9) or 5 (8)
])
def test_find_peak_element(nums):
    """
    Test cases for finding a peak element.
    Since any peak is acceptable, we just verify that the returned index is indeed a peak.
    """
    result_idx = find_peak_element(nums)
    assert is_valid_peak(nums, result_idx), \
        f"Failed for nums={nums}. Returned index {result_idx} (value {nums[result_idx]}) is not a valid peak."