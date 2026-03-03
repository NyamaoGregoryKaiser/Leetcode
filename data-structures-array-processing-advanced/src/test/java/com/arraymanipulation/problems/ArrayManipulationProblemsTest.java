```java
package com.arraymanipulation.problems;

import com.arraymanipulation.utils.ArrayUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for {@link ArrayManipulationProblems}.
 * Uses JUnit 5 for comprehensive testing across different approaches and edge cases.
 */
@DisplayName("Array Manipulation Problems Tests")
class ArrayManipulationProblemsTest {

    private ArrayManipulationProblems problems;

    @BeforeEach
    void setUp() {
        problems = new ArrayManipulationProblems();
    }

    @Nested
    @DisplayName("Problem 1: Rotate Array")
    class RotateArrayTest {

        private static Stream<Arguments> rotateArrayTestCases() {
            return Stream.of(
                    Arguments.of(new int[]{1, 2, 3, 4, 5, 6, 7}, 3, new int[]{5, 6, 7, 1, 2, 3, 4}),
                    Arguments.of(new int[]{-1, -100, 3, 99}, 2, new int[]{3, 99, -1, -100}),
                    Arguments.of(new int[]{1, 2}, 3, new int[]{2, 1}), // k > n
                    Arguments.of(new int[]{1, 2, 3, 4, 5}, 5, new int[]{1, 2, 3, 4, 5}), // k = n
                    Arguments.of(new int[]{1}, 0, new int[]{1}), // single element, k=0
                    Arguments.of(new int[]{1}, 5, new int[]{1}), // single element, k > n
                    Arguments.of(new int[]{1, 2, 3}, 0, new int[]{1, 2, 3}), // k=0
                    Arguments.of(new int[]{}, 1, new int[]{}), // empty array
                    Arguments.of(new int[]{1,2,3,4,5,6,7,8,9,10}, 1, new int[]{10,1,2,3,4,5,6,7,8,9}) // k=1
            );
        }

        @ParameterizedTest(name = "Input: {0}, k={1} -> Expected: {2}")
        @MethodSource("rotateArrayTestCases")
        void testRotateArrayBruteForce(int[] original, int k, int[] expected) {
            int[] nums = ArrayUtils.deepCopy(original);
            problems.rotateArray(nums, k, SolutionApproach.BRUTE_FORCE);
            assertArrayEquals(expected, nums);
        }

        @ParameterizedTest(name = "Input: {0}, k={1} -> Expected: {2}")
        @MethodSource("rotateArrayTestCases")
        void testRotateArrayExtraSpace(int[] original, int k, int[] expected) {
            int[] nums = ArrayUtils.deepCopy(original);
            problems.rotateArray(nums, k, SolutionApproach.EXTRA_SPACE);
            assertArrayEquals(expected, nums);
        }

        @ParameterizedTest(name = "Input: {0}, k={1} -> Expected: {2}")
        @MethodSource("rotateArrayTestCases")
        void testRotateArrayReversal(int[] original, int k, int[] expected) {
            int[] nums = ArrayUtils.deepCopy(original);
            problems.rotateArray(nums, k, SolutionApproach.REVERSAL);
            assertArrayEquals(expected, nums);
        }

        @Test
        void testRotateArrayNullInput() {
            int[] nums = null;
            problems.rotateArray(nums, 1, SolutionApproach.REVERSAL);
            assertNull(nums); // Should not throw exception, array remains null
        }

        @Test
        void testRotateArrayNegativeK() {
            int[] nums = {1,2,3};
            int[] original = ArrayUtils.deepCopy(nums);
            problems.rotateArray(nums, -1, SolutionApproach.REVERSAL); // k=-1, should return immediately
            assertArrayEquals(original, nums);
        }
    }

    @Nested
    @DisplayName("Problem 2: Maximum Subarray Sum")
    class MaxSubArraySumTest {

        private static Stream<Arguments> maxSubArrayTestCases() {
            return Stream.of(
                    Arguments.of(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4}, 6),
                    Arguments.of(new int[]{1}, 1),
                    Arguments.of(new int[]{5, 4, -1, 7, 8}, 23),
                    Arguments.of(new int[]{0}, 0),
                    Arguments.of(new int[]{-1}, -1),
                    Arguments.of(new int[]{-5, -1, -3, -2, -4}, -1), // All negatives
                    Arguments.of(new int[]{1, 2, 3, -10, 4, 5, 6}, 15), // Subarray [4,5,6]
                    Arguments.of(new int[]{1, 2, 3, -10, 10, 1, 2}, 13) // Subarray [10,1,2]
            );
        }

        @ParameterizedTest(name = "Input: {0} -> Expected Max Sum: {1}")
        @MethodSource("maxSubArrayTestCases")
        void testMaxSubArrayBruteForce(int[] nums, int expected) {
            assertEquals(expected, problems.maxSubArray(nums, SolutionApproach.BRUTE_FORCE));
        }

        @ParameterizedTest(name = "Input: {0} -> Expected Max Sum: {1}")
        @MethodSource("maxSubArrayTestCases")
        void testMaxSubArrayKadane(int[] nums, int expected) {
            assertEquals(expected, problems.maxSubArray(nums, SolutionApproach.KADANES_ALGORITHM));
        }

        @Test
        void testMaxSubArrayEmptyInput() {
            assertThrows(IllegalArgumentException.class, () -> problems.maxSubArray(new int[]{}, SolutionApproach.KADANES_ALGORITHM));
        }

        @Test
        void testMaxSubArrayNullInput() {
            assertThrows(IllegalArgumentException.class, () -> problems.maxSubArray(null, SolutionApproach.KADANES_ALGORITHM));
        }
    }

    @Nested
    @DisplayName("Problem 3: Trapping Rain Water")
    class TrapRainWaterTest {

        private static Stream<Arguments> trapRainWaterTestCases() {
            return Stream.of(
                    Arguments.of(new int[]{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}, 6),
                    Arguments.of(new int[]{4, 2, 0, 3, 2, 5}, 9),
                    Arguments.of(new int[]{0, 0, 0, 0, 0}, 0), // All zeros
                    Arguments.of(new int[]{1, 2, 3, 4, 5}, 0), // Increasing sequence
                    Arguments.of(new int[]{5, 4, 3, 2, 1}, 0), // Decreasing sequence
                    Arguments.of(new int[]{2, 0, 2}, 2), // Simple trap
                    Arguments.of(new int[]{3, 0, 0, 2, 0, 4}, 10),
                    Arguments.of(new int[]{4, 2, 3}, 1)
            );
        }

        @ParameterizedTest(name = "Input: {0} -> Expected Trapped Water: {1}")
        @MethodSource("trapRainWaterTestCases")
        void testTrapRainWaterBruteForce(int[] height, int expected) {
            assertEquals(expected, problems.trapRainWater(height, SolutionApproach.BRUTE_FORCE));
        }

        @ParameterizedTest(name = "Input: {0} -> Expected Trapped Water: {1}")
        @MethodSource("trapRainWaterTestCases")
        void testTrapRainWaterDP(int[] height, int expected) {
            assertEquals(expected, problems.trapRainWater(height, SolutionApproach.DYNAMIC_PROGRAMMING));
        }

        @ParameterizedTest(name = "Input: {0} -> Expected Trapped Water: {1}")
        @MethodSource("trapRainWaterTestCases")
        void testTrapRainWaterTwoPointers(int[] height, int expected) {
            assertEquals(expected, problems.trapRainWater(height, SolutionApproach.TWO_POINTERS));
        }

        @Test
        void testTrapRainWaterEmptyInput() {
            assertEquals(0, problems.trapRainWater(new int[]{}, SolutionApproach.TWO_POINTERS));
        }

        @Test
        void testTrapRainWaterSmallInput() {
            assertEquals(0, problems.trapRainWater(new int[]{1}, SolutionApproach.TWO_POINTERS));
            assertEquals(0, problems.trapRainWater(new int[]{1, 2}, SolutionApproach.TWO_POINTERS));
        }

        @Test
        void testTrapRainWaterNullInput() {
            assertEquals(0, problems.trapRainWater(null, SolutionApproach.TWO_POINTERS));
        }
    }

    @Nested
    @DisplayName("Problem 4: Product of Array Except Self")
    class ProductExceptSelfTest {

        private static Stream<Arguments> productExceptSelfTestCases() {
            return Stream.of(
                    Arguments.of(new int[]{1, 2, 3, 4}, new int[]{24, 12, 8, 6}),
                    Arguments.of(new int[]{-1, 1, 0, -3, 3}, new int[]{0, 0, 9, 0, 0}), // One zero
                    Arguments.of(new int[]{0, 0}, new int[]{0, 0}), // Two zeros
                    Arguments.of(new int[]{0, 1}, new int[]{1, 0}), // One zero at start
                    Arguments.of(new int[]{1, 0}, new int[]{0, 1}), // One zero at end
                    Arguments.of(new int[]{1, 2}, new int[]{2, 1}),
                    Arguments.of(new int[]{7}, new int[]{1}) // Single element
            );
        }

        @ParameterizedTest(name = "Input: {0} -> Expected: {1}")
        @MethodSource("productExceptSelfTestCases")
        void testProductExceptSelfBruteForce(int[] nums, int[] expected) {
            // Note: BruteForce method in the problem class also handles zeros,
            // so this test applies to its specific zero-handling logic.
            assertArrayEquals(expected, problems.productExceptSelf(nums, SolutionApproach.BRUTE_FORCE));
        }

        @ParameterizedTest(name = "Input: {0} -> Expected: {1}")
        @MethodSource("productExceptSelfTestCases")
        void testProductExceptSelfTwoPass(int[] nums, int[] expected) {
            assertArrayEquals(expected, problems.productExceptSelf(nums, SolutionApproach.OPTIMIZED));
        }

        @Test
        void testProductExceptSelfEmptyInput() {
            assertArrayEquals(new int[]{}, problems.productExceptSelf(new int[]{}, SolutionApproach.OPTIMIZED));
        }

        @Test
        void testProductExceptSelfNullInput() {
            assertArrayEquals(new int[]{}, problems.productExceptSelf(null, SolutionApproach.OPTIMIZED));
        }
    }
}
```