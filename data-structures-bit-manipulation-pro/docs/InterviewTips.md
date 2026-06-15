# Bit Manipulation Interview Tips

Bit manipulation problems are common in technical interviews, especially for roles requiring low-level understanding or performance optimization. They test your ability to think critically about data representation and leverage hardware-level operations.

## General Advice

1.  **Understand the Basics:** Be fluent with `&`, `|`, `^`, `~`, `<<`, `>>`. Know their truth tables and effects.
2.  **Binary Representation:** Practice converting between decimal and binary. Mentally visualize numbers in binary.
3.  **Edge Cases:** Always consider `0`, `1`, `INT_MAX`, `INT_MIN` (for signed), `0xFFFFFFFF` (for unsigned all-ones), and powers of 2.
4.  **Immutability vs. Modification:** Decide if you need to modify the original number or return a new one. `uint32_t` is often preferred for problems where negative values or sign extension isn't a concern, as it simplifies right shifts.
5.  **Think Systematically:** When manipulating specific bits/ranges, break it down:
    *   Identify the target bit(s).
    *   Create a mask to isolate or clear those bits.
    *   Perform the operation (AND, OR, XOR, shifts).
6.  **"Magic" Numbers:** While `n & (n-1)` might seem like magic, understand *why* it works. Explain the logic clearly.
7.  **Practice:** Bit manipulation is a skill that improves significantly with practice.

## Common Bit Manipulation Patterns & Tricks

Here are some frequently used patterns:

*   **Checking if a bit is set at position `k`:**
    *   `bool is_set = (num >> k) & 1;`
    *   `bool is_set = (num & (1 << k)) != 0;`

*   **Setting a bit at position `k`:**
    *   `num |= (1 << k);`

*   **Clearing a bit at position `k`:**
    *   `num &= ~(1 << k);`

*   **Toggling a bit at position `k`:**
    *   `num ^= (1 << k);`

*   **Clearing bits from MSB to `k` (inclusive):**
    *   `num &= ((1 << k) - 1);` (Creates a mask like `00...0111...1` where `k` ones are on the right)
    *   Alternative: `num & (~((~0) << k));`

*   **Clearing bits from `k` to LSB (inclusive):**
    *   `num &= (~0 << k);` (Creates a mask like `11...1000...0` where `k` zeros are on the right)

*   **`n & (n - 1)`:** Clears the least significant set bit (rightmost '1').
    *   Used in: `countSetBitsKernighan`, `isPowerOfTwo`.

*   **`n & (~n + 1)` or `n & (-n)`:** Isolates the least significant set bit. (For example, if `n=12 (1100)`, `-n` in 2's complement is `(~n + 1)` which is `0011 + 1 = 0100`. `1100 & 0100 = 0100`, which is the LSB).
    *   Useful for iterating through set bits one by one by repeatedly clearing the LSB, then isolating the *next* LSB.

*   **`num ^ (1 << k)`:** Toggles the `k`-th bit.

*   **Swapping two numbers without a temporary variable:**
    *   `a = a ^ b;`
    *   `b = a ^ b;` (which is `(a^b)^b = a`)
    *   `a = a ^ b;` (which is `(a^b)^a = b`)
    *   **Caution:** Don't use if `a` and `b` refer to the same memory location (e.g., `arr[i]` and `arr[j]` where `i==j`).

## Interview Tips and Variations

1.  **Explain Your Thought Process:** Don't just jump to the bitwise solution. Start with a brute-force or more intuitive approach, then explain how you'd optimize it using bit manipulation. This shows your problem-solving journey.
2.  **Clearly State Assumptions:** If the problem implies 32-bit integers, confirm this. If `int` could be negative, clarify its behavior with right shifts.
3.  **Discuss Time and Space Complexity:** This is critical for every solution. Bit manipulation often leads to O(1) space and O(1) or O(log N) time complexities.
4.  **Know When to Stop:** Not every problem benefits from bit manipulation. Sometimes a simple arithmetic solution is clearer and just as efficient.
5.  **Variations of Covered Problems:**

    *   **Count Set Bits:**
        *   Count set bits within a given range `[L, R]`.
        *   Count total set bits for all numbers from `1` to `N`.
        *   Find number with max/min set bits in an array.
        *   Parity check (odd or even number of set bits).

    *   **Power of Two:**
        *   Power of four/eight (similar bitwise patterns).
        *   Check if a number is a power of *any* integer (e.g., is 8 a power of 2? is 9 a power of 3?).
        *   Find the next/previous power of two.

    *   **Single Number:**
        *   Find the unique number if all others appear *three* times (requires a more complex bit counting approach per bit position).
        *   Find two unique numbers if all others appear twice.

    *   **Reverse Bits:**
        *   Reverse bytes instead of bits.
        *   Reverse specific range of bits.
        *   Check if a number is a palindrome in binary.

    *   **Insert M into N:**
        *   Insert a value into a specific position, but `M` might not fit. Handle overflow or truncation.
        *   Delete a range of bits.
        *   Update a range of bits.

6.  **Look for Bitwise Properties:**
    *   **XOR:** Useful for finding differences, swapping, identifying unique elements (like `singleNumber`).
    *   **AND:** Masking, checking individual bits. `A & B` can test if `B` is a submask of `A`.
    *   **OR:** Setting bits, combining masks.
    *   **NOT:** Flipping bits, creating masks.

By understanding these concepts and practicing diligently, you'll be well-prepared to tackle bit manipulation problems in your interviews.
---