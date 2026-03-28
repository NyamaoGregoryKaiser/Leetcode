```cpp
#include "../src/backtracking_problems.h"
#include "../utils/profiler.h" // For print_vector_of_vectors (if needed for debugging, not essential for assertions)
#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::sort

// --- Custom Assertion Framework ---
// A simple macro for asserting conditions in tests. If a condition is false, it prints an error
// message and indicates test failure.
#define ASSERT_TRUE(condition, message) \
    do { \
        if (!(condition)) { \
            std::cerr << "\033[31mAssertion Failed:\033[0m " << message << " at " << __FILE__ << ":" << __LINE__ << std::endl; \
            return false; \
        } \
    } while (0)

// Helper function to sort a vector of vectors for comparison.
// Backtracking solutions might produce results in different orders, so sorting ensures
// a consistent comparison against expected output.
// @tparam T: Type of elements in the inner vectors.
// @param result: The vector of vectors to sort.
// @return: A new sorted vector of vectors.
template <typename T>
std::vector<std::vector<T>> sort_result(std::vector<std::vector<T>> result) {
    // Sort each inner vector first (e.g., to treat {1,2} and {2,1} as the same for comparison purposes).
    for (auto& vec : result) {
        std::sort(vec.begin(), vec.end());
    }
    // Then sort the outer vector based on the content of inner vectors.
    std::sort(result.begin(), result.end(), [](const std::vector<T>& a, const std::vector<T>& b) {
        // Primary sort criterion: size of inner vector.
        if (a.size() != b.size()) return a.size() < b.size();
        // Secondary sort criterion: lexicographical comparison of inner vector elements.
        for (size_t i = 0; i < a.size(); ++i) {
            if (a[i] != b[i]) return a[i] < b[i];
        }
        return false; // Vectors are identical
    });
    return result;
}

// Special sorting function for N-Queens results.
// For N-Queens, inner vectors are strings (board rows) and should not be sorted internally.
// We only need to sort the outer vector of boards.
// @param result: The vector of vector<string> (boards) to sort.
// @return: A new sorted vector of boards.
std::vector<std::vector<std::string>> sort_nqueens_result(std::vector<std::vector<std::string>> result) {
    std::sort(result.begin(), result.end(), [](const std::vector<std::string>& a, const std::vector<std::string>& b) {
        if (a.size() != b.size()) return a.size() < b.size();
        for (size_t i = 0; i < a.size(); ++i) {
            if (a[i] != b[i]) return a[i] < b[i];
        }
        return false;
    });
    return result;
}

// --- Test functions for each problem ---

bool testSubsets() {
    std::cout << "--- Testing Subsets ---" << std::endl;

    // Test Case 1: Standard input with 3 elements
    std::vector<int> nums1 = {1, 2, 3};
    std::vector<std::vector<int>> expected1 = {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}};
    std::vector<std::vector<int>> result1 = BacktrackingProblems::subsets(nums1);
    ASSERT_TRUE(sort_result(result1) == sort_result(expected1), "Subsets Test Case 1 Failed");
    std::cout << "  Test Case 1 ({1,2,3}) passed." << std::endl;

    // Test Case 2: Empty input array
    std::vector<int> nums2 = {};
    std::vector<std::vector<int>> expected2 = {{}}; // The empty set has one subset: the empty set itself.
    std::vector<std::vector<int>> result2 = BacktrackingProblems::subsets(nums2);
    ASSERT_TRUE(sort_result(result2) == sort_result(expected2), "Subsets Test Case 2 Failed (empty)");
    std::cout << "  Test Case 2 (empty) passed." << std::endl;

    // Test Case 3: Single element array
    std::vector<int> nums3 = {0};
    std::vector<std::vector<int>> expected3 = {{}, {0}};
    std::vector<std::vector<int>> result3 = BacktrackingProblems::subsets(nums3);
    ASSERT_TRUE(sort_result(result3) == sort_result(expected3), "Subsets Test Case 3 Failed (single element)");
    std::cout << "  Test Case 3 (single element) passed." << std::endl;

    // Test Case 4: Larger input (elements out of order initially)
    std::vector<int> nums4 = {4, 1, 0};
    std::vector<std::vector<int>> expected4 = {{}, {0}, {1}, {4}, {0,1}, {0,4}, {1,4}, {0,1,4}};
    std::vector<std::vector<int>> result4 = BacktrackingProblems::subsets(nums4);
    // Note: The `subsets` function internally handles `start_index` to produce subsets in a way
    // that sorting internal elements `(0,1)` vs `(1,0)` and then sorting `result` will work.
    ASSERT_TRUE(sort_result(result4) == sort_result(expected4), "Subsets Test Case 4 Failed (larger, unsorted input)");
    std::cout << "  Test Case 4 (larger, unsorted input) passed." << std::endl;

    // Test for the Iterative Subsets approach for comparison
    std::vector<int> nums1_it = {1, 2, 3};
    std::vector<std::vector<int>> result1_it = BacktrackingProblems::subsetsIterative(nums1_it);
    ASSERT_TRUE(sort_result(result1_it) == sort_result(expected1), "Subsets Iterative Test Case 1 Failed");
    std::cout << "  Test Case 1 Iterative ({1,2,3}) passed." << std::endl;

    std::cout << "\033[32mAll Subsets tests passed!\033[0m" << std::endl << std::endl;
    return true;
}

bool testPermutations() {
    std::cout << "--- Testing Permutations ---" << std::endl;

    // Test Case 1: Standard input with 3 distinct elements
    std::vector<int> nums1 = {1, 2, 3};
    std::vector<std::vector<int>> expected1 = {
        {1, 2, 3}, {1, 3, 2}, {2, 1, 3}, {2, 3, 1}, {3, 1, 2}, {3, 2, 1}
    };
    std::vector<std::vector<int>> result1 = BacktrackingProblems::permutations(nums1);
    ASSERT_TRUE(sort_result(result1) == sort_result(expected1), "Permutations Test Case 1 Failed (swap)");
    std::cout << "  Test Case 1 ({1,2,3}, swap approach) passed." << std::endl;

    // Test Case 2: Empty input array (LeetCode expects {{}} for empty input for permutations)
    std::vector<int> nums2 = {};
    std::vector<std::vector<int>> expected2 = {{}};
    std::vector<std::vector<int>> result2 = BacktrackingProblems::permutations(nums2);
    ASSERT_TRUE(sort_result(result2) == sort_result(expected2), "Permutations Test Case 2 Failed (empty)");
    std::cout << "  Test Case 2 (empty) passed." << std::endl;

    // Test Case 3: Single element array
    std::vector<int> nums3 = {0};
    std::vector<std::vector<int>> expected3 = {{0}};
    std::vector<std::vector<int>> result3 = BacktrackingProblems::permutations(nums3);
    ASSERT_TRUE(sort_result(result3) == sort_result(expected3), "Permutations Test Case 3 Failed (single element)");
    std::cout << "  Test Case 3 (single element) passed." << std::endl;

    // Test Case 4: Two elements
    std::vector<int> nums4 = {1, 0};
    std::vector<std::vector<int>> expected4 = {{1, 0}, {0, 1}};
    std::vector<std::vector<int>> result4 = BacktrackingProblems::permutations(nums4);
    ASSERT_TRUE(sort_result(result4) == sort_result(expected4), "Permutations Test Case 4 Failed (two elements)");
    std::cout << "  Test Case 4 (two elements) passed." << std::endl;

    // Test for the Permutations Visited approach for comparison
    std::vector<int> nums1_vis = {1, 2, 3};
    std::vector<std::vector<int>> result1_vis = BacktrackingProblems::permutationsVisited(nums1_vis);
    ASSERT_TRUE(sort_result(result1_vis) == sort_result(expected1), "Permutations Visited Test Case 1 Failed");
    std::cout << "  Test Case 1 ({1,2,3}, visited approach) passed." << std::endl;

    std::cout << "\033[32mAll Permutations tests passed!\033[0m" << std::endl << std::endl;
    return true;
}

bool testCombinationSum2() {
    std::cout << "--- Testing Combination Sum II ---" << std::endl;

    // Test Case 1: Standard input with duplicates in candidates
    std::vector<int> candidates1 = {10, 1, 2, 7, 6, 1, 5};
    int target1 = 8;
    std::vector<std::vector<int>> expected1 = {
        {1, 1, 6}, {1, 2, 5}, {1, 7}, {2, 6}
    };
    std::vector<std::vector<int>> result1 = BacktrackingProblems::combinationSum2(candidates1, target1);
    ASSERT_TRUE(sort_result(result1) == sort_result(expected1), "Combination Sum II Test Case 1 Failed");
    std::cout << "  Test Case 1 (candidates={10,1,2,7,6,1,5}, target=8) passed." << std::endl;

    // Test Case 2: Another standard input with duplicates
    std::vector<int> candidates2 = {2, 5, 2, 1, 2};
    int target2 = 5;
    std::vector<std::vector<int>> expected2 = {
        {1, 2, 2}, {5}
    };
    std::vector<std::vector<int>> result2 = BacktrackingProblems::combinationSum2(candidates2, target2);
    ASSERT_TRUE(sort_result(result2) == sort_result(expected2), "Combination Sum II Test Case 2 Failed");
    std::cout << "  Test Case 2 (candidates={2,5,2,1,2}, target=5) passed." << std::endl;

    // Test Case 3: No solution possible
    std::vector<int> candidates3 = {2, 3, 6, 7};
    int target3 = 1;
    std::vector<std::vector<int>> expected3 = {};
    std::vector<std::vector<int>> result3 = BacktrackingProblems::combinationSum2(candidates3, target3);
    ASSERT_TRUE(sort_result(result3) == sort_result(expected3), "Combination Sum II Test Case 3 Failed (no solution)");
    std::cout << "  Test Case 3 (no solution) passed." << std::endl;

    // Test Case 4: Target is 0 (should yield an empty combination)
    std::vector<int> candidates4 = {1, 2};
    int target4 = 0;
    std::vector<std::vector<int>> expected4 = {{}};
    std::vector<std::vector<int>> result4 = BacktrackingProblems::combinationSum2(candidates4, target4);
    ASSERT_TRUE(sort_result(result4) == sort_result(expected4), "Combination Sum II Test Case 4 Failed (target 0)");
    std::cout << "  Test Case 4 (target 0) passed." << std::endl;

    // Test Case 5: All identical numbers
    std::vector<int> candidates5 = {1, 1, 1, 1};
    int target5 = 2;
    std::vector<std::vector<int>> expected5 = {{1, 1}};
    std::vector<std::vector<int>> result5 = BacktrackingProblems::combinationSum2(candidates5, target5);
    ASSERT_TRUE(sort_result(result5) == sort_result(expected5), "Combination Sum II Test Case 5 Failed (all identical)");
    std::cout << "  Test Case 5 (all identical) passed." << std::endl;
    
    // Test Case 6: Duplicates at the beginning, target 3
    std::vector<int> candidates6 = {1,1,1,2,2};
    int target6 = 3;
    std::vector<std::vector<int>> expected6 = {{1,1,1}, {1,2}};
    std::vector<std::vector<int>> result6 = BacktrackingProblems::combinationSum2(candidates6, target6);
    ASSERT_TRUE(sort_result(result6) == sort_result(expected6), "Combination Sum II Test Case 6 Failed (duplicates at start)");
    std::cout << "  Test Case 6 (duplicates at start) passed." << std::endl;


    std::cout << "\033[32mAll Combination Sum II tests passed!\033[0m" << std::endl << std::endl;
    return true;
}

bool testNQueens() {
    std::cout << "--- Testing N-Queens ---" << std::endl;

    // Test Case 1: n = 1 (1 solution)
    int n1 = 1;
    std::vector<std::vector<std::string>> expected1 = {{"Q"}};
    std::vector<std::vector<std::string>> result1 = BacktrackingProblems::solveNQueens(n1);
    ASSERT_TRUE(sort_nqueens_result(result1) == sort_nqueens_result(expected1), "N-Queens Test Case 1 Failed (n=1)");
    std::cout << "  Test Case 1 (n=1) passed." << std::endl;

    // Test Case 2: n = 4 (2 solutions)
    int n4 = 4;
    std::vector<std::vector<std::string>> expected4 = {
        {".Q..", "...Q", "Q...", "..Q."},
        {"..Q.", "Q...", "...Q", ".Q.."}
    };
    std::vector<std::vector<std::string>> result4 = BacktrackingProblems::solveNQueens(n4);
    ASSERT_TRUE(sort_nqueens_result(result4) == sort_nqueens_result(expected4), "N-Queens Test Case 2 Failed (n=4)");
    std::cout << "  Test Case 2 (n=4) passed." << std::endl;

    // Test Case 3: n = 0 (0 solutions, empty board handled)
    int n0 = 0;
    std::vector<std::vector<std::string>> expected0 = {};
    std::vector<std::vector<std::string>> result0 = BacktrackingProblems::solveNQueens(n0);
    ASSERT_TRUE(sort_nqueens_result(result0) == sort_nqueens_result(expected0), "N-Queens Test Case 3 Failed (n=0)");
    std::cout << "  Test Case 3 (n=0) passed." << std::endl;

    // Test Case 4: n = 2 (no solutions)
    int n2 = 2;
    std::vector<std::vector<std::string>> expected2 = {};
    std::vector<std::vector<std::string>> result2 = BacktrackingProblems::solveNQueens(n2);
    ASSERT_TRUE(sort_nqueens_result(result2) == sort_nqueens_result(expected2), "N-Queens Test Case 4 Failed (n=2, no solutions)");
    std::cout << "  Test Case 4 (n=2, no solutions) passed." << std::endl;

    // Test Case 5: n = 3 (no solutions)
    int n3 = 3;
    std::vector<std::vector<std::string>> expected3 = {};
    std::vector<std::vector<std::string>> result3 = BacktrackingProblems::solveNQueens(n3);
    ASSERT_TRUE(sort_nqueens_result(result3) == sort_nqueens_result(expected3), "N-Queens Test Case 5 Failed (n=3, no solutions)");
    std::cout << "  Test Case 5 (n=3, no solutions) passed." << std::endl;

    // Test Case 6: n = 5 (10 solutions) - just check count
    int n5 = 5;
    std::vector<std::vector<std::string>> result5 = BacktrackingProblems::solveNQueens(n5);
    ASSERT_TRUE(result5.size() == 10, "N-Queens Test Case 6 Failed (n=5, solution count)");
    std::cout << "  Test Case 6 (n=5, count " << result5.size() << ") passed." << std::endl;

    // Test Case 7: n = 6 (4 solutions) - just check count
    int n6 = 6;
    std::vector<std::vector<std::string>> result6 = BacktrackingProblems::solveNQueens(n6);
    ASSERT_TRUE(result6.size() == 4, "N-Queens Test Case 7 Failed (n=6, solution count)");
    std::cout << "  Test Case 7 (n=6, count " << result6.size() << ") passed." << std::endl;

    std::cout << "\033[32mAll N-Queens tests passed!\033[0m" << std::endl << std::endl;
    return true;
}

// Function to run all defined test cases
void runAllTests() {
    bool allPassed = true;
    allPassed &= testSubsets();
    allPassed &= testPermutations();
    allPassed &= testCombinationSum2();
    allPassed &= testNQueens();

    if (allPassed) {
        std::cout << "\033[32m============================================\033[0m" << std::endl;
        std::cout << "\033[32mAll Backtracking tests passed successfully!\033[0m" << std::endl;
        std::cout << "\033[32m============================================\033[0m" << std::endl;
    } else {
        std::cerr << "\033[31m==================================\033[0m" << std::endl;
        std::cerr << "\033[31mSome Backtracking tests FAILED!\033[0m" << std::endl;
        std::cerr << "\033[31m==================================\033[0m" << std::endl;
    }
}
```