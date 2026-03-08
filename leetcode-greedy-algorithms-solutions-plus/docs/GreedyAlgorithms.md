# 📖 Understanding Greedy Algorithms

This document provides an in-depth exploration of Greedy Algorithms, covering their definition, core properties, problem-solving strategies, and practical application through classic examples.

## Table of Contents

1.  [What are Greedy Algorithms?](#1-what-are-greedy-algorithms)
    *   [Core Properties](#core-properties)
    *   [When to Use (and Not to Use)](#when-to-use-and-not-to-use)
2.  [Problem Deep Dives](#2-problem-deep-dives)
    *   [2.1 Activity Selection Problem](#21-activity-selection-problem)
        *   Problem Statement
        *   Greedy Choice Justification
        *   Step-by-Step Example (ASCII Art)
        *   Time & Space Complexity
        *   Edge Cases & Gotchas
    *   [2.2 Fractional Knapsack Problem](#22-fractional-knapsack-problem)
        *   Problem Statement
        *   Greedy Choice Justification
        *   Step-by-Step Example (ASCII Art)
        *   Time & Space Complexity
        *   Edge Cases & Gotchas
    *   [2.3 Job Sequencing with Deadlines](#23-job-sequencing-with-deadlines)
        *   Problem Statement
        *   Greedy Choice Justification
        *   Step-by-Step Example (ASCII Art)
        *   Time & Space Complexity
        *   Edge Cases & Gotchas
        *   Brute Force vs. Optimized (DSU)
3.  [Interview Tips and Variations](#3-interview-tips-and-variations)
    *   [Identifying Greedy Problems](#identifying-greedy-problems)
    *   [Proving Optimality](#proving-optimality)
    *   [Common Pitfalls](#common-pitfalls)
    *   [Variations and Related Problems](#variations-and-related-problems)
    *   [Communication During the Interview](#communication-during-the-interview)

---

## 1. What are Greedy Algorithms?

A greedy algorithm is an algorithmic paradigm that follows the problem-solving heuristic of making the locally optimal choice at each stage with the hope of finding a global optimum. In many problems, a greedy strategy does not produce an optimal solution, but for some problems, it does.

### Core Properties

For a greedy algorithm to guarantee an optimal solution, two properties are usually required:

1.  **Greedy Choice Property:** A global optimum can be reached by making a locally optimal (greedy) choice. This means that if we pick the best immediate choice, we will eventually reach the best overall solution. The crucial part is that the choice made *today* does not jeopardize future optimal choices.
2.  **Optimal Substructure:** An optimal solution to the problem contains optimal solutions to subproblems. This is a property often shared with dynamic programming problems, but in greedy algorithms, the optimal solution to subproblems is *straightforwardly* derived from the greedy choice.

### When to Use (and Not to Use)

**Use Greedy Algorithms when:**
*   There's a clear, straightforward locally optimal choice at each step.
*   You can prove the greedy choice property and optimal substructure.
*   The problem does *not* require exploring multiple future options to make a current decision (unlike dynamic programming).

**Do NOT use Greedy Algorithms when:**
*   The local optimum does not guarantee a global optimum. A classic example is the **Coin Change Problem** with arbitrary denominations (e.g., denominations {1, 10, 15} and target 20. Greedy choice would be 15 + 1 + 1 + 1 + 1 + 1 (6 coins), but optimal is 10 + 10 (2 coins)). This requires dynamic programming.
*   The problem involves "looking ahead" or making trade-offs between current gain and future potential.

---

## 2. Problem Deep Dives

Let's explore some classic greedy problems.

### 2.1 Activity Selection Problem

**Problem Statement:**
You are given a set of `n` activities, each with a start time `s[i]` and a finish time `f[i]`. You want to select the maximum number of non-overlapping activities that can be performed by a single person or machine. An activity `i` and activity `j` are non-overlapping if `s[i] >= f[j]` or `s[j] >= f[i]`.

**Greedy Choice Justification:**
The greedy strategy is to **always pick the activity that finishes earliest among the remaining compatible activities**.

*   **Why does this work?**
    If we select an activity that finishes earliest, we leave the maximum possible time available for subsequent activities. Any other choice (an activity that finishes later) would either prevent us from scheduling the same number of activities or restrict the choices for future activities more severely. By finishing early, we maximize the "room" for more activities later.

*   **Proof Sketch (Exchange Argument):**
    Assume there is an optimal solution `O` that does not pick the earliest finishing activity `A` (sorted by finish time). Let `B` be the first activity chosen in `O`.
    If `B` finishes later than `A`, we can replace `B` with `A` in `O`. Since `A` finishes no later than `B` (by definition of `A`), and `A` starts no later than `B` (since `A` finishes earliest, it must be compatible with previous activities as good as or better than `B`), the new set of activities `O'` (with `A` instead of `B`) will still be a valid, non-overlapping set, and it will free up *more* time for subsequent activities. Thus, `O'` is at least as good as `O`, and we have replaced the first choice of `O` with the greedy choice. By induction, we can show that the greedy strategy produces an optimal solution.

**Step-by-Step Example (ASCII Art):**

Activities:
A1: (1, 4)
A2: (3, 5)
A3: (0, 6)
A4: (5, 7)
A5: (3, 9)
A6: (5, 9)
A7: (6, 10)
A8: (8, 11)
A9: (8, 12)
A10: (2, 14)
A11: (12, 16)

1.  **Sort by finish time:**
    ```
    A1: (1, 4)  <-- Earliest finish
    A2: (3, 5)
    A3: (0, 6)
    A4: (5, 7)
    A5: (3, 9)
    A6: (5, 9)
    A7: (6, 10)
    A8: (8, 11)
    A9: (8, 12)
    A10: (2, 14)
    A11: (12, 16)
    ```

2.  **Select A1 (1, 4):**
    ```
    Time 0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
         |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
    A1:  . . . . [=====]
    Selected: [A1]
    Last finish time: 4
    ```

3.  **Iterate through remaining activities (starting from A2):**
    *   A2 (3, 5): Start 3 < Last finish 4. *Overlap. Skip.*
    *   A3 (0, 6): Start 0 < Last finish 4. *Overlap. Skip.*
    *   A4 (5, 7): Start 5 >= Last finish 4. *Compatible. Select A4.*
        ```
        Time 0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
             |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
        A1:  . . . . [=====]
        A4:                  [=====]
        Selected: [A1, A4]
        Last finish time: 7
        ```

    *   A5 (3, 9): Start 3 < Last finish 7. *Overlap. Skip.*
    *   A6 (5, 9): Start 5 < Last finish 7. *Overlap. Skip.*
    *   A7 (6, 10): Start 6 < Last finish 7. *Overlap. Skip.*
    *   A8 (8, 11): Start 8 >= Last finish 7. *Compatible. Select A8.*
        ```
        Time 0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
             |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
        A1:  . . . . [=====]
        A4:                  [=====]
        A8:                          [=====]
        Selected: [A1, A4, A8]
        Last finish time: 11
        ```

    *   A9 (8, 12): Start 8 < Last finish 11. *Overlap. Skip.*
    *   A10 (2, 14): Start 2 < Last finish 11. *Overlap. Skip.*
    *   A11 (12, 16): Start 12 >= Last finish 11. *Compatible. Select A11.*
        ```
        Time 0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
             |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
        A1:  . . . . [=====]
        A4:                  [=====]
        A8:                          [=====]
        A11:                                     [=====]
        Selected: [A1, A4, A8, A11]
        Last finish time: 16
        ```

4.  **All activities processed.** Final selected activities: `[(1,4), (5,7), (8,11), (12,16)]`

**Time & Space Complexity:**
*   **Time Complexity:** O(N log N)
    *   Sorting activities takes O(N log N) time.
    *   Iterating through the sorted activities takes O(N) time.
    *   The dominant factor is sorting.
*   **Space Complexity:** O(N)
    *   O(N) for storing the sorted activities (if a new array is created).
    *   O(K) for the result array, where K is the number of selected activities (K <= N).

**Edge Cases & Gotchas:**
*   **Empty or single activity list:** Handled by returning empty or single activity respectively.
*   **Activities with same finish times:** The sorting should be stable or have a tie-breaking rule (e.g., sort by start time). The correctness of the algorithm typically holds regardless of tie-breaking for equal finish times, as long as the earliest-finishing property is maintained.
*   **Activities with zero duration (start == end):** These activities can be selected and consume a time slot. `start >= lastFinishTime` rule correctly handles activities that "touch" at their boundaries.
*   **All activities overlap/None overlap:** The algorithm naturally handles these, selecting one or all, respectively.

---

### 2.2 Fractional Knapsack Problem

**Problem Statement:**
Given weights and values of `n` items, put these items in a knapsack of a fixed capacity `W` to get the maximum total value. You can take fractions of items.

**Greedy Choice Justification:**
The greedy strategy is to **prioritize items with the highest value-to-weight ratio**.

*   **Why does this work?**
    Since we are allowed to take fractions of items, we want to maximize the value obtained per unit of weight. By selecting items with the highest `value/weight` ratio first, we ensure that we're always adding the "most valuable per pound" items to the knapsack. If we take an item with a lower ratio when a higher-ratio item is available, we would be getting less value for the same amount of capacity, which is suboptimal. This leads directly to the global optimal solution.

*   **Proof Sketch:**
    Assume there exists an optimal solution `O` where an item `X` with a lower value-to-weight ratio is taken, while an item `Y` with a higher value-to-weight ratio (and space remaining in `O` for `Y`) is not taken or is taken in a smaller fraction than `X`. We can exchange a small amount of `X` with an equivalent weight of `Y`. Since `Y` has a higher ratio, substituting `Y` for `X` would increase the total value in the knapsack without changing the total weight, making the solution strictly better than `O`. This contradicts `O` being optimal. Therefore, the greedy choice of prioritizing higher ratios must be optimal.

**Step-by-Step Example (ASCII Art):**

Items:
I1: {value: 60, weight: 10}
I2: {value: 100, weight: 20}
I3: {value: 120, weight: 30}
Knapsack Capacity: W = 50

1.  **Calculate Value/Weight Ratios:**
    *   I1: 60 / 10 = 6
    *   I2: 100 / 20 = 5
    *   I3: 120 / 30 = 4

2.  **Sort items by ratio in descending order:**
    ```
    Items sorted by ratio (descending):
    1. I1: {value: 60, weight: 10, ratio: 6}
    2. I2: {value: 100, weight: 20, ratio: 5}
    3. I3: {value: 120, weight: 30, ratio: 4}
    ```

3.  **Fill the knapsack:**
    *   **Current Capacity: 50, Total Value: 0**

    *   **Take I1:**
        Weight of I1 (10) <= Current Capacity (50). Take all of I1.
        ```
        Knapsack: [I1 (10kg)]
        Current Capacity: 50 - 10 = 40
        Total Value: 0 + 60 = 60
        ```

    *   **Take I2:**
        Weight of I2 (20) <= Current Capacity (40). Take all of I2.
        ```
        Knapsack: [I1 (10kg), I2 (20kg)]
        Current Capacity: 40 - 20 = 20
        Total Value: 60 + 100 = 160
        ```

    *   **Take I3:**
        Weight of I3 (30) > Current Capacity (20). Take a fraction of I3.
        Fraction = Current Capacity / Weight of I3 = 20 / 30 = 2/3.
        Value from fraction = (2/3) * 120 = 80.
        ```
        Knapsack: [I1 (10kg), I2 (20kg), I3 (2/3 * 30kg = 20kg)]
        Current Capacity: 20 - 20 = 0
        Total Value: 160 + 80 = 240
        ```

4.  **Knapsack is full (Capacity = 0).**
    Maximum total value = 240.

**Time & Space Complexity:**
*   **Time Complexity:** O(N log N)
    *   Calculating ratios for N items takes O(N).
    *   Sorting items by ratio takes O(N log N) time.
    *   Iterating through sorted items to fill the knapsack takes O(N) time.
    *   The dominant factor is sorting.
*   **Space Complexity:** O(N)
    *   O(N) for storing items with calculated ratios (if new objects are created).

**Edge Cases & Gotchas:**
*   **Empty items list or zero/negative capacity:** Returns 0 value.
*   **Items with zero weight:**
    *   If value > 0, ratio becomes `Infinity`. These items should be taken first (as they provide infinite value per weight) and don't consume capacity. Our implementation correctly handles `Infinity` in sorting.
    *   If value = 0 and weight = 0, ratio is `NaN`. These items provide no benefit and don't take capacity; they're naturally skipped.
*   **Items with zero value:** These will have a ratio of 0 and will be picked last (if at all). Correctly handled.
*   **Floating-point precision:** Be mindful when dealing with ratios and fractional calculations in languages where floating-point arithmetic can introduce small errors. For interview settings, usually these errors are not strictly tested against, but it's good to be aware.

---

### 2.3 Job Sequencing with Deadlines

**Problem Statement:**
Given a set of `n` jobs, where each job `i` has a deadline `d[i]` and a profit `p[i]`. You can only perform one job at a time, and each job takes unit time. The goal is to find a sequence of jobs that maximizes the total profit, such that each job is completed by its deadline.

**Greedy Choice Justification:**
The greedy strategy involves two main parts:
1.  **Sort jobs by profit in descending order.**
2.  For each job, **schedule it in the latest possible available slot before or on its deadline.**

*   **Why does this work?**
    By processing jobs with the highest profits first, we prioritize including them in our schedule. When considering a high-profit job, scheduling it as late as possible (but still by its deadline) leaves earlier slots open. These earlier slots can then be used by other high-profit jobs that might have tighter deadlines, ensuring they also get scheduled. This strategy maximizes the chances of accommodating the most profitable jobs within their deadline constraints.

*   **Proof Sketch:**
    Similar to activity selection, an exchange argument can be used. Assume an optimal schedule `O` exists that doesn't follow the greedy strategy (i.e., it either schedules a lower-profit job before a higher-profit one that could have been scheduled, or it schedules a job earlier than necessary, blocking a later higher-profit job). We can show that by swapping or re-arranging jobs to follow the greedy choices, we can construct an equally or more profitable schedule, contradicting the optimality of `O` (if `O` was different from the greedy result).

**Step-by-Step Example (ASCII Art):**

Jobs:
J1: {id: 'a', deadline: 2, profit: 100}
J2: {id: 'b', deadline: 1, profit: 19}
J3: {id: 'c', deadline: 2, profit: 27}
J4: {id: 'd', deadline: 1, profit: 25}
J5: {id: 'e', deadline: 3, profit: 15}

1.  **Sort jobs by profit (descending):**
    ```
    Sorted Jobs:
    1. 'a': {deadline: 2, profit: 100}
    2. 'c': {deadline: 2, profit: 27}
    3. 'd': {deadline: 1, profit: 25}
    4. 'b': {deadline: 1, profit: 19}
    5. 'e': {deadline: 3, profit: 15}
    ```

2.  **Determine `maxDeadline`:** Max deadline is 3. We'll use slots 0, 1, 2.
    Initialize `scheduledSlots = [null, null, null]` (representing time slots 0, 1, 2).
    `Total Profit = 0`

3.  **Process sorted jobs:**

    *   **Job 'a' ({d:2, p:100}):**
        Deadline is 2. Try slot `d-1 = 1`. Slot 1 is `null`. Schedule 'a' in slot 1.
        `scheduledSlots = [null, 'a', null]`
        `Total Profit = 100`

    *   **Job 'c' ({d:2, p:27}):**
        Deadline is 2. Try slot `d-1 = 1`. Slot 1 is 'a' (occupied).
        Try slot `0`. Slot 0 is `null`. Schedule 'c' in slot 0.
        `scheduledSlots = ['c', 'a', null]`
        `Total Profit = 100 + 27 = 127`

    *   **Job 'd' ({d:1, p:25}):**
        Deadline is 1. Try slot `d-1 = 0`. Slot 0 is 'c' (occupied).
        No earlier slot (cannot go negative). *Skip job 'd'.*

    *   **Job 'b' ({d:1, p:19}):**
        Deadline is 1. Try slot `d-1 = 0`. Slot 0 is 'c' (occupied).
        No earlier slot. *Skip job 'b'.*

    *   **Job 'e' ({d:3, p:15}):**
        Deadline is 3. Try slot `d-1 = 2`. Slot 2 is `null`. Schedule 'e' in slot 2.
        `scheduledSlots = ['c', 'a', 'e']`
        `Total Profit = 127 + 15 = 142`

4.  **All jobs processed.**
    `Max Profit = 142`
    `Job Sequence (execution order): ['c', 'a', 'e']`

**ASCII Art Timeline:**

```
Time Slots:
             0       1       2
           -----   -----   -----
Initial:   |     | |     | |     |
           -----   -----   -----

After 'a' (d=2,p=100) scheduled at latest free slot (1):
           -----   -----   -----
           |     | |  a  | |     |
           -----   -----   -----

After 'c' (d=2,p=27) scheduled at latest free slot (0):
           -----   -----   -----
           |  c  | |  a  | |     |
           -----   -----   -----

'd' (d=1,p=25) skipped (slot 0 taken)
'b' (d=1,p=19) skipped (slot 0 taken)

After 'e' (d=3,p=15) scheduled at latest free slot (2):
           -----   -----   -----
           |  c  | |  a  | |  e  |
           -----   -----   -----

Final Sequence (executed): 'c' then 'a' then 'e'. Total Profit: 142.
```

**Time & Space Complexity:**

*   **Simple Slot Allocation (`jobSequencing`):**
    *   **Time Complexity:** O(N log N + N * max_deadline)
        *   Sorting jobs: O(N log N).
        *   Finding `max_deadline`: O(N).
        *   Iterating N jobs, and for each, iterating up to `max_deadline` slots: O(N * max_deadline).
        *   In the worst case where `max_deadline` is proportional to `N`, this becomes O(N log N + N^2) which simplifies to O(N^2).
    *   **Space Complexity:** O(N + max_deadline)
        *   O(N) for storing sorted jobs.
        *   O(max_deadline) for the `scheduledSlots` array.

*   **Optimized with Disjoint Set Union (DSU) (`jobSequencingOptimized`):**
    *   **Time Complexity:** O(N log N + max_deadline * α(max_deadline))
        *   Sorting jobs: O(N log N).
        *   Finding `max_deadline` and DSU initialization: O(max_deadline).
        *   Iterating N jobs, each involving a `find` and a `union` operation on DSU. DSU operations (with path compression and union by rank/size) take amortized O(α(k)) time, where α is the inverse Ackermann function, which grows extremely slowly (practically constant, < 5 for any realistic input size). So, O(N * α(max_deadline)).
        *   The dominant factor is typically `N log N` or `max_deadline` if `max_deadline` is much larger than `N log N`.
    *   **Space Complexity:** O(N + max_deadline)
        *   O(N) for storing sorted jobs.
        *   O(max_deadline) for DSU's `parent` and `size` arrays.

**Edge Cases & Gotchas:**
*   **Empty job list:** Returns 0 profit and empty sequence.
*   **Jobs with deadline 0 or negative:** Deadlines are typically 1-indexed (meaning slot 0 is the first available slot). A deadline of 0 implies it cannot be done. Our implementation handles `deadline: 1` as needing slot 0.
*   **Jobs with identical profit and deadline:** The relative order for such jobs doesn't affect the maximum profit, but the `jobSequence` might vary. The current sort is stable enough.
*   **`max_deadline` larger than `N`:** This is where the DSU optimization shines. For instance, N=1000, `max_deadline`=100,000. Simple approach would be `1000 * 100000 = 10^8`, while DSU would be `1000 log 1000 + 100000 * α(100000)` which is much faster.
*   **Brute Force vs. Optimized (DSU):**
    *   **Brute Force (Conceptual):** Trying all permutations of jobs and checking validity/profit would be `O(N!)`. This is completely infeasible for even small N. A dynamic programming approach could exist, but the greedy approach is simpler and optimal here.
    *   **Optimized (DSU):** The `jobSequencing` function effectively implements a greedy strategy but with a naive (linear scan) approach to find an available slot. The `jobSequencingOptimized` leverages the DSU data structure to make this slot-finding step almost constant time, significantly improving performance for larger deadline ranges.

---

## 3. Interview Tips and Variations

### Identifying Greedy Problems

*   **Look for "make the best choice now" scenarios:** If a problem seems to suggest taking the best available option at each step without worrying about future consequences, it might be greedy.
*   **Optimal Substructure:** Does the solution to the whole problem depend on optimal solutions to smaller versions of the same problem? (This is also true for DP, so combine with the next point).
*   **Greedy Choice Property:** Can you make a choice that seems locally optimal, and once made, it doesn't limit your ability to make optimal choices for the remaining subproblems? This is the key differentiator from DP. If you're unsure, try to prove it or find a counter-example.

### Proving Optimality

*   **Exchange Argument:** This is the most common technique. Assume an optimal solution exists that *doesn't* follow the greedy choice. Then, show that you can "exchange" parts of that optimal solution with the greedy choice to create an equally good (or better) solution, thus contradicting the assumption that the original optimal solution was truly different from the greedy one. This was demonstrated in the sections above.
*   **Proof by Induction:** Show that the greedy choice works for small cases, and if it works for `k` steps, it also works for `k+1` steps.

### Common Pitfalls

*   **Mistaking local optimum for global optimum:** Just because a choice seems best at the moment doesn't mean it leads to the best overall solution (e.g., general Coin Change). Always try to prove the greedy choice property.
*   **Incorrect greedy choice:** There might be several "greedy-looking" choices. E.g., for Activity Selection, sorting by start time or duration doesn't work, only by finish time does.
*   **Overlooking constraints:** Forgetting that an item must fit (Knapsack) or a job must meet its deadline can lead to incorrect algorithms.

### Variations and Related Problems

*   **Minimum Spanning Tree (MST):** Prim's and Kruskal's algorithms are classic greedy algorithms.
*   **Dijkstra's Shortest Path Algorithm:** Also uses a greedy approach at each step to pick the closest unvisited node.
*   **Huffman Coding:** A greedy algorithm for building an optimal prefix code.
*   **Change-making Problem:** As discussed, only greedy for canonical coin systems (e.g., US currency). For arbitrary denominations, it's a DP problem.
*   **Interval Scheduling (Weighted):** If activities have profits, and you want to maximize profit, it often becomes a dynamic programming problem, as the greedy choice for count (earliest finish) might not be the best for total profit.
*   **0/1 Knapsack Problem:** If you *cannot* take fractions of items, it becomes a dynamic programming problem. The greedy approach (value/weight ratio) does not guarantee optimality.

### Communication During the Interview

*   **Clarify the Problem:** Ensure you understand all constraints, inputs, and desired outputs.
*   **Brainstorm Approaches:** Discuss different ways to solve the problem (e.g., brute force, DP, greedy).
*   **Propose Greedy:** If you suspect it's greedy, state your greedy choice clearly.
*   **Justify:** Explain *why* you think the greedy choice is optimal. This is crucial. If you can't prove it fully, explain your intuition and any potential counter-examples you've considered.
*   **Walk Through an Example:** Use a small example to illustrate your greedy choice step-by-step.
*   **Discuss Complexity:** Analyze time and space complexity thoroughly.
*   **Code Cleanly:** Write well-structured, readable code with comments.
*   **Test:** Mentally walk through edge cases and various test scenarios.
*   **Consider Alternatives/Trade-offs:** If a greedy approach fails, be ready to pivot to DP or another strategy. Discuss any trade-offs (e.g., between time/space or simpler vs. more complex implementations).

---