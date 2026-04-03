from collections import deque
from typing import List

"""
Problem 4: Sliding Window Maximum

You are given an array of integers `nums`, there is a sliding window of size `k`
which is moving from the very left of the array to the very right.
You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

Example 1:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation:
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

Example 2:
Input: nums = [1], k = 1
Output: [1]

Constraints:
1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
1 <= k <= nums.length
"""

class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        """
        Finds the maximum element in each sliding window of size `k`.

        This optimal solution uses a `deque` (double-ended queue) to maintain
        a "monotonic decreasing queue" of indices. The elements in the deque
        correspond to indices from the current window, and the values at these
        indices in `nums` are in decreasing order.

        The front of the deque (`d[0]`) will always store the index of the
        maximum element in the current window.

        Algorithm:
        1. Initialize an empty `deque` (let's call it `d`) and an empty `results` list.
        2. Iterate through the `nums` array with index `i` and value `num`:
           a. **Window Management (Remove outdated elements):**
              If the deque is not empty and the index at the front of the deque (`d[0]`)
              is outside the current window (i.e., `d[0] == i - k`), remove it from the front.
           b. **Monotonicity Maintenance (Remove smaller elements):**
              While the deque is not empty and the value at the index at the back
              of the deque (`nums[d[-1]]`) is less than or equal to the current number `num`,
              remove elements from the back of the deque. This ensures that the deque
              only stores indices of elements that are potentially maximums, in decreasing order.
           c. **Add current element's index:**
              Add the current index `i` to the back of the deque.
           d. **Record Result:**
              If the window has fully formed (i.e., `i >= k - 1`), the maximum element
              in the current window is `nums[d[0]]` (the element at the front of the deque).
              Add this to the `results` list.
        3. Return `results`.

        Time Complexity: O(N), where N is the number of elements in `nums`.
                         Each element is pushed to and popped from the deque at most once.
                         The loop runs N times, and deque operations are O(1).
        Space Complexity: O(K), where K is the size of the window.
                          The deque stores at most K elements (indices).
        """
        results = []
        d = deque() # Stores indices of elements, not the elements themselves.

        for i, num in enumerate(nums):
            # 1. Remove elements from the front if they are out of the current window.
            #    The index `d[0]` refers to an element that is now outside the window [i-k+1, i].
            if d and d[0] == i - k:
                d.popleft()

            # 2. Maintain the monotonic decreasing property of the deque.
            #    Remove elements from the back if the current number `num` is greater
            #    than or equal to the number at the back of the deque.
            #    These smaller elements are no longer candidates for the maximum because
            #    `num` is larger and appears later in the window.
            while d and nums[d[-1]] <= num:
                d.pop()
            
            # 3. Add the current element's index to the back of the deque.
            d.append(i)

            # 4. If the window has formed (i.e., we have processed at least `k` elements),
            #    the maximum for the current window is the element at the index
            #    at the front of the deque.
            if i >= k - 1:
                results.append(nums[d[0]])
        
        return results

# Example usage:
if __name__ == "__main__":
    sol = Solution()

    # Test cases
    nums1 = [1,3,-1,-3,5,3,6,7]
    k1 = 3
    print(f"Nums: {nums1}, k: {k1} -> Max Sliding Window: {sol.maxSlidingWindow(nums1, k1)}") # Expected: [3,3,5,5,6,7]

    nums2 = [1]
    k2 = 1
    print(f"Nums: {nums2}, k: {k2} -> Max Sliding Window: {sol.maxSlidingWindow(nums2, k2)}") # Expected: [1]

    nums3 = [1, -1]
    k3 = 1
    print(f"Nums: {nums3}, k: {k3} -> Max Sliding Window: {sol.maxSlidingWindow(nums3, k3)}") # Expected: [1, -1]

    nums4 = [7, 2, 4]
    k4 = 2
    print(f"Nums: {nums4}, k: {k4} -> Max Sliding Window: {sol.maxSlidingWindow(nums4, k4)}") # Expected: [7, 4]

    nums5 = [9,11,12,7,10,6]
    k5 = 3
    print(f"Nums: {nums5}, k: {k5} -> Max Sliding Window: {sol.maxSlidingWindow(nums5, k5)}") # Expected: [12,12,12,10]

    nums6 = [4, -2]
    k6 = 2
    print(f"Nums: {nums6}, k: {k6} -> Max Sliding Window: {sol.maxSlidingWindow(nums6, k6)}") # Expected: [4]