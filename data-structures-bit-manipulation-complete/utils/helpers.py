```python
"""
Helper utilities for the Bit Manipulation Project.
"""

def print_binary(num: int, num_bits: int = 32) -> str:
    """
    Returns the binary representation of an integer, padded to a specified number of bits.
    Handles negative numbers by treating them as unsigned 2's complement for `num_bits`.
    For large positive numbers that exceed `num_bits`, it will print its full binary representation
    prefixed with '0b'.

    Args:
        num: The integer to convert.
        num_bits: The desired number of bits for padding. Default is 32.

    Returns:
        A string representing the binary number.
    """
    if num >= 0:
        # Format positive numbers with leading zeros up to num_bits
        return bin(num)[2:].zfill(num_bits)
    else:
        # For negative numbers, treat as unsigned in 2's complement context
        # This simulates how a fixed-width integer would represent it.
        # Example: -1 in 32-bit is 0xFFFFFFFF (all 1s)
        # `(1 << num_bits) + num` effectively calculates the unsigned equivalent.
        unsigned_val = (1 << num_bits) + num
        if unsigned_val < 0: # This can happen if num is too small for num_bits (e.g. num_bits=8, num=-257)
             return f"Negative number out of range for {num_bits}-bit unsigned: {num}"
        return bin(unsigned_val)[2:].zfill(num_bits)

if __name__ == "__main__":
    print("--- Helper: print_binary demonstration ---")
    print(f"print_binary(5, 8): {print_binary(5, 8)}")           # 00000101
    print(f"print_binary(11, 4): {print_binary(11, 4)}")         # 1011 (not 00001011, because it's truncated for visualization)
    print(f"print_binary(11, 32): {print_binary(11, 32)}")       # 00...001011
    print(f"print_binary(2**32 - 1, 32): {print_binary(2**32 - 1, 32)}") # 11...1111 (32 ones)
    print(f"print_binary(2**31, 32): {print_binary(2**31, 32)}")   # 10...000 (MSB is 1)
    print(f"print_binary(-1, 8): {print_binary(-1, 8)}")         # 11111111
    print(f"print_binary(-1, 32): {print_binary(-1, 32)}")       # 11...1111 (32 ones)
    print(f"print_binary(-5, 8): {print_binary(-5, 8)}")         # 11111011
    print(f"print_binary(-129, 8): {print_binary(-129, 8)}")     # Negative number out of range...
```