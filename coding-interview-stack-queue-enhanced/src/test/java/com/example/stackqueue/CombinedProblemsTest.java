```java
package com.example.stackqueue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

@DisplayName("Combined Stack/Queue Problems")
class CombinedProblemsTest {

    private CombinedProblems combinedProblems;

    @BeforeEach
    void setUp() {
        combinedProblems = new CombinedProblems();
    }

    @ParameterizedTest(name = "Nums: [{0}], k={1} -> Expected: [{2}]")
    @CsvSource({
            "'1,3,-1,-3,5,3,6,7', 3, '3,3,5,5,6,7'",
            "'1', 1, '1'",
            "'1,-1', 1, '1,-1'",
            "'9,11', 2, '11'",
            "'4,-2', 2, '4'",
            "'1,2,3,4,5', 3, '3,4,5'",
            "'5,4,3,2,1', 3, '5,4,3'",
            "'1,3,1,2,0,5', 3, '3,3,2,5'",
            "'0,0,0,0,0', 2, '0,0,0,0'",
            "'1,3,1,2,4,5', 3, '3,4,5'",
            "'7,2,4', 2, '7,4'",
            "'1,3,1,2,0,5', 1, '1,3,1,2,0,5'", // k=1
            "'1,3,-1,-3,5,3,6,7', 8, '7'" // k=n
    })
    void testMaxSlidingWindow(String numsStr, int k, String expectedResultStr) {
        int[] nums = parseToIntArray(numsStr);
        int[] expected = parseToIntArray(expectedResultStr);
        int[] actual = combinedProblems.maxSlidingWindow(nums, k);
        assertArrayEquals(expected, actual, "Failed for nums: " + numsStr + ", k: " + k);
    }

    @ParameterizedTest(name = "Nums: [{0}], k={1} -> Expected: [{2}]")
    @CsvSource({
            "'', 1, ''", // Empty array
            "'1,2,3', 0, ''", // k=0 (invalid)
            "'1,2,3', 4, ''" // k > n (invalid)
    })
    void testMaxSlidingWindowEdgeCases(String numsStr, int k, String expectedResultStr) {
        int[] nums = parseToIntArray(numsStr);
        int[] expected = parseToIntArray(expectedResultStr);
        int[] actual = combinedProblems.maxSlidingWindow(nums, k);
        assertArrayEquals(expected, actual, "Failed for edge case nums: " + numsStr + ", k: " + k);
    }


    private int[] parseToIntArray(String s) {
        if (s == null || s.trim().isEmpty()) {
            return new int[0];
        }
        String[] parts = s.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}
```