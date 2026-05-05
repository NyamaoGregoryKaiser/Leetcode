#pragma once

#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::sort

// Helper function to print a vector
template <typename T>
void printVector(const std::vector<T>& vec, const std::string& prefix = "", const std::string& suffix = "\n") {
    std::cout << prefix << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]" << suffix;
}

// Helper function to print a vector of vectors
template <typename T>
void printVectorOfVectors(const std::vector<std::vector<T>>& vec_of_vecs, const std::string& prefix = "", const std::string& suffix = "\n") {
    std::cout << prefix << "[\n";
    for (const auto& vec : vec_of_vecs) {
        std::cout << "  ";
        printVector(vec, "", ",\n"); // Print each inner vector with indentation
    }
    std::cout << "]" << suffix;
}

// Helper function to compare two vectors (for testing)
template <typename T>
bool compareVectors(std::vector<T> v1, std::vector<T> v2) {
    // Sort both vectors for comparison, as order might not matter in some problems (e.g., Two Sum indices)
    // If order *does* matter, call this function without sorting or write a specific comparator.
    std::sort(v1.begin(), v1.end());
    std::sort(v2.begin(), v2.end());
    return v1 == v2;
}

// Helper function to compare two vectors of vectors (for testing)
template <typename T>
bool compareVectorOfVectors(std::vector<std::vector<T>> vv1, std::vector<std::vector<T>> vv2) {
    if (vv1.size() != vv2.size()) {
        return false;
    }

    // Sort inner vectors for canonical representation
    for (auto& v : vv1) {
        std::sort(v.begin(), v.end());
    }
    for (auto& v : vv2) {
        std::sort(v.begin(), v.end());
    }

    // Sort outer vector of vectors
    // This requires a custom comparator for std::vector<T>
    std::sort(vv1.begin(), vv1.end(), [](const std::vector<T>& a, const std::vector<T>& b) {
        return a < b; // std::vector has operator<
    });
    std::sort(vv2.begin(), vv2.end(), [](const std::vector<T>& a, const std::vector<T>& b) {
        return a < b;
    });

    return vv1 == vv2;
}