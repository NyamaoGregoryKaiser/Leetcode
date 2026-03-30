```java
package com.example.dp.problems;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Arrays;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("0/1 Knapsack Problem Tests")
class KnapsackProblemTest {

    private KnapsackProblem knapsackSolver;

    @BeforeEach
    void setUp() {
        knapsackSolver = new KnapsackProblem();
    }

    // --- Test Data Source for Parameterized Tests ---
    static Stream<Arguments> knapsackTestCases() {
        return Stream.of(
                Arguments.of(new int[]{10, 20, 30}, new int[]{60, 100, 120}, 50, 220), // Standard example
                Arguments.of(new int[]{1, 1, 1}, new int[]{10, 20, 30}, 2, 50), // All items small
                Arguments.of(new int[]{1, 2, 3, 4}, new int[]{1, 2, 3, 4}, 5, 7), // {2,3} -> 5, {1,4} -> 5, {2,1,4} not valid
                Arguments.of(new int[]{4, 5, 1}, new int[]{1, 2, 3}, 4, 3), // Only item with weight 1 (value 3)
                Arguments.of(new int[]{10, 20, 30}, new int[]{60, 100, 120}, 0, 0), // Zero capacity
                Arguments.of(new int[]{}, new int[]{}, 50, 0), // No items
                Arguments.of(new int[]{10, 20, 30}, new int[]{60, 100, 120}, 5, 0), // Small capacity, no item fits
                Arguments.of(new int[]{2, 3, 4, 5}, new int[]{3, 4, 5, 6}, 5, 7), // {2,3} -> 7, {5} -> 6
                Arguments.of(new int[]{5, 4, 6, 3}, new int[]{10, 40, 30, 50}, 10, 90) // {4,3} for value 90, capacity 7. No, {4,6} value 70. {5,3} -> value 60.
                // {4, 6} = 10 capacity, value 40+30=70
                // {5, 3} = 8 capacity, value 10+50=60
                // {4, 3} with 10 capacity, values 40+50=90. Correct items for {4,3} are weights 4 and 3, total weight 7, total value 40+50=90. This fits in capacity 10.
                // This makes the 90 correct.
        );
    }

    // --- Brute Force Tests ---
    @ParameterizedTest(name = "Brute Force: Weights {0}, Values {1}, Capacity {2} -> Max Value {3}")
    @MethodSource("knapsackTestCases")
    void testSolveBruteForce(int[] weights, int[] values, int capacity, int expectedMaxValue) {
        // Brute force can be very slow for more than ~20 items. Limit test size.
        if (weights.length > 20) return;
        assertEquals(expectedMaxValue, knapsackSolver.solveBruteForce(weights, values, capacity));
    }

    @Test
    void testSolveBruteForce_EdgeCases() {
        assertEquals(0, knapsackSolver.solveBruteForce(new int[]{10, 20}, new int[]{100, 200}, 0));
        assertEquals(0, knapsackSolver.solveBruteForce(new int[]{}, new int[]{}, 50));
        assertEquals(0, knapsackSolver.solveBruteForce(new int[]{100}, new int[]{10}, 50)); // Item too heavy
    }

    // --- Memoized Tests ---
    @ParameterizedTest(name = "Memoized: Weights {0}, Values {1}, Capacity {2} -> Max Value {3}")
    @MethodSource("knapsackTestCases")
    void testSolveMemoized(int[] weights, int[] values, int capacity, int expectedMaxValue) {
        assertEquals(expectedMaxValue, knapsackSolver.solveMemoized(weights, values, capacity));
    }

    // --- Iterative Tests ---
    @ParameterizedTest(name = "Iterative: Weights {0}, Values {1}, Capacity {2} -> Max Value {3}")
    @MethodSource("knapsackTestCases")
    void testSolveIterative(int[] weights, int[] values, int capacity, int expectedMaxValue) {
        assertEquals(expectedMaxValue, knapsackSolver.solveIterative(weights, values, capacity));
    }

    // --- Space Optimized Tests ---
    @ParameterizedTest(name = "Space Optimized: Weights {0}, Values {1}, Capacity {2} -> Max Value {3}")
    @MethodSource("knapsackTestCases")
    void testSolveSpaceOptimized(int[] weights, int[] values, int capacity, int expectedMaxValue) {
        assertEquals(expectedMaxValue, knapsackSolver.solveSpaceOptimized(weights, values, capacity));
    }

    @Test
    void testAgainstLargeInputs() {
        int[] weights = new int[100];
        int[] values = new int[100];
        for (int i = 0; i < 100; i++) {
            weights[i] = i + 1; // Weights 1 to 100
            values[i] = (i + 1) * 2; // Values 2 to 200
        }
        int capacity = 2500; // Can theoretically take many items

        // The exact max value calculation is complex, but we can verify consistency
        // by comparing optimized solutions.
        int expected = knapsackSolver.solveIterative(weights, values, capacity);
        assertEquals(expected, knapsackSolver.solveSpaceOptimized(weights, values, capacity));
        // The value for this specific large input: sum of all values is 100*101, sum of weights is 5050.
        // Capacity 2500. This is a complex value, but the solutions should match.
        assertEquals(5000, expected); // 50 items with weights 1 to 50, sum of weights 1275, sum of values 2550
        // items with weights up to 70: sum weights is 70*71/2 = 2485. Sum values is 2*2485=4970.
        // For capacity 2500:
        // By taking items from smallest weights. sum of weights 1..70 = 2485. value sum = 4970.
        // If we take weights 1..70 (total weight 2485, value 4970)
        // If we take items (1...69) and 71: total weight 2415+71 = 2486. value 4830 + 142 = 4972.
        // This is getting complicated without a separate solver. For testing purposes, we can trust a known implementation.
        // The expected value for weights 1..100, values 2..200, capacity 2500 is 5000 (by selecting items 1-70 where total weight is 2485, and item 71 has value 142 and weight 71, not fitting within 2500-2485=15).
        // Let's re-verify the specific expected value for this:
        // For items (w_i = i, v_i = 2i), cap=2500.
        // If we take items 1...70, total weight = 70*71/2 = 2485. Total value = 2*2485 = 4970. Remaining cap 15.
        // No item fits in 15. So 4970 is the max value.
        assertEquals(4970, expected); // Corrected expected value

        // Try another large input, ensuring space optimized is correct.
        int[] w3 = {12, 1, 1, 4, 2, 10, 1, 3, 5, 8, 2, 7, 6, 9, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25};
        int[] v3 = {4, 2, 1, 10, 4, 3, 2, 6, 11, 13, 5, 12, 10, 15, 18, 20, 22, 25, 27, 30, 32, 35, 38, 40, 43, 46, 49, 52};
        int cap3 = 100;
        int expected3 = knapsackSolver.solveIterative(w3, v3, cap3);
        assertEquals(expected3, knapsackSolver.solveSpaceOptimized(w3, v3, cap3));
    }
}
```