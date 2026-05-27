```cpp
#include <benchmark/benchmark.h> // Google Benchmark
#include "../src/main_heap_problems.cpp" // Include problem implementations
#include "../src/custom_heap.h"

#include <random>
#include <algorithm>
#include <vector>
#include <list> // For Merge K Sorted Lists

// Helper to create a list from a vector
ListNode* create_list_bm(const std::vector<int>& values) {
    if (values.empty()) return nullptr;
    ListNode* head = new ListNode(values[0]);
    ListNode* current = head;
    for (size_t i = 1; i < values.size(); ++i) {
        current->next = new ListNode(values[i]);
        current = current->next;
    }
    return head;
}

// Helper for cleaning up ListNode memory
void delete_list_bm(ListNode* head) {
    ListNode* current = head;
    while (current) {
        ListNode* next = current->next;
        delete current;
        current = next;
    }
}

// --- Kth Largest Element Benchmarks ---
namespace KthLargestElement { extern int findKthLargest_Sort(std::vector<int> nums, int k); }
namespace KthLargestElement { extern int findKthLargest_MinHeap_Std(std::vector<int> nums, int k); }
namespace KthLargestElement { extern int findKthLargest_MinHeap_Custom(std::vector<int> nums, int k); }
namespace KthLargestElement { extern int findKthLargest_Quickselect(std::vector<int> nums, int k); }

static void BM_KthLargest_Sort(benchmark::State& state) {
    std::vector<int> nums(state.range(0));
    std::iota(nums.begin(), nums.end(), 0); // Fill with 0 to N-1
    std::random_device rd;
    std::mt19937 g(rd());
    std::shuffle(nums.begin(), nums.end(), g); // Randomize

    int k = state.range(0) / 2; // Median-ish element

    for (auto _ : state) {
        std::vector<int> test_nums = nums; // Copy to ensure each run operates on fresh data
        benchmark::DoNotOptimize(KthLargestElement::findKthLargest_Sort(test_nums, k));
    }
}
BENCHMARK(BM_KthLargest_Sort)->RangeMultiplier(2)->Range(1 << 10, 1 << 18); // N=1024 to 262144

static void BM_KthLargest_MinHeap_Std(benchmark::State& state) {
    std::vector<int> nums(state.range(0));
    std::iota(nums.begin(), nums.end(), 0);
    std::random_device rd;
    std::mt19937 g(rd());
    std::shuffle(nums.begin(), nums.end(), g);

    int k = state.range(0) / 2;

    for (auto _ : state) {
        std::vector<int> test_nums = nums;
        benchmark::DoNotOptimize(KthLargestElement::findKthLargest_MinHeap_Std(test_nums, k));
    }
}
BENCHMARK(BM_KthLargest_MinHeap_Std)->RangeMultiplier(2)->Range(1 << 10, 1 << 18);

static void BM_KthLargest_MinHeap_Custom(benchmark::State& state) {
    std::vector<int> nums(state.range(0));
    std::iota(nums.begin(), nums.end(), 0);
    std::random_device rd;
    std::mt19937 g(rd());
    std::shuffle(nums.begin(), nums.end(), g);

    int k = state.range(0) / 2;

    for (auto _ : state) {
        std::vector<int> test_nums = nums;
        benchmark::DoNotOptimize(KthLargestElement::findKthLargest_MinHeap_Custom(test_nums, k));
    }
}
BENCHMARK(BM_KthLargest_MinHeap_Custom)->RangeMultiplier(2)->Range(1 << 10, 1 << 18);


static void BM_KthLargest_Quickselect(benchmark::State& state) {
    std::vector<int> nums(state.range(0));
    std::iota(nums.begin(), nums.end(), 0);
    std::random_device rd;
    std::mt19937 g(rd());
    std::shuffle(nums.begin(), nums.end(), g);

    int k = state.range(0) / 2;

    for (auto _ : state) {
        std::vector<int> test_nums = nums;
        benchmark::DoNotOptimize(KthLargestElement::findKthLargest_Quickselect(test_nums, k));
    }
}
BENCHMARK(BM_KthLargest_Quickselect)->RangeMultiplier(2)->Range(1 << 10, 1 << 18);


// --- Merge K Sorted Lists Benchmarks ---
namespace MergeKSortedLists { extern ListNode* mergeKLists_BruteForce(std::vector<ListNode*>& lists); }
namespace MergeKSortedLists { extern ListNode* mergeKLists_MinHeap_Std(std::vector<ListNode*>& lists); }
namespace MergeKSortedLists { extern ListNode* mergeKLists_MinHeap_Custom(std::vector<ListNode*>& lists); }
namespace MergeKSortedLists { extern ListNode* mergeKLists_DivideAndConquer(std::vector<ListNode*>& lists); }

// Benchmark for Merge K Lists
static void BM_MergeKLists_BruteForce(benchmark::State& state) {
    int K = state.range(0); // Number of lists
    int N_per_list = state.range(1); // Elements per list

    std::vector<std::vector<int>> raw_lists(K);
    for (int i = 0; i < K; ++i) {
        raw_lists[i].resize(N_per_list);
        std::iota(raw_lists[i].begin(), raw_lists[i].end(), i * N_per_list);
    }

    for (auto _ : state) {
        state.PauseTiming();
        std::vector<ListNode*> lists(K);
        for (int i = 0; i < K; ++i) {
            lists[i] = create_list_bm(raw_lists[i]);
        }
        state.ResumeTiming();

        ListNode* result = MergeKSortedLists::mergeKLists_BruteForce(lists);
        benchmark::DoNotOptimize(result);

        state.PauseTiming();
        delete_list_bm(result);
        for (ListNode* l : lists) { /* already deleted by merge func*/ }
        state.ResumeTiming();
    }
}
BENCHMARK(BM_MergeKLists_BruteForce)->Ranges({{4, 64}, {100, 1000}});

static void BM_MergeKLists_MinHeap_Std(benchmark::State& state) {
    int K = state.range(0); // Number of lists
    int N_per_list = state.range(1); // Elements per list

    std::vector<std::vector<int>> raw_lists(K);
    for (int i = 0; i < K; ++i) {
        raw_lists[i].resize(N_per_list);
        std::iota(raw_lists[i].begin(), raw_lists[i].end(), i * N_per_list);
    }

    for (auto _ : state) {
        state.PauseTiming();
        std::vector<ListNode*> lists(K);
        for (int i = 0; i < K; ++i) {
            lists[i] = create_list_bm(raw_lists[i]);
        }
        state.ResumeTiming();

        ListNode* result = MergeKSortedLists::mergeKLists_MinHeap_Std(lists);
        benchmark::DoNotOptimize(result);

        state.PauseTiming();
        delete_list_bm(result);
        // Original list heads are now part of the merged list and deleted by delete_list_bm(result)
        // If not using the merged list's nodes (e.g., creating new nodes),
        // we'd need to delete original list nodes separately if they weren't nullptr after merging.
        // But for these implementations, the original nodes are used directly.
        state.ResumeTiming();
    }
}
BENCHMARK(BM_MergeKLists_MinHeap_Std)->Ranges({{4, 64}, {100, 1000}});

static void BM_MergeKLists_MinHeap_Custom(benchmark::State& state) {
    int K = state.range(0); // Number of lists
    int N_per_list = state.range(1); // Elements per list

    std::vector<std::vector<int>> raw_lists(K);
    for (int i = 0; i < K; ++i) {
        raw_lists[i].resize(N_per_list);
        std::iota(raw_lists[i].begin(), raw_lists[i].end(), i * N_per_list);
    }

    for (auto _ : state) {
        state.PauseTiming();
        std::vector<ListNode*> lists(K);
        for (int i = 0; i < K; ++i) {
            lists[i] = create_list_bm(raw_lists[i]);
        }
        state.ResumeTiming();

        ListNode* result = MergeKSortedLists::mergeKLists_MinHeap_Custom(lists);
        benchmark::DoNotOptimize(result);

        state.PauseTiming();
        delete_list_bm(result);
        state.ResumeTiming();
    }
}
BENCHMARK(BM_MergeKLists_MinHeap_Custom)->Ranges({{4, 64}, {100, 1000}});


static void BM_MergeKLists_DivideAndConquer(benchmark::State& state) {
    int K = state.range(0); // Number of lists
    int N_per_list = state.range(1); // Elements per list

    std::vector<std::vector<int>> raw_lists(K);
    for (int i = 0; i < K; ++i) {
        raw_lists[i].resize(N_per_list);
        std::iota(raw_lists[i].begin(), raw_lists[i].end(), i * N_per_list);
    }

    for (auto _ : state) {
        state.PauseTiming();
        std::vector<ListNode*> lists(K);
        for (int i = 0; i < K; ++i) {
            lists[i] = create_list_bm(raw_lists[i]);
        }
        state.ResumeTiming();

        ListNode* result = MergeKSortedLists::mergeKLists_DivideAndConquer(lists);
        benchmark::DoNotOptimize(result);

        state.PauseTiming();
        delete_list_bm(result);
        state.ResumeTiming();
    }
}
BENCHMARK(BM_MergeKLists_DivideAndConquer)->Ranges({{4, 64}, {100, 1000}});


// --- Find Median From Data Stream Benchmarks ---
namespace FindMedianFromDataStream { extern class MedianFinder_Std; }
namespace FindMedianFromDataStream { extern class MedianFinder_Custom; }

static void BM_MedianFinder_Std(benchmark::State& state) {
    std::vector<int> nums(state.range(0));
    std::random_device rd;
    std::mt19937 g(rd());
    std::uniform_int_distribution<> distrib(-100000, 100000);
    for (int i = 0; i < state.range(0); ++i) {
        nums[i] = distrib(g);
    }

    for (auto _ : state) {
        FindMedianFromDataStream::MedianFinder_Std mf;
        for (int num : nums) {
            mf.addNum(num);
        }
        benchmark::DoNotOptimize(mf.findMedian()); // Benchmark the whole sequence
    }
}
BENCHMARK(BM_MedianFinder_Std)->RangeMultiplier(2)->Range(1 << 10, 1 << 18);


static void BM_MedianFinder_Custom(benchmark::State& state) {
    std::vector<int> nums(state.range(0));
    std::random_device rd;
    std::mt19937 g(rd());
    std::uniform_int_distribution<> distrib(-100000, 100000);
    for (int i = 0; i < state.range(0); ++i) {
        nums[i] = distrib(g);
    }

    for (auto _ : state) {
        FindMedianFromDataStream::MedianFinder_Custom mf;
        for (int num : nums) {
            mf.addNum(num);
        }
        benchmark::DoNotOptimize(mf.findMedian());
    }
}
BENCHMARK(BM_MedianFinder_Custom)->RangeMultiplier(2)->Range(1 << 10, 1 << 18);


// --- Top K Frequent Elements Benchmarks ---
namespace TopKFrequentElements { extern std::vector<int> topKFrequent_MapAndSort(const std::vector<int>& nums, int k); }
namespace TopKFrequentElements { extern std::vector<int> topKFrequent_MinHeap_Std(const std::vector<int>& nums, int k); }
namespace TopKFrequentElements { extern std::vector<int> topKFrequent_MinHeap_Custom(const std::vector<int>& nums, int k); }

static void BM_TopKFrequent_MapAndSort(benchmark::State& state) {
    std::vector<int> nums(state.range(0));
    std::random_device rd;
    std::mt19937 g(rd());
    // Generate numbers with varying frequencies
    std::uniform_int_distribution<> distrib(0, state.range(0) / 10); // Many duplicates
    for (int i = 0; i < state.range(0); ++i) {
        nums[i] = distrib(g);
    }
    int k = state.range(0) / 100 > 0 ? state.range(0) / 100 : 1; // k is small relative to N

    for (auto _ : state) {
        benchmark::DoNotOptimize(TopKFrequentElements::topKFrequent_MapAndSort(nums, k));
    }
}
BENCHMARK(BM_TopKFrequent_MapAndSort)->RangeMultiplier(2)->Range(1 << 10, 1 << 18);

static void BM_TopKFrequent_MinHeap_Std(benchmark::State& state) {
    std::vector<int> nums(state.range(0));
    std::random_device rd;
    std::mt19937 g(rd());
    std::uniform_int_distribution<> distrib(0, state.range(0) / 10);
    for (int i = 0; i < state.range(0); ++i) {
        nums[i] = distrib(g);
    }
    int k = state.range(0) / 100 > 0 ? state.range(0) / 100 : 1;

    for (auto _ : state) {
        benchmark::DoNotOptimize(TopKFrequentElements::topKFrequent_MinHeap_Std(nums, k));
    }
}
BENCHMARK(BM_TopKFrequent_MinHeap_Std)->RangeMultiplier(2)->Range(1 << 10, 1 << 18);


static void BM_TopKFrequent_MinHeap_Custom(benchmark::State& state) {
    std::vector<int> nums(state.range(0));
    std::random_device rd;
    std::mt19937 g(rd());
    std::uniform_int_distribution<> distrib(0, state.range(0) / 10);
    for (int i = 0; i < state.range(0); ++i) {
        nums[i] = distrib(g);
    }
    int k = state.range(0) / 100 > 0 ? state.range(0) / 100 : 1;

    for (auto _ : state) {
        benchmark::DoNotOptimize(TopKFrequentElements::topKFrequent_MinHeap_Custom(nums, k));
    }
}
BENCHMARK(BM_TopKFrequent_MinHeap_Custom)->RangeMultiplier(2)->Range(1 << 10, 1 << 18);


// Run the benchmarks
BENCHMARK_MAIN();
```