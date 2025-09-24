```python
from typing import List, Tuple

def n_queens(n: int) -> List[List[int]]:
    """Solves the N-Queens problem using backtracking."""
    result = []
    board = [0] * n

    def is_safe(row, col):
        for prev_row in range(row):
            if board[prev_row] == col or \
               abs(board[prev_row] - col) == row - prev_row:
                return False
        return True

    def solve(row):
        if row == n:
            result.append(board[:])  # Add a copy of the solution
            return

        for col in range(n):
            if is_safe(row, col):
                board[row] = col
                solve(row + 1)

    solve(0)
    return result

def subsets(nums: List[int]) -> List[List[int]]:
    """Generates all subsets of a set using backtracking."""
    result = []
    subset = []

    def backtrack(index):
        result.append(subset[:])
        for i in range(index, len(nums)):
            subset.append(nums[i])
            backtrack(i + 1)
            subset.pop()  # Backtrack: remove the last element

    backtrack(0)
    return result


def permutations(nums: List[int]) -> List[List[int]]:
    """Generates all permutations of a list using backtracking."""
    result = []
    
    def backtrack(index):
        if index == len(nums):
            result.append(nums[:])
            return

        for i in range(index, len(nums)):
            nums[index], nums[i] = nums[i], nums[index]  # Swap
            backtrack(index + 1)
            nums[index], nums[i] = nums[i], nums[index]  # Backtrack: Swap back

    backtrack(0)
    return result


# Add Sudoku Solver and Combination Sum here (similar structure using backtracking)

```