import timeit
import random
from src.problems import HashTableProblems

def run_benchmark(func, *args, **kwargs):
    """Helper to run a function and measure its execution time."""
    stmt = lambda: func(*args, **kwargs)
    # Using number=1 and repeat=5 to get a few measurements without too much overhead
    # For more rigorous benchmarking, increase `number` and `repeat`.
    times = timeit.repeat(stmt, number=1, repeat=5, globals=globals())
    return sum(times) / len(times) # Average time

print("--- Hash Table Problem Benchmarking ---")
solver = HashTableProblems()

# --- Benchmarking Two Sum ---
print("\nBenchmarking Two Sum:")
N_small = 1000
N_large = 10000

# Generate test data
nums_small = list(range(N_small))
random.shuffle(nums_small)
target_small = nums_small[random.randint(0, N_small-2)] + nums_small[random.randint(0, N_small-1)]

nums_large = list(range(N_large))
random.shuffle(nums_large)
target_large = nums_large[random.randint(0, N_large-2)] + nums_large[random.randint(0, N_large-1)]

print(f"  N={N_small}:")
time_optimal = run_benchmark(solver.two_sum, nums_small, target_small)
print(f"    Optimal (Hash Map): {time_optimal:.6f} seconds")
time_brute_force = run_benchmark(solver.two_sum_brute_force, nums_small, target_small)
print(f"    Brute Force: {time_brute_force:.6f} seconds")

print(f"  N={N_large}:")
time_optimal = run_benchmark(solver.two_sum, nums_large, target_large)
print(f"    Optimal (Hash Map): {time_optimal:.6f} seconds")
# Brute force for N_large * N_large is too slow for typical benchmark
# print(f"    Brute Force: {run_benchmark(solver.two_sum_brute_force, nums_large, target_large):.6f} seconds")
# Commenting out for practicality, it would take too long.
print("    Brute Force for N=10000 is intentionally skipped (too slow, O(N^2)).")


# --- Benchmarking Group Anagrams ---
print("\nBenchmarking Group Anagrams:")
num_strings = 1000
string_length = 10 # Average string length

# Generate test data: random strings, some are anagrams
all_chars = [chr(ord('a') + i) for i in range(26)]
def generate_random_string(length):
    return "".join(random.choice(all_chars) for _ in range(length))

def generate_anagram_strings(count, length, num_anagram_groups=5):
    strings = []
    base_strings = [generate_random_string(length) for _ in range(num_anagram_groups)]
    for i in range(count):
        base = random.choice(base_strings)
        shuffled_base = list(base)
        random.shuffle(shuffled_base)
        strings.append("".join(shuffled_base))
    return strings

strs_test = generate_anagram_strings(num_strings, string_length)

print(f"  Num Strings={num_strings}, Avg String Length={string_length}:")
time_sorted_key = run_benchmark(solver.group_anagrams, strs_test)
print(f"    Sorted String Key (O(N*KlogK)): {time_sorted_key:.6f} seconds")
time_char_count_key = run_benchmark(solver.group_anagrams_char_count, strs_test)
print(f"    Char Count Tuple Key (O(N*K)): {time_char_count_key:.6f} seconds")

# --- Benchmarking Longest Consecutive Sequence ---
print("\nBenchmarking Longest Consecutive Sequence:")
N_lcs_small = 1000
N_lcs_large = 100000

nums_lcs_small = list(range(N_lcs_small // 2)) + [x + N_lcs_small for x in range(N_lcs_small // 2)]
random.shuffle(nums_lcs_small)

nums_lcs_large = list(range(N_lcs_large // 2)) + [x + N_lcs_large for x in range(N_lcs_large // 2)]
random.shuffle(nums_lcs_large)

print(f"  N={N_lcs_small}:")
time_hash_set_lcs = run_benchmark(solver.longest_consecutive_sequence, nums_lcs_small)
print(f"    Optimal (Hash Set): {time_hash_set_lcs:.6f} seconds")
time_sort_first_lcs = run_benchmark(solver.longest_consecutive_sequence_sort_first, nums_lcs_small)
print(f"    Sort First (O(NlogN)): {time_sort_first_lcs:.6f} seconds")

print(f"  N={N_lcs_large}:")
time_hash_set_lcs = run_benchmark(solver.longest_consecutive_sequence, nums_lcs_large)
print(f"    Optimal (Hash Set): {time_hash_set_lcs:.6f} seconds")
time_sort_first_lcs = run_benchmark(solver.longest_consecutive_sequence_sort_first, nums_lcs_large)
print(f"    Sort First (O(NlogN)): {time_sort_first_lcs:.6f} seconds")


# --- Benchmarking Subarray Sum Equals K ---
print("\nBenchmarking Subarray Sum Equals K:")
N_ssk_small = 1000
N_ssk_large = 10000

nums_ssk_small = [random.randint(-100, 100) for _ in range(N_ssk_small)]
k_ssk_small = random.randint(-500, 500)

nums_ssk_large = [random.randint(-100, 100) for _ in range(N_ssk_large)]
k_ssk_large = random.randint(-500, 500)

print(f"  N={N_ssk_small}:")
time_optimal_ssk = run_benchmark(solver.subarray_sum_equals_k, nums_ssk_small, k_ssk_small)
print(f"    Optimal (Prefix Sum + Hash Map): {time_optimal_ssk:.6f} seconds")
time_brute_force_ssk = run_benchmark(solver.subarray_sum_equals_k_brute_force, nums_ssk_small, k_ssk_small)
print(f"    Brute Force (O(N^2)): {time_brute_force_ssk:.6f} seconds")
time_prefix_sum_array_ssk = run_benchmark(solver.subarray_sum_equals_k_prefix_sum_array, nums_ssk_small, k_ssk_small)
print(f"    Prefix Sum Array (O(N^2)): {time_prefix_sum_array_ssk:.6f} seconds")

print(f"  N={N_ssk_large}:")
time_optimal_ssk = run_benchmark(solver.subarray_sum_equals_k, nums_ssk_large, k_ssk_large)
print(f"    Optimal (Prefix Sum + Hash Map): {time_optimal_ssk:.6f} seconds")
# Brute force for N_large is too slow
print("    Brute Force and Prefix Sum Array (O(N^2)) for N=10000 are intentionally skipped (too slow).")

# --- Benchmarking LFU Cache ---
print("\nBenchmarking LFU Cache (Operations):")
num_ops = 10000
capacity = 1000

cache_lfu = LFUCache(capacity)

# Generate a sequence of random put/get operations
ops = []
keys_in_cache = set()
for _ in range(num_ops):
    op_type = random.choice(['get', 'put'])
    if op_type == 'put':
        key = random.randint(1, capacity * 2) # Keys can be outside current cache range
        value = random.randint(1, 1000)
        ops.append(('put', key, value))
        keys_in_cache.add(key)
    else: # 'get' operation
        if keys_in_cache and random.random() < 0.8: # high chance to get an existing key
            key = random.choice(list(keys_in_cache))
        else: # low chance to get a non-existing key
            key = random.randint(capacity * 2 + 1, capacity * 3)
        ops.append(('get', key, None)) # value is not used for get

def run_lfu_ops(lfu_cache, operations):
    for op_type, key, value in operations:
        if op_type == 'put':
            lfu_cache.put(key, value)
        else:
            lfu_cache.get(key)

time_lfu_ops = run_benchmark(run_lfu_ops, cache_lfu, ops)
print(f"  {num_ops} operations on LFU Cache (Capacity {capacity}): {time_lfu_ops:.6f} seconds (average O(1) per op)")

print("\nBenchmarking Complete.")