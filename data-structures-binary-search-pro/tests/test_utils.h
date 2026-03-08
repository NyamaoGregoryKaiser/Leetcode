#ifndef TEST_UTILS_H
#define TEST_UTILS_H

#include <iostream>
#include <string>
#include <vector>

// Simple test runner structure
class TestRunner {
public:
    int total_tests;
    int failed_tests;

    TestRunner() : total_tests(0), failed_tests(0) {}

    template<typename T>
    void assert_equals(T expected, T actual, const std::string& test_name) {
        total_tests++;
        if (expected == actual) {
            std::cout << "[PASS] " << test_name << std::endl;
        } else {
            failed_tests++;
            std::cout << "[FAIL] " << test_name << " - Expected: " << expected << ", Actual: " << actual << std::endl;
        }
    }

    template<typename T>
    void assert_vector_equals(const std::vector<T>& expected, const std::vector<T>& actual, const std::string& test_name) {
        total_tests++;
        if (expected.size() != actual.size()) {
            failed_tests++;
            std::cout << "[FAIL] " << test_name << " - Vector size mismatch." << std::endl;
            return;
        }
        bool match = true;
        for (size_t i = 0; i < expected.size(); ++i) {
            if (expected[i] != actual[i]) {
                match = false;
                break;
            }
        }
        if (match) {
            std::cout << "[PASS] " << test_name << std::endl;
        } else {
            failed_tests++;
            std::cout << "[FAIL] " << test_name << " - Vector content mismatch." << std::endl;
        }
    }

    void run_suite(const std::string& suite_name, void (*suite_func)(TestRunner&)) {
        std::cout << "\n--- Running Test Suite: " << suite_name << " ---" << std::endl;
        suite_func(*this);
        std::cout << "--- Finished Test Suite: " << suite_name << " ---\n";
    }

    void print_results() {
        std::cout << "\n--- Overall Test Results ---" << std::endl;
        std::cout << "Total Tests: " << total_tests << std::endl;
        std::cout << "Failed Tests: " << failed_tests << std::endl;
        if (failed_tests == 0) {
            std::cout << "All tests passed successfully!\n" << std::endl;
        } else {
            std::cout << "Some tests failed.\n" << std::endl;
        }
    }
};

#endif // TEST_UTILS_H
---