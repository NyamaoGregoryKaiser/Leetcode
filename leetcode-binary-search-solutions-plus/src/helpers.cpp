```cpp
#include "helpers.h"

std::vector<int> generate_random_sorted_vector(size_t size, int max_val, bool allow_duplicates) {
    std::vector<int> vec;
    if (size == 0) return vec;

    std::mt19937 rng(std::chrono::steady_clock::now().time_since_epoch().count());
    
    // For sorted, generating random values and then sorting is easiest,
    // or generating values sequentially with small random increments.
    // Let's use the latter to control distribution a bit better for duplicates.

    int current_val = 0;
    std::uniform_int_distribution<int> dist(0, max_val / size); // Average step
    if (!allow_duplicates) {
        dist = std::uniform_int_distribution<int>(1, max_val / size + 1); // Ensure distinct steps
    }

    for (size_t i = 0; i < size; ++i) {
        vec.push_back(current_val);
        // Ensure values increase, and stay within max_val
        int next_step = dist(rng);
        current_val += next_step;
        if (current_val > max_val) {
            current_val = max_val; // Cap at max_val
        }
        if (i < size - 1 && current_val == vec.back()) { // if current_val didn't increase
            if (!allow_duplicates) {
                 // Try to force increment if duplicates are not allowed
                current_val++;
            }
        }
    }
    // Final check for uniqueness if duplicates not allowed (e.g., if sizes were too large or step too small)
    if (!allow_duplicates) {
        std::sort(vec.begin(), vec.end());
        vec.erase(std::unique(vec.begin(), vec.end()), vec.end());
        // If still not enough unique elements, regenerate or adjust logic.
        // For this project, we assume reasonable sizes/max_val where this is less likely to be an issue.
    }
    return vec;
}

std::vector<int> generate_rotated_sorted_vector(size_t size, int max_val, int pivot_idx, bool allow_duplicates) {
    if (size == 0) return {};
    if (pivot_idx < 0 || pivot_idx >= size) {
        pivot_idx = static_cast<int>(size / 2); // Default to middle if invalid pivot
    }

    std::vector<int> sorted_vec = generate_random_sorted_vector(size, max_val, allow_duplicates);
    if (sorted_vec.size() < size) { // Adjust if duplicates were removed and size reduced
        std::cout << "Warning: generated sorted vector size reduced due to no_duplicates constraint." << std::endl;
        if (sorted_vec.empty()) return {};
        // If elements removed, pivot_idx might be invalid. Use size/2.
        pivot_idx = static_cast<int>(sorted_vec.size() / 2); 
    }

    std::vector<int> rotated_vec;
    rotated_vec.reserve(sorted_vec.size());

    // Add elements from pivot to end
    for (size_t i = pivot_idx; i < sorted_vec.size(); ++i) {
        rotated_vec.push_back(sorted_vec[i]);
    }
    // Add elements from beginning to pivot-1
    for (int i = 0; i < pivot_idx; ++i) {
        rotated_vec.push_back(sorted_vec[i]);
    }
    return rotated_vec;
}

std::vector<int> generate_random_vector(size_t size, int max_val) {
    std::vector<int> vec(size);
    std::mt19937 rng(std::chrono::steady_clock::now().time_since_epoch().count());
    std::uniform_int_distribution<int> dist(-max_val, max_val); // Allow negative numbers

    for (size_t i = 0; i < size; ++i) {
        vec[i] = dist(rng);
    }
    return vec;
}
```