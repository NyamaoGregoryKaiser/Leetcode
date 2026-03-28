```java
package com.example.sorting.problems;

import com.example.sorting.utils.Interval;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

/**
 * Problem: Merge Intervals
 *
 * Given a collection of intervals, merge all overlapping intervals.
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
 */
public class P2_MergeIntervals {

    /**
     * Approach: Sort and Merge
     * The most efficient approach involves two steps:
     * 1. Sort the intervals based on their start times. If start times are equal,
     *    sort by end times (though primary sort by start is sufficient for correctness).
     * 2. Iterate through the sorted intervals. For each interval, check if it overlaps
     *    with the last merged interval.
     *    - If it overlaps, merge them by updating the end time of the last merged interval
     *      to the maximum of the current interval's end and the last merged interval's end.
     *    - If it does not overlap, add the current interval to the result list as a new merged interval.
     *
     * Time Complexity: O(N log N)
     *   - O(N log N) for sorting the intervals.
     *   - O(N) for iterating through the sorted intervals and merging them.
     *   - Dominated by sorting.
     *
     * Space Complexity: O(N)
     *   - O(N) for storing the merged intervals in the result list.
     *   - O(log N) or O(N) for the space used by the sorting algorithm (e.g., Timsort in Java).
     *
     * @param intervals An array of Interval objects to be merged.
     * @return A List of merged Interval objects.
     * @throws IllegalArgumentException if the input array is null.
     */
    public List<Interval> merge(Interval[] intervals) {
        if (intervals == null) {
            throw new IllegalArgumentException("Input intervals array cannot be null.");
        }
        if (intervals.length <= 1) {
            return new ArrayList<>(Arrays.asList(intervals));
        }

        // 1. Sort intervals by their start times.
        // If start times are equal, sort by end times (for deterministic output, not strictly necessary for correctness).
        Arrays.sort(intervals, Comparator.comparingInt((Interval i) -> i.start)
                                        .thenComparingInt(i -> i.end));

        List<Interval> mergedIntervals = new ArrayList<>();
        // Add the first interval to the merged list as a starting point.
        // It will either be the first merged interval or part of it.
        mergedIntervals.add(intervals[0]);

        // 2. Iterate through the sorted intervals starting from the second one.
        for (int i = 1; i < intervals.length; i++) {
            Interval currentInterval = intervals[i];
            Interval lastMergedInterval = mergedIntervals.get(mergedIntervals.size() - 1);

            // Check for overlap: currentInterval.start <= lastMergedInterval.end
            // Note: If an interval's start is exactly equal to the previous's end, they are considered overlapping
            // and should be merged, e.g., [1,4] and [4,5] merges to [1,5].
            if (currentInterval.start <= lastMergedInterval.end) {
                // Overlap exists, merge them by updating the end of the last merged interval.
                // The new end will be the maximum of the current interval's end and the last merged interval's end.
                // The start remains the same as lastMergedInterval.start
                mergedIntervals.set(
                    mergedIntervals.size() - 1,
                    new Interval(lastMergedInterval.start, Math.max(lastMergedInterval.end, currentInterval.end))
                );
            } else {
                // No overlap, add the current interval as a new merged interval.
                mergedIntervals.add(currentInterval);
            }
        }

        return mergedIntervals;
    }
}
```