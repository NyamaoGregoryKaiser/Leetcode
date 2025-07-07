#include "gtest/gtest.h" //Requires setting up GoogleTest.
#include "../src/sorting_algorithms.h"

TEST(SortingTest, MergeSortTest) {
    std::vector<int> arr = {5, 2, 4, 6, 1, 3};
    mergeSort(arr); //Your mergeSort implementation
    std::vector<int> expected = {1, 2, 3, 4, 5, 6};
    ASSERT_EQ(arr, expected);
}

// Add more test cases for other algorithms and problems.