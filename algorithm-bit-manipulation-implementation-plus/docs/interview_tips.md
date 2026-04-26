```markdown
# Bit Manipulation Interview Tips & Variations

Bit manipulation questions often test a candidate's understanding of low-level data representation and their ability to think creatively with bitwise operators. Here are some tips, common pitfalls, and variations for the problems covered in this project.

---

## General Bit Manipulation Interview Tips

1.  **Understand the Operators:**
    *   `&` (AND): Checks if a bit is set. `num & (1 << i)`
    *   `|` (OR): Sets a bit. `num | (1 << i)`
    *   `^` (XOR): Flips a bit, or finds the unique element. `num ^ (1 << i)` (flips bit `i`), `A ^ A = 0`
    *   `~` (NOT): Flips all bits. `~num`
    *   `<<` (Left Shift): Multiplies by powers of 2. `num << k` is `num * 2^k`
    *   `>>` (Right Shift): Divides by powers of 2. `num >> k` is `num / 2^k` (for unsigned or non-negative signed). Be careful with negative signed numbers (`arithmetic shift` vs `logical shift`). C++ `>>` for signed is implementation-defined for negative numbers prior to C++20, but typically arithmetic shift is used (sign bit is propagated). For unsigned, it's always logical.
    *   `% 2` and `/ 2` vs `& 1` and `>> 1`: Bitwise operations are generally faster and more explicit for binary processing.

2.  **Think in Binary:** When given a problem, immediately consider what the numbers look like in binary. Draw them out if necessary.

3.  **Powers of Two:** Numbers like `2^k` (`1`, `2`, `4`, `8`, `16`, ...) have a very distinct pattern: a single `1` bit followed by all `0`s. This is crucial for many optimizations.

4.  **Edge Cases:** Always consider:
    *   `0`
    *   `1`
    *   `std::numeric_limits<uint32_t>::max()` (all 1s)
    *   Small numbers
    *   Negative numbers (if applicable, be aware of two's complement representation and signed/unsigned behavior)

5.  **Use Unsigned Integers for Pure Bit Manipulation:** If you're strictly working with bit patterns and not numerical value interpretation that requires a sign, `unsigned int` or `uint32_t` is generally safer to avoid issues with sign extension during right shifts or the interpretation of the most significant bit.

6.  **De Morgan's Laws for Bits:** `~(A & B) = (~A | ~B)` and `~(A | B) = (~A & ~B)`. Sometimes useful for forming masks.

7.  **Common Bit Manipulation Patterns:**
    *   Isolate LSB: `n & (-n)` (for two's complement, `-n` is `~n + 1`)
    *   Turn off LSB: `n & (n - 1)` (Brian Kernighan's algorithm)
    *   Turn on LSB: `n | (n + 1)` (if LSB is 0)
    *   Check `i`-th bit: `(n >> i) & 1`
    *   Set `i`-th bit: `n | (1 << i)`
    *   Clear `i`-th bit: `n & (~(1 << i))`
    *   Toggle `i`-th bit: `n ^ (1 << i)`

---

## Problem-Specific Interview Tips & Variations

### 1. Count Set Bits (Hamming Weight)

*   **Edge Cases:** `n = 0` (0 set bits), `n = 1` (1 set bit), `n = MAX_UINT` (32 set bits).
*   **Variations:**
    *   Count set bits in a specific range of bits (e.g., bits 5-10).
    *   Calculate Hamming Distance between two numbers (number of differing bits): `countSetBits(A ^ B)`.
    *   Find the next number with the same number of set bits.
    *   How would you optimize for multiple queries on different numbers (e.g., a lookup table precomputation for bytes/nibbles)?
*   **Discussion Points:**
    *   Compare Kernighan's (O(K)) vs. simple shift (O(B)) vs. lookup table (O(B/byte_size)).
    *   Mention `__builtin_popcount` (GCC/Clang) for competitive programming and production, but be prepared to implement from scratch.

### 2. Single Number

*   **Edge Cases:** Array with one element. Array with `0`. Array with negative numbers.
*   **Variations:**
    *   **"Single Number II"**: Every element appears *three* times except for one. (Requires counting bits at each position, modulo 3).
    *   **"Single Number III"**: Two elements appear once, all others appear twice. (Requires finding `XOR_sum = A ^ B`, then isolating a set bit in `XOR_sum` to partition the array).
    *   Find missing number in a range `[0, N]`: XOR all numbers in the range `0...N` with all numbers in the array.
*   **Discussion Points:**
    *   Emphasize constant space and linear time. Hash map is an alternative but uses O(N) space.
    *   Explain the XOR properties clearly.

### 3. Reverse Bits

*   **Edge Cases:** `n = 0`, `n = 1`, `n = 0x80000000` (MSB set), numbers with alternating bits (`0xAAAAAAAA`, `0x55555555`).
*   **Variations:**
    *   Reverse bits of a byte, a 16-bit integer, etc.
    *   Reverse only a specific range of bits.
    *   Check if a number is a palindrome in binary.
    *   Could you optimize further by swapping bytes/nibbles, then bits within? (More complex but faster for large fixed-size types, e.g., 64-bit).
*   **Discussion Points:**
    *   Explain the process of shifting `reversed_num` left and `n` right.
    *   Mention `std::reverse(begin, end)` for `std::bitset` if it were a string/vector of bits, but it's not applicable directly to raw integers.

### 4. Check if a number is a Power of Two

*   **Edge Cases:** `n = 0` (false), `n = 1` (true, `2^0`), negative numbers (false).
*   **Variations:**
    *   Find the next power of two greater than `n`.
    *   Find the previous power of two less than `n`.
    *   Round up/down to the nearest power of two.
    *   Check if `n` is a power of `k` (where `k` is not 2, 4, etc. - generally requires logarithms or repeated division).
*   **Discussion Points:**
    *   Clearly explain why `n & (n - 1) == 0` works (single set bit).
    *   The `n > 0` condition is critical.

### 5. Check if a number is a Power of Four

*   **Edge Cases:** `n = 0`, `n = 1`, `n = 2` (power of two but not four), `n = 8` (power of two but not four), negative numbers.
*   **Variations:**
    *   Check if a number is a power of `k` (for general `k`). This typically involves `log_k(n)` or repeated division, which are usually slower than bitwise tricks.
    *   Check if a number is a power of `8` (can extend the mask concept: `0x11111111` for bits 0, 3, 6, 9...).
*   **Discussion Points:**
    *   Break down the logic: it must be a power of two, AND its single set bit must be at an even position.
    *   Explain the `0x55555555` mask and why it's used.
    *   Compare to `isPowerOfTwo`.

---

By being prepared for these points, you can demonstrate a deep understanding of bit manipulation and problem-solving skills in a coding interview. Good luck!
```