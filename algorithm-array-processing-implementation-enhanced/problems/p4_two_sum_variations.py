def two_sum_hash_map(nums: list[int], target: int) -> list[int]:
    """
    Finds two numbers in the array that add up to a specific target.
    Returns their indices. Assumes exactly one solution.

    Algorithm:
    1. Iterate through the array.
    2. For each number `num` at index `i`, calculate its `complement = target - num`.
    3. Check if `complement` is already in a hash map (dictionary).
       a. If it is, we found the pair! Return the index of the complement
          (stored in the hash map) and the current index `i`.
       b. If it's not, add the current number `num` and its index `i` to the hash map.

    Time Complexity: O(n), where n is the length of the array.
                     Each lookup/insertion in a hash map takes O(1) on average.
    Space Complexity: O(n), in the worst case, all elements might be stored
                      in the hash map if no pair is found until the last element.
    """
    num_map = {}  # {number: index}

    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    
    # If no solution exists, or problem guarantees one.
    # In competitive programming, problems often guarantee a solution.
    return [] # Or raise an error

def two_sum_two_pointers_sorted(nums: list[int], target: int) -> list[int]:
    """
    Finds two numbers in a (potentially sorted) array that add up to a specific target.
    This version assumes the array is sorted or will be sorted as part of the process.
    If original indices are required, this method needs modification (e.g., storing pairs of (value, original_index) and sorting).
    For simplicity, here we just return values, or indices relative to the sorted array.
    This implementation returns the values themselves.

    Algorithm:
    1. Sort the input array `nums`.
    2. Initialize two pointers: `left` at the beginning and `right` at the end of the array.
    3. While `left < right`:
       a. Calculate `current_sum = nums[left] + nums[right]`.
       b. If `current_sum == target`, we found the pair. Return `[nums[left], nums[right]]`.
       c. If `current_sum < target`, we need a larger sum, so move `left` pointer to the right (`left += 1`).
       d. If `current_sum > target`, we need a smaller sum, so move `right` pointer to the left (`right -= 1`).

    Time Complexity: O(n log n) due to sorting. The two-pointer scan is O(n).
    Space Complexity: O(log n) to O(n) depending on the sort implementation (e.g., Timsort in Python).
                      O(1) if the input array is already sorted and we don't count the sorting space.
    """
    # If the problem requires returning original indices, store (value, original_index) pairs
    # and then sort. For this problem, we'll just sort and return values for simplicity.
    # If indices in sorted array are OK, this works too.
    
    nums.sort() # Sort the array first

    left, right = 0, len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            # If indices were needed: find original indices.
            # E.g., for [2,7,11,15], target 9. Sorted: [2,7,11,15]. left=0, right=1.
            # This implementation returns the values.
            return [nums[left], nums[right]]
        elif current_sum < target:
            left += 1
        else: # current_sum > target
            right -= 1
    
    return [] # No such pair found

def three_sum(nums: list[int]) -> list[list[int]]:
    """
    Finds all unique triplets in the array which give the sum of zero.
    The solution set must not contain duplicate triplets.

    Algorithm:
    1. Sort the input array `nums`. This is critical for the two-pointer approach
       and for efficiently handling duplicates.
    2. Iterate through the array with a primary pointer `i` from `0` to `n-3`.
       a. Skip duplicate values for `nums[i]` to avoid duplicate triplets.
       b. For each `nums[i]`, set `left = i + 1` and `right = n - 1`.
       c. Calculate the `target = -nums[i]`. We are looking for `nums[left] + nums[right] == target`.
       d. Use the two-pointer approach:
          i. While `left < right`:
             If `nums[left] + nums[right] == target`:
                Add `[nums[i], nums[left], nums[right]]` to the result.
                Increment `left` and decrement `right`.
                Crucially, skip duplicate values for `nums[left]` and `nums[right]`
                to avoid duplicate triplets in the result.
             Else if `nums[left] + nums[right] < target`:
                Increment `left` to increase the sum.
             Else (`nums[left] + nums[right] > target`):
                Decrement `right` to decrease the sum.

    Time Complexity: O(n^2), where n is the length of the array.
                     Sorting takes O(n log n). The outer loop runs n times.
                     The inner two-pointer loop runs O(n) times.
                     Overall: O(n log n + n*n) = O(n^2).
    Space Complexity: O(log n) to O(n) for sorting (depends on implementation).
                      O(number of triplets) for the result list.
    """
    nums.sort()
    n = len(nums)
    result = []

    for i in range(n - 2):
        # Skip duplicate values for the first element of the triplet
        # If nums[i] is the same as the previous nums[i-1], it will yield
        # duplicate triplets with the same two pointers.
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        left, right = i + 1, n - 1
        target = -nums[i] # We are looking for nums[left] + nums[right] == -nums[i]

        while left < right:
            current_sum = nums[left] + nums[right]

            if current_sum == target:
                result.append([nums[i], nums[left], nums[right]])
                
                # Skip duplicate values for the second and third elements
                # of the triplet to avoid duplicate triplets in the result.
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                
                left += 1
                right -= 1
            elif current_sum < target:
                left += 1
            else: # current_sum > target
                right -= 1
    
    return result

def four_sum(nums: list[int], target: int) -> list[list[int]]:
    """
    Finds all unique quadruplets in the array which give the sum of a specific target.
    The solution set must not contain duplicate quadruplets.
    This is an extension of the Three Sum problem.

    Algorithm:
    1. Sort the input array `nums`.
    2. Iterate through the array with a primary pointer `i` from `0` to `n-4`.
       a. Skip duplicate values for `nums[i]`.
       b. Nested loop with a second pointer `j` from `i+1` to `n-3`.
       c. Skip duplicate values for `nums[j]`.
       d. Set `left = j + 1` and `right = n - 1`.
       e. Calculate `two_sum_target = target - nums[i] - nums[j]`.
       f. Use the two-pointer approach for the remaining two elements:
          i. While `left < right`:
             If `nums[left] + nums[right] == two_sum_target`:
                Add `[nums[i], nums[j], nums[left], nums[right]]` to the result.
                Increment `left` and decrement `right`.
                Skip duplicate values for `nums[left]` and `nums[right]`.
             Else if `nums[left] + nums[right] < two_sum_target`:
                Increment `left`.
             Else (`nums[left] + nums[right] > two_sum_target`):
                Decrement `right`.

    Time Complexity: O(n^3), where n is the length of the array.
                     Sorting is O(n log n). Two outer loops (i and j) run O(n^2) times.
                     The inner two-pointer loop runs O(n) times.
                     Overall: O(n log n + n*n*n) = O(n^3).
    Space Complexity: O(log n) to O(n) for sorting.
                      O(number of quadruplets) for the result list.
    """
    nums.sort()
    n = len(nums)
    result = []

    for i in range(n - 3):
        if i > 0 and nums[i] == nums[i - 1]:
            continue # Skip duplicate first elements

        for j in range(i + 1, n - 2):
            if j > i + 1 and nums[j] == nums[j - 1]:
                continue # Skip duplicate second elements

            left, right = j + 1, n - 1
            two_sum_target = target - nums[i] - nums[j]

            while left < right:
                current_sum = nums[left] + nums[right]

                if current_sum == two_sum_target:
                    result.append([nums[i], nums[j], nums[left], nums[right]])

                    # Skip duplicate values for the third and fourth elements
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    
                    left += 1
                    right -= 1
                elif current_sum < two_sum_target:
                    left += 1
                else: # current_sum > two_sum_target
                    right -= 1
    
    return result


# Example Usage (demonstrated in main.py)
if __name__ == '__main__':
    # Two Sum
    nums_ts = [2, 7, 11, 15]
    target_ts = 9
    print(f"Two Sum (Hash Map): {nums_ts}, Target: {target_ts} -> {two_sum_hash_map(nums_ts, target_ts)}") # Expected: [0, 1]
    
    nums_ts_sorted = [2, 7, 11, 15] # For two pointers, assume sorted or copy & sort
    print(f"Two Sum (Two Pointers - values): {nums_ts_sorted}, Target: {target_ts} -> {two_sum_two_pointers_sorted(nums_ts_sorted, target_ts)}") # Expected: [2, 7]

    # Three Sum
    nums_3s = [-1, 0, 1, 2, -1, -4]
    print(f"\nThree Sum: {nums_3s} -> {three_sum(nums_3s)}") # Expected: [[-1, -1, 2], [-1, 0, 1]]

    nums_3s_dups = [0, 0, 0, 0]
    print(f"Three Sum with duplicates: {nums_3s_dups} -> {three_sum(nums_3s_dups)}") # Expected: [[0, 0, 0]]

    # Four Sum
    nums_4s = [1, 0, -1, 0, -2, 2]
    target_4s = 0
    print(f"\nFour Sum: {nums_4s}, Target: {target_4s} -> {four_sum(nums_4s, target_4s)}") # Expected: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
    
    nums_4s_target_large = [2,2,2,2,2]
    target_4s_large = 8
    print(f"Four Sum: {nums_4s_target_large}, Target: {target_4s_large} -> {four_sum(nums_4s_target_large, target_4s_large)}") # Expected: [[2,2,2,2]]