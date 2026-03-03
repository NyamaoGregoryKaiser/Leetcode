# performance_benchmark.py

import timeit
from functools import partial
import random
from utils.linked_list_utils import (
    create_linked_list_from_list,
    convert_linked_list_to_list, # Needed for result validation/conversion, but not part of algo.
    create_linked_list_with_cycle
)

from main_algorithms.reverse_list import SolutionReverseList
from main_algorithms.merge_sorted_lists import SolutionMergeSortedLists
from main_algorithms.detect_cycle import SolutionDetectCycle
from main_algorithms.remove_nth_from_end import SolutionRemoveNthFromEnd
from main_algorithms.palindrome_list import SolutionPalindromeList

# --- Setup Solvers ---
reverse_solver = SolutionReverseList()
merge_solver = SolutionMergeSortedLists()
cycle_solver = SolutionDetectCycle()
remove_nth_solver = SolutionRemoveNthFromEnd()
palindrome_solver = SolutionPalindromeList()

# --- Benchmark Configuration ---
NUMBER_OF_RUNS = 100 # Number of times to run each `timeit` call
LIST_SIZES = [10, 100, 1000, 5000, 10000] # Different N values for linked list size

def generate_random_list(size):
    return [random.randint(1, size * 2) for _ in range(size)]

def generate_sorted_list(size):
    return sorted(generate_random_list(size))

def generate_palindrome_list(size):
    half_size = size // 2
    first_half = [random.randint(1, 100) for _ in range(half_size)]
    if size % 2 == 1:
        return first_half + [random.randint(1, 100)] + first_half[::-1]
    return first_half + first_half[::-1]

def run_benchmark(stmt, setup_code, num_runs=NUMBER_OF_RUNS):
    """Helper to run timeit and return average time."""
    timer = timeit.Timer(stmt, setup_code)
    # Using timeit.repeat to get multiple timings and average them,
    # to account for system fluctuations.
    times = timer.repeat(repeat=5, number=num_runs)
    return min(times) / num_runs # Return the fastest run's average, or simply average of all runs.
                                 # Using min(times) is common to reduce impact of transient system load.

print("--- Linked List Algorithm Benchmarking ---")
print(f"Number of runs for each test: {NUMBER_OF_RUNS}")
print(f"List sizes tested: {LIST_SIZES}\n")

# --- Benchmarking functions ---

# 1. Reverse Linked List
print("Benchmarking Reverse Linked List:")
print(f"{'List Size':<10} | {'Iterative (s)':<15} | {'Recursive (s)':<15}")
print("-" * 50)
for size in LIST_SIZES:
    input_list = generate_random_list(size)
    
    # Iterative
    setup_iterative = f"""
from __main__ import reverse_solver, create_linked_list_from_list
head = create_linked_list_from_list({input_list})
"""
    stmt_iterative = "reverse_solver.reverseList_iterative(head)"
    time_iterative = run_benchmark(stmt_iterative, setup_iterative)

    # Recursive (need to recreate head each time for recursive call)
    setup_recursive = f"""
from __main__ import reverse_solver, create_linked_list_from_list
head = create_linked_list_from_list({input_list})
"""
    stmt_recursive = "reverse_solver.reverseList_recursive(head)"
    time_recursive = run_benchmark(stmt_recursive, setup_recursive)
    
    print(f"{size:<10} | {time_iterative:<15.8f} | {time_recursive:<15.8f}")
print("\n")


# 2. Merge Two Sorted Lists
print("Benchmarking Merge Two Sorted Lists:")
print(f"{'List Size (M+N)':<18} | {'Iterative (s)':<15} | {'Recursive (s)':<15}")
print("-" * 60)
for size in LIST_SIZES:
    list1_vals = generate_sorted_list(size // 2)
    list2_vals = generate_sorted_list(size - size // 2)
    
    # Iterative
    setup_iterative = f"""
from __main__ import merge_solver, create_linked_list_from_list
list1_head = create_linked_list_from_list({list1_vals})
list2_head = create_linked_list_from_list({list2_vals})
"""
    stmt_iterative = "merge_solver.mergeTwoLists_iterative(list1_head, list2_head)"
    time_iterative = run_benchmark(stmt_iterative, setup_iterative)

    # Recursive
    setup_recursive = f"""
from __main__ import merge_solver, create_linked_list_from_list
list1_head = create_linked_list_from_list({list1_vals})
list2_head = create_linked_list_from_list({list2_vals})
"""
    stmt_recursive = "merge_solver.mergeTwoLists_recursive(list1_head, list2_head)"
    time_recursive = run_benchmark(stmt_recursive, setup_recursive)

    print(f"{size:<18} | {time_iterative:<15.8f} | {time_recursive:<15.8f}")
print("\n")


# 3. Detect Cycle
print("Benchmarking Detect Cycle:")
print(f"{'List Size':<10} | {'Has Cycle (s)':<15} | {'Detect Start (s)':<15} | {'Cycle Length (s)':<15}")
print("-" * 70)
for size in LIST_SIZES:
    # Test with no cycle
    no_cycle_list = generate_random_list(size)
    
    setup_no_cycle = f"""
from __main__ import cycle_solver, create_linked_list_from_list
head = create_linked_list_from_list({no_cycle_list}) # Recreate for each call
"""
    time_has_cycle_no = run_benchmark("cycle_solver.hasCycle(head)", setup_no_cycle)
    time_detect_start_no = run_benchmark("cycle_solver.detectCycle(head)", setup_no_cycle)
    time_cycle_length_no = run_benchmark("cycle_solver.cycleLength(head)", setup_no_cycle)

    # Test with cycle (e.g., cycle at middle, pos = size // 2)
    if size > 1: # Need at least 2 nodes for a cycle
        pos = size // 2
        cycle_list = generate_random_list(size)
        
        setup_with_cycle = f"""
from __main__ import cycle_solver, create_linked_list_with_cycle
head = create_linked_list_with_cycle({cycle_list}, {pos}) # Recreate for each call
"""
        time_has_cycle_yes = run_benchmark("cycle_solver.hasCycle(head)", setup_with_cycle)
        time_detect_start_yes = run_benchmark("cycle_solver.detectCycle(head)", setup_with_cycle)
        time_cycle_length_yes = run_benchmark("cycle_solver.cycleLength(head)", setup_with_cycle)

        print(f"{size:<10} | (no){time_has_cycle_no:.8f} (yes){time_has_cycle_yes:.8f} | (no){time_detect_start_no:.8f} (yes){time_detect_start_yes:.8f} | (no){time_cycle_length_no:.8f} (yes){time_cycle_length_yes:.8f}")
    else:
        # For size 0 or 1, a proper cycle (pos >= 0) is not meaningful or possible.
        # So we just print the no-cycle times.
        print(f"{size:<10} | {time_has_cycle_no:.8f} | {time_detect_start_no:.8f} | {time_cycle_length_no:.8f}")
print("\n")


# 4. Remove Nth Node From End
print("Benchmarking Remove Nth Node From End:")
print(f"{'List Size':<10} | {'Two Pass (s)':<15} | {'One Pass (s)':<15}")
print("-" * 50)
for size in LIST_SIZES:
    if size == 0: continue # Cannot remove from empty list
    input_list = generate_random_list(size)
    n = random.randint(1, size) # n must be valid, 1-indexed
    
    # Two Pass
    setup_two_pass = f"""
from __main__ import remove_nth_solver, create_linked_list_from_list
head = create_linked_list_from_list({input_list})
"""
    stmt_two_pass = f"remove_nth_solver.removeNthFromEnd_two_pass(head, {n})"
    time_two_pass = run_benchmark(stmt_two_pass, setup_two_pass)

    # One Pass
    setup_one_pass = f"""
from __main__ import remove_nth_solver, create_linked_list_from_list
head = create_linked_list_from_list({input_list})
"""
    stmt_one_pass = f"remove_nth_solver.removeNthFromEnd_one_pass(head, {n})"
    time_one_pass = run_benchmark(stmt_one_pass, setup_one_pass)
    
    print(f"{size:<10} | {time_two_pass:<15.8f} | {time_one_pass:<15.8f}")
print("\n")


# 5. Palindrome Linked List
print("Benchmarking Palindrome Linked List:")
print(f"{'List Size':<10} | {'Optimized O(1) Space (s)':<25} | {'Auxiliary O(N) Space (s)':<25}")
print("-" * 70)
for size in LIST_SIZES:
    # Test with palindrome
    palindrome_list = generate_palindrome_list(size)
    
    setup_optimized = f"""
from __main__ import palindrome_solver, create_linked_list_from_list
head = create_linked_list_from_list({palindrome_list})
"""
    stmt_optimized = "palindrome_solver.isPalindrome(head)"
    time_optimized = run_benchmark(stmt_optimized, setup_optimized)

    setup_aux_space = f"""
from __main__ import palindrome_solver, create_linked_list_from_list
head = create_linked_list_from_list({palindrome_list})
"""
    stmt_aux_space = "palindrome_solver.isPalindrome_aux_space(head)"
    time_aux_space = run_benchmark(stmt_aux_space, setup_aux_space)
    
    print(f"{size:<10} | {time_optimized:<25.8f} | {time_aux_space:<25.8f}")
print("\n")