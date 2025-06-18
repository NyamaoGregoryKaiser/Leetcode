# Greedy Algorithm Documentation

This document details the greedy algorithms implemented in this project, including their logic, time/space complexity, edge cases, and potential interview variations.


## Fractional Knapsack

**Algorithm:** Sorts items by value-to-weight ratio and greedily takes as much as possible of the highest ratio items until the knapsack is full.

**Time Complexity:** O(n log n) due to sorting.
**Space Complexity:** O(1) (excluding input array)

**Diagram:**

```
+-------+-------+-------+
| Item1 | Item2 | Item3 |
+-------+-------+-------+
| 60,10 | 100,20| 120,30|
+-------+-------+-------+  Capacity: 50
```

**Edge Cases:**  Items with zero weight or zero value, capacity =0.

## Activity Selection

**Algorithm:** Sorts activities by finish time. Selects the first activity, and then iteratively selects the next non-overlapping activity.

**Time Complexity:** O(n log n) (due to sorting).
**Space Complexity:** O(1)

**Diagram:**

```
Activity 1: [1, 4]
Activity 2: [3, 5]
Activity 3: [0, 6]
Activity 4: [5, 7]
Activity 5: [3, 8]

Selected Activities: 1, 4
```

**Edge Cases:** No activities, all activities overlap.



...(Continue documenting Huffman Coding and Coin Change similarly)...


## Interview Tips and Variations

*   Ask clarifying questions about input constraints (e.g., can weights/values be negative?).
*   Discuss the limitations of greedy algorithms and when they fail to find optimal solutions (e.g., 0/1 knapsack).
*   Consider variations of the problem (e.g., maximizing profit with deadlines).