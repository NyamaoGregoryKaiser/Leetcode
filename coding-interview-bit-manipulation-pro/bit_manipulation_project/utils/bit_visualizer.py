"""
bit_manipulation_project/utils/bit_visualizer.py

A utility module to visualize the binary representation of integers,
useful for understanding bit manipulation operations.
"""

def visualize_bits(n: int, num_bits: int = 32, group_size: int = 4, signed: bool = False) -> str:
    """
    Generates a string representation of an integer's bits, grouped for readability.

    Args:
        n (int): The integer to visualize.
        num_bits (int): The number of bits to display. Common values are 8, 16, 32, 64.
                        If n requires more bits than num_bits, it will be truncated
                        (for unsigned) or represented incorrectly (for signed).
        group_size (int): How many bits to group together (e.g., 4 for '0001 1010').
        signed (bool): If True, treats `n` as a signed integer (two's complement)
                       and visualizes its `num_bits` representation.
                       If False, treats `n` as an unsigned integer.

    Returns:
        str: A string showing the binary representation of `n`.

    Examples:
        visualize_bits(5, 8)               -> "0000 0101"
        visualize_bits(-5, 8, signed=True) -> "1111 1011"
        visualize_bits(256, 16, 8)         -> "00000001 00000000"
    """
    if signed:
        # Handle signed numbers using two's complement for num_bits
        # Max value for signed num_bits: 2^(num_bits-1) - 1
        # Min value for signed num_bits: -2^(num_bits-1)
        if not (- (1 << (num_bits - 1)) <= n < (1 << (num_bits - 1))):
            # If n is outside the signed range, truncate or represent its two's complement.
            # Example: -1 in 8 bits is 11111111. Python's `bin()` on negative numbers
            # includes a leading `-` and then binary of its positive counterpart.
            # To get two's complement for negative `n`:
            # 1. Take absolute value of n.
            # 2. Convert to binary, pad with zeros.
            # 3. Invert bits.
            # 4. Add 1.
            # OR simpler: `n & ((1 << num_bits) - 1)` for positive n.
            # For negative `n`, Python's bitwise ops implicitly use two's complement
            # if we restrict to `num_bits` by `n & mask`.
            n = n & ((1 << num_bits) - 1)
        
        # Convert to binary string, padding with num_bits leading zeros.
        # Python's bin() for negative numbers is like '-0b101' for -5.
        # We want the two's complement representation, e.g., '11111011' for -5 (8-bit).
        # We can achieve this by treating `n` as an unsigned `num_bits` integer:
        binary_str = bin(n & ((1 << num_bits) - 1))[2:].zfill(num_bits)
    else:
        if n < 0:
            # If unsigned is requested for negative n, treat as its positive counterpart or error.
            # Here, we'll convert to its unsigned `num_bits` representation.
            n = n & ((1 << num_bits) - 1)
        binary_str = bin(n)[2:].zfill(num_bits)

    # Group the bits for readability
    grouped_bits = []
    for i in range(0, len(binary_str), group_size):
        grouped_bits.append(binary_str[i:i+group_size])
    return " ".join(grouped_bits)

# Example Usage (for testing the visualizer itself)
if __name__ == "__main__":
    print("--- Unsigned Bit Visualization (32-bit by default) ---")
    print(f"Number: 5              -> {visualize_bits(5)}")
    print(f"Number: 0              -> {visualize_bits(0)}")
    print(f"Number: 1              -> {visualize_bits(1)}")
    print(f"Number: 255            -> {visualize_bits(255)}") # All 1s in 8 bits
    print(f"Number: 256            -> {visualize_bits(256)}")
    print(f"Number: 0xFFFFFFFF (max 32-bit unsigned) -> {visualize_bits(0xFFFFFFFF)}")
    print(f"Number: 0xAAAAAAAA (alternating) -> {visualize_bits(0xAAAAAAAA)}")

    print("\n--- Unsigned Bit Visualization (8-bit) ---")
    print(f"Number: 5 (8-bit)      -> {visualize_bits(5, num_bits=8)}")
    print(f"Number: 255 (8-bit)    -> {visualize_bits(255, num_bits=8)}")
    print(f"Number: 170 (8-bit)    -> {visualize_bits(170, num_bits=8)}") # 1010 1010

    print("\n--- Signed Bit Visualization (8-bit) ---")
    print(f"Number: 5 (8-bit signed)  -> {visualize_bits(5, num_bits=8, signed=True)}")
    print(f"Number: -5 (8-bit signed) -> {visualize_bits(-5, num_bits=8, signed=True)}")
    print(f"Number: -1 (8-bit signed) -> {visualize_bits(-1, num_bits=8, signed=True)}")
    print(f"Number: 127 (max 8-bit signed) -> {visualize_bits(127, num_bits=8, signed=True)}")
    print(f"Number: -128 (min 8-bit signed) -> {visualize_bits(-128, num_bits=8, signed=True)}")

    print("\n--- Custom Group Size ---")
    print(f"Number: 0b10110011 (group 2) -> {visualize_bits(0b10110011, num_bits=8, group_size=2)}")