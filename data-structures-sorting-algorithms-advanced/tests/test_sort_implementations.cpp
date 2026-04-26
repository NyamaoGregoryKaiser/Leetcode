```cpp
#include "../src/sort_implementations.h"
#include "../src/helpers.h"
#include <algorithm> // For std::sort to compare against
#include <vector>

namespace SortingAlgorithms {

// Helper to create a sorted copy for comparison
template <typename T>
std::vector<T> get_sorted_copy(const std::vector<T>& arr) {
    std::vector<T> sorted_arr = arr;
    std::sort(sorted_arr.begin(), sorted_arr.end());
    return sorted_arr;
}

// Helper to run tests for a specific sorting algorithm
template <typename T, typename SortFunc>
void run_sort_tests(const std::string& sort_name, SortFunc sort_func) {
    std::cout << "\n--- Testing " << sort_name << " ---" << std::endl;

    // Test Case 1: Empty vector
    std::vector<T> arr1 = {};
    std::vector<T> expected1 = get_sorted_copy(arr1);
    sort_func(arr1);
    ASSERT_VECTOR_EQUAL(arr1, expected1, sort_name + " - Empty");

    // Test Case 2: Single element
    std::vector<T> arr2 = {5};
    std::vector<T> expected2 = get_sorted_copy(arr2);
    sort_func(arr2);
    ASSERT_VECTOR_EQUAL(arr2, expected2, sort_name + " - Single Element");

    // Test Case 3: Already sorted
    std::vector<T> arr3 = {1, 2, 3, 4, 5};
    std::vector<T> expected3 = get_sorted_copy(arr3);
    sort_func(arr3);
    ASSERT_VECTOR_EQUAL(arr3, expected3, sort_name + " - Already Sorted");

    // Test Case 4: Reverse sorted
    std::vector<T> arr4 = {5, 4, 3, 2, 1};
    std::vector<T> expected4 = get_sorted_copy(arr4);
    sort_func(arr4);
    ASSERT_VECTOR_EQUAL(arr4, expected4, sort_name + " - Reverse Sorted");

    // Test Case 5: Duplicate elements
    std::vector<T> arr5 = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
    std::vector<T> expected5 = get_sorted_copy(arr5);
    sort_func(arr5);
    ASSERT_VECTOR_EQUAL(arr5, expected5, sort_name + " - Duplicates");

    // Test Case 6: Negative numbers
    std::vector<T> arr6 = {-5, 0, -2, 8, -10};
    std::vector<T> expected6 = get_sorted_copy(arr6);
    sort_func(arr6);
    ASSERT_VECTOR_EQUAL(arr6, expected6, sort_name + " - Negatives");

    // Test Case 7: Mixed positive, negative, zero
    std::vector<T> arr7 = {0, -1, 10, -5, 7, 0, 2};
    std::vector<T> expected7 = get_sorted_copy(arr7);
    sort_func(arr7);
    ASSERT_VECTOR_EQUAL(arr7, expected7, sort_name + " - Mixed");

    // Test Case 8: Larger random array
    std::vector<T> arr8 = generate_random_vector(100, -200, 200);
    std::vector<T> expected8 = get_sorted_copy(arr8);
    sort_func(arr8);
    ASSERT_VECTOR_EQUAL(arr8, expected8, sort_name + " - Large Random");

    // Test Case 9: All elements are the same
    std::vector<T> arr9(10, 7); // Ten 7s
    std::vector<T> expected9 = get_sorted_copy(arr9);
    sort_func(arr9);
    ASSERT_VECTOR_EQUAL(arr9, expected9, sort_name + " - All Same");
}

void testAllSortingAlgorithms() {
    run_sort_tests<int>("Bubble Sort", [](std::vector<int>& arr){ SortingAlgorithms::bubbleSort(arr); });
    run_sort_tests<int>("Selection Sort", [](std::vector<int>& arr){ SortingAlgorithms::selectionSort(arr); });
    run_sort_tests<int>("Insertion Sort", [](std::vector<int>& arr){ SortingAlgorithms::insertionSort(arr); });
    run_sort_tests<int>("Quick Sort", [](std::vector<int>& arr){ SortingAlgorithms::quickSort(arr); });
    run_sort_tests<int>("Merge Sort", [](std::vector<int>& arr){ SortingAlgorithms::mergeSort(arr); });
    run_sort_tests<int>("Heap Sort", [](std::vector<int>& arr){ SortingAlgorithms::heapSort(arr); });
}

void testQuickSelect() {
    std::cout << "\n--- Testing QuickSelect ---" << std::endl;

    // Test Case 1: Basic
    std::vector<int> nums1 = {3, 2, 1, 5, 6, 4};
    ASSERT_EQUAL(quickSelect(nums1, 1), 1, "QuickSelect - 1st smallest"); // modifies nums1
    std::vector<int> nums1_b = {3, 2, 1, 5, 6, 4};
    ASSERT_EQUAL(quickSelect(nums1_b, 6), 6, "QuickSelect - 6th smallest"); // modifies nums1_b

    // Test Case 2: Larger array
    std::vector<int> nums2 = {3, 2, 3, 1, 2, 4, 5, 5, 6};
    ASSERT_EQUAL(quickSelect(nums2, 4), 3, "QuickSelect - 4th smallest");

    // Test Case 3: Duplicates
    std::vector<int> nums3 = {1, 2, 2, 3, 3, 3, 4, 4};
    ASSERT_EQUAL(quickSelect(nums3, 3), 2, "QuickSelect - Duplicates 3rd smallest");
    std::vector<int> nums3_b = {1, 2, 2, 3, 3, 3, 4, 4};
    ASSERT_EQUAL(quickSelect(nums3_b, 6), 3, "QuickSelect - Duplicates 6th smallest");

    // Test Case 4: Negative numbers
    std::vector<int> nums4 = {-1, -5, 0, 10, -2};
    ASSERT_EQUAL(quickSelect(nums4, 2), -2, "QuickSelect - Negatives 2nd smallest");

    // Test Case 5: Single element
    std::vector<int> nums5 = {42};
    ASSERT_EQUAL(quickSelect(nums5, 1), 42, "QuickSelect - Single Element");

    // Test Case 6: Kth largest equivalent (finding (N-k+1)-th smallest)
    // Find 2nd LARGEST in {3, 2, 1, 5, 6, 4} -> 5
    // This is 6 - 2 + 1 = 5th SMALLEST
    std::vector<int> nums6 = {3, 2, 1, 5, 6, 4};
    ASSERT_EQUAL(quickSelect(nums6, nums6.size() - 2 + 1), 5, "QuickSelect - Kth Largest equiv (5th smallest)");

    // Test Case 7: Unsorted array, finding middle element
    std::vector<int> nums7 = {9, 8, 7, 6, 5, 4, 3, 2, 1};
    ASSERT_EQUAL(quickSelect(nums7, 5), 5, "QuickSelect - Middle element");

    // Edge case: invalid k (should throw)
    std::vector<int> empty_vec = {};
    bool caught_exception = false;
    try {
        quickSelect(empty_vec, 1);
    } catch (const std::out_of_range& e) {
        caught_exception = true;
    }
    ASSERT_EQUAL(caught_exception, true, "QuickSelect - Empty vector throws exception");

    std::vector<int> small_vec = {10};
    caught_exception = false;
    try {
        quickSelect(small_vec, 0);
    } catch (const std::out_of_range& e) {
        caught_exception = true;
    }
    ASSERT_EQUAL(caught_exception, true, "QuickSelect - k=0 throws exception");

    caught_exception = false;
    try {
        quickSelect(small_vec, 2);
    } catch (const std::out_of_range& e) {
        caught_exception = true;
    }
    ASSERT_EQUAL(caught_exception, true, "QuickSelect - k > N throws exception");
}

} // namespace SortingAlgorithms

int main() {
    SortingAlgorithms::testAllSortingAlgorithms();
    SortingAlgorithms::testQuickSelect();
    SortingAlgorithms::print_test_summary();
    return SortingAlgorithms::test_failed_count > 0 ? 1 : 0;
}
```