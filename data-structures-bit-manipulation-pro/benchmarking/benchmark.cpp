#include "BitManipulationSolutions.hpp"
#include "AdditionalBitManipulationSolutions.hpp"
#include <iostream>
#include <vector>
#include <chrono>
#include <random>
#include <numeric>

// Simple timer class
class Timer {
public:
    Timer() : start_time(std::chrono::high_resolution_clock::now()) {}

    void reset() {
        start_time = std::chrono::high_resolution_clock::now();
    }

    double elapsed_milliseconds() const {
        auto end_time = std::chrono::high_resolution_clock::now();
        return std::chrono::duration_cast<std::chrono::nanoseconds>(end_time - start_time).count() / 1e6;
    }

private:
    std::chrono::high_resolution_clock::time_point start_time;
};

// Benchmarking constants
const int NUM_TESTS = 100000;
const int NUM_ITERATIONS = 10; // Run each test multiple times to average

void benchmarkCountSetBits() {
    std::cout << "\n--- Benchmarking Count Set Bits ---" << std::endl;

    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<unsigned int> dist(0, 0xFFFFFFFF);

    std::vector<unsigned int> test_numbers(NUM_TESTS);
    for (int i = 0; i < NUM_TESTS; ++i) {
        test_numbers[i] = dist(gen);
    }

    Timer timer;
    double total_time_bk = 0;
    double total_time_loop = 0;
    double total_time_bruteforce = 0;
    double total_time_lookup = 0;
    #ifdef __GNUC__
    double total_time_builtin = 0;
    #endif

    std::cout << "Running " << NUM_TESTS << " random numbers over " << NUM_ITERATIONS << " iterations each." << std::endl;

    // Brian Kernighan's
    timer.reset();
    for (int iter = 0; iter < NUM_ITERATIONS; ++iter) {
        for (unsigned int n : test_numbers) {
            volatile int result = BitManipulation::countSetBits_BrianKernighan(n);
            (void)result; // Prevent compiler optimization if result is unused
        }
    }
    total_time_bk = timer.elapsed_milliseconds();
    std::cout << "Brian Kernighan's Algorithm: " << total_time_bk / NUM_ITERATIONS << " ms" << std::endl;

    // Simple Loop
    timer.reset();
    for (int iter = 0; iter < NUM_ITERATIONS; ++iter) {
        for (unsigned int n : test_numbers) {
            volatile int result = BitManipulation::countSetBits_Loop(n);
            (void)result;
        }
    }
    total_time_loop = timer.elapsed_milliseconds();
    std::cout << "Simple Loop Algorithm:       " << total_time_loop / NUM_ITERATIONS << " ms" << std::endl;

    // Brute Force (Additional)
    timer.reset();
    for (int iter = 0; iter < NUM_ITERATIONS; ++iter) {
        for (unsigned int n : test_numbers) {
            volatile int result = AdditionalBitManipulation::countSetBits_BruteForce(n);
            (void)result;
        }
    }
    total_time_bruteforce = timer.elapsed_milliseconds();
    std::cout << "Brute Force Algorithm:       " << total_time_bruteforce / NUM_ITERATIONS << " ms" << std::endl;

    // Lookup Table (Additional)
    timer.reset();
    for (int iter = 0; iter < NUM_ITERATIONS; ++iter) {
        for (unsigned int n : test_numbers) {
            volatile int result = AdditionalBitManipulation::countSetBits_LookupTable(n);
            (void)result;
        }
    }
    total_time_lookup = timer.elapsed_milliseconds();
    std::cout << "Lookup Table Algorithm:      " << total_time_lookup / NUM_ITERATIONS << " ms" << std::endl;

    // __builtin_popcount (GCC/Clang intrinsic)
    #ifdef __GNUC__
    timer.reset();
    for (int iter = 0; iter < NUM_ITERATIONS; ++iter) {
        for (unsigned int n : test_numbers) {
            volatile int result = __builtin_popcount(n);
            (void)result;
        }
    }
    total_time_builtin = timer.elapsed_milliseconds();
    std::cout << "__builtin_popcount:          " << total_time_builtin / NUM_ITERATIONS << " ms (Compiler Intrinsic)" << std::endl;
    #endif
}

void benchmarkReverseBits() {
    std::cout << "\n--- Benchmarking Reverse Bits ---" << std::endl;

    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<unsigned int> dist(0, 0xFFFFFFFF);

    std::vector<unsigned int> test_numbers(NUM_TESTS);
    for (int i = 0; i < NUM_TESTS; ++i) {
        test_numbers[i] = dist(gen);
    }

    Timer timer;
    double total_time_standard = 0;
    double total_time_bytebybyte = 0;

    std::cout << "Running " << NUM_TESTS << " random numbers over " << NUM_ITERATIONS << " iterations each." << std::endl;

    // Standard Loop
    timer.reset();
    for (int iter = 0; iter < NUM_ITERATIONS; ++iter) {
        for (unsigned int n : test_numbers) {
            volatile unsigned int result = BitManipulation::reverseBits(n);
            (void)result;
        }
    }
    total_time_standard = timer.elapsed_milliseconds();
    std::cout << "Standard Reverse Bits:       " << total_time_standard / NUM_ITERATIONS << " ms" << std::endl;

    // Byte-by-byte (Additional)
    timer.reset();
    for (int iter = 0; iter < NUM_ITERATIONS; ++iter) {
        for (unsigned int n : test_numbers) {
            volatile unsigned int result = AdditionalBitManipulation::reverseBits_ByteByByte(n);
            (void)result;
        }
    }
    total_time_bytebybyte = timer.elapsed_milliseconds();
    std::cout << "Byte-by-Byte Reverse Bits:   " << total_time_bytebybyte / NUM_ITERATIONS << " ms" << std::endl;
}

void benchmarkSingleNumber() {
    std::cout << "\n--- Benchmarking Single Number ---" << std::endl;

    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<int> dist(-10000, 10000);

    const int ARRAY_SIZE = 1000; // Size of array for single number problem
    std::vector<std::vector<int>> test_arrays(NUM_TESTS);

    for (int i = 0; i < NUM_TESTS; ++i) {
        std::vector<int> current_array;
        std::unordered_map<int, int> counts;

        // Generate pairs
        for (int k = 0; k < (ARRAY_SIZE - 1) / 2; ++k) {
            int num;
            do {
                num = dist(gen);
            } while (counts[num] > 0); // Ensure unique for pairs
            current_array.push_back(num);
            current_array.push_back(num);
            counts[num] = 2;
        }

        // Add the single unique number
        int unique_num;
        do {
            unique_num = dist(gen);
        } while (counts[unique_num] > 0);
        current_array.push_back(unique_num);

        std::shuffle(current_array.begin(), current_array.end(), gen); // Shuffle to mix
        test_arrays[i] = current_array;
    }

    Timer timer;
    double total_time_xor = 0;
    double total_time_hashmap = 0;

    std::cout << "Running " << NUM_TESTS << " arrays of size ~" << ARRAY_SIZE << " over " << NUM_ITERATIONS << " iterations each." << std::endl;

    // XOR approach
    timer.reset();
    for (int iter = 0; iter < NUM_ITERATIONS; ++iter) {
        for (const auto& arr : test_arrays) {
            volatile int result = BitManipulation::singleNumber_XOR(arr);
            (void)result;
        }
    }
    total_time_xor = timer.elapsed_milliseconds();
    std::cout << "Single Number (XOR):           " << total_time_xor / NUM_ITERATIONS << " ms" << std::endl;

    // Hash Map approach
    timer.reset();
    for (int iter = 0; iter < NUM_ITERATIONS; ++iter) {
        for (const auto& arr : test_arrays) {
            volatile int result = BitManipulation::singleNumber_HashMap(arr);
            (void)result;
        }
    }
    total_time_hashmap = timer.elapsed_milliseconds();
    std::cout << "Single Number (Hash Map):      " << total_time_hashmap / NUM_ITERATIONS << " ms" << std::endl;
}


int main() {
    std::cout << "Starting Benchmarks..." << std::endl;

    benchmarkCountSetBits();
    benchmarkReverseBits();
    benchmarkSingleNumber();

    std::cout << "\nBenchmarks complete." << std::endl;
    return 0;
}

---