```java
package com.example.sorting.problems;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Unit tests for P1_KthLargestElement.
 */
class P1_KthLargestElementTest {

    private final P1_KthLargestElement solution = new P1_KthLargestElement();

    private static Stream<Arguments> provideKthLargestTestCases() {
        return Stream.of(
                Arguments.of(new int[]{3, 2, 1, 5, 6, 4}, 2, 5),
                Arguments.of(new int[]{3, 2, 3, 1, 2, 4, 5, 5, 6}, 4, 4),
                Arguments.of(new int[]{1}, 1, 1),
                Arguments.of(new int[]{7, 6, 5, 4, 3, 2, 1}, 5, 3),
                Arguments.of(new int[]{1, 2, 3, 4, 5, 6, 7}, 1, 7),
                Arguments.of(new int[]{1, 2, 3, 4, 5, 6, 7}, 7, 1),
                Arguments.of(new int[]{5, 5, 5, 5}, 1, 5),
                Arguments.of(new int[]{5, 5, 5, 5}, 4, 5),
                Arguments.of(new int[]{-1, 2, 0}, 2, 0), // With negatives
                Arguments.of(new int[]{-5, -2, -10, -1}, 1, -1),
                Arguments.of(new int[]{-5, -2, -10, -1}, 4, -10),
                Arguments.of(new int[]{100, 200, 300, 150, 250}, 3, 200)
        );
    }

    @ParameterizedTest(name = "{index}: nums={0}, k={1}, expected={2}")
    @MethodSource("provideKthLargestTestCases")
    @DisplayName("Test findKthLargest_Sort method")
    void testFindKthLargest_Sort(int[] nums, int k, int expected) {
        assertEquals(expected, solution.findKthLargest_Sort(nums, k));
    }

    @ParameterizedTest(name = "{index}: nums={0}, k={1}, expected={2}")
    @MethodSource("provideKthLargestTestCases")
    @DisplayName("Test findKthLargest_MinHeap method")
    void testFindKthLargest_MinHeap(int[] nums, int k, int expected) {
        assertEquals(expected, solution.findKthLargest_MinHeap(nums, k));
    }

    @ParameterizedTest(name = "{index}: nums={0}, k={1}, expected={2}")
    @MethodSource("provideKthLargestTestCases")
    @DisplayName("Test findKthLargest_QuickSelect method")
    void testFindKthLargest_QuickSelect(int[] nums, int k, int expected) {
        // QuickSelect modifies the array, so pass a copy
        int[] numsCopy = nums.clone();
        assertEquals(expected, solution.findKthLargest_QuickSelect(numsCopy, k));
    }

    // --- Edge Cases and Invalid Inputs ---

    @ParameterizedTest(name = "{index}: nums={0}, k={1}")
    @MethodSource("provideInvalidKthLargestInputs")
    @DisplayName("Test invalid k or null/empty array inputs")
    void testInvalidInputs(int[] nums, int k, Class<? extends Exception> expectedException) {
        assertThrows(expectedException, () -> solution.findKthLargest_Sort(nums, k), "Sort method");
        assertThrows(expectedException, () -> solution.findKthLargest_MinHeap(nums, k), "MinHeap method");
        // For QuickSelect, pass a copy as it modifies the array
        assertThrows(expectedException, () -> solution.findKthLargest_QuickSelect(nums != null ? nums.clone() : null, k), "QuickSelect method");
    }

    private static Stream<Arguments> provideInvalidKthLargestInputs() {
        return Stream.of(
                Arguments.of(null, 1, IllegalArgumentException.class), // Null array
                Arguments.of(new int[]{}, 1, IllegalArgumentException.class), // Empty array
                Arguments.of(new int[]{1, 2, 3}, 0, IllegalArgumentException.class), // k is 0
                Arguments.of(new int[]{1, 2, 3}, 4, IllegalArgumentException.class), // k is greater than array length
                Arguments.of(new int[]{1, 2, 3}, -1, IllegalArgumentException.class) // k is negative
        );
    }
}
```