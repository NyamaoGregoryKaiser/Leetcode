# Comprehensive Sorting Algorithms Interview Project

This project is designed to be a thorough resource for preparing for coding interviews focused on sorting algorithms. It covers fundamental sorting techniques, common variations, and related problems, offering multiple approaches, detailed explanations, robust testing, and performance benchmarking.

## Project Structure

*   `algorithms/`: Contains the core implementations of various sorting algorithms and problem-specific solutions.
    *   `sorting_algorithms.py`: Basic sorting algorithms like Insertion Sort, Merge Sort, and Quick Sort.
    *   `variations.py`: Solutions to common sorting-related interview problems (Custom Object Sort, Kth Largest Element, Sort Colors, Wiggle Sort).
*   `tests/`: Unit tests for all implemented algorithms and problems, ensuring correctness across various edge cases.
    *   `test_sorting_algorithms.py`: Tests for basic sorting algorithms.
    *   `test_variations.py`: Tests for sorting variations.
*   `utils/`: Helper utilities, such as functions to generate different types of arrays for testing and benchmarking.
    *   `helpers.py`: Array generation functions.
*   `docs/`: Comprehensive documentation to aid understanding and interview preparation.
    *   `algorithm_explanations.md`: In-depth descriptions, logic, and complexity analysis for each algorithm.
    *   `diagrams.md`: Visual aids (ASCII art) to illustrate key sorting processes.
    *   `interview_tips.md`: Advice on approaching sorting problems in interviews, common pitfalls, and communication strategies.
*   `benchmarks/`: Scripts to measure and compare the performance of different sorting algorithms.
    *   `benchmark_sorting.py`: Compares execution times.
*   `README.md`: This file, providing an overview of the project, setup instructions, and problem descriptions.
*   `requirements.txt`: Lists Python dependencies.

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sorting-algorithms-project.git
    cd sorting-algorithms-project
    ```
    (Note: Replace `https://github.com/your-username/sorting-algorithms-project.git` with your actual repo URL or create the directory structure manually if not using Git.)

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv .venv
    ```

3.  **Activate the virtual environment:**
    *   **On macOS/Linux:**
        ```bash
        source .venv/bin/activate
        ```
    *   **On Windows:**
        ```bash
        .venv\Scripts\activate
        ```

4.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Problems Covered

### 1. Basic Sorting Algorithms (`algorithms/sorting_algorithms.py`)

Implementation of fundamental sorting algorithms, each with detailed comments, complexity analysis, and considerations for in-place vs. out-of-place sorting.

*   **Insertion Sort:**
    *   **Concept:** Builds the final sorted array (or list) one item at a time. It iterates through the input array and removes one element at a time, finds the place where it belongs within the already sorted part, and inserts it there.
    *   **Use Cases:** Efficient for small data sets or data sets that are already substantially sorted.
    *   **Complexity:** O(N^2) average and worst-case time, O(1) space.
*   **Merge Sort:**
    *   **Concept:** A divide-and-conquer algorithm. It recursively divides an array in half until it gets to single-element arrays, then merges those halves back together in sorted order.
    *   **Use Cases:** Stable sort, guaranteed O(N log N) performance, good for external sorting.
    *   **Complexity:** O(N log N) time, O(N) space (due to auxiliary arrays for merging).
*   **Quick Sort:**
    *   **Concept:** Also a divide-and-conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot. The pivot is placed at its correct sorted position in the array.
    *   **Use Cases:** Generally faster in practice than Merge Sort due to better constant factors and cache performance. In-place for linked lists, but requires O(log N) space for recursive call stack.
    *   **Complexity:** O(N log N) average-case time, O(N^2) worst-case time (rare with good pivot choice), O(log N) space (for recursion stack).

### 2. Custom Object Sorting (`algorithms/variations.py`)

*   **Problem:** Given a list of `Person` objects (each having `age` and `name`), sort them first by `age` in ascending order. If ages are the same, then sort by `name` in ascending order.
*   **Concepts:** Demonstrates how to use Python's `sort` or `sorted` with a custom `key` function, or `functools.cmp_to_key` for more complex comparison logic.

### 3. Kth Largest Element in an Array (`algorithms/variations.py`)

*   **Problem:** Find the `k`-th largest element in an unsorted array. Note that it is the `k`-th largest element in the sorted order, not the `k`-th distinct element.
*   **Approaches:**
    *   **Sorting (Brute Force):** Sort the array and return `nums[n - k]`. O(N log N) time.
    *   **Heap (Optimized for repeated queries or streaming data):** Use a min-heap of size `k`. Iterate through the array, pushing elements into the heap. If the heap size exceeds `k`, pop the smallest element. The top of the heap is the `k`-th largest. O(N log K) time.
    *   **Quickselect (Optimal Average Case):** A selection algorithm related to Quick Sort. It partitions the array and recursively searches in the appropriate sub-array. O(N) average-case time, O(N^2) worst-case time.

### 4. Sort Colors (Dutch National Flag Problem) (`algorithms/variations.py`)

*   **Problem:** Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
*   **Approach:**
    *   **One-Pass Algorithm (Dutch National Flag):** Use three pointers (`low`, `mid`, `high`) to partition the array into three sections: `[0...low-1]` for 0s, `[low...mid-1]` for 1s, and `[high+1...n-1]` for 2s. Elements at `mid` are processed and swapped as needed. O(N) time, O(1) space.
    *   **Two-Pass Counting Sort (Alternative):** Count occurrences of 0s, 1s, and 2s, then overwrite the array. O(N) time, O(1) space (if counts are considered constant space).

### 5. Wiggle Sort (`algorithms/variations.py`)

*   **Problem:** Given an unsorted array `nums`, reorder it in-place such that `nums[0] <= nums[1] >= nums[2] <= nums[3]...`.
*   **Approaches:**
    *   **Sort then Swap (Brute Force):** Sort the array first, then swap adjacent elements starting from the second element. `nums[1]` with `nums[2]`, `nums[3]` with `nums[4]`, etc. O(N log N) time.
    *   **Single Pass (Optimal):** Iterate through the array. If `i` is odd, ensure `nums[i] >= nums[i-1]`. If `i` is even, ensure `nums[i] <= nums[i-1]`. If the condition is violated, swap `nums[i]` and `nums[i-1]`. O(N) time.

## How to Run

### Run Tests

To execute all unit tests:
```bash
python -m unittest discover tests
```

### Run Benchmarks

To run the performance benchmarks:
```bash
python benchmarks/benchmark_sorting.py
```

### Explore Documentation

Open the markdown files in the `docs/` directory with a markdown viewer for detailed explanations and diagrams.

## Contributing

Feel free to open issues or pull requests to improve this project. Suggestions for new problems, alternative solutions, or better explanations are always welcome!

## License

This project is open-sourced under the MIT License.

---