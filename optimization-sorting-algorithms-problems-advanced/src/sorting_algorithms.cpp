#include <iostream>
#include <vector>
#include <algorithm> // For std::sort (used for comparison)

//Helper Functions (Implementation in utils/helper.h)
// void mergeSort(std::vector<int>& arr);
// void quickSort(std::vector<int>& arr, int low, int high);
// void heapSort(std::vector<int>& arr);
// int quickSelect(std::vector<int>& arr, int left, int right, int k);


int main() {
    std::vector<int> arr = {12, 11, 13, 5, 6, 7};

    // Problem 1: Array Sorting
    std::vector<int> arr_copy1 = arr;
    std::sort(arr_copy1.begin(), arr_copy1.end()); //For Comparison. Replace with your implementation.
    std::cout << "Sorted array (std::sort): ";
    for (int x : arr_copy1) std::cout << x << " ";
    std::cout << std::endl;


    // Problem 2: Kth Smallest Element
    int k = 3;
    int kthSmallest = quickSelect(arr, 0, arr.size() - 1, k); // Replace with your implementation
    std::cout << "Kth smallest element (" << k << "): " << kthSmallest << std::endl;

    // Problem 3, 4, and 5 would go here with respective implementations.  Implementations are omitted for brevity.

    return 0;
}