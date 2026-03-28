```markdown
# Heap Operations: Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the internal structure and key operations of a Heap data structure.

---

## 1. Array to Tree Mapping

A heap, being a complete binary tree, can be efficiently represented using a simple array.

**Example Min-Heap Array:** `[3, 5, 10, 12, 15, 7, 11]`

```
Array Indices:  0   1   2   3   4   5   6
Array Values:   3   5  10  12  15   7  11
```

**Corresponding Tree Structure:**

```
               3
             /   \
            5     10
           / \   /  \
          12 15 7   11
```

**Mapping Rules:**
*   Node `i` (0-indexed)
*   Left Child: `2*i + 1`
*   Right Child: `2*i + 2`
*   Parent: `floor((i - 1) / 2)`

Let's check for node `5` (at index `1`):
*   Parent of `5` (index `1`): `floor((1-1)/2) = 0` (value `3`).
*   Left child of `5` (index `1`): `2*1 + 1 = 3` (value `12`).
*   Right child of `5` (index `1`): `2*1 + 2 = 4` (value `15`).

---

## 2. `insert()` Operation (`_heapifyUp` Visualization)

Let's insert `2` into the Min-Heap `[3, 5, 10, 12, 15, 7, 11]`.

**Step 1: Add new element to the end.**
Array becomes: `[3, 5, 10, 12, 15, 7, 11, 2]`
New element `2` is at index `7`.

```
               3
             /   \
            5     10
           / \   /  \
          12 15 7   11
         /
        2 (index 7)
```

**Step 2: `_heapifyUp` - Compare `2` (index `7`) with its parent `11` (index `3`).**
Parent index: `floor((7-1)/2) = 3`. Value `11`.
Since `2 < 11` (Min-Heap property violated), swap `2` and `11`.
Array: `[3, 5, 10, 2, 15, 7, 11, 12]`
Current element `2` is now at index `3`.

```
               3
             /   \
            5     10
           / \   /  \
          2  15 7   11
         /
        12 (index 7) <- original 11, new 2
```

**Step 3: `_heapifyUp` - Compare `2` (index `3`) with its parent `5` (index `1`).**
Parent index: `floor((3-1)/2) = 1`. Value `5`.
Since `2 < 5` (Min-Heap property violated), swap `2` and `5`.
Array: `[3, 2, 10, 5, 15, 7, 11, 12]`
Current element `2` is now at index `1`.

```
               3
             /   \
            2     10
           / \   /  \
          5  15 7   11
         /
        12 (index 7)
```

**Step 4: `_heapifyUp` - Compare `2` (index `1`) with its parent `3` (index `0`).**
Parent index: `floor((1-1)/2) = 0`. Value `3`.
Since `2 < 3` (Min-Heap property violated), swap `2` and `3`.
Array: `[2, 3, 10, 5, 15, 7, 11, 12]`
Current element `2` is now at index `0` (root).

```
               2
             /   \
            3     10
           / \   /  \
          5  15 7   11
         /
        12 (index 7)
```

**Final Heap Array:** `[2, 3, 10, 5, 15, 7, 11, 12]`
The Min-Heap property is now restored.

---

## 3. `extractMin()` Operation (`_heapifyDown` Visualization)

Let's extract the minimum from the Min-Heap `[2, 3, 10, 5, 15, 7, 11, 12]`.

**Step 1: Store root and replace with last element.**
Root to extract: `2`.
Last element: `12` (at index `7`).
Move `12` to root position. Remove `12` from end.
Array becomes: `[12, 3, 10, 5, 15, 7, 11]`
Current element `12` is at index `0`.

```
               12
             /    \
            3      10
           / \    /  \
          5  15  7   11
```

**Step 2: `_heapifyDown` - Compare `12` (index `0`) with its children `3` (index `1`) and `10` (index `2`).**
Children values: `3`, `10`. Smallest child is `3`.
Since `12 > 3` (Min-Heap property violated), swap `12` and `3`.
Array: `[3, 12, 10, 5, 15, 7, 11]`
Current element `12` is now at index `1`.

```
                3
              /   \
            12     10
           /  \    /  \
          5   15  7   11
```

**Step 3: `_heapifyDown` - Compare `12` (index `1`) with its children `5` (index `3`) and `15` (index `4`).**
Children values: `5`, `15`. Smallest child is `5`.
Since `12 > 5` (Min-Heap property violated), swap `12` and `5`.
Array: `[3, 5, 10, 12, 15, 7, 11]`
Current element `12` is now at index `3`.

```
                3
              /   \
             5     10
            / \    /  \
          12  15  7   11
```

**Step 4: `_heapifyDown` - Compare `12` (index `3`) with its children.**
Left child: `2*3+1 = 7`. (Index `7` is out of bounds, no children for `12`).
The element `12` is now a leaf node. Heap property is satisfied.

**Final Heap Array:** `[3, 5, 10, 12, 15, 7, 11]`
The Min-Heap property is restored, and the smallest element `2` has been extracted.

---

## 4. Two-Heap Approach for Median (Visualization for `MedianFinder`)

This approach uses a Max-Heap for the smaller half of numbers and a Min-Heap for the larger half.

**Rules:**
1.  All elements in `MaxHeap_Small` <= All elements in `MinHeap_Large`.
2.  `MaxHeap_Small.size()` is either equal to `MinHeap_Large.size()` or `MinHeap_Large.size() + 1`.

**Example `addNum()` sequence:**

*   **`addNum(1)`**:
    *   `MaxHeap_Small`: `[1]`
    *   `MinHeap_Large`: `[]`
    *   Balance: Max size `1`, Min size `0`. (Max size > Min size + 1 is false). Max is one larger, which is allowed.
    *   Median: `1`

*   **`addNum(2)`**:
    *   Add `2` to `MaxHeap_Small`: `[1, 2]` -> `MaxHeap_Small` now `[2, 1]` (largest is 2)
    *   Move `MaxHeap_Small.extractMax()` (which is `2`) to `MinHeap_Large`:
        *   `MaxHeap_Small`: `[1]`
        *   `MinHeap_Large`: `[2]`
    *   Balance: Max size `1`, Min size `1`. Sizes are equal.
    *   Median: `(1 + 2) / 2 = 1.5`

*   **`addNum(3)`**:
    *   Add `3` to `MaxHeap_Small`: `[1, 3]` -> `MaxHeap_Small` now `[3, 1]`
    *   Move `MaxHeap_Small.extractMax()` (which is `3`) to `MinHeap_Large`:
        *   `MaxHeap_Small`: `[1]`
        *   `MinHeap_Large`: `[2, 3]` -> `MinHeap_Large` now `[2, 3]` (smallest is 2)
    *   Balance: Max size `1`, Min size `2`. Min is larger than Max, so move `MinHeap_Large.extractMin()` (`2`) to `MaxHeap_Small`.
        *   `MaxHeap_Small`: `[1, 2]` -> `MaxHeap_Small` now `[2, 1]`
        *   `MinHeap_Large`: `[3]`
    *   Balance: Max size `2`, Min size `1`. Max is one larger, allowed.
    *   Median: `2` (from `MaxHeap_Small.peekMax()`)

```
State after `addNum(1)`:
         MaxHeap_Small          MinHeap_Large
            [ 1 ]                     [ ]
            (max is 1)
Median: 1

State after `addNum(2)`:
         MaxHeap_Small          MinHeap_Large
            [ 1 ]                     [ 2 ]
            (max is 1)              (min is 2)
Median: (1 + 2) / 2 = 1.5

State after `addNum(3)`:
         MaxHeap_Small          MinHeap_Large
            [ 2 ]                     [ 3 ]
            (max is 2)              (min is 3)
Median: 2

State after `addNum(4)`:
1. Add 4 to MaxHeap_Small: MaxHeap_Small [2, 4] -> [4, 2]
2. Move 4 to MinHeap_Large: MaxHeap_Small [2], MinHeap_Large [3, 4] -> [3, 4]
3. Balance: Max size 1, Min size 2. Min is larger. Move 3 to MaxHeap_Small.
MaxHeap_Small [2, 3] -> [3, 2], MinHeap_Large [4]

         MaxHeap_Small          MinHeap_Large
            [ 3 ]                     [ 4 ]
            (max is 3)              (min is 4)
Median: (3 + 4) / 2 = 3.5

State after `addNum(5)`:
1. Add 5 to MaxHeap_Small: MaxHeap_Small [3, 2, 5] -> [5, 3, 2]
2. Move 5 to MinHeap_Large: MaxHeap_Small [3, 2] -> [3, 2], MinHeap_Large [4, 5] -> [4, 5]
3. Balance: Max size 2, Min size 2. Balanced.

         MaxHeap_Small          MinHeap_Large
            [ 3 ]                     [ 4 ]
           /     \                     /
          2       -                   5
          (max is 3)              (min is 4)
Median: 3
```
This two-heap strategy effectively partitions the data stream around the median, allowing constant-time median retrieval and logarithmic-time updates.
```