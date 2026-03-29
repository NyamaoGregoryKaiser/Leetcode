# benchmarks/benchmark_runner.py
import sys
import os
import time
import random

# Add the 'src' directory to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from stack_queue_problems import (
    is_valid_parentheses,
    is_valid_parentheses_naive,
    MinStack,
    MinStackTuple,
    MyQueue,
    MyStack,
    daily_temperatures,
    daily_temperatures_brute_force
)

# --- Utility for timing ---
def time_function(func, *args, iterations=100):
    """Times a function and returns the average execution time."""
    total_time = 0
    for _ in range(iterations):
        # Re-initialize objects if they are stateful classes
        if func.__name__ == 'MinStack_ops':
            min_stack_instance = MinStack()
            ops_list = args[0]
            start_time = time.perf_counter()
            for op, val in ops_list:
                if op == 'push': min_stack_instance.push(val)
                elif op == 'pop': min_stack_instance.pop()
                elif op == 'top': min_stack_instance.top()
                elif op == 'getMin': min_stack_instance.getMin()
            end_time = time.perf_counter()
        elif func.__name__ == 'MinStackTuple_ops':
            min_stack_instance = MinStackTuple()
            ops_list = args[0]
            start_time = time.perf_counter()
            for op, val in ops_list:
                if op == 'push': min_stack_instance.push(val)
                elif op == 'pop': min_stack_instance.pop()
                elif op == 'top': min_stack_instance.top()
                elif op == 'getMin': min_stack_instance.getMin()
            end_time = time.perf_counter()
        elif func.__name__ == 'MyQueue_ops':
            my_queue_instance = MyQueue()
            ops_list = args[0]
            start_time = time.perf_counter()
            for op, val in ops_list:
                if op == 'push': my_queue_instance.push(val)
                elif op == 'pop': my_queue_instance.pop()
                elif op == 'peek': my_queue_instance.peek()
                elif op == 'empty': my_queue_instance.empty()
            end_time = time.perf_counter()
        elif func.__name__ == 'MyStack_ops':
            my_stack_instance = MyStack()
            ops_list = args[0]
            start_time = time.perf_counter()
            for op, val in ops_list:
                if op == 'push': my_stack_instance.push(val)
                elif op == 'pop': my_stack_instance.pop()
                elif op == 'top': my_stack_instance.top()
                elif op == 'empty': my_stack_instance.empty()
            end_time = time.perf_counter()
        else: # For stateless functions
            start_time = time.perf_counter()
            func(*args)
            end_time = time.perf_counter()
        total_time += (end_time - start_time)
    return total_time / iterations

# --- Benchmark Functions ---

def benchmark_valid_parentheses():
    print("\n--- Benchmarking: Valid Parentheses ---")
    sizes = [1000, 10000, 100000] # String lengths

    for size in sizes:
        # Generate a long, valid string
        long_valid_s = "()[]{}" * (size // 6)
        # Generate a long, invalid string (all open brackets)
        long_invalid_s_open = "(" * size

        print(f"\nString Length: {size}")

        # Optimal Solution
        time_optimal_valid = time_function(is_valid_parentheses, long_valid_s, iterations=10)
        print(f"  Optimal (valid)  : {time_optimal_valid:.6f} seconds/call")
        time_optimal_invalid = time_function(is_valid_parentheses, long_invalid_s_open, iterations=10)
        print(f"  Optimal (invalid): {time_optimal_invalid:.6f} seconds/call")

        # Naive Solution (for comparison, though correctness differs)
        # It's not truly a brute force, more of an incorrect simpler approach.
        time_naive_valid = time_function(is_valid_parentheses_naive, long_valid_s, iterations=10)
        print(f"  Naive (valid)    : {time_naive_valid:.6f} seconds/call")
        time_naive_invalid = time_function(is_valid_parentheses_naive, long_invalid_s_open, iterations=10)
        print(f"  Naive (invalid)  : {time_naive_invalid:.6f} seconds/call")


def benchmark_min_stack():
    print("\n--- Benchmarking: Min Stack ---")
    num_ops = [1000, 10000, 50000]

    for n_ops in num_ops:
        print(f"\nNumber of Operations: {n_ops}")
        
        # Generate a sequence of operations
        ops_list = []
        for _ in range(n_ops):
            if not ops_list or random.random() < 0.7: # Mostly push
                ops_list.append(('push', random.randint(-10000, 10000)))
            else: # Sometimes pop, top, getMin
                choice = random.choice(['pop', 'top', 'getMin'])
                if choice == 'pop':
                    if MinStack()._MinStack__len__() > 0: # Check if pop is possible (rough check)
                        ops_list.append(('pop', None))
                elif choice == 'top':
                    if MinStack()._MinStack__len__() > 0:
                        ops_list.append(('top', None))
                elif choice == 'getMin':
                    if MinStack()._MinStack__len__() > 0:
                        ops_list.append(('getMin', None))
        
        # Wrap operations for timing stateful classes
        def run_min_stack_ops(ops):
            min_stack_instance = MinStack()
            for op, val in ops:
                try:
                    if op == 'push': min_stack_instance.push(val)
                    elif op == 'pop': min_stack_instance.pop()
                    elif op == 'top': min_stack_instance.top()
                    elif op == 'getMin': min_stack_instance.getMin()
                except IndexError: # Ignore errors for benchmark
                    pass 

        def run_min_stack_tuple_ops(ops):
            min_stack_instance = MinStackTuple()
            for op, val in ops:
                try:
                    if op == 'push': min_stack_instance.push(val)
                    elif op == 'pop': min_stack_instance.pop()
                    elif op == 'top': min_stack_instance.top()
                    elif op == 'getMin': min_stack_instance.getMin()
                except IndexError: # Ignore errors for benchmark
                    pass

        time_optimal = time_function(run_min_stack_ops, ops_list, iterations=5) # Reduced iterations for N_ops
        print(f"  Optimal (Two Stacks): {time_optimal:.6f} seconds/sequence")

        time_tuple = time_function(run_min_stack_tuple_ops, ops_list, iterations=5)
        print(f"  Alternative (Tuple) : {time_tuple:.6f} seconds/sequence")


def benchmark_queue_using_stacks():
    print("\n--- Benchmarking: Implement Queue using Stacks ---")
    num_ops = [1000, 10000, 50000]

    for n_ops in num_ops:
        print(f"\nNumber of Operations: {n_ops}")

        ops_list = []
        for _ in range(n_ops):
            rand = random.random()
            if rand < 0.6: # Push
                ops_list.append(('push', random.randint(1, 100)))
            else: # Pop, peek, empty
                choice = random.choice(['pop', 'peek', 'empty'])
                if choice == 'pop': ops_list.append(('pop', None))
                elif choice == 'peek': ops_list.append(('peek', None))
                elif choice == 'empty': ops_list.append(('empty', None))
        
        def run_my_queue_ops(ops):
            my_queue_instance = MyQueue()
            for op, val in ops:
                try:
                    if op == 'push': my_queue_instance.push(val)
                    elif op == 'pop': my_queue_instance.pop()
                    elif op == 'peek': my_queue_instance.peek()
                    elif op == 'empty': my_queue_instance.empty()
                except IndexError:
                    pass

        time_my_queue = time_function(run_my_queue_ops, ops_list, iterations=5)
        print(f"  MyQueue (Two Stacks): {time_my_queue:.6f} seconds/sequence")


def benchmark_stack_using_queues():
    print("\n--- Benchmarking: Implement Stack using Queues ---")
    num_ops = [1000, 5000, 10000] # Smaller range due to O(N) push

    for n_ops in num_ops:
        print(f"\nNumber of Operations: {n_ops}")

        ops_list = []
        for _ in range(n_ops):
            rand = random.random()
            if rand < 0.6: # Push
                ops_list.append(('push', random.randint(1, 100)))
            else: # Pop, top, empty
                choice = random.choice(['pop', 'top', 'empty'])
                if choice == 'pop': ops_list.append(('pop', None))
                elif choice == 'top': ops_list.append(('top', None))
                elif choice == 'empty': ops_list.append(('empty', None))
        
        def run_my_stack_ops(ops):
            my_stack_instance = MyStack()
            for op, val in ops:
                try:
                    if op == 'push': my_stack_instance.push(val)
                    elif op == 'pop': my_stack_instance.pop()
                    elif op == 'top': my_stack_instance.top()
                    elif op == 'empty': my_stack_instance.empty()
                except IndexError:
                    pass

        time_my_stack = time_function(run_my_stack_ops, ops_list, iterations=5)
        print(f"  MyStack (One Queue, O(N) Push): {time_my_stack:.6f} seconds/sequence")


def benchmark_daily_temperatures():
    print("\n--- Benchmarking: Daily Temperatures ---")
    sizes = [10000, 50000, 100000]

    for size in sizes:
        print(f"\nArray Size: {size}")

        # Test Case 1: Monotonically decreasing (worst case for stack size, best for pops)
        decreasing_temps = list(range(size, 0, -1))
        # Test Case 2: Monotonically increasing (best case for stack size, many pops)
        increasing_temps = list(range(1, size + 1))
        # Test Case 3: Random/Mixed
        mixed_temps = [random.randint(20, 100) for _ in range(size)]
        # Test Case 4: Long decreasing then one spike (worst case for stack pops)
        spike_temps = list(range(size // 2, 0, -1)) + [size // 2 + 1] * (size - size // 2)

        test_cases = {
            "Decreasing": decreasing_temps,
            "Increasing": increasing_temps,
            "Mixed": mixed_temps,
            "Spike": spike_temps
        }

        for name, temps in test_cases.items():
            print(f"  Case: {name}")
            
            # Optimal (Monotonic Stack)
            time_optimal = time_function(daily_temperatures, temps, iterations=5)
            print(f"    Optimal (Monotonic Stack): {time_optimal:.6f} seconds/call")
            
            # Brute Force (only for smaller sizes)
            if size <= 5000: # O(N^2) for N=100k is too slow (10^10 ops)
                time_brute_force = time_function(daily_temperatures_brute_force, temps, iterations=5)
                print(f"    Brute Force (O(N^2))     : {time_brute_force:.6f} seconds/call")
            else:
                print(f"    Brute Force (O(N^2))     : Skipped for N={size} (too slow)")


if __name__ == '__main__':
    print("Starting benchmarks...")
    benchmark_valid_parentheses()
    benchmark_min_stack()
    benchmark_queue_using_stacks()
    benchmark_stack_using_queues()
    benchmark_daily_temperatures()
    print("\nAll benchmarks finished.")