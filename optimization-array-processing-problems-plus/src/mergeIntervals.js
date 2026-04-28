/**
 * @fileoverview Solutions for the "Merge Overlapping Intervals" problem.
 *
 * Problem Description:
 * Given an array of `intervals` where `intervals[i] = [start_i, end_i]`,
 * merge all overlapping intervals, and return an array of the non-overlapping intervals
 * that cover all the intervals in the input.
 *
 * Examples:
 * 1. Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 *    Output: [[1,6],[8,10],[15,18]]
 *    Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
 * 2. Input: intervals = [[1,4],[4,5]]
 *    Output: [[1,5]]
 *    Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 */

/**
 * Merges a list of overlapping intervals.
 *
 * Algorithm:
 * 1. Handle edge cases: If the input array is empty or has only one interval, return it as is.
 * 2. Sort the intervals: Sort the `intervals` array based on their start times. This is crucial
 *    because it allows us to process intervals in increasing order of their start points,
 *    simplifying the merging logic.
 * 3. Initialize `mergedIntervals`: Create an empty list to store the merged intervals.
 * 4. Iterate through the sorted intervals:
 *    a. Take the current interval `[currentStart, currentEnd]`.
 *    b. If `mergedIntervals` is empty or the current interval does NOT overlap with the
 *       last interval in `mergedIntervals`:
 *       (i.e., `currentStart > lastMergedEnd`)
 *       Add the current interval to `mergedIntervals`.
 *    c. If the current interval DOES overlap with the last interval in `mergedIntervals`:
 *       (i.e., `currentStart <= lastMergedEnd`)
 *       Update the end time of the last interval in `mergedIntervals` to be
 *       `Math.max(lastMergedEnd, currentEnd)`.
 *       This extends the last merged interval to cover the current one.
 * 5. Return `mergedIntervals`.
 *
 * How to check for overlap:
 * Two intervals `[a, b]` and `[c, d]` overlap if `max(a, c) <= min(b, d)`.
 * After sorting by start time, if `intervals[i] = [s1, e1]` and `intervals[i+1] = [s2, e2]`,
 * they overlap if `s2 <= e1`.
 *
 * Example: intervals = [[1,3],[8,10],[2,6],[15,18]]
 * 1. Sort: [[1,3],[2,6],[8,10],[15,18]]
 *
 * 2. mergedIntervals = []
 *
 * 3. Iterate:
 *    a. Current: [1,3]
 *       mergedIntervals is empty, add [1,3].
 *       mergedIntervals = [[1,3]]
 *
 *    b. Current: [2,6]
 *       Last merged: [1,3]. `currentStart (2)` <= `lastMergedEnd (3)`. Overlap!
 *       Update last merged end: `Math.max(3, 6) = 6`.
 *       mergedIntervals = [[1,6]]
 *
 *    c. Current: [8,10]
 *       Last merged: [1,6]. `currentStart (8)` > `lastMergedEnd (6)`. No overlap.
 *       Add [8,10].
 *       mergedIntervals = [[1,6],[8,10]]
 *
 *    d. Current: [15,18]
 *       Last merged: [8,10]. `currentStart (15)` > `lastMergedEnd (10)`. No overlap.
 *       Add [15,18].
 *       mergedIntervals = [[1,6],[8,10],[15,18]]
 *
 * Final Result: [[1,6],[8,10],[15,18]]
 *
 * @param {number[][]} intervals An array of intervals, where each interval is `[start, end]`.
 * @returns {number[][]} An array of non-overlapping intervals.
 *
 * Time Complexity: O(N log N) due to sorting. The single pass after sorting takes O(N).
 * Space Complexity: O(N) for the sorted array (if a new one is created by sort) and the `mergedIntervals` array.
 *                   If sorting is in-place and `mergedIntervals` can be optimized, it might be O(1) auxiliary.
 *                   In JS, `sort()` usually doesn't create a new array unless used with spread operator.
 */
function mergeIntervals(intervals) {
    if (!intervals || intervals.length <= 1) {
        return intervals;
    }

    // 1. Sort intervals by their start times
    // O(N log N) time complexity
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [];
    merged.push(intervals[0]); // Add the first interval to merged list

    // 2. Iterate through the sorted intervals starting from the second one
    for (let i = 1; i < intervals.length; i++) {
        const currentInterval = intervals[i];
        const lastMergedInterval = merged[merged.length - 1];

        // Check for overlap: currentInterval's start is less than or equal to lastMergedInterval's end
        if (currentInterval[0] <= lastMergedInterval[1]) {
            // Overlap: merge by updating the end time of the last merged interval
            lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
        } else {
            // No overlap: add the current interval to the merged list
            merged.push(currentInterval);
        }
    }

    return merged;
}

module.exports = {
    mergeIntervals
};