```java
package com.stackqueue.problems;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Stack;
import java.util.Queue; // For a general queue type if needed

/**
 * Contains solutions to various Stack and Queue related problems.
 * Problems covered:
 * 3. Valid Parentheses
 * 4. Daily Temperatures (Monotonic Stack)
 * 5. Sliding Window Maximum (Deque)
 */
public class StackAndQueueProblems {

    /**
     * Problem 3: Valid Parentheses
     *
     * Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']',
     * determine if the input string is valid.
     *
     * An input string is valid if:
     * 1. Open brackets must be closed by the same type of brackets.
     * 2. Open brackets must be closed in the correct order.
     * 3. Every close bracket has a corresponding open bracket of the same type.
     *
     * Approach: Using a Stack
     * - Iterate through the string.
     * - If an opening bracket is encountered, push it onto the stack.
     * - If a closing bracket is encountered:
     *   - Check if the stack is empty. If so, it's an unmatched closing bracket -> invalid.
     *   - Pop the top element from the stack.
     *   - Check if the popped element is the corresponding opening bracket for the current closing bracket.
     *     If not, it's a mismatch -> invalid.
     * - After iterating through the string, if the stack is empty, all brackets were matched -> valid.
     *   Otherwise, there are unmatched opening brackets -> invalid.
     *
     * Time Complexity: O(N), where N is the length of the input string.
     * We iterate through the string once, and each stack operation (push, pop, peek, isEmpty) takes O(1) time.
     *
     * Space Complexity: O(N) in the worst case. For a string like "((((()))))", the stack will hold N/2 opening brackets.
     * For example, "(((((((" will push N/2 characters onto the stack.
     *
     * @param s The input string containing parentheses.
     * @return True if the string is valid, false otherwise.
     */
    public boolean isValid(String s) {
        if (s == null || s.length() == 0) {
            return true; // An empty string is considered valid.
        }

        Stack<Character> stack = new Stack<>();
        Map<Character, Character> bracketMap = new HashMap<>();
        bracketMap.put(')', '(');
        bracketMap.put('}', '{');
        bracketMap.put(']', '[');

        for (char c : s.toCharArray()) {
            if (bracketMap.containsValue(c)) { // It's an opening bracket
                stack.push(c);
            } else if (bracketMap.containsKey(c)) { // It's a closing bracket
                if (stack.isEmpty() || stack.pop() != bracketMap.get(c)) {
                    return false; // Stack is empty (no matching open bracket) or mismatch
                }
            }
            // If it's not a bracket character, we ignore it as per typical problem interpretations.
            // If problem implies only brackets, then an 'else' here would imply invalid char.
        }

        return stack.isEmpty(); // True if all opening brackets have been matched
    }

    /**
     * Problem 4: Daily Temperatures
     *
     * Given an array of integers `temperatures` representing the daily temperatures,
     * return an array `answer` such that `answer[i]` is the number of days you have
     * to wait after the `i`-th day to get a warmer temperature.
     * If there is no future day for which this is possible, keep `answer[i] == 0`.
     *
     * Approach 1: Brute Force (for comparison, not the primary solution)
     * For each day `i`, iterate through subsequent days `j` (from `i+1` to end)
     * to find the first day with a warmer temperature.
     *
     * Time Complexity: O(N^2)
     * Space Complexity: O(1) (excluding output array)
     *
     * @param temperatures An array of daily temperatures.
     * @return An array of waiting days for warmer temperatures.
     */
    public int[] dailyTemperaturesBruteForce(int[] temperatures) {
        if (temperatures == null || temperatures.length == 0) {
            return new int[0];
        }

        int n = temperatures.length;
        int[] answer = new int[n];

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (temperatures[j] > temperatures[i]) {
                    answer[i] = j - i;
                    break; // Found the first warmer day, move to the next day 'i'
                }
            }
        }
        return answer;
    }

    /**
     * Problem 4: Daily Temperatures (Optimized)
     *
     * Approach 2: Monotonic Stack
     * We use a stack to store the *indices* of days whose warmer day has not yet been found.
     * The stack maintains indices of temperatures in *decreasing order* from bottom to top.
     *
     * - Iterate through the `temperatures` array with index `i`.
     * - For each `temperatures[i]`:
     *   - While the stack is not empty AND `temperatures[stack.peek()]` is LESS THAN `temperatures[i]`:
     *     - This means `temperatures[i]` is the warmer day for `stack.peek()`.
     *     - Pop `prevDayIndex = stack.pop()`.
     *     - Calculate the waiting days: `answer[prevDayIndex] = i - prevDayIndex`.
     *   - After the loop, push the current day's index `i` onto the stack.
     * - Any indices remaining in the stack at the end have no warmer day in the future (their answer stays 0).
     *
     * Time Complexity: O(N), where N is the number of days.
     * Each temperature is pushed onto the stack once and popped from the stack at most once.
     *
     * Space Complexity: O(N) in the worst case. If `temperatures` is in strictly decreasing order,
     * all indices will be pushed onto the stack and never popped until the end.
     *
     * @param temperatures An array of daily temperatures.
     * @return An array of waiting days for warmer temperatures.
     */
    public int[] dailyTemperatures(int[] temperatures) {
        if (temperatures == null || temperatures.length == 0) {
            return new int[0];
        }

        int n = temperatures.length;
        int[] answer = new int[n];
        Stack<Integer> stack = new Stack<>(); // Stores indices

        for (int i = 0; i < n; i++) {
            // While stack is not empty and current temperature is warmer than the temperature
            // at the index on top of the stack.
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevDayIndex = stack.pop();
                answer[prevDayIndex] = i - prevDayIndex;
            }
            stack.push(i); // Push current day's index onto the stack
        }

        // Any indices left in the stack do not have a warmer day, so their answer remains 0 (default value).
        return answer;
    }

    /**
     * Problem 5: Sliding Window Maximum
     *
     * Given an array of integers `nums`, there is a sliding window of size `k`
     * which moves from the very left of the array to the very right.
     * You can only see the `k` numbers in the window. Return the maximum sliding window.
     *
     * Approach 1: Brute Force (for comparison, not the primary solution)
     * For each possible window, iterate through its `k` elements to find the maximum.
     *
     * Time Complexity: O(N*K)
     * Space Complexity: O(1) (excluding output array)
     *
     * @param nums The input array.
     * @param k The size of the sliding window.
     * @return An array containing the maximum value for each sliding window.
     */
    public int[] maxSlidingWindowBruteForce(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }
        if (k == 1) {
            return nums; // Each element is its own maximum
        }
        if (k > nums.length) {
            // If k is larger than array length, the window is the entire array.
            // Find max of entire array and return a single-element array.
            int max = nums[0];
            for (int x : nums) {
                if (x > max) max = x;
            }
            return new int[]{max};
        }

        int n = nums.length;
        int[] result = new int[n - k + 1];

        for (int i = 0; i <= n - k; i++) {
            int max = nums[i];
            for (int j = 1; j < k; j++) {
                if (nums[i + j] > max) {
                    max = nums[i + j];
                }
            }
            result[i] = max;
        }
        return result;
    }

    /**
     * Problem 5: Sliding Window Maximum (Optimized)
     *
     * Approach 2: Using a Deque (Double-Ended Queue)
     * We use a Deque to store *indices* of elements. The deque maintains two properties:
     * 1. Monotonically Decreasing: Elements in the deque (corresponding to `nums[index]`)
     *    are in decreasing order from front to back. This ensures that `nums[dq.peekFirst()]`
     *    is always the maximum in the current window.
     * 2. Window Constraint: Only indices within the current `[i - k + 1, i]` window are kept.
     *
     * - Iterate through the array `nums` with index `i`.
     * - **Step 1: Remove elements out of window:**
     *   If `dq.peekFirst()` is an index that is no longer within the current window
     *   (`dq.peekFirst() <= i - k`), remove it from the front of the deque.
     * - **Step 2: Maintain decreasing order:**
     *   While the deque is not empty AND `nums[dq.peekLast()]` is less than or equal to `nums[i]`,
     *   remove elements from the back of the deque. These elements are smaller than `nums[i]`
     *   and appear *before* `i`, so they cannot be the maximum in any future window that includes `i`.
     * - **Step 3: Add current element's index:**
     *   Add the current index `i` to the back of the deque.
     * - **Step 4: Record maximum for full windows:**
     *   If `i >= k - 1` (meaning we have formed a full window of size `k`),
     *   then `nums[dq.peekFirst()]` is the maximum for the current window.
     *   Store this in the `result` array at `result[i - k + 1]`.
     *
     * Time Complexity: O(N), where N is the length of `nums`.
     * Each element is added to the deque at most once and removed from the deque at most once.
     * Each check (peekFirst, peekLast) is O(1).
     *
     * Space Complexity: O(K), where K is the size of the window.
     * In the worst case (e.g., a strictly increasing window), the deque can hold up to K elements.
     *
     * @param nums The input array.
     * @param k The size of the sliding window.
     * @return An array containing the maximum value for each sliding window.
     */
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }
        if (k == 1) {
            return nums;
        }
        if (k > nums.length) {
            int max = Integer.MIN_VALUE;
            for(int num : nums) max = Math.max(max, num);
            return new int[]{max};
        }

        int n = nums.length;
        // The number of windows will be n - k + 1.
        // Example: nums = [1,2,3,4,5], k=3. Windows: [1,2,3], [2,3,4], [3,4,5]. Count = 3.
        // n - k + 1 = 5 - 3 + 1 = 3.
        int[] result = new int[n - k + 1];
        // Use ArrayDeque for an efficient double-ended queue.
        // Stores indices of elements, not the elements themselves.
        Deque<Integer> dq = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // 1. Remove elements from the front if they are out of the current window.
            //    The current window ranges from (i - k + 1) to i.
            //    If the index at the front of the deque is less than (i - k + 1), it's old and irrelevant.
            if (!dq.isEmpty() && dq.peekFirst() < i - k + 1) {
                dq.removeFirst();
            }

            // 2. Remove elements from the back if they are smaller than the current element (nums[i]).
            //    These elements cannot be the maximum in any future window as nums[i] is larger
            //    and appears later.
            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) {
                dq.removeLast();
            }

            // 3. Add the current element's index to the back of the deque.
            dq.addLast(i);

            // 4. If we have processed at least 'k' elements (i.e., 'i' has reached the end of the first window or beyond),
            //    record the maximum for the current window.
            //    The index of the maximum element for the current window is always at the front of the deque.
            if (i >= k - 1) {
                result[i - k + 1] = nums[dq.peekFirst()];
            }
        }
        return result;
    }
}
```