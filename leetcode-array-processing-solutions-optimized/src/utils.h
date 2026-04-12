```cpp
#ifndef UTILS_H
#define UTILS_H

#include <vector>
#include <iostream>
#include <random>
#include <algorithm> // For std::is_sorted

namespace Utils {

// Function to print a vector
void printVector(const std::vector<int>& arr, const std::string& prefix = "");

// Function to generate a random vector of given size and range
std::vector<int> generateRandomVector(int size, int min_val, int max_val);

// Function to check if two vectors are equal
bool areVectorsEqual(const std::vector<int>& v1, const std::vector<int>& v2);

// Function to check if a vector is sorted (ascending)
bool isVectorSorted(const std::vector<int>& arr);

} // namespace Utils

#endif // UTILS_H
```