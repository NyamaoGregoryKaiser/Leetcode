"""
Module for generating all possible subsets (the power set) of a list of numbers.

Contains implementations for:
1.  Subsets of distinct numbers.
2.  Subsets of numbers that may contain duplicates.
"""

from typing import List

def subsets(nums: List[int]) -> List[List[int]]:
    """
    Generates all possible subsets (the power set) of a list of distinct integers.

    This function uses a backtracking approach. For each number, there are two choices:
    either include it in the current subset or exclude it.
    The recursion explores these choices.

    Example:
    subsets([1, 2, 3]) returns:
    [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]] (order may vary)

    Args:
        nums: A list of distinct integers.

    Returns:
        A list of lists, where each inner list is a unique subset of `nums`.

    Time Complexity: O(N * 2^N), where N is the number of elements in `nums`.
        There are 2^N total subsets. For each subset, creating a copy of `current_subset`
        and adding it to the result takes O(N) time.
    Space Complexity: O(N) for the recursion stack depth, plus O(N * 2^N) for storing results.
        Auxiliary space O(N).
    """
    if not nums:
        return [[]]

    result: List[List[int]] = []
    current_subset: List[int] = []

    def _backtrack(start_index: int):
        # Base case: At each step of the recursion, the `current_subset` represents a valid
        # subset. Add a copy of it to the result list.
        # This is different from permutations, where a result is only added at a certain depth.
        # Here, every path leads to a valid subset.
        result.append(list(current_subset))

        # Recursive step: Iterate through the remaining numbers from `start_index`.
        for i in range(start_index, len(nums)):
            # 1. Choose: Include the current number in the subset.
            current_subset.append(nums[i])

            # 2. Explore: Recurse with the next index `i + 1`.
            # This ensures that numbers are chosen in increasing order, preventing
            # duplicate subsets like [1, 2] and [2, 1].
            _backtrack(i + 1)

            # 3. Un-choose (Backtrack): Remove the number from the current subset.
            # This allows the algorithm to explore paths where `nums[i]` is not included.
            current_subset.pop()

    _backtrack(0)
    return result

def subsets_with_dup(nums: List[int]) -> List[List[int]]:
    """
    Generates all unique subsets (the power set) of a list of integers that may contain duplicates.

    This function builds upon the `subsets` approach. To handle duplicates,
    the input list `nums` is first sorted. During the iteration, a pruning step
    is added: if the current number is the same as the previous number AND
    we are not at the `start_index` (meaning the previous duplicate was already
    considered in this level of recursion), then skip the current number.
    This prevents generating redundant branches for identical elements.

    Example:
    subsets_with_dup([1, 2, 2]) returns:
    [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]] (order may vary)

    Args:
        nums: A list of integers which may contain duplicates.

    Returns:
        A list of lists, where each inner list is a unique subset of `nums`.

    Time Complexity: O(N * 2^N) in the worst case.
        Although pruning occurs, in the worst case (no duplicates), it's similar to `subsets`.
        Each copy takes O(N).
    Space Complexity: O(N) for the recursion stack, plus O(N * 2^N) for storing results.
        Auxiliary space O(N).
    """
    if not nums:
        return [[]]

    # Sort the numbers to bring duplicates together, which is crucial for pruning.
    nums.sort()
    result: List[List[int]] = []
    current_subset: List[int] = []

    def _backtrack_dup(start_index: int):
        # Base case: Add the current subset to the result list.
        result.append(list(current_subset))

        # Recursive step: Iterate through the remaining numbers.
        for i in range(start_index, len(nums)):
            # Pruning condition for duplicates:
            # If the current element is the same as the previous element AND
            # `i` is not the `start_index` (meaning this is a duplicate element
            # at the current level of iteration, and the first occurrence of this
            # duplicate value has already been considered for this `start_index` choice),
            # then skip it to avoid duplicate subsets.
            # Example: [1, 2, 2']
            # If start_index = 1, nums[1] = 2. We choose 2. Recurse.
            # Now, in the loop, i = 2, nums[2] = 2'.
            # `i > start_index` (2 > 1) is True.
            # `nums[i] == nums[i-1]` (nums[2] == nums[1]) is True.
            # So, we skip 2' because it would lead to a subset like [2', ...] which is
            # equivalent to [2, ...] from the perspective of unique subsets.
            if i > start_index and nums[i] == nums[i-1]:
                continue

            # 1. Choose: Include the current number.
            current_subset.append(nums[i])

            # 2. Explore: Recurse with the next index.
            _backtrack_dup(i + 1)

            # 3. Un-choose (Backtrack): Remove the number.
            current_subset.pop()

    _backtrack_dup(0)
    return result

# Alternative approach (Iterative - not backtracking, but good for comparison)
def subsets_iterative(nums: List[int]) -> List[List[int]]:
    """
    Generates all subsets iteratively using a breadth-first expansion.
    This is not a backtracking solution but demonstrates an alternative paradigm.

    Example:
    subsets_iterative([1, 2, 3]) returns:
    [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]] (order is different)

    Args:
        nums: A list of distinct integers.

    Returns:
        A list of lists, where each inner list is a unique subset of `nums`.

    Time Complexity: O(N * 2^N).
        For each number, we iterate through all existing subsets and create new ones.
    Space Complexity: O(N * 2^N) to store results.
    """
    result: List[List[int]] = [[]]
    for num in nums:
        # For each number, iterate through all existing subsets and
        # add a new subset formed by adding the current `num` to them.
        # It's important to iterate over a copy of `result` or store its length
        # before modification to avoid issues with adding to the list while iterating.
        for i in range(len(result)):
            current_subset = list(result[i])
            current_subset.append(num)
            result.append(current_subset)
    return result

def subsets_with_dup_iterative(nums: List[int]) -> List[List[int]]:
    """
    Generates all unique subsets of a list of integers with duplicates using an
    iterative approach. This is not a backtracking solution.

    To handle duplicates, the input list is sorted first. When a duplicate number
    is encountered, new subsets are only appended to the subsets that were generated
    in the *previous* step (when the first occurrence of this duplicate number was processed),
    not all existing subsets.

    Example:
    subsets_with_dup_iterative([1, 2, 2]) returns:
    [[], [1], [2], [1, 2], [2, 2], [1, 2, 2]] (order may vary)

    Args:
        nums: A list of integers which may contain duplicates.

    Returns:
        A list of lists, where each inner list is a unique subset of `nums`.

    Time Complexity: O(N * 2^N).
    Space Complexity: O(N * 2^N) to store results.
    """
    nums.sort()
    result: List[List[int]] = [[]]
    start_index_for_new_subsets = 0

    for i in range(len(nums)):
        # If current number is a duplicate of the previous one,
        # new subsets should only extend subsets formed in the last step.
        if i > 0 and nums[i] == nums[i-1]:
            # This ensures we only add to subsets created by the *first* occurrence
            # of the current duplicate block.
            # Example: [1, 2_a, 2_b]
            # When processing 2_a, new subsets are created from existing ones.
            # When processing 2_b, new subsets should only be created from those
            # that were formed when 2_a was processed.
            current_loop_start = start_index_for_new_subsets
        else:
            # If not a duplicate, new subsets can extend all existing ones.
            current_loop_start = 0

        # Number of subsets before processing current num[i]
        size = len(result)
        for j in range(current_loop_start, size):
            new_subset = list(result[j])
            new_subset.append(nums[i])
            result.append(new_subset)
        
        # Update start index for next iteration if current number was a duplicate
        start_index_for_new_subsets = size # All subsets added after this index are 'new'

    return result
```