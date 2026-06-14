#include "benchmark/benchmark.h"
#include "src/heap_problems.h"
#include "utils/min_heap.h" // For custom heap comparison
#include <random>
#include <algorithm>
#include <chrono>

// --- Helper Functions for Benchmarking Setup ---

// Generate a vector of random integers
std::vector<int> generateRandomVector(size_t size) {
    std::vector<int> vec(size);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(0, static_cast<int>(size * 2)); // Values up to 2*size
    for (size_t i = 0; i < size; ++i) {
        vec[i] = distrib(gen);
    }
    return vec;
}

// Generate K sorted lists for Merge K Sorted Lists problem
std::vector<ListNode*> generateKSortedLists(int k, int nodesPerList) {
    std::vector<ListNode*> lists;
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(0, nodesPerList * k * 2);

    for (int i = 0; i < k; ++i) {
        std::vector<int> values;
        int current_val = 0;
        for (int j = 0; j < nodesPerList; ++j) {
            current_val += distrib(gen) % 10 + 1; // Ensure increasing values
            values.push_back(current_val);
        }
        lists.push_back(createList(values));
    }
    return lists;
}

// Custom deleter for ListNode* vectors
struct ListNodeVectorDeleter {
    void operator()(std::vector<ListNode*>* lists) const {
        for (ListNode* list : *lists) {
            deleteList(list);
        }
        delete lists;
    }
};

// --- Problem 1: Kth Largest Element Benchmarks ---

static void BM_FindKthLargest_Heap(benchmark::State& state) {
    size_t N = state.range(0);
    int k = state.range(1);
    std::vector<int> nums_original = generateRandomVector(N);

    for (auto _ : state) {
        std::vector<int> nums = nums_original; // Copy for each iteration to avoid modifying original
        int result = findKthLargest_Heap(nums, k);
        benchmark::DoNotOptimize(result);
    }
}
BENCHMARK(BM_FindKthLargest_Heap)->ArgsProduct({
    benchmark::Create
    Ranges({1000, 10000, 100000}), // N
    {1, 10, 100, 1000}             // K
});

static void BM_FindKthLargest_NthElement(benchmark::State& state) {
    size_t N = state.range(0);
    int k = state.range(1);
    std::vector<int> nums_original = generateRandomVector(N);

    for (auto _ : state) {
        std::vector<int> nums = nums_original; // Copy for each iteration
        int result = findKthLargest_NthElement(nums, k);
        benchmark::DoNotOptimize(result);
    }
}
BENCHMARK(BM_FindKthLargest_NthElement)->ArgsProduct({
    benchmark::Create
    Ranges({1000, 10000, 100000}),
    {1, 10, 100, 1000}
});

static void BM_FindKthLargest_Sort(benchmark::State& state) {
    size_t N = state.range(0);
    int k = state.range(1);
    std::vector<int> nums_original = generateRandomVector(N);

    for (auto _ : state) {
        std::vector<int> nums = nums_original; // Copy for each iteration
        int result = findKthLargest_Sort(nums, k);
        benchmark::DoNotOptimize(result);
    }
}
BENCHMARK(BM_FindKthLargest_Sort)->ArgsProduct({
    benchmark::Create
    Ranges({1000, 10000, 100000}),
    {1, 10, 100, 1000}
});


// --- Problem 2: Merge K Sorted Lists Benchmarks ---

static void BM_MergeKLists_Heap(benchmark::State& state) {
    int k = state.range(0);
    int nodesPerList = state.range(1);
    
    // Setup: Generate lists once
    // Use std::unique_ptr with a custom deleter to manage memory for the generated lists
    auto lists_ptr = std::unique_ptr<std::vector<ListNode*>, ListNodeVectorDeleter>(
        new std::vector<ListNode*>(generateKSortedLists(k, nodesPerList))
    );
    std::vector<ListNode*>& lists_original = *lists_ptr;

    for (auto _ : state) {
        // Re-generate lists or deep copy for each iteration if lists are consumed by algorithm.
        // For mergeKLists, the input lists are consumed, so we need to copy them or regenerate.
        // Regenerating is simpler for benchmarks but might be slow.
        // Deep copying:
        std::vector<ListNode*> lists_copy;
        for (ListNode* head : lists_original) {
            ListNode* current_original = head;
            ListNode* dummy_copy = new ListNode();
            ListNode* current_copy = dummy_copy;
            while (current_original) {
                current_copy->next = new ListNode(current_original->val);
                current_copy = current_copy->next;
                current_original = current_original->next;
            }
            lists_copy.push_back(dummy_copy->next);
            delete dummy_copy;
        }

        ListNode* result = mergeKLists_Heap(lists_copy);
        benchmark::DoNotOptimize(result);
        deleteList(result); // Clean up merged list
        for (ListNode* head : lists_copy) { // Clean up copied input lists (they are consumed anyway by the algo)
             // No need to delete again, mergeKLists_Heap consumes them.
             // Just set to nullptr to avoid double free if lists_copy was not consumed.
             // Since mergeKLists_Heap does delete them internally (by linking out), we just delete the shallow copy heads.
             // It's tricky with ListNode* to manage ownership. For simplicity, just let createList/deleteList handle.
        }
    }
}
BENCHMARK(BM_MergeKLists_Heap)->ArgsProduct({
    {10, 100},              // K (number of lists)
    {100, 1000}             // Nodes per list
});


// --- Problem 3: Find Median from Data Stream Benchmarks ---

static void BM_MedianFinder_AddNum(benchmark::State& state) {
    size_t N = state.range(0);
    std::vector<int> nums = generateRandomVector(N);

    for (auto _ : state) {
        state.PauseTiming(); // Pause timing for setup outside the loop
        MedianFinder mf;
        state.ResumeTiming();

        for (int num : nums) {
            mf.addNum(num);
        }
    }
}
BENCHMARK(BM_MedianFinder_AddNum)->RangeMultiplier(10)->Range(10, 100000);


static void BM_MedianFinder_FindMedian(benchmark::State& state) {
    size_t N = state.range(0);
    std::vector<int> nums = generateRandomVector(N);
    MedianFinder mf;
    for (int num : nums) {
        mf.addNum(num);
    }

    for (auto _ : state) {
        double median = mf.findMedian();
        benchmark::DoNotOptimize(median);
    }
}
BENCHMARK(BM_MedianFinder_FindMedian)->RangeMultiplier(10)->Range(10, 100000);


// --- Problem 4: Top K Frequent Elements Benchmarks ---

static void BM_TopKFrequent_Heap(benchmark::State& state) {
    size_t N = state.range(0);
    int k = state.range(1);
    std::vector<int> nums_original = generateRandomVector(N);

    for (auto _ : state) {
        std::vector<int> nums = nums_original; // Copy for each iteration
        std::vector<int> result = topKFrequent_Heap(nums, k);
        benchmark::DoNotOptimize(result);
    }
}
BENCHMARK(BM_TopKFrequent_Heap)->ArgsProduct({
    benchmark::Create
    Ranges({1000, 10000, 100000}), // N
    {1, 10, 100}                   // K
});

static void BM_TopKFrequent_Sort(benchmark::State& state) {
    size_t N = state.range(0);
    int k = state.range(1);
    std::vector<int> nums_original = generateRandomVector(N);

    for (auto _ : state) {
        std::vector<int> nums = nums_original; // Copy for each iteration
        std::vector<int> result = topKFrequent_Sort(nums, k);
        benchmark::DoNotOptimize(result);
    }
}
BENCHMARK(BM_TopKFrequent_Sort)->ArgsProduct({
    benchmark::Create
    Ranges({1000, 10000, 100000}),
    {1, 10, 100}
});

// Main for Google Benchmark
BENCHMARK_MAIN();