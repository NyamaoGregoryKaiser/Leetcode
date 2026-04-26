```cpp
#include "../src/helpers.h"
#include "../src/sort_implementations.h"
#include "../src/main_algorithms.cpp" // Include problem implementations
#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::sort

namespace SortingAlgorithms {

// --- Benchmarking function for sorting algorithms ---
template <typename T, typename SortFunc>
void benchmark_sort_algo(const std::string& name, SortFunc sort_func, int num_elements, int num_iterations) {
    long double total_time = 0;
    std::vector<T> original_data = generate_random_vector(num_elements, 0, num_elements * 10);

    for (int i = 0; i < num_iterations; ++i) {
        std::vector<T> data_to_sort = original_data; // Work on a copy
        Timer timer;
        sort_func(data_to_sort);
        total_time += timer.elapsed_milliseconds();

        // Optional: Verify if sorted correctly (only for a few iterations or smaller sizes)
        // if (!std::is_sorted(data_to_sort.begin(), data_to_sort.end())) {
        //     std::cerr << "Error: " << name << " failed to sort correctly on iteration " << i << std::endl;
        //     return;
        // }
    }
    std::cout << name << " (N=" << num_elements << ", Iter=" << num_iterations << "): "
              << (total_time / num_iterations) << " ms (avg)" << std::endl;
}

// --- Benchmarking function for Kth Largest Element approaches ---
void benchmark_kth_largest(int num_elements, int num_iterations) {
    std::cout << "\n--- Benchmarking Kth Largest Element (N=" << num_elements << ", Iter=" << num_iterations << ") ---" << std::endl;

    std::vector<int> original_data = generate_random_vector(num_elements, 0, num_elements * 10);
    int k = num_elements / 2; // Find median-like element

    // QuickSelect
    long double qs_total_time = 0;
    for (int i = 0; i < num_iterations; ++i) {
        std::vector<int> data_copy = original_data;
        Timer timer;
        findKthLargest_QuickSelect(data_copy, k);
        qs_total_time += timer.elapsed_milliseconds();
    }
    std::cout << "QuickSelect: " << (qs_total_time / num_iterations) << " ms (avg)" << std::endl;

    // Min-Heap
    long double heap_total_time = 0;
    for (int i = 0; i < num_iterations; ++i) {
        std::vector<int> data_copy = original_data; // MinHeap takes const vector
        Timer timer;
        findKthLargest_MinHeap(data_copy, k);
        heap_total_time += timer.elapsed_milliseconds();
    }
    std::cout << "Min-Heap:    " << (heap_total_time / num_iterations) << " ms (avg)" << std::endl;

    // Sort (Brute Force)
    long double sort_total_time = 0;
    for (int i = 0; i < num_iterations; ++i) {
        std::vector<int> data_copy = original_data;
        Timer timer;
        findKthLargest_Sort(data_copy, k);
        sort_total_time += timer.elapsed_milliseconds();
    }
    std::cout << "Sort & Pick: " << (sort_total_time / num_iterations) << " ms (avg)" << std::endl;
}


// --- Benchmarking function for Sort Colors approaches ---
void benchmark_sort_colors(int num_elements, int num_iterations) {
    std::cout << "\n--- Benchmarking Sort Colors (N=" << num_elements << ", Iter=" << num_iterations << ") ---" << std::endl;

    // Generate data with 0s, 1s, 2s
    std::vector<int> original_data(num_elements);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(0, 2);
    for (int i = 0; i < num_elements; ++i) {
        original_data[i] = distrib(gen);
    }

    // Dutch National Flag
    long double dutch_total_time = 0;
    for (int i = 0; i < num_iterations; ++i) {
        std::vector<int> data_copy = original_data;
        Timer timer;
        sortColors_DutchNationalFlag(data_copy);
        dutch_total_time += timer.elapsed_milliseconds();
    }
    std::cout << "Dutch National Flag: " << (dutch_total_time / num_iterations) << " ms (avg)" << std::endl;

    // Counting Sort
    long double counting_total_time = 0;
    for (int i = 0; i < num_iterations; ++i) {
        std::vector<int> data_copy = original_data;
        Timer timer;
        sortColors_CountingSort(data_copy);
        counting_total_time += timer.elapsed_milliseconds();
    }
    std::cout << "Counting Sort:       " << (counting_total_time / num_iterations) << " ms (avg)" << std::endl;
}


// --- Benchmarking function for Meeting Rooms II approaches ---
void benchmark_min_meeting_rooms(int num_meetings, int num_iterations) {
    std::cout << "\n--- Benchmarking Meeting Rooms II (N=" << num_meetings << ", Iter=" << num_iterations << ") ---" << std::endl;

    std::vector<Interval> original_meetings(num_meetings);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib_start(0, num_meetings * 5); // Start times up to 5*N
    std::uniform_int_distribution<> distrib_duration(1, 10);           // Duration 1 to 10

    for (int i = 0; i < num_meetings; ++i) {
        int start = distrib_start(gen);
        int end = start + distrib_duration(gen);
        original_meetings[i] = {start, end};
    }

    // Min-Heap approach
    long double heap_total_time = 0;
    for (int i = 0; i < num_iterations; ++i) {
        std::vector<Interval> meetings_copy = original_meetings;
        Timer timer;
        minMeetingRooms_Heap(meetings_copy);
        heap_total_time += timer.elapsed_milliseconds();
    }
    std::cout << "Min-Heap Approach: " << (heap_total_time / num_iterations) << " ms (avg)" << std::endl;

    // Sweep Line approach
    long double sweep_total_time = 0;
    for (int i = 0; i < num_iterations; ++i) {
        std::vector<Interval> meetings_copy = original_meetings;
        Timer timer;
        minMeetingRooms_SweepLine(meetings_copy);
        sweep_total_time += timer.elapsed_milliseconds();
    }
    std::cout << "Sweep Line Approach: " << (sweep_total_time / num_iterations) << " ms (avg)" << std::endl;
}


int main() {
    std::cout << "--- Sorting Algorithms Benchmarks ---" << std::endl;

    int N_small = 1000;
    int N_medium = 10000;
    int N_large = 50000;
    int N_very_large = 100000;

    int iterations_small = 1000;
    int iterations_medium = 100;
    int iterations_large = 10;
    int iterations_very_large = 5;


    // --- Benchmark Core Sorting Algorithms ---
    std::cout << "\n--- Core Sorting Algorithms (N=" << N_medium << ", Iter=" << iterations_medium << ") ---" << std::endl;
    benchmark_sort_algo<int>("std::sort", [](std::vector<int>& arr){ std::sort(arr.begin(), arr.end()); }, N_medium, iterations_medium);
    benchmark_sort_algo<int>("Quick Sort", [](std::vector<int>& arr){ SortingAlgorithms::quickSort(arr); }, N_medium, iterations_medium);
    benchmark_sort_algo<int>("Merge Sort", [](std::vector<int>& arr){ SortingAlgorithms::mergeSort(arr); }, N_medium, iterations_medium);
    benchmark_sort_algo<int>("Heap Sort", [](std::vector<int>& arr){ SortingAlgorithms::heapSort(arr); }, N_medium, iterations_medium);
    // These N^2 sorts are too slow for N=10000, reducing N
    std::cout << "\n--- Core Sorting Algorithms (N=" << N_small << ", Iter=" << iterations_small << ") ---" << std::endl;
    benchmark_sort_algo<int>("Insertion Sort", [](std::vector<int>& arr){ SortingAlgorithms::insertionSort(arr); }, N_small, iterations_small);
    benchmark_sort_algo<int>("Selection Sort", [](std::vector<int>& arr){ SortingAlgorithms::selectionSort(arr); }, N_small, iterations_small);
    benchmark_sort_algo<int>("Bubble Sort", [](std::vector<int>& arr){ SortingAlgorithms::bubbleSort(arr); }, N_small, iterations_small);

    // --- Benchmark Main Algorithm Problems ---
    benchmark_kth_largest(N_large, iterations_large);
    benchmark_sort_colors(N_very_large, iterations_very_large);
    benchmark_min_meeting_rooms(N_large, iterations_large);

    std::cout << "\n--- Benchmarks Complete ---" << std::endl;

    return 0;
}

} // namespace SortingAlgorithms

int main() {
    return SortingAlgorithms::main(); // Call the benchmark's main
}
```