#include "problems.h"
#include "utilities.h"
#include <iostream>
#include <vector>
#include <string>

void runValidParenthesesExamples() {
    std::cout << "\n--- Valid Parentheses Examples ---" << std::endl;
    std::vector<std::string> test_strings = {
        "()",
        "()[]{}",
        "(]",
        "([{}])",
        "{[()]}",
        "((",
        "]",
        "",
        "{{[[(())]]}}"
    };

    for (const auto& s : test_strings) {
        std::cout << "String: \"" << s << "\" -> "
                  << (ValidParentheses::isValid(s) ? "Valid" : "Invalid") << std::endl;
    }
}

void runQueueWithStacksExamples() {
    std::cout << "\n--- Implement Queue using Stacks Examples ---" << std::endl;
    QueueWithStacks::MyQueue q;
    std::cout << "Queue empty? " << (q.empty() ? "Yes" : "No") << std::endl;

    std::cout << "Push 1, 2, 3" << std::endl;
    q.push(1);
    q.push(2);
    q.push(3);

    std::cout << "Queue empty? " << (q.empty() ? "Yes" : "No") << std::endl;
    std::cout << "Peek: " << q.peek() << std::endl; // Should be 1
    std::cout << "Pop: " << q.pop() << std::endl;   // Should be 1
    std::cout << "Peek: " << q.peek() << std::endl; // Should be 2
    std::cout << "Push 4" << std::endl;
    q.push(4);
    std::cout << "Pop: " << q.pop() << std::endl;   // Should be 2
    std::cout << "Pop: " << q.pop() << std::endl;   // Should be 3
    std::cout << "Peek: " << q.peek() << std::endl; // Should be 4
    std::cout << "Pop: " << q.pop() << std::endl;   // Should be 4
    std::cout << "Queue empty? " << (q.empty() ? "Yes" : "No") << std::endl;

    try {
        q.pop();
    } catch (const std::runtime_error& e) {
        std::cout << "Attempt to pop from empty queue caught: " << e.what() << std::endl;
    }
}

void runDailyTemperaturesExamples() {
    std::cout << "\n--- Daily Temperatures Examples ---" << std::endl;
    std::vector<std::vector<int>> test_temps = {
        {73, 74, 75, 71, 69, 72, 76, 73},
        {30, 40, 50, 60},
        {30, 60, 90},
        {89, 62, 70, 58, 47, 47, 46, 76, 100, 70},
        {}, // Empty case
        {100}, // Single element
        {5, 4, 3, 2, 1} // Decreasing sequence
    };

    std::vector<std::vector<int>> expected_results = {
        {1, 1, 4, 2, 1, 1, 0, 0},
        {1, 1, 1, 0},
        {1, 1, 0},
        {8, 1, 5, 4, 3, 2, 1, 1, 0, 0},
        {},
        {0},
        {0, 0, 0, 0, 0}
    };

    for (size_t i = 0; i < test_temps.size(); ++i) {
        std::cout << "Temperatures: ";
        Utils::printVector(test_temps[i]);
        std::vector<int> result = DailyTemperatures::dailyTemperatures(test_temps[i]);
        std::cout << "Waiting Days: ";
        Utils::printVector(result);
        std::cout << "Expected: ";
        Utils::printVector(expected_results[i]);
        std::cout << (Utils::compareVectors(result, expected_results[i]) ? "Match" : "Mismatch!") << std::endl;
        std::cout << "---" << std::endl;
    }
}

void runSlidingWindowMaximumExamples() {
    std::cout << "\n--- Sliding Window Maximum Examples ---" << std::endl;
    std::vector<std::tuple<std::vector<int>, int, std::vector<int>>> test_cases = {
        {{1, 3, -1, -3, 5, 3, 6, 7}, 3, {3, 3, 5, 5, 6, 7}},
        {{1}, 1, {1}},
        {{1, -1}, 1, {1, -1}},
        {{7, 2, 4}, 2, {7, 4}},
        {{1, 3, 1, 2, 0, 5}, 3, {3, 3, 2, 5}},
        {{-1, -2, -3, -4, -5}, 2, {-1, -2, -3, -4}},
        {{1, 2, 3, 4, 5}, 1, {1, 2, 3, 4, 5}},
        {{5, 4, 3, 2, 1}, 5, {5}},
        {{}, 0, {}} // Empty array, k=0 (edge case, usually k>=1)
    };

    for (const auto& tc : test_cases) {
        const auto& nums = std::get<0>(tc);
        int k = std::get<1>(tc);
        const auto& expected = std::get<2>(tc);

        std::cout << "Nums: ";
        Utils::printVector(nums);
        std::cout << "k: " << k << std::endl;

        std::vector<int> result = SlidingWindowMaximum::maxSlidingWindow(nums, k);
        std::cout << "Max Window: ";
        Utils::printVector(result);
        std::cout << "Expected: ";
        Utils::printVector(expected);
        std::cout << (Utils::compareVectors(result, expected) ? "Match" : "Mismatch!") << std::endl;
        std::cout << "---" << std::endl;
    }
}


int main() {
    std::cout << "Running Problem Demos:" << std::endl;

    runValidParenthesesExamples();
    runQueueWithStacksExamples();
    runDailyTemperaturesExamples();
    runSlidingWindowMaximumExamples();

    std::cout << "\nAll demos complete." << std::endl;
    return 0;
}