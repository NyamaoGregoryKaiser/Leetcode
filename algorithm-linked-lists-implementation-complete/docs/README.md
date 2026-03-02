```markdown
# 🔗 Linked List Interview Project

This project provides a comprehensive resource for mastering Linked List problems commonly encountered in coding interviews. It includes well-structured solutions, extensive tests, performance benchmarks, and detailed documentation.

## 🚀 Getting Started

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/linked-list-interview-project.git
    cd linked-list-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running Tests

To run all the test suites for the implemented problems:

```bash
npm test
# Or directly: node tests/runTests.js
```

### Running Benchmarks

To evaluate the performance of different solution approaches for selected problems:

```bash
npm run benchmark
# Or directly: node benchmarks/benchmark.js
```

## 📂 Project Structure

```
linked-list-interview-project/
├── src/
│   ├── data-structures/
│   │   └── LinkedList.js               # Core Node and LinkedList implementation
│   ├── problems/
│   │   ├── Problem1_ReverseList.js     # Reverse a Linked List
│   │   ├── Problem2_MergeTwoSortedLists.js # Merge Two Sorted Lists
│   │   ├── Problem3_DetectCycle.js     # Detect Cycle in a Linked List
│   │   ├── Problem4_FindKthFromEnd.js  # Find Kth Node From End of List
│   │   └── Problem5_RemoveNthFromEnd.js# Remove Nth Node From End of List
│   ├── utils/
│   │   └── listUtils.js                # Helper functions for list creation, comparison, printing
├── tests/
│   ├── test_Problem1_ReverseList.js
│   ├── test_Problem2_MergeTwoSortedLists.js
│   ├── test_Problem3_DetectCycle.js
│   ├── test_Problem4_FindKthFromEnd.js
│   ├── test_Problem5_RemoveNthFromEnd.js
│   └── runTests.js                     # Script to run all tests
├── docs/
│   ├── README.md                       # This file
│   ├── ALGORITHM_EXPLANATIONS.md       # Detailed explanations, ASCII diagrams, edge cases
│   └── INTERVIEW_TIPS.md               # Interview tips and variations
├── benchmarks/
│   └── benchmark.js                    # Performance benchmarking code
├── package.json                        # Node.js project configuration
└── .gitignore
```

## 📝 Problem Descriptions

Here are the problems addressed in this project:

### Problem 1: Reverse Linked List (LeetCode 206)
Given the `head` of a singly linked list, reverse the list, and return the reversed list's head.

*   **Example:**
    ```
    Input: head = [1,2,3,4,5]
    Output: [5,4,3,2,1]
    ```
*   **Implementations:** Iterative, Recursive, Brute Force (Array Conversion)

### Problem 2: Merge Two Sorted Lists (LeetCode 21)
You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

*   **Example:**
    ```
    Input: list1 = [1,2,4], list2 = [1,3,4]
    Output: [1,1,2,3,4,4]
    ```
*   **Implementations:** Iterative, Recursive

### Problem 3: Detect Linked List Cycle (LeetCode 141 & 142)
**Part I (141):** Given the `head` of a linked list, return `true` if there is a cycle in the linked list. Otherwise, return `false`.
**Part II (142):** Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.

*   **Example (Part I):**
    ```
    Input: head = [3,2,0,-4], pos = 1 (node at index 1 points to itself)
    Output: true
    ```
*   **Example (Part II):**
    ```
    Input: head = [3,2,0,-4], pos = 1
    Output: Node with value 2 (the cycle starts at index 1)
    ```
*   **Implementations:** Floyd's Tortoise and Hare (for both detection and cycle start)

### Problem 4: Find Kth Node From End of List (Variation of LeetCode 19)
Given the `head` of a singly linked list and an integer `k`, return the `k`-th node from the end of the list. Assume `k` is always valid (1 <= k <= list.length).

*   **Example:**
    ```
    Input: head = [1,2,3,4,5], k = 2
    Output: Node with value 4
    ```
*   **Implementations:** Two-Pointer Approach, Two-Pass (Length Calculation) Approach

### Problem 5: Remove Nth Node From End of List (LeetCode 19)
Given the `head` of a singly linked list, remove the `nth` node from the end of the list and return its head. Assume `n` is always valid (1 <= n <= list.length).

*   **Example:**
    ```
    Input: head = [1,2,3,4,5], n = 2
    Output: [1,2,3,5]
    ```
*   **Implementations:** One-Pass Two-Pointer Approach with Dummy Node

## 📚 Documentation

For in-depth understanding, refer to the following documents in the `docs/` directory:

*   **`ALGORITHM_EXPLANATIONS.md`**: Detailed breakdown of each algorithm, including logic, ASCII diagrams, and edge case considerations.
*   **`INTERVIEW_TIPS.md`**: General advice for linked list interviews, common pitfalls, and variations of these problems.

---
```