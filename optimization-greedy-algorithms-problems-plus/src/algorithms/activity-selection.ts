```typescript
/**
 * src/algorithms/activity-selection.ts
 *
 * This file implements the Activity Selection Problem using a greedy approach.
 *
 * Problem Description:
 * Given a set of `n` activities, each with a start time `s_i` and a finish time `f_i`,
 * select the maximum number of non-overlapping activities that can be performed by a single person or machine.
 * Two activities `i` and `j` are non-overlapping if `s_i >= f_j` or `s_j >= f_i`.
 *
 * Example:
 * Activities: [(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10), (8, 11), (8, 12), (2, 14), (12, 16)]
 * Optimal selection: [(1, 4), (5, 7), (8, 11), (12, 16)] - 4 activities
 */

/**
 * Represents an activity with a start and finish time.
 */
export interface Activity {
    id: number | string; // Optional identifier for debugging/tracking
    start: number;
    finish: number;
}

/**
 * Solves the Activity Selection Problem using a greedy approach.
 *
 * The greedy strategy is to always pick the activity that finishes earliest among the
 * activities that are compatible with the previously selected activity.
 *
 * Algorithm Steps:
 * 1. Sort the activities by their finish times in ascending order.
 *    If two activities have the same finish time, their relative order doesn't matter for correctness,
 *    but sorting by start time as a secondary key can make the output deterministic.
 * 2. Select the first activity (which has the earliest finish time). Add it to the result set.
 * 3. Iterate through the remaining sorted activities. For each activity:
 *    If its start time is greater than or equal to the finish time of the last selected activity,
 *    select this activity and add it to the result set.
 * 4. Continue until all activities have been considered.
 *
 * Time Complexity:
 * - Sorting the activities: O(N log N), where N is the number of activities.
 * - Iterating through sorted activities: O(N).
 * - Total Time Complexity: O(N log N) due to sorting.
 *
 * Space Complexity:
 * - Storing sorted activities: O(N) (if a copy is made, or in-place sort requires O(log N) or O(N) depending on sort algorithm).
 * - Storing the result set: O(N) in the worst case (all activities are selected).
 * - Total Space Complexity: O(N).
 *
 * @param activities An array of Activity objects.
 * @returns An array of selected Activity objects that represents the maximum set of non-overlapping activities.
 */
export function selectActivities(activities: Activity[]): Activity[] {
    // Edge case: If there are no activities, return an empty array.
    if (!activities || activities.length === 0) {
        return [];
    }

    // 1. Sort activities by their finish times in ascending order.
    // If finish times are equal, sorting by start time can provide a deterministic order
    // but is not strictly necessary for correctness of maximum activities.
    // Example sort: (a.finish - b.finish) ensures ascending finish times.
    // If finish times are equal, (a.start - b.start) ensures ascending start times.
    const sortedActivities = [...activities].sort((a, b) => {
        if (a.finish !== b.finish) {
            return a.finish - b.finish;
        }
        return a.start - b.start; // Secondary sort key
    });

    // Initialize the result array with the first activity.
    // The first activity in the sorted list always has the earliest finish time,
    // so it's always a valid choice for the first selected activity.
    const selected: Activity[] = [];
    selected.push(sortedActivities[0]);

    // Keep track of the finish time of the last selected activity.
    let lastFinishTime = sortedActivities[0].finish;

    // 3. Iterate through the remaining activities, starting from the second one.
    for (let i = 1; i < sortedActivities.length; i++) {
        const currentActivity = sortedActivities[i];

        // If the current activity's start time is greater than or equal to the
        // finish time of the last selected activity, it means they are non-overlapping.
        // We can select this activity.
        if (currentActivity.start >= lastFinishTime) {
            selected.push(currentActivity);
            // Update the finish time of the last selected activity.
            lastFinishTime = currentActivity.finish;
        }
    }

    // 4. Return the set of selected activities.
    return selected;
}

// --- Brute Force vs. Optimized (Greedy) Discussion ---
/*
* Brute Force Approach:
*   A brute force approach would involve checking all possible subsets of activities
*   to find the largest subset where no activities overlap.
*   This can be done using recursion with backtracking.
*   For N activities, there are 2^N possible subsets. For each subset, we would need to
*   check for overlaps, which takes O(N log N) (after sorting) or O(N^2) (naively).
*   Thus, the brute force complexity would be O(2^N * N log N) or O(2^N * N^2), which is
*   highly inefficient for even moderately sized N.

* Optimized (Greedy) Approach:
*   The greedy approach implemented above significantly reduces complexity by making
*   locally optimal choices (picking the earliest finishing activity) that lead to a
*   globally optimal solution. The correctness of this greedy strategy can be proven
*   using an exchange argument:
*   Suppose there is an optimal solution `O` that does not include the earliest-finishing
*   activity `a_k`. Let `a_j` be the first activity in `O`. Since `a_k` finishes earliest,
*   `f_k <= f_j`. If `a_k` overlaps with no other activities in `O` (except possibly `a_j`),
*   we can replace `a_j` with `a_k` to form a new optimal solution `O'` of the same size,
*   or even a larger size if `a_k` finishes earlier and allows more subsequent activities.
*   This argument shows that there is always an optimal solution that includes the
*   earliest-finishing activity. This property is crucial for greedy algorithms.
*/

// --- ASCII Art Diagram for Activity Selection Logic ---
/*
Consider activities sorted by finish time:

Activity A: [---S_A---F_A---]
Activity B:        [---S_B---F_B---]
Activity C:                    [---S_C---F_C---]
Activity D:     [---S_D---F_D---]  (overlaps with A, B)
Activity E:              [---S_E---F_E---] (overlaps with B, C)

Sorted by finish time: A, D, B, E, C (example, assuming values)

1. Select A. Last finish = F_A
   [---S_A---F_A---]
   Selected: [A]

2. Consider D: S_D < F_A. (D overlaps A). Skip D.
   [---S_A---F_A---]
             [---S_D---F_D---]

3. Consider B: S_B >= F_A. Select B. Last finish = F_B
   [---S_A---F_A---]
             [---S_B---F_B---]
   Selected: [A, B]

4. Consider E: S_E < F_B. (E overlaps B). Skip E.
                     [---S_E---F_E---]

5. Consider C: S_C >= F_B. Select C. Last finish = F_C
             [---S_B---F_B---]
                       [---S_C---F_C---]
   Selected: [A, B, C]

Final selection: [A, B, C]
*/
```