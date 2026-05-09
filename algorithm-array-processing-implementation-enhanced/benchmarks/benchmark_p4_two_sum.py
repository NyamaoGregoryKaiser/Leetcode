import timeit
import random
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from problems.p4_two_sum_variations import (
    two_sum_hash_map,
    two_sum_two_pointers_sorted,
    three_sum,
    four_sum
)
from utils.array_utils import print_array_line

def generate_two_sum_data(n, target_type="exists"):
    nums = list(range(1, n + 1))
    random.shuffle(nums)
    target = 0
    if target_type == "exists" and n >= 2:
        idx1, idx2 = random.sample(range(n), 2)
        target = nums[idx1] + nums[idx2]
    elif target_type == "not_exists":
        target = 2 * n + 5 # A target guaranteed not to exist for positive numbers
    return nums, target

def generate_three_sum_data(n, target_type="exists"):
    nums = [random.randint(-n, n) for _ in range(n)]
    if target_type == "exists" and n >= 3:
        # Try to ensure a 0 sum if possible (not guaranteed but increases chance)
        nums.sort()
        for i in range(n - 2):
            left, right = i + 1, n - 1
            while left < right:
                current_sum = nums[i] + nums[left] + nums[right]
                if current_sum == 0:
                    return nums, True # Indicate a target of 0 will work
                elif current_sum < 0:
                    left += 1
                else:
                    right -= 1
    return nums, False # Indicate target of 0 might not work or no specific target

def generate_four_sum_data(n, target_type="exists"):
    nums = [random.randint(-n // 2, n // 2) for _ in range(n)]
    if target_type == "exists" and n >= 4:
        # Try to ensure a 0 sum if possible
        nums.sort()
        for i in range(n - 3):
            for j in range(i + 1, n - 2):
                left, right = j + 1, n - 1
                target_ij = - (nums[i] + nums[j])
                while left < right:
                    current_sum = nums[left] + nums[right]
                    if current_sum == target_ij:
                        return nums, 0 # Target is 0
                    elif current_sum < target_ij:
                        left += 1
                    else:
                        right -= 1
    return nums, 0 # Default target 0

def run_benchmark_two_sum(func, data_generator, num_sizes, number_of_runs=1000):
    results = {}
    for n_val in num_sizes:
        nums, target = data_generator(n_val)
        
        # Two-pointers specifically needs a sorted array.
        # If the benchmark function itself sorts, pass an unsorted copy.
        # If it expects sorted, sort it before passing.
        if func == two_sum_two_pointers_sorted:
            # We explicitly pass the unsorted list so sorting time is included in the benchmark for two_sum_two_pointers_sorted
            setup = f"""
from __main__ import {func.__name__}
nums = {list(nums)} # Pass an unsorted copy for two_sum_two_pointers_sorted to sort it
target = {target}
"""
        else: # For hash map, sorting is not part of its algorithm
            setup = f"""
from __main__ import {func.__name__}
nums = {list(nums)} # Use list(nums) to ensure a fresh copy for each timer run
target = {target}
"""
        timer = timeit.Timer(lambda: func(nums, target), setup=setup)
        
        try:
            times = timer.repeat(repeat=3, number=number_of_runs)
            avg_time_ms = min(times) * 1000 / number_of_runs
            results[n_val] = avg_time_ms
        except Exception as e:
            results[n_val] = f"Error: {e}"
            
    return results

def run_benchmark_k_sum(func, data_generator, num_sizes, number_of_runs=100):
    results = {}
    for n_val in num_sizes:
        nums, target = data_generator(n_val) # target typically 0 for 3/4Sum
        setup = f"""
from __main__ import {func.__name__}
nums = {list(nums)} # Use list(nums) to ensure a fresh copy for each timer run, especially important for in-place sort
target = {target}
"""
        if func in [three_sum, four_sum]: # These don't take a target for now
            timer = timeit.Timer(lambda: func(nums), setup=setup)
        else:
            timer = timeit.Timer(lambda: func(nums, target), setup=setup)
        
        try:
            times = timer.repeat(repeat=3, number=number_of_runs)
            avg_time_ms = min(times) * 1000 / number_of_runs
            results[n_val] = avg_time_ms
        except Exception as e:
            results[n_val] = f"Error: {e}"
            
    return results

if __name__ == "__main__":
    print("--- Benchmarking Two Sum Variations ---")

    num_sizes_two_sum = [100, 1000, 10000, 50000, 100000]
    num_sizes_three_sum = [50, 200, 500, 1000, 2000] # N^2 complexity, so smaller N
    num_sizes_four_sum = [30, 100, 300, 500, 700] # N^3 complexity, even smaller N

    print("\n--- Two Sum ---")
    functions_two_sum = [
        two_sum_hash_map,
        two_sum_two_pointers_sorted # Includes sorting time
    ]

    print(f"{'Algorithm':<30} | {'N':<10} | {'Avg Time (ms)':<15}")
    print("-" * 60)

    for func in functions_two_sum:
        print(f"{func.__name__:<30} |")
        results = run_benchmark_two_sum(func, generate_two_sum_data, num_sizes_two_sum, number_of_runs=100)
        for n, time_taken in results.items():
            if isinstance(time_taken, float):
                print(f"{'':<30} | {f'{n}':<10} | {time_taken:<15.6f}")
            else:
                print(f"{'':<30} | {f'{n}':<10} | {time_taken:<15}")
        print("-" * 60)
    
    print("Expected: Hash Map O(N), Two Pointers O(N log N) dominated by sort.")

    print("\n--- Three Sum ---")
    functions_three_sum = [three_sum]

    print(f"{'Algorithm':<30} | {'N':<10} | {'Avg Time (ms)':<15}")
    print("-" * 60)

    for func in functions_three_sum:
        print(f"{func.__name__:<30} |")
        # For three_sum, the target is implicitly 0
        results = run_benchmark_k_sum(func, generate_three_sum_data, num_sizes_three_sum, number_of_runs=10) # Reduce runs due to N^2
        for n, time_taken in results.items():
            if isinstance(time_taken, float):
                print(f"{'':<30} | {f'{n}':<10} | {time_taken:<15.6f}")
            else:
                print(f"{'':<30} | {f'{n}':<10} | {time_taken:<15}")
        print("-" * 60)
    print("Expected: Three Sum O(N^2) (due to nested loops after sort).")


    print("\n--- Four Sum ---")
    functions_four_sum = [four_sum]

    print(f"{'Algorithm':<30} | {'N':<10} | {'Avg Time (ms)':<15}")
    print("-" * 60)

    for func in functions_four_sum:
        print(f"{func.__name__:<30} |")
        # For four_sum, the target is implicitly 0
        results = run_benchmark_k_sum(func, generate_four_sum_data, num_sizes_four_sum, number_of_runs=1) # Reduce runs further due to N^3
        for n, time_taken in results.items():
            if isinstance(time_taken, float):
                print(f"{'':<30} | {f'{n}':<10} | {time_taken:<15.6f}")
            else:
                print(f"{'':<30} | {f'{n}':<10} | {time_taken:<15}")
        print("-" * 60)
    print("Expected: Four Sum O(N^3) (due to triple nested loops after sort).")

    print("\nBenchmark Finished.")
    print("Note: Times are in milliseconds (ms) and represent the minimum of 3 runs.")
    print("Due to high complexity, `k-sum` benchmarks use smaller N and fewer runs.")