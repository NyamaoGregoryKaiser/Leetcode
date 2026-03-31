```cpp
#include "../src/main_algorithms.cpp" // Include the .cpp to get all functions
#include "../utils/data_generator.hpp" // For data generation utilities
#include <iostream>
#include <vector>
#include <chrono>
#include <algorithm> // For std::sort

// Helper to time a function
template <typename Func>
long long benchmark(Func func) {
    auto start = std::chrono::high_resolution_clock::now();
    func();
    auto end = std::chrono::high_resolution_clock::now();
    return std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count();
}

// Global list of nodes for Merge K Lists problem to manage memory properly
std::vector<DataGenerator::ListNode*> global_lists_for_merge;
DataGenerator::ListNode* global_merged_list = nullptr;

void cleanup_merge_k_lists() {
    if (global_merged_list) {
        DataGenerator::deleteList(global_merged_list);
        global_merged_list = nullptr;
    }
    for (DataGenerator::ListNode* list : global_lists_for_merge) {
        DataGenerator::deleteList(list);
    }
    global_lists_for_merge.clear();
}


void run_kth_largest_benchmark() {
    std::cout << "\n--- Benchmarking Kth Largest Element in a Stream ---" << std::endl;
    std::vector<int> stream_sizes = {1000, 10000, 100000, 500000};
    int k_val = 100; // Constant K for comparison

    for (int size : stream_sizes) {
        std::cout << "\nStream size: " << size << ", K: " << k_val << std::endl;
        std::vector<int> initial_nums = DataGenerator::generateRandomVector(size / 10, 0, size);
        std::vector<int> add_nums = DataGenerator::generateRandomVector(size - initial_nums.size(), 0, size);

        // Custom Heap
        long long time_custom = benchmark([&]() {
            KthLargest_CustomHeap kthLargest_custom(k_val, initial_nums);
            for (int num : add_nums) {
                kthLargest_custom.add(num);
            }
        });
        std::cout << "  Custom MinHeap: " << time_custom << " ms" << std::endl;

        // Std Priority Queue
        long long time_std = benchmark([&]() {
            KthLargest_StdHeap kthLargest_std(k_val, initial_nums);
            for (int num : add_nums) {
                kthLargest_std.add(num);
            }
        });
        std::cout << "  std::priority_queue: " << time_std << " ms" << std::endl;
    }
}

void run_merge_k_lists_benchmark() {
    std::cout << "\n--- Benchmarking Merge K Sorted Lists ---" << std::endl;
    std::vector<std::pair<int, int>> configs = { // {num_lists, avg_list_size}
        {10, 100},
        {100, 100},
        {10, 1000},
        {100, 1000}
    };

    for (auto config : configs) {
        int num_lists = config.first;
        int avg_list_size = config.second;
        int total_elements = num_lists * avg_list_size;
        std::cout << "\nNum Lists: " << num_lists << ", Avg List Size: " << avg_list_size << " (Total ~" << total_elements << " elements)" << std::endl;

        // Custom Heap
        cleanup_merge_k_lists(); // Clean up from previous run
        global_lists_for_merge = DataGenerator::generateKSortedLists(num_lists, avg_list_size, total_elements * 2);
        std::vector<DataGenerator::ListNode*> lists_copy_custom = global_lists_for_merge; // Copy pointers to avoid modifying original
        long long time_custom = benchmark([&]() {
            global_merged_list = mergeKLists_CustomHeap(lists_copy_custom);
        });
        std::cout << "  Custom MinHeap: " << time_custom << " ms" << std::endl;
        cleanup_merge_k_lists();

        // Std Priority Queue
        cleanup_merge_k_lists();
        global_lists_for_merge = DataGenerator::generateKSortedLists(num_lists, avg_list_size, total_elements * 2);
        std::vector<DataGenerator::ListNode*> lists_copy_std = global_lists_for_merge;
        long long time_std = benchmark([&]() {
            global_merged_list = mergeKLists_StdHeap(lists_copy_std);
        });
        std::cout << "  std::priority_queue: " << time_std << " ms" << std::endl;
        cleanup_merge_k_lists();

        // Brute Force (may be very slow for large inputs)
        cleanup_merge_k_lists();
        global_lists_for_merge = DataGenerator::generateKSortedLists(num_lists, avg_list_size, total_elements * 2);
        std::vector<DataGenerator::ListNode*> lists_copy_brute_force = global_lists_for_merge;
        long long time_brute_force = benchmark([&]() {
            global_merged_list = mergeKLists_BruteForce(lists_copy_brute_force);
        });
        std::cout << "  Brute Force: " << time_brute_force << " ms" << std::endl;
        cleanup_merge_k_lists();
    }
}

void run_median_finder_benchmark() {
    std::cout << "\n--- Benchmarking Find Median from Data Stream ---" << std::endl;
    std::vector<int> num_elements_list = {10000, 100000, 500000};

    for (int num_elements : num_elements_list) {
        std::cout << "\nTotal Elements to Add: " << num_elements << std::endl;
        std::vector<int> data = DataGenerator::generateRandomVector(num_elements, 0, num_elements * 2);

        // Custom Heaps
        long long time_custom = benchmark([&]() {
            MedianFinder_CustomHeap mf_custom;
            for (int i = 0; i < num_elements; ++i) {
                mf_custom.addNum(data[i]);
                if (i % 100 == 0) mf_custom.findMedian(); // Simulate occasional median queries
            }
        });
        std::cout << "  Custom Heaps: " << time_custom << " ms" << std::endl;

        // Std Priority Queues
        long long time_std = benchmark([&]() {
            MedianFinder_StdHeap mf_std;
            for (int i = 0; i < num_elements; ++i) {
                mf_std.addNum(data[i]);
                if (i % 100 == 0) mf_std.findMedian(); // Simulate occasional median queries
            }
        });
        std::cout << "  std::priority_queue: " << time_std << " ms" << std::endl;
    }
}

void run_top_k_frequent_benchmark() {
    std::cout << "\n--- Benchmarking Top K Frequent Elements ---" << std::endl;
    std::vector<std::pair<int, int>> configs = { // {array_size, k_val}
        {10000, 10},
        {100000, 10},
        {100000, 100},
        {500000, 100}
    };

    for (auto config : configs) {
        int array_size = config.first;
        int k_val = config.second;
        std::cout << "\nArray Size: " << array_size << ", K: " << k_val << std::endl;

        // Generate data with some duplicates (e.g., values within 1/4 of array_size range)
        std::vector<int> nums = DataGenerator::generateRandomVectorWithUnique(array_size, array_size / 4, 0, array_size / 2);

        // Custom Heap
        long long time_custom = benchmark([&]() {
            topKFrequent_CustomHeap(nums, k_val);
        });
        std::cout << "  Custom MinHeap: " << time_custom << " ms" << std::endl;

        // Std Priority Queue
        long long time_std = benchmark([&]() {
            topKFrequent_StdHeap(nums, k_val);
        });
        std::cout << "  std::priority_queue: " << time_std << " ms" << std::endl;

        // Brute Force (Sort map entries)
        long long time_brute_force = benchmark([&]() {
            topKFrequent_BruteForce(nums, k_val);
        });
        std::cout << "  Brute Force: " << time_brute_force << " ms" << std::endl;
    }
}


int main() {
    std::cout << "--- Running Performance Benchmarks ---" << std::endl;

    run_kth_largest_benchmark();
    run_merge_k_lists_benchmark();
    run_median_finder_benchmark();
    run_top_k_frequent_benchmark();

    std::cout << "\n--- Benchmarking Complete ---" << std::endl;
    return 0;
}
```