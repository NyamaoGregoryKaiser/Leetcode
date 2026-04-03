def merge_intervals_sort(intervals):
    """
    Merges all overlapping intervals in a given list of intervals.
    This is the optimal approach for the problem.

    The algorithm works by first sorting the intervals based on their start times.
    Once sorted, any overlapping intervals must be adjacent. We then iterate
    through the sorted intervals, merging them as we go.

    Time Complexity: O(N log N)
        - Dominated by the sorting step, which takes O(N log N) time, where N is
          the number of intervals.
        - The merging pass takes O(N) time.
    Space Complexity: O(N)
        - O(N) for storing the sorted intervals (if a new list is created for sorting,
          otherwise Python's `list.sort()` is in-place, but result list still O(N)).
        - O(N) for the `merged` list in the worst case (e.g., no overlaps).

    Args:
        intervals (list of list): A list of intervals, where each interval is [start, end].

    Returns:
        list of list: A new list of non-overlapping intervals that cover all
                      intervals in the input.
    """
    if not intervals:
        return []

    # 1. Sort the intervals based on their start times.
    # This is crucial because it ensures that any overlapping intervals will
    # be adjacent in the sorted list.
    intervals.sort(key=lambda x: x[0])

    merged = []
    # Add the first interval to the merged list as a starting point.
    # This also handles the case of a single interval correctly.
    merged.append(intervals[0])

    # 2. Iterate through the rest of the sorted intervals.
    for i in range(1, len(intervals)):
        current_interval = intervals[i]
        last_merged_interval = merged[-1]

        # Check for overlap:
        # If the current interval's start time is less than or equal to the
        # end time of the last merged interval, they overlap.
        if current_interval[0] <= last_merged_interval[1]:
            # Overlap exists. Merge them by extending the end of the
            # last merged interval to the maximum of its current end
            # and the current interval's end.
            last_merged_interval[1] = max(last_merged_interval[1], current_interval[1])
        else:
            # No overlap. Add the current interval as a new, distinct interval.
            merged.append(current_interval)

    return merged

# Example usage (for testing/demonstration outside unit tests)
if __name__ == "__main__":
    test_cases = [
        ([[1,3],[2,6],[8,10],[15,18]], [[1,6],[8,10],[15,18]]),
        ([[1,4],[4,5]], [[1,5]]),
        ([[1,4],[0,4]], [[0,4]]),
        ([[1,4],[0,1]], [[0,4]]),
        ([[1,4],[0,0]], [[0,0],[1,4]]),
        ([[2,3],[4,5],[6,7],[8,9],[1,10]], [[1,10]]),
        ([[1,10]], [[1,10]]),
        ([], []),
        ([[1,2]], [[1,2]]),
        ([[1,4],[0,4],[2,3]], [[0,4]]), # Test with internal overlaps
        ([[1,3],[2,4],[5,7],[6,8]], [[1,4],[5,8]])
    ]

    print("--- Merge Intervals (Sort and Merge) ---")
    for intervals, expected in test_cases:
        # Use a deep copy if intervals contain mutable objects and original list
        # needs to be preserved, though here list of lists is fine.
        result = merge_intervals_sort([list(i) for i in intervals])
        print(f"Input: {intervals}, Result: {result}, Expected: {expected} {'(Correct)' if result == expected else '(Incorrect)'}")