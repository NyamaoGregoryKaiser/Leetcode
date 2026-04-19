import sys
import os

# Add the project root to the sys.path to allow imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from algorithms import fibonacci
from utils.performance_profiler import time_function

def run_fibonacci_benchmarks(n_value):
    """
    Runs benchmarks for all Fibonacci solutions for a given n_value.
    """
    print(f"\nBenchmarking Fibonacci for n = {n_value}...")

    results = {}

    # Recursive (Brute Force)
    print("  Running fib_recursive...")
    try:
        _, time_ms = time_function(fibonacci.fib_recursive, n_value)
        results['fib_recursive'] = time_ms
    except RecursionError:
        results['fib_recursive'] = "RecursionError (n too large)"
    except Exception as e:
        results['fib_recursive'] = f"Error: {e}"


    # Memoization (Top-Down DP)
    print("  Running fib_memo...")
    _, time_ms = time_function(fibonacci.fib_memo, n_value, {})
    results['fib_memo'] = time_ms

    # Tabulation (Bottom-Up DP)
    print("  Running fib_tabulation...")
    _, time_ms = time_function(fibonacci.fib_tabulation, n_value)
    results['fib_tabulation'] = time_ms

    # Space-Optimized
    print("  Running fib_space_optimized...")
    _, time_ms = time_function(fibonacci.fib_space_optimized, n_value)
    results['fib_space_optimized'] = time_ms

    print(f"\n--- Fibonacci Benchmarks (n={n_value}) ---")
    for method, time_val in results.items():
        if isinstance(time_val, float):
            print(f"{method:25}: {time_val:.4f} ms")
        else:
            print(f"{method:25}: {time_val}")
    print("---------------------------------------")

if __name__ == "__main__":
    # Test with a medium value of n where recursive starts to slow down
    run_fibonacci_benchmarks(30)

    # Test with a larger value where recursive will likely hit recursion limit or be extremely slow
    print("\n--- Running with a larger 'n' value (be patient for some methods) ---")
    run_fibonacci_benchmarks(40) # Recursive might hit RecursionError here

    # Test with a very large value for DP methods (recursive definitely won't work)
    print("\n--- Running with a very large 'n' value for DP methods ---")
    run_fibonacci_benchmarks(100000)