```cpp
#include "benchmark/benchmark.h"
#include "../src/algorithms.h"
#include "../src/helpers.h"
#include <vector>
#include <algorithm>
#include <random>

using namespace BinarySearch;

// --- Setup for Benchmarks ---
static std::vector<int> large_sorted_vec;
static std::vector<int> large_rotated_vec;
static std::vector<int> large_duplicate_vec;
static std::vector<int> large_random_nums_for_divisor;

void setup_benchmarks(size_t size) {
    large_sorted_vec = generate_random_sorted_vector(size, static_cast<int>(size * 10), false);
    
    // For rotated array, ensure it's sufficiently large for distinct halves
    if (size >= 2) {
        large_rotated_vec = generate_rotated_sorted_vector(size, static_cast<int>(size * 10), static_cast<int>(size / 3));
    } else {
        large_rotated_vec = generate_random_sorted_vector(size, static_cast<int>(size * 10), false);
    }
    
    large_duplicate_vec = generate_random_sorted_vector(size, static_cast<int>(size * 2), true);
    // Add some more duplicates manually to ensure variability
    if (size > 0) {
        std::mt19937 rng(std::chrono::steady_clock::now().time_since_epoch().count());
        std::uniform_int_distribution<int> dist(0, (int)large_duplicate_vec.size() -1);
        for(int i=0; i<size/10; ++i) { // Add 10% more duplicates
            if (large_duplicate_vec.empty()) break;
            large_duplicate_vec.insert(large_duplicate_vec.begin() + dist(rng), large_duplicate_vec[dist(rng)]);
        }
        std::sort(large_duplicate_vec.begin(), large_duplicate_vec.end());
    }

    large_random_nums_for_divisor = generate_random_vector(size, static_cast<int>(size * 5));
    // Max element of nums is used as high boundary for divisor search.
    // If empty, max_element will crash, but size 0 handled by check below.
    if (!large_random_nums_for_divisor.empty()) {
        std::transform(large_random_nums_for_divisor.begin(), large_random_nums_for_divisor.end(), 
                       large_random_nums_for_divisor.begin(), [](int x){ return std::abs(x)+1; }); // Divisors are positive
    }
}

// Target values for benchmarks
const int TARGET_PRESENT = 5; // A common target in small ranges
const int TARGET_NOT_PRESENT = 99999999; // Likely not present

// --- Benchmarks for Problem 1: Standard Binary Search ---

// Benchmark linear search
static void BM_LinearSearch(benchmark::State& state) {
    size_t size = state.range(0);
    setup_benchmarks(size);
    int target = large_sorted_vec.empty() ? 0 : large_sorted_vec[large_sorted_vec.size() / 2]; // Target in middle
    for (auto _ : state) {
        benchmark::DoNotOptimize(linearSearch(large_sorted_vec, target));
    }
    state.SetComplexityN(size);
}
BENCHMARK(BM_LinearSearch)->RangeMultiplier(2)->Range(1, 1<<18)->Complexity();

// Benchmark iterative binary search
static void BM_StandardBinarySearchIterative(benchmark::State& state) {
    size_t size = state.range(0);
    setup_benchmarks(size);
    int target = large_sorted_vec.empty() ? 0 : large_sorted_vec[large_sorted_vec.size() / 2];
    for (auto _ : state) {
        benchmark::DoNotOptimize(standardBinarySearchIterative(large_sorted_vec, target));
    }
    state.SetComplexityN(size);
}
BENCHMARK(BM_StandardBinarySearchIterative)->RangeMultiplier(2)->Range(1, 1<<18)->Complexity();

// Benchmark recursive binary search
static void BM_StandardBinarySearchRecursive(benchmark::State& state) {
    size_t size = state.range(0);
    setup_benchmarks(size);
    int target = large_sorted_vec.empty() ? 0 : large_sorted_vec[large_sorted_vec.size() / 2];
    for (auto _ : state) {
        benchmark::DoNotOptimize(standardBinarySearchRecursive(large_sorted_vec, target));
    }
    state.SetComplexityN(size);
}
BENCHMARK(BM_StandardBinarySearchRecursive)->RangeMultiplier(2)->Range(1, 1<<18)->Complexity();


// --- Benchmarks for Problem 2: Find First and Last Occurrence ---

static void BM_FindFirstAndLastOccurrence(benchmark::State& state) {
    size_t size = state.range(0);
    setup_benchmarks(size);
    int target = large_duplicate_vec.empty() ? 0 : large_duplicate_vec[large_duplicate_vec.size() / 2];
    for (auto _ : state) {
        benchmark::DoNotOptimize(findFirstAndLastOccurrence(large_duplicate_vec, target));
    }
    state.SetComplexityN(size);
}
BENCHMARK(BM_FindFirstAndLastOccurrence)->RangeMultiplier(2)->Range(1, 1<<18)->Complexity();


// --- Benchmarks for Problem 3: Search in Rotated Sorted Array ---

static void BM_SearchInRotatedSortedArray(benchmark::State& state) {
    size_t size = state.range(0);
    setup_benchmarks(size);
    int target = large_rotated_vec.empty() ? 0 : large_rotated_vec[large_rotated_vec.size() / 2];
    for (auto _ : state) {
        benchmark::DoNotOptimize(searchInRotatedSortedArray(large_rotated_vec, target));
    }
    state.SetComplexityN(size);
}
BENCHMARK(BM_SearchInRotatedSortedArray)->RangeMultiplier(2)->Range(1, 1<<18)->Complexity();


// --- Benchmarks for Problem 4: Find Peak Element ---

static void BM_FindPeakElementLinear(benchmark::State& state) {
    size_t size = state.range(0);
    setup_benchmarks(size);
    for (auto _ : state) {
        benchmark::DoNotOptimize(findPeakElementLinear(large_sorted_vec)); // Use sorted as base
    }
    state.SetComplexityN(size);
}
BENCHMARK(BM_FindPeakElementLinear)->RangeMultiplier(2)->Range(1, 1<<18)->Complexity();

static void BM_FindPeakElement(benchmark::State& state) {
    size_t size = state.range(0);
    setup_benchmarks(size);
    for (auto _ : state) {
        benchmark::DoNotOptimize(findPeakElement(large_sorted_vec)); // Use sorted as base
    }
    state.SetComplexityN(size);
}
BENCHMARK(BM_FindPeakElement)->RangeMultiplier(2)->Range(1, 1<<18)->Complexity();


// --- Benchmarks for Problem 5: Smallest Divisor Given a Threshold ---

// Helper function to calculate sum for SmallestDivisor. Used by main benchmark.
static int calculate_sum_for_divisor_check(const std::vector<int>& nums, int divisor) {
    long long current_sum = 0;
    for (int num : nums) {
        current_sum += (num + divisor - 1) / divisor;
    }
    return (int)current_sum;
}

static void BM_SmallestDivisor(benchmark::State& state) {
    size_t size = state.range(0);
    setup_benchmarks(size);
    // Threshold can be set dynamically based on sum with divisor 1 to ensure a valid range
    int threshold = 0;
    if (!large_random_nums_for_divisor.empty()) {
         // This ensures a "mid-range" valid divisor usually exists.
        threshold = calculate_sum_for_divisor_check(large_random_nums_for_divisor, 
                                                     *std::max_element(large_random_nums_for_divisor.begin(), large_random_nums_for_divisor.end()) / 2) + 1;
        if (threshold == 0) threshold = large_random_nums_for_divisor.size(); // min threshold
    } else {
        threshold = 1;
    }

    for (auto _ : state) {
        benchmark::DoNotOptimize(smallestDivisor(large_random_nums_for_divisor, threshold));
    }
    state.SetComplexityN(size);
}
// The complexity for smallestDivisor is N * log(MaxElement), so here N is the array size,
// and MaxElement scales with N as (size * 5). So roughly N * log(N).
BENCHMARK(BM_SmallestDivisor)->RangeMultiplier(2)->Range(1, 1<<16)->Complexity();


BENCHMARK_MAIN();
```