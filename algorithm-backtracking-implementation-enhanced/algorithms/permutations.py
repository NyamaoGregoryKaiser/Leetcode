"""
Module for generating permutations of a list of numbers.

Contains implementations for:
1.  Permutations of distinct numbers.
2.  Permutations of numbers that may contain duplicates (unique permutations).
"""

from typing import List

def permute(nums: List[int]) -> List[List[int]]:
    """
    Generates all possible permutations of a list of distinct numbers.

    This function uses a backtracking approach to explore all possible arrangements.
    It builds a permutation incrementally. At each step, it chooses an unused
    number from the input list and adds it to the current permutation.
    Once a permutation reaches the length of the input list, it's added to the result.
    The 'visited' array ensures that each number is used only once in a given permutation.

    Example:
    permute([1, 2, 3]) returns:
    [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]

    Args:
        nums: A list of distinct integers.

    Returns:
        A list of lists, where each inner list is a unique permutation of the input `nums`.

    Time Complexity: O(N * N!), where N is the number of elements in `nums`.
        There are N! permutations. For each permutation, creating a copy of the
        `current_permutation` takes O(N) time.
        The backtracking tree has N! leaves. The number of internal nodes is
        roughly N! * (1 + 1/2 + 1/6 + ... + 1/N!), which is also proportional to N!.
        Each step involves iterating through N elements (the for loop).
    Space Complexity: O(N) for the recursion stack and O(N) for the `visited` array,
        plus O(N * N!) for storing the results. So, primarily O(N * N!) for output,
        and O(N) for auxiliary space.
    """
    if not nums:
        return [[]]

    result: List[List[int]] = []
    current_permutation: List[int] = []
    visited: List[bool] = [False] * len(nums)

    def _backtrack(idx: int):
        # Base case: If the current permutation has the same length as the input numbers,
        # it's a complete permutation. Add a copy to the result.
        if idx == len(nums):
            result.append(list(current_permutation))
            return

        # Recursive step: Iterate through all numbers in the input list.
        for i in range(len(nums)):
            # If the number at index `i` has not been visited yet:
            if not visited[i]:
                # 1. Choose: Add the number to the current permutation.
                current_permutation.append(nums[i])
                # Mark it as visited to avoid using it again in this path.
                visited[i] = True

                # 2. Explore: Recurse to find the next number.
                _backtrack(idx + 1)

                # 3. Un-choose (Backtrack): Remove the number from the current permutation
                #    and mark it as unvisited. This allows it to be used in other paths.
                current_permutation.pop()
                visited[i] = False

    _backtrack(0)
    return result

def permute_unique(nums: List[int]) -> List[List[int]]:
    """
    Generates all unique permutations of a list of numbers that may contain duplicates.

    This function extends the `permute` approach to handle duplicates.
    The key to handling duplicates is to sort the input array first.
    Then, during the iteration, if the current number is the same as the
    previous number AND the previous number was NOT visited (meaning it was
    skipped in the current recursive call), then skip the current number.
    This prevents generating duplicate permutations like [1, 1', 2] and [1', 1, 2]
    when the two '1's are identical.

    Example:
    permute_unique([1, 1, 2]) returns:
    [[1, 1, 2], [1, 2, 1], [2, 1, 1]]

    Args:
        nums: A list of integers which may contain duplicates.

    Returns:
        A list of lists, where each inner list is a unique permutation of the input `nums`.

    Time Complexity: O(N * N!) in the worst case, similar to `permute`.
        While pruning occurs, the worst-case number of unique permutations can still be
        close to N! (e.g., if there are few duplicates). Each copy takes O(N).
    Space Complexity: O(N) for recursion stack and `visited` array, plus O(N * N!) for results.
        Auxiliary space O(N).
    """
    if not nums:
        return [[]]

    # Sort the numbers to handle duplicates effectively.
    # This brings identical numbers together, making it easy to check for duplicates.
    nums.sort()
    result: List[List[int]] = []
    current_permutation: List[int] = []
    visited: List[bool] = [False] * len(nums)

    def _backtrack_unique():
        # Base case: If the current permutation is complete.
        if len(current_permutation) == len(nums):
            result.append(list(current_permutation))
            return

        for i in range(len(nums)):
            # Pruning condition for duplicates:
            # If nums[i] has already been visited in the current path, skip it.
            if visited[i]:
                continue
            
            # If the current number is the same as the previous one AND
            # the previous one was NOT visited (meaning it was part of a choice
            # that led to a different path in the recursion tree),
            # then skipping this current duplicate nums[i] prevents duplicate permutations.
            # Example: [1_a, 1_b, 2]
            # If we choose 1_a, then recurse. Later, when we are at the same depth
            # and considering 1_b, we should skip it if 1_a was *not* visited.
            # (i.e. if 1_a was already used to form a permutation, then this 1_b is
            # a new branch in the search space. If 1_a was available but we chose
            # something else (e.g. 2, then 1_a, then 1_b), this prevents 2, 1_b, 1_a)
            # This specific condition `i > 0 and nums[i] == nums[i-1] and not visited[i-1]`
            # ensures that for a sequence of identical elements (e.g., 1, 1, 1),
            # we only start a new branch with the *first* available identical element
            # in a given position of the permutation.
            #
            # Consider nums = [1, 1, 2]
            # Sorted: [1_a, 1_b, 2]
            #
            # 1. First iteration (i=0, nums[0]=1_a):
            #    visited[0] = False (OK)
            #    current_permutation = [1_a]
            #    visited = [T, F, F]
            #    _backtrack_unique()
            #       2. Second iteration (i=0, visited[0]=True -> skip)
            #       2. Second iteration (i=1, nums[1]=1_b):
            #          visited[1] = False (OK)
            #          `i > 0 and nums[i] == nums[i-1]`: True (1_b == 1_a)
            #          `not visited[i-1]`: False (visited[0] is True, meaning 1_a was chosen)
            #          So, condition is `True and False` -> False. We DO NOT skip.
            #          current_permutation = [1_a, 1_b]
            #          visited = [T, T, F]
            #          _backtrack_unique()
            #             ... [1_a, 1_b, 2] -> Add to result.
            #          (backtrack) current_permutation = [1_a], visited = [T, F, F]
            #
            #       2. Second iteration (i=2, nums[2]=2):
            #          visited[2] = False (OK)
            #          condition `i > 0 and ...`: False
            #          current_permutation = [1_a, 2]
            #          visited = [T, F, T]
            #          _backtrack_unique()
            #             ... [1_a, 2, 1_b] -> Add to result.
            #          (backtrack) current_permutation = [1_a], visited = [T, F, F]
            #
            # (backtrack) current_permutation = [], visited = [F, F, F]
            #
            # 1. First iteration (i=1, nums[1]=1_b):
            #    visited[1] = False (OK)
            #    `i > 0 and nums[i] == nums[i-1]`: True (nums[1]=1_b == nums[0]=1_a)
            #    `not visited[i-1]`: True (visited[0] is False, meaning 1_a was NOT chosen for THIS branch's first element)
            #    So, condition is `True and True` -> True. We SKIP. This is the key.
            #    We already explored paths starting with 1_a (e.g., 1_a, 1_b, 2).
            #    If we allowed 1_b to start a branch, we'd get (1_b, 1_a, 2), which is
            #    the same permutation as (1_a, 1_b, 2) when 1_a and 1_b are identical.
            #    By skipping, we ensure that if there are identical elements, say `X`,
            #    only the first `X` encountered (after sorting) will be used to start a new branch
            #    at a given `idx` in `current_permutation` if its preceding identical elements
            #    were not used.
            if i > 0 and nums[i] == nums[i-1] and not visited[i-1]:
                continue

            current_permutation.append(nums[i])
            visited[i] = True
            _backtrack_unique()
            visited[i] = False
            current_permutation.pop()

    _backtrack_unique()
    return result

# Alternative approach for distinct permutations (swap-based)
def permute_swap_based(nums: List[int]) -> List[List[int]]:
    """
    Generates all possible permutations of a list of distinct numbers using a swap-based
    backtracking approach.

    This method works by iterating through the elements from a `start` index to the end.
    For each element, it swaps it with the element at the `start` position,
    then recursively calls itself with `start + 1`. After the recursive call returns,
    it swaps them back to restore the original array state (backtracking).

    Example:
    permute_swap_based([1, 2, 3]) returns:
    [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]

    Args:
        nums: A list of distinct integers.

    Returns:
        A list of lists, where each inner list is a unique permutation of the input `nums`.

    Time Complexity: O(N * N!), similar to the `visited` array approach.
        There are N! permutations. For each permutation (at the base case),
        creating a copy of `nums` takes O(N).
    Space Complexity: O(N) for the recursion stack (depth of N), plus O(N * N!) for results.
        Auxiliary space O(N).
    """
    if not nums:
        return [[]]

    result: List[List[int]] = []
    # Create a mutable copy to perform swaps.
    nums_list = list(nums)

    def _backtrack_swap(start: int):
        # Base case: If `start` pointer reaches the end of the list,
        # a complete permutation has been formed. Add a copy to the result.
        if start == len(nums_list):
            result.append(list(nums_list))
            return

        # Recursive step: Iterate from `start` to the end of the list.
        for i in range(start, len(nums_list)):
            # 1. Choose: Swap the current element `nums_list[i]` with `nums_list[start]`.
            # This brings a new element to the current position being built.
            nums_list[start], nums_list[i] = nums_list[i], nums_list[start]

            # 2. Explore: Recurse for the next position (`start + 1`).
            _backtrack_swap(start + 1)

            # 3. Un-choose (Backtrack): Swap elements back to their original positions.
            # This restores the array to its state before the swap, allowing other branches
            # of the recursion tree to explore different choices.
            nums_list[start], nums_list[i] = nums_list[i], nums_list[start]

    _backtrack_swap(0)
    return result

# Note: permute_unique cannot be easily adapted to a swap-based approach
# without additional set-based checks for duplicate swaps at each level of recursion,
# which can make it less intuitive than the visited array + sort approach.
# For simplicity and clarity, the `visited` array approach is preferred for `permute_unique`.
```