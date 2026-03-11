#ifndef LONGEST_CONSECUTIVE_SEQUENCE_H
#define LONGEST_CONSECUTIVE_SEQUENCE_H

#include <vector>
#include <algorithm> // For std::sort
#include <unordered_set> // For optimal hash set solution

namespace LongestConsecutiveSequence {

/**
 * @brief Finds the length of the longest consecutive elements sequence by sorting the array.
 *
 * This approach first sorts the array, then iterates through the sorted array to find
 * consecutive sequences. Duplicates are handled by skipping them.
 *
 * @param nums The input vector of integers.
 * @return The length of the longest consecutive elements sequence.
 *
 * Time Complexity: O(N log N) - Dominated by the sorting step.
 * Space Complexity: O(1) - If `std::sort` uses an in-place sort. Some `std::sort` implementations
 *                          might use O(log N) or O(N) auxiliary space.
 */
int longestConsecutive_sort(std::vector<int> nums); // Pass by value to allow sorting

/**
 * @brief Finds the length of the longest consecutive elements sequence using a hash set.
 *
 * This approach stores all numbers in a hash set for O(1) average time lookups.
 * It then iterates through the original numbers. For each number, it checks if it's
 * the start of a sequence (i.e., `num - 1` is not present in the set). If it is,
 * it builds the sequence by repeatedly checking for `num + 1, num + 2, ...` in the set,
 * updating the maximum length found.
 *
 * @param nums The input vector of integers.
 * @return The length of the longest consecutive elements sequence.
 *
 * Time Complexity: O(N) - Building the hash set takes O(N). In the worst case, each number
 *                    is visited a constant number of times (once for initial check, once
 *                    to extend a sequence).
 * Space Complexity: O(N) - To store all numbers in the hash set.
 */
int longestConsecutive_hashSet(const std::vector<int>& nums);

} // namespace LongestConsecutiveSequence

#endif // LONGEST_CONSECUTIVE_SEQUENCE_H