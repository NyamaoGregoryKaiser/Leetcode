# Problem: Kth Largest Element in an Array (Brute Force / Less Optimized)

# This file contains a less optimized, brute-force approach to find the k-th largest element.
# It primarily serves as a comparison to the more efficient methods in `sorting_problems/k_largest_element.py`.

# --- Approach 1: Full Bubble Sort and Pick ---
# Time Complexity: O(N^2) due to Bubble Sort.
# Space Complexity: O(1) if sorting in-place.

def find_kth_largest_bubble_sort(nums: list[int], k: int) -> int:
    """
    Finds the k-th largest element by performing a full Bubble Sort and then picking the element.
    This is a brute-force approach due to the O(N^2) sorting time.

    Args:
        nums (list[int]): The input array of integers. Modified in-place by sorting.
        k (int): The rank of the largest element to find (1-indexed).

    Returns:
        int: The k-th largest element.

    Raises:
        ValueError: If k is out of bounds or nums is empty.
    """
    n = len(nums)
    if not nums or not (1 <= k <= n):
        raise ValueError("Invalid k or empty array.")

    # Perform Bubble Sort
    # Outer loop for passes
    for i in range(n - 1):
        # Inner loop for comparisons and swaps
        for j in range(0, n - i - 1):
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j] # Swap if elements are in wrong order

    # After sorting in ascending order, the k-th largest element is at index (N - k)
    return nums[n - k]


# --- Approach 2: Selection Sort idea (repeatedly find and remove max k times) ---
# Time Complexity: O(N * K) in the worst case, as finding max takes O(N) and we do it K times.
#                  If K is close to N, it becomes O(N^2).
# Space Complexity: O(K) for `found_elements` if we don't modify original, or O(1) if modifying in-place.
#                   (The solution below uses a copy and `remove`, which is O(N) for removal, so it's O(N*K)).

def find_kth_largest_selection_removal(nums: list[int], k: int) -> int:
    """
    Finds the k-th largest element by repeatedly finding the maximum element
    and removing it, k times.

    This is another brute-force approach, simulating k passes of Selection Sort
    to find the largest elements.

    Args:
        nums (list[int]): The input array of integers. A copy is made.
        k (int): The rank of the largest element to find (1-indexed).

    Returns:
        int: The k-th largest element.

    Raises:
        ValueError: If k is out of bounds or nums is empty.
    """
    n = len(nums)
    if not nums or not (1 <= k <= n):
        raise ValueError("Invalid k or empty array.")

    temp_nums = list(nums) # Create a copy to modify without affecting original
    
    # Repeat k times to find the k largest elements
    for _ in range(k):
        max_val = -float('inf') # Initialize with smallest possible value
        max_idx = -1
        
        # Find the maximum element in the current `temp_nums`
        for i in range(len(temp_nums)):
            if temp_nums[i] > max_val:
                max_val = temp_nums[i]
                max_idx = i
        
        # If this is the k-th iteration, this `max_val` is our answer
        if _ == k - 1:
            return max_val
        
        # Remove the found maximum element for the next iteration
        temp_nums.pop(max_idx)

    # This line should technically not be reached if k is valid.
    raise RuntimeError("Should not happen with valid k.")