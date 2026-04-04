```cpp
#include "utils.h"
#include <random>
#include <chrono>

namespace Utils {

void printVector(const std::vector<int>& arr, const std::string& prefix) {
    if (!prefix.empty()) {
        std::cout << prefix;
    }
    std::cout << "[";
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << arr[i];
        if (i < arr.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]" << std::endl;
}

std::vector<int> generateSortedVector(int size, int min_val, int max_val) {
    std::vector<int> arr(size);
    std::mt19937 rng(std::chrono::high_resolution_clock::now().time_since_epoch().count());
    std::uniform_int_distribution<int> dist(min_val, max_val);

    for (int i = 0; i < size; ++i) {
        arr[i] = dist(rng);
    }
    std::sort(arr.begin(), arr.end());
    return arr;
}

std::vector<int> generateSortedVectorWithDuplicates(int size, int min_val, int max_val, int duplicate_chance_percent) {
    std::vector<int> arr;
    if (size == 0) return arr;

    std::mt19937 rng(std::chrono::high_resolution_clock::now().time_since_epoch().count());
    std::uniform_int_distribution<int> val_dist(min_val, max_val);
    std::uniform_int_distribution<int> dup_dist(0, 99); // 0-99 for percentage check

    int current_val = val_dist(rng);
    arr.push_back(current_val);

    for (int i = 1; i < size; ++i) {
        if (dup_dist(rng) < duplicate_chance_percent) {
            arr.push_back(current_val); // Add a duplicate
        } else {
            // Generate a new value, ensuring it's greater than or equal to current_val
            // to maintain sorted property. For simplicity, just pick a new random.
            // A more robust approach would be to pick a value >= current_val
            // or generate small increments.
            current_val = val_dist(rng);
            arr.push_back(current_val);
        }
    }
    std::sort(arr.begin(), arr.end()); // Ensure sorted order with possibly new random values
    return arr;
}


std::vector<int> generateRotatedSortedVector(int size, int min_val, int max_val) {
    if (size == 0) return {};
    std::vector<int> arr = generateSortedVector(size, min_val, max_val);
    if (size == 1) return arr;

    std::mt19937 rng(std::chrono::high_resolution_clock::now().time_since_epoch().count());
    std::uniform_int_distribution<int> dist(0, size - 1); // Rotation point

    int rotate_idx = dist(rng);
    std::rotate(arr.begin(), arr.begin() + rotate_idx, arr.end());
    return arr;
}

} // namespace Utils
```