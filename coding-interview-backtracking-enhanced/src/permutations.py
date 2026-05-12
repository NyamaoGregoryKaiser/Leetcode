"""
Problem: Permutations

Given an array `nums` of distinct integers, return all possible permutations.
You can return the answer in any order.

Example 1:
Input: nums = [1, 2, 3]
Output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]

Example 2:
Input: nums = [0, 1]
Output: [[0, 1], [1, 0]]

Example 3:
Input: nums = [1]
Output: [[1]]

Constraints:
1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.
"""

from typing import List

def find_permutations(nums: List[int]) -> List[List[int]]:
    """
    Finds all possible permutations of a given array of distinct integers using backtracking.

    Algorithm:
    1. Initialize an empty list `result` to store all generated permutations.
    2. Initialize an empty list `current_permutation` to build a permutation.
    3. Initialize a boolean array `used` (or a set) of the same length as `nums` to keep
       track of which elements have already been used in the `current_permutation`.
    4. Define a recursive helper function `backtrack()`:
       a. Base Case: If the length of `current_permutation` equals the length of `nums`,
          it means a complete permutation has been formed. Add a copy of `current_permutation`
          to `result` and return.
       b. Recursive Step: Iterate through each number in `nums` from `i = 0` to `n-1`:
          i. Check if `nums[i]` has already been used (`used[i]` is True). If so, skip it
             to avoid duplicate elements within the same permutation.
          ii. If `nums[i]` is not used:
              - Mark `nums[i]` as used (`used[i] = True`).
              - Add `nums[i]` to `current_permutation`.
              - Recursively call `backtrack()` to continue building the permutation.
              - **Backtrack**: Remove `nums[i]` from `current_permutation` and mark
                `nums[i]` as unused (`used[i] = False`). This step is crucial for
                exploring other permutations by undoing the current choice.

    Time Complexity: O(N * N!)
        - There are N! (N factorial) permutations.
        - For each permutation, constructing the `current_permutation` and adding its copy to `result`
          takes O(N) time (copying a list of N elements).
        - The recursion explores N! leaf nodes. Each path from the root to a leaf has a depth of N.
          At each level, we iterate through N choices, which is amortized. The work per node is
          dominated by list append/pop and the `list()` constructor for the result.
        - So, N! permutations, each taking O(N) to build/copy.

    Space Complexity: O(N)
        - O(N) for the recursion stack depth (maximum depth is N).
        - O(N) for `current_permutation`.
        - O(N) for the `used` boolean array.
        - The total space for `result` is O(N * N!) (N elements * N! permutations),
          but this is output space and not considered auxiliary space for the algorithm itself.
    """
    result = []
    n = len(nums)
    current_permutation = []
    used = [False] * n  # Keeps track of numbers already used in the current permutation

    def backtrack():
        # Base case: If the current permutation has N elements, it's complete.
        if len(current_permutation) == n:
            result.append(list(current_permutation))  # Append a copy
            return

        # Iterate through all numbers in nums to find the next element
        for i in range(n):
            # If nums[i] has not been used yet in the current path
            if not used[i]:
                # 1. Choose: Mark as used and add to current_permutation
                used[i] = True
                current_permutation.append(nums[i])

                # 2. Explore: Recurse to build the rest of the permutation
                backtrack()

                # 3. Un-choose (Backtrack): Remove from current_permutation and mark as unused
                # This allows nums[i] to be used in other permutation paths.
                current_permutation.pop()
                used[i] = False

    backtrack()
    return result

def find_permutations_swap_approach(nums: List[int]) -> List[List[int]]:
    """
    Finds all possible permutations using a swap-based backtracking approach.
    This approach modifies the input array directly by swapping elements,
    eliminating the need for a separate `used` array.

    Algorithm (often called Heap's algorithm variation):
    1. Initialize an empty list `result` to store all generated permutations.
    2. Define a recursive helper function `backtrack(index, arr)`:
       a. Base Case: If `index` equals the length of `arr` (n), it means the elements
          from `index` to `n-1` have been permuted. A complete permutation has been
          formed in `arr`. Add a copy of `arr` to `result` and return.
       b. Recursive Step: Iterate from `i = index` to `n-1`:
          i. Swap `arr[index]` with `arr[i]`. This places `arr[i]` at the current
             position `index`.
          ii. Recursively call `backtrack(index + 1, arr)` to find permutations
              for the remaining `n - (index + 1)` elements.
          iii. **Backtrack**: Swap `arr[index]` with `arr[i]` again. This restores
              the array to its state before the swap, allowing exploration of
              other choices for the current `index`.

    This approach is generally considered more memory-efficient as it avoids
    creating new lists/sets in each recursive call for tracking `used` elements.

    Time Complexity: O(N * N!)
        - Same as the previous approach. N! permutations, and each step involves constant
          time swaps. Copying the list takes O(N) time for each of the N! results.

    Space Complexity: O(N)
        - O(N) for the recursion stack depth.
        - The input `nums` is modified in place and then restored, so no extra space
          for `current_permutation` or `used` array.
        - Total space for `result` is O(N * N!).
    """
    result = []
    n = len(nums)
    
    def backtrack(index: int, arr: List[int]):
        # Base case: if we have fixed elements up to the last position
        if index == n:
            result.append(list(arr)) # Append a copy of the current state of arr
            return

        # Iterate through elements from current index to the end
        for i in range(index, n):
            # 1. Choose: Swap current element (arr[index]) with arr[i]
            # This effectively places arr[i] at the 'index' position.
            arr[index], arr[i] = arr[i], arr[index]

            # 2. Explore: Recurse for the next index
            backtrack(index + 1, arr)

            # 3. Un-choose (Backtrack): Swap back to restore the array to its previous state
            # This is crucial for exploring other choices at the current 'index'.
            arr[index], arr[i] = arr[i], arr[index]

    # Make a copy of nums to avoid modifying the original input array passed to the function
    # if it's needed elsewhere, or if the problem specifies immutability.
    # If in-place modification of the original `nums` is allowed, this copy is not strictly needed.
    backtrack(0, list(nums)) 
    return result


if __name__ == '__main__':
    # Test cases
    print(f"Permutations for [1, 2, 3]: {find_permutations([1, 2, 3])}")
    # Expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] (order might vary)
    print(f"Permutations (Swap) for [1, 2, 3]: {find_permutations_swap_approach([1, 2, 3])}")

    print(f"Permutations for [0, 1]: {find_permutations([0, 1])}")
    # Expected: [[0, 1], [1, 0]]
    print(f"Permutations (Swap) for [0, 1]: {find_permutations_swap_approach([0, 1])}")

    print(f"Permutations for [1]: {find_permutations([1])}")
    # Expected: [[1]]
    print(f"Permutations (Swap) for [1]: {find_permutations_swap_approach([1])}")

    print(f"Permutations for []: {find_permutations([])}")
    # Expected: [[]]
    print(f"Permutations (Swap) for []: {find_permutations_swap_approach([])}")

    print(f"Permutations for [1, 2]: {find_permutations([1, 2])}")
    # Expected: [[1, 2], [2, 1]]
    print(f"Permutations (Swap) for [1, 2]: {find_permutations_swap_approach([1, 2])}")