```python
import sys
import math
from src.utils import to_binary_string

# Define MAX_INT_BITS for operations like reverse_bits, which often
# assume a fixed integer size in interviews (e.g., 32-bit for `int` in C/Java).
# Python integers have arbitrary precision, so this is a convention here.
MAX_INT_BITS = 32

class BitManipulationProblems:
    """
    A collection of common Bit Manipulation problems with optimal solutions
    and alternative approaches.
    """

    @staticmethod
    def count_set_bits(n: int) -> int:
        """
        Problem 1: Count Set Bits (Hamming Weight)
        Counts the number of '1' bits in the binary representation of a non-negative integer.

        Args:
            n (int): The non-negative integer.

        Returns:
            int: The number of set bits.

        Example:
            count_set_bits(13) == 3 (13 is 0b1101)
        """
        if n < 0:
            raise ValueError("Input must be a non-negative integer.")

        # Approach 1: Iterative check (right shift)
        # Time Complexity: O(log N), where N is the value of the integer.
        #                  Specifically, O(number of bits). For 32-bit int, it's O(32).
        # Space Complexity: O(1)
        def approach_iterative(num: int) -> int:
            count = 0
            while num > 0:
                # Check the least significant bit (LSB)
                if (num & 1) == 1:
                    count += 1
                # Right shift to process the next bit
                num >>= 1
            return count

        # Approach 2: Brian Kernighan's Algorithm
        # This algorithm cleverly unsets the least significant set bit (LSB) in each iteration.
        # n & (n - 1) will turn off the rightmost set bit.
        # E.g., n = 12 (0b1100)
        # 1. 12 (0b1100) & 11 (0b1011) = 8 (0b1000) -> count = 1
        # 2. 8 (0b1000) & 7 (0b0111) = 0 (0b0000) -> count = 2
        # Time Complexity: O(k), where k is the number of set bits.
        #                  This is often faster than O(log N) if k << log N.
        # Space Complexity: O(1)
        def approach_kernighan(num: int) -> int:
            count = 0
            while num > 0:
                num &= (num - 1)  # Unsets the rightmost set bit
                count += 1
            return count

        # Approach 3: Built-in Python function (most concise)
        # Time Complexity: O(log N) - implementation dependent, typically efficient C code.
        # Space Complexity: O(log N) - for creating the binary string representation, though
        #                  underlying implementation might be O(1) if directly counting bits.
        def approach_builtin(num: int) -> int:
            return bin(num).count('1')

        # Choosing Kernighan's algorithm as the primary optimal solution due to its
        # efficiency (O(k) where k is number of set bits) and elegance.
        # You could also consider a lookup table for speed if the range of N is small,
        # but for general integers, Kernighan is typically preferred over iterative shifting.
        
        # Uncomment to test different approaches:
        # return approach_iterative(n)
        return approach_kernighan(n)
        # return approach_builtin(n)

    @staticmethod
    def is_power_of_two(n: int) -> bool:
        """
        Problem 2: Check if a number is a power of two.
        A number is a power of two if it is positive and has exactly one set bit.

        Args:
            n (int): The integer to check.

        Returns:
            bool: True if n is a power of two, False otherwise.

        Example:
            is_power_of_two(16) == True (16 is 0b10000)
            is_power_of_two(3) == False (3 is 0b00011)
        """
        # Optimal Approach: Bit Manipulation
        # A power of two in binary looks like 100...0.
        # e.g., 8 = 0b1000
        # Then, n - 1 looks like 011...1.
        # e.g., 7 = 0b0111
        # The bitwise AND of n and (n - 1) will always be 0 for powers of two.
        # e.g., 0b1000 & 0b0111 = 0b0000
        # This property only holds for positive numbers, so n > 0 is essential.
        # Time Complexity: O(1)
        # Space Complexity: O(1)
        
        # Consider edge cases:
        # n = 0: Not a power of two. (0 & -1 = 0, but 0 is not a power of two)
        # n < 0: Not a power of two.
        
        return n > 0 and (n & (n - 1) == 0)

        # Alternative Approach: Logarithm
        # If n is a power of two, then log base 2 of n should be an integer.
        # Time Complexity: O(1) due to hardware-level log computation, but can involve
        #                  floating point precision issues.
        # Space Complexity: O(1)
        # def approach_log(num: int) -> bool:
        #     if num <= 0:
        #         return False
        #     # Use a small epsilon for floating point comparison
        #     return (math.log2(num) % 1) < sys.float_info.epsilon
        # return approach_log(n)

        # Alternative Approach: Iterative Division
        # Keep dividing n by 2 until it's odd. If the result is 1, it's a power of two.
        # Time Complexity: O(log N)
        # Space Complexity: O(1)
        # def approach_iterative_division(num: int) -> bool:
        #     if num <= 0:
        #         return False
        #     while num % 2 == 0:
        #         num //= 2
        #     return num == 1
        # return approach_iterative_division(n)

    @staticmethod
    def reverse_bits(n: int, num_bits: int = MAX_INT_BITS) -> int:
        """
        Problem 3: Reverse Bits
        Reverses the bits of a given 32-bit unsigned integer.
        (Note: Python integers handle arbitrary precision, but for interview
         context, usually a fixed bit length like 32 is assumed).

        Args:
            n (int): The 32-bit unsigned integer to reverse.
            num_bits (int): The fixed number of bits to consider for reversal (e.g., 32).

        Returns:
            int: The integer with its bits reversed.

        Example:
            For n = 0b00000010100101000001111010011100 (432615966 in decimal)
            reverse_bits(432615966) == 964176192 (0b00111001011110000010100101000000)
        """
        if not (0 <= n < (1 << num_bits)):
            raise ValueError(f"Input n must be an unsigned integer within {num_bits} bits.")

        # Approach 1: Iterative bit extraction and placement
        # This is a common and straightforward method.
        # We iterate through the bits of 'n' from LSB to MSB, and
        # place them into the result 'reversed_n' from MSB to LSB.
        # Time Complexity: O(num_bits)
        # Space Complexity: O(1)
        reversed_n = 0
        for i in range(num_bits):
            # 1. Extract the i-th bit from n
            # (n >> i) shifts the i-th bit to the LSB position.
            # & 1 isolates that LSB.
            bit = (n >> i) & 1

            # 2. Place this bit into the corresponding position in reversed_n
            # (num_bits - 1 - i) calculates the target position for the bit
            # from the right in the reversed number.
            # Example: original bit 0 goes to reversed bit (num_bits - 1)
            #          original bit 1 goes to reversed bit (num_bits - 2)
            # (bit << (num_bits - 1 - i)) shifts the extracted bit to its new position.
            # | operator combines it with the existing reversed_n.
            reversed_n |= (bit << (num_bits - 1 - i))
        
        return reversed_n

        # Approach 2 (more advanced): Byte Swapping / Divide and Conquer
        # This approach involves swapping groups of bits (e.g., bytes, nibbles)
        # It's faster for fixed-width integers (like 32-bit) on some architectures
        # but harder to implement and might be overkill for an interview unless specifically asked.
        # Example for 32-bit integer:
        # n = ((n >> 1) & 0x55555555) | ((n & 0x55555555) << 1)  # Swap adjacent bits (1-bit groups)
        # n = ((n >> 2) & 0x33333333) | ((n & 0x33333333) << 2)  # Swap 2-bit groups
        # n = ((n >> 4) & 0x0F0F0F0F) | ((n & 0x0F0F0F0F) << 4)  # Swap nibbles (4-bit groups)
        # n = ((n >> 8) & 0x00FF00FF) | ((n & 0x00FF00FF) << 8)  # Swap bytes (8-bit groups)
        # n = (n >> 16) | (n << 16)                               # Swap half-words (16-bit groups)
        # return n
        # This approach is O(log(num_bits)) in terms of number of operations,
        # but each operation involves constants. Total O(1) for fixed num_bits.
        # Space Complexity: O(1)

    @staticmethod
    def single_number(nums: list[int]) -> int:
        """
        Problem 4: Find the Single Number
        Given a non-empty array of integers, every element appears twice except for one. Find that single one.

        Args:
            nums (list[int]): A list of integers.

        Returns:
            int: The integer that appears only once.

        Example:
            single_number([2, 2, 1]) == 1
            single_number([4, 1, 2, 1, 2]) == 4
        """
        # Optimal Approach: XOR Property
        # The XOR operation has the following properties:
        # 1. x ^ 0 = x (identity)
        # 2. x ^ x = 0 (inverse)
        # 3. x ^ y ^ x = (x ^ x) ^ y = 0 ^ y = y (associativity and commutativity)
        # If we XOR all numbers in the array, all numbers that appear twice will cancel
        # each other out (x ^ x = 0), leaving only the single number.
        # Time Complexity: O(N), where N is the number of elements in the array.
        # Space Complexity: O(1)
        
        single = 0
        for num in nums:
            single ^= num
        return single

        # Alternative Approach: Hash Map (Dictionary)
        # Store counts of each number. Then iterate through the map to find the one with count 1.
        # Time Complexity: O(N) for building the map, O(N) in worst case for iterating (if many unique numbers).
        # Space Complexity: O(N) in worst case (if all numbers are unique, except one).
        # from collections import defaultdict
        # counts = defaultdict(int)
        # for num in nums:
        #     counts[num] += 1
        # for num, count in counts.items():
        #     if count == 1:
        #         return num
        # return -1 # Should not reach here per problem constraints

        # Alternative Approach: Set
        # Add numbers to a set. If a number is already in the set, remove it.
        # The remaining number in the set is the single one.
        # Time Complexity: O(N) on average (set operations are O(1) average).
        # Space Complexity: O(N) in worst case.
        # seen = set()
        # for num in nums:
        #     if num in seen:
        #         seen.remove(num)
        #     else:
        #         seen.add(num)
        # return seen.pop() # The set will contain only one element

    @staticmethod
    def bitwise_insert(N: int, M: int, i: int, j: int) -> int:
        """
        Problem 5: Bitwise Insertion (Cracking the Coding Interview - 5.1)
        You are given two 32-bit numbers, N and M, and two bit positions, i and j.
        Write a method to insert M into N such that M starts at bit j and ends at bit i.
        You can assume that the bits j through i have enough space to fit all of M.
        That is, if M = 10011, you can assume that there are at least 5 bits between i and j.
        (Inclusive: j >= i).

        Args:
            N (int): The destination 32-bit number.
            M (int): The source number to insert.
            i (int): The start bit position (inclusive, 0-indexed LSB).
            j (int): The end bit position (inclusive, 0-indexed LSB).

        Returns:
            int: The modified N with M inserted.

        Example:
            N = 0b10000000000 (1024)
            M = 0b10011 (19)
            i = 2, j = 6
            Expected output: 0b10001001100 (1092)

            Visual breakdown:
            N: 10000000000
            M:     10011
            i=2, j=6 (M's rightmost bit goes to N's bit i, M's leftmost bit goes to N's bit j)

            1. Clear bits from i to j in N.
               Before: N = 10000000000
               Mask to clear [i, j]:
                 Left part: All 1s up to bit j+1 (e.g., if j=6, up to bit 7, so 111111111111...10000000)
                 Right part: All 1s from bit i-1 down to 0 (e.g., if i=2, down to bit 1, so 0000000000...00000011)
                 Combined: ...11110000000 & ...00000000011 => ...11100000011 (mask with zeros in [i, j])
               After clearing N: 10000000000 & ...11100000011 = 10000000000

            2. Shift M so its LSB is at position i.
               M_shifted = 10011 << 2 = 1001100

            3. OR the modified N and M_shifted.
               10000000000 | 000001001100 (M shifted)
               Result:    10001001100
        """
        # Input validation for bit positions
        if not (0 <= i <= j < MAX_INT_BITS):
            raise ValueError(f"Invalid bit positions: 0 <= i ({i}) <= j ({j}) < {MAX_INT_BITS}")
        
        # Ensure M fits within the range [i, j]
        # The number of bits M needs is the length of its binary representation.
        # Python's `bit_length()` tells us the number of bits required to represent an integer,
        # excluding the sign and leading zeros. 0.bit_length() is 0.
        if M.bit_length() > (j - i + 1):
             raise ValueError(f"M ({M} / {to_binary_string(M)}) does not fit into the range [{i}, {j}] "
                              f"which is {j - i + 1} bits long. M needs {M.bit_length()} bits.")

        # Step 1: Create a mask to clear bits from i to j in N.
        # This mask will have 0s from bit i to j, and 1s everywhere else.
        
        # Part A: All 1s from MSB down to j+1.
        # (1 << (j + 1)) creates a 1 at position j+1, and 0s after it.
        # (~0) is all 1s (effectively -1 in two's complement).
        # (~((1 << (j + 1)) - 1)) creates 1s from j+1 onwards.
        # E.g., if j=6, (1 << 7) = 0b10000000. ((1 << 7) - 1) = 0b01111111.
        # ~0b01111111... = ...11110000000.
        left_mask = ~((1 << (j + 1)) - 1)
        
        # Part B: All 1s from i-1 down to 0.
        # (1 << i) creates a 1 at position i, and 0s after it.
        # ((1 << i) - 1) creates 1s from bit i-1 down to 0.
        # E.g., if i=2, (1 << 2) = 0b100. ((1 << 2) - 1) = 0b011.
        right_mask = (1 << i) - 1
        
        # Combine the masks: ORing them results in 1s everywhere except [i, j].
        clear_mask = left_mask | right_mask
        
        # Clear the bits in N in the range [i, j]
        N_cleared = N & clear_mask

        # Step 2: Shift M to align with position i.
        M_shifted = M << i

        # Step 3: OR the cleared N with the shifted M.
        # This places M into the cleared section of N.
        result = N_cleared | M_shifted

        # Return the final result
        return result

        # Time Complexity: O(1) - all operations are bitwise and constant time for fixed bit width.
        # Space Complexity: O(1)

```