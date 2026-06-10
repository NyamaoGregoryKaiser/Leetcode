```java
package com.techinterview.stackqueue.problems;

import java.util.Deque;
import java.util.LinkedList;
import java.util.Stack;

/**
 * A collection of miscellaneous Stack and Queue related problems.
 * This class serves as a container for solutions to standalone problems that
 * don't require their own class implementation like MinStack or QueueUsingStacks.
 */
public class StackQueueProblems {

    /**
     * Problem: Valid Parentheses
     * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
     * determine if the input string is valid.
     *
     * An input string is valid if:
     * 1. Open brackets must be closed by the same type of brackets.
     * 2. Open brackets must be closed in the correct order.
     * 3. Every close bracket has a corresponding open bracket of the same type.
     *
     * Constraints:
     * - 1 <= s.length <= 10^4
     * - s consists of parentheses only '()[]{}'.
     *
     * Optimal Solution Approach: Using a Stack
     * - Iterate through the string character by character.
     * - If an opening bracket is encountered, push it onto the stack.
     * - If a closing bracket is encountered:
     *   - Check if the stack is empty. If it is, there's no matching opening bracket, so it's invalid.
     *   - Pop the top element from the stack.
     *   - Check if the popped element is the correct corresponding opening bracket for the current closing bracket.
     *     If not, it's an invalid match, so the string is invalid.
     * - After iterating through the entire string, if the stack is empty, all brackets were matched correctly.
     *   If the stack is not empty, it means there are unmatched opening brackets, so the string is invalid.
     *
     * Time Complexity: O(N), where N is the length of the string `s`.
     *   We iterate through the string once, and each stack operation (push, pop, peek, isEmpty) takes O(1) time.
     * Space Complexity: O(N) in the worst case.
     *   If the string consists only of opening brackets (e.g., "((("), the stack will store N/2 elements.
     *   For balanced parentheses, it could be O(N) if it's deeply nested.
     */
    public boolean isValidParentheses(String s) {
        // Using Deque as a Stack is generally preferred over java.util.Stack due to performance
        // and consistency with Java's Collections Framework. Deque offers push/pop/peek.
        Deque<Character> stack = new LinkedList<>();

        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                // If it's an opening bracket, push it onto the stack.
                stack.push(c);
            } else {
                // If it's a closing bracket:
                // 1. Check if the stack is empty. If so, no matching opening bracket found.
                if (stack.isEmpty()) {
                    return false;
                }

                // 2. Pop the top element from the stack.
                char top = stack.pop();

                // 3. Check for correct matching.
                if (c == ')' && top != '(') {
                    return false;
                }
                if (c == '}' && top != '{') {
                    return false;
                }
                if (c == ']' && top != '[') {
                    return false;
                }
            }
        }

        // After iterating through the entire string, if the stack is empty,
        // all opening brackets have been correctly matched. Otherwise, some
        // opening brackets are unmatched.
        return stack.isEmpty();
    }

    /**
     * Alternative Approach: Using a HashMap for mappings
     * The `if-else if` chain for checking bracket types can be replaced with a HashMap
     * that maps closing brackets to their corresponding opening brackets. This can make
     * the code slightly cleaner and more extensible if more bracket types were added.
     *
     * Example modification for `isValidParentheses`:
     * private static final Map<Character, Character> BRACKET_MAP = new HashMap<>();
     * static {
     *     BRACKET_MAP.put(')', '(');
     *     BRACKET_MAP.put('}', '{');
     *     BRACKET_MAP.put(']', '[');
     * }
     *
     * public boolean isValidParenthesesWithMap(String s) {
     *     Deque<Character> stack = new LinkedList<>();
     *     for (char c : s.toCharArray()) {
     *         if (BRACKET_MAP.containsKey(c)) { // It's a closing bracket
     *             if (stack.isEmpty() || stack.pop() != BRACKET_MAP.get(c)) {
     *                 return false;
     *             }
     *         } else { // It's an opening bracket
     *             stack.push(c);
     *         }
     *     }
     *     return stack.isEmpty();
     * }
     *
     * This approach doesn't change the time or space complexity but can improve readability
     * and maintainability for larger sets of bracket types.
     */

    // --- Other potential problems (not implemented fully for brevity, but could be added) ---

    /**
     * Problem: Daily Temperatures (Medium)
     * Given an array of integers temperatures represents the daily temperatures, return an array answer
     * such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.
     * If there is no future day for which this is possible, keep answer[i] == 0 instead.
     *
     * Approach: Monotonic Stack
     * - Iterate through the temperatures array with index `i`.
     * - Maintain a stack that stores indices `j` such that `temperatures[j]` are in decreasing order.
     * - When `temperatures[i]` is encountered:
     *   - While the stack is not empty and `temperatures[i]` is greater than `temperatures[stack.peek()]`:
     *     - Pop `prev_index = stack.pop()`.
     *     - `answer[prev_index] = i - prev_index`. (Found a warmer day!)
     *   - Push `i` onto the stack.
     * - Any indices remaining in the stack at the end did not find a warmer day, so their `answer` remains 0.
     *
     * Time Complexity: O(N) because each element is pushed and popped from the stack at most once.
     * Space Complexity: O(N) in the worst case (e.g., temperatures are strictly decreasing).
     */
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        // Stack stores indices of temperatures
        Deque<Integer> stack = new LinkedList<>();

        for (int i = 0; i < n; i++) {
            // While the stack is not empty AND the current temperature is warmer
            // than the temperature at the index on top of the stack
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevIndex = stack.pop(); // Pop the index that just found its warmer day
                answer[prevIndex] = i - prevIndex; // Calculate the wait days
            }
            stack.push(i); // Push the current index onto the stack
        }
        // Elements remaining in the stack have no warmer day to their right,
        // their answer remains 0 (default initialized value).
        return answer;
    }


    /**
     * Problem: Number of Islands (Medium)
     * Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water),
     * return the number of islands. An island is surrounded by water and is formed by connecting
     * adjacent lands horizontally or vertically. You may assume all four edges of the grid are
     * all surrounded by water.
     *
     * Approach: Breadth-First Search (BFS) using a Queue
     * - Iterate through each cell (r, c) of the grid.
     * - If `grid[r][c]` is '1' (land):
     *   - Increment the island count.
     *   - Start a BFS from this cell:
     *     - Add (r, c) to a queue.
     *     - Mark `grid[r][c]` as '0' to signify it's visited (and part of current island).
     *     - While the queue is not empty:
     *       - Dequeue a cell `(curr_r, curr_c)`.
     *       - For each of its 4 neighbors:
     *         - If a neighbor `(nr, nc)` is within grid bounds AND `grid[nr][nc]` is '1':
     *           - Mark `grid[nr][nc]` as '0'.
     *           - Enqueue `(nr, nc)`.
     * - The BFS ensures all connected land cells of the current island are visited and marked.
     *
     * Time Complexity: O(M * N) where M is the number of rows and N is the number of columns.
     *   Each cell is visited at most a constant number of times (when iterating the grid and during BFS).
     * Space Complexity: O(min(M, N)) in the worst case.
     *   The queue can hold at most `min(M, N)` elements (e.g., for a snake-like island).
     */
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0 || grid[0].length == 0) {
            return 0;
        }

        int numRows = grid.length;
        int numCols = grid[0].length;
        int numIslands = 0;

        // Directions for neighbors (up, down, left, right)
        int[] dr = {-1, 1, 0, 0};
        int[] dc = {0, 0, -1, 1};

        for (int r = 0; r < numRows; r++) {
            for (int c = 0; c < numCols; c++) {
                if (grid[r][c] == '1') {
                    numIslands++;
                    // Start BFS from this land cell
                    Queue<int[]> queue = new LinkedList<>();
                    queue.offer(new int[]{r, c});
                    grid[r][c] = '0'; // Mark as visited

                    while (!queue.isEmpty()) {
                        int[] current = queue.poll();
                        int currR = current[0];
                        int currC = current[1];

                        // Explore neighbors
                        for (int i = 0; i < 4; i++) {
                            int nr = currR + dr[i];
                            int nc = currC + dc[i];

                            // Check bounds and if it's land
                            if (nr >= 0 && nr < numRows && nc >= 0 && nc < numCols && grid[nr][nc] == '1') {
                                grid[nr][nc] = '0'; // Mark as visited
                                queue.offer(new int[]{nr, nc});
                            }
                        }
                    }
                }
            }
        }
        return numIslands;
    }
}
```