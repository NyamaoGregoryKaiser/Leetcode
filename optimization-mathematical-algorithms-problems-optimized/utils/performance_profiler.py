"""
Utility for performance profiling.

Contains a decorator `time_it` that can be used to measure the execution time
of functions.
"""

import time
import functools

def time_it(func):
    """
    Decorator to measure the execution time of a function.

    Usage:
    @time_it
    def my_function():
        # ... function logic ...
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        elapsed_time = (end_time - start_time) * 1000 # Convert to milliseconds
        print(f"[{func.__name__}] took {elapsed_time:.4f} ms")
        return result
    return wrapper

if __name__ == "__main__":
    # Example usage:
    @time_it
    def example_function_short():
        sum(range(100000))

    @time_it
    def example_function_long(n):
        _ = 0
        for i in range(n):
            _ += i * i

    print("--- Performance Profiler Examples ---")
    example_function_short()
    example_function_long(10**5)
    example_function_long(10**6)
    example_function_long(10**7)