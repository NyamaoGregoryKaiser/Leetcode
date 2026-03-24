from typing import List, Tuple, Optional

# --- Problem 1: Maximum Subarray Sum (Kadane's Algorithm) ---

def max_subarray_sum_brute_force(nums: List[int]) -> int:
    """
    Calculates the maximum sum of a contiguous subarray using a brute-force approach.
    Iterates through all possible subarrays and calculates their sum.

    Time Complexity: O(n^2), where n is the number of elements in `nums`.
                     Two nested loops iterate through all possible start and end points.
    Space Complexity: O(1)
    """
    if not nums:
        raise ValueError("Input array cannot be empty.")

    max_so_far = float('-inf')

    for i in range(len(nums)):
        current_sum = 0
        for j in range(i, len(nums)):
            current_sum += nums[j]
            max_so_far = max(max_so_far, current_sum)

    return max_so_far

def max_subarray_sum_kadane(nums: List[int]) -> int:
    """
    Calculates the maximum sum of a contiguous subarray using Kadane's Algorithm.
    This algorithm efficiently finds the maximum sum by maintaining the current sum
    and updating the maximum sum found so far. If the current sum becomes negative,
    it's reset to 0 (or the current element if all elements are negative), because
    a negative prefix will never contribute to a larger sum.

    Time Complexity: O(n), where n is the number of elements in `nums`.
                     A single pass through the array.
    Space Complexity: O(1)
    """
    if not nums:
        raise ValueError("Input array cannot be empty.")

    max_current = nums[0]  # Max sum ending at the current position
    max_global = nums[0]   # Overall maximum sum found

    for i in range(1, len(nums)):
        # Decide whether to extend the current subarray or start a new one
        max_current = max(nums[i], max_current + nums[i])
        # Update the overall maximum
        max_global = max(max_global, max_current)

    return max_global

# --- Problem 2: Rotate Array ---

def rotate_array_extra_space(nums: List[int], k: int) -> None:
    """
    Rotates the array to the right by k steps using an auxiliary array.
    The elements are moved to their new positions in a new array,
    then copied back to the original array.

    Args:
        nums (List[int]): The array to be rotated (modified in-place).
        k (int): The number of steps to rotate.

    Time Complexity: O(n), where n is the length of `nums`.
                     One pass to fill the new array, one pass to copy back.
    Space Complexity: O(n) due to the auxiliary array `rotated_arr`.
    """
    if not nums:
        return

    n = len(nums)
    k = k % n  # Handle cases where k is larger than n

    if k == 0: # No rotation needed
        return

    rotated_arr = [0] * n
    for i in range(n):
        rotated_arr[(i + k) % n] = nums[i]

    # Copy elements back to the original array
    for i in range(n):
        nums[i] = rotated_arr[i]

def rotate_array_reverse(nums: List[int], k: int) -> None:
    """
    Rotates the array to the right by k steps using the reverse technique.
    This method performs three reversals:
    1. Reverse the entire array.
    2. Reverse the first `k` elements.
    3. Reverse the remaining `n-k` elements.

    Example for nums = [1,2,3,4,5,6,7], k = 3:
    1. Reverse all: [7,6,5,4,3,2,1]
    2. Reverse first k=3: [5,6,7,4,3,2,1] (elements 0 to k-1)
    3. Reverse remaining n-k=4: [5,6,7,1,2,3,4] (elements k to n-1)

    Args:
        nums (List[int]): The array to be rotated (modified in-place).
        k (int): The number of steps to rotate.

    Time Complexity: O(n), where n is the length of `nums`.
                     Each reversal takes O(n) time, and there are three reversals.
    Space Complexity: O(1) as rotations are done in-place.
    """
    if not nums:
        return

    n = len(nums)
    k = k % n # Handle cases where k is larger than n

    if k == 0: # No rotation needed
        return

    def reverse_sub_array(arr: List[int], start: int, end: int) -> None:
        while start < end:
            arr[start], arr[end] = arr[end], arr[start]
            start += 1
            end -= 1

    # Step 1: Reverse the entire array
    reverse_sub_array(nums, 0, n - 1)
    # Example: [1,2,3,4,5,6,7], k=3 -> [7,6,5,4,3,2,1]

    # Step 2: Reverse the first k elements
    reverse_sub_array(nums, 0, k - 1)
    # Example: [7,6,5,4,3,2,1] -> [5,6,7,4,3,2,1]

    # Step 3: Reverse the remaining n-k elements
    reverse_sub_array(nums, k, n - 1)
    # Example: [5,6,7,4,3,2,1] -> [5,6,7,1,2,3,4]

# --- Problem 3: Product of Array Except Self ---

def product_except_self_brute_force(nums: List[int]) -> List[int]:
    """
    Calculates the product of all elements except self for each element
    using a brute-force approach. For each element, it iterates through
    the rest of the array to calculate the product.

    This solution correctly handles zero(s) but is inefficient.

    Time Complexity: O(n^2), where n is the number of elements in `nums`.
                     Outer loop iterates n times, inner loop n times.
    Space Complexity: O(1) (excluding the output array).
    """
    if not nums:
        return []

    n = len(nums)
    result = [1] * n

    for i in range(n):
        current_product = 1
        for j in range(n):
            if i != j:
                current_product *= nums[j]
        result[i] = current_product
    return result

def product_except_self_optimized(nums: List[int]) -> List[int]:
    """
    Calculates the product of all elements except self for each element
    without using division and in O(n) time.
    It uses two passes:
    1. Calculate prefix products (products of elements to the left).
    2. Calculate suffix products (products of elements to the right) and
       combine them with prefix products.

    Args:
        nums (List[int]): The input array of integers.

    Returns:
        List[int]: An array where `answer[i]` is the product of all elements
                   of `nums` except `nums[i]`.

    Time Complexity: O(n), where n is the number of elements in `nums`.
                     Two passes are made over the array.
    Space Complexity: O(1) (excluding the output array itself).
                      The `result` array is considered the output, not extra space.
    """
    if not nums:
        return []

    n = len(nums)
    result = [1] * n

    # Pass 1: Calculate prefix products
    # result[i] will contain product of all elements to the left of i
    # For index 0, there are no elements to the left, so product is 1 (initialized)
    left_product = 1
    for i in range(n):
        result[i] = left_product
        left_product *= nums[i]
    # After this loop, result looks like: [1, nums[0], nums[0]*nums[1], ...]

    # Pass 2: Calculate suffix products and combine with prefix products
    # `right_product` will contain product of all elements to the right of i
    right_product = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right_product  # Multiply current prefix product by suffix product
        right_product *= nums[i]
    # After this loop, result contains the final desired products

    return result

# --- Problem 4: Merge Overlapping Intervals ---

def merge_intervals(intervals: List[List[int]]) -> List[List[int]]:
    """
    Merges all overlapping intervals in a given list of intervals.
    The intervals are first sorted by their start times. Then, a single pass
    is made to merge overlapping intervals.

    Args:
        intervals (List[List[int]]): A list of intervals, where each interval
                                     is represented as a list [start, end].

    Returns:
        List[List[int]]: A new list of non-overlapping intervals that cover
                         all the intervals in the input.

    Time Complexity: O(n log n) primarily due to sorting, where n is the number of intervals.
                     The merging pass takes O(n) time.
    Space Complexity: O(log n) to O(n) for sorting (depending on the sort algorithm)
                      and O(n) for the output list in the worst case (no overlaps).
    """
    if not intervals:
        return []

    # Step 1: Sort the intervals based on their start times.
    # This is crucial because it allows us to process intervals in order and
    # only consider merging with the previous interval.
    intervals.sort(key=lambda x: x[0])

    merged = []
    for interval in intervals:
        # If the merged list is empty OR
        # if the current interval does not overlap with the previous merged interval:
        # Add the current interval as is.
        # An interval [a, b] does not overlap with [c, d] if b < c or a > d.
        # Since we sorted by start times, we only need to check if interval[0] > merged[-1][1].
        if not merged or interval[0] > merged[-1][1]:
            merged.append(interval)
        else:
            # Otherwise, there is an overlap, so merge the current interval
            # with the previous one. Update the end time of the last merged interval
            # to be the maximum of the current end and the previous end.
            merged[-1][1] = max(merged[-1][1], interval[1])

    return merged

# --- Problem 5: Find Missing Positive ---

def find_missing_positive_optimized(nums: List[int]) -> int:
    """
    Finds the smallest missing positive integer in an unsorted array of integers.
    This solution uses an in-place modification approach (like a hash map)
    to mark the presence of positive numbers without using extra space
    beyond the input array itself.

    The idea is to try and place each number `x` at index `x-1`.
    For example, if we see `3`, we try to put it at `nums[2]`.

    Args:
        nums (List[int]): An unsorted array of integers.

    Returns:
        int: The smallest missing positive integer.

    Time Complexity: O(n), where n is the length of `nums`.
                     The main loop runs at most `n` times, and inner `while` loop
                     performs swaps. Each number is swapped at most once into its
                     correct position. So, total swaps are O(n).
    Space Complexity: O(1) as the modifications are done in-place.
    """
    n = len(nums)

    # Step 1: Place positive numbers in their correct positions.
    # Iterate through the array. For each number `num = nums[i]`:
    # If `num` is positive, within the range [1, n], and not already in its correct place
    # (i.e., `nums[num - 1] != num`), then swap `nums[i]` with `nums[num - 1]`.
    # Continue swapping until `nums[i]` is out of range, negative, or in its correct spot.
    for i in range(n):
        # We need `nums[i] > 0` for it to be a positive number.
        # We need `nums[i] <= n` for it to potentially be an index within the array.
        # We need `nums[i] != nums[nums[i] - 1]` to avoid infinite loops if the number
        # is already in its target position or if the target position contains a duplicate.
        while 1 <= nums[i] <= n and nums[i] != nums[nums[i] - 1]:
            correct_pos = nums[i] - 1
            nums[i], nums[correct_pos] = nums[correct_pos], nums[i]

    # Step 2: Find the first missing positive integer.
    # After placing numbers, iterate through the array again.
    # The first index `i` for which `nums[i]` is not `i + 1` means that `i + 1`
    # is the smallest missing positive integer.
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1

    # If all numbers from 1 to n are present, then the smallest missing positive is n + 1.
    return n + 1

def find_missing_positive_set_based(nums: List[int]) -> int:
    """
    Finds the smallest missing positive integer using a set to store positive numbers.
    This is simpler to implement but uses O(n) space.

    Args:
        nums (List[int]): An unsorted array of integers.

    Returns:
        int: The smallest missing positive integer.

    Time Complexity: O(n) for inserting elements into the set and O(n) for iterating
                     to find the missing number. Total O(n).
    Space Complexity: O(n) in the worst case, as the set might store up to n positive numbers.
    """
    # Store all positive numbers from the array into a set for O(1) average lookup
    present_positives = set()
    for num in nums:
        if num > 0:
            present_positives.add(num)

    # Iterate from 1 upwards and check if each number is in the set
    i = 1
    while True:
        if i not in present_positives:
            return i
        i += 1