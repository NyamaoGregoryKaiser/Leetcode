"""
benchmark.py

This script measures the performance of different Linked List algorithms
implemented in `linked_list_problems.py` using `time.perf_counter()`.
It compares different approaches (e.g., iterative vs. recursive)
across various input sizes to demonstrate their efficiency differences.
"""

import time
import random
from typing import List, Optional

from linked_list_utils import list_to_linked_list, linked_list_to_list, create_cycle_list, ListNode
from linked_list_problems import LinkedListProblems

# Initialize problem solver
solver = LinkedListProblems()

# --- Helper Functions for Benchmarking ---

def generate_random_linked_list(size: int) -> Optional[ListNode]:
    """Generates a singly linked list of a given size with random integer values."""
    if size <= 0:
        return None
    arr = [random.randint(1, 100000) for _ in range(size)]
    return list_to_linked_list(arr)

def generate_sorted_linked_list(size: int) -> Optional[ListNode]:
    """Generates a sorted singly linked list of a given size with random integer values."""
    if size <= 0:
        return None
    arr = sorted([random.randint(1, 100000) for _ in range(size)])
    return list_to_linked_list(arr)

def generate_cycle_linked_list(size: int, cycle_pos_ratio: float = 0.5) -> Optional[ListNode]:
    """
    Generates a singly linked list with a cycle.
    The cycle position is determined by cycle_pos_ratio (e.g., 0.5 for middle).
    """
    if size <= 0:
        return None
    arr = [random.randint(1, 100000) for _ in range(size)]
    pos = -1 # No cycle by default
    if size > 1: # A cycle requires at least one node to point back to
        pos = int(size * cycle_pos_ratio)
        if pos >= size: pos = size - 1 # Ensure pos is within bounds for cycle
        if pos < 0: pos = 0
    elif size == 1:
        pos = 0 # Single node self-loop
    return create_cycle_list(arr, pos)

# --- Benchmarking Functions for Each Problem ---

def benchmark_reverse_list(func_name: str, func) -> None:
    """Benchmarks the reverse linked list function."""
    print(f"\n--- Benchmarking Reverse Linked List ({func_name}) ---")
    sizes = [100, 1000, 10000, 50000] # Input list sizes

    for size in sizes:
        # Create a fresh linked list for each benchmark run
        # Note: reverse_list modifies the list in place, so we need a copy
        original_list_data = [random.randint(1, size * 10) for _ in range(size)]
        head = list_to_linked_list(original_list_data)

        start_time = time.perf_counter()
        reversed_head = func(head)
        end_time = time.perf_counter()

        # To avoid side effects for subsequent benchmarks, and to verify,
        # we can convert back to list (but this itself takes time, so only do it once if needed)
        # linked_list_to_list(reversed_head)

        print(f"Size: {size:<6} | Time: {((end_time - start_time) * 1000):>8.4f} ms")

def benchmark_detect_cycle(func_name: str, func) -> None:
    """Benchmarks the detect cycle function."""
    print(f"\n--- Benchmarking Detect Cycle ({func_name}) ---")
    sizes = [100, 1000, 10000, 50000] # Input list sizes
    
    # Test cases for no cycle
    print(f"  --- No Cycle ---")
    for size in sizes:
        head = generate_random_linked_list(size) # No cycle
        start_time = time.perf_counter()
        _ = func(head)
        end_time = time.perf_counter()
        print(f"  No Cycle | Size: {size:<6} | Time: {((end_time - start_time) * 1000):>8.4f} ms")
    
    # Test cases for cycle
    print(f"  --- With Cycle (at middle) ---")
    for size in sizes:
        head = generate_cycle_linked_list(size, cycle_pos_ratio=0.5) # Cycle in middle
        start_time = time.perf_counter()
        _ = func(head)
        end_time = time.perf_counter()
        print(f"  Cycle    | Size: {size:<6} | Time: {((end_time - start_time) * 1000):>8.4f} ms")

def benchmark_merge_two_lists(func_name: str, func) -> None:
    """Benchmarks the merge two sorted lists function."""
    print(f"\n--- Benchmarking Merge Two Sorted Lists ({func_name}) ---")
    sizes = [(50, 50), (500, 500), (5000, 5000), (25000, 25000)] # (size_l1, size_l2)
    
    for size_l1, size_l2 in sizes:
        # Generate two sorted lists
        head1 = generate_sorted_linked_list(size_l1)
        head2 = generate_sorted_linked_list(size_l2)
        
        # Need to copy lists because merge_two_lists modifies them
        # Convert to list and back to create a deep copy for benchmarking
        l1_copy = list_to_linked_list(linked_list_to_list(head1))
        l2_copy = list_to_linked_list(linked_list_to_list(head2))

        start_time = time.perf_counter()
        merged_head = func(l1_copy, l2_copy)
        end_time = time.perf_counter()
        
        # Verify (optional, but good for confidence)
        # linked_list_to_list(merged_head) 

        print(f"Size L1: {size_l1:<5} | Size L2: {size_l2:<5} | Time: {((end_time - start_time) * 1000):>8.4f} ms")

def benchmark_remove_nth_from_end(func_name: str, func) -> None:
    """Benchmarks the remove Nth node from end function."""
    print(f"\n--- Benchmarking Remove Nth Node From End ({func_name}) ---")
    sizes = [100, 1000, 10000, 50000] # Input list sizes
    
    for size in sizes:
        # Test removing from the middle (e.g., n = size // 2)
        n_middle = max(1, size // 2) 
        original_list_data = [random.randint(1, size * 10) for _ in range(size)]
        
        # We need a fresh list for each call as function modifies the list
        head_middle_copy = list_to_linked_list(original_list_data)
        start_time = time.perf_counter()
        _ = func(head_middle_copy, n_middle)
        end_time = time.perf_counter()
        print(f"  Middle | Size: {size:<6} | N: {n_middle:<5} | Time: {((end_time - start_time) * 1000):>8.4f} ms")

        # Test removing the head (n = size)
        n_head = size
        if size > 0: # Cannot remove head from empty list
            head_head_copy = list_to_linked_list(original_list_data)
            start_time = time.perf_counter()
            _ = func(head_head_copy, n_head)
            end_time = time.perf_counter()
            print(f"  Head   | Size: {size:<6} | N: {n_head:<5} | Time: {((end_time - start_time) * 1000):>8.4f} ms")

        # Test removing the tail (n = 1)
        n_tail = 1
        if size > 0:
            head_tail_copy = list_to_linked_list(original_list_data)
            start_time = time.perf_counter()
            _ = func(head_tail_copy, n_tail)
            end_time = time.perf_counter()
            print(f"  Tail   | Size: {size:<6} | N: {n_tail:<5} | Time: {((end_time - start_time) * 1000):>8.4f} ms")


# --- Main Benchmarking Execution ---

if __name__ == "__main__":
    print("Starting Linked List Algorithm Benchmarks...\n")

    # Benchmarking Reverse Linked List
    benchmark_reverse_list("Iterative", solver.reverse_list)
    benchmark_reverse_list("Recursive", solver.reverse_list_recursive)

    # Benchmarking Detect Cycle
    benchmark_detect_cycle("Floyd's Tortoise and Hare", solver.detect_cycle)
    benchmark_detect_cycle("Hash Table", solver.detect_cycle_hash_table)

    # Benchmarking Merge Two Sorted Lists
    benchmark_merge_two_lists("Iterative", solver.merge_two_lists)
    benchmark_merge_two_lists("Recursive", solver.merge_two_lists_recursive)

    # Benchmarking Remove Nth Node From End
    benchmark_remove_nth_from_end("Two-Pointer (Optimal)", solver.remove_nth_from_end)
    benchmark_remove_nth_from_end("Two-Pass", solver.remove_nth_from_end_two_pass)

    print("\nLinked List Algorithm Benchmarks Complete.")