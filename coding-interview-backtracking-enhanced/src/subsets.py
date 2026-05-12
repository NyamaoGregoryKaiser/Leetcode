"""
Problem: Subsets

Given an integer array `nums` of unique elements, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:
Input: nums = [1, 2, 3]
Output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]

Example 2:
Input: nums = [0]
Output: [[], [0]]

Constraints:
1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.
"""

from typing import List

def find_subsets(nums: List[int]) -> List[List[int]]:
    """
    Finds all possible subsets (the power set) of a given integer array with unique elements.

    This solution uses a backtracking approach. At each step, we have two choices for the
    current number: either include it in the current subset or exclude it.

    Algorithm:
    1. Initialize an empty list `result` to store all generated subsets.
    2. Define a recursive helper function `backtrack(index, current_subset)`:
       a. Add a copy of `current_subset` to `result`. This represents a valid subset
          formed up to the current `index`.
       b. Iterate from `index` to the end of `nums`:
          i. Include `nums[i]` in `current_subset`.
          ii. Recursively call `backtrack(i + 1, current_subset)` to explore subsets
              starting from the next element.
          iii. Exclude `nums[i]` by removing it from `current_subset`. This is the
               "backtrack" step, undoing the choice to include `nums[i]` so that
               other paths can be explored.
    3. Start the backtracking process from index 0 with an empty current subset.

    This approach implicitly handles all combinations of elements. Each path from the
    root to a leaf in the decision tree represents a subset.

    Time Complexity: O(2^N * N)
        - There are 2^N possible subsets.
        - For each subset, converting `current_subset` (a list) to a result list
          takes O(N) time in the worst case (when the subset has N elements).
          So, the `result.append(list(current_subset))` operation contributes O(N) per subset.
        - The recursive calls themselves also contribute to the O(2^N) factor as we explore
          each branch of the decision tree.
        - The total number of nodes in the recursion tree is O(2^N).

    Space Complexity: O(N)
        - O(N) for the recursion stack depth (in the worst case, when building a subset of N elements).
        - O(N) for `current_subset` list.
        - The space required for the `result` list is O(2^N * N) in total, but this is output space,
          not auxiliary space for the algorithm itself. If we consider output space, it would be O(2^N * N).
          Typically, auxiliary space refers to temporary space used by the algorithm excluding the output.
    """
    result = []
    n = len(nums)

    def backtrack(index: int, current_subset: List[int]):
        # Add the current subset to the result list.
        # It's important to append a copy (list(current_subset)) because current_subset
        # will be modified later as we backtrack.
        result.append(list(current_subset))

        # Explore further elements to add to the current subset
        for i in range(index, n):
            # 1. Choose: Include nums[i] in the current subset
            current_subset.append(nums[i])

            # 2. Explore: Recurse with the next index (i + 1)
            # This ensures each element is considered only once for a given path,
            # and prevents duplicate combinations (e.g., [1,2] then [2,1]).
            backtrack(i + 1, current_subset)

            # 3. Un-choose (Backtrack): Remove nums[i] to explore other possibilities
            # This is the essence of backtracking - undoing the choice to explore
            # alternative paths in the decision tree.
            current_subset.pop()

    # Start the backtracking process from the beginning of the array with an empty subset.
    backtrack(0, [])
    return result

def find_subsets_alternative_approach(nums: List[int]) -> List[List[int]]:
    """
    An alternative backtracking approach for finding subsets.
    This version explicitly models the "take it or leave it" decision for each element.
    It processes elements one by one, deciding whether to include them or not.

    Algorithm:
    1. Initialize an empty list `result` to store all generated subsets.
    2. Define a recursive helper function `backtrack(index, current_subset)`:
       a. Base Case: If `index` equals the length of `nums`, it means all elements
          have been considered. Add a copy of `current_subset` to `result`.
          Then return.
       b. Recursive Step (Choice 1: Exclude `nums[index]`):
          i. Call `backtrack(index + 1, current_subset)` without adding `nums[index]`.
             This explores paths where the current element is not included.
       c. Recursive Step (Choice 2: Include `nums[index]`):
          i. Add `nums[index]` to `current_subset`.
          ii. Call `backtrack(index + 1, current_subset)`.
              This explores paths where the current element *is* included.
          iii. Remove `nums[index]` from `current_subset` (backtrack).
               This undoes the choice to include the element for subsequent branches
               that might have started from the state where `nums[index]` was excluded.

    This approach is equally valid and conceptually represents the "take/don't take" decision
    more directly at each element. The previous approach iterates from 'index' and adds,
    which is also valid. Both generate the same power set.

    Time Complexity: O(2^N * N)
        - Similar to the first approach. There are 2^N subsets, and appending each
          takes O(N) time. Each node in the recursion tree (2^N nodes) involves constant
          work plus recursive calls.

    Space Complexity: O(N)
        - O(N) for recursion stack depth.
        - O(N) for `current_subset`.
        - Again, O(2^N * N) for the total output `result` list.
    """
    result = []
    n = len(nums)

    def backtrack(index: int, current_subset: List[int]):
        # Base case: if we have considered all elements
        if index == n:
            result.append(list(current_subset))
            return

        # Choice 1: Exclude the current element (nums[index])
        backtrack(index + 1, current_subset)

        # Choice 2: Include the current element (nums[index])
        current_subset.append(nums[index])
        backtrack(index + 1, current_subset)
        current_subset.pop() # Backtrack: remove the element to explore other paths

    backtrack(0, [])
    return result


if __name__ == '__main__':
    # Test cases
    print(f"Subsets for [1, 2, 3]: {find_subsets([1, 2, 3])}")
    # Expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]] (order might vary)
    print(f"Subsets (Alt) for [1, 2, 3]: {find_subsets_alternative_approach([1, 2, 3])}")

    print(f"Subsets for [0]: {find_subsets([0])}")
    # Expected: [[], [0]]
    print(f"Subsets (Alt) for [0]: {find_subsets_alternative_approach([0])}")

    print(f"Subsets for []: {find_subsets([])}")
    # Expected: [[]]
    print(f"Subsets (Alt) for []: {find_subsets_alternative_approach([])}")

    print(f"Subsets for [5, 6]: {find_subsets([5, 6])}")
    # Expected: [[], [5], [5, 6], [6]]
    print(f"Subsets (Alt) for [5, 6]: {find_subsets_alternative_approach([5, 6])}")