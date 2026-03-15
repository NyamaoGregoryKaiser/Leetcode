```java
package com.example.stackqueue;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

public class StackProblems {

    /**
     * Problem 2: Valid Parentheses
     * Given a string `s` containing just the characters '(', ')', '{', '}', '[', ']',
     * determine if the input string is valid.
     *
     * An input string is valid if:
     * 1. Open brackets must be closed by the same type of brackets.
     * 2. Open brackets must be closed in the correct order.
     * 3. Every close bracket has a corresponding open bracket of the same type.
     *
     * Constraints:
     * - `1 <= s.length <= 10^4`
     * - `s` consists of parentheses only '()[]{}'.
     *
     * Approaches:
     * 1. Stack (Optimal):
     *    - Iterate through the string character by character.
     *    - If an opening bracket ('(', '{', '[') is encountered, push it onto the stack.
     *    - If a closing bracket (')', '}', ']') is encountered:
     *      - Check if the stack is empty. If it is, there's no corresponding opening bracket, so it's invalid.
     *      - Pop the top element from the stack.
     *      - Check if the popped element is the correct matching opening bracket for the current closing bracket.
     *        If not, it's invalid.
     *    - After iterating through the entire string, if the stack is empty, all brackets were matched correctly. If not,
     *      there are unclosed opening brackets, so it's invalid.
     *    - Time Complexity: O(N), where N is the length of the string, as we iterate through the string once.
     *    - Space Complexity: O(N) in the worst case (e.g., "((((((("), where all characters are opening brackets and pushed onto the stack.
     *
     * Chosen Approach for implementation: Stack (Approach 1). This is the standard and most efficient way.
     */
    public boolean isValidParentheses(String s) {
        // Edge case: If the string has an odd length, it cannot be valid.
        if (s.length() % 2 != 0) {
            return false;
        }

        Stack<Character> stack = new Stack<>();
        // Using a HashMap to store mappings of closing to opening brackets for easy lookup.
        Map<Character, Character> mappings = new HashMap<>();
        mappings.put(')', '(');
        mappings.put('}', '{');
        mappings.put(']', '[');

        for (char c : s.toCharArray()) {
            // If it's a closing bracket
            if (mappings.containsKey(c)) {
                // If stack is empty, it means a closing bracket appeared without a preceding open bracket.
                // Or if the top of the stack does not match the expected opening bracket for the current closing bracket.
                if (stack.isEmpty() || stack.pop() != mappings.get(c)) {
                    return false;
                }
            } else {
                // It's an opening bracket, push it onto the stack.
                stack.push(c);
            }
        }

        // After iterating through the entire string, if the stack is empty, all brackets were matched.
        // Otherwise, there are unmatched opening brackets.
        return stack.isEmpty();
    }

    /**
     * Problem 3: Trapping Rain Water
     * Given `n` non-negative integers representing an elevation map where the width of each bar is 1,
     * compute how much water it can trap after raining.
     *
     * Example: height = [0,1,0,2,1,0,1,3,2,1,2,1]
     * Visual representation:
     *       _
     *   _  | | _   _
     * _| |_|#|_|#|_|#|#|_
     * | | | | | | | | | |
     * 0 1 0 2 1 0 1 3 2 1 2 1
     *
     * Constraints:
     * - `n == height.length`
     * - `1 <= n <= 2 * 10^4`
     * - `0 <= height[i] <= 10^5`
     *
     * Approaches:
     * 1. Brute Force (Iterate for each bar):
     *    - For each bar at index `i`, find the maximum height of a bar to its left (`leftMax`) and to its right (`rightMax`).
     *    - The amount of water trapped above bar `i` is `min(leftMax, rightMax) - height[i]`. If this value is negative, it's 0.
     *    - Sum up the water trapped for all bars.
     *    - Time Complexity: O(N^2) because for each bar, we iterate left and right to find max heights.
     *    - Space Complexity: O(1).
     *
     * 2. Dynamic Programming (Precompute max heights) (Optimized O(N) Time, O(N) Space):
     *    - Create two arrays, `leftMax` and `rightMax`, of size N.
     *    - `leftMax[i]` stores the maximum height encountered from index 0 to `i`.
     *    - `rightMax[i]` stores the maximum height encountered from index N-1 to `i`.
     *    - `leftMax`: Iterate from left to right, `leftMax[i] = max(leftMax[i-1], height[i])`.
     *    - `rightMax`: Iterate from right to left, `rightMax[i] = max(rightMax[i+1], height[i])`.
     *    - Then, iterate from `i = 0` to `N-1`. For each `i`, water trapped is `max(0, min(leftMax[i], rightMax[i]) - height[i])`.
     *    - Sum up the water.
     *    - Time Complexity: O(N) for three passes.
     *    - Space Complexity: O(N) for `leftMax` and `rightMax` arrays.
     *
     * 3. Two Pointers (Optimal O(N) Time, O(1) Space):
     *    - Use two pointers, `left` starting at 0 and `right` starting at N-1.
     *    - Maintain `leftMax` and `rightMax` variables, storing the maximum height encountered so far from the left and right, respectively.
     *    - While `left < right`:
     *      - If `height[left] < height[right]`:
     *        - This means `leftMax` is the limiting factor for water on the left side (since there's a taller bar on the right).
     *        - If `height[left] >= leftMax`, update `leftMax = height[left]`.
     *        - Else, water trapped at `left` is `leftMax - height[left]`. Add to total.
     *        - Increment `left`.
     *      - Else (`height[right] <= height[left]`):
     *        - `rightMax` is the limiting factor for water on the right side.
     *        - If `height[right] >= rightMax`, update `rightMax = height[right]`.
     *        - Else, water trapped at `right` is `rightMax - height[right]`. Add to total.
     *        - Decrement `right`.
     *    - This approach works because at each step, when we process the shorter bar (either `height[left]` or `height[right]`), we know for sure
     *      that there's a bar on the other side that is at least as tall as the current bar. This guarantees that `min(leftMax, rightMax)`
     *      can be determined locally based on the shorter pointer's max.
     *    - Time Complexity: O(N) for a single pass.
     *    - Space Complexity: O(1).
     *
     * 4. Stack (Monotonic Stack) (Optimal O(N) Time, O(N) Space):
     *    - This approach uses a decreasing monotonic stack.
     *    - Iterate through the height array.
     *    - If the current bar `height[i]` is less than or equal to the bar at the top of the stack, push `i` onto the stack. This maintains the decreasing property.
     *    - If `height[i]` is greater than the bar at the top of the stack, it means `height[i]` can potentially form a "right boundary" for trapping water.
     *      - Pop elements from the stack until it's empty or the top element is greater than or equal to `height[i]`.
     *      - For each popped element `prev_idx`:
     *        - This `prev_idx` represents a "bottom" or "middle" bar of a potential water container.
     *        - If the stack is not empty after popping `prev_idx`, then `stack.peek()` is the left boundary and `height[i]` is the right boundary.
     *        - The height of the water trapped is `min(height[stack.peek()], height[i]) - height[prev_idx]`.
     *        - The width of the trapped water is `i - stack.peek() - 1`.
     *        - Add `water_height * water_width` to the total.
     *      - After processing all smaller bars, push `i` onto the stack.
     *    - Time Complexity: O(N) as each element is pushed and popped from the stack at most once.
     *    - Space Complexity: O(N) in the worst case (e.g., [5,4,3,2,1]), where all elements are pushed onto the stack.
     *
     * Chosen Approach for implementation: Stack (Approach 4) as requested, demonstrating a key stack pattern (monotonic stack).
     * Also implementing Two Pointers as a common alternative with better space complexity.
     */
    public int trapRainWaterMonotonicStack(int[] height) {
        if (height == null || height.length < 3) { // Need at least 3 bars to trap water (wall, space, wall)
            return 0;
        }

        int totalWater = 0;
        Stack<Integer> stack = new Stack<>(); // Stores indices of bars in decreasing order of height

        for (int i = 0; i < height.length; i++) {
            // While the stack is not empty AND the current bar is taller than the bar at the stack's top
            // This means we found a potential right boundary and can start calculating trapped water.
            while (!stack.isEmpty() && height[i] > height[stack.peek()]) {
                int bottomIndex = stack.pop(); // The bar that acts as the bottom of the "well"

                // If the stack becomes empty, it means there's no left boundary for the popped bar,
                // so no water can be trapped with this 'bottomIndex' bar.
                if (stack.isEmpty()) {
                    break;
                }

                int leftBoundaryIndex = stack.peek(); // The left wall of the "well"
                int leftBoundaryHeight = height[leftBoundaryIndex];
                int rightBoundaryHeight = height[i]; // The right wall of the "well"

                // The height of the water trapped above 'bottomIndex' bar is limited by the shorter of its two walls.
                int trappedHeight = Math.min(leftBoundaryHeight, rightBoundaryHeight) - height[bottomIndex];
                // The width of the water trapped is the distance between the two walls, minus the middle bars.
                int trappedWidth = i - leftBoundaryIndex - 1;

                totalWater += trappedHeight * trappedWidth;
            }
            stack.push(i); // Push the current bar's index onto the stack
        }

        return totalWater;
    }

    /**
     * Trapping Rain Water using Two Pointers (O(N) Time, O(1) Space).
     * This is a highly optimized solution for this problem.
     */
    public int trapRainWaterTwoPointers(int[] height) {
        if (height == null || height.length < 3) {
            return 0;
        }

        int left = 0;
        int right = height.length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int totalWater = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                // If height[left] is smaller, it means the water trapped at `left` is
                // limited by `leftMax`. We are guaranteed that `rightMax` (max from right)
                // will be at least `height[left]` (or `height[right]`, which is >= `height[left]`).
                // So, the water trapped above `height[left]` is `leftMax - height[left]`.
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    totalWater += leftMax - height[left];
                }
                left++;
            } else {
                // If height[right] is smaller (or equal), similarly, water trapped at `right` is
                // limited by `rightMax`. We are guaranteed that `leftMax` will be at least `height[right]`.
                // So, the water trapped above `height[right]` is `rightMax - height[right]`.
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    totalWater += rightMax - height[right];
                }
                right--;
            }
        }
        return totalWater;
    }
}
```