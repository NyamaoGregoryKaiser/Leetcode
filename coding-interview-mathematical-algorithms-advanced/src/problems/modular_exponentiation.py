class ModularExponentiation:
    """
    Class containing various implementations for calculating (base^exp) % mod.
    This is a common operation in cryptography and number theory.
    """

    @staticmethod
    def power_naive(base: int, exp: int, mod: int) -> int:
        """
        Calculates (base^exp) % mod using a naive iterative approach.
        This method repeatedly multiplies `base` by itself `exp` times,
        taking the modulus at each step to prevent overflow.

        Time Complexity: O(exp)
            - The loop runs `exp` times. For very large `exp`, this can be
              extremely slow.
        Space Complexity: O(1)
            - A constant amount of extra space is used.

        Args:
            base (int): The base number.
            exp (int): The exponent (must be non-negative).
            mod (int): The modulus (must be positive).

        Returns:
            int: (base^exp) % mod.
        """
        if not (isinstance(base, int) and isinstance(exp, int) and isinstance(mod, int)):
            raise TypeError("Inputs must be integers.")
        if exp < 0:
            raise ValueError("Exponent must be non-negative.")
        if mod <= 0:
            raise ValueError("Modulus must be positive.")

        result = 1
        base %= mod # Take modulus of base initially to keep intermediate results small

        for _ in range(exp):
            result = (result * base) % mod
        return result

    @staticmethod
    def power_binary_iterative(base: int, exp: int, mod: int) -> int:
        """
        Calculates (base^exp) % mod using the iterative binary exponentiation
        (also known as exponentiation by squaring) algorithm.

        This algorithm exploits the binary representation of the exponent.
        If `exp` is even, base^exp = (base^2)^(exp/2).
        If `exp` is odd, base^exp = base * (base^2)^((exp-1)/2).
        This allows `exp` to be halved in each step, drastically reducing
        the number of multiplications.

        Time Complexity: O(log exp)
            - The number of iterations is proportional to the number of bits in `exp`.
        Space Complexity: O(1)
            - A constant amount of extra space is used.

        Args:
            base (int): The base number.
            exp (int): The exponent (must be non-negative).
            mod (int): The modulus (must be positive).

        Returns:
            int: (base^exp) % mod.
        """
        if not (isinstance(base, int) and isinstance(exp, int) and isinstance(mod, int)):
            raise TypeError("Inputs must be integers.")
        if exp < 0:
            raise ValueError("Exponent must be non-negative.")
        if mod <= 0:
            raise ValueError("Modulus must be positive.")

        result = 1
        base %= mod # Reduce base modulo mod

        while exp > 0:
            # If exp is odd, multiply base with result
            if exp % 2 == 1:
                result = (result * base) % mod
            
            # exp must be even now (or becomes even after previous step)
            # Square the base
            base = (base * base) % mod
            
            # Halve the exponent
            exp //= 2
        
        return result

    @staticmethod
    def power_binary_recursive(base: int, exp: int, mod: int) -> int:
        """
        Calculates (base^exp) % mod using the recursive binary exponentiation
        algorithm.

        This is the recursive counterpart to the iterative binary exponentiation.
        It follows the same mathematical principles but uses recursion for structure.

        Time Complexity: O(log exp)
            - The depth of the recursion is proportional to the number of bits in `exp`.
        Space Complexity: O(log exp)
            - Due to the recursion stack depth.

        Args:
            base (int): The base number.
            exp (int): The exponent (must be non-negative).
            mod (int): The modulus (must be positive).

        Returns:
            int: (base^exp) % mod.
        """
        if not (isinstance(base, int) and isinstance(exp, int) and isinstance(mod, int)):
            raise TypeError("Inputs must be integers.")
        if exp < 0:
            raise ValueError("Exponent must be non-negative.")
        if mod <= 0:
            raise ValueError("Modulus must be positive.")

        base %= mod # Reduce base modulo mod

        # Base case: exp = 0, result is 1
        if exp == 0:
            return 1
        
        # If exp is even
        if exp % 2 == 0:
            half_power = ModularExponentiation.power_binary_recursive(base, exp // 2, mod)
            return (half_power * half_power) % mod
        # If exp is odd
        else:
            half_power = ModularExponentiation.power_binary_recursive(base, (exp - 1) // 2, mod)
            return (base * half_power * half_power) % mod

    @staticmethod
    def power_python_builtin(base: int, exp: int, mod: int) -> int:
        """
        Calculates (base^exp) % mod using Python's built-in `pow()` function
        with three arguments.

        Python's `pow(base, exp, mod)` is highly optimized and implemented
        in C, typically using an efficient binary exponentiation algorithm.
        This serves as a benchmark and a quick solution for real-world scenarios.

        Time Complexity: O(log exp)
            - Similar to binary exponentiation, but likely with C-level optimizations.
        Space Complexity: O(1)
            - Negligible, as it's a built-in function.

        Args:
            base (int): The base number.
            exp (int): The exponent (must be non-negative).
            mod (int): The modulus (must be positive).

        Returns:
            int: (base^exp) % mod.
        """
        if not (isinstance(base, int) and isinstance(exp, int) and isinstance(mod, int)):
            raise TypeError("Inputs must be integers.")
        if exp < 0:
            raise ValueError("Exponent must be non-negative.")
        if mod <= 0:
            raise ValueError("Modulus must be positive.")
        
        return pow(base, exp, mod)

# Example Usage:
if __name__ == "__main__":
    b = 2
    e = 10
    m = 1000

    print(f"--- (base={b}, exp={e}, mod={m}) ---")
    print(f"Naive: {ModularExponentiation.power_naive(b, e, m)}") # Expected: 1024 % 1000 = 24
    print(f"Binary Iterative: {ModularExponentiation.power_binary_iterative(b, e, m)}") # Expected: 24
    print(f"Binary Recursive: {ModularExponentiation.power_binary_recursive(b, e, m)}") # Expected: 24
    print(f"Python Built-in: {ModularExponentiation.power_python_builtin(b, e, m)}") # Expected: 24

    b = 3
    e = 5
    m = 7
    print(f"\n--- (base={b}, exp={e}, mod={m}) ---") # 3^5 = 243. 243 % 7 = 5
    print(f"Naive: {ModularExponentiation.power_naive(b, e, m)}") # Expected: 5
    print(f"Binary Iterative: {ModularExponentiation.power_binary_iterative(b, e, m)}") # Expected: 5
    print(f"Binary Recursive: {ModularExponentiation.power_binary_recursive(b, e, m)}") # Expected: 5
    print(f"Python Built-in: {ModularExponentiation.power_python_builtin(b, e, m)}") # Expected: 5

    b = 7
    e = 1000
    m = 13
    print(f"\n--- (base={b}, exp={e}, mod={m}) ---") # A larger exponent example
    # Using Fermat's Little Theorem: a^(p-1) % p = 1 if p is prime and a not mult of p.
    # 7^12 % 13 = 1. exp = 1000 = 12 * 83 + 4.
    # 7^1000 % 13 = (7^12)^83 * 7^4 % 13 = 1^83 * 7^4 % 13 = 7^4 % 13
    # 7^2 = 49. 49 % 13 = 10.
    # 7^4 = (7^2)^2 = 10^2 = 100. 100 % 13 = 9. Expected: 9
    print(f"Binary Iterative: {ModularExponentiation.power_binary_iterative(b, e, m)}") # Expected: 9
    print(f"Python Built-in: {ModularExponentiation.power_python_builtin(b, e, m)}") # Expected: 9
    # Naive is too slow for e=1000

    b = 0
    e = 5
    m = 10
    print(f"\n--- (base={b}, exp={e}, mod={m}) ---") # Base is 0
    print(f"Binary Iterative: {ModularExponentiation.power_binary_iterative(b, e, m)}") # Expected: 0
    print(f"Python Built-in: {ModularExponentiation.power_python_builtin(b, e, m)}") # Expected: 0

    b = 5
    e = 0
    m = 10
    print(f"\n--- (base={b}, exp={e}, mod={m}) ---") # Exponent is 0
    print(f"Binary Iterative: {ModularExponentiation.power_binary_iterative(b, e, m)}") # Expected: 1
    print(f"Python Built-in: {ModularExponentiation.power_python_builtin(b, e, m)}") # Expected: 1

    # Edge cases / Type and Value errors
    try:
        ModularExponentiation.power_binary_iterative(2, -1, 10)
    except ValueError as e:
        print(f"Error (expected): {e}")
    try:
        ModularExponentiation.power_binary_iterative(2, 5, 0)
    except ValueError as e:
        print(f"Error (expected): {e}")
    try:
        ModularExponentiation.power_binary_iterative(2, 5, 1) # Modulo 1 always returns 0
    except ValueError as e:
        print(f"Error (expected): {e}")
    # Note: Python's `pow(x, y, 1)` always returns 0. My functions raise ValueError for mod=1.
    # It's a design choice; some definitions allow mod=1 -> result=0.
    # For coding interviews, mod=1 is often excluded or handled as a special case returning 0.
    print(f"Python built-in pow(2,5,1): {pow(2,5,1)}") # Expected: 0
---