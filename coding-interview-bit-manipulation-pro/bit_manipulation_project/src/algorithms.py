"""
bit_manipulation_project/src/algorithms.py

This module contains implementations of various bit manipulation algorithms,
each with multiple approaches, detailed comments, and complexity analysis.

Problems covered:
1. Count Set Bits (Hamming Weight)
2. Power of Two
3. Reverse Bits
4. Single Number (Find the non-repeated element)
5. Insert M into N
"""

from typing import Optional

def count_set_bits(n: int) -> int:
    """
    Problem 1: Count Set Bits (Hamming Weight)
    Calculates the number of '1' bits in the binary representation of an integer.

    --- Approaches ---

    Approach 1: Iterating through bits (Right Shift and AND)
    - Logic: Repeatedly check the least significant bit (LSB) using `n & 1`.
             Then, right shift `n` by 1 (`n >>= 1`) to process the next bit.
    - Time Complexity: O(log N) where N is the value of the number, or O(B) where B is the number of bits (e.g., 32 for an int).
                       Each right shift effectively halves the number, so it takes log base 2 of N steps.
    - Space Complexity: O(1)
    - Edge Cases: n = 0, n = MAX_INT, negative numbers (handling depends on signed vs unsigned interpretation).
                  For Python, integers handle arbitrary precision, but typically we consider a fixed bit width (e.g., 32-bit).
                  This approach treats n as an unsigned integer for counting '1's.

    Approach 2: Brian Kernighan's Algorithm
    - Logic: `n & (n - 1)` clears the least significant set bit in `n`.
             Repeatedly apply this operation until `n` becomes 0, incrementing a counter each time.
    - Time Complexity: O(K) where K is the number of set bits (K <= log N).
                       This is generally faster than Approach 1 when K is small.
    - Space Complexity: O(1)
    - Edge Cases: Similar to Approach 1.
    """
    if n < 0:
        # For negative numbers, Python's bitwise operations use two's complement.
        # If we want to count set bits in a 32-bit two's complement representation:
        # Example: -1 (decimal) is 0xFFFFFFFF (32-bit hex) or all 1s.
        # We'll treat negative numbers as their unsigned 32-bit equivalent for this problem context
        # (e.g., as if it were a C/Java unsigned int).
        # Python's default behavior for `n & 1` and `n >>= 1` for negative numbers is consistent
        # with two's complement, but we might want to cap it to a specific bit length for clarity.
        # For simplicity and common interview scenarios, we'll assume non-negative inputs or
        # treat negative inputs as their 32-bit unsigned representation equivalent.
        # Let's assume input `n` is an effective unsigned integer for counting.
        # For a standard 32-bit integer, we can do `n = n & 0xFFFFFFFF` if we want to explicitly
        # treat it as 32-bit unsigned, otherwise, Python's int handles it.
        # For this function, let's consider the magnitude for clarity.
        # Or, if explicitly considering 32-bit signed:
        # return bin(n & 0xFFFFFFFF).count('1')
        # However, typically "count set bits" implies positive integers or unsigned context.
        pass # Let's proceed as if n is effectively unsigned for bit counting.

    # --- Approach 1: Iterating through bits ---
    def _count_set_bits_approach1(num: int) -> int:
        count = 0
        # For clarity and to handle potential Python large ints, limit to typical 32/64 bits for bit counting context
        # If input can be very large, this loop runs many times.
        # For practical interview, typically assume 32-bit int.
        # If num is negative, Python's right shift maintains sign.
        # E.g., -5 (1...1101) >> 1 is -3 (1...1110)
        # To handle uniformly as positive for bit counting, we might want to cast to unsigned equivalent.
        # For now, let's assume num is positive as per standard interview context for this problem.
        current_num = num
        while current_num > 0:
            if (current_num & 1) == 1: # Check LSB
                count += 1
            current_num >>= 1 # Right shift by 1
        return count
    # return _count_set_bits_approach1(n)

    # --- Approach 2: Brian Kernighan's Algorithm ---
    def _count_set_bits_approach2(num: int) -> int:
        count = 0
        current_num = num
        while current_num > 0:
            current_num &= (current_num - 1) # Clears the least significant set bit
            count += 1
        return count
    return _count_set_bits_approach2(n)


def is_power_of_two(n: int) -> bool:
    """
    Problem 2: Power of Two
    Determines if a given integer is a power of two.
    A number n is a power of two if there exists an integer x such that n = 2^x.

    --- Approaches ---

    Approach 1: Loop and Divide
    - Logic: If n is positive, repeatedly divide n by 2 until it becomes 1. If at any point
             n is not divisible by 2 (and not 1), it's not a power of two.
    - Time Complexity: O(log N)
    - Space Complexity: O(1)
    - Edge Cases: n <= 0, n = 1 (2^0), n = large power of two.

    Approach 2: Bit Manipulation
    - Logic: A positive integer `n` is a power of two if and only if `n` has exactly one set bit
             in its binary representation.
             The expression `n & (n - 1)` clears the least significant set bit of `n`.
             If `n` has only one set bit, `n - 1` will have all bits to the right of that set bit as '1's,
             and that set bit itself as '0'.
             Example: n = 8 (1000_2), n-1 = 7 (0111_2). n & (n-1) = 0.
             This property means `n & (n - 1)` will be 0 if `n` is a power of two.
             We must also check that `n > 0` because 0 is not a power of two.
    - Time Complexity: O(1)
    - Space Complexity: O(1)
    - Edge Cases: n <= 0, n = 1.
    """

    # --- Approach 1: Loop and Divide ---
    def _is_power_of_two_approach1(num: int) -> bool:
        if num <= 0:
            return False
        while num % 2 == 0:
            num //= 2
        return num == 1
    # return _is_power_of_two_approach1(n)

    # --- Approach 2: Bit Manipulation ---
    def _is_power_of_two_approach2(num: int) -> bool:
        # A number `n` is a power of two if it's positive and has exactly one set bit.
        # `n & (n - 1)` will be 0 if `n` has only one set bit.
        # Example:
        # n = 8  (1000_2)
        # n-1 = 7  (0111_2)
        # n & (n-1) = 0000_2 = 0
        #
        # n = 6  (0110_2)
        # n-1 = 5  (0101_2)
        # n & (n-1) = 0100_2 = 4 (not 0)
        return num > 0 and (num & (num - 1)) == 0
    return _is_power_of_two_approach2(n)


def reverse_bits(n: int, num_bits: int = 32) -> int:
    """
    Problem 3: Reverse Bits
    Reverses the bits of a given 32-bit unsigned integer.

    --- Approaches ---

    Approach 1: Iterative Shifting and Building
    - Logic: Iterate `num_bits` times. In each iteration, extract the least significant bit (LSB)
             of `n` using `n & 1`. Then, left shift the `result` by 1 and OR it with the extracted LSB.
             Finally, right shift `n` by 1 to process the next bit.
    - Time Complexity: O(B) where B is the number of bits (e.g., 32).
    - Space Complexity: O(1)
    - Edge Cases: n = 0, n = 1, n = MAX_INT (all 1s), specific bit patterns (e.g., 0...010...0).

    Approach 2: Optimized Swapping (for fixed-size integers like 32-bit)
    - Logic: This approach is faster for fixed-size integers. It performs parallel bit swaps
             in stages. For a 32-bit integer, it swaps:
             1. Adjacent 1-bit groups (swaps bits at i and i+1)
             2. Adjacent 2-bit groups (swaps bits at i, i+1 with i+2, i+3)
             3. Adjacent 4-bit groups
             4. Adjacent 8-bit groups
             5. Adjacent 16-bit groups
             This is achieved using bitmasks and shifts.
    - Time Complexity: O(log B) where B is the number of bits. (Specifically, log2(B) operations)
    - Space Complexity: O(1)
    - Note: This approach is generally more complex to implement and understand, often not expected
            unless you're specializing in highly optimized bit-level programming.
            For general interviews, Approach 1 is usually sufficient and preferred for clarity.
    """
    if not (0 <= n < (1 << num_bits)):
        # Ensure n fits within the specified number of bits for unsigned context
        # Python ints can be arbitrarily large, but for this problem, we usually assume
        # a fixed bit width like 32.
        # If n is negative, it's typically treated as its unsigned equivalent in 32 bits.
        # Example: -1 (python) -> 0xFFFFFFFF (32-bit unsigned)
        # For this function, let's explicitly work with positive `n` or its unsigned 32-bit representation.
        if n < 0:
            n = n & ((1 << num_bits) - 1) # Truncate to num_bits (unsigned equivalent)
        else:
            raise ValueError(f"Input n={n} exceeds {num_bits}-bit unsigned integer range.")

    # --- Approach 1: Iterative Shifting and Building ---
    def _reverse_bits_approach1(num: int, bits: int) -> int:
        reversed_num = 0
        for _ in range(bits):
            reversed_num <<= 1          # Shift result left to make space for the next bit
            reversed_num |= (num & 1)   # Add the LSB of 'num' to 'reversed_num'
            num >>= 1                   # Shift 'num' right to process the next bit
        return reversed_num
    return _reverse_bits_approach1(n, num_bits)

    # --- Approach 2: Optimized Swapping (for 32-bit specific, generally not for generic `num_bits`) ---
    # This approach is hardcoded for 32-bit. Generalizing for `num_bits` would require dynamic mask generation.
    # def _reverse_bits_approach2_32bit(num: int) -> int:
    #     num = ((num & 0x55555555) << 1) | ((num & 0xAAAAAAAA) >> 1)  # Swap adjacent 1-bit groups
    #     num = ((num & 0x33333333) << 2) | ((num & 0xCCCCCCCC) >> 2)  # Swap adjacent 2-bit groups
    #     num = ((num & 0x0F0F0F0F) << 4) | ((num & 0xF0F0F0F0) >> 4)  # Swap adjacent 4-bit groups
    #     num = ((num & 0x00FF00FF) << 8) | ((num & 0xFF00FF00) >> 8)  # Swap adjacent 8-bit groups
    #     num = ((num & 0x0000FFFF) << 16) | ((num & 0xFFFF0000) >> 16) # Swap adjacent 16-bit groups
    #     return num
    # if num_bits == 32:
    #     return _reverse_bits_approach2_32bit(n)
    # else:
    #     # Fallback or raise error if num_bits is not 32 for this specific approach
    #     return _reverse_bits_approach1(n, num_bits) # Using Approach 1 for generic num_bits.


def single_number(nums: list[int]) -> int:
    """
    Problem 4: Single Number
    Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.

    Constraints:
    - The array is non-empty.
    - Every element appears twice except for one.

    --- Approaches ---

    Approach 1: Hash Map (Brute Force / Common non-bit approach)
    - Logic: Use a dictionary (hash map) to store counts of each number. Iterate through the array,
             incrementing counts. Finally, iterate through the map to find the number with count 1.
    - Time Complexity: O(N) for iterating and populating the map, O(N) in worst case for iterating map. Total O(N).
    - Space Complexity: O(N) in the worst case (if all numbers are unique until the last pair).
    - Drawbacks: Uses extra space.

    Approach 2: Bit Manipulation (XOR Property)
    - Logic: The XOR (exclusive OR) operation has the following properties:
             - `a ^ a = 0` (XORing a number with itself results in 0)
             - `a ^ 0 = a` (XORing a number with 0 results in the number itself)
             - XOR is commutative and associative (`a ^ b ^ c = a ^ (b ^ c)`)
             If we XOR all the numbers in the array, all the numbers that appear twice
             will cancel each other out (become 0), leaving only the single unique number.
             Example: `[2, 2, 1]` -> `2 ^ 2 ^ 1 = (2 ^ 2) ^ 1 = 0 ^ 1 = 1`
    - Time Complexity: O(N) because we iterate through the array once.
    - Space Complexity: O(1) because we only use a single variable to store the XOR sum.
    - Advantages: Optimal in both time and space.
    """

    # --- Approach 1: Hash Map ---
    # from collections import Counter
    # def _single_number_approach1(numbers: list[int]) -> int:
    #     counts = Counter(numbers)
    #     for num, count in counts.items():
    #         if count == 1:
    #             return num
    #     raise ValueError("No single number found (should not happen based on problem constraints)")
    # return _single_number_approach1(nums)

    # --- Approach 2: Bit Manipulation (XOR) ---
    def _single_number_approach2(numbers: list[int]) -> int:
        single = 0
        for num in numbers:
            single ^= num # XOR each number with the running XOR sum
        return single
    return _single_number_approach2(nums)


def insert_m_into_n(N: int, M: int, i: int, j: int, num_bits: int = 32) -> int:
    """
    Problem 5: Insert M into N
    Given two 32-bit (or `num_bits`) numbers, N and M, and two bit positions, i and j.
    Write a method to insert M into N such that M starts at bit j and ends at bit i.
    Assume that bits j through i have enough space to fit M.
    Bits are 0-indexed, with bit 0 being the least significant bit.

    Example:
    N = 10000000000_2 (1024)
    M = 10011_2 (19)
    i = 2
    j = 6
    Result: N = 10001001100_2 (1164)

    --- Approach ---

    Single Approach: Clear bits in N, then OR with M shifted.
    - Logic:
        1. Create a bitmask to clear bits from `j` down to `i` in `N`.
           - `all_ones = ~0` (effectively all 1s in 32/64 bits or Python's infinite bit representation).
           - `left_mask = all_ones << (j + 1)`: Creates a mask like `11111000000` where `j+1` zeros.
           - `right_mask = (1 << i) - 1`: Creates a mask like `00000000011` where `i` ones.
           - `mask = left_mask | right_mask`: Combines these to `11111000011` (all ones except from i to j).
        2. Clear the target bits in `N`: `N_cleared = N & mask`.
        3. Shift `M` to its target position: `M_shifted = M << i`.
        4. Insert `M_shifted` into `N_cleared` using OR: `result = N_cleared | M_shifted`.
    - Time Complexity: O(1) (as bitwise operations are constant time).
    - Space Complexity: O(1)
    - Edge Cases: i=0, j=num_bits-1, M=0, M=all_ones.
    """
    # Validate inputs:
    if not (0 <= i <= j < num_bits):
        raise ValueError(f"Invalid bit positions: 0 <= i ({i}) <= j ({j}) < num_bits ({num_bits}) must hold.")
    # M must fit within the range [i, j]. The problem statement assumes it fits.
    # We can add a check if `M >= (1 << (j - i + 1))`.
    if M >= (1 << (j - i + 1)):
        # Optional: warn or error if M is too large, even if problem statement assumes it fits.
        # For this problem, we'll assume the caller ensures M fits.
        pass

    # Step 1: Create a mask to clear bits from j to i in N.
    # To create a mask with 0s from bit i to bit j (inclusive) and 1s everywhere else:
    # Example num_bits = 32, i=2, j=6
    # All ones:                1111 1111 1111 1111 1111 1111 1111 1111
    # Create mask for bits AFTER j:
    # 1 << (j + 1) -> 0001 0000 0000 (j+1 = 7th bit set, 7 zeros after it)
    # ~(1 << (j + 1)) - 1 -> This is usually how you clear a range with a single mask.
    # Using two parts:
    # Part 1: Bits from j+1 to num_bits-1 are 1s, bits 0 to j are 0s.
    # `left_mask = ~0 << (j + 1)`
    #   For 32-bit: `all_ones = 0xFFFFFFFF`.
    #   `left_mask = (all_ones << (j + 1)) & all_ones` (ensure it stays within 32-bit if using fixed size)
    #   In Python, `~0` is -1, which is all ones if you interpret it as two's complement.
    #   So `~0 << (j + 1)` works correctly for creating a left mask.
    #   Example: j=6. j+1=7. `~0 << 7` -> `...111110000000` (7 zeros)
    left_mask = ~0 << (j + 1)

    # Part 2: Bits from 0 to i-1 are 1s, bits i to num_bits-1 are 0s.
    # `right_mask = (1 << i) - 1`
    #   Example: i=2. `(1 << 2) - 1` -> `(100_2) - 1` -> `011_2` (2 ones)
    right_mask = (1 << i) - 1

    # Combine the two masks: `mask = left_mask | right_mask`
    # Example j=6, i=2:
    # left_mask : ...111110000000
    # right_mask: ...000000000011
    # mask      : ...111110000011 (0s from bit 2 to bit 6, 1s everywhere else)
    mask = left_mask | right_mask

    # Step 2: Clear the bits in N from i to j.
    # This leaves N with 0s in the range where M will be inserted.
    N_cleared = N & mask

    # Step 3: Shift M to its target position.
    M_shifted = M << i

    # Step 4: Combine N_cleared and M_shifted using OR.
    # Since the bits in N_cleared are 0 in the range [i, j],
    # and M_shifted has 0s outside of its relevant bits,
    # ORing them correctly inserts M.
    result = N_cleared | M_shifted

    # Important: For fixed-bit-width systems (like 32-bit), we need to ensure the
    # result stays within that bit width, as Python integers have arbitrary precision.
    # This is done by masking the final result with `(1 << num_bits) - 1`
    # if `num_bits` represents a fixed unsigned integer width.
    return result & ((1 << num_bits) - 1) # Ensure result is within num_bits bounds for unsigned int.

# Expose only the primary functions
__all__ = [
    "count_set_bits",
    "is_power_of_two",
    "reverse_bits",
    "single_number",
    "insert_m_into_n"
]