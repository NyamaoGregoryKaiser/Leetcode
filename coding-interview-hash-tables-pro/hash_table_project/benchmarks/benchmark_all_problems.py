import timeit
import random
from collections import defaultdict
import cProfile
import pstats
import io

from algorithms.problem_1_two_sum import TwoSum
from algorithms.problem_2_group_anagrams import GroupAnagrams
from algorithms.problem_3_longest_consecutive_sequence import LongestConsecutiveSequence
from algorithms.problem_4_design_hashmap import MyHashMap

# --- Configuration ---
NUMBER_OF_RUNS = 100 # For timeit
PROFILING_ENABLED = False # Set to True to enable cProfile

# --- Benchmarking Utilities ---
def benchmark_function(func, *args, setup_code="", number=NUMBER_OF_RUNS):
    """
    Benchmarks a function using timeit.
    :param func: The function to benchmark.
    :param args: Arguments to pass to the function.
    :param setup_code: Any setup code needed for timeit.
    :param number: Number of times to execute the function.
    :return: Average time per execution in seconds.
    """
    # Create a callable statement for timeit
    stmt = f"{func.__name__}(*{args!r})"
    
    # Pass the function and its arguments to globals for timeit
    # Include func and args in globals to ensure they are accessible in stmt
    globals_dict = {
        func.__name__: func,
        'args': args[0] if len(args) == 1 else args # Unpack if single arg, else pass tuple
    }
    
    # Dynamically generate setup for problem instances if necessary
    # Assuming problem functions are methods of a class
    if isinstance(func.__self__, object): # Check if func is a method
        instance_name = func.__self__.__class__.__name__.lower() + "_instance"
        globals_dict[instance_name] = func.__self__
        stmt = f"{instance_name}.{func.__name__}(*{args!r})"
        setup_code = f"from algorithms.{func.__self__.__module__.split('.')[-1]} import {func.__self__.__class__.__name__}; {instance_name} = {func.__self__.__class__.__name__}()"

    timer = timeit.Timer(stmt, setup=setup_code, globals=globals_dict)
    
    try:
        times = timer.repeat(repeat=3, number=number) # Repeat 3 times, take best of 3
        avg_time = min(times) / number # Best time divided by number of runs
        return avg_time
    except Exception as e:
        print(f"Error benchmarking {func.__name__}: {e}")
        return float('inf')

def run_profiling(func, *args):
    """
    Runs cProfile on a function call and prints a summary.
    """
    pr = cProfile.Profile()
    pr.enable()
    func(*args)
    pr.disable()
    s = io.StringIO()
    sort_by = 'cumulative'
    ps = pstats.Stats(pr, stream=s).sort_stats(sort_by)
    ps.print_stats()
    print(s.getvalue())

# --- Problem 1: Two Sum Benchmarks ---
def benchmark_two_sum():
    print("\n--- Benchmarking Two Sum ---")
    solver = TwoSum()

    # Test Cases (nums, target, expected_result)
    test_cases_small = ([random.randint(0, 100) for _ in range(10)], 
                        random.randint(0, 200), [0, 1]) # Example
    test_cases_medium = ([random.randint(0, 1000) for _ in range(100)], 
                         random.randint(0, 2000), [0, 1])
    test_cases_large = ([random.randint(0, 10000) for _ in range(1000)], 
                        random.randint(0, 20000), [0, 1])
    
    # To ensure a solution exists for the random cases, pick two indices and calculate target
    def generate_two_sum_case(size, max_val):
        nums = [random.randint(0, max_val) for _ in range(size)]
        idx1, idx2 = random.sample(range(size), 2)
        target = nums[idx1] + nums[idx2]
        return nums, target

    nums_small, target_small = generate_two_sum_case(100, 1000)
    nums_medium, target_medium = generate_two_sum_case(1000, 10000)
    nums_large, target_large = generate_two_sum_case(10000, 100000)
    
    data_sets = {
        "Small (N=100)": (nums_small, target_small),
        "Medium (N=1000)": (nums_medium, target_medium),
        "Large (N=10000)": (nums_large, target_large),
    }

    for name, (nums, target) in data_sets.items():
        print(f"\nDataset: {name}")
        
        # Brute Force (O(N^2))
        time_brute_force = benchmark_function(solver.two_sum_brute_force, nums, target)
        print(f"  Brute Force: {time_brute_force:.6f} seconds")
        if PROFILING_ENABLED:
            print("  --- Profiling Brute Force ---")
            run_profiling(solver.two_sum_brute_force, nums, target)

        # Hash Map (O(N))
        time_hash_map = benchmark_function(solver.two_sum_hash_map, nums, target)
        print(f"  Hash Map: {time_hash_map:.6f} seconds")
        if PROFILING_ENABLED:
            print("  --- Profiling Hash Map ---")
            run_profiling(solver.two_sum_hash_map, nums, target)

# --- Problem 2: Group Anagrams Benchmarks ---
def benchmark_group_anagrams():
    print("\n--- Benchmarking Group Anagrams ---")
    solver = GroupAnagrams()

    # Generate random strings
    def generate_strings(num_strings, string_length, num_unique_anagram_groups):
        chars = [chr(ord('a') + i) for i in range(26)]
        base_anagrams = []
        for _ in range(num_unique_anagram_groups):
            base_anagrams.append("".join(random.choices(chars, k=string_length)))
        
        strs = []
        for _ in range(num_strings):
            # Pick a random base anagram and shuffle it to create a new one
            base = random.choice(base_anagrams)
            shuffled = list(base)
            random.shuffle(shuffled)
            strs.append("".join(shuffled))
        return strs

    strs_small = generate_strings(num_strings=50, string_length=5, num_unique_anagram_groups=10)
    strs_medium = generate_strings(num_strings=500, string_length=10, num_unique_anagram_groups=50)
    strs_large = generate_strings(num_strings=2000, string_length=15, num_unique_anagram_groups=100)
    
    data_sets = {
        "Small (N=50, K=5)": strs_small,
        "Medium (N=500, K=10)": strs_medium,
        "Large (N=2000, K=15)": strs_large,
    }

    for name, strs in data_sets.items():
        print(f"\nDataset: {name}")

        # Brute Force (Conceptual, N^2 * K log K - very slow, might skip for large)
        # For actual benchmarking, only run on very small datasets.
        if "Small" in name:
            time_brute_force = benchmark_function(solver.group_anagrams_brute_force, strs)
            print(f"  Brute Force: {time_brute_force:.6f} seconds (Note: N^2 is very slow)")
            if PROFILING_ENABLED:
                print("  --- Profiling Brute Force ---")
                run_profiling(solver.group_anagrams_brute_force, strs)

        # Sorted Key (O(N * K log K))
        time_sorted_key = benchmark_function(solver.group_anagrams_sorted_key, strs)
        print(f"  Sorted Key: {time_sorted_key:.6f} seconds")
        if PROFILING_ENABLED:
            print("  --- Profiling Sorted Key ---")
            run_profiling(solver.group_anagrams_sorted_key, strs)

        # Count Key (O(N * K))
        time_count_key = benchmark_function(solver.group_anagrams_count_key, strs)
        print(f"  Count Key: {time_count_key:.6f} seconds")
        if PROFILING_ENABLED:
            print("  --- Profiling Count Key ---")
            run_profiling(solver.group_anagrams_count_key, strs)


# --- Problem 3: Longest Consecutive Sequence Benchmarks ---
def benchmark_longest_consecutive_sequence():
    print("\n--- Benchmarking Longest Consecutive Sequence ---")
    solver = LongestConsecutiveSequence()

    def generate_lcs_case(size, max_val, num_sequences=1):
        nums = set()
        for _ in range(num_sequences):
            start = random.randint(0, max_val - size // num_sequences)
            for i in range(size // num_sequences):
                nums.add(start + i)
        
        # Add some noise to break sequences
        noise_count = size // 5
        for _ in range(noise_count):
            nums.add(random.randint(0, max_val))
        
        return list(nums)

    nums_small = generate_lcs_case(100, 1000)
    nums_medium = generate_lcs_case(1000, 10000)
    nums_large = generate_lcs_case(10000, 100000)
    
    data_sets = {
        "Small (N=100)": nums_small,
        "Medium (N=1000)": nums_medium,
        "Large (N=10000)": nums_large,
    }

    for name, nums in data_sets.items():
        print(f"\nDataset: {name}")

        # Sorting (O(N log N))
        # Pass a copy because sort() modifies in-place
        time_sort = benchmark_function(solver.longest_consecutive_sort, list(nums))
        print(f"  Sorting: {time_sort:.6f} seconds")
        if PROFILING_ENABLED:
            print("  --- Profiling Sorting ---")
            run_profiling(solver.longest_consecutive_sort, list(nums))

        # Hash Set (O(N))
        time_hash_set = benchmark_function(solver.longest_consecutive_hash_set, list(nums))
        print(f"  Hash Set: {time_hash_set:.6f} seconds")
        if PROFILING_ENABLED:
            print("  --- Profiling Hash Set ---")
            run_profiling(solver.longest_consecutive_hash_set, list(nums))


# --- Problem 4: Design HashMap Benchmarks ---
def benchmark_design_hashmap():
    print("\n--- Benchmarking Design HashMap (MyHashMap) ---")

    def run_map_operations(num_operations, num_keys, is_custom_map=False):
        if is_custom_map:
            # Need to create CustomHashMap directly to control capacity/load_factor for profiling
            from utils.custom_hash_map import CustomHashMap
            my_map = CustomHashMap(initial_capacity=1024) # Start with decent capacity
        else:
            my_map = MyHashMap()

        keys = list(range(num_keys))
        random.shuffle(keys) # To ensure varied hash indices

        for i in range(num_operations):
            op_type = random.choice(['put', 'get', 'remove'])
            key = random.choice(keys) # Pick from potential keys

            if op_type == 'put':
                value = random.randint(0, 10000)
                my_map.put(key, value)
            elif op_type == 'get':
                my_map.get(key)
            elif op_type == 'remove':
                my_map.remove(key)
        return my_map

    # Timeit setup for MyHashMap wrapper
    my_hash_map_setup = "from algorithms.problem_4_design_hashmap import MyHashMap; my_map = MyHashMap()"
    
    # Timeit setup for CustomHashMap directly (for comparison)
    custom_hash_map_setup = "from utils.custom_hash_map import CustomHashMap; my_map = CustomHashMap(initial_capacity=1024)"

    data_sets = {
        "Small (1k ops, 500 keys)": (1000, 500),
        "Medium (10k ops, 5k keys)": (10000, 5000),
        "Large (50k ops, 20k keys)": (50000, 20000),
    }

    for name, (num_ops, num_keys) in data_sets.items():
        print(f"\nDataset: {name}")

        # Benchmark MyHashMap (wrapper around CustomHashMap)
        stmt_my_map = f"run_map_operations_stmt(my_map, {num_ops}, {num_keys}, is_custom_map=False)"
        
        # Need to define a helper function accessible to timeit
        globals_dict_my_map = {
            'MyHashMap': MyHashMap,
            'run_map_operations_stmt': run_map_operations,
        }
        
        # Prepare for MyHashMap
        timer_my_map = timeit.Timer(stmt=f"my_map = MyHashMap(); run_map_operations_stmt(my_map, {num_ops}, {num_keys}, False)",
                                   setup="from algorithms.problem_4_design_hashmap import MyHashMap; from __main__ import run_map_operations as run_map_operations_stmt",
                                   globals={'MyHashMap': MyHashMap, 'run_map_operations_stmt': run_map_operations})

        time_my_hash_map = min(timer_my_map.repeat(repeat=3, number=1)) / 1
        print(f"  MyHashMap (CustomHashMap wrapper): {time_my_hash_map:.6f} seconds (for {num_ops} operations)")
        
        if PROFILING_ENABLED:
            print("  --- Profiling MyHashMap ---")
            run_profiling(run_map_operations, num_ops, num_keys, is_custom_map=False)

        # Benchmark Python's built-in dict for comparison
        # (This is just for context, not a solution to Problem 4)
        def run_builtin_dict_operations(num_ops, num_keys):
            d = {}
            keys_for_ops = list(range(num_keys))
            for i in range(num_ops):
                op_type = random.choice(['put', 'get', 'remove'])
                key = random.choice(keys_for_ops)
                if op_type == 'put':
                    d[key] = random.randint(0, 10000)
                elif op_type == 'get':
                    d.get(key) # Use .get to avoid KeyError for non-existent keys
                elif op_type == 'remove':
                    if key in d: del d[key]
            return d

        timer_builtin_dict = timeit.Timer(stmt=f"d = {{}}; run_builtin_dict_operations_stmt({num_ops}, {num_keys})",
                                         setup="from __main__ import run_builtin_dict_operations as run_builtin_dict_operations_stmt",
                                         globals={'run_builtin_dict_operations_stmt': run_builtin_dict_operations})
        
        time_builtin_dict = min(timer_builtin_dict.repeat(repeat=3, number=1)) / 1
        print(f"  Python's built-in dict: {time_builtin_dict:.6f} seconds (for {num_ops} operations)")
        
        if PROFILING_ENABLED:
            print("  --- Profiling Built-in Dict ---")
            run_profiling(run_builtin_dict_operations, num_ops, num_keys)


# --- Main Benchmarking Runner ---
if __name__ == "__main__":
    print("--- Starting Hash Table Benchmarks ---")
    print(f"Number of runs for timeit: {NUMBER_OF_RUNS}")
    print(f"Profiling Enabled: {PROFILING_ENABLED}")

    benchmark_two_sum()
    benchmark_group_anagrams()
    benchmark_longest_consecutive_sequence()
    benchmark_design_hashmap()

    print("\n--- Benchmarks Complete ---")