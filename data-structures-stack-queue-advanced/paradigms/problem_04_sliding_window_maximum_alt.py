from typing import List

"""
Problem 4: Sliding Window Maximum - Brute Force (Alternative Paradigm/Solution)

This file provides a brute-force approach to the Sliding Window Maximum problem.
It serves as a comparison point for the optimized solution found in `main_algorithms/`.

The brute-force method explicitly iterates through each possible window and
finds the maximum element within that window.

Time Complexity: O(N * K), where N is the length of `nums` and K is the window size.
                 For each of the N-K+1 windows, we iterate up to K elements to find the maximum.
Space Complexity: O(1) (excluding the result array).
                  If we count the result array, it's O(N-K+1), which is O(N).

Compare this to the optimal monotonic deque solution which achieves O(N) time.
"""

class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        """
        Finds the maximum element in each sliding window of size `k` using a brute-force approach.

        For each possible starting position of the window, it iterates through
        all `k` elements in that window to find the maximum.

        Time Complexity: O(N * K)
            - The outer loop runs `N - K + 1` times (for each possible window start).
            - The inner `max()` function (or an explicit loop to find max)
              iterates `K` times for each window.
            - Total: (N - K + 1) * K, which simplifies to O(N * K).
        Space Complexity: O(N - K + 1) for the result array, which is O(N).
                          Additional space for variables is O(1).
        """
        if not nums or k == 0:
            return []
        
        n = len(nums)
        if k == 1: # Optimization for k=1 (though brute-force also handles this fine)
            return nums

        results = []
        # Iterate through all possible starting positions of the window
        # The window can start from index 0 up to n - k
        for i in range(n - k + 1):
            # Find the maximum element in the current window [i, i + k - 1]
            current_window_max = float('-inf')
            for j in range(i, i + k):
                current_window_max = max(current_window_max, nums[j])
            results.append(current_window_max)
            
        return results

# Example usage (same as main_algorithms problem to ensure compatibility):
if __name__ == "__main__":
    sol = Solution()

    # Test cases
    nums1 = [1,3,-1,-3,5,3,6,7]
    k1 = 3
    print(f"Nums: {nums1}, k: {k1} -> Max Sliding Window (Brute Force): {sol.maxSlidingWindow(nums1, k1)}") # Expected: [3,3,5,5,6,7]

    nums2 = [1]
    k2 = 1
    print(f"Nums: {nums2}, k: {k2} -> Max Sliding Window (Brute Force): {sol.maxSlidingWindow(nums2, k2)}") # Expected: [1]

    nums3 = [1, -1]
    k3 = 1
    print(f"Nums: {nums3}, k: {k3} -> Max Sliding Window (Brute Force): {sol.maxSlidingWindow(nums3, k3)}") # Expected: [1, -1]

    nums4 = [7, 2, 4]
    k4 = 2
    print(f"Nums: {nums4}, k: {k4} -> Max Sliding Window (Brute Force): {sol.maxSlidingWindow(nums4, k4)}") # Expected: [7, 4]

    nums5 = [9,11,12,7,10,6]
    k5 = 3
    print(f"Nums: {nums5}, k: {k5} -> Max Sliding Window (Brute Force): {sol.maxSlidingWindow(nums5, k5)}") # Expected: [12,12,12,10]

    nums6 = [4, -2]
    k6 = 2
    print(f"Nums: {nums6}, k: {k6} -> Max Sliding Window (Brute Force): {sol.maxSlidingWindow(nums6, k6)}") # Expected: [4]