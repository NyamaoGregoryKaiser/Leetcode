```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::sort

#include "src/NQueens.hpp"
#include "src/SubsetsII.hpp"
#include "src/PermutationsII.hpp"
#include "src/CombinationSumIII.hpp"
#include "src/WordSearch.hpp"
#include "utils/helpers.hpp"

// Test function declarations
bool testNQueens();
bool testSubsetsII();
bool testPermutationsII();
bool testCombinationSumIII();
bool testWordSearch();

int main() {
    std::cout << "Starting all tests...\n\n";

    bool all_passed = true;

    if (!testNQueens()) {
        all_passed = false;
        std::cerr << "\nN-Queens tests FAILED.\n";
    } else {
        std::cout << "\nN-Queens tests PASSED.\n";
    }

    if (!testSubsetsII()) {
        all_passed = false;
        std::cerr << "\nSubsets II tests FAILED.\n";
    } else {
        std::cout << "\nSubsets II tests PASSED.\n";
    }

    if (!testPermutationsII()) {
        all_passed = false;
        std::cerr << "\nPermutations II tests FAILED.\n";
    } else {
        std::cout << "\nPermutations II tests PASSED.\n";
    }

    if (!testCombinationSumIII()) {
        all_passed = false;
        std::cerr << "\nCombination Sum III tests FAILED.\n";
    } else {
        std::cout << "\nCombination Sum III tests PASSED.\n";
    }

    if (!testWordSearch()) {
        all_passed = false;
        std::cerr << "\nWord Search tests FAILED.\n";
    } else {
        std::cout << "\nWord Search tests PASSED.\n";
    }

    std::cout << "\n-----------------------------------\n";
    if (all_passed) {
        std::cout << "All tests PASSED!\n";
        return 0;
    } else {
        std::cout << "Some tests FAILED!\n";
        return 1;
    }
}

// --- N-Queens Tests ---
bool testNQueens() {
    std::cout << "--- Running N-Queens Tests ---\n";
    NQueens solver;
    std::vector<std::vector<std::string>> actual;
    std::vector<std::vector<std::string>> expected;

    // Test Case 1: n = 1
    actual = solver.solveNQueens(1);
    expected = {{"Q"}};
    if (!utils::compare_nqueens_solutions(actual, expected)) return false;
    std::cout << "PASSED: N-Queens n=1\n";

    // Test Case 2: n = 2 (No solutions)
    actual = solver.solveNQueens(2);
    expected = {};
    if (!utils::compare_nqueens_solutions(actual, expected)) return false;
    std::cout << "PASSED: N-Queens n=2 (no solutions)\n";

    // Test Case 3: n = 3 (No solutions)
    actual = solver.solveNQueens(3);
    expected = {};
    if (!utils::compare_nqueens_solutions(actual, expected)) return false;
    std::cout << "PASSED: N-Queens n=3 (no solutions)\n";

    // Test Case 4: n = 4
    actual = solver.solveNQueens(4);
    expected = {
        {".Q..", "...Q", "Q...", "..Q."},
        {"..Q.", "Q...", "...Q", ".Q.."}
    };
    if (!utils::compare_nqueens_solutions(actual, expected)) return false;
    std::cout << "PASSED: N-Queens n=4\n";

    // Test Case 5: n = 0 (Edge case)
    actual = solver.solveNQueens(0);
    expected = {};
    if (!utils::compare_nqueens_solutions(actual, expected)) return false;
    std::cout << "PASSED: N-Queens n=0 (edge case)\n";

    // Test Case 6: n = 5 (More complex)
    // Expected solutions for N=5: 10 unique solutions
    actual = solver.solveNQueens(5);
    if (actual.size() != 10) {
        std::cerr << "FAILED: N-Queens n=5. Expected 10 solutions, got " << actual.size() << ".\n";
        return false;
    }
    std::cout << "PASSED: N-Queens n=5 (correct number of solutions)\n";

    return true;
}

// --- Subsets II Tests ---
bool testSubsetsII() {
    std::cout << "--- Running Subsets II Tests ---\n";
    SubsetsII solver;
    std::vector<int> nums;
    std::vector<std::vector<int>> actual;
    std::vector<std::vector<int>> expected;

    // Test Case 1: Basic with duplicates
    nums = {1, 2, 2};
    actual = solver.subsetsWithDup(nums);
    expected = {{}, {1}, {1,2}, {1,2,2}, {2}, {2,2}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Subsets II [1,2,2]\n";

    // Test Case 2: No duplicates
    nums = {1, 2, 3};
    actual = solver.subsetsWithDup(nums);
    expected = {{}, {1}, {1,2}, {1,2,3}, {1,3}, {2}, {2,3}, {3}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Subsets II [1,2,3] (no duplicates)\n";

    // Test Case 3: All duplicates
    nums = {3, 3, 3};
    actual = solver.subsetsWithDup(nums);
    expected = {{}, {3}, {3,3}, {3,3,3}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Subsets II [3,3,3]\n";

    // Test Case 4: Empty input
    nums = {};
    actual = solver.subsetsWithDup(nums);
    expected = {{}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Subsets II [] (empty input)\n";

    // Test Case 5: Single element
    nums = {0};
    actual = solver.subsetsWithDup(nums);
    expected = {{}, {0}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Subsets II [0]\n";
    
    // Test Case 6: Mixed order, duplicates
    nums = {4,1,4,4};
    actual = solver.subsetsWithDup(nums);
    expected = {
        {}, {1}, {1,4}, {1,4,4}, {1,4,4,4},
        {4}, {4,4}, {4,4,4}
    };
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Subsets II [4,1,4,4]\n";

    return true;
}

// --- Permutations II Tests ---
bool testPermutationsII() {
    std::cout << "--- Running Permutations II Tests ---\n";
    PermutationsII solver;
    std::vector<int> nums;
    std::vector<std::vector<int>> actual;
    std::vector<std::vector<int>> expected;

    // Test Case 1: Basic with duplicates
    nums = {1, 1, 2};
    actual = solver.permuteUnique(nums);
    expected = {{1,1,2}, {1,2,1}, {2,1,1}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Permutations II [1,1,2]\n";

    // Test Case 2: No duplicates
    nums = {1, 2, 3};
    actual = solver.permuteUnique(nums);
    expected = {{1,2,3}, {1,3,2}, {2,1,3}, {2,3,1}, {3,1,2}, {3,2,1}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Permutations II [1,2,3] (no duplicates)\n";

    // Test Case 3: All duplicates
    nums = {2, 2, 2};
    actual = solver.permuteUnique(nums);
    expected = {{2,2,2}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Permutations II [2,2,2]\n";

    // Test Case 4: Empty input
    nums = {};
    actual = solver.permuteUnique(nums);
    expected = {{}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Permutations II [] (empty input)\n";

    // Test Case 5: Single element
    nums = {7};
    actual = solver.permuteUnique(nums);
    expected = {{7}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Permutations II [7]\n";

    return true;
}

// --- Combination Sum III Tests ---
bool testCombinationSumIII() {
    std::cout << "--- Running Combination Sum III Tests ---\n";
    CombinationSumIII solver;
    std::vector<std::vector<int>> actual;
    std::vector<std::vector<int>> expected;

    // Test Case 1: k=3, n=7
    actual = solver.combinationSum3(3, 7);
    expected = {{1,2,4}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Combination Sum III k=3, n=7\n";

    // Test Case 2: k=3, n=9
    actual = solver.combinationSum3(3, 9);
    expected = {{1,2,6}, {1,3,5}, {2,3,4}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Combination Sum III k=3, n=9\n";

    // Test Case 3: k=4, n=1
    actual = solver.combinationSum3(4, 1);
    expected = {}; // No solution
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Combination Sum III k=4, n=1 (no solution)\n";

    // Test Case 4: k=2, n=18 (impossible with distinct 1-9)
    actual = solver.combinationSum3(2, 18);
    expected = {};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Combination Sum III k=2, n=18 (impossible)\n";

    // Test Case 5: k=1, n=5
    actual = solver.combinationSum3(1, 5);
    expected = {{5}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Combination Sum III k=1, n=5\n";

    // Test Case 6: k=9, n=45 (sum of 1-9)
    actual = solver.combinationSum3(9, 45);
    expected = {{1,2,3,4,5,6,7,8,9}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Combination Sum III k=9, n=45\n";

    // Test Case 7: k=2, n=10
    actual = solver.combinationSum3(2, 10);
    expected = {{1,9}, {2,8}, {3,7}, {4,6}};
    if (!utils::compare_vector_of_vectors(actual, expected)) return false;
    std::cout << "PASSED: Combination Sum III k=2, n=10\n";

    return true;
}

// --- Word Search Tests ---
bool testWordSearch() {
    std::cout << "--- Running Word Search Tests ---\n";
    WordSearch solver;
    std::vector<std::vector<char>> board;
    std::string word;
    bool actual;
    bool expected;

    // Test Case 1: Word found
    board = {
        {'A','B','C','E'},
        {'S','F','C','S'},
        {'A','D','E','E'}
    };
    word = "ABCCED";
    actual = solver.exist(board, word);
    expected = true;
    ASSERT_EQ(actual, expected, "Word Search ABCCED found");

    // Test Case 2: Word found (different path)
    board = {
        {'A','B','C','E'},
        {'S','F','C','S'},
        {'A','D','E','E'}
    };
    word = "SEE";
    actual = solver.exist(board, word);
    expected = true;
    ASSERT_EQ(actual, expected, "Word Search SEE found");

    // Test Case 3: Word not found
    board = {
        {'A','B','C','E'},
        {'S','F','C','S'},
        {'A','D','E','E'}
    };
    word = "ABCB";
    actual = solver.exist(board, word);
    expected = false;
    ASSERT_EQ(actual, expected, "Word Search ABCB not found");

    // Test Case 4: Single cell board, matching word
    board = {{'A'}};
    word = "A";
    actual = solver.exist(board, word);
    expected = true;
    ASSERT_EQ(actual, expected, "Word Search single cell 'A' found");

    // Test Case 5: Single cell board, non-matching word
    board = {{'A'}};
    word = "B";
    actual = solver.exist(board, word);
    expected = false;
    ASSERT_EQ(actual, expected, "Word Search single cell 'B' not found");

    // Test Case 6: Empty board
    board = {};
    word = "A";
    actual = solver.exist(board, word);
    expected = false;
    ASSERT_EQ(actual, expected, "Word Search empty board");

    // Test Case 7: Empty word
    board = {{'A'}};
    word = "";
    actual = solver.exist(board, word);
    expected = true; // Conventionally true
    ASSERT_EQ(actual, expected, "Word Search empty word");

    // Test Case 8: Long word
    board = {
        {'A','B','C','D'},
        {'E','F','G','H'},
        {'I','J','K','L'}
    };
    word = "ABCGK"; // Path A->B->C->G->K
    actual = solver.exist(board, word);
    expected = true;
    ASSERT_EQ(actual, expected, "Word Search ABCGK found");
    
    // Test Case 9: Word cannot reuse cells
    board = {{'A','A'}};
    word = "AAA";
    actual = solver.exist(board, word);
    expected = false;
    ASSERT_EQ(actual, expected, "Word Search 'AAA' cannot reuse cells");


    return true;
}
```