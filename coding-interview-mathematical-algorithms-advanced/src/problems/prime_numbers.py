import math

class PrimeNumbers:
    """
    Class containing various implementations for primality testing
    and generating prime numbers.
    """

    @staticmethod
    def is_prime_trial_division(n: int) -> bool:
        """
        Checks if a number `n` is prime using trial division.

        This method attempts to divide `n` by all integers from 2 up to sqrt(n).
        If any division results in a zero remainder, `n` is not prime.

        Time Complexity: O(sqrt(n))
            - In the worst case, we check divisions up to the square root of n.
        Space Complexity: O(1)
            - A constant amount of extra space is used.

        Args:
            n (int): The integer to check for primality.

        Returns:
            bool: True if n is prime, False otherwise.
        """
        if not isinstance(n, int):
            raise TypeError("Input must be an integer.")
        if n <= 1:
            return False  # Numbers less than or equal to 1 are not prime.
        if n <= 3:
            return True   # 2 and 3 are prime.
        if n % 2 == 0 or n % 3 == 0:
            return False  # Multiples of 2 or 3 are not prime.

        # Check for divisors from 5 onwards. All primes greater than 3 can be
        # expressed in the form 6k ± 1.
        i = 5
        while i * i <= n:
            if n % i == 0 or n % (i + 2) == 0:
                return False
            i += 6
        return True

    @staticmethod
    def sieve_of_eratosthenes(limit: int) -> list[int]:
        """
        Generates all prime numbers up to a given `limit` using the Sieve of Eratosthenes algorithm.

        The algorithm works by iteratively marking as composite (i.e., not prime)
        the multiples of each prime, starting with the first prime number, 2.
        All unmarked numbers remaining up to the limit are prime.

        Time Complexity: O(n log log n)
            - The sum of (n/p) for all primes p up to n. This is a very efficient
              algorithm for generating a list of primes.
        Space Complexity: O(n)
            - To store the boolean array (or list) indicating primality for each number up to n.

        Args:
            limit (int): The upper bound (inclusive) for finding prime numbers.

        Returns:
            list[int]: A list of prime numbers up to `limit`.
        """
        if not isinstance(limit, int):
            raise TypeError("Input limit must be an integer.")
        if limit < 0:
            raise ValueError("Input limit must be a non-negative integer.")
        if limit < 2:
            return []

        # Create a boolean array "is_prime[0..limit]" and initialize
        # all entries it as true. A value in is_prime[i] will
        # finally be false if i is not a prime, else true.
        is_prime = [True] * (limit + 1)
        is_prime[0] = is_prime[1] = False # 0 and 1 are not prime numbers

        p = 2
        while p * p <= limit:
            # If is_prime[p] is still true, then it is a prime
            if is_prime[p]:
                # Update all multiples of p
                # Starting from p*p because smaller multiples (p*2, p*3, ...)
                # would have already been marked by smaller primes.
                # E.g., 2*3=6 would be marked by 2, no need for 3 to mark it again.
                for multiple in range(p * p, limit + 1, p):
                    is_prime[multiple] = False
            p += 1

        # Collect all prime numbers
        primes = [num for num, prime_status in enumerate(is_prime) if prime_status]
        return primes

    @staticmethod
    def sieve_of_eratosthenes_optimized_space(limit: int) -> list[int]:
        """
        Generates prime numbers up to a limit using an optimized Sieve of Eratosthenes
        that only stores odd numbers.

        This optimization reduces the space required by half, as it doesn't store
        information for even numbers (except 2), which are known not to be prime.

        Time Complexity: O(n log log n)
            - Similar to the standard sieve, still very efficient.
        Space Complexity: O(n/2) = O(n)
            - Roughly half the space of the standard sieve, but still linear.

        Args:
            limit (int): The upper bound (inclusive) for finding prime numbers.

        Returns:
            list[int]: A list of prime numbers up to `limit`.
        """
        if not isinstance(limit, int):
            raise TypeError("Input limit must be an integer.")
        if limit < 0:
            raise ValueError("Input limit must be a non-negative integer.")
        if limit < 2:
            return []
        if limit == 2:
            return [2]

        # `is_prime_odd` will store primality status for odd numbers only.
        # Index `i` corresponds to the odd number `2*i + 1`.
        # Example: is_prime_odd[0] -> 1, is_prime_odd[1] -> 3, is_prime_odd[2] -> 5
        # The length of this array is `(limit + 1) // 2`.
        # For limit=10, len is 5 (for 1,3,5,7,9).
        size_odd = (limit + 1) // 2
        is_prime_odd = [True] * size_odd

        # 1 is not prime, which corresponds to index 0 if we map (2i+1) to i.
        # But we don't strictly care about `1` directly in this optimized sieve
        # as it starts marking from 3. If 1 should be explicitly non-prime,
        # it's usually handled by `if n <= 1: return False` in `is_prime` or
        # by simply not adding it to the `primes` list.
        # For our mapping 2*idx+1, idx=0 corresponds to 1.
        if size_odd > 0:
            is_prime_odd[0] = False # Marking 1 as not prime (optional based on exact interpretation)

        # Start from p = 3 (index 1 in is_prime_odd)
        p_val = 3
        while p_val * p_val <= limit:
            p_idx = (p_val - 1) // 2 # Current prime's index in is_prime_odd

            if is_prime_odd[p_idx]:
                # Mark multiples of p_val.
                # Multiples of p_val: p_val * p_val, p_val * (p_val + 2), p_val * (p_val + 4), ...
                # We only need to mark odd multiples (even ones are handled by 2).
                # The first odd multiple to mark is p_val * p_val (if p_val is odd, p_val*p_val is odd).
                # Subsequent odd multiples are p_val * (p_val + 2), p_val * (p_val + 4), etc.
                # The step for `j` should be `p_val * 2` to only hit odd multiples if `p_val` is odd.
                # For example, if p_val=3, we mark 9, 15, 21, ... (skip 12, 18).
                # The values are `p_val * p_val`, `p_val * (p_val + 2)`, `p_val * (p_val + 4)`
                # The index for `val` is `(val - 1) // 2`.
                start_val = p_val * p_val
                for j_val in range(start_val, limit + 1, 2 * p_val):
                    if j_val % 2 != 0: # Ensure we only mark odd numbers
                        j_idx = (j_val - 1) // 2
                        if j_idx < size_odd: # Ensure index is within bounds
                            is_prime_odd[j_idx] = False

            p_val += 2 # Move to the next odd number

        primes = [2] # Add 2 as it's the only even prime
        # Collect all odd prime numbers
        for i in range(1, size_odd): # Start from index 1 (number 3)
            if is_prime_odd[i]:
                primes.append(2 * i + 1)
        return primes

# Example Usage:
if __name__ == "__main__":
    print("--- Primality Test Examples (Trial Division) ---")
    print(f"Is 2 prime? {PrimeNumbers.is_prime_trial_division(2)}")   # Expected: True
    print(f"Is 7 prime? {PrimeNumbers.is_prime_trial_division(7)}")   # Expected: True
    print(f"Is 1 prime? {PrimeNumbers.is_prime_trial_division(1)}")   # Expected: False
    print(f"Is 4 prime? {PrimeNumbers.is_prime_trial_division(4)}")   # Expected: False
    print(f"Is 9 prime? {PrimeNumbers.is_prime_trial_division(9)}")   # Expected: False
    print(f"Is 131 prime? {PrimeNumbers.is_prime_trial_division(131)}") # Expected: True
    print(f"Is 1000000007 prime? {PrimeNumbers.is_prime_trial_division(1000000007)}") # Expected: True (a large prime)
    print(f"Is 1000000001 prime? {PrimeNumbers.is_prime_trial_division(1000000001)}") # Expected: False (1000000001 = 17 * 58823529)

    print("\n--- Sieve of Eratosthenes Examples ---")
    print(f"Primes up to 10 (standard): {PrimeNumbers.sieve_of_eratosthenes(10)}") # Expected: [2, 3, 5, 7]
    print(f"Primes up to 2 (standard): {PrimeNumbers.sieve_of_eratosthenes(2)}")   # Expected: [2]
    print(f"Primes up to 1 (standard): {PrimeNumbers.sieve_of_eratosthenes(1)}")   # Expected: []
    print(f"Primes up to 50 (standard): {PrimeNumbers.sieve_of_eratosthenes(50)}")
    # Expected: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

    print("\n--- Optimized Sieve of Eratosthenes Examples ---")
    print(f"Primes up to 10 (optimized space): {PrimeNumbers.sieve_of_eratosthenes_optimized_space(10)}") # Expected: [2, 3, 5, 7]
    print(f"Primes up to 2 (optimized space): {PrimeNumbers.sieve_of_eratosthenes_optimized_space(2)}") # Expected: [2]
    print(f"Primes up to 1 (optimized space): {PrimeNumbers.sieve_of_eratosthenes_optimized_space(1)}") # Expected: []
    print(f"Primes up to 50 (optimized space): {PrimeNumbers.sieve_of_eratosthenes_optimized_space(50)}")
    # Expected: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

    # Test large limit for sieve consistency
    limit_large = 1000
    sieve_std = PrimeNumbers.sieve_of_eratosthenes(limit_large)
    sieve_opt = PrimeNumbers.sieve_of_eratosthenes_optimized_space(limit_large)
    print(f"\nSieve (standard) and Optimized Sieve match for limit {limit_large}: {sieve_std == sieve_opt}")
    # print(f"Primes up to {limit_large} (standard): {sieve_std}")

    # Edge cases / Type and Value errors
    try:
        PrimeNumbers.is_prime_trial_division(0.5)
    except TypeError as e:
        print(f"Error (expected): {e}")
    try:
        PrimeNumbers.sieve_of_eratosthenes(-5)
    except ValueError as e:
        print(f"Error (expected): {e}")
---