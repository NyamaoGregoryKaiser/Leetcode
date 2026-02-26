#ifndef TEST_UTILS_H
#define TEST_UTILS_H

#include <iostream>
#include <vector>
#include <string>
#include <functional> // For std::function

// Custom assertion macro for simple testing
#define ASSERT_TRUE(condition, message) \
    do { \
        if (!(condition)) { \
            std::cerr << "FAIL: " << message << " (Condition: " << #condition << ")" << std::endl; \
            return 1; \
        } \
    } while (0)

#define ASSERT_FALSE(condition, message) ASSERT_TRUE(!(condition), message)

#define ASSERT_EQ(actual, expected, message) \
    do { \
        if (!((actual) == (expected))) { \
            std::cerr << "FAIL: " << message << " (Expected: " << (expected) << ", Actual: " << (actual) << ")" << std::endl; \
            return 1; \
        } \
    } while (0)

// Helper to compare vectors
template <typename T>
int ASSERT_VEC_EQ(const std::vector<T>& actual, const std::vector<T>& expected, const std::string& message) {
    if (actual.size() != expected.size()) {
        std::cerr << "FAIL: " << message << " (Vector sizes differ. Expected: " << expected.size() << ", Actual: " << actual.size() << ")" << std::endl;
        // Optionally print vectors for better debugging
        std::cerr << "  Expected: ["; for(const auto& val : expected) std::cerr << val << ","; std::cerr << "]" << std::endl;
        std::cerr << "  Actual:   ["; for(const auto& val : actual) std::cerr << val << ","; std::cerr << "]" << std::endl;
        return 1;
    }
    for (size_t i = 0; i < actual.size(); ++i) {
        if (actual[i] != expected[i]) {
            std::cerr << "FAIL: " << message << " (Vector elements differ at index " << i << ". Expected: " << expected[i] << ", Actual: " << actual[i] << ")" << std::endl;
            std::cerr << "  Expected: ["; for(const auto& val : expected) std::cerr << val << ","; std::cerr << "]" << std::endl;
            std::cerr << "  Actual:   ["; for(const auto& val : actual) std::cerr << val << ","; std::cerr << "]" << std::endl;
            return 1;
        }
    }
    return 0; // Success
}

// Helper to compare vectors of vectors (e.g., intervals)
template <typename T>
int ASSERT_VEC_VEC_EQ(const std::vector<std::vector<T>>& actual, const std::vector<std::vector<T>>& expected, const std::string& message) {
    if (actual.size() != expected.size()) {
        std::cerr << "FAIL: " << message << " (Vector of vector sizes differ. Expected: " << expected.size() << ", Actual: " << actual.size() << ")" << std::endl;
        return 1;
    }
    for (size_t i = 0; i < actual.size(); ++i) {
        if (ASSERT_VEC_EQ(actual[i], expected[i], message + " (inner vector at index " + std::to_string(i) + ")")) {
            return 1; // Inner vector comparison failed
        }
    }
    return 0; // Success
}

// Test runner utility
int runTest(const std::string& testName, std::function<int()> testFunc) {
    std::cout << "Running " << testName << "..." << std::endl;
    int result = testFunc();
    if (result == 0) {
        std::cout << "PASS: " << testName << std::endl;
    } else {
        std::cout << "FAIL: " << testName << std::endl;
    }
    return result;
}

#endif // TEST_UTILS_H
---