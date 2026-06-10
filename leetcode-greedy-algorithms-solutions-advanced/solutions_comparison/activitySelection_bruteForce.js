```javascript
/**
 * @fileoverview Brute-force (Recursive) solution for the Activity Selection Problem.
 *
 * This implementation explores all possible subsets of activities to find the
 * maximum number of non-overlapping activities. This is significantly less
 * efficient than the greedy approach but demonstrates a non-greedy way to solve
 * the problem for comparison.
 *
 * Problem Description:
 * Given N activities with start and finish times. Select the maximum number
 * of non-overlapping activities.
 *
 * Approach:
 * For each activity, we have two choices:
 * 1. Include the activity: If it doesn't overlap with previously selected activities,
 *    include it and recursively find the maximum activities from the remaining compatible ones.
 * 2. Exclude the activity: Recursively find the maximum activities from the remaining activities
 *    without including the current one.
 *
 * The `activitySelectionBruteForce` function initiates the process, potentially sorting
 * to make handling compatible activities slightly easier, but the core recursion still
 * explores all choices.
 */

/**
 * Recursive helper function for brute-force activity selection.
 *
 * @param {Array<Object>} activities - The array of all activities.
 * @param {number} index - The current activity index to consider.
 * @param {number} lastFinishTime - The finish time of the last selected activity.
 * @param {Array<Object>} currentSelection - The activities selected so far in the current path.
 * @param {Array<Object>} bestSelection - The best (maximum count) selection found so far.
 * @returns {Array<Object>} The overall best selection of activities.
 */
function findMaxActivitiesRecursive(activities, index, lastFinishTime, currentSelection, bestSelection) {
  // Base case: If all activities have been considered.
  if (index === activities.length) {
    // If the current selection is better than the best found so far, update best.
    if (currentSelection.length > bestSelection.length) {
      // Return a copy to avoid mutation by other recursive calls
      return [...currentSelection];
    }
    return bestSelection; // Return current best
  }

  // Option 1: Exclude the current activity
  let resultAfterExcluding = findMaxActivitiesRecursive(
    activities,
    index + 1,
    lastFinishTime,
    currentSelection,
    bestSelection
  );

  // Update bestSelection if resultAfterExcluding is better
  if (resultAfterExcluding.length > bestSelection.length) {
    bestSelection = resultAfterExcluding;
  }

  // Option 2: Include the current activity (if compatible)
  const currentActivity = activities[index];
  if (currentActivity.start >= lastFinishTime) {
    currentSelection.push(currentActivity);
    let resultAfterIncluding = findMaxActivitiesRecursive(
      activities,
      index + 1,
      currentActivity.finish, // Update last finish time
      currentSelection,
      bestSelection
    );
    currentSelection.pop(); // Backtrack: remove current activity for other paths

    // Update bestSelection if resultAfterIncluding is better
    if (resultAfterIncluding.length > bestSelection.length) {
      bestSelection = resultAfterIncluding;
    }
  }

  return bestSelection;
}

/**
 * Solves the Activity Selection problem using a brute-force recursive approach.
 *
 * @param {Array<Object>} activities - An array of activity objects.
 *   Each activity object must have 'start' and 'finish' properties (numbers).
 * @returns {Array<Object>} An array of selected activity objects.
 *
 * Time Complexity: O(2^N), where N is the number of activities.
 *                  In the worst case, for each activity, we explore two branches
 *                  (include or exclude). Sorting takes O(N log N) initially.
 *                  The exponential factor dominates.
 * Space Complexity: O(N) for recursion stack depth and storing intermediate selections.
 */
function activitySelectionBruteForce(activities) {
  if (!activities || activities.length === 0) {
    return [];
  }

  // Sorting by finish time initially can slightly prune the search space in some cases
  // but doesn't change the fundamental exponential complexity.
  // It's not strictly necessary for correctness of brute-force but good practice for any search.
  const sortedActivities = [...activities].sort((a, b) => a.finish - b.finish);

  const initialBestSelection = [];
  return findMaxActivitiesRecursive(sortedActivities, 0, -Infinity, [], initialBestSelection);
}

export default activitySelectionBruteForce;
```