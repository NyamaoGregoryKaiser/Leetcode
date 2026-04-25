```cpp
#ifndef HELPERS_H
#define HELPERS_H

#include <vector>
#include <iostream>
#include <string>

// Helper function to print a vector (useful for debugging and test output)
template <typename T>
void printVector(const std::string& name, const std::vector<T>& vec) {
    std::cout << name << ": [";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]" << std::endl;
}

// Add any other general utilities here if needed.

#endif // HELPERS_H
```