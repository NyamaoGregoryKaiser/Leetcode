import pytest

# conftest.py can be used for shared fixtures or hooks across multiple test files.
# For this project, it's not strictly necessary but included for a complete structure.

@pytest.fixture(scope="session")
def common_test_arrays():
    """
    Provides a set of common arrays that can be used across different test modules.
    This helps ensure consistency in testing various algorithms.
    """
    return {
        "empty": [],
        "single_positive": [5],
        "single_negative": [-3],
        "small_positive": [1, 2, 3],
        "small_mixed": [-2, 0, 5],
        "medium_random": [random.randint(-50, 50) for _ in range(20)], # Example, can't use random directly here for consistent tests
        "large_random": [random.randint(-100, 100) for _ in range(100)], # Example
        "all_zeros": [0, 0, 0, 0, 0],
        "all_negatives": [-5, -2, -8, -1],
    }
# Note: For actual testing, fixed values for "medium_random" and "large_random"
# would be preferred to ensure deterministic tests, or a seeded random generator.
# For this example, I will use specific lists in test_algorithms.py
# For `conftest.py` this is mostly illustrative.
import random