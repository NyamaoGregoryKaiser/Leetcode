```python
import itertools
import copy

def n_queens(n):
    """Solves the N-Queens problem using backtracking."""
    solutions = []
    board = [0] * n  # Represents queen positions in each column

    def is_safe(row, col):
        # Check if there's a queen in the same column or diagonals
        for i in range(row):
            if board[i] == col or abs(board[i] - col) == row - i:
                return False
        return True

    def solve(row):
        if row == n:
            solutions.append(copy.deepcopy(board))
            return

        for col in range(n):
            if is_safe(row, col):
                board[row] = col
                solve(row + 1)

    solve(0)
    return solutions

def subsets(nums):
    """Generates all subsets of a set using backtracking."""
    subsets = []
    
    def backtrack(index, current_subset):
        subsets.append(current_subset.copy())
        for i in range(index, len(nums)):
            current_subset.append(nums[i])
            backtrack(i + 1, current_subset)
            current_subset.pop()
    
    backtrack(0, [])
    return subsets


def permutations(s):
    """Generates all unique permutations of a string."""
    result = []
    
    def backtrack(current_permutation, remaining_chars):
        if not remaining_chars:
            result.append("".join(current_permutation))
            return

        for i in range(len(remaining_chars)):
            backtrack(current_permutation + [remaining_chars[i]], remaining_chars[:i] + remaining_chars[i+1:])

    backtrack([], list(s))
    return result


# Add Sudoku Solver and Combination Sum here (similar structure to above)

```