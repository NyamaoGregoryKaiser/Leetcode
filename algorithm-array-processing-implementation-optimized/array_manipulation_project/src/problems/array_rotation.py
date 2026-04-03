import collections

def _reverse(arr, start, end):
    """
    Helper function to reverse a portion of an array in-place.
    Used by the reversal algorithm for array rotation.
    """
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1

def rotate_array_brute_force(nums, k):
    """
    Rotates an array to the right by k steps using brute force (iterative shifting).
    This method shifts elements one by one for k times.

    Time Complexity: O(N * k)
        - In the worst case, k can be close to N, leading to O(N^2).
    Space Complexity: O(1)
        - Achieves rotation in-place without additional data structures.

    Args:
        nums (list): The input list of integers.
        k (int): The number of steps to rotate the array to the right.

    Returns:
        None: The rotation is performed in-place.
    """
    if not nums or len(nums) <= 1:
        return

    n = len(nums)
    k = k % n  # Handle cases where k > n

    if k == 0:
        return # No rotation needed

    for _ in range(k):
        last_element = nums[n - 1]
        for i in range(n - 1, 0, -1):
            nums[i] = nums[i - 1]
        nums[0] = last_element

def rotate_array_extra_space(nums, k):
    """
    Rotates an array to the right by k steps using an auxiliary array.
    This method creates a new array to store elements at their correct positions
    and then copies them back to the original array.

    Time Complexity: O(N)
        - One pass to fill the temporary array.
        - One pass to copy back to the original array.
    Space Complexity: O(N)
        - An auxiliary array of size N is used.

    Args:
        nums (list): The input list of integers.
        k (int): The number of steps to rotate the array to the right.

    Returns:
        None: The rotation is performed in-place (by copying from temp).
    """
    if not nums or len(nums) <= 1:
        return

    n = len(nums)
    k = k % n  # Handle cases where k > n

    if k == 0:
        return # No rotation needed

    # Create a temporary array to store rotated elements
    temp_array = [0] * n

    # Place each element at its new position
    for i in range(n):
        new_position = (i + k) % n
        temp_array[new_position] = nums[i]

    # Copy elements back to the original array
    for i in range(n):
        nums[i] = temp_array[i]

def rotate_array_reversal(nums, k):
    """
    Rotates an array to the right by k steps using the reversal algorithm.
    This is an in-place and efficient method.

    The algorithm consists of three steps:
    1. Reverse the entire array.
    2. Reverse the first `k` elements.
    3. Reverse the remaining `N - k` elements.

    Time Complexity: O(N)
        - Three passes over portions of the array, each taking O(N) time.
    Space Complexity: O(1)
        - Achieves rotation in-place without additional data structures.

    Args:
        nums (list): The input list of integers.
        k (int): The number of steps to rotate the array to the right.

    Returns:
        None: The rotation is performed in-place.
    """
    if not nums or len(nums) <= 1:
        return

    n = len(nums)
    k = k % n  # Handle cases where k > n

    if k == 0:
        return # No rotation needed

    # Step 1: Reverse the entire array
    # [1, 2, 3, 4, 5, 6, 7] -> [7, 6, 5, 4, 3, 2, 1]
    _reverse(nums, 0, n - 1)

    # Step 2: Reverse the first k elements
    # [7, 6, 5, 4, 3, 2, 1] (k=3) -> [5, 6, 7, 4, 3, 2, 1]
    _reverse(nums, 0, k - 1)

    # Step 3: Reverse the remaining N-k elements
    # [5, 6, 7, 4, 3, 2, 1] (N-k = 7-3 = 4 elements from index 3) -> [5, 6, 7, 1, 2, 3, 4]
    _reverse(nums, k, n - 1)

# Example usage (for testing/demonstration outside unit tests)
if __name__ == "__main__":
    arr1 = [1, 2, 3, 4, 5, 6, 7]
    k1 = 3
    print(f"Original: {arr1}, k={k1}")
    rotate_array_brute_force(arr1, k1)
    print(f"Brute Force Rotated: {arr1}") # Expected: [5, 6, 7, 1, 2, 3, 4]

    arr2 = [1, 2, 3, 4, 5, 6, 7]
    k2 = 3
    print(f"Original: {arr2}, k={k2}")
    rotate_array_extra_space(arr2, k2)
    print(f"Extra Space Rotated: {arr2}") # Expected: [5, 6, 7, 1, 2, 3, 4]

    arr3 = [1, 2, 3, 4, 5, 6, 7]
    k3 = 3
    print(f"Original: {arr3}, k={k3}")
    rotate_array_reversal(arr3, k3)
    print(f"Reversal Rotated: {arr3}") # Expected: [5, 6, 7, 1, 2, 3, 4]

    arr4 = [1, 2]
    k4 = 3
    print(f"Original: {arr4}, k={k4}")
    rotate_array_reversal(arr4, k4)
    print(f"Reversal Rotated: {arr4}") # Expected: [2, 1]