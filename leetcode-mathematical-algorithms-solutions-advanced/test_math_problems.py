```python
import unittest
from math_problems import fibonacci_iterative, fibonacci_recursive, is_prime, gcd_euclidean, factorial, power

class TestMathProblems(unittest.TestCase):

    def test_fibonacci(self):
        self.assertEqual(fibonacci_iterative(0), 0)
        self.assertEqual(fibonacci_iterative(1), 1)
        self.assertEqual(fibonacci_iterative(5), 5)
        self.assertEqual(fibonacci_recursive(0), 0)
        self.assertEqual(fibonacci_recursive(1), 1)
        self.assertEqual(fibonacci_recursive(5), 5)
        self.assertEqual(fibonacci_iterative(-1), -1)  #test for invalid input

    def test_is_prime(self):
        self.assertTrue(is_prime(2))
        self.assertTrue(is_prime(3))
        self.assertFalse(is_prime(4))
        self.assertTrue(is_prime(17))
        self.assertFalse(is_prime(1))
        self.assertFalse(is_prime(0))

    def test_gcd(self):
        self.assertEqual(gcd_euclidean(12, 18), 6)
        self.assertEqual(gcd_euclidean(4, 8), 4)
        self.assertEqual(gcd_euclidean(7, 11), 1)


    def test_factorial(self):
        self.assertEqual(factorial(0), 1)
        self.assertEqual(factorial(1), 1)
        self.assertEqual(factorial(5), 120)
        self.assertEqual(factorial(-1), -1) #test for invalid input


    def test_power(self):
        self.assertEqual(power(2, 3), 8)
        self.assertEqual(power(5, 0), 1)
        self.assertEqual(power(2, -2), 0.25)
        self.assertEqual(power(10,2),100)


if __name__ == '__main__':
    unittest.main()
```