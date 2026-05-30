def two_sum_brute_force(numbers, target):
    """
    Problem 1: Two Sum (Sorted Array) - Brute Force Approach.
    Given an array of integers `numbers` that is already sorted in non-decreasing order,
    find two numbers such that they add up to a specific `target` number.
    Return the *1-indexed* indices of the two numbers.

    This approach checks every possible pair of numbers.

    Args:
        numbers (list): A list of sorted integers.
        target (int): The target sum.

    Returns:
        list: A list containing the 1-indexed indices of the two numbers that sum to target,
              or an empty list if no such pair exists.

    Time Complexity:
        - O(n^2) - Nested loops iterate through all pairs.

    Space Complexity:
        - O(1) - No extra space proportional to the input size is used.
    """
    n = len(numbers)
    for i in range(n):
        for j in range(i + 1, n): # Start j from i+1 to avoid duplicate pairs and self-pairing
            if numbers[i] + numbers[j] == target:
                return [i + 1, j + 1] # Return 1-indexed indices
    return [] # No solution found

def two_sum_hash_map(numbers, target):
    """
    Problem 1: Two Sum (Sorted Array) - Hash Map Approach.
    Leverages a hash map (dictionary in Python) to store numbers seen and their indices.
    For each number, it checks if `target - current_number` is already in the hash map.
    The sorted nature of the array is not strictly required for this approach, but it works.

    Args:
        numbers (list): A list of sorted integers.
        target (int): The target sum.

    Returns:
        list: A list containing the 1-indexed indices of the two numbers that sum to target,
              or an empty list if no such pair exists.

    Time Complexity:
        - O(n) - Each number is iterated through once, and dictionary lookups/insertions
                 are O(1) on average.

    Space Complexity:
        - O(n) - In the worst case, all numbers are stored in the hash map.
    """
    num_map = {} # Stores {number: index}
    for i, num in enumerate(numbers):
        complement = target - num
        if complement in num_map:
            # Found the complement. num_map[complement] is 0-indexed.
            # i is the current 0-indexed index.
            # We must ensure the smaller index comes first for consistency.
            idx1 = num_map[complement] + 1
            idx2 = i + 1
            return sorted([idx1, idx2])
        num_map[num] = i # Store current number and its index
    return [] # No solution found

def two_sum_two_pointers(numbers, target):
    """
    Problem 1: Two Sum (Sorted Array) - Two Pointers Approach (Optimal for Sorted Array).
    This approach takes advantage of the array being sorted. It uses two pointers,
    one starting at the beginning (`left`) and one at the end (`right`).
    It sums the elements at these pointers and adjusts them based on whether the sum
    is too low, too high, or just right.

    Args:
        numbers (list): A list of sorted integers.
        target (int): The target sum.

    Returns:
        list: A list containing the 1-indexed indices of the two numbers that sum to target,
              or an empty list if no such pair exists.

    Time Complexity:
        - O(n) - The pointers move inwards, effectively traversing the array once.

    Space Complexity:
        - O(1) - No extra space proportional to the input size is used.
    """
    left = 0
    right = len(numbers) - 1

    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1] # Return 1-indexed indices
        elif current_sum < target:
            left += 1 # Sum is too small, need a larger number from the left
        else: # current_sum > target
            right -= 1 # Sum is too large, need a smaller number from the right
    return [] # No solution found
```