"""
Problem 04: Power Function (x^n)

Implement `pow(x, n)`, which calculates `x` raised to the power `n`.
`n` can be a negative integer, zero, or a positive integer.
`x` can be a floating-point number.

Constraints:
-100.0 < x < 100.0
-2^31 <= n <= 2^31 - 1
-10^9 <= x^n <= 10^9 (The result should fit within standard float range,
                      though large numbers can exceed this. We'll return float).

Examples:
- pow(2.0, 10) == 1024.0
- pow(2.1, 3) == 9.261
- pow(2.0, -2) == 0.25 (1/4)
- pow(0.0, 5) == 0.0
- pow(5.0, 0) == 1.0
- pow(-2.0, 3) == -8.0
- pow(-2.0, 2) == 4.0
"""

def power_naive(x: float, n: int) -> float:
    """
    Approach 1: Naive Iteration (Brute Force)
    Repeatedly multiply `x` `n` times. Handles negative `n` by inverting the result.

    Algorithm:
    1. Handle base cases:
        a. If `n` is 0, return 1.0.
        b. If `x` is 0:
           i. If `n` is 0, it's undefined (0^0), usually treated as 1.0 (consistent with `n=0` rule).
           ii. If `n` is positive, return 0.0.
           iii. If `n` is negative, it's division by zero (1/0), usually treated as `inf` or `ZeroDivisionError`.
                For this problem, assume valid inputs where this is not expected, or return `inf`.
                For simplicity, we'll return `0.0` if `x=0, n>0`, and `inf` if `x=0, n<0`.
    2. Initialize `result = 1.0`.
    3. Determine if `n` is negative. If so, convert `n` to its positive equivalent and set a flag.
    4. Loop `abs(n)` times:
        a. `result *= x`.
    5. If original `n` was negative, return `1.0 / result`. Else, return `result`.

    Time Complexity: O(n) (or O(|n|)). We perform `n` multiplications.
    Space Complexity: O(1).
    """
    if n == 0:
        return 1.0
    
    if x == 0.0:
        if n > 0: return 0.0
        # For n < 0 and x = 0.0, it's division by zero, which is typically handled by float 'inf'.
        # Python's `0.0 ** -k` naturally gives `inf`.
        return float('inf') 

    is_negative_power = False
    if n < 0:
        is_negative_power = True
        n = -n # Work with positive power for multiplication

    result = 1.0
    for _ in range(n):
        result *= x

    if is_negative_power:
        return 1.0 / result
    return result

def power_binary_exponentiation_recursive(x: float, n: int) -> float:
    """
    Approach 2: Binary Exponentiation (Exponentiation by Squaring) - Recursive
    This method significantly reduces the number of multiplications, especially for large `n`.
    It uses the properties:
    - x^n = (x^(n/2))^2 if n is even
    - x^n = x * (x^((n-1)/2))^2 if n is odd

    Algorithm:
    1. Handle base cases:
        a. If `n` is 0, return 1.0.
        b. If `x` is 0:
           i. If `n` is positive, return 0.0.
           ii. If `n` is negative, return `inf`.
    2. Handle negative `n`: If `n` is negative, convert `x` to `1/x` and `n` to `-n`.
    3. Recursive step:
        a. Calculate `half_power = power_binary_exponentiation_recursive(x, n // 2)`.
        b. If `n` is even, return `half_power * half_power`.
        c. If `n` is odd, return `x * half_power * half_power`.

    Time Complexity: O(log n) (or O(log |n|)). Each recursive call halves `n`.
    Space Complexity: O(log n) due to the recursion stack depth.
    """
    if n == 0:
        return 1.0
    
    if x == 0.0:
        if n > 0: return 0.0
        return float('inf')

    # Handle negative exponent: x^n = (1/x)^(-n)
    if n < 0:
        x = 1 / x
        n = -n

    # Recursive step
    half_power = power_binary_exponentiation_recursive(x, n // 2)

    if n % 2 == 0: # n is even
        return half_power * half_power
    else: # n is odd
        return x * half_power * half_power

def power_binary_exponentiation_iterative(x: float, n: int) -> float:
    """
    Approach 3: Binary Exponentiation (Exponentiation by Squaring) - Iterative
    An iterative implementation of binary exponentiation, avoiding recursion stack overhead.

    Algorithm:
    1. Handle base cases (same as recursive version).
    2. Initialize `result = 1.0`.
    3. Handle negative `n`: If `n` is negative, convert `x` to `1/x` and `n` to `-n`.
    4. While `n > 0`:
        a. If `n` is odd (i.e., `n % 2 == 1` or `n & 1`):
            i. `result *= x` (This accounts for the `x` in `x * (x^((n-1)/2))^2` for odd `n`).
        b. `x *= x` (Square `x` for the next iteration, effectively `x` becomes `x^2`, then `x^4`, etc.)
        c. `n //= 2` (Halve `n`).
    5. Return `result`.

    Time Complexity: O(log n) (or O(log |n|)). Same as recursive, but without recursion overhead.
    Space Complexity: O(1). More memory-efficient than the recursive version.
    """
    if n == 0:
        return 1.0
    
    if x == 0.0:
        if n > 0: return 0.0
        return float('inf')

    result = 1.0

    # Handle negative exponent: x^n = (1/x)^(-n)
    if n < 0:
        x = 1 / x
        n = -n

    while n > 0:
        if n % 2 == 1: # If n is odd
            result *= x
        x *= x # Square x
        n //= 2 # Halve n

    return result

# Helper to choose the default approach for general use (e.g. for tests)
def my_pow(x: float, n: int) -> float:
    """
    Wrapper function to use the most efficient and memory-friendly approach by default.
    """
    return power_binary_exponentiation_iterative(x, n)

# --- Interview Tips & Variations ---
# 1. Edge Cases: Thoroughly discuss `n=0`, `x=0`, `n<0` (negative power), `x=1` or `x=-1`.
#    - `0^0`: Mathematically ambiguous, often 1 in programming contexts. Follow problem spec.
#    - `0^negative`: Division by zero, results in `inf` for floats.
#    - `1^n = 1`
#    - `(-1)^n`: Alternates between 1 and -1.
# 2. Integer vs. Float: Problem states `x` is float, result is float. If `x` was integer,
#    result might be integer, but `1/x` for negative `n` necessitates float.
# 3. Large results: Python's `float` type has limitations. Very large positive or small
#    negative exponents can lead to `inf` or `0.0` due to precision limits.
#    The problem statement usually implies results fit or expects `inf`/`0.0`.
# 4. Modulo: If asked `(x^n) % M`, the binary exponentiation technique is crucial.
#    All intermediate multiplications `result *= x` and `x *= x` must be performed modulo M.
#    This is particularly common for integer exponents.

if __name__ == "__main__":
    print("--- Naive Iteration ---")
    print(f"power_naive(2.0, 10): {power_naive(2.0, 10)}")     # Expected: 1024.0
    print(f"power_naive(2.1, 3): {power_naive(2.1, 3)}")       # Expected: 9.261
    print(f"power_naive(2.0, -2): {power_naive(2.0, -2)}")     # Expected: 0.25
    print(f"power_naive(0.0, 5): {power_naive(0.0, 5)}")       # Expected: 0.0
    print(f"power_naive(5.0, 0): {power_naive(5.0, 0)}")       # Expected: 1.0
    print(f"power_naive(-2.0, 3): {power_naive(-2.0, 3)}")     # Expected: -8.0
    print(f"power_naive(-2.0, 2): {power_naive(-2.0, 2)}")     # Expected: 4.0
    print(f"power_naive(0.0, -5): {power_naive(0.0, -5)}")     # Expected: inf

    print("\n--- Binary Exponentiation (Recursive) ---")
    print(f"power_binary_exponentiation_recursive(2.0, 10): {power_binary_exponentiation_recursive(2.0, 10)}")
    print(f"power_binary_exponentiation_recursive(2.1, 3): {power_binary_exponentiation_recursive(2.1, 3)}")
    print(f"power_binary_exponentiation_recursive(2.0, -2): {power_binary_exponentiation_recursive(2.0, -2)}")
    print(f"power_binary_exponentiation_recursive(0.0, 5): {power_binary_exponentiation_recursive(0.0, 5)}")
    print(f"power_binary_exponentiation_recursive(5.0, 0): {power_binary_exponentiation_recursive(5.0, 0)}")
    print(f"power_binary_exponentiation_recursive(-2.0, 3): {power_binary_exponentiation_recursive(-2.0, 3)}")
    print(f"power_binary_exponentiation_recursive(-2.0, 2): {power_binary_exponentiation_recursive(-2.0, 2)}")
    print(f"power_binary_exponentiation_recursive(0.0, -5): {power_binary_exponentiation_recursive(0.0, -5)}")
    print(f"power_binary_exponentiation_recursive(1.00000, 2147483647): {power_binary_exponentiation_recursive(1.00000, 2147483647)}") # 1.0

    print("\n--- Binary Exponentiation (Iterative) ---")
    print(f"power_binary_exponentiation_iterative(2.0, 10): {power_binary_exponentiation_iterative(2.0, 10)}")
    print(f"power_binary_exponentiation_iterative(2.1, 3): {power_binary_exponentiation_iterative(2.1, 3)}")
    print(f"power_binary_exponentiation_iterative(2.0, -2): {power_binary_exponentiation_iterative(2.0, -2)}")
    print(f"power_binary_exponentiation_iterative(0.0, 5): {power_binary_exponentiation_iterative(0.0, 5)}")
    print(f"power_binary_exponentiation_iterative(5.0, 0): {power_binary_exponentiation_iterative(5.0, 0)}")
    print(f"power_binary_exponentiation_iterative(-2.0, 3): {power_binary_exponentiation_iterative(-2.0, 3)}")
    print(f"power_binary_exponentiation_iterative(-2.0, 2): {power_binary_exponentiation_iterative(-2.0, 2)}")
    print(f"power_binary_exponentiation_iterative(0.0, -5): {power_binary_exponentiation_iterative(0.0, -5)}")
    print(f"power_binary_exponentiation_iterative(1.00000, 2147483647): {power_binary_exponentiation_iterative(1.00000, 2147483647)}") # 1.0
    # Test maximum negative N
    print(f"power_binary_exponentiation_iterative(2.0, -2147483648): {power_binary_exponentiation_iterative(2.0, -2147483648)}") # Very small positive number close to 0
    # Test small base, large exponent
    print(f"power_binary_exponentiation_iterative(0.00001, 10): {power_binary_exponentiation_iterative(0.00001, 10)}") # Should be very small
    print(f"power_binary_exponentiation_iterative(100.0, 5): {power_binary_exponentiation_iterative(100.0, 5)}") # 10^10
    print(f"power_binary_exponentiation_iterative(100.0, -5): {power_binary_exponentiation_iterative(100.0, -5)}") # 10^-10