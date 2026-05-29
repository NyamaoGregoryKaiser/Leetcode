"""
Problem 3: Longest Consecutive Sequence

Given an unsorted array of integers `nums`, return the length of the longest
consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example 1:
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Its length is 4.

Example 2:
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
Explanation: The longest consecutive elements sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8]. Its length is 9.
"""

class LongestConsecutiveSequence:
    def __init__(self):
        pass

    # Approach 1: Sorting (Not O(n), but a common first thought)
    # Sort the array, then iterate through it to find consecutive sequences.
    # This approach violates the O(n) time complexity constraint.
    def longest_consecutive_sort(self, nums: list[int]) -> int:
        """
        Finds the longest consecutive sequence by first sorting the array.

        Time Complexity: O(N log N)
            - Dominated by the sorting step (`nums.sort()`).
            - The subsequent single pass through the sorted array is O(N).

        Space Complexity: O(1) or O(N)
            - O(1) if modifying the input array in-place for sorting (e.g., Timsort in Python).
            - O(N) if the sorting algorithm requires auxiliary space.
        """
        if not nums:
            return 0

        nums.sort() # O(N log N)
        longest_streak = 0
        current_streak = 0

        for i in range(len(nums)):
            # Handle duplicates: skip if current element is same as previous
            if i > 0 and nums[i] == nums[i-1]:
                continue
            # If current element is consecutive to previous
            elif i > 0 and nums[i] == nums[i-1] + 1:
                current_streak += 1
            # If not consecutive, start a new streak
            else:
                current_streak = 1
            
            longest_streak = max(longest_streak, current_streak)
        
        return longest_streak

    # Approach 2: Using a Hash Set (Optimal O(n))
    # Convert the array into a hash set for O(1) average time lookups.
    # Iterate through the original array (or the set). For each number `num`,
    # check if `num - 1` exists in the set. If it doesn't, `num` is the start
    # of a potential consecutive sequence.
    # Then, count how long the sequence starting from `num` goes by checking `num+1`, `num+2`, etc.
    def longest_consecutive_hash_set(self, nums: list[int]) -> int:
        """
        Finds the longest consecutive sequence using a hash set.

        Time Complexity: O(N)
            - Converting the list to a set takes O(N) time.
            - We iterate through each `num` in the `num_set` once.
            - Inside the loop, when `num` is identified as a potential start of a sequence,
              we enter a `while` loop. Although this seems like a nested loop, each number
              in the input array is visited by the inner `while` loop at most once
              (when it's `current_num`). The total operations for checking `current_num + 1` etc.
              across all sequence starts sum up to O(N).
            - Therefore, the overall time complexity is O(N).

        Space Complexity: O(N)
            - We store all unique numbers from the input array in a hash set.
              In the worst case, all numbers are unique.
        """
        if not nums:
            return 0

        num_set = set(nums) # Convert to a set for O(1) average time lookups
        longest_streak = 0

        # Iterate through the numbers in the set
        for num in num_set:
            # Check if `num` is the start of a sequence.
            # A number `num` is the start of a sequence if `num - 1` is NOT in the set.
            if (num - 1) not in num_set:
                current_num = num
                current_streak = 1

                # Count consecutive numbers upwards
                while (current_num + 1) in num_set:
                    current_num += 1
                    current_streak += 1
                
                longest_streak = max(longest_streak, current_streak)
        
        return longest_streak

# Example Usage:
if __name__ == "__main__":
    solver = LongestConsecutiveSequence()

    test_cases = [
        ([100, 4, 200, 1, 3, 2], 4),
        ([0, 3, 7, 2, 5, 8, 4, 6, 0, 1], 9),
        ([], 0),
        ([1], 1),
        ([1, 2, 0, 1], 3), # Sequence is 0,1,2 length 3
        ([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6], 10) # -1,0,1,3,4,5,6,7,8,9 length 10
    ]

    print("--- Sorting Approach (O(N log N)) ---")
    for nums, expected in test_cases:
        result = solver.longest_consecutive_sort(list(nums)) # Pass a copy if input can be mutated
        print(f"Nums: {nums}, Result: {result}, Expected: {expected}, Match: {result == expected}")

    print("\n--- Hash Set Approach (Optimal O(N)) ---")
    for nums, expected in test_cases:
        result = solver.longest_consecutive_hash_set(list(nums))
        print(f"Nums: {nums}, Result: {result}, Expected: {expected}, Match: {result == expected}")