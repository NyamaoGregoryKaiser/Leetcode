```cpp
#include "gtest/gtest.h"
#include "../src/stack_queue_problems.h"
#include "../src/utils/custom_stack_queue.h"
#include <vector>
#include <string>
#include <stdexcept> // For exceptions in MinStack, MyQueue, CustomStack/Queue

// Helper function to compare vectors
template<typename T>
void EXPECT_VEC_EQ(const std::vector<T>& actual, const std::vector<T>& expected) {
    ASSERT_EQ(actual.size(), expected.size()) << "Vectors have different sizes!";
    for (size_t i = 0; i < actual.size(); ++i) {
        EXPECT_EQ(actual[i], expected[i]) << "Vectors differ at index " << i;
    }
}

// --- Problem 1: Valid Parentheses ---
TEST(ValidParenthesesTest, BasicValidCases) {
    EXPECT_TRUE(isValidParentheses("()"));
    EXPECT_TRUE(isValidParentheses("()[]{}"));
    EXPECT_TRUE(isValidParentheses("{[]}"));
}

TEST(ValidParenthesesTest, NestedValidCases) {
    EXPECT_TRUE(isValidParentheses("([{}])"));
    EXPECT_TRUE(isValidParentheses("{([])}"));
    EXPECT_TRUE(isValidParentheses("((())){{[[]]}}"));
}

TEST(ValidParenthesesTest, BasicInvalidCases) {
    EXPECT_FALSE(isValidParentheses("("));
    EXPECT_FALSE(isValidParentheses("){"));
    EXPECT_FALSE(isValidParentheses("([)]"));
    EXPECT_FALSE(isValidParentheses("((("));
    EXPECT_FALSE(isValidParentheses(")))"));
}

TEST(ValidParenthesesTest, MismatchedCases) {
    EXPECT_FALSE(isValidParentheses("({[})"));
    EXPECT_FALSE(isValidParentheses("{[}]"));
}

TEST(ValidParenthesesTest, EmptyString) {
    EXPECT_TRUE(isValidParentheses(""));
}

TEST(ValidParenthesesTest, OnlyOpeningBrackets) {
    EXPECT_FALSE(isValidParentheses("{[("));
}

TEST(ValidParenthesesTest, OnlyClosingBrackets) {
    EXPECT_FALSE(isValidParentheses("}])"));
}

// --- Problem 2: Min Stack ---
TEST(MinStackTest, BasicOperations) {
    MinStack minStack;
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    EXPECT_EQ(minStack.getMin(), -3);
    EXPECT_EQ(minStack.top(), -3);
    minStack.pop();
    EXPECT_EQ(minStack.top(), 0);
    EXPECT_EQ(minStack.getMin(), -2);
}

TEST(MinStackTest, DuplicateMinimums) {
    MinStack minStack;
    minStack.push(2);
    minStack.push(0);
    minStack.push(1);
    minStack.push(0);
    EXPECT_EQ(minStack.getMin(), 0);
    minStack.pop(); // Pop 0
    EXPECT_EQ(minStack.getMin(), 0); // Min should still be 0 (from the previous one)
    minStack.pop(); // Pop 1
    EXPECT_EQ(minStack.getMin(), 0);
    minStack.pop(); // Pop 0
    EXPECT_EQ(minStack.getMin(), 2);
}

TEST(MinStackTest, DecreasingOrder) {
    MinStack minStack;
    minStack.push(5);
    minStack.push(4);
    minStack.push(3);
    minStack.push(2);
    minStack.push(1);
    EXPECT_EQ(minStack.getMin(), 1);
    minStack.pop(); // 1
    EXPECT_EQ(minStack.getMin(), 2);
    minStack.pop(); // 2
    EXPECT_EQ(minStack.getMin(), 3);
}

TEST(MinStackTest, IncreasingOrder) {
    MinStack minStack;
    minStack.push(1);
    minStack.push(2);
    minStack.push(3);
    minStack.push(4);
    minStack.push(5);
    EXPECT_EQ(minStack.getMin(), 1);
    minStack.pop(); // 5
    EXPECT_EQ(minStack.getMin(), 1);
    minStack.pop(); // 4
    EXPECT_EQ(minStack.getMin(), 1);
}

TEST(MinStackTest, EmptyStackExceptions) {
    MinStack minStack;
    EXPECT_THROW(minStack.pop(), std::out_of_range);
    EXPECT_THROW(minStack.top(), std::out_of_range);
    EXPECT_THROW(minStack.getMin(), std::out_of_range);
}

TEST(MinStackTest, SingleElement) {
    MinStack minStack;
    minStack.push(7);
    EXPECT_EQ(minStack.top(), 7);
    EXPECT_EQ(minStack.getMin(), 7);
    minStack.pop();
    EXPECT_THROW(minStack.pop(), std::out_of_range);
}

// --- Problem 3: Implement Queue using Stacks ---
TEST(MyQueueTest, BasicOperations) {
    MyQueue myQueue;
    EXPECT_TRUE(myQueue.empty());
    myQueue.push(1);
    myQueue.push(2);
    EXPECT_FALSE(myQueue.empty());
    EXPECT_EQ(myQueue.peek(), 1);
    EXPECT_EQ(myQueue.pop(), 1);
    EXPECT_EQ(myQueue.peek(), 2);
    myQueue.push(3);
    EXPECT_EQ(myQueue.pop(), 2);
    EXPECT_EQ(myQueue.peek(), 3);
    EXPECT_EQ(myQueue.pop(), 3);
    EXPECT_TRUE(myQueue.empty());
}

TEST(MyQueueTest, ManyPushesThenManyPops) {
    MyQueue myQueue;
    for (int i = 0; i < 100; ++i) {
        myQueue.push(i);
    }
    EXPECT_EQ(myQueue.peek(), 0);
    EXPECT_FALSE(myQueue.empty());

    for (int i = 0; i < 100; ++i) {
        EXPECT_EQ(myQueue.pop(), i);
    }
    EXPECT_TRUE(myQueue.empty());
}

TEST(MyQueueTest, InterleavedOperations) {
    MyQueue myQueue;
    myQueue.push(10);
    myQueue.push(20);
    EXPECT_EQ(myQueue.pop(), 10);
    myQueue.push(30);
    EXPECT_EQ(myQueue.pop(), 20);
    myQueue.push(40);
    EXPECT_EQ(myQueue.pop(), 30);
    EXPECT_EQ(myQueue.peek(), 40);
    EXPECT_EQ(myQueue.pop(), 40);
    EXPECT_TRUE(myQueue.empty());
}

TEST(MyQueueTest, EmptyQueueExceptions) {
    MyQueue myQueue;
    EXPECT_THROW(myQueue.pop(), std::out_of_range);
    EXPECT_THROW(myQueue.peek(), std::out_of_range);
}

// --- Problem 4: Sliding Window Maximum ---
TEST(MaxSlidingWindowTest, ExampleCase) {
    std::vector<int> nums = {1,3,-1,-3,5,3,6,7};
    int k = 3;
    std::vector<int> expected = {3,3,5,5,6,7};
    EXPECT_VEC_EQ(maxSlidingWindow(nums, k), expected);
    EXPECT_VEC_EQ(maxSlidingWindowBruteForce(nums, k), expected);
}

TEST(MaxSlidingWindowTest, SingleElementWindow) {
    std::vector<int> nums = {1,2,3,4,5};
    int k = 1;
    std::vector<int> expected = {1,2,3,4,5};
    EXPECT_VEC_EQ(maxSlidingWindow(nums, k), expected);
    EXPECT_VEC_EQ(maxSlidingWindowBruteForce(nums, k), expected);
}

TEST(MaxSlidingWindowTest, WindowSizeEqualsArraySize) {
    std::vector<int> nums = {1,3,-1,-3,5,3,6,7};
    int k = 8;
    std::vector<int> expected = {7};
    EXPECT_VEC_EQ(maxSlidingWindow(nums, k), expected);
    EXPECT_VEC_EQ(maxSlidingWindowBruteForce(nums, k), expected);
}

TEST(MaxSlidingWindowTest, EmptyArray) {
    std::vector<int> nums = {};
    int k = 0;
    std::vector<int> expected = {};
    EXPECT_VEC_EQ(maxSlidingWindow(nums, k), expected);
    EXPECT_VEC_EQ(maxSlidingWindowBruteForce(nums, k), expected);
}

TEST(MaxSlidingWindowTest, KGreaterThanArraySize) {
    std::vector<int> nums = {1,2,3};
    int k = 5;
    std::vector<int> expected = {};
    EXPECT_VEC_EQ(maxSlidingWindow(nums, k), expected);
    EXPECT_VEC_EQ(maxSlidingWindowBruteForce(nums, k), expected);
}

TEST(MaxSlidingWindowTest, AllSameElements) {
    std::vector<int> nums = {5,5,5,5,5};
    int k = 3;
    std::vector<int> expected = {5,5,5};
    EXPECT_VEC_EQ(maxSlidingWindow(nums, k), expected);
    EXPECT_VEC_EQ(maxSlidingWindowBruteForce(nums, k), expected);
}

TEST(MaxSlidingWindowTest, NegativeNumbers) {
    std::vector<int> nums = {-7,-8,7,5,7,1,6,0};
    int k = 4;
    std::vector<int> expected = {7,7,7,7,7};
    EXPECT_VEC_EQ(maxSlidingWindow(nums, k), expected);
    EXPECT_VEC_EQ(maxSlidingWindowBruteForce(nums, k), expected);
}

// --- Problem 5: Daily Temperatures ---
TEST(DailyTemperaturesTest, ExampleCase) {
    std::vector<int> temperatures = {73, 74, 75, 71, 69, 72, 76, 73};
    std::vector<int> expected = {1, 1, 4, 2, 1, 1, 0, 0};
    EXPECT_VEC_EQ(dailyTemperatures(temperatures), expected);
    EXPECT_VEC_EQ(dailyTemperaturesBruteForce(temperatures), expected);
}

TEST(DailyTemperaturesTest, AllIncreasing) {
    std::vector<int> temperatures = {30, 40, 50, 60};
    std::vector<int> expected = {1, 1, 1, 0};
    EXPECT_VEC_EQ(dailyTemperatures(temperatures), expected);
    EXPECT_VEC_EQ(dailyTemperaturesBruteForce(temperatures), expected);
}

TEST(DailyTemperaturesTest, AllDecreasing) {
    std::vector<int> temperatures = {60, 50, 40, 30};
    std::vector<int> expected = {0, 0, 0, 0};
    EXPECT_VEC_EQ(dailyTemperatures(temperatures), expected);
    EXPECT_VEC_EQ(dailyTemperaturesBruteForce(temperatures), expected);
}

TEST(DailyTemperaturesTest, MixedTemperatures) {
    std::vector<int> temperatures = {89, 62, 70, 58, 47, 47, 46, 76, 100, 70};
    std::vector<int> expected = {8, 1, 6, 4, 3, 2, 1, 1, 0, 0};
    EXPECT_VEC_EQ(dailyTemperatures(temperatures), expected);
    EXPECT_VEC_EQ(dailyTemperaturesBruteForce(temperatures), expected);
}

TEST(DailyTemperaturesTest, SingleElement) {
    std::vector<int> temperatures = {30};
    std::vector<int> expected = {0};
    EXPECT_VEC_EQ(dailyTemperatures(temperatures), expected);
    EXPECT_VEC_EQ(dailyTemperaturesBruteForce(temperatures), expected);
}

TEST(DailyTemperaturesTest, EmptyArray) {
    std::vector<int> temperatures = {};
    std::vector<int> expected = {};
    EXPECT_VEC_EQ(dailyTemperatures(temperatures), expected);
    EXPECT_VEC_EQ(dailyTemperaturesBruteForce(temperatures), expected);
}

TEST(DailyTemperaturesTest, RepeatingValues) {
    std::vector<int> temperatures = {50, 50, 50, 50, 60};
    std::vector<int> expected = {4, 3, 2, 1, 0};
    EXPECT_VEC_EQ(dailyTemperatures(temperatures), expected);
    EXPECT_VEC_EQ(dailyTemperaturesBruteForce(temperatures), expected);
}

// --- Custom Stack Tests ---
TEST(CustomStackTest, BasicOperations) {
    CustomStack<int> s;
    EXPECT_TRUE(s.isEmpty());
    EXPECT_EQ(s.size(), 0);

    s.push(10);
    s.push(20);
    EXPECT_FALSE(s.isEmpty());
    EXPECT_EQ(s.size(), 2);
    EXPECT_EQ(s.top(), 20);

    EXPECT_EQ(s.pop(), 20);
    EXPECT_EQ(s.top(), 10);
    EXPECT_EQ(s.size(), 1);

    EXPECT_EQ(s.pop(), 10);
    EXPECT_TRUE(s.isEmpty());
    EXPECT_EQ(s.size(), 0);
}

TEST(CustomStackTest, ExceptionHandling) {
    CustomStack<int> s;
    EXPECT_THROW(s.pop(), std::underflow_error);
    EXPECT_THROW(s.top(), std::underflow_error);

    s.push(5);
    s.pop();
    EXPECT_THROW(s.pop(), std::underflow_error);
}

TEST(CustomStackTest, BoundedStack) {
    CustomStack<int> s(2); // Capacity of 2
    s.push(1);
    s.push(2);
    EXPECT_TRUE(s.isFull());
    EXPECT_THROW(s.push(3), std::overflow_error);
    EXPECT_EQ(s.size(), 2);
    EXPECT_EQ(s.top(), 2);
}

TEST(CustomStackTest, CopyConstructorAndAssignmentOperator) {
    CustomStack<int> s1;
    s1.push(1);
    s1.push(2);
    s1.push(3);

    CustomStack<int> s2 = s1; // Copy constructor
    EXPECT_EQ(s2.size(), 3);
    EXPECT_EQ(s2.top(), 3);
    s2.pop();
    EXPECT_EQ(s2.top(), 2); // s2 should be independent
    EXPECT_EQ(s1.top(), 3); // s1 unchanged

    CustomStack<int> s3;
    s3.push(100);
    s3 = s1; // Assignment operator
    EXPECT_EQ(s3.size(), 3);
    EXPECT_EQ(s3.top(), 3);
    s3.pop();
    EXPECT_EQ(s3.top(), 2); // s3 should be independent
    EXPECT_EQ(s1.top(), 3); // s1 unchanged

    // Self-assignment
    s1 = s1;
    EXPECT_EQ(s1.size(), 3);
    EXPECT_EQ(s1.top(), 3);
}

// --- Custom Queue Tests ---
TEST(CustomQueueTest, BasicOperations) {
    CustomQueue<std::string> q;
    EXPECT_TRUE(q.isEmpty());
    EXPECT_EQ(q.size(), 0);

    q.enqueue("apple");
    q.enqueue("banana");
    EXPECT_FALSE(q.isEmpty());
    EXPECT_EQ(q.size(), 2);
    EXPECT_EQ(q.front(), "apple");

    EXPECT_EQ(q.dequeue(), "apple");
    EXPECT_EQ(q.front(), "banana");
    EXPECT_EQ(q.size(), 1);

    q.enqueue("cherry");
    EXPECT_EQ(q.dequeue(), "banana");
    EXPECT_EQ(q.dequeue(), "cherry");
    EXPECT_TRUE(q.isEmpty());
    EXPECT_EQ(q.size(), 0);
}

TEST(CustomQueueTest, ExceptionHandling) {
    CustomQueue<int> q;
    EXPECT_THROW(q.dequeue(), std::underflow_error);
    EXPECT_THROW(q.front(), std::underflow_error);

    q.enqueue(5);
    q.dequeue();
    EXPECT_THROW(q.dequeue(), std::underflow_error);
}

TEST(CustomQueueTest, BoundedQueue) {
    CustomQueue<int> q(2); // Capacity of 2
    q.enqueue(1);
    q.enqueue(2);
    EXPECT_TRUE(q.isFull());
    EXPECT_THROW(q.enqueue(3), std::overflow_error);
    EXPECT_EQ(q.size(), 2);
    EXPECT_EQ(q.front(), 1);
}

TEST(CustomQueueTest, CopyConstructorAndAssignmentOperator) {
    CustomQueue<int> q1;
    q1.enqueue(1);
    q1.enqueue(2);
    q1.enqueue(3);

    CustomQueue<int> q2 = q1; // Copy constructor
    EXPECT_EQ(q2.size(), 3);
    EXPECT_EQ(q2.front(), 1);
    q2.dequeue();
    EXPECT_EQ(q2.front(), 2); // q2 should be independent
    EXPECT_EQ(q1.front(), 1); // q1 unchanged

    CustomQueue<int> q3;
    q3.enqueue(100);
    q3 = q1; // Assignment operator
    EXPECT_EQ(q3.size(), 3);
    EXPECT_EQ(q3.front(), 1);
    q3.dequeue();
    EXPECT_EQ(q3.front(), 2); // q3 should be independent
    EXPECT_EQ(q1.front(), 1); // q1 unchanged

    // Self-assignment
    q1 = q1;
    EXPECT_EQ(q1.size(), 3);
    EXPECT_EQ(q1.front(), 1);
}
```