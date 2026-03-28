```markdown
# Sorting Algorithms Interview Project

This project is a comprehensive resource for mastering sorting algorithms and their applications, tailored for coding interview preparation. It includes implementations of fundamental sorting algorithms, various problems requiring sorting techniques, extensive test cases, performance benchmarks, and detailed documentation.

## Project Structure

```
sorting-algorithms-project/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── sorting/
│   │                   ├── algorithms/             // Core sorting algorithm implementations
│   │                   │   ├── AbstractSorter.java
│   │                   │   ├── BubbleSort.java
│   │                   │   ├── SelectionSort.java
│   │                   │   ├── InsertionSort.java
│   │                   │   ├── MergeSort.java
│   │                   │   ├── QuickSort.java
│   │                   │   ├── HeapSort.java
│   │                   │   ├── CountingSort.java
│   │                   │   └── RadixSort.java
│   │                   ├── problems/               // Problems leveraging sorting techniques
│   │                   │   ├── P1_KthLargestElement.java
│   │                   │   ├── P2_MergeIntervals.java
│   │                   │   ├── P3_DutchNationalFlag.java
│   │                   │   ├── P4_SortByFrequency.java
│   │                   │   └── P5_FindMissingPositive.java
│   │                   └── utils/                  // Helper utilities
│   │                       ├── ArrayGenerator.java
│   │                       └── Interval.java
│   ├── test/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── sorting/
│   │                   ├── algorithms/
│   │                   │   ├── SortAlgorithmTest.java  // Tests for core sorters
│   │                   │   └── PerformanceBenchmark.java // Benchmarking sorters
│   │                   └── problems/                   // Tests for problem solutions
│   │                       ├── P1_KthLargestElementTest.java
│   │                       ├── P2_MergeIntervalsTest.java
│   │                       ├── P3_DutchNationalFlagTest.java
│   │                       ├── P4_SortByFrequencyTest.java
│   │                       └── P5_FindMissingPositiveTest.java
├── docs/                                   // Documentation and diagrams
│   ├── README.md
│   ├── SortingAlgorithmsExplained.md
│   ├── InterviewTipsAndVariations.md
│   └── diagrams/
│       ├── merge_sort_diagram.txt
│       ├── quick_sort_diagram.txt
│       └── heap_sort_diagram.txt
└── pom.xml                                 // Maven project file
```

## How to Set Up and Run

1.  **Prerequisites**:
    *   Java Development Kit (JDK) 11 or higher.
    *   Apache Maven.

2.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd sorting-algorithms-project
    ```

3.  **Compile the Project**:
    ```bash
    mvn clean install
    ```

4.  **Run Tests**:
    To run all unit tests:
    ```bash
    mvn test
    ```
    To run a specific test class (e.g., `SortAlgorithmTest`):
    ```bash
    mvn test -Dtest=SortAlgorithmTest
    ```

5.  **Run Performance Benchmarks**:
    The `PerformanceBenchmark.java` file in `src/test/java/com/example/sorting/algorithms/` can be executed as a JUnit test. It will print performance results to the console.

## Problem Descriptions

This section outlines the coding problems included in this project, each designed to test your understanding and application of sorting principles.

### Problem 1: Kth Largest Element in an Array (`P1_KthLargestElement.java`)

**Description**: Find the k-th largest element in an unsorted array. Note that it is the k-th largest element in the sorted order, not the k-th distinct element.

**Example**:
*   Input: `nums = [3,2,1,5,6,4]`, `k = 2`
*   Output: `5` (Sorted array: `[1,2,3,4,5,6]`, 2nd largest is `5`)

*   Input: `nums = [3,2,3,1,2,4,5,5,6]`, `k = 4`
*   Output: `4` (Sorted array: `[1,2,2,3,3,4,5,5,6]`, 4th largest is `4`)

**Approaches**:
1.  **Sorting**: Sort the entire array and pick the element. (Brute Force)
2.  **Min-Heap**: Use a min-heap of size `k`. Iterate through the array, add elements to the heap. If heap size exceeds `k`, remove the smallest element. The top of the heap is the k-th largest.
3.  **QuickSelect**: A selection algorithm related to QuickSort. It works by partitioning the array around a pivot and recursively searching in the appropriate subarray. (Optimized, Average O(N))

### Problem 2: Merge Intervals (`P2_MergeIntervals.java`)

**Description**: Given a collection of intervals, merge all overlapping intervals.

**Example**:
*   Input: `intervals = [[1,3],[2,6],[8,10],[15,18]]`
*   Output: `[[1,6],[8,10],[15,18]]`
    (Intervals `[1,3]` and `[2,6]` overlap, merge them into `[1,6]`)

*   Input: `intervals = [[1,4],[4,5]]`
*   Output: `[[1,5]]`
    (Intervals `[1,4]` and `[4,5]` are considered overlapping at endpoint `4`)

**Approaches**:
1.  **Sort and Merge**: Sort the intervals based on their start times. Then, iterate through the sorted intervals, merging current with previous if they overlap.

### Problem 3: Dutch National Flag Problem (`P3_DutchNationalFlag.java`)

**Description**: Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.

**Constraint**: You are not allowed to use any built-in sort function.

**Example**:
*   Input: `nums = [2,0,2,1,1,0]`
*   Output: `[0,0,1,1,2,2]`

*   Input: `nums = [2,0,1]`
*   Output: `[0,1,2]`

**Approaches**:
1.  **Counting Sort (Two-Pass)**: Count the occurrences of 0s, 1s, and 2s, then overwrite the array. (O(N) time, O(1) space, but two passes)
2.  **Three-Pointer Approach (One-Pass)**: Maintain three pointers: `low` (for 0s), `mid` (current element), and `high` (for 2s). Iterate with `mid`, swapping elements to their correct partitions. (O(N) time, O(1) space, one pass)

### Problem 4: Sort Characters by Frequency (`P4_SortByFrequency.java`)

**Description**: Given a string `s`, sort it in decreasing order based on the frequency of the characters. If two characters have the same frequency, they can appear in any order.

**Example**:
*   Input: `s = "tree"`
*   Output: `"eert"` (or `"eetr"`)
    ('e' appears twice, 'r' and 't' once. So 'e' must appear before 'r' and 't'.)

*   Input: `s = "cccaaa"`
*   Output: `"aaaccc"` (or `"cccaaa"`)
    ('c' appears three times, 'a' appears three times. Both are valid.)

**Approaches**:
1.  **Hash Map + Custom Sort**: Count character frequencies using a hash map. Then, sort the characters based on their frequencies (descending). Build the result string.
2.  **Hash Map + Max-Heap (Priority Queue)**: Count character frequencies. Insert character-frequency pairs into a max-heap, ordered by frequency. Extract from heap and build string.
3.  **Hash Map + Bucket Sort**: Count character frequencies. Use an array of lists (buckets) where the index represents frequency. Place characters into buckets. Iterate buckets from highest frequency to lowest.

### Problem 5: Find the Smallest Missing Positive Integer (`P5_FindMissingPositive.java`)

**Description**: Given an unsorted integer array `nums`, find the smallest missing positive integer. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.

**Example**:
*   Input: `nums = [1,2,0]`
*   Output: `3`

*   Input: `nums = [3,4,-1,1]`
*   Output: `2`

*   Input: `nums = [7,8,9,11,12]`
*   Output: `1`

**Approaches**:
1.  **Hash Set (O(N) space)**: Store all positive numbers in a hash set. Iterate from 1 upwards, checking if each number exists in the set.
2.  **In-place Swapping (O(1) space)**: The key insight is that if the array contains `N` elements, the smallest missing positive integer must be between `1` and `N+1`. We can use the array itself as a hash map. Place each positive number `x` at index `x-1` if `x-1` is within bounds. After placing, iterate through the array to find the first index `i` where `nums[i] != i+1`.

## Documentation

The `docs/` directory contains additional detailed explanations:

*   **`SortingAlgorithmsExplained.md`**: In-depth explanations of various sorting algorithms, including their principles, time/space complexity, stability, and typical use cases.
*   **`InterviewTipsAndVariations.md`**: Practical advice for interviews, common questions, edge cases to consider, and variations of standard problems.
*   **`diagrams/`**: ASCII art diagrams illustrating the mechanics of complex algorithms like Merge Sort, Quick Sort, and Heap Sort.

---
```