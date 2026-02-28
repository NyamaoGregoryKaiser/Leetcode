```cpp
#include "gtest/gtest.h"
#include "../src/bit_manipulation_solver.hpp"
#include "../utils/stopwatch.hpp"
#include <vector>
#include <random>
#include <iostream>
#include <numeric> // For std::iota

// Define test parameters for performance tests
const int NUM_ITERATIONS = 1000000; // Number of times to run each function
const int VECTOR_SIZE_SINGLE_NUMBER = 100000; // Size of vector for singleNumber

// Global random number generator for reproducible tests
std::mt19937_64 rng(std::random_device{}()); // Use a good random seed

// --- Performance tests for Count Set Bits ---
TEST(BitManipulationPerformance, CountSetBits) {
    std::vector<uint32_t> test_numbers(NUM_ITERATIONS);
    for (int i = 0; i < NUM_ITERATIONS; ++i) {
        test_numbers[i] = rng(); // Fill with random 32-bit numbers
    }

    Stopwatch sw;
    volatile int result_brute_force = 0; // Use volatile to prevent optimization away
    volatile int result_kernighan = 0;
    volatile int result_lookup = 0;

    std::cout << "\n--- Performance Test: Count Set Bits (" << NUM_ITERATIONS << " iterations) ---" << std::endl;

    sw.start();
    for (int i = 0; i < NUM_ITERATIONS; ++i) {
        result_brute_force += BitManipulationSolver::countSetBits_BruteForce(test_numbers[i]);
    }
    sw.stop();
    std::cout << "Brute Force Time: " << sw.getElapsedTimeMilliseconds() << " ms" << std::endl;

    sw.start();
    for (int i = 0; i < NUM_ITERATIONS; ++i) {
        result_kernighan += BitManipulationSolver::countSetBits_Kernighan(test_numbers[i]);
    }
    sw.stop();
    std::cout << "Kernighan Time:   " << sw.getElapsedTimeMilliseconds() << " ms" << std::endl;

    sw.start();
    for (int i = 0; i < NUM_ITERATIONS; ++i) {
        result_lookup += BitManipulationSolver::countSetBits_LookupTable(test_numbers[i]);
    }
    sw.stop();
    std::cout << "Lookup Table Time: " << sw.getElapsedTimeMilliseconds() << " ms" << std::endl;

    // Sanity check (ensure all methods return the same total count)
    ASSERT_EQ(result_brute_force, result_kernighan);
    ASSERT_EQ(result_kernighan, result_lookup);
    std::cout << "Total set bits (summed, for sanity check): " << result_brute_force << std::endl;
}

// --- Performance test for Is Power of Two ---
TEST(BitManipulationPerformance, IsPowerOfTwo) {
    std::vector<uint32_t> test_numbers(NUM_ITERATIONS);
    for (int i = 0; i < NUM_ITERATIONS; ++i) {
        test_numbers[i] = rng();
    }

    Stopwatch sw;
    volatile int count_powers_of_two = 0;

    std::cout << "\n--- Performance Test: Is Power of Two (" << NUM_ITERATIONS << " iterations) ---" << std::endl;

    sw.start();
    for (int i = 0; i < NUM_ITERATIONS; ++i) {
        if (BitManipulationSolver::isPowerOfTwo(test_numbers[i])) {
            count_powers_of_two++;
        }
    }
    sw.stop();
    std::cout << "IsPowerOfTwo Time: " << sw.getElapsedTimeMilliseconds() << " ms" << std::endl;
    std::cout << "Found " << count_powers_of_two << " powers of two." << std::endl;
}

// --- Performance test for Reverse Bits ---
TEST(BitManipulationPerformance, ReverseBits) {
    std::vector<uint32_t> test_numbers(NUM_ITERATIONS);
    for (int i = 0; i < NUM_ITERATIONS; ++i) {
        test_numbers[i] = rng();
    }

    Stopwatch sw;
    volatile uint32_t sum_reversed_bits = 0; // Sum to prevent optimization

    std::cout << "\n--- Performance Test: Reverse Bits (" << NUM_ITERATIONS << " iterations) ---" << std::endl;

    sw.start();
    for (int i = 0; i < NUM_ITERATIONS; ++i) {
        sum_reversed_bits += BitManipulationSolver::reverseBits(test_numbers[i]);
    }
    sw.stop();
    std::cout << "ReverseBits Time: " << sw.getElapsedTimeMilliseconds() << " ms" << std::endl;
    std::cout << "Sum of reversed bits (for sanity check): " << sum_reversed_bits << std::endl;
}

// --- Performance test for Single Number ---
TEST(BitManipulationPerformance, SingleNumber) {
    // Generate a vector where one number appears once and others twice
    std::vector<int> test_vector(VECTOR_SIZE_SINGLE_NUMBER);
    std::iota(test_vector.begin(), test_vector.end() - 1, 1); // Fill 1 to N-1
    test_vector.back() = 0; // The single number
    
    // Duplicate numbers except for the last one
    std::vector<int> duplicated_vector;
    duplicated_vector.reserve(VECTOR_SIZE_SINGLE_NUMBER * 2 - 1); // N-1 pairs + 1 single
    for (size_t i = 0; i < test_vector.size() -1; ++i) {
        duplicated_vector.push_back(test_vector[i]);
        duplicated_vector.push_back(test_vector[i]);
    }
    duplicated_vector.push_back(test_vector.back()); // Add the single number

    // Shuffle to mix it up
    std::shuffle(duplicated_vector.begin(), duplicated_vector.end(), rng);

    Stopwatch sw;
    volatile int result = 0;

    std::cout << "\n--- Performance Test: Single Number (vector size " << duplicated_vector.size() << ") ---" << std::endl;

    sw.start();
    result = BitManipulationSolver::singleNumber(duplicated_vector);
    sw.stop();
    std::cout << "SingleNumber Time: " << sw.getElapsedTimeMilliseconds() << " ms" << std::endl;
    EXPECT_EQ(result, 0); // Our expected single number
}

// --- Performance test for Insert M Into N ---
TEST(BitManipulationPerformance, InsertMIntoN) {
    std::vector<uint32_t> N_values(NUM_ITERATIONS);
    std::vector<uint32_t> M_values(NUM_ITERATIONS);
    std::vector<int> i_values(NUM_ITERATIONS);
    std::vector<int> j_values(NUM_ITERATIONS);

    std::uniform_int_distribution<uint32_t> dist_u32;
    std::uniform_int_distribution<int> dist_bit_pos(0, 31);

    for (int k = 0; k < NUM_ITERATIONS; ++k) {
        N_values[k] = dist_u32(rng);
        M_values[k] = dist_u32(rng);
        i_values[k] = dist_bit_pos(rng);
        j_values[k] = dist_bit_pos(rng);
        // Ensure i <= j
        if (i_values[k] > j_values[k]) {
            std::swap(i_values[k], j_values[k]);
        }
    }

    Stopwatch sw;
    volatile uint32_t sum_results = 0; // Sum to prevent optimization

    std::cout << "\n--- Performance Test: Insert M Into N (" << NUM_ITERATIONS << " iterations) ---" << std::endl;

    sw.start();
    for (int k = 0; k < NUM_ITERATIONS; ++k) {
        sum_results += BitManipulationSolver::insertMIntoN(N_values[k], M_values[k], i_values[k], j_values[k]);
    }
    sw.stop();
    std::cout << "InsertMIntoN Time: " << sw.getElapsedTimeMilliseconds() << " ms" << std::endl;
    std::cout << "Sum of results (for sanity check): " << sum_results << std::endl;
}
```