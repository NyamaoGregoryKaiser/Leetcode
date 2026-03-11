#include "two_sum.h"
#include <iostream> // For debugging, optional

namespace TwoSum {

std::vector<int> twoSum_bruteForce(const std::vector<int>& nums, int target) {
    // Iterate through each number in the array
    for (size_t i = 0; i < nums.size(); ++i) {
        // For each number, iterate through the remaining numbers
        // to find a pair that sums to the target.
        // Start j from i + 1 to avoid using the same element twice
        // and to avoid redundant checks (e.g., checking (a,b) then (b,a)).
        for (size_t j = i + 1; j < nums.size(); ++j) {
            if (nums[i] + nums[j] == target) {
                // Found the pair, return their indices.
                return {static_cast<int>(i), static_cast<int>(j)};
            }
        }
    }
    // No solution found (though problem statement typically guarantees one for Two Sum).
    return {};
}

std::vector<int> twoSum_hashMap(const std::vector<int>& nums, int target) {
    // A hash map to store numbers and their indices.
    // Key: number, Value: index
    std::unordered_map<int, int> num_map;

    // Iterate through the array once.
    for (size_t i = 0; i < nums.size(); ++i) {
        int current_num = nums[i];
        // Calculate the complement needed to reach the target.
        int complement = target - current_num;

        // Check if the complement exists in our hash map.
        // If it does, we've found our pair.
        if (num_map.count(complement)) {
            // The complement's index is stored in the map.
            // The current number's index is `i`.
            return {num_map[complement], static_cast<int>(i)};
        }

        // If the complement is not found, add the current number and its index
        // to the hash map for future lookups.
        num_map[current_num] = static_cast<int>(i);
    }

    // No solution found.
    return {};
}

} // namespace TwoSum