```cpp
#include <iostream>
#include <vector>
#include <chrono>
#include <random> // For generating random numbers
#include <numeric> // For std::iota
#include <algorithm> // For std::shuffle

#include "src/bit_manipulation_optimized.h"
#include "src/bit_manipulation_bruteforce.h"
// No need for bit_manipulation_utils.h in benchmark, it's about raw performance

// Use specific namespaces for clarity
namespace bm = BitManipulation;

// Helper to time a function call
template <typename Func, typename... Args>
long long measure_time_ms(Func func, Args&&... args) {
    auto start = std::chrono::high_resolution_clock::now();
    func(std::forward<Args>(args)...);
    auto end = std::chrono::high_resolution_clock::now();
    return std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count();
}

// Helper for timing functions that return a value
template <typename ResultType, typename Func, typename... Args>
long long measure_time_and_get_result_ms(ResultType& result_out, Func func, Args&&... args) {
    auto start = std::chrono::high_resolution_clock::now();
    result_out = func(std::forward<Args>(args)...);
    auto end = std::chrono::high_resolution_clock::now();
    return std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count();
}


void benchmark_countSetBits() {
    std::cout << "\n--- Benchmarking Count Set Bits ---" << std::endl;

    const int NUM_TESTS = 1000000; // Number of iterations for each test
    std::vector<uint32_t> test_numbers(NUM_TESTS);
    std::mt19937 gen(std::random_device{}()); // Mersenne Twister engine
    std::uniform_int_distribution<uint32_t> distrib(0, std::numeric_limits<uint32_t>::max());

    for (int i = 0; i < NUM_TESTS; ++i) {
        test_numbers[i] = distrib(gen);
    }

    // --- Optimized: Kernighan's Algorithm ---
    int total_set_bits_kernighan = 0;
    long long time_kernighan = measure_time_ms([&]() {
        for (uint32_t n : test_numbers) {
            total_set_bits_kernighan += bm::countSetBits_Kernighan(n);
        }
    });
    std::cout << "Kernighan's Algorithm: " << time_kernighan << " ms (Total bits: " << total_set_bits_kernighan << ")" << std::endl;

    // --- Optimized: Repeated Shift Algorithm ---
    int total_set_bits_shift = 0;
    long long time_shift = measure_time_ms([&]() {
        for (uint32_t n : test_numbers) {
            total_set_bits_shift += bm::countSetBits_Shift(n);
        }
    });
    std::cout << "Repeated Shift Algorithm: " << time_shift << " ms (Total bits: " << total_set_bits_shift << ")" << std::endl;
    
    // --- Brute-Force: Modulo/Division Algorithm ---
    int total_set_bits_brute = 0;
    long long time_brute = measure_time_ms([&]() {
        for (uint32_t n : test_numbers) {
            total_set_bits_brute += bm::countSetBits_Brute(n);
        }
    });
    std::cout << "Brute-Force Modulo/Div: " << time_brute << " ms (Total bits: " << total_set_bits_brute << ")" << std::endl;

    // Optional: Built-in popcount for comparison (GCC/Clang specific)
#if defined(__GNUC__) || defined(__clang__)
    int total_set_bits_builtin = 0;
    long long time_builtin = measure_time_ms([&]() {
        for (uint32_t n : test_numbers) {
            total_set_bits_builtin += __builtin_popcount(n);
        }
    });
    std::cout << "Built-in __builtin_popcount: " << time_builtin << " ms (Total bits: " << total_set_bits_builtin << ")" << std::endl;
#endif
}

void benchmark_singleNumber() {
    std::cout << "\n--- Benchmarking Single Number ---" << std::endl;

    const int ARRAY_SIZE = 100000;
    const int NUM_RUNS = 100;

    std::vector<int> base_array(ARRAY_SIZE);
    std::iota(base_array.begin(), base_array.end(), 1); // Fill with 1, 2, ..., ARRAY_SIZE
    
    // Create an array with pairs and one unique number
    // Example: [1,2,3,...,ARRAY_SIZE/2, 1,2,3,...,ARRAY_SIZE/2, UNIQUE_NUMBER]
    std::vector<int> large_nums;
    large_nums.reserve(ARRAY_SIZE + 1);
    for (int i = 1; i <= ARRAY_SIZE / 2; ++i) {
        large_nums.push_back(i);
        large_nums.push_back(i);
    }
    int unique_val = ARRAY_SIZE / 2 + 1;
    large_nums.push_back(unique_val);

    std::mt19937 gen(std::random_device{}());
    
    // --- Optimized: XOR Algorithm ---
    int result_xor = 0;
    long long time_xor = 0;
    for (int r = 0; r < NUM_RUNS; ++r) {
        std::shuffle(large_nums.begin(), large_nums.end(), gen); // Shuffle for realistic access patterns
        time_xor += measure_time_and_get_result_ms(result_xor, [&]() {
            return bm::singleNumber(large_nums);
        });
    }
    std::cout << "XOR Algorithm: " << time_xor / NUM_RUNS << " ms (Avg, Result: " << result_xor << ")" << std::endl;

    // --- Brute-Force: Hash Map Algorithm ---
    int result_hash = 0;
    long long time_hash = 0;
    for (int r = 0; r < NUM_RUNS; ++r) {
        std::shuffle(large_nums.begin(), large_nums.end(), gen); // Shuffle for realistic access patterns
        time_hash += measure_time_and_get_result_ms(result_hash, [&]() {
            return bm::singleNumber_Brute_HashMap(large_nums);
        });
    }
    std::cout << "Hash Map Algorithm: " << time_hash / NUM_RUNS << " ms (Avg, Result: " << result_hash << ")" << std::endl;
}

void benchmark_reverseBits() {
    std::cout << "\n--- Benchmarking Reverse Bits ---" << std::endl;

    const int NUM_TESTS = 1000000;
    std::vector<uint32_t> test_numbers(NUM_TESTS);
    std::mt19937 gen(std::random_device{}());
    std::uniform_int_distribution<uint32_t> distrib(0, std::numeric_limits<uint32_t>::max());

    for (int i = 0; i < NUM_TESTS; ++i) {
        test_numbers[i] = distrib(gen);
    }

    uint32_t dummy_result_opt = 0;
    long long time_opt = 0;
    time_opt = measure_time_ms([&]() {
        for (uint32_t n : test_numbers) {
            dummy_result_opt = bm::reverseBits(n); // Ensure computation is not optimized away
        }
    });
    std::cout << "Optimized (Bit Shift): " << time_opt << " ms (Dummy result: " << dummy_result_opt << ")" << std::endl;

    uint32_t dummy_result_brute = 0;
    long long time_brute = 0;
    time_brute = measure_time_ms([&]() {
        for (uint32_t n : test_numbers) {
            dummy_result_brute = bm::reverseBits_Brute(n);
        }
    });
    std::cout << "Brute Force (Arithmetic): " << time_brute << " ms (Dummy result: " << dummy_result_brute << ")" << std::endl;
}

void benchmark_isPowerOfTwo() {
    std::cout << "\n--- Benchmarking Is Power Of Two ---" << std::endl;

    const int NUM_TESTS = 10000000;
    std::vector<int> test_numbers(NUM_TESTS);
    std::mt19937 gen(std::random_device{}());
    std::uniform_int_distribution<int> distrib_int(1, std::numeric_limits<int>::max()); // Only positive numbers

    for (int i = 0; i < NUM_TESTS; ++i) {
        test_numbers[i] = distrib_int(gen);
    }

    bool dummy_bool_opt = false;
    long long time_opt = measure_time_ms([&]() {
        for (int n : test_numbers) {
            dummy_bool_opt = bm::isPowerOfTwo(n); // To prevent optimization away
        }
    });
    std::cout << "Optimized (Bitwise): " << time_opt << " ms (Last result: " << (dummy_bool_opt ? "true" : "false") << ")" << std::endl;

    bool dummy_bool_brute = false;
    long long time_brute = measure_time_ms([&]() {
        for (int n : test_numbers) {
            dummy_bool_brute = bm::isPowerOfTwo_Brute(n);
        }
    });
    std::cout << "Brute Force (Division): " << time_brute << " ms (Last result: " << (dummy_bool_brute ? "true" : "false") << ")" << std::endl;
}

void benchmark_isPowerOfFour() {
    std::cout << "\n--- Benchmarking Is Power Of Four ---" << std::endl;

    const int NUM_TESTS = 10000000;
    std::vector<int> test_numbers(NUM_TESTS);
    std::mt19937 gen(std::random_device{}());
    std::uniform_int_distribution<int> distrib_int(1, std::numeric_limits<int>::max()); // Only positive numbers

    for (int i = 0; i < NUM_TESTS; ++i) {
        test_numbers[i] = distrib_int(gen);
    }

    bool dummy_bool_opt = false;
    long long time_opt = measure_time_ms([&]() {
        for (int n : test_numbers) {
            dummy_bool_opt = bm::isPowerOfFour(n);
        }
    });
    std::cout << "Optimized (Bitwise): " << time_opt << " ms (Last result: " << (dummy_bool_opt ? "true" : "false") << ")" << std::endl;

    bool dummy_bool_brute = false;
    long long time_brute = measure_time_ms([&]() {
        for (int n : test_numbers) {
            dummy_bool_brute = bm::isPowerOfFour_Brute(n);
        }
    });
    std::cout << "Brute Force (Division): " << time_brute << " ms (Last result: " << (dummy_bool_brute ? "true" : "false") << ")" << std::endl;
}


int main() {
    std::cout << "Starting Bit Manipulation Benchmarks..." << std::endl;
    
    // Call each benchmark function
    benchmark_countSetBits();
    benchmark_singleNumber();
    benchmark_reverseBits();
    benchmark_isPowerOfTwo();
    benchmark_isPowerOfFour();

    std::cout << "\nAll Benchmarks Completed." << std::endl;
    return 0;
}
```