# Array Manipulation Interview Project

This project is a comprehensive guide and practice repository for common array manipulation problems encountered in coding interviews. It includes problems, multiple solution approaches (including optimal ones), detailed explanations, test cases, performance benchmarks, and extensive documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Setup Instructions](#setup-instructions)
3.  [Problems Covered](#problems-covered)
    *   [Problem 1: Container With Most Water](#problem-1-container-with-most-water-leetcode-11)
    *   [Problem 2: Product of Array Except Self](#problem-2-product-of-array-except-self-leetcode-238)
    *   [Problem 3: Rotate Image (Matrix)](#problem-3-rotate-image-matrix-leetcode-48)
    *   [Problem 4: Meeting Rooms II](#problem-4-meeting-rooms-ii-leetcode-253)
4.  [How to Run Tests](#how-to-run-tests)
5.  [How to Run Benchmarks](#how-to-run-benchmarks)
6.  [Documentation Guide](#documentation-guide)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Structure

```
array_manipulation_project/
├── README.md                 # Project overview and instructions
├── requirements.txt          # Python dependencies
├── src/                      # Source code for algorithms and utilities
│   ├── problems.py           # Main algorithm implementations
│   └── utils.py              # Helper functions (e.g., for matrix comparison)
├── tests/                    # Unit tests for problem solutions
│   └── test_problems.py      # Test cases for all implemented problems
├── docs/                     # Comprehensive documentation
│   ├── algorithms.md         # Detailed explanation of algorithms
│   ├── diagrams.md           # ASCII art diagrams for visualization
│   └── interview_guide.md    # Interview tips, edge cases, variations
└── benchmarks/               # Performance benchmarking scripts
    └── benchmark_problems.py # Script to measure solution performance
```

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/array_manipulation_project.git
    cd array_manipulation_project
    ```
2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    # On macOS/Linux:
    source venv/bin/activate
    # On Windows:
    venv\Scripts\activate
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Problems Covered

Each problem below has its implementation in `src/problems.py` and detailed documentation in `docs/`.

### Problem 1: Container With Most Water (LeetCode 11)

Given `n` non-negative integers `a_1, a_2, ..., a_n` where each represents a point at coordinate `(i, a_i)`. `n` vertical lines are drawn such that the two endpoints of line `i` is at `(i, a_i)` and `(i, 0)`. Find two lines, which, together with the x-axis, forms a container, such that the container contains the most water.

**Example:**
Input: `height = [1,8,6,2,5,4,8,3,7]`
Output: `49`
Explanation: The vertical lines are `[1,8,6,2,5,4,8,3,7]`. The max area of water the container can contain is 49.

### Problem 2: Product of Array Except Self (LeetCode 238)

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.
The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in `O(n)` time and without using the division operation.

**Example:**
Input: `nums = [1,2,3,4]`
Output: `[24,12,8,6]`

### Problem 3: Rotate Image (Matrix) (LeetCode 48)

You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
You have to rotate the image in-place, which means you modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

**Example:**
Input: `matrix = [[1,2,3],[4,5,6],[7,8,9]]`
Output: `[[7,4,1],[8,5,2],[9,6,3]]`

### Problem 4: Meeting Rooms II (LeetCode 253)

Given an array of meeting time intervals where each interval `intervals[i] = [start_i, end_i]`, return the minimum number of conference rooms required.

**Example:**
Input: `intervals = [[0,30],[5,10],[15,20]]`
Output: `2`
Explanation:
Meeting 1: `[0,30]`
Meeting 2: `[5,10]` - requires another room
Meeting 3: `[15,20]` - can reuse room from meeting 2 (if it ends before 15) or another new room.
Room 1: `[0,30]`
Room 2: `[5,10]` then `[15,20]` (Meeting 2 ends at 10, so Meeting 3 can start in the same room at 15)
So, only 2 rooms needed.

## How to Run Tests

All unit tests are located in the `tests/` directory. You can run them using `pytest` (recommended) or `unittest`.

**Using pytest (preferred):**
```bash
pytest tests/
```
or simply
```bash
pytest
```
from the project root.

**Using unittest:**
```bash
python -m unittest discover tests
```

## How to Run Benchmarks

The benchmarking script `benchmarks/benchmark_problems.py` uses Python's `timeit` module to measure the execution time of different solutions for various input sizes.

To run benchmarks:
```bash
python benchmarks/benchmark_problems.py
```

This script will print performance results to the console.

## Documentation Guide

The `docs/` directory contains detailed explanations for the problems and solutions:

*   **`docs/algorithms.md`**: Provides in-depth discussions of the logic behind each solution, including alternative approaches, time and space complexity analyses, and key algorithmic concepts.
*   **`docs/diagrams.md`**: Contains ASCII art diagrams to visually illustrate complex steps or data structures used in the algorithms.
*   **`docs/interview_guide.md`**: Offers tips for approaching array manipulation problems in interviews, highlights common edge cases, potential gotchas, and discusses variations or follow-up questions.

We recommend reviewing these documents alongside the code to gain a deeper understanding.

## Contributing

Feel free to open issues or submit pull requests if you find any bugs, have suggestions for improvements, or want to add more problems/solutions.

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for more details (not included in this example, but standard practice).

---