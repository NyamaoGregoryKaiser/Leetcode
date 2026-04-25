```java
package com.greedy.problems;

import com.greedy.utils.Pair;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * **Problem:** Activity Selection Problem
 *
 * Given a set of n activities, each having a start time (s_i) and a finish time (f_i).
 * We need to select the maximum number of non-overlapping activities that can be performed by a single person.
 * Assume that the activities are already sorted by their finish times. If not, we should sort them first.
 *
 * **Example:**
 * Activities: (1, 4), (3, 5), (0, 6), (5, 7), (3, 8), (5, 9), (6, 10), (8, 11), (8, 12), (2, 13), (12, 14)
 * Sorted by finish time: (1, 4), (3, 5), (0, 6), (5, 7), (3, 8), (5, 9), (6, 10), (8, 11), (8, 12), (2, 13), (12, 14)
 *
 * **Greedy Choice Property:**
 * The greedy choice is to always select the activity that finishes earliest among the
 * remaining compatible activities. This is because selecting an activity that finishes
 * early leaves the maximum amount of time available for other activities.
 *
 * **Optimal Substructure:**
 * If the optimal solution for a set of activities S includes activity 'k', then the
 * remaining activities in the optimal solution are themselves an optimal solution
 * for the set of activities compatible with 'k' (i.e., activities that start after
 * 'k' finishes).
 *
 * **Algorithm Steps:**
 * 1. Sort the activities by their finish times in non-decreasing order.
 * 2. Select the first activity (which has the earliest finish time). Add it to the result set.
 * 3. Iterate through the remaining activities:
 *    If the current activity's start time is greater than or equal to the finish time
 *    of the previously selected activity, select it. Add it to the result set and update
 *    the 'last selected activity's finish time'.
 * 4. Continue until all activities are processed.
 */
public class ActivitySelection {

    /**
     * Represents an activity with a start and finish time.
     */
    public static class Activity {
        int id; // Optional: for identification
        int start;
        int finish;

        public Activity(int id, int start, int finish) {
            this.id = id;
            this.start = start;
            this.finish = finish;
        }

        public int getStart() {
            return start;
        }

        public int getFinish() {
            return finish;
        }

        @Override
        public String toString() {
            return "A" + id + "(" + start + "," + finish + ")";
        }
    }

    /**
     * Solves the Activity Selection Problem using a greedy approach.
     *
     * @param activities A list of Activity objects.
     * @return A list of selected activities that are non-overlapping and maximum in count.
     *
     * **Time Complexity:**
     * - Sorting activities: O(N log N), where N is the number of activities.
     * - Iterating through sorted activities: O(N).
     * - Total: O(N log N) dominated by sorting.
     *
     * **Space Complexity:**
     * - O(N) for storing the sorted activities (if a new list is created) and the result list.
     *   If sorting is in-place and result list is smaller, it could be O(K) where K is selected activities.
     */
    public List<Activity> selectActivitiesGreedy(List<Activity> activities) {
        if (activities == null || activities.isEmpty()) {
            return Collections.emptyList();
        }

        // Step 1: Sort activities by their finish times.
        // If finish times are equal, sort by start times to ensure consistent behavior
        // (though for activity selection, primary sort by finish time is sufficient).
        List<Activity> sortedActivities = new ArrayList<>(activities);
        sortedActivities.sort(Comparator
                .comparingInt(Activity::getFinish)
                .thenComparingInt(Activity::getStart)); // Tie-breaking by start time

        List<Activity> selected = new ArrayList<>();

        // Step 2: Select the first activity (which has the earliest finish time).
        selected.add(sortedActivities.get(0));
        int lastFinishTime = sortedActivities.get(0).getFinish();

        // Step 3 & 4: Iterate through the remaining activities.
        for (int i = 1; i < sortedActivities.size(); i++) {
            Activity currentActivity = sortedActivities.get(i);

            // If the current activity's start time is greater than or equal to
            // the finish time of the previously selected activity, select it.
            if (currentActivity.getStart() >= lastFinishTime) {
                selected.add(currentActivity);
                lastFinishTime = currentActivity.getFinish();
            }
        }

        return selected;
    }

    /**
     * An alternative "brute-force" approach (conceptual, not truly implemented for exponential search).
     * This method outlines a recursive backtracking approach to find all possible non-overlapping
     * subsets and then picking the largest one. This is highly inefficient compared to the greedy approach.
     *
     * **Time Complexity:** O(2^N) due to exploring all subsets.
     * **Space Complexity:** O(N) for recursion stack.
     *
     * @param activities A list of Activity objects.
     * @return A list of selected activities.
     */
    public List<Activity> selectActivitiesBruteForceConceptual(List<Activity> activities) {
        if (activities == null || activities.isEmpty()) {
            return Collections.emptyList();
        }

        // Sort by start time for consistent exploration, or any order.
        // For actual brute force, sorting isn't strictly necessary but helps
        // avoid redundant processing if combined with memoization.
        List<Activity> sortedActivities = new ArrayList<>(activities);
        sortedActivities.sort(Comparator.comparingInt(Activity::getStart));

        List<Activity> bestSelection = new ArrayList<>();
        findMaxActivitiesRecursive(sortedActivities, 0, new ArrayList<>(), bestSelection);
        return bestSelection;
    }

    /**
     * Helper for brute-force conceptual approach.
     * Recursively tries to build a selection of non-overlapping activities.
     *
     * @param allActivities The list of all available activities.
     * @param currentIndex The current index in 'allActivities' to consider.
     * @param currentSelection The activities selected so far in the current recursive path.
     * @param bestSelection The overall best selection found so far (passed by reference).
     */
    private void findMaxActivitiesRecursive(List<Activity> allActivities, int currentIndex,
                                            List<Activity> currentSelection, List<Activity> bestSelection) {
        // Base case: If all activities have been considered.
        if (currentIndex == allActivities.size()) {
            if (currentSelection.size() > bestSelection.size()) {
                // Update best selection if current one is larger
                bestSelection.clear();
                bestSelection.addAll(currentSelection);
            }
            return;
        }

        Activity current = allActivities.get(currentIndex);

        // Option 1: Try to include the current activity
        boolean canInclude = true;
        if (!currentSelection.isEmpty()) {
            // Check for overlap with the last activity added to currentSelection
            // Note: For this to work correctly, currentSelection would ideally be kept sorted by finish time,
            // or we'd need to check against ALL activities in currentSelection.
            // A simpler non-overlapping check is to just ensure the new activity doesn't conflict with any existing one.
            // This makes the check O(K) where K is size of currentSelection.
            for (Activity selected : currentSelection) {
                if (Math.max(selected.start, current.start) < Math.min(selected.finish, current.finish)) {
                    canInclude = false; // Overlap detected
                    break;
                }
            }
        }

        if (canInclude) {
            currentSelection.add(current);
            findMaxActivitiesRecursive(allActivities, currentIndex + 1, currentSelection, bestSelection);
            currentSelection.remove(currentSelection.size() - 1); // Backtrack
        }

        // Option 2: Exclude the current activity
        findMaxActivitiesRecursive(allActivities, currentIndex + 1, currentSelection, bestSelection);
    }
}

```