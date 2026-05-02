```cpp
#ifndef HELPERS_H
#define HELPERS_H

#include <string>
#include <vector>
#include <array>
#include <numeric> // For std::iota

// A simple utility to print vectors (for debugging/demonstration)
template <typename T>
void print_vector(const std::vector<T>& vec, const std::string& prefix = "") {
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
    std::cout << "]\n";
}

// Custom hash for std::array<int, N> to be used as a key in std::unordered_map
// This is particularly useful for Group Anagrams problem using frequency arrays.
struct ArrayHasher {
    template <class T, size_t N>
    std::size_t operator()(const std::array<T, N>& a) const {
        std::size_t h = 0;
        for (const T& x : a) {
            h ^= std::hash<T>{}(x) + 0x9e3779b9 + (h << 6) + (h >> 2);
        }
        return h;
    }
};

#endif // HELPERS_H
```