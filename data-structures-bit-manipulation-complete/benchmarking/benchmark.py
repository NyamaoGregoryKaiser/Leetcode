```python
import timeit
import random
from src.problem_1_count_set_bits import (
    count_set_bits_naive,
    count_set_bits_kernighan,
    count_set_bits_lookup_table,
    count_set_bits_builtin,
)
from src.problem_2_power_of_two import (
    is_power_of_two_naive,
    is_power_of_two_optimal,
)
from src.problem_3_reverse_bits import reverse_bits_iterative
# from src.problem_3_reverse_bits import reverse_bits_divide_conquer # Uncomment if active
from src.problem_4_single_number_iii import single_number_iii_optimal


def run_benchmark(func, args, number=100000):
    """
    Runs a benchmark for a given function with specific arguments.

    Args:
        func: The function to benchmark.
        args: A tuple of arguments to pass to the function.
        number: The number of times to execute the function in the benchmark.

    Returns:
        The average execution time in seconds.
    """
    stmt = f"{func.__name__}(*args)"
    setup = f"from {func.__module__} import {func.__name__}\nargs = {args}"
    times = timeit.repeat(stmt, setup, number=number, repeat=5)
    return min(times) / number # Return the minimum of the runs, divided by number for average per call

def generate_random_32bit_int(num_numbers=100):
    """Generates a list of random 32-bit unsigned integers."""
    return [random.randint(0, 2**32 - 1) for _ in range(num_numbers)]

def generate_random_array_single_number_iii(num_elements=1000, unique_range=10000):
    """
    Generates an array suitable for Single Number III problem.
    Consists of `num_elements-2` pairs and 2 unique numbers.
    """
    # Generate unique numbers
    all_possible = list(range(unique_range))
    random.shuffle(all_possible)
    unique_nums = all_possible[:2]

    # Generate pairs
    pairs = []
    # Ensure num_elements - 2 is even
    num_pairs_to_generate = (num_elements - 2) // 2
    for i in range(num_pairs_to_generate):
        num = all_possible[i + 2] # Use numbers after the initial unique two
        pairs.extend([num, num])

    nums = unique_nums + pairs
    random.shuffle(nums)
    return nums

if __name__ == "__main__":
    print("--- Bit Manipulation Benchmarking ---")

    # --- Benchmark 1: Count Set Bits ---
    print("\nBenchmarking: Count Set Bits (Hamming Weight)")
    test_numbers_count_bits = generate_random_32bit_int(1000)
    num_runs = 1000
    
    print(f"  Running {num_runs} times for each of {len(test_numbers_count_bits)} numbers (total {num_runs * len(test_numbers_count_bits)} operations).")

    methods = {
        "Naive (Iterative Shifting)": count_set_bits_naive,
        "Brian Kernighan's Algorithm": count_set_bits_kernighan,
        "Lookup Table (4-byte)": count_set_bits_lookup_table,
        "Built-in (`bin().count('1')`)": count_set_bits_builtin,
    }

    results_count_bits = {}
    for name, func in methods.items():
        total_time = 0
        for n in test_numbers_count_bits:
            total_time += run_benchmark(func, (n,), number=num_runs)
        results_count_bits[name] = total_time / len(test_numbers_count_bits) # Average time per number over num_runs

    for name, avg_time in sorted(results_count_bits.items(), key=lambda item: item[1]):
        print(f"    {name:<35}: {avg_time * 1e6:.3f} microseconds/call")

    # --- Benchmark 2: Power of Two ---
    print("\nBenchmarking: Power of Two")
    test_numbers_power_of_two = generate_random_32bit_int(1000)
    test_numbers_power_of_two.extend([0, 1, 2, 4, 8, 2**31]) # Add some known powers of two and edge cases
    num_runs_power_of_two = 10000

    print(f"  Running {num_runs_power_of_two} times for each of {len(test_numbers_power_of_two)} numbers (total {num_runs_power_of_two * len(test_numbers_power_of_two)} operations).")

    methods_power_of_two = {
        "Naive (Iterative Division)": is_power_of_two_naive,
        "Optimal (Bitwise `n & (n-1)`)": is_power_of_two_optimal,
    }

    results_power_of_two = {}
    for name, func in methods_power_of_two.items():
        total_time = 0
        for n in test_numbers_power_of_two:
            total_time += run_benchmark(func, (n,), number=num_runs_power_of_two)
        results_power_of_two[name] = total_time / len(test_numbers_power_of_two)

    for name, avg_time in sorted(results_power_of_two.items(), key=lambda item: item[1]):
        print(f"    {name:<35}: {avg_time * 1e6:.3f} microseconds/call")

    # --- Benchmark 3: Reverse Bits ---
    print("\nBenchmarking: Reverse Bits")
    test_numbers_reverse_bits = generate_random_32bit_int(1000)
    num_runs_reverse_bits = 1000

    print(f"  Running {num_runs_reverse_bits} times for each of {len(test_numbers_reverse_bits)} numbers (total {num_runs_reverse_bits * len(test_numbers_reverse_bits)} operations).")

    methods_reverse_bits = {
        "Iterative Shifting": reverse_bits_iterative,
        # "Divide and Conquer": reverse_bits_divide_conquer, # Uncomment if active
    }
    
    results_reverse_bits = {}
    for name, func in methods_reverse_bits.items():
        total_time = 0
        for n in test_numbers_reverse_bits:
            total_time += run_benchmark(func, (n,), number=num_runs_reverse_bits)
        results_reverse_bits[name] = total_time / len(test_numbers_reverse_bits)

    for name, avg_time in sorted(results_reverse_bits.items(), key=lambda item: item[1]):
        print(f"    {name:<35}: {avg_time * 1e6:.3f} microseconds/call")


    # --- Benchmark 4: Single Number III ---
    print("\nBenchmarking: Single Number III")
    # Using a fixed-size small array for benchmarking purposes to avoid excessive setup time
    # The constraint is 2 <= nums.length <= 3 * 10^4
    test_array_single_number_iii = generate_random_array_single_number_iii(num_elements=1000, unique_range=2000)
    num_runs_single_number_iii = 100 # Lower runs for array-based problems

    print(f"  Running {num_runs_single_number_iii} times with array of {len(test_array_single_number_iii)} elements.")

    # Using only optimal as hash map is known to be O(N) space
    methods_single_number_iii = {
        "Optimal (Bitwise XOR)": single_number_iii_optimal,
    }

    results_single_number_iii = {}
    for name, func in methods_single_number_iii.items():
        total_time = 0
        # We need to pass a copy of the list for each run if the function modifies it
        total_time += run_benchmark(func, (test_array_single_number_iii.copy(),), number=num_runs_single_number_iii)
        results_single_number_iii[name] = total_time

    for name, avg_time in sorted(results_single_number_iii.items(), key=lambda item: item[1]):
        print(f"    {name:<35}: {avg_time * 1e3:.3f} milliseconds/run")

```