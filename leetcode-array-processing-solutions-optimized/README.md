# Array Manipulation Interview Project

This project is a comprehensive resource for mastering common array manipulation problems frequently asked in coding interviews. It includes multiple problem statements, optimal solutions with detailed explanations, time/space complexity analysis, extensive test cases, performance benchmarks, and documentation on algorithmic approaches and interview tips.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [How to Build and Run](#how-to-build-and-run)
3.  [Problems Covered](#problems-covered)
    *   [Problem 1: Rotate Array](#problem-1-rotate-array)
    *   [Problem 2: Product of Array Except Self](#problem-2-product-of-array-except-self)
    *   [Problem 3: Merge Intervals](#problem-3-merge-intervals)
    *   [Problem 4: Trapping Rain Water](#problem-4-trapping-rain-water)
4.  [Documentation and Insights](#documentation-and-insights)
5.  [Interview Tips and Variations](#interview-tips-and-variations)

## Project Structure

```
ArrayManipulationProject/
├── README.md                 # Project overview and problem descriptions
├── build.sh                  # Script to build the project components
├── src/                      # Source code for algorithms and main executable
│   ├── problems/             # Implementations for each problem
│   │   ├── merge_intervals.cpp
│   │   ├── product_except_self.cpp
│   │   ├── rotate_array.cpp
│   │   └── trapping_rain_water.cpp
│   ├── main.cpp              # Entry point to demonstrate problem solutions
│   └── include/              # Header files for shared declarations
│       ├── array_manipulation.h # Declarations for all problem functions
│       └── utils.h           # Declarations for utility functions
├── tests/                    # Unit tests for all algorithms
│   ├── test_main.cpp         # Main test runner with extensive test cases
│   └── include/              # Header for test utilities
│       └── test_utils.h      # Custom assertion utility for testing
├── benchmarks/               # Performance benchmarking suite
│   └── benchmark_main.cpp    # Compares different approaches/solutions
├── docs/                     # Detailed algorithm explanations and diagrams
│   └── algorithms.md         # In-depth discussion of each algorithm
└── utils/                    # Common utility implementations
    └── array_utils.cpp       # Implementations for utility functions (e.g., print, compare)
```

## How to Build and Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ArrayManipulationProject.git
    cd ArrayManipulationProject
    ```

2.  **Build using the provided script:**
    The `build.sh` script compiles all necessary components.
    ```bash
    chmod +x build.sh
    ./build.sh
    ```
    This script will create executables in a `bin/` directory: `main_app`, `test_app`, `benchmark_app`.

3.  **Run the main application (examples):**
    ```bash
    ./bin/main_app
    ```

4.  **Run tests:**
    ```bash
    ./bin/test_app
    ```

5.  **Run benchmarks:**
    ```bash
    ./bin/benchmark_app
    ```

## Problems Covered

### Problem 1: Rotate Array

**Description:** Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.
The array `nums` can be modified in-place.

**Example:**
Input: `nums = [1,2,3,4,5,6,7], k = 3`
Output: `[5,6,7,1,2,3,4]`

**Explanation:**
1. rotate 1 step to the right: `[7,1,2,3,4,5,6]`
2. rotate 2 steps to the right: `[6,7,1,2,3,4,5]`
3. rotate 3 steps to the right: `[5,6,7,1,2,3,4]`

### Problem 2: Product of Array Except Self

**Description:** Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.
The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in `O(n)` time and without using the division operation.

**Example:**
Input: `nums = [1,2,3,4]`
Output: `[24,12,8,6]`

**Explanation:**
`answer[0] = 2 * 3 * 4 = 24`
`answer[1] = 1 * 3 * 4 = 12`
`answer[2] = 1 * 2 * 4 = 8`
`answer[3] = 1 * 2 * 3 = 6`

### Problem 3: Merge Intervals

**Description:** Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Example:**
Input: `intervals = [[1,3],[2,6],[8,10],[15,18]]`
Output: `[[1,6],[8,10],[15,18]]`

**Explanation:** Since intervals `[1,3]` and `[2,6]` overlap, merge them into `[1,6]`.

### Problem 4: Trapping Rain Water

**Description:** Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Example:**
Input: `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
Output: `6`

**Explanation:** The above elevation map (black section) is represented by array `[0,1,0,2,1,0,1,3,2,1,2,1]`. In this case, 6 units of rain water (blue section) are being trapped.

## Documentation and Insights

The `docs/algorithms.md` file contains detailed explanations for each problem, including:
*   In-depth logic breakdown for optimal solutions.
*   ASCII art diagrams to visualize the algorithms.
*   Discussion of edge cases and common pitfalls.
*   Comparison of different approaches (where applicable).

## Interview Tips and Variations

1.  **Understand Constraints:** Always clarify input size, value ranges, and time/space complexity requirements. These often dictate the optimal approach.
2.  **Edge Cases First:** Consider empty arrays, single-element arrays, arrays with identical elements, and arrays with maximum/minimum values.
3.  **In-place Modification:** Many array problems expect an in-place solution (O(1) auxiliary space). Be prepared to demonstrate this.
4.  **Two Pointers:** A very common technique for array problems. Look for opportunities to use it for linear time complexity.
5.  **Sorting:** When intervals or order matter, sorting the array/elements can often simplify the problem (e.g., Merge Intervals). Note the `O(N log N)` cost.
6.  **Prefix/Suffix Arrays:** Useful for calculating cumulative properties efficiently (e.g., Product Except Self, Trapping Rain Water).
7.  **Visualize:** Draw out examples, especially for complex problems like Trapping Rain Water or spiral matrix traversals. ASCII art can be your friend!
8.  **Talk Through Your Thought Process:** Explain your initial brute-force ideas, how you optimize them, and why your chosen solution is optimal.
9.  **Space-Time Trade-offs:** Be ready to discuss how different solutions might use more space for better time complexity, or vice-versa.
10. **Follow-up Questions:** Interviewers often ask for variations:
    *   "What if `k` can be negative?" (Rotate Array)
    *   "What if the product could overflow?" (Product Except Self)
    *   "What if intervals are not sorted?" (Merge Intervals)
    *   "What if the array is very sparse?" (Trapping Rain Water)

This project aims to equip you with the knowledge and practice to confidently tackle array manipulation challenges. Good luck!

---