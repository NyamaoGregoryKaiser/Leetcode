# Stack and Queue Interview Project

This project provides a comprehensive set of coding interview problems focused on the Stack and Queue data structures. It aims to cover various aspects, from fundamental implementations to advanced applications, including:

*   Optimal algorithm implementations in TypeScript.
*   Detailed time and space complexity analysis.
*   Extensive unit tests with various edge cases.
*   Custom implementations of Stack and Queue for better understanding.
*   Performance benchmarking utilities.
*   In-depth documentation with problem descriptions, solution explanations, ASCII diagrams, and interview tips.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Setup and Installation](#setup-and-installation)
3.  [Problems Covered](#problems-covered)
    *   [Problem 1: Valid Parentheses](#problem-1-valid-parentheses)
    *   [Problem 2: Min Stack](#problem-2-min-stack)
    *   [Problem 3: Implement Queue using Stacks](#problem-3-implement-queue-using-stacks)
    *   [Problem 4: Implement Stack using Queues](#problem-4-implement-stack-using-queues)
    *   [Problem 5: Sliding Window Maximum](#problem-5-sliding-window-maximum)
4.  [Running Tests](#running-tests)
5.  [Running Benchmarks](#running-benchmarks)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Structure

```
stack-queue-interview-project/
├── src/
│   ├── algorithms/              # Main algorithm implementations and their tests
│   │   ├── stack-queue-problems.ts
│   │   └── stack-queue-problems.test.ts
│   ├── data-structures/         # Custom Stack and Queue implementations
│   │   ├── queue.ts
│   │   └── stack.ts
│   └── utils/                   # Helper utilities (e.g., performance measurement)
│       └── performance.ts
├── docs/                        # Comprehensive documentation files
│   ├── README.md                # This file
│   ├── algorithms-explanation.md# Detailed algorithm explanations with diagrams
│   └── interview-tips.md        # General interview tips for data structures
├── benchmarks/                  # Scripts for running performance benchmarks
│   └── benchmark-runner.ts
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
```

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/stack-queue-interview-project.git
    cd stack-queue-interview-project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install `typescript` and `jest` among other development dependencies.

## Problems Covered

This project addresses a range of classic and challenging problems for Stacks and Queues.

### Problem 1: Valid Parentheses

*   **Description:** Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid. An input string is valid if:
    1.  Open brackets must be closed by the same type of brackets.
    2.  Open brackets must be closed in the correct order.
    3.  Every close bracket has a corresponding open bracket of the same type.
*   **Optimal Solution:** Uses a Stack to keep track of open brackets.

### Problem 2: Min Stack

*   **Description:** Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in constant time.
    *   `push(val)`: Pushes element `val` onto the stack.
    *   `pop()`: Removes the element on top of the stack.
    *   `top()`: Gets the top element of the stack.
    *   `getMin()`: Retrieves the minimum element in the stack.
*   **Optimal Solution:** Uses an auxiliary stack to store minimums, achieving O(1) for all operations.

### Problem 3: Implement Queue using Stacks

*   **Description:** Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).
*   **Optimal Solution:** Uses two stacks: one for `push` operations (`inStack`) and another for `pop`/`peek` operations (`outStack`), transferring elements as needed.

### Problem 4: Implement Stack using Queues

*   **Description:** Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).
*   **Optimal Solution:** This is trickier than Queue using Stacks. The primary approach involves ensuring the "top" element is always at the front of one queue, possibly by transferring `n-1` elements to a temporary queue on each `push` or `pop`.

### Problem 5: Sliding Window Maximum

*   **Description:** You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position. Return the *maximum* sliding window.
*   **Optimal Solution:** Uses a Deque (double-ended queue) to store indices of elements in decreasing order, allowing O(1) retrieval of the maximum and efficient window updates.

## Running Tests

To run all unit tests using Jest:

```bash
npm test
```

This command will compile the TypeScript files and execute `src/algorithms/stack-queue-problems.test.ts`.

## Running Benchmarks

To run the performance benchmarks for selected problems:

```bash
npm run benchmark
```

This command will execute `benchmarks/benchmark-runner.ts`, which measures the execution time of different solutions (where applicable) and with varying input sizes.

## Documentation

*   **`docs/algorithms-explanation.md`**: Provides in-depth explanations for each problem, including the logic behind optimal solutions, step-by-step walkthroughs, ASCII diagrams, and discussion of edge cases and alternative approaches.
*   **`docs/interview-tips.md`**: Offers general advice for preparing for and performing well in coding interviews, especially those involving Stack and Queue problems.

## Contributing

Feel free to open issues, submit pull requests, or suggest improvements!

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for more details (though I haven't included an explicit `LICENSE` file in this output, it's good practice to add one).