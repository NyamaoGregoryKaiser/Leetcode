import pytest
from algorithms.problem_3_longest_consecutive_sequence import LongestConsecutiveSequence

@pytest.fixture
def lcs_solver():
    return LongestConsecutiveSequence()

def test_lcs_sort_basic(lcs_solver):
    nums = [100, 4, 200, 1, 3, 2]
    expected = 4
    assert lcs_solver.longest_consecutive_sort(nums) == expected

def test_lcs_sort_empty_list(lcs_solver):
    nums = []
    expected = 0
    assert lcs_solver.longest_consecutive_sort(nums) == expected

def test_lcs_sort_single_element(lcs_solver):
    nums = [1]
    expected = 1
    assert lcs_solver.longest_consecutive_sort(nums) == expected

def test_lcs_sort_duplicates(lcs_solver):
    nums = [1, 2, 0, 1] # Sequence 0,1,2 length 3
    expected = 3
    assert lcs_solver.longest_consecutive_sort(nums) == expected

def test_lcs_sort_negative_numbers(lcs_solver):
    nums = [-1, -2, -3, 0, 1, 2]
    expected = 6 # -3,-2,-1,0,1,2
    assert lcs_solver.longest_consecutive_sort(nums) == expected

def test_lcs_sort_long_sequence(lcs_solver):
    nums = list(range(100))
    expected = 100
    assert lcs_solver.longest_consecutive_sort(nums) == expected

def test_lcs_sort_scrambled_long_sequence(lcs_solver):
    nums = [i for i in range(100)]
    import random
    random.shuffle(nums)
    expected = 100
    assert lcs_solver.longest_consecutive_sort(nums) == expected

def test_lcs_sort_multiple_sequences(lcs_solver):
    nums = [1,2,3, 10,11,12,13, 20,21]
    expected = 4
    assert lcs_solver.longest_consecutive_sort(nums) == expected

def test_lcs_hash_set_basic(lcs_solver):
    nums = [100, 4, 200, 1, 3, 2]
    expected = 4
    assert lcs_solver.longest_consecutive_hash_set(nums) == expected

def test_lcs_hash_set_empty_list(lcs_solver):
    nums = []
    expected = 0
    assert lcs_solver.longest_consecutive_hash_set(nums) == expected

def test_lcs_hash_set_single_element(lcs_solver):
    nums = [1]
    expected = 1
    assert lcs_solver.longest_consecutive_hash_set(nums) == expected

def test_lcs_hash_set_duplicates(lcs_solver):
    nums = [1, 2, 0, 1]
    expected = 3
    assert lcs_solver.longest_consecutive_hash_set(nums) == expected

def test_lcs_hash_set_negative_numbers(lcs_solver):
    nums = [-1, -2, -3, 0, 1, 2]
    expected = 6
    assert lcs_solver.longest_consecutive_hash_set(nums) == expected

def test_lcs_hash_set_long_sequence(lcs_solver):
    nums = list(range(100))
    expected = 100
    assert lcs_solver.longest_consecutive_hash_set(nums) == expected

def test_lcs_hash_set_scrambled_long_sequence(lcs_solver):
    nums = [i for i in range(100)]
    import random
    random.shuffle(nums)
    expected = 100
    assert lcs_solver.longest_consecutive_hash_set(nums) == expected

def test_lcs_hash_set_multiple_sequences(lcs_solver):
    nums = [1,2,3, 10,11,12,13, 20,21]
    expected = 4
    assert lcs_solver.longest_consecutive_hash_set(nums) == expected

def test_lcs_hash_set_disjoint_sequences(lcs_solver):
    nums = [1, 5, 2, 6, 10, 11]
    expected = 2 # (1,2) or (5,6) or (10,11)
    assert lcs_solver.longest_consecutive_hash_set(nums) == expected