```cpp
#include "helpers.h" // For printVector, etc. (though not directly used in core logic, good practice)

#include <stack>
#include <queue>
#include <string>
#include <vector>
#include <algorithm> // For std::max, std::reverse

// --- Problem 1: Valid Parentheses ---
// LeetCode: 20. Valid Parentheses
// Given a string s containing just the characters '(', ')', '{', '}', '[', ']',
// determine if the input string is valid.
// An input string is valid if:
// 1. Open brackets must be closed by the same type of brackets.
// 2. Open brackets must be closed in the correct order.
// 3. Every close bracket has a corresponding open bracket of the same type.

/*
 * Optimal Solution: Using a Stack
 * Iterate through the string.
 * If an opening bracket is encountered, push it onto the stack.
 * If a closing bracket is encountered:
 *   - Check if the stack is empty. If so, it's an unmatched closing bracket -> invalid.
 *   - Pop the top element from the stack and check if it's the corresponding opening bracket.
 *     If not, it's a mismatched bracket -> invalid.
 * After iterating through the entire string, if the stack is empty, all brackets
 * were matched correctly -> valid. Otherwise, there are unmatched opening brackets -> invalid.
 */
bool isValidParentheses(const std::string& s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c); // Push opening brackets onto the stack
        } else {
            // Encountered a closing bracket
            if (st.empty()) {
                // No corresponding opening bracket
                return false;
            }
            char top = st.top();
            st.pop(); // Pop the top element for matching

            // Check for mismatch
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) {
                return false;
            }
        }
    }
    // If stack is empty, all opening brackets were matched
    return st.empty();
}
// Time Complexity: O(N), where N is the length of the string, as we iterate through it once.
// Space Complexity: O(N) in the worst case (e.g., "((((("), where all characters are pushed onto the stack.
// In the best case (e.g., "()"), it's O(1) if stack size is limited to a constant.

// --- Problem 2: Daily Temperatures ---
// LeetCode: 739. Daily Temperatures
// Given an array of integers temperatures represents the daily temperatures,
// return an array answer such that answer[i] is the number of days you have to
// wait after the ith day to get a warmer temperature. If there is no future
// day for which this is possible, keep answer[i] as 0 instead.

/*
 * Optimal Solution: Monotonic Stack
 * We need to find the *next* greater element for each element. This is a classic
 * problem solved efficiently with a monotonic stack (specifically, a decreasing monotonic stack).
 *
 * The stack will store indices of temperatures. We want to maintain a stack
 * where temperatures at stored indices are in decreasing order.
 *
 * Iterate through `temperatures` from left to right:
 *   - For the current temperature `T[i]`:
 *     - While the stack is not empty AND `T[i]` is warmer than `T[stack.top()]`:
 *       - This means `T[i]` is the warmer day for `T[stack.top()]`.
 *       - Calculate the waiting days: `answer[stack.top()] = i - stack.top()`.
 *       - Pop the index from the stack.
 *     - Push the current index `i` onto the stack.
 *
 * After the loop, any indices remaining in the stack have no warmer day
 * to their right, so their corresponding `answer` values remain 0 (initialized).
 */
std::vector<int> dailyTemperatures(const std::vector<int>& temperatures) {
    int n = temperatures.size();
    std::vector<int> answer(n, 0); // Initialize with 0s
    std::stack<int> st; // Stores indices

    for (int i = 0; i < n; ++i) {
        // While stack is not empty AND current temperature is warmer than temperature at stack.top() index
        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
            int prev_index = st.top();
            st.pop();
            answer[prev_index] = i - prev_index; // Calculate days to wait
        }
        st.push(i); // Push current index onto the stack
    }
    return answer;
}
// Time Complexity: O(N), where N is the number of temperatures. Each element is pushed and popped at most once.
// Space Complexity: O(N) in the worst case (e.g., temperatures are strictly decreasing), where all indices are pushed onto the stack.

// --- Problem 3: Implement Queue using Stacks ---
// LeetCode: 232. Implement Queue using Stacks
// Implement a first in first out (FIFO) queue using only two stacks. The implemented
// queue should support all the functions of a normal queue (push, peek, pop, empty).

// Implement a MyQueue class.
class MyQueue {
private:
    std::stack<int> inStack;    // For pushing elements (enqueue)
    std::stack<int> outStack;   // For popping/peeking elements (dequeue)

    // Helper function to transfer elements from inStack to outStack
    // This ensures elements are in correct FIFO order in outStack for dequeue operations.
    void transferElements() {
        if (outStack.empty()) {
            while (!inStack.empty()) {
                outStack.push(inStack.top());
                inStack.pop();
            }
        }
    }

public:
    MyQueue() {
        // Constructor, no specific initialization needed as stacks are default-constructed
    }

    // Push element x to the back of queue.
    void push(int x) {
        inStack.push(x);
    }
    // Time Complexity: O(1)

    // Removes the element from the front of queue and returns that element.
    int pop() {
        transferElements(); // Ensure outStack has elements for popping
        int front_val = outStack.top();
        outStack.pop();
        return front_val;
    }
    // Time Complexity: Amortized O(1). Worst case O(N) when transfer happens, but each element is moved once.

    // Get the front element.
    int peek() {
        transferElements(); // Ensure outStack has elements for peeking
        return outStack.top();
    }
    // Time Complexity: Amortized O(1). Worst case O(N) when transfer happens.

    // Returns whether the queue is empty.
    bool empty() {
        return inStack.empty() && outStack.empty();
    }
    // Time Complexity: O(1)
};
// Space Complexity: O(N) to store all elements across two stacks.


// --- Problem 4: Implement Stack using Queues ---
// LeetCode: 225. Implement Stack using Queues
// Implement a last in first out (LIFO) stack using only two queues. The implemented
// stack should support all the functions of a normal stack (push, top, pop, empty).

// Implement a MyStack class.
class MyStack {
private:
    std::queue<int> q1; // Main queue to store elements
    // std::queue<int> q2; // An auxiliary queue, if used for another approach

public:
    MyStack() {
        // Constructor, no specific initialization needed
    }

    // Push element x onto stack.
    // Strategy: Push x to q1. Then, move all elements from q1 (except x)
    // from front to back, effectively making x the new front (top) of the stack.
    void push(int x) {
        q1.push(x); // Add new element to the back

        // Move all elements except the newly added one to the back
        // This makes the newly added element the front of the queue (which is the top of the stack)
        for (int i = 0; i < q1.size() - 1; ++i) {
            q1.push(q1.front());
            q1.pop();
        }
    }
    // Time Complexity: O(N) where N is the current number of elements in the stack.
    // Each push involves enqueueing one element and then dequeueing and enqueueing N-1 elements.

    // Removes the element on top of the stack and returns that element.
    int pop() {
        int top_val = q1.front();
        q1.pop();
        return top_val;
    }
    // Time Complexity: O(1)

    // Get the top element.
    int top() {
        return q1.front();
    }
    // Time Complexity: O(1)

    // Returns whether the stack is empty.
    bool empty() {
        return q1.empty();
    }
    // Time Complexity: O(1)
};
// Alternative Approach for push: Using two queues.
// Push to empty queue. Then transfer elements from non-empty queue to this queue. Swap roles.
// This also leads to O(N) push or O(N) pop, depending on how it's implemented.
// The chosen one-queue approach above is a common and relatively concise way.
// Space Complexity: O(N) to store all elements in the queue.

// --- Problem 5: Trapping Rain Water ---
// LeetCode: 42. Trapping Rain Water
// Given n non-negative integers representing an elevation map where the width
// of each bar is 1, compute how much water it can trap after raining.

/*
 * Optimal Solution: Using a Stack (Monotonic Stack variant)
 * This approach helps us find the "left boundary" for each potential "well" or "dip".
 *
 * Iterate through the height array with a pointer `i`.
 * The stack stores indices of bars that could be a left wall.
 * It's a decreasing monotonic stack (stores indices of bars in decreasing height order).
 *
 * When `height[i]` is encountered:
 *   - If the stack is empty or `height[i]` is less than or equal to `height[stack.top()]`:
 *     Push `i` onto the stack. This bar could be a left wall for future bars.
 *   - If `height[i]` is *greater* than `height[stack.top()]`:
 *     This means we've found a right wall that can trap water with `stack.top()` as the bottom.
 *     Pop `stack.top()` (let's call it `bottom_idx`). This `bottom_idx` is a "valley" or "dip".
 *     Now, `stack.top()` (if not empty) is the `left_wall_idx`, and `i` is the `right_wall_idx`.
 *     Calculate trapped water:
 *       - `min_height = std::min(height[left_wall_idx], height[i])`
 *       - `distance = i - left_wall_idx - 1` (the width of the trapped water, excluding walls)
 *       - `water_height = min_height - height[bottom_idx]`
 *       - `trapped_water += water_height * distance`
 *     Repeat this process (popping from stack and calculating) until the stack is empty
 *     or `height[i]` is no longer greater than `height[stack.top()]`.
 *   - Then, push `i` onto the stack.
 */
int trapRainWater(const std::vector<int>& height) {
    if (height.empty()) {
        return 0;
    }

    std::stack<int> st; // Stores indices of bars
    int total_water = 0;

    for (int i = 0; i < height.size(); ++i) {
        // While stack is not empty and current bar is taller than the bar at stack.top()
        while (!st.empty() && height[i] > height[st.top()]) {
            int bottom_idx = st.top();
            st.pop(); // Pop the "bottom" bar (valley)

            if (st.empty()) {
                // If stack becomes empty, there's no left wall to trap water with current right wall
                break;
            }

            int left_wall_idx = st.top(); // The new top is the left wall
            int right_wall_idx = i;       // Current bar is the right wall

            // Calculate dimensions of the trapped water
            int min_h = std::min(height[left_wall_idx], height[right_wall_idx]);
            int width = right_wall_idx - left_wall_idx - 1; // Distance between walls, excluding walls
            int water_h = min_h - height[bottom_idx];      // Height of water trapped above the bottom bar

            if (water_h > 0 && width > 0) { // Ensure positive water height and width
                 total_water += water_h * width;
            }
        }
        st.push(i); // Push current bar's index onto stack
    }

    return total_water;
}
// Time Complexity: O(N), where N is the number of bars. Each element is pushed and popped at most once.
// Space Complexity: O(N) in the worst case (e.g., strictly decreasing heights), where all indices are pushed onto the stack.

// Alternative Approaches for Trapping Rain Water:
// 1. Two Pointers:
//    Maintain `left`, `right`, `left_max`, `right_max` pointers.
//    Iterate `left` from start, `right` from end.
//    If `height[left] < height[right]`:
//      If `height[left] >= left_max`, update `left_max`.
//      Else, add `left_max - height[left]` to `total_water`. Increment `left`.
//    Else (`height[right] <= height[left]`):
//      If `height[right] >= right_max`, update `right_max`.
//      Else, add `right_max - height[right]` to `total_water`. Decrement `right`.
//    Time: O(N), Space: O(1). This is generally considered the most optimal.

// 2. Dynamic Programming:
//    Create two arrays, `left_max[i]` and `right_max[i]`.
//    `left_max[i]` stores the maximum height to the left of `i` (including `i`).
//    `right_max[i]` stores the maximum height to the right of `i` (including `i`).
//    Then, iterate from `i = 0` to `n-1` and `water_at_i = std::min(left_max[i], right_max[i]) - height[i]`.
//    Sum all positive `water_at_i`.
//    Time: O(N), Space: O(N). Simpler to understand than stack, but uses more space than two pointers.
```