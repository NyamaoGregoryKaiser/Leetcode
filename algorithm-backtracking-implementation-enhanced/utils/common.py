from typing import List

def print_board(board: List[List[str]]):
    """
    Prints a 9x9 Sudoku board or similar grid-like structure in a formatted way.

    Args:
        board: A list of lists of strings representing the grid.
    """
    for i, row in enumerate(board):
        if i % 3 == 0 and i != 0:
            print("- - - - - - - - - - - - ")

        for j, char in enumerate(row):
            if j % 3 == 0 and j != 0:
                print(" | ", end="")
            
            # Print last character in row without space
            if j == 8:
                print(char)
            else:
                print(char + " ", end="")
```