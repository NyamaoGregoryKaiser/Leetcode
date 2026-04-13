# Bit Manipulation Interview Tips and Variations

Bit manipulation questions are common in coding interviews because they test a candidate's understanding of low-level data representation, logical thinking, and ability to optimize for speed and memory.

## General Interview Tips for Bit Manipulation Problems

1.  **Understand Bitwise Operators:**
    *   `&` (AND): Returns 1 if both bits are 1. Useful for clearing bits or checking if a bit is set.
    *   `|` (OR): Returns 1 if at least one bit is 1. Useful for setting bits.
    *   `^` (XOR): Returns 1 if bits are different. Useful for toggling bits, finding unique elements, and swapping.
    *   `~` (NOT): Inverts all bits. Be careful with signed vs. unsigned interpretation in Python (`~x` is `-(x+1)`).
    *   `<<` (Left Shift): Multiplies by 2. `x << k` is `x * 2^k`.
    *   `>>` (Right Shift): Divides by 2. `x >> k` is `x // 2^k` (integer division). In Python, `>>` is arithmetic right shift for positive numbers (fills with 0) and `floor division` for negative numbers, generally filling with 1s.
    *   `0b` prefix for binary literals (e.g., `0b1011`).

2.  **Fixed Bit Width vs. Arbitrary Precision:**
    *   In C++/Java, integers have fixed bit widths (e.g., 32-bit `int`, 64-bit `long`).
    *   In Python, integers have arbitrary precision. When working on problems explicitly stating "32-bit integer", you might need to use bit masks like `0xFFFFFFFF` (`(1 << 32) - 1`) to simulate fixed-width behavior for operations like `~` (NOT) or to ensure results don't exceed a certain bit length.
    *   Be aware of how `>>` (right shift) handles negative numbers: Python performs an arithmetic right shift (sign-extension).

3.  **Common Bit Manipulation Patterns:**
    *   **Check if `k`-th bit is set:** `(num >> k) & 1`
    *   **Set `k`-th bit:** `num | (1 << k)`
    *   **Clear `k`-th bit:** `num & ~(1 << k)`
    *   **Toggle `k`-th bit:** `num ^ (1 << k)`
    *   **Clear bits from `k` to MSB:** `num & ((1 << k) - 1)`
    *   **Clear bits from `0` to `k`:** `num & (~((1 << (k + 1)) - 1))` or `num & (~0 << (k + 1))`
    *   **Isolate LSB:** `num & (-num)` (for two's complement, gives `2^k` where `k` is position of LSB).
    *   **Clear LSB:** `num & (num - 1)` (Brian Kernighan's algorithm).

4.  **Practice Drawing Bits:** Use paper or a whiteboard to draw out binary representations and trace bitwise operations for small examples. This helps clarify logic and catch errors. The `utils/bit_visualizer.py` can aid in this.

5.  **Start with Brute Force (if applicable):** If a bit manipulation solution isn't immediately obvious, think about a non-bitwise approach (e.g., using a hash map, string conversion). Then, consider how bitwise operations could optimize it, especially for space complexity (reducing to O(1)).

6.  **Discuss Time/Space Complexity:** Always analyze and discuss the time and space complexity of your solutions. Bitwise solutions often achieve O(1) space and O(log N) or O(B) time (where B is bit width), which is usually optimal.

7.  **Handle Edge Cases:**
    *   `0` (zero)
    *   `1` (one)
    *   `MAX_INT` (all ones in a fixed width)
    *   `MIN_INT` (for signed contexts, `100...00`)
    *   Negative numbers (if applicable and how they should be interpreted: two's complement, unsigned equivalent).

## Interview Tips Specific to the Project Problems

### 1. Count Set Bits (Hamming Weight)

*   **Tip:** Always consider Brian Kernighan's algorithm (`n & (n - 1)`). It's a standard optimization for this problem.
*   **Variations:**
    *   Count set bits in a range of numbers (e.g., `[0, N]`). This often involves dynamic programming or precomputation.
    *   Count total set bits in an array (sum results from `count_set_bits` for each element).
    *   Calculate Hamming Distance between two numbers (count set bits in `a ^ b`).

### 2. Power of Two

*   **Tip:** The `n > 0 and (n & (n - 1)) == 0` trick is a classic. Know *why* it works (unique set bit).
*   **Variations:**
    *   Power of Three, Power of Four: These usually don't have a simple bit manipulation trick. They typically involve a loop and division, or checking if `n` divides `3^k_max` or `4^k_max` (for 32-bit `int`). E.g., for power of 3, `n > 0 and 1162261467 % n == 0` (where 1162261467 is `3^19`, largest power of 3 within 32-bit int).
    *   Check if a number has exactly `k` set bits.

### 3. Reverse Bits

*   **Tip:** The iterative shift-and-build approach is generally sufficient. It's clear and relatively easy to implement.
*   **Variations:**
    *   Reverse a specific range of bits within a number.
    *   Swap adjacent bits (e.g., `b0` with `b1`, `b2` with `b3`, etc.).
    *   Rotate bits left/right by `k` positions.

### 4. Single Number

*   **Tip:** The XOR property (`a ^ a = 0`) is the absolute key here. Always bring this up first.
*   **Variations:**
    *   **Single Number II:** Every element appears three times except for one. (Requires counting bits at each position or using a finite state machine).
    *   **Single Number III:** Every element appears twice except for two elements. (Use XOR to get `xor_sum` of the two unique numbers, then find a differentiating bit to split the array into two groups).
    *   Find the missing number in a sequence `[0, N]` (XOR all numbers in the array with all numbers in `[0, N]`).

### 5. Insert M into N

*   **Tip:** This problem combines clearing and setting bits. It's a good test of your ability to compose masks.
*   **Variations:**
    *   Update a specific bit `k` to `0` or `1`.
    *   Set a range of bits to all `1`s or all `0`s.
    *   Check if a range of bits in `N` matches a pattern `M`.

## Common Gotchas

*   **Signed vs. Unsigned:** Python's integers are signed and of arbitrary precision. Be explicit about bit width (e.g., 32-bit) and signed/unsigned interpretation using masks (`& 0xFFFFFFFF`) when problems imply fixed-width unsigned integers.
*   **Arithmetic vs. Logical Right Shift:** Python's `>>` is an arithmetic right shift. For positive numbers, it's equivalent to a logical right shift (fills with 0s). For negative numbers, it sign-extends (fills with 1s). Be aware of this if you need logical shifts for negative numbers (e.g., `(n & 0xFFFFFFFF) >> k` to force unsigned behavior).
*   **`~` (NOT) Operator:** In Python, `~x` evaluates to `-(x+1)`. If you need a bitwise NOT for a specific bit width, you must mask it: `~x & ((1 << num_bits) - 1)`.
*   **Zero as Input:** Always check how `0` behaves with your bitwise logic. Some operations might yield unexpected results or infinite loops if not handled.
*   **Off-by-one errors:** Especially with bit positions `i` and `j`, ensure you correctly handle inclusive/exclusive ranges for masks and shifts.

By keeping these tips in mind and practicing with problems, you'll be well-prepared to tackle bit manipulation questions in interviews.