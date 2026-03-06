import time
from functools import wraps

class Stopwatch:
    """
    A simple utility for measuring execution time of code blocks or functions.

    Usage as a context manager:
    ```python
    with Stopwatch("My task"):
        time.sleep(1)
    # Output: My task took 1.00s
    ```

    Usage as a decorator:
    ```python
    @Stopwatch.time_func("My Function")
    def my_function():
        time.sleep(0.5)
    my_function()
    # Output: My Function took 0.50s
    ```
    """
    def __init__(self, name="Operation"):
        self.name = name
        self.start_time = None
        self.end_time = None

    def __enter__(self):
        self.start_time = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end_time = time.perf_counter()
        elapsed_time = self.end_time - self.start_time
        print(f"{self.name} took {elapsed_time:.2f}s")

    @staticmethod
    def time_func(name="Function"):
        """
        Decorator to time the execution of a function.
        """
        def decorator(func):
            @wraps(func)
            def wrapper(*args, **kwargs):
                start_time = time.perf_counter()
                result = func(*args, **kwargs)
                end_time = time.perf_counter()
                elapsed_time = end_time - start_time
                print(f"'{name}' (function '{func.__name__}') took {elapsed_time:.4f}s")
                return result
            return wrapper
        return decorator

if __name__ == '__main__':
    print("--- Stopwatch Demo ---")

    # Demo as a context manager
    with Stopwatch("Sleeping for 1 second"):
        time.sleep(1)

    with Stopwatch("Calculating sum of first 1M numbers"):
        total = sum(range(1_000_000))
        print(f"  Sum: {total}")

    # Demo as a decorator
    @Stopwatch.time_func("Short Delay")
    def short_delay(duration):
        time.sleep(duration)
        return "Done"

    @Stopwatch.time_func("Factorial Calc")
    def factorial(n):
        res = 1
        for i in range(1, n + 1):
            res *= i
        return res

    print(f"Result of short_delay: {short_delay(0.2)}")
    print(f"Result of factorial(10): {factorial(10)}")

    # Nesting example
    with Stopwatch("Outer Operation"):
        time.sleep(0.1)
        with Stopwatch("Inner Operation"):
            time.sleep(0.05)
        time.sleep(0.05)