import timeit
import sys
from collections import defaultdict
import json
import matplotlib.pyplot as plt
import numpy as np

# Add src to the Python path to allow imports
sys.path.insert(0, './src')

from problems.gcd_lcm import GCDLCM
from problems.prime_numbers import PrimeNumbers
from problems.modular_exponentiation import ModularExponentiation
from problems.fibonacci import Fibonacci

# --- Configuration ---
NUM_RUNS = 100  # Number of times to run each test for averaging
PLOT_ENABLED = True # Set to False if you don't have matplotlib or don't want plots

# Test cases for benchmarking
BENCHMARK_CASES = {
    "GCD": [
        (10**9 + 7, 10**9 + 9), # Two large primes, coprime
        (123456789, 987654321), # Large composite numbers
        (10**18, 10**18 - 1), # Large consecutive numbers (Euclidean worst case is Fibonacci sequence numbers)
        (999999999, 3),
        (0, 10**9)
    ],
    "IsPrime": [
        (10**9 + 7,), # Large prime
        (10**9 + 1,), # Large composite
        (999999937,), # Another large prime
        (1000000000000037,), # A very large prime (requires more sqrt time)
        (4,)
    ],
    "Sieve": [
        (10**4,),
        (10**5,),
        (5 * 10**5,),
        (10**6,)
    ],
    "ModularExponentiation": [
        (2, 100, 10**9 + 7),
        (7, 1000, 13),
        (3, 10**5, 10**9 + 7),
        (12345, 10**6, 998244353), # Large inputs for all args
        (2, 10**9, 10**9 + 7) # Very large exponent
    ],
    "Fibonacci": [
        (10,),
        (20,),
        (30,),
        (35,), # Naive recursive gets very slow here
        (50,),
        (1000,), # O(N) and O(logN) methods will shine
        (100000,) # Only O(logN) and O(1) methods remain practical
    ]
}

def run_benchmark(func_name, func, args, setup_code, num_runs=NUM_RUNS):
    """Helper to run a single benchmark for a function."""
    stmt = f"{func_name}(*{args})"
    timer = timeit.Timer(stmt=stmt, setup=setup_code)
    # Use repeat for more stable results and to catch unusual runs
    times = timer.repeat(repeat=5, number=num_runs) 
    avg_time = min(times) / num_runs # Use minimum of `repeat` runs for robustness
    return avg_time

def print_results(category, func_name, args, time_taken):
    """Prints benchmark results in a formatted way."""
    arg_str = ", ".join(map(str, args))
    print(f"  {category:<25} {func_name:<35} Args({arg_str:<30}) Avg time: {time_taken:.6f} seconds")

def plot_results(benchmark_data):
    """Generates plots for selected benchmark categories."""
    
    # Plotting helper for single function vs. N
    def plot_single_category(title, data_dict, x_label, y_label="Time (seconds)"):
        plt.figure(figsize=(12, 7))
        markers = ['o', 's', '^', 'D', 'p', 'h']
        colors = plt.cm.get_cmap('tab10', len(data_dict)) # Color map for different methods

        for i, (method_name, results) in enumerate(data_dict.items()):
            x_values = [res['arg_val'] for res in results]
            y_values = [res['time'] for res in results]
            if x_values: # Only plot if there's data
                plt.plot(x_values, y_values, label=method_name, marker=markers[i % len(markers)],
                         color=colors(i), linestyle='-', linewidth=2, markersize=8)
        
        plt.title(title, fontsize=16)
        plt.xlabel(x_label, fontsize=14)
        plt.ylabel(y_label, fontsize=14)
        plt.xscale('log' if x_values and max(x_values) > 1000 else 'linear') # Log scale for large N
        plt.yscale('log')
        plt.legend(fontsize=12)
        plt.grid(True, which="both", ls="-", alpha=0.6)
        plt.tight_layout()
        plt.savefig(f"benchmark_{'_'.join(title.lower().split())}.png")
        plt.close()

    # Data structuring for plotting
    fib_plot_data = defaultdict(list)
    sieve_plot_data = defaultdict(list)
    mod_exp_plot_data = defaultdict(list)

    for category, methods in benchmark_data.items():
        for method_name, test_cases in methods.items():
            for case in test_cases:
                # For Fibonacci and Sieve, N is the single argument
                if category == "Fibonacci":
                    n = case['args'][0]
                    fib_plot_data[method_name].append({'arg_val': n, 'time': case['time']})
                elif category == "Sieve":
                    limit = case['args'][0]
                    sieve_plot_data[method_name].append({'arg_val': limit, 'time': case['time']})
                elif category == "ModularExponentiation":
                    # For modular exponentiation, we primarily look at exponent size
                    exp = case['args'][1]
                    mod_exp_plot_data[method_name].append({'arg_val': exp, 'time': case['time']})
    
    if fib_plot_data:
        plot_single_category("Fibonacci Calculation Performance", fib_plot_data, "N (Fibonacci Index)")
    if sieve_plot_data:
        plot_single_category("Sieve of Eratosthenes Performance", sieve_plot_data, "Limit (Max Prime)")
    if mod_exp_plot_data:
        plot_single_category("Modular Exponentiation Performance", mod_exp_plot_data, "Exponent (exp)")


def main():
    print("--- Starting Benchmarks ---")
    print(f"Number of runs per measurement: {NUM_RUNS}\n")

    all_benchmark_results = defaultdict(lambda: defaultdict(list))

    # GCD Benchmarks
    print("--- GCD Benchmarks ---")
    for args in BENCHMARK_CASES["GCD"]:
        # Setup code is the same for all methods in GCDLCM
        setup = f"from src.problems.gcd_lcm import GCDLCM"
        
        time_rec = run_benchmark("GCDLCM.gcd_euclidean_recursive", GCDLCM.gcd_euclidean_recursive, args, setup)
        print_results("GCD", "gcd_euclidean_recursive", args, time_rec)
        all_benchmark_results["GCD"]["gcd_euclidean_recursive"].append({'args': args, 'time': time_rec})

        time_iter = run_benchmark("GCDLCM.gcd_euclidean_iterative", GCDLCM.gcd_euclidean_iterative, args, setup)
        print_results("GCD", "gcd_euclidean_iterative", args, time_iter)
        all_benchmark_results["GCD"]["gcd_euclidean_iterative"].append({'args': args, 'time': time_iter})
    print("-" * 50)

    # IsPrime Benchmarks (Trial Division)
    print("\n--- Primality Test (Trial Division) Benchmarks ---")
    for args in BENCHMARK_CASES["IsPrime"]:
        setup = f"from src.problems.prime_numbers import PrimeNumbers"
        time_prime_td = run_benchmark("PrimeNumbers.is_prime_trial_division", PrimeNumbers.is_prime_trial_division, args, setup)
        print_results("IsPrime", "is_prime_trial_division", args, time_prime_td)
        all_benchmark_results["IsPrime"]["is_prime_trial_division"].append({'args': args, 'time': time_prime_td})
    print("-" * 50)

    # Sieve Benchmarks
    print("\n--- Sieve of Eratosthenes Benchmarks ---")
    for args in BENCHMARK_CASES["Sieve"]:
        setup = f"from src.problems.prime_numbers import PrimeNumbers"
        
        time_sieve_std = run_benchmark("PrimeNumbers.sieve_of_eratosthenes", PrimeNumbers.sieve_of_eratosthenes, args, setup)
        print_results("Sieve", "sieve_of_eratosthenes_standard", args, time_sieve_std)
        all_benchmark_results["Sieve"]["sieve_of_eratosthenes_standard"].append({'args': args, 'time': time_sieve_std})

        time_sieve_opt = run_benchmark("PrimeNumbers.sieve_of_eratosthenes_optimized_space", PrimeNumbers.sieve_of_eratosthenes_optimized_space, args, setup)
        print_results("Sieve", "sieve_of_eratosthenes_optimized_space", args, time_sieve_opt)
        all_benchmark_results["Sieve"]["sieve_of_eratosthenes_optimized_space"].append({'args': args, 'time': time_sieve_opt})
    print("-" * 50)

    # Modular Exponentiation Benchmarks
    print("\n--- Modular Exponentiation Benchmarks ---")
    for args in BENCHMARK_CASES["ModularExponentiation"]:
        setup = f"from src.problems.modular_exponentiation import ModularExponentiation"
        
        # Naive is skipped for very large exponents as it's too slow
        if args[1] <= 1000: # exponent <= 1000
            time_naive = run_benchmark("ModularExponentiation.power_naive", ModularExponentiation.power_naive, args, setup)
            print_results("ModExp", "power_naive", args, time_naive)
            all_benchmark_results["ModularExponentiation"]["power_naive"].append({'args': args, 'time': time_naive})
        else:
            print_results("ModExp", "power_naive", args, "SKIPPED (too slow)")

        time_bin_iter = run_benchmark("ModularExponentiation.power_binary_iterative", ModularExponentiation.power_binary_iterative, args, setup)
        print_results("ModExp", "power_binary_iterative", args, time_bin_iter)
        all_benchmark_results["ModularExponentiation"]["power_binary_iterative"].append({'args': args, 'time': time_bin_iter})

        time_bin_rec = run_benchmark("ModularExponentiation.power_binary_recursive", ModularExponentiation.power_binary_recursive, args, setup)
        print_results("ModExp", "power_binary_recursive", args, time_bin_rec)
        all_benchmark_results["ModularExponentiation"]["power_binary_recursive"].append({'args': args, 'time': time_bin_rec})

        time_builtin = run_benchmark("ModularExponentiation.power_python_builtin", ModularExponentiation.power_python_builtin, args, setup)
        print_results("ModExp", "power_python_builtin", args, time_builtin)
        all_benchmark_results["ModularExponentiation"]["power_python_builtin"].append({'args': args, 'time': time_builtin})
    print("-" * 50)

    # Fibonacci Benchmarks
    print("\n--- Fibonacci Benchmarks ---")
    for args in BENCHMARK_CASES["Fibonacci"]:
        setup = f"from src.problems.fibonacci import Fibonacci"
        n = args[0]

        if n <= 35: # Naive recursive is practical only for very small n
            time_fib_naive = run_benchmark("Fibonacci.fib_recursive_naive", Fibonacci.fib_recursive_naive, args, setup)
            print_results("Fibonacci", "fib_recursive_naive", args, time_fib_naive)
            all_benchmark_results["Fibonacci"]["fib_recursive_naive"].append({'args': args, 'time': time_fib_naive})
        else:
            print_results("Fibonacci", "fib_recursive_naive", args, "SKIPPED (too slow)")

        if n <= 1000: # Memoized and iterative DP can handle up to moderate N
            time_fib_memo = run_benchmark("Fibonacci.fib_recursive_memoized", Fibonacci.fib_recursive_memoized, args, setup)
            print_results("Fibonacci", "fib_recursive_memoized", args, time_fib_memo)
            all_benchmark_results["Fibonacci"]["fib_recursive_memoized"].append({'args': args, 'time': time_fib_memo})

            time_fib_dp = run_benchmark("Fibonacci.fib_iterative_dp", Fibonacci.fib_iterative_dp, args, setup)
            print_results("Fibonacci", "fib_iterative_dp", args, time_fib_dp)
            all_benchmark_results["Fibonacci"]["fib_iterative_dp"].append({'args': args, 'time': time_fib_dp})

            time_fib_space_opt = run_benchmark("Fibonacci.fib_iterative_space_optimized", Fibonacci.fib_iterative_space_optimized, args, setup)
            print_results("Fibonacci", "fib_iterative_space_optimized", args, time_fib_space_opt)
            all_benchmark_results["Fibonacci"]["fib_iterative_space_optimized"].append({'args': args, 'time': time_fib_space_opt})
        else:
            print_results("Fibonacci", "fib_recursive_memoized", args, "SKIPPED (large N)")
            print_results("Fibonacci", "fib_iterative_dp", args, "SKIPPED (large N)")
            print_results("Fibonacci", "fib_iterative_space_optimized", args, "SKIPPED (large N)")
            
        # Matrix exponentiation can handle very large N
        time_fib_matrix = run_benchmark("Fibonacci.fib_matrix_exponentiation", Fibonacci.fib_matrix_exponentiation, args, setup)
        print_results("Fibonacci", "fib_matrix_exponentiation", args, time_fib_matrix)
        all_benchmark_results["Fibonacci"]["fib_matrix_exponentiation"].append({'args': args, 'time': time_fib_matrix})
    print("-" * 50)
    
    print("\n--- Benchmarks Complete ---")

    # Save results to JSON
    with open('benchmark_results.json', 'w') as f:
        json.dump(all_benchmark_results, f, indent=4)
    print("Benchmark results saved to 'benchmark_results.json'")

    if PLOT_ENABLED:
        try:
            # Ensure matplotlib is imported successfully for plotting
            import matplotlib.pyplot as plt
            plot_results(all_benchmark_results)
            print("Plots generated and saved as PNG files.")
        except ImportError:
            print("Matplotlib not found. Skipping plot generation. Install with 'pip install matplotlib'.")


if __name__ == "__main__":
    main()
---