"""
Problem: N-Queens

The N-Queens puzzle is the problem of placing N non-attacking queens on an N×N chessboard.
This means no two queens share the same row, column, or diagonal.
Given an integer `n`, return all distinct solutions to the N-Queens puzzle.
Each solution contains a distinct board configuration of the N queens' placement,
where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.

Example 1:
Input: n = 4
Output:
[[".Q..", "...Q", "Q...", "..Q."],
 ["..Q.", "Q...", "...Q", ".Q.."]]

Example 2:
Input: n = 1
Output: [["Q"]]

Constraints:
1 <= n <= 9
"""

from typing import List

def solve_n_queens(n: int) -> List[List[str]]:
    """
    Solves the N-Queens puzzle using backtracking.

    The problem can be framed as placing one queen per row. For each row, we try to
    place a queen in a valid column. If a placement is valid, we move to the next row.
    If no valid column is found for the current row, we backtrack.

    Algorithm:
    1. Initialize `solutions` as an empty list to store all valid board configurations.
    2. Initialize `board` as a list of strings, where each string represents a row
       (e.g., `["." * n]` for an empty board).
       Alternatively, maintain sets for `cols_occupied`, `diag1_occupied`, `diag2_occupied`
       to quickly check for safety.
       - `cols_occupied`: Stores column indices where a queen is placed.
       - `diag1_occupied`: Stores `row - col` values for queens on this diagonal (top-left to bottom-right).
       - `diag2_occupied`: Stores `row + col` values for queens on this diagonal (top-right to bottom-left).
    3. Define a recursive helper function `backtrack(row)`:
       a. Base Case: If `row == n`, it means N queens have been successfully placed.
          Convert the current `board` state into the required string format and add it to `solutions`. Then return.
       b. Recursive Step: Iterate through each column `col` from `0` to `n-1` for the current `row`:
          i. **Check Safety**: Determine if placing a queen at `(row, col)` is safe (i.e., it doesn't attack
             any previously placed queens). This check is efficient using the sets:
             - `col` not in `cols_occupied`
             - `row - col` not in `diag1_occupied`
             - `row + col` not in `diag2_occupied`
          ii. If safe:
              - **Choose**: Place the queen at `(row, col)`:
                - Update `board` (e.g., `board[row][col] = 'Q'`).
                - Add `col`, `row - col`, `row + col` to their respective occupied sets.
              - **Explore**: Recursively call `backtrack(row + 1)` to place the next queen.
              - **Un-choose (Backtrack)**: Remove the queen from `(row, col)`:
                - Reset `board` (e.g., `board[row][col] = '.'`).
                - Remove `col`, `row - col`, `row + col` from their respective occupied sets.
             This step is crucial to explore other possibilities.
    4. Start the backtracking process by calling `backtrack(0)` (starting from the first row).

    Time Complexity: O(N!) - Roughly
        - The upper bound for N-Queens is often cited as O(N!), not N^N. This is because at each step (row),
          we significantly prune the search space. In the first row, there are N choices. In the second, at most N-2 (one column and two diagonals are blocked), etc.
        - The number of actual solutions `S(N)` grows very fast, but is much less than N^N. For N=8, S(8)=92. For N=9, S(9)=352.
        - The recursive calls explore a search tree. The depth of the tree is N. In the worst case, we might visit
          a large portion of the `N!` possible placements if we only check constraints at the end.
          However, with effective pruning (checking safety at each step), the complexity is closer to O(N!)
          because the number of valid partial solutions decreases rapidly.
        - Building a board string from the internal representation for each solution takes O(N^2). So, total
          time complexity can be more accurately described as O(N! * N^2) or even tighter bounds in specific analyses.

    Space Complexity: O(N^2)
        - O(N) for the recursion stack depth.
        - O(N) for the `cols_occupied`, `diag1_occupied`, `diag2_occupied` sets.
        - O(N^2) for the internal `board` representation (e.g., list of lists of chars).
        - The `solutions` list stores `S(N)` boards, each O(N^2) size, so total output space is O(S(N) * N^2).
          Auxiliary space is O(N^2).
    """
    solutions: List[List[str]] = []
    
    # Using sets for O(1) average time complexity for add/remove/check operations
    cols_occupied = set()           # Stores column indices of placed queens
    diag1_occupied = set()          # Stores (row - col) for placed queens (top-left to bottom-right diagonal)
    diag2_occupied = set()          # Stores (row + col) for placed queens (top-right to bottom-left diagonal)

    # `board` will store the current configuration during backtracking.
    # It's a list of strings where board[row] represents the row.
    # Initialize with '.' representing empty squares.
    board = [['.' for _ in range(n)] for _ in range(n)]

    def backtrack(row: int):
        # Base case: All N queens have been successfully placed
        if row == n:
            # Convert the current board (list of lists of chars) to the required
            # list of strings format and add to solutions.
            current_solution = ["".join(row_chars) for row_chars in board]
            solutions.append(current_solution)
            return

        # Iterate through all possible columns in the current row
        for col in range(n):
            # Check if placing a queen at (row, col) is safe
            # A position is safe if no other queen is in the same column,
            # or on either of the two diagonals.
            if (col in cols_occupied or
                (row - col) in diag1_occupied or
                (row + col) in diag2_occupied):
                continue # This position is attacked, try next column

            # If safe:
            # 1. Choose: Place the queen
            board[row][col] = 'Q'
            cols_occupied.add(col)
            diag1_occupied.add(row - col)
            diag2_occupied.add(row + col)

            # 2. Explore: Recurse to place the queen in the next row
            backtrack(row + 1)

            # 3. Un-choose (Backtrack): Remove the queen and revert changes
            # This is essential to explore other placement possibilities for the current row.
            board[row][col] = '.'
            cols_occupied.remove(col)
            diag1_occupied.remove(row - col)
            diag2_occupied.remove(row + col)

    # Start the backtracking process from the first row (row 0)
    backtrack(0)
    return solutions

# Helper function to print a board for visualization (optional)
def print_board(board: List[str]):
    if not board:
        print("Empty board.")
        return
    print("-" * (len(board[0]) + 2))
    for row_str in board:
        print(f"|{row_str}|")
    print("-" * (len(board[0]) + 2))

if __name__ == '__main__':
    # Test cases
    print("N-Queens solutions for n = 4:")
    sols_4 = solve_n_queens(4)
    for i, sol in enumerate(sols_4):
        print(f"Solution {i+1}:")
        print_board(sol)
    # Expected: 2 solutions

    print("\nN-Queens solutions for n = 1:")
    sols_1 = solve_n_queens(1)
    for i, sol in enumerate(sols_1):
        print(f"Solution {i+1}:")
        print_board(sol)
    # Expected: 1 solution

    print("\nN-Queens solutions for n = 2:")
    sols_2 = solve_n_queens(2)
    print(f"Number of solutions: {len(sols_2)}")
    for i, sol in enumerate(sols_2):
        print(f"Solution {i+1}:")
        print_board(sol)
    # Expected: 0 solutions

    print("\nN-Queens solutions for n = 3:")
    sols_3 = solve_n_queens(3)
    print(f"Number of solutions: {len(sols_3)}")
    for i, sol in enumerate(sols_3):
        print(f"Solution {i+1}:")
        print_board(sol)
    # Expected: 0 solutions

    print("\nN-Queens solutions for n = 8:")
    sols_8 = solve_n_queens(8)
    print(f"Number of solutions: {len(sols_8)}")
    # Expected: 92 solutions. (Too many to print here, just count)

    print("\nN-Queens solutions for n = 0 (Edge case):")
    sols_0 = solve_n_queens(0)
    print(f"Number of solutions: {len(sols_0)}")
    print(f"Solutions: {sols_0}")
    # Expected: [[]] (An empty board is technically a valid placement of 0 queens)