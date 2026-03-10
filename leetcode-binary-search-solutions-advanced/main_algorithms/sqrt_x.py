"""
Problem: Sqrt(x)

Implement `int sqrt(int x)`.

Compute and return the square root of `x`.

Since the return type is an integer, the decimal digits are truncated,
and only the integer part of the result is returned.

You are not allowed to use any built-in exponent function or operator,
such as `pow(x, 0.5)` or `x ** 0.5`.

Example 1:
Input: x = 4
Output: 2

Example 2:
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned.

Constraints:
0 <= x <= 2^31 - 1
"""

def my_sqrt(x: int) -> int:
    """
    Computes the integer square root of a non-negative integer `x` using binary search.

    The problem asks for `floor(sqrt(x))`. We can use binary search to find a number `k`
    such that `k*k <= x` and `(k+1)*(k+1) > x`.

    The search space for `k` is typically from 0 up to `x`. However, if `x` is large,
    `x/2` is a tighter upper bound for `sqrt(x)` when `x > 1`.
    For example, `sqrt(4) = 2`, max search could be 2.
    For `x = 0` or `x = 1`, the result is `x` itself.

    Args:
        x (int): The non-negative integer for which to compute the square root.

    Returns:
        int: The integer part of the square root of `x`.

    Time Complexity: O(log X)
        The search space for the square root is from 0 to x (or a tighter bound like x/2).
        In each step, the search space is halved. Therefore, the number of operations
        is logarithmic with respect to x.

    Space Complexity: O(1)
        The algorithm uses a constant amount of extra space for `left`, `right`, `mid`, and `ans` variables.
    """
    if x < 2:
        return x # Handles x=0 and x=1

    left, right = 1, x // 2 # A more optimal upper bound than 'x' for x > 1

    ans = 0 # Store the potential answer (floor(sqrt(x)))

    while left <= right:
        mid = left + (right - left) // 2

        # Use `mid * mid` for comparison. Be careful about potential overflow if `mid` is very large
        # For x up to 2^31 - 1, `mid` can go up to `x // 2`, which is approx 2^30.
        # `mid * mid` could be `(2^30)^2 = 2^60`, which fits in a standard 64-bit integer
        # but might exceed Python's default integer size in some contexts (though Python handles large ints automatically).
        # A safer check for potential overflow is `mid > x / mid`, but `mid * mid` is fine in Python.
        square = mid * mid

        if square == x:
            return mid
        elif square < x:
            # `mid` could be the answer, but try a larger value in the right half
            ans = mid
            left = mid + 1
        else: # square > x
            # `mid` is too large, search in the left half
            right = mid - 1

    return ans

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
        (2147395599, 46340), # Largest number for which sqrt is integer 46340*46340 = 2147395600
        (2147483647, 46340), # Max int value (2^31 - 1)
    ]

    for x, expected in test_cases:
        result = my_sqrt(x)
        print(f"Input: {x}, Expected: {expected}, Got: {result}")
        assert result == expected, f"Failed for x={x}. Expected {expected}, got {result}"
    print("All test cases passed for Sqrt(x)!")