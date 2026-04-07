```typescript
/**
 * tests/activity-selection.test.ts
 *
 * Test suite for the Activity Selection Problem.
 */

import { Activity, selectActivities } from '../src/algorithms/activity-selection';
import { deepClone, shuffleArray } from '../src/utils/helpers';

describe('Activity Selection Problem', () => {

    // Helper to generate activities for a test case
    const createActivity = (id: number | string, start: number, finish: number): Activity => ({ id, start, finish });

    // Test case 1: Basic scenario with clear non-overlapping activities
    test('should select maximum non-overlapping activities for a simple case', () => {
        const activities: Activity[] = [
            createActivity(1, 1, 4),
            createActivity(2, 3, 5),
            createActivity(3, 0, 6),
            createActivity(4, 5, 7),
            createActivity(5, 3, 9),
            createActivity(6, 5, 9),
            createActivity(7, 6, 10),
            createActivity(8, 8, 11),
            createActivity(9, 8, 12),
            createActivity(10, 2, 14),
            createActivity(11, 12, 16),
        ];

        // The expected activities, sorted by finish time, and then picked greedily
        const expectedSelected: Activity[] = [
            createActivity(1, 1, 4),   // Finishes at 4
            createActivity(4, 5, 7),   // Starts at 5, after 4
            createActivity(8, 8, 11),  // Starts at 8, after 7
            createActivity(11, 12, 16),// Starts at 12, after 11
        ];

        const result = selectActivities(activities);
        expect(result.length).toBe(expectedSelected.length);
        expect(result).toEqual(expect.arrayContaining(expectedSelected)); // Order might differ based on secondary sort, but content should match
    });

    // Test case 2: Activities with same finish times
    test('should handle activities with the same finish times correctly', () => {
        const activities: Activity[] = [
            createActivity('A', 1, 5),
            createActivity('B', 0, 5), // Same finish time as A, but earlier start
            createActivity('C', 6, 10),
            createActivity('D', 5, 10), // Same finish time as C, but earlier start
        ];
        // Sorted by finish, then start: B (0,5), A (1,5), D (5,10), C (6,10)
        // Select B (0,5). Last finish = 5
        // Select D (5,10). Starts at 5, after 5. Last finish = 10
        const expectedSelected: Activity[] = [
            createActivity('B', 0, 5),
            createActivity('D', 5, 10),
        ];

        const result = selectActivities(activities);
        expect(result.length).toBe(expectedSelected.length);
        expect(result).toEqual(expect.arrayContaining(expectedSelected));
    });

    // Test case 3: All activities overlap heavily
    test('should select only one activity if all activities overlap', () => {
        const activities: Activity[] = [
            createActivity('A', 1, 10),
            createActivity('B', 2, 9),
            createActivity('C', 3, 8),
            createActivity('D', 4, 7),
        ];
        // Sorted by finish: D (4,7), C (3,8), B (2,9), A (1,10)
        // Select D (4,7). Last finish = 7
        // All others start before or at 7 and finish later, none compatible.
        const expectedSelected: Activity[] = [
            createActivity('D', 4, 7),
        ];

        const result = selectActivities(activities);
        expect(result.length).toBe(expectedSelected.length);
        expect(result).toEqual(expect.arrayContaining(expectedSelected));
    });

    // Test case 4: No activities
    test('should return an empty array for no activities', () => {
        const activities: Activity[] = [];
        expect(selectActivities(activities)).toEqual([]);
    });

    // Test case 5: Single activity
    test('should return the single activity if only one exists', () => {
        const activity: Activity = createActivity('A', 10, 20);
        expect(selectActivities([activity])).toEqual([activity]);
    });

    // Test case 6: All activities are compatible (no overlaps)
    test('should select all activities if they are all compatible', () => {
        const activities: Activity[] = [
            createActivity('A', 1, 2),
            createActivity('B', 2, 3),
            createActivity('C', 3, 4),
            createActivity('D', 4, 5),
        ];
        // Already sorted by finish time and compatible.
        const expectedSelected = deepClone(activities); // Deep clone to prevent mutation issues

        const result = selectActivities(activities);
        expect(result.length).toBe(expectedSelected.length);
        // Ensure the order is the same as the sorted input due to greedy selection
        expect(result).toEqual(expectedSelected);
    });

    // Test case 7: Activities with zero duration
    test('should handle activities with zero duration', () => {
        const activities: Activity[] = [
            createActivity('A', 1, 1),
            createActivity('B', 1, 2), // Overlaps A
            createActivity('C', 2, 2), // Compatible with B (starts at 2, B finishes at 2)
            createActivity('D', 2, 3), // Overlaps C
        ];
        // Sorted by finish, then start: A (1,1), C (2,2), B (1,2), D (2,3)
        // Select A (1,1). Last finish = 1
        // B (1,2) starts at 1, after 1. Select B. Last finish = 2
        // C (2,2) starts at 2, after 2. Select C. Last finish = 2
        // D (2,3) starts at 2, after 2. Select D. Last finish = 3
        const expectedSelected: Activity[] = [
            createActivity('A', 1, 1),
            createActivity('B', 1, 2), // Note: (1,1) (1,2) are selected if start >= lastFinishTime. A's finish is 1, B's start is 1. So compatible.
            createActivity('C', 2, 2), // After (1,2), compatible (start 2 >= finish 2)
            createActivity('D', 2, 3), // After (2,2), compatible (start 2 >= finish 2)
        ];
        // Wait, the logic is `currentActivity.start >= lastFinishTime`.
        // A (1,1) -> Last finish = 1
        // B (1,2): Start 1 >= Last finish 1. Select B. Last finish = 2.
        // C (2,2): Start 2 >= Last finish 2. Select C. Last finish = 2.
        // D (2,3): Start 2 >= Last finish 2. Select D. Last finish = 3.
        // This means all will be selected if (start == finish) is allowed.
        // The problem typically assumes strictly non-overlapping, meaning `start > lastFinishTime`.
        // If `start >= lastFinishTime` is allowed, then activities can touch.
        // Let's re-verify the standard definition. Often, it's `start_i >= finish_j`.
        // Yes, `start >= finish` is common and means activities can "touch" at an instant.
        // The provided solution `currentActivity.start >= lastFinishTime` implements this.
        // Let's manually trace the actual `selectActivities` behavior with the sort rule:
        // Input: A(1,1), B(1,2), C(2,2), D(2,3)
        // Sorted: A(1,1), C(2,2), B(1,2), D(2,3)  (finish, then start)
        // 1. Select A(1,1). `selected = [A]`, `lastFinishTime = 1`
        // 2. C(2,2): `C.start(2) >= lastFinishTime(1)` -> TRUE. Select C. `selected = [A,C]`, `lastFinishTime = 2`
        // 3. B(1,2): `B.start(1) >= lastFinishTime(2)` -> FALSE. Skip B.
        // 4. D(2,3): `D.start(2) >= lastFinishTime(2)` -> TRUE. Select D. `selected = [A,C,D]`, `lastFinishTime = 3`
        // Result: [A(1,1), C(2,2), D(2,3)]
        // This is correct according to the greedy rule with `start >= finish`.

        const expectedSelected: Activity[] = [
            createActivity('A', 1, 1),
            createActivity('C', 2, 2),
            createActivity('D', 2, 3),
        ];
        const result = selectActivities(activities);
        expect(result.length).toBe(expectedSelected.length);
        expect(result).toEqual(expect.arrayContaining(expectedSelected));
    });

    // Test case 8: Large number of random activities
    test('should work for a large set of random activities', () => {
        const numActivities = 1000;
        const maxTime = 5000; // Max finish time
        const activities: Activity[] = [];
        for (let i = 0; i < numActivities; i++) {
            const start = Math.floor(Math.random() * maxTime);
            const finish = start + Math.floor(Math.random() * 100) + 1; // Ensure finish > start
            activities.push(createActivity(i, start, finish));
        }

        const result = selectActivities(activities);
        expect(result.length).toBeGreaterThan(0); // Should select at least one
        // Verify no overlaps in the result
        let lastFinish = -Infinity;
        for (const activity of result) {
            expect(activity.start).toBeGreaterThanOrEqual(lastFinish);
            lastFinish = activity.finish;
        }
    });

    // Test case 9: Activities with negative times (should still work as relative times)
    test('should handle activities with negative start/finish times', () => {
        const activities: Activity[] = [
            createActivity('A', -5, -2),
            createActivity('B', -3, 0),
            createActivity('C', -1, 3),
            createActivity('D', 0, 1),
            createActivity('E', 2, 4)
        ];
        // Sorted by finish: A(-5,-2), B(-3,0), D(0,1), C(-1,3), E(2,4)
        // 1. Select A(-5,-2). lastFinish = -2
        // 2. B(-3,0): Start -3 >= -2 -> FALSE. Skip.
        // 3. D(0,1): Start 0 >= -2 -> TRUE. Select D. lastFinish = 1
        // 4. C(-1,3): Start -1 >= 1 -> FALSE. Skip.
        // 5. E(2,4): Start 2 >= 1 -> TRUE. Select E. lastFinish = 4
        const expectedSelected: Activity[] = [
            createActivity('A', -5, -2),
            createActivity('D', 0, 1),
            createActivity('E', 2, 4)
        ];
        const result = selectActivities(activities);
        expect(result.length).toBe(expectedSelected.length);
        expect(result).toEqual(expect.arrayContaining(expectedSelected));
    });

    // Test case 10: Input order does not affect the output
    test('should produce the same result regardless of initial input order', () => {
        const originalActivities: Activity[] = [
            createActivity('A', 1, 4),
            createActivity('B', 3, 5),
            createActivity('C', 0, 6),
            createActivity('D', 5, 7),
            createActivity('E', 3, 9),
            createActivity('F', 5, 9),
            createActivity('G', 6, 10),
            createActivity('H', 8, 11),
            createActivity('I', 8, 12),
            createActivity('J', 2, 14),
            createActivity('K', 12, 16),
        ];
        const expectedSelected: Activity[] = [
            createActivity('A', 1, 4),
            createActivity('D', 5, 7),
            createActivity('H', 8, 11),
            createActivity('K', 12, 16),
        ];

        // Deep clone to ensure original array is not modified by shuffle
        const shuffledActivities1 = shuffleArray(deepClone(originalActivities));
        const shuffledActivities2 = shuffleArray(deepClone(originalActivities));

        const result1 = selectActivities(shuffledActivities1);
        const result2 = selectActivities(shuffledActivities2);

        expect(result1.length).toBe(expectedSelected.length);
        expect(result1).toEqual(expect.arrayContaining(expectedSelected));

        expect(result2.length).toBe(expectedSelected.length);
        expect(result2).toEqual(expect.arrayContaining(expectedSelected));

        // Note: The exact order of activities in the result might depend on the secondary sort key
        // if finish times are identical. The `toEqual(expect.arrayContaining(...))` helps
        // check for content equality regardless of internal stable sort nuances for same finish times.
        // For distinct finish times, the order should be deterministic.
    });
});
```