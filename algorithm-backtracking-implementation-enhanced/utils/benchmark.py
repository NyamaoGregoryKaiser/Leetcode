import time
import functools
from typing import Callable, Any, List

# Import algorithms for benchmarking
from algorithms import permutations, subsets, n_queens, sudoku_solver, combination_sum
from copy import deepcopy # For Sudoku board

def time_function(func: Callable) -> Callable:
    """
    A decorator to measure the execution time of a function.
    Prints the function name, arguments, and execution time.
    """
    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        # Prepare arguments for printing
        func_args_str = ", ".join(repr(arg) for arg in args)
        if kwargs:
            func_kwargs_str = ", ".join(f"{k}={repr(v)}" for k, v in kwargs.items())
            if func_args_str:
                func_args_str += ", " + func_kwargs_str
            else:
                func_args_str = func_kwargs_str

        print(f"\nBenchmarking {func.__module__}.{func.__name__}({func_args_str})...")
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        print(f"  Execution time: {end_time - start_time:.6f} seconds")
        return result
    return wrapper

@time_function
def benchmark_permutations(nums: List[int]):
    """Benchmarks permutations of distinct numbers."""
    return permutations.permute(nums)

@time_function
def benchmark_permutations_unique(nums: List[int]):
    """Benchmarks permutations of numbers with duplicates."""
    return permutations.permute_unique(nums)

@time_function
def benchmark_subsets(nums: List[int]):
    """Benchmarks subsets of distinct numbers."""
    return subsets.subsets(nums)

@time_function
def benchmark_subsets_with_dup(nums: List[int]):
    """Benchmarks subsets of numbers with duplicates."""
    return subsets.subsets_with_dup(nums)

@time_function
def benchmark_n_queens(n: int):
    """Benchmarks N-Queens solver."""
    return n_queens.solve_n_queens(n)

@time_function
def benchmark_sudoku_solver(board: List[List[str]]):
    """Benchmarks Sudoku solver."""
    # Sudoku solver modifies board in-place, so pass a deepcopy for each run
    board_copy = deepcopy(board)
    return sudoku_solver.solve_sudoku(board_copy)

@time_function
def benchmark_combination_sum(candidates: List[int], target: int):
    """Benchmarks combination_sum (reusable candidates)."""
    return combination_sum.combination_sum(candidates, target)

@time_function
def benchmark_combination_sum2(candidates: List[int], target: int):
    """Benchmarks combination_sum2 (each candidate once, with duplicates)."""
    return combination_sum.combination_sum2(candidates, target)

def run_all_benchmarks():
    """Runs a suite of benchmarks for all implemented algorithms."""
    print("--- Starting Full Benchmark Suite ---")

    # Permutations
    benchmark_permutations([1, 2, 3])
    benchmark_permutations([1, 2, 3, 4, 5, 6, 7, 8]) # 8! = 40320 permutations
    # benchmark_permutations([1, 2, 3, 4, 5, 6, 7, 8, 9]) # This is 9! = 362880 permutations, might be slow

    benchmark_permutations_unique([1, 1, 2, 2])
    benchmark_permutations_unique([1, 1, 1, 2, 2, 3]) # (6! / (3! * 2!)) = 720 / (6*2) = 60 permutations
    benchmark_permutations_unique([1, 1, 1, 1, 2, 2, 2, 3]) # 8! / (4! * 3!) = 40320 / (24 * 6) = 280 permutations

    # Subsets
    benchmark_subsets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]) # 2^14 = 16384 subsets
    # benchmark_subsets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) # 2^15 = 32768 subsets, might be slow

    benchmark_subsets_with_dup([1, 1, 2, 2, 3, 3, 4, 4, 5]) # 9 elements, many duplicates

    # N-Queens
    benchmark_n_queens(4)
    benchmark_n_queens(8)
    benchmark_n_queens(10) # 724 solutions
    # benchmark_n_queens(12) # 14200 solutions, can take a few seconds

    # Sudoku Solver
    sudoku_board = [
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
    benchmark_sudoku_solver(sudoku_board)
    
    # A harder Sudoku board (if available, for more intense benchmark)
    hard_sudoku_board = [ # Taken from online sources for hard sudokus
        ["8", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", "3", "6", ".", ".", ".", ".", "."],
        [".", "7", ".", ".", "9", "1", "2", ".", "."],
        [".", "5", ".", ".", ".", "7", ".", ".", "."],
        [".", ".", ".", ".", "4", "5", "7", ".", "."],
        [".", ".", ".", "1", ".", ".", ".", "3", "."],
        [".", ".", "1", ".", ".", ".", ".", "6", "8"],
        [".", ".", "8", "5", ".", ".", ".", "1", "."],
        [".", "9", ".", ".", ".", ".", "4", ".", "."]
    ]
    benchmark_sudoku_solver(hard_sudoku_board)


    # Combination Sum
    benchmark_combination_sum([2, 3, 6, 7], 7)
    benchmark_combination_sum([2, 3, 5], 100) # Larger target
    benchmark_combination_sum([1, 2, 3, 4, 5, 6, 7, 8, 9], 30) # More candidates, larger target

    benchmark_combination_sum2([10, 1, 2, 7, 6, 1, 5], 8)
    benchmark_combination_sum2([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5], 10) # Duplicates, specific target
    benchmark_combination_sum2([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 25)

    print("\n--- Full Benchmark Suite Completed ---")

if __name__ == '__main__':
    run_all_benchmarks()
```