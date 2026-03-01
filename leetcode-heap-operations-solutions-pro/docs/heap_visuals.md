# Heap Visualizations (ASCII Art)

This document provides ASCII art diagrams to help visualize the structure and operations of a binary heap. Heaps are typically implemented using arrays, where the tree structure is implicit.

## 1. Heap Structure (Array Representation)

A complete binary tree can be perfectly mapped to an array.

```
       [0]
      /   \
    [1]     [2]
   / \     / \
 [3] [4] [5] [6]
 / \
[7] [8] ...
```

**Array Indices:** `[0, 1, 2, 3, 4, 5, 6, 7, 8, ...]`

**Relationship between indices:**
*   Parent of `i`: `(i - 1) // 2`
*   Left child of `i`: `2 * i + 1`
*   Right child of `i`: `2 * i + 2`

---

## 2. Min-Heap Example

In a Min-Heap, every parent is smaller than or equal to its children. The smallest element is at the root.

**Initial Heap Array:** `[10, 20, 30, 40, 50, 60]`

```
        10 (idx 0)
       /  \
    20 (idx 1)  30 (idx 2)
   /  \    /
 40 (idx 3) 50 (idx 4) 60 (idx 5)
```

---

## 3. Min-Heap: Insertion (`push`) - Example: Push `5`

1.  **Append `5` to the end:** `[10, 20, 30, 40, 50, 60, 5]`
    `5` is at index 6.

    ```
            10
           /  \
        20     30
       /  \    /  \
      40  50  60   5 (new)
    ```

2.  **`heapify_up` (bubble up):** Compare `5` with its parent (index `(6-1)//2 = 2`), which is `30`.
    *   `5 < 30`, so swap `5` and `30`.
    *   Heap: `[10, 20, 5, 40, 50, 60, 30]`

    ```
            10
           /  \
        20     5 (swapped)
       /  \    /  \
      40  50  60   30
    ```
    *   Now `5` is at index 2. Compare `5` with its new parent (index `(2-1)//2 = 0`), which is `10`.
    *   `5 < 10`, so swap `5` and `10`.
    *   Heap: `[5, 20, 10, 40, 50, 60, 30]`

    ```
            5 (swapped, now root)
           /  \
        20     10
       /  \    /  \
      40  50  60   30
    ```
    *   `5` is now at the root (index 0). No parent. `heapify_up` stops.

**Final Heap Array (after pushing 5):** `[5, 20, 10, 40, 50, 60, 30]`

---

## 4. Min-Heap: Deletion (`pop`) - Example: Pop `5` (smallest)

1.  **Remove root `5`.** Replace with the last element (`30`) from the array.
    *   Heap becomes: `[30, 20, 10, 40, 50, 60]`
    *   The new root is `30`.

    ```
            30 (new root)
           /  \
        20     10
       /  \    /
      40  50  60
    ```

2.  **`heapify_down` (bubble down):** Compare `30` (at root, index 0) with its children: `20` (left, index 1) and `10` (right, index 2).
    *   Smallest child is `10`. `30` is larger than `10`.
    *   Swap `30` and `10`.
    *   Heap: `[10, 20, 30, 40, 50, 60]`

    ```
            10 (swapped)
           /  \
        20     30
       /  \    /
      40  50  60
    ```
    *   Now `30` is at index 2. Check its children: left child (index `2*2+1=5`) is `60`. Right child (index `2*2+2=6`) does not exist.
    *   Compare `30` with `60`. `30` is smaller than `60`. No swap needed. `heapify_down` stops.

**Final Heap Array (after popping 5):** `[10, 20, 30, 40, 50, 60]`

---

## 5. Max-Heap Example

In a Max-Heap, every parent is larger than or equal to its children. The largest element is at the root.

**Initial Heap Array:** `[50, 40, 30, 20, 10, 5]`

```
        50 (idx 0)
       /  \
    40 (idx 1)  30 (idx 2)
   /  \    /
 20 (idx 3) 10 (idx 4) 5 (idx 5)
```

---

## 6. Max-Heap: Insertion (`push`) - Example: Push `55`

1.  **Append `55` to the end:** `[50, 40, 30, 20, 10, 5, 55]`
    `55` is at index 6.

    ```
            50
           /  \
        40     30
       /  \    /  \
      20  10  5    55 (new)
    ```

2.  **`heapify_up` (bubble up):** Compare `55` with its parent (index `(6-1)//2 = 2`), which is `30`.
    *   `55 > 30`, so swap `55` and `30`.
    *   Heap: `[50, 40, 55, 20, 10, 5, 30]`

    ```
            50
           /  \
        40     55 (swapped)
       /  \    /  \
      20  10  5    30
    ```
    *   Now `55` is at index 2. Compare `55` with its new parent (index `(2-1)//2 = 0`), which is `50`.
    *   `55 > 50`, so swap `55` and `50`.
    *   Heap: `[55, 40, 50, 20, 10, 5, 30]`

    ```
            55 (swapped, now root)
           /  \
        40     50
       /  \    /  \
      20  10  5    30
    ```
    *   `55` is now at the root (index 0). No parent. `heapify_up` stops.

**Final Heap Array (after pushing 55):** `[55, 40, 50, 20, 10, 5, 30]`

---

## 7. Max-Heap: Deletion (`pop`) - Example: Pop `55` (largest)

1.  **Remove root `55`.** Replace with the last element (`30`) from the array.
    *   Heap becomes: `[30, 40, 50, 20, 10, 5]`
    *   The new root is `30`.

    ```
            30 (new root)
           /  \
        40     50
       /  \    /
      20  10  5
    ```

2.  **`heapify_down` (bubble down):** Compare `30` (at root, index 0) with its children: `40` (left, index 1) and `50` (right, index 2).
    *   Largest child is `50`. `30` is smaller than `50`.
    *   Swap `30` and `50`.
    *   Heap: `[50, 40, 30, 20, 10, 5]`

    ```
            50 (swapped)
           /  \
        40     30
       /  \    /
      20  10  5
    ```
    *   Now `30` is at index 2. Check its children: left child (index `2*2+1=5`) is `5`. Right child (index `2*2+2=6`) does not exist.
    *   Compare `30` with `5`. `30` is larger than `5`. No swap needed as `5` is smaller. `heapify_down` stops.

**Final Heap Array (after popping 55):** `[50, 40, 30, 20, 10, 5]`

These diagrams illustrate the core mechanics of heap operations. Understanding how elements move up and down the tree (or array indices) to maintain the heap property is fundamental to grasping heap-based algorithms.