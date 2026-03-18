```cpp
#ifndef UTILS_H
#define UTILS_H

#include <iostream>
#include <string>
#include <vector>
#include <iomanip> // For std::setw, std::setfill

// Helper function to print a number in binary format
std::string toBinaryString(uint32_t n, int bits = 32);
std::string toBinaryString(int n, int bits = 32);


// --- Custom Lightweight Testing Framework ---
// Defines ANSI escape codes for colored output
#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_GREEN   "\x1b[32m"
#define ANSI_COLOR_YELLOW  "\x1b[33m"
#define ANSI_COLOR_BLUE    "\x1b[34m"
#define ANSI_COLOR_MAGENTA "\x1b[35m"
#define ANSI_COLOR_CYAN    "\x1b[36m"
#define ANSI_COLOR_RESET   "\x1b[0m"

static int g_tests_run = 0;
static int g_tests_failed = 0;

#define TEST_CASE(name) \
    void name() { \
        std::cout << ANSI_COLOR_BLUE << "[TEST] " << #name << ANSI_COLOR_RESET << std::endl; \
        g_tests_run++;

#define END_TEST_CASE \
    }

#define ASSERT_EQUAL(expected, actual, message) \
    do { \
        if ((expected) != (actual)) { \
            std::cerr << ANSI_COLOR_RED << "  FAIL: " << message << std::endl; \
            std::cerr << "    Expected: " << (expected) << ", Actual: " << (actual) << ANSI_COLOR_RESET << std::endl; \
            g_tests_failed++; \
        } else { \
            std::cout << ANSI_COLOR_GREEN << "  PASS: " << message << ANSI_COLOR_RESET << std::endl; \
        } \
    } while(0)

#define ASSERT_TRUE(condition, message) \
    do { \
        if (!(condition)) { \
            std::cerr << ANSI_COLOR_RED << "  FAIL: " << message << std::endl; \
            std::cerr << "    Condition was false." << ANSI_COLOR_RESET << std::endl; \
            g_tests_failed++; \
        } else { \
            std::cout << ANSI_COLOR_GREEN << "  PASS: " << message << ANSI_COLOR_RESET << std::endl; \
        } \
    } while(0)

#define ASSERT_FALSE(condition, message) \
    do { \
        if (condition) { \
            std::cerr << ANSI_COLOR_RED << "  FAIL: " << message << std::endl; \
            std::cerr << "    Condition was true." << ANSI_COLOR_RESET << std::endl; \
            g_tests_failed++; \
        } else { \
            std::cout << ANSI_COLOR_GREEN << "  PASS: " << message << ANSI_COLOR_RESET << std::endl; \
        } \
    } while(0)

// Helper for vector comparison
template<typename T>
bool compareVectors(const std::vector<T>& v1, const std::vector<T>& v2) {
    if (v1.size() != v2.size()) {
        return false;
    }
    std::vector<T> sorted_v1 = v1;
    std::vector<T> sorted_v2 = v2;
    std::sort(sorted_v1.begin(), sorted_v1.end());
    std::sort(sorted_v2.begin(), sorted_v2.end());
    return sorted_v1 == sorted_v2;
}

#define ASSERT_VECTOR_EQUAL(expected, actual, message) \
    do { \
        if (!compareVectors(expected, actual)) { \
            std::cerr << ANSI_COLOR_RED << "  FAIL: " << message << std::endl; \
            std::cerr << "    Expected: ["; \
            for (size_t i = 0; i < expected.size(); ++i) { std::cerr << expected[i] << (i == expected.size() - 1 ? "" : ", "); } \
            std::cerr << "], Actual: ["; \
            for (size_t i = 0; i < actual.size(); ++i) { std::cerr << actual[i] << (i == actual.size() - 1 ? "" : ", "); } \
            std::cerr << "]" << ANSI_COLOR_RESET << std::endl; \
            g_tests_failed++; \
        } else { \
            std::cout << ANSI_COLOR_GREEN << "  PASS: " << message << ANSI_COLOR_RESET << std::endl; \
        } \
    } while(0)

#define RUN_ALL_TESTS(...) \
    do { \
        __VA_ARGS__ \
        std::cout << "\n--- Test Summary ---" << std::endl; \
        if (g_tests_failed == 0) { \
            std::cout << ANSI_COLOR_GREEN << "All " << g_tests_run << " tests passed!" << ANSI_COLOR_RESET << std::endl; \
        } else { \
            std::cout << ANSI_COLOR_RED << g_tests_failed << " of " << g_tests_run << " tests failed." << ANSI_COLOR_RESET << std::endl; \
        } \
        return g_tests_failed == 0 ? 0 : 1; \
    } while(0)

#endif // UTILS_H
```