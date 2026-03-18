```cpp
#include "../src/bit_manipulation.h"
#include <iostream>
#include <vector>
#include <chrono>
#include <random> // For generating random numbers

// Helper function to measure time
template <typename Func>
long long measureTime(Func func, const std::string& description) {
    auto start = std::chrono::high_resolution_clock::now();
    func();
    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
    std::cout << description << ": " << duration.count() / 1000.0 << " us" << std::endl;
    return duration.count();
}

// Function to run benchmarks for CountSetBits
void benchmarkCountSetBits() {
    std::cout << "\n--- Benchmarking CountSetBits ---" << std::endl;

    const int NUM_TESTS = 1000000; // Number of integers to process
    std::vector<uint32_t> testNumbers(NUM_TESTS);

    // Seed for random number generation
    std::mt19937 rng(std::chrono::steady_clock::now().time_since_epoch().count());
    std::uniform_int_distribution<uint32_t> dist(0, 0xFFFFFFFF); // Full range of uint32_t

    // Populate test numbers with random values
    for (int i = 0; i < NUM_TESTS; ++i) {
        testNumbers[i] = dist(rng);
    }

    // Ensure lookup table is initialized once
    CountSetBits::initializeLookupTable();

    // Benchmark iterative method
    measureTime([&]() {
        long long total_count = 0;
        for (uint32_t n : testNumbers) {
            total_count += CountSetBits::countSetBits_iterative(n);
        }
        // std::cout << "  Total Count (Iterative): " << total_count << std::endl; // Optional: print total count to ensure work is done
    }, "Iterative (32 shifts)");

    // Benchmark Brian Kernighan's method
    measureTime([&]() {
        long long total_count = 0;
        for (uint32_t n : testNumbers) {
            total_count += CountSetBits::countSetBits_brianKernighan(n);
        }
        // std::cout << "  Total Count (Brian Kernighan): " << total_count << std::endl;
    }, "Brian Kernighan's");

    // Benchmark Lookup Table method
    measureTime([&]() {
        long long total_count = 0;
        for (uint32_t n : testNumbers) {
            total_count += CountSetBits::countSetBits_lookupTable(n);
        }
        // std::cout << "  Total Count (Lookup Table): " << total_count << std::endl;
    }, "Lookup Table (Byte-wise)");
}

// Function to run benchmarks for PowerOfTwo
void benchmarkPowerOfTwo() {
    std::cout << "\n--- Benchmarking PowerOfTwo ---" << std::endl;

    const int NUM_TESTS = 1000000;
    std::vector<int> testNumbers(NUM_TESTS);

    std::mt19937 rng(std::chrono::steady_clock::now().time_since_epoch().count());
    std::uniform_int_distribution<int> dist_int(1, std::numeric_limits<int>::max()); // Positive integers

    for (int i = 0; i < NUM_TESTS; ++i) {
        testNumbers[i] = dist_int(rng);
    }

    // Benchmark loop method
    measureTime([&]() {
        long long true_count = 0;
        for (int n : testNumbers) {
            if (PowerOfTwo::isPowerOfTwo_loop(n)) {
                true_count++;
            }
        }
        // std::cout << "  True Count (Loop): " << true_count << std::endl;
    }, "PowerOfTwo (Loop/Divide)");

    // Benchmark bit manipulation method
    measureTime([&]() {
        long long true_count = 0;
        for (int n : testNumbers) {
            if (PowerOfTwo::isPowerOfTwo_bitManipulation(n)) {
                true_count++;
            }
        }
        // std::cout << "  True Count (Bit Manipulation): " << true_count << std::endl;
    }, "PowerOfTwo (Bit Manipulation)");
}

// Function to run benchmarks for ReverseBits
void benchmarkReverseBits() {
    std::cout << "\n--- Benchmarking ReverseBits ---" << std::endl;

    const int NUM_TESTS = 1000000;
    std::vector<uint32_t> testNumbers(NUM_TESTS);

    std::mt19937 rng(std::chrono::steady_clock::now().time_since_epoch().count());
    std::uniform_int_distribution<uint32_t> dist(0, 0xFFFFFFFF);

    for (int i = 0; i < NUM_TESTS; ++i) {
        testNumbers[i] = dist(rng);
    }

    measureTime([&]() {
        uint32_t sum_reversed = 0; // To prevent compiler optimizing out the loop entirely
        for (uint32_t n : testNumbers) {
            sum_reversed += ReverseBits::reverseBits_iterative(n);
        }
        // std::cout << "  Sum of reversed numbers: " << sum_reversed << std::endl;
    }, "ReverseBits (Iterative)");
}

// Main function to run all benchmarks
int main() {
    std::cout << "Starting Bit Manipulation Benchmarks..." << std::endl;

    benchmarkCountSetBits();
    benchmarkPowerOfTwo();
    benchmarkReverseBits(); // Single approach, mainly for performance baseline

    std::cout << "\nBenchmarks complete." << std::endl;

    return 0;
}
```