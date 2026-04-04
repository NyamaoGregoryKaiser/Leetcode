```cpp
#ifndef UTILS_H
#define UTILS_H

#include <vector>
#include <iostream>
#include <random>
#include <algorithm> // For std::sort

namespace Utils {

// Function to print a vector
void printVector(const std::vector<int>& arr, const std::string& prefix = "");

// Function to generate a sorted vector of a given size
std::vector<int> generateSortedVector(int size, int min_val = 0, int max_val = 1000);

// Function to generate a sorted vector with duplicates
std::vector<int> generateSortedVectorWithDuplicates(int size, int min_val = 0, int max_val = 100, int duplicate_chance_percent = 30);

// Function to generate a rotated sorted vector
std::vector<int> generateRotatedSortedVector(int size, int min_val = 0, int max_val = 1000);

} // namespace Utils

#endif // UTILS_H
```