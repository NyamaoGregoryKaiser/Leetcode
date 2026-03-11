#ifndef TWO_SUM_H
#define TWO_SUM_H

#include <vector>
#include <map> // For std::map in some approaches, though unordered_map is preferred
#include <unordered_map> // For optimal hash map solution

namespace TwoSum {

/**
 * @brief Finds two numbers that add up to a target using a brute force approach.
 *
 * Iterates through all possible pairs of numbers in the array.
 *
 * @param nums The input vector of integers.
 * @param target The target sum.
 * @return A vector containing the indices of the two numbers, or an empty vector if no solution is found.
 *
 * Time Complexity: O(N^2) - Nested loops iterate through all pairs.
 * Space Complexity: O(1) - Only a few variables are used.
 */
std::vector<int> twoSum_bruteForce(const std::vector<int>& nums, int target);

/**
 * @brief Finds two numbers that add up to a target using a hash map (unordered_map).
 *
 * Iterates through the array once. For each number, it calculates the complement
 * (target - current_number) and checks if the complement exists in the hash map.
 * If not, it adds the current number and its index to the hash map.
 *
 * @param nums The input vector of integers.
 * @param target The target sum.
 * @return A vector containing the indices of the two numbers, or an empty vector if no solution is found.
 *
 * Time Complexity: O(N) - Single pass through the array. Hash map operations (insertion, lookup)
 *                    take O(1) on average.
 * Space Complexity: O(N) - In the worst case, all numbers are stored in the hash map.
 */
std::vector<int> twoSum_hashMap(const std::vector<int>& nums, int target);

} // namespace TwoSum

#endif // TWO_SUM_H