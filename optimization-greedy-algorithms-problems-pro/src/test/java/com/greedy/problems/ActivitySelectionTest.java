package com.greedy.problems;

import com.greedy.utils.DataStructures.Activity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Unit tests for the {@link ActivitySelection} class.
 * Tests various scenarios to ensure the greedy algorithm correctly selects
 * the maximum number of non-overlapping activities.
 */
public class ActivitySelectionTest {

    private ActivitySelection solver;

    @BeforeEach
    void setUp() {
        solver = new ActivitySelection();
    }

    @Test
    void testEmptyActivities() {
        Activity[] activities = {};
        List<Activity> result = solver.selectActivities(activities);
        assertTrue(result.isEmpty(), "Result should be empty for empty input.");
    }

    @Test
    void testNullActivities() {
        Activity[] activities = null;
        List<Activity> result = solver.selectActivities(activities);
        assertTrue(result.isEmpty(), "Result should be empty for null input.");
    }

    @Test
    void testSingleActivity() {
        Activity[] activities = {new Activity(1, 10)};
        List<Activity> expected = Collections.singletonList(new Activity(1, 10));
        List<Activity> result = solver.selectActivities(activities);
        assertEquals(expected, result, "Single activity should always be selected.");
    }

    @Test
    void testAllNonOverlappingActivities() {
        Activity[] activities = {
                new Activity(0, 1),
                new Activity(1, 2),
                new Activity(2, 3),
                new Activity(3, 4)
        };
        List<Activity> expected = Arrays.asList(
                new Activity(0, 1),
                new Activity(1, 2),
                new Activity(2, 3),
                new Activity(3, 4)
        );
        List<Activity> result = solver.selectActivities(activities);
        assertEquals(expected.size(), result.size());
        assertTrue(result.containsAll(expected) && expected.containsAll(result), "All non-overlapping activities should be selected.");
    }

    @Test
    void testAllOverlappingActivities() {
        Activity[] activities = {
                new Activity(0, 10),
                new Activity(1, 9),
                new Activity(2, 8),
                new Activity(3, 7)
        };
        // After sorting by finish time: (3,7), (2,8), (1,9), (0,10)
        // Expected: only (3,7)
        List<Activity> expected = Collections.singletonList(new Activity(3, 7));
        List<Activity> result = solver.selectActivities(activities);
        assertEquals(expected, result, "Only one activity should be selected from a fully overlapping set.");
    }

    @Test
    void testMixedActivitiesStandardCase() {
        Activity[] activities = {
                new Activity(1, 4), new Activity(3, 5), new Activity(0, 6),
                new Activity(5, 7), new Activity(3, 8), new Activity(5, 9),
                new Activity(6, 10), new Activity(8, 11), new Activity(8, 12),
                new Activity(2, 13), new Activity(12, 14)
        };
        // Sorted by finish time:
        // (1,4), (3,5), (0,6), (5,7), (3,8), (5,9), (6,10), (8,11), (8,12), (2,13), (12,14)
        // Select:
        // 1. (1,4) -> lastFinish = 4
        // 2. (5,7) (since 5 >= 4) -> lastFinish = 7
        // 3. (8,11) (since 8 >= 7) -> lastFinish = 11
        // 4. (12,14) (since 12 >= 11) -> lastFinish = 14
        List<Activity> expected = Arrays.asList(
                new Activity(1, 4),
                new Activity(5, 7),
                new Activity(8, 11),
                new Activity(12, 14)
        );
        List<Activity> result = solver.selectActivities(activities);
        assertEquals(expected.size(), result.size(), "Incorrect number of activities selected.");
        assertTrue(result.containsAll(expected) && expected.containsAll(result), "Incorrect activities selected for standard case.");
    }

    @Test
    void testActivitiesWithSameFinishTime() {
        Activity[] activities = {
                new Activity(1, 5),
                new Activity(0, 5), // Same finish time as (1,5)
                new Activity(6, 10)
        };
        // Sorted by finish time: (0,5), (1,5), (6,10) (order between 0,5 and 1,5 can vary but doesn't impact max count)
        // If (0,5) is picked first: then (6,10)
        // If (1,5) is picked first: then (6,10)
        List<Activity> expected1 = Arrays.asList(new Activity(0, 5), new Activity(6, 10));
        List<Activity> expected2 = Arrays.asList(new Activity(1, 5), new Activity(6, 10));

        List<Activity> result = solver.selectActivities(activities);
        assertEquals(2, result.size());
        assertTrue(result.equals(expected1) || result.equals(expected2), "Should pick two activities.");
    }

    @Test
    void testActivitiesWithZeroDuration() {
        Activity[] activities = {
                new Activity(1, 1),
                new Activity(1, 2),
                new Activity(2, 2),
                new Activity(3, 3)
        };
        // Sorted by finish time: (1,1), (2,2), (1,2), (3,3)
        // Select:
        // 1. (1,1) -> lastFinish = 1
        // 2. (2,2) (since 2 >= 1) -> lastFinish = 2
        // 3. (3,3) (since 3 >= 2) -> lastFinish = 3
        List<Activity> expected = Arrays.asList(
                new Activity(1, 1),
                new Activity(2, 2),
                new Activity(3, 3)
        );
        List<Activity> result = solver.selectActivities(activities);
        assertEquals(expected.size(), result.size());
        assertTrue(result.containsAll(expected) && expected.containsAll(result), "Should handle zero duration activities.");
    }

    @Test
    void testActivitiesAlreadySorted() {
        // Test `selectActivities` which re-sorts
        Activity[] activities = {
                new Activity(1, 2),
                new Activity(3, 4),
                new Activity(5, 6),
                new Activity(7, 8)
        };
        List<Activity> expected = Arrays.asList(activities);
        List<Activity> result = solver.selectActivities(activities);
        assertEquals(expected, result, "Should work correctly for already sorted activities.");
    }

    @Test
    void testActivitiesUnsortedInputWithGaps() {
        Activity[] activities = {
                new Activity(10, 20),
                new Activity(1, 2),
                new Activity(3, 4),
                new Activity(5, 6)
        };
        // Sorted by finish time: (1,2), (3,4), (5,6), (10,20)
        // Expected: (1,2), (3,4), (5,6), (10,20)
        List<Activity> expected = Arrays.asList(
                new Activity(1, 2),
                new Activity(3, 4),
                new Activity(5, 6),
                new Activity(10, 20)
        );
        List<Activity> result = solver.selectActivities(activities);
        assertEquals(expected.size(), result.size());
        assertTrue(result.containsAll(expected) && expected.containsAll(result), "Should handle unsorted input with gaps.");
    }

    @Test
    void testSelectActivities_sortedInputMethod() {
        // This method assumes the input is already sorted.
        // For testing, we pre-sort the array explicitly.
        Activity[] activities = {
                new Activity(1, 4), new Activity(3, 5), new Activity(0, 6),
                new Activity(5, 7), new Activity(3, 8), new Activity(5, 9),
                new Activity(6, 10), new Activity(8, 11), new Activity(8, 12),
                new Activity(2, 13), new Activity(12, 14)
        };
        Arrays.sort(activities, (a, b) -> Integer.compare(a.finish, b.finish));

        List<Activity> expected = Arrays.asList(
                new Activity(1, 4),
                new Activity(5, 7),
                new Activity(8, 11),
                new Activity(12, 14)
        );
        List<Activity> result = solver.selectActivities_sortedInput(activities);
        assertEquals(expected.size(), result.size());
        assertTrue(result.containsAll(expected) && expected.containsAll(result), "Incorrect activities selected for pre-sorted input.");
    }
}