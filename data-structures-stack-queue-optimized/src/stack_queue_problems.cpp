```cpp
#include "stack_queue_problems.h"
#include <algorithm> // For std::max, std::min (in brute force versions)

// --- Problem 1: Valid Parentheses ---
// Optimal Solution: Stack
// Time Complexity: O(N) where N is the length of the string `s`.
//                  We iterate through the string once, performing constant time stack operations.
// Space Complexity: O(N) in the worst case (e.g., "((((((("), where the stack might store all opening brackets.
bool isValidParentheses(const std::string& s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c); // Push opening brackets
        } else {
            // If it's a closing bracket and stack is empty, it's invalid
            if (st.empty()) {
                return false;
            }
            // Check if the top of the stack matches the corresponding opening bracket
            char top_char = st.top();
            st.pop();
            if ((c == ')' && top_char != '(') ||
                (c == ']' && top_char != '[') ||
                (c == '}' && top_char != '{')) {
                return false; // Mismatch
            }
        }
    }
    // After iterating, if the stack is not empty, it means unclosed opening brackets exist
    return st.empty();
}

// --- Problem 2: Min Stack ---
// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
// Optimal Solution: Using two stacks. One for data, one for tracking minimums.
// Time Complexity: O(1) for push, pop, top, and getMin.
//                  Each operation involves a constant number of stack pushes/pops.
// Space Complexity: O(N) in the worst case, where N is the number of elements in the stack.
//                   In the worst case (e.g., elements pushed in decreasing order), the min_stack
//                   can grow to the same size as the data_stack.
MinStack::MinStack() {
    // Stacks are initialized empty by default.
}

void MinStack::push(int val) {
    data_stack.push(val);
    if (min_stack.empty() || val <= min_stack.top()) {
        min_stack.push(val); // Only push to min_stack if current val is new minimum or equal to current minimum
    }
}

void MinStack::pop() {
    if (data_stack.empty()) {
        throw std::out_of_range("MinStack is empty, cannot pop.");
    }
    if (data_stack.top() == min_stack.top()) {
        min_stack.pop(); // If the popped element was the current minimum, remove it from min_stack
    }
    data_stack.pop();
}

int MinStack::top() {
    if (data_stack.empty()) {
        throw std::out_of_range("MinStack is empty, no top element.");
    }
    return data_stack.top();
}

int MinStack::getMin() {
    if (min_stack.empty()) {
        throw std::out_of_range("MinStack is empty, no minimum element.");
    }
    return min_stack.top();
}

// --- Problem 3: Implement Queue using Stacks ---
// Implement a first in first out (FIFO) queue using only two stacks.
// Optimal Solution: Two stacks (in_stack for push, out_stack for pop/peek).
// Time Complexity:
//    - push: O(1) amortized. A single push is O(1).
//    - pop: O(1) amortized. When `out_stack` is empty, transferring `N` elements takes O(N).
//           However, each element is pushed and popped onto `in_stack` once, and pushed and
//           popped from `out_stack` once. So, `2N` pushes/pops for `N` queue operations.
//           Thus, amortized cost per operation is O(1).
//    - peek: O(1) amortized. Similar to pop.
//    - empty: O(1).
// Space Complexity: O(N) where N is the total number of elements currently in the queue,
//                   as elements are stored across the two stacks.
MyQueue::MyQueue() {
    // Stacks are initialized empty by default.
}

void MyQueue::push(int x) {
    in_stack.push(x); // Simply push to in_stack
}

void MyQueue::transferElements() {
    if (out_stack.empty()) {
        while (!in_stack.empty()) {
            out_stack.push(in_stack.top());
            in_stack.pop();
        }
    }
}

int MyQueue::pop() {
    if (empty()) {
        throw std::out_of_range("Queue is empty, cannot pop.");
    }
    transferElements(); // Ensure out_stack has elements to pop
    int val = out_stack.top();
    out_stack.pop();
    return val;
}

int MyQueue::peek() {
    if (empty()) {
        throw std::out_of_range("Queue is empty, no front element.");
    }
    transferElements(); // Ensure out_stack has elements to peek
    return out_stack.top();
}

bool MyQueue::empty() {
    return in_stack.empty() && out_stack.empty();
}

// --- Problem 4: Sliding Window Maximum ---
// Optimal Solution: Using a Deque (Double-Ended Queue). Monotonic Decreasing Deque.
// Time Complexity: O(N) where N is the length of `nums`. Each element is pushed and popped
//                  from the deque at most twice.
// Space Complexity: O(K) in the worst case, as the deque stores at most K elements (indices).
std::vector<int> maxSlidingWindow(const std::vector<int>& nums, int k) {
    std::vector<int> result;
    if (nums.empty() || k <= 0 || k > nums.size()) {
        return result;
    }

    std::deque<int> dq; // Stores indices of elements, maintaining a decreasing order of values.

    for (int i = 0; i < nums.size(); ++i) {
        // 1. Remove elements from the front of the deque if they are out of the current window.
        //    The element at dq.front() is the maximum for the previous window, if its index
        //    is (i - k), it's no longer in the current window [i-k+1, i].
        if (!dq.empty() && dq.front() == i - k) {
            dq.pop_front();
        }

        // 2. Remove elements from the back of the deque if they are smaller than the current element `nums[i]`.
        //    These elements will never be the maximum in any future window that `nums[i]` is part of.
        while (!dq.empty() && nums[dq.back()] <= nums[i]) {
            dq.pop_back();
        }

        // 3. Add the current element's index to the back of the deque.
        dq.push_back(i);

        // 4. Once the window has fully formed (i.e., i >= k-1), the maximum element for the current window
        //    is at the front of the deque.
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    return result;
}

// Brute Force Solution for Sliding Window Maximum
// Time Complexity: O(N*K). For each of N-K+1 windows, we iterate K elements to find max.
// Space Complexity: O(1) if we don't count the result vector. O(N-K+1) for result.
std::vector<int> maxSlidingWindowBruteForce(const std::vector<int>& nums, int k) {
    std::vector<int> result;
    if (nums.empty() || k <= 0 || k > nums.size()) {
        return result;
    }

    for (int i = 0; i <= (int)nums.size() - k; ++i) {
        int current_max = nums[i];
        for (int j = 1; j < k; ++j) {
            current_max = std::max(current_max, nums[i + j]);
        }
        result.push_back(current_max);
    }
    return result;
}

// --- Problem 5: Daily Temperatures ---
// Optimal Solution: Monotonic Stack (stores indices in decreasing order of temperatures)
// Time Complexity: O(N) where N is the number of days (temperatures).
//                  Each temperature is pushed and popped from the stack at most once.
// Space Complexity: O(N) in the worst case (e.g., strictly decreasing temperatures),
//                   where the stack might store all indices.
std::vector<int> dailyTemperatures(const std::vector<int>& temperatures) {
    int n = temperatures.size();
    std::vector<int> result(n, 0); // Initialize with 0s
    std::stack<int> s;             // Stores indices of temperatures in decreasing order

    for (int i = 0; i < n; ++i) {
        // While stack is not empty and current temperature is warmer than temperature at stack's top index
        while (!s.empty() && temperatures[i] > temperatures[s.top()]) {
            int prev_day_index = s.top();
            s.pop();
            result[prev_day_index] = i - prev_day_index; // Calculate days to wait
        }
        s.push(i); // Push current day's index onto the stack
    }
    return result;
}

// Brute Force Solution for Daily Temperatures
// Time Complexity: O(N^2) where N is the number of days. For each day, we might iterate
//                  through all subsequent days.
// Space Complexity: O(1) if we don't count the result vector. O(N) for result.
std::vector<int> dailyTemperaturesBruteForce(const std::vector<int>& temperatures) {
    int n = temperatures.size();
    std::vector<int> result(n, 0);

    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            if (temperatures[j] > temperatures[i]) {
                result[i] = j - i;
                break; // Found a warmer day, move to the next day 'i'
            }
        }
    }
    return result;
}
```