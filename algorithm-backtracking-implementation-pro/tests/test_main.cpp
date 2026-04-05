#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::sort
#include <set>       // For comparing sets of vectors
#include "../src/backtracking_solver.hpp"
#include "../src/utils.hpp"

// Simple custom assertion macro
#define ASSERT_EQ(actual, expected, message) \
    do {                                     \
        if ((actual) != (expected)) {        \
            std::cerr << "FAIL: " << message << "\n" \
                      << "  Expected: " << (expected) << "\n" \
                      << "  Actual:   " << (actual) << "\n"; \
            test_failed = true;              \
        } else {                             \
            std::cout << "PASS: " << message << "\n"; \
        }                                    \
    } while (0)

#define ASSERT_TRUE(condition, message) \
    do {                                \
        if (!(condition)) {             \
            std::cerr << "FAIL: " << message << "\n" \
                      << "  Condition was false.\n"; \
            test_failed = true;         \
        } else {                        \
            std::cout << "PASS: " << message << "\n"; \
        }                               \
    } while (0)

// Helper for comparing vector of vectors (order-agnostic)
template <typename T>
bool compare_vector_of_vectors(const std::vector<std::vector<T>>& actual,
                               const std::vector<std::vector<T>>& expected) {
    if (actual.size() != expected.size()) {
        return false;
    }
    // Convert to set of sets to ignore order of inner vectors and elements
    // For comparing sets of vectors, inner vectors must be sorted.
    std::set<std::vector<T>> actual_set;
    for (auto v : actual) { // Copy to sort
        std::sort(v.begin(), v.end());
        actual_set.insert(v);
    }

    std::set<std::vector<T>> expected_set;
    for (auto v : expected) { // Copy to sort
        std::sort(v.begin(), v.end());
        expected_set.insert(v);
    }
    return actual_set == expected_set;
}

// Specialization for N-Queens (vector of strings)
template <>
bool compare_vector_of_vectors<std::string>(const std::vector<std::vector<std::string>>& actual,
                                             const std::vector<std::vector<std::string>>& expected) {
    if (actual.size() != expected.size()) {
        return false;
    }
    // N-Queens solutions are typically compared as sets of boards (vector of strings),
    // where the order of solutions doesn't matter, but the internal order of rows within a board does.
    std::set<std::vector<std::string>> actual_set(actual.begin(), actual.end());
    std::set<std::vector<std::string>> expected_set(expected.begin(), expected.end());
    return actual_set == expected_set;
}

// Test function for N-Queens
void test_n_queens(bool& test_failed) {
    std::cout << "\n--- Testing N-Queens ---\n";

    // N=1
    std::vector<std::vector<std::string>> n1_expected = {{"Q"}};
    auto n1_actual = Backtracking::solveNQueens(1);
    ASSERT_TRUE(compare_vector_of_vectors(n1_actual, n1_expected), "N=1: Should find 1 solution.");
    if (!compare_vector_of_vectors(n1_actual, n1_expected)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(n1_actual);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(n1_expected);
    }

    // N=2, N=3 should have no solutions
    ASSERT_EQ(Backtracking::solveNQueens(2).size(), 0, "N=2: Should find 0 solutions.");
    ASSERT_EQ(Backtracking::solveNQueens(3).size(), 0, "N=3: Should find 0 solutions.");

    // N=4
    std::vector<std::vector<std::string>> n4_expected = {
        {".Q..", "...Q", "Q...", "..Q."},
        {"..Q.", "Q...", "...Q", ".Q.."}
    };
    auto n4_actual = Backtracking::solveNQueens(4);
    ASSERT_TRUE(compare_vector_of_vectors(n4_actual, n4_expected), "N=4: Should find 2 solutions.");
    if (!compare_vector_of_vectors(n4_actual, n4_expected)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(n4_actual);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(n4_expected);
    }

    // N=8 (just check count, full output is too large)
    ASSERT_EQ(Backtracking::solveNQueens(8).size(), 92, "N=8: Should find 92 solutions.");
}

// Test function for Sudoku Solver
void test_sudoku_solver(bool& test_failed) {
    std::cout << "\n--- Testing Sudoku Solver ---\n";

    // Test case 1: Standard solvable board
    std::vector<std::vector<char>> board1 = {
        {'5','3','.','.','7','.','.','.','.'},
        {'6','.','.','1','9','5','.','.','.'},
        {'.','9','8','.','.','.','.','6','.'},
        {'8','.','.','.','6','.','.','.','3'},
        {'4','.','.','8','.','3','.','.','1'},
        {'7','.','.','.','2','.','.','.','6'},
        {'.','6','.','.','.','.','2','8','.'},
        {'.','.','.','4','1','9','.','.','5'},
        {'.','.','.','.','8','.','.','7','9'}
    };
    std::vector<std::vector<char>> solved_board1 = {
        {'5','3','4','6','7','8','9','1','2'},
        {'6','7','2','1','9','5','3','4','8'},
        {'1','9','8','3','4','2','5','6','7'},
        {'8','5','9','7','6','1','4','2','3'},
        {'4','2','6','8','5','3','7','9','1'},
        {'7','1','3','9','2','4','8','5','6'},
        {'9','6','1','5','3','7','2','8','4'},
        {'2','8','7','4','1','9','6','3','5'},
        {'3','4','5','2','8','6','1','7','9'}
    };
    Backtracking::solveSudoku(board1);
    ASSERT_TRUE(board1 == solved_board1, "Sudoku Test 1: Solves a standard board correctly.");
    if (!(board1 == solved_board1)) {
        std::cerr << "Actual:\n"; Utils::print_sudoku_board(board1);
        std::cerr << "Expected:\n"; Utils::print_sudoku_board(solved_board1);
    }

    // Test case 2: Board with more empty cells (harder)
    std::vector<std::vector<char>> board2 = {
        {'.','.','9','7','4','8','.','.','.'},
        {'7','.','.','.','.','.','.','.','.'},
        {'.','2','.','1','.','9','.','.','.'},
        {'.','.','7','.','.','.','2','4','.'},
        {'.','6','4','.','1','.','5','9','.'},
        {'.','9','8','.','.','.','3','.','.'},
        {'.','.','.','8','.','3','.','2','.'},
        {'.','.','.','.','.','.','.','.','6'},
        {'.','.','.','2','7','5','9','.','.'}
    };
    std::vector<std::vector<char>> solved_board2 = {
        {'1','3','9','7','4','8','6','5','2'},
        {'7','4','6','5','9','2','1','3','8'},
        {'8','2','5','1','3','9','7','6','4'},
        {'3','5','7','6','8','1','2','4','9'},
        {'2','6','4','3','1','7','5','9','8'},
        {'4','9','8','2','5','6','3','1','7'},
        {'9','1','3','8','6','4','2','7','5'},
        {'5','8','2','9','7','3','4','1','6'},
        {'6','7','1','2','7','5','9','8','3'}
    };
    solved_board2[8][4] = '4'; // Fix a typo in manual expected solution. It should be 4 not 7
    Backtracking::solveSudoku(board2);
    ASSERT_TRUE(board2 == solved_board2, "Sudoku Test 2: Solves a harder board correctly.");
    if (!(board2 == solved_board2)) {
        std::cerr << "Actual:\n"; Utils::print_sudoku_board(board2);
        std::cerr << "Expected:\n"; Utils::print_sudoku_board(solved_board2);
    }
}

// Test function for Permutations
void test_permutations(bool& test_failed) {
    std::cout << "\n--- Testing Permutations ---\n";

    // Test case 1: Empty input
    std::vector<int> nums0 = {};
    auto actual0 = Backtracking::permute(nums0);
    std::vector<std::vector<int>> expected0 = {}; // Or {{}} depending on definition
    ASSERT_TRUE(compare_vector_of_vectors(actual0, expected0), "Permutations Test 0: Empty input.");
    if (!compare_vector_of_vectors(actual0, expected0)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(actual0);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(expected0);
    }

    // Test case 1: Single element
    std::vector<int> nums1 = {1};
    auto actual1 = Backtracking::permute(nums1);
    std::vector<std::vector<int>> expected1 = {{1}};
    ASSERT_TRUE(compare_vector_of_vectors(actual1, expected1), "Permutations Test 1: Single element.");
    if (!compare_vector_of_vectors(actual1, expected1)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(actual1);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(expected1);
    }

    // Test case 2: Two elements
    std::vector<int> nums2 = {1, 2};
    auto actual2 = Backtracking::permute(nums2);
    std::vector<std::vector<int>> expected2 = {{1, 2}, {2, 1}};
    ASSERT_TRUE(compare_vector_of_vectors(actual2, expected2), "Permutations Test 2: Two elements.");
    if (!compare_vector_of_vectors(actual2, expected2)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(actual2);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(expected2);
    }

    // Test case 3: Three elements
    std::vector<int> nums3 = {1, 2, 3};
    auto actual3 = Backtracking::permute(nums3);
    std::vector<std::vector<int>> expected3 = {
        {1, 2, 3}, {1, 3, 2}, {2, 1, 3}, {2, 3, 1}, {3, 1, 2}, {3, 2, 1}
    };
    ASSERT_TRUE(compare_vector_of_vectors(actual3, expected3), "Permutations Test 3: Three elements.");
    if (!compare_vector_of_vectors(actual3, expected3)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(actual3);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(expected3);
    }
}

// Test function for Subsets
void test_subsets(bool& test_failed) {
    std::cout << "\n--- Testing Subsets ---\n";

    // Test case 1: Empty input
    std::vector<int> nums0 = {};
    auto actual0 = Backtracking::subsets(nums0);
    std::vector<std::vector<int>> expected0 = {{}};
    ASSERT_TRUE(compare_vector_of_vectors(actual0, expected0), "Subsets Test 0: Empty input.");
    if (!compare_vector_of_vectors(actual0, expected0)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(actual0);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(expected0);
    }

    // Test case 2: Single element
    std::vector<int> nums1 = {1};
    auto actual1 = Backtracking::subsets(nums1);
    std::vector<std::vector<int>> expected1 = {{}, {1}};
    ASSERT_TRUE(compare_vector_of_vectors(actual1, expected1), "Subsets Test 1: Single element.");
    if (!compare_vector_of_vectors(actual1, expected1)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(actual1);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(expected1);
    }

    // Test case 3: Multiple elements
    std::vector<int> nums3 = {1, 2, 3};
    auto actual3 = Backtracking::subsets(nums3);
    std::vector<std::vector<int>> expected3 = {
        {}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}
    };
    ASSERT_TRUE(compare_vector_of_vectors(actual3, expected3), "Subsets Test 2: Multiple elements.");
    if (!compare_vector_of_vectors(actual3, expected3)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(actual3);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(expected3);
    }
    
    // Test case 4: Four elements
    std::vector<int> nums4 = {4, 1, 0, 2}; // Unsorted input to check correctness
    auto actual4 = Backtracking::subsets(nums4);
    std::vector<std::vector<int>> expected4 = {
        {}, {4}, {1}, {0}, {2},
        {4,1}, {4,0}, {4,2}, {1,0}, {1,2}, {0,2},
        {4,1,0}, {4,1,2}, {4,0,2}, {1,0,2},
        {4,1,0,2}
    };
    ASSERT_TRUE(compare_vector_of_vectors(actual4, expected4), "Subsets Test 3: Four elements.");
    if (!compare_vector_of_vectors(actual4, expected4)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(actual4);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(expected4);
    }
}

// Test function for Optimized Subsets (iterative bit manipulation)
void test_optimized_subsets(bool& test_failed) {
    std::cout << "\n--- Testing Optimized Subsets (Iterative) ---\n";

    // Test case 1: Empty input
    std::vector<int> nums0 = {};
    auto actual0 = OptimizedBacktracking::subsetsIterative(nums0);
    std::vector<std::vector<int>> expected0 = {{}};
    ASSERT_TRUE(compare_vector_of_vectors(actual0, expected0), "Optimized Subsets Test 0: Empty input.");
    if (!compare_vector_of_vectors(actual0, expected0)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(actual0);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(expected0);
    }

    // Test case 2: Single element
    std::vector<int> nums1 = {1};
    auto actual1 = OptimizedBacktracking::subsetsIterative(nums1);
    std::vector<std::vector<int>> expected1 = {{}, {1}};
    ASSERT_TRUE(compare_vector_of_vectors(actual1, expected1), "Optimized Subsets Test 1: Single element.");
    if (!compare_vector_of_vectors(actual1, expected1)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(actual1);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(expected1);
    }

    // Test case 3: Multiple elements
    std::vector<int> nums3 = {1, 2, 3};
    auto actual3 = OptimizedBacktracking::subsetsIterative(nums3);
    std::vector<std::vector<int>> expected3 = {
        {}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}
    };
    ASSERT_TRUE(compare_vector_of_vectors(actual3, expected3), "Optimized Subsets Test 2: Multiple elements.");
    if (!compare_vector_of_vectors(actual3, expected3)) {
        std::cerr << "Actual:\n"; Utils::print_vector_of_vectors(actual3);
        std::cerr << "Expected:\n"; Utils::print_vector_of_vectors(expected3);
    }
}


int main() {
    bool test_failed = false;

    test_n_queens(test_failed);
    test_sudoku_solver(test_failed);
    test_permutations(test_failed);
    test_subsets(test_failed);
    test_optimized_subsets(test_failed);

    if (test_failed) {
        std::cerr << "\n--- Some tests FAILED ---\n";
        return 1;
    } else {
        std::cout << "\n--- All tests PASSED ---\n";
        return 0;
    }
}