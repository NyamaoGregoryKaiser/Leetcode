#ifndef TEST_UTILS_H
#define TEST_UTILS_H

#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::sort

// Simple assertion macro
#define ASSERT_TRUE(condition, message) \
    if (!(condition)) { \
        std::cerr << "[FAIL] " << __FILE__ << ":" << __LINE__ << " - " << message << std::endl; \
        exit(EXIT_FAILURE); \
    }

#define ASSERT_FALSE(condition, message) ASSERT_TRUE(!(condition), message)

#define ASSERT_EQ(val1, val2, message) \
    if ((val1) != (val2)) { \
        std::cerr << "[FAIL] " << __FILE__ << ":" << __LINE__ << " - " << message \
                  << " (Expected: " << (val2) << ", Got: " << (val1) << ")" << std::endl; \
        exit(EXIT_FAILURE); \
    }

// Helper to compare vectors (for Two Sum problem)
template <typename T>
void ASSERT_VEC_EQ(const std::vector<T>& actual, const std::vector<T>& expected, const std::string& message) {
    if (actual.size() != expected.size()) {
        std::cerr << "[FAIL] " << __FILE__ << ":" << __LINE__ << " - " << message << " (Sizes differ)" << std::endl;
        std::cerr << "  Expected size: " << expected.size() << ", Actual size: " << actual.size() << std::endl;
        exit(EXIT_FAILURE);
    }
    std::vector<T> sorted_actual = actual;
    std::vector<T> sorted_expected = expected;
    std::sort(sorted_actual.begin(), sorted_actual.end());
    std::sort(sorted_expected.begin(), sorted_expected.end());

    for (size_t i = 0; i < sorted_actual.size(); ++i) {
        if (sorted_actual[i] != sorted_expected[i]) {
            std::cerr << "[FAIL] " << __FILE__ << ":" << __LINE__ << " - " << message << " (Elements differ at index " << i << ")" << std::endl;
            std::cerr << "  Expected: ";
            for (const T& val : sorted_expected) std::cerr << val << " ";
            std::cerr << ", Actual: ";
            for (const T& val : sorted_actual) std::cerr << val << " ";
            std::cerr << std::endl;
            exit(EXIT_FAILURE);
        }
    }
}

// Helper to compare vector of vectors of strings (for Group Anagrams)
// This is more complex because the order of inner vectors and elements within inner vectors doesn't matter.
void ASSERT_VEC_VEC_STR_EQ(const std::vector<std::vector<std::string>>& actual,
                           const std::vector<std::vector<std::string>>& expected,
                           const std::string& message) {
    if (actual.size() != expected.size()) {
        std::cerr << "[FAIL] " << __FILE__ << ":" << __LINE__ << " - " << message << " (Number of groups differ)" << std::endl;
        std::cerr << "  Expected " << expected.size() << " groups, Actual " << actual.size() << " groups." << std::endl;
        exit(EXIT_FAILURE);
    }

    // Create sorted copies of both actual and expected for comparison.
    // Each inner vector must be sorted, and then the outer vector must be sorted.
    std::vector<std::vector<std::string>> sorted_actual = actual;
    for (auto& vec : sorted_actual) {
        std::sort(vec.begin(), vec.end());
    }
    std::sort(sorted_actual.begin(), sorted_actual.end(), [](const std::vector<std::string>& a, const std::vector<std::string>& b) {
        if (a.empty() || b.empty()) return a.size() < b.size();
        return a[0] < b[0]; // Sort by first element of each inner vector
    });

    std::vector<std::vector<std::string>> sorted_expected = expected;
    for (auto& vec : sorted_expected) {
        std::sort(vec.begin(), vec.end());
    }
    std::sort(sorted_expected.begin(), sorted_expected.end(), [](const std::vector<std::string>& a, const std::vector<std::string>& b) {
        if (a.empty() || b.empty()) return a.size() < b.size();
        return a[0] < b[0];
    });

    for (size_t i = 0; i < sorted_actual.size(); ++i) {
        if (sorted_actual[i] != sorted_expected[i]) {
            std::cerr << "[FAIL] " << __FILE__ << ":" << __LINE__ << " - " << message << " (Groups differ at index " << i << ")" << std::endl;
            std::cerr << "  Expected group: [";
            for (const std::string& s : sorted_expected[i]) std::cerr << "\"" << s << "\" ";
            std::cerr << "], Actual group: [";
            for (const std::string& s : sorted_actual[i]) std::cerr << "\"" << s << "\" ";
            std::cerr << "]" << std::endl;
            exit(EXIT_FAILURE);
        }
    }
}


#endif // TEST_UTILS_H