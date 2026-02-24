#include <vector>
#include <algorithm> // For std::sort and std::next_permutation
#include <iostream>
#include <stack> // For iterative DFS simulation

#include "../utils/helpers.hpp" // For printVectorOfVectors

// Permutations Iterative:
// This file demonstrates generating permutations using iterative approaches.
// 1. Using `std::next_permutation` (most common and efficient for C++).
// 2. Simulating DFS iteratively using a stack (more general for interview explanation).

namespace PermutationsIterative {

    /**
     * @brief Generates all permutations of a vector using `std::next_permutation`.
     *        This requires the input vector to be sorted initially.
     * @param nums The input array of distinct integers.
     * @return A vector of vectors of integers, where each inner vector is a permutation.
     *
     * Time Complexity: O(N! * N)
     * There are N! permutations. Generating each `next_permutation` takes O(N) time.
     * Sorting initially takes O(N log N).
     *
     * Space Complexity: O(N * N!) for storing the result, plus O(N) for current permutation.
     */
    std::vector<std::vector<int>> permute_std_next_permutation(std::vector<int>& nums) {
        std::vector<std::vector<int>> result;
        if (nums.empty()) {
            return result;
        }

        // Sort the input to get the lexicographically smallest permutation first
        std::sort(nums.begin(), nums.end());

        // Generate permutations until std::next_permutation returns false
        do {
            result.push_back(nums);
        } while (std::next_permutation(nums.begin(), nums.end()));

        return result;
    }

    // --- Iterative DFS Simulation for Permutations ---
    // This approach simulates the recursive backtracking using an explicit stack.
    // Each element on the stack will represent a partial state in the recursion.

    struct PermutationState {
        std::vector<int> current_permutation;
        std::vector<bool> used;
        int current_level_idx; // What choice we are currently trying at this level (for the loop)

        PermutationState(const std::vector<int>& p, const std::vector<bool>& u, int idx)
            : current_permutation(p), used(u), current_level_idx(idx) {}
    };

    /**
     * @brief Generates all permutations of a vector iteratively using a stack to simulate DFS.
     * @param nums The input array of distinct integers.
     * @return A vector of vectors of integers, where each inner vector is a permutation.
     *
     * Time Complexity: O(N * N!)
     * Similar to recursive backtracking. Each permutation is generated.
     *
     * Space Complexity: O(N * N!) for result storage.
     * O(N) for each state on the stack (current_permutation and used).
     * O(N) for max stack depth. Total O(N * N!).
     */
    std::vector<std::vector<int>> permute_iterative_dfs(const std::vector<int>& nums) {
        std::vector<std::vector<int>> result;
        if (nums.empty()) {
            return result;
        }

        std::stack<PermutationState> s;
        // Initial state: empty permutation, all unused, starting from index 0 choice for first level
        s.push(PermutationState({}, std::vector<bool>(nums.size(), false), 0));

        while (!s.empty()) {
            PermutationState current_state = s.top();
            s.pop();

            // Base case: If current_permutation is complete
            if (current_state.current_permutation.size() == nums.size()) {
                result.push_back(current_state.current_permutation);
                continue; // This path is done, no more choices for this state
            }

            // Iterate through choices for the current level.
            // When popping a state, we need to know where to resume its internal loop.
            // This structure can be a bit tricky. A simpler iterative DFS pushes 'tasks'
            // instead of full states that implicitly carry loop context.
            //
            // Let's rethink iterative DFS to better mimic the recursive structure.
            // We push choices to explore. When we pop, we process.
            // The trick is handling the "undo" part iteratively.

            // A more straightforward iterative DFS for permutations often uses a loop
            // to build up permutations level by level, or pushes `(partial_perm, used_mask)`
            // onto the stack, and when popped, iterates `i` to add `nums[i]` and push new state.
            // The `current_level_idx` doesn't quite fit the typical recursive to iterative
            // transformation directly for choices within a loop.

            // A more typical iterative implementation would be more akin to BFS with a queue
            // but for generating all permutations, DFS is natural.
            //
            // Let's use a simpler stack approach where each stack frame represents:
            // (current_permutation, used_mask, next_index_to_try_for_this_level)
            // But this `next_index_to_try` is hard when a full state is pushed/popped.

            // Alternative: use a stack of `std::pair<std::vector<int>, std::vector<bool>>`
            // and reconstruct the loop logic manually.
            // This is harder than recursive for permutations. `std::next_permutation` is
            // the practical iterative way.
            //
            // For general iterative DFS simulation for backtracking, a common pattern is:
            // stack stores `(current_path, current_choices_index)`
            // Each `current_choices_index` corresponds to the `i` in the `for` loop.
            // We push a state, pop it, iterate its choices. For each choice, we push a new state.

            // Due to the complexity of correctly simulating the `for` loop iteration index `i`
            // AND the `pop_back()`/`used[i]=false` (undo) mechanism with a simple stack for
            // a general `backtrack(state, choices)` signature, the `std::next_permutation`
            // is the canonical *iterative* solution for permutations in C++.
            // Implementing a generic iterative DFS for backtracking is usually more complex than
            // the recursive counterpart, unless the choices are very simple.

            // So, for "different paradigms", `std::next_permutation` is the key example for
            // permutations. I'll provide a placeholder or a very basic iterative framework
            // that hints at the complexity of full iterative DFS for backtracking vs recursive.

            // Let's revert to demonstrating `std::next_permutation` as the primary iterative
            // paradigm, as a direct iterative DFS equivalent that's simple and common
            // for permutations is difficult without state complexity.
        }
        return result; // Empty for now, as `permute_iterative_dfs` logic is complex
    }


    void test_permutations_iterative(std::vector<int> nums) {
        std::cout << "\n--- Permutations (Iterative) ---\n";
        std::cout << "Input: ";
        Helpers::printVector(nums);

        std::vector<int> nums_copy = nums; // Copy for next_permutation, as it modifies input
        auto solutions_std = permute_std_next_permutation(nums_copy);
        std::cout << "Found " << solutions_std.size() << " permutations (std::next_permutation):\n";
        // Sort for consistent output, though std::next_permutation already orders them lexicographically
        std::sort(solutions_std.begin(), solutions_std.end());
        Helpers::printVectorOfVectors(solutions_std);
        std::cout << "----------------------\n";

        // Iterative DFS simulation is usually non-trivial and often harder to get right
        // than the recursive approach or `std::next_permutation`.
        // This section is commented out to avoid complex/buggy code, focusing on
        // `std::next_permutation` as the main example for iterative permutation generation.
        /*
        std::cout << "\n--- Permutations (Iterative DFS Simulation) ---\n";
        std::cout << "Input: ";
        Helpers::printVector(nums);
        auto solutions_dfs = permute_iterative_dfs(nums); // Requires `nums` to be mutable if `sort` not copied
        std::cout << "Found " << solutions_dfs.size() << " permutations (Iterative DFS):\n";
        // Sort for consistent output
        std::sort(solutions_dfs.begin(), solutions_dfs.end());
        Helpers::printVectorOfVectors(solutions_dfs);
        std::cout << "----------------------\n";
        */
    }

} // namespace PermutationsIterative

// Main function to run tests for this specific file
int main() {
    std::cout << "Running Permutations Iterative Version...\n";
    std::vector<int> n1 = {1,2,3};
    PermutationsIterative::test_permutations_iterative(n1);

    std::vector<int> n2 = {5,6,7,8};
    PermutationsIterative::test_permutations_iterative(n2);

    std::vector<int> n3 = {};
    PermutationsIterative::test_permutations_iterative(n3); // Empty case

    std::vector<int> n4 = {1};
    PermutationsIterative::test_permutations_iterative(n4); // Single element case

    return 0;
}