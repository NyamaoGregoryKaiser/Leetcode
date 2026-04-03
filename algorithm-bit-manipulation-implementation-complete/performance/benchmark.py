```python
import timeit
import random
import math
from src.main_algorithms import BitManipulationProblems, MAX_INT_BITS

# --- Setup for count_set_bits benchmarking ---
def count_set_bits_iterative(n: int) -> int:
    count = 0
    while n > 0:
        if (n & 1) == 1:
            count += 1
        n >>= 1
    return count

def count_set_bits_kernighan(n: int) -> int:
    count = 0
    while n > 0:
        n &= (n - 1)
        count += 1
    return count

def count_set_bits_builtin(n: int) -> int:
    return bin(n).count('1')

# For lookup table, assuming a maximum byte value (0-255)
# This is usually precomputed once.
_LOOKUP_TABLE_8_BIT = [
    count_set_bits_kernighan(i) for i in range(256)
]

def count_set_bits_lookup_table(n: int) -> int:
    """
    Counts set bits using a precomputed lookup table for bytes.
    This assumes a fixed 32-bit integer for effective byte extraction.
    """
    count = 0
    # Python ints have arbitrary precision, so we simulate 32-bit.
    # We could extend for 64-bit, etc.
    for _ in range(MAX_INT_BITS // 8): # Iterate through each byte
        count += _LOOKUP_TABLE_8_BIT[n & 0xFF]
        n >>= 8
    return count


def benchmark_count_set_bits():
    print("\n--- Benchmarking: Count Set Bits (Hamming Weight) ---")
    
    # Generate test data
    TEST_SIZE = 100000
    # Random numbers up to 32 bits, typical interview scenario.
    test_numbers = [random.randint(0, (1 << MAX_INT_BITS) - 1) for _ in range(TEST_SIZE)]
    # Also include some numbers with few set bits and many set bits
    test_numbers.extend([1, 2, 4, 8, 1 << 30, (1 << 31) - 1, (1 << 10) - 1])

    print(f"Benchmarking {len(test_numbers)} numbers.")

    setup_code = """
from __main__ import count_set_bits_iterative, count_set_bits_kernighan, count_set_bits_builtin, count_set_bits_lookup_table, test_numbers
"""

    # Kernighan's Algorithm
    time_kernighan = timeit.timeit(
        "[count_set_bits_kernighan(n) for n in test_numbers]",
        setup=setup_code,
        number=1
    )
    print(f"Brian Kernighan's Algorithm: {time_kernighan:.6f} seconds")

    # Iterative Check
    time_iterative = timeit.timeit(
        "[count_set_bits_iterative(n) for n in test_numbers]",
        setup=setup_code,
        number=1
    )
    print(f"Iterative Right Shift:       {time_iterative:.6f} seconds")

    # Built-in Function
    time_builtin = timeit.timeit(
        "[count_set_bits_builtin(n) for n in test_numbers]",
        setup=setup_code,
        number=1
    )
    print(f"Built-in bin().count('1'):   {time_builtin:.6f} seconds")

    # Lookup Table (Note: less performant in pure Python than C implementations,
    # but theoretically faster for fixed-width in low-level languages)
    time_lookup = timeit.timeit(
        "[count_set_bits_lookup_table(n) for n in test_numbers]",
        setup=setup_code,
        number=1
    )
    print(f"Lookup Table (8-bit):        {time_lookup:.6f} seconds")


# --- Setup for is_power_of_two benchmarking ---
def is_power_of_two_bitwise(n: int) -> bool:
    return n > 0 and (n & (n - 1) == 0)

def is_power_of_two_log(n: int) -> bool:
    if n <= 0: return False
    # Use a small epsilon for floating point comparison
    return (math.log2(n) % 1) < 1e-9 # Smaller epsilon for more precision

def is_power_of_two_iterative_division(n: int) -> bool:
    if n <= 0: return False
    while n % 2 == 0:
        n //= 2
    return n == 1

def benchmark_is_power_of_two():
    print("\n--- Benchmarking: Is Power of Two ---")
    
    TEST_SIZE = 100000
    test_numbers = []
    for _ in range(TEST_SIZE // 2):
        # Powers of two
        test_numbers.append(1 << random.randint(0, 30))
        # Non-powers of two
        num = random.randint(1, (1 << 31) - 1)
        while is_power_of_two_bitwise(num):
            num = random.randint(1, (1 << 31) - 1)
        test_numbers.append(num)
    
    # Add edge cases
    test_numbers.extend([0, -1, 1, 2, 3, 1024, 1023])

    print(f"Benchmarking {len(test_numbers)} numbers.")

    setup_code = """
from __main__ import is_power_of_two_bitwise, is_power_of_two_log, is_power_of_two_iterative_division, test_numbers
import math # for log
"""

    # Bitwise
    time_bitwise = timeit.timeit(
        "[is_power_of_two_bitwise(n) for n in test_numbers]",
        setup=setup_code,
        number=1
    )
    print(f"Bitwise (n & (n-1) == 0): {time_bitwise:.6f} seconds")

    # Logarithm
    time_log = timeit.timeit(
        "[is_power_of_two_log(n) for n in test_numbers]",
        setup=setup_code,
        number=1
    )
    print(f"Logarithm (math.log2):    {time_log:.6f} seconds")

    # Iterative Division
    time_iterative_division = timeit.timeit(
        "[is_power_of_two_iterative_division(n) for n in test_numbers]",
        setup=setup_code,
        number=1
    )
    print(f"Iterative Division:         {time_iterative_division:.6f} seconds")


# --- Main benchmark runner ---
if __name__ == "__main__":
    benchmark_count_set_bits()
    benchmark_is_power_of_two()
    # Add benchmarks for other problems as needed
    print("\nBenchmarking complete.")

```