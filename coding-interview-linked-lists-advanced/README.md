```markdown
# Linked List Interview Project

This project provides a comprehensive set of materials for preparing for Linked List coding interviews. It includes multiple common Linked List problems, optimal solutions, alternative approaches, extensive test cases, performance benchmarking, and detailed documentation with explanations and diagrams.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Problems Covered](#problems-covered)
3.  [Setup and Running](#setup-and-running)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Performance Benchmarks](#running-performance-benchmarks)
4.  [Documentation](#documentation)
    *   [Algorithms Explanation](#algorithms-explanation)
    *   [Visual Diagrams](#visual-diagrams)
    *   [Interview Tips & Variations](#interview-tips--variations)
5.  [Contributing](#contributing)
6.  [License](#license)

## Project Structure

```
linked-list-interview-project/
├── src/
│   ├── data-structures/
│   │   └── LinkedList.ts             # Node definition and basic linked list utilities
│   ├── algorithms/
│   │   ├── Problem1_ReverseList.ts   # Optimal solution for reversing a linked list
│   │   ├── Problem2_HasCycle.ts      # Optimal solution for detecting a cycle
│   │   ├── Problem3_MergeSorted.ts   # Optimal solution for merging two sorted lists
│   │   └── Problem4_RemoveNthFromEnd.ts # Optimal solution for removing Nth node from end
│   └── utils/
│       └── performance.ts            # Utility for measuring function execution time
├── tests/
│   ├── data-structures/
│   │   └── LinkedList.test.ts        # Tests for the basic LinkedList utilities
│   ├── algorithms/
│   │   ├── Problem1_ReverseList.test.ts
│   │   ├── Problem2_HasCycle.test.ts
│   │   ├── Problem3_MergeSorted.test.ts
│   │   └── Problem4_RemoveNthFromEnd.test.ts
│   └── performance.test.ts           # Tests for benchmarking different algorithm implementations
├── docs/
│   ├── AlgorithmsExplanation.md      # In-depth explanations of the algorithms
│   ├── Diagrams.md                   # ASCII art diagrams to visualize algorithms
│   └── InterviewTips.md              # Common interview tips, edge cases, and variations
├── implementations/                  # Alternative or brute-force implementations for comparison
│   ├── Problem1_ReverseList_Recursive.ts
│   ├── Problem2_HasCycle_Set.ts
│   ├── Problem3_MergeSorted_Iterative.ts
│   └── Problem4_RemoveNthFromEnd_TwoPass.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Problems Covered

1.  **Reverse Linked List**: Reverse a singly linked list.
2.  **Detect Cycle in Linked List**: Determine if a linked list has a cycle in it using Floyd's Tortoise and Hare algorithm.
3.  **Merge Two Sorted Lists**: Merge two sorted linked lists into one new sorted linked list.
4.  **Remove Nth Node From End of List**: Remove the nth node from the end of a list and return its head.

## Setup and Running

### Installation

1.  **Clone this repository** (or copy the files into a new directory).
2.  Navigate to the project root directory in your terminal.
3.  Install dependencies using npm or yarn:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running Tests

All tests are written using `jest`.

To run all tests:
```bash
npm test
# or
yarn test
```

To run tests for a specific algorithm (e.g., Reverse List):
```bash
npm test tests/algorithms/Problem1_ReverseList.test.ts
# or
yarn test tests/algorithms/Problem1_ReverseList.test.ts
```

To run tests in watch mode:
```bash
npm run test:watch
# or
yarn test:watch
```

### Running Performance Benchmarks

The `performance.test.ts` file contains benchmarks comparing different approaches for some problems (e.g., iterative vs. recursive reverse).

To run performance tests:
```bash
npm run test:performance
# or
yarn test:performance
```

## Documentation

### [Algorithms Explanation](docs/AlgorithmsExplanation.md)

This document provides detailed explanations of the logic behind the optimal solutions for each problem, including step-by-step reasoning and complexity analysis.

### [Visual Diagrams](docs/Diagrams.md)

This document uses ASCII art to visually represent the state of the linked list and pointer movements during the execution of the algorithms, which can greatly aid understanding.

### [Interview Tips & Variations](docs/InterviewTips.md)

This document offers valuable advice for approaching linked list problems in an interview setting, discusses common edge cases to consider, and explores variations or follow-up questions often asked by interviewers.

## Contributing

Feel free to open issues or submit pull requests if you find any bugs, have suggestions for improvements, or want to add more problems/solutions/documentation.

## License

This project is open-sourced under the ISC License. See the `LICENSE` file for more details.
```