# Problem: Wiggle Sort II (Naive / Simpler Iterative Approach)

# This file contains a naive or conceptually simpler iterative approach for Wiggle Sort II.
# It might not strictly achieve the `O(N)` average time or `O(1)` space of the optimal solutions,
# and might even be less efficient than the sort-and-interleave method in some aspects.
# This implementation aims for a direct iterative pass without prior sorting or median finding,
# which is generally very hard to get right for Wiggle Sort II's strict inequalities.
# A common iterative approach for Wiggle Sort *I* (`<= >=`) is to simply iterate and swap.
# For Wiggle Sort *II* (`< >`), this is much more complex without pre-sorting/partitioning.

# Let's consider a naive approach that iterates and swaps. This often works for Wiggle Sort I,
# but can be problematic for Wiggle Sort II's strict inequality and for elements being equal to each other.

def wiggle_sort_ii_naive_iterative(nums: list[int]) -> None:
    """
    Reorders the array `nums` in-place using a naive iterative approach.
    This approach attempts to achieve the wiggle pattern by iterating through the array
    and performing swaps if the adjacent elements violate the pattern.

    NOTE: This "naive iterative" approach is typically for Wiggle Sort I (`a <= b >= c`)
    and does NOT generally work for Wiggle Sort II (`a < b > c`) due to strict inequality
    and potential duplicate values. It is included here for pedagogical contrast,
    demonstrating the difficulty of Wiggle Sort II without a median-based strategy.
    It might produce an incorrect result for some inputs, or not satisfy strict inequality.

    Args:
        nums (list[int]): The input array of integers, modified in-place.
    """
    n = len(nums)
    if n <= 1:
        return

    # The pattern is: nums[0] < nums[1] > nums[2] < nums[3]...
    # For even indices `i`: nums[i] < nums[i+1]
    # For odd indices `i`: nums[i] > nums[i+1]
    
    # This simple pass usually only works for Wiggle Sort I (non-strict inequality).
    # For Wiggle Sort II, it's very tricky because swapping `nums[i]` and `nums[i+1]`
    # might break `nums[i-1]`'s relation.
    # Also, it doesn't handle duplicates well for strict inequality.
    # For example, `[1,2,3,4]`.
    # i=0: `nums[0] < nums[1]` -> 1 < 2 (OK)
    # i=1: `nums[1] > nums[2]` -> 2 > 3 (False). Swap `nums[1]` and `nums[2]`. `[1,3,2,4]`
    # i=2: `nums[2] < nums[3]` -> 2 < 4 (OK)
    # Result: `[1,3,2,4]`. This works: `1 < 3 > 2 < 4`.
    
    # What about `[4,5,5,6]`?
    # i=0: `nums[0] < nums[1]` -> 4 < 5 (OK)
    # i=1: `nums[1] > nums[2]` -> 5 > 5 (False). Swap `nums[1]` and `nums[2]`. `[4,5,5,6]` (no change)
    # i=2: `nums[2] < nums[3]` -> 5 < 6 (OK)
    # Result: `[4,5,5,6]`. This is NOT wiggle sorted: `4 < 5`, `5 !> 5`.
    # This clearly shows the simple iterative swap approach FAILS for Wiggle Sort II.

    # This file serves as a demonstration of a common but often incorrect "naive" attempt
    # for Wiggle Sort II due to the strict inequality and duplicate handling.
    # The actual implementation of a "naive" iterative solution might look like this,
    # but with the understanding that it's likely incorrect for Wiggle Sort II.
    
    # For Wiggle Sort II, a truly 'naive' but working solution is often just sorting and interleaving,
    # which is already provided as `wiggle_sort_ii_simple`.
    
    # Let's provide an iterative implementation that attempts to meet Wiggle Sort I conditions,
    # and explain why it's inadequate for Wiggle Sort II.
    
    for i in range(n - 1):
        if i % 2 == 0:  # Even index, should be `nums[i] < nums[i+1]`
            if nums[i] >= nums[i+1]: # Violation: `nums[i]` is not strictly less
                nums[i], nums[i+1] = nums[i+1], nums[i]
        else: # Odd index, should be `nums[i] > nums[i+1]`
            if nums[i] <= nums[i+1]: # Violation: `nums[i]` is not strictly greater
                nums[i], nums[i+1] = nums[i+1], nums[i]

    # This function is not guaranteed to produce a correct Wiggle Sort II output.
    # It might produce a valid Wiggle Sort I output (non-strict inequality),
    # but that's not the problem's requirement.
    # Example where it fails for WSII: [4,5,5,6] -> [4,5,5,6] (fails strict inequality)
    # Example where it succeeds by chance: [1,2,3,4] -> [1,3,2,4] (valid WSII)