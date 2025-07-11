#include "gtest/gtest.h"
#include "sorting_algorithms.cpp"  // Include your sorting algorithms header

TEST(SortingTest, MergeSortTest) {
    std::vector<int> arr = {5, 2, 4, 6, 1, 3};
    std::vector<int> expected = {1, 2, 3, 4, 5, 6};
    std::vector<int> result = mergeSort(arr);
    ASSERT_EQ(result, expected);
}

// Add more test cases for other sorting algorithms and problems here...


int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}