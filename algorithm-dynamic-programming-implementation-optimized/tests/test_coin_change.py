import pytest
import math
from algorithms.problem_coin_change import (
    coin_change_min_coins_recursive,
    coin_change_min_coins_memoization,
    coin_change_min_coins_tabulation,
    coin_change_ways_recursive,
    coin_change_ways_memoization,
    coin_change_ways_tabulation
)

# --- Test Cases for Minimum Coins ---
min_coins_test_cases = [
    ([1, 2, 5], 11, 3),  # 5 + 5 + 1
    ([1, 2, 5], 0, 0),   # 0 amount, 0 coins
    ([2], 3, -1),        # Cannot make 3 with only 2s
    ([2, 5, 10, 1], 27, 4), # 10 + 10 + 5 + 1 + 1 (5 coins if 10+10+5+2 then 4 coins) -> 10 + 10 + 5 + 2 = 27 (4 coins)
    ([186, 419, 83, 408], 6249, 20), # LeetCode example (long)
    ([1, 3, 4, 5], 7, 2), # 3+4 or 2+5 or 1+1+1+4 => 2 coins (3+4)
    ([1], 10, 10),       # 10 coins of 1
    ([7], 0, 0),         # 0 amount
    ([7], 6, -1),        # Cannot make 6 with 7
    ([7], 7, 1),         # 1 coin of 7
    ([7], 14, 2),        # 2 coins of 7
]

@pytest.mark.parametrize("coins, amount, expected", min_coins_test_cases)
def test_coin_change_min_coins_recursive(coins, amount, expected):
    assert coin_change_min_coins_recursive(coins, amount) == expected

@pytest.mark.parametrize("coins, amount, expected", min_coins_test_cases)
def test_coin_change_min_coins_memoization(coins, amount, expected):
    assert coin_change_min_coins_memoization(coins, amount) == expected

@pytest.mark.parametrize("coins, amount, expected", min_coins_test_cases)
def test_coin_change_min_coins_tabulation(coins, amount, expected):
    assert coin_change_min_coins_tabulation(coins, amount) == expected

# --- Test Cases for Number of Ways ---
ways_test_cases = [
    ([1, 2, 5], 5, 4), # 5, (2,2,1), (2,1,1,1), (1,1,1,1,1)
    ([1, 2, 3], 4, 4), # (1,1,1,1), (1,1,2), (1,3), (2,2)
    ([2, 5, 10], 10, 3), # (10), (5,5), (2,2,2,2,2)
    ([1, 5, 10, 25], 10, 4), # (10), (5,5), (5,1,1,1,1,1), (1,1,1,1,1,1,1,1,1,1)
    ([1], 0, 1), # 1 way (take no coins)
    ([7], 0, 1), # 1 way
    ([7], 6, 0), # No ways to make 6 with 7
    ([7], 7, 1), # 1 way (take one 7)
    ([7], 14, 1), # 1 way (take two 7s)
    ([3, 5], 2, 0), # No ways to make 2 with 3s and 5s
]

@pytest.mark.parametrize("coins, amount, expected", ways_test_cases)
def test_coin_change_ways_recursive(coins, amount, expected):
    assert coin_change_ways_recursive(coins, amount) == expected

@pytest.mark.parametrize("coins, amount, expected", ways_test_cases)
def test_coin_change_ways_memoization(coins, amount, expected):
    assert coin_change_ways_memoization(coins, amount) == expected

@pytest.mark.parametrize("coins, amount, expected", ways_test_cases)
def test_coin_change_ways_tabulation(coins, amount, expected):
    assert coin_change_ways_tabulation(coins, amount) == expected


# --- Edge Cases and Constraints ---

# Test with empty coins list
@pytest.mark.parametrize("func", [
    coin_change_min_coins_recursive, coin_change_min_coins_memoization, coin_change_min_coins_tabulation
])
def test_min_coins_empty_coins(func):
    assert func([], 10) == -1
    assert func([], 0) == 0

@pytest.mark.parametrize("func", [
    coin_change_ways_recursive, coin_change_ways_memoization, coin_change_ways_tabulation
])
def test_ways_empty_coins(func):
    assert func([], 10) == 0
    assert func([], 0) == 1

# Test with large amounts (recursive might fail due to recursion depth or timeout)
# Only run for DP solutions
large_amount_min = 1000
large_coins = [1, 2, 5, 10, 25, 50, 100]
# Expected for 1000: 10 coins of 100
large_expected_min = 10

@pytest.mark.parametrize("func", [
    coin_change_min_coins_memoization, coin_change_min_coins_tabulation
])
def test_min_coins_large_amount(func):
    assert func(large_coins, large_amount_min) == large_expected_min

large_amount_ways = 100
# For [1,2,5], 100, the result is 541 ways.
# For [1,2,5,10,25,50,100], 100, there are many ways.
# Let's verify with a simpler set for large_amount_ways to ensure correctness.
# Using online calculator for [1,2,5], 100 = 541 ways.
large_coins_ways = [1, 2, 5]
large_amount_ways_val = 100
large_expected_ways = 541

@pytest.mark.parametrize("func", [
    coin_change_ways_memoization, coin_change_ways_tabulation
])
def test_ways_large_amount(func):
    assert func(large_coins_ways, large_amount_ways_val) == large_expected_ways

# Test with coins that are larger than the amount
@pytest.mark.parametrize("func", [
    coin_change_min_coins_recursive, coin_change_min_coins_memoization, coin_change_min_coins_tabulation
])
def test_min_coins_larger_coins(func):
    assert func([10, 20], 5) == -1
    assert func([10, 20], 0) == 0

@pytest.mark.parametrize("func", [
    coin_change_ways_recursive, coin_change_ways_memoization, coin_change_ways_tabulation
])
def test_ways_larger_coins(func):
    assert func([10, 20], 5) == 0
    assert func([10, 20], 0) == 1