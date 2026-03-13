#ifndef HELPERS_HPP
#define HELPERS_HPP

#include <vector>
#include <iostream>
#include <string>
#include <algorithm> // For std::max, std::min

namespace Helpers {

/**
 * @brief Prints the elements of a 1D vector.
 * @tparam T The type of elements in the vector.
 * @param vec The vector to print.
 * @param name An optional name for the vector to display before printing.
 */
template <typename T>
void print_vector(const std::vector<T>& vec, const std::string& name = "") {
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

/**
 * @brief Prints the elements of a 2D vector (matrix).
 * @tparam T The type of elements in the matrix.
 * @param matrix The 2D vector to print.
 * @param name An optional name for the matrix to display before printing.
 */
template <typename T>
void print_matrix(const std::vector<std::vector<T>>& matrix, const std::string& name = "") {
    if (!name.empty()) {
        std::cout << name << ":" << std::endl;
    }
    for (size_t i = 0; i < matrix.size(); ++i) {
        std::cout << "  [";
        for (size_t j = 0; j < matrix[i].size(); ++j) {
            std::cout << matrix[i][j];
            if (j < matrix[i].size() - 1) {
                std::cout << ", ";
            }
        }
        std::cout << "]" << std::endl;
    }
}

} // namespace Helpers

#endif // HELPERS_HPP