import collections

def subarray_sum_brute_force(nums, k):
    """
    Finds the total number of continuous subarrays whose sum equals k
    using a brute-force approach.

    This method iterates through all possible subarrays, calculates their sum,
    and checks if it equals k.

    Time Complexity: O(N^2)
        - The outer loop runs N times.
        - The inner loop runs up to N times, and calculates a sum in O(1) in each step.
    Space Complexity: O(1)
        - No extra space is used beyond a few variables.

    Args:
        nums (list): The input list of integers.
        k (int): The target sum.

    Returns:
        int: The total number of subarrays whose sum equals k.
    """
    count = 0
    n = len(nums)

    if not nums:
        return 0

    for i in range(n):
        current_sum = 0
        # For each starting point i, iterate to all possible end points j
        for j in range(i, n):
            current_sum += nums[j]
            if current_sum == k:
                count += 1
    return count

def subarray_sum_prefix_hashmap(nums, k):
    """
    Finds the total number of continuous subarrays whose sum equals k
    using prefix sums and a hash map. This is the optimal approach.

    The idea is that if `sum[i,j] == k`, then `prefix_sum[j] - prefix_sum[i-1] == k`.
    This implies `prefix_sum[i-1] == prefix_sum[j] - k`.
    As we iterate through the array, we maintain a running `current_sum` (which is `prefix_sum[j]`).
    We then check if `current_sum - k` has been seen before as a `prefix_sum[i-1]`.
    If it has, it means we found one or more subarrays ending at `j` whose sum is `k`.

    Time Complexity: O(N)
        - We iterate through the array once.
        - Hash map operations (insert, lookup) take O(1) on average.
    Space Complexity: O(N)
        - In the worst case, the hash map could store up to N distinct prefix sums.

    Args:
        nums (list): The input list of integers.
        k (int): The target sum.

    Returns:
        int: The total number of subarrays whose sum equals k.
    """
    count = 0
    current_sum = 0
    # A hash map to store the frequency of each prefix sum encountered so far.
    # Initialize with {0: 1} to handle cases where the subarray itself starts
    # from index 0 and sums to k (i.e., current_sum - k == 0).
    prefix_sum_counts = collections.defaultdict(int)
    prefix_sum_counts[0] = 1

    for num in nums:
        current_sum += num
        # If (current_sum - k) exists in the hash map, it means there's a
        # previous prefix sum (prefix_sum[i-1]) such that prefix_sum[j] - prefix_sum[i-1] = k.
        # The value associated with current_sum - k tells us how many such
        # previous prefix sums exist, and thus how many subarrays sum to k.
        if (current_sum - k) in prefix_sum_counts:
            count += prefix_sum_counts[current_sum - k]

        # Increment the count for the current prefix_sum
        prefix_sum_counts[current_sum] += 1

    return count

# Example usage (for testing/demonstration outside unit tests)
if __name__ == "__main__":
    test_cases = [
        ([1, 1, 1], 2, 2),
        ([1, 2, 3], 3, 2), # [1,2] and [3]
        ([1, -1, 0], 0, 3), # [1,-1], [-1,0], [0]
        ([0, 0, 0], 0, 6), # [0]x3, [0,0]x2, [0,0,0]x1
        ([1], 1, 1),
        ([], 1, 0),
        ([-1, -1, 1], 0, 1), # [-1,1]
        ([28, 54, 7, -70, 22, 65, -6], 100, 1) # [28, 54, 7, -70, 22, 65, -6]
    ]

    print("--- Brute Force Approach ---")
    for nums, k, expected in test_cases:
        result = subarray_sum_brute_force(list(nums), k) # Use list(nums) to avoid modifying original
        print(f"Nums: {nums}, k: {k} -> Result: {result}, Expected: {expected} {'(Correct)' if result == expected else '(Incorrect)'}")

    print("\n--- Prefix Sum with Hash Map Approach ---")
    for nums, k, expected in test_cases:
        result = subarray_sum_prefix_hashmap(list(nums), k)
        print(f"Nums: {nums}, k: {k} -> Result: {result}, Expected: {expected} {'(Correct)' if result == expected else '(Incorrect)'}")