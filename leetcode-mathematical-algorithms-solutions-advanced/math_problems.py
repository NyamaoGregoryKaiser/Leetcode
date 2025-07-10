```python
import math

def fibonacci_iterative(n):
    """
    Calculates the nth Fibonacci number iteratively.

    Args:
        n: The index of the desired Fibonacci number (non-negative integer).

    Returns:
        The nth Fibonacci number.  Returns -1 for invalid input.
    """
    if n < 0:
        return -1
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

def fibonacci_recursive(n):
    """
    Calculates the nth Fibonacci number recursively (inefficient for large n).

    Args:
        n: The index of the desired Fibonacci number (non-negative integer).

    Returns:
        The nth Fibonacci number. Returns -1 for invalid input.
    """
    if n < 0:
        return -1
    if n <= 1:
        return n
    return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)


def is_prime(n):
    """
    Checks if a number is prime.

    Args:
        n: The number to check.

    Returns:
        True if n is prime, False otherwise.
    """
    if n <= 1:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True


def gcd_euclidean(a, b):
    """
    Calculates the greatest common divisor (GCD) using the Euclidean algorithm.

    Args:
        a: The first integer.
        b: The second integer.

    Returns:
        The GCD of a and b.
    """
    while(b):
        a, b = b, a % b
    return a


def factorial(n):
    """
    Calculates the factorial of a non-negative integer.

    Args:
        n: The non-negative integer.

    Returns:
        The factorial of n. Returns -1 for invalid input.
    """
    if n < 0:
        return -1
    if n == 0:
        return 1
    else:
        result = 1
        for i in range(1, n + 1):
            result *= i
        return result

def power(x, n):
    """
    Calculates x raised to the power of n efficiently.

    Args:
      x: The base.
      n: The exponent.

    Returns:
      x raised to the power of n.  Handles negative exponents.
    """
    if n == 0:
        return 1
    elif n < 0:
        return 1 / power(x, -n)
    elif n % 2 == 0:
        half_power = power(x, n // 2)
        return half_power * half_power
    else:
        return x * power(x, n - 1)


```