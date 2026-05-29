"""
Problem 1: Two Sum

Given an array of integers nums and an integer target, return indices of the two numbers
such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the
same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]
"""

class TwoSum:
    def __init__(self):
        pass

    # Approach 1: Brute Force
    # Iterate through each number and check every other number to see if they sum up to the target.
    def two_sum_brute_force(self, nums: list[int], target: int) -> list[int]:
        """
        Brute force approach for Two Sum.
        Iterates through all possible pairs to find the target sum.

        Time Complexity: O(n^2)
            - The outer loop runs n times.
            - The inner loop runs n times for each iteration of the outer loop.
            - Total operations are proportional to n * n.

        Space Complexity: O(1)
            - No additional data structures are used that grow with input size.
        """
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):  # Start j from i+1 to avoid using the same element twice
                if nums[i] + nums[j] == target:
                    return [i, j]
        return [] # Should not be reached based on problem statement ("exactly one solution")

    # Approach 2: Using a Hash Map (Dictionary) - Optimal
    # Iterate through the array once. For each number, calculate the 'complement' (target - current_number).
    # Check if this complement exists in our hash map. If it does, we found the pair.
    # If not, add the current number and its index to the hash map.
    def two_sum_hash_map(self, nums: list[int], target: int) -> list[int]:
        """
        Optimal approach for Two Sum using a hash map (dictionary).
        Iterates through the list once, storing seen numbers and their indices.

        Time Complexity: O(n)
            - We iterate through the list of numbers once.
            - For each number, dictionary (hash map) operations (insertion `nums_map[num] = i`
              and lookup `complement in nums_map`) take O(1) on average.
            - In the worst case (hash collisions leading to a linked list traversal),
              these operations could be O(n), making the overall worst case O(n^2).
              However, for typical hash map implementations (like Python's dict),
              average case is highly probable.

        Space Complexity: O(n)
            - In the worst case, we might store all 'n' numbers in the hash map if
              no pair is found until the very end of the list.
        """
        nums_map = {}  # Stores {number: index}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in nums_map:
                return [nums_map[complement], i]
            nums_map[num] = i
        return [] # Should not be reached based on problem statement

    # Approach 3: Hash Map (Dictionary) - Alternative structure
    # This is essentially the same as Approach 2, but sometimes people might think of
    # storing complements directly. It's less intuitive for finding the *indices*
    # without modification. The original Approach 2 is cleaner.
    # Included for completeness but not truly "different" in logic for this problem.
    def two_sum_hash_map_alt(self, nums: list[int], target: int) -> list[int]:
        """
        An alternative way of thinking about the hash map approach for Two Sum.
        Functionally identical to two_sum_hash_map for this problem.
        The primary optimal approach is already covered.
        """
        seen_complements = {} # Stores {complement_value: index_of_original_number}
        for i, num in enumerate(nums):
            if num in seen_complements: # If current number 'num' is a complement we needed
                return [seen_complements[num], i]
            # Store the complement needed for 'num', along with current index 'i'
            # So if target - num is X, and X appears later, we know 'i' is the first index.
            seen_complements[target - num] = i
        return []

# Example Usage:
if __name__ == "__main__":
    solver = TwoSum()

    test_cases = [
        ([2, 7, 11, 15], 9, [0, 1]),
        ([3, 2, 4], 6, [1, 2]),
        ([3, 3], 6, [0, 1]),
        ([-1, -2, -3, -4, -5], -8, [2, 4]),
        ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 19, [8, 9]) # Larger test
    ]

    print("--- Brute Force Approach ---")
    for nums, target, expected in test_cases:
        result = solver.two_sum_brute_force(nums, target)
        print(f"Nums: {nums}, Target: {target}, Result: {result}, Expected: {expected}, Match: {result == expected}")

    print("\n--- Hash Map Approach (Optimal) ---")
    for nums, target, expected in test_cases:
        result = solver.two_sum_hash_map(nums, target)
        print(f"Nums: {nums}, Target: {target}, Result: {result}, Expected: {expected}, Match: {result == expected}")

    print("\n--- Hash Map Approach (Alternative, identical logic) ---")
    for nums, target, expected in test_cases:
        result = solver.two_sum_hash_map_alt(nums, target)
        print(f"Nums: {nums}, Target: {target}, Result: {result}, Expected: {expected}, Match: {result == expected}")