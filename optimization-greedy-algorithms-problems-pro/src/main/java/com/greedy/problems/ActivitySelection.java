package com.greedy.problems;

import com.greedy.utils.DataStructures.Activity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

/**
 * **Problem: Activity Selection Problem**
 *
 * Given a set of n activities, each with a start time `s_i` and a finish time `f_i`.
 * Select the maximum number of non-overlapping activities that can be performed by a single person
 * or a single resource. Activities are considered non-overlapping if `f_i <= s_j` or `f_j <= s_i`.
 *
 * **Greedy Strategy:**
 * The greedy choice is to always select the activity that finishes earliest among the
 * remaining compatible activities.
 *
 * **Why this greedy strategy works (Informal Proof/Intuition):**
 * Let `S` be the set of activities sorted by their finish times.
 * Let `a1` be the activity in `S` with the earliest finish time.
 *
 * **Greedy Choice Property:** There exists an optimal solution that includes `a1`.
 * Suppose `A` is an optimal solution that does not include `a1`. Let `ak` be the activity
 * in `A` with the earliest finish time. Since `a1` has the earliest finish time among all activities,
 * `f1 <= fk`. We can replace `ak` with `a1` in `A`. The new set `A'` will still be a valid solution
 * because `a1` finishes no later than `ak`, meaning `a1` is compatible with all activities in `A`
 * that start after `ak` finishes. `A'` will have the same number of activities as `A`, and thus
 * is also an optimal solution. This shows that we can always find an optimal solution that includes `a1`.
 *
 * **Optimal Substructure Property:** If `a1` is part of an optimal solution, then the rest of the
 * optimal solution for the remaining activities (those that start after `a1` finishes) is an optimal
 * solution to the subproblem considering only activities compatible with `a1`.
 *
 * These two properties confirm that a greedy approach is suitable.
 */
public class ActivitySelection {

    /**
     * Solves the Activity Selection Problem using a greedy approach.
     *
     * @param activities An array of Activity objects, each with a start and finish time.
     * @return A list of selected activities that represents the maximum number of non-overlapping activities.
     *         The list will be empty if the input array is null or empty.
     */
    public List<Activity> selectActivities(Activity[] activities) {
        // Handle edge cases: null or empty input
        if (activities == null || activities.length == 0) {
            return new ArrayList<>();
        }

        // Step 1: Sort activities by their finish times.
        // This is the crucial greedy step. If two activities have the same finish time,
        // their relative order doesn't matter for correctness, but sorting by start time
        // in such cases can provide a stable sort or be an arbitrary tie-breaker.
        Arrays.sort(activities, Comparator.comparingInt(a -> a.finish));

        List<Activity> selectedActivities = new ArrayList<>();

        // Step 2: Select the first activity (which has the earliest finish time).
        selectedActivities.add(activities[0]);
        int lastFinishTime = activities[0].finish;

        // Step 3: Iterate through the remaining activities.
        // For each activity, if its start time is greater than or equal to the finish time
        // of the last selected activity, then it's compatible. Select it.
        for (int i = 1; i < activities.length; i++) {
            if (activities[i].start >= lastFinishTime) {
                selectedActivities.add(activities[i]);
                lastFinishTime = activities[i].finish;
            }
        }

        return selectedActivities;
    }

    /**
     * Alternative approach: What if activities are NOT pre-sorted by finish times?
     * The `selectActivities` method assumes input might not be sorted and sorts it first.
     * If the input is guaranteed to be sorted, the sorting step can be skipped.
     * This method is identical to the main one, demonstrating that the sorting is an
     * integral part of the greedy algorithm itself if the input isn't structured.
     */
    public List<Activity> selectActivities_sortedInput(Activity[] activities) {
        // This method assumes 'activities' array is already sorted by finish times.
        if (activities == null || activities.length == 0) {
            return new ArrayList<>();
        }

        List<Activity> selectedActivities = new ArrayList<>();
        selectedActivities.add(activities[0]);
        int lastFinishTime = activities[0].finish;

        for (int i = 1; i < activities.length; i++) {
            if (activities[i].start >= lastFinishTime) {
                selectedActivities.add(activities[i]);
                lastFinishTime = activities[i].finish;
            }
        }
        return selectedActivities;
    }

    /**
     * **Time Complexity Analysis:**
     * - Sorting the activities by finish time: O(N log N), where N is the number of activities.
     *   This is the dominant factor if the input is unsorted.
     * - Iterating through the sorted activities: O(N).
     * - Overall Time Complexity: O(N log N).
     *
     * **Space Complexity Analysis:**
     * - Storing the sorted array (in-place sort often used): O(1) auxiliary space for primitive arrays,
     *   or O(log N) to O(N) for object arrays depending on sort implementation. If a new list for sorting
     *   is created, it's O(N). `Arrays.sort` for objects uses O(log N) to O(N) depending on implementation.
     * - Storing the selected activities: O(N) in the worst case (e.g., all activities are compatible).
     * - Overall Space Complexity: O(N) due to the output list and potential sort overhead.
     */
}