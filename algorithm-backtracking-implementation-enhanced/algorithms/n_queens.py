"""
Module for solving the N-Queens problem.

The N-Queens puzzle is the problem of placing N non-attacking queens on an N×N chessboard,
such that no two queens attack each other.
"""

from typing import List, Set

def solve_n_queens(n: int) -> List[List[str]]:
    """
    Solves the N-Queens problem to find all distinct solutions.

    A queen can attack horizontally, vertically, and diagonally.
    To ensure no two queens attack each other, we need to make sure:
    1. No two queens are in the same column.
    2. No two queens are in the same row (this is naturally handled by placing one queen per row).
    3. No two queens are on the same main diagonal (row - col is constant).
    4. No two queens are on the same anti-diagonal (row + col is constant).

    The backtracking approach places queens row by row. For each row, it tries to place a queen
    in every possible column. Before placing, it checks if the position is safe using sets
    to efficiently keep track of occupied columns, main diagonals, and anti-diagonals.

    Example:
    solve_n_queens(4) returns 2 solutions.
    Solution 1:
     . Q . .
     . . . Q
     Q . . .
     . . Q .
    Solution 2:
     . . Q .
     Q . . .
     . . . Q
     . Q . .

    Args:
        n: The size of the chessboard (N x N).

    Returns:
        A list of lists of strings, where each inner list represents a unique
        N-Queens solution. Each string in the inner list is a row of the board,
        with 'Q' for a queen and '.' for an empty square.

    Time Complexity: O(N!) in the worst case.
        Although it's more accurately bounded by O(N!), due to pruning, it's significantly
        faster than O(N^N) (trying all squares).
        For each solution, formatting the board takes O(N^2). Since there can be
        up to N! solutions, the overall time is roughly O(N^2 * N!).
        However, the effective number of nodes visited is much smaller due to pruning.
    Space Complexity: O(N) for recursion stack depth and the sets (col_set, diag1_set, diag2_set).
        Plus O(N^2 * N!) for storing the results (list of boards). Auxiliary space O(N).
    """
    if n <= 0:
        return []

    result: List[List[str]] = []
    # `board` stores the column index of the queen in each row.
    # board[row] = col means a queen is at (row, col).
    current_board_state: List[int] = [-1] * n

    # Sets to keep track of occupied columns and diagonals for O(1) lookups.
    col_set: Set[int] = set()       # Stores column indices
    diag1_set: Set[int] = set()     # Stores (row - col) for main diagonals
    diag2_set: Set[int] = set()     # Stores (row + col) for anti-diagonals

    def _backtrack(row: int):
        # Base case: If all N queens have been placed (i.e., we are trying to place
        # a queen in a row beyond the board's bounds), then a solution has been found.
        if row == n:
            result.append(_format_board(current_board_state, n))
            return

        # Recursive step: Try placing a queen in each column of the current `row`.
        for col in range(n):
            # Check if it's safe to place a queen at (row, col).
            # It's safe if no queen is in the same column, main diagonal, or anti-diagonal.
            if col not in col_set and \
               (row - col) not in diag1_set and \
               (row + col) not in diag2_set:

                # 1. Choose: Place the queen.
                current_board_state[row] = col
                col_set.add(col)
                diag1_set.add(row - col)
                diag2_set.add(row + col)

                # 2. Explore: Recurse to place the queen in the next row.
                _backtrack(row + 1)

                # 3. Un-choose (Backtrack): Remove the queen.
                # This restores the state for exploring other column choices in the current row.
                col_set.remove(col)
                diag1_set.remove(row - col)
                diag2_set.remove(row + col)
                current_board_state[row] = -1 # Optional: reset to -1 or None for clarity

    _backtrack(0) # Start placing queens from row 0
    return result

def _format_board(board_state: List[int], n: int) -> List[str]:
    """
    Formats a given board state (list of queen column positions) into a list of strings
    representing the chessboard, with 'Q' for a queen and '.' for an empty square.

    Args:
        board_state: A list where `board_state[row]` is the column of the queen in that row.
        n: The size of the board.

    Returns:
        A list of strings, each representing a row of the formatted chessboard.
    """
    formatted_board: List[str] = []
    for row in range(n):
        row_string = ["."] * n
        col_of_queen = board_state[row]
        if col_of_queen != -1: # Ensure a queen was actually placed in this row
            row_string[col_of_queen] = "Q"
        formatted_board.append(" ".join(row_string)) # Join with space for readability
    return formatted_board

def print_board(board: List[str]):
    """
    Prints a formatted N-Queens board to the console.

    Args:
        board: A list of strings, where each string is a row of the board.
    """
    for row_str in board:
        print(row_str)
```