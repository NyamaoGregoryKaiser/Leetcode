# tests/test_performance.py
import unittest
import time
from src.stack_queue_problems import (
    is_valid_parentheses,
    is_valid_parentheses_naive,
    daily_temperatures,
    daily_temperatures_brute_force
)

class TestPerformance(unittest.TestCase):

    # Utility function for timing
    def _time_function(self, func, *args, iterations=1000):
        start_time = time.perf_counter()
        for _ in range(iterations):
            func(*args)
        end_time = time.perf_counter()
        return (end_time - start_time) / iterations # Average time per call

    # --- Performance Test for Valid Parentheses ---
    def test_valid_parentheses_performance(self):
        print("\n--- Performance Test: Valid Parentheses ---")
        
        # Long valid string
        long_valid_s = "()[]{}<>" * 10000 + "()"
        print(f"Testing with valid string of length {len(long_valid_s)}")
        
        time_optimal = self._time_function(is_valid_parentheses, long_valid_s, iterations=10) # Reduce iterations for very long strings
        print(f"Optimal (Stack)        : {time_optimal:.6f} seconds/call")

        # Note: is_valid_parentheses_naive is not a real alternative for nesting, but for comparison of linear scan.
        # It's included to show that even a simpler linear scan might perform similarly for character processing,
        # but fails on correctness for nesting.
        time_naive = self._time_function(is_valid_parentheses_naive, long_valid_s, iterations=10)
        print(f"Naive (Counter, Fails nesting): {time_naive:.6f} seconds/call")
        
        # Test with long invalid string (stack will grow to max size)
        long_invalid_s_open = "(" * 50000
        print(f"\nTesting with invalid string of length {len(long_invalid_s_open)} (all open)")
        time_optimal_invalid = self._time_function(is_valid_parentheses, long_invalid_s_open, iterations=10)
        print(f"Optimal (Stack)        : {time_optimal_invalid:.6f} seconds/call")


    # --- Performance Test for Daily Temperatures ---
    def test_daily_temperatures_performance(self):
        print("\n--- Performance Test: Daily Temperatures ---")

        # Create large test cases
        # Case 1: Monotonically decreasing (worst case for stack size, but good for few pops)
        decreasing_temps = list(range(100000, 0, -1))
        # Case 2: Monotonically increasing (best case for stack size, stack always small)
        increasing_temps = list(range(1, 100001))
        # Case 3: Mixed (average case)
        mixed_temps = [t % 100 + 1 for t in range(100000)] # Values 1-100
        # Case 4: Long decreasing then one spike (worst case for stack pops)
        spike_temps = list(range(10000, 0, -1)) + [10001]

        test_cases = {
            "Decreasing (N=100k)": (decreasing_temps, 10),
            "Increasing (N=100k)": (increasing_temps, 10),
            "Mixed (N=100k)": (mixed_temps, 10),
            "Spike (N=10k)": (spike_temps, 100)
        }

        for name, (temps, iterations) in test_cases.items():
            print(f"\nTesting with {name} (N={len(temps)})")
            
            # Optimal (Monotonic Stack)
            time_optimal = self._time_function(daily_temperatures, temps, iterations=iterations)
            print(f"Optimal (Monotonic Stack): {time_optimal:.6f} seconds/call")
            
            # Brute Force
            # For N=100k, O(N^2) is too slow. Reduce size for brute force or skip.
            # Let's use a smaller size for brute force to make it runnable.
            if len(temps) > 5000:
                print(f"Brute force skipped for N={len(temps)} (too slow)")
            else:
                time_brute_force = self._time_function(daily_temperatures_brute_force, temps, iterations=iterations)
                print(f"Brute Force (O(N^2))     : {time_brute_force:.6f} seconds/call")

if __name__ == '__main__':
    unittest.main()