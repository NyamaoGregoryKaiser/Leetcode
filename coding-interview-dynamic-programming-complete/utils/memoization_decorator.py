import functools
from typing import Callable, Any, Dict, Tuple

class MemoizationDecorator:
    """
    A custom memoization decorator to demonstrate the concept behind functools.lru_cache.
    It caches the results of function calls based on their arguments.
    """
    
    def __init__(self, func: Callable):
        """
        Initializes the decorator with the function to be memoized.
        """
        self.func = func
        self.cache: Dict[Tuple[Any, ...], Any] = {} # Stores (args_tuple) -> result

    def __call__(self, *args: Any) -> Any:
        """
        Called when the decorated function is invoked.
        Checks if the result for the given arguments is in the cache.
        If not, calls the original function, stores the result, and returns it.
        """
        # Tuples are hashable and can be used as dictionary keys
        # We need to ensure all arguments are hashable.
        # This implementation assumes all arguments are hashable.
        # For non-hashable arguments (like lists, dicts), a more complex
        # serialization or custom hashing strategy would be needed.
        if args in self.cache:
            return self.cache[args]
        
        result = self.func(*args)
        self.cache[args] = result
        return result

    def cache_clear(self):
        """
        Clears the memoization cache. Useful for testing or re-running benchmarks.
        """
        self.cache.clear()
        # print(f"Cache for {self.func.__name__} cleared.")

    # This allows the decorator to be used with methods (where 'self' is passed)
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        # Bind the decorated function to the instance, ensuring 'self' of the class
        # is correctly passed as the first argument to the original method.
        # functools.partial creates a new callable with some arguments pre-filled.
        return functools.partial(self.__call__, obj)

# --- Example Usage ---

# To use this decorator, you would replace `@functools.lru_cache(None)` with `@MemoizationDecorator`.
# from utils.memoization_decorator import MemoizationDecorator

# @MemoizationDecorator
# def fibonacci_custom_memo(n: int) -> int:
#     if n <= 1:
#         return n
#     return fibonacci_custom_memo(n - 1) + fibonacci_custom_memo(n - 2)

if __name__ == "__main__":
    # Test our custom decorator with Fibonacci
    
    @MemoizationDecorator
    def fibonacci(n: int) -> int:
        print(f"Calculating fib({n})...") # Will only print once per unique n
        if n <= 1:
            return n
        return fibonacci(n - 1) + fibonacci(n - 2)

    print("Fibonacci(5):", fibonacci(5))
    # Expected output:
    # Calculating fib(5)...
    # Calculating fib(4)...
    # Calculating fib(3)...
    # Calculating fib(2)...
    # Calculating fib(1)...
    # Calculating fib(0)...
    # 5
    print("\nCalling Fibonacci(5) again (should be instant from cache):")
    print("Fibonacci(5):", fibonacci(5)) # No "Calculating..." prints

    print("\nFibonacci(7):", fibonacci(7))
    # Expected output: (will calculate 6, then 5 (cached), then 4 (cached))
    # Calculating fib(7)...
    # Calculating fib(6)...
    # 13

    fibonacci.cache_clear()
    print("\nCache cleared. Calling Fibonacci(5) again:")
    print("Fibonacci(5):", fibonacci(5))
    # Expected output: "Calculating fib(5)..." again
    # Calculating fib(5)...
    # Calculating fib(4)...
    # Calculating fib(3)...
    # Calculating fib(2)...
    # Calculating fib(1)...
    # Calculating fib(0)...
    # 5
    
    # Test with multiple arguments (e.g., a simple sum function)
    @MemoizationDecorator
    def memoized_sum(a: int, b: int) -> int:
        print(f"Calculating sum({a}, {b})...")
        return a + b

    print("\nMemoized Sum (1, 2):", memoized_sum(1, 2))
    print("Memoized Sum (3, 4):", memoized_sum(3, 4))
    print("Memoized Sum (1, 2) again:", memoized_sum(1, 2)) # Cached
    
    memoized_sum.cache_clear()
    print("\nMemoized Sum cache cleared. (1, 2) again:")
    print("Memoized Sum (1, 2):", memoized_sum(1, 2)) # Not cached