#ifndef PROBLEMS_H
#define PROBLEMS_H

#include <string>
#include <vector>
#include <stack>
#include <queue>
#include <deque>

// --- Problem 1: Valid Parentheses ---
namespace ValidParentheses {
    /**
     * @brief Checks if a string containing parentheses is valid.
     *        An optimal solution using a stack.
     * @param s The input string.
     * @return True if the string is valid, false otherwise.
     *
     * Time Complexity: O(N) - We iterate through the string once.
     * Space Complexity: O(N) - In the worst case (e.g., "((("), the stack can store all opening brackets.
     */
    bool isValid(const std::string& s);
}

// --- Problem 2: Implement Queue using Stacks ---
namespace QueueWithStacks {
    /**
     * @brief Implements a FIFO queue using two std::stacks.
     *        This approach aims for amortized O(1) time complexity for all operations.
     */
    class MyQueue {
    private:
        std::stack<int> inputStack;  // Used for pushing elements
        std::stack<int> outputStack; // Used for popping/peeking elements

        /**
         * @brief Moves all elements from inputStack to outputStack.
         *        This operation is done only when outputStack is empty to optimize
         *        pop/peek operations.
         */
        void transferStacks();

    public:
        MyQueue(); // Constructor

        /**
         * @brief Pushes element x to the back of the queue.
         * @param x The element to push.
         * @return void
         *
         * Time Complexity: O(1) - Pushing to a stack is O(1).
         * Space Complexity: O(N) - Stores N elements in stacks.
         */
        void push(int x);

        /**
         * @brief Removes the element from the front of the queue and returns it.
         * @return The element at the front of the queue.
         *
         * Time Complexity: Amortized O(1). In the worst case (when transferStacks is called),
         *                  it's O(N) because N elements are moved. However, each element is
         *                  moved at most twice (from inputStack to outputStack, then popped),
         *                  so over N operations, the total time is O(N), making the amortized
         *                  cost O(1).
         * Space Complexity: O(N)
         */
        int pop();

        /**
         * @brief Returns the element at the front of the queue without removing it.
         * @return The element at the front of the queue.
         *
         * Time Complexity: Amortized O(1). Same logic as pop().
         * Space Complexity: O(N)
         */
        int peek();

        /**
         * @brief Returns true if the queue is empty, false otherwise.
         * @return True if empty, false otherwise.
         *
         * Time Complexity: O(1).
         * Space Complexity: O(N)
         */
        bool empty();
    };
}

// --- Problem 3: Daily Temperatures ---
namespace DailyTemperatures {
    /**
     * @brief Calculates waiting days for warmer temperatures using a monotonic stack.
     *        This is the optimal solution.
     * @param temperatures A vector of daily temperatures.
     * @return A vector where `answer[i]` is the number of days to wait for a warmer temperature.
     *
     * Time Complexity: O(N) - Each element is pushed onto the stack and popped from the stack at most once.
     * Space Complexity: O(N) - In the worst case (e.g., temperatures in decreasing order), the stack can
     *                           store all indices.
     */
    std::vector<int> dailyTemperatures(const std::vector<int>& temperatures);
}

// --- Problem 4: Sliding Window Maximum ---
namespace SlidingWindowMaximum {
    /**
     * @brief Finds the maximum in each sliding window using a deque (double-ended queue).
     *        This is the optimal O(N) solution.
     * @param nums The input array of integers.
     * @param k The size of the sliding window.
     * @return A vector containing the maximums for each window.
     *
     * Time Complexity: O(N) - Each element is pushed and popped from the deque at most once.
     * Space Complexity: O(K) - The deque stores at most K elements (indices within the current window).
     */
    std::vector<int> maxSlidingWindow(const std::vector<int>& nums, int k);
}

#endif // PROBLEMS_H