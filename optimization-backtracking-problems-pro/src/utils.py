# src/utils.py
# Helper utilities for the backtracking project.

def compare_list_of_lists(list1: list[list], list2: list[list]) -> bool:
    """
    Compares two lists of lists for equality, ignoring the order of inner lists.
    Assumes inner lists themselves are sorted or order-independent.
    Used primarily for comparing results from algorithms like subsets or combinations.
    """
    if len(list1) != len(list2):
        return False

    # Sort each inner list for canonical comparison
    sorted_list1 = [sorted(sublist) for sublist in list1]
    sorted_list2 = [sorted(sublist) for sublist in list2]

    # Sort the outer lists of sorted inner lists
    sorted_list1.sort()
    sorted_list2.sort()

    return sorted_list1 == sorted_list2

def pretty_print_n_queens_board(board: list[str]) -> None:
    """
    Prints an N-Queens board in a more readable format.
    """
    if not board:
        print("Empty board.")
        return

    n = len(board)
    print("+" + "---+" * n)
    for row_str in board:
        print("| " + " | ".join(list(row_str)) + " |")
        print("+" + "---+" * n)
    print()