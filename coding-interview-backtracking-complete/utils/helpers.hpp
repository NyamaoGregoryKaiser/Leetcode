```cpp
#ifndef HELPERS_HPP
#define HELPERS_HPP

#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::sort

namespace utils {

// Helper to print a single vector
template <typename T>
void print_vector(const std::vector<T>& vec) {
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]";
}

// Helper to print a vector of vectors (e.g., results for Subsets, Permutations, Combination Sum)
template <typename T>
void print_vector_of_vectors(const std::vector<std::vector<T>>& vec_of_vec) {
    std::cout << "[\n";
    for (const auto& vec : vec_of_vec) {
        std::cout << "  ";
        print_vector(vec);
        std::cout << ",\n";
    }
    std::cout << "]\n";
}

// Helper to print N-Queens board solutions
void print_nqueens_solutions(const std::vector<std::vector<std::string>>& solutions) {
    std::cout << "Found " << solutions.size() << " solutions:\n";
    for (size_t i = 0; i < solutions.size(); ++i) {
        std::cout << "Solution " << i + 1 << ":\n";
        for (const std::string& row : solutions[i]) {
            std::cout << "  " << row << "\n";
        }
        std::cout << "\n";
    }
}

// Helper to compare two vectors of vectors (useful for test assertions)
template <typename T>
bool compare_vector_of_vectors(std::vector<std::vector<T>> a, std::vector<std::vector<T>> b) {
    if (a.size() != b.size()) {
        return false;
    }
    // Sort inner vectors for canonical comparison, then sort outer vector
    for (auto& vec : a) {
        std::sort(vec.begin(), vec.end());
    }
    for (auto& vec : b) {
        std::sort(vec.begin(), vec.end());
    }
    std::sort(a.begin(), a.end(), [](const std::vector<T>& v1, const std::vector<T>& v2) {
        return v1 < v2; // Lexicographical comparison
    });
    std::sort(b.begin(), b.end(), [](const std::vector<T>& v1, const std::vector<T>& v2) {
        return v1 < v2; // Lexicographical comparison
    });
    return a == b;
}

// Helper for NQueens specific comparison (string vectors)
bool compare_nqueens_solutions(const std::vector<std::vector<std::string>>& a, const std::vector<std::vector<std::string>>& b) {
    if (a.size() != b.size()) {
        return false;
    }
    // Sort the outer vectors directly since strings are comparable and inner vector of strings are rows.
    // The relative order of rows within a single solution is fixed.
    // We only need to sort the overall solutions to compare sets of solutions.
    std::vector<std::vector<std::string>> sorted_a = a;
    std::vector<std::vector<std::string>> sorted_b = b;

    std::sort(sorted_a.begin(), sorted_a.end(), [](const std::vector<std::string>& s1, const std::vector<std::string>& s2) {
        for (size_t i = 0; i < s1.size(); ++i) {
            if (s1[i] < s2[i]) return true;
            if (s1[i] > s2[i]) return false;
        }
        return false; // They are equal
    });

    std::sort(sorted_b.begin(), sorted_b.end(), [](const std::vector<std::string>& s1, const std::vector<std::string>& s2) {
        for (size_t i = 0; i < s1.size(); ++i) {
            if (s1[i] < s2[i]) return true;
            if (s1[i] > s2[i]) return false;
        }
        return false; // They are equal
    });

    return sorted_a == sorted_b;
}


// Basic assertion macro
#define ASSERT_EQ(actual, expected, message) \
    do { \
        if ((actual) != (expected)) { \
            std::cerr << "FAILED: " << message << "\n" \
                      << "  Expected: " << (expected) << "\n" \
                      << "  Actual:   " << (actual) << "\n"; \
            return false; \
        } \
        std::cout << "PASSED: " << message << "\n"; \
    } while (0)

#define ASSERT_VEC_VEC_EQ(actual, expected, message) \
    do { \
        if (!utils::compare_vector_of_vectors(actual, expected)) { \
            std::cerr << "FAILED: " << message << "\n" \
                      << "  Expected:\n"; \
            utils::print_vector_of_vectors(expected); \
            std::cerr << "  Actual:\n"; \
            utils::print_vector_of_vectors(actual); \
            return false; \
        } \
        std::cout << "PASSED: " << message << "\n"; \
    } while (0)

#define ASSERT_NQUEENS_SOL_EQ(actual, expected, message) \
    do { \
        if (!utils::compare_nqueens_solutions(actual, expected)) { \
            std::cerr << "FAILED: " << message << "\n" \
                      << "  Expected solutions:\n"; \
            utils::print_nqueens_solutions(expected); \
            std::cerr << "  Actual solutions:\n"; \
            utils::print_nqueens_solutions(actual); \
            return false; \
        } \
        std::cout << "PASSED: " << message << "\n"; \
    } while (0)

} // namespace utils

#endif // HELPERS_HPP
```