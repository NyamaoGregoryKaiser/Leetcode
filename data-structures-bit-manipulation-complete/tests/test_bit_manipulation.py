```python
import pytest
from src.problem_1_count_set_bits import (
    count_set_bits_naive,
    count_set_bits_kernighan,
    count_set_bits_lookup_table,
    count_set_bits_builtin,
)
from src.problem_2_power_of_two import (
    is_power_of_two_naive,
    is_power_of_two_optimal,
)
from src.problem_3_reverse_bits import (
    reverse_bits_iterative,
)
from src.problem_4_single_number_iii import (
    single_number_iii_hash_map,
    single_number_iii_optimal,
)
from utils.helpers import print_binary # For debugging if needed

# --- Test Cases for Problem 1: Count Set Bits ---

@pytest.mark.parametrize("n, expected", [
    (0, 0),
    (1, 1),      # 0...0001
    (2, 1),      # 0...0010
    (3, 2),      # 0...0011
    (7, 3),      # 0...0111
    (8, 1),      # 0...1000
    (15, 4),     # 0...1111
    (16, 1),     # 0...10000
    (2**32 - 1, 32),  # All ones for 32-bit (0xFFFFFFFF)
    (2**31, 1),   # MSB set (0x80000000)
    (2**31 - 1, 31),  # All but MSB set (0x7FFFFFFF)
    (43261596, 10), # 00000010100101000001111010011100 (example from reverse bits problem)
    (0xAAAAAAAA, 16), # 10101010... (each byte is 0xAA, 4 set bits per byte * 4 bytes)
    (0x12345678, 13), # 00010010001101000101011001111000
])
def test_count_set_bits(n, expected):
    # Test naive approach
    assert count_set_bits_naive(n) == expected, f"Naive failed for {n}"
    # Test Kernighan's algorithm
    assert count_set_bits_kernighan(n) == expected, f"Kernighan failed for {n}"
    # Test lookup table approach
    assert count_set_bits_lookup_table(n) == expected, f"Lookup table failed for {n}"
    # Test built-in approach
    assert count_set_bits_builtin(n) == expected, f"Built-in failed for {n}"

# --- Test Cases for Problem 2: Power of Two ---

@pytest.mark.parametrize("n, expected", [
    (0, False),
    (1, True),   # 2^0
    (2, True),   # 2^1
    (3, False),
    (4, True),   # 2^2
    (7, False),
    (8, True),   # 2^3
    (16, True),  # 2^4
    (15, False),
    (32, True),  # 2^5
    (2**30, True),
    (2**31, True), # Max positive power of 2 for 32-bit signed
    (-1, False), # Negative numbers are not powers of two
    (-2, False),
    (-4, False),
    (1024, True),
    (1023, False),
    (2048, True),
    (2**31 - 1, False), # Largest 32-bit signed int, not power of 2
    (2**31 + 1, False), # Larger than 32-bit signed max
])
def test_is_power_of_two(n, expected):
    # Test naive approach
    assert is_power_of_two_naive(n) == expected, f"Naive failed for {n}"
    # Test optimal bitwise approach
    assert is_power_of_two_optimal(n) == expected, f"Optimal failed for {n}"

# --- Test Cases for Problem 3: Reverse Bits ---

@pytest.mark.parametrize("n, expected", [
    (0, 0),
    (1, 2**31), # 0...0001 -> 10...0000
    (2, 2**30), # 0...0010 -> 010...0000
    (0b101, 2**31 + 2**29), # 5 (0...0101) -> (1010...0000) (reversed bits, padded to 32)
    (0xFFFFFFFF, 0xFFFFFFFF), # All ones, reversing doesn't change it
    (43261596, 964176192), # Example from problem description
    (964176192, 43261596), # Reverse of reversed should be original
    (2**31, 1), # MSB set -> LSB set
    (2**16 - 1, (2**31 | 2**30 | ... | 2**16)), # 0...0000FFFF -> FFFF0000...0000
    ((1 << 31) | 1, (1 << 31) | 1), # Symmetric pattern: 100...001 -> 100...001
    (0x12345678, 0x1E6A2C48), # Arbitrary example
    (0xdeadbeef, 0xf77dcbfb), # Another arbitrary 32-bit example
])
def test_reverse_bits(n, expected):
    assert reverse_bits_iterative(n) == expected, f"Iterative failed for {n} (binary: {print_binary(n, 32)})"
    # assert reverse_bits_divide_conquer(n) == expected, f"Divide & Conquer failed for {n}" # Uncomment if D&C is enabled

# --- Test Cases for Problem 4: Single Number III ---

@pytest.mark.parametrize("nums, expected_set", [
    ([1, 2, 1, 3, 2, 5], {3, 5}),
    ([2, 4, 6, 8, 10, 2, 4, 6], {8, 10}),
    ([1, 0], {0, 1}),
    ([-1, 0], {-1, 0}),
    ([7, 7, -5, 3, -5, -2], {3, -2}), # With negative numbers
    ([4,1,2,1,2,5], {4,5}),
    ([100, 200, 100, 300, 200, 400], {300, 400}),
    ([0,0,1,2], {1,2}), # Zeroes
    ([5, 5, 5, 5, 1, 2], {1,2}), # More than two pairs (problem states exactly two appear once)
    ([2**31-1, 2**31-1, 2**31-2, 2**31-2, 1, 0], {1,0}), # Large numbers
])
def test_single_number_iii(nums, expected_set):
    # Test hash map approach
    result_hash_map = single_number_iii_hash_map(nums)
    assert set(result_hash_map) == expected_set, f"Hash Map failed for {nums}"

    # Test optimal XOR approach
    result_optimal = single_number_iii_optimal(nums)
    assert set(result_optimal) == expected_set, f"Optimal failed for {nums}"

# Additional test for specific edge case in Single Number III if needed
def test_single_number_iii_specific_edge_case():
    nums = [1,1,2,3,4,4]
    expected = {2,3}
    assert set(single_number_iii_optimal(nums)) == expected
    assert set(single_number_iii_hash_map(nums)) == expected

```