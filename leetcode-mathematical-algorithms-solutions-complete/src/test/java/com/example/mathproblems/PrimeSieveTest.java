```java
package com.example.mathproblems;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Prime Number Algorithms Tests")
class PrimeSieveTest {

    private final PrimeSieve primeSieve = new PrimeSieve();

    @Nested
    @DisplayName("Sieve of Eratosthenes Tests")
    class SieveTests {

        @Test
        void testSieveOfEratosthenesForSmallN() {
            assertEquals(Collections.emptyList(), primeSieve.sieveOfEratosthenes(0));
            assertEquals(Collections.emptyList(), primeSieve.sieveOfEratosthenes(1));
            assertEquals(List.of(2), primeSieve.sieveOfEratosthenes(2));
            assertEquals(List.of(2, 3), primeSieve.sieveOfEratosthenes(3));
            assertEquals(List.of(2, 3, 5), primeSieve.sieveOfEratosthenes(5));
            assertEquals(List.of(2, 3, 5, 7), primeSieve.sieveOfEratosthenes(7));
            assertEquals(List.of(2, 3, 5, 7, 11, 13, 17, 19), primeSieve.sieveOfEratosthenes(20));
        }

        @Test
        void testSieveOfEratosthenesForMediumN() {
            List<Integer> expectedPrimesUpTo50 = Arrays.asList(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47);
            assertEquals(expectedPrimesUpTo50, primeSieve.sieveOfEratosthenes(50));
        }

        @Test
        void testSieveOfEratosthenesForLargeN() {
            // Count of primes up to 1000 is 168
            List<Integer> primes = primeSieve.sieveOfEratosthenes(1000);
            assertEquals(168, primes.size());
            // Check some specific primes and non-primes
            assertTrue(primes.contains(997)); // Largest prime < 1000
            assertFalse(primes.contains(999));
            assertTrue(primes.contains(2));
            assertFalse(primes.contains(1));
        }

        @Test
        void testSieveOfEratosthenesNegativeInput() {
            assertThrows(IllegalArgumentException.class, () -> primeSieve.sieveOfEratosthenes(-5));
        }
    }

    @Nested
    @DisplayName("Is Prime (Trial Division) Tests")
    class IsPrimeTrialDivisionTests {

        @ParameterizedTest(name = "isPrimeTrialDivision({0}) should be {1}")
        @CsvSource({
                "0, false",
                "1, false",
                "2, true",
                "3, true",
                "4, false",
                "5, true",
                "6, false",
                "7, true",
                "11, true",
                "13, true",
                "17, true",
                "19, true",
                "23, true",
                "25, false",
                "29, true",
                "31, true",
                "49, false",
                "97, true", // A larger prime
                "100, false",
                "997, true", // Largest prime below 1000
                "2147483647, true" // MAX_INT (which is a prime)
        })
        void testIsPrimeTrialDivision(int num, boolean expected) {
            assertEquals(expected, primeSieve.isPrimeTrialDivision(num));
        }

        @Test
        void testIsPrimeTrialDivisionNegativeInput() {
            assertFalse(primeSieve.isPrimeTrialDivision(-1));
            assertFalse(primeSieve.isPrimeTrialDivision(-10));
        }
    }
}
```