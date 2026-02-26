#ifndef UTILS_H
#define UTILS_H

#include <vector>
#include <iostream>
#include <string>

namespace Utils {

/**
 * @brief Prints the elements of a vector to the console.
 * @tparam T The type of elements in the vector.
 * @param vec The vector to print.
 * @param name An optional name for the vector, printed before its contents.
 */
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

/**
 * @brief Prints a vector of vectors (e.g., intervals) to the console.
 * @tparam T The type of elements in the inner vectors.
 * @param vec_of_vecs The vector of vectors to print.
 * @param name An optional name, printed before its contents.
 */
template <typename T>
void printVectorOfVectors(const std::vector<std::vector<T>>& vec_of_vecs, const std::string& name = "") {
    if (!name.empty()) {
        std::cout << name << ": ";
    }
    std::cout << "[" << std::endl;
    for (const auto& inner_vec : vec_of_vecs) {
        std::cout << "  [";
        for (size_t i = 0; i < inner_vec.size(); ++i) {
            std::cout << inner_vec[i];
            if (i < inner_vec.size() - 1) {
                std::cout << ", ";
            }
        }
        std::cout << "]," << std::endl;
    }
    std::cout << "]" << std::endl;
}

/**
 * @brief Compares two vectors for equality.
 * @tparam T The type of elements in the vectors.
 * @param vec1 The first vector.
 * @param vec2 The second vector.
 * @return True if the vectors are equal (same size and elements), false otherwise.
 */
template <typename T>
bool compareVectors(const std::vector<T>& vec1, const std::vector<T>& vec2) {
    return vec1 == vec2;
}

/**
 * @brief Compares two vectors of vectors for equality.
 * @tparam T The type of elements in the inner vectors.
 * @param vec_of_vecs1 The first vector of vectors.
 * @param vec_of_vecs2 The second vector of vectors.
 * @return True if they are equal, false otherwise.
 */
template <typename T>
bool compareVectorOfVectors(const std::vector<std::vector<T>>& vec_of_vecs1, const std::vector<std::vector<T>>& vec_of_vecs2) {
    return vec_of_vecs1 == vec_of_vecs2;
}

} // namespace Utils

#endif // UTILS_H
---