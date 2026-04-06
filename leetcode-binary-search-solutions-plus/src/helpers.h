```cpp
#ifndef BINARY_SEARCH_HELPERS_H
#define BINARY_SEARCH_HELPERS_H

#include <vector>
#include <iostream>
#include <algorithm> // For std::max
#include <random>    // For random number generation
#include <chrono>    // For seeding random generator

// Helper function to print a vector
template <typename T>
void print_vector(const std::string& name, const std::vector<T>& vec) {
    std::cout << name << ": [";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]" << std::endl;
}

// Helper function to generate a sorted vector of a given size and max_val
std::vector<int> generate_random_sorted_vector(size_t size, int max_val, bool allow_duplicates = true);

// Helper function to generate a rotated sorted vector
std::vector<int> generate_rotated_sorted_vector(size_t size, int max_val, int pivot_idx, bool allow_duplicates = false);

// Helper function to generate a random vector with potential duplicates
std::vector<int> generate_random_vector(size_t size, int max_val);

#endif // BINARY_SEARCH_HELPERS_H
```