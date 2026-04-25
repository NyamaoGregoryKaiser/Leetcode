```java
package com.example.mathproblems;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("GCD and LCM Calculator Tests")
class GCDCalculatorTest {

    private final GCDCalculator calculator = new GCDCalculator();

    @Nested
    @DisplayName("GCD Iterative Tests")
    class GCDIterativeTests {

        @ParameterizedTest(name = "gcdIterative({0}, {1}) should be {2}")
        @CsvSource({
                "0, 0, 0",
                "0, 5, 5",
                "7, 0, 7",
                "10, 5, 5",
                "48, 18, 6",
                "18, 48, 6", // Order shouldn't matter
                "17, 23, 1", // Primes, should be 1
                "100, 100, 100",
                "99, 11, 11",
                "123456789, 987654321, 9", // Large numbers
                "1000000000, 500000000, 500000000",
                "2147483647, 1, 1", // Max int value (prime)
                "9223372036854775807, 1, 1", // Max long value (prime)
                "9223372036854775807, 9223372036854775807, 9223372036854775807"
        })
        void testGcdIterative(long a, long b, long expected) {
            assertEquals(expected, calculator.gcdIterative(a, b));
        }

        @Test
        void testGcdIterativeNegativeInputs() {
            assertThrows(IllegalArgumentException.class, () -> calculator.gcdIterative(-10, 5));
            assertThrows(IllegalArgumentException.class, () -> calculator.gcdIterative(10, -5));
            assertThrows(IllegalArgumentException.class, () -> calculator.gcdIterative(-10, -5));
        }
    }

    @Nested
    @DisplayName("GCD Recursive Tests")
    class GCDRecursiveTests {

        @ParameterizedTest(name = "gcdRecursive({0}, {1}) should be {2}")
        @CsvSource({
                "0, 0, 0",
                "0, 5, 5",
                "7, 0, 7",
                "10, 5, 5",
                "48, 18, 6",
                "18, 48, 6",
                "17, 23, 1",
                "100, 100, 100",
                "99, 11, 11",
                "123456789, 987654321, 9",
                "1000000000, 500000000, 500000000",
                "2147483647, 1, 1",
                "9223372036854775807, 1, 1",
                "9223372036854775807, 9223372036854775807, 9223372036854775807"
        })
        void testGcdRecursive(long a, long b, long expected) {
            assertEquals(expected, calculator.gcdRecursive(a, b));
        }

        @Test
        void testGcdRecursiveNegativeInputs() {
            assertThrows(IllegalArgumentException.class, () -> calculator.gcdRecursive(-10, 5));
            assertThrows(IllegalArgumentException.class, () -> calculator.gcdRecursive(10, -5));
        }
    }

    @Nested
    @DisplayName("GCD Binary Tests")
    class GCDBinaryTests {

        @ParameterizedTest(name = "gcdBinary({0}, {1}) should be {2}")
        @CsvSource({
                "0, 0, 0",
                "0, 5, 5",
                "7, 0, 7",
                "10, 5, 5",
                "48, 18, 6",
                "18, 48, 6",
                "17, 23, 1",
                "100, 100, 100",
                "99, 11, 11",
                "123456789, 987654321, 9",
                "1000000000, 500000000, 500000000",
                "2147483647, 1, 1",
                "9223372036854775807, 1, 1",
                "9223372036854775807, 9223372036854775807, 9223372036854775807",
                "6, 10, 2", // Even numbers
                "12, 18, 6", // More even numbers
                "20, 25, 5", // Mixed even/odd
                "1024, 768, 256" // Powers of 2 related
        })
        void testGcdBinary(long a, long b, long expected) {
            assertEquals(expected, calculator.gcdBinary(a, b));
        }

        @Test
        void testGcdBinaryNegativeInputs() {
            assertThrows(IllegalArgumentException.class, () -> calculator.gcdBinary(-10, 5));
            assertThrows(IllegalArgumentException.class, () -> calculator.gcdBinary(10, -5));
        }
    }

    @Nested
    @DisplayName("LCM Tests")
    class LCMTests {

        @ParameterizedTest(name = "lcm({0}, {1}) should be {2}")
        @CsvSource({
                "0, 0, 0",
                "0, 5, 0",
                "7, 0, 0",
                "10, 5, 10",
                "48, 18, 144",
                "18, 48, 144",
                "17, 23, 391", // Primes, product
                "100, 100, 100",
                "99, 11, 99",
                "1, 1, 1",
                "1, 100, 100",
                "2, 3, 6",
                "6, 10, 30",
                "12345, 67890, 83827650", // Large numbers
                // Cases that could cause overflow if not handled (a * b) / gcd
                // Using (a / gcd) * b ensures it.
                "2000000000, 3000000000, 6000000000" // 2*10^9, 3*10^9. Product is 6*10^18, fits long.
        })
        void testLcm(long a, long b, long expected) {
            assertEquals(expected, calculator.lcm(a, b));
        }

        @Test
        void testLcmNegativeInputs() {
            assertThrows(IllegalArgumentException.class, () -> calculator.lcm(-10, 5));
            assertThrows(IllegalArgumentException.class, () -> calculator.lcm(10, -5));
        }

        // Test for potential overflow if not careful, but current implementation prevents it
        @Test
        void testLcmPotentialOverflowHandled() {
            long a = 2_000_000_000L; // 2 * 10^9
            long b = 3_000_000_000L; // 3 * 10^9
            // Product a * b = 6 * 10^18, which fits in long.
            // But what if it was larger? E.g., MAX_LONG / 2 * MAX_LONG / 2
            // Let's use numbers that can cause (a*b) to exceed MAX_LONG
            // For example, if we were calculating `(a * b) / gcd`
            // Instead, we use `(a / gcd) * b`
            // Example: LCM(MAX_LONG/2, MAX_LONG) would overflow if `(a*b)` was first.
            // Using (a/gcd)*b: a=MAX_LONG/2, b=MAX_LONG. gcd=MAX_LONG/2.
            // (MAX_LONG/2 / (MAX_LONG/2)) * MAX_LONG = 1 * MAX_LONG = MAX_LONG. This works.
            long l_a = Long.MAX_VALUE / 2;
            long l_b = Long.MAX_VALUE;
            // The actual LCM should be Long.MAX_VALUE (since l_a divides l_b if l_b is even)
            // But for example, a=10^9, b=10^9+1 (coprime)
            long val1 = 1_000_000_000L;
            long val2 = 1_000_000_001L; // Coprime to val1
            // LCM should be val1 * val2, which is 1_000_000_001_000_000_000 (10^18), fits in long.
            assertEquals(val1 * val2, calculator.lcm(val1, val2));
        }
    }
}
```