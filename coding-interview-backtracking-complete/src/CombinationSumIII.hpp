```cpp
#ifndef COMBINATION_SUM_III_HPP
#define COMBINATION_SUM_III_HPP

#include <vector>
#include <numeric> // For std::iota (optional, if generating numbers 1-9)

/**
 * @brief Solution for the Combination Sum III problem.
 *
 * Find all valid combinations of `k` numbers that sum up to `n` such that only numbers
 * from 1 to 9 are used and each combination is a unique set of numbers.
 *
 * @complexity
 * Time Complexity: O(C(9, k) * k) - This problem involves choosing k numbers out of 9.
 * C(N, K) is "N choose K". In the worst case, we might explore many branches.
 * Each valid combination (of which there are C(9,k) at most) takes O(k) time to copy to the result.
 * The overall backtracking process prunes many branches, so the actual time is dominated by valid combinations.
 *
 * Space Complexity: O(k) - For the recursion stack depth (at most k) and the `current_combination` vector.
 * The space for `all_combinations` is O(C(9,k) * k) in the worst case, but this is output space.
 */
class CombinationSumIII {
public:
    /**
     * @brief Finds all combinations of k numbers from 1-9 that sum to n.
     * @param k The number of elements in each combination.
     * @param n The target sum.
     * @return A vector of vectors of integers, where each inner vector is a valid combination.
     */
    std::vector<std::vector<int>> combinationSum3(int k, int n) {
        std::vector<std::vector<int>> all_combinations;
        std::vector<int> current_combination;

        // Start backtracking from number 1.
        backtrack(k, n, 1, current_combination, all_combinations);

        return all_combinations;
    }

private:
    /**
     * @brief Recursive backtracking helper function to find combinations.
     * @param k_remaining The number of elements still needed for the combination.
     * @param target_sum The remaining sum needed.
     * @param start_num The number from which to start considering elements (1-9).
     * @param current_combination The combination being built.
     * @param all_combinations Reference to the vector storing all valid combinations.
     */
    void backtrack(int k_remaining, int target_sum, int start_num,
                   std::vector<int>& current_combination,
                   std::vector<std::vector<int>>& all_combinations) {
        // Base Cases:

        // 1. If target_sum becomes negative, this path is invalid (sum exceeded).
        if (target_sum < 0) {
            return;
        }

        // 2. If k_remaining becomes negative, we picked too many numbers.
        if (k_remaining < 0) {
            return;
        }

        // 3. If both k_remaining is 0 and target_sum is 0, we found a valid combination.
        if (k_remaining == 0 && target_sum == 0) {
            all_combinations.push_back(current_combination);
            return;
        }

        // 4. Optimization/Pruning: If start_num exceeds 9, or if there are not enough
        //    numbers left to reach k_remaining, or if the smallest possible sum from
        //    remaining numbers is too high/low to reach target_sum.
        //    (9 - start_num + 1) is the count of numbers from start_num to 9.
        //    If k_remaining > (9 - start_num + 1), it's impossible to pick k_remaining numbers.
        //    Another pruning: Minimum possible sum from `k_remaining` numbers starting at `start_num`:
        //    `start_num + (start_num + 1) + ... + (start_num + k_remaining - 1)`.
        //    Maximum possible sum: `(9) + (8) + ... + (9 - k_remaining + 1)`.
        //    If `target_sum` is outside this range, prune.
        //    A simpler check for `start_num > 9` covers the basic range limit.
        if (start_num > 9) {
            return;
        }

        // Recursive Step: Iterate through numbers from start_num to 9.
        for (int i = start_num; i <= 9; ++i) {
            // Pruning: if current number 'i' is already greater than 'target_sum',
            // then no subsequent numbers will make the sum because they are increasing.
            // This is a common optimization for combination sum problems.
            if (i > target_sum) {
                break;
            }

            // Choose: Include the current number `i`.
            current_combination.push_back(i);

            // Explore: Recurse with decremented `k_remaining` and `target_sum`,
            // and `i + 1` to ensure numbers are used at most once and in increasing order.
            backtrack(k_remaining - 1, target_sum - i, i + 1, current_combination, all_combinations);

            // Unchoose (Backtrack): Remove the current number `i` to explore other possibilities.
            current_combination.pop_back();
        }
    }
};

#endif // COMBINATION_SUM_III_HPP
```