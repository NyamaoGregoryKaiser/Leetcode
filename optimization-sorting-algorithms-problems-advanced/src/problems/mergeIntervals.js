const defaultComparator = require('../utils/comparator');

/**
 * src/problems/mergeIntervals.js
 *
 * Problem: Merge Overlapping Intervals
 *
 * Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`,
 * merge all overlapping intervals, and return an array of the non-overlapping
 * intervals that cover all the intervals in the input.
 *
 * Example:
 * Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 * Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
 *
 * Input: intervals = [[1,4],[4,5]]
 * Output: [[1,5]]
 * Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 *
 * Constraints:
 * - 1 <= intervals.length <= 10^4
 * - intervals[i].length == 2
 * - 0 <= start_i <= end_i <= 10^4
 */

/**
 * Optimal Approach: Sort and Merge
 *
 * The key idea is that if we sort the intervals by their start times, then merging
 * overlapping intervals becomes a linear scan problem. We only need to compare
 * an interval with the *last* merged interval to check for overlap.
 *
 * Algorithm:
 * 1. Sort the intervals based on their start times.
 * 2. Initialize an empty list `mergedIntervals` to store the result.
 * 3. Iterate through the sorted intervals:
 *    a. If `mergedIntervals` is empty, or the current interval does not overlap
 *       with the last interval in `mergedIntervals`, add the current interval
 *       to `mergedIntervals`.
 *    b. If the current interval *does* overlap with the last interval in `mergedIntervals`,
 *       update the end time of the last interval in `mergedIntervals` to be the
 *       maximum of its current end time and the current interval's end time.
 *
 * How to check for overlap:
 * Two intervals `[a, b]` and `[c, d]` overlap if `b >= c`.
 * If they overlap, the merged interval is `[min(a, c), max(b, d)]`.
 * Since we sort by start time, `a <= c` is guaranteed. So, if `b >= c`, they overlap,
 * and the merged interval becomes `[a, max(b, d)]`.
 *
 * Time Complexity:
 *   - O(N log N) dominated by the sorting step, where N is the number of intervals.
 *   - The merge step is O(N) because each interval is processed once.
 * Space Complexity:
 *   - O(N) to store the sorted intervals (if `Array.prototype.sort` makes a copy)
 *     and O(N) for the `mergedIntervals` result array in the worst case (no overlaps).
 *   - If sorting is in-place and result array is considered part of output, then O(1) auxiliary for merge logic.
 *
 * @param {number[][]} intervals An array of intervals, where each interval is [start, end].
 * @returns {number[][]} An array of non-overlapping intervals.
 */
function mergeIntervals(intervals) {
    if (!intervals || intervals.length <= 1) {
        return intervals;
    }

    // Step 1: Sort the intervals based on their start times.
    // If start times are equal, order doesn't strictly matter for correctness,
    // but a secondary sort by end time could make debugging easier.
    intervals.sort((a, b) => a[0] - b[0]);

    const mergedIntervals = [];

    // Step 2 & 3: Iterate through sorted intervals and merge.
    for (const interval of intervals) {
        // If mergedIntervals is empty OR the current interval does not overlap with
        // the last merged interval, add the current interval directly.
        // Overlap check: last merged interval's end time < current interval's start time
        if (mergedIntervals.length === 0 || mergedIntervals[mergedIntervals.length - 1][1] < interval[0]) {
            mergedIntervals.push(interval);
        } else {
            // There is an overlap, so merge the current interval with the last merged interval.
            // Update the end time of the last merged interval to be the maximum of
            // its current end time and the current interval's end time.
            mergedIntervals[mergedIntervals.length - 1][1] = Math.max(
                mergedIntervals[mergedIntervals.length - 1][1],
                interval[1]
            );
        }
    }

    return mergedIntervals;
}

module.exports = mergeIntervals;