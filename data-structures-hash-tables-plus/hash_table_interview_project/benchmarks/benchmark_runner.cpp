```cpp
#include "../src/main_algorithms.cpp" // Include the implementation file directly for benchmarking
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <random>
#include <numeric>

// Alias for convenience
using namespace HashTableProblems;
using namespace Timing;
using namespace std;

// --- Helper functions for generating test data ---

// Generates a vector of random integers
vector<int> generate_random_vector(int size, int min_val, int max_val) {
    vector<int> vec(size);
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> distrib(min_val, max_val);
    for (int i = 0; i < size; ++i) {
        vec[i] = distrib(gen);
    }
    return vec;
}

// Generates a vector of strings for anagrams
vector<string> generate_anagram_strings(int num_strings, int string_len) {
    vector<string> strs;
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> char_distrib('a', 'z');

    // Create a base string for anagrams
    string base_str(string_len, ' ');
    for (int i = 0; i < string_len; ++i) {
        base_str[i] = char_distrib(gen);
    }

    // Generate strings that are either anagrams of the base or random
    for (int i = 0; i < num_strings; ++i) {
        string s = base_str;
        if (i % 2 == 0) { // Half are anagrams of the base
            shuffle(s.begin(), s.end(), gen);
        } else { // Other half are random strings
            for (int j = 0; j < string_len; ++j) {
                s[j] = char_distrib(gen);
            }
        }
        strs.push_back(s);
    }
    return strs;
}

// Generates a string of random characters
string generate_random_string(int length) {
    string s(length, ' ');
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> char_distrib('a', 'z');
    for (int i = 0; i < length; ++i) {
        s[i] = char_distrib(gen);
    }
    return s;
}


// --- Benchmarking Functions ---

void benchmark_two_sum() {
    cout << "\n--- Benchmarking Two Sum ---\n";
    vector<int> sizes = {1000, 10000, 50000, 100000}; // Input sizes

    for (int size : sizes) {
        cout << "Testing with " << size << " elements...\n";
        vector<int> nums = generate_random_vector(size, 1, 1000000);
        int target = nums[size / 2] + nums[size / 3]; // Ensure a solution exists

        // Brute Force
        Timer timer_bf;
        vector<int> res_bf = twoSum_bruteForce(nums, target);
        long long time_bf = timer_bf.elapsed_microseconds();
        cout << "  Brute Force: " << time_bf << " us\n";

        // Hash Map
        Timer timer_hm;
        vector<int> res_hm = twoSum_hashMap(nums, target);
        long long time_hm = timer_hm.elapsed_microseconds();
        cout << "  Hash Map:    " << time_hm << " us\n";
    }
}

void benchmark_longest_consecutive_sequence() {
    cout << "\n--- Benchmarking Longest Consecutive Sequence ---\n";
    vector<int> sizes = {10000, 50000, 100000, 500000};

    for (int size : sizes) {
        cout << "Testing with " << size << " elements...\n";
        vector<int> nums = generate_random_vector(size, 1, size * 2); // Some chance of consecutive numbers
        
        // Ensure a long sequence for worst case (e.g., almost sorted)
        if (size == 500000) {
            nums.clear();
            for (int i = 0; i < size; ++i) nums.push_back(i); // Best case for sorting, worst for hash set starts
            random_shuffle(nums.begin(), nums.end()); // Shuffle to make it unsorted but with long sequence
        }

        // Sorting Approach
        vector<int> nums_copy_sort = nums; // Copy for sorting approach
        Timer timer_sort;
        int res_sort = longestConsecutive_sorting(nums_copy_sort);
        long long time_sort = timer_sort.elapsed_microseconds();
        cout << "  Sorting: " << time_sort << " us\n";

        // Hash Set Approach
        Timer timer_hs;
        int res_hs = longestConsecutive(nums);
        long long time_hs = timer_hs.elapsed_microseconds();
        cout << "  Hash Set: " << time_hs << " us\n";
    }
}

void benchmark_group_anagrams() {
    cout << "\n--- Benchmarking Group Anagrams ---\n";
    vector<pair<int, int>> configs = {{1000, 10}, {5000, 15}, {10000, 20}, {20000, 25}}; // {num_strings, string_len}

    for (auto config : configs) {
        int num_strings = config.first;
        int string_len = config.second;
        cout << "Testing with " << num_strings << " strings of length " << string_len << "...\n";
        vector<string> strs = generate_anagram_strings(num_strings, string_len);

        // Sorted Key Approach
        Timer timer_sorted_key;
        vector<vector<string>> res_sk = groupAnagrams(strs);
        long long time_sk = timer_sorted_key.elapsed_microseconds();
        cout << "  Sorted Key:    " << time_sk << " us\n";

        // Char Count Key Approach
        Timer timer_char_count;
        vector<vector<string>> res_cc = groupAnagrams_charCountKey(strs);
        long long time_cc = timer_char_count.elapsed_microseconds();
        cout << "  Char Count Key: " << time_cc << " us\n";
    }
}

void benchmark_first_unique_char() {
    cout << "\n--- Benchmarking First Unique Character ---\n";
    vector<int> lengths = {10000, 50000, 100000, 500000, 1000000};

    for (int len : lengths) {
        cout << "Testing with string length " << len << "...\n";
        string s = generate_random_string(len);
        
        // Ensure a unique character often for worst case (map lookup and iteration)
        if (len > 100) {
            s[len / 2] = 'z'; // Place a unique character in the middle
            s[len / 2 + 1] = 'y'; // Another one
            s[len / 2 + 2] = 'x';
            // Also ensure some non-unique
            s[0] = 'a';
            s[1] = 'a';
        }


        // Hash Map Approach
        Timer timer_hm;
        int res_hm = firstUniqChar(s);
        long long time_hm = timer_hm.elapsed_microseconds();
        cout << "  Hash Map: " << time_hm << " us\n";

        // Array (fixed size) Approach
        Timer timer_arr;
        int res_arr = firstUniqChar_array(s);
        long long time_arr = timer_arr.elapsed_microseconds();
        cout << "  Array (Fixed Size): " << time_arr << " us\n";
    }
}

void benchmark_my_hash_map() {
    cout << "\n--- Benchmarking MyHashMap (put/get/remove operations) ---\n";
    vector<int> num_operations = {10000, 50000, 100000, 500000};
    
    for (int ops : num_operations) {
        cout << "Testing with " << ops << " operations...\n";
        
        MyHashMap my_map;
        vector<int> keys_to_use = generate_random_vector(ops, 0, ops * 2); // Keys will vary, some collisions expected
        
        // Benchmark put operations
        Timer timer_put;
        for (int i = 0; i < ops; ++i) {
            my_map.put(keys_to_use[i], i);
        }
        long long time_put = timer_put.elapsed_microseconds();
        cout << "  Put " << ops << " elements: " << time_put << " us\n";

        // Benchmark get operations
        Timer timer_get;
        for (int i = 0; i < ops; ++i) {
            my_map.get(keys_to_use[i]);
        }
        long long time_get = timer_get.elapsed_microseconds();
        cout << "  Get " << ops << " elements: " << time_get << " us\n";

        // Benchmark remove operations
        Timer timer_remove;
        for (int i = 0; i < ops; ++i) {
            my_map.remove(keys_to_use[i]);
        }
        long long time_remove = timer_remove.elapsed_microseconds();
        cout << "  Remove " << ops << " elements: " << time_remove << " us\n";

        // Verify map is empty
        if (my_map.size() == 0) {
            cout << "  Map successfully emptied.\n";
        } else {
            cout << "  Warning: Map not empty after removal (" << my_map.size() << " elements remaining).\n";
        }
    }
}


int main() {
    benchmark_two_sum();
    benchmark_longest_consecutive_sequence();
    benchmark_group_anagrams();
    benchmark_first_unique_char();
    benchmark_my_hash_map();
    return 0;
}
```