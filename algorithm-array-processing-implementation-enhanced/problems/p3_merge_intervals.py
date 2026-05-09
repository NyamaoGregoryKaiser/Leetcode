def merge_intervals_sorted(intervals: list[list[int]]) -> list[list[int]]:
    """
    Merges a collection of overlapping intervals.

    Algorithm:
    1. Sort the intervals based on their start times. This is crucial because
       it ensures that when we iterate, we only need to compare the current
       interval with the last merged interval.
    2. Initialize an empty list `merged_intervals` to store the result.
    3. Iterate through the sorted intervals:
       a. If `merged_intervals` is empty, or the current interval's start time
          is greater than the end time of the last interval in `merged_intervals`,
          it means there's no overlap. Add the current interval to `merged_intervals`.
       b. Otherwise (there is an overlap), update the end time of the last
          interval in `merged_intervals` to be the maximum of its current end time
          and the current interval's end time. This effectively merges them.

    Time Complexity: O(n log n) due to sorting, where n is the number of intervals.
                     The merging process itself is O(n) as we iterate once through
                     the sorted intervals.
    Space Complexity: O(n) for the output list `merged_intervals`. In Python,
                      the sort also might take O(n) space in the worst case
                      (Timsort, used by Python, can take O(n) aux space).
    """
    if not intervals:
        return []

    # 1. Sort intervals by their start times
    intervals.sort(key=lambda x: x[0])

    merged_intervals = []

    for interval in intervals:
        # 2. If the merged_intervals list is empty or if the current interval
        #    does not overlap with the previous merged interval,
        #    simply add it to the list.
        if not merged_intervals or interval[0] > merged_intervals[-1][1]:
            merged_intervals.append(interval)
        # 3. Otherwise, there is an overlap, so merge the current and previous
        #    intervals by updating the end time of the previous merged interval
        #    if the current interval's end is greater.
        else:
            merged_intervals[-1][1] = max(merged_intervals[-1][1], interval[1])
            
    return merged_intervals

# Example Usage (demonstrated in main.py)
if __name__ == '__main__':
    test_cases = [
        [[1, 3], [2, 6], [8, 10], [15, 18]], # Expected: [[1, 6], [8, 10], [15, 18]]
        [[1, 4], [4, 5]],                   # Expected: [[1, 5]]
        [[1, 4], [0, 4]],                   # Expected: [[0, 4]]
        [[1, 4], [0, 0]],                   # Expected: [[0, 0], [1, 4]]
        [[1, 2], [3, 4], [5, 6]],           # Expected: [[1, 2], [3, 4], [5, 6]]
        [[1, 10], [2, 3], [4, 5], [6, 7]],  # Expected: [[1, 10]]
        []                                  # Expected: []
    ]

    for intervals in test_cases:
        print(f"Input intervals: {intervals}")
        merged = merge_intervals_sorted(intervals)
        print(f"Merged intervals: {merged}\n")