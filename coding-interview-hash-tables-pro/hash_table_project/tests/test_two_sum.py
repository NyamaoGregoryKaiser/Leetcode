import pytest
from algorithms.problem_1_two_sum import TwoSum

@pytest.fixture
def two_sum_solver():
    return TwoSum()

def test_two_sum_brute_force_basic(two_sum_solver):
    nums = [2, 7, 11, 15]
    target = 9
    expected = [0, 1]
    assert sorted(two_sum_solver.two_sum_brute_force(nums, target)) == sorted(expected)

def test_two_sum_brute_force_different_order(two_sum_solver):
    nums = [3, 2, 4]
    target = 6
    expected = [1, 2]
    assert sorted(two_sum_solver.two_sum_brute_force(nums, target)) == sorted(expected)

def test_two_sum_brute_force_duplicates(two_sum_solver):
    nums = [3, 3]
    target = 6
    expected = [0, 1]
    assert sorted(two_sum_solver.two_sum_brute_force(nums, target)) == sorted(expected)

def test_two_sum_brute_force_negative_numbers(two_sum_solver):
    nums = [-1, -2, -3, -4, -5]
    target = -8
    expected = [2, 4] # (-3) + (-5) = -8
    assert sorted(two_sum_solver.two_sum_brute_force(nums, target)) == sorted(expected)

def test_two_sum_hash_map_basic(two_sum_solver):
    nums = [2, 7, 11, 15]
    target = 9
    expected = [0, 1]
    assert sorted(two_sum_solver.two_sum_hash_map(nums, target)) == sorted(expected)

def test_two_sum_hash_map_different_order(two_sum_solver):
    nums = [3, 2, 4]
    target = 6
    expected = [1, 2]
    assert sorted(two_sum_solver.two_sum_hash_map(nums, target)) == sorted(expected)

def test_two_sum_hash_map_duplicates(two_sum_solver):
    nums = [3, 3]
    target = 6
    expected = [0, 1]
    assert sorted(two_sum_solver.two_sum_hash_map(nums, target)) == sorted(expected)

def test_two_sum_hash_map_negative_numbers(two_sum_solver):
    nums = [-1, -2, -3, -4, -5]
    target = -8
    expected = [2, 4]
    assert sorted(two_sum_solver.two_sum_hash_map(nums, target)) == sorted(expected)

def test_two_sum_hash_map_large_numbers(two_sum_solver):
    nums = [1000000000, 2000000000, 3000000000, 4000000000]
    target = 3000000000
    expected = [0, 1]
    assert sorted(two_sum_solver.two_sum_hash_map(nums, target)) == sorted(expected)

def test_two_sum_hash_map_mixed_positive_negative(two_sum_solver):
    nums = [-3, 4, 3, 90]
    target = 0
    expected = [0, 2]
    assert sorted(two_sum_solver.two_sum_hash_map(nums, target)) == sorted(expected)

# Test the alternative hash map approach (should behave identically)
def test_two_sum_hash_map_alt_basic(two_sum_solver):
    nums = [2, 7, 11, 15]
    target = 9
    expected = [0, 1]
    assert sorted(two_sum_solver.two_sum_hash_map_alt(nums, target)) == sorted(expected)

# No test for "no solution" case as problem statement guarantees exactly one solution.
# If problem statement changed, we'd add tests for empty list or no pair found,
# expecting an empty list or an exception depending on specification.