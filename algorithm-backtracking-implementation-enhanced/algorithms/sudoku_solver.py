"""
Module for solving Sudoku puzzles using backtracking.

A Sudoku puzzle is to fill a 9x9 grid with digits such that each column,
each row, and each of the nine 3x3 subgrids (also called "boxes" or "blocks")
contain all of the digits from 1 to 9. The given board contains some filled
and some empty cells (represented by '.').
"""

from typing import List, Tuple

def solve_sudoku(board: List[List[str]]) -> bool:
    """
    Solves a Sudoku puzzle in-place using a backtracking approach.

    The function iterates through the cells of the board. If an empty cell ('.') is found,
    it tries to place digits from '1' to '9'. For each digit, it checks if placing it
    at the current cell is valid according to Sudoku rules. If valid, it places the digit
    and recursively calls itself to solve the rest of the board. If the recursive call
    returns True (meaning a solution was found), then this path is correct, and we return True.
    If the recursive call returns False (meaning no solution could be found from this path),
    it backtracks: removes the placed digit (resets to '.') and tries the next digit.
    If all digits '1'-'9' are tried for a cell and none lead to a solution, it returns False.

    Args:
        board: A 9x9 list of lists of strings representing the Sudoku board.
               Empty cells are denoted by ".". This board will be modified in-place.

    Returns:
        True if the Sudoku puzzle has been solved (board is modified in-place), False otherwise.

    Time Complexity: O(9^(N*N)), where N is the size of the board (9 in this case).
        In the worst case, for each empty cell, we might try up to 9 different digits.
        The number of empty cells could be up to N*N. This is a very loose upper bound.
        A tighter bound is hard to calculate due to effective pruning.
        A more practical upper bound for a typical 9x9 Sudoku is around O(9^E),
        where E is the number of empty cells.
        Each `_is_valid` check takes O(N).
    Space Complexity: O(N*N) for the recursion stack (depth can be up to N*N empty cells),
        if we consider the board itself as input, the auxiliary space is minimal.
    """
    # Find the next empty cell (row, col)
    find = _find_empty(board)
    if not find:
        # If no empty cell is found, the board is solved.
        return True
    else:
        row, col = find

    # Try digits '1' through '9' for the empty cell
    for i in range(1, 10):
        char_to_place = str(i)
        if _is_valid(board, row, col, char_to_place):
            # 1. Choose: Place the digit
            board[row][col] = char_to_place

            # 2. Explore: Recurse to solve the rest of the board
            if solve_sudoku(board):
                return True # If recursive call finds a solution, propagate True

            # 3. Un-choose (Backtrack): If the recursive call didn't find a solution,
            #    remove the digit and try the next one.
            board[row][col] = "." # Reset the cell to empty

    # If no digit ('1'-'9') leads to a solution for this cell,
    # then the current path is invalid.
    return False

def _find_empty(board: List[List[str]]) -> Tuple[int, int] | None:
    """
    Finds the next empty cell (represented by '.') on the Sudoku board.

    Args:
        board: The current state of the Sudoku board.

    Returns:
        A tuple (row, col) of the first empty cell found, or None if no empty cells remain.
    """
    for r in range(9):
        for c in range(9):
            if board[r][c] == ".":
                return (r, c)
    return None

def _is_valid(board: List[List[str]], row: int, col: int, char: str) -> bool:
    """
    Checks if placing `char` at `(row, col)` is valid according to Sudoku rules.

    Args:
        board: The current state of the Sudoku board.
        row: The row index (0-8) to check.
        col: The column index (0-8) to check.
        char: The character ('1'-'9') to validate.

    Returns:
        True if placing `char` at `(row, col)` is valid, False otherwise.
    """
    # Check row
    for c in range(9):
        if board[row][c] == char and c != col:
            return False

    # Check column
    for r in range(9):
        if board[r][col] == char and r != row:
            return False

    # Check 3x3 box
    # Determine the top-left corner of the 3x3 box the cell (row, col) belongs to.
    box_start_row = (row // 3) * 3
    box_start_col = (col // 3) * 3

    for r in range(box_start_row, box_start_row + 3):
        for c in range(box_start_col, box_start_col + 3):
            if board[r][c] == char and (r, c) != (row, col):
                return False

    return True
```