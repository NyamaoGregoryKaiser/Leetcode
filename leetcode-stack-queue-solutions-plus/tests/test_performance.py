```python
"""
test_performance.py

This script measures the performance of the algorithms implemented in
`src/stack_queue_problems.py` using large test cases.
It leverages the `Timer` utility from `src/utils.py`.
"""

import random
import time
from src.utils import Timer, timer_decorator
from src.stack_queue_problems import (
    is_valid_parentheses,
    MinStack,
    MyQueue,
    max_sliding_window,
    daily_temperatures
)

# --- Configuration for Performance Tests ---
N_LARGE = 1_000_000  # Number of elements for large inputs
K_WINDOW = N_LARGE // 10 # Window size for Sliding Window Max
N_MEDIUM = 100_000
N_SMALL = 10_000

print(f"--- Performance Benchmarks for Stack and Queue Problems ---")
print(f"Large input size (N_LARGE): {N_LARGE:,}")
print(f"Medium input size (N_MEDIUM): {N_MEDIUM:,}")
print(f"Small input size (N_SMALL): {N_SMALL:,}")
print("-" * 60)

# --- Helper for generating test data ---
def generate_parentheses_string(length):
    """Generates a mostly valid, long parentheses string."""
    chars = ['(', ')', '{', '}', '[', ']']
    s_list = []
    open_brackets = []
    for _ in range(length // 2):
        open_char = random.choice(['(', '{', '['])
        s_list.append(open_char)
        open_brackets.append(open_char)
    random.shuffle(open_brackets) # Mix up closing order
    for open_char in open_brackets:
        if open_char == '(': s_list.append(')')
        if open_char == '{': s_list.append('}')
        if open_char == '[': s_list.append(']')
    random.shuffle(s_list) # Introduce some disorder to challenge validation
    return "".join(s_list[:length]) # Ensure exact length if shuffle made it longer


def generate_random_nums(length, min_val=0, max_val=1000):
    """Generates a list of random integers."""
    return [random.randint(min_val, max_val) for _ in range(length)]

def generate_temperatures(length, min_temp=30, max_temp=100):
    """Generates a list of random temperatures."""
    return [random.randint(min_temp, max_temp) for _ in range(length)]


# --- Test Performance for Problem 1: Valid Parentheses ---
@timer_decorator
def benchmark_valid_parentheses(n):
    test_string = generate_parentheses_string(n)
    is_valid_parentheses(test_string)

print("\n[Problem 1: Valid Parentheses]")
benchmark_valid_parentheses(N_LARGE)


# --- Test Performance for Problem 2: Min Stack ---
@timer_decorator
def benchmark_min_stack(n):
    minStack = MinStack()
    for _ in range(n):
        val = random.randint(-1_000_000, 1_000_000)
        minStack.push(val)
    # Perform some pop and getMin operations
    for _ in range(n // 10): # Pop 10%
        if not minStack.stack: break
        minStack.pop()
        minStack.getMin()

print("\n[Problem 2: Min Stack]")
benchmark_min_stack(N_LARGE)


# --- Test Performance for Problem 3: Implement Queue using Stacks ---
@timer_decorator
def benchmark_my_queue(n):
    myQueue = MyQueue()
    for _ in range(n):
        myQueue.push(random.randint(0, N_LARGE))
    for _ in range(n // 2): # Pop 50%
        if myQueue.empty(): break
        myQueue.pop()
        myQueue.peek() # Peek after pop

print("\n[Problem 3: Implement Queue using Stacks]")
benchmark_my_queue(N_LARGE)


# --- Test Performance for Problem 4: Sliding Window Maximum ---
@timer_decorator
def benchmark_max_sliding_window(n, k):
    nums = generate_random_nums(n)
    max_sliding_window(nums, k)

print(f"\n[Problem 4: Sliding Window Maximum (N={N_LARGE}, K={K_WINDOW})]")
benchmark_max_sliding_window(N_LARGE, K_WINDOW)
print(f"[Problem 4: Sliding Window Maximum (N={N_LARGE}, K=1)]")
benchmark_max_sliding_window(N_LARGE, 1) # Edge case: k=1
print(f"[Problem 4: Sliding Window Maximum (N={N_LARGE}, K={N_LARGE})] - full array window")
benchmark_max_sliding_window(N_LARGE, N_LARGE) # Edge case: k=N


# --- Test Performance for Problem 5: Daily Temperatures ---
@timer_decorator
def benchmark_daily_temperatures(n):
    temps = generate_temperatures(n)
    daily_temperatures(temps)

print("\n[Problem 5: Daily Temperatures]")
benchmark_daily_temperatures(N_LARGE)


print("\n--- Performance tests complete ---")

```