#include "../src/BitManipulationProblems.hpp"
#include "../utils/common.hpp" // For printBinary, if needed
#include <iostream>
#include <vector>
#include <chrono> // For high-resolution timing
#include <random> // For generating random numbers
#include <functional> // For std::function

// Helper to time a function call
template <typename Func>
long long measureTime(Func func) {
    auto start = std::chrono::high_resolution_clock::now();
    func();
    auto end = std::chrono::high_resolution_clock::now();
    return std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count();
}

void benchmarkCountSetBits() {
    std::cout << "--- Benchmarking CountSetBits ---" << std::endl;

    std::mt19937 rng(std::random_device{}()); // Mersenne Twister PRNG
    std::uniform_int_distribution<uint32_t> dist(0, 0xFFFFFFFF);

    const int NUM_ITERATIONS = 1000000;
    std::vector<uint32_t> test_numbers(NUM_ITERATIONS);
    for (int i = 0; i < NUM_ITERATIONS; ++i) {
        test_numbers[i] = dist(rng);
    }

    long long time_a1 = 0;
    long long time_a2 = 0;
    long long time_a3 = 0;
    long long time_a4 = 0;

    // Approach 1: Iterative
    time_a1 = measureTime([&]() {
        for (uint32_t n : test_numbers) {
            BitManipulator::countSetBits_Approach1_Iterative(n);
        }
    });
    std::cout << "Approach 1 (Iterative) took:       " << time_a1 / 1000000.0 << " ms" << std::endl;

    // Approach 2: Brian Kernighan
    time_a2 = measureTime([&]() {
        for (uint32_t n : test_numbers) {
            BitManipulator::countSetBits_Approach2_BrianKernighan(n);
        }
    });
    std::cout << "Approach 2 (Brian Kernighan) took: " << time_a2 / 1000000.0 << " ms" << std::endl;

    // Approach 3: Lookup Table
    time_a3 = measureTime([&]() {
        for (uint32_t n : test_numbers) {
            BitManipulator::countSetBits_Approach3_LookupTable(n);
        }
    });
    std::cout << "Approach 3 (Lookup Table) took:    " << time_a3 / 1000000.0 << " ms" << std::endl;

    // Approach 4: Built-in
    time_a4 = measureTime([&]() {
        for (uint32_t n : test_numbers) {
            BitManipulator::countSetBits_Approach4_Builtin(n);
        }
    });
    std::cout << "Approach 4 (Built-in) took:        " << time_a4 / 1000000.0 << " ms" << std::endl;
    std::cout << std::endl;
}

void benchmarkIsPowerOfTwo() {
    std::cout << "--- Benchmarking IsPowerOfTwo ---" << std::endl;

    std::mt19937 rng(std::random_device{}());
    std::uniform_int_distribution<int> dist(1, 0x7FFFFFFF); // Positive integers

    const int NUM_ITERATIONS = 10000000; // More iterations for simpler ops
    std::vector<int> test_numbers(NUM_ITERATIONS);
    for (int i = 0; i < NUM_ITERATIONS; ++i) {
        test_numbers[i] = dist(rng);
    }

    long long time_a1 = 0;
    long long time_a2 = 0;

    // Approach 1: Iterative
    time_a1 = measureTime([&]() {
        for (int n : test_numbers) {
            BitManipulator::isPowerOfTwo_Approach1_Iterative(n);
        }
    });
    std::cout << "Approach 1 (Iterative) took: " << time_a1 / 1000000.0 << " ms" << std::endl;

    // Approach 2: Bitwise
    time_a2 = measureTime([&]() {
        for (int n : test_numbers) {
            BitManipulator::isPowerOfTwo_Approach2_Bitwise(n);
        }
    });
    std::cout << "Approach 2 (Bitwise) took:   " << time_a2 / 1000000.0 << " ms" << std::endl;
    std::cout << std::endl;
}

void benchmarkSingleNumber() {
    std::cout << "--- Benchmarking SingleNumber ---" << std::endl;

    std::mt19937 rng(std::random_device{}());
    std::uniform_int_distribution<int> dist(-100000, 100000); // Range for numbers

    const int UNIQUE_NUMBER = 1234567; // A fixed unique number
    const int PAIR_COUNT = 50000;      // Number of pairs, so vector size is 2*PAIR_COUNT + 1
    const int VECTOR_SIZE = 2 * PAIR_COUNT + 1;

    std::vector<int> nums_template;
    nums_template.push_back(UNIQUE_NUMBER);
    for (int i = 0; i < PAIR_COUNT; ++i) {
        int val = dist(rng);
        // Ensure val is not UNIQUE_NUMBER if it could be randomly generated
        while (val == UNIQUE_NUMBER) {
            val = dist(rng);
        }
        nums_template.push_back(val);
        nums_template.push_back(val);
    }
    std::shuffle(nums_template.begin(), nums_template.end(), rng); // Shuffle to randomize positions

    const int NUM_RUNS = 100; // Number of times to run the test with potentially different shuffles

    long long total_time_a1 = 0;
    long long total_time_a2 = 0;

    for (int r = 0; r < NUM_RUNS; ++r) {
        std::vector<int> current_nums = nums_template;
        std::shuffle(current_nums.begin(), current_nums.end(), rng);

        total_time_a1 += measureTime([&]() {
            BitManipulator::singleNumber_Approach1_XOR(current_nums);
        });

        total_time_a2 += measureTime([&]() {
            BitManipulator::singleNumber_Approach2_HashMap(current_nums);
        });
    }

    std::cout << "Vector size: " << VECTOR_SIZE << ", Number of runs: " << NUM_RUNS << std::endl;
    std::cout << "Approach 1 (XOR) average took:    " << (total_time_a1 / NUM_RUNS) / 1000000.0 << " ms" << std::endl;
    std::cout << "Approach 2 (Hash Map) average took: " << (total_time_a2 / NUM_RUNS) / 1000000.0 << " ms" << std::endl;
    std::cout << std::endl;
}

void benchmarkReverseBits() {
    std::cout << "--- Benchmarking ReverseBits ---" << std::endl;

    std::mt19937 rng(std::random_device{}());
    std::uniform_int_distribution<uint32_t> dist(0, 0xFFFFFFFF);

    const int NUM_ITERATIONS = 1000000;
    std::vector<uint32_t> test_numbers(NUM_ITERATIONS);
    for (int i = 0; i < NUM_ITERATIONS; ++i) {
        test_numbers[i] = dist(rng);
    }

    long long time_a1 = 0;
    long long time_a2 = 0;

    // Approach 1: Iterative
    time_a1 = measureTime([&]() {
        for (uint32_t n : test_numbers) {
            BitManipulator::reverseBits_Approach1_Iterative(n);
        }
    });
    std::cout << "Approach 1 (Iterative) took:      " << time_a1 / 1000000.0 << " ms" << std::endl;

    // Approach 2: Optimized Group Swaps
    time_a2 = measureTime([&]() {
        for (uint32_t n : test_numbers) {
            BitManipulator::reverseBits_Approach2_GroupSwaps(n);
        }
    });
    std::cout << "Approach 2 (Group Swaps) took:    " << time_a2 / 1000000.0 << " ms" << std::endl;
    std::cout << std::endl;
}

int main() {
    std::cout << "Starting all Bit Manipulation benchmarks..." << std::endl << std::endl;

    benchmarkCountSetBits();
    benchmarkIsPowerOfTwo();
    benchmarkSingleNumber();
    benchmarkReverseBits();

    std::cout << "All Bit Manipulation benchmarks completed." << std::endl;

    return 0;
}