```markdown
# Bit Manipulation Interview Tips and Variations

Bit manipulation is a common topic in coding interviews, especially at companies focusing on low-level systems, embedded programming, or performance optimization. Mastering it demonstrates a strong understanding of computer fundamentals.

---

## General Bit Manipulation Tips

1.  **Understand the Operators**:
    *   `&` (AND): Clears bits, checks if a bit is set.
    *   `|` (OR): Sets bits.
    *   `^` (XOR): Toggles bits, finds differences, swaps numbers without temp.
    *   `~` (NOT): Flips all bits.
    *   `<<` (Left Shift): Multiplies by powers of 2, moves bits towards MSB.
    *   `>>` (Right Shift): Divides by powers of 2, moves bits towards LSB. Be aware of arithmetic vs. logical right shift for signed numbers (C++ `>>` is arithmetic for signed, logical for unsigned).

2.  **Powers of Two**:
    *   `1 << k` gives `2^k`.
    *   Checking if `n` is a power of two: `n > 0 && (n & (n - 1)) == 0`. This is a classic trick.

3.  **Manipulating Specific Bits**:
    *   **Set k-th bit**: `num | (1 << k)`
    *   **Clear k-th bit**: `num & ~(1 << k)`
    *   **Toggle k-th bit**: `num ^ (1 << k)`
    *   **Check k-th bit**: `(num >> k) & 1` (returns 0 or 1)

4.  **Important Idioms**:
    *   `n & (n - 1)`: Clears the least significant set bit. Used in Brian Kernighan's algorithm.
    *   `n & (~n + 1)` or `n & (-n)`: Isolates the least significant set bit. This is because `~n + 1` is equivalent to `-n` in two's complement.
    *   `~0u`: All bits set to 1 for an unsigned integer (e.g., `0xFFFFFFFF`).

5.  **Signed vs. Unsigned Integers**:
    *   Be cautious with signed integers, especially with right shifts and negative numbers. `uint32_t` or `unsigned int` is often preferred for bit manipulation to avoid sign extension issues.
    *   `INT_MIN` (most significant bit is 1, all others 0) is a special case. `INT_MIN & (INT_MIN - 1)` does not behave as expected for `n & (n-1)` due to overflow if `INT_MIN - 1` wraps around to `INT_MAX`. Stick to `unsigned` for general bit twiddling unless signed behavior is explicitly required.

6.  **Bit Masking**: Using a predefined bit pattern to select or modify specific bits. Crucial for problems like "Insert M into N".

---

## Interview Process Tips

1.  **Start with Brute Force/Naiveté**: If you're stuck, describe a simple, possibly inefficient approach first. This shows you can break down the problem.
2.  **Think Binary**: When a problem screams "bit manipulation", immediately start writing numbers in binary. This helps visualize the operations.
3.  **Use a Whiteboard**: Draw out bits. Show how `N & (N-1)` works with an example number. Demonstrate shifts. This visual aid is invaluable for both you and the interviewer.
4.  **Edge Cases**: Always consider:
    *   0
    *   1
    *   All bits 0 (`0`)
    *   All bits 1 (`~0u`)
    *   Max value (`UINT_MAX`)
    *   Minimum value (for signed, e.g., `INT_MIN`)
5.  **Complexity Analysis**: State time and space complexity for your solutions. For bit manipulation, it's often O(1) because the number of bits (e.g., 32 or 64) is constant. However, for problems involving arrays or large numbers, it might be O(N) or O(log N).
6.  **Talk Through Your Logic**: Explain each bitwise operation step-by-step. Don't just write code; narrate your thought process.
7.  **Choose Appropriate Data Types**: `uint32_t` or `unsigned int` are usually safer for bit manipulation to avoid unexpected signed arithmetic behavior.

---

## Problem-Specific Interview Tips and Variations

### 1. Count Set Bits (Hamming Weight)

*   **Tip:** Always mention Brian Kernighan's algorithm as the optimal general solution. A lookup table is even faster but uses more memory (and sometimes built-in functions like `__builtin_popcount` in GCC/Clang are available).
*   **Variations:**
    *   **Count total set bits in a range `[L, R]`**: More complex, involves precomputing prefix sums of set bits or digit DP.
    *   **Hamming Distance**: Find the number of positions at which the corresponding bits are different for two numbers (`num1 ^ num2`, then count set bits).
    *   **Check if numbers are "k-distant"**: If their Hamming distance is exactly `k`.

### 2. Check if a number is a Power of Two

*   **Tip:** This is a classic one-liner (`n > 0 && (n & (n - 1)) == 0`). Knowing it immediately impresses.
*   **Variations:**
    *   **Check if a number is a power of K (any base K)**: This usually involves repeated division, not bit manipulation (unless K is 2).
    *   **Find the next power of two**: Requires finding the MSB and then `1 << (MSB_pos + 1)`.

### 3. Reverse Bits

*   **Tip:** Be clear about the input/output type (e.g., `uint32_t`). The standard approach iterates 32 times.
*   **Variations:**
    *   **Reverse bytes**: Reverse the order of bytes, not individual bits.
    *   **Swap adjacent bits**: Swap bit 0 with 1, 2 with 3, etc. (`(num & 0xAAAAAAAAu) >> 1) | ((num & 0x55555555u) << 1)`).
    *   **Reverse bits in a specific range `[i, j]`**: Combine concepts from "Insert M into N" and "Reverse Bits".

### 4. Single Number

*   **Tip:** This is the quintessential XOR problem. Highlight the properties of XOR.
*   **Variations:**
    *   **Single Number II (or III)**: Every element appears three times (or `k` times) except for one which appears once. This is harder and often requires counting bits at each position modulo 3 (or k).
    *   **Two Unique Numbers**: All numbers appear twice except for two unique ones. XOR all numbers, then the result is `A ^ B`. Find a set bit in `A ^ B`, say at position `k`. Partition the original array into two groups: those with `k`-th bit set and those with `k`-th bit cleared. XOR elements in each group to find `A` and `B`.
    *   **Missing Number**: Given an array of `n` distinct numbers taken from `0, 1, ..., n`, find the one that is missing. XOR all numbers in the array with all numbers from `0` to `n`.

### 5. Insert M into N

*   **Tip:** This demonstrates strong masking skills. Clearly draw out the masks on a whiteboard.
*   **Variations:**
    *   **Clear bits from `i` to `j`**: `N & ~(((1 << (j - i + 1)) - 1) << i)`.
    *   **Set bits from `i` to `j`**: `N | (((1 << (j - i + 1)) - 1) << i)`.
    *   **Check if a number fits in `k` bits**: `num < (1 << k)`.
    *   **Find the largest power of 2 less than or equal to N**: Recursively `n |= n >> (1 << i)` (for `i=0,1,2,3,4`), then `(n >> 1) + 1`.

---

By understanding these core concepts, practicing the problems, and knowing how to discuss them, you'll be well-prepared for bit manipulation questions in any coding interview.
```