```cpp
#include "benchmark/benchmark.h"
#include "../src/stack_queue_problems.h"
#include <vector>
#include <string>
#include <random>
#include <algorithm> // For std::iota

// --- Benchmarking Problem 1: Valid Parentheses ---
static void BM_ValidParentheses_Short(benchmark::State& state) {
    std::string s = "()[]{}";
    for (auto _ : state) {
        benchmark::DoNotOptimize(isValidParentheses(s));
    }
}
BENCHMARK(BM_ValidParentheses_Short);

static void BM_ValidParentheses_LongValid(benchmark::State& state) {
    std::string s(state.range(0), '(');
    for(int i = 0; i < state.range(0); ++i) {
        if (i % 3 == 0) s[i] = '(';
        else if (i % 3 == 1) s[i] = '[';
        else s[i] = '{';
    }
    std::string closing_s;
    for (char c : s) {
        if (c == '(') closing_s += ')';
        else if (c == '[') closing_s += ']';
        else closing_s += '}';
    }
    std::reverse(closing_s.begin(), closing_s.end());
    s += closing_s; // Create a very long valid string
    for (auto _ : state) {
        benchmark::DoNotOptimize(isValidParentheses(s));
    }
}
BENCHMARK(BM_ValidParentheses_LongValid)->Range(1 << 10, 1 << 18); // String lengths from 2KB to 512KB

static void BM_ValidParentheses_LongInvalid(benchmark::State& state) {
    std::string s(state.range(0), '('); // All opening parentheses
    for (auto _ : state) {
        benchmark::DoNotOptimize(isValidParentheses(s));
    }
}
BENCHMARK(BM_ValidParentheses_LongInvalid)->Range(1 << 10, 1 << 18);

// --- Benchmarking Problem 2: Min Stack ---
static void BM_MinStack_PushPop(benchmark::State& state) {
    MinStack ms;
    std::vector<int> values(state.range(0));
    std::iota(values.begin(), values.end(), 0); // 0, 1, 2, ... N-1

    for (auto _ : state) {
        state.PauseTiming(); // Don't time setup
        MinStack current_ms;
        state.ResumeTiming(); // Start timing

        for (int val : values) {
            current_ms.push(val);
        }
        for (int i = 0; i < state.range(0); ++i) {
            current_ms.pop();
        }
    }
}
BENCHMARK(BM_MinStack_PushPop)->Range(1 << 10, 1 << 16); // Stack depth from 1K to 64K

// Test with decreasing values (min_stack grows as large as data_stack)
static void BM_MinStack_PushPop_WorstCase(benchmark::State& state) {
    MinStack ms;
    std::vector<int> values(state.range(0));
    std::iota(values.begin(), values.end(), 0);
    std::reverse(values.begin(), values.end()); // N-1, N-2, ... 0

    for (auto _ : state) {
        state.PauseTiming();
        MinStack current_ms;
        state.ResumeTiming();

        for (int val : values) {
            current_ms.push(val);
        }
        for (int i = 0; i < state.range(0); ++i) {
            current_ms.pop();
        }
    }
}
BENCHMARK(BM_MinStack_PushPop_WorstCase)->Range(1 << 10, 1 << 16);

// --- Benchmarking Problem 3: Implement Queue using Stacks ---
static void BM_MyQueue_PushPop(benchmark::State& state) {
    MyQueue mq;
    std::vector<int> values(state.range(0));
    std::iota(values.begin(), values.end(), 0);

    for (auto _ : state) {
        state.PauseTiming();
        MyQueue current_mq;
        state.ResumeTiming();

        for (int val : values) {
            current_mq.push(val);
        }
        for (int i = 0; i < state.range(0); ++i) {
            current_mq.pop();
        }
    }
}
BENCHMARK(BM_MyQueue_PushPop)->Range(1 << 10, 1 << 16); // Queue depth from 1K to 64K

// --- Benchmarking Problem 4: Sliding Window Maximum ---
static std::vector<int> generate_random_vec(size_t size) {
    std::vector<int> vec(size);
    std::mt19937 gen(0); // Fixed seed for reproducibility
    std::uniform_int_distribution<> distrib(-1000, 1000);
    for (size_t i = 0; i < size; ++i) {
        vec[i] = distrib(gen);
    }
    return vec;
}

static void BM_MaxSlidingWindow_Optimal(benchmark::State& state) {
    size_t vec_size = state.range(0);
    int k = vec_size / 4 > 0 ? vec_size / 4 : 1; // Window size relative to input size
    std::vector<int> nums = generate_random_vec(vec_size);

    for (auto _ : state) {
        benchmark::DoNotOptimize(maxSlidingWindow(nums, k));
    }
}
BENCHMARK(BM_MaxSlidingWindow_Optimal)->Range(1 << 10, 1 << 18); // Vector size from 1K to 256K

static void BM_MaxSlidingWindow_BruteForce(benchmark::State& state) {
    size_t vec_size = state.range(0);
    int k = vec_size / 4 > 0 ? vec_size / 4 : 1; // Window size relative to input size
    std::vector<int> nums = generate_random_vec(vec_size);

    for (auto _ : state) {
        benchmark::DoNotOptimize(maxSlidingWindowBruteForce(nums, k));
    }
}
// Brute force is O(N*K), so we'll test smaller ranges to avoid excessively long runs.
BENCHMARK(BM_MaxSlidingWindow_BruteForce)->Range(1 << 8, 1 << 12); // Vector size from 256 to 4K


// --- Benchmarking Problem 5: Daily Temperatures ---
static void BM_DailyTemperatures_Optimal(benchmark::State& state) {
    size_t vec_size = state.range(0);
    std::vector<int> temps = generate_random_vec(vec_size); // temperatures within a reasonable range (e.g., 30-100)
    for(int& t : temps) { t = std::abs(t % 71) + 30; } // Ensure temps are in [30, 100]

    for (auto _ : state) {
        benchmark::DoNotOptimize(dailyTemperatures(temps));
    }
}
BENCHMARK(BM_DailyTemperatures_Optimal)->Range(1 << 10, 1 << 18); // Vector size from 1K to 256K

static void BM_DailyTemperatures_BruteForce(benchmark::State& state) {
    size_t vec_size = state.range(0);
    std::vector<int> temps = generate_random_vec(vec_size);
    for(int& t : temps) { t = std::abs(t % 71) + 30; } // Ensure temps are in [30, 100]

    for (auto _ : state) {
        benchmark::DoNotOptimize(dailyTemperaturesBruteForce(temps));
    }
}
// Brute force is O(N^2), so test smaller ranges.
BENCHMARK(BM_DailyTemperatures_BruteForce)->Range(1 << 8, 1 << 12); // Vector size from 256 to 4K

// Main function for benchmarks
BENCHMARK_MAIN();
```