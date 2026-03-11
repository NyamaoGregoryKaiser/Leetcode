#include "../src/two_sum.h"
#include "../src/longest_consecutive_sequence.h"
#include "../src/group_anagrams.h"
#include "../src/lfu_cache.h"

#include <iostream>
#include <vector>
#include <string>
#include <chrono>
#include <random>
#include <algorithm> // For std::iota, std::shuffle

// Helper function to generate a random vector of integers
std::vector<int> generateRandomVector(size_t size, int min_val = 0, int max_val = 10000) {
    std::vector<int> vec(size);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(min_val, max_val);
    for (size_t i = 0; i < size; ++i) {
        vec[i] = distrib(gen);
    }
    return vec;
}

// Helper function to generate a random vector of strings for anagrams
std::vector<std::string> generateRandomStrings(size_t num_strings, size_t string_len, bool allow_anagrams = true) {
    std::vector<std::string> strs;
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib('a', 'z');

    for (size_t i = 0; i < num_strings; ++i) {
        std::string s(string_len, ' ');
        for (size_t j = 0; j < string_len; ++j) {
            s[j] = distrib(gen);
        }
        if (!allow_anagrams && i > 0) {
            // Simple way to try to avoid anagrams: make sure it's different from the previous.
            // Not guaranteed unique, but reduces anagrams. For true no-anagrams, need more complex check.
            std::string temp_s = s;
            std::sort(temp_s.begin(), temp_s.end());
            // This is a rough way to ensure distinct sorted forms.
            // A perfect solution would require storing all sorted forms and checking for collision.
        }
        strs.push_back(s);
    }
    return strs;
}

// --- Benchmarks for Two Sum ---
void benchmarkTwoSum() {
    std::cout << "--- Benchmarking Two Sum ---" << std::endl;

    std::vector<size_t> sizes = {1000, 10000, 50000};
    int target = 1000000; // A plausible target within typical ranges

    for (size_t size : sizes) {
        std::vector<int> nums = generateRandomVector(size, 1, target);
        // Ensure a solution exists by taking two random elements and making them sum to target
        if (size >= 2) {
            std::random_device rd;
            std::mt19937 gen(rd());
            std::uniform_int_distribution<> distrib_idx(0, size - 1);
            int idx1 = distrib_idx(gen);
            int idx2 = distrib_idx(gen);
            while (idx1 == idx2) idx2 = distrib_idx(gen); // Ensure different indices

            nums[idx1] = target / 2;
            nums[idx2] = target - nums[idx1];
        }

        std::cout << "Benchmarking with " << size << " elements:" << std::endl;

        // Brute Force
        auto start = std::chrono::high_resolution_clock::now();
        TwoSum::twoSum_bruteForce(nums, target);
        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> elapsed_ms = end - start;
        std::cout << "  Brute Force: " << elapsed_ms.count() << " ms" << std::endl;

        // Hash Map
        start = std::chrono::high_resolution_clock::now();
        TwoSum::twoSum_hashMap(nums, target);
        end = std::chrono::high_resolution_clock::now();
        elapsed_ms = end - start;
        std::cout << "  Hash Map:    " << elapsed_ms.count() << " ms" << std::endl;
    }
    std::cout << std::endl;
}

// --- Benchmarks for Longest Consecutive Sequence ---
void benchmarkLongestConsecutiveSequence() {
    std::cout << "--- Benchmarking Longest Consecutive Sequence ---" << std::endl;

    std::vector<size_t> sizes = {1000, 10000, 50000};

    for (size_t size : sizes) {
        std::vector<int> nums = generateRandomVector(size, 0, static_cast<int>(size * 2)); // Range for better consecutive sequences
        std::cout << "Benchmarking with " << size << " elements:" << std::endl;

        // Sort
        auto nums_copy_sort = nums; // Copy for sorting
        auto start = std::chrono::high_resolution_clock::now();
        LongestConsecutiveSequence::longestConsecutive_sort(nums_copy_sort);
        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> elapsed_ms = end - start;
        std::cout << "  Sort based:  " << elapsed_ms.count() << " ms" << std::endl;

        // Hash Set
        auto start_hs = std::chrono::high_resolution_clock::now();
        LongestConsecutiveSequence::longestConsecutive_hashSet(nums);
        auto end_hs = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> elapsed_hs_ms = end_hs - start_hs;
        std::cout << "  Hash Set:    " << elapsed_hs_ms.count() << " ms" << std::endl;
    }
    std::cout << std::endl;
}

// --- Benchmarks for Group Anagrams ---
void benchmarkGroupAnagrams() {
    std::cout << "--- Benchmarking Group Anagrams ---" << std::endl;

    std::vector<size_t> num_strings_options = {100, 1000, 5000};
    size_t string_len = 10; // Fixed string length for simplicity

    for (size_t num_strings : num_strings_options) {
        std::vector<std::string> strs = generateRandomStrings(num_strings, string_len, true); // Allow anagrams
        std::cout << "Benchmarking with " << num_strings << " strings (length " << string_len << "):" << std::endl;

        // Brute Force (may be very slow for larger N, potentially skip for N > 1000)
        if (num_strings <= 1000) { // Limit brute force to avoid extremely long run times
            auto strs_copy_bf = strs;
            auto start_bf = std::chrono::high_resolution_clock::now();
            GroupAnagrams::groupAnagrams_bruteForce(strs_copy_bf);
            auto end_bf = std::chrono::high_resolution_clock::now();
            std::chrono::duration<double, std::milli> elapsed_bf_ms = end_bf - start_bf;
            std::cout << "  Brute Force: " << elapsed_bf_ms.count() << " ms" << std::endl;
        } else {
            std::cout << "  Brute Force: Skipped (too slow for " << num_strings << " strings)" << std::endl;
        }


        // Hash Map
        auto strs_copy_hm = strs;
        auto start_hm = std::chrono::high_resolution_clock::now();
        GroupAnagrams::groupAnagrams_hashMap(strs_copy_hm);
        auto end_hm = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> elapsed_hm_ms = end_hm - start_hm;
        std::cout << "  Hash Map:    " << elapsed_hm_ms.count() << " ms" << std::endl;
    }
    std::cout << std::endl;
}

// --- Benchmarks for LFU Cache ---
void benchmarkLFUCache() {
    std::cout << "--- Benchmarking LFU Cache ---" << std::endl;

    std::vector<int> capacities = {100, 1000, 5000};
    int num_operations_multiplier = 100; // Number of ops will be capacity * multiplier

    std::random_device rd;
    std::mt19937 gen(rd());

    for (int cap : capacities) {
        int num_operations = cap * num_operations_multiplier;
        std::uniform_int_distribution<> key_distrib(1, cap * 2); // Keys can be outside capacity range
        std::uniform_int_distribution<> val_distrib(1, 1000);
        std::uniform_int_distribution<> op_type_distrib(0, 1); // 0 for put, 1 for get

        LFUCache::LFUCache cache(cap);
        std::cout << "Benchmarking LFU Cache with capacity " << cap << " and " << num_operations << " operations:" << std::endl;

        auto start = std::chrono::high_resolution_clock::now();
        for (int i = 0; i < num_operations; ++i) {
            int key = key_distrib(gen);
            int value = val_distrib(gen);
            if (op_type_distrib(gen) == 0) { // Put operation
                cache.put(key, value);
            } else { // Get operation
                cache.get(key);
            }
        }
        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> elapsed_ms = end - start;
        std::cout << "  LFU Cache Ops: " << elapsed_ms.count() << " ms" << std::endl;
    }
    std::cout << std::endl;
}

// Entry point for all benchmarks
void runAllBenchmarks() {
    std::cout << "========================================" << std::endl;
    std::cout << "          Running All Benchmarks        " << std::endl;
    std::cout << "========================================" << std::endl << std::endl;

    benchmarkTwoSum();
    benchmarkLongestConsecutiveSequence();
    benchmarkGroupAnagrams();
    benchmarkLFUCache();

    std::cout << "========================================" << std::endl;
    std::cout << "     All Benchmarks Completed!          " << std::endl;
    std::cout << "========================================" << std::endl;
}