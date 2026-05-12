"""
Helper utilities for displaying data, especially relevant for N-Queens.
"""

from typing import List

def print_n_queens_board(board: List[str], solution_number: int = None):
    """
    Prints a single N-Queens board in a readable format.

    Args:
        board (List[str]): A list of strings, where each string represents a row
                           of the chessboard (e.g., [".Q..", "...Q", ...]).
        solution_number (int, optional): An optional number to label the solution.
    """
    if not board:
        print("Empty board (N=0 solution).")
        return

    n = len(board)
    if solution_number is not None:
        print(f"Solution {solution_number}:")

    # Print top border
    print("+" + "---+" * n)

    # Print each row
    for row_str in board:
        row_display = ""
        for cell in row_str:
            row_display += f" {cell} |"
        print("|" + row_display)
        print("+" + "---+" * n)

def print_n_queens_solutions(solutions: List[List[str]]):
    """
    Prints multiple N-Queens board solutions.

    Args:
        solutions (List[List[str]]): A list of N-Queens board configurations.
    """
    if not solutions:
        print("No solutions found.")
        return

    print(f"Total N-Queens Solutions: {len(solutions)}")
    if len(solutions) > 5: # Limit printing for very large N to avoid excessive output
        print(f"Showing first 5 solutions (out of {len(solutions)} total):")
        solutions_to_display = solutions[:5]
    else:
        solutions_to_display = solutions

    for i, sol in enumerate(solutions_to_display):
        print_n_queens_board(sol, i + 1)
    
    if len(solutions) > 5:
        print("\n...")


if __name__ == '__main__':
    # Example usage:
    board_4_1 = [".Q..", "...Q", "Q...", "..Q."]
    board_4_2 = ["..Q.", "Q...", "...Q", ".Q.."]
    
    print("--- Example N-Queens Board Printing ---")
    print_n_queens_board(board_4_1, 1)
    print_n_queens_board(board_4_2, 2)

    all_4_solutions = [board_4_1, board_4_2]
    print("\n--- Example Multiple N-Queens Solutions Printing ---")
    print_n_queens_solutions(all_4_solutions)

    # Test with an empty board
    print("\n--- Empty Board Test ---")
    print_n_queens_board([])

    # Test with no solutions
    print("\n--- No Solutions Test ---")
    print_n_queens_solutions([])

    # Example of many solutions (mock for demonstration)
    many_solutions_mock = [board_4_1, board_4_2, board_4_1, board_4_2, board_4_1, board_4_2]
    print("\n--- Many Solutions Mock Test ---")
    print_n_queens_solutions(many_solutions_mock)