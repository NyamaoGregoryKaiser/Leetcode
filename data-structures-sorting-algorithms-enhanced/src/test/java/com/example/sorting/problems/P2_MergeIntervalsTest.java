```java
package com.example.sorting.problems;

import com.example.sorting.utils.Interval;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for P2_MergeIntervals.
 */
class P2_MergeIntervalsTest {

    private final P2_MergeIntervals solution = new P2_MergeIntervals();

    private static Stream<Arguments> provideMergeIntervalsTestCases() {
        return Stream.of(
                // Example 1
                Arguments.of(
                        new Interval[]{new Interval(1, 3), new Interval(2, 6), new Interval(8, 10), new Interval(15, 18)},
                        Arrays.asList(new Interval(1, 6), new Interval(8, 10), new Interval(15, 18))
                ),
                // Example 2
                Arguments.of(
                        new Interval[]{new Interval(1, 4), new Interval(4, 5)},
                        Arrays.asList(new Interval(1, 5))
                ),
                // No overlap
                Arguments.of(
                        new Interval[]{new Interval(1, 2), new Interval(3, 4), new Interval(5, 6)},
                        Arrays.asList(new Interval(1, 2), new Interval(3, 4), new Interval(5, 6))
                ),
                // All overlap
                Arguments.of(
                        new Interval[]{new Interval(1, 5), new Interval(0, 3), new Interval(2, 6)},
                        Arrays.asList(new Interval(0, 6))
                ),
                // Contains single interval
                Arguments.of(
                        new Interval[]{new Interval(1, 4)},
                        Arrays.asList(new Interval(1, 4))
                ),
                // Empty input
                Arguments.of(
                        new Interval[]{},
                        new ArrayList<>()
                ),
                // Overlapping and non-overlapping mixed
                Arguments.of(
                        new Interval[]{new Interval(1, 4), new Interval(0, 4)},
                        Arrays.asList(new Interval(0, 4))
                ),
                Arguments.of(
                        new Interval[]{new Interval(0, 0), new Interval(1, 1), new Interval(0, 0)},
                        Arrays.asList(new Interval(0, 0), new Interval(1, 1))
                ),
                Arguments.of(
                        new Interval[]{new Interval(1, 4), new Interval(0, 0)},
                        Arrays.asList(new Interval(0, 0), new Interval(1, 4))
                ),
                Arguments.of(
                        new Interval[]{new Interval(2, 3), new Interval(4, 5), new Interval(6, 7), new Interval(8, 9), new Interval(1, 10)},
                        Arrays.asList(new Interval(1, 10))
                ),
                Arguments.of(
                        new Interval[]{new Interval(4, 5), new Interval(1, 4), new Interval(0, 1)},
                        Arrays.asList(new Interval(0, 5))
                ),
                Arguments.of(
                        new Interval[]{new Interval(1, 3), new Interval(2, 4), new Interval(5, 7), new Interval(6, 8)},
                        Arrays.asList(new Interval(1, 4), new Interval(5, 8))
                )
        );
    }

    @ParameterizedTest(name = "{index}: intervals={0}, expected={1}")
    @MethodSource("provideMergeIntervalsTestCases")
    @DisplayName("Test merge method with various interval sets")
    void testMerge(Interval[] intervals, List<Interval> expected) {
        List<Interval> actual = solution.merge(intervals);
        // Convert to sorted lists of arrays for comparison if order matters or if Interval.equals() is not robust
        // But with Interval.compareTo and equals implemented, direct comparison is fine after sorting
        actual.sort(Interval::compareTo);
        expected.sort(Interval::compareTo);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Test merge method with null input array")
    void testMergeWithNullArray() {
        assertThrows(IllegalArgumentException.class, () -> solution.merge(null));
    }

    @Test
    @DisplayName("Test Interval utility class (overlapsWith, merge)")
    void testIntervalUtility() {
        Interval i1 = new Interval(1, 5);
        Interval i2 = new Interval(3, 7);
        Interval i3 = new Interval(6, 10);
        Interval i4 = new Interval(8, 9);
        Interval i5 = new Interval(1, 2);

        assertTrue(i1.overlapsWith(i2));
        assertTrue(i2.overlapsWith(i1));
        assertFalse(i1.overlapsWith(i3));
        assertTrue(i2.overlapsWith(i3)); // [3,7] overlaps with [6,10]
        assertFalse(i1.overlapsWith(i4));
        assertTrue(i1.overlapsWith(i5));

        assertEquals(new Interval(1, 7), i1.merge(i2));
        assertEquals(new Interval(1, 7), i2.merge(i1));
        assertEquals(new Interval(3, 10), i2.merge(i3));

        assertThrows(IllegalArgumentException.class, () -> i1.merge(i4)); // No overlap
    }

    @Test
    @DisplayName("Test Interval constructor with invalid range")
    void testIntervalInvalidConstruction() {
        assertThrows(IllegalArgumentException.class, () -> new Interval(5, 1));
    }
}
```