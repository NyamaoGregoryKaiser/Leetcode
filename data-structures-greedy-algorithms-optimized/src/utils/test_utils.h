```cpp
#ifndef TEST_UTILS_H
#define TEST_UTILS_H

#include <iostream>
#include <string>
#include <vector>
#include <algorithm> // For std::is_sorted

// Macro for basic assertion
#define ASSERT_TRUE(condition, message) \
    do { \
        if (!(condition)) { \
            std::cerr << "FAIL: " << message << " (Condition: " << #condition << ")" << std::endl; \
            return false; \
        } \
    } while (0)

#define ASSERT_FALSE(condition, message) \
    do { \
        if (condition) { \
            std::cerr << "FAIL: " << message << " (Condition: " << #condition << ")" << std::endl; \
            return false; \
        } \
    } while (0)

#define ASSERT_EQUALS(actual, expected, message) \
    do { \
        if ((actual) != (expected)) { \
            std::cerr << "FAIL: " << message << " (Expected: " << (expected) << ", Actual: " << (actual) << ")" << std::endl; \
            return false; \
        } \
    } while (0)

// Helper function to print test results
void printTestResult(const std::string& testName, bool passed) {
    if (passed) {
        std::cout << "[PASS] " << testName << std::endl;
    } else {
        std::cout << "[FAIL] " << testName << std::endl;
    }
}

// Helper for comparing vectors (order matters)
template <typename T>
bool compareVectors(const std::vector<T>& actual, const std::vector<T>& expected, const std::string& message = "") {
    if (actual.size() != expected.size()) {
        std::cerr << "FAIL: " << message << " Vector sizes differ. Expected: " << expected.size() << ", Actual: " << actual.size() << std::endl;
        return false;
    }
    for (size_t i = 0; i < actual.size(); ++i) {
        if (actual[i] != expected[i]) {
            std::cerr << "FAIL: " << message << " Vectors differ at index " << i << ". Expected: " << expected[i] << ", Actual: " << actual[i] << std::endl;
            return false;
        }
    }
    return true;
}

// Helper for comparing vectors (order doesn't matter, assumes no duplicates or sorts both)
template <typename T>
bool compareVectorsUnordered(std::vector<T> actual, std::vector<T> expected, const std::string& message = "") {
    if (actual.size() != expected.size()) {
        std::cerr << "FAIL: " << message << " Vector sizes differ. Expected: " << expected.size() << ", Actual: " << actual.size() << std::endl;
        return false;
    }
    std::sort(actual.begin(), actual.end());
    std::sort(expected.begin(), expected.end());
    return compareVectors(actual, expected, message + " (after sorting)");
}


// Helper for printing vectors (for debugging test failures)
template <typename T>
void printVector(const std::string& label, const std::vector<T>& vec) {
    std::cerr << label << ": [";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cerr << vec[i] << (i == vec.size() - 1 ? "" : ", ");
    }
    std::cerr << "]" << std::endl;
}

#endif // TEST_UTILS_H

```