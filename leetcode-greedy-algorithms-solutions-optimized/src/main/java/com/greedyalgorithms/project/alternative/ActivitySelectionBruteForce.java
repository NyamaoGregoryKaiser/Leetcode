package com.greedyalgorithms.project.alternative;

import com.greedyalgorithms.project.utils.Activity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Brute-force solution for the Activity Selection Problem.
 * This class explores all possible subsets of activities to find the maximum
 * number of non-overlapping activities. It demonstrates the inefficiency
 * of non-greedy approaches for this problem, contrasting with the
 * `GreedyAlgorithms.activitySelection` method.
 *
 * Time Complexity: O(2^N * N), where N is the number of activities.
 *                  Generating all subsets is O(2^N), and checking each subset
 *                  for non-overlap takes O(N) (after sorting each subset).
 * Space Complexity: O(N) for recursion stack and storing subsets.
 */
public class ActivitySelectionBruteForce {

    /**
     * Finds the maximum number of non-overlapping activities using a brute-force approach.
     * This method generates all possible subsets of activities and checks each subset
     * for non-overlapping properties, keeping track of the largest valid subset.
     *
     * @param activities A list of Activity objects.
     * @return A list of selected activities. Note: for brute force, the specific activities
     *         might differ from the greedy one if multiple optimal solutions exist,
     *         but the count will be the same.
     * @throws IllegalArgumentException if the input list is null.
     */
    public List<Activity> solve(List<Activity> activities) {
        if (activities == null) {
            throw new IllegalArgumentException("Activities list cannot be null.");
        }
        if (activities.isEmpty()) {
            return Collections.emptyList();
        }

        List<Activity> bestSolution = Collections.emptyList();
        // Generate all subsets and find the best one
        // The recursive helper `findSubsets` will do this.
        bestSolution = findSubsets(activities, 0, new ArrayList<>(), bestSolution);

        return bestSolution;
    }

    /**
     * Recursive helper to generate all subsets and find the one with maximum non-overlapping activities.
     * This method explores two branches for each activity: either include it in the current subset
     * or exclude it.
     *
     * @param allActivities The complete list of activities to choose from.
     * @param currentIndex The current index in `allActivities` being considered.
     * @param currentSubset The list of activities chosen for the current path.
     * @param bestGlobalSolution The best valid (non-overlapping) subset found so far.
     * @return The updated best valid subset.
     */
    private List<Activity> findSubsets(
            List<Activity> allActivities,
            int currentIndex,
            List<Activity> currentSubset,
            List<Activity> bestGlobalSolution) {

        // Base case: If all activities have been considered
        if (currentIndex == allActivities.size()) {
            // Check if the currentSubset is valid (non-overlapping)
            if (isNonOverlapping(currentSubset)) {
                // If it's valid and better than the best global solution, update.
                if (currentSubset.size() > bestGlobalSolution.size()) {
                    return new ArrayList<>(currentSubset); // Return a copy
                }
            }
            return bestGlobalSolution; // Return the current best
        }

        // Recursive Step 1: Exclude the current activity
        bestGlobalSolution = findSubsets(allActivities, currentIndex + 1, currentSubset, bestGlobalSolution);

        // Recursive Step 2: Include the current activity
        Activity activity = allActivities.get(currentIndex);
        currentSubset.add(activity); // Add it to the current path
        bestGlobalSolution = findSubsets(allActivities, currentIndex + 1, currentSubset, bestGlobalSolution);
        currentSubset.remove(currentSubset.size() - 1); // Backtrack: remove the activity for other paths

        return bestGlobalSolution;
    }

    /**
     * Checks if a given list of activities is non-overlapping.
     * This requires sorting the activities by start time for efficient checking.
     *
     * @param subset The list of activities to check.
     * @return true if all activities in the subset are non-overlapping, false otherwise.
     */
    private boolean isNonOverlapping(List<Activity> subset) {
        if (subset.size() <= 1) {
            return true;
        }

        // Sort the subset by start time to easily check for overlaps.
        // This is important because the subset might not be sorted.
        List<Activity> sortedSubset = new ArrayList<>(subset);
        sortedSubset.sort(Comparator.comparingInt(Activity::getStart));

        for (int i = 0; i < sortedSubset.size() - 1; i++) {
            if (sortedSubset.get(i).getFinish() > sortedSubset.get(i + 1).getStart()) {
                // An overlap found
                return false;
            }
        }
        return true;
    }
}