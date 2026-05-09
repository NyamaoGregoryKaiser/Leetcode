import math

def rotate_array_brute_force(nums: list[int], k: int) -> None:
    """
    Rotates an array to the right by k steps using a brute-force approach.
    Repeatedly shift the last element to the front k times.

    Time Complexity: O(k * n), where n is the length of the array.
                     In the worst case (k is close to n), this is O(n^2).
    Space Complexity: O(1), as it modifies the array in-place.
    """
    n = len(nums)
    if n == 0:
        return

    k %= n  # Handle cases where k is greater than n
    if k == 0:
        return

    for _ in range(k):
        last_element = nums[n - 1]
        for i in range(n - 1, 0, -1):
            nums[i] = nums[i - 1]
        nums[0] = last_element

def rotate_array_extra_space(nums: list[int], k: int) -> None:
    """
    Rotates an array to the right by k steps using an auxiliary array.
    This method creates a new array and places elements at their new positions,
    then copies them back to the original array.

    Time Complexity: O(n), where n is the length of the array.
                     Two passes: one to copy to temp, one to copy back.
    Space Complexity: O(n), for the temporary array.
    """
    n = len(nums)
    if n == 0:
        return

    k %= n  # Handle cases where k is greater than n
    if k == 0:
        return

    temp = [0] * n
    for i in range(n):
        new_index = (i + k) % n
        temp[new_index] = nums[i]

    for i in range(n):
        nums[i] = temp[i]

def rotate_array_reverse(nums: list[int], k: int) -> None:
    """
    Rotates an array to the right by k steps using the reverse method.
    This is an optimal in-place solution.
    The idea is:
    1. Reverse the entire array.
    2. Reverse the first k elements.
    3. Reverse the remaining n-k elements.

    Example: nums = [1, 2, 3, 4, 5, 6, 7], k = 3
    1. Reverse all: [7, 6, 5, 4, 3, 2, 1]
    2. Reverse first k (first 3): [5, 6, 7, 4, 3, 2, 1]
    3. Reverse remaining n-k (last 4): [5, 6, 7, 1, 2, 3, 4] (Result)

    Time Complexity: O(n), as each element is reversed a constant number of times.
                     Three passes over parts of the array.
    Space Complexity: O(1), as it modifies the array in-place.
    """
    n = len(nums)
    if n == 0:
        return

    k %= n  # Handle cases where k is greater than n
    if k == 0:
        return

    # Helper function to reverse a sub-array
    def _reverse(arr, start, end):
        while start < end:
            arr[start], arr[end] = arr[end], arr[start]
            start += 1
            end -= 1

    _reverse(nums, 0, n - 1)      # Reverse the entire array
    _reverse(nums, 0, k - 1)      # Reverse the first k elements
    _reverse(nums, k, n - 1)      # Reverse the remaining n-k elements

def rotate_array_cyclic_replacements(nums: list[int], k: int) -> None:
    """
    Rotates an array to the right by k steps using cyclic replacements.
    This method places each element in its correct position. If the element
    at the target position has already been moved, it continues the cycle
    from that element. It handles multiple cycles.

    Time Complexity: O(n), as each element is visited and moved exactly once.
                     In the worst case, it might visit some elements multiple times
                     to complete cycles, but overall each element is part of exactly
                     one cycle and is moved once.
    Space Complexity: O(1), as it modifies the array in-place.
    """
    n = len(nums)
    if n == 0:
        return

    k %= n  # Handle cases where k is greater than n
    if k == 0:
        return

    count = 0  # Number of elements placed in their correct positions
    start = 0  # Starting point for a new cycle

    while count < n:
        current_index = start
        current_element = nums[start]

        while True:
            next_index = (current_index + k) % n
            # Store the element at next_index before overwriting
            # This element will be moved to a later position in the cycle
            temp_value = nums[next_index]
            nums[next_index] = current_element # Place current_element in its final position

            current_element = temp_value
            current_index = next_index
            count += 1

            # If we completed a cycle (returned to the starting point)
            if current_index == start:
                break
        
        start += 1 # Move to the next element to start a new cycle if needed (e.g., if n and k are not coprime)

# Example Usage (demonstrated in main.py)
if __name__ == '__main__':
    arr1 = [1, 2, 3, 4, 5, 6, 7]
    k1 = 3
    print(f"Original: {arr1}, k={k1}")
    rotate_array_reverse(arr1, k1)
    print(f"Rotated by reverse: {arr1}") # Expected: [5, 6, 7, 1, 2, 3, 4]

    arr2 = [1, 2, 3, 4, 5, 6, 7]
    k2 = 3
    print(f"Original: {arr2}, k={k2}")
    rotate_array_cyclic_replacements(arr2, k2)
    print(f"Rotated by cyclic replacements: {arr2}") # Expected: [5, 6, 7, 1, 2, 3, 4]

    arr3 = [-1, -100, 3, 99]
    k3 = 2
    print(f"Original: {arr3}, k={k3}")
    rotate_array_extra_space(arr3, k3)
    print(f"Rotated by extra space: {arr3}") # Expected: [3, 99, -1, -100]

    arr4 = [1, 2]
    k4 = 3
    print(f"Original: {arr4}, k={k4}")
    rotate_array_brute_force(arr4, k4)
    print(f"Rotated by brute force: {arr4}") # Expected: [2, 1]