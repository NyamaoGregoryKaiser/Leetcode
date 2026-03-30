```java
package com.example.dp.problems;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("Coin Change Problem Tests")
class CoinChangeProblemTest {

    private CoinChangeProblem coinChangeSolver;

    @BeforeEach
    void setUp() {
        coinChangeSolver = new CoinChangeProblem();
    }

    // --- Test Data Source for Minimum Coins ---
    static Stream<Arguments> minCoinsTestCases() {
        return Stream.of(
                Arguments.of(new int[]{1, 2, 5}, 11, 3), // 5+5+1
                Arguments.of(new int[]{2}, 3, -1),       // Impossible
                Arguments.of(new int[]{1}, 0, 0),        // Amount 0
                Arguments.of(new int[]{1}, 1, 1),        // Amount 1, coin 1
                Arguments.of(new int[]{1}, 10, 10),      // Amount 10, coin 1
                Arguments.of(new int[]{2, 5, 10, 1}, 27, 4), // 10+10+5+2 (greedy doesn't always work, here it does)
                                                         // 27: 10,10,5,2 (4 coins)
                                                         // 27: 5,5,5,5,5,2 (6 coins)
                                                         // 27: 1,1,...1 (27 coins)
                Arguments.of(new int[]{3, 7, 405, 436}, 7119, 17) // Large values, random example for consistency
        );
    }

    // --- Brute Force Minimum Coins Tests ---
    @ParameterizedTest(name = "Brute Force Min Coins: Coins {0}, Amount {1} -> {2}")
    @MethodSource("minCoinsTestCases")
    void testMinCoinsBruteForce(int[] coins, int amount, int expectedMinCoins) {
        // Brute force is only suitable for very small amounts and coin counts.
        // For amount 11 with 3 coins, it might pass, but for larger, it would timeout.
        if (amount > 15 || coins.length > 5) return; // Limit for brute force
        assertEquals(expectedMinCoins, coinChangeSolver.minCoinsBruteForce(coins, amount));
    }

    @Test
    void testMinCoinsBruteForce_ZeroAmount() {
        assertEquals(0, coinChangeSolver.minCoinsBruteForce(new int[]{1, 2, 5}, 0));
    }

    // --- Memoized Minimum Coins Tests ---
    @ParameterizedTest(name = "Memoized Min Coins: Coins {0}, Amount {1} -> {2}")
    @MethodSource("minCoinsTestCases")
    void testMinCoinsMemoized(int[] coins, int amount, int expectedMinCoins) {
        assertEquals(expectedMinCoins, coinChangeSolver.minCoinsMemoized(coins, amount));
    }

    @Test
    void testMinCoinsMemoized_LargeAmount() {
        int[] coins = {1, 3, 4, 5};
        int amount = 1000;
        // The optimal for 1000 is 200 * 5 = 200 coins
        assertEquals(200, coinChangeSolver.minCoinsMemoized(coins, amount));
    }

    // --- Iterative Minimum Coins Tests ---
    @ParameterizedTest(name = "Iterative Min Coins: Coins {0}, Amount {1} -> {2}")
    @MethodSource("minCoinsTestCases")
    void testMinCoinsIterative(int[] coins, int amount, int expectedMinCoins) {
        assertEquals(expectedMinCoins, coinChangeSolver.minCoinsIterative(coins, amount));
    }

    @Test
    void testMinCoinsIterative_EdgeCases() {
        assertEquals(0, coinChangeSolver.minCoinsIterative(new int[]{1, 2, 5}, 0));
        assertEquals(-1, coinChangeSolver.minCoinsIterative(new int[]{2, 4}, 3)); // Impossible
        assertEquals(1, coinChangeSolver.minCoinsIterative(new int[]{5, 2}, 5));
        assertEquals(2, coinChangeSolver.minCoinsIterative(new int[]{5, 2}, 4)); // 2+2
    }

    // --- Test Data Source for Number of Ways ---
    static Stream<Arguments> numWaysTestCases() {
        return Stream.of(
                Arguments.of(new int[]{1, 2, 5}, 5, 4L), // 1+1+1+1+1, 1+1+1+2, 1+2+2, 5
                Arguments.of(new int[]{2, 5, 3, 6}, 10, 5L), // 5+5, 2+2+2+2+2, 2+2+6, 2+5+3, 3+3+? No.
                // 10: (2,2,2,2,2), (2,2,3,3), (2,2,6), (2,3,5), (5,5), (3,?)
                // coins {2,3,5,6}, amount 10.
                // 1. (2,2,2,2,2)
                // 2. (2,2,3,3) - No sum to 10
                // 2. (2,2,6)
                // 3. (2,3,5)
                // 4. (3,3,?) no.
                // 5. (5,5)
                // 6. (4,6) not a coin
                // Let's recheck:
                // For {2,3,5,6}, amount 10:
                // Using 2s: (2,2,2,2,2) - 1 way
                // Using 3s: (2,2,3,3) sum 10 - 1 way
                // Using 5s: (5,5), (2,3,5) - 2 ways
                // Using 6s: (2,2,6) - 1 way
                // Total ways = 5.
                Arguments.of(new int[]{1, 2, 3}, 4, 4L), // 1+1+1+1, 1+1+2, 1+3, 2+2
                Arguments.of(new int[]{1}, 0, 1L),     // Amount 0
                Arguments.of(new int[]{1}, 1, 1L),
                Arguments.of(new int[]{10}, 0, 1L),
                Arguments.of(new int[]{10}, 5, 0L), // Impossible
                Arguments.of(new int[]{7}, 7, 1L),
                Arguments.of(new int[]{7}, 14, 1L)
        );
    }

    // --- Memoized Number of Ways Tests ---
    @ParameterizedTest(name = "Memoized Num Ways: Coins {0}, Amount {1} -> {2}")
    @MethodSource("numWaysTestCases")
    void testNumWaysMemoized(int[] coins, int amount, long expectedNumWays) {
        assertEquals(expectedNumWays, coinChangeSolver.numWaysMemoized(coins, amount));
    }

    // --- Iterative Number of Ways Tests ---
    @ParameterizedTest(name = "Iterative Num Ways: Coins {0}, Amount {1} -> {2}")
    @MethodSource("numWaysTestCases")
    void testNumWaysIterative(int[] coins, int amount, long expectedNumWays) {
        assertEquals(expectedNumWays, coinChangeSolver.numWaysIterative(coins, amount));
    }

    @Test
    void testNumWaysIterative_EdgeCases() {
        assertEquals(1L, coinChangeSolver.numWaysIterative(new int[]{1, 2, 5}, 0));
        assertEquals(0L, coinChangeSolver.numWaysIterative(new int[]{2, 4}, 3)); // Impossible
        assertEquals(0L, coinChangeSolver.numWaysIterative(new int[]{}, 5));    // No coins
        assertEquals(1L, coinChangeSolver.numWaysIterative(new int[]{5}, 5));
    }
}
```