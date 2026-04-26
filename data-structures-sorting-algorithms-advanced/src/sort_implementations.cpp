```cpp
#include "sort_implementations.h"
#include "helpers.h" // For swap, print_vector, etc.
#include <random>    // For std::random_device, std::mt19937, std::uniform_int_distribution
#include <algorithm> // For std::nth_element, std::sort (for comparison)

namespace SortingAlgorithms {

// --- Basic Sorts ---

template <typename T>
void bubbleSort(std::vector<T>& arr) {
    int n = arr.size();
    bool swapped;
    for (int i = 0; i < n - 1; ++i) {
        swapped = false;
        for (int j = 0; j < n - 1 - i; ++j) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        // If no two elements were swapped by inner loop, then array is sorted
        if (!swapped) {
            break;
        }
    }
}

template <typename T>
void selectionSort(std::vector<T>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        int min_idx = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        if (min_idx != i) {
            swap(arr[i], arr[min_idx]);
        }
    }
}

template <typename T>
void insertionSort(std::vector<T>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; ++i) {
        T key = arr[i];
        int j = i - 1;
        // Move elements of arr[0..i-1], that are greater than key,
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// --- Efficient Comparison Sorts ---

// --- Quick Sort Helper Functions ---

// Lomuto partition scheme
template <typename T, typename Compare>
int partition(std::vector<T>& arr, int low, int high, Compare comp) {
    // Choose a random pivot to avoid worst-case O(N^2) on nearly sorted arrays
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(low, high);
    int random_pivot_idx = distrib(gen);
    swap(arr[random_pivot_idx], arr[high]); // Move random pivot to end

    T pivot = arr[high];
    int i = (low - 1); // Index of smaller element

    for (int j = low; j <= high - 1; ++j) {
        // If current element is smaller than or equal to pivot
        if (comp(arr[j], pivot) || (!comp(pivot, arr[j]) && !comp(arr[j], pivot))) { // arr[j] <= pivot
            i++; // Increment index of smaller element
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

template <typename T, typename Compare>
void quickSortRecursive(std::vector<T>& arr, int low, int high, Compare comp) {
    if (low < high) {
        // pi is partitioning index, arr[pi] is now at right place
        int pi = partition(arr, low, high, comp);

        // Separately sort elements before partition and after partition
        quickSortRecursive(arr, low, pi - 1, comp);
        quickSortRecursive(arr, pi + 1, high, comp);
    }
}

template <typename T>
void quickSort(std::vector<T>& arr) {
    quickSortRecursive(arr, 0, arr.size() - 1, std::less<T>());
}

template <typename T, typename Compare>
void quickSort(std::vector<T>& arr, Compare comp) {
    quickSortRecursive(arr, 0, arr.size() - 1, comp);
}


// --- Merge Sort Helper Functions ---

template <typename T, typename Compare>
void merge(std::vector<T>& arr, int left, int mid, int right, Compare comp) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Create temp arrays
    std::vector<T> L(n1), R(n2);

    // Copy data to temp arrays L[] and R[]
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    // Merge the temp arrays back into arr[l..r]
    int i = 0; // Initial index of first sub-array
    int j = 0; // Initial index of second sub-array
    int k = left; // Initial index of merged sub-array

    while (i < n1 && j < n2) {
        if (comp(L[i], R[j]) || (!comp(R[j], L[i]) && !comp(L[i], R[j]))) { // L[i] <= R[j]
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[], if any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

template <typename T, typename Compare>
void mergeSortRecursive(std::vector<T>& arr, int left, int right, Compare comp) {
    if (left < right) {
        // Same as (left+right)/2, but avoids overflow for large left and right
        int mid = left + (right - left) / 2;

        // Sort first and second halves
        mergeSortRecursive(arr, left, mid, comp);
        mergeSortRecursive(arr, mid + 1, right, comp);

        merge(arr, left, mid, right, comp);
    }
}

template <typename T>
void mergeSort(std::vector<T>& arr) {
    mergeSortRecursive(arr, 0, arr.size() - 1, std::less<T>());
}

template <typename T, typename Compare>
void mergeSort(std::vector<T>& arr, Compare comp) {
    mergeSortRecursive(arr, 0, arr.size() - 1, comp);
}


// --- Heap Sort Helper Functions ---

// To heapify a subtree rooted with node i which is an index in arr[].
// n is size of heap
template <typename T>
void heapify(std::vector<T>& arr, int n, int i) {
    int largest = i;     // Initialize largest as root
    int left = 2 * i + 1;  // left = 2*i + 1
    int right = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest])
        largest = left;

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;

    // If largest is not root
    if (largest != i) {
        swap(arr[i], arr[largest]);

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

template <typename T>
void heapSort(std::vector<T>& arr) {
    int n = arr.size();

    // Build heap (rearrange array)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // One by one extract an element from heap
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        swap(arr[0], arr[i]);

        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
}


// --- Kth Element (QuickSelect) ---

template <typename T>
T quickSelect(std::vector<T>& arr, int k) {
    int n = arr.size();
    if (k < 1 || k > n) {
        throw std::out_of_range("k is out of bounds for quickSelect");
    }

    // QuickSelect finds the k-th smallest element.
    // If we want the Kth LARGEST element, we need to find the (N - K + 1)-th smallest element.
    // Example: For K=1 (largest), find (N-1+1) = Nth smallest element.
    // So, if the problem requires Kth largest, adjust k: `k_smallest = n - k + 1;`
    // The current implementation returns k-th smallest directly.

    int low = 0;
    int high = n - 1;
    std::random_device rd;
    std::mt19937 gen(rd());

    while (low <= high) {
        // Randomized pivot selection
        std::uniform_int_distribution<> distrib(low, high);
        int pivot_idx = distrib(gen);
        swap(arr[pivot_idx], arr[high]); // Move pivot to end

        T pivot_val = arr[high];
        int i = low - 1; // Index of smaller element

        // Lomuto partition around the pivot value
        for (int j = low; j < high; ++j) {
            if (arr[j] <= pivot_val) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i + 1], arr[high]);
        int p = i + 1; // p is the final position of the pivot

        // If pivot is at the k-th position (0-indexed k-1)
        if (p == k - 1) {
            return arr[p];
        } else if (p < k - 1) { // If pivot is too small, search in the right partition
            low = p + 1;
        } else { // If pivot is too large, search in the left partition
            high = p - 1;
        }
    }
    // Should not reach here if k is valid and array is not empty
    return T(); // Default return, indicates an error or unexpected state
}

} // namespace SortingAlgorithms
```