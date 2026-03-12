```python
"""
Problem: Reverse Bits

Description:
Reverse the bits of a 32-bit unsigned integer.
For example, given input 43261596 (binary 00000010100101000001111010011100),
return 964176192 (binary 00111001011110000010100101000000).

Constraints:
* The input is a 32-bit unsigned integer.
* The output should also be a 32-bit unsigned integer.
* Python handles arbitrary precision integers, so we need to be mindful of the 32-bit context.
"""

# Helper for visualization (from utils/helpers.py)
from utils.helpers import print_binary

# --- Approach 1: Iterative Shifting (Optimal for simplicity) ---

def reverse_bits_iterative(n: int) -> int:
    """
    Reverses the bits of a 32-bit unsigned integer using an iterative shifting approach.

    Algorithm:
    1. Initialize a `reversed_num` to 0. This will store the result.
    2. Iterate 32 times (for each bit in a 32-bit integer).
    3. In each iteration:
       a. Left-shift `reversed_num` by 1. This makes space for the next bit from `n`
          at the least significant position.
       b. Extract the least significant bit (LSB) of `n` using `n & 1`.
       c. Add this LSB to `reversed_num`.
       d. Right-shift `n` by 1 (`n >>= 1`) to process the next bit from `n`.
    4. After 32 iterations, `reversed_num` will contain the bits of the original
       `n` in reverse order.

    Example: n = 5 (binary 0...0101), expected output 10 (binary 0...1010) (simplified to 4 bits)
    Initial: reversed_num = 0, n = 5 (0101)

    Iteration 1 (bit 0):
        reversed_num <<= 1  => 0 (0000)
        n & 1 = 1           => LSB of n is 1
        reversed_num |= 1   => 1 (0001)
        n >>= 1             => 2 (0010)

    Iteration 2 (bit 1):
        reversed_num <<= 1  => 2 (0010)
        n & 1 = 0           => LSB of n is 0
        reversed_num |= 0   => 2 (0010)
        n >>= 1             => 1 (0001)

    Iteration 3 (bit 2):
        reversed_num <<= 1  => 4 (0100)
        n & 1 = 1           => LSB of n is 1
        reversed_num |= 1   => 5 (0101)
        n >>= 1             => 0 (0000)

    Iteration 4 (bit 3):
        reversed_num <<= 1  => 10 (1010)
        n & 1 = 0           => LSB of n is 0
        reversed_num |= 0   => 10 (1010)
        n >>= 1             => 0 (0000)

    Result: 10 (1010)

    Time Complexity: O(B) where B is the number of bits (e.g., 32).
                     Each operation (shift, AND, OR, add) is constant time.
    Space Complexity: O(1).
    """
    reversed_num = 0
    # We iterate for 32 bits, assuming a 32-bit unsigned integer.
    # Python integers handle arbitrary precision, so 'n' could be larger.
    # To strictly adhere to 32-bit, we could first ensure n is within 32-bit bounds:
    # n &= 0xFFFFFFFF
    for i in range(32):
        # Left-shift the result to make space for the next bit
        reversed_num <<= 1
        # Get the least significant bit of n
        current_bit = n & 1
        # Add the current bit to the result
        reversed_num |= current_bit
        # Right-shift n to process the next bit
        n >>= 1
    return reversed_num

# --- Approach 2: Divide and Conquer (Advanced / Potentially Faster with hardware support) ---
# This approach is generally more complex to implement in software using basic bitwise ops
# than the iterative approach, but can be very efficient if processors have specific
# instructions for parallel bit reversal or if implemented with larger blocks.
# For a typical interview, the iterative approach is usually preferred for its clarity
# and sufficient performance. This is included for completeness and understanding
# advanced bit manipulation patterns.

# Precomputation for byte reversal (optional, for specific optimization)
# _BYTE_REVERSE_TABLE = [0] * 256
# def _precompute_byte_reversal():
#     for i in range(256):
#         byte = i
#         rev_byte = 0
#         for _ in range(8):
#             rev_byte = (rev_byte << 1) | (byte & 1)
#             byte >>= 1
#         _BYTE_REVERSE_TABLE[i] = rev_byte
# _precompute_byte_reversal()

# def reverse_bits_divide_conquer(n: int) -> int:
#     """
#     Reverses the bits of a 32-bit unsigned integer using a divide and conquer strategy.
#     This method involves swapping groups of bits in parallel.

#     Algorithm (Simplified for 32-bit):
#     1. Swap adjacent bits (2-bit blocks):
#        `n = ((n & 0xAAAAAAAA) >> 1) | ((n & 0x55555555) << 1)`
#     2. Swap adjacent 2-bit blocks (4-bit blocks):
#        `n = ((n & 0xCCCCCCCC) >> 2) | ((n & 0x33333333) << 2)`
#     3. Swap adjacent 4-bit blocks (8-bit bytes):
#        `n = ((n & 0xF0F0F0F0) >> 4) | ((n & 0x0F0F0F0F) << 4)`
#     4. Swap adjacent 8-bit bytes (16-bit words):
#        `n = ((n & 0xFF00FF00) >> 8) | ((n & 0x00FF00FF) << 8)`
#     5. Swap adjacent 16-bit words (32-bit halves):
#        `n = ((n & 0xFFFF0000) >> 16) | ((n & 0x0000FFFF) << 16)`

#     Constants used:
#     0xAAAAAAAA = 10101010... (mask for even bits)
#     0x55555555 = 01010101... (mask for odd bits)
#     0xCCCCCCCC = 11001100...
#     0x33333333 = 00110011...
#     0xF0F0F0F0 = 1111000011110000...
#     0x0F0F0F0F = 0000111100001111...
#     ... and so on.

#     Time Complexity: O(log B) where B is the number of bits (e.g., 32).
#                      Specifically, it's `log2(B)` steps, each with constant operations.
#     Space Complexity: O(1).
#     """
#     n = (n & 0x55555555) << 1 | (n & 0xAAAAAAAA) >> 1
#     n = (n & 0x33333333) << 2 | (n & 0xCCCCCCCC) >> 2
#     n = (n & 0x0F0F0F0F) << 4 | (n & 0xF0F0F0F0) >> 4
#     n = (n & 0x00FF00FF) << 8 | (n & 0xFF00FF00) >> 8
#     n = (n & 0x0000FFFF) << 16 | (n & 0xFFFF0000) >> 16
#     return n

# For simplicity and typical interview context, we'll just expose the iterative one as the optimal.
# The D&C approach is typically for hardware-level optimization or very specific competitive programming scenarios.

# --- Main function for demonstration/selection ---
def solve_reverse_bits(n: int, method: str = "iterative") -> int:
    """
    Selects and runs a specific method to reverse bits.

    Args:
        n: The integer whose bits are to be reversed.
        method: The string identifier for the method ('iterative').

    Returns:
        The integer with its bits reversed.

    Raises:
        ValueError: If an unknown method is specified.
    """
    if not (0 <= n <= 0xFFFFFFFF):
        raise ValueError("Input must be a 32-bit unsigned integer (0 to 2^32 - 1).")

    if method == "iterative":
        return reverse_bits_iterative(n)
    # elif method == "divide_conquer":
    #     return reverse_bits_divide_conquer(n) # Uncomment if you want to include this as an option
    else:
        raise ValueError(f"Unknown method: {method}")


if __name__ == "__main__":
    test_numbers = [
        0,                                  # All zeros
        1,                                  # 0...0001 -> 10...0000 (2^31)
        2,                                  # 0...0010 -> 010...0000 (2^30)
        0b101,                              # 5 -> 1010...0 (simplified)
        0b11111111111111111111111111111111, # All ones (2^32 - 1)
        43261596,                           # Example from problem description
        964176192,                          # Reversed example from problem description
        2**31,                              # 100...000 (MSB set) -> 0...001 (LSB set)
        2**16 - 1,                          # 0...00001111111111111111 -> 111111111111111100...0000
        (1 << 31) | 1                       # 100...001 -> 100...001 (symmetric pattern)
    ]

    print("--- Reverse Bits Problem ---")

    for num in test_numbers:
        print(f"\nOriginal Number: {num}")
        print(f"  Binary (32-bit): {print_binary(num, 32)}")
        reversed_val = solve_reverse_bits(num, method="iterative")
        print(f"  Reversed Number: {reversed_val}")
        print(f"  Binary Reversed: {print_binary(reversed_val, 32)}")

    # Specific detailed example
    n_example = 43261596 # 00000010100101000001111010011100
    expected_reversed = 964176192 # 00111001011110000010100101000000
    print(f"\n--- Detailed Example ---")
    print(f"Original: {n_example}")
    print(f"  Binary: {print_binary(n_example, 32)}")
    reversed_output = reverse_bits_iterative(n_example)
    print(f"Reversed: {reversed_output}")
    print(f"  Binary: {print_binary(reversed_output, 32)}")
    print(f"Expected: {expected_reversed}")
    print(f"Match: {reversed_output == expected_reversed}")

    n_example_short = 5 # 0101 (4-bit example)
    print(f"\n--- 4-bit Example for illustration ---")
    print(f"Original: {n_example_short} (Binary: {print_binary(n_example_short, 4)})")
    # Manually simulate 4-bit reversal using the function:
    reversed_short = 0
    temp_n = n_example_short
    for i in range(4): # Loop only 4 times for this example
        reversed_short <<= 1
        reversed_short |= (temp_n & 1)
        temp_n >>= 1
    print(f"Reversed: {reversed_short} (Binary: {print_binary(reversed_short, 4)}) (Expected 10)")

```