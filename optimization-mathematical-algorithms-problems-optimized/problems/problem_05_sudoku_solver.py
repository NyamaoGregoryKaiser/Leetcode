"""
Problem 05: Sudoku Solver (Backtracking)

Write a program to solve a Sudoku puzzle by filling the empty cells.

A Sudoku board can be represented as a 9x9 2D list of integers.
Empty cells are represented by 0.

Rules for a valid Sudoku solution:
1.  Each row must contain the digits 1-9 without repetition.
2.  Each column must contain the digits 1-9 without repetition.
3.  Each of the nine 3x3 sub-grids (boxes) must contain the digits 1-9 without repetition.

The input board is guaranteed to have only one unique solution.
The board will contain digits '1'-'9' (or integers 1-9) and '.' (or 0) for empty cells.

Example Input (as 2D list of integers, 0 for empty):
board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

Example Output (solved board):
[
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
]
"""

class SudokuSolver:
    """
    A class to encapsulate the Sudoku solving logic using backtracking.
    """
    def __init__(self):
        # A 9x9 board is represented as a list of lists (integers 0-9).
        self.board = None

    def _is_valid(self, num: int, row: int, col: int) -> bool:
        """
        Checks if placing `num` at `(row, col)` is valid according to Sudoku rules.
        """
        # Check row
        for x in range(9):
            if self.board[row][x] == num:
                return False

        # Check column
        for x in range(9):
            if self.board[x][col] == num:
                return False

        # Check 3x3 box
        start_row = row - row % 3
        start_col = col - col % 3
        for i in range(3):
            for j in range(3):
                if self.board[i + start_row][j + start_col] == num:
                    return False
        return True

    def _find_empty(self) -> tuple[int, int] | None:
        """
        Finds the next empty cell (represented by 0) on the board.
        Returns (row, col) tuple if found, otherwise None.
        """
        for r in range(9):
            for c in range(9):
                if self.board[r][c] == 0:
                    return (r, c)
        return None

    def solve(self, board: list[list[int]]) -> bool:
        """
        Main function to solve the Sudoku puzzle using backtracking.
        Modifies the input `board` in place.

        Algorithm: Backtracking
        1. Set the current `self.board` to the input `board`.
        2. Find the next empty cell `(row, col)`.
        3. If no empty cell is found, the board is solved. Return `True`.
        4. Try placing digits 1-9 in the empty cell `(row, col)`:
            a. For each digit `d` from 1 to 9:
                i. If placing `d` at `(row, col)` is valid (using `_is_valid`):
                    1. Place `d`: `self.board[row][col] = d`.
                    2. Recursively call `solve(self.board)` (implicitly, as it operates on `self.board`).
                    3. If the recursive call returns `True` (meaning a solution was found down that path):
                        1. Return `True`.
                ii. If `solve` returns `False`, or `d` was not valid:
                    1. Backtrack: Reset `self.board[row][col] = 0` (empty the cell).
        5. If no digit from 1-9 leads to a solution for the current empty cell, return `False`.

        Time Complexity: This is difficult to precisely quantify for Sudoku.
                         In the worst case, it can be exponential (e.g., trying all 9^81 possibilities),
                         but with pruning from the `_is_valid` checks, it's significantly faster.
                         A common heuristic for 9x9 Sudoku is roughly O(9^k) where k is the number of empty cells,
                         but usually much better due to heavy pruning (e.g., closer to O(k^m) where m is much smaller than k).
                         For typical Sudoku, it's efficient enough to run quickly.
        Space Complexity: O(1) for the board itself (modifies in place).
                          O(E) for the recursion stack, where E is the number of empty cells on the board.
        """
        self.board = board
        empty_pos = self._find_empty()

        if not empty_pos: # No empty cells, board is solved
            return True

        row, col = empty_pos

        for num in range(1, 10):
            if self._is_valid(num, row, col):
                self.board[row][col] = num # Place the number
                if self.solve(self.board): # Recurse
                    return True
                self.board[row][col] = 0 # Backtrack: Reset if solution not found
        return False # No number worked for this empty cell

    def get_solved_board(self) -> list[list[int]]:
        """
        Returns the solved board. Should be called after `solve()`.
        """
        return self.board

# Helper function to print a Sudoku board clearly
def print_board(board: list[list[int]]):
    for i in range(9):
        if i % 3 == 0 and i != 0:
            print("- - - - - - - - - - - - ")

        for j in range(9):
            if j % 3 == 0 and j != 0:
                print(" | ", end="")

            if j == 8:
                print(board[i][j])
            else:
                print(str(board[i][j]) + " ", end="")

# --- Interview Tips & Variations ---
# 1. Input Format: Clarify if input is list of lists of ints or chars (e.g., '1'-'9' and '.').
#    Our solution uses integers (0 for empty).
# 2. Multiple Solutions: If there can be multiple solutions, how to handle?
#    - Return all solutions (requires modifying backtracking to collect solutions rather than returning True).
#    - Return just one (current approach).
# 3. Optimization (Constraint Propagation): Can significantly speed up solving, especially for harder puzzles.
#    - Pre-processing: Count initial candidates for each cell.
#    - "Naked Singles", "Hidden Singles": These are deterministic steps that reduce search space.
#    - Could implement techniques like "Dancing Links" (Knuth's Algorithm X) for extremely efficient solving,
#      but this is usually too advanced for a standard interview.
# 4. Data Structures for `_is_valid`: Instead of iterating through rows/columns/boxes every time,
#    you can use sets/bitmasks to track available numbers in each row, column, and 3x3 box.
#    This makes `_is_valid` O(1) (or very close), improving constant factors.
#    Example:
#    `rows_sets = [set() for _ in range(9)]`
#    `cols_sets = [set() for _ in range(9)]`
#    `boxes_sets = [set() for _ in range(9)]` (map (row, col) to box index: `(row // 3) * 3 + (col // 3)`)
#    Initialize these sets with existing numbers. When placing a number, add to sets; when backtracking, remove.
#    This is a significant optimization.

# Example with optimized _is_valid using sets:
class OptimizedSudokuSolver(SudokuSolver):
    def __init__(self, board: list[list[int]]):
        super().__init__()
        self.board = board
        self.rows = [set() for _ in range(9)]
        self.cols = [set() for _ in range(9)]
        self.boxes = [set() for _ in range(9)]

        # Pre-fill sets with initial numbers
        for r in range(9):
            for c in range(9):
                val = self.board[r][c]
                if val != 0:
                    self.rows[r].add(val)
                    self.cols[c].add(val)
                    box_idx = (r // 3) * 3 + (c // 3)
                    self.boxes[box_idx].add(val)

    def _is_valid(self, num: int, row: int, col: int) -> bool:
        """
        Checks if placing `num` at `(row, col)` is valid using pre-computed sets.
        O(1) complexity.
        """
        box_idx = (row // 3) * 3 + (col // 3)
        return num not in self.rows[row] and \
               num not in self.cols[col] and \
               num not in self.boxes[box_idx]

    def solve(self) -> bool:
        """
        Solves the Sudoku puzzle. This version is a bit cleaner
        as it directly uses the class's board and sets.
        """
        empty_pos = self._find_empty()

        if not empty_pos:
            return True

        row, col = empty_pos
        box_idx = (row // 3) * 3 + (col // 3)

        for num in range(1, 10):
            if self._is_valid(num, row, col):
                # Place the number and update sets
                self.board[row][col] = num
                self.rows[row].add(num)
                self.cols[col].add(num)
                self.boxes[box_idx].add(num)

                if self.solve(): # Recurse
                    return True

                # Backtrack: Reset board and remove from sets
                self.board[row][col] = 0
                self.rows[row].remove(num)
                self.cols[col].remove(num)
                self.boxes[box_idx].remove(num)
        return False

# Main solver function for interface consistency
def solve_sudoku(board: list[list[int]]) -> list[list[int]] | None:
    """
    Solves a Sudoku puzzle. Returns the solved board or None if no solution (though problem
    guarantees a unique solution for valid inputs).
    """
    solver = OptimizedSudokuSolver(board)
    if solver.solve():
        return solver.get_solved_board()
    return None # Should not happen with valid inputs

if __name__ == "__main__":
    # Example Sudoku Board
    initial_board = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]

    print("Initial Sudoku Board:")
    print_board(initial_board)
    print("\nSolving Sudoku...")

    # Create a deep copy to avoid modifying the original board during class initialization for display
    import copy
    board_copy_simple = copy.deepcopy(initial_board)
    simple_solver = SudokuSolver()
    if simple_solver.solve(board_copy_simple):
        print("\nSolved Board (Simple Solver):")
        print_board(simple_solver.get_solved_board())
    else:
        print("\nNo solution found (Simple Solver).")

    board_copy_optimized = copy.deepcopy(initial_board)
    optimized_solver = OptimizedSudokuSolver(board_copy_optimized)
    if optimized_solver.solve():
        print("\nSolved Board (Optimized Solver with Sets):")
        print_board(optimized_solver.get_solved_board())
    else:
        print("\nNo solution found (Optimized Solver).")

    # Using the main function wrapper
    board_copy_wrapper = copy.deepcopy(initial_board)
    solved_board_wrapper = solve_sudoku(board_copy_wrapper)
    if solved_board_wrapper:
        print("\nSolved Board (solve_sudoku wrapper using Optimized Solver):")
        print_board(solved_board_wrapper)
    else:
        print("\nNo solution found (solve_sudoku wrapper).")

    # Test an unsolvable board (for completeness, though problem guarantees solvable)
    unsolvable_board = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0], # One cell is 0, but if we forced a conflict elsewhere...
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]
    # Intentionally make it unsolvable after changing one valid 9 to a 0 for demonstration
    unsolvable_board[0][2] = 9 # Valid previously
    unsolvable_board[0][3] = 9 # Conflict in row 0
    print("\nAttempting to solve an (intentionally) unsolvable board:")
    unsolvable_board_copy = copy.deepcopy(unsolvable_board)
    unsolvable_result = solve_sudoku(unsolvable_board_copy)
    if unsolvable_result:
        print("\nSolved an unsolvable board (ERROR in test logic or board setup).")
    else:
        print("\nCorrectly detected no solution for the unsolvable board.")