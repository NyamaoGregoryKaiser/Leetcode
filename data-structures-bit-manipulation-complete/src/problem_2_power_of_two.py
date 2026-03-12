```python
"""
Problem: Power of Two

Description:
Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.
An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.

Constraints:
* -2^31 <= n <= 2^31 - 1
"""

# Helper for visualization (from utils/helpers.py)
from utils.helpers import print_binary

# --- Approach 1: Iterative Division (Naive) ---

def is_power_of_two_naive(n: int) -> bool:
    """
    Checks if a given integer `n` is a power of two using iterative division.

    Algorithm:
    1. Handle edge cases:
       a. If `n` is less than or equal to 0, it cannot be a power of two. Return `false`.
       b. If `n` is 1, it is 2^0, so it's a power of two. Return `true`.
    2. While `n` is even (i.e., `n % 2 == 0`):
       a. Divide `n` by 2 (`n //= 2`).
    3. After the loop, if `n` has been reduced to 1, then the original number was a power of two.
       Otherwise, it was not.

    Example: n = 8
    Initial: n = 8
    Loop 1: 8 % 2 == 0. n = 8 // 2 = 4.
    Loop 2: 4 % 2 == 0. n = 4 // 2 = 2.
    Loop 3: 2 % 2 == 0. n = 2 // 2 = 1.
    Loop ends. n is 1. Return True.

    Example: n = 6
    Initial: n = 6
    Loop 1: 6 % 2 == 0. n = 6 // 2 = 3.
    Loop ends. n is 3 (not 1). Return False.

    Time Complexity: O(log N). In each step, `n` is divided by 2.
    Space Complexity: O(1).
    """
    if n <= 0:
        return False
    if n == 1: # 2^0
        return True

    while n % 2 == 0:
        n //= 2

    return n == 1

# --- Approach 2: Bitwise Operation (Optimal) ---

def is_power_of_two_optimal(n: int) -> bool:
    """
    Checks if a given integer `n` is a power of two using a clever bitwise trick.

    Algorithm:
    1. Handle edge cases:
       a. If `n` is less than or equal to 0, it cannot be a power of two. Return `false`.
    2. For any positive integer `n` that is a power of two, its binary representation
       will have exactly one '1' bit (e.g., 1 (0001), 2 (0010), 4 (0100), 8 (1000)).
    3. The number `n - 1` will have all bits to the right of this '1' bit set to '1',
       and the '1' bit itself will be '0'.
       Example: n = 8 (1000), n - 1 = 7 (0111)
       Example: n = 4 (0100), n - 1 = 3 (0011)
    4. Therefore, if `n` is a power of two, `n & (n - 1)` will always be 0.
       (The single '1' bit in `n` will align with a '0' in `n-1`, and all other bits are '0' in `n`).
    5. If `n` is not a power of two (and `n > 0`), it will have more than one '1' bit.
       In this case, `n & (n - 1)` will *not* be 0, as there will be at least one
       '1' bit remaining after clearing the rightmost '1' bit.
       Example: n = 6 (0110), n - 1 = 5 (0101)
       n & (n-1) = 0110 & 0101 = 0100 = 4 (not 0)

    Time Complexity: O(1). A constant number of bitwise operations.
    Space Complexity: O(1).
    """
    # A number n is a power of two if and only if it is positive and
    # has exactly one bit set in its binary representation.
    # The expression `n & (n - 1)` clears the least significant set bit.
    # If `n` has only one set bit, `n & (n - 1)` will result in 0.
    return n > 0 and (n & (n - 1)) == 0

# --- Main function for demonstration/selection ---
def solve_is_power_of_two(n: int, method: str = "optimal") -> bool:
    """
    Selects and runs a specific method to check if a number is a power of two.

    Args:
        n: The integer to check.
        method: The string identifier for the method ('naive', 'optimal').

    Returns:
        True if n is a power of two, False otherwise.

    Raises:
        ValueError: If an unknown method is specified.
    """
    if method == "naive":
        return is_power_of_two_naive(n)
    elif method == "optimal":
        return is_power_of_two_optimal(n)
    else:
        raise ValueError(f"Unknown method: {method}")

if __name__ == "__main__":
    test_numbers = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 32, 64, 128, 129, 256, 1024, 2047, 2048]

    print("--- Power of Two Problem ---")

    for num in test_numbers:
        binary_repr = print_binary(num, 32) if num >= 0 else "N/A" # print_binary expects positive
        print(f"\nNumber: {num} (Binary: {binary_repr if num >= 0 else 'Negative'})")
        print(f"  Naive (Iterative Division): {is_power_of_two_naive(num)}")
        print(f"  Optimal (Bitwise):          {is_power_of_two_optimal(num)}")

    print("\nDetailed Example: n = 8")
    n = 8
    print(f"  n = {n} (Binary: {print_binary(n, 32)})")
    print(f"  n - 1 = {n - 1} (Binary: {print_binary(n - 1, 32)})")
    print(f"  n & (n - 1) = {n & (n - 1)} (Expected: 0) -> {is_power_of_two_optimal(n)}")

    print("\nDetailed Example: n = 6")
    n = 6
    print(f"  n = {n} (Binary: {print_binary(n, 32)})")
    print(f"  n - 1 = {n - 1} (Binary: {print_binary(n - 1, 32)})")
    print(f"  n & (n - 1) = {n & (n - 1)} (Expected: Not 0) -> {is_power_of_two_optimal(n)}")
```