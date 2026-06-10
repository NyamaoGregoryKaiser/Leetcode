"""
Helper utilities for the backtracking project.
"""

def is_palindrome(s: str) -> bool:
    """
    Checks if a given string is a palindrome.

    A string is a palindrome if it reads the same forwards and backwards.
    This helper is particularly useful for problems like Palindrome Partitioning.

    Args:
        s (str): The string to check.

    Returns:
        bool: True if the string is a palindrome, False otherwise.

    Time Complexity: O(L), where L is the length of the string.
                     We iterate through roughly half the string.
    Space Complexity: O(1), as we only use two pointers.
    """
    if not s:
        return True # An empty string is considered a palindrome

    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

def print_sudoku_board(board: list[list[str]]) -> None:
    """
    Prints a Sudoku board in a human-readable format.
    Useful for debugging and visualizing the Sudoku Solver output.

    Args:
        board (list[list[str]]): The 9x9 Sudoku board.
    """
    for i in range(9):
        if i % 3 == 0 and i != 0:
            print("- - - - - - - - - - - - ") # Separator for 3x3 blocks

        for j in range(9):
            if j % 3 == 0 and j != 0:
                print(" | ", end="") # Separator for 3x3 blocks
            
            # Print cell value, or space if empty
            print(board[i][j], end=" ")
        print() # New line after each row

def print_n_queens_board(board: list[str]) -> None:
    """
    Prints an N-Queens board configuration in a readable format.
    Useful for debugging and visualizing N-Queens solutions.

    Args:
        board (list[str]): A list of strings, where each string represents a row
                           of the board (e.g., "..Q.", ".Q..").
    """
    n = len(board)
    print("+" + "---+" * n)
    for row in board:
        print("|", end="")
        for cell in row:
            print(f" {cell} |", end="")
        print("\n+" + "---+" * n)

```