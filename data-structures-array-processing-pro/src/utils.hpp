#ifndef UTILS_HPP
#define UTILS_HPP

#include <iostream>
#include <vector>
#include <string>
#include <chrono>
#include <iomanip> // For std::setprecision

// Helper function to print a vector
template <typename T>
void printVector(const std::vector<T>& vec, const std::string& name = "") {
    if (!name.empty()) {
        std::cout << name << ": ";
    }
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]" << std::endl;
}

// Helper class for simple timing
class Timer {
public:
    Timer() : start_time_point_(std::chrono::high_resolution_clock::now()) {}

    void reset() {
        start_time_point_ = std::chrono::high_resolution_clock::now();
    }

    // Returns elapsed time in milliseconds
    double elapsed_ms() const {
        auto end_time_point = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end_time_point - start_time_point_);
        return duration.count() / 1e6; // Convert nanoseconds to milliseconds
    }

    // Prints elapsed time with a message
    void print_elapsed(const std::string& message = "Elapsed time") const {
        std::cout << std::fixed << std::setprecision(6) << message << ": " << elapsed_ms() << " ms" << std::endl;
    }

private:
    std::chrono::high_resolution_clock::time_point start_time_point_;
};

// Simple assertion macro for tests
#define ASSERT_TRUE(condition, message) \
    if (!(condition)) { \
        std::cerr << "FAILED: " << message << " (Line: " << __LINE__ << ")" << std::endl; \
        test_failed_count++; \
    } else { \
        test_passed_count++; \
    }

#define ASSERT_EQ(val1, val2, message) \
    if (!((val1) == (val2))) { \
        std::cerr << "FAILED: " << message << " (Expected: " << (val2) << ", Got: " << (val1) << ", Line: " << __LINE__ << ")" << std::endl; \
        test_failed_count++; \
    } else { \
        test_passed_count++; \
    }

#define ASSERT_VEC_EQ(vec1, vec2, message) \
    if (!((vec1).size() == (vec2).size())) { \
        std::cerr << "FAILED: " << message << " (Vector sizes differ, Line: " << __LINE__ << ")" << std::endl; \
        test_failed_count++; \
    } else { \
        bool match = true; \
        for (size_t i = 0; i < (vec1).size(); ++i) { \
            if (!((vec1)[i] == (vec2)[i])) { \
                match = false; \
                break; \
            } \
        } \
        if (!match) { \
            std::cerr << "FAILED: " << message << " (Vectors differ, Line: " << __LINE__ << ")" << std::endl; \
            printVector((vec1), "  Got"); \
            printVector((vec2), "  Expected"); \
            test_failed_count++; \
        } else { \
            test_passed_count++; \
        } \
    }

extern int test_passed_count;
extern int test_failed_count;

#endif // UTILS_HPP