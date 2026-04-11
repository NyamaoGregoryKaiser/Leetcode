```cpp
#ifndef UTILS_H
#define UTILS_H

#include <vector>
#include <iostream>
#include <random>
#include <algorithm> // For std::shuffle

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

// Helper function to print a vector of vectors (e.g., for intervals)
template <typename T>
void printVectorOfVectors(const std::vector<std::vector<T>>& vec_of_vecs, const std::string& name = "") {
    if (!name.empty()) {
        std::cout << name << ": ";
    }
    std::cout << "[\n";
    for (const auto& vec : vec_of_vecs) {
        std::cout << "  [";
        for (size_t i = 0; i < vec.size(); ++i) {
            std::cout << vec[i];
            if (i < vec.size() - 1) {
                std::cout << ", ";
            }
        }
        std::cout << "],\n";
    }
    std::cout << "]" << std::endl;
}

// Helper function to generate a random vector of integers
std::vector<int> generateRandomVector(int size, int min_val, int max_val) {
    std::vector<int> vec(size);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(min_val, max_val);

    for (int i = 0; i < size; ++i) {
        vec[i] = distrib(gen);
    }
    return vec;
}

// Helper function to generate a shuffled vector of unique integers (for two sum indices)
std::vector<int> generateShuffledVector(int size, int min_val = 0) {
    std::vector<int> vec(size);
    for (int i = 0; i < size; ++i) {
        vec[i] = min_val + i;
    }
    std::random_device rd;
    std::mt19937 gen(rd());
    std::shuffle(vec.begin(), vec.end(), gen);
    return vec;
}

#endif // UTILS_H
```