```python
"""
utils.py

This file contains helper utilities for the project, such as a Timer
context manager for performance benchmarking.
"""

import time
import functools

class Timer:
    """
    A context manager for timing code execution.

    Usage:
    with Timer("My Operation"):
        # Code to be timed
        time.sleep(1)
    # Output: My Operation took 1.0001 seconds.
    """
    def __init__(self, name=None):
        self.name = name
        self.start_time = None
        self.end_time = None
        self.elapsed_time = None

    def __enter__(self):
        self.start_time = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end_time = time.perf_counter()
        self.elapsed_time = self.end_time - self.start_time
        if self.name:
            print(f"'{self.name}' took {self.elapsed_time:.4f} seconds.")
        else:
            print(f"Code block took {self.elapsed_time:.4f} seconds.")

def timer_decorator(func):
    """
    A decorator to time function execution.

    Usage:
    @timer_decorator
    def my_function():
        # ...
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        with Timer(f"Function '{func.__name__}'"):
            return func(*args, **kwargs)
    return wrapper

if __name__ == "__main__":
    print("--- Timer Context Manager Demo ---")

    with Timer("Short Sleep"):
        time.sleep(0.1)

    with Timer("Longer Calculation"):
        _ = [i * i for i in range(1_000_000)]

    print("\n--- Timer Decorator Demo ---")

    @timer_decorator
    def calculate_sum(n):
        return sum(range(n))

    @timer_decorator
    def perform_io_simulation():
        time.sleep(0.05)
        return "IO done"

    result_sum = calculate_sum(10_000_000)
    print(f"Sum result: {result_sum}")

    io_result = perform_io_simulation()
    print(f"IO result: {io_result}")
```