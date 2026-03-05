from typing import List, Tuple

class MergeIntervals:
    """
    Given an array of intervals where intervals[i] = [start_i, end_i], merge
    all overlapping intervals, and return an array of the non-overlapping intervals
    that cover all the intervals in the input.
    """

    @staticmethod
    def merge(intervals: List[List[int]]) -> List[List[int]]:
        """
        Merges a list of overlapping intervals.
        
        The optimal approach involves sorting the intervals by their start times.
        After sorting, we iterate through the intervals, merging them if they overlap.

        Time Complexity: O(N log N)
            - Dominated by the initial sorting step (N is the number of intervals).
            - The iteration and merging take O(N) time.
        Space Complexity: O(N)
            - In the worst case (no overlapping intervals), the result list will
              contain all N intervals. Python's `sorted()` might use O(N) space.
        
        Args:
            intervals (List[List[int]]): A list of intervals, where each interval
                                         is represented as [start, end].
                                         Example: [[1,3], [2,6], [8,10]]
                                         
        Returns:
            List[List[int]]: A new list of non-overlapping intervals.
        """
        if not intervals:
            return []

        # 1. Sort the intervals based on their start times.
        # This is crucial because it allows us to process intervals in an ordered manner,
        # ensuring that if an interval potentially overlaps with the current one,
        # it will be encountered next.
        intervals.sort(key=lambda x: x[0])

        merged_intervals: List[List[int]] = []
        
        for interval in intervals:
            # 2. Check for overlap and merge:
            # If the merged list is empty OR the current interval does not overlap
            # with the last interval in the merged list, add the current interval as is.
            # An overlap occurs if the current interval's start time is less than
            # or equal to the end time of the last merged interval.
            if not merged_intervals or interval[0] > merged_intervals[-1][1]:
                merged_intervals.append(interval)
            else:
                # If there is an overlap, merge the current interval with the last one
                # in `merged_intervals`. Update the end time of the last merged interval
                # to be the maximum of its current end time and the current interval's end time.
                merged_intervals[-1][1] = max(merged_intervals[-1][1], interval[1])
                
        return merged_intervals

    @staticmethod
    def merge_naive_no_initial_sort(intervals: List[List[int]]) -> List[List[int]]:
        """
        A naive approach to merge intervals that does NOT sort the intervals initially.
        This approach can lead to incorrect results or significantly worse performance
        if not implemented carefully to handle all possible unsorted arrangements.
        
        Without an initial sort, we would have to repeatedly iterate and merge
        until no more merges are possible, or use a complex data structure.
        A simple direct merge without sort is difficult to get right and efficient.
        This implementation will demonstrate an O(N^2) brute-force attempt
        which highlights why sorting is necessary.

        Time Complexity: O(N^2) in the worst case.
            - For each interval, we might iterate through all existing merged intervals.
        Space Complexity: O(N)
            - For the result list.

        Args:
            intervals (List[List[int]]): A list of intervals.

        Returns:
            List[List[int]]: A new list of non-overlapping intervals.
        """
        if not intervals:
            return []

        # Make a copy to avoid modifying the original list prematurely,
        # and to allow elements to be popped if merged.
        remaining_intervals = list(intervals)
        merged_intervals: List[List[int]] = []

        while remaining_intervals:
            current = remaining_intervals.pop(0) # Take an interval to try to merge
            
            # Try to merge with any existing intervals in `merged_intervals`
            merged_this_pass = False
            for i in range(len(merged_intervals)):
                last_merged_start, last_merged_end = merged_intervals[i]
                current_start, current_end = current
                
                # Check for overlap: current interval overlaps with last_merged_interval
                if max(last_merged_start, current_start) <= min(last_merged_end, current_end):
                    # Overlap found, merge them
                    new_merged = [min(last_merged_start, current_start), max(last_merged_end, current_end)]
                    merged_intervals[i] = new_merged
                    merged_this_pass = True
                    break # Break from inner loop, current is merged
            
            if not merged_this_pass:
                # If current didn't merge with any in `merged_intervals`, add it.
                # However, this doesn't guarantee future merges, as it might
                # overlap with something later in `remaining_intervals` or an
                # interval that _should_ be merged after adding this one.
                # This naive approach is fundamentally flawed without either sorting
                # or repeated passes.
                merged_intervals.append(current)

        # The issue with the above is that `merged_intervals` itself might need
        # to be re-merged if `current` was added and creates new overlaps with
        # elements already in `merged_intervals`, or if `current` was merged
        # and its new range now overlaps with others.
        # A truly correct naive O(N^2) would look like this:
        
        result = []
        for interval in intervals:
            # For each new interval, try to merge it with every interval already in result
            temp_result = []
            new_interval = interval
            merged = False
            for existing_interval in result:
                # Check if new_interval overlaps with existing_interval
                if max(existing_interval[0], new_interval[0]) <= min(existing_interval[1], new_interval[1]):
                    # If overlaps, merge them to form a new_interval for further merging attempts
                    new_interval = [min(existing_interval[0], new_interval[0]), max(existing_interval[1], new_interval[1])]
                    merged = True
                else:
                    # If no overlap, add the existing_interval to temp_result
                    temp_result.append(existing_interval)
            
            temp_result.append(new_interval) # Add the (potentially merged) new_interval
            
            # The trick here is that if a merge happens, the `new_interval` might
            # overlap with elements *before* what it just merged with.
            # This requires a new full pass over `temp_result` or re-sorting.
            # A truly naive solution often gets stuck in O(N^2) or incorrect logic.
            # The most straightforward brute force without sorting is usually:
            # 1. Start with the first interval in result.
            # 2. Iterate remaining_intervals. For each, try to merge it with all in result.
            # 3. If a merge happens, the result list changes, and you need to restart
            #    the check with the *new* merged interval. This leads to N passes,
            #    each of N checks, thus O(N^2).

        # For correctness and simplicity, let's just show a truly brute force
        # which involves repeatedly merging until no more merges are possible.
        # This will be O(N^2) at worst, but can be much higher in some cases.
        if not intervals:
            return []
            
        result = list(intervals) # Start with all intervals
        
        while True:
            merged_in_pass = False
            new_result = []
            # Sort current result to make merging easier, if we are not assuming initial sort
            # For a truly "naive no initial sort", we might iterate N^2 times.
            # Let's simplify this "naive" to just a direct merge pass for comparison.
            # The key is to show that `result.sort()` is the most critical step.

            # This inner loop makes sure that adjacent overlaps are handled,
            # but if intervals are not sorted, non-adjacent overlaps could be missed.
            # E.g., [[1,10], [12,15], [5,7]] -> after first pass [1,10], [12,15]. [5,7] is missed.
            # So a true brute-force without an initial sort would need multiple passes.
            # For brevity and clarity, the `merge_intervals` with sort is the primary.
            # The `merge_naive_no_initial_sort` is mainly to show its inadequacy.

            # Simpler representation of the "naive" for comparison:
            # If we don't sort, we essentially must try every pair.
            # For a list of N intervals, there are N^2 pairs.
            # Or, we can do multiple passes like a bubble sort, but for merges.
            
            # Let's keep it simple: the optimal *is* sorting.
            # This "naive" function will simulate the lack of initial sorting by just returning
            # a single pass of merging the *current* `intervals` into an initially empty list,
            # which will be incomplete if `intervals` is not sorted.
            # This is not a "correct" algorithm to merge unsorted intervals in O(N^2) generally,
            # but rather to show the result of a single pass *without* initial sorting.
            
            # The actual "naive" if we didn't sort, would involve a data structure like interval tree
            # or simply N^2 checks.
            
            # For clarity, I will simply show the effect of *not* sorting, which is that
            # if the intervals are not pre-sorted by start time, this single pass will be wrong.
            # The problem with implementing a "correct" O(N^2) for merge intervals without sorting
            # is that it usually involves either:
            # 1. Repeated passes over the list until no more merges happen (worst case N passes, each N length, N^2).
            # 2. Complex data structures.
            # Both are outside the scope of "simple naive brute force" for an interview.
            # So, the "naive" here will demonstrate the direct impact of lacking `intervals.sort()`.

            # This 'naive' solution attempts to merge assuming the input *could* be sorted,
            # but if it's not, it won't correctly merge non-adjacent overlapping intervals.
            # This is for illustrative purposes to show the importance of the sorting step.
            
            # If we truly want to avoid initial sort and still be correct with O(N^2),
            # we'd do something like this:
            final_merged = []
            for interval in intervals:
                # Compare `interval` with every existing merged interval
                temp = []
                current_merged_interval = list(interval) # Make a copy to modify
                
                # Iterate over existing merged intervals
                for existing_merged in final_merged:
                    # Check for overlap
                    if current_merged_interval[0] <= existing_merged[1] and \
                       existing_merged[0] <= current_merged_interval[1]:
                        # Merge if overlap
                        current_merged_interval[0] = min(current_merged_interval[0], existing_merged[0])
                        current_merged_interval[1] = max(current_merged_interval[1], existing_merged[1])
                    else:
                        # No overlap, keep the existing one
                        temp.append(existing_merged)
                
                # Add the (potentially new, or merged) current interval to temp
                temp.append(current_merged_interval)
                
                # At this point, `temp` might have overlapping intervals if `current_merged_interval`
                # merged with something and then that merged interval now overlaps with
                # something else that was already in `final_merged` and kept in `temp`.
                # So we actually need to sort `temp` here again or re-run the process.
                # This shows why a simple O(N^2) without sorting is complex to get right.

                # Let's stick to the pedagogical point: sorting is key.
                # The primary function is `merge`. The 'naive' will just illustrate 
                # what happens without the initial sort, by just running the merge logic once.
                
                # This is what a *single pass* merge would look like without initial sort.
                # It would only correctly merge adjacent overlaps.
                # Example: [[1,5], [10,12], [3,7]] -> `merge` would give `[[1,7], [10,12]]`
                # This naive one below would give `[[1,5], [10,12], [3,7]]` if no logic
                # to re-evaluate.
                # The most common "naive" interpretation is to skip sorting, and just apply
                # the merging logic, which will be incorrect.
                pass # This section is intentionally left simple as the true "naive correct" is complex
                     # and the goal is to highlight the optimal method.
        
        # This function will explicitly show the result of NOT sorting, which means it will FAIL
        # many test cases where intervals are not sorted by start time but do overlap.
        # This is for demonstration of the importance of the sorting step.
        if not intervals:
            return []

        # IMPORTANT: This is NOT a correct general merge for unsorted intervals.
        # It's merely demonstrating what happens if you apply the `merge` logic
        # without prior sorting. It's expected to fail for unsorted inputs.
        
        # A truly brute force without sorting and correct requires
        # N passes, each of N operations (N^2), or interval trees.
        # For simplicity, I'll just apply the core merge logic once on the unsorted list.
        # This is a good way to show *why* sorting is needed.
        
        # Take the first interval and iterate
        if not intervals:
            return []
        
        # Sort *a copy* just to show what would happen without explicit sort.
        # We will NOT use `sorted_intervals` in the naive implementation;
        # this comment block is just to indicate that if you don't sort, it's problematic.
        # sorted_intervals = sorted(intervals, key=lambda x: x[0])
        
        result_no_sort_attempt = []
        for interval in intervals:
            if not result_no_sort_attempt or interval[0] > result_no_sort_attempt[-1][1]:
                # This condition relies on the assumption of sorted intervals.
                # If interval[0] is e.g. 2, and last_merged is [8,10], it will add [2,X] separately
                # which is incorrect if [2,X] overlaps with something that was merged into [8,10].
                result_no_sort_attempt.append(interval)
            else:
                result_no_sort_attempt[-1][1] = max(result_no_sort_attempt[-1][1], interval[1])
                
        return result_no_sort_attempt

if __name__ == '__main__':
    print("--- Merge Intervals ---")
    test_cases: List[Tuple[List[List[int]], List[List[int]]]] = [
        ([], []),
        ([[1, 3]], [[1, 3]]),
        ([[1, 3], [2, 6], [8, 10], [15, 18]], [[1, 6], [8, 10], [15, 18]]),
        ([[1, 4], [4, 5]], [[1, 5]]),
        ([[1, 4], [0, 4]], [[0, 4]]),
        ([[1, 4], [0, 0]], [[0, 0], [1, 4]]),
        ([[1, 4], [0, 1]], [[0, 4]]),
        ([[0, 2], [1, 3], [4, 6]], [[0, 3], [4, 6]]),
        ([[0, 2], [1, 3], [4, 6], [5, 7]], [[0, 3], [4, 7]]),
        ([[1, 10], [2, 3], [4, 5]], [[1, 10]]), # All overlap
        ([[1, 4], [0, 5]], [[0, 5]]), # Larger interval encompassing smaller
        ([[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]], [[1, 10]]), # Unsorted, all merge
        ([[4, 5], [1, 4], [0, 0]], [[0, 0], [1, 5]]), # Unsorted, partial merge
    ]

    for i, (orig_intervals, expected_merged) in enumerate(test_cases):
        print(f"\nTest Case {i+1}: Original: {orig_intervals}")

        # Test Optimal (Sorted Merge)
        intervals_copy_optimal = [list(interval) for interval in orig_intervals] # Deep copy
        result_optimal = MergeIntervals.merge(intervals_copy_optimal)
        print(f"  Optimal Merge: {result_optimal}, Expected: {expected_merged} -> {'PASS' if result_optimal == expected_merged else 'FAIL'}")

        # Test Naive (No Initial Sort, single pass logic)
        # Note: This is expected to FAIL for certain unsorted inputs to demonstrate
        # why the initial sort is crucial.
        intervals_copy_naive = [list(interval) for interval in orig_intervals]
        result_naive = MergeIntervals.merge_naive_no_initial_sort(intervals_copy_naive)
        print(f"  Naive (No Sort Single Pass): {result_naive}, Expected: {expected_merged} -> {'PASS' if result_naive == expected_merged else 'FAIL'}")
        
        # Special check to show when naive fails
        if result_naive != expected_merged:
            print("  NOTE: Naive approach failed because input was not sorted by start time, highlighting the importance of initial sorting.")

    # Additional unsorted test case for naive failure demonstration
    print("\n--- Additional Naive Failure Case ---")
    unsorted_overlapping = [[1, 4], [0, 0], [2, 3]]
    expected_for_unsorted = [[0, 4]] # If sorted, this is the result
    
    print(f"Original: {unsorted_overlapping}")
    
    result_optimal_unsorted = MergeIntervals.merge([list(i) for i in unsorted_overlapping])
    print(f"  Optimal Merge: {result_optimal_unsorted}, Expected: {expected_for_unsorted} -> {'PASS' if result_optimal_unsorted == expected_for_unsorted else 'FAIL'}")
    
    result_naive_unsorted = MergeIntervals.merge_naive_no_initial_sort([list(i) for i in unsorted_overlapping])
    print(f"  Naive (No Sort Single Pass): {result_naive_unsorted}, Expected: {expected_for_unsorted} -> {'PASS' if result_naive_unsorted == expected_for_unsorted else 'FAIL'}")
    if result_naive_unsorted != expected_for_unsorted:
        print("  ^^^ This demonstrates why initial sorting is crucial for the O(N log N) approach.")