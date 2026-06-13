```cpp
#include "stack_queue_problems.h"
#include "utils/custom_stack_queue.h" // Include custom implementations
#include <iostream>
#include <vector>
#include <string>
#include <stdexcept> // For exception handling

void printVector(const std::vector<int>& vec, const std::string& name) {
    std::cout << name << ": [";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i] << (i == vec.size() - 1 ? "" : ", ");
    }
    std::cout << "]" << std::endl;
}

int main() {
    std::cout << "--- Stack and Queue Interview Project Demonstrations ---" << std::endl << std::endl;

    // --- Problem 1: Valid Parentheses ---
    std::cout << "1. Valid Parentheses:" << std::endl;
    std::string s1 = "()[]{}";
    std::string s2 = "([{}])";
    std::string s3 = "({[})";
    std::string s4 = "";
    std::string s5 = "[";
    std::cout << "\"" << s1 << "\" is valid: " << (isValidParentheses(s1) ? "true" : "false") << std::endl; // true
    std::cout << "\"" << s2 << "\" is valid: " << (isValidParentheses(s2) ? "true" : "false") << std::endl; // true
    std::cout << "\"" << s3 << "\" is valid: " << (isValidParentheses(s3) ? "true" : "false") << std::endl; // false
    std::cout << "\"" << s4 << "\" is valid: " << (isValidParentheses(s4) ? "true" : "false") << std::endl; // true
    std::cout << "\"" << s5 << "\" is valid: " << (isValidParentheses(s5) ? "true" : "false") << std::endl; // false
    std::cout << std::endl;

    // --- Problem 2: Min Stack ---
    std::cout << "2. Min Stack:" << std::endl;
    MinStack minStack;
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    std::cout << "MinStack top: " << minStack.top() << std::endl;       // Expected: -3
    std::cout << "MinStack getMin: " << minStack.getMin() << std::endl; // Expected: -3
    minStack.pop();
    std::cout << "MinStack top after pop: " << minStack.top() << std::endl;       // Expected: 0
    std::cout << "MinStack getMin after pop: " << minStack.getMin() << std::endl; // Expected: -2
    minStack.push(-5);
    std::cout << "MinStack top after push -5: " << minStack.top() << std::endl; // Expected: -5
    std::cout << "MinStack getMin after push -5: " << minStack.getMin() << std::endl; // Expected: -5
    std::cout << std::endl;

    // --- Problem 3: Implement Queue using Stacks ---
    std::cout << "3. Implement Queue using Stacks:" << std::endl;
    MyQueue myQueue;
    myQueue.push(1);
    myQueue.push(2);
    std::cout << "Queue peek: " << myQueue.peek() << std::endl; // Expected: 1
    myQueue.push(3);
    std::cout << "Queue pop: " << myQueue.pop() << std::endl;   // Expected: 1
    std::cout << "Queue peek: " << myQueue.peek() << std::endl; // Expected: 2
    std::cout << "Queue pop: " << myQueue.pop() << std::endl;   // Expected: 2
    std::cout << "Queue empty: " << (myQueue.empty() ? "true" : "false") << std::endl; // Expected: false
    std::cout << "Queue pop: " << myQueue.pop() << std::endl;   // Expected: 3
    std::cout << "Queue empty: " << (myQueue.empty() ? "true" : "false") << std::endl; // Expected: true
    try {
        myQueue.pop(); // Should throw exception
    } catch (const std::out_of_range& e) {
        std::cout << "Caught expected exception for empty queue pop: " << e.what() << std::endl;
    }
    std::cout << std::endl;

    // --- Problem 4: Sliding Window Maximum ---
    std::cout << "4. Sliding Window Maximum:" << std::endl;
    std::vector<int> nums4 = {1,3,-1,-3,5,3,6,7};
    int k4 = 3;
    std::vector<int> result4_optimal = maxSlidingWindow(nums4, k4);
    std::vector<int> result4_brute = maxSlidingWindowBruteForce(nums4, k4);
    printVector(nums4, "Input nums");
    std::cout << "Window size k: " << k4 << std::endl;
    printVector(result4_optimal, "Optimal Result"); // Expected: [3, 3, 5, 5, 6, 7]
    printVector(result4_brute, "Brute Force Result"); // Expected: [3, 3, 5, 5, 6, 7]
    std::cout << std::endl;

    std::vector<int> nums4_b = {1};
    int k4_b = 1;
    printVector(maxSlidingWindow(nums4_b, k4_b), "Optimal Result for {1}, k=1"); // Expected: [1]
    std::cout << std::endl;

    // --- Problem 5: Daily Temperatures ---
    std::cout << "5. Daily Temperatures:" << std::endl;
    std::vector<int> temps5 = {73, 74, 75, 71, 69, 72, 76, 73};
    std::vector<int> result5_optimal = dailyTemperatures(temps5);
    std::vector<int> result5_brute = dailyTemperaturesBruteForce(temps5);
    printVector(temps5, "Input Temperatures");
    printVector(result5_optimal, "Optimal Result"); // Expected: [1, 1, 4, 2, 1, 1, 0, 0]
    printVector(result5_brute, "Brute Force Result"); // Expected: [1, 1, 4, 2, 1, 1, 0, 0]
    std::cout << std::endl;

    std::vector<int> temps5_b = {30, 40, 50, 60};
    printVector(dailyTemperatures(temps5_b), "Optimal Result for {30,40,50,60}"); // Expected: [1, 1, 1, 0]
    std::cout << std::endl;

    // --- Custom Stack and Queue Demonstrations ---
    std::cout << "--- Custom Stack (Linked List) ---" << std::endl;
    CustomStack<std::string> cs;
    cs.push("Apple");
    cs.push("Banana");
    std::cout << "CustomStack size: " << cs.size() << std::endl; // Expected: 2
    std::cout << "CustomStack top: " << cs.top() << std::endl;   // Expected: Banana
    cs.pop();
    std::cout << "CustomStack top after pop: " << cs.top() << std::endl; // Expected: Apple
    cs.push("Cherry");
    std::cout << "CustomStack size: " << cs.size() << std::endl; // Expected: 2
    std::cout << "CustomStack top: " << cs.top() << std::endl;   // Expected: Cherry
    while (!cs.isEmpty()) {
        std::cout << "Popping from CustomStack: " << cs.pop() << std::endl;
    }
    try {
        cs.pop();
    } catch (const std::underflow_error& e) {
        std::cout << "Caught expected exception for empty CustomStack pop: " << e.what() << std::endl;
    }
    std::cout << std::endl;

    std::cout << "--- Custom Queue (Linked List) ---" << std::endl;
    CustomQueue<double> cq;
    cq.enqueue(1.1);
    cq.enqueue(2.2);
    std::cout << "CustomQueue size: " << cq.size() << std::endl; // Expected: 2
    std::cout << "CustomQueue front: " << cq.front() << std::endl;   // Expected: 1.1
    cq.dequeue();
    std::cout << "CustomQueue front after dequeue: " << cq.front() << std::endl; // Expected: 2.2
    cq.enqueue(3.3);
    std::cout << "CustomQueue size: " << cq.size() << std::endl; // Expected: 2
    std::cout << "CustomQueue front: " << cq.front() << std::endl;   // Expected: 2.2
    while (!cq.isEmpty()) {
        std::cout << "Dequeuing from CustomQueue: " << cq.dequeue() << std::endl;
    }
    try {
        cq.dequeue();
    } catch (const std::underflow_error& e) {
        std::cout << "Caught expected exception for empty CustomQueue dequeue: " << e.what() << std::endl;
    }
    std::cout << std::endl;

    return 0;
}
```