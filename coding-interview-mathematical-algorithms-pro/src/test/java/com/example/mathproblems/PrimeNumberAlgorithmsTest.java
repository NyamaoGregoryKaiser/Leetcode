package com.example.mathproblems;

import com.example.mathproblems.algorithms.PrimeNumberAlgorithms;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * PrimeNumberAlgorithmsTest.java
 *
 * This class contains comprehensive JUnit 5 tests for the PrimeNumberAlgorithms class.
 * It covers various test cases, including base cases, edge cases, typical inputs,
 * and larger numbers for primality tests, prime factorization, and Sieve of Eratosthenes.
 */
class PrimeNumberAlgorithmsTest {

    private PrimeNumberAlgorithms algorithms;

    @BeforeEach
    void setUp() {
        algorithms = new PrimeNumberAlgorithms();
    }

    // --- Primality Test Tests ---

    @DisplayName("isPrime Naive: Test with known primes and non-primes")
    @ParameterizedTest(name = "{0} should be prime: {1}")
    @CsvSource({
            "2, true",
            "3, true",
            "5, true",
            "7, true",
            "11, true",
            "13, true",
            "17, true",
            "19, true",
            "29, true",
            "0, false",
            "1, false",
            "4, false",
            "6, false",
            "9, false",
            "10, false",
            "25, false",
            "100, false"
    })
    void testIsPrimeNaive(int n, boolean expected) {
        assertEquals(expected, algorithms.isPrimeNaive(n));
    }

    @DisplayName("isPrime Naive: Test with negative input")
    @Test
    void testIsPrimeNaiveNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.isPrimeNaive(-1));
    }

    @DisplayName("isPrime Optimized: Test with known primes and non-primes")
    @ParameterizedTest(name = "{0} should be prime: {1}")
    @CsvSource({
            "2, true",
            "3, true",
            "5, true",
            "7, true",
            "11, true",
            "13, true",
            "17, true",
            "19, true",
            "29, true",
            "97, true",
            "997, true", // Large prime
            "0, false",
            "1, false",
            "4, false",
            "6, false",
            "9, false",
            "10, false",
            "25, false",
            "100, false",
            "999, false"
    })
    void testIsPrimeOptimized(int n, boolean expected) {
        assertEquals(expected, algorithms.isPrimeOptimized(n));
    }

    @DisplayName("isPrime Optimized: Test with negative input")
    @Test
    void testIsPrimeOptimizedNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.isPrimeOptimized(-1));
    }

    // --- Prime Factorization Tests ---

    @DisplayName("Prime Factorization: Test with various inputs")
    @Test
    void testPrimeFactorization() {
        assertEquals(Map.of(), algorithms.primeFactorization(1), "Factorization of 1 should be empty.");

        assertEquals(Map.of(2, 1), algorithms.primeFactorization(2));
        assertEquals(Map.of(3, 1), algorithms.primeFactorization(3));
        assertEquals(Map.of(2, 2), algorithms.primeFactorization(4));
        assertEquals(Map.of(5, 1), algorithms.primeFactorization(5));
        assertEquals(Map.of(2, 1, 3, 1), algorithms.primeFactorization(6));
        assertEquals(Map.of(7, 1), algorithms.primeFactorization(7));
        assertEquals(Map.of(2, 3), algorithms.primeFactorization(8));
        assertEquals(Map.of(3, 2), algorithms.primeFactorization(9));
        assertEquals(Map.of(2, 1, 5, 1), algorithms.primeFactorization(10));

        assertEquals(Map.of(2, 2, 3, 1, 5, 1), algorithms.primeFactorization(60));
        assertEquals(Map.of(2, 3, 3, 2), algorithms.primeFactorization(72)); // 8 * 9
        assertEquals(Map.of(997, 1), algorithms.primeFactorization(997)); // Large prime

        Map<Integer, Integer> expected120 = new HashMap<>();
        expected120.put(2, 3); // 2^3 = 8
        expected120.put(3, 1); // 3^1 = 3
        expected120.put(5, 1); // 5^1 = 5
        assertEquals(expected120, algorithms.primeFactorization(120)); // 8 * 3 * 5 = 120

        Map<Integer, Integer> expectedLarge = new HashMap<>();
        expectedLarge.put(2, 1);
        expectedLarge.put(3, 1);
        expectedLarge.put(5, 1);
        expectedLarge.put(7, 1);
        expectedLarge.put(11, 1);
        expectedLarge.put(13, 1);
        assertEquals(expectedLarge, algorithms.primeFactorization(2 * 3 * 5 * 7 * 11 * 13)); // 30030
    }

    @DisplayName("Prime Factorization: Test with non-positive input")
    @Test
    void testPrimeFactorizationNonPositive() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.primeFactorization(0));
        assertThrows(IllegalArgumentException.class, () -> algorithms.primeFactorization(-5));
    }

    // --- Sieve of Eratosthenes Tests ---

    @DisplayName("Sieve Boolean Array: Test with small limits")
    @Test
    void testSieveOfEratosthenesBooleanArraySmall() {
        boolean[] primes0 = algorithms.sieveOfEratosthenesBooleanArray(0);
        assertArrayEquals(new boolean[]{false}, primes0);

        boolean[] primes1 = algorithms.sieveOfEratosthenesBooleanArray(1);
        assertArrayEquals(new boolean[]{false, false}, primes1);

        boolean[] primes2 = algorithms.sieveOfEratosthenesBooleanArray(2);
        assertArrayEquals(new boolean[]{false, false, true}, primes2);

        boolean[] primes10 = algorithms.sieveOfEratosthenesBooleanArray(10);
        boolean[] expected10 = {
                false, false, // 0, 1
                true,  true,  // 2, 3
                false, true,  // 4, 5
                false, true,  // 6, 7
                false, false, // 8, 9
                false         // 10
        };
        assertArrayEquals(expected10, primes10);
    }

    @DisplayName("Sieve Boolean Array: Test with medium limit")
    @Test
    void testSieveOfEratosthenesBooleanArrayMedium() {
        boolean[] primes30 = algorithms.sieveOfEratosthenesBooleanArray(30);
        // Primes up to 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
        assertTrue(primes30[2]);
        assertTrue(primes30[3]);
        assertTrue(primes30[5]);
        assertTrue(primes30[7]);
        assertTrue(primes30[11]);
        assertTrue(primes30[13]);
        assertTrue(primes30[17]);
        assertTrue(primes30[19]);
        assertTrue(primes30[23]);
        assertTrue(primes30[29]);

        assertFalse(primes30[0]);
        assertFalse(primes30[1]);
        assertFalse(primes30[4]);
        assertFalse(primes30[9]);
        assertFalse(primes30[27]);
        assertFalse(primes30[30]);
    }

    @DisplayName("Sieve Boolean Array: Test with negative input")
    @Test
    void testSieveOfEratosthenesBooleanArrayNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.sieveOfEratosthenesBooleanArray(-5));
    }

    @DisplayName("Sieve to List: Test with small limits")
    @Test
    void testSieveOfEratosthenesToListSmall() {
        assertEquals(Collections.emptyList(), algorithms.sieveOfEratosthenesToList(0));
        assertEquals(Collections.emptyList(), algorithms.sieveOfEratosthenesToList(1));
        assertEquals(List.of(2), algorithms.sieveOfEratosthenesToList(2));
        assertEquals(List.of(2, 3), algorithms.sieveOfEratosthenesToList(3));
        assertEquals(List.of(2, 3, 5, 7), algorithms.sieveOfEratosthenesToList(10));
    }

    @DisplayName("Sieve to List: Test with medium limit")
    @Test
    void testSieveOfEratosthenesToListMedium() {
        List<Integer> primesList = algorithms.sieveOfEratosthenesToList(30);
        List<Integer> expectedPrimes = Arrays.asList(2, 3, 5, 7, 11, 13, 17, 19, 23, 29);
        assertEquals(expectedPrimes, primesList);
    }

    @DisplayName("Sieve to List: Test with negative input")
    @Test
    void testSieveOfEratosthenesToListNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.sieveOfEratosthenesToList(-5));
    }
}