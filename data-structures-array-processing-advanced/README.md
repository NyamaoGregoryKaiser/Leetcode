```markdown
# Array Manipulation Interview Project

This project provides a comprehensive set of solutions for common array manipulation problems frequently encountered in coding interviews. It aims to demonstrate various algorithmic approaches, including brute-force, optimized, in-place, and dynamic programming solutions, along with detailed explanations, complexity analysis, and extensive test cases.

## Project Structure

```
array_manipulation_project/
├── pom.xml                                  # Maven build file
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── arraymanipulation/
│   │               ├── problems/
│   │               │   ├── ArrayManipulationProblems.java  # Main algorithm implementations
│   │               │   └── SolutionApproach.java           # Enum for different solution strategies
│   │               ├── utils/
│   │               │   ├── ArrayUtils.java                 # Helper utilities (print, copy, generate arrays)
│   │               │   └── PerformanceTracker.java         # Utility for benchmarking execution time
│   │               └── ArrayManipulator.java               # Main demonstration class
│   └── test/
│       └── java/
│           └── com/
│               └── arraymanipulation/
│                   └── problems/
│                       └── ArrayManipulationProblemsTest.java # JUnit 5 test suite
├── docs/
│   ├── AlgorithmExplanation.md              # Detailed explanation of algorithms, logic, and diagrams
│   └── InterviewTips.md                     # General interview advice and problem variations
└── README.md                                # Project overview, problem descriptions
```

## How to Run and Test

### Prerequisites

*   Java Development Kit (JDK) 11 or higher
*   Apache Maven

### Building the Project

Navigate to the root directory of the project (`array_manipulation_project/`) and run:

```bash
mvn clean install
```

This command compiles the source code, runs tests, and packages the project.

### Running Demonstrations

To see the demonstrations of different algorithms and their performance:

```bash
mvn exec:java -Dexec.mainClass="com.arraymanipulation.ArrayManipulator"
```

This will execute the `main` method in `ArrayManipulator.java`, which showcases each problem with various approaches and prints their execution times.

### Running Tests

To run all JUnit 5 tests:

```bash
mvn test
```

This will execute `ArrayManipulationProblemsTest.java` and report the test results.

## Problem Descriptions

Here are the problems addressed in this project, mirroring how they might be presented in a coding interview.

---

### Problem 1: Rotate Array

**Description:**
Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is a non-negative integer. The array should be modified in-place if possible.

**Constraints:**
*   `1 <= nums.length <= 10^5`
*   `-2^31 <= nums[i] <= 2^31 - 1`
*   `0 <= k <= 10^5`

**Example:**
```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
```

**Approaches Implemented:**
*   **Brute Force:** Repeatedly shift elements one by one.
*   **Extra Space:** Copy elements to a new array at their final positions, then copy back.
*   **Reversal Algorithm (Optimal):** Perform three reversals to achieve rotation in-place.

---

### Problem 2: Maximum Subarray Sum (Kadane's Algorithm)

**Description:**
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A *contiguous subarray* is a portion of an array that consists of consecutive elements.

**Constraints:**
*   `1 <= nums.length <= 10^5`
*   `-10^4 <= nums[i] <= 10^4`

**Example:**
```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The contiguous subarray [4,-1,2,1] has the largest sum = 6.
```

**Approaches Implemented:**
*   **Brute Force:** Iterate through all possible subarrays and calculate their sums.
*   **Kadane's Algorithm (Optimal):** A dynamic programming approach that finds the maximum sum subarray in linear time.

---

### Problem 3: Trapping Rain Water

**Description:**
Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Constraints:**
*   `n == height.length`
*   `1 <= n <= 2 * 10^4`
*   `0 <= height[i] <= 10^5`

**Example:**
```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
```

**Approaches Implemented:**
*   **Brute Force:** For each bar, find the maximum height on its left and right, then calculate trapped water.
*   **Dynamic Programming (Precompute Max Heights):** Precompute `leftMax` and `rightMax` arrays to avoid redundant calculations.
*   **Two Pointers (Optimal):** An efficient, O(1) space solution using two pointers to maintain current max heights from both ends.

---

### Problem 4: Product of Array Except Self

**Description:**
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in `O(n)` time and without using the division operation.

**Constraints:**
*   `2 <= nums.length <= 10^5`
*   `-30 <= nums[i] <= 30`
*   The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

**Example:**
```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Explanation:
answer[0] = 2 * 3 * 4 = 24
answer[1] = 1 * 3 * 4 = 12
answer[2] = 1 * 2 * 4 = 8
answer[3] = 1 * 2 * 3 = 6
```

**Approaches Implemented:**
*   **Brute Force (with Division):** Calculate total product, then divide by `nums[i]`. (Violates "no division" constraint but demonstrates concept, handles zeros).
*   **Two Pass (Prefix/Suffix Products - Optimal):** Calculate prefix products in one pass and suffix products in another, combining them to get the final result without division.

---

## Documentation

*   **`docs/AlgorithmExplanation.md`**: Provides in-depth explanations of each algorithm, including step-by-step logic, examples, ASCII diagrams, and detailed time/space complexity analysis. This is crucial for understanding the "why" behind each solution.
*   **`docs/InterviewTips.md`**: Offers general advice for coding interviews, common pitfalls with array problems, and potential follow-up questions or variations for the problems discussed.

## Contributing

Feel free to fork this repository, add more problems, alternative solutions, or improve existing explanations/tests.
```