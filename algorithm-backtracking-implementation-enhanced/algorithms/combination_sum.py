"""
Module for solving Combination Sum problems.

Contains implementations for:
1.  Combination Sum: Find all unique combinations that sum to a target, where
    numbers can be reused.
2.  Combination Sum II: Find all unique combinations that sum to a target, where
    each number can be used only once, and the input array may contain duplicates.
"""

from typing import List

def combination_sum(candidates: List[int], target: int) -> List[List[int]]:
    """
    Finds all unique combinations in `candidates` where the numbers sum to `target`.
    Each number in `candidates` may be used an unlimited number of times.

    This uses a backtracking approach. We iterate through the `candidates` array.
    For each candidate, we have two choices:
    1. Include the candidate: Add it to the current combination, subtract its value
       from the `target`, and recurse, allowing the *same* candidate to be chosen again
       (by passing `i` as the next `start_index`).
    2. Exclude the candidate: Move to the next candidate (by passing `i + 1` as the
       next `start_index`) without adding the current one.

    To avoid duplicate combinations (e.g., [2, 3] and [3, 2] from [2, 3, 6, 7]),
    we ensure that elements are chosen in non-decreasing order by passing `i` or `i+1`
    as the `start_index` to the recursive calls.

    Example:
    combination_sum([2, 3, 6, 7], 7) returns:
    [[2, 2, 3], [7]] (order may vary)

    Args:
        candidates: A list of distinct integers (positive).
        target: The target sum (positive integer).

    Returns:
        A list of lists, where each inner list is a unique combination of numbers
        from `candidates` that sums up to `target`.

    Time Complexity: O(C^(T/min_C)), where C is the number of candidates, T is the target,
        and min_C is the smallest candidate. This is a very loose upper bound.
        A more practical way to think about it is the number of possible combinations.
        In the worst case, it can be exponential.
        Each valid combination found takes O(Length of combination) to copy to result.
    Space Complexity: O(T/min_C) for recursion stack depth (max length of combination),
        plus O(Total combinations * Length of combination) for storing the result.
        Auxiliary space O(T/min_C).
    """
    result: List[List[int]] = []
    current_combination: List[int] = []

    def _backtrack(start_index: int, current_sum: int):
        # Base cases:
        # 1. If current_sum equals target, a valid combination is found.
        if current_sum == target:
            result.append(list(current_combination))
            return
        # 2. If current_sum exceeds target, this path is invalid.
        if current_sum > target:
            return

        # Recursive step: Iterate through candidates from `start_index`.
        # This prevents duplicate combinations (e.g., [2,3] and [3,2]).
        for i in range(start_index, len(candidates)):
            candidate = candidates[i]

            # 1. Choose: Include the current candidate.
            current_combination.append(candidate)
            current_sum += candidate

            # 2. Explore: Recurse. Since numbers can be reused, pass `i` (not `i + 1`)
            #    as the new `start_index` to allow picking the same candidate again.
            _backtrack(i, current_sum)

            # 3. Un-choose (Backtrack): Remove the candidate.
            #    Restore state for other branches.
            current_combination.pop()
            current_sum -= candidate

    _backtrack(0, 0)
    return result

def combination_sum2(candidates: List[int], target: int) -> List[List[int]]:
    """
    Finds all unique combinations in `candidates` where the numbers sum to `target`.
    Each number in `candidates` may only be used *once* in a combination.
    The input `candidates` list may contain duplicate numbers.

    This also uses a backtracking approach. Similar to `combination_sum`, but with two key differences:
    1. Each number can be used at most once: When recursing, the `start_index` is always `i + 1`.
    2. Handle duplicates in `candidates`: Sort the `candidates` list first. Then, in the
       iteration, if `candidates[i]` is the same as `candidates[i-1]` AND `i > start_index`
       (meaning `candidates[i-1]` was considered in this level of recursion), skip `candidates[i]`
       to avoid duplicate combinations (e.g., if candidates are [1,1,2] and target is 2,
       we want only one [1,1], not two if both '1's are processed independently).

    Example:
    combination_sum2([10, 1, 2, 7, 6, 1, 5], 8) returns:
    [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]] (order may vary)

    Args:
        candidates: A list of integers (positive), potentially with duplicates.
        target: The target sum (positive integer).

    Returns:
        A list of lists, where each inner list is a unique combination of numbers
        from `candidates` that sums up to `target`, with each number used at most once.

    Time Complexity: O(2^N * k), where N is the number of candidates and k is the
        average length of a combination. In the worst case, without duplicates,
        there are 2^N subsets. Each copy takes O(k).
        Pruning due to duplicates helps, but the worst-case remains exponential.
    Space Complexity: O(N) for recursion stack depth, plus O(Total combinations * k) for results.
        Auxiliary space O(N).
    """
    result: List[List[int]] = []
    current_combination: List[int] = []

    # Sort candidates to handle duplicates and to allow for efficient skipping.
    candidates.sort()

    def _backtrack2(start_index: int, current_sum: int):
        # Base cases:
        if current_sum == target:
            result.append(list(current_combination))
            return
        if current_sum > target:
            return

        # Recursive step: Iterate through candidates from `start_index`.
        for i in range(start_index, len(candidates)):
            # Pruning duplicates:
            # If the current candidate is the same as the previous one,
            # and we are not at the very beginning of the loop for this
            # `start_index`, then skip it. This ensures that for duplicate
            # numbers (e.g., [1,1,2]), only the first '1' creates a branch
            # at a given recursion level, preventing duplicate combinations.
            if i > start_index and candidates[i] == candidates[i-1]:
                continue

            candidate = candidates[i]

            # Optimization: If adding the current candidate already exceeds the target,
            # then any subsequent candidates (which are >= current due to sorting)
            # will also exceed the target. So, we can stop this loop.
            if current_sum + candidate > target:
                break

            # 1. Choose: Include the current candidate.
            current_combination.append(candidate)
            current_sum += candidate

            # 2. Explore: Recurse. Pass `i + 1` as the new `start_index` because
            #    each number can be used at most once.
            _backtrack2(i + 1, current_sum)

            # 3. Un-choose (Backtrack): Remove the candidate.
            current_combination.pop()
            current_sum -= candidate

    _backtrack2(0, 0)
    return result
```