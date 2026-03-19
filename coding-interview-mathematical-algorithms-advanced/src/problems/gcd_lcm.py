import math

class GCDLCM:
    """
    Class containing various implementations for Greatest Common Divisor (GCD)
    and Least Common Multiple (LCM).
    """

    @staticmethod
    def gcd_euclidean_recursive(a: int, b: int) -> int:
        """
        Calculates the Greatest Common Divisor (GCD) of two non-negative integers
        using the recursive Euclidean algorithm.

        The Euclidean algorithm is based on the principle that the greatest common
        divisor of two numbers does not change if the larger number is replaced by
        its difference with the smaller number. This process is repeated until one
        of the numbers becomes zero, and the other number is the GCD.
        More efficiently, it uses the property: gcd(a, b) = gcd(b, a % b).

        Time Complexity: O(log(min(a, b)))
            - The number of steps is proportional to the number of digits in the
              smaller number. In the worst case (Fibonacci numbers), it takes
              logarithmic steps relative to the smaller number.
        Space Complexity: O(log(min(a, b)))
            - Due to recursion stack depth. Each recursive call adds a frame to the stack.

        Args:
            a (int): The first non-negative integer.
            b (int): The second non-negative integer.

        Returns:
            int: The GCD of a and b.
        """
        if not (isinstance(a, int) and isinstance(b, int)):
            raise TypeError("Inputs must be integers.")
        if a < 0 or b < 0:
            raise ValueError("Inputs must be non-negative integers.")
        if b == 0:
            return a
        return GCDLCM.gcd_euclidean_recursive(b, a % b)

    @staticmethod
    def gcd_euclidean_iterative(a: int, b: int) -> int:
        """
        Calculates the Greatest Common Divisor (GCD) of two non-negative integers
        using the iterative Euclidean algorithm.

        This is an iterative version of the Euclidean algorithm, which avoids
        the overhead of recursion and potential stack overflow for very large
        numbers (though Python's recursion limit is usually sufficient for typical
        interview inputs). It uses a simple loop to apply the property
        gcd(a, b) = gcd(b, a % b) repeatedly.

        Time Complexity: O(log(min(a, b)))
            - Similar to the recursive version, the number of steps is logarithmic.
        Space Complexity: O(1)
            - No extra space is used beyond a few variables.

        Args:
            a (int): The first non-negative integer.
            b (int): The second non-negative integer.

        Returns:
            int: The GCD of a and b.
        """
        if not (isinstance(a, int) and isinstance(b, int)):
            raise TypeError("Inputs must be integers.")
        if a < 0 or b < 0:
            raise ValueError("Inputs must be non-negative integers.")
        while b:
            a, b = b, a % b
        return a

    @staticmethod
    def lcm_from_gcd(a: int, b: int) -> int:
        """
        Calculates the Least Common Multiple (LCM) of two non-negative integers
        using the property: LCM(a, b) = |a * b| / GCD(a, b).

        This is the most common and efficient way to calculate LCM, as it leverages
        the efficiency of the Euclidean algorithm for GCD.

        Time Complexity: O(log(min(a, b)))
            - Dominated by the GCD calculation.
        Space Complexity: O(log(min(a, b))) or O(1)
            - Depends on whether recursive or iterative GCD is used. Using the iterative
              GCD (which is implicitly what `math.gcd` uses or similar efficient impl),
              it's O(1).

        Args:
            a (int): The first non-negative integer.
            b (int): The second non-negative integer.

        Returns:
            int: The LCM of a and b.
        """
        if not (isinstance(a, int) and isinstance(b, int)):
            raise TypeError("Inputs must be integers.")
        if a < 0 or b < 0:
            raise ValueError("Inputs must be non-negative integers.")

        # Handle edge cases where one or both numbers are zero.
        # LCM(0, x) is 0 for any x.
        if a == 0 or b == 0:
            return 0
        
        # Using the built-in math.gcd for robustness and potential C optimization.
        # Alternatively, can call GCDLCM.gcd_euclidean_iterative(a, b)
        # We use absolute values to handle potential negative inputs if problem
        # allowed, but our checks already enforce non-negative.
        return abs(a * b) // math.gcd(a, b)


# Example Usage:
if __name__ == "__main__":
    print("--- GCD Examples ---")
    print(f"GCD(48, 18) recursive: {GCDLCM.gcd_euclidean_recursive(48, 18)}") # Expected: 6
    print(f"GCD(48, 18) iterative: {GCDLCM.gcd_euclidean_iterative(48, 18)}") # Expected: 6
    print(f"GCD(101, 103) recursive: {GCDLCM.gcd_euclidean_recursive(101, 103)}") # Expected: 1 (coprime)
    print(f"GCD(101, 103) iterative: {GCDLCM.gcd_euclidean_iterative(101, 103)}") # Expected: 1
    print(f"GCD(0, 5) recursive: {GCDLCM.gcd_euclidean_recursive(0, 5)}") # Expected: 5
    print(f"GCD(7, 0) iterative: {GCDLCM.gcd_euclidean_iterative(7, 0)}") # Expected: 7
    print(f"GCD(0, 0) iterative: {GCDLCM.gcd_euclidean_iterative(0, 0)}") # Expected: 0

    print("\n--- LCM Examples ---")
    print(f"LCM(48, 18): {GCDLCM.lcm_from_gcd(48, 18)}") # Expected: (48*18)/6 = 144
    print(f"LCM(101, 103): {GCDLCM.lcm_from_gcd(101, 103)}") # Expected: 101*103 = 10403
    print(f"LCM(12, 18): {GCDLCM.lcm_from_gcd(12, 18)}") # Expected: (12*18)/6 = 36
    print(f"LCM(0, 5): {GCDLCM.lcm_from_gcd(0, 5)}") # Expected: 0
    print(f"LCM(7, 0): {GCDLCM.lcm_from_gcd(7, 0)}") # Expected: 0
    print(f"LCM(0, 0): {GCDLCM.lcm_from_gcd(0, 0)}") # Expected: 0

    # Edge cases / Type and Value errors
    try:
        GCDLCM.gcd_euclidean_recursive(-4, 2)
    except ValueError as e:
        print(f"Error (expected): {e}")
    try:
        GCDLCM.lcm_from_gcd(4, "2")
    except TypeError as e:
        print(f"Error (expected): {e}")

---