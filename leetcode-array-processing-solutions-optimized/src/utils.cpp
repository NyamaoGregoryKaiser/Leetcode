```cpp
#include "utils.h"

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

std::vector<int> generateRandomVector(int size, int min_val, int max_val) {
    std::vector<int> arr(size);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(min_val, max_val);

    for (int i = 0; i < size; ++i) {
        arr[i] = distrib(gen);
    }
    return arr;
}

bool areVectorsEqual(const std::vector<int>& v1, const std::vector<int>& v2) {
    if (v1.size() != v2.size()) {
        return false;
    }
    for (size_t i = 0; i < v1.size(); ++i) {
        if (v1[i] != v2[i]) {
            return false;
        }
    }
    return true;
}

bool isVectorSorted(const std::vector<int>& arr) {
    return std::is_sorted(arr.begin(), arr.end());
}

} // namespace Utils
```