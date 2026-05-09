def max_subarray_brute_force(nums: list[int]) -> int:
    """
    Finds the contiguous subarray within an array (containing at least one number)
    which has the largest sum using a brute-force approach.
    It checks every possible subarray.

    Time Complexity: O(n^2), where n is the length of the array.
                     Outer loop iterates n times, inner loop iterates up to n times.
    Space Complexity: O(1), as it uses a few constant extra variables.
    """
    n = len(nums)
    if n == 0:
        # According to problem constraints, array contains at least one number.
        # But handling for robustness.
        raise ValueError("Input array cannot be empty.")
    
    max_so_far = -float('inf') # Initialize with negative infinity to handle all negative numbers

    for i in range(n):
        current_sum = 0
        for j in range(i, n):
            current_sum += nums[j]
            max_so_far = max(max_so_far, current_sum)
            
    return max_so_far

def max_subarray_dp_kadane(nums: list[int]) -> int:
    """
    Finds the contiguous subarray within an array (containing at least one number)
    which has the largest sum using Kadane's Algorithm (Dynamic Programming / Greedy).

    The main idea is to keep track of two values:
    1. `current_max`: The maximum sum of a subarray ending at the current position.
       If `current_max` becomes negative, it means extending the subarray from the
       previous position actually decreases the sum, so we can start a new subarray
       from the current position (making `current_max` equal to `nums[i]`).
    2. `global_max`: The overall maximum sum found so far across all subarrays.

    Time Complexity: O(n), where n is the length of the array.
                     It makes a single pass through the array.
    Space Complexity: O(1), as it uses a few constant extra variables.
    """
    n = len(nums)
    if n == 0:
        raise ValueError("Input array cannot be empty.")
    
    current_max = nums[0]  # Max sum ending at current position
    global_max = nums[0]   # Overall max sum found

    for i in range(1, n):
        # Option 1: Extend the previous subarray by adding nums[i]
        # Option 2: Start a new subarray with nums[i] (if previous sum was negative)
        current_max = max(nums[i], current_max + nums[i])
        
        # Update the overall maximum sum
        global_max = max(global_max, current_max)
        
    return global_max

# Example Usage (demonstrated in main.py)
if __name__ == '__main__':
    test_arrays = [
        [-2, 1, -3, 4, -1, 2, 1, -5, 4], # Expected: 6 (subarray [4, -1, 2, 1])
        [1],                             # Expected: 1
        [5, 4, -1, 7, 8],                # Expected: 23 (subarray [5, 4, -1, 7, 8])
        [-1, -2, -3, -4],                # Expected: -1 (subarray [-1])
        [0],                             # Expected: 0
        [1, -2, 3, -1, 2]                # Expected: 4 (subarray [3, -1, 2])
    ]

    for arr in test_arrays:
        sum_bf = max_subarray_brute_force(arr)
        sum_kadane = max_subarray_dp_kadane(arr)
        print(f"Array: {arr}")
        print(f"  Brute Force Max Sum: {sum_bf}")
        print(f"  Kadane's Max Sum:    {sum_kadane}")
        print("-" * 30)
        assert sum_bf == sum_kadane, f"Mismatch for array {arr}"