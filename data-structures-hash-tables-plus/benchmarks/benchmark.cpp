#include <iostream>
#include <vector>
#include <string>
#include <chrono>
#include <random>
#include <algorithm> // For std::shuffle

// Include utility functions (e.g., for printing, not strictly needed for benchmarking logic)
#include "../src/utils.hpp"
// Include problem solutions
#include "../src/main_problems.cpp"

// Namespace alias for convenience
namespace Problem = HashTableProblems;

// --- Helper for timing ---
template <typename Func>
long long measureTime(Func func) {
    auto start = std::chrono::high_resolution_clock::now();
    func();
    auto end = std::chrono::high_resolution_clock::now();
    return std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
}

// --- Data Generation Functions ---
std::vector<int> generateRandomVector(int size, int min_val, int max_val) {
    std::vector<int> vec(size);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(min_val, max_val);
    for (int i = 0; i < size; ++i) {
        vec[i] = distrib(gen);
    }
    return vec;
}

std::vector<std::string> generateRandomStringVector(int num_strings, int min_len, int max_len) {
    std::vector<std::string> strs;
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> len_distrib(min_len, max_len);
    std::uniform_int_distribution<> char_distrib('a', 'z');

    for (int i = 0; i < num_strings; ++i) {
        int len = len_distrib(gen);
        std::string s(len, ' ');
        for (int j = 0; j < len; ++j) {
            s[j] = char_distrib(gen);
        }
        strs.push_back(s);
    }
    return strs;
}

std::vector<std::string> generateAnagrams(int num_groups, int group_size, int str_len) {
    std::vector<std::string> strs;
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> char_distrib('a', 'z');

    for (int i = 0; i < num_groups; ++i) {
        std::string base_str(str_len, ' ');
        for (int k = 0; k < str_len; ++k) {
            base_str[k] = char_distrib(gen);
        }
        for (int j = 0; j < group_size; ++j) {
            std::string anagram = base_str;
            std::shuffle(anagram.begin(), anagram.end(), gen);
            strs.push_back(anagram);
        }
    }
    return strs;
}

// --- Benchmarking Functions ---

void benchmarkTwoSum() {
    std::cout << "\n--- Benchmarking Two Sum ---\n";
    std::vector<int> sizes = {1000, 10000, 50000}; // Increased sizes for better differentiation

    for (int size : sizes) {
        std::vector<int> nums = generateRandomVector(size, -size, size);
        int target = nums[size / 2] + nums[size / 3]; // Ensure a target exists
        std::cout << "Input size: " << size << "\n";

        long long time_optimal = measureTime([&]() {
            Problem::twoSum_Optimal(nums, target);
        });
        std::cout << "  Optimal (Hash Map): " << time_optimal << " microseconds\n";

        long long time_brute_force = measureTime([&]() {
            Problem::twoSum_BruteForce(nums, target);
        });
        std::cout << "  Brute Force:        " << time_brute_force << " microseconds\n";
    }
}

void benchmarkLongestConsecutiveSequence() {
    std::cout << "\n--- Benchmarking Longest Consecutive Sequence ---\n";
    std::vector<int> sizes = {10000, 100000, 500000}; // Increased sizes

    for (int size : sizes) {
        std::vector<int> nums = generateRandomVector(size, 0, size * 2); // Spread out numbers to vary sequence length
        std::cout << "Input size: " << size << "\n";

        long long time_optimal = measureTime([&]() {
            Problem::longestConsecutive_Optimal(nums);
        });
        std::cout << "  Optimal (Hash Set): " << time_optimal << " microseconds\n";

        long long time_sorting = measureTime([&]() {
            Problem::longestConsecutive_Sorting(nums);
        });
        std::cout << "  Sorting:            " << time_sorting << " microseconds\n";
    }
}

void benchmarkGroupAnagrams() {
    std::cout << "\n--- Benchmarking Group Anagrams ---\n";
    std::vector<int> num_strings_configs = {1000, 5000, 10000};
    int str_len = 10; // Fixed string length for simplicity in comparison

    for (int num_strings : num_strings_configs) {
        // Generate strings with some anagrams
        std::vector<std::string> strs = generateAnagrams(num_strings / 5, 5, str_len); // E.g., 200 groups of 5
        // Add some unique strings
        std::vector<std::string> unique_strs = generateRandomStringVector(num_strings - strs.size(), str_len, str_len);
        strs.insert(strs.end(), unique_strs.begin(), unique_strs.end());
        std::random_device rd;
        std::mt19937 gen(rd());
        std::shuffle(strs.begin(), strs.end(), gen); // Shuffle to mix them up

        std::cout << "Input strings: " << strs.size() << ", Avg string length: " << str_len << "\n";

        long long time_optimal_sort_key = measureTime([&]() {
            Problem::groupAnagrams_Optimal(strs);
        });
        std::cout << "  Optimal (Sort Key):   " << time_optimal_sort_key << " microseconds\n";

        long long time_optimal_count_key = measureTime([&]() {
            Problem::groupAnagrams_Counting(strs);
        });
        std::cout << "  Optimal (Count Key):  " << time_optimal_count_key << " microseconds\n";
    }
}

void benchmarkFirstUniqueCharacter() {
    std::cout << "\n--- Benchmarking First Unique Character ---\n";
    std::vector<int> sizes = {10000, 100000, 1000000}; // Increased sizes
    
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> char_distrib('a', 'z');

    for (int size : sizes) {
        std::string s(size, 'a');
        // Fill string with repeating characters, ensure a unique one somewhere in the middle.
        for(int i = 0; i < size; ++i) {
            s[i] = char_distrib(gen);
        }
        // Ensure at least one unique character exists for a realistic test
        if (size > 0) {
            s[size/2] = 'A'; // Using 'A' to make it unique against 'a'-'z' range
        }


        std::cout << "Input string length: " << size << "\n";

        long long time_optimal = measureTime([&]() {
            Problem::firstUniqChar_Optimal(s);
        });
        std::cout << "  Optimal (Freq Map): " << time_optimal << " microseconds\n";

        long long time_brute_force = measureTime([&]() {
            Problem::firstUniqChar_BruteForce(s);
        });
        std::cout << "  Brute Force:        " << time_brute_force << " microseconds\n";
    }
}

void benchmarkContainsDuplicate() {
    std::cout << "\n--- Benchmarking Contains Duplicate ---\n";
    std::vector<int> sizes = {100000, 1000000, 5000000}; // Large sizes
    
    for (int size : sizes) {
        std::vector<int> nums = generateRandomVector(size, 0, size / 2); // Many duplicates likely
        std::cout << "Input size: " << size << "\n";

        long long time_optimal = measureTime([&]() {
            Problem::containsDuplicate_Optimal(nums);
        });
        std::cout << "  Optimal (Hash Set): " << time_optimal << " microseconds\n";

        long long time_sorting = measureTime([&]() {
            Problem::containsDuplicate_Sorting(nums);
        });
        std::cout << "  Sorting:            " << time_sorting << " microseconds\n";
        
        // Brute force is too slow for these sizes, skip for practical benchmarking
        // long long time_brute_force = measureTime([&]() {
        //     Problem::containsDuplicate_BruteForce(nums);
        // });
        // std::cout << "  Brute Force:        " << time_brute_force << " microseconds\n";
    }
}


int main() {
    std::cout << "Starting benchmarks...\n";

    benchmarkTwoSum();
    benchmarkLongestConsecutiveSequence();
    benchmarkGroupAnagrams();
    benchmarkFirstUniqueCharacter();
    benchmarkContainsDuplicate();

    std::cout << "\nBenchmarks completed.\n";
    return 0;
}