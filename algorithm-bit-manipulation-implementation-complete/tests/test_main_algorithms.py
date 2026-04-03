```python
import unittest
from src.main_algorithms import BitManipulationProblems, MAX_INT_BITS
from src.utils import to_binary_string

class TestBitManipulationProblems(unittest.TestCase):

    # --- Test count_set_bits ---
    def test_count_set_bits_basic(self):
        self.assertEqual(BitManipulationProblems.count_set_bits(0), 0)
        self.assertEqual(BitManipulationProblems.count_set_bits(1), 1)   # 0b1
        self.assertEqual(BitManipulationProblems.count_set_bits(2), 1)   # 0b10
        self.assertEqual(BitManipulationProblems.count_set_bits(3), 2)   # 0b11
        self.assertEqual(BitManipulationProblems.count_set_bits(4), 1)   # 0b100
        self.assertEqual(BitManipulationProblems.count_set_bits(7), 3)   # 0b111
        self.assertEqual(BitManipulationProblems.count_set_bits(8), 1)   # 0b1000
        self.assertEqual(BitManipulationProblems.count_set_bits(13), 3)  # 0b1101

    def test_count_set_bits_larger_numbers(self):
        self.assertEqual(BitManipulationProblems.count_set_bits(255), 8)   # 0b11111111
        self.assertEqual(BitManipulationProblems.count_set_bits(256), 1)   # 0b100000000
        self.assertEqual(BitManipulationProblems.count_set_bits(1023), 10) # 0b1111111111
        self.assertEqual(BitManipulationProblems.count_set_bits(2**16 - 1), 16) # All 1s for 16 bits
        self.assertEqual(BitManipulationProblems.count_set_bits(2**31 - 1), 31) # Max 31-bit positive int (all 1s)

    def test_count_set_bits_edge_cases(self):
        self.assertEqual(BitManipulationProblems.count_set_bits(0), 0)
        self.assertEqual(BitManipulationProblems.count_set_bits(2**MAX_INT_BITS - 1), MAX_INT_BITS) # All 1s for 32 bits
        self.assertEqual(BitManipulationProblems.count_set_bits(2**MAX_INT_BITS), 1) # Single MSB set
    
    def test_count_set_bits_negative_input(self):
        with self.assertRaises(ValueError):
            BitManipulationProblems.count_set_bits(-1)
        with self.assertRaises(ValueError):
            BitManipulationProblems.count_set_bits(-10)

    # --- Test is_power_of_two ---
    def test_is_power_of_two_true(self):
        self.assertTrue(BitManipulationProblems.is_power_of_two(1))    # 2^0
        self.assertTrue(BitManipulationProblems.is_power_of_two(2))    # 2^1
        self.assertTrue(BitManipulationProblems.is_power_of_two(4))    # 2^2
        self.assertTrue(BitManipulationProblems.is_power_of_two(8))    # 2^3
        self.assertTrue(BitManipulationProblems.is_power_of_two(16))   # 2^4
        self.assertTrue(BitManipulationProblems.is_power_of_two(1024)) # 2^10
        self.assertTrue(BitManipulationProblems.is_power_of_two(2**30))

    def test_is_power_of_two_false(self):
        self.assertFalse(BitManipulationProblems.is_power_of_two(0))
        self.assertFalse(BitManipulationProblems.is_power_of_two(3))
        self.assertFalse(BitManipulationProblems.is_power_of_two(5))
        self.assertFalse(BitManipulationProblems.is_power_of_two(6))
        self.assertFalse(BitManipulationProblems.is_power_of_two(7))
        self.assertFalse(BitManipulationProblems.is_power_of_two(10))
        self.assertFalse(BitManipulationProblems.is_power_of_two(15))
        self.assertFalse(BitManipulationProblems.is_power_of_two(999))
        self.assertFalse(BitManipulationProblems.is_power_of_two(2**30 + 1))

    def test_is_power_of_two_negative_input(self):
        self.assertFalse(BitManipulationProblems.is_power_of_two(-1))
        self.assertFalse(BitManipulationProblems.is_power_of_two(-2))
        self.assertFalse(BitManipulationProblems.is_power_of_two(-8))

    # --- Test reverse_bits ---
    def test_reverse_bits_basic(self):
        # 0 (32-bit: all zeros)
        self.assertEqual(BitManipulationProblems.reverse_bits(0, 32), 0)
        # 1 (32-bit: ...001) -> (32-bit: 100...0) (2^31)
        self.assertEqual(BitManipulationProblems.reverse_bits(1, 32), 1 << (32 - 1))
        # 2 (32-bit: ...010) -> (32-bit: 0100...0) (2^30)
        self.assertEqual(BitManipulationProblems.reverse_bits(2, 32), 1 << (32 - 2))
        # 3 (32-bit: ...011) -> (32-bit: 1100...0) (2^31 + 2^30)
        self.assertEqual(BitManipulationProblems.reverse_bits(3, 32), (1 << 31) | (1 << 30))
        # Example from problem description: 432615966
        # 0b0001100101000001111010011100
        n_example = 432615966
        # Reversed: 0b00111001011110000010100101000000 (964176192)
        expected_reversed_example = 964176192
        self.assertEqual(BitManipulationProblems.reverse_bits(n_example, 32), expected_reversed_example)
    
    def test_reverse_bits_all_ones(self):
        all_ones_32_bit = (1 << 32) - 1 # 0xFFFFFFFF
        self.assertEqual(BitManipulationProblems.reverse_bits(all_ones_32_bit, 32), all_ones_32_bit)

        all_ones_8_bit = (1 << 8) - 1 # 0xFF
        self.assertEqual(BitManipulationProblems.reverse_bits(all_ones_8_bit, 8), all_ones_8_bit)

    def test_reverse_bits_specific_bit_lengths(self):
        # 0b101 (5) in 8 bits -> 0b10100000 (160)
        self.assertEqual(BitManipulationProblems.reverse_bits(0b101, 8), 0b10100000)
        # 0b1011 (11) in 4 bits -> 0b1101 (13)
        self.assertEqual(BitManipulationProblems.reverse_bits(0b1011, 4), 0b1101)
        # 0b1000 (8) in 4 bits -> 0b0001 (1)
        self.assertEqual(BitManipulationProblems.reverse_bits(0b1000, 4), 0b0001)
        # 0b0001 (1) in 4 bits -> 0b1000 (8)
        self.assertEqual(BitManipulationProblems.reverse_bits(0b0001, 4), 0b1000)

    def test_reverse_bits_large_sparse(self):
        n_sparse = 1 << 30 # 0b100...0 (30 zeros)
        # Reversed: 0b00...01 (30 zeros) -> 1
        self.assertEqual(BitManipulationProblems.reverse_bits(n_sparse, 32), 1 << (32 - 1 - 30)) # This is 1 << 1 = 2
        
        n_sparse_2 = 1 << 16 # 0b...100...0 (16th bit)
        # Reversed: 0b...001...0 (16th bit from right in reversed)
        self.assertEqual(BitManipulationProblems.reverse_bits(n_sparse_2, 32), 1 << (32 - 1 - 16)) # 1 << 15

    def test_reverse_bits_invalid_input(self):
        with self.assertRaises(ValueError):
            BitManipulationProblems.reverse_bits(-1, 32)
        with self.assertRaises(ValueError):
            BitManipulationProblems.reverse_bits(1 << 32, 32) # Exceeds 32 bits

    # --- Test single_number ---
    def test_single_number_basic(self):
        self.assertEqual(BitManipulationProblems.single_number([2, 2, 1]), 1)
        self.assertEqual(BitManipulationProblems.single_number([4, 1, 2, 1, 2]), 4)
        self.assertEqual(BitManipulationProblems.single_number([1]), 1)
        self.assertEqual(BitManipulationProblems.single_number([7, 7, 3, 4, 4]), 3)

    def test_single_number_larger_values(self):
        self.assertEqual(BitManipulationProblems.single_number([1000, 2000, 1000]), 2000)
        self.assertEqual(BitManipulationProblems.single_number([2**31 - 1, 2**31 - 1, 500]), 500)
        self.assertEqual(BitManipulationProblems.single_number([-(2**31), -(2**31), 10]), 10)

    def test_single_number_with_zero(self):
        self.assertEqual(BitManipulationProblems.single_number([0, 1, 0]), 1)
        self.assertEqual(BitManipulationProblems.single_number([5, 0, 5, 0, 10]), 10)

    def test_single_number_empty_list(self):
        # Problem statement: "Given a non-empty array of integers"
        # So an empty list should not occur, but handling might be needed depending on strictness.
        # For now, relying on problem constraint. If it were allowed, XORing an empty list
        # would typically result in 0 or an error, depending on language/context.
        pass # No explicit test for empty list based on problem statement.

    # --- Test bitwise_insert ---
    def test_bitwise_insert_basic(self):
        # N=0b10000000000 (1024), M=0b10011 (19), i=2, j=6
        # Expected: 0b10001001100 (1092)
        N = 0b10000000000
        M = 0b10011
        i = 2
        j = 6
        expected = 0b10001001100
        self.assertEqual(BitManipulationProblems.bitwise_insert(N, M, i, j), expected)
        self.assertEqual(to_binary_string(BitManipulationProblems.bitwise_insert(N, M, i, j), 11), to_binary_string(expected, 11))
        
        # N=0b11111, M=0b0, i=1, j=3
        # Clear bits 1,2,3 in N (0b11111 -> 0b10001) then insert M=0b0 -> 0b10001 (17)
        N = 0b11111
        M = 0b0
        i = 1
        j = 3
        expected = 0b10001
        self.assertEqual(BitManipulationProblems.bitwise_insert(N, M, i, j), expected)
        self.assertEqual(to_binary_string(BitManipulationProblems.bitwise_insert(N, M, i, j), 5), to_binary_string(expected, 5))

    def test_bitwise_insert_full_overwrite(self):
        # N=0b11111111 (255), M=0b1010 (10), i=0, j=7 (all bits)
        # Expected: 0b00001010 (10) (assuming 8-bit context)
        N = 0b11111111
        M = 0b1010
        i = 0
        j = 7
        expected = 0b00001010 # M shifted by 0
        self.assertEqual(BitManipulationProblems.bitwise_insert(N, M, i, j), expected)
        self.assertEqual(to_binary_string(BitManipulationProblems.bitwise_insert(N, M, i, j), 8), to_binary_string(expected, 8))

        # N=0b00000000, M=0b11111111, i=0, j=7
        # Expected: 0b11111111 (255)
        N = 0b0
        M = 0b11111111
        i = 0
        j = 7
        expected = M
        self.assertEqual(BitManipulationProblems.bitwise_insert(N, M, i, j), expected)
        self.assertEqual(to_binary_string(BitManipulationProblems.bitwise_insert(N, M, i, j), 8), to_binary_string(expected, 8))

    def test_bitwise_insert_m_zero(self):
        # N=0b111111, M=0, i=2, j=4
        # Clear bits 2,3,4 in N (0b111111 -> 0b100011) and insert 0 -> 0b100011 (35)
        N = 0b111111
        M = 0
        i = 2
        j = 4
        expected = 0b100011
        self.assertEqual(BitManipulationProblems.bitwise_insert(N, M, i, j), expected)
        self.assertEqual(to_binary_string(BitManipulationProblems.bitwise_insert(N, M, i, j), 6), to_binary_string(expected, 6))

    def test_bitwise_insert_m_is_one(self):
        # N=0b11111, M=0b1, i=2, j=2
        # N cleared for bit 2 (0b11111 -> 0b11011)
        # M shifted by 2 (0b1 << 2 = 0b100)
        # Result: 0b11011 | 0b100 = 0b11111 (31)
        N = 0b11111
        M = 0b1
        i = 2
        j = 2
        expected = 0b11111
        self.assertEqual(BitManipulationProblems.bitwise_insert(N, M, i, j), expected)
        self.assertEqual(to_binary_string(BitManipulationProblems.bitwise_insert(N, M, i, j), 5), to_binary_string(expected, 5))
        
        # N=0b00000, M=0b1, i=2, j=2
        # Result: 0b100 (4)
        N = 0b0
        M = 0b1
        i = 2
        j = 2
        expected = 0b100
        self.assertEqual(BitManipulationProblems.bitwise_insert(N, M, i, j), expected)
        self.assertEqual(to_binary_string(BitManipulationProblems.bitwise_insert(N, M, i, j), 5), to_binary_string(expected, 5))

    def test_bitwise_insert_i_equals_j(self):
        # N=0b101010, M=0b1, i=3, j=3
        # N cleared for bit 3 (0b101010 -> 0b100010)
        # M shifted by 3 (0b1 << 3 = 0b1000)
        # Result: 0b100010 | 0b1000 = 0b101010 (42)
        N = 0b101010
        M = 0b1
        i = 3
        j = 3
        expected = 0b101010
        self.assertEqual(BitManipulationProblems.bitwise_insert(N, M, i, j), expected)
        self.assertEqual(to_binary_string(BitManipulationProblems.bitwise_insert(N, M, i, j), 6), to_binary_string(expected, 6))

    def test_bitwise_insert_edge_positions(self):
        # Insert M at LSBs (i=0)
        N = 0b11110000
        M = 0b101
        i = 0
        j = 2
        # N cleared for [0,2] -> 0b11110000
        # M shifted by 0 -> 0b101
        # Result: 0b11110000 | 0b101 = 0b11110101 (245)
        expected = 0b11110101
        self.assertEqual(BitManipulationProblems.bitwise_insert(N, M, i, j), expected)
        self.assertEqual(to_binary_string(BitManipulationProblems.bitwise_insert(N, M, i, j), 8), to_binary_string(expected, 8))

        # Insert M at MSBs (j=MAX_INT_BITS-1) assuming MAX_INT_BITS is the limit
        # This requires careful consideration of what the highest bit means.
        # Let's use 8 bits for illustration to keep it manageable.
        current_bits_limit = 8
        N = 0b00000011 # 3
        M = 0b101      # 5
        i = 5
        j = 7
        # N_cleared for [5,7] (0b00000011 -> 0b00000011)
        # M_shifted (0b101 << 5 = 0b10100000)
        # Result: 0b00000011 | 0b10100000 = 0b10100011 (163)
        expected = 0b10100011
        # Note: The function does not take `num_bits` as an argument for N's size directly.
        # It relies on MAX_INT_BITS for mask calculation. For tests, ensure N fits without implicit extension.
        self.assertEqual(BitManipulationProblems.bitwise_insert(N, M, i, j), expected)
        self.assertEqual(to_binary_string(BitManipulationProblems.bitwise_insert(N, M, i, j), current_bits_limit), to_binary_string(expected, current_bits_limit))


    def test_bitwise_insert_invalid_positions(self):
        # i > j
        with self.assertRaises(ValueError):
            BitManipulationProblems.bitwise_insert(0, 0, 5, 2)
        # i < 0
        with self.assertRaises(ValueError):
            BitManipulationProblems.bitwise_insert(0, 0, -1, 5)
        # j >= MAX_INT_BITS
        with self.assertRaises(ValueError):
            BitManipulationProblems.bitwise_insert(0, 0, 0, MAX_INT_BITS)
        with self.assertRaises(ValueError):
            BitManipulationProblems.bitwise_insert(0, 0, MAX_INT_BITS - 1, MAX_INT_BITS)

    def test_bitwise_insert_m_too_large_for_range(self):
        # M=0b111 (7), range [i=0, j=1] is only 2 bits wide. M needs 3 bits.
        N = 0b0
        M = 0b111
        i = 0
        j = 1
        with self.assertRaises(ValueError):
            BitManipulationProblems.bitwise_insert(N, M, i, j)
        
        # M=0b10 (2), range [i=2, j=2] is only 1 bit wide. M needs 2 bits.
        N = 0b0
        M = 0b10
        i = 2
        j = 2
        with self.assertRaises(ValueError):
            BitManipulationProblems.bitwise_insert(N, M, i, j)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)

```