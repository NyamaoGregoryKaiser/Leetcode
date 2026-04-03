import unittest
from src.problems.trapping_rain_water import (
    trap_rain_water_brute_force,
    trap_rain_water_dp,
    trap_rain_water_two_pointers
)

class TestTrappingRainWater(unittest.TestCase):

    def setUp(self):
        self.test_cases = [
            # Standard cases
            ([0,1,0,2,1,0,1,3,2,1,2,1], 6),
            ([4,2,0,3,2,5], 9),
            # Edge cases
            ([], 0), # Empty array
            ([1], 0), # Single element
            ([1,2], 0), # Two elements
            ([0,0,0], 0), # All zeros
            ([1,1,1,1,1], 0), # All same height
            ([1,0,1], 1), # Smallest case with water
            ([2,0,2], 2), # Another small case
            ([4,2,3], 1), # Peak on left
            ([3,2,4], 1), # Peak on right
            ([2,3,4], 0), # Monotonically increasing
            ([4,3,2], 0), # Monotonically decreasing
            ([5,5,1,7,1,1,5], 14), # Complex peaks and valleys
            ([9,0,0,0,0,0,8], 35) # Large valley
        ]

    def _run_test_for_function(self, trap_func):
        for height, expected in self.test_cases:
            with self.subTest(msg=f"Function: {trap_func.__name__}, height: {height}"):
                result = trap_func(list(height)) # Use list(height) to ensure original not modified
                self.assertEqual(result, expected)

    def test_trap_rain_water_brute_force(self):
        print("\nTesting trap_rain_water_brute_force...")
        self._run_test_for_function(trap_rain_water_brute_force)
        print("trap_rain_water_brute_force tests passed.")

    def test_trap_rain_water_dp(self):
        print("\nTesting trap_rain_water_dp...")
        self._run_test_for_function(trap_rain_water_dp)
        print("trap_rain_water_dp tests passed.")

    def test_trap_rain_water_two_pointers(self):
        print("\nTesting trap_rain_water_two_pointers...")
        self._run_test_for_function(trap_rain_water_two_pointers)
        print("trap_rain_water_two_pointers tests passed.")

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)