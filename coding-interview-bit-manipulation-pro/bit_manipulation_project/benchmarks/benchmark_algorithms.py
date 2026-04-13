"""
bit_manipulation_project/benchmarks/benchmark_algorithms.py

This module contains performance benchmarks for the different approaches
implemented for the bit manipulation algorithms.
It uses `pytest-benchmark` to compare execution times.

To run benchmarks:
`pytest --benchmark-columns='mean,stddev,rounds' --benchmark-max-time=1 bit_manipulation_project/benchmarks/benchmark_algorithms.py`
"""

import pytest
from src.algorithms import (
    count_set_bits,
    is_power_of_two,
    reverse_bits,
    single_number,
    insert_m_into_n
)

# Re-implementing internal approaches for benchmarking
# In a real project, you might expose these or use a specific benchmarking
# setup that can access private methods. For simplicity here, we'll
# copy the relevant internal logic to local functions for direct comparison.

def _count_set_bits_approach1_benchmark(n: int) -> int:
    """Benchmark: Iterating through bits (Right Shift and AND)"""
    count = 0
    current_num = n
    while current_num > 0:
        if (current_num & 1) == 1:
            count += 1
        current_num >>= 1
    return count

def _count_set_bits_approach2_benchmark(n: int) -> int:
    """Benchmark: Brian Kernighan's Algorithm"""
    count = 0
    current_num = n
    while current_num > 0:
        current_num &= (current_num - 1)
        count += 1
    return count

def _is_power_of_two_approach1_benchmark(n: int) -> bool:
    """Benchmark: Loop and Divide"""
    if n <= 0:
        return False
    while n % 2 == 0:
        n //= 2
    return n == 1

def _is_power_of_two_approach2_benchmark(n: int) -> bool:
    """Benchmark: Bit Manipulation (n > 0 and (n & (n - 1)) == 0)"""
    return n > 0 and (n & (n - 1)) == 0

def _reverse_bits_approach1_benchmark(n: int, num_bits: int = 32) -> int:
    """Benchmark: Iterative Shifting and Building"""
    if n < 0:
        n = n & ((1 << num_bits) - 1)
    reversed_num = 0
    for _ in range(num_bits):
        reversed_num <<= 1
        reversed_num |= (n & 1)
        n >>= 1
    return reversed_num

# Note: Optimized swapping approach for reverse_bits is complex to generalize
# and less commonly implemented in interviews. We'll stick to comparing iterative.

def _single_number_approach1_benchmark(nums: list[int]) -> int:
    """Benchmark: Hash Map (collections.Counter)"""
    from collections import Counter
    counts = Counter(nums)
    for num, count in counts.items():
        if count == 1:
            return num
    raise ValueError("No single number found")

def _single_number_approach2_benchmark(nums: list[int]) -> int:
    """Benchmark: Bit Manipulation (XOR Property)"""
    single = 0
    for num in nums:
        single ^= num
    return single

# No multiple approaches for insert_m_into_n to benchmark, as it's typically a single optimal bit manipulation approach.

# --- Benchmark Fixtures and Tests ---

# Data for benchmarking
COUNT_BITS_LARGE_NUM = 0xAAAAAAAAAAAAAAAA # Many set bits
COUNT_BITS_SPARSE_NUM = 2**30 # Few set bits
POWER_OF_TWO_LARGE = 2**30
POWER_OF_TWO_NOT = 2**30 + 1
REVERSE_BITS_RANDOM_NUM = 0x12345678
SINGLE_NUMBER_LIST_SHORT = [1, 2, 3, 4, 5, 4, 3, 2, 1]
SINGLE_NUMBER_LIST_LONG = [i for i in range(1000)] * 2 + [1001] # 2001 elements

@pytest.mark.benchmark(group="count_set_bits")
def test_count_set_bits_approach1_large_many(benchmark):
    benchmark(_count_set_bits_approach1_benchmark, COUNT_BITS_LARGE_NUM)

@pytest.mark.benchmark(group="count_set_bits")
def test_count_set_bits_approach2_large_many(benchmark):
    benchmark(_count_set_bits_approach2_benchmark, COUNT_BITS_LARGE_NUM)

@pytest.mark.benchmark(group="count_set_bits")
def test_count_set_bits_approach1_sparse(benchmark):
    benchmark(_count_set_bits_approach1_benchmark, COUNT_BITS_SPARSE_NUM)

@pytest.mark.benchmark(group="count_set_bits")
def test_count_set_bits_approach2_sparse(benchmark):
    benchmark(_count_set_bits_approach2_benchmark, COUNT_BITS_SPARSE_NUM)

@pytest.mark.benchmark(group="is_power_of_two")
def test_is_power_of_two_approach1(benchmark):
    benchmark(_is_power_of_two_approach1_benchmark, POWER_OF_TWO_LARGE)

@pytest.mark.benchmark(group="is_power_of_two")
def test_is_power_of_two_approach2(benchmark):
    benchmark(_is_power_of_two_approach2_benchmark, POWER_OF_TWO_LARGE)

@pytest.mark.benchmark(group="is_power_of_two")
def test_is_power_of_two_approach1_not_power(benchmark):
    benchmark(_is_power_of_two_approach1_benchmark, POWER_OF_TWO_NOT)

@pytest.mark.benchmark(group="is_power_of_two")
def test_is_power_of_two_approach2_not_power(benchmark):
    benchmark(_is_power_of_two_approach2_benchmark, POWER_OF_TWO_NOT)

@pytest.mark.benchmark(group="reverse_bits")
def test_reverse_bits_approach1(benchmark):
    benchmark(_reverse_bits_approach1_benchmark, REVERSE_BITS_RANDOM_NUM)

@pytest.mark.benchmark(group="single_number")
def test_single_number_approach1_short(benchmark):
    benchmark(_single_number_approach1_benchmark, SINGLE_NUMBER_LIST_SHORT)

@pytest.mark.benchmark(group="single_number")
def test_single_number_approach2_short(benchmark):
    benchmark(_single_number_approach2_benchmark, SINGLE_NUMBER_LIST_SHORT)

@pytest.mark.benchmark(group="single_number")
def test_single_number_approach1_long(benchmark):
    benchmark(_single_number_approach1_benchmark, SINGLE_NUMBER_LIST_LONG)

@pytest.mark.benchmark(group="single_number")
def test_single_number_approach2_long(benchmark):
    benchmark(_single_number_approach2_benchmark, SINGLE_NUMBER_LIST_LONG)

@pytest.mark.benchmark(group="insert_m_into_n")
def test_insert_m_into_n(benchmark):
    # This function has only one primary approach, so no direct comparison needed,
    # but still good to benchmark its absolute performance.
    N_val = 0b10000000000
    M_val = 0b10011
    i_val = 2
    j_val = 6
    num_bits_val = 11
    benchmark(insert_m_into_n, N_val, M_val, i_val, j_val, num_bits_val)