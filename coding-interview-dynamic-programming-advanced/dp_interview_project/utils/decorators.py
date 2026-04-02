```python
import time
import functools

def custom_memoize(func):
    """
    A custom memoization decorator for functions that take hashable arguments.
    Similar to functools.lru_cache, but implemented manually for educational purposes.
    """
    cache = {}

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Create a hashable key from positional and keyword arguments
        # For simplicity, this assumes kwargs are not deeply nested or non-hashable.
        # More robust solution might involve sorting kwargs or using a custom hash for complex types.
        key = (args, frozenset(kwargs.items()))
        if key in cache:
            return cache[key]
        
        result = func(*args, **kwargs)
        cache[key] = result
        return result
    return wrapper

def time_it(func):
    """
    A decorator to measure the execution time of a function.
    Prints the time taken by the function.
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        print(f"'{func.__name__}' executed in {end_time - start_time:.6f} seconds.")
        return result
    return wrapper

if __name__ == '__main__':
    # Example usage of custom_memoize
    @custom_memoize
    def fib_memoized_custom(n):
        if n <= 1:
            return n
        return fib_memoized_custom(n - 1) + fib_memoized_custom(n - 2)

    print("--- Custom Memoize Example ---")
    print(f"fib_memoized_custom(10): {fib_memoized_custom(10)}")
    print(f"fib_memoized_custom(20): {fib_memoized_custom(20)}")
    print(f"fib_memoized_custom(10): {fib_memoized_custom(10)} (cached)") # Should be faster

    # Example usage of time_it
    @time_it
    def long_running_task(n):
        total = 0
        for i in range(n):
            total += i * i
        return total

    print("\n--- Time It Example ---")
    _ = long_running_task(10**6)

    # Combined example
    @time_it
    @custom_memoize # Decorators apply from bottom-up
    def fib_combined(n):
        if n <= 1:
            return n
        return fib_combined(n - 1) + fib_combined(n - 2)

    print("\n--- Combined Decorators Example ---")
    print("Calculating fib_combined(30) for the first time:")
    print(f"Result: {fib_combined(30)}")
    print("Calculating fib_combined(30) again (should be instant due to memoization, but time_it will still run):")
    print(f"Result: {fib_combined(30)}")
```