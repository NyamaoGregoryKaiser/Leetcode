#include "../src/array_manipulation.hpp"
#include "../src/utils.hpp"
#include <iostream>
#include <vector>
#include <random> // For generating random numbers
#include <algorithm> // For std::is_sorted

// Helper function to generate a large test vector
std::vector<int> generate_random_vector(size_t size, int min_val, int max_val) {
    std::vector<int> vec(size);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(min_val, max_val);
    for (size_t i = 0; i < size; ++i) {
        vec[i] = distrib(gen);
    }
    return vec;
}

// Function to verify rotate array results (optional, for sanity check)
bool verify_rotation(const std::vector<int>& original, const std::vector<int>& rotated, int k) {
    if (original.size() != rotated.size()) return false;
    if (original.empty()) return true;

    int n = original.size();
    k %= n;

    for (int i = 0; i < n; ++i) {
        if (original[i] != rotated[(i + k) % n]) {
            return false;
        }
    }
    return true;
}


void benchmarkRotateArray() {
    std::cout << "--- Benchmarking Rotate Array ---" << std::endl;
    const int NUM_ELEMENTS = 100000; // 100k elements
    const int K_VALUE = 30000;      // Rotate by k (e.g., 30% of N)
    const int NUM_RUNS = 10;        // Number of times to run each algorithm for averaging

    std::vector<int> original_vec = generate_random_vector(NUM_ELEMENTS, 0, 1000);
    std::vector<int> test_vec;
    Timer timer;
    double total_time;

    // --- Brute Force ---
    // Note: Brute force is too slow for large N, this will take a very long time
    // For practical benchmarking, you might want to comment this out or use a much smaller NUM_ELEMENTS.
    /*
    std::cout << "Benchmarking Brute Force (O(N*K))... (May be very slow for large N)" << std::endl;
    total_time = 0;
    for (int i = 0; i < NUM_RUNS; ++i) {
        test_vec = original_vec;
        timer.reset();
        RotateArray::rotateBruteForce(test_vec, K_VALUE);
        total_time += timer.elapsed_ms();
    }
    std::cout << "  Average Brute Force Time: " << total_time / NUM_RUNS << " ms" << std::endl;
    // assert(verify_rotation(original_vec, test_vec, K_VALUE)); // Verification only if run
    */

    // --- With Extra Space ---
    std::cout << "Benchmarking With Extra Space (O(N) time, O(N) space)..." << std::endl;
    total_time = 0;
    for (int i = 0; i < NUM_RUNS; ++i) {
        test_vec = original_vec;
        timer.reset();
        RotateArray::rotateWithExtraSpace(test_vec, K_VALUE);
        total_time += timer.elapsed_ms();
    }
    std::cout << "  Average With Extra Space Time: " << total_time / NUM_RUNS << " ms" << std::endl;
    // assert(verify_rotation(original_vec, test_vec, K_VALUE)); // Verification


    // --- Three Reversals ---
    std::cout << "Benchmarking Three Reversals (O(N) time, O(1) space)..." << std::endl;
    total_time = 0;
    for (int i = 0; i < NUM_RUNS; ++i) {
        test_vec = original_vec;
        timer.reset();
        RotateArray::rotateThreeReversals(test_vec, K_VALUE);
        total_time += timer.elapsed_ms();
    }
    std::cout << "  Average Three Reversals Time: " << total_time / NUM_RUNS << " ms" << std::endl;
    // assert(verify_rotation(original_vec, test_vec, K_VALUE)); // Verification

    // --- Juggling Algorithm ---
    std::cout << "Benchmarking Juggling Algorithm (O(N) time, O(1) space)..." << std::endl;
    total_time = 0;
    for (int i = 0; i < NUM_RUNS; ++i) {
        test_vec = original_vec;
        timer.reset();
        RotateArray::rotateJugglingAlgorithm(test_vec, K_VALUE);
        total_time += timer.elapsed_ms();
    }
    std::cout << "  Average Juggling Algorithm Time: " << total_time / NUM_RUNS << " ms" << std::endl;
    // assert(verify_rotation(original_vec, test_vec, K_VALUE)); // Verification

    std::cout << "-----------------------------------" << std::endl << std::endl;
}

void benchmarkProductExceptSelf() {
    std::cout << "--- Benchmarking Product of Array Except Self ---" << std::endl;
    const int NUM_ELEMENTS = 1000000; // 1 million elements
    const int NUM_RUNS = 10;

    std::vector<int> original_vec = generate_random_vector(NUM_ELEMENTS, 1, 10); // Avoid zeros for division
    // Introduce a zero for one case (for division method's robustness, though optimal one handles it too)
    if (NUM_ELEMENTS > 100) original_vec[NUM_ELEMENTS / 2] = 0;

    std::vector<int> result;
    Timer timer;
    double total_time;

    // --- With Division ---
    std::cout << "Benchmarking With Division (O(N) time, O(1) space excl. output)..." << std::endl;
    total_time = 0;
    for (int i = 0; i < NUM_RUNS; ++i) {
        timer.reset();
        result = ProductExceptSelf::productExceptSelfWithDivision(original_vec);
        total_time += timer.elapsed_ms();
    }
    std::cout << "  Average With Division Time: " << total_time / NUM_RUNS << " ms" << std::endl;
    // Add verification logic if needed

    // --- Optimal (Prefix/Suffix) ---
    std::cout << "Benchmarking Optimal (Prefix/Suffix) (O(N) time, O(1) space excl. output)..." << std::endl;
    total_time = 0;
    for (int i = 0; i < NUM_RUNS; ++i) {
        timer.reset();
        result = ProductExceptSelf::productExceptSelfOptimal(original_vec);
        total_time += timer.elapsed_ms();
    }
    std::cout << "  Average Optimal Time: " << total_time / NUM_RUNS << " ms" << std::endl;
    // Add verification logic if needed

    std::cout << "-------------------------------------------------" << std::endl << std::endl;
}

void benchmarkMaxSubarray() {
    std::cout << "--- Benchmarking Maximum Subarray Sum ---" << std::endl;
    const int NUM_ELEMENTS = 100000; // 100k elements
    const int NUM_RUNS = 10;

    std::vector<int> original_vec = generate_random_vector(NUM_ELEMENTS, -100, 100);

    int max_sum;
    Timer timer;
    double total_time;

    // --- Brute Force ---
    // Commented out as it's O(N^2) and too slow for 100k elements.
    // Uncomment for smaller NUM_ELEMENTS (e.g., 1000) to see the difference.
    /*
    std::cout << "Benchmarking Brute Force (O(N^2))... (Too slow for large N)" << std::endl;
    total_time = 0;
    for (int i = 0; i < NUM_RUNS; ++i) {
        timer.reset();
        max_sum = MaxSubarray::maxSubArrayBruteForce(original_vec);
        total_time += timer.elapsed_ms();
    }
    std::cout << "  Average Brute Force Time: " << total_time / NUM_RUNS << " ms" << std::endl;
    */

    // --- Kadane's Algorithm ---
    std::cout << "Benchmarking Kadane's Algorithm (O(N) time, O(1) space)..." << std::endl;
    total_time = 0;
    for (int i = 0; i < NUM_RUNS; ++i) {
        timer.reset();
        max_sum = MaxSubarray::maxSubArrayKadane(original_vec);
        total_time += timer.elapsed_ms();
    }
    std::cout << "  Average Kadane's Time: " << total_time / NUM_RUNS << " ms" << std::endl;
    // No easy verification without another O(N^2) or O(N) but different method,
    // rely on unit tests for correctness.

    std::cout << "---------------------------------------" << std::endl << std::endl;
}

void benchmarkMergeIntervals() {
    std::cout << "--- Benchmarking Merge Intervals ---" << std::endl;
    const int NUM_INTERVALS = 100000; // 100k intervals
    const int NUM_RUNS = 10;

    // Generate intervals. Max overlap or min overlap affects performance slightly, but
    // sorting dominates. Let's make them somewhat overlapping and unsorted.
    std::vector<std::vector<int>> original_intervals(NUM_INTERVALS);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib_start(0, NUM_INTERVALS * 2); // Wider range for start
    std::uniform_int_distribution<> distrib_len(1, 100); // Small length intervals

    for (int i = 0; i < NUM_INTERVALS; ++i) {
        int start = distrib_start(gen);
        int end = start + distrib_len(gen);
        original_intervals[i] = {start, end};
    }
    // Shuffle to ensure input is not pre-sorted
    std::shuffle(original_intervals.begin(), original_intervals.end(), gen);

    std::vector<std::vector<int>> result;
    Timer timer;
    double total_time = 0;

    // --- Merge Algorithm ---
    std::cout << "Benchmarking Merge (O(N log N) time, O(N) space)..." << std::endl;
    for (int i = 0; i < NUM_RUNS; ++i) {
        std::vector<std::vector<int>> test_intervals = original_intervals; // Copy for each run
        timer.reset();
        result = MergeIntervals::merge(test_intervals);
        total_time += timer.elapsed_ms();
    }
    std::cout << "  Average Merge Intervals Time: " << total_time / NUM_RUNS << " ms" << std::endl;

    // Basic verification: Check if result is sorted and truly merged.
    // (A full correctness check is in unit tests)
    bool is_sorted_and_merged = true;
    if (!result.empty()) {
        for (size_t i = 0; i < result.size() - 1; ++i) {
            if (result[i][0] > result[i+1][0] || // Not sorted by start
                result[i][1] >= result[i+1][0]) { // Overlap not merged
                is_sorted_and_merged = false;
                break;
            }
        }
    }
    if (is_sorted_and_merged) {
        std::cout << "  (Result appears sorted and merged, size: " << result.size() << ")" << std::endl;
    } else {
        std::cout << "  (Warning: Result does NOT appear correctly sorted or merged!)" << std::endl;
    }

    std::cout << "---------------------------------" << std::endl << std::endl;
}


int main() {
    std::cout << "--- Running Array Manipulation Benchmarks ---" << std::endl << std::endl;

    benchmarkRotateArray();
    benchmarkProductExceptSelf();
    benchmarkMaxSubarray();
    benchmarkMergeIntervals();

    std::cout << "All benchmarks completed." << std::endl;
    return 0;
}