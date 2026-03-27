"""
Problem 03: Greatest Common Divisor (GCD) and Least Common Multiple (LCM)

Implement functions to calculate:
1.  Greatest Common Divisor (GCD) of two non-negative integers `a` and `b`.
    The GCD is the largest positive integer that divides both `a` and `b` without leaving a remainder.
    GCD(0, x) = x, GCD(x, 0) = x. GCD(0, 0) is usually undefined or 0. Here, we'll define it as 0.

2.  Least Common Multiple (LCM) of two non-negative integers `a` and `b`.
    The LCM is the smallest positive integer that is divisible by both `a` and `b`.
    LCM(a, b) = (a * b) / GCD(a, b). For LCM(0, x) = 0.

Examples:
- gcd(48, 18) == 6
- gcd(17, 5) == 1
- gcd(0, 5) == 5
- gcd(0, 0) == 0

- lcm(4, 6) == 12
- lcm(2, 7) == 14
- lcm(0, 5) == 0
"""

def gcd_brute_force(a: int, b: int) -> int:
    """
    Approach 1: Brute-force GCD
    Iterates from min(a, b) down to 1, checking divisibility.

    Algorithm:
    1. Handle edge cases:
        a. If `a` is 0, GCD is `b`.
        b. If `b` is 0, GCD is `a`.
        c. If both are 0, return 0.
    2. Find the minimum of `a` and `b`.
    3. Iterate `i` from `min_val` down to 1:
        a. If both `a` and `b` are divisible by `i`, then `i` is the GCD. Return `i`.

    Time Complexity: O(min(a, b)). In the worst case (e.g., `gcd(100, 1)`), it iterates
                     `min(a, b)` times.
    Space Complexity: O(1).
    """
    if a < 0 or b < 0:
        raise ValueError("Inputs must be non-negative integers.")
    if a == 0 and b == 0:
        return 0 # Or raise error, depends on definition. Usually 0.
    if a == 0:
        return b
    if b == 0:
        return a

    for i in range(min(a, b), 0, -1):
        if a % i == 0 and b % i == 0:
            return i
    return 1 # Should not be reached for a, b > 0.

def gcd_euclidean_recursive(a: int, b: int) -> int:
    """
    Approach 2: Euclidean Algorithm (Recursive)
    Based on the principle that GCD(a, b) = GCD(b, a % b).
    The base case is when `b` becomes 0, then `a` is the GCD.

    Algorithm:
    1. Handle negative inputs (convert to positive, as GCD is for positive integers).
    2. Base case: If `b` is 0, return `a`.
    3. Recursive step: Return `gcd_euclidean_recursive(b, a % b)`.

    Time Complexity: O(log(min(a, b))). This is much faster than the brute-force method.
                     The number of steps is proportional to the logarithm of the smaller number.
                     (Lame's theorem states it's at most 5 * (number of digits of b)).
    Space Complexity: O(log(min(a, b))) due to the recursion stack depth.
    """
    if a < 0 or b < 0:
        raise ValueError("Inputs must be non-negative integers.")
    if a == 0 and b == 0:
        return 0 # Special case for GCD(0,0)

    # The property GCD(a, 0) = a (and GCD(0, b) = b) makes the base case robust.
    if b == 0:
        return a
    return gcd_euclidean_recursive(b, a % b)

def gcd_euclidean_iterative(a: int, b: int) -> int:
    """
    Approach 3: Euclidean Algorithm (Iterative)
    An iterative implementation of the Euclidean algorithm, avoiding recursion stack.

    Algorithm:
    1. Handle negative inputs (convert to positive).
    2. Handle `a=0, b=0` case.
    3. While `b` is not 0:
        a. Store `b` in a temporary variable.
        b. Update `b` to `a % b`.
        c. Update `a` to the stored `temp_b`.
    4. Return `a`.

    Time Complexity: O(log(min(a, b))), same as the recursive version.
    Space Complexity: O(1). This is more memory-efficient than the recursive version.
    """
    if a < 0 or b < 0:
        raise ValueError("Inputs must be non-negative integers.")
    if a == 0 and b == 0:
        return 0

    while b != 0:
        a, b = b, a % b
    return a

def lcm_from_gcd(a: int, b: int, gcd_func=gcd_euclidean_iterative) -> int:
    """
    Calculates the Least Common Multiple (LCM) using the formula:
    LCM(a, b) = |a * b| / GCD(a, b)

    Algorithm:
    1. Handle edge cases: If `a` or `b` is 0, LCM is 0.
    2. Calculate GCD of `a` and `b` using the provided `gcd_func`.
    3. If GCD is 0 (implies both a and b were 0), return 0.
    4. Return `abs(a * b) // gcd_val`. Using `//` for integer division.
       `abs()` is used to ensure positive LCM, even if inputs were negative (though problem specifies non-negative).

    Time Complexity: Dominated by the GCD calculation, so O(log(min(a, b))).
    Space Complexity: O(1).
    """
    if a < 0 or b < 0:
        raise ValueError("Inputs must be non-negative integers.")
    if a == 0 or b == 0:
        return 0

    # To prevent potential overflow for very large a*b before division,
    # it's safer to do (a // gcd_val) * b or a * (b // gcd_val).
    # Python integers handle arbitrary size, so it's less critical here.
    # Using abs() to ensure positive LCM for problem constraints (non-negative a, b)
    # and consistency if problem definition allows negative.
    gcd_val = gcd_func(a, b)
    return abs(a * b) // gcd_val

# Helper to choose the default approach for general use (e.g. for tests)
def get_gcd(a: int, b: int) -> int:
    """
    Wrapper function to use the most efficient and common GCD approach by default.
    """
    return gcd_euclidean_iterative(a, b)

def get_lcm(a: int, b: int) -> int:
    """
    Wrapper function to use the standard LCM approach by default.
    """
    return lcm_from_gcd(a, b)

# --- Interview Tips & Variations ---
# 1. Negative Numbers: Clarify handling of negative inputs. Common is to take absolute values or raise error.
#    GCD is usually defined for non-negative integers.
# 2. GCD(0, 0): Most math contexts define GCD(0, 0) as 0, as it's the only number divisible by 0.
#    Some define it as undefined or infinity. Clarify with interviewer. Our solution returns 0.
# 3. LCM(0, X): LCM(0, X) is typically 0, as 0 is the only multiple of 0. Our solution handles this.
# 4. Extended Euclidean Algorithm: If asked to find `x` and `y` such that `ax + by = GCD(a, b)`.
#    This is a common extension, often solved recursively.
# 5. GCD/LCM of multiple numbers:
#    - GCD(a, b, c) = GCD(GCD(a, b), c)
#    - LCM(a, b, c) = LCM(LCM(a, b), c)
#    These can be solved by applying the pairwise function iteratively.

if __name__ == "__main__":
    print("--- GCD ---")
    print(f"GCD(48, 18) brute-force: {gcd_brute_force(48, 18)}") # Expected: 6
    print(f"GCD(48, 18) recursive Euclidean: {gcd_euclidean_recursive(48, 18)}") # Expected: 6
    print(f"GCD(48, 18) iterative Euclidean: {gcd_euclidean_iterative(48, 18)}") # Expected: 6
    print(f"GCD(17, 5) iterative Euclidean: {gcd_euclidean_iterative(17, 5)}")   # Expected: 1
    print(f"GCD(0, 5) iterative Euclidean: {gcd_euclidean_iterative(0, 5)}")     # Expected: 5
    print(f"GCD(5, 0) iterative Euclidean: {gcd_euclidean_iterative(5, 0)}")     # Expected: 5
    print(f"GCD(0, 0) iterative Euclidean: {gcd_euclidean_iterative(0, 0)}")     # Expected: 0
    print(f"GCD(100, 1) iterative Euclidean: {gcd_euclidean_iterative(100, 1)}") # Expected: 1
    print(f"GCD(27, 81) iterative Euclidean: {gcd_euclidean_iterative(27, 81)}") # Expected: 27

    print("\n--- LCM ---")
    print(f"LCM(4, 6): {lcm_from_gcd(4, 6)}")     # Expected: 12
    print(f"LCM(2, 7): {lcm_from_gcd(2, 7)}")     # Expected: 14
    print(f"LCM(0, 5): {lcm_from_gcd(0, 5)}")     # Expected: 0
    print(f"LCM(5, 0): {lcm_from_gcd(5, 0)}")     # Expected: 0
    print(f"LCM(1, 100): {lcm_from_gcd(1, 100)}") # Expected: 100
    print(f"LCM(12, 18): {lcm_from_gcd(12, 18)}") # Expected: 36
    print(f"LCM(0, 0): {lcm_from_gcd(0, 0)}")     # Expected: 0
    # Example using brute-force GCD for LCM (demonstrates flexibility)
    print(f"LCM(4, 6) with brute-force GCD: {lcm_from_gcd(4, 6, gcd_func=gcd_brute_force)}")