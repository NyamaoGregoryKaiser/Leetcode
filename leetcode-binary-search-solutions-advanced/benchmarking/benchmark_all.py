import sys
import os
import time
import random

# Add parent directory to path to import modules from main_algorithms and additional_implementations
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main_algorithms.simple_binary_search import binary_search_iterative
from main_algorithms.sqrt_x import my_sqrt
from additional_implementations.simple_binary_search_recursive import binary_search_recursive
from additional_implementations.simple_binary_search_bruteforce import linear_search
from additional_implementations.sqrt_x_bruteforce import my_sqrt_bruteforce
from benchmarking.utils import run_benchmark

# --- Test Data Generation ---
def generate_sorted_array(size):
    return sorted(random.sample(range(-10**5, 10**5), size))

def generate_target_present(arr):
    return random.choice(arr)

def generate_target_absent(arr):
    # Try to generate a target known not to be in the array
    while True:
        target = random.randint(min(arr) - 100, max(arr) + 100)
        if target not in arr:
            return target

# --- Benchmarking Scenarios ---

def benchmark_search_algorithms():
    print("--- Benchmarking Search Algorithms (Binary vs Linear) ---")
    array_sizes = [1000, 10000, 100000] # N values
    num_runs_per_test = 500

    for size in array_sizes:
        print(f"\nArray Size: {size}")
        arr = generate_sorted_array(size)
        target_present = generate_target_present(arr)
        target_absent = generate_target_absent(arr)

        print(f"  Target Present ({target_present}):")
        run_benchmark(binary_search_iterative, arr, target_present, num_runs=num_runs_per_test)
        run_benchmark(linear_search, arr, target_present, num_runs=num_runs_per_test)

        print(f"  Target Absent ({target_absent}):")
        run_benchmark(binary_search_iterative, arr, target_absent, num_runs=num_runs_per_test)
        run_benchmark(linear_search, arr, target_absent, num_runs=num_runs_per_test)

def benchmark_binary_search_implementations():
    print("\n--- Benchmarking Binary Search Implementations (Iterative vs Recursive) ---")
    array_sizes = [1000, 10000, 100000]
    num_runs_per_test = 500

    for size in array_sizes:
        print(f"\nArray Size: {size}")
        arr = generate_sorted_array(size)
        target = generate_target_present(arr) # Focus on successful search

        print(f"  Target Present ({target}):")
        run_benchmark(binary_search_iterative, arr, target, num_runs=num_runs_per_test)
        # Recursive might hit max recursion depth for very large arrays, limit for safety
        if size < 50000: # Python default recursion limit is usually 1000 or 3000
            run_benchmark(binary_search_recursive, arr, target, num_runs=num_runs_per_test)
        else:
            print("    Skipping recursive for very large arrays due to potential recursion depth limit.")


def benchmark_sqrt_algorithms():
    print("\n--- Benchmarking Sqrt Algorithms (Binary Search vs Brute Force) ---")
    inputs = [
        4, 8, 25, 100,
        1000, 10000, 100000,
        1_000_000, 10_000_000, 100_000_000,
        2_147_483_647 # MAX_INT for 32-bit signed
    ]
    num_runs_per_test = 500

    for x_val in inputs:
        print(f"\nInput x: {x_val}")
        run_benchmark(my_sqrt, x_val, num_runs=num_runs_per_test)
        # Brute force can be very slow for large x, limit its range
        if x_val < 100_000:
            run_benchmark(my_sqrt_bruteforce, x_val, num_runs=num_runs_per_test)
        else:
            print("    Skipping brute-force sqrt for very large X (too slow).")

if __name__ == "__main__":
    print("Starting Binary Search Project Benchmarks...")
    benchmark_search_algorithms()
    benchmark_binary_search_implementations()
    benchmark_sqrt_algorithms()
    print("\nBenchmarks complete.")