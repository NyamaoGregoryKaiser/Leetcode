#include "benchmark/benchmark.h"
#include "../src/BitManipulationProblems.h"
#include <random>
#include <vector>
#include <numeric>

// Using a fixed namespace for convenience
using namespace BitManipulation;

// Global instance of Solution for benchmarks
Solution solver;

// --- Helper for generating random uint32_t ---
static std::mt19937_64 rng(std::random_device{}()); // Use 64-bit MT for better randomness
static std::uniform_int_distribution<uint32_t> dist32(0, UINT32_MAX);

// Generate a random uint32_t
static uint32_t generate_random_uint32() {
    return dist32(rng);
}

// Generate a vector of random uint32_t
static std::vector<uint32_t> generate_random_uint32_vector(size_t size) {
    std::vector<uint32_t> vec(size);
    for (size_t i = 0; i < size; ++i) {
        vec[i] = generate_random_uint32();
    }
    return vec;
}

// --- Problem 1: Count Set Bits (Hamming Weight) Benchmarks ---

static void BM_CountSetBitsIterative(benchmark::State& state) {
    uint32_t n = generate_random_uint32();
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.countSetBitsIterative(n));
    }
}
BENCHMARK(BM_CountSetBitsIterative);

static void BM_CountSetBitsKernighan(benchmark::State& state) {
    uint32_t n = generate_random_uint32();
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.countSetBitsKernighan(n));
    }
}
BENCHMARK(BM_CountSetBitsKernighan);

static void BM_CountSetBitsLookupTable(benchmark::State& state) {
    uint32_t n = generate_random_uint32();
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.countSetBitsLookupTable(n));
    }
}
BENCHMARK(BM_CountSetBitsLookupTable);

static void BM_CountSetBitsBuiltin(benchmark::State& state) {
    uint32_t n = generate_random_uint32();
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.countSetBitsBuiltin(n));
    }
}
BENCHMARK(BM_CountSetBitsBuiltin);


// Benchmark with specific input patterns for countSetBits
static void BM_CountSetBitsKernighan_AllOnes(benchmark::State& state) {
    uint32_t n = 0xFFFFFFFF; // Worst case for Kernighan
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.countSetBitsKernighan(n));
    }
}
BENCHMARK(BM_CountSetBitsKernighan_AllOnes);

static void BM_CountSetBitsKernighan_OneBit(benchmark::State& state) {
    uint32_t n = 1; // Best case for Kernighan
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.countSetBitsKernighan(n));
    }
}
BENCHMARK(BM_CountSetBitsKernighan_OneBit);


// --- Problem 2: Check if Power of Two Benchmarks ---

static void BM_IsPowerOfTwoIterative(benchmark::State& state) {
    int n = generate_random_uint32(); // Cast to int to test negative values if needed, but problem implies positive usually
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.isPowerOfTwoIterative(n));
    }
}
BENCHMARK(BM_IsPowerOfTwoIterative);

static void BM_IsPowerOfTwoBitwise(benchmark::State& state) {
    int n = generate_random_uint32();
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.isPowerOfTwoBitwise(n));
    }
}
BENCHMARK(BM_IsPowerOfTwoBitwise);


// --- Problem 3: Single Number Benchmarks ---

// Setup for singleNumber benchmark: vector of a given size
static void BM_SingleNumber(benchmark::State& state) {
    // Generate a vector where one number appears once, and others twice
    size_t size = state.range(0);
    std::vector<int> nums;
    nums.reserve(size);

    std::uniform_int_distribution<int> int_dist(INT_MIN, INT_MAX);
    int unique_num = int_dist(rng);

    for (size_t i = 0; i < (size - 1) / 2; ++i) {
        int val = int_dist(rng);
        nums.push_back(val);
        nums.push_back(val);
    }
    // Add the unique number, ensure array size is odd for this problem
    if (size % 2 == 0) { // If original size was even, remove last pair
        nums.pop_back();
        nums.pop_back();
    }
    nums.push_back(unique_num);

    // Shuffle to randomize unique number position
    std::shuffle(nums.begin(), nums.end(), rng);

    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.singleNumber(nums));
    }
    state.SetComplexityN(size);
}
BENCHMARK(BM_SingleNumber)->RangeMultiplier(2)->Range(1, 1<<18)->Complexity();


// --- Problem 4: Reverse Bits Benchmarks ---

static void BM_ReverseBits(benchmark::State& state) {
    uint32_t n = generate_random_uint32();
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.reverseBits(n));
    }
}
BENCHMARK(BM_ReverseBits);


// --- Problem 5: Insert M into N Benchmarks ---

static void BM_InsertBits(benchmark::State& state) {
    uint32_t N_val = generate_random_uint32();
    uint32_t M_val = generate_random_uint32();
    int i = dist32(rng) % 31; // i can be 0 to 30
    int j = i + (dist32(rng) % (31 - i)); // j can be i to 31
    if (j < i) std::swap(i,j); // ensure i <= j

    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.insertBits(N_val, M_val, i, j));
    }
}
BENCHMARK(BM_InsertBits);

// Main function provided by Google Benchmark
BENCHMARK_MAIN();
```
---