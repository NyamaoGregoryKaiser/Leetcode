import timeit
import random
import sys
import os
from functools import partial

# Add parent directory to path to allow importing main_algorithms
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main_algorithms.problem_01_valid_parentheses import Solution as ValidParenthesesSolution
from main_algorithms.problem_02_min_stack import MinStack
from main_algorithms.problem_03_queue_using_stacks import MyQueue
from main_algorithms.problem_04_sliding_window_maximum import Solution as SlidingWindowMaximumSolution
from main_algorithms.problem_05_rotten_oranges import Solution as RottenOrangesSolution
from paradigms.problem_04_sliding_window_maximum_alt import Solution as BruteForceSlidingWindowSolution

def run_benchmark(setup_code, statement_code, number=1000, repeat=5):
    """Helper function to run timeit benchmarks."""
    times = timeit.repeat(setup_code, statement_code, number=number, repeat=repeat, globals=globals())
    min_time = min(times) / number * 1_000_000 # Convert to microseconds
    avg_time = sum(times) / len(times) / number * 1_000_000
    return min_time, avg_time

def generate_parentheses_string(length):
    """Generates a pseudo-random valid or invalid parentheses string."""
    if length % 2 != 0: # Ensure string is always even for potential validity
        length += 1
    chars = "()[]{}"
    s = []
    stack_tracker = [] # Use to increase chances of validity
    for _ in range(length):
        if random.random() < 0.6 and len(stack_tracker) > 0: # More likely to close if open
            open_char = stack_tracker.pop()
            if open_char == '(': s.append(')')
            elif open_char == '[': s.append(']')
            elif open_char == '{': s.append('}')
        else:
            open_char = random.choice('([{')
            s.append(open_char)
            stack_tracker.append(open_char)
    # Ensure remaining open brackets are closed
    while stack_tracker:
        open_char = stack_tracker.pop()
        if open_char == '(': s.append(')')
        elif open_char == '[': s.append(']')
        elif open_char == '{': s.append('}')
    if len(s) > length:
        s = s[:length]
    return "".join(s)

def benchmark_valid_parentheses():
    print("\n--- Benchmarking Valid Parentheses ---")
    sizes = [100, 1000, 10000, 100000]
    for size in sizes:
        s = generate_parentheses_string(size)
        setup = f"from main_algorithms.problem_01_valid_parentheses import Solution as ValidParenthesesSolution; sol = ValidParenthesesSolution(); s = '{s}'"
        statement = "sol.isValid(s)"
        min_t, avg_t = run_benchmark(setup, statement)
        print(f"String length: {size:<6} | Min time: {min_t:.2f} us | Avg time: {avg_t:.2f} us")

def benchmark_min_stack():
    print("\n--- Benchmarking Min Stack ---")
    ops_counts = [100, 1000, 10000, 50000] # Number of push operations
    for count in ops_counts:
        # Generate a sequence of pushes
        push_vals = [random.randint(-10000, 10000) for _ in range(count)]
        
        # We'll measure the time for `count` pushes followed by `count` pops and `count` getMin calls
        setup = f"""
from main_algorithms.problem_02_min_stack import MinStack
min_stack = MinStack()
push_vals = {push_vals}
"""
        # Benchmark push operations
        push_statement = """
for val in push_vals:
    min_stack.push(val)
"""
        min_t_push, avg_t_push = run_benchmark(setup, push_statement, number=1, repeat=3) # Run once per setup
        print(f"Pushes: {count:<6} | Min time (push): {min_t_push:.2f} us | Avg time (push): {avg_t_push:.2f} us")

        # Benchmark pop and getMin operations on the filled stack
        # Reset stack state for pop/getMin, but ensure it's filled
        setup_pop_getmin = f"""
from main_algorithms.problem_02_min_stack import MinStack
min_stack = MinStack()
push_vals = {push_vals}
for val in push_vals:
    min_stack.push(val)
"""
        pop_getmin_statement = """
for _ in range({count}):
    min_stack.getMin()
    min_stack.pop()
"""
        min_t_pop_getmin, avg_t_pop_getmin = run_benchmark(setup_pop_getmin, pop_getmin_statement, number=1, repeat=3)
        print(f"Pops/getMin: {count:<6} | Min time (pop/getMin): {min_t_pop_getmin:.2f} us | Avg time (pop/getMin): {avg_t_pop_getmin:.2f} us")

def benchmark_queue_using_stacks():
    print("\n--- Benchmarking Queue Using Stacks ---")
    ops_counts = [100, 1000, 10000, 50000] # Number of enqueue operations
    for count in ops_counts:
        # We'll enqueue `count` items then dequeue `count` items
        enqueue_vals = [random.randint(1, 100) for _ in range(count)]

        setup = f"""
from main_algorithms.problem_03_queue_using_stacks import MyQueue
q = MyQueue()
enqueue_vals = {enqueue_vals}
"""
        statement = """
for val in enqueue_vals:
    q.push(val)
for _ in range(len(enqueue_vals)):
    q.pop()
"""
        min_t, avg_t = run_benchmark(setup, statement, number=50, repeat=3) # Reduced number for potentially O(N) operations
        print(f"Enqueue/Dequeue {count:<6} | Min time: {min_t:.2f} us | Avg time: {avg_t:.2f} us")

def benchmark_sliding_window_maximum():
    print("\n--- Benchmarking Sliding Window Maximum ---")
    
    # Random test case generation for performance:
    # `nums` length `N`, window size `k`
    # Common scenarios: small k, large k, k ~ N/2
    test_cases = [
        (10000, 100), (10000, 1000), (10000, 5000),
        (100000, 100), (100000, 1000), (100000, 10000), (100000, 50000)
    ]

    for N, k in test_cases:
        nums = [random.randint(-10000, 10000) for _ in range(N)]
        
        print(f"\nArray length: {N:<7} | Window size: {k:<5}")

        # Benchmarking optimized solution
        setup_optimized = f"""
from main_algorithms.problem_04_sliding_window_maximum import Solution as SlidingWindowMaximumSolution
sol_opt = SlidingWindowMaximumSolution()
nums = {nums}
k = {k}
"""
        statement_optimized = "sol_opt.maxSlidingWindow(nums, k)"
        min_t_opt, avg_t_opt = run_benchmark(setup_optimized, statement_optimized, number=5, repeat=3)
        print(f"  Optimized (Monotonic Deque): Min time: {min_t_opt:.2f} us | Avg time: {avg_t_opt:.2f} us")

        # Benchmarking brute-force solution (if N*K is not too large)
        if N * k <= 10**7: # Limit brute force to avoid extremely long runtimes
            setup_brute_force = f"""
from paradigms.problem_04_sliding_window_maximum_alt import Solution as BruteForceSlidingWindowSolution
sol_bf = BruteForceSlidingWindowSolution()
nums = {nums}
k = {k}
"""
            statement_brute_force = "sol_bf.maxSlidingWindow(nums, k)"
            min_t_bf, avg_t_bf = run_benchmark(setup_brute_force, statement_brute_force, number=5, repeat=3)
            print(f"  Brute-Force (O(NK)):   Min time: {min_t_bf:.2f} us | Avg time: {avg_t_bf:.2f} us")
        else:
            print("  Brute-Force (O(NK)): Skipped for large N*K to prevent excessively long runtime.")

def generate_grid(rows, cols, fresh_prob=0.5, rotten_prob=0.1):
    """Generates a random grid for Rotten Oranges."""
    grid = []
    for _ in range(rows):
        row = []
        for _ in range(cols):
            r = random.random()
            if r < rotten_prob:
                row.append(2) # Rotten
            elif r < rotten_prob + fresh_prob:
                row.append(1) # Fresh
            else:
                row.append(0) # Empty
        grid.append(row)
    return grid

def benchmark_rotten_oranges():
    print("\n--- Benchmarking Rotten Oranges (BFS) ---")
    grid_sizes = [(10, 10), (50, 50), (100, 100)] # (rows, cols)
    
    for R, C in grid_sizes:
        grid_template = generate_grid(R, C)
        # Deep copy the grid for each run, as the algorithm modifies it
        grid_str = str(grid_template) # Convert to string to pass to setup

        setup = f"""
import copy
from main_algorithms.problem_05_rotten_oranges import Solution as RottenOrangesSolution
sol = RottenOrangesSolution()
base_grid = {grid_str}
grid_to_test = copy.deepcopy(base_grid)
"""
        statement = "sol.orangesRotting(grid_to_test)"
        min_t, avg_t = run_benchmark(setup, statement, number=10, repeat=3)
        print(f"Grid size: {R}x{C:<4} | Min time: {min_t:.2f} us | Avg time: {avg_t:.2f} us")


if __name__ == "__main__":
    benchmark_valid_parentheses()
    benchmark_min_stack()
    benchmark_queue_using_stacks()
    benchmark_sliding_window_maximum()
    benchmark_rotten_oranges()