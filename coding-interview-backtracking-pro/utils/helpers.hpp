#ifndef HELPERS_HPP
#define HELPERS_HPP

#include <vector>
#include <string>
#include <iostream>
#include <chrono> // For Timer class

namespace Helpers {

    /**
     * @brief Prints a Sudoku-style board (vector of strings or vector of vector of chars).
     * @tparam T Type of the board (e.g., std::vector<std::string> or std::vector<std::vector<char>>).
     * @param board The board to print.
     */
    template<typename T>
    void printBoard(const T& board) {
        if (board.empty()) {
            std::cout << "Empty board.\n";
            return;
        }
        for (const auto& row : board) {
            for (char cell : row) {
                std::cout << cell << " ";
            }
            std::cout << "\n";
        }
    }

    /**
     * @brief Prints a vector of integers.
     * @param vec The vector to print.
     */
    void printVector(const std::vector<int>& vec) {
        std::cout << "[";
        for (size_t i = 0; i < vec.size(); ++i) {
            std::cout << vec[i];
            if (i < vec.size() - 1) {
                std::cout << ", ";
            }
        }
        std::cout << "]\n";
    }

    /**
     * @brief Prints a vector of vectors of integers.
     * @param vec_of_vecs The vector of vectors to print.
     */
    void printVectorOfVectors(const std::vector<std::vector<int>>& vec_of_vecs) {
        if (vec_of_vecs.empty()) {
            std::cout << "[]\n";
            return;
        }
        std::cout << "[\n";
        for (const auto& vec : vec_of_vecs) {
            std::cout << "  ";
            printVector(vec);
        }
        std::cout << "]\n";
    }

    /**
     * @brief A simple timer class for benchmarking.
     */
    class Timer {
    private:
        std::chrono::high_resolution_clock::time_point start_time;

    public:
        Timer() {
            start_time = std::chrono::high_resolution_clock::now();
        }

        void reset() {
            start_time = std::chrono::high_resolution_clock::now();
        }

        double elapsedMilliseconds() const {
            auto end_time = std::chrono::high_resolution_clock::now();
            return std::chrono::duration_cast<std::chrono::duration<double, std::milli>>(end_time - start_time).count();
        }

        double elapsedSeconds() const {
            return elapsedMilliseconds() / 1000.0;
        }
    };

} // namespace Helpers

#endif // HELPERS_HPP