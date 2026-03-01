# alternative_implementations/subsets_iterative.py
# An iterative approach to generating subsets, often using bit manipulation.
# This approach doesn't directly use recursion/backtracking but offers an alternative
# for the Subsets problem, especially useful when the problem states unique elements.

from typing import List

class IterativeSubsets:
    """
    Generates all subsets of a given list of unique integers using an iterative approach.
    This method does not use recursion or explicit backtracking.

    Approach 1: Building Up (used here)
    Start with an empty set `[[]]`. For each number in the input array, iterate through
    all existing subsets and add a new subset by appending the current number to it.

    Example: nums = [1, 2, 3]
    Start: results = [[]]

    1. Process 1:
       - Take existing []: add 1 -> [1]
       results = [[], [1]]

    2. Process 2:
       - Take existing []: add 2 -> [2]
       - Take existing [1]: add 2 -> [1,2]
       results = [[], [1], [2], [1,2]]

    3. Process 3:
       - Take existing []: add 3 -> [3]
       - Take existing [1]: add 3 -> [1,3]
       - Take existing [2]: add 3 -> [2,3]
       - Take existing [1,2]: add 3 -> [1,2,3]
       results = [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]

    Approach 2 (Bit Manipulation):
    For `N` elements, there are `2^N` subsets. Each subset can be represented by a
    binary number from `0` to `2^N - 1`.
    If the `k`-th bit is set in the binary number, it means the `k`-th element
    from `nums` is included in the subset.

    Time Complexity: O(2^N * N)
        - There are 2^N subsets.
        - For each number in `nums`, we iterate through all `current_number_of_subsets`
          which grows up to 2^(i) where i is the current element index.
        - Appending to a list and creating a new list takes O(N) in the worst case
          (when the subset is almost full).

    Space Complexity: O(2^N * N)
        - The `results` list stores 2^N subsets, each possibly up to N elements long.
    """
    def get_subsets(self, nums: List[int]) -> List[List[int]]:
        """
        Generates all subsets iteratively using the 'building up' method.
        """
        results = [[]] # Start with an empty subset

        for num in nums:
            # For each number, iterate through all subsets *currently* in results
            # and add a new subset by appending the current number to them.
            # We must use results[:] to iterate over a copy,
            # because we are modifying `results` inside the loop.
            for current_subset in results[:]:
                new_subset = list(current_subset) # Make a copy
                new_subset.append(num)
                results.append(new_subset)
        
        return results

    def get_subsets_bit_manipulation(self, nums: List[int]) -> List[List[int]]:
        """
        Generates all subsets using bit manipulation.
        This method is generally cleaner for unique elements.
        """
        n = len(nums)
        results = []
        
        # There are 2^n possible subsets, represented by numbers from 0 to 2^n - 1
        for i in range(1 << n): # 1 << n is equivalent to 2^n
            current_subset = []
            for j in range(n):
                # If the j-th bit of i is set, include nums[j]
                if (i >> j) & 1:
                    current_subset.append(nums[j])
            results.append(current_subset)
            
        return results

if __name__ == '__main__':
    solver = IterativeSubsets()

    print("Iterative Subsets (Building Up):")
    nums1 = [1, 2, 3]
    print(f"Nums: {nums1}, Subsets: {solver.get_subsets(nums1)}") # Expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]

    nums2 = [4, 5]
    print(f"Nums: {nums2}, Subsets: {solver.get_subsets(nums2)}") # Expected: [[], [4], [5], [4, 5]]

    nums3 = []
    print(f"Nums: {nums3}, Subsets: {solver.get_subsets(nums3)}") # Expected: [[]]

    print("\nIterative Subsets (Bit Manipulation):")
    nums4 = [1, 2, 3]
    print(f"Nums: {nums4}, Subsets: {solver.get_subsets_bit_manipulation(nums4)}") # Expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]

    nums5 = [4, 5]
    print(f"Nums: {nums5}, Subsets: {solver.get_subsets_bit_manipulation(nums5)}") # Expected: [[], [4], [5], [4, 5]]

    nums6 = []
    print(f"Nums: {nums6}, Subsets: {solver.get_subsets_bit_manipulation(nums6)}") # Expected: [[]]