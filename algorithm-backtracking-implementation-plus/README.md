# Backtracking Interview Project

This project is a comprehensive resource for understanding and practicing Backtracking algorithms, a fundamental technique in computer science for solving problems that involve searching for a solution among many possibilities. It's particularly useful for interview preparation, offering detailed explanations, multiple problems with optimal solutions, extensive test cases, and performance analysis.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
3.  [Problems Implemented](#problems-implemented)
    *   [1. Subsets](#1-subsets)
    *   [2. Permutations](#2-permutations)
    *   [3. Combination Sum II](#3-combination-sum-ii)
    *   [4. N-Queens](#4-n-queens)
4.  [Documentation](#documentation)
    *   [Backtracking Explanation](#backtracking-explanation)
    *   [Interview Tips and Variations](#interview-tips-and-variations)
    *   [Edge Cases and Gotchas](#edge-cases-and-gotchas)
5.  [Project Structure](#project-structure)
6.  [Contributing](#contributing)
7.  [License](#license)

## Project Overview

The goal of this project is to provide a complete package for mastering backtracking. It covers:
*   **Core Backtracking Algorithms**: Implementations of classic backtracking problems in JavaScript.
*   **Optimal Solutions**: Focus on the most efficient backtracking approaches with detailed comments.
*   **Complexity Analysis**: Time and space complexity for each solution.
*   **Robust Testing**: Comprehensive test suites using Jest, covering various scenarios including edge cases.
*   **Performance Benchmarking**: Tools to measure and compare the efficiency of algorithms.
*   **In-depth Documentation**: Explanations of backtracking, visual aids, interview strategies, and common pitfalls.

## Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/backtracking-interview-project.git
    cd backtracking-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running Tests

To run all tests:
```bash
npm test
```

To run tests for a specific algorithm (e.g., Subsets):
```bash
npm test tests/algorithms/subsets.test.js
```

### Running Benchmarks

To run the performance benchmarks for all implemented algorithms:
```bash
npm run benchmark
```

## Problems Implemented

### 1. Subsets

**Problem Description:**
Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.

**Example:**
Input: `nums = [1,2,3]`
Output: `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`

**Approach:**
We use a recursive backtracking approach. At each element, we have two choices: either include it in the current subset or exclude it.

### 2. Permutations

**Problem Description:**
Given an array `nums` of distinct integers, return all possible permutations. You can return the answer in any order.

**Example:**
Input: `nums = [1,2,3]`
Output: `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`

**Approach:**
We build permutations by iteratively adding elements. To ensure each element is used exactly once in a permutation, we use a `visited` array (or set) to keep track of elements already added to the current permutation path.

### 3. Combination Sum II

**Problem Description:**
Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used once in the combination.
**Note:** The solution set must not contain duplicate combinations.

**Example:**
Input: `candidates = [10,1,2,7,6,1,5]`, `target = 8`
Output:
`[
  [1,1,6],
  [1,2,5],
  [1,7],
  [2,6]
]`

**Approach:**
This problem requires careful handling of duplicates in the `candidates` array. First, sort the `candidates` to easily manage duplicates. The backtracking function explores combinations, and if a number has been used, it cannot be reused at the same depth of recursion. To avoid duplicate *combinations*, if `candidates[i]` is the same as `candidates[i-1]`, we skip it unless `i` is the first element considered at the current recursion level, preventing redundant branches.

### 4. N-Queens

**Problem Description:**
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer `n`, return all distinct solutions to the n-queens puzzle. Each solution contains a distinct board configuration of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.

**Example:**
Input: `n = 4`
Output: `[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`

**Approach:**
This is a classic constraint satisfaction problem solved with backtracking. We place queens row by row. For each row, we try to place a queen in every column. Before placing, we check if the position is safe (not attacked by previously placed queens). If it's safe, we place the queen, mark the corresponding column, diagonals as occupied, and recursively try to place a queen in the next row. If a solution is found for `n` queens, we add the board to results. If no safe position is found in a row, we backtrack, remove the last queen, and try a different column.

## Documentation

### Backtracking Explanation
Detailed explanation of backtracking principles, its general template, and how to identify problems suitable for this technique.
`./docs/backtracking_explanation.md`

### Interview Tips and Variations
Strategies for tackling backtracking problems in coding interviews, common variations, and how to optimize solutions.
`./docs/interview_tips_and_variations.md`

### Edge Cases and Gotchas
A guide to common pitfalls, tricky scenarios, and important considerations when implementing backtracking algorithms.
`./docs/edge_cases_and_gotchas.md`

## Project Structure

```
.
├── src/                              # Source code for algorithms and utilities
│   ├── algorithms/                   # Backtracking problem implementations
│   │   ├── subsets.js
│   │   ├── permutations.js
│   │   ├── combinationSumII.js
│   │   └── nQueens.js
│   └── utils/                        # Helper utilities
│       ├── arrayComparators.js       # Utilities for comparing arrays (especially in tests)
│       └── logger.js                 # Simple logging utility
├── tests/                            # Test files for algorithms
│   ├── algorithms/
│   │   ├── subsets.test.js
│   │   ├── permutations.test.js
│   │   ├── combinationSumII.test.js
│   │   └── nQueens.test.js
├── docs/                             # Documentation files
│   ├── backtracking_explanation.md
│   ├── interview_tips_and_variations.md
│   └── edge_cases_and_gotchas.md
├── scripts/                          # Utility scripts
│   └── benchmark.js                  # Performance benchmarking script
├── README.md                         # Project README
├── package.json                      # Node.js project configuration
└── .gitignore                        # Git ignore file
```

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.

## License

This project is open-sourced under the MIT License.

---

### `package.json`

```json
{
  "name": "backtracking-interview-project",
  "version": "1.0.0",
  "description": "A comprehensive project for learning and practicing Backtracking algorithms for coding interviews.",
  "main": "index.js",
  "scripts": {
    "test": "jest",
    "benchmark": "node scripts/benchmark.js"
  },
  "keywords": [
    "backtracking",
    "algorithms",
    "interview-prep",
    "javascript",
    "coding-interview"
  ],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "jest": "^29.7.0",
    "benchmark": "^2.1.4"
  }
}
```

---

### `.gitignore`

```
node_modules/
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

---

### `src/utils/logger.js`

```javascript
// src/utils/logger.js
/**
 * A simple logging utility for consistent output.
 */
class Logger {
    constructor(prefix = '[BacktrackingProject]') {
        this.prefix = prefix;
    }

    /**
     * Logs an informational message.
     * @param {...any} messages - The messages to log.
     */
    info(...messages) {
        console.log(this.prefix, '[INFO]', ...messages);
    }

    /**
     * Logs a warning message.
     * @param {...any} messages - The messages to log.
     */
    warn(...messages) {
        console.warn(this.prefix, '[WARN]', ...messages);
    }

    /**
     * Logs an error message.
     * @param {...any} messages - The messages to log.
     */
    error(...messages) {
        console.error(this.prefix, '[ERROR]', ...messages);
    }

    /**
     * Logs a debug message (only if debug mode is enabled, though not implemented here for simplicity).
     * @param {...any} messages - The messages to log.
     */
    debug(...messages) {
        // In a real application, you might check an environment variable for debug mode
        // if (process.env.DEBUG_MODE === 'true') {
        //     console.log(this.prefix, '[DEBUG]', ...messages);
        // }
        console.log(this.prefix, '[DEBUG]', ...messages);
    }
}

const logger = new Logger();
export default logger;
```

---

### `src/utils/arrayComparators.js`

```javascript
// src/utils/arrayComparators.js
/**
 * Helper utilities for comparing arrays, especially useful for testing.
 */

/**
 * Checks if two arrays contain the same elements, regardless of order.
 * This is useful for comparing results of algorithms that return subsets or permutations
 * where the order of the inner arrays doesn't matter, but the elements within them do.
 *
 * @param {Array<Array<any>>} arr1 - The first array of arrays.
 * @param {Array<Array<any>>} arr2 - The second array of arrays.
 * @returns {boolean} True if both arrays contain the same inner arrays (after sorting), false otherwise.
 */
export function areArraysOfArraysEqualIgnoringOrder(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Sort inner arrays to handle element order within subsets/permutations
    const sortInnerArray = (arr) => [...arr].sort();

    // Sort the outer arrays after sorting inner arrays for consistent comparison
    const sortedArr1 = arr1.map(sortInnerArray).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
    const sortedArr2 = arr2.map(sortInnerArray).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

    for (let i = 0; i < sortedArr1.length; i++) {
        if (JSON.stringify(sortedArr1[i]) !== JSON.stringify(sortedArr2[i])) {
            return false;
        }
    }
    return true;
}

/**
 * Checks if two arrays are strictly equal (same elements in the same order).
 * @param {Array<any>} arr1 - The first array.
 * @param {Array<any>} arr2 - The second array.
 * @returns {boolean} True if arrays are strictly equal, false otherwise.
 */
export function areArraysStrictlyEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Checks if two 2D arrays (like N-Queens board representations) are equal,
 * ignoring the order of solution boards, but preserving the order of rows.
 *
 * @param {Array<Array<string>>} solutions1 - First set of solutions.
 * @param {Array<Array<string>>} solutions2 - Second set of solutions.
 * @returns {boolean} True if solutions are equivalent, false otherwise.
 */
export function areNQueensSolutionsEqual(solutions1, solutions2) {
    if (solutions1.length !== solutions2.length) {
        return false;
    }

    // Helper to convert a board (array of strings) to a comparable string
    const boardToString = (board) => board.join('|');

    // Convert all boards in solutions to strings and sort them for comparison
    const sortedBoards1 = solutions1.map(boardToString).sort();
    const sortedBoards2 = solutions2.map(boardToString).sort();

    for (let i = 0; i < sortedBoards1.length; i++) {
        if (sortedBoards1[i] !== sortedBoards2[i]) {
            return false;
        }
    }
    return true;
}
```

---

### `src/algorithms/subsets.js`

```javascript
// src/algorithms/subsets.js
import logger from '../utils/logger';

/**
 * Problem: Subsets
 * Given an integer array nums of unique elements, return all possible subsets (the power set).
 * The solution set must not contain duplicate subsets. Return the solution in any order.
 *
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 */

/**
 * Finds all possible subsets (the power set) of a given array of unique integers using backtracking.
 *
 * @param {number[]} nums - The input array of unique integers.
 * @returns {number[][]} An array containing all possible subsets.
 *
 * Time Complexity: O(2^N * N)
 *   - There are 2^N possible subsets.
 *   - For each subset, converting the current path (tempSubset) to a new array and adding it to `result`
 *     takes O(N) time (where N is the length of `nums`).
 *   - If we consider just the recursive calls, it's O(2^N) states.
 *   - If the cloning of `tempSubset` is amortized, or if we count the sum of all elements in all subsets,
 *     it can be closer to O(2^N * N) or O(2^N * AvgSubsetSize).
 *     Since each element is either included or excluded, there are 2^N possible paths in the decision tree.
 *     At the leaf node, we copy the current subset, which takes O(N) time.
 *
 * Space Complexity: O(N)
 *   - O(N) for the recursion stack depth (at most N calls).
 *   - O(N) for the `tempSubset` array.
 *   - The output `result` stores 2^N subsets, each of max length N. So O(2^N * N) for the output
 *     list, but typically space complexity refers to auxiliary space excluding output.
 */
export function subsets(nums) {
    const result = []; // Stores all generated subsets
    const tempSubset = []; // Stores the current subset being built
    const n = nums.length;

    /**
     * Recursive backtracking function to generate subsets.
     * @param {number} start - The starting index for the current iteration.
     */
    function backtrack(start) {
        // Base case: Add the current subset to the result list.
        // This is done at every call, as every path from the root down to any node
        // represents a valid subset.
        result.push([...tempSubset]); // Push a shallow copy to avoid mutation issues

        logger.debug(`Current path (start=${start}): [${tempSubset}] -> Added to result`);

        // Recursive step: Iterate through the remaining elements
        for (let i = start; i < n; i++) {
            // Choice: Include the current element nums[i]
            tempSubset.push(nums[i]);
            logger.debug(`  Exploring: Added ${nums[i]}. Current tempSubset: [${tempSubset}]`);

            // Explore: Recurse with the next element, ensuring elements are unique
            // (i.e., we don't pick nums[i] again at this level, and only pick from elements after it)
            backtrack(i + 1);

            // Unchoose (backtrack): Remove the current element to explore other possibilities
            tempSubset.pop();
            logger.debug(`  Backtracking: Removed ${nums[i]}. Current tempSubset: [${tempSubset}]`);
        }
    }

    // Start the backtracking process from the beginning of the array.
    backtrack(0);
    return result;
}

/**
 * Alternative Approach: Iterative (Bit Manipulation)
 * This approach is not backtracking but solves the same problem and can be
 * more efficient in terms of constant factors or for very large N if memory
 * for recursion stack is a concern.
 *
 * Time Complexity: O(2^N * N) - Similar to backtracking, but constant factors might differ.
 * Space Complexity: O(2^N * N) for output, O(1) auxiliary space.
 *
 * @param {number[]} nums - The input array of unique integers.
 * @returns {number[][]} An array containing all possible subsets.
 */
export function subsetsIterative(nums) {
    const n = nums.length;
    const result = [];

    // There are 2^n possible subsets. Iterate from 0 to 2^n - 1.
    // Each integer 'i' represents a bitmask where the j-th bit
    // being set means nums[j] is included in the current subset.
    for (let i = 0; i < (1 << n); i++) {
        const currentSubset = [];
        for (let j = 0; j < n; j++) {
            // Check if the j-th bit of 'i' is set
            if ((i >> j) & 1) {
                currentSubset.push(nums[j]);
            }
        }
        result.push(currentSubset);
    }
    return result;
}

/*
Detailed Explanation of Backtracking Logic:

Let's trace `subsets([1, 2, 3])`:

1. `backtrack(0)`:
   - `result.push([])` -> `result = [[]]`
   - `i = 0` (nums[0] = 1):
     - `tempSubset.push(1)` -> `tempSubset = [1]`
     - `backtrack(1)`:
       - `result.push([1])` -> `result = [[], [1]]`
       - `i = 1` (nums[1] = 2):
         - `tempSubset.push(2)` -> `tempSubset = [1, 2]`
         - `backtrack(2)`:
           - `result.push([1, 2])` -> `result = [[], [1], [1, 2]]`
           - `i = 2` (nums[2] = 3):
             - `tempSubset.push(3)` -> `tempSubset = [1, 2, 3]`
             - `backtrack(3)`:
               - `result.push([1, 2, 3])` -> `result = [[], [1], [1, 2], [1, 2, 3]]`
               - Loop ends (i = 3 is not < n)
             - `tempSubset.pop()` -> `tempSubset = [1, 2]` (backtrack from 3)
           - Loop ends (i = 3 is not < n)
         - `tempSubset.pop()` -> `tempSubset = [1]` (backtrack from 2)
       - `i = 2` (nums[2] = 3):
         - `tempSubset.push(3)` -> `tempSubset = [1, 3]`
         - `backtrack(3)`:
           - `result.push([1, 3])` -> `result = [[], [1], [1, 2], [1, 2, 3], [1, 3]]`
           - Loop ends
         - `tempSubset.pop()` -> `tempSubset = [1]` (backtrack from 3)
       - Loop ends
     - `tempSubset.pop()` -> `tempSubset = []` (backtrack from 1)
   - `i = 1` (nums[1] = 2):
     - `tempSubset.push(2)` -> `tempSubset = [2]`
     - `backtrack(2)`:
       - `result.push([2])` -> `result = [[], [1], [1, 2], [1, 2, 3], [1, 3], [2]]`
       - `i = 2` (nums[2] = 3):
         - `tempSubset.push(3)` -> `tempSubset = [2, 3]`
         - `backtrack(3)`:
           - `result.push([2, 3])` -> `result = [[], ..., [2], [2, 3]]`
           - Loop ends
         - `tempSubset.pop()` -> `tempSubset = [2]` (backtrack from 3)
       - Loop ends
     - `tempSubset.pop()` -> `tempSubset = []` (backtrack from 2)
   - `i = 2` (nums[2] = 3):
     - `tempSubset.push(3)` -> `tempSubset = [3]`
     - `backtrack(3)`:
       - `result.push([3])` -> `result = [[], ..., [2, 3], [3]]`
       - Loop ends
     - `tempSubset.pop()` -> `tempSubset = []` (backtrack from 3)
   - Loop ends
Final `result` will contain all subsets.
*/
```

---

### `tests/algorithms/subsets.test.js`

```javascript
// tests/algorithms/subsets.test.js
import { subsets, subsetsIterative } from '../../src/algorithms/subsets';
import { areArraysOfArraysEqualIgnoringOrder } from '../../src/utils/arrayComparators';

describe('Subsets Algorithm', () => {

    const testCases = [
        {
            name: 'Example 1: Basic unique elements',
            input: [1, 2, 3],
            expected: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
        },
        {
            name: 'Example 2: Single element',
            input: [0],
            expected: [[], [0]]
        },
        {
            name: 'Example 3: Empty array',
            input: [],
            expected: [[]]
        },
        {
            name: 'Example 4: Two elements',
            input: [4, 5],
            expected: [[], [4], [5], [4, 5]]
        },
        {
            name: 'Example 5: Negative numbers',
            input: [-1, 0, 1],
            expected: [[], [-1], [0], [1], [-1, 0], [-1, 1], [0, 1], [-1, 0, 1]]
        },
        {
            name: 'Example 6: Larger array',
            input: [10, 20, 30, 40],
            expected: [
                [],
                [10], [20], [30], [40],
                [10, 20], [10, 30], [10, 40], [20, 30], [20, 40], [30, 40],
                [10, 20, 30], [10, 20, 40], [10, 30, 40], [20, 30, 40],
                [10, 20, 30, 40]
            ]
        }
        // Note: Problem statement says "unique elements", so no test case with duplicates.
    ];

    describe('Backtracking Approach (subsets)', () => {
        testCases.forEach(({ name, input, expected }) => {
            test(`should return correct subsets for ${name}`, () => {
                const result = subsets(input);
                // The order of subsets in the result array does not matter,
                // nor does the order of elements within each subset for comparison.
                // We use a custom comparator to handle this.
                expect(areArraysOfArraysEqualIgnoringOrder(result, expected)).toBe(true);
            });
        });
    });

    describe('Iterative (Bit Manipulation) Approach (subsetsIterative)', () => {
        testCases.forEach(({ name, input, expected }) => {
            test(`should return correct subsets for ${name}`, () => {
                const result = subsetsIterative(input);
                expect(areArraysOfArraysEqualIgnoringOrder(result, expected)).toBe(true);
            });
        });
    });
});
```

---

### `src/algorithms/permutations.js`

```javascript
// src/algorithms/permutations.js
import logger from '../utils/logger';

/**
 * Problem: Permutations
 * Given an array nums of distinct integers, return all possible permutations.
 * You can return the answer in any order.
 *
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */

/**
 * Finds all possible permutations of a given array of distinct integers using backtracking.
 *
 * @param {number[]} nums - The input array of distinct integers.
 * @returns {number[][]} An array containing all possible permutations.
 *
 * Time Complexity: O(N * N!)
 *   - There are N! possible permutations.
 *   - For each permutation, it takes O(N) time to copy the `currentPermutation` array
 *     to the `result` list.
 *   - Each step in the recursion involves a loop of N iterations, and there are N levels deep.
 *     However, the effective number of operations at each level decreases as elements are used.
 *     The dominant factor is generating and storing N! permutations.
 *
 * Space Complexity: O(N)
 *   - O(N) for the recursion stack depth (at most N calls).
 *   - O(N) for the `currentPermutation` array.
 *   - O(N) for the `visited` array/set.
 *   - The output `result` stores N! permutations, each of length N. So O(N * N!) for the output
 *     list, but auxiliary space is O(N).
 */
export function permutations(nums) {
    const result = []; // Stores all generated permutations
    const currentPermutation = []; // Stores the current permutation being built
    const n = nums.length;
    const visited = new Array(n).fill(false); // Tracks if an element at an index has been used

    /**
     * Recursive backtracking function to generate permutations.
     */
    function backtrack() {
        // Base case: If the current permutation has N elements, it's complete.
        if (currentPermutation.length === n) {
            result.push([...currentPermutation]); // Push a shallow copy
            logger.debug(`Found permutation: [${currentPermutation}]`);
            return;
        }

        // Recursive step: Iterate through all available elements
        for (let i = 0; i < n; i++) {
            // Choice: If the element at index `i` has not been visited yet
            if (!visited[i]) {
                // Mark as visited and add to current permutation
                visited[i] = true;
                currentPermutation.push(nums[i]);
                logger.debug(`  Exploring: Added ${nums[i]}. Current: [${currentPermutation}]`);

                // Explore: Recurse to build the rest of the permutation
                backtrack();

                // Unchoose (backtrack): Remove the element and mark as unvisited
                // to explore other possibilities. This is crucial for backtracking.
                currentPermutation.pop();
                visited[i] = false;
                logger.debug(`  Backtracking: Removed ${nums[i]}. Current: [${currentPermutation}]`);
            }
        }
    }

    // Start the backtracking process
    backtrack();
    return result;
}

/**
 * Alternative Approach: Swapping (in-place)
 * This method modifies the original array but can be slightly more memory efficient
 * as it avoids the `visited` array and often performs fewer `push`/`pop` operations
 * if implemented carefully.
 *
 * Time Complexity: O(N * N!)
 * Space Complexity: O(N) for recursion stack, O(1) auxiliary besides output.
 *
 * @param {number[]} nums - The input array of distinct integers.
 * @returns {number[][]} An array containing all possible permutations.
 */
export function permutationsSwap(nums) {
    const result = [];
    const n = nums.length;

    /**
     * Helper function to swap two elements in an array.
     * @param {number[]} arr - The array.
     * @param {number} i - First index.
     * @param {number} j - Second index.
     */
    function swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    /**
     * Recursive backtracking function using swapping.
     * @param {number} start - The starting index for the current level of permutation generation.
     * @param {number[]} arr - The array (passed by reference, modified in place).
     */
    function backtrack(start, arr) {
        // Base case: If `start` has reached the end of the array, a complete permutation is formed.
        if (start === n) {
            result.push([...arr]); // Push a shallow copy of the current state of arr
            logger.debug(`Found permutation (swap): [${arr}]`);
            return;
        }

        // Recursive step: Iterate from `start` to `n-1` to choose an element for the current position
        for (let i = start; i < n; i++) {
            // Choice: Swap the element at `start` with the element at `i`.
            // This effectively places `arr[i]` at the current `start` position.
            swap(arr, start, i);
            logger.debug(`  Exploring (swap): Swapped ${arr[start]} and ${arr[i]} (before swap) at index ${start}. Current: [${arr}]`);

            // Explore: Recurse for the next position (`start + 1`)
            backtrack(start + 1, arr);

            // Unchoose (backtrack): Swap back to restore the original order
            // before the current `start` position was fixed. This is crucial for exploring
            // other possibilities and for subsequent iterations of the loop.
            swap(arr, start, i);
            logger.debug(`  Backtracking (swap): Swapped back. Current: [${arr}]`);
        }
    }

    // Start the backtracking process from index 0. We make a copy to avoid modifying the original `nums`
    // if the caller expects it to be unchanged, but the 'in-place' nature refers to modifying the copy.
    backtrack(0, [...nums]);
    return result;
}

/*
Detailed Explanation of `permutations` (using `visited` array) Logic:

Let's trace `permutations([1, 2, 3])`:

Initial: `result = []`, `currentPermutation = []`, `visited = [F, F, F]`
`backtrack()` (initial call):

1. `i = 0` (nums[0] = 1):
   - `visited[0] = T`, `currentPermutation = [1]`
   - `backtrack()`:
     - `i = 0`: `visited[0]` is T, skip.
     - `i = 1` (nums[1] = 2):
       - `visited[1] = T`, `currentPermutation = [1, 2]`
       - `backtrack()`:
         - `i = 0`: `visited[0]` is T, skip.
         - `i = 1`: `visited[1]` is T, skip.
         - `i = 2` (nums[2] = 3):
           - `visited[2] = T`, `currentPermutation = [1, 2, 3]`
           - `backtrack()`:
             - `currentPermutation.length === 3` (Base case)
             - `result.push([1, 2, 3])`
             - Return.
           - `currentPermutation.pop()` -> `[1, 2]`
           - `visited[2] = F`
         - End loop. Return.
       - `currentPermutation.pop()` -> `[1]`
       - `visited[1] = F`
     - `i = 2` (nums[2] = 3):
       - `visited[2] = T`, `currentPermutation = [1, 3]`
       - `backtrack()`:
         - `i = 0`: `visited[0]` is T, skip.
         - `i = 1` (nums[1] = 2):
           - `visited[1] = T`, `currentPermutation = [1, 3, 2]`
           - `backtrack()`:
             - `currentPermutation.length === 3` (Base case)
             - `result.push([1, 3, 2])`
             - Return.
           - `currentPermutation.pop()` -> `[1, 3]`
           - `visited[1] = F`
         - `i = 2`: `visited[2]` is T, skip.
         - End loop. Return.
       - `currentPermutation.pop()` -> `[1]`
       - `visited[2] = F`
     - End loop. Return.
   - `currentPermutation.pop()` -> `[]`
   - `visited[0] = F`

2. `i = 1` (nums[1] = 2):
   - `visited[1] = T`, `currentPermutation = [2]`
   - ... (similar recursive calls as above, exploring permutations starting with 2)
   - When returning from `backtrack()` for `currentPermutation = [2, 1, 3]`: `result.push([2, 1, 3])`
   - When returning from `backtrack()` for `currentPermutation = [2, 3, 1]`: `result.push([2, 3, 1])`
   - `currentPermutation.pop()` -> `[]`
   - `visited[1] = F`

3. `i = 2` (nums[2] = 3):
   - `visited[2] = T`, `currentPermutation = [3]`
   - ... (similar recursive calls, exploring permutations starting with 3)
   - When returning from `backtrack()` for `currentPermutation = [3, 1, 2]`: `result.push([3, 1, 2])`
   - When returning from `backtrack()` for `currentPermutation = [3, 2, 1]`: `result.push([3, 2, 1])`
   - `currentPermutation.pop()` -> `[]`
   - `visited[2] = F`

End initial loop. Return `result`.
*/
```

---

### `tests/algorithms/permutations.test.js`

```javascript
// tests/algorithms/permutations.test.js
import { permutations, permutationsSwap } from '../../src/algorithms/permutations';
import { areArraysOfArraysEqualIgnoringOrder } from '../../src/utils/arrayComparators';

describe('Permutations Algorithm', () => {

    const testCases = [
        {
            name: 'Example 1: Basic distinct elements',
            input: [1, 2, 3],
            expected: [
                [1, 2, 3], [1, 3, 2],
                [2, 1, 3], [2, 3, 1],
                [3, 1, 2], [3, 2, 1]
            ]
        },
        {
            name: 'Example 2: Single element',
            input: [0],
            expected: [[0]]
        },
        {
            name: 'Example 3: Two elements',
            input: [4, 5],
            expected: [[4, 5], [5, 4]]
        },
        {
            name: 'Example 4: Empty array',
            input: [],
            expected: [[]] // Conventionally, an empty array has one permutation (the empty array itself)
        },
        {
            name: 'Example 5: Negative numbers',
            input: [-1, 0, 1],
            expected: [
                [-1, 0, 1], [-1, 1, 0],
                [0, -1, 1], [0, 1, -1],
                [1, -1, 0], [1, 0, -1]
            ]
        },
        {
            name: 'Example 6: Four elements',
            input: [10, 20, 30, 40],
            // For 4 elements, N! = 24 permutations. Listing all is too long,
            // but we can trust the comparator for correctness.
            expected: [
                [10, 20, 30, 40], [10, 20, 40, 30], [10, 30, 20, 40], [10, 30, 40, 20],
                [10, 40, 20, 30], [10, 40, 30, 20], [20, 10, 30, 40], [20, 10, 40, 30],
                [20, 30, 10, 40], [20, 30, 40, 10], [20, 40, 10, 30], [20, 40, 30, 10],
                [30, 10, 20, 40], [30, 10, 40, 20], [30, 20, 10, 40], [30, 20, 40, 10],
                [30, 40, 10, 20], [30, 40, 20, 10], [40, 10, 20, 30], [40, 10, 30, 20],
                [40, 20, 10, 30], [40, 20, 30, 10], [40, 30, 10, 20], [40, 30, 20, 10]
            ]
        }
    ];

    describe('Backtracking with Visited Array (permutations)', () => {
        testCases.forEach(({ name, input, expected }) => {
            test(`should return correct permutations for ${name}`, () => {
                const result = permutations(input);
                // The order of permutations in the result array does not matter for comparison,
                // but the order of elements within each permutation does.
                // Our comparator handles sorting the outer array of permutations.
                expect(areArraysOfArraysEqualIgnoringOrder(result, expected)).toBe(true);
            });
        });
    });

    describe('Backtracking with Swapping (permutationsSwap)', () => {
        testCases.forEach(({ name, input, expected }) => {
            test(`should return correct permutations for ${name}`, () => {
                const result = permutationsSwap(input);
                expect(areArraysOfArraysEqualIgnoringOrder(result, expected)).toBe(true);
            });
        });
    });
});
```

---

### `src/algorithms/combinationSumII.js`

```javascript
// src/algorithms/combinationSumII.js
import logger from '../utils/logger';

/**
 * Problem: Combination Sum II
 * Given a collection of candidate numbers (`candidates`) and a target number (`target`),
 * find all unique combinations in `candidates` where the candidate numbers sum to `target`.
 * Each number in `candidates` may only be used once in the combination.
 * Note: The solution set must not contain duplicate combinations.
 *
 * Example:
 * Input: candidates = [10,1,2,7,6,1,5], target = 8
 * Output:
 * [
 *   [1,1,6],
 *   [1,2,5],
 *   [1,7],
 *   [2,6]
 * ]
 *
 * Constraints:
 * - 1 <= candidates.length <= 100
 * - 1 <= candidates[i] <= 50
 * - 1 <= target <= 30
 */

/**
 * Finds all unique combinations in `candidates` that sum up to `target`.
 * Each candidate number can only be used once in a combination.
 *
 * This function uses a backtracking approach with crucial optimizations for handling duplicates.
 *
 * @param {number[]} candidates - An array of numbers (may contain duplicates).
 * @param {number} target - The target sum.
 * @returns {number[][]} An array of unique combinations.
 *
 * Time Complexity: O(2^N) in the worst case, where N is the number of candidates.
 *   - Although there's a pruning step (`target < 0` or `candidates[i] === candidates[i-1]`),
 *     the upper bound is still exponential.
 *   - In some scenarios (e.g., all 1s), it can be close to O(2^N).
 *   - Sorting takes O(N log N).
 *   - For each valid combination, storing it takes O(k) where k is the length of the combination.
 *     The total sum of lengths of all combinations can be large.
 * Space Complexity: O(N)
 *   - O(N) for the recursion stack depth (at most N calls).
 *   - O(N) for the `currentCombination` array.
 *   - Sorting might use O(log N) or O(N) depending on implementation.
 *   - Output `result` storage is O(TotalCombinations * AvgLength), but auxiliary space is O(N).
 */
export function combinationSum2(candidates, target) {
    const result = [];
    const currentCombination = [];
    // Important: Sort candidates to handle duplicates efficiently.
    // This allows us to easily skip duplicate elements that would lead to duplicate combinations.
    candidates.sort((a, b) => a - b);
    const n = candidates.length;

    /**
     * Recursive backtracking function to find combinations.
     * @param {number} startIndex - The index from which to start considering elements in `candidates`.
     * @param {number} remainingTarget - The remaining sum needed to reach the target.
     */
    function backtrack(startIndex, remainingTarget) {
        // Base case 1: If remainingTarget is 0, we found a valid combination.
        if (remainingTarget === 0) {
            result.push([...currentCombination]); // Add a shallow copy to results
            logger.debug(`Found combination: [${currentCombination}]`);
            return;
        }

        // Base case 2: If remainingTarget is negative, this path is invalid.
        // Or if startIndex goes beyond array length, no more candidates.
        if (remainingTarget < 0) {
            logger.debug(`Path aborted: Remaining target ${remainingTarget} is negative.`);
            return;
        }

        // Recursive step: Iterate through candidates from startIndex
        for (let i = startIndex; i < n; i++) {
            // Optimization for duplicates:
            // If the current element is the same as the previous element AND
            // we are not at the first element of the current recursive call (i.e., i > startIndex),
            // then skip this element.
            // This prevents generating duplicate combinations like [1,2] and [1,2] if there are two '1's.
            if (i > startIndex && candidates[i] === candidates[i - 1]) {
                logger.debug(`  Skipping duplicate at index ${i}: ${candidates[i]}`);
                continue; // Skip duplicate
            }

            // Pruning: If the current candidate is greater than the remaining target,
            // then all subsequent candidates (because the array is sorted) will also be greater.
            // So, no need to explore further in this branch.
            if (candidates[i] > remainingTarget) {
                logger.debug(`  Pruning: ${candidates[i]} > ${remainingTarget}. Breaking loop.`);
                break;
            }

            // Choice: Include the current element
            currentCombination.push(candidates[i]);
            logger.debug(`  Exploring: Added ${candidates[i]}. Current combination: [${currentCombination}]`);

            // Explore: Recurse with the next index (i + 1) because each element can only be used once.
            // Reduce the remaining target by the value of the chosen element.
            backtrack(i + 1, remainingTarget - candidates[i]);

            // Unchoose (backtrack): Remove the current element to explore other possibilities
            currentCombination.pop();
            logger.debug(`  Backtracking: Removed ${candidates[i]}. Current combination: [${currentCombination}]`);
        }
    }

    // Start the backtracking process from index 0 with the initial target.
    backtrack(0, target);
    return result;
}

/*
Detailed Explanation of Logic for `combinationSum2` (with duplicates handling):

Input: `candidates = [10,1,2,7,6,1,5]`, `target = 8`
Sorted `candidates = [1,1,2,5,6,7,10]`

`backtrack(0, 8)`: `currentCombination = []`

- `i = 0` (candidates[0] = 1):
  - `currentCombination.push(1)` -> `[1]`
  - `backtrack(1, 7)`: `currentCombination = [1]`
    - `i = 1` (candidates[1] = 1):
      - `i > startIndex` is `1 > 1` (false). No duplicate skip for this first element in this call.
      - `currentCombination.push(1)` -> `[1,1]`
      - `backtrack(2, 6)`: `currentCombination = [1,1]`
        - `i = 2` (candidates[2] = 2):
          - `currentCombination.push(2)` -> `[1,1,2]`
          - `backtrack(3, 4)`: `currentCombination = [1,1,2]`
            - `i = 3` (candidates[3] = 5): `5 > 4`, prune. Break.
          - `currentCombination.pop()` -> `[1,1]`
        - `i = 3` (candidates[3] = 5):
          - `i > startIndex` is `3 > 2` (true). `candidates[3]` is `5`, `candidates[2]` is `2`. Not equal. No skip.
          - `currentCombination.push(5)` -> `[1,1,5]`
          - `backtrack(4, 1)`: `currentCombination = [1,1,5]`
            - `i = 4` (candidates[4] = 6): `6 > 1`, prune. Break.
          - `currentCombination.pop()` -> `[1,1]`
        - `i = 4` (candidates[4] = 6):
          - `i > startIndex` is `4 > 2` (true). `candidates[4]` is `6`, `candidates[3]` is `5`. Not equal. No skip.
          - `currentCombination.push(6)` -> `[1,1,6]`
          - `backtrack(5, 0)`: `currentCombination = [1,1,6]`
            - `remainingTarget === 0`. `result.push([1,1,6])` -> `result = [[1,1,6]]`. Return.
          - `currentCombination.pop()` -> `[1,1]`
        - ... (continue for 7, 10)
        - Return.
      - `currentCombination.pop()` -> `[1]`
    - `i = 2` (candidates[2] = 2):
      - `i > startIndex` is `2 > 1` (true). `candidates[2]` is `2`, `candidates[1]` is `1`. Not equal. No skip.
      - `currentCombination.push(2)` -> `[1,2]`
      - `backtrack(3, 5)`: `currentCombination = [1,2]`
        - `i = 3` (candidates[3] = 5):
          - `currentCombination.push(5)` -> `[1,2,5]`
          - `backtrack(4, 0)`: `result.push([1,2,5])` -> `result = [[1,1,6], [1,2,5]]`. Return.
          - `currentCombination.pop()` -> `[1,2]`
        - `i = 4` (candidates[4] = 6): `6 > 5`, prune. Break.
        - ...
        - Return.
      - `currentCombination.pop()` -> `[1]`
    - `i = 3` (candidates[3] = 5):
      - `i > startIndex` is `3 > 1` (true). `candidates[3]` is `5`, `candidates[2]` is `2`. Not equal. No skip.
      - `currentCombination.push(5)` -> `[1,5]`
      - `backtrack(4, 2)`: `currentCombination = [1,5]`
        - `i = 4` (candidates[4] = 6): `6 > 2`, prune. Break.
        - ...
        - Return.
      - `currentCombination.pop()` -> `[1]`
    - `i = 4` (candidates[4] = 6):
      - `i > startIndex` is `4 > 1` (true). `candidates[4]` is `6`, `candidates[3]` is `5`. Not equal. No skip.
      - `currentCombination.push(6)` -> `[1,6]`
      - `backtrack(5, 1)`: `currentCombination = [1,6]`
        - `i = 5` (candidates[5] = 7): `7 > 1`, prune. Break.
        - ...
        - Return.
      - `currentCombination.pop()` -> `[1]`
    - `i = 5` (candidates[5] = 7):
      - `i > startIndex` is `5 > 1` (true). `candidates[5]` is `7`, `candidates[4]` is `6`. Not equal. No skip.
      - `currentCombination.push(7)` -> `[1,7]`
      - `backtrack(6, 0)`: `result.push([1,7])` -> `result = [[1,1,6], [1,2,5], [1,7]]`. Return.
      - `currentCombination.pop()` -> `[1]`
    - `i = 6` (candidates[6] = 10): `10 > 7`, prune. Break.
    - Return.
  - `currentCombination.pop()` -> `[]`

- `i = 1` (candidates[1] = 1):
  - `i > startIndex` is `1 > 0` (true). `candidates[1]` is `1`, `candidates[0]` is `1`. They are equal!
  - `continue;` -> Skip this branch to avoid `[1,x,y]` where the first `1` is from index `1` instead of `0`.
    This is crucial for preventing duplicate combinations like `[1_idx0, 6]` and `[1_idx1, 6]`.

- `i = 2` (candidates[2] = 2):
  - `i > startIndex` is `2 > 0` (true). `candidates[2]` is `2`, `candidates[1]` is `1`. Not equal. No skip.
  - `currentCombination.push(2)` -> `[2]`
  - `backtrack(3, 6)`: `currentCombination = [2]`
    - `i = 3` (candidates[3] = 5):
      - `currentCombination.push(5)` -> `[2,5]`
      - `backtrack(4, 1)`: Prune (6 > 1).
      - `currentCombination.pop()` -> `[2]`
    - `i = 4` (candidates[4] = 6):
      - `currentCombination.push(6)` -> `[2,6]`
      - `backtrack(5, 0)`: `result.push([2,6])` -> `result = [[1,1,6], [1,2,5], [1,7], [2,6]]`. Return.
      - `currentCombination.pop()` -> `[2]`
    - `i = 5` (candidates[5] = 7): `7 > 6`, prune. Break.
    - ...
    - Return.
  - `currentCombination.pop()` -> `[]`

- ... (The remaining branches will also be pruned quickly as 5, 6, 7, 10 are all > 8 or would eventually lead to negative targets)

The final `result` will contain the unique combinations.
*/
```

---

### `tests/algorithms/combinationSumII.test.js`

```javascript
// tests/algorithms/combinationSumII.test.js
import { combinationSum2 } from '../../src/algorithms/combinationSumII';
import { areArraysOfArraysEqualIgnoringOrder } from '../../src/utils/arrayComparators';

describe('Combination Sum II Algorithm', () => {

    const testCases = [
        {
            name: 'Example 1: Basic case with duplicates',
            candidates: [10, 1, 2, 7, 6, 1, 5],
            target: 8,
            expected: [
                [1, 1, 6],
                [1, 2, 5],
                [1, 7],
                [2, 6]
            ]
        },
        {
            name: 'Example 2: All same numbers, multiple combinations',
            candidates: [2, 2, 2, 2],
            target: 4,
            expected: [
                [2, 2]
            ]
        },
        {
            name: 'Example 3: No combination possible',
            candidates: [2, 3, 6, 7],
            target: 1,
            expected: []
        },
        {
            name: 'Example 4: Single combination with unique numbers',
            candidates: [1, 2, 3],
            target: 6,
            expected: [[1, 2, 3]]
        },
        {
            name: 'Example 5: Multiple combinations with unique numbers',
            candidates: [1, 2, 3, 4, 5],
            target: 7,
            expected: [
                [1, 2, 4],
                [1, 3, 3], // Not possible with unique numbers, this is a flaw in example
                          // Re-adjusting expected for unique usage:
                [1, 2, 4],
                [1, 6], // if 6 existed
                [2, 5],
                [3, 4]
            ],
            // Corrected expected based on "each number may only be used once"
            // And problem statement says "collection of candidate numbers", implies possible duplicates.
            // Let's ensure candidates array is what's used.
            // For [1,2,3,4,5], target 7:
            // 1+2+4
            // 1+? (none)
            // 2+5
            // 3+4
            correctedExpected: [
                [1, 2, 4],
                [2, 5],
                [3, 4]
            ]
        },
        {
            name: 'Example 6: Target larger than any single candidate sum',
            candidates: [1, 1, 1, 1, 1],
            target: 3,
            expected: [
                [1, 1, 1]
            ]
        },
        {
            name: 'Example 7: Empty candidates array',
            candidates: [],
            target: 5,
            expected: []
        },
        {
            name: 'Example 8: Candidates with zero sum target',
            candidates: [1, 2, 3],
            target: 0,
            expected: [[]] // An empty combination sums to 0
        },
        {
            name: 'Example 9: Mixed positive and negative (problem implies positive, but for robustness)',
            candidates: [-1, 0, 1, 2, 3],
            target: 2,
            // Assuming problem constraints mean positive candidates. If not, this is complex.
            // For standard Combination Sum II, candidates are positive. Sticking to positive.
            // Let's create a new test case for robustness for positive numbers.
            candidates_positive: [1, 2, 3, 4],
            target_positive: 5,
            expected_positive: [
                [1, 4],
                [2, 3]
            ]
        },
        {
            name: 'Example 10: Candidates with large numbers and target',
            candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            target: 20,
            expected: [
                [1, 2, 3, 4, 10], [1, 2, 3, 5, 9], [1, 2, 3, 6, 8], [1, 2, 4, 5, 8], [1, 2, 4, 6, 7],
                [1, 2, 5, 12], [1, 2, 6, 11], [1, 2, 7, 10], [1, 2, 8, 9], [1, 3, 4, 12],
                [1, 3, 5, 11], [1, 3, 6, 10], [1, 3, 7, 9], [1, 4, 5, 10], [1, 4, 6, 9],
                [1, 4, 7, 8], [1, 5, 6, 8], [1, 5, 14], [1, 6, 13], [1, 7, 12], [1, 8, 11],
                [1, 9, 10], [2, 3, 4, 11], [2, 3, 5, 10], [2, 3, 6, 9], [2, 3, 7, 8],
                [2, 4, 5, 9], [2, 4, 6, 8], [2, 4, 14], [2, 5, 6, 7], [2, 5, 13], [2, 6, 12],
                [2, 7, 11], [2, 8, 10], [2, 9, 11], // 2,9,11 is incorrect, 2+9=11, 11+11=22
                                                    // I need to manually check these. For large sets, comparator is key.
                                                    // Let's provide a smaller, verifiable set for "large" scenario.
            ],
            // Smaller large test case for manual verification
            candidates_small_large: [1, 2, 2, 3],
            target_small_large: 4,
            expected_small_large: [
                [1, 3],
                [2, 2]
            ]
        }
    ];

    testCases.forEach(({ name, candidates, target, expected, correctedExpected, candidates_small_large, target_small_large, expected_small_large, candidates_positive, target_positive, expected_positive }) => {
        // Use corrected or specific test cases if provided, otherwise default.
        const currentCandidates = candidates_small_large || candidates_positive || candidates;
        const currentTarget = target_small_large || target_positive || target;
        const currentExpected = expected_small_large || expected_positive || correctedExpected || expected;

        test(`should return correct unique combinations for ${name}`, () => {
            const result = combinationSum2(currentCandidates, currentTarget);
            expect(areArraysOfArraysEqualIgnoringOrder(result, currentExpected)).toBe(true);
        });
    });
});
```

---

### `src/algorithms/nQueens.js`

```javascript
// src/algorithms/nQueens.js
import logger from '../utils/logger';

/**
 * Problem: N-Queens
 * The n-queens puzzle is the problem of placing n queens on an n x n chessboard
 * such that no two queens attack each other. Given an integer n, return all
 * distinct solutions to the n-queens puzzle. Each solution contains a distinct
 * board configuration of the n-queens' placement, where 'Q' and '.' both indicate
 * a queen and an empty space, respectively.
 *
 * Example:
 * Input: n = 4
 * Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 * (Order of solutions doesn't matter, order of rows in a board matters)
 */

/**
 * Solves the N-Queens problem using backtracking.
 *
 * @param {number} n - The size of the chessboard (n x n).
 * @returns {string[][]} An array of all distinct board configurations.
 *
 * Time Complexity: O(N!)
 *   - In the worst case, the algorithm explores N! permutations of queen placements.
 *   - The constant factors involve checking if a position is safe, which takes O(1)
 *     due to using boolean arrays for columns and diagonals.
 * Space Complexity: O(N)
 *   - O(N) for the recursion stack depth (N recursive calls).
 *   - O(N) for storing the current board state (`board`).
 *   - O(N) for the `cols`, `diag1`, `diag2` boolean arrays.
 *   - The output `result` can store up to N! boards. O(N * N!) for the output,
 *     but auxiliary space is O(N).
 */
export function solveNQueens(n) {
    const result = []; // Stores all valid board configurations
    const board = Array.from({ length: n }, () => Array(n).fill('.')); // Current board state

    // Helper boolean arrays to keep track of occupied columns and diagonals.
    // This allows O(1) check for safety.
    const cols = new Array(n).fill(false); // `cols[j]` is true if column `j` has a queen
    const diag1 = new Array(2 * n - 1).fill(false); // `diag1[row + col]` is true if primary diagonal has a queen
    const diag2 = new Array(2 * n - 1).fill(false); // `diag2[row - col + n - 1]` is true if secondary diagonal has a queen

    /**
     * Checks if placing a queen at (row, col) is safe.
     * @param {number} row - The current row.
     * @param {number} col - The current column.
     * @returns {boolean} True if the position is safe, false otherwise.
     */
    function isSafe(row, col) {
        // Check if column is occupied
        if (cols[col]) {
            logger.debug(`  Unsafe: Column ${col} occupied.`);
            return false;
        }

        // Check if primary diagonal (top-left to bottom-right) is occupied
        // All cells on the same primary diagonal have `row + col` constant.
        if (diag1[row + col]) {
            logger.debug(`  Unsafe: Primary diagonal (sum=${row+col}) occupied.`);
            return false;
        }

        // Check if secondary diagonal (top-right to bottom-left) is occupied
        // All cells on the same secondary diagonal have `row - col` constant.
        // We add `n - 1` to `row - col` to map negative indices to non-negative for array access.
        if (diag2[row - col + n - 1]) {
            logger.debug(`  Unsafe: Secondary diagonal (diff=${row-col}) occupied.`);
            return false;
        }

        return true;
    }

    /**
     * Places a queen at (row, col) and updates tracking arrays.
     * @param {number} row - The row to place the queen.
     * @param {number} col - The column to place the queen.
     */
    function placeQueen(row, col) {
        board[row][col] = 'Q';
        cols[col] = true;
        diag1[row + col] = true;
        diag2[row - col + n - 1] = true;
        logger.debug(`  Placed Q at (${row}, ${col}).`);
    }

    /**
     * Removes a queen from (row, col) and updates tracking arrays.
     * @param {number} row - The row to remove the queen from.
     * @param {number} col - The column to remove the queen from.
     */
    function removeQueen(row, col) {
        board[row][col] = '.';
        cols[col] = false;
        diag1[row + col] = false;
        diag2[row - col + n - 1] = false;
        logger.debug(`  Removed Q from (${row}, ${col}).`);
    }

    /**
     * Recursive backtracking function to place queens.
     * @param {number} row - The current row we are trying to place a queen in.
     */
    function backtrack(row) {
        // Base case: If all N queens have been successfully placed (i.e., we've filled all rows)
        if (row === n) {
            // A solution is found. Convert the current board state to an array of strings
            // and add it to the results.
            result.push(board.map(r => r.join('')));
            logger.debug(`Solution found:\n${board.map(r => r.join('')).join('\n')}`);
            return;
        }

        // Recursive step: Try placing a queen in each column of the current `row`
        for (let col = 0; col < n; col++) {
            // Choice: Check if placing a queen at (row, col) is safe
            if (isSafe(row, col)) {
                // If safe, place the queen and mark affected columns and diagonals
                placeQueen(row, col);

                // Explore: Recurse to place a queen in the next row
                backtrack(row + 1);

                // Unchoose (backtrack): If the recursive call returns (either a solution was found
                // or no solution was found in subsequent rows), remove the queen from (row, col)
                // and unmark affected columns/diagonals. This allows exploring other column choices
                // for the current `row`.
                removeQueen(row, col);
            }
        }
    }

    // Start the backtracking process from the first row (row 0).
    backtrack(0);
    return result;
}

/*
Detailed Explanation of `solveNQueens(4)` Logic:

Initial: `result = []`, `board = [['.', '.', '.', '.'], ... (4 times)]`
`cols = [F,F,F,F]`, `diag1 = [F,F,F,F,F,F,F]`, `diag2 = [F,F,F,F,F,F,F]` (size 2*N-1 = 7 for N=4)

`backtrack(0)`: (Trying to place a queen in row 0)

- `col = 0`: `isSafe(0,0)` is True.
  - `placeQueen(0,0)`: `board[0][0]='Q'`, `cols[0]=T`, `diag1[0]=T`, `diag2[3]=T`
    - `backtrack(1)`: (Trying to place a queen in row 1)
      - `col = 0`: `isSafe(1,0)` -> `cols[0]` is T, Unsafe. Skip.
      - `col = 1`: `isSafe(1,1)` -> `diag1[1+1=2]` & `diag2[1-1+3=3]` are F. Safe.
        - `placeQueen(1,1)`: `board[1][1]='Q'`, `cols[1]=T`, `diag1[2]=T`, `diag2[3]=T` (diag2[3] already T)
        - **Correction:** `diag2[1-1+3] = diag2[3]` is `true` from `(0,0)`. So `isSafe(1,1)` should be false.
          Let's recheck diagonal indices:
          `diag1 index = row + col`
          `diag2 index = row - col + N - 1`

          For `N=4`: `diag1` indices from 0 to 6. `diag2` indices from 0 to 6.
          Cell (r,c)
          (0,0): d1=0, d2=3
          (0,1): d1=1, d2=2
          (0,2): d1=2, d2=1
          (0,3): d1=3, d2=0

          (1,0): d1=1, d2=4
          (1,1): d1=2, d2=3
          (1,2): d1=3, d2=2
          (1,3): d1=4, d2=1

          So, for `placeQueen(0,0)`:
          `board[0][0]='Q'`, `cols[0]=T`, `diag1[0]=T`, `diag2[0-0+3=3]=T`

          For `backtrack(1)`:
          - `col = 0`: `isSafe(1,0)` -> `cols[0]` is T. Unsafe.
          - `col = 1`: `isSafe(1,1)` ->
            - `cols[1]` is F.
            - `diag1[1+1=2]` is F.
            - `diag2[1-1+3=3]` is T (from (0,0)). Unsafe. Skip.
          - `col = 2`: `isSafe(1,2)` ->
            - `cols[2]` is F.
            - `diag1[1+2=3]` is F.
            - `diag2[1-2+3=2]` is F. Safe.
            - `placeQueen(1,2)`: `board[1][2]='Q'`, `cols[2]=T`, `diag1[3]=T`, `diag2[2]=T`
              - `backtrack(2)`: (Trying to place a queen in row 2)
                - `col = 0`: `isSafe(2,0)` ->
                  - `cols[0]` is T (from (0,0)). Unsafe.
                - `col = 1`: `isSafe(2,1)` ->
                  - `cols[1]` is F.
                  - `diag1[2+1=3]` is T (from (1,2)). Unsafe.
                - `col = 2`: `isSafe(2,2)` ->
                  - `cols[2]` is T (from (1,2)). Unsafe.
                - `col = 3`: `isSafe(2,3)` ->
                  - `cols[3]` is F.
                  - `diag1[2+3=5]` is F.
                  - `diag2[2-3+3=2]` is T (from (1,2)). Unsafe.
                - Loop ends. No place for queen in row 2. Return.
              - `removeQueen(1,2)`: `board[1][2]='.'`, `cols[2]=F`, `diag1[3]=F`, `diag2[2]=F`
          - `col = 3`: `isSafe(1,3)` ->
            - `cols[3]` is F.
            - `diag1[1+3=4]` is F.
            - `diag2[1-3+3=1]` is F. Safe.
            - `placeQueen(1,3)`: `board[1][3]='Q'`, `cols[3]=T`, `diag1[4]=T`, `diag2[1]=T`
              - `backtrack(2)`: (Trying to place a queen in row 2)
                - `col = 0`: `isSafe(2,0)` ->
                  - `cols[0]` is T (from (0,0)). Unsafe.
                - `col = 1`: `isSafe(2,1)` ->
                  - `cols[1]` is F.
                  - `diag1[2+1=3]` is F.
                  - `diag2[2-1+3=4]` is F. Safe.
                  - `placeQueen(2,1)`: `board[2][1]='Q'`, `cols[1]=T`, `diag1[3]=T`, `diag2[4]=T`
                    - `backtrack(3)`: (Trying to place a queen in row 3)
                      - `col = 0`: `isSafe(3,0)` ->
                        - `cols[0]` is T (from (0,0)). Unsafe.
                      - `col = 1`: `isSafe(3,1)` ->
                        - `cols[1]` is T (from (2,1)). Unsafe.
                      - `col = 2`: `isSafe(3,2)` ->
                        - `cols[2]` is F.
                        - `diag1[3+2=5]` is F.
                        - `diag2[3-2+3=4]` is T (from (2,1)). Unsafe.
                      - `col = 3`: `isSafe(3,3)` ->
                        - `cols[3]` is T (from (1,3)). Unsafe.
                      - Loop ends. No place for queen in row 3. Return.
                    - `removeQueen(2,1)`: `board[2][1]='.'`, `cols[1]=F`, `diag1[3]=F`, `diag2[4]=F`
                - `col = 2`: `isSafe(2,2)` ->
                  - `cols[2]` is F.
                  - `diag1[2+2=4]` is T (from (1,3)). Unsafe.
                - `col = 3`: `isSafe(2,3)` ->
                  - `cols[3]` is T (from (1,3)). Unsafe.
                - Loop ends. No place for queen in row 2. Return.
              - `removeQueen(1,3)`: `board[1][3]='.'`, `cols[3]=F`, `diag1[4]=F`, `diag2[1]=F`
          - Loop ends.
        - `removeQueen(0,0)`: `board[0][0]='.'`, `cols[0]=F`, `diag1[0]=F`, `diag2[3]=F`

- `col = 1`: `isSafe(0,1)` is True.
  - `placeQueen(0,1)`: `board[0][1]='Q'`, `cols[1]=T`, `diag1[1]=T`, `diag2[2]=T`
    - `backtrack(1)`:
      - `col = 0`: `isSafe(1,0)` -> Safe.
        - `placeQueen(1,0)`: `board[1][0]='Q'`, `cols[0]=T`, `diag1[1]=T` (already T), `diag2[4]=T`
          - `backtrack(2)`:
            - `col = 2`: `isSafe(2,2)` -> Safe.
              - `placeQueen(2,2)`: `board[2][2]='Q'`, `cols[2]=T`, `diag1[4]=T`, `diag2[3]=T`
                - `backtrack(3)`:
                  - `col = 3`: `isSafe(3,3)` -> Safe.
                    - `placeQueen(3,3)`: `board[3][3]='Q'`, `cols[3]=T`, `diag1[6]=T`, `diag2[3]=T` (already T)
                      - `backtrack(4)`:
                        - Base case `row === n`. Solution found!
                        - `result.push([[".Q..", "Q...", "..Q.", "...Q"]])`
                        - Return.
                    - `removeQueen(3,3)`
                - `removeQueen(2,2)`
            - `removeQueen(1,0)`
      - `col = 2`: ... (This path leads to the second solution)
        - `placeQueen(1,3)` (after backtracking from above)
          - `backtrack(2)`
            - `col = 0`
              - `placeQueen(2,0)`
                - `backtrack(3)`
                  - `col = 2`
                    - `placeQueen(3,2)`
                      - `backtrack(4)`
                        - Base case `row === n`. Solution found!
                        - `result.push([["..Q.", "Q...", "...Q", ".Q.."]])`
                        - Return.
                    - `removeQueen(3,2)`
                - `removeQueen(2,0)`
    - `removeQueen(0,1)`

... and so on for `col = 2` and `col = 3` in `backtrack(0)`.
The trace is quite long but demonstrates the core choose-explore-unchoose cycle and how `isSafe` prunes branches.
*/
```

---

### `tests/algorithms/nQueens.test.js`

```javascript
// tests/algorithms/nQueens.test.js
import { solveNQueens } from '../../src/algorithms/nQueens';
import { areNQueensSolutionsEqual } from '../../src/utils/arrayComparators';

describe('N-Queens Algorithm', () => {

    const testCases = [
        {
            name: 'N = 1',
            input: 1,
            expected: [
                ["Q"]
            ]
        },
        {
            name: 'N = 2',
            input: 2,
            expected: [] // No solution for N=2
        },
        {
            name: 'N = 3',
            input: 3,
            expected: [] // No solution for N=3
        },
        {
            name: 'N = 4 (Standard Example)',
            input: 4,
            expected: [
                [".Q..", "...Q", "Q...", "..Q."],
                ["..Q.", "Q...", "...Q", ".Q.."]
            ]
        },
        {
            name: 'N = 5',
            input: 5,
            expected: [
                ["Q....", "..Q..", "....Q", ".Q...", "...Q."],
                ["Q....", "...Q.", ".Q...", "....Q", "..Q.."],
                [".Q...", "...Q.", "Q....", "..Q..", "....Q"],
                [".Q...", "....Q", "..Q..", "Q....", "...Q."],
                ["..Q..", "Q....", "...Q.", ".Q...", "....Q"],
                ["..Q..", "....Q", ".Q...", "...Q.", "Q...."],
                ["...Q.", "Q....", "..Q..", "....Q", ".Q..."],
                ["...Q.", ".Q...", "....Q", "Q....", "..Q.."],
                ["....Q", ".Q...", "...Q.", "Q....", "..Q.."],
                ["....Q", "..Q..", "Q....", "...Q.", ".Q..."]
            ]
        },
        {
            name: 'N = 0 (Edge case)',
            input: 0,
            expected: [[]] // An empty board technically has one solution (no queens to place)
        },
        // Large N test cases are computationally expensive for tests
        // N=6 has 4 solutions
        // N=7 has 40 solutions
        // N=8 has 92 solutions
        // N=9 has 352 solutions
        // N=10 has 724 solutions
    ];

    testCases.forEach(({ name, input, expected }) => {
        test(`should return correct solutions for ${name}`, () => {
            const result = solveNQueens(input);
            // The order of the solution boards in the outer array does not matter,
            // but the order of rows within a board and characters within a row does.
            expect(areNQueensSolutionsEqual(result, expected)).toBe(true);
        });
    });
});
```

---

### `docs/backtracking_explanation.md`

# Backtracking: A Comprehensive Guide

## What is Backtracking?

Backtracking is an algorithmic paradigm for solving problems, typically those that search for a solution among multiple candidates. It incrementally builds a candidate solution and, if a candidate solution `s` is found to be "not valid" (i.e., it cannot be completed to a valid solution), it "backtracks" to an earlier state by undoing the last choice and tries another option.

Think of it like navigating a maze. You go down a path until you hit a dead end. Instead of giving up, you retrace your steps to the last intersection and try a different path. This "retracing steps" and "trying another path" is the essence of backtracking.

## When to Use Backtracking?

Backtracking is primarily used for problems that involve:

1.  **Search for a solution:** Finding one or all possible solutions.
2.  **Decision-making at each step:** At every stage, there are multiple choices.
3.  **Constraints:** Choices are limited by certain rules or conditions.

Common problem types that use backtracking include:
*   **Combinatorial problems:** Generating subsets, permutations, combinations.
*   **Constraint satisfaction problems:** N-Queens, Sudoku solver, coloring problems.
*   **Optimization problems:** Finding the "best" solution (though often dynamic programming or greedy approaches are more efficient for pure optimization).

## The Backtracking Template

Most backtracking algorithms follow a similar recursive structure:

```javascript
function backtrack(state, choices, solution_collector) {
    // 1. Base Case: Check if the current state is a valid solution
    if (is_solution(state)) {
        add_to_solution_collector(state, solution_collector);
        // Optional: If only one solution is needed, return true/false here to stop search
        return;
    }

    // 2. Pruning (Optimization): Check if the current state is invalid or cannot lead to a solution
    if (is_invalid_state(state)) {
        return; // Abandon this path
    }

    // 3. Recursive Step: Explore choices
    for (let choice of choices_available_from_state(state)) {
        // a. Choose: Make a choice
        make_choice(state, choice);

        // b. Explore: Recurse with the new state
        backtrack(new_state, new_choices, solution_collector);

        // c. Unchoose (Backtrack): Undo the choice to explore other possibilities
        undo_choice(state, choice); // Restore the state
    }
}

// Initial call
// initialize_state();
// initialize_solution_collector();
// backtrack(initial_state, initial_choices, solution_collector);
// return solution_collector;
```

### Key Components Explained:

*   **`state`**: Represents the current partial solution or the configuration of the problem. This could be a temporary array, a board, a set of visited nodes, etc.
*   **`choices`**: The available options at the current step.
*   **`is_solution(state)` (Base Case)**: A function that checks if the `state` satisfies all problem conditions and forms a complete solution. If so, it's added to the `solution_collector`.
*   **`is_invalid_state(state)` (Pruning)**: A crucial optimization. If at any point the current partial solution `state` violates a constraint or it's clear it cannot lead to a valid full solution, we stop exploring this path immediately. This significantly reduces the search space.
*   **`make_choice(state, choice)`**: Applies a choice to the current `state`, transforming it into a new partial solution.
*   **`undo_choice(state, choice)` (Backtracking Step)**: This is the defining characteristic of backtracking. After exploring all possibilities with a certain `choice`, we *undo* that choice to revert the `state` to its previous form. This allows us to try different choices at the same decision point.

## Visualizing Backtracking (Decision Tree)

Imagine the search space as a **decision tree**.

```
                           (Start)
                             |
                   +---------+---------+
                   |                   |
            (Choice A)           (Choice B)
               / | \                 / | \
              /  |  \               /  |  \
       (A1) (A2) (A3)         (B1) (B2) (B3)
        / \                          / \
       ...                           ...

```

The backtracking algorithm performs a Depth-First Search (DFS) on this decision tree.

1.  It goes down one path (e.g., `Start -> Choice A -> A1 -> ...`).
2.  If it finds a solution, it records it.
3.  If it hits a dead end (an invalid state or no more choices), it *backtracks* (undoes the last choice) and climbs up to the parent node.
4.  From the parent, it tries the next available choice (e.g., `A2`).
5.  This process continues until all paths have been explored.

## Example: Subsets

Let's illustrate with `nums = [1, 2, 3]` to find all subsets.

**Decision at each step (for each number): Include or Exclude?**

```
                     [] (start index 0)
                   /    \
                 /        \
            [1] (idx 1)      [] (idx 1)
           /   \             /   \
         /       \         /       \
      [1,2] (idx 2) [1] (idx 2)  [2] (idx 2) [] (idx 2)
      /  \        /  \       /  \       /  \
     /    \      /    \     /    \     /    \
 [1,2,3] [1,2] [1,3] [1] [2,3] [2] [3]   []
 (idx 3) (idx 3) (idx 3) (idx 3) (idx 3) (idx 3) (idx 3) (idx 3)

```
*In the provided `subsets.js` implementation, a slightly different view of the decision tree is used, where each node represents a subset itself, and new elements are added sequentially, effectively generating subsets of increasing size by iterating through the remaining elements. This is also a valid backtracking approach.*

In `subsets.js`:
The `result.push([...tempSubset])` happens at *every* call of `backtrack(start)`. This means every node in the recursive call stack (representing a partial subset) gets added to the final result. The loop `for (let i = start; i < n; i++)` handles the "choose" part for the next element, and `tempSubset.pop()` is the "unchoose" part.

This approach ensures that all `2^N` subsets are generated by exploring all combinations of including and excluding elements (implicitly, by advancing `start` or including `nums[i]`).

---

This document provides a foundational understanding of backtracking. Refer to `interview_tips_and_variations.md` and `edge_cases_and_gotchas.md` for more practical advice.

---

### `docs/interview_tips_and_variations.md`

# Backtracking: Interview Tips and Variations

Backtracking is a very common topic in coding interviews. Mastering it involves not just knowing the template, but also understanding how to adapt it, optimize it, and communicate your thought process.

## General Interview Tips for Backtracking Problems

1.  **Identify Backtracking:**
    *   Look for problems asking for "all possible" combinations, permutations, subsets, arrangements, or paths.
    *   Problems that involve making a sequence of decisions, where each decision constrains future choices, are strong candidates.
    *   Keywords: "find all unique...", "generate all...", "return any/all valid configurations..."

2.  **Start with the Recursive Template:**
    *   Mentally or on a whiteboard, lay out the `backtrack(state)` function:
        *   Base Case (when do I stop and record a solution?)
        *   Pruning (when do I stop early because it's impossible?)
        *   Loop for Choices (what are my options at this step?)
        *   `Choose` (make a decision)
        *   `Explore` (recursive call)
        *   `Unchoose` (undo the decision)

3.  **Define the `state`:**
    *   What information do you need to pass down to the next recursive call?
    *   Common state variables:
        *   `current_path`/`current_combination`: An array representing the choices made so far.
        *   `index`/`start_index`: To track progress through the input array/choices.
        *   `remaining_target`: For sum-related problems.
        *   `visited`/`used`: A boolean array or set to prevent reusing elements when not allowed (e.g., permutations, using each candidate once).
        *   `board_state`: For board-based problems like N-Queens.

4.  **Visualize the Decision Tree:**
    *   Drawing a small example's decision tree can clarify the choices, base cases, and when/where to prune. This also helps explain your logic to the interviewer.

5.  **Handle Duplicates (Crucial for Unique Solutions):**
    *   Many backtracking problems ask for *unique* combinations/permutations even if the input contains duplicates.
    *   **Sorting the input array** is almost always the first step when dealing with duplicates in backtracking.
    *   **Skip duplicates in the loop**:
        ```javascript
        for (let i = startIndex; i < nums.length; i++) {
            // If the current element is the same as the previous AND
            // we are NOT at the beginning of the current recursive call's loop (i.e., i > startIndex),
            // then skip this element to avoid duplicate combinations.
            if (i > startIndex && nums[i] === nums[i - 1]) {
                continue;
            }
            // ... normal choose/explore/unchoose logic
        }
        ```
    *   Understand *why* `i > startIndex` is important: it ensures that `[1,1,6]` (where both 1s are used) is generated, but `[1_at_idx0, 6]` and `[1_at_idx1, 6]` (treating them as distinct initial choices) are not both generated if they are the same value.

6.  **Pruning for Efficiency:**
    *   Look for opportunities to stop early:
        *   If `current_sum > target`: Prune.
        *   If `current_length > max_length`: Prune.
        *   If `is_invalid_placement(row, col)` (N-Queens): Prune.
    *   Sorting the input array often enables more effective pruning (e.g., `if (candidates[i] > remainingTarget) break;`).

7.  **Time and Space Complexity Analysis:**
    *   Always be ready to analyze complexity.
    *   **Time**: Typically exponential (O(2^N) for subsets, O(N!) for permutations/N-Queens) due to exploring a decision tree. Factor in the cost of copying solutions.
    *   **Space**: Often O(N) for recursion stack depth and temporary path/board state. The output itself might take much more (e.g., O(2^N * N) for subsets or O(N * N!) for permutations). Distinguish between auxiliary space and output space.

8.  **Practice Common Patterns:**
    *   **Subsets:** Decision at each element: include or exclude.
    *   **Permutations:** Decision at each step: which *unused* element to pick next.
    *   **Combinations/Combination Sum:** Decision at each element: include or exclude, but with constraint on sum/target. Often involves `startIndex` to prevent re-using elements at current level or going backward.
    *   **Board Problems (N-Queens, Sudoku):** Iterate through cells, make a move, check constraints, recurse.

## Common Variations

1.  **Count vs. List All:**
    *   Sometimes you just need the *number* of solutions, not the solutions themselves. In this case, instead of pushing to a `result` array, you increment a counter in the base case. The space complexity for the result then becomes O(1).

2.  **K-Subsets/K-Combinations/K-Permutations:**
    *   When the problem asks for subsets/combinations/permutations of a specific size `k`.
    *   Modify the base case: `if (current_path.length === k) { add_solution(); return; }`

3.  **Target Sum with Positive/Negative Numbers, Duplicates/No Duplicates:**
    *   **Positive, unique (Combination Sum I):** Elements can be reused. `backtrack(i, remainingTarget - nums[i])`.
    *   **Positive, duplicates, each once (Combination Sum II - this project):** Sort, use `startIndex` for elements, and `i > startIndex && nums[i] === nums[i-1]` for skipping duplicates. `backtrack(i + 1, remainingTarget - nums[i])`.
    *   **Negative numbers:** More complex, `target < 0` pruning might not work directly. Usually a separate problem category or requires different pruning logic. Standard backtracking problems usually assume positive candidates.

4.  **Pathfinding on a Grid/Graph:**
    *   Often involves DFS, which is a form of backtracking.
    *   `visited` array/set is crucial to prevent cycles.
    *   `dx`, `dy` arrays for directional moves.
    *   Example: Word Search, Flood Fill, finding paths in a maze.

5.  **Brute Force vs. Optimized Backtracking:**
    *   Pure brute force might try *all* possible sequences of choices.
    *   Optimized backtracking uses *pruning* to cut off branches that cannot lead to a solution, effectively reducing the search space from purely exponential to something more manageable (but still exponential). The N-Queens `isSafe` function is a great example of this pruning.

By understanding these tips and variations, you'll be well-equipped to approach a wide range of backtracking problems in your interviews.

---

### `docs/edge_cases_and_gotchas.md`

# Backtracking: Edge Cases and Gotchas

Even with a solid understanding of the backtracking template, certain nuances and edge cases can trip you up. This document highlights common pitfalls and considerations.

## 1. Off-by-One Errors in `startIndex` / Loop Bounds

*   **When to use `i + 1` vs. `i` in the recursive call?**
    *   `backtrack(i + 1, ...)`: When each element can be used *at most once* in a combination (e.g., subsets, combination sum II). This ensures you only consider elements to the right of the current one, preventing `[1,2]` and `[2,1]` as distinct combinations, and preventing `[1,1]` if the `1` can't be reused.
    *   `backtrack(i, ...)`: When elements *can be reused* (e.g., Combination Sum I where `candidates = [2,3,6,7], target = 7` can yield `[7]` and `[2,2,3]`). Here, you pass `i` to allow the same element to be picked again.
    *   For permutations, where order matters and each element is used once, the loop typically iterates through *all* available (unvisited) elements, and `startIndex` (or `k` in some implementations) usually tracks the current position being filled in the permutation.

*   **Loop Termination Conditions (`i < n` vs `i <= n`):**
    *   Ensure your loop `for (let i = startIndex; i < n; i++)` correctly covers all valid indices and stops before array bounds. This is usually `i < n`.

## 2. Handling Duplicates Correctly

This is arguably the most common source of errors in backtracking problems.

*   **Sorting the input array:** Almost always a prerequisite when dealing with duplicates and needing unique solutions. It groups identical elements together.
*   **The `i > startIndex && nums[i] === nums[i-1]` check:**
    *   This is critical for problems like "Combination Sum II" or "Permutations II".
    *   `i > startIndex`: This ensures that if there are two `1`s, say `nums[0]=1` and `nums[1]=1`, you can take `nums[0]`, then take `nums[1]` (leading to `[1,1]`). But you shouldn't start a new branch by choosing `nums[1]` if `nums[0]` (which is identical) was available at the *same level* of the decision tree.
    *   It prevents scenarios where `[1a, 2, 3]` and `[1b, 2, 3]` are treated as distinct solutions when `1a` and `1b` are just duplicate values.

    Consider `[1,1,2]`, `target=3`.
    If you don't use `i > startIndex`:
    `[1a]` -> `[1a, 1b]` -> `[1a, 1b, ?]` (invalid)
    `[1a]` -> `[1a, 2]` -> `[1a, 2, ?]` (invalid)
    `[1b]` -> `[1b, 1a]` -> `[1b, 1a, ?]` (invalid) (This is a duplicate permutation of `[1a,1b]`)
    `[1b]` -> `[1b, 2]` -> `[1b, 2, ?]` (invalid) (This is a duplicate permutation of `[1a,2]`)

    The `i > startIndex` ensures that if you consider `nums[0]` (which is `1a`), you won't reconsider `nums[1]` (which is `1b`) as a *new starting element* for a combination at the *same level* of recursion. It effectively makes decisions on *values* instead of *indices* when values are identical.

## 3. Deep Copying vs. Shallow Copying

*   When you add a `current_path`/`temp_solution` to your `result` array, you *must* push a **deep copy** (or at least a shallow copy of the array if elements are primitives).
*   `result.push([...current_path]);`
*   If you push `current_path` directly (`result.push(current_path);`), you'll be pushing a reference. As `current_path` changes due to `pop()` operations during backtracking, all entries in `result` will point to the *final state* of `current_path`, which is usually an empty array.

## 4. State Restoration (The "Unchoose" Step)

*   This is the core of backtracking. Every change made in the "Choose" step *must* be undone in the "Unchoose" step.
*   **For arrays:** `array.pop()` undoes `array.push()`.
*   **For visited/used flags:** `visited[i] = false;` undoes `visited[i] = true;`.
*   **For board states:** `board[row][col] = '.';` undoes `board[row][col] = 'Q';` and similarly for auxiliary tracking arrays (`cols`, `diag1`, `diag2` in N-Queens).
*   Forgetting to undo a choice means your state will be corrupted for subsequent branches, leading to incorrect results or infinite loops.

## 5. Pruning Logic

*   **Over-pruning:** Pruning too aggressively can lead to missing valid solutions. Make sure your `is_invalid_state` condition is truly impossible to lead to a solution, not just "less optimal" or "one specific solution".
*   **Under-pruning:** Not pruning enough leads to exponential slowdowns, potentially TLE (Time Limit Exceeded) for larger inputs. Always look for opportunities to `break` or `return` early.
    *   Example: In `Combination Sum II`, if `candidates[i] > remainingTarget`, we can `break` because the array is sorted, so subsequent elements will also be too large.

## 6. Base Case Definition

*   **When is a solution complete?** This defines your base case.
    *   `current_path.length === n` for fixed-size outputs (permutations, N-Queens).
    *   `remaining_target === 0` for sum problems.
    *   `startIndex === n` for problems exploring all elements (subsets).
*   **What if there are no solutions?** Ensure your function correctly returns an empty array or an appropriate indicator.
*   **Edge case `n=0` or empty input:** What should the output be? For subsets of `[]`, it's `[[]]`. For permutations of `[]`, it's `[[]]`. For N-Queens `n=0`, it's `[[]]`. This is an interviewer favorite.

## 7. Recursion Stack Overflow

*   Backtracking is inherently recursive. For very large `N`, you might hit the recursion depth limit (stack overflow).
*   In JavaScript, this limit is typically around 10,000-100,000 calls. For typical interview problems, `N` usually doesn't exceed 15-20 for N! complexity or 30-40 for 2^N complexity, so stack overflow isn't usually an issue unless the problem is poorly constrained.
*   If it is a concern, an iterative DFS with an explicit stack can be used, but this adds complexity and is usually only expected in advanced scenarios.

By being mindful of these common issues, you can significantly improve the correctness and robustness of your backtracking solutions.

---

### `scripts/benchmark.js`

```javascript
// scripts/benchmark.js
import Benchmark from 'benchmark';
import logger from '../src/utils/logger';

// Algorithms to benchmark
import { subsets, subsetsIterative } from '../src/algorithms/subsets';
import { permutations, permutationsSwap } from '../src/algorithms/permutations';
import { combinationSum2 } from '../src/algorithms/combinationSumII';
import { solveNQueens } from '../src/algorithms/nQueens';

logger.info('Starting benchmark tests...');

// =====================================
// Subsets Benchmarks
// =====================================
const subsetsSuite = new Benchmark.Suite('Subsets');

subsetsSuite
    .add('Subsets (Backtracking) - N=10', () => {
        subsets(Array.from({ length: 10 }, (_, i) => i + 1));
    })
    .add('Subsets (Iterative/Bit Manipulation) - N=10', () => {
        subsetsIterative(Array.from({ length: 10 }, (_, i) => i + 1));
    })
    .on('cycle', function(event) {
        logger.info(`  ${event.target.name}: ${event.target.hz.toFixed(2)} ops/sec`);
    })
    .on('complete', function() {
        logger.info(`Subsets Fastest is ${this.filter('fastest').map('name')}`);
        logger.info('---');
    })
    .run({ 'async': false });

// =====================================
// Permutations Benchmarks
// Note: Permutations grow extremely fast (N!), so N must be small.
// =====================================
const permutationsSuite = new Benchmark.Suite('Permutations');

permutationsSuite
    .add('Permutations (Visited Array) - N=8', () => {
        permutations(Array.from({ length: 8 }, (_, i) => i + 1));
    })
    .add('Permutations (Swapping) - N=8', () => {
        permutationsSwap(Array.from({ length: 8 }, (_, i) => i + 1));
    })
    .on('cycle', function(event) {
        logger.info(`  ${event.target.name}: ${event.target.hz.toFixed(2)} ops/sec`);
    })
    .on('complete', function() {
        logger.info(`Permutations Fastest is ${this.filter('fastest').map('name')}`);
        logger.info('---');
    })
    .run({ 'async': false });

// =====================================
// Combination Sum II Benchmarks
// Note: Test with a reasonable number of candidates and target.
// =====================================
const combinationSum2Suite = new Benchmark.Suite('Combination Sum II');
const candidatesCombSum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]; // N=16
const targetCombSum = 25;

combinationSum2Suite
    .add(`Combination Sum II - N=${candidatesCombSum.length}, Target=${targetCombSum}`, () => {
        combinationSum2(candidatesCombSum, targetCombSum);
    })
    .on('cycle', function(event) {
        logger.info(`  ${event.target.name}: ${event.target.hz.toFixed(2)} ops/sec`);
    })
    .on('complete', function() {
        logger.info(`Combination Sum II Fastest is ${this.filter('fastest').map('name')}`);
        logger.info('---');
    })
    .run({ 'async': false });

// =====================================
// N-Queens Benchmarks
// Note: N-Queens also grows very fast.
// =====================================
const nQueensSuite = new Benchmark.Suite('N-Queens');
const nQueensSize = 10; // N=10 has 724 solutions. N=11 is 2680. N=12 is 14200.

nQueensSuite
    .add(`N-Queens - N=${nQueensSize}`, () => {
        solveNQueens(nQueensSize);
    })
    .on('cycle', function(event) {
        logger.info(`  ${event.target.name}: ${event.target.hz.toFixed(2)} ops/sec`);
    })
    .on('complete', function() {
        logger.info(`N-Queens Fastest is ${this.filter('fastest').map('name')}`);
        logger.info('---');
    })
    .run({ 'async': false });

logger.info('All benchmarks completed.');
```

---