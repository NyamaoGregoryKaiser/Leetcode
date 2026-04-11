```markdown
# Greedy Algorithms: Core Concepts and Problem Explanations

This document provides a detailed explanation of Greedy Algorithms, their core principles, and an in-depth analysis of the problems implemented in this project. It aims to offer insights into the greedy choice property, optimal substructure, and practical considerations for interviews.

## Table of Contents

1.  [Introduction to Greedy Algorithms](#1-introduction-to-greedy-algorithms)
2.  [Problem Analysis](#2-problem-analysis)
    *   [2.1. Activity Selection Problem](#21-activity-selection-problem)
    *   [2.2. Fractional Knapsack Problem](#22-fractional-knapsack-problem)
    *   [2.3. Coin Change Problem (Greedy Variant)](#23-coin-change-problem-greedy-variant)
    *   [2.4. Minimum Number of Platforms Problem](#24-minimum-number-of-platforms-problem)
    *   [2.5. Job Sequencing with Deadlines Problem](#25-job-sequencing-with-deadlines-problem)
3.  [General Interview Tips for Greedy Algorithms](#3-general-interview-tips-for-greedy-algorithms)

---

## 1. Introduction to Greedy Algorithms

Greedy algorithms are a problem-solving paradigm where, at each step, the algorithm makes the choice that seems best at the moment. This "locally optimal" choice is expected to lead to a globally optimal solution. While simple and intuitive, greedy algorithms don't always yield the globally optimal solution. Their correctness typically relies on two key properties:

*   **Greedy Choice Property:** A global optimum can be reached by making a locally optimal (greedy) choice. This means that after making the best immediate choice, we are left with a subproblem that, when solved optimally, leads to an optimal solution for the original problem. The key is that the greedy choice does not depend on future choices or the solutions to subproblems; it's a "firm" decision.
*   **Optimal Substructure:** An optimal solution to the problem contains optimal solutions to its subproblems. This property is also present in dynamic programming, but with greedy algorithms, the optimal solution for the subproblem (after making a greedy choice) can be found without re-evaluating the greedy choice itself.

**When does Greedy work?**
Greedy algorithms often work for optimization problems where you need to find the "best" way to do something. They are typically faster than dynamic programming when applicable, as they don't explore multiple paths.

**When does Greedy fail?**
If the greedy choice at any step makes it impossible to reach the global optimum, or if that choice makes future optimal choices unavailable or suboptimal, then a greedy approach won't work. For such cases, dynamic programming is usually the alternative.

## 2. Problem Analysis

Here, we'll dive into the specific greedy problems implemented in this project.

### 2.1. Activity Selection Problem

**Problem Statement:**
You are given `N` activities, each with a start time `s[i]` and a finish time `f[i]`. A single resource (e.g., a person, a machine) can perform only one activity at a time. The goal is to select the maximum number of non-overlapping activities that can be performed.

**Greedy Choice Property:**
The greedy choice is to always select the activity that finishes earliest among the remaining compatible activities.
*   **Intuition:** By selecting the activity that finishes earliest, we leave the maximum possible time interval free for subsequent activities. This maximizes the opportunity to fit more activities later, leading to a greater total count.
*   **Proof Sketch:**
    Let `S` be an optimal solution. Let `a_k` be the activity in `S` with the earliest finish time. If `a_1` (the activity with the globally earliest finish time) is not `a_k`, then we can replace `a_k` with `a_1` in `S`. The new set `S'` will still be a valid set of non-overlapping activities (since `a_1` finishes no later than `a_k`, and thus `a_1` conflicts with no *fewer* activities than `a_k` did with respect to activities scheduled *after* `a_k` in `S`). `S'` will have the same number of activities as `S`, thus `S'` is also optimal. This shows there exists an optimal solution that includes the greedy choice.

**Optimal Substructure:**
If an optimal solution `S` includes activity `a_k` (the greedy choice), then the remaining activities in `S` (after removing `a_k` and any activities conflicting with `a_k`) must form an optimal solution to the subproblem of selecting activities that start after `a_k` finishes.

**Algorithm:**
1.  Sort all activities by their finish times in ascending order.
2.  Select the first activity from the sorted list. Add it to the result.
3.  For each subsequent activity in the sorted list:
    *   If its start time is greater than or equal to the finish time of the last selected activity, select it and add it to the result. Update the last selected activity.
4.  Return the list of selected activities.

**Example Walkthrough:**

Activities: (1,4), (3,5), (0,6), (5,7), (3,8), (5,9), (6,10), (8,11), (8,12), (2,13), (12,14)

1.  **Sort by finish time:**
    (1,4), (3,5), (0,6), (5,7), (3,8), (5,9), (6,10), (8,11), (8,12), (2,13), (12,14)
    *(Note: Activities with same finish time maintain relative order or can be sorted by start time, but it doesn't affect the count of selected activities for the earliest finish time strategy.)*

2.  **Select (1,4)**. `last_finish = 4`. Result: `[(1,4)]`

3.  Iterate:
    *   (3,5): `3 < 4`. Overlaps. Skip.
    *   (0,6): `0 < 4`. Overlaps. Skip.
    *   **(5,7)**: `5 >= 4`. Select. `last_finish = 7`. Result: `[(1,4), (5,7)]`
    *   (3,8): `3 < 7`. Overlaps. Skip.
    *   (5,9): `5 < 7`. Overlaps. Skip.
    *   (6,10): `6 < 7`. Overlaps. Skip.
    *   **(8,11)**: `8 >= 7`. Select. `last_finish = 11`. Result: `[(1,4), (5,7), (8,11)]`
    *   (8,12): `8 < 11`. Overlaps. Skip.
    *   (2,13): `2 < 11`. Overlaps. Skip.
    *   **(12,14)**: `12 >= 11`. Select. `last_finish = 14`. Result: `[(1,4), (5,7), (8,11), (12,14)]`

**Visualization (ASCII Art):**

```
Time: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14
Act A:  [----]
Act B:    [--]
Act C: [------]
Act D:          [--]
Act E:    [-----]
Act F:          [---]
Act G:            [--]
Act H:                [---]
Act I:                [----]
Act J:      [----------]
Act K:                       [---]

Sorted by finish:
(1,4) [----]   <-- Selected
(3,5)   [--]
(0,6) [------]
(5,7)          [--] <-- Selected
(3,8)    [-----]
(5,9)          [---]
(6,10)           [--]
(8,11)               [---] <-- Selected
(8,12)               [----]
(2,13)     [----------]
(12,14)                      [---] <-- Selected

Final Selection: (1,4), (5,7), (8,11), (12,14)
```

**Time Complexity:** O(N log N) for sorting, O(N) for iterating. Total: O(N log N).
**Space Complexity:** O(N) for storing sorted activities (if a copy is made) and the result list.

**Edge Cases & Gotchas:**
*   **Empty list/Null input:** Handle by returning an empty list.
*   **Single activity:** Should return that single activity.
*   **All activities overlap:** Will still select one activity (the one with the earliest finish time).
*   **Activities with same finish times:** The relative order doesn't change the correctness, as long as the earliest-finish principle is maintained.

**Interview Tips & Variations:**
*   **Follow-up:** What if the activities have weights/profits? This usually leads to Dynamic Programming (e.g., Weighted Activity Selection).
*   **Variations:** Find maximum non-overlapping intervals (same problem), scheduling classes in minimum rooms (similar, but might require different greedy choices or data structures like a min-heap).

### 2.2. Fractional Knapsack Problem

**Problem Statement:**
Given a set of `N` items, each with a weight `w[i]` and a value `v[i]`, and a knapsack with a maximum weight capacity `W`. Determine the maximum total value that can be placed into the knapsack. Unlike the 0/1 Knapsack problem, items can be broken into fractions.

**Greedy Choice Property:**
The greedy choice is to always pick the item (or a fraction of an item) that has the highest value-to-weight ratio (`v[i]/w[i]`).
*   **Intuition:** To maximize value for a given capacity, we want to prioritize items that give us the most value per unit of weight. Since we can take fractions, we can always precisely fill the knapsack with the most "value-dense" items first.
*   **Proof Sketch:**
    Assume there exists an optimal solution `S` that does not follow the greedy strategy. This means `S` contains a lower value-to-weight ratio item `x` and excludes a higher value-to-weight ratio item `y` (or takes a smaller fraction of `y` than possible), such that we could swap a small amount of `x` for `y` and increase the total value without exceeding capacity.
    Let item `x` have ratio `R_x` and item `y` have ratio `R_y`, with `R_y > R_x`. If `S` takes `x` but doesn't take all available `y` (up to capacity), we can replace a small weight `delta_w` of `x` with `delta_w` of `y`. The value change would be `delta_w * R_y - delta_w * R_x = delta_w * (R_y - R_x)`. Since `R_y > R_x`, `R_y - R_x > 0`, so the total value increases. This contradicts the optimality of `S`. Therefore, an optimal solution must follow the greedy choice.

**Optimal Substructure:**
After making the greedy choice (taking as much of the highest ratio item as possible), the problem reduces to a smaller knapsack problem with reduced capacity and remaining items. The optimal solution to this subproblem contributes to the overall optimal solution.

**Algorithm:**
1.  For each item, calculate its value-to-weight ratio (`value / weight`).
2.  Sort all items in descending order based on their value-to-weight ratios.
3.  Initialize `totalValue = 0` and `currentWeight = 0`.
4.  Iterate through the sorted items:
    *   If adding the current item's full weight does not exceed the `capacity`:
        *   Add its full value to `totalValue`.
        *   Add its full weight to `currentWeight`.
    *   Else (the item cannot be taken whole):
        *   Calculate the `fraction` of the item that can be taken to fill the remaining capacity (`(capacity - currentWeight) / item.weight`).
        *   Add `item.value * fraction` to `totalValue`.
        *   Set `currentWeight = capacity` (knapsack is full).
        *   Break the loop.
5.  Return `totalValue`.

**Example Walkthrough:**

Items:
A: w=10, v=60 (ratio=6)
B: w=20, v=100 (ratio=5)
C: w=30, v=120 (ratio=4)
Knapsack Capacity `W = 50`.

1.  **Calculate Ratios:** A=6, B=5, C=4.
2.  **Sort by Ratio (descending):** [A (10,60), B (20,100), C (30,120)]
3.  `totalValue = 0.0`, `currentWeight = 0`.

4.  Iterate:
    *   **Item A (10,60):** `currentWeight + 10 = 10 <= 50`.
        *   `totalValue = 0 + 60 = 60`.
        *   `currentWeight = 0 + 10 = 10`.
        *   Remaining Capacity: `50 - 10 = 40`.
    *   **Item B (20,100):** `currentWeight + 20 = 10 + 20 = 30 <= 50`.
        *   `totalValue = 60 + 100 = 160`.
        *   `currentWeight = 10 + 20 = 30`.
        *   Remaining Capacity: `50 - 30 = 20`.
    *   **Item C (30,120):** `currentWeight + 30 = 30 + 30 = 60 > 50`. Cannot take whole.
        *   `remainingCapacity = 50 - 30 = 20`.
        *   `fraction = 20 / 30 = 2/3`.
        *   `totalValue = 160 + (120 * 2/3) = 160 + 80 = 240`.
        *   `currentWeight = 50`. Knapsack is full.
        *   Break.

5.  Return `totalValue = 240.0`.

**Time Complexity:** O(N log N) for sorting, O(N) for iterating. Total: O(N log N).
**Space Complexity:** O(N) if storing items with ratios or if `Item` objects are created, or O(1) if sorting in-place (if allowed to modify input array) and not counting input storage.

**Edge Cases & Gotchas:**
*   **Zero capacity/empty items:** Return 0.
*   **Items with zero weight:** Handle carefully. If `value > 0`, ratio is `infinity`. If `value = 0`, ratio is `0`. `Double.POSITIVE_INFINITY` will place them first.
*   **All items fit:** The loop will complete without taking fractions.
*   **No items fit:** `totalValue` remains 0.

**Interview Tips & Variations:**
*   **Contrast with 0/1 Knapsack:** Explain why greedy works for fractional but not 0/1. For 0/1, the decision for one item affects the subproblem in a way that taking a fraction would not; this typically requires Dynamic Programming.
*   **Follow-up:** What if items have a minimum required fraction? (More complex, likely not greedy).

### 2.3. Coin Change Problem (Greedy Variant)

**Problem Statement:**
Given a set of coin denominations (e.g., {1, 5, 10, 25} for US currency) and a target `amount`, find the minimum number of coins required to make up that amount. This greedy approach specifically works for "canonical" coin systems.

**Greedy Choice Property:**
The greedy choice is to always pick the largest denomination coin that is less than or equal to the remaining amount.
*   **Intuition (for canonical systems):** For certain coin systems (like standard US currency or many European systems), taking the largest possible coin at each step does not prevent a better solution later. This is because the smaller denominations are structured in a way that they can always "fill in" any remainder without needing to use fewer larger coins.
*   **Proof Sketch (highly specific to canonical sets):** Proving this property for a general coin system is complex and often false. For canonical systems, the proof involves showing that any replacement of a large coin by smaller coins would either increase the total coin count or contradict the definition of a canonical system (where smaller coins cannot sum up to a larger coin without affecting optimality). This is usually accepted in an interview unless specifically asked for a rigorous proof for a *given* (and assumed canonical) set.

**When Greedy Fails (Non-Canonical Example):**
Consider denominations: `{1, 3, 4}` and target `amount = 6`.
*   **Greedy:**
    *   Take 4 (rem 2, count 1)
    *   Take 1 (rem 1, count 2)
    *   Take 1 (rem 0, count 3)
    *   Total coins: 3 (4, 1, 1)
*   **Optimal:**
    *   Take 3 (rem 3, count 1)
    *   Take 3 (rem 0, count 2)
    *   Total coins: 2 (3, 3)
Here, greedy failed. For such cases, dynamic programming (e.g., `dp[i] = min(dp[i-coin_val] + 1)`) is required.

**Algorithm (for canonical sets):**
1.  Sort the coin `denominations` in descending order. (Or simply iterate backwards if already sorted ascending).
2.  Initialize `coinCount = 0` and `remainingAmount = amount`.
3.  Iterate through the sorted denominations from largest to smallest:
    *   While `remainingAmount` is greater than or equal to the current `coin` value:
        *   Subtract `coin` from `remainingAmount`.
        *   Increment `coinCount`.
4.  If `remainingAmount` is 0, return `coinCount`. Otherwise, return -1 (indicating the amount cannot be made).

**Example Walkthrough:**

Denominations: `{1, 5, 10, 25}`, Amount: `68`.

1.  **Sort Denominations (descending):** `{25, 10, 5, 1}`
2.  `coinCount = 0`, `remainingAmount = 68`.

3.  Iterate:
    *   **Coin 25:**
        *   `68 >= 25`: `remainingAmount = 43`, `coinCount = 1`
        *   `43 >= 25`: `remainingAmount = 18`, `coinCount = 2`
        *   `18 < 25`. Move to next coin.
    *   **Coin 10:**
        *   `18 >= 10`: `remainingAmount = 8`, `coinCount = 3`
        *   `8 < 10`. Move to next coin.
    *   **Coin 5:**
        *   `8 >= 5`: `remainingAmount = 3`, `coinCount = 4`
        *   `3 < 5`. Move to next coin.
    *   **Coin 1:**
        *   `3 >= 1`: `remainingAmount = 2`, `coinCount = 5`
        *   `2 >= 1`: `remainingAmount = 1`, `coinCount = 6`
        *   `1 >= 1`: `remainingAmount = 0`, `coinCount = 7`
        *   `0 < 1`. Move to next coin (or end of array).

4.  `remainingAmount` is 0. Return `coinCount = 7`.

**Time Complexity:** O(D log D) for sorting denominations (if not already sorted) or O(D) if already sorted, where D is the number of denominations.
**Space Complexity:** O(1) (if sorting in-place) or O(D) if a copy of denominations is made for sorting.

**Edge Cases & Gotchas:**
*   **Amount 0:** Returns 0 coins.
*   **Negative amount:** Returns -1.
*   **No denominations:** Returns -1.
*   **Amount not perfectly divisible (e.g., amount 7 with {5,10}):** Returns -1.
*   **Non-canonical sets:** The biggest gotcha! Always clarify if the coin system is canonical or if dynamic programming is expected.

**Interview Tips & Variations:**
*   **Crucial question:** "Is the coin system canonical?" This determines if greedy is applicable. If not, pivot to Dynamic Programming.
*   **Follow-up:** Print the actual coins used, not just the count.
*   **Variation:** Limited number of coins of each denomination (much harder, typically DP or flow).

### 2.4. Minimum Number of Platforms Problem

**Problem Statement:**
Given two arrays, `arrival[]` and `departure[]`, representing the arrival and departure times of `N` trains at a railway station. Find the minimum number of platforms required for the station so that no train waits. Each platform can only be used by one train at a time.

**Greedy Choice Property:**
At any given moment, the minimum number of platforms required is the maximum number of trains that are simultaneously present at the station. We can determine this by processing arrival and departure events in chronological order.
*   **Intuition:** Imagine a counter for platforms. When a train arrives, the counter increases. When a train departs, the counter decreases. The peak value this counter reaches is the minimum number of platforms needed, because at that peak, that many trains *were* simultaneously at the station.
*   **Proof Sketch:**
    This problem can be mapped to finding the maximum overlap in a set of intervals. If `k` trains are simultaneously present, then `k` platforms are necessarily required. If we prove that we can always accommodate `k` trains with `k` platforms using this strategy, then it's optimal. By sorting all events (arrivals and departures) and processing them chronologically, we always increment the platform count for an arrival and decrement for a departure. The maximum value of this count directly reflects the maximum simultaneous occupancy. Prioritizing departures at equal times helps to free up platforms immediately, ensuring the lowest possible count.

**Algorithm:**
1.  Sort both the `arrival[]` and `departure[]` arrays in ascending order.
2.  Initialize `platformsNeeded = 0`, `maxPlatforms = 0`.
3.  Use two pointers, `i` for `arrival[]` and `j` for `departure[]`, both starting at 0.
4.  While `i < N` (number of trains) and `j < N`:
    *   If `arrival[i] <= departure[j]` (an arrival event occurs before or at the same time as a departure event):
        *   Increment `platformsNeeded` (a new train needs a platform).
        *   Move to the next arrival: `i++`.
    *   Else (`arrival[i] > departure[j]`, meaning a departure event occurs first):
        *   Decrement `platformsNeeded` (a platform becomes free).
        *   Move to the next departure: `j++`.
    *   Update `maxPlatforms = max(maxPlatforms, platformsNeeded)`.
5.  Return `maxPlatforms`.

**Example Walkthrough:**

Arrivals: `[900, 940, 950, 1100, 1500, 1800]`
Departures: `[910, 1200, 1120, 1130, 1900, 2000]`

1.  **Sort:**
    `arrival = [900, 940, 950, 1100, 1500, 1800]`
    `departure = [910, 1120, 1130, 1200, 1900, 2000]`

2.  `platformsNeeded = 0`, `maxPlatforms = 0`, `i = 0`, `j = 0`.

3.  Iterate:
    *   `i=0, j=0`: `arrival[0]=900`, `departure[0]=910`. `900 <= 910`.
        *   `platformsNeeded = 1`. `i = 1`. `maxPlatforms = 1`.
    *   `i=1, j=0`: `arrival[1]=940`, `departure[0]=910`. `940 > 910`.
        *   `platformsNeeded = 0`. `j = 1`. `maxPlatforms = 1`.
    *   `i=1, j=1`: `arrival[1]=940`, `departure[1]=1120`. `940 <= 1120`.
        *   `platformsNeeded = 1`. `i = 2`. `maxPlatforms = 1`.
    *   `i=2, j=1`: `arrival[2]=950`, `departure[1]=1120`. `950 <= 1120`.
        *   `platformsNeeded = 2`. `i = 3`. `maxPlatforms = 2`.
    *   `i=3, j=1`: `arrival[3]=1100`, `departure[1]=1120`. `1100 <= 1120`.
        *   `platformsNeeded = 3`. `i = 4`. `maxPlatforms = 3`.
    *   `i=4, j=1`: `arrival[4]=1500`, `departure[1]=1120`. `1500 > 1120`.
        *   `platformsNeeded = 2`. `j = 2`. `maxPlatforms = 3`.
    *   `i=4, j=2`: `arrival[4]=1500`, `departure[2]=1130`. `1500 > 1130`.
        *   `platformsNeeded = 1`. `j = 3`. `maxPlatforms = 3`.
    *   `i=4, j=3`: `arrival[4]=1500`, `departure[3]=1200`. `1500 > 1200`.
        *   `platformsNeeded = 0`. `j = 4`. `maxPlatforms = 3`.
    *   `i=4, j=4`: `arrival[4]=1500`, `departure[4]=1900`. `1500 <= 1900`.
        *   `platformsNeeded = 1`. `i = 5`. `maxPlatforms = 3`.
    *   `i=5, j=4`: `arrival[5]=1800`, `departure[4]=1900`. `1800 <= 1900`.
        *   `platformsNeeded = 2`. `i = 6`. `maxPlatforms = 3`.
    *   Loop terminates as `i = 6` (equal to `N`).

4.  Return `maxPlatforms = 3`.

**Visualization (ASCII Art):**

```
Arrivals:     9:00  9:40  9:50 11:00 15:00 18:00
Departures:   9:10 11:20 11:30 12:00 19:00 20:00

Timeline:
Time:      9:00  9:10  9:20  9:30  9:40  9:50 10:00 10:10 10:20 10:30 10:40 10:50 11:00 11:10 11:20 11:30 11:40 11:50 12:00 ...
Event:     A     D           A     A                           A     D     D     D
Platforms: 1     0           1     2                           3     2     1     0
Max P.:    1     1     1     1     2     2     2     2     2     2     2     2     3     3     3     3     3     3     3

       ... 15:00 16:00 17:00 18:00 19:00 20:00
Event:     A                 A     D     D
Platforms: 1                 2     1     0
Max P.:    3                 3     3     3

Maximum platforms needed = 3
```

**Time Complexity:** O(N log N) for sorting both arrays. O(N) for the two-pointer scan. Total: O(N log N).
**Space Complexity:** O(N) if copies of arrays are made, or O(1) if sorting in-place.

**Edge Cases & Gotchas:**
*   **Empty arrays/Mismatched lengths:** Return 0 or throw an error.
*   **Arrival == Departure time:** The `arrival[i] <= departure[j]` condition correctly handles this by counting an arrival first. This means the new train uses a platform *before* the departing train frees one up, which reflects a true simultaneous need. If a departing train frees a platform *at the exact same moment* a new train arrives, the platform count temporarily goes up by 1 due to the new arrival, then down by 1 due to the departure. The maximum reached is still accurate.
*   **Large number of trains:** The sorting dominates complexity.

**Interview Tips & Variations:**
*   **Alternative using a min-heap (priority queue):** Sort by arrival time. For each train, check if the earliest departing train in the heap (top of min-heap, sorted by departure time) has departed before current train arrives. If yes, pop and add current train's departure. Else, add current train's departure. Max size of heap is the answer. This approach is also O(N log N).
*   **Follow-up:** What if platforms have different capacities? (Much harder, usually not greedy).

### 2.5. Job Sequencing with Deadlines Problem

**Problem Statement:**
Given a set of `N` jobs, where each job `i` has an `id`, a `deadline d[i]`, and a `profit p[i]`. Each job takes one unit of time to complete. We can only perform one job at a time. The goal is to select a subset of jobs that can be completed by their deadlines, maximizing the total profit.

**Greedy Choice Property:**
Sort jobs by their profit in descending order. Iterate through the sorted jobs and for each job, try to schedule it in the latest possible available time slot (on or before its deadline).
*   **Intuition:** By prioritizing jobs with higher profits, we ensure that if a choice must be made between two jobs that could occupy the same time slot, the one yielding more profit is selected. Scheduling a job as late as possible (but by its deadline) keeps earlier slots open for other jobs, especially those with earlier deadlines which might not fit anywhere else.
*   **Proof Sketch:**
    Let `S` be an optimal schedule. If `S` does not include the highest-profit job `J_k` which *could* be scheduled, we could replace a lower-profit job `J_m` in `S` with `J_k` if `J_k` fits in the slot of `J_m` (or an empty slot). This replacement would either increase the profit or maintain it, implying an optimal solution can always be found including `J_k`. The "latest possible slot" strategy works because it's always better to use a later slot, leaving earlier slots for jobs that *must* finish by an earlier deadline.

**Optimal Substructure:**
After making the greedy choice (scheduling the highest-profit job in its latest possible slot), the remaining jobs and available slots form a subproblem. An optimal solution to this subproblem, combined with the greedy choice, yields an overall optimal solution.

**Algorithm:**
1.  Sort all jobs in descending order of their profit.
2.  Find the `maxDeadline` among all jobs to determine the size of the time `slots` array.
3.  Create a boolean array `slots` of size `maxDeadline + 1`, initialized to `false`. `slots[i]` will be `true` if time slot `i` is occupied.
4.  Create an empty list `scheduledJobs` to store the IDs of selected jobs.
5.  Iterate through the sorted jobs:
    *   For the current `job`, iterate downwards from its `deadline` to `1` (inclusive):
        *   If `slots[k]` is `false` (meaning time slot `k` is free):
            *   Set `slots[k] = true` (mark slot as occupied).
            *   Add `job.id` to `scheduledJobs`.
            *   Break from the inner loop (job is scheduled, move to next job).
6.  Return `scheduledJobs`.

**Example Walkthrough:**

Jobs:
J1: id='a', deadline=2, profit=100
J2: id='b', deadline=1, profit=19
J3: id='c', deadline=2, profit=27
J4: id='d', deadline=1, profit=25
J5: id='e', deadline=3, profit=15

1.  **Sort by Profit (descending):**
    J1 ('a',2,100)
    J3 ('c',2,27)
    J4 ('d',1,25)
    J2 ('b',1,19)
    J5 ('e',3,15)

2.  `maxDeadline = 3`.
3.  `slots = [F, F, F, F]` (index 0 unused, indices 1, 2, 3 for time slots).
4.  `scheduledJobs = []`.

5.  Iterate:
    *   **Job 'a' (100,2):**
        *   Try slot `k=2`. `slots[2]` is `F`.
        *   `slots[2] = T`. `scheduledJobs = ['a']`. Break.
        *   `slots = [F, F, T, F]`
    *   **Job 'c' (27,2):**
        *   Try slot `k=2`. `slots[2]` is `T`. Occupied.
        *   Try slot `k=1`. `slots[1]` is `F`.
        *   `slots[1] = T`. `scheduledJobs = ['a', 'c']`. Break.
        *   `slots = [F, T, T, F]`
    *   **Job 'd' (25,1):**
        *   Try slot `k=1`. `slots[1]` is `T`. Occupied.
        *   Loop finishes (k goes to 0). Job 'd' not scheduled.
    *   **Job 'b' (19,1):**
        *   Try slot `k=1`. `slots[1]` is `T`. Occupied.
        *   Loop finishes. Job 'b' not scheduled.
    *   **Job 'e' (15,3):**
        *   Try slot `k=3`. `slots[3]` is `F`.
        *   `slots[3] = T`. `scheduledJobs = ['a', 'c', 'e']`. Break.
        *   `slots = [F, T, T, T]`

6.  Return `scheduledJobs = ['a', 'c', 'e']`. (Note: order might differ in output list from this example, but the set of jobs is the same). Total profit: 100 + 27 + 15 = 142.

**Visualization (ASCII Art):**

```
Jobs sorted by profit:
'a': (D=2, P=100)
'c': (D=2, P=27)
'd': (D=1, P=25)
'b': (D=1, P=19)
'e': (D=3, P=15)

Time slots:
Slot 1 | Slot 2 | Slot 3
-------|--------|--------
       |        |

Processing:
1. Job 'a' (100, D=2): Schedule in Slot 2 (latest by deadline)
   Slot 1 | Slot 2 | Slot 3
   -------|--------|--------
          |  'a'   |

2. Job 'c' (27, D=2): Slot 2 is taken. Schedule in Slot 1 (latest by deadline, slot 1 free)
   Slot 1 | Slot 2 | Slot 3
   -------|--------|--------
    'c'   |  'a'   |

3. Job 'd' (25, D=1): Slot 1 is taken. Cannot schedule.
4. Job 'b' (19, D=1): Slot 1 is taken. Cannot schedule.

5. Job 'e' (15, D=3): Schedule in Slot 3 (latest by deadline)
   Slot 1 | Slot 2 | Slot 3
   -------|--------|--------
    'c'   |  'a'   |  'e'

Scheduled Jobs: 'c', 'a', 'e'
Total Profit: 27 + 100 + 15 = 142
```

**Time Complexity:**
*   Sorting: O(N log N).
*   Scheduling: In the worst case, for each of N jobs, we iterate from its deadline down to 1. If `maxDeadline` is `D_max`, this is O(N * D_max).
*   Total: O(N log N + N * D_max).
    *   Can be optimized to O(N log D_max) or O(N log N) using a Disjoint Set Union (DSU) data structure or a Max-Heap to manage free slots. However, for typical interview constraints where `D_max` is not excessively large, the boolean array approach is simpler and often acceptable.

**Space Complexity:** O(D_max) for the `slots` array, plus O(N) for the `scheduledJobs` list.

**Edge Cases & Gotchas:**
*   **Empty/Null jobs:** Return empty list.
*   **Job with deadline 0:** Cannot be scheduled as time slots start from 1.
*   **All jobs have deadline 1:** Only the highest-profit job can be scheduled.
*   **Multiple jobs with same profit:** Relative order doesn't affect total profit, but the `scheduledJobs` list might contain different jobs. The problem usually asks for *any* sequence that maximizes profit.

**Interview Tips & Variations:**
*   **DSU Optimization:** If `D_max` is very large, mention or implement the DSU optimization. The DSU finds the earliest free slot for a job `J` with deadline `d` by finding the `parent[d]` (representing the latest free slot `k <= d`).
*   **Follow-up:** What if jobs take variable time units? (Much harder, usually not greedy, might be DP or min-cost max-flow).
*   **Variations:** Similar problems involving scheduling tasks with deadlines or dependencies.

---

## 3. General Interview Tips for Greedy Algorithms

1.  **Understand the Problem Thoroughly:**
    *   What are the inputs and outputs?
    *   What are the constraints (size of N, values, time limits)?
    *   Is it an optimization problem (min/max)?

2.  **Look for a Greedy Choice:**
    *   What's the most "obvious" best step to take at any moment? (e.g., earliest finish time, highest ratio, largest coin).
    *   Can you make this choice without worrying about future consequences?

3.  **Prove or Disprove Greedy Choice (Intuition/Formal):**
    *   **Intuition:** Does the greedy choice "make sense"? Does it leave the most room for future choices or use the most valuable resources first?
    *   **Formal (Sketch):** Can you show that there's always an optimal solution that includes your greedy choice? (Exchange Argument: Assume an optimal solution doesn't make the greedy choice, then show how you can modify it to include the greedy choice without losing optimality).
    *   **Counter-example:** If you suspect greedy might *not* work, try to construct a simple counter-example. This is often easier than a full proof for problems where greedy is incorrect.

4.  **Identify Optimal Substructure:**
    *   Once you make a greedy choice, what's the remaining subproblem?
    *   Does the optimal solution to the original problem depend on the optimal solution to this subproblem?

5.  **Algorithm Design:**
    *   How will you sort the input (if necessary)? Sorting is a very common preprocessing step for greedy algorithms.
    *   What data structures will you use (arrays, lists, heaps, disjoint sets)?
    *   How will you iterate and make choices?

6.  **Analyze Complexity:**
    *   **Time Complexity:** Dominated by sorting or the main loop.
    *   **Space Complexity:** For auxiliary data structures or copies of inputs.

7.  **Consider Edge Cases:**
    *   Empty inputs, null inputs.
    *   Single element inputs.
    *   All elements are the same.
    *   Constraints at boundaries (e.g., capacity 0, deadline 1).

8.  **Discuss Alternatives (Brute Force / DP):**
    *   Briefly explain how a brute-force approach would look (usually exponential).
    *   If greedy doesn't work, mention dynamic programming as a common alternative and why it would be needed (overlapping subproblems, optimal substructure, but no greedy choice property).

9.  **Communicate Clearly:**
    *   Explain your thought process.
    *   Walk through an example with your chosen algorithm.
    *   Discuss trade-offs.

By following these steps, you'll be well-prepared to tackle greedy algorithm problems in interviews.
```