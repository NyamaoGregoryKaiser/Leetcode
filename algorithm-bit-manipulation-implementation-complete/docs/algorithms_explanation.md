```markdown
# Bit Manipulation: Algorithm Explanations and Visualizations

This document provides in-depth explanations for the bit manipulation algorithms implemented in `src/main_algorithms.py`, complete with ASCII diagrams to visualize the bitwise operations.

## Table of Contents
1.  [Introduction to Bitwise Operators](#introduction-to-bitwise-operators)
2.  [Problem 1: Count Set Bits (Hamming Weight)](#problem-1-count-set-bits-hamming-weight)
    *   [Approach: Brian Kernighan's Algorithm](#approach-brian-kernighans-algorithm)
3.  [Problem 2: Check if a Number is a Power of Two](#problem-2-check-if-a-number-is-a-power-of-two)
    *   [Approach: Bitwise `n & (n-1)`](#approach-bitwise-n--n-1)
4.  [Problem 3: Reverse Bits](#problem-3-reverse-bits)
    *   [Approach: Iterative Bit Extraction and Placement](#approach-iterative-bit-extraction-and-placement)
5.  [Problem 4: Find the Single Number](#problem-4-find-the-single-number)
    *   [Approach: XOR Property](#approach-xor-property)
6.  [Problem 5: Bitwise Insertion (`N`, `M`, `i`, `j`)](#problem-5-bitwise-insertion-n-m-i-j)
    *   [Approach: Masking and Shifting](#approach-masking-and-shifting)

---

## 1. Introduction to Bitwise Operators

Bitwise operators work on the individual bits of numbers. In Python, these operators are:

*   `&` (AND): Returns 1 if both bits are 1, else 0.
*   `|` (OR): Returns 1 if at least one bit is 1, else 0.
*   `^` (XOR): Returns 1 if bits are different, else 0.
*   `~` (NOT): Inverts all bits (unary operator). In Python, this is `-(x + 1)` due to two's complement representation.
*   `<<` (Left Shift): Shifts bits to the left, filling with 0s on the right. Equivalent to multiplying by powers of 2.
*   `>>` (Right Shift): Shifts bits to the right. For positive numbers, fills with 0s on the left. For negative numbers, Python's `>>` performs an arithmetic right shift (fills with 1s) to preserve the sign. Equivalent to integer division by powers of 2.

## 2. Problem 1: Count Set Bits (Hamming Weight)

### Approach: Brian Kernighan's Algorithm

This algorithm is based on the observation that for any number `n`, `n & (n - 1)` unsets the least significant set bit (rightmost '1' bit) in `n`. We can repeatedly apply this operation until `n` becomes 0, counting how many times we perform the operation.

**Example: `n = 12` (binary `0b1100`)**

1.  **Initial:** `n = 12` (0b1100), `count = 0`

2.  **Iteration 1:**
    *   `n = 12` (0b1100)
    *   `n - 1 = 11` (0b1011)
    *   `n & (n - 1)`:
        ```
          0b1100  (n)
        & 0b1011  (n - 1)
        --------
          0b1000  (result = 8)
        ```
    *   `n` becomes `8`. `count` becomes `1`.

3.  **Iteration 2:**
    *   `n = 8` (0b1000)
    *   `n - 1 = 7` (0b0111)
    *   `n & (n - 1)`:
        ```
          0b1000  (n)
        & 0b0111  (n - 1)
        --------
          0b0000  (result = 0)
        ```
    *   `n` becomes `0`. `count` becomes `2`.

4.  **Loop ends:** `n` is `0`.

**Result:** The number of set bits is `2`. (Correct for 0b1100)

**Time Complexity:** O(k), where k is the number of set bits. This is faster than O(log N) (iterative right shift) when the number has few set bits.
**Space Complexity:** O(1)

## 3. Problem 2: Check if a Number is a Power of Two

### Approach: Bitwise `n & (n-1)`

A positive integer `n` is a power of two if and only if its binary representation has exactly one '1' bit.
For example:
*   `1` (0b0001)
*   `2` (0b0010)
*   `4` (0b0100)
*   `8` (0b1000)

If `n` has only one '1' bit, then `n - 1` will have all bits to the right of that '1' flipped to '1's, and that '1' bit itself flipped to '0'.

**Example: `n = 8` (binary `0b1000`)**

1.  `n = 8` (0b1000)
2.  `n - 1 = 7` (0b0111)
3.  `n & (n - 1)`:
    ```
      0b1000  (n)
    & 0b0111  (n - 1)
    --------
      0b0000  (result = 0)
    ```
    Since the result is `0`, and `n` is positive, `8` is a power of two.

**Example: `n = 6` (binary `0b0110`)**

1.  `n = 6` (0b0110)
2.  `n - 1 = 5` (0b0101)
3.  `n & (n - 1)`:
    ```
      0b0110  (n)
    & 0b0101  (n - 1)
    --------
      0b0100  (result = 4)
    ```
    Since the result is `4` (not `0`), `6` is not a power of two.

**Crucial edge case:** `n > 0` must be checked. `0` is not a power of two, but `0 & (0 - 1)` is `0 & (-1)` which evaluates to `0`. So `n > 0` is essential.

**Time Complexity:** O(1)
**Space Complexity:** O(1)

## 4. Problem 3: Reverse Bits

### Approach: Iterative Bit Extraction and Placement

This approach constructs the reversed number bit by bit. For each bit in the original number `n`, we extract it and place it into the appropriate position in the `reversed_n`.

Let's assume `num_bits = 8` for simplicity.
**Example: `n = 0b10110010` (178)**

1.  **Initial:** `reversed_n = 0`

2.  **Loop `i` from 0 to `num_bits - 1` (0 to 7):**

    *   **`i = 0` (LSB of `n`):**
        *   `bit = (n >> 0) & 1 = (0b10110010 >> 0) & 1 = 0b10110010 & 1 = 0`
        *   `reversed_n |= (bit << (8 - 1 - 0)) = 0 | (0 << 7) = 0b00000000`
        *   `reversed_n` is `0b00000000`

    *   **`i = 1`:**
        *   `bit = (n >> 1) & 1 = (0b01011001 >> 0) & 1 = 0b01011001 & 1 = 1`
        *   `reversed_n |= (bit << (8 - 1 - 1)) = 0 | (1 << 6) = 0b01000000`
        *   `reversed_n` is `0b01000000`

    *   **`i = 2`:**
        *   `bit = (n >> 2) & 1 = (0b00101100 >> 0) & 1 = 0b00101100 & 1 = 0`
        *   `reversed_n |= (bit << (8 - 1 - 2)) = 0b01000000 | (0 << 5) = 0b01000000`
        *   `reversed_n` is `0b01000000`

    *   ... (continue for `i = 3` to `7`)

    *   **`i = 7` (MSB of `n`):**
        *   `bit = (n >> 7) & 1 = (0b00000001 >> 0) & 1 = 0b00000001 & 1 = 1`
        *   `reversed_n |= (bit << (8 - 1 - 7)) = reversed_n | (1 << 0)`
        *   If `reversed_n` was `0b01001101`, now it becomes `0b01001101 | 0b00000001 = 0b01001101`.
            (Example value for `reversed_n` at this point is just for illustration, real value builds up)

**Let's retrace the full example: `n = 0b10110010` (178) `num_bits=8`**

```
n        = 10110010
reversed = 00000000

i=0: extract bit 0 (0), shift to bit 7. reversed = 00000000
i=1: extract bit 1 (1), shift to bit 6. reversed = 01000000
i=2: extract bit 2 (0), shift to bit 5. reversed = 01000000
i=3: extract bit 3 (0), shift to bit 4. reversed = 01000000
i=4: extract bit 4 (1), shift to bit 3. reversed = 01001000
i=5: extract bit 5 (1), shift to bit 2. reversed = 01001100
i=6: extract bit 6 (0), shift to bit 1. reversed = 01001100
i=7: extract bit 7 (1), shift to bit 0. reversed = 01001101

Final reversed_n = 0b01001101 (77)
```
Original `n`: `10110010`
Reversed:     `01001101`

**Time Complexity:** O(num_bits)
**Space Complexity:** O(1)

## 5. Problem 4: Find the Single Number

### Approach: XOR Property

The XOR operator (`^`) has properties that make it ideal for this problem:
*   **Identity:** `x ^ 0 = x`
*   **Inverse:** `x ^ x = 0`
*   **Commutativity:** `x ^ y = y ^ x`
*   **Associativity:** `x ^ (y ^ z) = (x ^ y) ^ z`

If we XOR all numbers in the array, any number that appears twice will cancel itself out (`x ^ x = 0`). The unique number, XORed with `0`, will remain.

**Example: `nums = [4, 1, 2, 1, 2]`**

1.  **Initial:** `single = 0`

2.  **Process `4`:**
    *   `single = 0 ^ 4 = 4`
    *   Binary: `0b000 ^ 0b100 = 0b100`

3.  **Process `1`:**
    *   `single = 4 ^ 1 = 5`
    *   Binary: `0b100 ^ 0b001 = 0b101`

4.  **Process `2`:**
    *   `single = 5 ^ 2 = 7`
    *   Binary: `0b101 ^ 0b010 = 0b111`

5.  **Process `1`:**
    *   `single = 7 ^ 1 = 6`
    *   Binary: `0b111 ^ 0b001 = 0b110`
    *   (Notice the `1`s cancelled: `0b001 ^ 0b001` becomes `0b000` in that position relative to previous XOR sum)

6.  **Process `2`:**
    *   `single = 6 ^ 2 = 4`
    *   Binary: `0b110 ^ 0b010 = 0b100`
    *   (Notice the `2`s cancelled: `0b010 ^ 0b010` becomes `0b000` in that position relative to previous XOR sum)

**Result:** `single = 4`

**Time Complexity:** O(N), where N is the number of elements in the array.
**Space Complexity:** O(1)

## 6. Problem 5: Bitwise Insertion (`N`, `M`, `i`, `j`)

### Approach: Masking and Shifting

This problem requires precise manipulation of specific bit ranges. We'll use two main steps:
1.  **Clear the target bits in `N`:** Create a mask that has zeros in the range `[i, j]` and ones everywhere else. AND this mask with `N`.
2.  **Shift `M` and insert:** Shift `M` to the left by `i` positions so its least significant bit aligns with `i`. Then, OR this shifted `M` with the cleared `N`.

**Example:**
*   `N = 0b10000000000` (1024)
*   `M = 0b10011` (19)
*   `i = 2`, `j = 6` (assuming 11 bits for visualization)

**Step 1: Create a mask to clear bits `[i, j]` in `N`.**
We need a mask like `...1110000011...` where the `0`s are in positions `j` down to `i`.

*   **Part A: Left mask (1s from MSB down to `j+1`, 0s from `j` downwards)**
    *   `1 << (j + 1)`: creates `1` at position `j+1` (7 in our example), followed by `0`s.
        `0b10000000` (for j=6)
    *   `((1 << (j + 1)) - 1)`: creates `1`s from `j` down to `0`.
        `0b01111111`
    *   `left_mask = ~((1 << (j + 1)) - 1)`: Inverts. Creates `1`s from `j+1` upwards, `0`s from `j` downwards.
        ```
          ...11111111111111111111111111111111  (~0, all 1s assuming 32-bit context)
        - 00000000000000000000000001111111  ((1 << (j+1)) - 1)
        ------------------------------------
          ...1111111111111111111110000000  (left_mask = 0b...11111111110000000)
        ```
        For an 11-bit view: `0b11111000000`

*   **Part B: Right mask (1s from `i-1` down to `0`, 0s from `i` upwards)**
    *   `((1 << i) - 1)`: creates `1`s from `i-1` down to `0`.
        ```
          00000000000000000000000000000100  (1 << i, for i=2)
        - 00000000000000000000000000000001
        ------------------------------------
          00000000000000000000000000000011  (right_mask = 0b...000000000011)
        ```
        For an 11-bit view: `0b00000000011`

*   **Combine masks:** `clear_mask = left_mask | right_mask`
    ```
      0b11111000000  (left_mask)
    | 0b00000000011  (right_mask)
    ----------------
      0b11111000011  (clear_mask)
    ```

*   **Clear bits in N:** `N_cleared = N & clear_mask`
    ```
          0b10000000000  (N)
        & 0b11111000011  (clear_mask)
        ----------------
          0b10000000000  (N_cleared)
    ```
    (In this specific example, N already had zeros in the range [i,j], so it remains unchanged)

**Step 2: Shift `M` and insert.**

*   **Shift `M`:** `M_shifted = M << i`
    *   `M = 0b10011`
    *   `i = 2`
    *   `M_shifted = 0b10011 << 2 = 0b1001100`

*   **Insert `M_shifted` into `N_cleared`:** `result = N_cleared | M_shifted`
    ```
          0b10000000000  (N_cleared)
        | 0b00001001100  (M_shifted)
        ----------------
          0b10001001100  (result = 1092)
    ```

**Final Result:** `0b10001001100`

**Time Complexity:** O(1)
**Space Complexity:** O(1)
```