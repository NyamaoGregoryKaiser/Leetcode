import time
import functools

def profile_performance(func):
    """
    A decorator to measure the execution time of a function.
    Prints the function name, arguments, and execution time.
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        execution_time = (end_time - start_time) * 1000 # Convert to milliseconds

        print(f"--- Performance Profile ---")
        print(f"Function: {func.__name__}")
        print(f"Arguments: {args}, {kwargs}")
        print(f"Execution Time: {execution_time:.4f} ms")
        print(f"--- End Profile ---")
        return result
    return wrapper

def time_function(func, *args, **kwargs):
    """
    Measures the execution time of a function and returns it,
    along with the function's result.
    """
    start_time = time.perf_counter()
    result = func(*args, **kwargs)
    end_time = time.perf_counter()
    execution_time_ms = (end_time - start_time) * 1000 # Convert to milliseconds
    return result, execution_time_ms

if __name__ == "__main__":
    # Example usage of the decorator
    @profile_performance
    def example_function(n):
        total = 0
        for i in range(n):
            total += i * i
        return total

    print("Running decorated function:")
    example_function(1000000)
    print("\n")

    # Example usage of the utility function
    def another_example(a, b):
        time.sleep(0.05) # Simulate some work
        return a + b

    print("Running utility function:")
    res, exec_time = time_function(another_example, 10, 20)
    print(f"Function 'another_example' returned: {res}, took: {exec_time:.4f} ms")