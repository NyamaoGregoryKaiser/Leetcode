def merge_intervals(intervals):
    """
    Problem 2: Merge Intervals.
    Given a collection of intervals, merge all overlapping intervals.

    An interval is represented as a list/tuple `[start, end]`.
    The solution first sorts the intervals by their start times.
    Then, it iterates through the sorted intervals, merging them if they overlap.

    Args:
        intervals (list of lists/tuples): A list of intervals, e.g., [[1,3], [2,6], ...].

    Returns:
        list of lists/tuples: A new list of non-overlapping intervals.

    Time Complexity:
        - O(n log n) - Dominated by the sorting step (n is the number of intervals).
                      The merging step takes O(n) time as each interval is processed once.

    Space Complexity:
        - O(n) - For storing the sorted intervals and the merged results.
                 Python's `sort()` might use O(log n) or O(n) depending on implementation details.
    """
    if not intervals:
        return []

    # 1. Sort the intervals based on their start times.
    # This is crucial for the linear scan approach to work correctly.
    # If two intervals have the same start time, their relative order doesn't matter
    # for correctness, but often stable sort is preferred.
    intervals.sort(key=lambda x: x[0])

    merged_intervals = []
    # Start with the first interval
    merged_intervals.append(intervals[0])

    # 2. Iterate through the rest of the sorted intervals and merge
    for i in range(1, len(intervals)):
        current_interval = intervals[i]
        last_merged_interval = merged_intervals[-1]

        # Check for overlap: current interval starts before or at the end of the last merged interval
        if current_interval[0] <= last_merged_interval[1]:
            # Overlap exists, merge them by extending the end of the last merged interval
            # The new end is the maximum of the two interval's ends
            last_merged_interval[1] = max(last_merged_interval[1], current_interval[1])
        else:
            # No overlap, add the current interval to the merged list as a new non-overlapping interval
            merged_intervals.append(current_interval)

    return merged_intervals
```