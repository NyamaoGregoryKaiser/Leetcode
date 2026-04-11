```cpp
#include "array_manipulator.h"
#include <unordered_map>
#include <algorithm> // For std::sort, std::reverse, std::max

namespace ArrayManipulator {

    // --- Problem 1: Two Sum ---

    std::vector<int> twoSum_bruteForce(const std::vector<int>& nums, int target) {
        // Iterate through each element
        for (int i = 0; i < nums.size(); ++i) {
            // For each element, iterate through the remaining elements
            for (int j = i + 1; j < nums.size(); ++j) {
                // Check if the current pair sums up to the target
                if (nums[i] + nums[j] == target) {
                    return {i, j}; // Return the indices
                }
            }
        }
        // As per problem statement, each input has exactly one solution,
        // so this line should ideally not be reached.
        return {};
    }

    std::vector<int> twoSum_hashMap(const std::vector<int>& nums, int target) {
        // Create a hash map to store numbers and their indices
        // Key: number, Value: index
        std::unordered_map<int, int> num_map;

        // Iterate through the array
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i]; // Calculate the complement needed

            // Check if the complement exists in the hash map
            auto it = num_map.find(complement);
            if (it != num_map.end()) {
                // If found, we have our pair. Return its index and the current index.
                return {it->second, i};
            }
            // If not found, add the current number and its index to the map
            num_map[nums[i]] = i;
        }
        // Should not be reached based on problem constraints
        return {};
    }


    // --- Problem 2: Rotate Array ---

    void rotate_extraArray(std::vector<int>& nums, int k) {
        int n = nums.size();
        if (n == 0 || k == 0) return;

        // Effective rotation steps (k can be greater than n)
        k %= n;

        // Create a new vector to store rotated elements
        std::vector<int> rotated_nums(n);

        // Copy elements from original array to their new positions
        // Elements from (n-k) to (n-1) go to 0 to (k-1)
        // Elements from 0 to (n-k-1) go to k to (n-1)
        for (int i = 0; i < n; ++i) {
            rotated_nums[(i + k) % n] = nums[i];
        }

        // Copy back to the original array
        nums = rotated_nums;
    }

    void rotate_bubble(std::vector<int>& nums, int k) {
        int n = nums.size();
        if (n == 0 || k == 0) return;

        k %= n; // Effective rotation steps

        // Perform k rotations. In each rotation, shift elements by one position.
        for (int step = 0; step < k; ++step) {
            int last_element = nums[n - 1]; // Store the last element

            // Shift all elements one position to the right
            for (int i = n - 1; i > 0; --i) {
                nums[i] = nums[i - 1];
            }
            nums[0] = last_element; // Place the stored last element at the beginning
        }
    }

    // Helper function for reversal method
    void reverse_segment(std::vector<int>& nums, int start, int end) {
        while (start < end) {
            std::swap(nums[start], nums[end]);
            start++;
            end--;
        }
    }

    void rotate_reversal(std::vector<int>& nums, int k) {
        int n = nums.size();
        if (n == 0 || k == 0) return;

        k %= n; // Effective rotation steps

        // Example: [1,2,3,4,5,6,7], k = 3
        // 1. Reverse the entire array: [7,6,5,4,3,2,1]
        reverse_segment(nums, 0, n - 1); // [7,6,5,4,3,2,1]

        // 2. Reverse the first k elements: [7,6,5] becomes [5,6,7]
        reverse_segment(nums, 0, k - 1); // [5,6,7,4,3,2,1]

        // 3. Reverse the remaining n-k elements: [4,3,2,1] becomes [1,2,3,4]
        reverse_segment(nums, k, n - 1); // [5,6,7,1,2,3,4] (Desired result)
    }


    // --- Problem 3: Merge Intervals ---

    std::vector<std::vector<int>> mergeIntervals_sortAndMerge(std::vector<std::vector<int>>& intervals) {
        if (intervals.empty()) {
            return {};
        }

        // 1. Sort the intervals based on their start times.
        // If start times are equal, sort by end times (optional but good for consistency).
        std::sort(intervals.begin(), intervals.end(), [](const std::vector<int>& a, const std::vector<int>& b) {
            return a[0] < b[0];
        });

        std::vector<std::vector<int>> merged_intervals;
        // Add the first interval to the result list
        merged_intervals.push_back(intervals[0]);

        // Iterate through the sorted intervals starting from the second one
        for (size_t i = 1; i < intervals.size(); ++i) {
            // Get the last merged interval's end time
            int last_merged_end = merged_intervals.back()[1];
            // Get the current interval's start and end times
            int current_start = intervals[i][0];
            int current_end = intervals[i][1];

            // Check for overlap: If the current interval's start is less than or equal to the last merged interval's end
            if (current_start <= last_merged_end) {
                // There is an overlap, merge them by updating the end time of the last merged interval
                // The new end time is the maximum of the last merged end and the current end
                merged_intervals.back()[1] = std::max(last_merged_end, current_end);
            } else {
                // No overlap, add the current interval as a new separate interval
                merged_intervals.push_back(intervals[i]);
            }
        }

        return merged_intervals;
    }


    // --- Problem 4: Trapping Rain Water ---

    int trapRainWater_bruteForce(const std::vector<int>& height) {
        int n = height.size();
        if (n <= 2) return 0; // Not enough bars to trap water

        int total_water = 0;

        // Iterate through each bar (excluding the first and last, as they cannot trap water)
        for (int i = 1; i < n - 1; ++i) {
            int left_max = 0;
            int right_max = 0;

            // Find the maximum height bar on the left of current bar `i`
            for (int j = 0; j <= i; ++j) {
                left_max = std::max(left_max, height[j]);
            }

            // Find the maximum height bar on the right of current bar `i`
            for (int j = i; j < n; ++j) {
                right_max = std::max(right_max, height[j]);
            }

            // The amount of water trapped above bar `i` is
            // min(left_max, right_max) - height[i]
            // We only add if this value is positive
            total_water += std::max(0, std::min(left_max, right_max) - height[i]);
        }

        return total_water;
    }

    int trapRainWater_precomputeMax(const std::vector<int>& height) {
        int n = height.size();
        if (n <= 2) return 0;

        std::vector<int> left_max(n, 0);
        std::vector<int> right_max(n, 0);

        // Fill left_max array
        // left_max[i] stores the maximum height encountered from index 0 to i
        left_max[0] = height[0];
        for (int i = 1; i < n; ++i) {
            left_max[i] = std::max(left_max[i - 1], height[i]);
        }

        // Fill right_max array
        // right_max[i] stores the maximum height encountered from index (n-1) to i
        right_max[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; --i) {
            right_max[i] = std::max(right_max[i + 1], height[i]);
        }

        int total_water = 0;
        // Iterate through each bar (excluding first and last)
        for (int i = 1; i < n - 1; ++i) {
            // Water trapped at index i is min(left_max[i], right_max[i]) - height[i]
            total_water += std::min(left_max[i], right_max[i]) - height[i];
        }

        return total_water;
    }

    int trapRainWater_twoPointer(const std::vector<int>& height) {
        int n = height.size();
        if (n <= 2) return 0;

        int left = 0;           // Left pointer, starts at the beginning
        int right = n - 1;      // Right pointer, starts at the end
        int max_left = 0;       // Maximum height found from left to `left` pointer
        int max_right = 0;      // Maximum height found from right to `right` pointer
        int total_water = 0;

        // Loop until the pointers meet
        while (left < right) {
            // Update max_left and max_right
            max_left = std::max(max_left, height[left]);
            max_right = std::max(max_right, height[right]);

            // Logic: The water level at a position is determined by the *smaller* of the two walls
            // If height[left] is smaller than height[right], it means the amount of water trapped
            // at `left` is determined by `max_left` and `height[left]`. We know `max_right` (the wall
            // on the far right) is at least as tall as `height[right]`, which is >= `height[left]`.
            // So, `max_left` is the limiting factor for `left`.
            if (height[left] < height[right]) {
                total_water += (max_left - height[left]);
                left++; // Move left pointer inwards
            }
            // Conversely, if height[right] is smaller or equal, then `max_right` is the limiting factor.
            else {
                total_water += (max_right - height[right]);
                right--; // Move right pointer inwards
            }
        }
        return total_water;
    }

} // namespace ArrayManipulator
```