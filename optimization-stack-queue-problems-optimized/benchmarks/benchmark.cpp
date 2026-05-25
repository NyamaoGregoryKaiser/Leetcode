#include "problems.h"
#include "../brute_force_examples/brute_force.cpp" // Include brute-force implementations
#include "utilities.h"
#include <iostream>
#include <vector>
#include <random>
#include <algorithm> // For std::is_sorted

// Function to generate a large random vector of temperatures
std::vector<int> generateRandomTemperatures(int size, int min_temp, int max_temp) {
    std::vector<int> temps(size);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(min_temp, max_temp);

    for (int i = 0; i < size; ++i) {
        temps[i] = distrib(gen);
    }
    return temps;
}

// Function to generate a large random vector of numbers for sliding window
std::vector<int> generateRandomNumbers(int size) {
    std::vector<int> nums(size);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(-1000, 1000); // Range for numbers

    for (int i = 0; i < size; ++i) {
        nums[i] = distrib(gen);
    }
    return nums;
}


void benchmarkDailyTemperatures() {
    std::cout << "\n--- Benchmarking Daily Temperatures ---" << std::endl;

    const int SIZES[] = {1000, 5000, 10000, 20000};
    const int NUM_RUNS = 5;

    for (int size : SIZES) {
        std::cout << "\nInput Size: " << size << std::endl;
        double total_optimized_time = 0.0;
        double total_brute_force_time = 0.0;

        for (int run = 0; run < NUM_RUNS; ++run) {
            std::vector<int> temps = generateRandomTemperatures(size, 30, 100);

            // Optimized (Monotonic Stack)
            Utils::Timer timer_opt;
            timer_opt.start();
            std::vector<int> result_opt = DailyTemperatures::dailyTemperatures(temps);
            total_optimized_time += timer_opt.stop();

            // Brute Force
            Utils::Timer timer_bf;
            timer_bf.start();
            std::vector<int> result_bf = DailyTemperaturesBruteForce::dailyTemperatures(temps);
            total_brute_force_time += timer_bf.stop();

            // Sanity check results (only for one run to avoid overhead)
            if (run == 0 && !Utils::compareVectors(result_opt, result_bf)) {
                std::cerr << "WARNING: Results mismatch for size " << size << " (Daily Temperatures)" << std::endl;
            }
        }

        std::cout << "  Optimized (Monotonic Stack) Avg Time: " << (total_optimized_time / NUM_RUNS) << " ms" << std::endl;
        std::cout << "  Brute Force (O(N^2)) Avg Time:        " << (total_brute_force_time / NUM_RUNS) << " ms" << std::endl;
    }
}

void benchmarkSlidingWindowMaximum() {
    std::cout << "\n--- Benchmarking Sliding Window Maximum ---" << std::endl;

    const int SIZES[] = {1000, 5000, 10000, 50000, 100000};
    const int K_VALUES[] = {10, 100, 500}; // Different window sizes
    const int NUM_RUNS = 3;

    for (int size : SIZES) {
        for (int k : K_VALUES) {
            if (k > size) continue; // Window size cannot be greater than array size

            std::cout << "\nInput Size: " << size << ", Window Size k: " << k << std::endl;
            double total_optimized_time = 0.0;
            double total_brute_force_time = 0.0;

            for (int run = 0; run < NUM_RUNS; ++run) {
                std::vector<int> nums = generateRandomNumbers(size);

                // Optimized (Deque)
                Utils::Timer timer_opt;
                timer_opt.start();
                std::vector<int> result_opt = SlidingWindowMaximum::maxSlidingWindow(nums, k);
                total_optimized_time += timer_opt.stop();

                // Brute Force
                Utils::Timer timer_bf;
                timer_bf.start();
                std::vector<int> result_bf = SlidingWindowMaximumBruteForce::maxSlidingWindow(nums, k);
                total_brute_force_time += timer_bf.stop();

                // Sanity check results
                if (run == 0 && !Utils::compareVectors(result_opt, result_bf)) {
                    std::cerr << "WARNING: Results mismatch for size " << size << ", k=" << k << " (Sliding Window Maximum)" << std::endl;
                }
            }

            std::cout << "  Optimized (Deque O(N)) Avg Time:       " << (total_optimized_time / NUM_RUNS) << " ms" << std::endl;
            std::cout << "  Brute Force (O(N*K)) Avg Time:         " << (total_brute_force_time / NUM_RUNS) << " ms" << std::endl;
        }
    }
}


int main() {
    std::cout << "Starting Benchmarks..." << std::endl;

    benchmarkDailyTemperatures();
    benchmarkSlidingWindowMaximum();

    std::cout << "\nBenchmarking Complete." << std::endl;
    return 0;
}