```java
package com.example.stackqueue;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem 5: Sliding Window Maximum
 * You are given an array of integers `nums`, there is a sliding window of size `k`
 * which is moving from the very left of the array to the very right.
 * You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.
 * Return the max sliding window.
 *
 * Constraints:
 * - `1 <= nums.length <= 10^5`
 * - `1 <= k <= nums.length`
 * - `-10^4 <= nums[i] <= 10^4`
 *
 * Approaches:
 * 1. Brute Force:
 *    - For each possible window, iterate through all `k` elements to find the maximum.
 *    - There are `N - k + 1` windows.
 *    - Time Complexity: O(N * K).
 *    - Space Complexity: O(1) (excluding result array).
 *
 * 2. Using Max-Heap (PriorityQueue):
 *    - Maintain a max-heap of size `k` for the current window.
 *    - For each window:
 *      - Add `nums[i]` to the heap.
 *      - Remove `nums[i-k]` (the element leaving the window) from the heap. This removal can be O(K) if the element is not at the root.
 *      - The maximum element is `heap.peek()`.
 *    - To optimize removal, store pairs `(value, index)` in the heap and only consider elements whose indices are within the current window.
 *    - Time Complexity: O(N log K) for N operations, each involving heap insert (log K) and possibly removing outdated elements (log K).
 *    - Space Complexity: O(K) for the heap.
 *
 * 3. Deque (Double-Ended Queue) / Monotonic Queue (Optimal):
 *    - Use a `Deque` (specifically, an `ArrayDeque` in Java) to store indices of elements.
 *    - The deque will maintain elements in *decreasing order* of their values.
 *    - When processing `nums[i]`:
 *      - **Remove elements outside the window:** Remove indices from the front of the deque if they are `i - k` or older.
 *      - **Maintain decreasing order:** Remove indices from the back of the deque whose corresponding values `nums[deque.peekLast()]` are less than or equal to `nums[i]`. This ensures the deque only contains relevant candidates and maintains the decreasing order.
 *      - **Add current element:** Add `i` to the back of the deque.
 *      - **Record maximum:** If the window has formed (i.e., `i >= k - 1`), the maximum element for the current window is `nums[deque.peekFirst()]`.
 *    - This deque effectively stores a "monotonic queue" where the front always holds the index of the maximum element in the current window.
 *    - Time Complexity: O(N). Each element is added to and removed from the deque at most once.
 *    - Space Complexity: O(K) for the deque, in the worst case (e.g., a decreasing sequence like [5,4,3,2,1], all `k` elements might be in the deque).
 *
 * Chosen Approach for implementation: Deque (Approach 3) - This is the most efficient and standard solution for this problem.
 */
public class CombinedProblems {

    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || k <= 0) {
            return new int[0];
        }

        int n = nums.length;
        if (n == 0 || k > n) { // Edge cases for empty or k larger than array
            return new int[0];
        }
        if (k == 1) { // If window size is 1, all elements are their own max
            return nums;
        }

        // The result array will store the maximum for each window.
        // There will be (n - k + 1) windows.
        int[] result = new int[n - k + 1];
        int resultIdx = 0;

        // Deque to store indices of elements.
        // Elements are stored in decreasing order of their values.
        // The front of the deque will always hold the index of the maximum element in the current window.
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // 1. Remove elements from the front of the deque that are outside the current window.
            //    The index at the front of the deque (deque.peekFirst()) is the oldest element's index.
            //    If this index is (i - k) or older, it means it's no longer part of the current window [i-k+1, i].
            if (!deque.isEmpty() && deque.peekFirst() <= i - k) {
                deque.removeFirst();
            }

            // 2. Remove elements from the back of the deque that are smaller than the current element `nums[i]`.
            //    This ensures that the deque maintains elements in decreasing order of value.
            //    If `nums[i]` is greater than an element at the back of the deque, the element at the back
            //    can never be the maximum in any future window that `nums[i]` is part of,
            //    because `nums[i]` is larger and appears later.
            while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
                deque.removeLast();
            }

            // 3. Add the current element's index to the back of the deque.
            deque.addLast(i);

            // 4. If the window has fully formed (i.e., we have processed at least `k` elements),
            //    record the maximum for the current window.
            //    The maximum element is always at the front of the deque.
            if (i >= k - 1) {
                result[resultIdx++] = nums[deque.peekFirst()];
            }
        }

        return result;
    }
}
```