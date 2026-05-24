/**
 * @fileoverview
 * Implements the Combination Sum II problem using backtracking.
 *
 * Problem: Given a collection of candidate numbers (`candidates`) and a target number (`target`),
 * find all unique combinations in `candidates` where the candidate numbers sum to `target`.
 * Each number in `candidates` may only be used once in the combination.
 * The solution set must not contain duplicate combinations.
 *
 * Example:
 * Input: candidates = [10,1,2,7,6,1,5], target = 8
 * Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
 *
 * Explanation:
 * Note that 1 is used twice in [1,1,6]. This is allowed because there are two 1s in the input array.
 * However, the combination [1,2,5] and [1,2,5] (if generated from different indices of same values)
 * should only appear once.
 */

/**
 * Finds all unique combinations of numbers from `candidates` that sum up to `target`.
 * Each number in `candidates` may only be used once in a combination.
 *
 * Brute Force Approach (Conceptual):
 * Similar to Subsets II, a brute-force approach would involve generating all possible subsets/combinations
 * from the `candidates` array (with careful handling of each number being used at most once),
 * then for each subset, calculate its sum. If the sum equals the target, and the combination is unique,
 * add it to the results. This would involve generating 2^N combinations, summing each (O(N)),
 * and then using a Set to filter duplicates (O(N) for string conversion/hashing). Overall O(N * 2^N).
 * This is very inefficient due to repeated sum calculations and explicit duplicate filtering.
 *
 * Optimized Backtracking Approach:
 * The backtracking approach uses recursion to explore all valid combinations.
 * To handle duplicates and ensure each number is used at most once per combination:
 * 1.  **Sort the `candidates` array:** This groups identical numbers together, which is crucial for
 *     efficiently skipping duplicates.
 * 2.  **Pass a `start` index:** This ensures that in the current recursive call, we only consider
 *     elements from `start` onwards, preventing duplicate permutations (e.g., `[1,2]` and `[2,1]` are treated
 *     as the same combination if we always start from 0) and ensuring each element is used at most once
 *     for the current branch.
 * 3.  **Skip duplicate choices:** If the current candidate is the same as the previous one and we are
 *     in the same level of the decision tree (i.e., `i > start`), we skip it. This prevents generating
 *     identical combinations.
 * 4.  **Pruning:** If `currentSum` exceeds `target`, we immediately stop exploring that branch.
 *
 * Time Complexity: O(2^N) in the worst case, but often much better due to pruning.
 *   - The sorting takes O(N log N).
 *   - The number of possible combinations can be up to 2^N (if all unique and sum to target in various ways).
 *   - Each combination generation involves adding/removing elements from the current list (O(N) in worst case for copying).
 *   - More precisely, it's roughly the number of valid combinations times the average length of a combination.
 * Space Complexity: O(N * 2^N) in the worst case to store all solutions.
 *   - O(N) for the recursion stack depth (max depth is N).
 *   - O(N) for the `currentCombination` list.
 *
 * @param candidates An array of numbers that may contain duplicates.
 * @param target The target sum.
 * @returns A 2D array containing all unique combinations that sum up to `target`.
 */
export function combinationSum2(candidates: number[], target: number): number[][] {
    const solutions: number[][] = [];
    // Sort the candidate numbers to handle duplicates efficiently.
    candidates.sort((a, b) => a - b);

    /**
     * Recursive backtracking helper function.
     *
     * @param start The starting index for considering candidates in the current recursive call.
     * @param currentCombination The list of numbers forming the current combination.
     * @param currentSum The sum of numbers in `currentCombination`.
     */
    function backtrack(start: number, currentCombination: number[], currentSum: number): void {
        // Base Case 1: If current sum equals the target, a valid combination is found.
        if (currentSum === target) {
            // Add a deep copy of the current combination to the solutions.
            // Using `slice()` or `[...currentCombination]` ensures that future modifications
            // to `currentCombination` don't affect this recorded solution.
            solutions.push([...currentCombination]);
            return; // Found a solution, no need to explore further down this path
        }

        // Base Case 2: If current sum exceeds the target, this path is invalid. Prune it.
        if (currentSum > target) {
            return;
        }

        // Recursive Step: Explore adding more candidates to the current combination.
        // Iterate through candidates starting from `start` index.
        for (let i = start; i < candidates.length; i++) {
            // Duplicate Handling:
            // If the current candidate is the same as the previous one, and it's not the first element
            // being considered in this `for` loop (i.e., `i > start`), then we have already considered
            // combinations starting with the previous identical candidate.
            // Skipping this duplicate prevents generating identical combinations.
            // For example, if candidates = [1,1,2] and target = 3:
            // - When i=0 (candidates[0]=1), we pick it. Path: [1]. Recurse.
            // - When i=1 (candidates[1]=1), if we didn't have this check, we'd pick it. Path: [1]. Recurse.
            // This `if` ensures that if we have `[1_a, 1_b]`, we only start a branch from `1_a`, not `1_b`.
            if (i > start && candidates[i] === candidates[i - 1]) {
                continue;
            }

            // Make a choice: Include the current candidate in the combination.
            currentCombination.push(candidates[i]);
            currentSum += candidates[i];

            // Recurse: Explore combinations from the next index (`i + 1`) because each
            // candidate can only be used once in a combination.
            backtrack(i + 1, currentCombination, currentSum);

            // Backtrack: Undo the choice. Remove the current candidate and its value from the sum.
            // This restores the state to explore other possibilities at the current level.
            currentCombination.pop();
            currentSum -= candidates[i];
        }
    }

    // Start the backtracking process with an empty combination and sum, starting from index 0.
    backtrack(0, [], 0);

    return solutions;
}
```