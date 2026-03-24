import time
import random
import os
import sys

# Ensure parent directory is in path for imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from sorting_problems.k_largest_element import (
    find_kth_largest_quickselect,
    find_kth_largest_sort,
    find_kth_largest_heap
)
from sorting_problems.merge_intervals import merge_intervals_optimal
from sorting_problems.group_anagrams import (
    group_anagrams_sort_key,
    group_anagrams_count_key
)
from sorting_problems.wiggle_sort import (
    wiggle_sort_ii_optimal,
    wiggle_sort_ii_simple
)

def benchmark_function(func, *args, **kwargs):
    """Benchmarks a single function call."""
    start_time = time.perf_counter()
    result = func(*args, **kwargs)
    end_time = time.perf_counter()
    return end_time - start_time, result

def generate_random_numbers(n, min_val=0, max_val=10000):
    return [random.randint(min_val, max_val) for _ in range(n)]

def generate_random_intervals(n, min_start=0, max_range=1000, max_len=100):
    intervals = []
    for _ in range(n):
        start = random.randint(min_start, max_range)
        end = start + random.randint(1, max_len)
        intervals.append([start, end])
    return intervals

def generate_random_strings(n, min_len=1, max_len=10, alphabet='abcdefghijklmnopqrstuvwxyz'):
    strings = []
    for _ in range(n):
        length = random.randint(min_len, max_len)
        s = ''.join(random.choice(alphabet) for _ in range(length))
        strings.append(s)
    return strings

def run_k_largest_benchmarks(sizes):
    print("\n--- Benchmarking Kth Largest Element ---")
    results = {}
    for n in sizes:
        nums = generate_random_numbers(n)
        k = n // 2 if n > 0 else 1 # Median element
        
        times = {}
        
        # Benchmarking Quickselect
        t, _ = benchmark_function(find_kth_largest_quickselect, list(nums), k)
        times["Quickselect"] = t

        # Benchmarking Sorting
        t, _ = benchmark_function(find_kth_largest_sort, list(nums), k)
        times["Sort"] = t
        
        # Benchmarking Min-Heap
        t, _ = benchmark_function(find_kth_largest_heap, list(nums), k)
        times["Min-Heap"] = t
        
        results[n] = times
        print(f"N={n}: {', '.join(f'{name}: {t:.6f}s' for name, t in times.items())}")
    
    # Print comparison
    print("\nComparison for Kth Largest:")
    for n, times in results.items():
        min_time_name = min(times, key=times.get)
        print(f"N={n}: Best is {min_time_name} ({times[min_time_name]:.6f}s)")


def run_merge_intervals_benchmarks(sizes):
    print("\n--- Benchmarking Merge Overlapping Intervals ---")
    results = {}
    for n in sizes:
        intervals = generate_random_intervals(n)
        
        times = {}
        
        # Benchmarking Optimal (Sort-based)
        t, _ = benchmark_function(merge_intervals_optimal, list(intervals))
        times["Optimal (Sort)"] = t
        
        results[n] = times
        print(f"N={n}: {', '.join(f'{name}: {t:.6f}s' for name, t in times.items())}")

def run_group_anagrams_benchmarks(sizes, string_length_range=(1, 10)):
    print("\n--- Benchmarking Group Anagrams ---")
    results = {}
    for n in sizes:
        # Generate strings with some potential anagrams and some non-anagrams
        strs = []
        num_anagram_groups = n // 10 if n > 0 else 1
        for _ in range(num_anagram_groups):
            base_len = random.randint(*string_length_range)
            base_word = ''.join(random.choice('abc') for _ in range(base_len))
            # Add base word and a few shuffles as anagrams
            strs.append(base_word)
            for _ in range(random.randint(1, 3)): # 1 to 3 anagrams per group
                shuffled_word = list(base_word)
                random.shuffle(shuffled_word)
                strs.append("".join(shuffled_word))
        
        # Fill remaining with unique random words
        while len(strs) < n:
            strs.append(''.join(random.choice('xyz') for _ in range(random.randint(*string_length_range))))
        
        random.shuffle(strs) # Mix them up
        strs = strs[:n] # Ensure exactly N strings
        
        times = {}
        
        # Benchmarking Sort Key
        t, _ = benchmark_function(group_anagrams_sort_key, list(strs))
        times["Sort Key"] = t

        # Benchmarking Count Key
        t, _ = benchmark_function(group_anagrams_count_key, list(strs))
        times["Count Key"] = t
        
        results[n] = times
        print(f"N={n}, Avg L={sum(len(s) for s in strs)/len(strs) if len(strs) > 0 else 0:.1f}: {', '.join(f'{name}: {t:.6f}s' for name, t in times.items())}")
    
    print("\nComparison for Group Anagrams:")
    for n, times in results.items():
        min_time_name = min(times, key=times.get)
        print(f"N={n}: Best is {min_time_name} ({times[min_time_name]:.6f}s)")


def run_wiggle_sort_benchmarks(sizes):
    print("\n--- Benchmarking Wiggle Sort II ---")
    results = {}
    for n in sizes:
        nums = generate_random_numbers(n, max_val=n*2) # Use larger range for less duplicates relative to N
        
        times = {}
        
        # Benchmarking Optimal
        nums_copy_optimal = list(nums)
        t_optimal, _ = benchmark_function(wiggle_sort_ii_optimal, nums_copy_optimal)
        times["Optimal (Quickselect+Partition)"] = t_optimal

        # Benchmarking Simple
        nums_copy_simple = list(nums)
        t_simple, _ = benchmark_function(wiggle_sort_ii_simple, nums_copy_simple)
        times["Simple (Sort+Interleave)"] = t_simple
        
        results[n] = times
        print(f"N={n}: {', '.join(f'{name}: {t:.6f}s' for name, t in times.items())}")
    
    print("\nComparison for Wiggle Sort II:")
    for n, times in results.items():
        min_time_name = min(times, key=times.get)
        print(f"N={n}: Best is {min_time_name} ({times[min_time_name]:.6f}s)")

if __name__ == '__main__':
    print("Starting performance benchmarks...")
    
    benchmark_sizes_small = [100, 1000, 5000]
    benchmark_sizes_large = [10000, 50000] # Adjust based on your system/time budget

    # Kth Largest can handle large N quickly
    run_k_largest_benchmarks(benchmark_sizes_small + benchmark_sizes_large)
    
    # Merge Intervals is O(N log N)
    run_merge_intervals_benchmarks(benchmark_sizes_small + benchmark_sizes_large)

    # Group Anagrams depends on L (string length)
    run_group_anagrams_benchmarks(benchmark_sizes_small + [10000]) # Max 10k for strings
    
    # Wiggle Sort II is also O(N log N) or O(N) avg, can handle large N
    run_wiggle_sort_benchmarks(benchmark_sizes_small + benchmark_sizes_large)
    
    print("\nBenchmarking complete.")

# Reset sys.path if necessary
sys.path.pop(0)