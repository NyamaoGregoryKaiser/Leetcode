# src/backtracking_problems.py
# Core implementations of various backtracking problems.

from typing import List

class BacktrackingSolutions:
    """
    A collection of backtracking algorithms for common interview problems.
    Each method includes detailed comments, time/space complexity analysis.
    """

    def subsets(self, nums: List[int]) -> List[List[int]]:
        """
        Problem: Subsets (Power Set)
        Given an integer array nums of unique elements, return all possible subsets (the power set).
        The solution set must not contain duplicate subsets. Return the solution in any order.

        Example:
            nums = [1,2,3]
            Output: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]

        Approach: Backtracking (Decision Tree)
        At each element, we have two choices:
        1. Include the element in the current subset.
        2. Exclude the element from the current subset.

        We build up a current subset as we traverse, and add it to the results
        list when we've considered all elements.

        Time Complexity: O(2^N * N)
            - There are 2^N total subsets.
            - For each subset, copying it to the result list takes O(N) time in the worst case
              (when the subset contains all N elements).
            - The recursive calls themselves without copying would be O(2^N).

        Space Complexity: O(N)
            - O(N) for the recursion stack depth (max N calls).
            - O(N) for storing the current_subset in the worst case.
            - Does NOT include the space for the output list (which is O(2^N * N)).
        """
        results = []
        current_subset = []
        n = len(nums)

        def backtrack(index):
            # Base case: We've considered all elements.
            # Add the current subset to our results.
            results.append(list(current_subset)) # Make a copy, as current_subset will change.

            # Recursive step: Explore choices for elements from 'index' onwards.
            for i in range(index, n):
                # Choice 1: Include nums[i]
                current_subset.append(nums[i])
                # Recurse with the next element (i+1)
                backtrack(i + 1)
                # Backtrack: Undo the choice (remove nums[i]) to explore other paths
                current_subset.pop()

        backtrack(0)
        return results

    def permutations(self, nums: List[int]) -> List[List[int]]:
        """
        Problem: Permutations
        Given an array nums of distinct integers, return all possible permutations.
        You can return the answer in any order.

        Example:
            nums = [1,2,3]
            Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

        Approach: Backtracking (State Management - Visited Array)
        At each step, we iterate through the numbers available. If a number hasn't
        been used yet, we add it to the current permutation, mark it as used,
        and recurse. After the recursive call, we backtrack by removing the number
        and marking it as unused.

        Time Complexity: O(N! * N)
            - There are N! permutations.
            - For each permutation, building it takes O(N) operations (N appends/removals).
            - Copying to results also takes O(N).

        Space Complexity: O(N)
            - O(N) for the recursion stack depth.
            - O(N) for `current_permutation` list.
            - O(N) for `visited` array/set.
            - Does NOT include the space for the output list (which is O(N! * N)).
        """
        results = []
        current_permutation = []
        n = len(nums)
        visited = [False] * n # To keep track of used elements

        def backtrack():
            # Base case: If the current_permutation is complete (length N)
            if len(current_permutation) == n:
                results.append(list(current_permutation))
                return

            # Recursive step: Try to add each number from nums
            for i in range(n):
                # If nums[i] has not been used yet
                if not visited[i]:
                    # Choice: Include nums[i]
                    current_permutation.append(nums[i])
                    visited[i] = True

                    # Recurse
                    backtrack()

                    # Backtrack: Undo the choice
                    visited[i] = False
                    current_permutation.pop()

        backtrack()
        return results

    def combination_sum_ii(self, candidates: List[int], target: int) -> List[List[int]]:
        """
        Problem: Combination Sum II
        Given a collection of candidate numbers (`candidates`) and a target number (`target`),
        find all unique combinations in `candidates` where the candidate numbers sum to `target`.
        Each number in `candidates` may only be used once in the combination.
        The solution set must not contain duplicate combinations.

        Example:
            candidates = [10,1,2,7,6,1,5], target = 8
            Output: [[1,1,6], [1,2,5], [1,7], [2,6]]

        Approach: Backtracking with Pruning and Duplicate Handling
        1. Sort `candidates`: This is crucial for efficiently handling duplicates.
        2. Backtrack function:
           - Parameters: `remaining_target`, `start_index`, `current_combination`.
           - Base Cases:
             - `remaining_target == 0`: Found a valid combination, add it to results.
             - `remaining_target < 0`: Current path is invalid, prune.
           - Recursive Step: Iterate from `start_index`.
             - Skip duplicates: If `i > start_index` and `candidates[i] == candidates[i-1]`,
               then `candidates[i]` has already been considered as the starting element
               for combinations from `candidates[i-1]` in the previous iteration of the loop.
               Skipping prevents duplicate combinations.
             - Include `candidates[i]`: Add it to `current_combination`,
               recursively call with `remaining_target - candidates[i]` and `start_index = i + 1`
               (because each number can only be used once).
             - Backtrack: Remove `candidates[i]`.

        Time Complexity: O(2^N) in the worst case (similar to subsets, but with pruning).
            - The search space can be up to 2^N. Sorting takes O(N log N).
            - Copying combination takes O(N).
            - Tighter bound is often cited as O(N * 2^N) or O(N * 2^N + N log N) for sorting.

        Space Complexity: O(N)
            - O(N) for recursion stack depth.
            - O(N) for `current_combination`.
            - Does NOT include the space for the output list.
        """
        results = []
        current_combination = []
        # Crucial step: Sort candidates to handle duplicates and make pruning easier.
        candidates.sort()
        n = len(candidates)

        def backtrack(remaining_target, start_index):
            # Base Case 1: Target reached
            if remaining_target == 0:
                results.append(list(current_combination))
                return
            # Base Case 2: Target exceeded or no more candidates
            if remaining_target < 0:
                return

            # Recursive Step: Explore candidates from start_index
            for i in range(start_index, n):
                # Skip duplicates: If the current number is the same as the previous one
                # AND it's not the first element in the current iteration (i.e., it's a true duplicate choice)
                # we skip it to avoid duplicate combinations.
                if i > start_index and candidates[i] == candidates[i-1]:
                    continue

                # Pruning: If candidate[i] is greater than remaining_target,
                # then all subsequent candidates (since sorted) will also be too large.
                # So, we can stop exploring this path.
                if candidates[i] > remaining_target:
                    break

                # Choice: Include candidates[i]
                current_combination.append(candidates[i])
                # Recurse: Move to the next index (i+1) because each number can be used once.
                backtrack(remaining_target - candidates[i], i + 1)
                # Backtrack: Undo the choice
                current_combination.pop()

        backtrack(target, 0)
        return results

    def n_queens(self, n: int) -> List[List[str]]:
        """
        Problem: N-Queens
        The n-queens puzzle is the problem of placing n non-attacking queens on
        an `n x n` chessboard. Given an integer `n`, return all distinct solutions
        to the n-queens puzzle. Each solution contains a distinct board configuration
        of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and
        an empty space, respectively.

        Example for N=4:
            Output: [[".Q..","...Q","Q...","..Q."], ["..Q.","Q...","...Q",".Q.."]]

        Approach: Backtracking
        We place one queen per row. For each row, we try to place a queen in each column.
        Before placing, we check if the position is safe (no conflicts with previously
        placed queens). If safe, we place the queen, move to the next row, and backtrack.
        If not safe or no more columns in the current row work, we backtrack.

        State Representation:
        A list `board_state` where `board_state[row]` stores the column index
        where the queen is placed in that `row`.
        e.g., `board_state = [1, 3, 0, 2]` for N=4 means:
        Row 0: Queen at col 1 (0-indexed)
        Row 1: Queen at col 3
        Row 2: Queen at col 0
        Row 3: Queen at col 2

        Conflict Check (`is_safe`):
        A queen at `(row1, col1)` attacks a queen at `(row2, col2)` if:
        1. `col1 == col2` (same column)
        2. `abs(row1 - row2) == abs(col1 - col2)` (same diagonal)

        Time Complexity: O(N!)
            - In the worst case, we explore up to N! permutations of queen placements.
            - For each placement, `is_safe` takes O(N) time.
            - More precisely, it's closer to O(N!) * N (for conflict check) * N (for board construction).
            - The actual number of nodes in the search tree is much less than N^N due to pruning,
              but N! is a common upper bound approximation.

        Space Complexity: O(N)
            - O(N) for recursion stack depth (N rows).
            - O(N) for `board_state` list.
            - Does NOT include the space for the output list (which is O(N * N * num_solutions)).
        """
        results = []
        # board_state[row] = column_index of the queen in that row.
        board_state = [-1] * n # Initialize with -1, indicating no queen placed yet.

        def is_safe(row: int, col: int) -> bool:
            """
            Checks if placing a queen at (row, col) is safe with
            queens already placed in previous rows.
            """
            # Iterate through previously placed queens (from row 0 to row - 1)
            for prev_row in range(row):
                prev_col = board_state[prev_row]

                # Check for column conflict
                if prev_col == col:
                    return False

                # Check for diagonal conflict (abs(row diff) == abs(col diff))
                if abs(prev_row - row) == abs(prev_col - col):
                    return False
            return True

        def build_board_representation() -> List[str]:
            """
            Converts the internal `board_state` into the desired string list format.
            """
            board_representation = []
            for r in range(n):
                row_str_list = ['.'] * n
                col_of_queen = board_state[r]
                if col_of_queen != -1: # Should always be a queen if a solution is found
                    row_str_list[col_of_queen] = 'Q'
                board_representation.append("".join(row_str_list))
            return board_representation

        def backtrack(row: int):
            # Base Case: All queens are placed (reached beyond the last row)
            if row == n:
                results.append(build_board_representation())
                return

            # Recursive Step: Try to place a queen in the current row (row)
            # Iterate through all possible columns for the current row
            for col in range(n):
                if is_safe(row, col):
                    # Choice: Place queen at (row, col)
                    board_state[row] = col
                    # Recurse for the next row
                    backtrack(row + 1)
                    # Backtrack: Remove queen (reset board_state for current row)
                    board_state[row] = -1 # Or not strictly necessary as it will be overwritten

        backtrack(0) # Start placing queens from row 0
        return results