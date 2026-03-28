```cpp
#include "backtracking_problems.h"
#include <numeric> // Potentially useful for iota, but not strictly used in current implementations
#include <set>     // Potentially useful for permutations, but not strictly used in current implementations

namespace BacktrackingProblems {

    // --- Problem 1: Subsets ---

    // Helper function for the recursive backtracking approach for subsets
    // This function explores all possible subsets of `nums` starting from `start` index.
    // @param nums: The input array of integers (assumed unique for this problem variant).
    // @param start: The starting index for the current level of recursion. This is crucial for:
    //               1. Ensuring elements are processed in a specific order.
    //               2. Preventing duplicate combinations (e.g., {1,2} vs {2,1} are the same subset).
    //               3. Not re-using an element within a single subset generation step.
    // @param currentSubset: The current subset being built. Passed by reference to modify in place.
    // @param result: The final collection of all subsets found so far. Passed by reference.
    void backtrackSubsets(const std::vector<int>& nums, int start,
                          std::vector<int>& currentSubset,
                          std::vector<std::vector<int>>& result) {
        // Base case: At each step, the `currentSubset` represents a valid subset.
        // This is because we add the `currentSubset` to the result before exploring further choices.
        // Conceptually, every node in the decision tree (including non-leaf nodes) represents a subset.
        result.push_back(currentSubset);

        // Recursive step: Explore choices
        // Iterate through elements from `start` to `nums.size() - 1`.
        // This ensures we only consider elements that haven't been considered yet in the current branch.
        for (int i = start; i < nums.size(); ++i) {
            // 1. Choose: Include the current number `nums[i]` in the `currentSubset`.
            currentSubset.push_back(nums[i]);

            // 2. Explore: Recurse with the next element `i + 1`.
            //    We pass `i + 1` as the new `start` index. This means for the next level of recursion,
            //    we will only consider elements strictly after `nums[i]`. This is vital for generating
            //    combinations (subsets are ordered combinations) and avoiding duplicates like {1,2} and {2,1}.
            backtrackSubsets(nums, i + 1, currentSubset, result);

            // 3. Unchoose (backtrack): Remove the last added number `nums[i]` from `currentSubset`.
            //    This restores `currentSubset` to its state before `nums[i]` was added, allowing
            //    the loop to try other choices (i.e., not including `nums[i]`, or trying `nums[i+1]`
            //    if the current loop iteration ends). This is the "backtracking" step.
            currentSubset.pop_back();
        }
    }

    // Main function for subsets using backtracking
    // Time Complexity: O(N * 2^N)
    //   - There are 2^N total subsets.
    //   - For each subset, we perform a copy operation (push_back) which takes O(N) time in worst case
    //     (copying a vector of N elements).
    //   - The recursion tree has 2^N leaves, and the total work is effectively proportional to the number
    //     of subsets times the average size of a subset.
    // Space Complexity: O(N * 2^N)
    //   - O(N) for recursion stack depth (max depth is N).
    //   - O(N * 2^N) for storing the result (2^N subsets, each can contain up to N elements in the worst case).
    std::vector<std::vector<int>> subsets(std::vector<int>& nums) {
        std::vector<std::vector<int>> result;
        std::vector<int> currentSubset;
        backtrackSubsets(nums, 0, currentSubset, result);
        return result;
    }

    // Iterative approach for subsets
    // This approach builds subsets by considering each number in `nums`. For each number,
    // it iterates through all subsets found so far and creates new subsets by adding the current number
    // to each existing subset.
    // Time Complexity: O(N * 2^N)
    //   - We iterate N times (once for each number in `nums`).
    //   - In each iteration, `result.size()` can double. We iterate `currentSize` times and perform
    //     a copy and push_back, which can take O(k) where k is the average subset size.
    //     Summing over all iterations: 1 + 2*1 + 4*2 + 8*3 + ... = approximately N * 2^N.
    // Space Complexity: O(N * 2^N) for storing the result.
    std::vector<std::vector<int>> subsetsIterative(std::vector<int>& nums) {
        std::vector<std::vector<int>> result;
        result.push_back({}); // Start with an empty subset as the first (and always present) subset

        // For each number in the input array
        for (int num : nums) {
            // Get the current number of subsets found so far
            int currentSize = result.size();
            // For each existing subset, create a new one by adding `num`
            for (int i = 0; i < currentSize; ++i) {
                std::vector<int> newSubset = result[i]; // Make a copy of an existing subset
                newSubset.push_back(num);               // Add the current number to the new subset
                result.push_back(newSubset);            // Add the new subset to the result
            }
        }
        return result;
    }


    // --- Problem 2: Permutations ---

    // Helper function for recursive backtracking permutations (using in-place swap)
    // This method generates permutations by fixing elements one by one from left to right.
    // At each `start` position, it tries swapping `nums[start]` with every element from `nums[start]` to `nums[size-1]`.
    // @param nums: The input array (passed by reference, modified in-place). Assumed distinct elements.
    // @param start: The starting index from which to consider elements for swapping. This index
    //               marks the beginning of the subarray whose permutations are being generated.
    // @param result: The final collection of all permutations.
    void backtrackPermutations(std::vector<int>& nums, int start,
                               std::vector<std::vector<int>>& result) {
        // Base case: If `start` has reached the end of the array, a full permutation is formed.
        // All elements from index 0 to `nums.size() - 1` have been uniquely placed.
        if (start == nums.size()) {
            result.push_back(nums); // Add the current permutation to the result
            return;
        }

        // Recursive step: Iterate from 'start' to the end of the array
        // For each element at index `i` from `start` to `nums.size() - 1`:
        // We consider placing `nums[i]` at the current `start` position.
        for (int i = start; i < nums.size(); ++i) {
            // 1. Choose: Swap the element at `start` with the element at `i`.
            //    This effectively "fixes" `nums[i]` at the `start` position for this branch of recursion.
            std::swap(nums[start], nums[i]);

            // 2. Explore: Recurse for the next position (`start + 1`).
            //    We now need to permute the remaining elements (from `start + 1` onwards).
            backtrackPermutations(nums, start + 1, result);

            // 3. Unchoose (backtrack): Swap back to restore the original order.
            //    This is crucial to undo the change made in step 1, ensuring that the `nums` array
            //    is in its state before this iteration's swap. This allows other choices for `nums[start]`
            //    to be explored correctly in the current loop.
            std::swap(nums[start], nums[i]);
        }
    }

    // Main function for permutations using backtracking (in-place swap)
    // Time Complexity: O(N * N!)
    //   - There are N! permutations.
    //   - For each permutation, we perform a copy operation (push_back) which takes O(N) time.
    //   - The number of swaps and recursive calls in the recursion tree is proportional to N * N!.
    // Space Complexity: O(N * N!)
    //   - O(N) for recursion stack depth (max depth is N, as we recurse N times).
    //   - O(N * N!) for storing the result (N! permutations, each N elements).
    std::vector<std::vector<int>> permutations(std::vector<int>& nums) {
        std::vector<std::vector<int>> result;
        // Edge case: if input is empty, LeetCode often expects {{}} for permutations of an empty set.
        if (nums.empty()) {
            return {{}};
        }
        backtrackPermutations(nums, 0, result);
        return result;
    }

    // Helper function for recursive backtracking permutations (using a boolean visited array)
    // This method generates permutations by building them element by element. It uses a `visited` array
    // to track which elements from the original `nums` array have been used in the `currentPermutation`.
    // @param nums: The original input array of distinct integers. Passed by const reference as it's not modified.
    // @param visited: A boolean array of the same size as `nums`, tracking which `nums[i]` is currently in `currentPermutation`.
    // @param currentPermutation: The permutation being built up. Passed by reference.
    // @param result: The final collection of all permutations.
    void backtrackPermutationsVisited(const std::vector<int>& nums, std::vector<bool>& visited,
                                      std::vector<int>& currentPermutation,
                                      std::vector<std::vector<int>>& result) {
        // Base case: If the `currentPermutation`'s size equals the input array's size, it's complete.
        if (currentPermutation.size() == nums.size()) {
            result.push_back(currentPermutation); // Add the completed permutation to the result
            return;
        }

        // Recursive step: Iterate through all numbers in the original `nums` array
        for (int i = 0; i < nums.size(); ++i) {
            if (visited[i]) {
                continue; // Skip if this number has already been used in the current permutation path
            }

            // 1. Choose: Mark the number as visited and add it to the `currentPermutation`.
            visited[i] = true;
            currentPermutation.push_back(nums[i]);

            // 2. Explore: Recurse to find the next element for the permutation.
            backtrackPermutationsVisited(nums, visited, currentPermutation, result);

            // 3. Unchoose (backtrack): Remove the number from `currentPermutation` and mark it as unvisited.
            //    This allows it to be used in other permutation branches (i.e., when building permutations
            //    that start with a different element or have a different element at the current position).
            currentPermutation.pop_back();
            visited[i] = false;
        }
    }

    // Main function for permutations using backtracking (visited array)
    // Time Complexity: O(N * N!) (Similar to the swap approach)
    //   - N choices for the first element, N-1 for the second, ..., 1 for the last => N! permutations.
    //   - Each permutation generation involves N steps, and copying to result takes O(N).
    // Space Complexity: O(N * N!)
    //   - O(N) for recursion stack depth.
    //   - O(N) for the `visited` array.
    //   - O(N * N!) for storing the result.
    std::vector<std::vector<int>> permutationsVisited(std::vector<int>& nums) {
        std::vector<std::vector<int>> result;
        if (nums.empty()) {
            return {{}};
        }
        std::vector<bool> visited(nums.size(), false); // Initialize all elements as unvisited
        std::vector<int> currentPermutation;
        backtrackPermutationsVisited(nums, visited, currentPermutation, result);
        return result;
    }


    // --- Problem 3: Combination Sum II ---

    // Helper function for Combination Sum II
    // This function finds unique combinations that sum to `target`, where each candidate number
    // can be used at most once. Input `candidates` array must be sorted to handle duplicates correctly.
    // @param candidates: The sorted input array of candidate numbers.
    // @param target: The remaining target sum to achieve.
    // @param start: The starting index for the current level of recursion. Crucial for:
    //               1. Ensuring elements are considered in increasing order.
    //               2. Preventing duplicate combinations (e.g., {1,2} vs {2,1}).
    //               3. Ensuring each number from `candidates` is used at most once in a combination.
    // @param currentCombination: The current combination being built.
    // @param result: The final collection of unique combinations.
    void backtrackCombinationSum2(const std::vector<int>& candidates, int target, int start,
                                  std::vector<int>& currentCombination,
                                  std::vector<std::vector<int>>& result) {
        // Base Case 1: If target sum is 0, we found a valid combination.
        if (target == 0) {
            result.push_back(currentCombination);
            return;
        }
        // Base Case 2: If target sum is negative, this path is invalid, so prune.
        if (target < 0) {
            return;
        }

        // Recursive Step: Iterate through candidates starting from 'start' index
        for (int i = start; i < candidates.size(); ++i) {
            // Pruning 1: Skip duplicates.
            // This condition is critical for Combination Sum II. If the current number `candidates[i]`
            // is the same as the previous one `candidates[i-1]`, and we are not at the very beginning
            // of the loop for this recursive call (`i > start`), then this `candidates[i]` has already
            // been considered via `candidates[i-1]` in the *previous iteration of the same loop level*.
            // Skipping it prevents duplicate combinations in the final result.
            // Example: [1,1,2], target = 2.
            //   - For start=0, i=0, picks 1. recurse.
            //   - For start=0, i=1, picks 1. `i > start` (1 > 0) AND `candidates[1] == candidates[0]` (1==1). Skip.
            //     This avoids generating [1,1] from first_1 and second_1 if first_1 and first_1 was already generated
            //     (which happens by picking first_1 and then recursively picking second_1 via start+1)
            // It ensures that `[1,1,6]` and `[1,1,6]` (using different '1's) are counted as one.
            if (i > start && candidates[i] == candidates[i-1]) {
                continue;
            }

            // Pruning 2: If the current candidate is greater than the remaining target, it cannot be part of the sum.
            // Since `candidates` are sorted, no subsequent elements in the array will work either.
            // We can break out of the loop early.
            if (candidates[i] > target) {
                break;
            }

            // 1. Choose: Add the current candidate to the combination.
            currentCombination.push_back(candidates[i]);

            // 2. Explore: Recurse with updated target and next index (`i + 1`).
            //    Using `i + 1` ensures that each number from `candidates` is used at most once in a combination,
            //    as required by the problem statement.
            backtrackCombinationSum2(candidates, target - candidates[i], i + 1, currentCombination, result);

            // 3. Unchoose (backtrack): Remove the last added number.
            //    This restores `currentCombination` to its state before `candidates[i]` was added,
            //    allowing the loop to try other choices.
            currentCombination.pop_back();
        }
    }

    // Main function for Combination Sum II
    // Time Complexity: Exponential, roughly O(2^N) in the worst case for generating all combinations,
    //                  multiplied by N for copying combinations to result. The exact complexity is difficult
    //                  to determine precisely due to pruning, but it's bounded by O(2^N) * N.
    // Space Complexity: O(N) for recursion stack depth (max depth is N).
    //                   O(N * 2^N) for storing results in the worst case (when many small numbers combine to target).
    std::vector<std::vector<int>> combinationSum2(std::vector<int>& candidates, int target) {
        std::vector<std::vector<int>> result;
        std::vector<int> currentCombination;

        // Sorting is absolutely crucial to handle duplicates correctly for Combination Sum II.
        // It allows the `if (i > start && candidates[i] == candidates[i-1]) continue;` pruning.
        std::sort(candidates.begin(), candidates.end());

        backtrackCombinationSum2(candidates, target, 0, currentCombination, result);
        return result;
    }


    // --- Problem 4: N-Queens ---

    // Helper function to check if placing a queen at (row, col) on the board is valid.
    // We only need to check for conflicts in:
    // 1. The same column (vertically upwards, as we place queens row by row, so no queens below).
    // 2. The left upper diagonal.
    // 3. The right upper diagonal.
    // @param n: The size of the chessboard.
    // @param row: The current row where we are attempting to place a queen.
    // @param col: The current column where we are attempting to place a queen.
    // @param board: The current state of the chessboard, represented as a vector of strings.
    // @return: True if a queen can be safely placed at (row, col), false otherwise.
    bool isValidNQueens(int n, int row, int col, const std::vector<std::string>& board) {
        // Check column (vertically up)
        // Iterate from row-1 down to 0, checking if any queen is in the same column.
        for (int i = 0; i < row; ++i) {
            if (board[i][col] == 'Q') {
                return false;
            }
        }

        // Check left upper diagonal
        // Iterate diagonally upwards and to the left.
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
            if (board[i][j] == 'Q') {
                return false;
            }
        }

        // Check right upper diagonal
        // Iterate diagonally upwards and to the right.
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; --i, --j) {
            if (board[i][j] == 'Q') {
                return false;
            }
        }

        return true; // No conflicts found, position is valid
    }

    // Helper function for N-Queens backtracking
    // This function recursively attempts to place queens, one queen per row, starting from `row`.
    // @param n: The size of the chessboard.
    // @param row: The current row for which we are trying to place a queen.
    // @param board: The current state of the board. Passed by reference to be modified and backtracked.
    // @param result: The final collection of all valid board configurations.
    void backtrackNQueens(int n, int row, std::vector<std::string>& board,
                          std::vector<std::vector<std::string>>& result) {
        // Base case: If all queens are placed (i.e., we've successfully placed a queen in all `n` rows)
        if (row == n) {
            result.push_back(board); // A valid solution is found, add the current board state to results.
            return;
        }

        // Recursive step: Try placing a queen in each column of the current `row`.
        for (int col = 0; col < n; ++col) {
            // Pruning: Check if placing a queen at `(row, col)` is valid given previous placements.
            if (isValidNQueens(n, row, col, board)) {
                // 1. Choose: Place a queen at `(row, col)`.
                board[row][col] = 'Q';

                // 2. Explore: Recurse to place the next queen in the next row (`row + 1`).
                backtrackNQueens(n, row + 1, board, result);

                // 3. Unchoose (backtrack): Remove the queen from `(row, col)`.
                //    This restores the board to its previous state, allowing the loop to try
                //    placing a queen in the next column of the current `row`.
                board[row][col] = '.';
            }
        }
    }

    // Main function for N-Queens
    // Time Complexity: The exact complexity is hard to determine precisely due to the effectiveness
    //                  of pruning. It's much better than O(N^N) (trying all cells) but worse than polynomial.
    //                  It's often cited to be roughly O(N!), or more accurately
    //                  closer to O(exp(N)) where the base of the exponent is roughly 1.7-1.8.
    //                  Each call to `isValidNQueens` takes O(N) time. There are many such calls.
    //                  For each solution found, copying the board takes O(N^2) time.
    // Space Complexity: O(N^2) for the board representation (N strings of length N).
    //                   O(N) for recursion stack depth (max depth is N).
    //                   O(Number of Solutions * N^2) in worst case for storing all solutions.
    std::vector<std::vector<std::string>> solveNQueens(int n) {
        std::vector<std::vector<std::string>> result;
        if (n == 0) return {}; // No queens on a 0x0 board, return empty result.

        // Initialize an empty board with '.'
        std::vector<std::string> board(n, std::string(n, '.'));

        // Start the backtracking process from the first row (row 0).
        backtrackNQueens(n, 0, board, result);
        return result;
    }

} // namespace BacktrackingProblems
```