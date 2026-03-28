```cpp
#pragma once

#include <chrono>
#include <iostream>
#include <string>
#include <vector>

namespace Utils {

    // A simple timer class to measure elapsed time for functions or blocks of code.
    class Timer {
    public:
        // Constructor: Starts the timer immediately.
        Timer() : start_time(std::chrono::high_resolution_clock::now()) {}

        // Resets the timer to the current time.
        void reset() {
            start_time = std::chrono::high_resolution_clock::now();
        }

        // Returns the elapsed time in milliseconds since the timer was created or reset.
        long long elapsed_milliseconds() const {
            auto end_time = std::chrono::high_resolution_clock::now();
            return std::chrono::duration_cast<std::chrono::milliseconds>(end_time - start_time).count();
        }

        // Returns the elapsed time in microseconds.
        long long elapsed_microseconds() const {
            auto end_time = std::chrono::high_resolution_clock::now();
            return std::chrono::duration_cast<std::chrono::microseconds>(end_time - start_time).count();
        }

        // Returns the elapsed time in nanoseconds.
        long long elapsed_nanoseconds() const {
            auto end_time = std::chrono::high_resolution_clock::now();
            return std::chrono::duration_cast<std::chrono::nanoseconds>(end_time - start_time).count();
        }

    private:
        std::chrono::high_resolution_clock::time_point start_time;
    };

    // Generic utility function to print a single vector.
    // @tparam T: The type of elements in the vector.
    // @param vec: The vector to print.
    // @param prefix: An optional string to print before the vector.
    template <typename T>
    void print_vector(const std::vector<T>& vec, const std::string& prefix = "") {
        if (!prefix.empty()) {
            std::cout << prefix;
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

    // Generic utility function to print a vector of vectors.
    // @tparam T: The type of elements in the inner vectors.
    // @param vec_of_vec: The vector of vectors to print.
    // @param prefix: An optional string to print before the entire structure.
    template <typename T>
    void print_vector_of_vectors(const std::vector<std::vector<T>>& vec_of_vec, const std::string& prefix = "") {
        if (!prefix.empty()) {
            std::cout << prefix << std::endl;
        }
        std::cout << "[" << std::endl;
        for (const auto& vec : vec_of_vec) {
            std::cout << "  "; // Indent inner vectors
            print_vector(vec);
        }
        std::cout << "]" << std::endl;
    }

    // Specialization of print_vector_of_vectors for `std::vector<std::vector<std::string>>`
    // This is useful for N-Queens output, where inner vectors are strings representing board rows.
    // @param vec_of_vec: The vector of string vectors (boards) to print.
    // @param prefix: An optional string to print before the entire structure.
    template <>
    void print_vector_of_vectors(const std::vector<std::vector<std::string>>& vec_of_vec, const std::string& prefix) {
        if (!prefix.empty()) {
            std::cout << prefix << std::endl;
        }
        std::cout << "[" << std::endl;
        for (const auto& board : vec_of_vec) {
            std::cout << "  [" << std::endl; // Start of a board
            for (const auto& row : board) {
                std::cout << "    \"" << row << "\"" << std::endl; // Print each row string with quotes
            }
            std::cout << "  ]" << std::endl; // End of a board
        }
        std::cout << "]" << std::endl;
    }

} // namespace Utils
```