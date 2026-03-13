#include "gtest/gtest.h"
#include "main_dp_problems.cpp"      // Include main DP implementations
#include "brute_force_solutions.cpp" // Include brute force for comparison
#include "optimized_space.cpp"       // Include space optimized solutions
#include "test_data.hpp"             // Test cases

// --- Fibonacci Number Tests ---
TEST(FibonacciTest, Memoization_Correctness) {
    for (const auto& tc : fibonacci_test_cases) {
        if (tc.n < 0) continue; // Skip negative for direct comparison with brute force if it doesn't handle.
        EXPECT_EQ(DPProblems::fibonacci_memoization(tc.n), tc.expected)
            << "Input n: " << tc.n;
    }
}

TEST(FibonacciTest, Tabulation_Correctness) {
    for (const auto& tc : fibonacci_test_cases) {
        if (tc.n < 0) continue;
        EXPECT_EQ(DPProblems::fibonacci_tabulation(tc.n), tc.expected)
            << "Input n: " << tc.n;
    }
}

TEST(FibonacciTest, BruteForce_Correctness_SmallN) {
    // Brute force is too slow for large N, test only small values.
    for (const auto& tc : fibonacci_test_cases) {
        if (tc.n < 0) continue;
        if (tc.n <= 20) { // Limit for brute force
            EXPECT_EQ(BruteForceDP::fibonacci_brute_force(tc.n), tc.expected)
                << "Input n: " << tc.n;
        }
    }
}

TEST(FibonacciTest, O1Space_Correctness) {
    for (const auto& tc : fibonacci_test_cases) {
        if (tc.n < 0) continue;
        EXPECT_EQ(OptimizedSpaceDP::fibonacci_o1_space(tc.n), tc.expected)
            << "Input n: " << tc.n;
    }
}

// --- Longest Common Subsequence (LCS) Tests ---
TEST(LCSTest, Tabulation_Correctness) {
    for (const auto& tc : lcs_test_cases) {
        EXPECT_EQ(DPProblems::longest_common_subsequence(tc.text1, tc.text2), tc.expected)
            << "Text1: " << tc.text1 << ", Text2: " << tc.text2;
    }
}

TEST(LCSTest, BruteForce_Correctness_SmallInputs) {
    for (const auto& tc : lcs_test_cases) {
        // Brute force LCS is extremely slow. Limit string lengths for tests.
        if (tc.text1.length() <= 10 && tc.text2.length() <= 10) {
            EXPECT_EQ(BruteForceDP::longest_common_subsequence_brute_force(tc.text1, tc.text2), tc.expected)
                << "Text1: " << tc.text1 << ", Text2: " << tc.text2;
        }
    }
}

TEST(LCSTest, ONS_Space_Correctness) {
    for (const auto& tc : lcs_test_cases) {
        EXPECT_EQ(OptimizedSpaceDP::longest_common_subsequence_o_n_space(tc.text1, tc.text2), tc.expected)
            << "Text1: " << tc.text1 << ", Text2: " << tc.text2;
    }
}


// --- 0/1 Knapsack Tests ---
TEST(KnapsackTest, Tabulation_Correctness) {
    for (const auto& tc : knapsack_test_cases) {
        EXPECT_EQ(DPProblems::knapsack_01_tabulation(tc.weights, tc.values, tc.W), tc.expected)
            << "Weights: " << Helpers::print_vector(tc.weights, "", false)
            << ", Values: " << Helpers::print_vector(tc.values, "", false)
            << ", Capacity: " << tc.W;
    }
}

TEST(KnapsackTest, BruteForce_Correctness_SmallInputs) {
    for (const auto& tc : knapsack_test_cases) {
        // Brute force knapsack is 2^N, limit N for tests
        if (tc.weights.size() <= 10) { // Limit number of items for brute force
             EXPECT_EQ(BruteForceDP::knapsack_01_brute_force(tc.weights, tc.values, tc.W), tc.expected)
                << "Weights: " << Helpers::print_vector(tc.weights, "", false)
                << ", Values: " << Helpers::print_vector(tc.values, "", false)
                << ", Capacity: " << tc.W;
        }
    }
}

TEST(KnapsackTest, OW_Space_Correctness) {
    for (const auto& tc : knapsack_test_cases) {
        EXPECT_EQ(OptimizedSpaceDP::knapsack_01_o_w_space(tc.weights, tc.values, tc.W), tc.expected)
            << "Weights: " << Helpers::print_vector(tc.weights, "", false)
            << ", Values: " << Helpers::print_vector(tc.values, "", false)
            << ", Capacity: " << tc.W;
    }
}


// --- Coin Change (Minimum Coins) Tests ---
TEST(CoinChangeMinCoinsTest, Tabulation_Correctness) {
    for (const auto& tc : coin_change_min_coins_test_cases) {
        EXPECT_EQ(DPProblems::coin_change_min_coins(tc.coins, tc.amount), tc.expected)
            << "Coins: " << Helpers::print_vector(tc.coins, "", false)
            << ", Amount: " << tc.amount;
    }
}


// --- House Robber (Linear) Tests ---
TEST(HouseRobberLinearTest, Tabulation_Correctness) {
    for (const auto& tc : house_robber_linear_test_cases) {
        EXPECT_EQ(DPProblems::house_robber_linear(tc.nums), tc.expected)
            << "Nums: " << Helpers::print_vector(tc.nums, "", false);
    }
}

TEST(HouseRobberLinearTest, O1Space_Correctness) {
    for (const auto& tc : house_robber_linear_test_cases) {
        EXPECT_EQ(OptimizedSpaceDP::house_robber_linear_o1_space(tc.nums), tc.expected)
            << "Nums: " << Helpers::print_vector(tc.nums, "", false);
    }
}

// --- House Robber (Circular) Tests ---
TEST(HouseRobberCircularTest, Tabulation_Correctness) {
    for (const auto& tc : house_robber_circular_test_cases) {
        EXPECT_EQ(DPProblems::house_robber_circular(tc.nums), tc.expected)
            << "Nums: " << Helpers::print_vector(tc.nums, "", false);
    }
}

TEST(HouseRobberCircularTest, O1Space_Correctness) {
    for (const auto& tc : house_robber_circular_test_cases) {
        EXPECT_EQ(OptimizedSpaceDP::house_robber_circular_o1_space(tc.nums), tc.expected)
            << "Nums: " << Helpers::print_vector(tc.nums, "", false);
    }
}