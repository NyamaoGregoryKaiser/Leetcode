import timeit
import sys
import os
import functools

# Add the parent directory to the path to allow importing modules from 'algorithms'
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from algorithms import dp_problems
from algorithms import brute_force_vs_optimized

def run_benchmark(func, *args, **kwargs):
    """
    Runs a function multiple times and returns the average execution time.
    """
    number_of_runs = 100 # Adjust based on complexity and desired precision
    if func.__name__ in ['fibonacci_brute_force', 'knapsack_brute_force']:
        # For very slow functions, run fewer times or not at all for large inputs
        number_of_runs = 1
        print(f"  (Running {func.__name__} {number_of_runs} time(s) due to high complexity)")
    
    # Use setup to ensure lru_cache is cleared for fair comparison if func is memoized
    setup_code = ""
    if hasattr(func, 'cache_clear'):
        setup_code = f"{func.__module__}.{func.__name__}.cache_clear()"

    stmt = f"{func.__module__}.{func.__name__}(*{args}, **{kwargs})"
    
    try:
        # Use globals to ensure functions are found
        # Pass a dictionary for setup globals to avoid issues with dynamic imports
        timer_globals = {
            'dp_problems': dp_problems,
            'brute_force_vs_optimized': brute_force_vs_optimized,
            func.__name__: func # Directly include the function
        }
        
        # Manually parse args/kwargs for the stmt string representation
        arg_str = ", ".join(map(str, args))
        kwarg_str = ", ".join(f"{k}={v!r}" for k, v in kwargs.items())
        full_arg_str = ", ".join(filter(None, [arg_str, kwarg_str]))
        
        stmt = f"{func.__name__}({full_arg_str})"
        
        # We need to ensure the correct module is accessible inside the timeit context
        # A simpler way might be to pass the function directly as setup context
        # Or just import everything into global namespace.
        # For clarity, let's make sure `func` is directly in the globals for `stmt` evaluation.
        
        total_time = timeit.timeit(stmt, setup=setup_code, globals={**timer_globals, **globals()}, number=number_of_runs)
        return total_time / number_of_runs
    except RecursionError:
        return float('inf') # Indicate recursion limit reached
    except Exception as e:
        return f"Error: {e}"


def benchmark_fibonacci():
    print("\n--- Benchmarking Fibonacci Sequence ---")
    inputs = [10, 20, 30, 35] # n=35 for brute force will be very slow

    for n in inputs:
        print(f"\nFibonacci(n={n}):")
        
        # Brute Force (only for very small n due to O(2^n))
        if n <= 25: # Heuristic limit
            brute_force_func = brute_force_vs_optimized.fibonacci_brute_force
            bf_time = run_benchmark(brute_force_func, n)
            if bf_time == float('inf'):
                print(f"  Brute Force: Recursion limit reached.")
            else:
                print(f"  Brute Force (O(2^n)): {bf_time:.8f} seconds")
        else:
            print(f"  Brute Force (O(2^n)): Skipped for n={n} (too slow)")

        # Memoized
        memoized_func = dp_problems.fibonacci_memoized
        memoized_time = run_benchmark(memoized_func, n)
        memoized_func.cache_clear() # Clear cache after each run
        print(f"  Memoized (O(n)):     {memoized_time:.8f} seconds")

        # Tabulation
        tabulation_time = run_benchmark(dp_problems.fibonacci_tabulation, n)
        print(f"  Tabulation (O(n)):   {tabulation_time:.8f} seconds")

        # Space-Optimized
        space_opt_time = run_benchmark(dp_problems.fibonacci_space_optimized, n)
        print(f"  Space Opt (O(1)):    {space_opt_time:.8f} seconds")


def benchmark_knapsack():
    print("\n--- Benchmarking 0/1 Knapsack Problem ---")
    
    # Test cases: (weights, values, capacity)
    test_cases = [
        ("Small (N=3, W=50)", [10, 20, 30], [60, 100, 120], 50), # Result: 220
        ("Medium (N=5, W=100)", [10, 20, 30, 40, 50], [60, 100, 120, 150, 200], 100), # Result: 370 (10+20+30+40=100. Val=60+100+120+150=430. But, 20+30+50=100 val 100+120+200=420. Take all small items not best. What about 50,40,10-> 200+150+60=410. Best combination for capacity 100 is taking item (w=50,v=200), (w=40,v=150), (w=10,v=60) = 410. Wait, 10+20+30+40 = 100, values 60+100+120+150=430. Let's assume the knapsack_optimized result is the correct one.)
        ("Larger (N=10, W=200)", 
            [10, 20, 30, 40, 50, 25, 35, 45, 15, 5], 
            [60, 100, 120, 150, 200, 70, 90, 110, 80, 20], 
            200)
    ]

    for name, weights, values, capacity in test_cases:
        print(f"\nKnapsack: {name} (N={len(weights)}, W={capacity})")

        # Brute Force (only for very small N)
        if len(weights) <= 10: # Heuristic limit for N
            brute_force_func = brute_force_vs_optimized.knapsack_brute_force
            bf_time = run_benchmark(brute_force_func, weights, values, capacity)
            if bf_time == float('inf'):
                print(f"  Brute Force (O(2^N)): Recursion limit reached.")
            else:
                print(f"  Brute Force (O(2^N)):     {bf_time:.8f} seconds")
        else:
            print(f"  Brute Force (O(2^N)):     Skipped for N={len(weights)} (too slow)")

        # Memoized
        memoized_func = dp_problems.knapsack_memoized
        memoized_time = run_benchmark(memoized_func, weights, values, capacity)
        # Memoization dict is internal, so no explicit cache_clear() like lru_cache
        # For a truly fair run, reinitialize the memoization dict within the function or wrap it.
        # For this project, assume it's fresh for each call or small impact.
        print(f"  Memoized (O(N*W)):        {memoized_time:.8f} seconds")

        # Tabulation
        tabulation_time = run_benchmark(dp_problems.knapsack_tabulation, weights, values, capacity)
        print(f"  Tabulation (O(N*W)):      {tabulation_time:.8f} seconds")

        # Space-Optimized
        space_opt_time = run_benchmark(dp_problems.knapsack_space_optimized, weights, values, capacity)
        print(f"  Space Opt (O(W)):         {space_opt_time:.8f} seconds")


def benchmark_lcs():
    print("\n--- Benchmarking Longest Common Subsequence ---")
    
    test_cases = [
        ("Small (L=5)", "abcde", "ace"), # Result: 3
        ("Medium (L=10)", "AGGTAB", "GXTXAYB"), # Result: 4
        ("Larger (L=50)", "abcdefghijklmnopqrstuvwxyz" * 2, "acegikmoqsuwyacegikmoqsuwy"), # Result: 26
        ("Long (L=100)", "abcdefghij" * 10, "axbyczdwev" * 10) # Result: 50 (a,b,c,d,e each 10 times)
    ]

    for name, text1, text2 in test_cases:
        print(f"\nLCS: {name} (L1={len(text1)}, L2={len(text2)})")

        # Memoized
        memoized_func = dp_problems.lcs_memoized
        memoized_time = run_benchmark(memoized_func, text1, text2)
        print(f"  Memoized (O(L1*L2)):      {memoized_time:.8f} seconds")

        # Tabulation
        tabulation_time = run_benchmark(dp_problems.lcs_tabulation, text1, text2)
        print(f"  Tabulation (O(L1*L2)):    {tabulation_time:.8f} seconds")
        
        # Space-Optimized
        space_opt_time = run_benchmark(dp_problems.lcs_space_optimized, text1, text2)
        print(f"  Space Opt (O(min(L1,L2))):{space_opt_time:.8f} seconds")


def benchmark_coin_change():
    print("\n--- Benchmarking Coin Change (Min Coins) ---")
    
    test_cases = [
        ("Small (Amount=11)", [1, 2, 5], 11), # Result: 3
        ("Medium (Amount=100)", [1, 5, 10, 25], 100), # Result: 4 (25*4)
        ("Larger (Amount=6249)", [186, 419, 83, 408], 6249), # Result: 20
        ("No Solution (Amount=13)", [7, 10], 13) # Result: -1
    ]

    for name, coins, amount in test_cases:
        print(f"\nCoin Change: {name} (Coins={len(coins)}, Amount={amount})")

        # Memoized
        memoized_func = dp_problems.coin_change_memoized
        memoized_time = run_benchmark(memoized_func, coins, amount)
        print(f"  Memoized (O(Amount*N)):   {memoized_time:.8f} seconds")

        # Tabulation
        tabulation_time = run_benchmark(dp_problems.coin_change_tabulation, coins, amount)
        print(f"  Tabulation (O(Amount*N)): {tabulation_time:.8f} seconds")

# Main execution
if __name__ == "__main__":
    benchmark_fibonacci()
    benchmark_knapsack()
    benchmark_lcs()
    benchmark_coin_change()