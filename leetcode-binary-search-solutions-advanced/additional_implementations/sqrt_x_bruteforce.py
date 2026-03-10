"""
Brute Force Solution: Sqrt(x) using Linear Scan

This file provides a brute-force implementation for computing the integer square root of x.
It iterates through possible values and checks their squares.

Constraints are the same as `main_algorithms/sqrt_x.py`.
"""

def my_sqrt_bruteforce(x: int) -> int:
    """
    Computes the integer square root of a non-negative integer `x` using a linear scan.
    It checks numbers from 0 upwards until its square exceeds `x`.

    Args:
        x (int): The non-negative integer for which to compute the square root.

    Returns:
        int: The integer part of the square root of `x`.

    Time Complexity: O(sqrt(X))
        In the worst case, the loop iterates `sqrt(X)` times until `i*i` exceeds `x`.
        For example, for x = 100, it iterates 10 times.

    Space Complexity: O(1)
        The algorithm uses a constant amount of extra space for the loop variable `i`.
    """
    if x < 2:
        return x # Handles x=0 and x=1

    i = 1
    while True:
        # Check `i*i <= x` to find the largest i whose square is less than or equal to x.
        # Alternatively, `i > x // i` to avoid overflow if i*i is too large.
        # For Python, `i*i` is fine as integers handle arbitrary size.
        if i * i > x:
            return i - 1 # (i-1) was the last number whose square was <= x
        i += 1

# Example usage (for testing purposes)
if __name__ == "__main__":
    test_cases = [
        (0, 0),
        (1, 1),
        (4, 2),
        (8, 2),
        (9, 3),
        (10, 3),
        (24, 4),
        (25, 5),
        (2147395600, 46340), # 46340 * 46340 = 2147395600
        (2147483647, 46340), # Max int value (2^31 - 1)
    ]

    for x, expected in test_cases:
        result = my_sqrt_bruteforce(x)
        print(f"Input: {x}, Expected: {expected}, Got: {result}")
        assert result == expected, f"Failed for x={x}. Expected {expected}, got {result}"
    print("All test cases passed for Sqrt(x) brute force!")