def sort_colors_two_pass_counting(nums):
    """
    Problem 4: Sort Colors (Dutch National Flag Problem) - Two-Pass Counting Sort.
    Given an array with n objects colored red, white, or blue (0, 1, or 2),
    sort them in-place.

    This approach uses counting sort logic. It counts the occurrences of each color
    and then overwrites the array based on these counts. This is not strictly
    in-place as it requires a pass to count and a pass to rewrite.

    Args:
        nums (list): The list of integers (0, 1, or 2) to be sorted.

    Time Complexity:
        - O(n) - Two passes over the array: one for counting, one for overwriting.

    Space Complexity:
        - O(1) - Uses a fixed amount of extra space (3 counters), independent of n.
    """
    if not nums:
        return

    counts = [0, 0, 0] # counts[0] for 0s, counts[1] for 1s, counts[2] for 2s

    # First pass: Count occurrences of each color
    for num in nums:
        counts[num] += 1

    # Second pass: Overwrite the original array based on counts
    index = 0
    # Place all 0s
    for _ in range(counts[0]):
        nums[index] = 0
        index += 1
    # Place all 1s
    for _ in range(counts[1]):
        nums[index] = 1
        index += 1
    # Place all 2s
    for _ in range(counts[2]):
        nums[index] = 2
        index += 1

    # The function modifies the array in-place.

def sort_colors_one_pass_three_pointers(nums):
    """
    Problem 4: Sort Colors (Dutch National Flag Problem) - One-Pass Three-Pointers (Optimal).
    This is the classic Dutch National Flag algorithm. It uses three pointers:
    - `low`: Points to the boundary between 0s and 1s. Elements before `low` are all 0s.
    - `mid`: The current element being considered.
    - `high`: Points to the boundary between 1s and 2s. Elements after `high` are all 2s.

    The algorithm iterates while `mid` is less than or equal to `high`.
    - If `nums[mid]` is 0, swap it with `nums[low]`, then increment `low` and `mid`.
    - If `nums[mid]` is 1, just increment `mid`.
    - If `nums[mid]` is 2, swap it with `nums[high]`, then decrement `high`.
      Note: `mid` is NOT incremented here because the swapped element from `high`
      needs to be re-evaluated (it could be 0, 1, or 2).

    Args:
        nums (list): The list of integers (0, 1, or 2) to be sorted.

    Time Complexity:
        - O(n) - Single pass over the array. Each element is visited at most twice (once by `mid`,
                 and potentially once if swapped with `low` or `high`).

    Space Complexity:
        - O(1) - All operations are done in-place without additional storage.
    """
    if not nums:
        return

    low = 0    # Pointer for the position where the next 0 should go
    mid = 0    # Current element being examined
    high = len(nums) - 1 # Pointer for the position where the next 2 should go

    while mid <= high:
        if nums[mid] == 0:
            # If current element is 0, swap it with element at `low` pointer
            # and move both `low` and `mid` pointers forward.
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            # If current element is 1, it's already in its correct "middle" section,
            # so just move `mid` pointer forward.
            mid += 1
        else: # nums[mid] == 2
            # If current element is 2, swap it with element at `high` pointer
            # and move `high` pointer backward.
            # We do NOT increment `mid` here because the new element at `nums[mid]`
            # (which came from `high`) needs to be re-evaluated.
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

    # The function modifies the array in-place.
```