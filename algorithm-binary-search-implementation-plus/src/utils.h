#ifndef UTILS_H
#define UTILS_H

#include <iostream>
#include <vector>
#include <algorithm> // For std::sort, std::is_sorted
#include <random>    // For std::mt19937, std::uniform_int_distribution
#include <chrono>    // For std::chrono::high_resolution_clock

// Helper function to print a vector
template <typename T>
void printVector(const std::vector<T>& vec, const std::string& prefix = "") {
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

// Helper function to generate a random sorted vector
std::vector<int> generateRandomSortedVector(int size, int minVal, int maxVal) {
    std::vector<int> vec(size);
    // Use a random device to seed the random number generator
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(minVal, maxVal);

    for (int i = 0; i < size; ++i) {
        vec[i] = distrib(gen);
    }
    std::sort(vec.begin(), vec.end());
    return vec;
}

// Helper function to generate a random sorted vector with potential duplicates
std::vector<int> generateRandomSortedVectorWithDuplicates(int size, int minVal, int maxVal, double duplicate_chance = 0.3) {
    if (size == 0) return {};
    std::vector<int> vec(size);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib_val(minVal, maxVal);
    std::uniform_real_distribution<> distrib_dup(0.0, 1.0);

    vec[0] = distrib_val(gen);
    for (int i = 1; i < size; ++i) {
        if (distrib_dup(gen) < duplicate_chance) {
            vec[i] = vec[i-1]; // Introduce a duplicate
        } else {
            vec[i] = distrib_val(gen);
        }
    }
    std::sort(vec.begin(), vec.end()); // Ensure sorted order even with random value generation
    return vec;
}

// Helper function to generate a random rotated sorted vector
// e.g., [4, 5, 6, 7, 0, 1, 2]
std::vector<int> generateRandomRotatedSortedVector(int size, int minVal, int maxVal) {
    if (size == 0) return {};
    std::vector<int> sorted_vec = generateRandomSortedVector(size, minVal, maxVal);

    std::random_device rd;
    std::mt19937 gen(rd());
    // Rotate by a random pivot point (not 0 or size-1 usually)
    std::uniform_int_distribution<> distrib_pivot(1, size - 1);
    int pivot = distrib_pivot(gen);

    std::vector<int> rotated_vec;
    rotated_vec.reserve(size);

    for (int i = pivot; i < size; ++i) {
        rotated_vec.push_back(sorted_vec[i]);
    }
    for (int i = 0; i < pivot; ++i) {
        rotated_vec.push_back(sorted_vec[i]);
    }
    return rotated_vec;
}

// Helper function to check if a vector is sorted
template <typename T>
bool isSorted(const std::vector<T>& vec) {
    return std::is_sorted(vec.begin(), vec.end());
}

#endif // UTILS_H