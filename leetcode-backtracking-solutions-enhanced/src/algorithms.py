"""
Main algorithm implementations for Backtracking problems.
Each problem includes an optimal backtracking solution, detailed comments,
and time/space complexity analysis.
"""

from typing import List, Set, Tuple
from src.helpers import is_palindrome

class BacktrackingSolutions:

    def __init__(self):
        """
        Initializes the BacktrackingSolutions class.
        """
        pass

    # --- Problem 1: Permutations (LeetCode 46) ---
    def permutations(self, nums: List[int]) -> List[List[int]]:
        """
        Given an array nums of distinct integers, return all the possible permutations.

        Approach: Standard backtracking.
        We build a permutation one element at a time. At each step, we iterate
        through the available numbers (those not yet used in the current path).
        When a number is chosen, it's added to the current permutation and marked as used.
        The recursion then continues. When the current permutation's length equals
        the length of `nums`, a valid permutation is found and added to the results.
        After the recursive call returns, the chosen number is unmarked and removed
        from the current permutation to explore other branches (backtracking).

        Args:
            nums (List[int]): A list of distinct integers.

        Returns:
            List[List[int]]: A list of all possible unique permutations.

        Time Complexity: O(N * N!), where N is the number of elements in nums.
                         There are N! permutations. Each permutation takes O(N)
                         time to build (copying to result list, checking 'used' set/list).
                         The total number of nodes in the decision tree is approximately N * N!.
        Space Complexity: O(N) for the recursion stack depth, and O(N * N!) for
                          storing all the results. The auxiliary space for `path`
                          and `used` set/array is O(N).
        """
        results = []
        n = len(nums)
        # `used` array tracks which numbers have been included in the current permutation `path`.
        # `used[i]` is True if nums[i] is in the current permutation.
        used = [False] * n
        path = [] # The current permutation being built

        def backtrack(depth: int):
            # Base case: A complete permutation of length N has been formed.
            if depth == n:
                results.append(list(path)) # Add a copy of the current path to results
                return

            # Recursive step: Try adding each unused number to the current path.
            for i in range(n):
                if not used[i]:
                    # Choose: Add nums[i] to the path and mark it as used.
                    path.append(nums[i])
                    used[i] = True

                    # Explore: Recurse to build the rest of the permutation.
                    backtrack(depth + 1)

                    # Un-choose (Backtrack): Remove nums[i] from path and unmark it.
                    # This allows nums[i] to be used in other branches of the decision tree.
                    used[i] = False
                    path.pop()

        backtrack(0)
        return results

    # --- Problem 2: Combination Sum II (LeetCode 40) ---
    def combination_sum_ii(self, candidates: List[int], target: int) -> List[List[int]]:
        """
        Given a collection of candidate numbers (candidates) and a target number (target),
        find all unique combinations in candidates where the candidate numbers sum to target.
        Each number in candidates may only be used once in the combination.
        The solution set must not contain duplicate combinations.

        Approach: Backtracking with sorting and duplicate handling.
        1. Sort `candidates` to easily handle duplicates.
        2. In the `backtrack` function:
           - Base case: If `target_sum` is 0, a valid combination is found.
           - Pruning: If `target_sum` is negative, this path is invalid.
           - Iteration: Iterate through `candidates` starting from `start_index`.
           - Duplicate handling: To avoid duplicate combinations (e.g., [1,2] and [1,2] if `candidates` is [1,1,2]),
             if the current number `candidates[i]` is the same as the previous number `candidates[i-1]`
             AND `i > start_index` (meaning it's not the first element in the current recursive level),
             then skip `candidates[i]` to avoid generating redundant branches.
             `start_index` ensures that each number is used at most once in a specific combination.

        Args:
            candidates (List[int]): A list of numbers, possibly with duplicates.
            target (int): The target sum.

        Returns:
            List[List[int]]: A list of all unique combinations that sum to target.

        Time Complexity: O(2^N) in the worst case (similar to subset sum), where N is the number of candidates.
                         Sorting takes O(N log N). The pruning helps, but in cases with many small numbers
                         summing to target, it can still explore many paths.
        Space Complexity: O(N) for the recursion stack depth and O(target) for the `current_combination` path.
                          The result list can store up to O(2^N) combinations.
        """
        results = []
        # Sorting is crucial for effectively handling duplicates and for pruning.
        candidates.sort()
        path = [] # The current combination being built

        def backtrack(start_index: int, remaining_target: int):
            # Base cases
            if remaining_target == 0:
                results.append(list(path)) # Found a valid combination
                return
            if remaining_target < 0:
                return # Current path sum exceeds target, prune this branch

            # Explore: Iterate through candidates from start_index
            for i in range(start_index, len(candidates)):
                # Skip duplicates: If the current number is the same as the previous
                # AND it's not the very first element we're considering in this
                # specific recursive call's loop (i.e., not `i == start_index`),
                # then skip it to avoid duplicate combinations.
                if i > start_index and candidates[i] == candidates[i-1]:
                    continue

                # Choose: Add candidates[i] to the path.
                path.append(candidates[i])
                # Explore: Recurse with updated target and next index.
                # `i + 1` because each number can be used at most once.
                backtrack(i + 1, remaining_target - candidates[i])
                # Un-choose (Backtrack): Remove candidates[i] from the path.
                path.pop()

        backtrack(0, target)
        return results

    # --- Problem 3: N-Queens Problem (LeetCode 51) ---
    def n_queens(self, n: int) -> List[List[str]]:
        """
        Solve the N-Queens problem: place N non-attacking queens on an N x N chessboard.

        Approach: Backtracking with efficient conflict checking.
        We place one queen per row, from top to bottom. For each row, we try to place
        a queen in every column. Before placing, we check if the position is safe:
        1. No other queen in the same column.
        2. No other queen in the same main diagonal (row - col is constant).
        3. No other queen in the same anti-diagonal (row + col is constant).

        To efficiently check these conditions, we use hash sets:
        - `cols`: stores columns where queens are placed.
        - `diag1s`: stores `row - col` values for queens on main diagonals.
        - `diag2s`: stores `row + col` values for queens on anti-diagonals.

        Args:
            n (int): The size of the chessboard (N x N).

        Returns:
            List[List[str]]: A list of all distinct solutions. Each solution is
                             represented as a list of strings, where each string
                             is a row of the board (e.g., "..Q.", ".Q..").

        Time Complexity: The worst-case for N-Queens is difficult to precisely
                         bound and is closer to O(N!) than polynomial. It's often
                         described as O(N!). The constant factors are significantly
                         reduced by pruning.
        Space Complexity: O(N) for the recursion stack depth and for the three sets
                          (`cols`, `diag1s`, `diag2s`), each storing up to N elements.
                          The result list stores O(N_solutions * N) characters, where
                          N_solutions can be up to N!.
        """
        results = []
        # `board` will store the current configuration of queens as a list of strings.
        # Initialize an empty board with '.'
        board = [['.' for _ in range(n)] for _ in range(n)]

        # Sets for O(1) conflict checking
        cols = set()        # Stores column indices of placed queens
        diag1s = set()      # Stores (row - col) values for main diagonals
        diag2s = set()      # Stores (row + col) values for anti-diagonals

        def backtrack(row: int):
            # Base case: All N queens have been successfully placed.
            if row == n:
                # Add the current board configuration to results.
                # Convert list of lists of chars to list of strings.
                results.append(["".join(r) for r in board])
                return

            # Explore: Try placing a queen in each column of the current row.
            for col in range(n):
                # Check for conflicts using the sets.
                # If safe to place a queen at (row, col):
                if col not in cols and \
                   (row - col) not in diag1s and \
                   (row + col) not in diag2s:

                    # Choose: Place queen and update sets.
                    board[row][col] = 'Q'
                    cols.add(col)
                    diag1s.add(row - col)
                    diag2s.add(row + col)

                    # Explore: Recurse to place the next queen in the next row.
                    backtrack(row + 1)

                    # Un-choose (Backtrack): Remove queen and revert set changes.
                    board[row][col] = '.'
                    cols.remove(col)
                    diag1s.remove(row - col)
                    diag2s.remove(row + col)

        backtrack(0) # Start placing queens from row 0
        return results

    # --- Problem 4: Sudoku Solver (LeetCode 37) ---
    def sudoku_solver(self, board: List[List[str]]) -> None:
        """
        Solve a Sudoku puzzle by filling the empty cells in-place.
        Modifies the input board directly.

        Approach: Backtracking.
        The idea is to find an empty cell ('.'), try placing a valid digit (1-9) in it.
        If a digit works, recurse to the next empty cell. If the recursive call
        returns True (meaning a solution was found), then this path is valid.
        If no digit works for the current cell, or the recursive call returns False,
        then backtrack: reset the cell to '.' and try the next digit (or return False).

        Args:
            board (List[List[str]]): The 9x9 Sudoku board, where '.' indicates empty cells.
                                    This board will be modified in-place.

        Returns:
            None: The solution is placed directly into the input `board`.

        Time Complexity: O(9^(N*N)) in the worst-case for a general N x N Sudoku,
                         where N=9, so O(9^81). However, due to heavy pruning and
                         pre-filled cells, the actual complexity for typical Sudoku
                         puzzles is much, much faster. A tighter bound is often
                         difficult to define but it is exponential with respect to
                         the number of empty cells.
        Space Complexity: O(1) beyond the input board (as it's modified in-place)
                          for the sets used in `is_valid_placement`, and O(N*N)
                          for the recursion stack depth in the worst case (when almost
                          all cells are empty).
        """
        def is_valid_placement(row: int, col: int, num: str) -> bool:
            """
            Checks if placing 'num' at (row, col) is valid according to Sudoku rules.
            """
            # Check row
            for c in range(9):
                if board[row][c] == num:
                    return False
            # Check column
            for r in range(9):
                if board[r][col] == num:
                    return False
            # Check 3x3 subgrid
            start_row, start_col = (row // 3) * 3, (col // 3) * 3
            for r in range(start_row, start_row + 3):
                for c in range(start_col, start_col + 3):
                    if board[r][c] == num:
                        return False
            return True

        def backtrack() -> bool:
            """
            Recursive function to fill the Sudoku board.
            Returns True if a solution is found, False otherwise.
            """
            # Find the next empty cell
            for r in range(9):
                for c in range(9):
                    if board[r][c] == '.':
                        # Found an empty cell, try placing digits
                        for num_char in "123456789":
                            if is_valid_placement(r, c, num_char):
                                # Choose: Place the number
                                board[r][c] = num_char

                                # Explore: Recurse to fill the rest of the board
                                if backtrack():
                                    return True # A solution was found!

                                # Un-choose (Backtrack): If the recursive call didn't
                                # lead to a solution, undo the choice.
                                board[r][c] = '.'
                        # If no digit from 1-9 works for this cell,
                        # this path is invalid, so return False.
                        return False
            # If no empty cells are found, the board is solved.
            return True

        backtrack()

    # --- Problem 5: Palindrome Partitioning (LeetCode 131) ---
    def palindrome_partitioning(self, s: str) -> List[List[str]]:
        """
        Given a string s, partition s such that every substring of the partition is a palindrome.
        Return all possible palindrome partitioning of s.

        Approach: Backtracking.
        We iterate through all possible split points for the current substring.
        For each split point, we check if the substring from the `start_index`
        to the split point forms a palindrome.
        - If it's a palindrome, we add it to the `current_partition` and recursively
          call the `backtrack` function for the remaining part of the string.
        - After the recursive call, we backtrack by removing the palindrome
          from `current_partition` to explore other split options.

        Args:
            s (str): The input string.

        Returns:
            List[List[str]]: A list of all possible palindrome partitions.

        Time Complexity: O(N * 2^N), where N is the length of the string.
                         In the worst case, for a string like "aaaaa", there are
                         2^(N-1) ways to partition it. For each partition, checking
                         if a substring is a palindrome takes O(N) time.
                         Pre-computing palindromes with dynamic programming can
                         reduce `is_palindrome` checks to O(1), leading to a complexity
                         closer to O(2^N * N) if results are generated.
        Space Complexity: O(N) for the recursion stack depth and the `current_partition`
                          list. The result list can store up to O(2^N) partitions.
        """
        results = []
        path = [] # The current partition being built (list of palindrome substrings)
        n = len(s)

        def backtrack(start_index: int):
            # Base case: We have successfully partitioned the entire string.
            if start_index == n:
                results.append(list(path)) # Add a copy of the current partition
                return

            # Explore: Iterate through all possible end points for the current substring.
            # `end_index` is exclusive, so the substring is s[start_index : end_index + 1].
            for end_index in range(start_index, n):
                substring = s[start_index : end_index + 1]
                if is_palindrome(substring):
                    # Choose: Add the palindrome substring to the current partition.
                    path.append(substring)

                    # Explore: Recurse for the remaining part of the string.
                    # The next substring will start from `end_index + 1`.
                    backtrack(end_index + 1)

                    # Un-choose (Backtrack): Remove the substring to explore other partitions.
                    path.pop()

        backtrack(0) # Start partitioning from the beginning of the string (index 0)
        return results

```