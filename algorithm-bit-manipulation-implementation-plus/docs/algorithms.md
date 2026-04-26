```markdown
# Bit Manipulation Algorithms: Detailed Explanations

This document provides a deeper dive into the algorithms used for the optimized solutions in this project, including their detailed logic, intuition, and formal complexity analysis.

---

## 1. Count Set Bits (Hamming Weight)

**Problem:** Count the number of '1' bits in an unsigned 32-bit integer.

### Approach 1: Brian Kernighan's Algorithm (`countSetBits_Kernighan`)

**Logic:**
This algorithm leverages the property that performing a bitwise AND between a number `n` and `n-1` (`n & (n-1)`) effectively turns off the least significant set bit (rightmost '1' bit) in `n`.

**Steps:**
1.  Initialize `count = 0`.
2.  While `n` is greater than 0:
    a.  Perform `n = n & (n - 1)`.
    b.  Increment `count`.
3.  Return `count`.

**Intuition & Example:**
Let's take `n = 12` (binary `1100`).

*   **Iteration 1:**
    *   `n = 12` (`1100`)
    *   `n - 1 = 11` (`1011`)
    *   `n & (n - 1)`: `1100 & 1011 = 1000` (decimal 8).
    *   `n` becomes `8`. `count` is `1`. (The rightmost '1' at position 2 (0-indexed) was turned off).

*   **Iteration 2:**
    *   `n = 8` (`1000`)
    *   `n - 1 = 7` (`0111`)
    *   `n & (n - 1)`: `1000 & 0111 = 0000` (decimal 0).
    *   `n` becomes `0`. `count` is `2`. (The rightmost '1' at position 3 was turned off).

*   `n` is now 0, loop terminates. Result: `2`. (12 has two set bits).

This works because `n - 1` flips all the bits from the rightmost '1' bit to the right (including the rightmost '1' itself) and flips that rightmost '1' bit to '0'. All bits to the left of that rightmost '1' remain unchanged. When `n & (n - 1)` is performed, all bits to the left remain unchanged (since they are identical in both `n` and `n-1`), the rightmost '1' becomes '0' (because `1 & 0 = 0`), and all bits to its right also become '0' (because they were '0' in `n` and '1' in `n-1`, so `0 & 1 = 0`).

**Time Complexity:** O(K), where K is the number of set bits in `n`. In the worst case (all bits set), K = 32 for a 32-bit integer. This is often faster than iterating through all 32 bits if `n` has few set bits.
**Space Complexity:** O(1)

### Approach 2: Repeated Right Shift (`countSetBits_Shift`)

**Logic:**
This is the most intuitive approach. It checks each bit of the number, one by one, from right to left (LSB to MSB).

**Steps:**
1.  Initialize `count = 0`.
2.  While `n` is greater than 0:
    a.  Check the least significant bit (LSB) using `n & 1`. If it's `1`, increment `count`.
    b.  Right shift `n` by 1 (`n >>= 1`) to move the next bit to the LSB position.
3.  Return `count`.

**Intuition & Example:**
Let `n = 12` (binary `1100`).

*   **Iteration 1:**
    *   `n = 12` (`1100`).
    *   `1100 & 1 = 0`. `count` is `0`.
    *   `n` becomes `0110` (decimal 6).

*   **Iteration 2:**
    *   `n = 6` (`0110`).
    *   `0110 & 1 = 0`. `count` is `0`.
    *   `n` becomes `0011` (decimal 3).

*   **Iteration 3:**
    *   `n = 3` (`0011`).
    *   `0011 & 1 = 1`. `count` is `1`.
    *   `n` becomes `0001` (decimal 1).

*   **Iteration 4:**
    *   `n = 1` (`0001`).
    *   `0001 & 1 = 1`. `count` is `2`.
    *   `n` becomes `0000` (decimal 0).

*   `n` is now 0, loop terminates. Result: `2`.

**Time Complexity:** O(B), where B is the number of bits in the integer (e.g., 32 for a `uint32_t`). It always performs 32 iterations for a 32-bit integer.
**Space Complexity:** O(1)

---

## 2. Single Number

**Problem:** Given a non-empty array of integers where every element appears twice except for one, find that single one.

### Approach 1: XOR Bitwise Operation (`singleNumber`)

**Logic:**
This solution utilizes the unique properties of the XOR (`^`) operator:
1.  **Identity:** `a ^ 0 = a`
2.  **Inverse:** `a ^ a = 0`
3.  **Commutative:** `a ^ b = b ^ a`
4.  **Associative:** `a ^ (b ^ c) = (a ^ b) ^ c`

**Steps:**
1.  Initialize a variable `result = 0`.
2.  Iterate through each number `num` in the input array:
    a.  Perform `result = result ^ num`.
3.  Return `result`.

**Intuition & Example:**
Since XOR is associative and commutative, the order of operations does not matter. If a number appears twice, its two instances will XOR with each other to become `0`. For example, `a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b`.
All pairs will cancel out, leaving only the unique number XORed with `0`, which is the unique number itself.

Let `nums = [4, 1, 2, 1, 2]`.

*   Initialize `result = 0`.
*   `result = 0 ^ 4 = 4`
*   `result = 4 ^ 1 = 5` (`0100 ^ 0001 = 0101`)
*   `result = 5 ^ 2 = 7` (`0101 ^ 0010 = 0111`)
*   `result = 7 ^ 1 = 6` (`0111 ^ 0001 = 0110`)
*   `result = 6 ^ 2 = 4` (`0110 ^ 0010 = 0100`)

Final result: `4`.

**Time Complexity:** O(N), where N is the number of elements in the array. Each element is processed once.
**Space Complexity:** O(1)

---

## 3. Reverse Bits

**Problem:** Reverse the bits of an unsigned 32-bit integer.

### Approach 1: Iterative Shifting (`reverseBits`)

**Logic:**
This method constructs the reversed number bit by bit. It iterates 32 times (once for each bit of a 32-bit integer), extracting the least significant bit (LSB) from the original number and appending it to the most significant position of the result.

**Steps:**
1.  Initialize `reversed_num = 0`.
2.  Loop 32 times (from `i = 0` to `31`):
    a.  Shift `reversed_num` one position to the left (`reversed_num <<= 1`). This makes space for the next bit from `n` at its LSB position.
    b.  Extract the LSB of `n` using `n & 1`.
    c.  OR this LSB into `reversed_num` (`reversed_num |= (n & 1)`).
    d.  Shift `n` one position to the right (`n >>= 1`) to discard the bit just processed and bring the next bit to the LSB position.
3.  Return `reversed_num`.

**Intuition & Example:**
Let `n = 0b...00011` (decimal 3). We want `0b1100...0`.

*   Initial: `n = ...0011`, `reversed_num = 0`
*   **i = 0:**
    *   `reversed_num <<= 1` (0 becomes 0)
    *   `n & 1 = 1` (LSB of `n`)
    *   `reversed_num |= 1` (reversed_num becomes 1)
    *   `n >>= 1` (n becomes `...0001`)
    *   `reversed_num` is `...0001`

*   **i = 1:**
    *   `reversed_num <<= 1` (1 becomes 2) (`...0010`)
    *   `n & 1 = 1` (LSB of `n`)
    *   `reversed_num |= 1` (reversed_num becomes 3) (`...0011`)
    *   `n >>= 1` (n becomes `...0000`)
    *   `reversed_num` is `...0011`

*   ... this continues for 30 more iterations ...

*   **i = 30:**
    *   `reversed_num <<= 1` (e.g., `...011` shifted left)
    *   `n & 1 = 0`
    *   `reversed_num |= 0`
    *   `n >>= 1`

*   **i = 31:**
    *   `reversed_num <<= 1`
    *   `n & 1 = 0`
    *   `reversed_num |= 0`
    *   `n >>= 1`
    *   After 32 iterations, the 2 LSBs of original `n` (which were 11) have been moved to the 2 MSBs of `reversed_num`.

**Time Complexity:** O(B), where B is the number of bits in the integer (32 for a `uint32_t`). The loop runs a fixed number of times.
**Space Complexity:** O(1)

---

## 4. Check if a number is a Power of Two

**Problem:** Given an integer `n`, return `true` if it is a power of two.

### Approach 1: Bitwise Property (`isPowerOfTwo`)

**Logic:**
A positive integer `n` is a power of two if and only if it has exactly one '1' bit in its binary representation. This property can be efficiently checked using the expression `n > 0 && (n & (n - 1)) == 0`.

**Steps:**
1.  Check if `n` is greater than 0. If not, it cannot be a power of two (0, negative numbers).
2.  If `n > 0`, perform the bitwise AND operation `n & (n - 1)`.
3.  If the result of `n & (n - 1)` is `0`, then `n` is a power of two. Otherwise, it is not.

**Intuition & Example:**
*   **Case 1: `n` is a power of two.**
    *   `n = 8` (binary `1000`)
    *   `n - 1 = 7` (binary `0111`)
    *   `n & (n - 1)`: `1000 & 0111 = 0000`. This is 0, so 8 is a power of two.
    *   This works because a power of two has a single '1' bit, followed by all '0's. `n-1` will have that '1' bit as '0' and all subsequent '0's as '1's. When ANDed, they all cancel out.

*   **Case 2: `n` is not a power of two (but positive).**
    *   `n = 6` (binary `0110`)
    *   `n - 1 = 5` (binary `0101`)
    *   `n & (n - 1)`: `0110 & 0101 = 0100` (decimal 4). This is not 0, so 6 is not a power of two.
    *   If a number has multiple '1' bits, `n & (n - 1)` will only turn off the rightmost '1' bit. Any '1' bits to its left will remain set, resulting in a non-zero value.

*   **Edge Case: `n = 0`**
    *   `0` is not a power of two. The `n > 0` check handles this directly.
    *   Note: If `n=0`, `n-1` might be `-1` (all bits set for signed int). `0 & (-1)` is `0`. So, the `n > 0` check is crucial.

**Time Complexity:** O(1)
**Space Complexity:** O(1)

---

## 5. Check if a number is a Power of Four

**Problem:** Given an integer `n`, return `true` if it is a power of four.

### Approach 1: Bitwise Property and Masking (`isPowerOfFour`)

**Logic:**
A number `n` is a power of four if and only if it satisfies two conditions:
1.  `n` is a power of two (i.e., it has exactly one '1' bit).
2.  The single '1' bit in `n` must be at an even position (0-indexed from the right).
    *   `4^0 = 1` (binary `...0001`) -> '1' at bit position 0 (even)
    *   `4^1 = 4` (binary `...0100`) -> '1' at bit position 2 (even)
    *   `4^2 = 16` (binary `...10000`) -> '1' at bit position 4 (even)
    *   `4^x` will always have its single '1' bit at position `2x`.

**Steps:**
1.  First, ensure `n > 0`.
2.  Check if `n` is a power of two using `(n & (n - 1)) == 0`.
3.  If both conditions above are met, then check the position of the single '1' bit. This can be done by ANDing `n` with a specific bitmask.
    *   The mask `0x55555555` (binary `01010101...0101`) has '1's at all even bit positions (0, 2, 4, ..., 30) and '0's at all odd bit positions.
    *   If `n` is a power of two and its single '1' bit is at an even position, then `n & 0x55555555` will be equal to `n` (which is non-zero).
    *   If `n` is a power of two but its single '1' bit is at an *odd* position (e.g., `2` (`0010`), `8` (`1000`), `32` (`100000`)), then `n & 0x55555555` will be `0`. These are powers of two but not powers of four.

**Combined condition:** `(n > 0) && ((n & (n - 1)) == 0) && ((n & 0x55555555) != 0)`

**Intuition & Example:**
*   `n = 64` (binary `01000000`)
    *   `n > 0` is true.
    *   `n & (n - 1)`: `01000000 & 00111111 = 0`. So, 64 is a power of two.
    *   `n & 0x55555555`: `01000000 & 01010101...0101 = 01000000` (which is 64). Since this is not 0, the single '1' bit is at an even position (bit 6).
    *   All conditions true, so 64 is a power of four.

*   `n = 8` (binary `001000`)
    *   `n > 0` is true.
    *   `n & (n - 1)`: `001000 & 000111 = 0`. So, 8 is a power of two.
    *   `n & 0x55555555`: `001000 & 01010101...0101 = 0`. Since this is 0, the single '1' bit is at an odd position (bit 3).
    *   Not all conditions true, so 8 is NOT a power of four.

**Time Complexity:** O(1)
**Space Complexity:** O(1)
```