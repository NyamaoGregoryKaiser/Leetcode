#include "problems.h"
#include <unordered_map>
#include <stdexcept> // For std::runtime_error in MyQueue

// --- Problem 1: Valid Parentheses ---
namespace ValidParentheses {
    bool isValid(const std::string& s) {
        std::stack<char> st;
        std::unordered_map<char, char> matchingParentheses = {
            {')', '('},
            {'}', '{'},
            {']', '['}
        };

        for (char c : s) {
            if (matchingParentheses.count(c)) { // If it's a closing bracket
                // If stack is empty or top doesn't match, it's invalid
                if (st.empty() || st.top() != matchingParentheses[c]) {
                    return false;
                }
                st.pop(); // Pop the matching opening bracket
            } else { // It's an opening bracket
                st.push(c);
            }
        }

        // If the stack is empty, all brackets were matched
        return st.empty();
    }
}

// --- Problem 2: Implement Queue using Stacks ---
namespace QueueWithStacks {

    MyQueue::MyQueue() {
        // Constructor, stacks are default initialized
    }

    void MyQueue::transferStacks() {
        // Only transfer if outputStack is empty.
        // This ensures elements are transferred in order (FIFO)
        // and minimizes transfers, leading to amortized O(1) for pop/peek.
        if (outputStack.empty()) {
            while (!inputStack.empty()) {
                outputStack.push(inputStack.top());
                inputStack.pop();
            }
        }
    }

    void MyQueue::push(int x) {
        // Push elements onto the input stack. This is always O(1).
        inputStack.push(x);
    }

    int MyQueue::pop() {
        // Ensure outputStack has elements to pop.
        transferStacks();
        if (outputStack.empty()) {
            throw std::runtime_error("Queue is empty, cannot pop.");
        }
        int frontElement = outputStack.top();
        outputStack.pop();
        return frontElement;
    }

    int MyQueue::peek() {
        // Ensure outputStack has elements to peek.
        transferStacks();
        if (outputStack.empty()) {
            throw std::runtime_error("Queue is empty, cannot peek.");
        }
        return outputStack.top();
    }

    bool MyQueue::empty() {
        // The queue is empty if both stacks are empty.
        return inputStack.empty() && outputStack.empty();
    }
}

// --- Problem 3: Daily Temperatures ---
namespace DailyTemperatures {
    std::vector<int> dailyTemperatures(const std::vector<int>& temperatures) {
        int n = temperatures.size();
        std::vector<int> answer(n, 0); // Initialize all waiting days to 0
        std::stack<int> s; // Stores indices of temperatures (monotonic decreasing stack)

        // Iterate through temperatures from left to right
        for (int i = 0; i < n; ++i) {
            // While the stack is not empty AND the current temperature is warmer
            // than the temperature at the index on top of the stack
            while (!s.empty() && temperatures[i] > temperatures[s.top()]) {
                int prevDayIndex = s.top(); // Get the index of the previous colder day
                s.pop();                    // Pop it as we found its warmer day
                answer[prevDayIndex] = i - prevDayIndex; // Calculate waiting days
            }
            s.push(i); // Push the current day's index onto the stack
        }

        return answer;
    }
}

// --- Problem 4: Sliding Window Maximum ---
namespace SlidingWindowMaximum {
    std::vector<int> maxSlidingWindow(const std::vector<int>& nums, int k) {
        std::vector<int> result;
        if (nums.empty() || k <= 0) {
            return result;
        }

        // Deque stores indices of elements.
        // Elements in deque are always in decreasing order from front to back.
        // Front of deque stores the index of the maximum element in the current window.
        std::deque<int> dq;

        for (int i = 0; i < nums.size(); ++i) {
            // 1. Remove elements from the front that are outside the current window
            //    The window spans from (i - k + 1) to i.
            //    So, any index `dq.front()` less than `i - k + 1` is out of bounds.
            if (!dq.empty() && dq.front() == i - k) {
                dq.pop_front();
            }

            // 2. Remove elements from the back that are smaller than the current element `nums[i]`
            //    These elements are no longer candidates for the maximum because `nums[i]`
            //    is greater and appears later in the window.
            while (!dq.empty() && nums[dq.back()] <= nums[i]) {
                dq.pop_back();
            }

            // 3. Add current element's index to the back of the deque
            dq.push_back(i);

            // 4. If the window has fully formed (i.e., we've processed at least `k` elements)
            //    The maximum for the current window is `nums[dq.front()]`.
            if (i >= k - 1) {
                result.push_back(nums[dq.front()]);
            }
        }

        return result;
    }
}