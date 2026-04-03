```python
import math

def to_binary_string(n: int, width: int = None) -> str:
    """
    Converts an integer to its binary string representation.
    Handles negative numbers by showing two's complement for a given width.

    Args:
        n (int): The integer to convert.
        width (int, optional): The desired width of the binary string.
                                If None, uses Python's default bin() behavior
                                (variable width, no leading zeros after '0b').
                                If specified, pads with leading zeros for positive numbers
                                or shows full two's complement for negative numbers up to width.

    Returns:
        str: The binary string representation.
    """
    if n == 0:
        return '0' * width if width else '0b0'
    
    if n < 0:
        if width is None:
            # Python's bin() for negative numbers gives -0b...
            # This is not standard two's complement.
            # For general purpose, we'll return this or define a default width.
            # Let's assume a default 32-bit width for negative number representation if not specified.
            width = 32 # Common width for negative numbers in fixed-size systems
            
        # For negative numbers, calculate two's complement
        # Max value for 'width' bits is 2**width - 1
        # Two's complement of -n is (2**width - abs(n))
        # Or more simply: (1 << width) + n
        # This only works if n fits within 'width' bits
        if abs(n) > (1 << (width - 1)):
            raise ValueError(f"Absolute value of {n} exceeds capacity for {width}-bit representation.")
            
        # The result of (1 << width) + n will be the unsigned representation
        # of the negative number in 'width' bits.
        unsigned_n = (1 << width) + n
        return format(unsigned_n, f'0{width}b')
    else:
        # Positive numbers
        if width is None:
            return bin(n)
        else:
            return format(n, f'0{width}b')

def get_bit(n: int, k: int) -> int:
    """Returns the k-th bit (0-indexed) of n."""
    return (n >> k) & 1

def set_bit(n: int, k: int) -> int:
    """Sets the k-th bit of n to 1."""
    return n | (1 << k)

def clear_bit(n: int, k: int) -> int:
    """Clears the k-th bit of n to 0."""
    return n & ~(1 << k)

def update_bit(n: int, k: int, v: int) -> int:
    """Updates the k-th bit of n to value v (0 or 1)."""
    mask = ~(1 << k)
    return (n & mask) | (v << k)

def clear_bits_msb_through_i(n: int, i: int) -> int:
    """Clears all bits from MSB (most significant bit) through bit i (inclusive)."""
    # Create a mask with all zeros from bit i upwards
    # Example: i=2. Mask: ...000111 (all 1s up to bit i-1)
    mask = (1 << i) - 1
    return n & mask

def clear_bits_i_through_0(n: int, i: int) -> int:
    """Clears all bits from bit i (inclusive) through bit 0."""
    # Create a mask with all zeros from bit i downwards
    # Example: i=2. Mask: ...111000 (all 1s from bit i+1 upwards)
    mask = ~((1 << (i + 1)) - 1)
    return n & mask

if __name__ == '__main__':
    print("--- Bit Utility Functions Test ---")

    # to_binary_string
    print(f"Binary of 13: {to_binary_string(13)}")
    print(f"Binary of 13 (8-bit): {to_binary_string(13, 8)}")
    print(f"Binary of 0: {to_binary_string(0)}")
    print(f"Binary of 0 (4-bit): {to_binary_string(0, 4)}")
    print(f"Binary of -5 (8-bit two's complement): {to_binary_string(-5, 8)}") # Expected: 11111011
    print(f"Binary of -1 (8-bit two's complement): {to_binary_string(-1, 8)}") # Expected: 11111111
    print(f"Binary of 255 (8-bit): {to_binary_string(255, 8)}")
    print(f"Binary of 256 (8-bit): {to_binary_string(256, 8)} (Overflow for positive if you considered fixed width)") # Shows 100000000
    try:
        to_binary_string(-200, 8)
    except ValueError as e:
        print(f"Expected error for -200 (8-bit): {e}")


    # Bit manipulation operations
    n = 0b10110101 # 181
    print(f"\nOriginal n: {to_binary_string(n, 8)} (decimal: {n})")

    # get_bit
    print(f"Bit 0 of n: {get_bit(n, 0)}") # Expected: 1
    print(f"Bit 1 of n: {get_bit(n, 1)}") # Expected: 0
    print(f"Bit 7 of n: {get_bit(n, 7)}") # Expected: 1

    # set_bit
    n_set = set_bit(n, 1) # Set bit 1 to 1: 10110111 (183)
    print(f"Set bit 1: {to_binary_string(n_set, 8)} (decimal: {n_set})")

    # clear_bit
    n_clear = clear_bit(n, 0) # Clear bit 0 to 0: 10110100 (180)
    print(f"Clear bit 0: {to_binary_string(n_clear, 8)} (decimal: {n_clear})")

    # update_bit
    n_update_1 = update_bit(n, 1, 1) # Update bit 1 to 1: 10110111 (183)
    print(f"Update bit 1 to 1: {to_binary_string(n_update_1, 8)} (decimal: {n_update_1})")
    n_update_0 = update_bit(n, 7, 0) # Update bit 7 to 0: 00110101 (53)
    print(f"Update bit 7 to 0: {to_binary_string(n_update_0, 8)} (decimal: {n_update_0})")

    # clear_bits_msb_through_i
    n_msb_clear = clear_bits_msb_through_i(n, 4) # Clear bits from 7 down to 4 (inclusive)
                                                  # Original: 10110101
                                                  # Expected: 00000101 (5)
    print(f"Clear MSB through bit 4: {to_binary_string(n_msb_clear, 8)} (decimal: {n_msb_clear})")

    # clear_bits_i_through_0
    n_lsb_clear = clear_bits_i_through_0(n, 3) # Clear bits from 3 down to 0 (inclusive)
                                                # Original: 10110101
                                                # Expected: 10110000 (176)
    print(f"Clear bit 3 through 0: {to_binary_string(n_lsb_clear, 8)} (decimal: {n_lsb_clear})")
```