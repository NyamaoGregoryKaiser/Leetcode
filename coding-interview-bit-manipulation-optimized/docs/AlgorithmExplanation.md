```markdown
# Bit Manipulation Algorithms Explanation

Bit manipulation involves operating on integers at the bit level. It's a powerful technique for optimizing performance, solving certain problems efficiently, and understanding low-level computing. This document explains the core concepts and the algorithms used in this project.

## Core Bitwise Operations

Before diving into problems, let's recap the fundamental bitwise operators in Java:

| Operator | Name                  | Description                                                                 | Example           | Result (decimal) | Result (binary)   |
| :------- | :-------------------- | :-------------------------------------------------------------------------- | :---------------- | :--------------- | :---------------- |
| `&`      | Bitwise AND           | Sets each bit to 1 if both corresponding bits are 1.                        | `5 & 3`           | `1`              | `0101 & 0011 = 0001` |
| `|`      | Bitwise OR            | Sets each bit to 1 if at least one of the corresponding bits is 1.          | `5 | 3`           | `7`              | `0101 | 0011 = 0111` |
| `^`      | Bitwise XOR           | Sets each bit to 1 if only one of the corresponding bits is 1 (exclusive).  | `5 ^ 3`           | `6`              | `0101 ^ 0011 = 0110` |
| `~`      | Bitwise NOT (Complement)| Inverts all bits (0 becomes 1, 1 becomes 0). Operates on a single operand. | `~5`              | `-6`             | `~0000...0101 = 1111...1010` (two's complement) |
| `<<`     | Left Shift            | Shifts bits to the left, filling new bits on the right with 0s.             | `5 << 1`          | `10`             | `0101 << 1 = 1010` |
| `>>`     | Signed Right Shift    | Shifts bits to the right, filling new bits on the left with the sign bit.   | `5 >> 1`          | `2`              | `0101 >> 1 = 0010` |
| `>>>`    | Unsigned Right Shift  | Shifts bits to the right, filling new bits on the left with 0s (always).    | `-5 >>> 1`        | `2147483645`     | `1111...1011 >>> 1 = 0111...1101` |

## Problem 1: Count Set Bits (Hamming Weight)

**Problem:** Count the number of '1' bits in a 32-bit unsigned integer.

### Approach 1: Iterative (Check each bit)

*   **Logic:** Loop 32 times. In each iteration, check the Least Significant Bit (LSB) using `n & 1`. If it's 1, increment count. Then right-shift `n` by one position using `n >>>= 1` to move the next bit to the LSB.
*   **Why `>>>`?**: For `unsigned` integers, `>>>` (unsigned right shift) ensures that the leftmost bit is always filled with 0, regardless of the original number's sign. If `n` is negative in Java's signed `int` representation (but represents a large unsigned number), `>>` would preserve the sign bit (filling with 1s), which is incorrect for counting set bits in an unsigned context.
*   **Complexity:**
    *   Time: O(k) where k is the number of bits (32 for `int`). Effectively O(1).
    *   Space: O(1)

### Approach 2: Brian Kernighan's Algorithm

*   **Logic:** This is an elegant trick. The operation `n & (n - 1)` unsets the least significant set bit (the rightmost '1' bit) in `n`. By repeatedly applying this operation until `n` becomes 0, you count how many set bits were originally present.
    *   Example: `n = 12` (binary `1100`)
        1.  `n = 1100`, `n-1 = 1011`. `n & (n-1) = 1000`. Count = 1.
        2.  `n = 1000`, `n-1 = 0111`. `n & (n-1) = 0000`. Count = 2.
        3.  `n = 0`. Loop ends. Total count = 2.
*   **Complexity:**
    *   Time: O(S) where S is the number of set bits. In the worst case (32 bits set), it's O(32), effectively O(1). This is often faster than the iterative approach if numbers have few set bits.
    *   Space: O(1)

### Approach 3: Lookup Table

*   **Logic:** Precompute the number of set bits for all possible 8-bit numbers (0-255). Store these counts in an array (lookup table). For a 32-bit integer, divide it into four 8-bit chunks, and sum the precomputed counts for each chunk.
    *   `n = (byte3 << 24) | (byte2 << 16) | (byte1 << 8) | byte0`
    *   `count = table[byte0] + table[byte1] + table[byte2] + table[byte3]`
*   **Why `& 0xFF`?:** When you extract a byte using `(n >>> 8)`, it's still an `int`. Applying `& 0xFF` ensures you only consider the last 8 bits, treating it as an unsigned byte value (0-255) for lookup, preventing issues if the 8-bit chunk's most significant bit was 1 (which would make it a negative `byte` if cast directly).
*   **Complexity:**
    *   Time: O(1) for each call after initial O(2^8 * 8) precomputation. Highly efficient for repeated calls.
    *   Space: O(2^8) for the lookup table.

### Approach 4: Built-in Function (`Integer.bitCount`)

*   **Logic:** Java (and many other languages) provides a built-in function `Integer.bitCount(int n)`. This is usually implemented using highly optimized hardware instructions (like `POPCNT` on x86 processors), making it the fastest option.
*   **Complexity:**
    *   Time: O(1) (hardware-optimized).
    *   Space: O(1)

## Problem 2: Single Number

**Problem:** Find the single element in an array where all other elements appear exactly twice.

### Approach 1: XOR Operation (Optimal)

*   **Logic:** The XOR operator (`^`) has properties crucial for this problem:
    1.  `x ^ 0 = x` (Identity property)
    2.  `x ^ x = 0` (Self-inverse property)
    3.  `x ^ y ^ x = (x ^ x) ^ y = 0 ^ y = y` (Commutative and associative)
    By XORing all numbers in the array, any number appearing twice will cancel itself out (`x ^ x = 0`), leaving only the number that appears once.
*   **Example:** `[4, 1, 2, 1, 2]`
    *   `0 ^ 4 = 4`
    *   `4 ^ 1 = 5`
    *   `5 ^ 2 = 7`
    *   `7 ^ 1 = 6`
    *   `6 ^ 2 = 4`
*   **Complexity:**
    *   Time: O(n) - Single pass through the array.
    *   Space: O(1) - Extremely memory efficient.

### Approach 2: Using a HashSet

*   **Logic:** Maintain a `HashSet`. Iterate through the array:
    *   If a number is not in the set, add it.
    *   If a number is already in the set, remove it (it means this is its second occurrence).
    At the end, the only number remaining in the set will be the single one that appeared once.
*   **Complexity:**
    *   Time: O(n) on average (HashSet operations are O(1) average).
    *   Space: O(n) in the worst case (if the single number is at the end, the set might hold `n/2 + 1` elements). This violates the "without extra memory" constraint.

### Approach 3: Using a HashMap

*   **Logic:** Use a `HashMap` to store the frequency of each number. Iterate through the array, populating the map (number -> count). After counting, iterate through the map's entries and find the key with a value of 1.
*   **Complexity:**
    *   Time: O(n) (one pass to populate map, one pass to find result).
    *   Space: O(n) in the worst case (stores all unique elements, similar to HashSet). Also violates the "without extra memory" constraint.

## Problem 3: Power of Two

**Problem:** Determine if a given integer `n` is a power of two.

### Approach 1: Iterative Division

*   **Logic:**
    1.  Powers of two are always positive. So, if `n <= 0`, return `false`.
    2.  If `n` is a power of two, it must be repeatedly divisible by 2 until it becomes 1. Loop while `n` is even (`n % 2 == 0`) and divide `n` by 2.
    3.  After the loop, if `n` is 1, it was a power of two. Otherwise, `n` had an odd factor other than 1, or it was 0 initially.
*   **Complexity:**
    *   Time: O(log n) - Number of divisions is proportional to `log2(n)`.
    *   Space: O(1)

### Approach 2: Bitwise AND (`n & (n - 1)`) (Optimal)

*   **Logic:** A positive integer `n` is a power of two if and only if it has exactly one '1' bit in its binary representation.
    *   If `n` has a single '1' bit (e.g., `10000` which is 16), then `n - 1` will have all '1's from that bit position to the right (e.g., `01111` which is 15).
    *   Performing `n & (n - 1)` will always result in 0 if `n` is a power of two.
    *   Example: `n = 16 (10000_2)`
        *   `n - 1 = 15 (01111_2)`
        *   `n & (n - 1) = 10000_2 & 01111_2 = 00000_2 = 0`
    *   Crucially, remember to handle `n <= 0` separately, as `0 & (-1)` is `0`, but `0` is not a power of two.
*   **Complexity:**
    *   Time: O(1)
    *   Space: O(1)

### Approach 3: Check for single set bit (`Integer.bitCount`)

*   **Logic:** Similar to the previous bitwise approach, if `n` is a power of two, it must be positive and have exactly one set bit. The `Integer.bitCount()` method directly tells you the number of set bits.
*   **Complexity:**
    *   Time: O(1) (hardware-optimized `bitCount`).
    *   Space: O(1)

## Problem 4: Reverse Bits

**Problem:** Reverse the bits of a 32-bit unsigned integer.

### Approach 1: Iterative Bit Shifting (Optimal for single calls)

*   **Logic:** Initialize a `reversed` integer to 0. Loop 32 times:
    1.  Left-shift `reversed` by 1 bit to make space for the next bit from `n`.
    2.  Extract the LSB of `n` using `(n & 1)`.
    3.  OR this LSB into `reversed`.
    4.  Right-shift `n` by 1 bit using `n >>>= 1` to process the next bit.
*   **Why `>>>`?:** As with counting set bits, for "unsigned" integer behavior, `n >>>= 1` (unsigned right shift) is essential to fill the most significant bit with 0, not the sign bit.
*   **Example:** `n = 11` (binary `0...01011`)
    *   `reversed = 0`
    *   `i=0`: `reversed = (0 << 1) | (11 & 1) = 1`. `n = 11 >>> 1 = 5` (binary `0...00101`)
    *   `i=1`: `reversed = (1 << 1) | (5 & 1) = 3` (binary `0...00011`). `n = 5 >>> 1 = 2` (binary `0...00010`)
    *   `i=2`: `reversed = (3 << 1) | (2 & 1) = 6` (binary `0...00110`). `n = 2 >>> 1 = 1` (binary `0...00001`)
    *   `i=3`: `reversed = (6 << 1) | (1 & 1) = 13` (binary `0...01101`). `n = 1 >>> 1 = 0` (binary `0...00000`)
    *   ... (continue for 28 more iterations, filling `reversed` with 0s)
    *   Final: `reversed` will have the reversed bits of `11`.
*   **Complexity:**
    *   Time: O(k) where k is the number of bits (32). Effectively O(1).
    *   Space: O(1)

### Approach 2: Byte-wise Reversal with Precomputation/Lookup Table

*   **Logic:** Similar to `CountSetBits`, precompute the reversed form of all 256 possible 8-bit numbers into a lookup table. Then, for a 32-bit number, extract its four 8-bit bytes. Reverse each byte using the table. Finally, reassemble these reversed bytes into the 32-bit result, but in reverse order: the original LSB byte becomes the new MSB byte, the second LSB byte becomes the second MSB byte, and so on.
    *   `n = AABBCCDD` (AA is MSB byte, DD is LSB byte)
    *   `rev(n) = rev(DD) << 24 | rev(CC) << 16 | rev(BB) << 8 | rev(AA)`
*   **Complexity:**
    *   Time: O(1) for each call after initial O(2^8 * 8) precomputation. This can be faster than iterative for very frequent calls.
    *   Space: O(2^8) for the lookup table.

---
```