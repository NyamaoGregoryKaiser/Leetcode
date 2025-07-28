# Stack and Queue Interview Problems

This project contains several coding interview problems related to stacks and queues, along with their solutions and analysis.  Each problem includes multiple approaches, where applicable, to demonstrate different algorithmic techniques.

## Problems:

1. **Valid Parentheses:** Given a string containing parentheses `()`, brackets `[]`, and curly braces `{}`, determine if the input string is valid.  An input string is valid if:
   - Open brackets must be closed by the same type of brackets.
   - Open brackets must be closed in the correct order.
   - Every close bracket has a corresponding open bracket.

2. **Queue using Stacks:** Implement a queue data structure using only stacks.  The queue should support the `enqueue` and `dequeue` operations.

3. **Largest Rectangle in Histogram:** Given an array of integers representing the heights of bars in a histogram, find the area of the largest rectangle that can be formed using these bars.

4. **Reverse a Queue:** Reverse a given queue using only queue operations (no extra space allowed).

## Usage:

Compile and run the main C++ file (`main.cpp`). The test files provide comprehensive test cases for each problem.

## Project Structure:

- `main.cpp`: Main algorithm implementation and problem solutions.
- `test.cpp`: Test cases.
- `stack.h`: Stack implementation.
- `queue.h`: Queue implementation. (For problem 2, consider using only stacks)