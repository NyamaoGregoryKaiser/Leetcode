```java
package com.greedy.problems;

import com.greedy.problems.ActivitySelection.Activity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test class for ActivitySelection.java
 */
public class ActivitySelectionTest {

    private ActivitySelection activitySelection;

    @BeforeEach
    void setUp() {
        activitySelection = new ActivitySelection();
    }

    private List<String> getActivityIds(List<Activity> activities) {
        if (activities == null) return Collections.emptyList();
        return activities.stream()
                .map(Activity::getId)
                .map(id -> String.valueOf((char)('A' + id -1))) // Convert back to A, B, C etc. for cleaner test
                .collect(Collectors.toList());
    }

    @Test
    @DisplayName("Test Case 1: Standard example from CLRS")
    void testStandardCase1() {
        // Activities: (start, finish) -> (id, start, finish)
        List<Activity> activities = Arrays.asList(
                new Activity(1, 1, 4), // A1
                new Activity(2, 3, 5), // A2
                new Activity(3, 0, 6), // A3
                new Activity(4, 5, 7), // A4
                new Activity(5, 3, 8), // A5
                new Activity(6, 5, 9), // A6
                new Activity(7, 6, 10),// A7
                new Activity(8, 8, 11),// A8
                new Activity(9, 8, 12),// A9
                new Activity(10, 2, 13),// A10
                new Activity(11, 12, 14) // A11
        );

        List<Activity> selected = activitySelection.selectActivitiesGreedy(activities);
        // Expected selection (A1, A4, A8, A11) if sorted by finish time first.
        // (1,4), (5,7), (8,11), (12,14)
        List<String> expectedIds = Arrays.asList("A", "D", "H", "K"); // Based on original IDs
        List<String> actualIds = selected.stream()
                .map(a -> String.valueOf((char)('A' + a.id - 1)))
                .collect(Collectors.toList());

        assertEquals(4, selected.size());
        assertEquals(expectedIds, actualIds);
    }

    @Test
    @DisplayName("Test Case 2: Activities already sorted by finish time")
    void testAlreadySorted() {
        List<Activity> activities = Arrays.asList(
                new Activity(1, 1, 2),
                new Activity(2, 3, 4),
                new Activity(3, 0, 6), // This one would be ignored by greedy (0,6) because (1,2) finishes earlier
                new Activity(4, 5, 7),
                new Activity(5, 8, 9)
        );

        List<Activity> selected = activitySelection.selectActivitiesGreedy(activities);
        // Expected: A(1,2), B(3,4), D(5,7), E(8,9)
        List<String> expectedIds = Arrays.asList("A", "B", "D", "E");
        List<String> actualIds = selected.stream()
                .map(a -> String.valueOf((char)('A' + a.id - 1)))
                .collect(Collectors.toList());

        assertEquals(4, selected.size());
        assertEquals(expectedIds, actualIds);
    }

    @Test
    @DisplayName("Test Case 3: Activities with same finish times (tie-breaking)")
    void testSameFinishTimes() {
        List<Activity> activities = Arrays.asList(
                new Activity(1, 1, 5),
                new Activity(2, 2, 5), // Will be sorted after A1 if only by finish time, or by start time
                new Activity(3, 5, 8),
                new Activity(4, 6, 8)
        );

        List<Activity> selected = activitySelection.selectActivitiesGreedy(activities);
        // Sorted: (1,5), (2,5), (5,8), (6,8)
        // Select (1,5). Next (5,8).
        List<String> expectedIds = Arrays.asList("A", "C"); // A(1,5), C(5,8)
        List<String> actualIds = selected.stream()
                .map(a -> String.valueOf((char)('A' + a.id - 1)))
                .collect(Collectors.toList());
        assertEquals(2, selected.size());
        assertEquals(expectedIds, actualIds);
    }

    @Test
    @DisplayName("Test Case 4: No activities")
    void testEmptyList() {
        List<Activity> activities = Collections.emptyList();
        List<Activity> selected = activitySelection.selectActivitiesGreedy(activities);
        assertTrue(selected.isEmpty());
    }

    @Test
    @DisplayName("Test Case 5: Single activity")
    void testSingleActivity() {
        List<Activity> activities = Collections.singletonList(new Activity(1, 10, 20));
        List<Activity> selected = activitySelection.selectActivitiesGreedy(activities);
        assertEquals(1, selected.size());
        assertEquals(1, selected.get(0).id);
    }

    @Test
    @DisplayName("Test Case 6: All activities overlapping")
    void testAllOverlapping() {
        List<Activity> activities = Arrays.asList(
                new Activity(1, 1, 10),
                new Activity(2, 2, 8),
                new Activity(3, 3, 9)
        );
        List<Activity> selected = activitySelection.selectActivitiesGreedy(activities);
        // Sorted by finish: A2(2,8), A3(3,9), A1(1,10)
        // Select A2(2,8). No other activities can be selected.
        assertEquals(1, selected.size());
        assertEquals(2, selected.get(0).id); // Activity with ID 2 (B)
    }

    @Test
    @DisplayName("Test Case 7: Activities where start time is equal to last finish time")
    void testStartEqualsLastFinish() {
        List<Activity> activities = Arrays.asList(
                new Activity(1, 1, 2),
                new Activity(2, 2, 3),
                new Activity(3, 3, 4)
        );
        List<Activity> selected = activitySelection.selectActivitiesGreedy(activities);
        assertEquals(3, selected.size());
        assertEquals(Arrays.asList("A", "B", "C"), selected.stream().map(a -> String.valueOf((char)('A' + a.id - 1))).collect(Collectors.toList()));
    }

    @Test
    @DisplayName("Test Case 8: Complex Scenario with many activities")
    void testComplexScenario() {
        List<Activity> activities = Arrays.asList(
                new Activity(1, 0, 6),
                new Activity(2, 1, 2),
                new Activity(3, 1, 3),
                new Activity(4, 2, 4),
                new Activity(5, 3, 5),
                new Activity(6, 4, 7),
                new Activity(7, 5, 8),
                new Activity(8, 7, 9),
                new Activity(9, 8, 10),
                new Activity(10, 9, 11),
                new Activity(11, 10, 12)
        );

        List<Activity> selected = activitySelection.selectActivitiesGreedy(activities);
        // Sorted by finish:
        // (2, 1,2), (3, 1,3), (4, 2,4), (5, 3,5), (1, 0,6), (6, 4,7), (7, 5,8), (8, 7,9), (9, 8,10), (10, 9,11), (11, 10,12)
        // Expected: A2(1,2), A4(2,4), A5(3,5) (wait, A5 cannot be after A4), A6(4,7)...
        // Correct selection:
        // (2, 1,2)
        // Next: A4(2,4) (2 >= 2)
        // Next: A6(4,7) (4 >= 4)
        // Next: A8(7,9) (7 >= 7)
        // Next: A10(9,11) (9 >= 9)
        // Expected IDs: B, D, F, H, J
        List<String> expectedIds = Arrays.asList("B", "D", "F", "H", "J");
        List<String> actualIds = selected.stream()
                .map(a -> String.valueOf((char)('A' + a.id - 1)))
                .collect(Collectors.toList());

        assertEquals(5, selected.size());
        assertEquals(expectedIds, actualIds);
    }
}
```