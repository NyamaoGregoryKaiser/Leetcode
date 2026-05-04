```javascript
/**
 * Problem 2: Merge Intervals
 *
 * Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals,
 * and return an array of the non-overlapping intervals that cover all the intervals in the input.
 *
 * Example 1:
 * Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 * Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
 *
 * Example 2:
 * Input: intervals = [[1,4],[4,5]]
 * Output: [[1,5]]
 * Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 *
 * Constraints:
 * 1 <= intervals.length <= 10^4
 * intervals[i].length == 2
 * 0 <= starti <= endi <= 10^4
 */

/**
 * Approach 1: Brute Force (Conceptual - Not fully implemented as it's highly inefficient)
 *
 * The brute-force approach would involve comparing every interval with every other interval.
 * If two intervals overlap, merge them and replace the original two with the merged one,
 * then restart the process from the beginning. This is problematic because merging can create
 * new overlaps or change indices, leading to complex state management and very high time complexity.
 *
 * Time Complexity: At least O(N^2) or worse, as each merge could potentially trigger a full scan again.
 * Space Complexity: O(1) or O(N) depending on how merges are handled.
 *
 * Given its inefficiency and complexity of implementation for a correct solution,
 * it's usually not a viable approach for interviews.
 */

/**
 * Approach 2: Optimal - Sort and Merge
 *
 * The key idea is that if we sort the intervals by their start times, then any overlapping
 * intervals must be adjacent in the sorted list. This simplifies the merging process significantly.
 *
 * Steps:
 * 1. Sort the `intervals` array based on the start time of each interval.
 *    If `intervals = [[1,3],[8,10],[2,6],[15,18]]`, after sorting it becomes `[[1,3],[2,6],[8,10],[15,18]]`.
 * 2. Initialize an empty list, `mergedIntervals`, to store the results.
 * 3. Iterate through the sorted intervals:
 *    a. If `mergedIntervals` is empty, or the current interval does not overlap with the last
 *       interval in `mergedIntervals`, then add the current interval to `mergedIntervals`.
 *       Two intervals `[a,b]` and `[c,d]` do NOT overlap if `b < c` or `d < a`.
 *       Specifically, for sorted intervals, `[last_start, last_end]` and `[current_start, current_end]`,
 *       they do not overlap if `last_end < current_start`.
 *    b. If the current interval *does* overlap with the last interval in `mergedIntervals`,
 *       then merge them. Update the `end` of the last interval in `mergedIntervals` to be
 *       the maximum of `last_end` and `current_end`.
 *       Merge `[last_start, last_end]` and `[current_start, current_end]` into
 *       `[last_start, Math.max(last_end, current_end)]`.
 * 4. Return `mergedIntervals`.
 *
 * Example Walkthrough: `intervals = [[1,3],[2,6],[8,10],[15,18]]`
 * - Sort: `[[1,3],[2,6],[8,10],[15,18]]` (already sorted)
 * - `mergedIntervals = []`
 * - Process `[1,3]`: `mergedIntervals` is empty. Add `[1,3]`. -> `[[1,3]]`
 * - Process `[2,6]`:
 *   - Last interval in `mergedIntervals`: `[1,3]`.
 *   - `last_end (3) >= current_start (2)` -> Overlap!
 *   - Merge: `[1, Math.max(3, 6)]` -> `[1,6]`. Update `mergedIntervals[0]` to `[1,6]`.
 *   - `mergedIntervals` -> `[[1,6]]`
 * - Process `[8,10]`:
 *   - Last interval in `mergedIntervals`: `[1,6]`.
 *   - `last_end (6) < current_start (8)` -> No overlap!
 *   - Add `[8,10]`.
 *   - `mergedIntervals` -> `[[1,6],[8,10]]`
 * - Process `[15,18]`:
 *   - Last interval in `mergedIntervals`: `[8,10]`.
 *   - `last_end (10) < current_start (15)` -> No overlap!
 *   - Add `[15,18]`.
 *   - `mergedIntervals` -> `[[1,6],[8,10],[15,18]]`
 * - Return `[[1,6],[8,10],[15,18]]`.
 *
 * @param {number[][]} intervals An array of intervals, where each interval is [start, end].
 * @returns {number[][]} An array of merged, non-overlapping intervals.
 */
function mergeIntervalsOptimal(intervals) {
    if (intervals.length <= 1) {
        return intervals;
    }

    // Step 1: Sort the intervals by their start times.
    // If start times are equal, order by end times (though not strictly necessary for correctness,
    // it can provide a consistent order).
    intervals.sort((a, b) => a[0] - b[0]);

    // Step 2: Initialize a list to store the merged intervals.
    const mergedIntervals = [];

    // Step 3: Iterate through the sorted intervals.
    for (const currentInterval of intervals) {
        // If the mergedIntervals list is empty OR
        // the current interval does not overlap with the last merged interval,
        // then simply add the current interval to the merged list.
        // No overlap condition: last_merged_interval_end < current_interval_start
        if (mergedIntervals.length === 0 ||
            mergedIntervals[mergedIntervals.length - 1][1] < currentInterval[0]) {
            mergedIntervals.push(currentInterval);
        } else {
            // Otherwise, there is an overlap. Merge the current interval with the last merged interval.
            // The new end will be the maximum of the current end and the last merged interval's end.
            mergedIntervals[mergedIntervals.length - 1][1] = Math.max(
                mergedIntervals[mergedIntervals.length - 1][1],
                currentInterval[1]
            );
        }
    }

    return mergedIntervals;
}

/**
 * Complexity Analysis for mergeIntervalsOptimal:
 * - Time Complexity: O(N log N)
 *   - The dominant factor is the sorting step, which takes O(N log N) time, where N is the number of intervals.
 *   - The single pass through the sorted intervals takes O(N) time.
 *   - Total: O(N log N) + O(N) = O(N log N).
 * - Space Complexity: O(N)
 *   - If the sorting algorithm uses extra space (e.g., Timsort in JavaScript's `sort` for arrays > 10 elements),
 *     it can be O(N).
 *   - The `mergedIntervals` array can, in the worst case (no overlaps), store all N intervals, requiring O(N) space.
 *   - Total: O(N).
 */

module.exports = {
    mergeIntervalsOptimal,
};
```