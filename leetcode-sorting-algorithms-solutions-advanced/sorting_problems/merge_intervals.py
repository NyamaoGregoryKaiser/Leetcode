# Problem: Merge Overlapping Intervals
# Given an array of `intervals` where `intervals[i] = [start_i, end_i]`,
# merge all overlapping intervals, and return an array of the non-overlapping
# intervals that cover all the intervals in the input.

# --- Optimal Approach: Sort by Start Time ---
# Time Complexity: O(N log N) dominated by the sorting step.
# Space Complexity: O(N) or O(log N) depending on sort implementation (for auxiliary space for sorting)
#                     or O(N) in the worst case for the result list if no merges happen.

def merge_intervals_optimal(intervals: list[list[int]]) -> list[list[int]]:
    """
    Merges all overlapping intervals in a given list.

    The algorithm is as follows:
    1. Sort the intervals based on their start times. This is crucial because it ensures
       that when we consider an interval, all potential preceding overlapping intervals
       have already been processed.
    2. Initialize an empty list `merged_intervals` to store the result.
    3. Iterate through the sorted intervals:
       a. If `merged_intervals` is empty, or if the current interval's start time is
          greater than the end time of the last interval in `merged_intervals`,
          then there is no overlap. Add the current interval to `merged_intervals`.
       b. Otherwise (if there is an overlap), update the end time of the last interval
          in `merged_intervals` to be the maximum of its current end time and the
          current interval's end time. This effectively merges the two intervals.

    Args:
        intervals (list[list[int]]): A list of intervals, where each interval
                                     is represented as `[start, end]`.

    Returns:
        list[list[int]]: A new list of non-overlapping intervals, merged.
                         Returns an empty list if the input is empty.
    """
    if not intervals:
        return []

    # Step 1: Sort intervals by their start times.
    # Python's default sort (Timsort) is O(N log N)
    intervals.sort(key=lambda x: x[0])

    merged_intervals = []

    # Step 2 & 3: Iterate through sorted intervals and merge
    for current_start, current_end in intervals:
        # Case A: `merged_intervals` is empty OR no overlap with the last merged interval.
        # No overlap occurs if the current interval's start is greater than the
        # end of the last merged interval.
        if not merged_intervals or current_start > merged_intervals[-1][1]:
            merged_intervals.append([current_start, current_end])
        # Case B: Overlap with the last merged interval.
        # Update the end of the last merged interval to the maximum of its current
        # end and the current interval's end.
        else:
            merged_intervals[-1][1] = max(merged_intervals[-1][1], current_end)

    return merged_intervals

# Example of intervals to demonstrate the logic:
# Input: [[1,3],[2,6],[8,10],[15,18]]

# 1. Sort: [[1,3],[2,6],[8,10],[15,18]] (already sorted)

# 2. merged_intervals = []

# 3. Iterate:
#    - current = [1,3]
#      merged_intervals is empty, append [1,3].
#      merged_intervals = [[1,3]]

#    - current = [2,6]
#      current_start (2) <= merged_intervals[-1][1] (3), so overlap.
#      Update merged_intervals[-1][1] = max(3, 6) = 6.
#      merged_intervals = [[1,6]]

#    - current = [8,10]
#      current_start (8) > merged_intervals[-1][1] (6), no overlap.
#      Append [8,10].
#      merged_intervals = [[1,6], [8,10]]

#    - current = [15,18]
#      current_start (15) > merged_intervals[-1][1] (10), no overlap.
#      Append [15,18].
#      merged_intervals = [[1,6], [8,10], [15,18]]

# Final result: [[1,6],[8,10],[15,18]]