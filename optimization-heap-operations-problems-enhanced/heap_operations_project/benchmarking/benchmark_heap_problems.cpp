```cpp
#include <iostream>
#include <vector>
#include <chrono>
#include <random>
#include <algorithm> // For std::sort, std::nth_element
#include <map>
#include <queue> // For std::priority_queue

// Include the main algorithm file (contains problem solutions)
#include "../src/main_heap_algo.cpp"

// Forward declare utility for ListNode memory cleanup
namespace HeapProblems {
    struct ListNode;
    void deleteList(ListNode* head);
    ListNode* createList(const std::vector<int>& vals);
}


// --- Benchmarking Utilities ---
using Clock = std::chrono::high_resolution_clock;
using Duration = std::chrono::duration<double>;

// A simple timer class
class Timer {
public:
    Timer() : start_time(Clock::now()) {}

    void reset() {
        start_time = Clock::now();
    }

    double elapsed() const {
        return Duration(Clock::now() - start_time).count();
    }

private:
    Clock::time_point start_time;
};

// Function to generate random vectors
std::vector<int> generateRandomVector(size_t size, int min_val, int max_val) {
    std::vector<int> vec(size);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(min_val, max_val);
    for (size_t i = 0; i < size; ++i) {
        vec[i] = distrib(gen);
    }
    return vec;
}

// Function to generate k sorted lists for Merge K Sorted Lists
std::vector<HeapProblems::ListNode*> generateKSortedLists(int k, int list_size, int min_val, int max_val) {
    std::vector<HeapProblems::ListNode*> lists;
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib_start(min_val, max_val - list_size);

    for (int i = 0; i < k; ++i) {
        std::vector<int> current_list_vals;
        int current_val = distrib_start(gen);
        for (int j = 0; j < list_size; ++j) {
            current_list_vals.push_back(current_val + j); // Create sorted sequence
        }
        lists.push_back(HeapProblems::createList(current_list_vals));
    }
    return lists;
}


// --- Benchmark Functions for Each Problem ---

void benchmarkKthSmallest() {
    std::cout << "\n--- Benchmarking Kth Smallest Element ---" << std::endl;
    std::vector<int> N_values = {10000, 100000, 1000000}; // Input array sizes
    std::vector<int> K_factors = {10, 100, 1000};        // K values (N / K_factor)

    for (int N : N_values) {
        std::vector<int> nums = generateRandomVector(N, 0, N * 2);

        for (int k_factor : K_factors) {
            int k = std::max(1, N / k_factor); // Ensure k is at least 1

            // Benchmark Max-Heap (optimal for Kth Smallest)
            Timer timer_max_heap;
            int result_max_heap = HeapProblems::findKthSmallestMaxHeap(nums, k);
            double time_max_heap = timer_max_heap.elapsed();
            std::cout << "N=" << N << ", K=" << k << " (Max-Heap): " << time_max_heap << " seconds" << std::endl;

            // Benchmark Min-Heap (less optimal for Kth Smallest)
            Timer timer_min_heap;
            int result_min_heap = HeapProblems::findKthSmallestMinHeap(nums, k);
            double time_min_heap = timer_min_heap.elapsed();
            std::cout << "N=" << N << ", K=" << k << " (Min-Heap): " << time_min_heap << " seconds" << std::endl;

            // Optional: Verify results are same
            // std::cout << "Results: MaxHeap=" << result_max_heap << ", MinHeap=" << result_min_heap << std::endl;
            // if (result_max_heap != result_min_heap) {
            //     std::cerr << "Mismatch found for N=" << N << ", K=" << k << std::endl;
            // }
        }
    }
}

void benchmarkMergeKLists() {
    std::cout << "\n--- Benchmarking Merge K Sorted Lists ---" << std::endl;
    std::vector<int> K_values = {10, 100, 1000}; // Number of lists
    std::vector<int> ListSize_values = {100, 1000}; // Size of each list

    for (int k : K_values) {
        for (int list_size : ListSize_values) {
            std::vector<HeapProblems::ListNode*> lists_heap_approach = generateKSortedLists(k, list_size, 0, k * list_size);
            std::vector<HeapProblems::ListNode*> lists_pairwise_approach = generateKSortedLists(k, list_size, 0, k * list_size);

            // Benchmark Heap Approach
            Timer timer_heap;
            HeapProblems::ListNode* merged_heap = HeapProblems::mergeKLists(lists_heap_approach);
            double time_heap = timer_heap.elapsed();
            std::cout << "K=" << k << ", ListSize=" << list_size << " (Heap): " << time_heap << " seconds" << std::endl;
            HeapProblems::deleteList(merged_heap); // Clean up memory

            // Benchmark Pairwise Merge Approach (naive sequential for this example)
            // Note: A truly optimized pairwise merge (divide and conquer) might perform better than simple sequential
            // but still generally worse than heap for large K.
            Timer timer_pairwise;
            HeapProblems::ListNode* merged_pairwise = HeapProblems::mergeKListsPairwise(lists_pairwise_approach);
            double time_pairwise = timer_pairwise.elapsed();
            std::cout << "K=" << k << ", ListSize=" << list_size << " (Pairwise): " << time_pairwise << " seconds" << std::endl;
            HeapProblems::deleteList(merged_pairwise); // Clean up memory

            // Original lists are consumed/deleted during merge, so no separate cleanup for input lists.
        }
    }
}

void benchmarkMedianFinder() {
    std::cout << "\n--- Benchmarking MedianFinder ---" << std::endl;
    std::vector<int> N_values = {100000, 1000000}; // Number of elements to add

    for (int N : N_values) {
        std::vector<int> nums = generateRandomVector(N, 0, N * 10);

        // Benchmark MedianFinder (Two Heaps)
        Timer timer_median_finder;
        HeapProblems::MedianFinder mf;
        for (int i = 0; i < N; ++i) {
            mf.addNum(nums[i]);
            if (i % (N / 10) == 0 && i > 0) { // Calculate median periodically to simulate use case
                 mf.findMedian();
            }
        }
        mf.findMedian(); // Final median calculation
        double time_median_finder = timer_median_finder.elapsed();
        std::cout << "N=" << N << " (MedianFinder - Two Heaps): " << time_median_finder << " seconds" << std::endl;
    }
}

void benchmarkTopKFrequent() {
    std::cout << "\n--- Benchmarking Top K Frequent Elements ---" << std::endl;
    std::vector<int> N_values = {100000, 1000000}; // Input array size
    std::vector<int> K_factors = {10, 100};        // K values (N / K_factor)
    int value_range_factor = 10; // Values from 0 to N / value_range_factor to create duplicates

    for (int N : N_values) {
        std::vector<int> nums = generateRandomVector(N, 0, N / value_range_factor); // Generates many duplicates
        int unique_elements = N / value_range_factor + 1;

        for (int k_factor : K_factors) {
            int k = std::min(std::max(1, N / k_factor), unique_elements); // k up to unique_elements

            // Benchmark Heap Approach
            Timer timer_heap;
            std::vector<int> result_heap = HeapProblems::topKFrequent(nums, k);
            double time_heap = timer_heap.elapsed();
            std::cout << "N=" << N << ", K=" << k << " (TopKFrequent - Heap): " << time_heap << " seconds" << std::endl;

            // For comparison, a simple sort and then iterate (less efficient for large N, small K)
            // This is a naive baseline, not an alternative optimal solution.
            Timer timer_naive_sort;
            std::map<int, int> freqMap_naive;
            for (int num : nums) {
                freqMap_naive[num]++;
            }
            std::vector<std::pair<int, int>> freq_vec;
            for (auto const& [num, freq] : freqMap_naive) {
                freq_vec.push_back({freq, num});
            }
            std::sort(freq_vec.rbegin(), freq_vec.rend()); // Sort descending by frequency
            std::vector<int> result_naive;
            for (int i = 0; i < k && i < freq_vec.size(); ++i) {
                result_naive.push_back(freq_vec[i].second);
            }
            double time_naive_sort = timer_naive_sort.elapsed();
            std::cout << "N=" << N << ", K=" << k << " (TopKFrequent - Naive Sort): " << time_naive_sort << " seconds" << std::endl;
        }
    }
}

void benchmarkSmallestRange() {
    std::cout << "\n--- Benchmarking Smallest Range Covering Elements ---" << std::endl;
    std::vector<int> K_values = {10, 100, 500}; // Number of lists
    std::vector<int> ListSize_values = {500, 2000}; // Size of each list

    for (int k : K_values) {
        for (int list_size : ListSize_values) {
            std::vector<std::vector<int>> nums;
            std::random_device rd;
            std::mt19937 gen(rd());
            std::uniform_int_distribution<> distrib_start(0, k * list_size / 2); // To ensure overlaps

            for (int i = 0; i < k; ++i) {
                std::vector<int> current_list_vals;
                int start_val = distrib_start(gen) + i * 5; // Offset to spread ranges
                for (int j = 0; j < list_size; ++j) {
                    current_list_vals.push_back(start_val + j); // Sorted list
                }
                nums.push_back(current_list_vals);
            }

            // Benchmark Heap Approach
            Timer timer_heap;
            std::vector<int> result_heap = HeapProblems::smallestRange(nums);
            double time_heap = timer_heap.elapsed();
            std::cout << "K=" << k << ", ListSize=" << list_size << " (SmallestRange - Heap): " << time_heap << " seconds" << std::endl;
        }
    }
}


int main() {
    // Note: Benchmarking results can vary based on hardware, compiler, and current system load.
    // Run multiple times and take an average for more accurate results.

    benchmarkKthSmallest();
    benchmarkMergeKLists();
    benchmarkMedianFinder();
    benchmarkTopKFrequent();
    benchmarkSmallestRange();

    return 0;
}
```