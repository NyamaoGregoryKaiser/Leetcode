#include "utils.hpp"
#include <iostream>

namespace Utils {

// Specialization for printing a vector of vectors of strings (N-Queens style)
template <>
void print_vector_of_vectors<std::string>(const std::vector<std::vector<std::string>>& vec_of_vec, const std::string& title) {
    if (!title.empty()) {
        std::cout << title << ":\n";
    }
    if (vec_of_vec.empty()) {
        std::cout << "  (Empty)\n";
        return;
    }
    std::cout << "  Found " << vec_of_vec.size() << " solutions.\n";
    for (size_t k = 0; k < vec_of_vec.size(); ++k) {
        std::cout << "  Solution " << k + 1 << ":\n";
        for (const auto& row_str : vec_of_vec[k]) {
            std::cout << "    " << row_str << "\n";
        }
        std::cout << "\n";
    }
}

// Prints a Sudoku board in a readable format
void print_sudoku_board(const std::vector<std::vector<char>>& board, const std::string& title) {
    if (!title.empty()) {
        std::cout << title << ":\n";
    }
    std::cout << "  -------------------------\n";
    for (int i = 0; i < 9; ++i) {
        std::cout << "  | ";
        for (int j = 0; j < 9; ++j) {
            std::cout << board[i][j] << " ";
            if ((j + 1) % 3 == 0) {
                std::cout << "| ";
            }
        }
        std::cout << "\n";
        if ((i + 1) % 3 == 0) {
            std::cout << "  -------------------------\n";
        }
    }
}

} // namespace Utils