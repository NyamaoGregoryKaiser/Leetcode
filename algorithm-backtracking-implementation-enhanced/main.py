import sys
import time
from algorithms import (
    permutations,
    subsets,
    n_queens,
    sudoku_solver,
    combination_sum
)
from utils.benchmark import run_all_benchmarks
from utils.common import print_board as print_sudoku_board_util # Alias to avoid conflict with N-Queens internal print

def run_examples():
    """
    Runs example cases for each implemented backtracking algorithm and prints their outputs.
    """
    print("--- Running Backtracking Algorithm Examples ---")
    print("\n--- Permutations ---")
    nums_perm = [1, 2, 3]
    result_perm = permutations.permute(nums_perm)
    print(f"Permutations of {nums_perm}: {result_perm}")
    nums_perm_dup = [1, 1, 2]
    result_perm_dup = permutations.permute_unique(nums_perm_dup)
    print(f"Unique Permutations of {nums_perm_dup}: {result_perm_dup}")

    print("\n--- Subsets ---")
    nums_sub = [1, 2, 3]
    result_sub = subsets.subsets(nums_sub)
    print(f"Subsets of {nums_sub}: {result_sub}")
    nums_sub_dup = [1, 2, 2]
    result_sub_dup = subsets.subsets_with_dup(nums_sub_dup)
    print(f"Subsets with Duplicates of {nums_sub_dup}: {result_sub_dup}")

    print("\n--- N-Queens ---")
    n_queens_val = 4
    result_n_queens = n_queens.solve_n_queens(n_queens_val)
    print(f"Solutions for {n_queens_val}-Queens problem ({len(result_n_queens)} solutions):")
    for i, solution in enumerate(result_n_queens):
        print(f"Solution {i+1}:")
        n_queens.print_board(solution) # Using the specific N-Queens print
        if i < len(result_n_queens) - 1:
            print("-" * 10)

    print("\n--- Sudoku Solver ---")
    board_sudoku = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ]
    print("Original Sudoku Board:")
    print_sudoku_board_util(board_sudoku) # Using the common utility print for Sudoku
    
    start_time = time.time()
    if sudoku_solver.solve_sudoku(board_sudoku):
        end_time = time.time()
        print("\nSolved Sudoku Board:")
        print_sudoku_board_util(board_sudoku)
        print(f"Sudoku solved in {end_time - start_time:.6f} seconds.")
    else:
        print("\nNo solution exists for the given Sudoku board.")

    print("\n--- Combination Sum ---")
    candidates_cs = [2, 3, 6, 7]
    target_cs = 7
    result_cs = combination_sum.combination_sum(candidates_cs, target_cs)
    print(f"Combinations for candidates {candidates_cs}, target {target_cs} (reusable): {result_cs}")

    candidates_cs2 = [10, 1, 2, 7, 6, 1, 5]
    target_cs2 = 8
    result_cs2 = combination_sum.combination_sum2(candidates_cs2, target_cs2)
    print(f"Combinations for candidates {candidates_cs2}, target {target_cs2} (unique, each once): {result_cs2}")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "benchmark":
        print("--- Running Backtracking Algorithm Benchmarks ---")
        run_all_benchmarks()
    else:
        run_examples()
```