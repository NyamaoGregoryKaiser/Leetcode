```javascript
/**
 * @fileoverview Implementation of the Activity Selection Problem using a Greedy approach.
 *
 * Problem Description:
 * You are given N activities with their start and finish times. Select the maximum
 * number of activities that can be performed by a single person, assuming that
 * a person can only work on a single activity at a time.
 *
 * Example:
 * Activities: [
 *   { id: 'A', start: 1, finish: 2 },
 *   { id: 'B', start: 3, finish: 4 },
 *   { id: 'C', start: 0, finish: 6 },
 *   { id: 'D', start: 5, finish: 7 },
 *   { id: 'E', start: 8, finish: 9 },
 *   { id: 'F', start: 5, finish: 9 }
 * ]
 * Optimal Solution: ['A', 'B', 'D', 'E'] (or 'A', 'D', 'E' or 'B', 'D', 'E')
 * A common greedy solution would yield ['A', 'B', 'D', 'E'] as it picks the earliest finishing activity first.
 *
 * Greedy Choice Property:
 * The greedy strategy is to always pick the activity that finishes earliest among
 * the remaining activities that are compatible with the previously selected activities.
 * This works because selecting an activity that finishes earliest leaves the maximum
 * possible time available for subsequent activities.
 *
 * Proof of Correctness (Intuition):
 * Let `S` be an optimal solution and `A_k` be the activity in `S` that finishes earliest.
 * Let `A_1` be the activity that finishes earliest overall (the one chosen by the greedy algorithm).
 *
 * Case 1: If `A_k` is the same as `A_1`, then the greedy choice is part of an optimal solution.
 *         We can recursively solve the subproblem with activities that start after `A_1` finishes.
 * Case 2: If `A_k` is different from `A_1`. Since `A_1` finishes earliest, `A_1.finish <= A_k.finish`.
 *         Consider a new solution `S' = (S - {A_k}) U {A_1}`.
 *         `S'` is also a valid set of activities:
 *         - All activities in `S - {A_k}` are compatible with each other.
 *         - `A_1` starts earlier than or at the same time as `A_k` and finishes earlier than or at the same time as `A_k`.
 *         - Thus, `A_1` is compatible with any activity that `A_k` was compatible with (except those that started before `A_1` but after `A_k` started, which wouldn't be compatible with `A_k` anyway). More importantly, `A_1` is compatible with activities that start *after* `A_k` finishes, because `A_1` finishes earlier.
 *         - The activities in `S'` are compatible and `|S'| = |S|`.
 *         Therefore, `S'` is also an optimal solution that includes the greedy choice `A_1`.
 * This demonstrates that there is always an optimal solution that includes the greedy choice.
 */

/**
 * Finds the maximum number of non-overlapping activities that can be performed.
 *
 * @param {Array<Object>} activities - An array of activity objects.
 *   Each activity object must have 'start' and 'finish' properties (numbers).
 *   Example: [{ id: 'A', start: 1, finish: 4 }, { id: 'B', start: 3, finish: 5 }]
 * @returns {Array<Object>} An array of selected activity objects.
 *
 * Time Complexity: O(N log N) due to sorting, where N is the number of activities.
 *                  The iteration takes O(N) time.
 * Space Complexity: O(N) for storing the sorted activities (if a copy is made)
 *                   or O(1) if sorting in-place and not counting the output array.
 *                   O(K) for the result array, where K is the number of selected activities.
 */
function activitySelection(activities) {
  // Edge case: If there are no activities, return an empty array.
  if (!activities || activities.length === 0) {
    return [];
  }

  // 1. Sort the activities by their finish times in ascending order.
  // This is the crucial greedy step. By picking the activity that finishes earliest,
  // we leave the maximum amount of time available for subsequent activities.
  // If finish times are equal, we can use start times as a tie-breaker, but it's not strictly necessary
  // for correctness; any consistent order for equal finish times will work.
  const sortedActivities = [...activities].sort((a, b) => a.finish - b.finish);

  const selectedActivities = [];

  // 2. Select the first activity (which has the earliest finish time).
  // It is always optimal to select the activity that finishes first.
  selectedActivities.push(sortedActivities[0]);

  // Keep track of the finish time of the last selected activity.
  let lastFinishTime = sortedActivities[0].finish;

  // 3. Iterate through the remaining sorted activities.
  // For each activity, check if its start time is greater than or equal to
  // the finish time of the last selected activity.
  for (let i = 1; i < sortedActivities.length; i++) {
    const currentActivity = sortedActivities[i];

    // If the current activity starts after or at the same time the last
    // selected activity finishes, then it is non-overlapping and can be selected.
    if (currentActivity.start >= lastFinishTime) {
      selectedActivities.push(currentActivity);
      // Update the finish time of the last selected activity.
      lastFinishTime = currentActivity.finish;
    }
  }

  // 4. Return the list of selected activities.
  return selectedActivities;
}

export default activitySelection;
```