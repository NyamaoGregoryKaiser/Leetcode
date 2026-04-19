```java
package com.example.binarysearch.core;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BinarySearchRecursiveTest {

    private final BinarySearchRecursive binarySearch = new BinarySearchRecursive();

    static Stream<Arguments> searchTestCases() {
        return Stream.of(
                // Target found
                Arguments.of(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, 5, 4),
                Arguments.of(new int[]{1, 3, 5, 7, 9}, 1, 0), // First element
                Arguments.of(new int[]{1, 3, 5, 7, 9}, 9, 4), // Last element
                Arguments.of(new int[]{10, 20, 30, 40, 50}, 30, 2),
                Arguments.of(new int[]{100}, 100, 0), // Single element array

                // Target not found
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 6, -1),
                Arguments.of(new int[]{1, 3, 5, 7, 9}, 2, -1),
                Arguments.of(new int[]{10, 20, 30, 40, 50}, 0, -1),
                Arguments.of(new int[]{100}, 50, -1),

                // Edge cases
                Arguments.of(new int[]{}, 5, -1), // Empty array
                Arguments.of(null, 5, -1), // Null array
                Arguments.of(new int[]{1, 1, 1, 1, 1}, 1, 2) // Array with duplicates, any index is fine for standard BS
        );
    }

    @ParameterizedTest(name = "Search for {1} in {0} should return {2}")
    @MethodSource("searchTestCases")
    @DisplayName("Test recursive binary search with various cases")
    void testSearch(int[] arr, int target, int expected) {
        assertEquals(expected, binarySearch.search(arr, target));
    }

    @Test
    @DisplayName("Test with large array and target found")
    void testLargeArrayTargetFound() {
        int[] largeArr = new int[1000000];
        for (int i = 0; i < largeArr.length; i++) {
            largeArr[i] = i * 2; // Even numbers
        }
        assertEquals(50000, binarySearch.search(largeArr, 100000));
        assertEquals(0, binarySearch.search(largeArr, 0));
        assertEquals(999999, binarySearch.search(largeArr, 1999998));
    }

    @Test
    @DisplayName("Test with large array and target not found")
    void testLargeArrayTargetNotFound() {
        int[] largeArr = new int[1000000];
        for (int i = 0; i < largeArr.length; i++) {
            largeArr[i] = i * 2; // Even numbers
        }
        assertEquals(-1, binarySearch.search(largeArr, 100001)); // Odd number
        assertEquals(-1, binarySearch.search(largeArr, -1)); // Smaller than min
        assertEquals(-1, binarySearch.search(largeArr, 2000000)); // Larger than max
    }
}
```