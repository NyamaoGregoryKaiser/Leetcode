import time
import functools

class Stopwatch:
    """
    A simple context manager for timing code execution.

    Usage:
        with Stopwatch("My operation"):
            # code to be timed
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
            print(f"[{self.name}] Elapsed time: {self.elapsed_time:.6f} seconds")
        else:
            print(f"Elapsed time: {self.elapsed_time:.6f} seconds")

def timed(func):
    """
    A decorator to measure the execution time of a function.

    Usage:
        @timed
        def my_function():
            # ...
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        elapsed_time = end_time - start_time
        print(f"Function '{func.__name__}' took {elapsed_time:.6f} seconds")
        return result
    return wrapper

if __name__ == '__main__':
    # Example usage of Stopwatch context manager
    with Stopwatch("Short loop"):
        _ = [i for i in range(1000000)]

    def complex_calculation(n):
        total = 0
        for i in range(n):
            for j in range(n):
                total += i * j
        return total

    # Example usage with the @timed decorator
    @timed
    def run_calculation():
        return complex_calculation(1000)

    result = run_calculation()
    print(f"Calculation result: {result}")

    # You can also get the time from the context manager after it exits
    with Stopwatch() as sw:
        time.sleep(0.01)
    print(f"Raw elapsed time from object: {sw.elapsed_time:.6f} seconds")
```