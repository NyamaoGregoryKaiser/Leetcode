**Complexity:**
*   **Time Complexity:** O(log W) where W is the word size, as the number of swap stages is logarithmic (log2(32) = 5 stages). Effectively O(1) for fixed W.
*   **Space Complexity:** O(1)

### Edge Cases & Gotchas

*   **`n = 0`**: Should correctly return 0. Both approaches handle this.
*   **`n = 1`**: Should return `0x80000000`. This means the LSB of 1 becomes the MSB of the reversed number.
*   **`n = 0xFFFFFFFF`**: Should return `0xFFFFFFFF`. All bits reversed is still all bits.
*   **Unsigned Integer**: Crucial to use `uint32_t` (or `unsigned int`) to ensure logical right shifts (filling with zeros) and prevent issues with sign extension in arithmetic right shifts.

### Interview Tips & Variations

*   **Start with Iterative**: This approach is simpler to explain and implement under pressure.
*   **Introduce Optimized Swaps**: As a follow-up, suggest the group swapping method for its potential performance benefits. Be prepared to explain the masks and shifts at each stage.
*   **Explain Masks**: Clearly explain how each mask isolates the bits that need to be moved in one direction.
*   **Variations**:
    *   Reverse bits of a specific range (e.g., bits 8-15).
    *   Check if a number is a palindrome in binary representation (reverse and compare).
    *   Find the next smallest/largest number with the same number of set bits (often involves finding the rightmost non-trailing-zero bit, etc., more complex).

---