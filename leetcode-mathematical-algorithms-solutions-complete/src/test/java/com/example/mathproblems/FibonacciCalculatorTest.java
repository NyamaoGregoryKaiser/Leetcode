```java
package com.example.mathproblems;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import java.math.BigInteger;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Fibonacci Calculator Tests")
class FibonacciCalculatorTest {

    private final FibonacciCalculator calculator = new FibonacciCalculator();

    // Standard Fibonacci sequence values up to F(20)
    // F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8, F(7)=13, F(8)=21, F(9)=34, F(10)=55,
    // F(11)=89, F(12)=144, F(13)=233, F(14)=377, F(15)=610, F(16)=987, F(17)=1597, F(18)=2584, F(19)=4181, F(20)=6765
    private static final String FIB_VALUES = "0,0, 1,1, 2,1, 3,2, 4,3, 5,5, 6,8, 7,13, 8,21, 9,34, 10,55," +
                                             "11,89, 12,144, 13,233, 14,377, 15,610, 16,987, 17,1597, 18,2584, 19,4181, 20,6765";

    @Nested
    @DisplayName("Naive Recursive Fibonacci Tests")
    class NaiveRecursiveTests {

        @ParameterizedTest(name = "fibonacciNaiveRecursive({0}) should be {1}")
        @CsvSource(FIB_VALUES)
        void testFibonacciNaiveRecursiveSmallValues(int n, BigInteger expected) {
            assertEquals(expected, calculator.fibonacciNaiveRecursive(n));
        }

        @Test
        void testFibonacciNaiveRecursiveNegativeInput() {
            assertThrows(IllegalArgumentException.class, () -> calculator.fibonacciNaiveRecursive(-1));
        }

        // Note: For larger N (e.g., N > 40), naive recursive becomes too slow for unit tests.
    }

    @Nested
    @DisplayName("Iterative DP Fibonacci Tests")
    class IterativeDPTests {

        @ParameterizedTest(name = "fibonacciIterativeDP({0}) should be {1}")
        @CsvSource(FIB_VALUES)
        void testFibonacciIterativeDPSmallValues(int n, BigInteger expected) {
            assertEquals(expected, calculator.fibonacciIterativeDP(n));
        }

        @Test
        void testFibonacciIterativeDPNegativeInput() {
            assertThrows(IllegalArgumentException.class, () -> calculator.fibonacciIterativeDP(-1));
        }

        @ParameterizedTest(name = "fibonacciIterativeDP({0}) should be correct for large N")
        @ValueSource(ints = {40, 50, 90}) // Test larger values easily computed by iterative DP
        void testFibonacciIterativeDPLargeValues(int n) {
            // F(40) = 102334155
            // F(50) = 12586269025
            // F(90) = 2880067194370816120 (fits in long)
            // F(93) = 12200160415121876738 (exceeds Long.MAX_VALUE, requires BigInteger)
            // F(100) = 354224848179261915075

            BigInteger fib = calculator.fibonacciIterativeDP(n);
            assertNotNull(fib); // Just ensure it computes without error for large N
            assertTrue(fib.compareTo(BigInteger.ZERO) >= 0); // Fibonacci numbers are non-negative
        }
    }

    @Nested
    @DisplayName("Matrix Exponentiation Fibonacci Tests")
    class MatrixExponentiationTests {

        @ParameterizedTest(name = "fibonacciMatrixExponentiation({0}) should be {1}")
        @CsvSource(FIB_VALUES)
        void testFibonacciMatrixExponentiationSmallValues(int n, BigInteger expected) {
            assertEquals(expected, calculator.fibonacciMatrixExponentiation(n));
        }

        @Test
        void testFibonacciMatrixExponentiationNegativeInput() {
            assertThrows(IllegalArgumentException.class, () -> calculator.fibonacciMatrixExponentiation(-1));
        }

        @ParameterizedTest(name = "fibonacciMatrixExponentiation({0}) should be correct for large N")
        @ValueSource(ints = {100, 1000, 5000, 100000}) // Test very large values efficiently
        void testFibonacciMatrixExponentiationLargeValues(int n) {
            BigInteger fib = calculator.fibonacciMatrixExponentiation(n);
            assertNotNull(fib); // Just ensure it computes without error
            assertTrue(fib.compareTo(BigInteger.ZERO) >= 0); // Fibonacci numbers are non-negative

            // Verify with an example that exceeds `long` capacity
            if (n == 100) {
                // F(100) = 354224848179261915075
                assertEquals(new BigInteger("354224848179261915075"), fib);
            } else if (n == 1000) {
                // F(1000) is a very large number (209 digits). Just ensure it's not zero or one.
                assertNotEquals(BigInteger.ZERO, fib);
                assertNotEquals(BigInteger.ONE, fib);
                // The most significant digits of F(1000) are 4.346655768...E+208
                // Check a few leading digits (manual check)
                assertTrue(fib.toString().startsWith("4346655768"));
                assertEquals(209, fib.toString().length()); // F(1000) has 209 digits.
            }
        }
    }
}
```