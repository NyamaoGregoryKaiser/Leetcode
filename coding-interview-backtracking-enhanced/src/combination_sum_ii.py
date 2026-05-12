"""
Problem: Combination Sum II

Given a collection of candidate numbers (`candidates`) and a target number (`target`),
find all unique combinations in `candidates` where the candidate numbers sum to `target`.
Each number in `candidates` may only be used **once** in the combination.
The solution set must not contain duplicate combinations.

Example 1:
Input: candidates = [10, 1, 2, 7, 6, 1, 5], target = 8
Output: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
Explanation: Note that 1 is used twice in the input and can be used twice in a combination.
             The combinations are unique based on their content, not on the indices of the candidates.

Example 2:
Input: candidates = [2, 5, 2, 1, 2], target = 5
Output: [[1, 2, 2], [5]]

Constraints:
1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30
"""

from typing import List

def combination_sum_ii(candidates: List[int], target: int) -> List[List[int]]:
    """
    Finds all unique combinations in `candidates` that sum up to `target`.
    Each number in `candidates` can only be used once in a combination.

    This problem involves:
    1. Backtracking: Exploring all possible combinations.
    2. Handling Duplicates in Input: The `candidates` array might contain duplicates,
       and the solution set must not contain duplicate combinations (e.g., `[1,2,5]` and `[2,1,5]`
       are considered the same, and `[1_at_idx0, 6, 1_at_idx2]` and `[1_at_idx2, 6, 1_at_idx0]`
       should only be counted once as `[1,1,6]`).

    Algorithm:
    1. Sort the `candidates` array. This is crucial for efficiently handling duplicates.
       Sorting allows us to easily skip duplicate elements during iteration.
    2. Initialize an empty list `result` to store all valid combinations.
    3. Define a recursive helper function `backtrack(remainder, start_index, current_combination)`:
       a. Base Cases:
          i. If `remainder == 0`: A valid combination is found. Add a copy of
             `current_combination` to `result` and return.
          ii. If `remainder < 0`: The current path has exceeded the target sum.
              This path cannot lead to a solution, so return (pruning).
       b. Recursive Step: Iterate from `i = start_index` to the end of `candidates`:
          i. **Skip Duplicates**: If `i > start_index` and `candidates[i] == candidates[i-1]`,
             continue to the next iteration. This ensures that if we have chosen `candidates[i-1]`
             in a previous branch at the `start_index` level, we don't explore the exact same
             combination path by choosing `candidates[i]` (which is a duplicate).
             For example, if `candidates = [1, 1, 2]` and `target = 2`:
             - We take `candidates[0]=1`. Remaining `target=1`. Call `backtrack(1, 1, [1])`.
             - Inside that call, we iterate from `start_index=1`.
               - If we take `candidates[1]=1`, we get `[1,1]`. This is valid.
               - Now, if we didn't have the duplicate skip, we would then consider `candidates[2]=2`.
                 When `start_index` is 0, we can use `candidates[0]`. When `start_index` is 1, we can use `candidates[1]`.
                 The skip `if i > start_index and candidates[i] == candidates[i-1]: continue`
                 means: once we pick `candidates[i-1]` for a position, we should not pick
                 an identical `candidates[i]` for the *same* position in the next sibling recursive call
                 (if they are at the same decision level).
                 This ensures `[1_idx0, 2]` and `[1_idx1, 2]` are not both generated if `candidates = [1,1,2]`.
          ii. **Pruning (Optimization)**: If `candidates[i] > remainder`, then this number
              and any subsequent numbers (because the array is sorted) are too large to form
              the target sum. So, break the loop.
          iii. **Choose**: Add `candidates[i]` to `current_combination`.
          iv. **Explore**: Recursively call `backtrack(remainder - candidates[i], i + 1, current_combination)`.
              We use `i + 1` as the new `start_index` because each number can be used only once.
          v. **Un-choose (Backtrack)**: Remove `candidates[i]` from `current_combination`.

    Time Complexity: O(2^N) in the worst case, where N is the number of candidates.
        - In the worst case, without much pruning (e.g., all 1s for target N), it can resemble
          subset generation which is O(2^N).
        - However, the actual complexity is often much better due to pruning (`remainder < 0` and `candidates[i] > remainder`)
          and duplicate skipping.
        - More precisely, it's roughly O(2^N * k), where k is the average length of a combination.
          The upper bound for many combination problems is related to the number of combinations,
          which can be large.

    Space Complexity: O(N)
        - O(N) for the recursion stack depth (in the worst case, a combination uses all N elements).
        - O(N) for `current_combination` list.
        - The `result` list stores `K` combinations, each of average length `L`. So O(K * L) is output space.
          `K` can be up to O(2^N).
    """
    result = []
    candidates.sort()  # Sorting is crucial for handling duplicates and pruning.
    n = len(candidates)

    def backtrack(remainder: int, start_index: int, current_combination: List[int]):
        # Base case 1: Found a valid combination
        if remainder == 0:
            result.append(list(current_combination))  # Add a copy
            return

        # Base case 2: Current path exceeds the target or has become negative
        if remainder < 0:
            return

        # Explore choices
        for i in range(start_index, n):
            # Optimization 1: Skip duplicates.
            # If the current element is the same as the previous one AND we are not at the
            # very beginning of this level of recursion (`i > start_index`), then skipping it
            # prevents duplicate combinations (e.g., [1,1,6] from candidate indices (0,1,...)
            # vs [1,1,6] from candidate indices (1,0,...)).
            # This ensures that for a specific position in the combination, if we have duplicate
            # candidates like [1, 1, 2], we only try one '1' at that specific recursion level.
            # The first '1' (at index `i`) will be explored. If we then see another '1' (at index `i+1`),
            # we skip it, because using it would lead to the same sequence of numbers.
            if i > start_index and candidates[i] == candidates[i-1]:
                continue

            # Optimization 2: Pruning.
            # Since the array is sorted, if current candidate is greater than the remaining
            # target, all subsequent candidates will also be greater.
            if candidates[i] > remainder:
                break # No need to check further in this branch

            # 1. Choose: Include the current candidate
            current_combination.append(candidates[i])

            # 2. Explore: Recurse for the next elements.
            # The new start_index is `i + 1` because each number can be used only once.
            backtrack(remainder - candidates[i], i + 1, current_combination)

            # 3. Un-choose (Backtrack): Remove the current candidate
            current_combination.pop()

    # Start the backtracking process
    backtrack(target, 0, [])
    return result

if __name__ == '__main__':
    # Test cases
    print(f"Candidates: [10, 1, 2, 7, 6, 1, 5], Target: 8")
    print(f"Result: {combination_sum_ii([10, 1, 2, 7, 6, 1, 5], 8)}")
    # Expected: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]] (order of combinations might vary)

    print(f"\nCandidates: [2, 5, 2, 1, 2], Target: 5")
    print(f"Result: {combination_sum_ii([2, 5, 2, 1, 2], 5)}")
    # Expected: [[1, 2, 2], [5]] (order of combinations might vary)

    print(f"\nCandidates: [1, 1, 1, 1, 1], Target: 3")
    print(f"Result: {combination_sum_ii([1, 1, 1, 1, 1], 3)}")
    # Expected: [[1, 1, 1]]

    print(f"\nCandidates: [1, 2, 3], Target: 7")
    print(f"Result: {combination_sum_ii([1, 2, 3], 7)}")
    # Expected: []

    print(f"\nCandidates: [1], Target: 1")
    print(f"Result: {combination_sum_ii([1], 1)}")
    # Expected: [[1]]

    print(f"\nCandidates: [], Target: 0")
    print(f"Result: {combination_sum_ii([], 0)}")
    # Expected: [[]] (An empty combination sums to 0, if no candidates are needed)

    print(f"\nCandidates: [1, 1, 1], Target: 2")
    print(f"Result: {combination_sum_ii([1, 1, 1], 2)}")
    # Expected: [[1, 1]]