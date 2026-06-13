```cpp
#ifndef STACK_QUEUE_PROBLEMS_H
#define STACK_QUEUE_PROBLEMS_H

#include <string>
#include <vector>
#include <stack>   // For std::stack
#include <queue>   // For std::queue
#include <deque>   // For std::deque

// Problem 1: Valid Parentheses
bool isValidParentheses(const std::string& s);

// Problem 2: Min Stack
// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
class MinStack {
public:
    MinStack();
    void push(int val);
    void pop();
    int top();
    int getMin();

private:
    std::stack<int> data_stack; // Stores actual elements
    std::stack<int> min_stack;  // Stores minimums seen so far
};

// Problem 3: Implement Queue using Stacks
// Implement a first in first out (FIFO) queue using only two stacks.
class MyQueue {
public:
    MyQueue();
    void push(int x); // Push element x to the back of queue.
    int pop();        // Removes the element from in front of queue and returns that element.
    int peek();       // Get the front element.
    bool empty();     // Returns true if the queue is empty, false otherwise.

private:
    std::stack<int> in_stack;  // For pushing elements
    std::stack<int> out_stack; // For popping/peeking elements

    // Helper to transfer elements from in_stack to out_stack
    void transferElements();
};

// Problem 4: Sliding Window Maximum
// Given an array nums, there is a sliding window of size k which moves from the very left
// of the array to the very right. You can only see the k numbers in the window.
// Return the maximum sliding window.
std::vector<int> maxSlidingWindow(const std::vector<int>& nums, int k);
std::vector<int> maxSlidingWindowBruteForce(const std::vector<int>& nums, int k); // Brute force for comparison

// Problem 5: Daily Temperatures
// Given an array of integers temperatures represents the daily temperatures,
// return an array answer such that answer[i] is the number of days you have to
// wait after the i-th day to get a warmer temperature. If there is no future
// day for which this is possible, keep answer[i] == 0 instead.
std::vector<int> dailyTemperatures(const std::vector<int>& temperatures);
std::vector<int> dailyTemperaturesBruteForce(const std::vector<int>& temperatures); // Brute force for comparison

#endif // STACK_QUEUE_PROBLEMS_H
```