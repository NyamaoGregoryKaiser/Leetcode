import time
from functools import wraps

def timer(func):
    """
    A decorator that measures the execution time of a function.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        execution_time = (end_time - start_time) * 1000 # Convert to milliseconds
        print(f"  - {func.__name__}: {execution_time:.4f} ms")
        return result
    return wrapper

def run_benchmark(func, *args, **kwargs):
    """
    Runs a function multiple times and reports the average execution time.
    """
    num_runs = kwargs.pop('num_runs', 1000)
    total_time = 0

    # Warm-up run to ensure everything is loaded and compiled (if applicable)
    func(*args, **kwargs)

    for _ in range(num_runs):
        start_time = time.perf_counter()
        func(*args, **kwargs)
        end_time = time.perf_counter()
        total_time += (end_time - start_time)

    avg_time_ms = (total_time / num_runs) * 1000
    print(f"  - {func.__name__} (avg over {num_runs} runs): {avg_time_ms:.6f} ms")
    return avg_time_ms