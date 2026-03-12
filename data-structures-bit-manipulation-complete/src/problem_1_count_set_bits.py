```python
"""
Problem: Count Set Bits (Hamming Weight)

Description:
Write a function that takes an unsigned integer and returns the number of '1' bits
it has (also known as the Hamming weight).

For example, the 32-bit integer '1011' (binary for 11) has three '1' bits.

Constraints:
* The input is a 32-bit unsigned integer.
* The system uses two's complement notation for negative numbers.
  For this problem, consider the input as an unsigned integer.
  Python integers handle arbitrary precision, but we'll simulate a 32-bit unsigned integer context
  by considering values within the range [0, 2^32 - 1].
"""

# Helper for visualization (from utils/helpers.py)
from utils.helpers import print_binary

# --- Approach 1: Iterative Shifting and Masking (Naive) ---

def count_set_bits_naive(n: int) -> int:
    """
    Counts the number of set bits (1s) in a 32-bit unsigned integer
    using iterative right shifting and masking.

    Algorithm:
    1. Initialize a `count` to 0.
    2. Loop 32 times (since it's a 32-bit integer).
    3. In each iteration, check the least significant bit (LSB) using `n & 1`.
       If the LSB is 1, increment `count`.
    4. Right-shift `n` by 1 (`n >>= 1`) to examine the next bit.
    5. After 32 iterations, `count` will hold the total number of set bits.

    Example: n = 11 (binary 0...01011)
    Initial: count = 0, n = 11
    Iteration 1: n & 1 = 1 (LSB is 1). count = 1. n = 11 >> 1 = 5 (binary 0...00101)
    Iteration 2: n & 1 = 1 (LSB is 1). count = 2. n = 5 >> 1 = 2 (binary 0...00010)
    Iteration 3: n & 1 = 0 (LSB is 0). count = 2. n = 2 >> 1 = 1 (binary 0...00001)
    Iteration 4: n & 1 = 1 (LSB is 1). count = 3. n = 1 >> 1 = 0 (binary 0...00000)
    ... (continue for 28 more iterations, n will be 0)
    Result: 3

    Time Complexity: O(log N) or O(B) where B is the number of bits (e.g., 32 for a 32-bit integer).
                     Each operation (AND, shift, add) is constant time.
    Space Complexity: O(1)
    """
    count = 0
    # We iterate for 32 bits, assuming a 32-bit unsigned integer.
    # Python integers have arbitrary precision, so 'n' could be larger.
    # To strictly adhere to 32-bit, we can add 'n &= 0xFFFFFFFF' at the start if it were signed.
    # However, for positive numbers, the logic holds.
    for _ in range(32): # Or while n > 0 for non-fixed bit length
        if (n & 1) == 1:
            count += 1
        n >>= 1
    return count

# --- Approach 2: Brian Kernighan's Algorithm (Optimal) ---

def count_set_bits_kernighan(n: int) -> int:
    """
    Counts the number of set bits (1s) in an integer using Brian Kernighan's algorithm.
    This algorithm cleverly leverages the property that `n & (n - 1)` clears the
    least significant set bit of `n`.

    Algorithm:
    1. Initialize a `count` to 0.
    2. While `n` is greater than 0:
       a. Increment `count`.
       b. Perform `n = n & (n - 1)`. This operation effectively turns off
          the rightmost (least significant) set bit in `n`.
    3. Return `count`.

    Example: n = 11 (binary 0...01011)
    Initial: count = 0, n = 11
    Iteration 1:
        n = 11 (01011)
        n-1 = 10 (01010)
        n & (n-1) = 01010 = 10. (Rightmost '1' at pos 0 cleared)
        count = 1. n = 10.
    Iteration 2:
        n = 10 (01010)
        n-1 = 9  (01001)
        n & (n-1) = 01000 = 8. (Rightmost '1' at pos 1 cleared)
        count = 2. n = 8.
    Iteration 3:
        n = 8 (01000)
        n-1 = 7 (00111)
        n & (n-1) = 00000 = 0. (Rightmost '1' at pos 3 cleared)
        count = 3. n = 0.
    Loop ends because n is 0.
    Result: 3

    Time Complexity: O(K) where K is the number of set bits.
                     This is generally faster than O(B) (where B is total bits)
                     when K is much smaller than B. In the worst case (all bits are 1),
                     it's O(B), similar to the naive approach.
    Space Complexity: O(1)
    """
    count = 0
    while n > 0:
        n &= (n - 1)  # Clear the least significant set bit
        count += 1
    return count

# --- Approach 3: Lookup Table (Precomputation) ---

# This approach is suitable when you need to count set bits for many numbers
# repeatedly, and the numbers are within a certain range (e.g., 8-bit, 16-bit).
# For a 32-bit integer, precomputing for all 2^32 numbers is not feasible.
# However, we can precompute for smaller chunks (e.g., 8-bit bytes) and combine.

_BYTE_POPCOUNT = [0] * 256  # Lookup table for 0-255 (8-bit numbers)

def _precompute_popcount():
    """
    Precomputes the number of set bits for all 8-bit unsigned integers (0-255).
    This function is called once at module load.
    """
    for i in range(256):
        _BYTE_POPCOUNT[i] = _BYTE_POPCOUNT[i >> 1] + (i & 1)

# Call precomputation once
_precompute_popcount()

def count_set_bits_lookup_table(n: int) -> int:
    """
    Counts the number of set bits in a 32-bit unsigned integer using a precomputed
    lookup table for 8-bit chunks.

    Algorithm:
    1. Precompute the set bits for all numbers from 0 to 255 (an 8-bit byte).
       This is done once globally.
    2. For a given 32-bit integer `n`, break it down into four 8-bit bytes.
    3. Look up the set bit count for each byte in the precomputed table.
    4. Sum the counts from the four bytes.

    Example: n = 2863311530 (binary 10101010101010101010101010101010)
    This number is 0xAAA AAAA A. Each byte is 0xAA (10101010).
    Popcount of 0xAA is 4+1 = 5 (precomputed)

    Iteration 1: n & 0xFF (first byte) -> 0xAA. _BYTE_POPCOUNT[0xAA] = 5. count = 5. n >>= 8.
    Iteration 2: n & 0xFF (second byte) -> 0xAA. _BYTE_POPCOUNT[0xAA] = 5. count = 10. n >>= 8.
    Iteration 3: n & 0xFF (third byte) -> 0xAA. _BYTE_POPCOUNT[0xAA] = 5. count = 15. n >>= 8.
    Iteration 4: n & 0xFF (fourth byte) -> 0xAA. _BYTE_POPCOUNT[0xAA] = 5. count = 20. n >>= 8.

    Result: 20

    Time Complexity: O(B/k) where B is the total number of bits (32) and k is the
                     chunk size (8). So, O(1) for a fixed-size integer (e.g., 4 lookups for 32-bit).
                     Precomputation is O(2^k).
    Space Complexity: O(2^k) for the lookup table (e.g., O(256) for 8-bit chunks).
    """
    count = 0
    # Simulate 32-bit unsigned integer, breaking into 4 bytes (8 bits each)
    for _ in range(4):
        # Extract the least significant 8 bits (a byte)
        byte = n & 0xFF
        count += _BYTE_POPCOUNT[byte]
        # Shift right by 8 bits to process the next byte
        n >>= 8
    return count

# --- Approach 4: Using Python's Built-in Functionality ---

def count_set_bits_builtin(n: int) -> int:
    """
    Counts the number of set bits (1s) in an integer using Python's built-in
    binary representation functionality.

    Algorithm:
    1. Convert the integer `n` to its binary string representation using `bin(n)`.
       This will produce a string like "0b1011".
    2. Count the occurrences of '1' in this string.

    Example: n = 11
    bin(11) -> "0b1011"
    "0b1011".count('1') -> 3

    Time Complexity: O(log N) or O(B) where B is the number of bits required to represent N.
                     String conversion and counting can take time proportional to the
                     number of bits.
    Space Complexity: O(log N) or O(B) for the binary string representation.
    """
    if n < 0:
        # Handle negative numbers if they were intended as 32-bit unsigned.
        # Python's bin() for negative numbers includes a '-' sign: bin(-5) -> '-0b101'.
        # For a 32-bit unsigned interpretation of a negative value, it would be
        # (2**32 + n) if n is negative.
        # Example: if n = -1, it's 0xFFFFFFFF (2^32 - 1) for unsigned 32-bit.
        # We assume positive integers for this problem as per description.
        # If strict 32-bit unsigned, `n = n & 0xFFFFFFFF` can be applied first.
        # For this problem, we'll assume valid positive integers.
        pass # Or raise ValueError("Input must be a non-negative integer for unsigned context")

    return bin(n).count('1')

# --- Main function for demonstration/selection ---
def solve_count_set_bits(n: int, method: str = "kernighan") -> int:
    """
    Selects and runs a specific method to count set bits.

    Args:
        n: The integer to count set bits for.
        method: The string identifier for the method ('naive', 'kernighan', 'lookup', 'builtin').

    Returns:
        The number of set bits.

    Raises:
        ValueError: If an unknown method is specified.
    """
    if method == "naive":
        return count_set_bits_naive(n)
    elif method == "kernighan":
        return count_set_bits_kernighan(n)
    elif method == "lookup":
        return count_set_bits_lookup_table(n)
    elif method == "builtin":
        return count_set_bits_builtin(n)
    else:
        raise ValueError(f"Unknown method: {method}")

if __name__ == "__main__":
    test_numbers = [0, 1, 2, 3, 7, 8, 15, 16, 31, 32, 2**31 - 1, 2**32 - 1, 123456789]

    print("--- Count Set Bits Problem ---")

    for num in test_numbers:
        print(f"\nNumber: {num} (Binary: {print_binary(num, 32)})")
        print(f"  Naive (Iterative Shifting): {count_set_bits_naive(num)}")
        print(f"  Kernighan's Algorithm:      {count_set_bits_kernighan(num)}")
        print(f"  Lookup Table (4-byte):      {count_set_bits_lookup_table(num)}")
        print(f"  Built-in (`bin().count('1')`): {count_set_bits_builtin(num)}")

    # Example for specific values
    n = 11  # 0...01011
    print(f"\nDetailed Example for n={n} (Binary: {print_binary(n, 32)})")
    print(f"  Kernighan's algorithm result: {count_set_bits_kernighan(n)}")

    n = 2863311530 # 10101010101010101010101010101010 (0xAAAAAAAA)
    print(f"\nDetailed Example for n={n} (Binary: {print_binary(n, 32)})")
    print(f"  Lookup Table algorithm result: {count_set_bits_lookup_table(n)}")
```