# Detailed Problem Descriptions

This document provides a comprehensive overview of each bit manipulation problem included in this project, complete with detailed descriptions, examples, and common constraints.

## Table of Contents

1.  [Problem: Count Set Bits (Hamming Weight)](#problem-count-set-bits-hamming-weight)
2.  [Problem: Single Number](#problem-single-number)
3.  [Problem: Power of Two](#problem-power-of-two)
4.  [Problem: Reverse Bits](#problem-reverse-bits)

---

## Problem: Count Set Bits (Hamming Weight)

**Description:**
Write a function that takes an unsigned integer (typically a 32-bit integer) and returns the number of '1' bits it has. This is also known as the Hamming weight.

**Example:**
Given `n = 00000000000000000000000000001011` (binary representation of 11), the function should return 3.

**Constraints:**
*   The input integer is treated as an unsigned 32-bit integer. This means its value can range from 0 to 2^32 - 1.
*   In JavaScript, numbers are typically 64-bit floating-point. However, bitwise operations treat them as 32-bit signed integers. To simulate unsigned 32-bit behavior, the `>>>` (unsigned right shift) operator is often used, or explicit conversion with `n >>> 0`.

**Key Concepts:**
*   **LSB (Least Significant Bit):** The rightmost bit.
*   **Bitwise AND (`&`):** Useful for checking if a specific bit is set (e.g., `n & 1` checks the LSB).
*   **Right Shift (`>>` or `>>>`):** Moves bits to the right. `>>>` is unsigned, padding with zeros from the left, which is crucial for treating numbers as unsigned.
*   **Brian Kernighan's Algorithm:** A clever trick where `n & (n - 1)` clears the least significant set bit. This reduces the number of iterations from 32 (or `log N`) to the number of set bits (`k`).

**Approaches Implemented:**
1.  **Iterative Bit Check:** Loops 32 times (or until number is 0), checking LSB and shifting right.
2.  **Brian Kernighan's Algorithm:** Optimized; iterates `k` times where `k` is the number of set bits.
3.  **Lookup Table:** Precomputes Hamming weights for all 256 possible byte values and sums them for the 4 bytes of a 32-bit integer.
4.  **Divide and Conquer (mentioned):** Uses parallel bit summation with masks, often the fastest on modern CPUs but more complex.

---

## Problem: Single Number

**Description:**
Given a non-empty array of integers, every element appears twice except for one. Find that single one.

**Challenge:**
Implement a solution with linear runtime complexity and use only constant extra space.

**Example 1:**
Input: `nums = [2, 2, 1]`
Output: `1`

**Example 2:**
Input: `nums = [4, 1, 2, 1, 2]`
Output: `4`

**Constraints:**
*   `1 <= nums.length <= 3 * 10^4`
*   `-3 * 10^4 <= nums[i] <= 3 * 10^4`
*   Each element appears twice, except for one that appears once.

**Key Concepts:**
*   **XOR Bitwise Operator (`^`):**
    *   `A ^ 0 = A`
    *   `A ^ A = 0`
    *   XOR is commutative (`A ^ B = B ^ A`) and associative (`(A ^ B) ^ C = A ^ (B ^ C)`).
    *   These properties make XOR perfect for "canceling out" duplicate numbers.

**Approaches Implemented:**
1.  **Hash Map (or Set):** Stores counts or presence of numbers. If a number is seen again, its count is decremented or it's removed. The leftover is the single number. (Does not meet constant space requirement).
2.  **XOR Property (Optimal):** XORs all elements together. Duplicates cancel out, leaving only the unique element. This is the optimal solution for space complexity.

**Variation: Single Number II**
This project also includes an implementation for a common variation: "Every element appears three times except for one."
The approach for this variation involves counting bits at each position. If the sum of bits at a certain position is not a multiple of 3, then the unique number must have a '1' at that position.

---

## Problem: Power of Two

**Description:**
Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.

An integer `n` is a power of two if there exists an integer `x` such that `n == 2^x`.

**Example 1:**
Input: `n = 1`
Output: `true` (Explanation: 2^0 = 1)

**Example 2:**
Input: `n = 16`
Output: `true` (Explanation: 2^4 = 16)

**Example 3:**
Input: `n = 3`
Output: `false`

**Constraints:**
*   `-2^31 <= n <= 2^31 - 1`

**Key Concepts:**
*   **Binary Representation of Powers of Two:** A positive integer is a power of two if and only if its binary representation has exactly one '1' bit and all other bits are '0'.
    *   1 (2^0): `0001`
    *   2 (2^1): `0010`
    *   4 (2^2): `0100`
    *   8 (2^3): `1000`
*   **Property `n & (n - 1)`:** This bitwise trick clears the least significant set bit of `n`. If `n` has only one set bit, then `n - 1` will flip that bit to 0 and all subsequent 0s to 1s. Thus, `n & (n - 1)` will be 0.
    *   `n = 8 (1000_2)`
    *   `n - 1 = 7 (0111_2)`
    *   `8 & 7 = 0`
*   For any number that is NOT a power of two (and positive), it will have at least two set bits, and `n & (n - 1)` will not be 0.
    *   `n = 6 (0110_2)`
    *   `n - 1 = 5 (0101_2)`
    *   `6 & 5 = 4 (0100_2)` (not 0)

**Approaches Implemented:**
1.  **Iterative Division:** Repeatedly divides `n` by 2 until it's 1. Checks for divisibility by 2 at each step.
2.  **Logarithm Check:** Uses `log2(n)`. If the result is an integer, `n` is a power of two. Requires careful handling of floating-point precision.
3.  **Bitwise Check (Optimal):** Checks if `n > 0` and `(n & (n - 1)) === 0`. This is the most efficient bit manipulation approach.

---

## Problem: Reverse Bits

**Description:**
Reverse the bits of a given 32-bit unsigned integer.

**Example:**
Given input `n = 43261596` (binary: `00000010100101000001111010011100`),
return `964176192` (binary: `00111001011110000010100101000000`).

**Constraints:**
*   The input is a 32-bit unsigned integer.
*   The function should return a 32-bit unsigned integer.

**Key Concepts:**
*   **Bitwise Left Shift (`<<`):** Moves bits to the left, padding with zeros on the right. Useful for building up a new number by adding bits to its LSB.
*   **Bitwise Right Shift (`>>` or `>>>`):** Moves bits to the right. `>>>` (unsigned right shift) is essential here to treat the number as unsigned and to pad with zeros from the left, preventing sign extension issues for negative numbers if they were part of the intermediate process.
*   **Bitwise OR (`|`):** Used to set a bit in a number without affecting other bits.
*   **Masking (`&`):** Used to isolate specific bits. `n & 1` isolates the LSB.

**Approaches Implemented:**
1.  **Iterative Shifting:** Loops 32 times. In each iteration, it takes the LSB from the original number, shifts the `reversed` result left by one, and adds the extracted bit.
2.  **Divide and Conquer / Parallel Swapping:** A more advanced technique that swaps blocks of bits in parallel using strategically chosen masks and shifts. This can be significantly faster on architectures that support parallel bit operations.
    *   Swaps 1-bit groups.
    *   Swaps 2-bit groups.
    *   Swaps 4-bit groups (nibbles).
    *   Swaps 8-bit groups (bytes).
    *   Swaps 16-bit groups (half-words).

---