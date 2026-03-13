#include "benchmark/benchmark.h"
#include "main_dp_problems.cpp"
#include "brute_force_solutions.cpp"
#include "optimized_space.cpp"
#include "helpers.hpp"
#include <vector>
#include <string>
#include <random> // For random data generation

// --- Setup for generating random strings and vectors ---
std::string generate_random_string(int length) {
    std::string s(length, ' ');
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib('A', 'Z');
    for (int i = 0; i < length; ++i) {
        s[i] = distrib(gen);
    }
    return s;
}

std::vector<int> generate_random_vector(int size, int min_val, int max_val) {
    std::vector<int> vec(size);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(min_val, max_val);
    for (int i = 0; i < size; ++i) {
        vec[i] = distrib(gen);
    }
    return vec;
}

// --- Benchmark for Fibonacci Number ---
static void BM_Fibonacci_BruteForce(benchmark::State& state) {
    int n = state.range(0);
    for (auto _ : state) {
        benchmark::DoNotOptimize(BruteForceDP::fibonacci_brute_force(n));
    }
}
BENCHMARK(BM_Fibonacci_BruteForce)->Range(10, 25); // Max around 25-30 before it gets too slow

static void BM_Fibonacci_Memoization(benchmark::State& state) {
    int n = state.range(0);
    for (auto _ : state) {
        benchmark::DoNotOptimize(DPProblems::fibonacci_memoization(n));
    }
}
BENCHMARK(BM_Fibonacci_Memoization)->Range(100, 10000);

static void BM_Fibonacci_Tabulation(benchmark::State& state) {
    int n = state.range(0);
    for (auto _ : state) {
        benchmark::DoNotOptimize(DPProblems::fibonacci_tabulation(n));
    }
}
BENCHMARK(BM_Fibonacci_Tabulation)->Range(100, 10000);

static void BM_Fibonacci_O1Space(benchmark::State& state) {
    int n = state.range(0);
    for (auto _ : state) {
        benchmark::DoNotOptimize(OptimizedSpaceDP::fibonacci_o1_space(n));
    }
}
BENCHMARK(BM_Fibonacci_O1Space)->Range(100, 10000);


// --- Benchmark for Longest Common Subsequence (LCS) ---
static void BM_LCS_BruteForce(benchmark::State& state) {
    int len = state.range(0);
    std::string s1 = generate_random_string(len);
    std::string s2 = generate_random_string(len);
    for (auto _ : state) {
        benchmark::DoNotOptimize(BruteForceDP::longest_common_subsequence_brute_force(s1, s2));
    }
}
BENCHMARK(BM_LCS_BruteForce)->Range(5, 12); // Brute force LCS is extremely slow.

static void BM_LCS_Tabulation(benchmark::State& state) {
    int len = state.range(0);
    std::string s1 = generate_random_string(len);
    std::string s2 = generate_random_string(len);
    for (auto _ : state) {
        benchmark::DoNotOptimize(DPProblems::longest_common_subsequence(s1, s2));
    }
}
BENCHMARK(BM_LCS_Tabulation)->Range(50, 500);

static void BM_LCS_OptimizedSpace(benchmark::State& state) {
    int len = state.range(0);
    std::string s1 = generate_random_string(len);
    std::string s2 = generate_random_string(len);
    for (auto _ : state) {
        benchmark::DoNotOptimize(OptimizedSpaceDP::longest_common_subsequence_o_n_space(s1, s2));
    }
}
BENCHMARK(BM_LCS_OptimizedSpace)->Range(50, 500);


// --- Benchmark for 0/1 Knapsack Problem ---
static void BM_Knapsack_BruteForce(benchmark::State& state) {
    int num_items = state.range(0);
    int W = num_items * 5; // Capacity scales with number of items
    std::vector<int> weights = generate_random_vector(num_items, 1, 10);
    std::vector<int> values = generate_random_vector(num_items, 10, 100);
    for (auto _ : state) {
        benchmark::DoNotOptimize(BruteForceDP::knapsack_01_brute_force(weights, values, W));
    }
}
BENCHMARK(BM_Knapsack_BruteForce)->Range(5, 20); // Brute force is 2^N

static void BM_Knapsack_Tabulation(benchmark::State& state) {
    int num_items = state.range(0);
    int W = num_items * 5; // Capacity scales with number of items
    std::vector<int> weights = generate_random_vector(num_items, 1, 10);
    std::vector<int> values = generate_random_vector(num_items, 10, 100);
    for (auto _ : state) {
        benchmark::DoNotOptimize(DPProblems::knapsack_01_tabulation(weights, values, W));
    }
}
BENCHMARK(BM_Knapsack_Tabulation)->Ranges({50, 500}, {100, 1000}); // num_items, W

static void BM_Knapsack_OptimizedSpace(benchmark::State& state) {
    int num_items = state.range(0);
    int W = state.range(1); // Capacity scales with number of items
    std::vector<int> weights = generate_random_vector(num_items, 1, 10);
    std::vector<int> values = generate_random_vector(num_items, 10, 100);
    for (auto _ : state) {
        benchmark::DoNotOptimize(OptimizedSpaceDP::knapsack_01_o_w_space(weights, values, W));
    }
}
BENCHMARK(BM_Knapsack_OptimizedSpace)->Ranges({50, 500}, {100, 1000});


// --- Benchmark for Coin Change (Min Coins) ---
static void BM_CoinChange_MinCoins(benchmark::State& state) {
    int amount = state.range(0);
    // Fixed common coins for realistic scenario
    std::vector<int> coins = {1, 5, 10, 25, 50, 100};
    for (auto _ : state) {
        benchmark::DoNotOptimize(DPProblems::coin_change_min_coins(coins, amount));
    }
}
BENCHMARK(BM_CoinChange_MinCoins)->Range(1000, 100000);


// --- Benchmark for House Robber (Linear) ---
static void BM_HouseRobber_Linear_Tabulation(benchmark::State& state) {
    int num_houses = state.range(0);
    std::vector<int> nums = generate_random_vector(num_houses, 1, 100);
    for (auto _ : state) {
        benchmark::DoNotOptimize(DPProblems::house_robber_linear(nums));
    }
}
BENCHMARK(BM_HouseRobber_Linear_Tabulation)->Range(100, 100000);

static void BM_HouseRobber_Linear_O1Space(benchmark::State& state) {
    int num_houses = state.range(0);
    std::vector<int> nums = generate_random_vector(num_houses, 1, 100);
    for (auto _ : state) {
        benchmark::DoNotOptimize(OptimizedSpaceDP::house_robber_linear_o1_space(nums));
    }
}
BENCHMARK(BM_HouseRobber_Linear_O1Space)->Range(100, 100000);


// --- Benchmark for House Robber (Circular) ---
static void BM_HouseRobber_Circular_Tabulation(benchmark::State& state) {
    int num_houses = state.range(0);
    std::vector<int> nums = generate_random_vector(num_houses, 1, 100);
    for (auto _ : state) {
        benchmark::DoNotOptimize(DPProblems::house_robber_circular(nums));
    }
}
BENCHMARK(BM_HouseRobber_Circular_Tabulation)->Range(100, 100000);

static void BM_HouseRobber_Circular_O1Space(benchmark::State& state) {
    int num_houses = state.range(0);
    std::vector<int> nums = generate_random_vector(num_houses, 1, 100);
    for (auto _ : state) {
        benchmark::DoNotOptimize(OptimizedSpaceDP::house_robber_circular_o1_space(nums));
    }
}
BENCHMARK(BM_HouseRobber_Circular_O1Space)->Range(100, 100000);

BENCHMARK_MAIN();