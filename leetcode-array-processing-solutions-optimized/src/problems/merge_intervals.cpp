#include "array_manipulation.h"
#include <algorithm> // For std::sort

namespace MergeIntervals {

/**
 * @brief Merges a list of overlapping intervals.
 *
 * Algorithm:
 * 1. If the input list is empty, return an empty list.
 * 2. Sort the intervals based on their start times. This is crucial because it ensures that
 *    when we consider an interval, all potential intervals it could merge with will appear
 *    after it in the sorted list.
 * 3. Initialize a `merged_intervals` list with the first interval from the sorted list.
 * 4. Iterate through the remaining sorted intervals:
 *    a. Let `current_interval` be the interval from the sorted list.
 *    b. Let `last_merged_interval` be the last interval in `merged_intervals`.
 *    c. If `current_interval` overlaps with `last_merged_interval` (i.e., `current_interval.start <= last_merged_interval.end`):
 *       Merge them by updating `last_merged_interval.end = max(last_merged_interval.end, current_interval.end)`.
 *    d. Else (no overlap):
 *       Add `current_interval` to `merged_intervals` as a new non-overlapping interval.
 * 5. Return `merged_intervals`.
 *
 * Example: intervals = [[1,3],[2,6],[8,10],[15,18]]
 *
 * 1. Sort: Already sorted by start times.
 *    [[1,3],[2,6],[8,10],[15,18]]
 *
 * 2. Initialize `merged`:
 *    merged = [[1,3]]
 *
 * 3. Iterate:
 *    - `current_interval` = [2,6]
 *      `last_merged_interval` = [1,3]
 *      Overlap? 2 <= 3 (Yes).
 *      Merge: `last_merged_interval.end = max(3, 6) = 6`.
 *      `merged` becomes [[1,6]]
 *
 *    - `current_interval` = [8,10]
 *      `last_merged_interval` = [1,6]
 *      Overlap? 8 <= 6 (No).
 *      Add `current_interval` to `merged`.
 *      `merged` becomes [[1,6],[8,10]]
 *
 *    - `current_interval` = [15,18]
 *      `last_merged_interval` = [8,10]
 *      Overlap? 15 <= 10 (No).
 *      Add `current_interval` to `merged`.
 *      `merged` becomes [[1,6],[8,10],[15,18]]
 *
 * 4. All intervals processed. Return `[[1,6],[8,10],[15,18]]`.
 *
 * @param intervals A vector of intervals, where each interval is a vector of two integers [start, end].
 * @return A vector of merged, non-overlapping intervals.
 *
 * @complexity
 *   Time: O(N log N) dominated by the sorting step. The iteration through the sorted intervals takes O(N).
 *   Space: O(N) for storing the merged intervals. In the worst case (no overlaps), it will be N intervals.
 *          If the sort is in-place, the auxiliary space is dominated by the output array.
 */
std::vector<std::vector<int>> merge_approach1(std::vector<std::vector<int>>& intervals) {
    if (intervals.empty()) {
        return {};
    }

    // 1. Sort the intervals by their start times.
    // The lambda function `[](const auto& a, const auto& b) { return a[0] < b[0]; }`
    // sorts based on the first element (start time) of each inner vector.
    std::sort(intervals.begin(), intervals.end(), [](const std::vector<int>& a, const std::vector<int>& b) {
        return a[0] < b[0];
    });

    std::vector<std::vector<int>> merged_intervals;
    merged_intervals.push_back(intervals[0]); // Add the first interval to the result

    // 2. Iterate through the sorted intervals starting from the second one.
    for (size_t i = 1; i < intervals.size(); ++i) {
        // Get the last interval added to our merged list
        std::vector<int>& last_merged = merged_intervals.back();
        // Get the current interval from the sorted input list
        const std::vector<int>& current_interval = intervals[i];

        // Check for overlap: If the current interval's start time is less than or
        // equal to the end time of the last merged interval.
        if (current_interval[0] <= last_merged[1]) {
            // Overlap: Merge by extending the end time of the last merged interval.
            // Take the maximum of the two end times to cover both.
            last_merged[1] = std::max(last_merged[1], current_interval[1]);
        } else {
            // No overlap: Add the current interval as a new, separate merged interval.
            merged_intervals.push_back(current_interval);
        }
    }

    return merged_intervals;
}

} // namespace MergeIntervals
---