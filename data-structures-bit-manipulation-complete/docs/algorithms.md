# Bit Manipulation Algorithms Explained

This document provides detailed explanations for the algorithms implemented in the `src/` directory, focusing on the core bitwise operations and properties used.

## 1. Core Bitwise Operators

Before diving into problems, let's review the fundamental bitwise operators:

*   **AND (`&`)**: Sets a bit if both corresponding bits are 1.
    *   `1 & 1 = 1`
    *   `1 & 0 = 0`
    *   `0 & 1 = 0`
    *   `0 & 0 = 0`
    *   **Use Case**: Checking if a bit is set, clearing specific bits, masking.
*   **OR (`|`)**: Sets a bit if at least one of the corresponding bits is 1.
    *   `1 | 1 = 1`
    *   `1 | 0 = 1`
    *   `0 | 1 = 1`
    *   `0 | 0 = 0`
    *   **Use Case**: Setting specific bits.
*   **XOR (`^`)**: Sets a bit if the corresponding bits are different.
    *   `1 ^ 1 = 0`
    *   `1 ^ 0 = 1`
    *   `0 ^ 1 = 1`
    *   `0 ^ 0 = 0`
    *   **Properties**:
        *   `x ^ x = 0` (A number XORed with itself is zero)
        *   `x ^ 0 = x` (A number XORed with zero is itself)
        *   Commutative: `x ^ y = y ^ x`
        *   Associative: `(x ^ y) ^ z = x ^ (y ^ z)`
    *   **Use Case**: Finding unique elements, swapping numbers without a temporary variable.
*   **NOT (`~`)**: Flips all bits (one's complement).
    *   `~0 = 1`
    *   `~1 = 0`
    *   **Note**: In Python, this returns the two's complement equivalent. `~x` is equivalent to `(-x) - 1`.
    *   **Use Case**: Creating masks (e.g., `~0` is `...11111`).
*   **Left Shift (`<<`)**: Shifts bits to the left, filling with zeros on the right. Multiplies by powers of 2.
    *   `x << y` is `x * (2^y)`
    *   `1 << k` creates a mask with only the k-th bit set.
*   **Right Shift (`>>`)**: Shifts bits to the right. Divides by powers of 2 (integer division).
    *   `x >> y` is `x // (2^y)`
    *   **Note**: In Python, `>>` performs arithmetic right shift for positive numbers (fills with 0s) and for negative numbers (fills with 1s). For unsigned contexts, we usually assume logical right shift (fills with 0s). Python's behavior for `>>` on positive numbers is logical.

## 2. Problem: Count Set Bits (Hamming Weight)

**Goal**: Count the number of '1' bits in an integer.

### Approach 1: Iterative Shifting and Masking (Naive)
*   **Concept**: Examine each bit one by one.
*   **Mechanism**:
    1.  Initialize `count = 0`.
    2.  Loop 32 times (for a 32-bit integer).
    3.  In each iteration, check the Least Significant Bit (LSB) using `n & 1`. If it's 1, increment `count`.
    4.  Right-shift `n` by 1 (`n >>= 1`) to bring the next bit to the LSB position.
*   **Complexity**:
    *   Time: O(B) where B is the number of bits (e.g., 32).
    *   Space: O(1).

### Approach 2: Brian Kernighan's Algorithm (Optimal)
*   **Concept**: This algorithm leverages a unique property to turn off the rightmost set bit in `n` in each step.
*   **Mechanism**:
    1.  Initialize `count = 0`.
    2.  While `n > 0`:
        a.  Increment `count`.
        b.  Perform `n = n & (n - 1)`.
*   **How `n & (n - 1)` works**:
    *   `n`: `...X100...0` (where `X` is any sequence of bits, the `1` is the rightmost set bit, and there are `k` zeros after it)
    *   `n - 1`: `...X011...1` (the rightmost `1` becomes `0`, and all `k` zeros after it become `1`s)
    *   `n & (n - 1)`: `...X000...0` (the rightmost set bit is effectively cleared).
*   **Example**: `n = 12` (binary `1100`)
    1.  `count = 0`, `n = 12`
    2.  `n = 12 (1100)`, `n-1 = 11 (1011)`. `n & (n-1) = 1000 (8)`. `count = 1`.
    3.  `n = 8 (1000)`, `n-1 = 7 (0111)`. `n & (n-1) = 0000 (0)`. `count = 2`.
    4.  `n = 0`, loop ends.
*   **Complexity**:
    *   Time: O(K) where K is the number of set bits. Faster than O(B) when K << B.
    *   Space: O(1).

### Approach 3: Lookup Table (Precomputation)
*   **Concept**: For fixed-size integers, we can precompute set bit counts for smaller chunks (e.g., bytes) and sum them up.
*   **Mechanism**:
    1.  Precompute `popcount` (population count) for all 256 possible 8-bit values (0-255). Store in an array.
    2.  For a 32-bit integer, extract each of its 4 bytes using masking (`n & 0xFF`) and right-shifting (`n >>= 8`).
    3.  Look up the `popcount` for each byte in the precomputed table and sum them.
*   **Complexity**:
    *   Time: O(B/k) for runtime (e.g., 4 lookups for a 32-bit integer with 8-bit chunks), which is O(1). Precomputation is O(2^k).
    *   Space: O(2^k) for the lookup table (e.g., 256 entries).

### Approach 4: Built-in Functionality
*   **Concept**: Utilize language-specific optimized functions.
*   **Mechanism**: In Python, `bin(n).count('1')` converts to binary string and counts '1's.
*   **Complexity**:
    *   Time: O(log N) or O(B), similar to naive, but often highly optimized in C.
    *   Space: O(log N) or O(B) for string conversion.

## 3. Problem: Power of Two

**Goal**: Check if an integer `n` is a power of two (i.e., `n = 2^x` for some integer `x`).

### Approach 1: Iterative Division (Naive)
*   **Concept**: A power of two can only be perfectly divided by 2 until it reaches 1.
*   **Mechanism**:
    1.  Handle `n <= 0` (return `False`) and `n = 1` (return `True`).
    2.  While `n` is even (`n % 2 == 0`), divide `n` by 2 (`n //= 2`).
    3.  If `n` becomes 1, it was a power of two.
*   **Complexity**:
    *   Time: O(log N).
    *   Space: O(1).

### Approach 2: Bitwise Operation (Optimal)
*   **Concept**: A positive integer `n` is a power of two if and only if it has exactly one '1' bit in its binary representation.
*   **Mechanism**:
    1.  Handle `n <= 0` (return `False`).
    2.  Return `(n & (n - 1)) == 0`.
*   **Why it works**:
    *   If `n` is a power of two: `n = 2^k`. Its binary form is `1` followed by `k` zeros (e.g., `8` is `1000`).
    *   `n - 1` will be `k` ones (e.g., `7` is `0111`).
    *   `n & (n - 1)` will always be 0 because the single '1' bit in `n` aligns with a '0' in `n - 1`, and all other bits are `0` in `n`.
    *   If `n` is *not* a power of two (and `n > 0`), it has at least two '1' bits. `n & (n - 1)` will clear only the rightmost '1' bit, leaving other '1' bits intact, so the result will not be 0.
*   **Complexity**:
    *   Time: O(1).
    *   Space: O(1).

## 4. Problem: Reverse Bits

**Goal**: Reverse the bits of a 32-bit unsigned integer.

### Approach 1: Iterative Shifting (Optimal for Simplicity)
*   **Concept**: Build the reversed number bit by bit, moving bits from the original number to the result.
*   **Mechanism**:
    1.  Initialize `reversed_num = 0`.
    2.  Loop 32 times (for each bit).
    3.  In each iteration:
        a.  Left-shift `reversed_num` by 1 (`reversed_num <<= 1`). This makes space for the next bit from `n` at the LSB position.
        b.  Extract the LSB of `n` using `current_bit = n & 1`.
        c.  Add this `current_bit` to `reversed_num` using `reversed_num |= current_bit`.
        d.  Right-shift `n` by 1 (`n >>= 1`) to move to the next bit in the original number.
*   **Complexity**:
    *   Time: O(B) where B is the number of bits (32).
    *   Space: O(1).

### Advanced Approach: Divide and Conquer (Parallel Bit Swapping)
*   **Concept**: Instead of processing bit by bit, swap entire blocks of bits in parallel using masks and shifts.
*   **Mechanism**: This involves a series of operations to swap:
    *   Adjacent bits (`1`-bit blocks)
    *   Adjacent `2`-bit blocks
    *   Adjacent `4`-bit blocks (nibbles)
    *   Adjacent `8`-bit blocks (bytes)
    *   Adjacent `16`-bit blocks (half-words)
    *   Each step uses specific masks and shifts to isolate and move bits to their new positions.
*   **Complexity**:
    *   Time: O(log B) where B is the number of bits. For 32 bits, this is `log2(32) = 5` steps. Each step is constant time.
    *   Space: O(1).
*   **Note**: While theoretically faster with hardware support, implementing this efficiently in standard software using basic bitwise ops can be less clear and often not a significant performance gain over the iterative approach for simple scenarios, especially given Python's overhead.

## 5. Problem: Single Number III

**Goal**: Find two elements that appear once, while all others appear twice.

### Approach 1: Hash Map (Simple but not O(1) space)
*   **Concept**: Count occurrences of each number.
*   **Mechanism**:
    1.  Use a hash map (dictionary) to store `number -> count`.
    2.  Iterate through `nums`, update counts.
    3.  Iterate through the hash map, collect numbers with `count == 1`.
*   **Complexity**:
    *   Time: O(N).
    *   Space: O(N).

### Approach 2: Bitwise XOR (Optimal - O(1) space)
*   **Concept**: Leverage the properties of XOR (`x ^ x = 0`, `x ^ 0 = x`) to isolate the two unique numbers.
*   **Mechanism**:
    1.  **First Pass (Get `xor_sum = a ^ b`):**
        *   XOR all numbers in the array. All numbers appearing twice will cancel each other out, leaving `xor_sum = a ^ b` (where `a` and `b` are the two unique numbers).
    2.  **Find a Differentiating Bit (`rightmost_set_bit`):**
        *   Since `a != b`, `a ^ b` (which is `xor_sum`) will have at least one '1' bit. This '1' bit indicates a position where `a` and `b` differ.
        *   Find *any* such bit. A common way is to find the rightmost set bit using `rightmost_set_bit = xor_sum & (-xor_sum)`. This trick works by isolating the lowest set bit.
    3.  **Second Pass (Partition and Isolate `a` and `b`):**
        *   Initialize `num1 = 0` and `num2 = 0`.
        *   Iterate through the `nums` array again.
        *   For each `num`:
            *   If `(num & rightmost_set_bit) != 0`: XOR `num` into `num1`. (This groups numbers whose distinguishing bit is 1).
            *   Else (`(num & rightmost_set_bit) == 0`): XOR `num` into `num2`. (This groups numbers whose distinguishing bit is 0).
        *   Because `a` and `b` have different values at `rightmost_set_bit`, one will go to `num1`'s group and the other to `num2`'s group. All other duplicate numbers will be XORed into the *same* group twice, cancelling out.
        *   At the end, `num1` will hold one unique number, and `num2` will hold the other.
*   **Complexity**:
    *   Time: O(N) (two passes over the array).
    *   Space: O(1).

---