```cpp
#include <iostream>
#include <vector>
#include <chrono>   // For high-resolution timing
#include <algorithm> // For std::sort, std::random_shuffle
#include <numeric>   // For std::iota
#include <random>    // For std::mt19937, std::uniform_int_distribution

// Include the main problems file (or its interface if it was a header)
#include "../src/main_heap_problems.cpp" 

// --- Benchmarking Utilities ---
// Use std::chrono for high-resolution timing
using namespace std::chrono;

// Function to measure execution time
template <typename Function>
long long measure_time_ms(Function func) {
    auto start = high_resolution_clock::now();
    func();
    auto stop = high_resolution_clock::now();
    auto duration = duration_cast<milliseconds>(stop - start);
    return duration.count();
}

// Function to generate random vector
std::vector<int> generate_random_vector(int size, int min_val, int max_val) {
    std::vector<int> vec(size);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(min_val, max_val);
    for (int i = 0; i < size; ++i) {
        vec[i] = distrib(gen);
    }
    return vec;
}

// Function to generate sorted vector
std::vector<int> generate_sorted_vector(int size) {
    std::vector<int> vec(size);
    std::iota(vec.begin(), vec.end(), 0); // Fills with 0, 1, 2, ...
    return vec;
}

// Function to generate reverse-sorted vector
std::vector<int> generate_reverse_sorted_vector(int size) {
    std::vector<int> vec(size);
    std::iota(vec.rbegin(), vec.rend(), 0); // Fills with ..., 2, 1, 0
    return vec;
}

// --- Benchmark Functions for Each Problem ---

void benchmark_kth_largest_element() {
    std::cout << "\n--- Benchmarking Kth Largest Element ---" << std::endl;

    std::vector<int> sizes = {10000, 100000, 1000000};
    std::vector<int> k_values_small = {10, 100, 1000}; // Small k
    std::vector<int> k_values_large_fraction = {2, 10, 50}; // k = size / X

    for (int size : sizes) {
        std::cout << "\nArray Size: " << size << std::endl;
        std::vector<int> random_vec = generate_random_vector(size, 0, size * 10);
        std::vector<int> sorted_vec = generate_sorted_vector(size);
        std::vector<int> reverse_sorted_vec = generate_reverse_sorted_vector(size);

        // Test with small k values
        for (int k_val : k_values_small) {
            int k = std::min(k_val, size); // Ensure k is not larger than size
            if (k == 0) continue; // Avoid k=0
            std::cout << "  k = " << k << std::endl;

            // Min-Heap (std::priority_queue)
            std::vector<int> nums_heap_rand = random_vec;
            long long time_heap_rand = measure_time_ms([&]() { findKthLargest_MinHeap(nums_heap_rand, k); });
            std::cout << "    Min-Heap (rand): " << time_heap_rand << " ms" << std::endl;

            // Quickselect (random pivot)
            // Quickselect modifies the array, so pass a copy
            std::vector<int> nums_qs_rand = random_vec;
            long long time_qs_rand = measure_time_ms([&]() { findKthLargest_Quickselect(nums_qs_rand, k); });
            std::cout << "    Quickselect (rand): " << time_qs_rand << " ms" << std::endl;
        }

        // Test with k as a large fraction of size (e.g., median)
        for (int fraction : k_values_large_fraction) {
            int k = size / fraction;
            if (k == 0) k = 1; // Ensure k is at least 1
            std::cout << "  k = size / " << fraction << " (" << k << ")" << std::endl;

            // Min-Heap (std::priority_queue)
            std::vector<int> nums_heap_rand = random_vec;
            long long time_heap_rand = measure_time_ms([&]() { findKthLargest_MinHeap(nums_heap_rand, k); });
            std::cout << "    Min-Heap (rand): " << time_heap_rand << " ms" << std::endl;

            // Quickselect (random pivot)
            std::vector<int> nums_qs_rand = random_vec;
            long long time_qs_rand = measure_time_ms([&]() { findKthLargest_Quickselect(nums_qs_rand, k); });
            std::cout << "    Quickselect (rand): " << time_qs_rand << " ms" << std::endl;
        }

        // Test Quickselect worst-case with sorted/reverse-sorted data (if pivot is not random)
        // Our Quickselect uses a random pivot, so it should perform well even on sorted data.
        // If it used a fixed pivot (e.g., always first element), performance would degrade.
        // This still shows its relative performance.
        int k_median = size / 2;
        if (k_median == 0) k_median = 1;
        std::cout << "  k = median (" << k_median << ")" << std::endl;

        std::vector<int> nums_qs_sorted = sorted_vec;
        long long time_qs_sorted = measure_time_ms([&]() { findKthLargest_Quickselect(nums_qs_sorted, k_median); });
        std::cout << "    Quickselect (sorted): " << time_qs_sorted << " ms" << std::endl;

        std::vector<int> nums_qs_rev_sorted = reverse_sorted_vec;
        long long time_qs_rev_sorted = measure_time_ms([&]() { findKthLargest_Quickselect(nums_qs_rev_sorted, k_median); });
        std::cout << "    Quickselect (rev-sorted): " << time_qs_rev_sorted << " ms" << std::endl;
    }
    std::cout << "-----------------------------------" << std::endl;
}

void benchmark_merge_k_sorted_lists() {
    std::cout << "\n--- Benchmarking Merge K Sorted Lists ---" << std::endl;

    std::vector<int> num_lists_options = {10, 100, 1000};
    int total_elements = 100000; // Total elements across all lists

    for (int k : num_lists_options) {
        if (k == 0) continue;
        std::cout << "\nNumber of lists (K): " << k << std::endl;
        int elements_per_list = total_elements / k;
        if (elements_per_list == 0) elements_per_list = 1;

        std::cout << "  Elements per list: " << elements_per_list << std::endl;
        std::cout << "  Total elements (approx): " << k * elements_per_list << std::endl;

        std::vector<ListNode*> lists_pq;
        std::vector<ListNode*> lists_custom;

        // Create lists
        for (int i = 0; i < k; ++i) {
            std::vector<int> current_list_data = generate_sorted_vector(elements_per_list);
            lists_pq.push_back(create_list(current_list_data));
            lists_custom.push_back(create_list(current_list_data));
        }

        // Benchmark std::priority_queue
        long long time_pq = measure_time_ms([&]() {
            ListNode* merged = mergeKLists_MinHeap(lists_pq);
            delete_list(merged); // Cleanup merged list
        });
        std::cout << "    Min-Heap (std::priority_queue): " << time_pq << " ms" << std::endl;

        // Benchmark CustomMinHeap
        long long time_custom = measure_time_ms([&]() {
            ListNode* merged = mergeKLists_CustomMinHeap(lists_custom);
            delete_list(merged); // Cleanup merged list
        });
        std::cout << "    Custom Min-Heap: " << time_custom << " ms" << std::endl;

        // Cleanup input lists
        for (ListNode* list : lists_pq) delete_list(list);
        for (ListNode* list : lists_custom) delete_list(list);
    }
    std::cout << "-----------------------------------" << std::endl;
}

void benchmark_top_k_frequent_elements() {
    std::cout << "\n--- Benchmarking Top K Frequent Elements ---" << std::endl;

    std::vector<int> sizes = {100000, 1000000};
    std::vector<int> k_values = {10, 100, 1000};

    for (int size : sizes) {
        std::cout << "\nArray Size: " << size << std::endl;

        // Data with varying frequencies (many duplicates)
        std::vector<int> nums_duplicates(size);
        for (int i = 0; i < size; ++i) {
            nums_duplicates[i] = i % (size / 10); // Roughly 10 unique elements on average
        }
        std::random_shuffle(nums_duplicates.begin(), nums_duplicates.end());

        // Data with mostly unique frequencies (fewer duplicates)
        std::vector<int> nums_unique_like = generate_random_vector(size, 0, size / 2); // Many elements, half unique

        for (int k : k_values) {
            if (k == 0) continue;
            std::cout << "  k = " << k << std::endl;

            std::cout << "    (Many duplicates, few unique elements)" << std::endl;
            // Min-Heap (std::priority_queue)
            long long time_heap_dup = measure_time_ms([&]() { topKFrequent_MinHeap(nums_duplicates, k); });
            std::cout << "      Min-Heap (std::pq): " << time_heap_dup << " ms" << std::endl;

            // Custom Min-Heap
            long long time_custom_dup = measure_time_ms([&]() { topKFrequent_CustomMinHeap(nums_duplicates, k); });
            std::cout << "      Custom Min-Heap: " << time_custom_dup << " ms" << std::endl;

            // Bucket Sort
            long long time_bucket_dup = measure_time_ms([&]() { topKFrequent_BucketSort(nums_duplicates, k); });
            std::cout << "      Bucket Sort: " << time_bucket_dup << " ms" << std::endl;

            std::cout << "    (Fewer duplicates, more unique elements)" << std::endl;
            // Min-Heap (std::priority_queue)
            long long time_heap_unique = measure_time_ms([&]() { topKFrequent_MinHeap(nums_unique_like, k); });
            std::cout << "      Min-Heap (std::pq): " << time_heap_unique << " ms" << std::endl;

            // Custom Min-Heap
            long long time_custom_unique = measure_time_ms([&]() { topKFrequent_CustomMinHeap(nums_unique_like, k); });
            std::cout << "      Custom Min-Heap: " << time_custom_unique << " ms" << std::endl;

            // Bucket Sort
            long long time_bucket_unique = measure_time_ms([&]() { topKFrequent_BucketSort(nums_unique_like, k); });
            std::cout << "      Bucket Sort: " << time_bucket_unique << " ms" << std::endl;
        }
    }
    std::cout << "-----------------------------------" << std::endl;
}

void benchmark_median_from_data_stream() {
    std::cout << "\n--- Benchmarking Median from Data Stream ---" << std::endl;

    std::vector<int> sizes = {100000, 1000000}; // Number of addNum operations

    for (int size : sizes) {
        std::cout << "\nNumber of addNum operations: " << size << std::endl;
        std::vector<int> random_nums = generate_random_vector(size, 0, 100000);

        // Benchmark std::priority_queue based MedianFinder
        MedianFinder mf_std;
        long long time_std = measure_time_ms([&]() {
            for (int num : random_nums) {
                mf_std.addNum(num);
                // mf_std.findMedian(); // Commented out to only benchmark addNum for throughput
            }
        });
        std::cout << "  MedianFinder (std::priority_queue): " << time_std << " ms" << std::endl;

        // Benchmark CustomHeap based CustomMedianFinder
        CustomMedianFinder mf_custom;
        long long time_custom = measure_time_ms([&]() {
            for (int num : random_nums) {
                mf_custom.addNum(num);
                // mf_custom.findMedian(); // Commented out
            }
        });
        std::cout << "  CustomMedianFinder (CustomHeap): " << time_custom << " ms" << std::endl;
    }
    std::cout << "-----------------------------------" << std::endl;
}

int main() {
    std::cout << "Running Heap Operations Benchmarks..." << std::endl;

    benchmark_kth_largest_element();
    benchmark_merge_k_sorted_lists();
    benchmark_top_k_frequent_elements();
    benchmark_median_from_data_stream();

    std::cout << "\nBenchmarks finished." << std::endl;
    return 0;
}
```
---