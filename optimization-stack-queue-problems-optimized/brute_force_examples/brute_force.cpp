#include <vector>
#include <string>
#include <algorithm> // For std::max_element

namespace DailyTemperaturesBruteForce {
    /**
     * @brief Brute-force solution for Daily Temperatures.
     *        For each day, it iterates through all subsequent days to find a warmer one.
     * @param temperatures A vector of daily temperatures.
     * @return A vector where `answer[i]` is the number of days to wait for a warmer temperature.
     *
     * Time Complexity: O(N^2) - For each of N days, in the worst case, we might scan N-i subsequent days.
     * Space Complexity: O(N) - For the result vector.
     */
    std::vector<int> dailyTemperatures(const std::vector<int>& temperatures) {
        int n = temperatures.size();
        std::vector<int> answer(n, 0);

        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (temperatures[j] > temperatures[i]) {
                    answer[i] = j - i;
                    break; // Found a warmer day, move to the next `i`
                }
            }
        }
        return answer;
    }
} // namespace DailyTemperaturesBruteForce

namespace SlidingWindowMaximumBruteForce {
    /**
     * @brief Brute-force solution for Sliding Window Maximum.
     *        For each window, it iterates through all elements in the window to find the maximum.
     * @param nums The input array of integers.
     * @param k The size of the sliding window.
     * @return A vector containing the maximums for each window.
     *
     * Time Complexity: O(N*K) - There are (N-K+1) windows, and for each window, we iterate K elements to find the max.
     * Space Complexity: O(N-K+1) - For the result vector.
     */
    std::vector<int> maxSlidingWindow(const std::vector<int>& nums, int k) {
        std::vector<int> result;
        if (nums.empty() || k <= 0 || k > nums.size()) {
            return result;
        }

        for (int i = 0; i <= (int)nums.size() - k; ++i) {
            int current_max = nums[i];
            for (int j = 1; j < k; ++j) {
                current_max = std::max(current_max, nums[i + j]);
            }
            result.push_back(current_max);
        }
        return result;
    }
} // namespace SlidingWindowMaximumBruteForce