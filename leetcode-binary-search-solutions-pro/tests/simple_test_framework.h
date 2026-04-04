```cpp
#ifndef SIMPLE_TEST_FRAMEWORK_H
#define SIMPLE_TEST_FRAMEWORK_H

#include <iostream>
#include <string>
#include <vector>
#include <chrono> // For measuring test execution time

// ANSI escape codes for colored output
#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_GREEN   "\x1b[32m"
#define ANSI_COLOR_YELLOW  "\x1b[33m"
#define ANSI_COLOR_RESET   "\x1b[0m"

static int g_test_count = 0;
static int g_test_failures = 0;

#define TEST_CASE(name) \
    void name() { \
        std::cout << ANSI_COLOR_YELLOW << "[RUNNING TEST] " << #name << ANSI_COLOR_RESET << std::endl; \
        g_test_count++;

#define END_TEST_CASE \
    }

#define ASSERT_TRUE(condition, message) \
    if (!(condition)) { \
        std::cerr << ANSI_COLOR_RED << "  FAIL: " << message << " (Condition: " << #condition << ")" << ANSI_COLOR_RESET << std::endl; \
        g_test_failures++; \
        return; \
    }

#define ASSERT_FALSE(condition, message) \
    if (condition) { \
        std::cerr << ANSI_COLOR_RED << "  FAIL: " << message << " (Condition: " << #condition << ")" << ANSI_COLOR_RESET << std::endl; \
        g_test_failures++; \
        return; \
    }

#define ASSERT_EQUAL(expected, actual, message) \
    if (!((expected) == (actual))) { \
        std::cerr << ANSI_COLOR_RED << "  FAIL: " << message << " (Expected: " << (expected) << ", Actual: " << (actual) << ")" << ANSI_COLOR_RESET << std::endl; \
        g_test_failures++; \
        return; \
    }

#define ASSERT_NOT_EQUAL(expected, actual, message) \
    if (((expected) == (actual))) { \
        std::cerr << ANSI_COLOR_RED << "  FAIL: " << message << " (Expected NOT: " << (expected) << ", Actual: " << (actual) << ")" << ANSI_COLOR_RESET << std::endl; \
        g_test_failures++; \
        return; \
    }

#define ASSERT_OPTIONAL_EQUAL(expected_opt, actual_opt, message) \
    if (!expected_opt.has_value() && actual_opt.has_value()) { \
        std::cerr << ANSI_COLOR_RED << "  FAIL: " << message << " (Expected: nullopt, Actual: " << actual_opt.value() << ")" << ANSI_COLOR_RESET << std::endl; \
        g_test_failures++; \
        return; \
    } \
    if (expected_opt.has_value() && !actual_opt.has_value()) { \
        std::cerr << ANSI_COLOR_RED << "  FAIL: " << message << " (Expected: " << expected_opt.value() << ", Actual: nullopt)" << ANSI_COLOR_RESET << std::endl; \
        g_test_failures++; \
        return; \
    } \
    if (expected_opt.has_value() && actual_opt.has_value() && expected_opt.value() != actual_opt.value()) { \
        std::cerr << ANSI_COLOR_RED << "  FAIL: " << message << " (Expected: " << expected_opt.value() << ", Actual: " << actual_opt.value() << ")" << ANSI_COLOR_RESET << std::endl; \
        g_test_failures++; \
        return; \
    } \
    if (!expected_opt.has_value() && !actual_opt.has_value()) { /* Both nullopt, success */ } \
    else { /* Both have values, and they are equal, success */ }


#define ASSERT_PAIR_OPTIONAL_EQUAL(expected_pair, actual_pair, message) \
    ASSERT_OPTIONAL_EQUAL(expected_pair.first, actual_pair.first, message + std::string(" (first element)")) \
    ASSERT_OPTIONAL_EQUAL(expected_pair.second, actual_pair.second, message + std::string(" (second element)"))


#define RUN_ALL_TESTS(...) \
    int main() { \
        auto start_time = std::chrono::high_resolution_clock::now(); \
        void (*tests[])() = {__VA_ARGS__}; \
        for (auto test : tests) { \
            test(); \
        } \
        auto end_time = std::chrono::high_resolution_clock::now(); \
        std::chrono::duration<double> duration = end_time - start_time; \
        std::cout << "\n----------------------------------------" << std::endl; \
        if (g_test_failures == 0) { \
            std::cout << ANSI_COLOR_GREEN << "ALL " << g_test_count << " TESTS PASSED!" << ANSI_COLOR_RESET << std::endl; \
        } else { \
            std::cout << ANSI_COLOR_RED << g_test_failures << " OF " << g_test_count << " TESTS FAILED!" << ANSI_COLOR_RESET << std::endl; \
        } \
        std::cout << "Tests finished in " << duration.count() << " seconds." << std::endl; \
        std::cout << "----------------------------------------" << std::endl; \
        return g_test_failures; \
    }

#endif // SIMPLE_TEST_FRAMEWORK_H
```