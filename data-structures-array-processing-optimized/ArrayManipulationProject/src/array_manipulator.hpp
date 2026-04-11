```cpp
#ifndef ARRAY_MANIPULATOR_HPP
#define ARRAY_MANIPULATOR_HPP

#include <vector>
#include <numeric> // For std::iota, std::gcd etc.
#include <algorithm> // For std::reverse, std::swap, std::sort etc.
#include <set> // For hash set approach
#include <unordered_set> // For unordered_set approach
#include <map> // For map approach
#include <unordered_map> // For unordered_map approach
#include <stack> // For stack-based solutions

/**
 * @brief A class containing various array manipulation algorithms.
 *        Each method provides different approaches (optimal, alternative, brute-force)
 *        for a specific problem, along with comments on logic and complexity.
 */
class ArrayManipulator {
public:
    // --- Problem 1: Rotate Array ---
    /**
     * @brief Rotates the given array to the right by k steps.
     *        Example: nums = [1,2,3,4,5,6,7], k = 3 -> [5,6,7,1,2,3,4]
     */

    /**
     * @brief Approach 1: Using a temporary array.
     *        Create a new array and place elements in their rotated positions.
     * @param nums The array to rotate (modified in-place, but logic involves temp space).
     * @param k The number of steps to rotate.
     * @complexity Time: O(N) where N is the number of elements in nums. We iterate through the array twice.
     * @complexity Space: O(N) for the temporary array.
     */
    void rotate_temp_array(std::vector<int>& nums, int k);

    /**
     * @brief Approach 2: Using the Reverse technique.
     *        This is an optimal in-place solution.
     *        1. Reverse the entire array.
     *        2. Reverse the first k elements.
     *        3. Reverse the remaining N-k elements.
     * @param nums The array to rotate (modified in-place).
     * @param k The number of steps to rotate.
     * @complexity Time: O(N) where N is the number of elements in nums. Reversing takes linear time, and we do it three times.
     * @complexity Space: O(1) as no extra space proportional to N is used.
     */
    void rotate_reverse(std::vector<int>& nums, int k);

    /**
     * @brief Approach 3: Using the Juggling Algorithm (Cyclic Replacements).
     *        This is an optimal in-place solution, particularly efficient for certain architectures.
     *        It moves elements one by one to their correct position within cycles.
     *        Number of cycles is equal to gcd(N, k).
     * @param nums The array to rotate (modified in-place).
     * @param k The number of steps to rotate.
     * @complexity Time: O(N) where N is the number of elements in nums. Each element is moved exactly once.
     * @complexity Space: O(1) as no extra space proportional to N is used.
     */
    void rotate_juggling(std::vector<int>& nums, int k);

    /**
     * @brief Approach 4: Brute-Force (Rotate one step k times).
     *        Not efficient, but conceptually simple.
     * @param nums The array to rotate (modified in-place).
     * @param k The number of steps to rotate.
     * @complexity Time: O(N*k) where N is the number of elements and k is the steps. In worst case k can be N.
     * @complexity Space: O(1) as no extra space proportional to N is used.
     */
    void rotate_brute_force(std::vector<int>& nums, int k);


    // --- Problem 2: Find the Duplicate Number ---
    /**
     * @brief Given an array nums containing n + 1 integers where each integer is
     *        between 1 and n (inclusive), prove that at least one duplicate number must exist.
     *        Assume that there is only one duplicate number, find the duplicate one.
     *        Constraint: Do not modify the array (read-only array).
     *        Constraint: Use only O(1) extra space.
     *        Constraint: Runtime complexity less than O(n^2).
     */

    /**
     * @brief Approach 1: Sort the array.
     *        (Violates "Do not modify the array" if not making a copy, but good for understanding).
     * @param nums The input array.
     * @complexity Time: O(N log N) due to sorting.
     * @complexity Space: O(log N) or O(N) depending on sort implementation (in-place vs copy). If problem constraints allow modification, O(1) auxiliary space. If not, O(N) to copy.
     * @return The duplicate number.
     */
    int findDuplicate_sort(std::vector<int> nums); // Takes by value to simulate non-modification

    /**
     * @brief Approach 2: Using a Hash Set (unordered_set).
     *        (Violates "O(1) extra space" constraint, but optimal time complexity).
     * @param nums The input array.
     * @complexity Time: O(N) on average, as insertion and lookup in a hash set take O(1) average time.
     * @complexity Space: O(N) in the worst case (no duplicates until the very end).
     * @return The duplicate number.
     */
    int findDuplicate_hashSet(const std::vector<int>& nums);

    /**
     * @brief Approach 3: Floyd's Tortoise and Hare (Cycle Detection).
     *        This is the optimal solution meeting all problem constraints (O(1) space, O(N) time, no modification).
     *        The problem can be modeled as finding a cycle in a linked list.
     * @param nums The input array.
     * @complexity Time: O(N). Each element is visited at most a constant number of times.
     * @complexity Space: O(1). Only a few pointers are used.
     * @return The duplicate number.
     */
    int findDuplicate_floyd(const std::vector<int>& nums);

    /**
     * @brief Approach 4: Binary Search on the answer range.
     *        Counts numbers less than or equal to 'mid'. If count > mid, duplicate is in [1, mid]. Else in [mid+1, n].
     * @param nums The input array.
     * @complexity Time: O(N log N). Binary search performs log N iterations, and each iteration involves iterating through the array (O(N)).
     * @complexity Space: O(1).
     * @return The duplicate number.
     */
    int findDuplicate_binarySearch(const std::vector<int>& nums);


    // --- Problem 3: Trapping Rain Water ---
    /**
     * @brief Given n non-negative integers representing an elevation map where the width of each bar is 1,
     *        compute how much water it can trap after raining.
     */

    /**
     * @brief Approach 1: Two Pointers.
     *        This is an optimal O(N) time, O(1) space solution.
     *        Maintain left_max and right_max, and iterate from both ends.
     * @param height A vector of integers representing the elevation map.
     * @complexity Time: O(N) where N is the number of bars. We iterate through the array once.
     * @complexity Space: O(1) as only a few variables are used.
     * @return The total amount of trapped rain water.
     */
    int trap_twoPointers(const std::vector<int>& height);

    /**
     * @brief Approach 2: Dynamic Programming (Pre-compute left and right maxes).
     *        This is an optimal O(N) time solution, but uses O(N) space.
     *        Compute `left_max[i]` and `right_max[i]` for all `i`.
     * @param height A vector of integers representing the elevation map.
     * @complexity Time: O(N) where N is the number of bars. Three passes over the array.
     * @complexity Space: O(N) for storing `left_max` and `right_max` arrays.
     * @return The total amount of trapped rain water.
     */
    int trap_dynamicProgramming(const std::vector<int>& height);

    /**
     * @brief Approach 3: Using a Monotonic Stack.
     *        Process bars one by one, pushing to stack if current bar is less than or equal to stack top.
     *        When current bar is greater, pop from stack and calculate trapped water.
     * @param height A vector of integers representing the elevation map.
     * @complexity Time: O(N) where N is the number of bars. Each element is pushed and popped at most once.
     * @complexity Space: O(N) in the worst case for the stack (e.g., decreasing heights).
     * @return The total amount of trapped rain water.
     */
    int trap_monotonicStack(const std::vector<int>& height);


    // --- Problem 4: Product of Array Except Self ---
    /**
     * @brief Given an integer array nums, return an array answer such that answer[i] is equal
     *        to the product of all the elements of nums except nums[i].
     *        The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
     *        Constraint: You must write an algorithm that runs in O(n) time and without using the division operation.
     */

    /**
     * @brief Approach 1: Two-Pass (Prefix and Suffix Products).
     *        This is the optimal O(N) time and O(1) additional space (excluding output array) solution.
     *        1. Calculate prefix products.
     *        2. Calculate suffix products and combine them.
     * @param nums The input array.
     * @complexity Time: O(N) where N is the number of elements. Two passes over the array.
     * @complexity Space: O(1) excluding the space for the output array. If output array counts, then O(N).
     * @return A vector where `answer[i]` is the product of all elements except `nums[i]`.
     */
    std::vector<int> productExceptSelf_twoPass(const std::vector<int>& nums);

    /**
     * @brief Approach 2: Brute-Force.
     *        For each element, iterate through the entire array to calculate the product.
     *        (Violates O(N) time constraint, but good for understanding and comparison).
     * @param nums The input array.
     * @complexity Time: O(N^2) where N is the number of elements. Nested loops.
     * @complexity Space: O(1) excluding the space for the output array.
     * @return A vector where `answer[i]` is the product of all elements except `nums[i]`.
     */
    std::vector<int> productExceptSelf_bruteForce(const std::vector<int>& nums);
};

#endif // ARRAY_MANIPULATOR_HPP
```