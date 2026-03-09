```javascript
/**
 * algorithms/advancedSorts.js
 *
 * This file contains implementations of more advanced and efficient sorting algorithms.
 * These are generally preferred for larger datasets due to their better average-case
 * time complexities.
 *
 * Each function includes:
 * - Detailed comments explaining the logic.
 * - Time and Space Complexity analysis.
 * - Consideration for an optional custom comparison function where applicable.
 * - Handling of edge cases (empty or single-element arrays).
 */

const { swap, getComparator, partition, medianOfThree } = require('../utils/sorterUtils');

/**
 * 4. Merge Sort
 *
 * Description:
 *   Merge Sort is a divide-and-conquer algorithm. It recursively divides the array
 *   into two halves until it cannot be further divided (i.e., array with 0 or 1 element).
 *   Then, it merges the smaller sorted sub-arrays back together to form a larger sorted array.
 *   It is a stable sorting algorithm.
 *
 * How it works:
 *   1. Divide: The unsorted list is divided into N sublists, each containing one element
 *      (a list of one element is considered sorted).
 *   2. Conquer (Merge): Repeatedly merge sublists to produce new sorted sublists until
 *      there is only one sublist remaining. This will be the sorted list.
 *
 * Advantages:
 *   - Stable.
 *   - Guaranteed O(N log N) performance (worst, average, best case).
 *   - Parallelizable.
 *
 * Disadvantages:
 *   - Requires O(N) auxiliary space, making it less space-efficient than in-place sorts.
 *   - Not ideal for very small datasets where simpler sorts might be faster due to overhead.
 *
 * Time Complexity:
 *   - Worst Case: O(N log N)
 *   - Average Case: O(N log N)
 *   - Best Case: O(N log N)
 *
 * Space Complexity:
 *   - O(N) auxiliary space for the temporary merge array.
 *
 * @param {Array<any>} arr The array to be sorted.
 * @param {function(any, any): number} [compareFn] Optional comparison function.
 * @returns {Array<any>} The sorted array.
 */
function mergeSort(arr, compareFn) {
    if (!arr || arr.length < 2) {
        return arr; // Already sorted or invalid input
    }

    const comparator = getComparator(compareFn);

    /**
     * Recursive function to divide and sort the array.
     * @param {Array<any>} currentArr The array (or sub-array) to sort.
     * @returns {Array<any>} The sorted sub-array.
     */
    function _sort(currentArr) {
        if (currentArr.length < 2) {
            return currentArr; // Base case: a single element array is sorted
        }

        const mid = Math.floor(currentArr.length / 2);
        const left = currentArr.slice(0, mid);
        const right = currentArr.slice(mid);

        return _merge(_sort(left), _sort(right)); // Recursively sort and then merge
    }

    /**
     * Merges two sorted arrays into one sorted array.
     * @param {Array<any>} leftArr The left sorted sub-array.
     * @param {Array<any>} rightArr The right sorted sub-array.
     * @returns {Array<any>} The merged and sorted array.
     */
    function _merge(leftArr, rightArr) {
        const merged = [];
        let leftIdx = 0;
        let rightIdx = 0;

        // Compare elements from both arrays and add the smaller one to merged array
        while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
            if (comparator(leftArr[leftIdx], rightArr[rightIdx]) <= 0) {
                merged.push(leftArr[leftIdx]);
                leftIdx++;
            } else {
                merged.push(rightArr[rightIdx]);
                rightIdx++;
            }
        }

        // Add any remaining elements from left or right arrays
        return merged.concat(leftArr.slice(leftIdx)).concat(rightArr.slice(rightIdx));
    }

    // Since mergeSort creates new arrays, we replace the original array content
    // to match the in-place sorting function signature expectations.
    const sortedResult = _sort(arr);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = sortedResult[i];
    }
    return arr;
}

/**
 * 5. Quick Sort
 *
 * Description:
 *   Quick Sort is an efficient, in-place, comparison-based sorting algorithm.
 *   It is a divide-and-conquer algorithm. It picks an element as a pivot and
 *   partitions the given array around the picked pivot.
 *
 * How it works:
 *   1. Pick a Pivot: Select an element from the array, called the pivot.
 *   2. Partition: Rearrange the array such that all elements less than the pivot
 *      come before it, and all elements greater than the pivot come after it.
 *      Elements equal to the pivot can go on either side. After partitioning,
 *      the pivot is in its final sorted position.
 *   3. Recurse: Recursively apply the above steps to the sub-array of elements
 *      with smaller values and separately to the sub-array of elements with
 *      greater values.
 *
 * Pivot Selection Strategies:
 *   - First element (simple, but bad for already sorted/reverse sorted)
 *   - Last element (simple, also bad for already sorted/reverse sorted)
 *   - Random element (helps avoid worst-case for many inputs)
 *   - Median-of-three (chooses the median of the first, middle, and last elements,
 *     which provides a good balance and is used in many library implementations).
 *     This implementation uses Median-of-Three for robustness.
 *
 * Advantages:
 *   - Very fast in practice (often faster than Merge Sort).
 *   - In-place (O(log N) auxiliary space due to recursion stack, O(N) worst case).
 *
 * Disadvantages:
 *   - Not stable.
 *   - Worst-case O(N^2) if pivot selection is poor (e.g., always picking min/max).
 *
 * Time Complexity:
 *   - Worst Case: O(N^2) (if pivot selection consistently leads to unbalanced partitions)
 *   - Average Case: O(N log N)
 *   - Best Case: O(N log N)
 *
 * Space Complexity:
 *   - O(log N) average case (for recursion stack).
 *   - O(N) worst case (for recursion stack if partitions are very unbalanced).
 *
 * @param {Array<any>} arr The array to be sorted.
 * @param {function(any, any): number} [compareFn] Optional comparison function.
 * @returns {Array<any>} The sorted array.
 */
function quickSort(arr, compareFn) {
    if (!arr || arr.length < 2) {
        return arr;
    }

    const comparator = getComparator(compareFn);

    /**
     * Recursive function to sort a sub-array.
     * @param {number} low The starting index of the sub-array.
     * @param {number} high The ending index of the sub-array.
     */
    function _sort(low, high) {
        if (low < high) {
            // Use median-of-three to pick a better pivot
            const mid = Math.floor(low + (high - low) / 2);
            const pivotIndex = medianOfThree(arr, low, mid, high, comparator);
            
            // Move median-of-three pivot to the end for the partition function
            swap(arr, pivotIndex, high);

            // Partition the array and get the pivot's final position
            const pi = partition(arr, low, high, comparator);

            // Recursively sort elements before partition and after partition
            _sort(low, pi - 1);
            _sort(pi + 1, high);
        }
    }

    _sort(0, arr.length - 1);
    return arr;
}

/**
 * 6. Heap Sort
 *
 * Description:
 *   Heap Sort is a comparison-based sorting technique based on the Binary Heap data structure.
 *   It is similar to selection sort where we find the maximum element and place it at the end.
 *   However, unlike selection sort, Heap Sort uses a heap to find the maximum element efficiently.
 *
 * How it works:
 *   1. Build Max Heap: Build a max-heap from the input data. A max-heap is a complete
 *      binary tree where every parent node is greater than or equal to its children.
 *   2. Extract Max: Repeatedly extract the maximum element (the root of the heap) and
 *      place it at the end of the sorted portion of the array. After extracting,
 *      re-heapify the remaining elements.
 *
 * Advantages:
 *   - O(N log N) time complexity in all cases (worst, average, best).
 *   - In-place (O(1) auxiliary space, ignoring recursion stack if used).
 *
 * Disadvantages:
 *   - Not stable.
 *   - Performance can be slightly worse than Quick Sort in practice due to less cache-friendly access patterns.
 *
 * Time Complexity:
 *   - Worst Case: O(N log N)
 *   - Average Case: O(N log N)
 *   - Best Case: O(N log N)
 *
 * Space Complexity:
 *   - O(1) auxiliary space (in-place sort).
 *
 * @param {Array<any>} arr The array to be sorted.
 * @param {function(any, any): number} [compareFn] Optional comparison function.
 * @returns {Array<any>} The sorted array.
 */
function heapSort(arr, compareFn) {
    if (!arr || arr.length < 2) {
        return arr;
    }

    const comparator = getComparator(compareFn);
    const n = arr.length;

    /**
     * To heapify a subtree rooted with node i which is an index in arr[].
     * n is size of heap.
     * @param {number} n Size of the heap.
     * @param {number} i The root of the subtree to heapify.
     */
    function heapify(n, i) {
        let largest = i; // Initialize largest as root
        const left = 2 * i + 1; // Left child
        const right = 2 * i + 2; // Right child

        // If left child is larger than root
        if (left < n && comparator(arr[left], arr[largest]) > 0) {
            largest = left;
        }

        // If right child is larger than current largest
        if (right < n && comparator(arr[right], arr[largest]) > 0) {
            largest = right;
        }

        // If largest is not root
        if (largest !== i) {
            swap(arr, i, largest);
            // Recursively heapify the affected sub-tree
            heapify(n, largest);
        }
    }

    // Build max heap (rearrange array)
    // Start from the last non-leaf node and heapify downwards
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    // One by one extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root (largest element) to end
        swap(arr, 0, i);
        // Call max heapify on the reduced heap
        heapify(i, 0);
    }
    return arr;
}


/**
 * 7. Counting Sort
 *
 * Description:
 *   Counting Sort is a non-comparison based integer sorting algorithm.
 *   It works by counting the number of occurrences of each distinct element
 *   in the input array. It's efficient for sorting data within a specific range.
 *
 * Constraints:
 *   - Works only for non-negative integers.
 *   - The range of input numbers (k) should not be significantly larger than N,
 *     otherwise it becomes inefficient.
 *
 * How it works:
 *   1. Count occurrences: Create a `count` array to store the count of each element.
 *   2. Modify count array: Modify the `count` array such that each element stores
 *      the sum of previous counts. This indicates the position of each element
 *      in the output array.
 *   3. Build output array: Iterate through the input array from right to left.
 *      Place each element into its correct position in the `output` array
 *      and decrement its count.
 *
 * Advantages:
 *   - O(N + K) time complexity, where N is the number of elements and K is the range of input.
 *   - Stable.
 *
 * Disadvantages:
 *   - Only works for integers (or items that can be mapped to integers) with a limited range.
 *   - Can be very space-inefficient if K is very large.
 *
 * Time Complexity:
 *   - Worst Case: O(N + K)
 *   - Average Case: O(N + K)
 *   - Best Case: O(N + K)
 *
 * Space Complexity:
 *   - O(N + K) for the count and output arrays.
 *
 * @param {Array<number>} arr The array of non-negative integers to be sorted.
 * @returns {Array<number>} The sorted array.
 */
function countingSort(arr) {
    if (!arr || arr.length < 2) {
        return arr;
    }

    // Find the maximum element to determine the range (K)
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < 0) {
            throw new Error("Counting Sort only works for non-negative integers.");
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    // Create count array and initialize with zeros
    const count = new Array(max + 1).fill(0);
    // Create output array
    const output = new Array(arr.length);

    // Store count of each character
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }

    // Store cumulative count
    // count[i] now contains actual position of this character in output array
    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    // Iterate from right to left to ensure stability
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    // Copy the output array to arr, so that arr now contains sorted characters
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }

    return arr;
}


/**
 * 8. Radix Sort
 *
 * Description:
 *   Radix Sort is a non-comparison based integer sorting algorithm.
 *   It sorts elements by processing individual digits. It works by
 *   distributing elements into buckets according to their radix (base)
 *   or digits.
 *
 * How it works:
 *   It processes numbers digit by digit, from the least significant digit (LSD)
 *   to the most significant digit (MSD). For each digit position, it uses a
 *   stable sorting algorithm (like Counting Sort) to sort the numbers.
 *
 * Advantages:
 *   - O(W * N) time complexity, where W is the number of digits (or bits)
 *     in the maximum number, and N is the number of elements.
 *     If W is constant, it's effectively O(N).
 *   - Stable.
 *
 * Disadvantages:
 *   - Only works for integers (or items that can be mapped to integers).
 *   - Can be slower than comparison sorts for small, uniformly distributed
 *     numbers due to overhead.
 *   - Not truly "in-place" due to bucket creation or auxiliary arrays.
 *   - Handles negative numbers poorly without special adjustments. This
 *     implementation assumes non-negative integers.
 *
 * Time Complexity:
 *   - Worst Case: O(N * k), where k is the number of digits (max length).
 *   - Average Case: O(N * k)
 *   - Best Case: O(N * k)
 *
 * Space Complexity:
 *   - O(N + B), where B is the base (e.g., 10 for decimal digits) due to buckets.
 *
 * @param {Array<number>} arr The array of non-negative integers to be sorted.
 * @returns {Array<number>} The sorted array.
 */
function radixSort(arr) {
    if (!arr || arr.length < 2) {
        return arr;
    }

    // Find the maximum number to determine the number of digits
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < 0) {
            throw new Error("Radix Sort implementation only supports non-negative integers.");
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    // Perform counting sort for every digit, starting from LSD (least significant digit)
    // exp is 10^i, where i is current digit position
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countSortByDigit(arr, exp);
    }
    return arr;

    /**
     * A helper function for Radix Sort that performs counting sort based on the digit
     * represented by `exp`.
     * @param {Array<number>} arr The array to be sorted.
     * @param {number} exp The current digit's place value (e.g., 1, 10, 100).
     */
    function countSortByDigit(arr, exp) {
        const n = arr.length;
        const output = new Array(n); // Output array
        const count = new Array(10).fill(0); // For digits 0 to 9

        // Store count of occurrences in count[]
        for (let i = 0; i < n; i++) {
            count[Math.floor(arr[i] / exp) % 10]++;
        }

        // Change count[i] so that count[i] now contains actual position of this digit in output[]
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        // Iterate from right to left to maintain stability
        for (let i = n - 1; i >= 0; i--) {
            output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
            count[Math.floor(arr[i] / exp) % 10]--;
        }

        // Copy the output array to arr, so that arr now contains sorted numbers
        // according to current digit
        for (let i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    }
}


module.exports = {
    mergeSort,
    quickSort,
    heapSort,
    countingSort,
    radixSort
};
```