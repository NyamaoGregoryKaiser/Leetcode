"""
Problem 01: Prime Factorization

Given a positive integer `n`, find all of its prime factors.
A prime factor is a prime number that divides `n` evenly.

Examples:
- prime_factors(12) == [2, 2, 3]
- prime_factors(7) == [7]
- prime_factors(1) == []
- prime_factors(100) == [2, 2, 5, 5]
"""

import math

def get_prime_factors_brute_force(n: int) -> list[int]:
    """
    Approach 1: Brute-force Trial Division
    Iterates through all possible divisors from 2 up to n.

    Algorithm:
    1. Initialize an empty list `factors`.
    2. Start with `i = 2`.
    3. While `i <= n`:
        a. If `n` is divisible by `i`:
            i. Add `i` to `factors`.
            ii. Divide `n` by `i` (integer division). This is crucial to find repeated factors.
        b. Else (if `n` is not divisible by `i`):
            i. Increment `i`.
    4. Return `factors`.

    Time Complexity: O(n) in the worst case (e.g., for a prime number `n`),
                     but significantly faster for numbers with small prime factors.
                     More precisely, if `n` has `k` prime factors (counting multiplicity)
                     and the largest factor is `p_max`, then it's roughly O(p_max).
                     For example, for `n = 2^k`, it's O(k). For `n = p` (prime), it's O(p).
    Space Complexity: O(log n) in the worst case, as the number of prime factors of `n`
                      is at most `log2(n)` (e.g., for `n = 2^k`, k factors).
    """
    if n <= 1:
        return []

    factors = []
    i = 2
    while i <= n:
        if n % i == 0:
            factors.append(i)
            n //= i  # Reduce n by the factor found
        else:
            i += 1
    return factors

def get_prime_factors_optimized(n: int) -> list[int]:
    """
    Approach 2: Optimized Trial Division
    This approach optimizes the brute-force method by:
    1. Handling factor 2 separately.
    2. Only checking odd divisors from 3 up to `sqrt(n)`.
    3. If `n` is still greater than 1 after the loop, it means the remaining `n` is a prime factor itself.

    Algorithm:
    1. Initialize an empty list `factors`.
    2. Handle factors of 2:
        a. While `n` is divisible by 2:
            i. Add 2 to `factors`.
            ii. Divide `n` by 2.
    3. Handle odd factors:
        a. Start with `i = 3`.
        b. While `i * i <= n`: (This is the key optimization, we only need to check up to sqrt(n))
            i. If `n` is divisible by `i`:
                1. Add `i` to `factors`.
                2. Divide `n` by `i`.
            ii. Else:
                1. Increment `i` by 2 (to check only odd numbers).
    4. If after the loop, `n > 1`:
        a. This means the remaining `n` is a prime number itself (and larger than sqrt(original_n)).
        b. Add `n` to `factors`.
    5. Return `factors`.

    Time Complexity: O(sqrt(n)). This is a significant improvement over O(n) for large `n`.
                     For example, if `n` is a large prime, we check up to `sqrt(n)`.
    Space Complexity: O(log n) (same as brute force, for storing factors).
    """
    if n <= 1:
        return []

    factors = []

    # Handle factor 2
    while n % 2 == 0:
        factors.append(2)
        n //= 2

    # Handle odd factors
    # We only need to check divisors up to sqrt(n).
    # If a number n has a factor greater than sqrt(n), it must also have a factor smaller than sqrt(n).
    # We've already divided out all smaller factors, so if n remains > 1 after checking up to sqrt(n),
    # it means the remaining n is a prime factor itself.
    i = 3
    while i * i <= n: # Or while i <= int(math.sqrt(n))
        while n % i == 0:
            factors.append(i)
            n //= i
        i += 2 # Increment by 2 to check only odd numbers

    # If n is still greater than 1, it must be a prime factor itself
    # (e.g., for n=7, after checking i=3 (3*3 > 7), n is still 7)
    if n > 1:
        factors.append(n)

    return factors

# --- Interview Tips & Variations ---
# 1. Discuss the trade-offs: Simplicity vs. Performance.
# 2. Ask about input constraints: Range of `n`, negative numbers, zero, large numbers.
#    - For very large numbers (e.g., 10^18 or larger), trial division up to sqrt(n) becomes too slow.
#      More advanced algorithms like Pollard's rho or Miller-Rabin (for primality testing)
#      and Pollard's rho/p-1 for factorization would be needed. This is usually beyond
#      typical interview scope unless specified.
# 3. What if the interviewer asks for unique prime factors? Adapt the solution by
#    using a set or filtering duplicates.
# 4. What if the interviewer asks for the count of each prime factor? Return a dictionary or list of tuples.
#    e.g., for 12, {2: 2, 3: 1} or [(2, 2), (3, 1)]
#    To achieve this, in the `while n % i == 0:` loop, instead of appending `i` to `factors`,
#    you'd increment a counter for `i` in a dictionary.

def get_prime_factors_with_counts_optimized(n: int) -> dict[int, int]:
    """
    Variation: Optimized Trial Division returning prime factors with their counts.
    Returns a dictionary where keys are prime factors and values are their counts.

    Example: get_prime_factors_with_counts_optimized(12) == {2: 2, 3: 1}
    """
    if n <= 1:
        return {}

    factors_with_counts = {}

    # Handle factor 2
    while n % 2 == 0:
        factors_with_counts[2] = factors_with_counts.get(2, 0) + 1
        n //= 2

    # Handle odd factors
    i = 3
    while i * i <= n:
        while n % i == 0:
            factors_with_counts[i] = factors_with_counts.get(i, 0) + 1
            n //= i
        i += 2

    # If n is still greater than 1, it's a remaining prime factor
    if n > 1:
        factors_with_counts[n] = factors_with_counts.get(n, 0) + 1

    return factors_with_counts

# Helper to format the output for simple list of factors
# (Used mostly for testing and demonstration consistency)
def get_prime_factors(n: int) -> list[int]:
    """
    Wrapper function to use the optimized approach by default.
    """
    return get_prime_factors_optimized(n)

# Example usage:
if __name__ == "__main__":
    print(f"Prime factors of 12 (brute-force): {get_prime_factors_brute_force(12)}") # Expected: [2, 2, 3]
    print(f"Prime factors of 12 (optimized): {get_prime_factors_optimized(12)}")     # Expected: [2, 2, 3]
    print(f"Prime factors of 7 (optimized): {get_prime_factors_optimized(7)}")       # Expected: [7]
    print(f"Prime factors of 1 (optimized): {get_prime_factors_optimized(1)}")       # Expected: []
    print(f"Prime factors of 100 (optimized): {get_prime_factors_optimized(100)}")   # Expected: [2, 2, 5, 5]
    print(f"Prime factors of 999999999 (optimized): {get_prime_factors_optimized(999999999)}") # Expected: [3, 3, 3, 7, 11, 13, 37]
    print(f"Prime factors of 999999999 (with counts): {get_prime_factors_with_counts_optimized(999999999)}") # Expected: {3: 3, 7: 1, 11: 1, 13: 1, 37: 1}
    print(f"Prime factors of 2 (optimized): {get_prime_factors_optimized(2)}") # Expected: [2]
    print(f"Prime factors of 4 (optimized): {get_prime_factors_optimized(4)}") # Expected: [2, 2]
    print(f"Prime factors of 13 (optimized): {get_prime_factors_optimized(13)}") # Expected: [13]