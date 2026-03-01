# benchmarks/benchmark_runner.py
# Benchmarks the performance of backtracking algorithms.

import time
from src.backtracking_problems import BacktrackingSolutions
from benchmarks.data_generator import (
    generate_random_list, 
    generate_sorted_list, 
    generate_list_with_duplicates,
    generate_n_queens_size,
    generate_combination_sum_target
)

class BenchmarkRunner:
    def __init__(self):
        self.solver = BacktrackingSolutions()

    def _run_benchmark(self, func, *args):
        """Helper to run a function and measure its execution time."""
        start_time = time.perf_counter()
        func(*args)
        end_time = time.perf_counter()
        return end_time - start_time

    def benchmark_subsets(self, sizes: list[int]):
        """Benchmarks the subsets algorithm."""
        print("\n--- Benchmarking Subsets ---")
        print("Size\tTime (s)")
        print("--------------------")
        for size in sizes:
            nums = generate_sorted_list(size) # Sorted unique list for subsets
            time_taken = self._run_benchmark(self.solver.subsets, nums)
            print(f"{size}\t{time_taken:.6f}")

    def benchmark_permutations(self, sizes: list[int]):
        """Benchmarks the permutations algorithm."""
        print("\n--- Benchmarking Permutations ---")
        print("Size\tTime (s)")
        print("--------------------")
        for size in sizes:
            nums = generate_sorted_list(size) # Sorted unique list for permutations
            time_taken = self._run_benchmark(self.solver.permutations, nums)
            print(f"{size}\t{time_taken:.6f}")

    def benchmark_combination_sum_ii(self, sizes: list[int]):
        """Benchmarks the combination_sum_ii algorithm."""
        print("\n--- Benchmarking Combination Sum II ---")
        print("Size\tTarget\tTime (s)")
        print("-----------------------------")
        for size in sizes:
            # Generate candidates with some duplicates to test the duplicate handling
            candidates = generate_list_with_duplicates(size, num_duplicates=max(1, size // 5), min_val=1, max_val=20)
            target = generate_combination_sum_target(candidates)
            
            time_taken = self._run_benchmark(self.solver.combination_sum_ii, candidates, target)
            print(f"{size}\t{target}\t{time_taken:.6f}")

    def benchmark_n_queens(self, sizes: list[int]):
        """Benchmarks the n_queens algorithm."""
        print("\n--- Benchmarking N-Queens ---")
        print("N\tTime (s)")
        print("--------------------")
        for n_val in sizes:
            time_taken = self._run_benchmark(self.solver.n_queens, n_val)
            print(f"{n_val}\t{time_taken:.6f}")

def main():
    runner = BenchmarkRunner()

    # Define input sizes for each benchmark
    # Note: Backtracking is exponential, so sizes should be small to avoid very long runtimes.
    # Adjust these based on your system's performance.

    # Subsets (2^N complexity)
    subsets_sizes = [5, 8, 10, 12, 14] # Max 15-18 usually for reasonable time

    # Permutations (N! complexity)
    permutations_sizes = [3, 5, 7, 8, 9] # Max 9-10 usually for reasonable time

    # Combination Sum II (up to 2^N complexity)
    # Using larger size for candidates, but actual recursion depth depends on target
    combination_sum_sizes = [5, 8, 10, 12, 15]

    # N-Queens (N! / roughly N^N complexity)
    n_queens_sizes = [4, 6, 8, 10, 12] # Max 12-14 usually for reasonable time

    runner.benchmark_subsets(subsets_sizes)
    runner.benchmark_permutations(permutations_sizes)
    runner.benchmark_combination_sum_ii(combination_sum_sizes)
    runner.benchmark_n_queens(n_queens_sizes)

if __name__ == '__main__':
    main()