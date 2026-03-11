#include "longest_consecutive_sequence.h"
#include <set> // For std::set in some approaches, though unordered_set is preferred

namespace LongestConsecutiveSequence {

int longestConsecutive_sort(std::vector<int> nums) {
    if (nums.empty()) {
        return 0;
    }

    // Sort the array. This brings consecutive numbers next to each other.
    // Time: O(N log N)
    std::sort(nums.begin(), nums.end());

    int longest_streak = 0;
    int current_streak = 0;

    // Iterate through the sorted array.
    for (size_t i = 0; i < nums.size(); ++i) {
        if (i == 0) {
            // Initialize for the first element.
            current_streak = 1;
        } else {
            // Skip duplicates as they don't extend the sequence.
            if (nums[i] == nums[i-1]) {
                continue;
            }
            // If current number is consecutive to the previous, extend the streak.
            else if (nums[i] == nums[i-1] + 1) {
                current_streak++;
            }
            // If not consecutive, reset the current streak.
            else {
                longest_streak = std::max(longest_streak, current_streak);
                current_streak = 1; // Start new streak with current number
            }
        }
    }
    // After the loop, ensure the last streak is considered.
    longest_streak = std::max(longest_streak, current_streak);

    return longest_streak;
}

int longestConsecutive_hashSet(const std::vector<int>& nums) {
    if (nums.empty()) {
        return 0;
    }

    // Insert all numbers into a hash set for O(1) average time lookups.
    // Time: O(N) on average
    // Space: O(N)
    std::unordered_set<int> num_set(nums.begin(), nums.end());

    int longest_streak = 0;

    // Iterate through each number in the original input array.
    for (int num : nums) {
        // Optimization: Only try to build a sequence if the current number
        // could be the start of a sequence.
        // A number `num` is the start of a sequence if `num - 1` is NOT in the set.
        // If `num - 1` IS in the set, it means `num` is part of a longer sequence
        // that started earlier, so we can skip `num` and let the earlier number
        // handle the sequence calculation.
        if (num_set.find(num - 1) == num_set.end()) {
            // `num` is a potential start of a consecutive sequence.
            int current_num = num;
            int current_streak = 1;

            // Increment `current_num` and check if `current_num + 1` exists in the set.
            // Continue extending the sequence as long as consecutive numbers are found.
            while (num_set.count(current_num + 1)) {
                current_num++;
                current_streak++;
            }

            // Update the overall longest streak found so far.
            longest_streak = std::max(longest_streak, current_streak);
        }
    }

    return longest_streak;
}

} // namespace LongestConsecutiveSequence