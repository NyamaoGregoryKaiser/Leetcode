# Greedy Algorithms: Detailed Explanations

This document provides in-depth explanations of the greedy algorithms implemented in this project. For each problem, we cover the problem statement, the core greedy choice, a sketch of why it's optimal (or when it fails), the algorithm steps, complexity analysis, and relevant interview tips.

---

## Table of Contents
1.  [Introduction to Greedy Algorithms](#1-introduction-to-greedy-algorithms)
2.  [Activity Selection Problem](#2-activity-selection-problem)
3.  [Fractional Knapsack Problem](#3-fractional-knapsack-problem)
4.  [Coin Change Problem (Greedy Variant)](#4-coin-change-problem-greedy-variant)
5.  [Job Sequencing with Deadlines](#5-job-sequencing-with-deadlines)
6.  [Minimum Platforms Required](#6-minimum-platforms-required)

---

## 1. Introduction to Greedy Algorithms

**What is a Greedy Algorithm?**
A greedy algorithm is an algorithmic paradigm that follows the problem-solving heuristic of making the locally optimal choice at each stage with the hope of finding a global optimum. In many problems, a greedy strategy does not produce an optimal solution, but for certain specific problem classes, it does.

**Key Characteristics of Problems Solved by Greedy Algorithms:**

1.  **Optimal Substructure**: An optimal solution to the problem contains optimal solutions to subproblems. This is also a characteristic of dynamic programming.
2.  **Greedy Choice Property**: A globally optimal solution can be reached by making a locally optimal (greedy) choice. This is the distinguishing feature of greedy algorithms. Once a greedy choice is made, it can never be undone; it's a "take it or leave it" decision.

**How to Prove Optimality of a Greedy Algorithm:**

There are two common methods to prove that a greedy algorithm produces an optimal solution:

1.  **Greedy Stays Ahead**: Show that after each step, the greedy solution is at least as good as any optimal solution.
2.  **Exchange Argument**: Show that if there is an optimal solution that differs from the greedy solution, you can "exchange" a part of the optimal solution with a part of the greedy solution without degrading the quality of the optimal solution, eventually transforming the optimal solution into the greedy one.

---

## 2. Activity Selection Problem

**Problem Statement:**
Given a set of `N` activities, each with a start time `s_i` and a finish time `f_i`, select the maximum number of non-overlapping activities that can be performed by a single person or resource. An activity `i` and `j` are non-overlapping if `s_i >= f_j` or `s_j >= f_i`.

**Example:**
Activities: (0,6), (3,5), (1,4), (5,7), (5,9), (8,11), (6,10), (8,12), (12,14), (2,13)

**Greedy Choice:**
Always select the activity that has the **earliest finish time** among the remaining compatible activities.

**Why this choice is optimal (Sketch of Exchange Argument):**
1.  Sort all activities by their finish times in non-decreasing order.
2.  Let `A` be the set of activities sorted by finish time.
3.  Let `G = {g_1, g_2, ..., g_k}` be the solution produced by the greedy algorithm.
4.  Let `O = {o_1, o_2, ..., o_m}` be an optimal solution.
5.  If `G` is not equal to `O`, let `g_1` be the first activity chosen by the greedy algorithm (it has the earliest finish time among all activities).
6.  If `o_1 = g_1`, then we continue to the subproblem of activities compatible with `g_1`.
7.  If `o_1 != g_1`, then `f(g_1) <= f(o_1)` because `g_1` has the earliest finish time overall.
8.  Consider a new optimal solution `O' = {g_1, o_2', ..., o_m'}` where we replace `o_1` with `g_1`.
    *   Since `f(g_1) <= f(o_1)`, `g_1` finishes no later than `o_1`.
    *   This means all activities `o_2, ..., o_m` that were compatible with `o_1` are also compatible with `g_1` (or even more so, as `g_1` frees up time earlier).
    *   Thus, `O'` is also a valid set of non-overlapping activities, and it has the same number of activities as `O` (which is optimal).
9.  By repeatedly applying this exchange, we can transform any optimal solution into the greedy solution without decreasing the number of activities. This implies the greedy solution is optimal.

**Algorithm Steps:**
1.  Sort the activities based on their finish times in non-decreasing order.
2.  Initialize an empty list `selectedActivities` and add the first activity from the sorted list to it.
3.  Keep track of the finish time of the last selected activity.
4.  Iterate through the remaining activities:
    *   If the current activity's start time is greater than or equal to the finish time of the last selected activity, add the current activity to `selectedActivities` and update the `lastSelectedActivity`'s finish time.
5.  Return `selectedActivities`.

**ASCII Diagram (Timeline):**

```
Activities:
A1: |----| (1,4)
A2:   |---| (3,5)
A3: |------| (0,6)
A4:         |--| (5,7)
A5:     |-------| (3,8)
A6:           |----| (5,9)
A7:             |----| (6,10)
A8:                 |---| (8,11)
A9:                 |----| (8,12)
A10:  |---------| (2,13)
A11:                     |---| (12,14)

Sorted by finish time:
A1(1,4), A2(3,5), A3(0,6), A4(5,7), A5(3,8), A6(5,9), A7(6,10), A8(8,11), A9(8,12), A10(2,13), A11(12,14)

Greedy Selection:
1. Select A1 (1,4). Last finish = 4.
Selected: [A1]

2. A2(3,5): Start 3 < Last finish 4. Overlaps. Skip.
3. A3(0,6): Start 0 < Last finish 4. Overlaps. Skip.
4. A4(5,7): Start 5 >= Last finish 4. Select A4. Last finish = 7.
Selected: [A1, A4]

5. A5(3,8): Start 3 < Last finish 7. Overlaps. Skip.
6. A6(5,9): Start 5 < Last finish 7. Overlaps. Skip.
7. A7(6,10): Start 6 < Last finish 7. Overlaps. Skip.
8. A8(8,11): Start 8 >= Last finish 7. Select A8. Last finish = 11.
Selected: [A1, A4, A8]

9. A9(8,12): Start 8 < Last finish 11. Overlaps. Skip.
10. A10(2,13): Start 2 < Last finish 11. Overlaps. Skip.
11. A11(12,14): Start 12 >= Last finish 11. Select A11. Last finish = 14.
Selected: [A1, A4, A8, A11]

Final Selection: [A1(1,4), A4(5,7), A8(8,11), A11(12,14)]
```

**Time Complexity:**
*   Sorting activities: `O(N log N)` where `N` is the number of activities.
*   Iterating through sorted activities: `O(N)`.
*   Total: `O(N log N)`.

**Space Complexity:**
*   `O(N)` for storing the sorted list of activities (if a copy is made).
*   `O(N)` for the result list.

**Edge Cases & Gotchas:**
*   **Empty input**: Should return an empty list.
*   **Single activity**: Should return that activity.
*   **All activities overlap**: Should return only one activity (the one with the earliest finish time).
*   **Activities with identical start/finish times**: Sorting stability or tie-breaking rules generally don't affect optimality for this specific problem, as long as the earliest finish is prioritized.

**Variations:**
*   **Weighted activity selection**: If activities have weights/profits, it becomes a dynamic programming problem (0/1 Knapsack style), as a greedy choice by finish time might not yield maximum profit.
*   **Multiple resources**: If there are `K` resources, this can be solved using a min-priority queue to track available resource finish times.

---

## 3. Fractional Knapsack Problem

**Problem Statement:**
Given a set of `N` items, each with a weight `w_i` and a value `v_i`, and a knapsack with a maximum capacity `W`. Determine the maximum total value that can be placed in the knapsack. Items can be broken into fractions (e.g., taking half an item means taking half its weight and half its value).

**Example:**
Capacity `W = 50`
Items:
*   Item1: weight=10, value=60
*   Item2: weight=20, value=100
*   Item3: weight=30, value=120

**Greedy Choice:**
Always pick the item (or a fraction of an item) that has the **highest value-to-weight ratio** (value per unit weight).

**Why this choice is optimal (Sketch of Exchange Argument):**
1.  Sort all items in descending order of their value-to-weight ratio.
2.  Let `G` be the greedy solution, and `O` be an optimal solution.
3.  Assume `G` and `O` differ. Let `i` be the first item (highest ratio) where `G` and `O` take different quantities.
4.  If `G` takes more of item `i` than `O` does:
    *   This means `O` either filled its capacity with items of lower ratio or still has some capacity left.
    *   If `O` has capacity left, it can take more of `i` to increase its value.
    *   If `O` is full, it must have taken some amount of items `j` (where `j` is an item processed later in the greedy approach, thus `ratio(j) < ratio(i)`) to compensate for not taking enough of `i`.
    *   We can "exchange" some amount of `j` in `O` with an equal weight of `i`. Since `ratio(i) > ratio(j)`, this exchange will increase the total value of `O` without changing its total weight, contradicting the optimality of `O` unless `ratio(i) = ratio(j)`.
5.  If `G` takes less of item `i` than `O` does: This would mean `G` is suboptimal, which contradicts the greedy choice that `i` has the highest ratio.
6.  This argument implies that to achieve maximum value, one must prioritize items with higher value-to-weight ratios.

**Algorithm Steps:**
1.  For each item, calculate its value-to-weight ratio (`value / weight`).
2.  Sort all items in descending order based on this ratio.
3.  Initialize `totalValue = 0` and `currentWeight = 0`.
4.  Iterate through the sorted items:
    *   If adding the entire current item's weight (`item.weight`) to `currentWeight` does not exceed the knapsack `capacity`:
        *   Add `item.value` to `totalValue`.
        *   Add `item.weight` to `currentWeight`.
    *   Else (the item cannot be taken entirely):
        *   Calculate the `remainingCapacity = capacity - currentWeight`.
        *   Calculate the `fraction = remainingCapacity / item.weight`.
        *   Add `fraction * item.value` to `totalValue`.
        *   Set `currentWeight = capacity` (knapsack is now full).
        *   Break the loop.
5.  Return `totalValue`.

**ASCII Diagram (Concept):**

```
Knapsack Capacity: W

Items sorted by Value/Weight Ratio (highest first):
Item A (High Ratio)
Item B (Medium Ratio)
Item C (Low Ratio)

           [Item A fully taken]
           --------------------
Capacity:  |//////////////////|
           |                  |
           [Item B fully taken]
           |//////////////////|
           |                  |
           [Fraction of Item C]
           |//////////        |
           --------------------
```

**Time Complexity:**
*   Calculating ratios for `N` items: `O(N)`.
*   Sorting items: `O(N log N)`.
*   Iterating through sorted items: `O(N)`.
*   Total: `O(N log N)`.

**Space Complexity:**
*   `O(N)` for storing items and their ratios (if not modifying in place).

**Edge Cases & Gotchas:**
*   **Zero capacity**: Should return 0.
*   **Empty items list**: Should return 0.
*   **Items with zero weight**: If `weight = 0` and `value > 0`, its ratio is theoretically infinite. These items should always be taken first (fully) as they provide value without consuming capacity. The implementation handles this by returning `POSITIVE_INFINITY` for ratio.
*   **Items with zero value**: If `value = 0`, their ratio is 0. They will only be taken if all other items are exhausted and capacity remains, or if all other items also have 0 value.

**Variations:**
*   **0/1 Knapsack Problem**: Items cannot be broken into fractions (either take the whole item or none). This is a classic Dynamic Programming problem and **cannot be solved optimally using a greedy approach**.
*   **Bounded Knapsack**: Multiple copies of each item are available. Also usually solved with DP.

---

## 4. Coin Change Problem (Greedy Variant)

**Problem Statement:**
Given a set of coin denominations (e.g., `[1, 5, 10, 25]` for US cents) and a target `amount`, find the minimum number of coins needed to make up that amount.

**Greedy Choice:**
Always pick the largest coin denomination that is less than or equal to the remaining amount.

**Why this choice works / fails:**
*   **It works for canonical coin systems**: A coin system is canonical if the greedy algorithm always produces an optimal solution. Examples include the US currency system (`1, 5, 10, 25` cents) and the Euro currency system (`1, 2, 5, 10, 20, 50` cents, `1, 2` Euros). For these systems, the greedy choice is locally and globally optimal.
*   **It fails for non-canonical coin systems**: Consider `coins = {1, 3, 4}` and `amount = 6`.
    *   Greedy approach:
        1.  Take `4` (remaining: `2`). `Coins used: 1`
        2.  Take `1` (remaining: `1`). `Coins used: 2`
        3.  Take `1` (remaining: `0`). `Coins used: 3`
        *   Total coins: `3` (`4, 1, 1`).
    *   Optimal solution:
        *   Take `3` (remaining: `3`). `Coins used: 1`
        *   Take `3` (remaining: `0`). `Coins used: 2`
        *   Total coins: `2` (`3, 3`).
    In this case, the greedy approach `(4+1+1)` is not optimal compared to `(3+3)`. This is because the greedy choice (`4`) restricted future choices in a way that led to a suboptimal global solution.

**Algorithm Steps (for systems where greedy works):**
1.  Sort the coin denominations in descending order.
2.  Initialize `coinCount = 0` and `currentAmount = targetAmount`.
3.  Iterate through the sorted coin denominations (from largest to smallest):
    *   While `currentAmount` is greater than or equal to the current `coin` denomination:
        *   Subtract `coin` from `currentAmount`.
        *   Increment `coinCount`.
4.  If `currentAmount` becomes `0`, return `coinCount`.
5.  If after checking all coins, `currentAmount` is still not `0`, it means the amount cannot be made (or not optimally by greedy for non-canonical systems), so return -1.

**ASCII Diagram (Example: US Coins, Amount 63):**

```
Coins: {1, 5, 10, 25}
Amount: 63

Sorted Coins (desc): {25, 10, 5, 1}

1. Current Amount = 63. Largest coin <= 63 is 25.
   Take 25. Amount = 63 - 25 = 38. Coins = 1.
   Take 25. Amount = 38 - 25 = 13. Coins = 2.
   (Cannot take 25 again)

2. Current Amount = 13. Largest coin <= 13 is 10.
   Take 10. Amount = 13 - 10 = 3. Coins = 3.
   (Cannot take 10 again)

3. Current Amount = 3. Largest coin <= 3 is 5. No.
   Largest coin <= 3 is 1.

4. Current Amount = 3. Largest coin <= 3 is 1.
   Take 1. Amount = 3 - 1 = 2. Coins = 4.
   Take 1. Amount = 2 - 1 = 1. Coins = 5.
   Take 1. Amount = 1 - 1 = 0. Coins = 6.
   (Amount is 0)

Result: 6 coins (2x25, 1x10, 3x1)
```

**Time Complexity:**
*   Sorting coins: `O(C log C)` where `C` is the number of denominations.
*   Iterating and subtracting: In the worst case, if the smallest coin is 1, it might subtract up to `amount` times. So, `O(C + amount)`.
*   Total: `O(C log C + amount)`. If `C` is small (like real-world currencies), this is very efficient.

**Space Complexity:**
*   `O(C)` for storing a copy of sorted coins.
*   `O(1)` otherwise.

**Edge Cases & Gotchas:**
*   **Amount is 0**: Should return 0 coins.
*   **Empty coin set**: Should throw an error or return -1.
*   **Amount cannot be made**: If the smallest coin is greater than the amount, or if all coins are too large (and `amount > 0`), it should return -1.
*   **Non-canonical systems**: As discussed, greedy will fail. For a general solution, **Dynamic Programming** is required. The `alternative/CoinChangeDP.java` file demonstrates this.
*   **Coin values**: Assumed to be positive integers. Zero or negative coin values would lead to incorrect behavior or infinite loops.

**Variations:**
*   **Coin Change (Minimum Coins for any system)**: Solved with Dynamic Programming. This is a common interview question to differentiate between "greedy works" and "greedy fails" scenarios.
*   **Coin Change (Number of Ways)**: A DP problem, distinct from minimum coins.

---

## 5. Job Sequencing with Deadlines

**Problem Statement:**
Given a set of `N` jobs. Each job `i` has a profit `p_i` and a deadline `d_i`. Each job takes exactly one unit of time to complete. The goal is to select a subset of jobs to maximize the total profit, such that each selected job is completed by its deadline. Only one job can be executed at a time.

**Example:**
Jobs:
*   J1: (deadline=2, profit=100)
*   J2: (deadline=1, profit=10)
*   J3: (deadline=2, profit=15)
*   J4: (deadline=1, profit=25)

**Greedy Choice:**
Always select the job with the **highest profit** first. If a job can be scheduled, schedule it as **late as possible** (but still before its deadline) without overlapping with an already scheduled job.

**Why this choice is optimal (Sketch of Exchange Argument):**
1.  **Sort by Profit**: Prioritizing higher profit jobs is intuitive. If we have a choice between a high-profit and a low-profit job for a single slot, we pick the high-profit one.
2.  **Schedule as Late as Possible**: This is crucial. If a high-profit job can be scheduled on day `k` (its deadline) or day `k-1`, scheduling it on day `k` keeps day `k-1` open. Day `k-1` might be the deadline for a different, potentially lower-profit job that we haven't considered yet (because it has lower profit and is further down the sorted list). By keeping earlier slots open, we maximize opportunities for jobs with tighter deadlines.

**Algorithm Steps:**
1.  Sort the jobs in descending order of their profit.
2.  Find the `maxDeadline` among all jobs. This determines the maximum possible time slot available.
3.  Create a boolean array `slots` of size `maxDeadline + 1`, initialized to `false`. `slots[t]` will be `true` if time slot `t` is occupied. (Or an array of job IDs to store which job is scheduled).
4.  Initialize `totalProfit = 0`.
5.  Iterate through the sorted jobs (highest profit first):
    *   For the current job `j`, try to find an available time slot. Iterate backwards from `min(maxDeadline, j.deadline)` down to `1`.
    *   If a slot `t` is found where `slots[t]` is `false`:
        *   Mark `slots[t] = true`.
        *   Add `j.profit` to `totalProfit`.
        *   Break the inner loop (job `j` is scheduled).
6.  Return `totalProfit`.

**ASCII Diagram (Example above):**

```
Jobs: (J1:D2,P100), (J2:D1,P10), (J3:D2,P15), (J4:D1,P25)
Max Deadline = 2. Slots array: [F, F, F] (indices 0, 1, 2)

1. Sort by Profit (desc): J1(100), J4(25), J3(15), J2(10)

Processing J1 (D:2, P:100):
   Try slots from min(2,2)=2 down to 1.
   Slot 2 is free. Schedule J1 at day 2.
   Slots: [F, F, T] (Job J1 at day 2)
   Total Profit = 100.

Processing J4 (D:1, P:25):
   Try slots from min(2,1)=1 down to 1.
   Slot 1 is free. Schedule J4 at day 1.
   Slots: [F, T, T] (Job J4 at day 1, J1 at day 2)
   Total Profit = 100 + 25 = 125.

Processing J3 (D:2, P:15):
   Try slots from min(2,2)=2 down to 1.
   Slot 2 is taken. Slot 1 is taken. No free slot by deadline 2. Skip J3.

Processing J2 (D:1, P:10):
   Try slots from min(2,1)=1 down to 1.
   Slot 1 is taken. No free slot by deadline 1. Skip J2.

Final Total Profit: 125
Scheduled jobs (by day): Day 1: J4, Day 2: J1
```

**Time Complexity:**
*   Sorting jobs: `O(N log N)` where `N` is the number of jobs.
*   Finding `maxDeadline`: `O(N)`.
*   Looping through jobs: `N` times.
*   Inner loop for slot finding: In the worst case, it iterates `maxDeadline` times.
*   Total: `O(N log N + N * maxDeadline)`.
*   **Optimization with Disjoint Set Union (DSU) or Priority Queue**: A more advanced approach using DSU or a Max-Heap (PriorityQueue) to manage available slots can reduce the slot finding to nearly `O(alpha(maxDeadline))` or `O(log maxDeadline)`, bringing the total complexity closer to `O(N log N)`.

**Space Complexity:**
*   `O(N)` for storing sorted jobs.
*   `O(maxDeadline)` for the `slots` boolean array.

**Edge Cases & Gotchas:**
*   **Empty jobs list**: Should return 0 profit.
*   **All jobs have the same deadline**: The algorithm will schedule jobs based on profit in descending order, filling slots `deadline, deadline-1, ...`
*   **Deadlines are very large**: If `maxDeadline` is much larger than `N`, the `N * maxDeadline` factor can make the simple boolean array approach inefficient. This is where DSU or PriorityQueue optimization becomes important.
*   **Invalid jobs**: Jobs with non-positive deadlines or negative profits are typically invalid input.

**Variations:**
*   **Job scheduling with arbitrary processing times**: If jobs take more than 1 unit of time, the problem becomes significantly harder and often requires dynamic programming or more complex scheduling algorithms.
*   **Job scheduling on multiple machines**: Extends the problem complexity, often requiring approximations or more advanced techniques.

---

## 6. Minimum Platforms Required

**Problem Statement:**
Given two arrays, `arrival` and `departure`, representing the arrival and departure times of all trains at a railway station. Find the minimum number of platforms required so that no train has to wait.
Assume all arrival and departure times are in `HHMM` format (e.g., 900 for 09:00, 1120 for 11:20).

**Example:**
Arrival: `[900, 940, 950, 1100, 1500, 1800]`
Departure: `[910, 1200, 1120, 1130, 1900, 2000]`

**Greedy Choice:**
Sort both the `arrival` and `departure` time arrays. Iterate through them, treating arrivals as needing a platform and departures as freeing one. Keep track of the maximum number of platforms needed simultaneously.

**Why this choice is optimal:**
This problem can be viewed as finding the maximum number of overlapping intervals. By sorting both arrival and departure events, we create a chronological sequence of events.
*   When a train arrives (`arrival[i]`), it requires a platform. So, we increment the count of platforms currently in use.
*   When a train departs (`departure[j]`), it frees a platform. So, we decrement the count.
*   The greedy choice is to always process the event that occurs earliest. If an arrival and departure happen at the exact same time, it's safer to consider the arrival first (increment platform count) and then the departure (decrement), assuming the train needs the platform for a moment before the departing train fully clears it. However, typically, `arrival_i <= departure_i`, and if `arrival_k == departure_j`, it's usually considered that the platform is freed *before* the new train needs it, so a departure event would be processed *before* an arrival at the same time. The implementation follows the conventional `sortedArrival[i] <= sortedDeparture[j]` logic, which means an arrival at time `t` uses a new platform if a departure at time `t` hasn't happened yet. If they are equal, arrival counts first. If we wanted departure first, it would be `sortedArrival[i] < sortedDeparture[j]`. The problem statement usually clarifies tie-breaking or the problem logic implies it. For simplicity, assume `arrival` takes precedence for equality.

The maximum value of the "platforms in use" counter at any point in time will be the minimum number of platforms required to handle all trains without any waiting. This is because this counter precisely reflects the peak concurrent usage of platforms.

**Algorithm Steps:**
1.  Sort the `arrival` array in non-decreasing order.
2.  Sort the `departure` array in non-decreasing order.
3.  Initialize `platformsNeeded = 0`, `maxPlatforms = 0`.
4.  Initialize two pointers, `i = 0` for the `arrival` array and `j = 0` for the `departure` array.
5.  While both pointers are within array bounds (`i < N` and `j < N`):
    *   If `sortedArrival[i] <= sortedDeparture[j]`:
        *   This means an arrival event is the next to occur (or occurs simultaneously with a departure).
        *   Increment `platformsNeeded`.
        *   Move to the next arrival: `i++`.
    *   Else (`sortedArrival[i] > sortedDeparture[j]`):
        *   This means a departure event is the next to occur.
        *   Decrement `platformsNeeded` (a platform is freed).
        *   Move to the next departure: `j++`.
    *   Update `maxPlatforms = max(maxPlatforms, platformsNeeded)`.
6.  Return `maxPlatforms`.

**ASCII Diagram (Example above):**

```
Arrival:   [900, 940, 950, 1100, 1500, 1800]
Departure: [910, 1120, 1130, 1200, 1900, 2000] (sorted departure times)

Pointers: i=0 (arrival), j=0 (departure)
Platforms: current = 0, max = 0

Events in Chronological Order:
----------------------------------------------------------------------------------------------------
Time | Event     | Platforms Needed | Max Platforms | i | j | Notes
-----|-----------|------------------|---------------|---|---|-------------------------------------
900  | A[0] (900)| 1                | 1             | 1 | 0 | A[0] <= D[0] (900 <= 910)
910  | D[0] (910)| 0                | 1             | 1 | 1 | A[0] > D[0] (940 > 910), D[0] departs
940  | A[1] (940)| 1                | 1             | 2 | 1 | A[1] <= D[1] (940 <= 1120)
950  | A[2] (950)| 2                | 2             | 3 | 1 | A[2] <= D[1] (950 <= 1120)
1100 | A[3] (1100)| 3                | 3             | 4 | 1 | A[3] <= D[1] (1100 <= 1120)  <-- Peak!
1120 | D[1] (1120)| 2                | 3             | 4 | 2 | A[3] > D[1] (1500 > 1120), D[1] departs
1130 | D[2] (1130)| 1                | 3             | 4 | 3 | A[3] > D[2] (1500 > 1130), D[2] departs
1200 | D[3] (1200)| 0                | 3             | 4 | 4 | A[3] > D[3] (1500 > 1200), D[3] departs
1500 | A[4] (1500)| 1                | 3             | 5 | 4 | A[4] <= D[4] (1500 <= 1900)
1800 | A[5] (1800)| 2                | 3             | 6 | 4 | A[5] <= D[4] (1800 <= 1900)
1900 | D[4] (1900)| 1                | 3             | 6 | 5 | A[5] > D[4] (End of A, D[4] departs)
2000 | D[5] (2000)| 0                | 3             | 6 | 6 | A[5] > D[5] (End of A, D[5] departs)
----------------------------------------------------------------------------------------------------

Final Result: 3
```

**Time Complexity:**
*   Sorting `arrival` array: `O(N log N)`.
*   Sorting `departure` array: `O(N log N)`.
*   Merging (two-pointer iteration): `O(N)`.
*   Total: `O(N log N)`.

**Space Complexity:**
*   `O(N)` for creating sorted copies of the `arrival` and `departure` arrays.
*   `O(1)` if sorting in-place on the input arrays (if allowed).

**Edge Cases & Gotchas:**
*   **Empty arrays**: Should return 0 platforms.
*   **Single train**: Should return 1 platform.
*   **All trains arrive and depart sequentially**: Should return 1 platform.
*   **All trains arrive before any departure**: `N` platforms required.
*   **Mismatched array lengths**: Should throw an `IllegalArgumentException`.
*   **Times are integers**: The algorithm assumes integer times, correctly handling chronological order. If times were `float` or required special time parsing, that would be an additional step.

**Variations:**
*   **Train with multiple stops/sections**: Each section would be an interval.
*   **Finding the specific time when max platforms are needed**: Can be done by tracking the `platformsNeeded` value along with the `time` when `maxPlatforms` was updated.
*   **Scheduling with limited platforms**: This would become a scheduling problem where some trains might be delayed or rerouted if enough platforms are not available.

---

## Conclusion on Greedy Algorithms

Greedy algorithms are powerful for problems exhibiting the greedy choice property and optimal substructure. They are generally simpler and more efficient than dynamic programming solutions when applicable. However, it's crucial to correctly identify if a greedy strategy will yield an optimal solution. When in doubt, or for problems like the 0/1 Knapsack or general Coin Change, dynamic programming is often the correct approach. Always consider proof of optimality or counter-examples to validate a greedy strategy.

---