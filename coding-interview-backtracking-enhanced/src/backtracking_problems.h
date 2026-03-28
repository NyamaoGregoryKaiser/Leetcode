```cpp
#pragma once
#include <vector>
#include <string>
#include <algorithm> // For std::sort

namespace BacktrackingProblems {

    // Problem 1: Subsets
    // Given an integer array nums of unique elements, return all possible subsets (the power set).
    // The solution set must not contain duplicate subsets. Return the solution in any order.
    std::vector<std::vector<int>> subsets(std::vector<int>& nums);
    // Iterative approach for comparison
    std::vector<std::vector<int>> subsetsIterative(std::vector<int>& nums);

    // Problem 2: Permutations
    // Given an array nums of distinct integers, return all the possible permutations.
    // You can return the answer in any order.
    std::vector<std::vector<int>> permutations(std::vector<int>& nums);
    // Alternative approach using a visited array
    std::vector<std::vector<int>> permutationsVisited(std::vector<int>& nums);

    // Problem 3: Combination Sum II
    // Given a collection of candidate numbers (candidates) and a target number (target),
    // find all unique combinations in candidates where the candidate numbers sum to target.
    // Each number in candidates may only be used once in the combination.
    // Note: The solution set must not contain duplicate combinations.
    std::vector<std::vector<int>> combinationSum2(std::vector<int>& candidates, int target);

    // Problem 4: N-Queens
    // The n-queens puzzle is the problem of placing n queens on an n x n chessboard
    // such that no two queens attack each other.
    // Given an integer n, return all distinct solutions to the n-queens puzzle.
    // Each solution contains a distinct board configuration of the n-queens' placement,
    // where 'Q' and '.' both indicate a queen and an empty space, respectively.
    std::vector<std::vector<std::string>> solveNQueens(int n);

} // namespace BacktrackingProblems
```