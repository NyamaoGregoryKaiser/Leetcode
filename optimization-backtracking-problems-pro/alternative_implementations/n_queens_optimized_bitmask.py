# alternative_implementations/n_queens_optimized_bitmask.py
# An optimized solution for the N-Queens problem using bitmasks.
# This approach significantly improves the `is_safe` check by using O(1) bitwise operations
# instead of O(N) linear iteration.

from typing import List

class NQueensBitmaskSolver:
    """
    Optimized solution for the N-Queens problem using bitmasks.
    This approach uses bitwise operations to check for conflicts (columns and diagonals)
    in O(1) time, making the `is_safe` check much faster.

    Bitmask Representation:
    - `col_mask`: An integer where the i-th bit is 1 if column `i` is occupied, 0 otherwise.
    - `diag1_mask`: (rows + cols) sums. A queen at (r, c) occupies diagonal `r + c`.
                    The values for `r+c` range from 0 to `2*(N-1)`.
                    This mask tracks the main diagonals (top-left to bottom-right).
    - `diag2_mask`: (rows - cols) differences. A queen at (r, c) occupies anti-diagonal `r - c`.
                    To map these to positive indices, we add `N-1`. So, `r - c + N - 1`.
                    The values for `r - c + N - 1` range from 0 to `2*(N-1)`.
                    This mask tracks the anti-diagonals (top-right to bottom-left).

    The `is_safe` check then becomes:
    `((col_mask >> col) & 1)` checks if `col` is occupied.
    `((diag1_mask >> (row + col)) & 1)` checks if main diagonal is occupied.
    `((diag2_mask >> (row - col + n - 1)) & 1)` checks if anti-diagonal is occupied.

    If any of these bits are 1, it's not safe.

    Time Complexity: Still O(N!) in worst-case exploration, but the constant factor
                     for checking conflicts is significantly reduced from O(N) to O(1)
                     per check. Overall, closer to O(N!).

    Space Complexity: O(N) for recursion stack depth. O(1) for bitmasks (fixed size integers).
                      O(N*N) for board representation in the output.
    """
    def solve_n_queens(self, n: int) -> List[List[str]]:
        if n == 0:
            return [[]]
        if n == 2 or n == 3: # No solutions for N=2, N=3
            return []

        results = []
        # `board_state[row]` stores the column index of the queen in that row.
        # This is used to reconstruct the board.
        board_state = [-1] * n

        # Initialize bitmasks to 0 (no columns or diagonals occupied)
        col_mask = 0
        diag1_mask = 0  # Main diagonals (r + c)
        diag2_mask = 0  # Anti-diagonals (r - c + n - 1)

        def build_board_representation() -> List[str]:
            board_representation = []
            for r in range(n):
                row_str_list = ['.'] * n
                col_of_queen = board_state[r]
                row_str_list[col_of_queen] = 'Q'
                board_representation.append("".join(row_str_list))
            return board_representation

        def backtrack(row: int):
            # Base Case: All queens are placed
            if row == n:
                results.append(build_board_representation())
                return

            # Try to place a queen in the current row (row)
            for col in range(n):
                # Check if position (row, col) is safe using bitmasks
                # A position is unsafe if:
                # 1. The column is already occupied (col_mask has col-th bit set)
                # 2. The main diagonal (row+col) is occupied (diag1_mask has (row+col)-th bit set)
                # 3. The anti-diagonal (row-col+n-1) is occupied (diag2_mask has (row-col+n-1)-th bit set)
                
                # Check if the current column is occupied
                is_col_occupied = (col_mask >> col) & 1
                # Check if the current main diagonal is occupied
                is_diag1_occupied = (diag1_mask >> (row + col)) & 1
                # Check if the current anti-diagonal is occupied
                is_diag2_occupied = (diag2_mask >> (row - col + n - 1)) & 1

                if not is_col_occupied and not is_diag1_occupied and not is_diag2_occupied:
                    # Choice: Place queen at (row, col)
                    board_state[row] = col

                    # Update bitmasks by setting the corresponding bits to 1
                    # `| (1 << bit_position)` sets the bit at `bit_position`
                    nonlocal col_mask, diag1_mask, diag2_mask
                    col_mask |= (1 << col)
                    diag1_mask |= (1 << (row + col))
                    diag2_mask |= (1 << (row - col + n - 1))

                    # Recurse for the next row
                    backtrack(row + 1)

                    # Backtrack: Remove queen (undo the choice)
                    # Clear the corresponding bits by setting them to 0
                    # `& ~(1 << bit_position)` clears the bit at `bit_position`
                    col_mask &= ~(1 << col)
                    diag1_mask &= ~(1 << (row + col))
                    diag2_mask &= ~(1 << (row - col + n - 1))
                    board_state[row] = -1 # Clear for board reconstruction

        backtrack(0) # Start placing queens from row 0
        return results

if __name__ == '__main__':
    solver = NQueensBitmaskSolver()

    print("N-Queens using Bitmasks:")

    n = 4
    solutions_4 = solver.solve_n_queens(n)
    print(f"\nSolutions for N={n} ({len(solutions_4)} found):")
    for sol in solutions_4:
        for row in sol:
            print(row)
        print()

    n = 8
    solutions_8 = solver.solve_n_queens(n)
    print(f"\nSolutions for N={n} ({len(solutions_8)} found):")
    if solutions_8:
        print("First 3 solutions:")
        for i in range(min(3, len(solutions_8))):
            for row in solutions_8[i]:
                print(row)
            print()
        if len(solutions_8) > 3:
            print(f"... and {len(solutions_8) - 3} more solutions.")

    n = 1
    solutions_1 = solver.solve_n_queens(n)
    print(f"\nSolutions for N={n} ({len(solutions_1)} found):")
    for sol in solutions_1:
        for row in sol:
            print(row)
        print()
            
    n = 0
    solutions_0 = solver.solve_n_queens(n)
    print(f"\nSolutions for N={n} ({len(solutions_0)} found):")
    for sol in solutions_0:
        for row in sol:
            print(row)
        print()