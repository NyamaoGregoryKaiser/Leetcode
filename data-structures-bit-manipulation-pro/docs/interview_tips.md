# Bit Manipulation Interview Tips & Gotchas

Bit manipulation questions are a staple in coding interviews, especially for roles requiring low-level optimization or hardware interaction. Here's a guide to ace them:

---

## 1. Common Bit Manipulation Idioms

Familiarize yourself with these fundamental operations:

*   **Get `k`-th bit:** `(num >> k) & 1`
    *   Example: Get 2nd bit of `0b10110` (22) -> `(22 >> 2) & 1 = 0b101 & 1 = 1`
*   **Set `k`-th bit to 1:** `num | (1 << k)`
    *   Example: Set 2nd bit of `0b10010` (18) -> `18 | (1 << 2) = 0b10010 | 0b100 = 0b10110` (22)
*   **Clear `k`-th bit to 0:** `num & (~(1 << k))`
    *   Example: Clear 2nd bit of `0b10110` (22) -> `22 & (~(1 << 2)) = 0b10110 & ~0b100 = 0b10110 & 0b1111011 = 0b10010` (18)
*   **Toggle `k`-th bit:** `num ^ (1 << k)`
    *   Example: Toggle 2nd bit of `0b10110` (22) -> `22 ^ (1 << 2) = 0b10110 ^ 0b100 = 0b10010` (18)
*   **Clear bits from MSB to `k` (inclusive):** `num & ((1 << k) - 1)`
    *   Example: Clear MSB to 3rd bit of `0b11010110` -> `0b11010110 & ((1 << 3) - 1) = 0b11010110 & 0b111 = 0b110`
*   **Clear bits from `k` to LSB (inclusive):** `num & (~((1 << (k + 1)) - 1))` or `num & (~0U << (k + 1))`
    *   Example: Clear 2nd bit to LSB of `0b11010110` -> `0b11010110 & (~((1 << 3) - 1)) = 0b11010110 & (~0b111) = 0b11010000`
*   **Check if `n` is power of 2:** `n > 0 && (n & (n - 1)) == 0`
*   **Count set bits (Brian Kernighan's):** `while (n > 0) { n &= (n - 1); count++; }`
*   **Isolate LSB:** `n & (-n)`

---

## 2. Identifying Bit Manipulation Problems

Look for keywords and patterns that suggest a bit manipulation solution:

*   **"Binary representation", "bits", "set bits", "toggle bits", "MSB", "LSB".**
*   **Constraints on numbers:** If numbers are within a small range (e.g., up to 32 bits), bit manipulation might be faster than arithmetic operations.
*   **Efficiency requirements:** Often, bit manipulation offers O(1) or O(log N) solutions where arithmetic or array-based solutions might be O(N).
*   **Properties like "even/odd", "power of 2".**
*   **Problems with pairs of identical numbers and one unique number.** (XOR)
*   **Problems asking to swap elements without extra space (or minimal space).** (XOR swap)

---

## 3. Edge Cases and Gotchas

*   **Zero (`0`):**
    *   `0` has `0` set bits.
    *   `0` is NOT a power of 2 by common definition (since `2^x` is always positive).
    *   `reverseBits(0)` should return `0`.
*   **One (`1`):**
    *   `1` has `1` set bit.
    *   `1` IS a power of 2 (`2^0`).
*   **All bits set (`0xFFFFFFFF` for `unsigned int`):**
    *   Number of set bits is 32.
    *   Reversed bits is `0xFFFFFFFF`.
*   **Signed vs. Unsigned Integers:**
    *   **Crucial difference:** Bit manipulation is almost always safer and more predictable with `unsigned int`.
    *   **Right shift (`>>`):** For `unsigned int`, it's always a logical shift (fills with `0`s). For `signed int`, it's implementation-defined for negative numbers (can be arithmetic shift, filling with the sign bit). Avoid signed right shifts if the sign bit matters or if you need specific fill behavior.
    *   **Bitwise NOT (`~`):** For signed integers, `~n` followed by `+1` gives `-n` in two's complement. `~0` is `0xFFFFFFFF` for unsigned, but can be `-1` for signed, which is also represented as `0xFFFFFFFF`. Be mindful of how the compiler interprets the type.
    *   **Integer Literals:** Use `U` suffix for unsigned literals (e.g., `1U`, `0xFFFFFFFFU`) to explicitly make them unsigned.
*   **Integer Overflow:** Be aware of shifting operations that might exceed the bit width of the type (e.g., `1 << 31` for a 32-bit `int` can be problematic if it results in a negative number, `1 << 32` is undefined behavior). Stick to `unsigned int` and be careful with the maximum bit position.
*   **Operator Precedence:** Bitwise operators have lower precedence than arithmetic operators. For example, `1 << k - 1` is parsed as `1 << (k - 1)`. Use parentheses generously to ensure correct order of operations, especially when mixing bitwise and logical/arithmetic operators (e.g., `(n & 1) == 1`).
*   **`0U` vs `0`:** When working with unsigned types, explicitly use `0U` to denote an unsigned zero, especially in masks, to prevent type promotion issues.

---

## 4. Interview Tips and Variations

*   **Clarify Constraints:** Always ask about the range of numbers, whether they are signed/unsigned, and the expected time/space complexity.
*   **Walk through examples:** For any bit manipulation solution, meticulously walk through a small example step-by-step with binary representations. This shows your understanding and helps catch bugs.
*   **Consider edge cases:** Test with `0`, `1`, `MAX_INT/UINT`, powers of 2 (if relevant), and numbers with all bits set.
*   **Explain Trade-offs:** If you provide multiple solutions (e.g., XOR vs. HashMap for Single Number), explain the time/space trade-offs.
*   **Alternative Solutions/Built-ins:** Mention if there are compiler intrinsics (`__builtin_popcount`, `__builtin_clz`, `__builtin_ctz` in GCC/Clang) that could solve the problem even faster, showing you're aware of highly optimized options, but typically implement a standard bitwise approach first.
*   **Memory-Efficiency:** Discuss lookup tables for byte-sized operations as a memory-efficient optimization if constant-time lookup is crucial.

### Problem Variations:

*   **Count Set Bits:**
    *   Count set bits in a range `[A, B]`.
    *   Count set bits for all numbers from 1 to N.
    *   Find the next smallest/largest number with the same number of set bits.
*   **Reverse Bits:**
    *   Reverse bits in a specific range of an integer.
    *   Swap adjacent bits (e.g., `b0 b1 b2 b3` -> `b1 b0 b3 b2`).
*   **Single Number:**
    *   Every element appears `k` times except for one which appears `m` times (where `m % k != 0`). (This requires counting bits for each position, not just XOR).
    *   Find two numbers that appear once, while others appear twice. (XOR all, then split based on LSB of XOR sum).
*   **Is Power of 2:**
    *   Is power of 3? Is power of 4? (Hint: `log_base(n)` is an integer, or check specific bit patterns / remainder).
    *   Find the largest power of 2 less than or equal to N.
*   **Bit Insertion:**
    *   Similar problems might involve clearing, setting, or toggling specific bit ranges.
    *   Replacing a specific bit (e.g., `N[k] = bit_val`).

Mastering bit manipulation requires practice and a solid grasp of binary representation. Keep practicing these core concepts and you'll be well-prepared for any bit-related interview question!

---