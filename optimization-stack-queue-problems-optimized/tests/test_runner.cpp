#include "problems.h"
#include "test_cases.h"
#include "utilities.h" // For Utils::printVector and Utils::compareVectors
#include <iostream>
#include <cassert> // For basic assert functionality
#include <stdexcept> // For std::runtime_error

// A simple custom test framework to replace Google Test for this project.
// It counts passed/failed tests and provides basic reporting.

int g_tests_passed = 0;
int g_tests_failed = 0;

#define RUN_TEST(test_func) \
    do { \
        std::cout << "Running " << #test_func << "..." << std::endl; \
        test_func(); \
    } while (0)

#define ASSERT_TRUE(condition, message) \
    do { \
        if (!(condition)) { \
            std::cerr << "FAIL: " << __FILE__ << ":" << __LINE__ << " - " << message << std::endl; \
            g_tests_failed++; \
        } else { \
            g_tests_passed++; \
        } \
    } while (0)

#define ASSERT_EQ(actual, expected, message) \
    do { \
        if (!((actual) == (expected))) { \
            std::cerr << "FAIL: " << __FILE__ << ":" << __LINE__ << " - " << message << \
                         " (Actual: " << (actual) << ", Expected: " << (expected) << ")" << std::endl; \
            g_tests_failed++; \
        } else { \
            g_tests_passed++; \
        } \
    } while (0)

#define ASSERT_VECTOR_EQ(actual_vec, expected_vec, message) \
    do { \
        if (!Utils::compareVectors((actual_vec), (expected_vec))) { \
            std::cerr << "FAIL: " << __FILE__ << ":" << __LINE__ << " - " << message << std::endl; \
            std::cerr << "       Actual:   "; Utils::printVector((actual_vec)); \
            std::cerr << "       Expected: "; Utils::printVector((expected_vec)); \
            g_tests_failed++; \
        } else { \
            g_tests_passed++; \
        } \
    } while (0)

#define ASSERT_THROW(expression, exception_type, message) \
    do { \
        bool thrown = false; \
        try { \
            expression; \
        } catch (const exception_type& e) { \
            thrown = true; \
        } catch (...) {} \
        if (!thrown) { \
            std::cerr << "FAIL: " << __FILE__ << ":" << __LINE__ << " - " << message << \
                         " (Expected " << #exception_type << " but no exception was thrown)" << std::endl; \
            g_tests_failed++; \
        } else { \
            g_tests_passed++; \
        } \
    } while (0)

// --- Test Functions ---

void testValidParentheses() {
    for (const auto& test_case : TestCases::getValidParenthesesTests()) {
        bool result = ValidParentheses::isValid(test_case.input);
        ASSERT_EQ(result, test_case.expected, "ValidParentheses failed for input: " + test_case.input);
    }
}

void testQueueWithStacksBasicOperations() {
    QueueWithStacks::MyQueue q;
    ASSERT_TRUE(q.empty(), "Queue should be empty initially");

    q.push(1);
    ASSERT_FALSE(q.empty(), "Queue should not be empty after push");
    ASSERT_EQ(q.peek(), 1, "Peek should return 1 after pushing 1");

    q.push(2);
    ASSERT_EQ(q.peek(), 1, "Peek should still return 1 after pushing 2");

    ASSERT_EQ(q.pop(), 1, "Pop should return 1");
    ASSERT_EQ(q.peek(), 2, "Peek should return 2 after popping 1");
    ASSERT_FALSE(q.empty(), "Queue should not be empty");

    q.push(3);
    q.push(4);
    ASSERT_EQ(q.pop(), 2, "Pop should return 2");
    ASSERT_EQ(q.pop(), 3, "Pop should return 3");
    ASSERT_EQ(q.peek(), 4, "Peek should return 4");
    ASSERT_EQ(q.pop(), 4, "Pop should return 4");

    ASSERT_TRUE(q.empty(), "Queue should be empty after all pops");
}

void testQueueWithStacksEmptyBehavior() {
    QueueWithStacks::MyQueue q;

    ASSERT_THROW(q.peek(), std::runtime_error, "Peek on empty queue should throw exception");
    ASSERT_THROW(q.pop(), std::runtime_error, "Pop on empty queue should throw exception");

    q.push(5);
    ASSERT_FALSE(q.empty(), "Queue should not be empty");
    ASSERT_EQ(q.peek(), 5, "Peek should work after push");
    ASSERT_EQ(q.pop(), 5, "Pop should work after push");
    ASSERT_TRUE(q.empty(), "Queue should be empty again");

    ASSERT_THROW(q.pop(), std::runtime_error, "Pop on empty queue after one push/pop cycle should throw");
}

void testDailyTemperatures() {
    for (const auto& test_case : TestCases::getDailyTemperaturesTests()) {
        std::vector<int> result = DailyTemperatures::dailyTemperatures(test_case.input);
        ASSERT_VECTOR_EQ(result, test_case.expected, "DailyTemperatures failed for input");
    }
}

void testSlidingWindowMaximum() {
    for (const auto& test_case : TestCases::getSlidingWindowMaximumTests()) {
        const auto& nums = std::get<0>(test_case);
        int k = std::get<1>(test_case);
        const auto& expected = std::get<2>(test_case);

        std::vector<int> result = SlidingWindowMaximum::maxSlidingWindow(nums, k);
        ASSERT_VECTOR_EQ(result, expected, "SlidingWindowMaximum failed for input with k=" + std::to_string(k));
    }
}


int main() {
    std::cout << "--- Running All Tests ---" << std::endl;

    RUN_TEST(testValidParentheses);
    RUN_TEST(testQueueWithStacksBasicOperations);
    RUN_TEST(testQueueWithStacksEmptyBehavior);
    RUN_TEST(testDailyTemperatures);
    RUN_TEST(testSlidingWindowMaximum);

    std::cout << "\n--- Test Summary ---" << std::endl;
    std::cout << "Passed: " << g_tests_passed << std::endl;
    std::cout << "Failed: " << g_tests_failed << std::endl;

    if (g_tests_failed > 0) {
        std::cout << "Some tests failed!" << std::endl;
        return 1; // Indicate failure
    } else {
        std::cout << "All tests passed successfully!" << std::endl;
        return 0; // Indicate success
    }
}