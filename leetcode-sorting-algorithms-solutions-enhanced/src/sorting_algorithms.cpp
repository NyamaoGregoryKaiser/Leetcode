#include <iostream>
#include <vector>
#include <algorithm> // For std::sort (used for comparison)

// ... (Include other necessary headers like for linked list and stack) ...

// Helper function to print an array (expand for linked list and stack)
template <typename T>
void printArray(const std::vector<T>& arr) {
    for (const auto& val : arr) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
}


// Problem 1: Array Sorting - Merge Sort
std::vector<int> mergeSort(std::vector<int> arr) {
    // ... (Implementation of Merge Sort) ...
    return arr;
}


// Problem 1: Array Sorting - QuickSort (Recursive)
std::vector<int> quickSortRecursive(std::vector<int> arr, int low, int high) {
    // ... (Implementation of QuickSort - Recursive) ...
    return arr;
}


// Problem 2: Kth Smallest Element - QuickSelect
int quickSelect(std::vector<int>& arr, int k) {
    // ... (Implementation of QuickSelect) ...
    return 0; // Placeholder
}


// Problem 3: Sort a Linked List (Merge Sort - Adapt Merge Sort for Linked List)
// ... (Linked List Node definition and merge sort for linked list implementation) ...


//Problem 4: Sorting Almost Sorted Array - Insertion Sort (efficient for nearly sorted)
std::vector<int> insertionSort(std::vector<int> arr) {
    // ... (Implementation of Insertion Sort) ...
    return arr;
}


// Problem 5: Sort a Stack
// ... (Stack implementation and sorting algorithm using stack operations) ...

int main() {
    std::vector<int> arr = {12, 11, 13, 5, 6, 7};
    std::cout << "Original array: ";
    printArray(arr);

    std::vector<int> sortedArr = mergeSort(arr);
    std::cout << "Merge Sort: ";
    printArray(sortedArr);


    std::vector<int> arr2 = {12, 11, 13, 5, 6, 7};
    std::vector<int> sortedArr2 = quickSortRecursive(arr2, 0, arr2.size()-1);
    std::cout << "QuickSort: ";
    printArray(sortedArr2);

    // ... (Test other functions similarly) ...

    return 0;
}