#ifndef UTILS_HPP
#define UTILS_HPP

#include <vector>
#include <string>
#include <chrono>
#include <iostream>

// Utility functions for printing and timing
namespace Utils {

    // Prints a vector of vectors (e.g., results of N-Queens, Permutations, Subsets)
    template <typename T>
    void print_vector_of_vectors(const std::vector<std::vector<T>>& vec_of_vec, const std::string& title = "") {
        if (!title.empty()) {
            std::cout << title << ":\n";
        }
        if (vec_of_vec.empty()) {
            std::cout << "  (Empty)\n";
            return;
        }
        for (const auto& inner_vec : vec_of_vec) {
            std::cout << "  [";
            for (size_t i = 0; i < inner_vec.size(); ++i) {
                std::cout << inner_vec[i];
                if (i < inner_vec.size() - 1) {
                    std::cout << ", ";
                }
            }
            std::cout << "]\n";
        }
    }

    // Specialization for vector of strings (for N-Queens output)
    template <>
    void print_vector_of_vectors<std::string>(const std::vector<std::vector<std::string>>& vec_of_vec, const std::string& title);

    // Prints a Sudoku board
    void print_sudoku_board(const std::vector<std::vector<char>>& board, const std::string& title = "");

    // A simple timer class for benchmarking
    class Timer {
    public:
        Timer() : start_time_(std::chrono::high_resolution_clock::now()) {}

        void reset() {
            start_time_ = std::chrono::high_resolution_clock::now();
        }

        double elapsed_milliseconds() const {
            auto end_time = std::chrono::high_resolution_clock::now();
            return std::chrono::duration_cast<std::chrono::nanoseconds>(end_time - start_time_).count() / 1e6;
        }

        void print_elapsed(const std::string& label) const {
            std::cout << label << " took " << elapsed_milliseconds() << " ms.\n";
        }

    private:
        std::chrono::high_resolution_clock::time_point start_time_;
    };

} // namespace Utils

#endif // UTILS_HPP