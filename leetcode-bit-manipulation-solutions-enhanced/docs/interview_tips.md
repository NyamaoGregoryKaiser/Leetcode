```markdown
# Bit Manipulation Interview Tips and Variations

Bit manipulation questions can be tricky but are also a great opportunity to showcase your problem-solving skills and understanding of low-level optimization. This document provides tips for approaching these problems in an interview setting, common variations, and general strategies.

## Table of Contents
1.  [General Approach to Bit Manipulation Problems](#1-general-approach-to-bit-manipulation-problems)
2.  [Common Bit Manipulation Patterns and Tricks](#2-common-bit-manipulation-patterns-and-tricks)
3.  [Interview Questions to Ask](#3-interview-questions-to-ask)
4.  [Variations of Implemented Problems](#4-variations-of-implemented-problems)
5.  [Other Common Bit Manipulation Problems](#5-other-common-bit-manipulation-problems)
6.  [Performance Considerations](#6-performance-considerations)

---

## 1. General Approach to Bit Manipulation Problems

When faced with a bit manipulation problem, consider the following steps:

1.  **Understand the Goal:** Clearly define what the problem is asking. Is it about counting, setting, clearing, flipping, extracting, or combining bits?
2.  **Convert to Binary:** For small numbers or simple examples, mentally (or on paper/whiteboard) convert the numbers to their binary representation. This often reveals patterns.
    *   Example: "Is N a power of two?" -> Think `8 (1000)`, `7 (0111)`. The pattern `N & (N-1) == 0` for powers of two becomes obvious.
3.  **Identify Key Bitwise Operations:** Which operators (`&`, `|`, `^`, `~`, `<<`, `>>`) are most relevant to achieve the goal?
    *   Want to check if a bit is set? Use `&` with a mask (`num & (1 << i)`).
    *   Want to set a bit? Use `|` with a mask (`num | (1 << i)`).
    *   Want to clear a bit? Use `&` with a `~` mask (`num & ~(1 << i)`).
    *   Want to flip a bit? Use `^` with a mask (`num ^ (1 << i)`).
4.  **Think about Masks:** Most bit manipulation problems involve creating specific bit masks to target particular bits or ranges of bits.
    *   `1 << i`: Mask with only the `i`-th bit set.
    *   `~ (1 << i)`: Mask with only the `i`-th bit cleared.
    *   `(1 << (j - i + 1)) - 1 << i`: Mask for a range of bits `[i, j]`.
5.  **Consider Edge Cases:**
    *   **Zero (`0`):** What happens if the input is 0?
    *   **Maximum/Minimum Values (`INT_MAX`, `INT_MIN`, `UINT_MAX`):** Do shifts or operations overflow or behave unexpectedly?
    *   **Signed vs. Unsigned:** Does the problem imply signed or unsigned integers? How does this affect right shifts (`>>`) and `~`? (Refer to `edge_cases.md`).
    *   **Invalid Inputs:** What if a bit position `i` is out of bounds (e.g., `i >= 32` for a 32-bit integer)?
6.  **Analyze Complexity:** Bit manipulation solutions are typically O(1) or O(log N) (where N is the value, or specifically O(k) where k is the number of bits). Be ready to justify this.
7.  **Practice:** The more you practice, the more intuitive these operations become.

---

## 2. Common Bit Manipulation Patterns and Tricks

Memorizing these fundamental patterns can significantly speed up your problem-solving.

*   **Check if `i`-th bit is set:** `(num >> i) & 1` or `num & (1 << i)`
*   **Set `i`-th bit:** `num | (1 << i)`
*   **Clear `i`-th bit:** `num & ~(1 << i)`
*   **Toggle `i`-th bit:** `num ^ (1 << i)`
*   **Get rightmost set bit:** `num & (-num)`
*   **Clear rightmost set bit:** `num & (num - 1)` (Brian Kernighan's algorithm)
*   **Check if `num` is a power of two:** `num > 0 && (num & (num - 1)) == 0`
*   **Count set bits:** Brian Kernighan's algorithm (as seen in Problem 1).
*   **Swap two numbers without a temporary variable:** `a = a ^ b; b = a ^ b; a = a ^ b;` (Be careful with same memory locations for `a` and `b`).
*   **Absolute value without branching:** `int abs_val = (n ^ (n >> 31)) - (n >> 31);` (for 32-bit int, using arithmetic right shift)
*   **Extract a range of bits `[i, j]`:**
    1.  Create a mask of `j - i + 1` ones: `(1 << (j - i + 1)) - 1`
    2.  Shift the mask to position `i`: `((1 << (j - i + 1)) - 1) << i`
    3.  AND with the number: `(num & mask) >> i`

---

## 3. Interview Questions to Ask

Asking clarifying questions demonstrates thoroughness and helps prevent misunderstandings.

*   "What is the range of input numbers?" (e.g., 0 to 2^32-1, or can they be negative?)
*   "Are we dealing with signed or unsigned integers?" (Crucial for `>>` and `~` behavior).
*   "What is the expected behavior for edge cases?" (e.g., `n=0`, `i` or `j` out of bounds in `UpdateBits`).
*   "What are the performance constraints?" (Time and space complexity).
*   "Should I consider portability across different systems (e.g., 32-bit vs. 64-bit architecture)?" (Affects `int` size, `1 << 31` vs `1U << 31`).
*   "Can I use built-in functions for bit counting (like `__builtin_popcount` in GCC/Clang)?" (Often disallowed for "implement your own" questions, but good to clarify).

---

## 4. Variations of Implemented Problems

Here are some ways the problems in this project could be varied in an interview:

### Count Set Bits
*   **Count total set bits in an array:** Sum `popcount` for all elements.
*   **Count unset bits:** `total_bits - countSetBits(n)`.
*   **Hamming Distance:** Number of positions at which corresponding bits are different between two integers. `countSetBits(x ^ y)`.
*   **Number of set bits within a range `[L, R]`:** More complex, often requires digit DP or analyzing patterns.

### Single Number III
*   **Single Number I:** Find the single unique number (all others appear twice). Just XOR all numbers.
*   **Single Number II:** Find the single unique number (all others appear three times). Requires counting bits modulo 3 for each bit position.
*   **Find `k` unique numbers:** Generalization, much harder, typically involves more advanced data structures or linear algebra over GF(2).

### Power of Two
*   **Power of Four:** `n > 0 && (n & (n - 1)) == 0 && (n & 0xAAAAAAAA) == 0` (The single '1' bit must be at an even position).
*   **Power of Three:** No simple bitwise trick. Typically involves loops or checking `log_base_3(n)` for integer result.

### Reverse Bits
*   **Reverse bytes:** Reverse the order of bytes instead of individual bits.
*   **Reverse bits in a specific byte/nibble:** Apply the logic to a smaller segment.
*   **Check if a number is a bitwise palindrome:** `n == reverseBits(n)`.

### Insert M into N (Update Bits)
*   **Clear bits in a range:** Simply create the `clear_mask` and `N & clear_mask`.
*   **Set bits in a range:** Create a `set_mask` (1s in range, 0s elsewhere) and `N | set_mask`.
*   **Rotate bits:** Circular shift left/right.

---

## 5. Other Common Bit Manipulation Problems

*   **Count Leading Zeros (CLZ) / Trailing Zeros (CTZ):** Used in various algorithms, often directly supported by hardware instructions (exposed via `__builtin_clz`, `__builtin_ctz`).
*   **Find Missing Number:** Given an array of `N` distinct numbers from `0` to `N`, find the one missing number. Often solvable with XOR: XOR all numbers from `0` to `N` and then XOR with all numbers in the array.
*   **Bitwise AND of Numbers Range:** Given a range `[m, n]`, return the bitwise AND of all numbers in this range.
*   **Gray Code:** Generate a Gray code sequence.
*   **Convert Decimal to Binary / Binary to Decimal:** Fundamental conversions.
*   **Check if two numbers have opposite signs:** `(x ^ y) < 0` (for signed integers).
*   **Modular Arithmetic using Bitwise Operations:** For powers of 2 (e.g., `num % 2^k` is `num & ( (1 << k) - 1 )`).

---

## 6. Performance Considerations

Bit manipulation is inherently fast as it directly maps to CPU instructions.
*   **O(1) vs O(k) vs O(log N):**
    *   Many simple bitwise operations (set, clear, check, toggle, `N & (N-1)`) are O(1).
    *   Operations that iterate through all bits of a fixed-size integer (e.g., 32-bit or 64-bit) are O(k) where k is the number of bits (effectively O(1) in big-O notation, but can be written as O(k) for clarity).
    *   Operations that depend on the *value* of the number, like a loop that divides by 2, are O(log N).
*   **Lookup Tables:** For extremely performance-critical scenarios (e.g., counting set bits millions of times), lookup tables (as shown in `CountSetBits`) can provide a constant time improvement by reducing CPU cycles.
*   **Compiler Optimizations:** Modern compilers are very good at optimizing bitwise code, sometimes even replacing naive loops with intrinsic functions (like `popcount`). However, it's generally best to write clear and efficient bitwise logic manually.
*   **Cache Locality:** Bit manipulation often operates on single integers, which are highly cache-friendly.
```