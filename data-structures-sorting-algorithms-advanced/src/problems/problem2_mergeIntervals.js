```javascript
/**
 * @fileoverview Solution for the "Merge Intervals" problem.
 * Problem Description: Given an array of `intervals` where `intervals[i] = [start_i, end_i]`,
 * merge all overlapping intervals, and return an array of the non-overlapping intervals
 * that cover all the intervals in the input.
 *
 * Example:
 * Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 * Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
 */

/**
 * Merges overlapping intervals.
 *
 * The approach is as follows:
 * 1. Sort the intervals based on their start times. This is crucial because it ensures
 *    that when we iterate through the intervals, we are always considering intervals
 *    that potentially overlap with the current merged interval.
 * 2. Initialize an empty list to store merged intervals.
 * 3. Add the first interval to the merged list.
 * 4. Iterate through the rest of the intervals:
 *    a. If the current interval overlaps with the last interval in the merged list,
 *       update the end time of the last merged interval to be the maximum of its
 *       current end time and the current interval's end time.
 *    b. If there is no overlap, add the current interval to the merged list.
 * 5. Return the merged list.
 *
 * An overlap occurs if the start time of the current interval is less than or
 * equal to the end time of the last merged interval.
 *
 * @param {Array<Array<number>>} intervals An array of intervals, where each interval is [start, end].
 * @returns {Array<Array<number>>} An array of non-overlapping intervals.
 *
 * Time Complexity: O(N log N)
 *   - Dominated by the sorting step, which takes O(N log N) for N intervals.
 *   - The iteration through the sorted intervals takes O(N).
 *
 * Space Complexity: O(log N) or O(N)
 *   - O(N) for storing the result array.
 *   - O(log N) or O(N) for the space used by the sorting algorithm (e.g., Merge Sort uses O(N), Quick Sort uses O(log N) on average).
 *
 * Example:
 *   mergeIntervals([[1,3],[2,6],[8,10],[15,18]]) // returns [[1,6],[8,10],[15,18]]
 *   mergeIntervals([[1,4],[4,5]])              // returns [[1,5]]
 *   mergeIntervals([[1,4],[0,4]])              // returns [[0,4]]
 *   mergeIntervals([[1,4],[0,0]])              // returns [[0,0],[1,4]]
 *   mergeIntervals([[1,4],[0,1]])              // returns [[0,4]]
 *   mergeIntervals([])                         // returns []
 *   mergeIntervals([[1,2]])                    // returns [[1,2]]
 */
function mergeIntervals(intervals) {
  if (!Array.isArray(intervals)) {
    throw new Error('Input must be an array of intervals.');
  }
  if (intervals.length === 0) {
    return [];
  }

  // 1. Sort the intervals by their start times.
  // This is crucial. If intervals are not sorted, we might miss overlaps.
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];
  // 3. Add the first interval to the merged list.
  merged.push(intervals[0]);

  // 4. Iterate through the rest of the intervals.
  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i];
    const lastMergedInterval = merged[merged.length - 1];

    // Check for overlap: currentInterval.start <= lastMergedInterval.end
    if (currentInterval[0] <= lastMergedInterval[1]) {
      // Overlap: Merge by updating the end time of the last merged interval.
      // The new end time is the maximum of the current end time and the new interval's end time.
      lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
    } else {
      // No overlap: Add the current interval to the merged list.
      merged.push(currentInterval);
    }
  }

  return merged;
}

module.exports = mergeIntervals;
```