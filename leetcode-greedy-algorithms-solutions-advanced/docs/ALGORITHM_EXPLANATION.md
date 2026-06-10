```markdown
# 📚 Greedy Algorithms: Comprehensive Explanation

## What are Greedy Algorithms?

Greedy algorithms are a class of algorithms that follow a problem-solving heuristic of making the locally optimal choice at each stage with the hope of finding a global optimum. In many problems, a greedy strategy does *not* produce an optimal solution, but for some specific problems, it does.

### Characteristics of Greedy Algorithms

1.  **Greedy Choice Property:** A global optimum can be reached by making locally optimal (greedy) choices. This means that if we make the best immediate choice, we are guaranteed to be on the path to the best overall solution.
2.  **Optimal Substructure:** An optimal solution to the problem contains optimal solutions to subproblems. This is a property shared with Dynamic Programming, but greedy algorithms typically make a choice and then solve one subproblem, whereas DP typically solves many overlapping subproblems.

### When to Use Greedy Algorithms

Greedy algorithms are typically faster and simpler to implement than dynamic programming or other complex approaches. They are suitable when:

*   You can prove the greedy choice property holds. This often involves an "exchange argument" or showing that the greedy choice can always be part of an optimal solution.
*   The problem structure allows for local choices to lead to a global optimum.

### How to Prove Correctness (Intuition)

The most common technique to prove that a greedy algorithm is optimal is by using an **exchange argument**:

1.  **Identify the greedy choice:** Clearly state what local choice your algorithm makes at each step.
2.  **Assume an optimal solution:** Assume there exists an optimal solution `OPT` that does *not* make the same greedy choice as your algorithm at some step.
3.  **Show an exchange:** Demonstrate that you can modify `OPT` by "exchanging" some elements to incorporate the greedy choice, without decreasing the overall optimality (and possibly improving it). This new solution `OPT'` will still be optimal and will now include the greedy choice.
4.  **Repeat (or inductive step):** Argue that you can continue this process, step by step, transforming `OPT` into a solution that makes all greedy choices, without ever sacrificing optimality. Since the final transformed solution is the greedy one and it's optimal, the greedy approach must be optimal.

---

## 🎯 Problem Explanations and Solutions

### 1. Activity Selection Problem

*   **Problem Statement:** Given `N` activities, each with a start time `s_i` and a finish time `f_i`. A person can only perform one activity at a time. Select the maximum number of non-overlapping activities.
*   **Greedy Choice:** Sort activities by their **finish times** in ascending order. Always pick the activity that finishes earliest among the remaining activities that are compatible with the previously selected activities.
*   **Why it Works (Intuition):** Choosing an activity that finishes earliest leaves the maximum amount of time available for subsequent activities. If we picked an activity that finished later, it would reduce the number of activities we could potentially schedule afterward.
*   **Algorithm Steps:**
    1.  Sort all activities based on their finish times.
    2.  Select the first activity (which has the earliest finish time). Add it to your result.
    3.  Iterate through the remaining activities. For each activity, if its start time is greater than or equal to the finish time of the last selected activity, select it and update the last selected activity's finish time.
*   **Time Complexity:** `O(N log N)` due to sorting, `O(N)` for iteration. Dominant is `O(N log N)`.
*   **Space Complexity:** `O(N)` for storing sorted activities (if copy is made) or `O(1)` if sorting in-place (not counting output). `O(K)` for the result, where `K` is number of selected activities.

---

### 2. Fractional Knapsack Problem

*   **Problem Statement:** Given a set of items, each with a weight `w_i` and a value `v_i`, and a knapsack with a maximum weight capacity `W`. Maximize the total value of items that can be put into the knapsack, where items can be broken down (i.e., you can take fractions of items).
*   **Greedy Choice:** Calculate the **value-to-weight ratio (v/w)** for each item. Always pick the item (or a fraction of it) that has the highest ratio.
*   **Why it Works (Intuition):** By prioritizing items with a higher value-to-weight ratio, we ensure that we are getting the most "bang for our buck" for every unit of weight we put into the knapsack. This maximizes the value gained for the limited capacity. An exchange argument would show that swapping a high-ratio item for a low-ratio item (or vice-versa) always leads to a less optimal or equally optimal solution.
*   **Algorithm Steps:**
    1.  For each item, calculate its value-to-weight ratio (`ratio = value / weight`).
    2.  Sort all items in descending order based on this ratio.
    3.  Iterate through the sorted items:
        *   If the current item's full weight fits into the remaining knapsack capacity, take the whole item.
        *   Otherwise, take a fraction of the item that exactly fills the remaining capacity.
    4.  Sum the values of the taken items (or fractions) to get the total maximum value.
*   **Time Complexity:** `O(N log N)` due to sorting, `O(N)` for iteration. Dominant is `O(N log N)`.
*   **Space Complexity:** `O(N)` for storing augmented items (with ratios) and the result.

---

### 3. Coin Change Problem (Greedy Variant)

*   **Problem Statement:** Given a set of coin denominations and an amount, find the minimum number of coins required to make up that amount.
*   **Greedy Choice:** Always pick the largest possible coin denomination that is less than or equal to the remaining amount.
*   **Why it Works (Intuition - _when it works!_):** For "canonical" coin systems (like standard US or Euro currency), this strategy works because the denominations are structured such that using a smaller coin when a larger one is available would never lead to a better solution. For instance, in US currency, you'd never use two dimes instead of a quarter to make change for 25 cents.
*   **IMPORTANT CAVEAT:** The greedy strategy **DOES NOT** work for all coin systems!
    *   **Example where it fails:** Denominations = `[1, 3, 4]`, Amount = `6`
        *   **Greedy:** Take 4 (remaining 2) -> Take 1 (remaining 1) -> Take 1 (remaining 0). Total: 3 coins (`4, 1, 1`).
        *   **Optimal:** Take 3 (remaining 3) -> Take 3 (remaining 0). Total: 2 coins (`3, 3`).
    *   For a general coin system, **Dynamic Programming** is required for an optimal solution. (See `solutions_comparison/coinChange_optimizedDP.js`)
*   **Algorithm Steps (Greedy):**
    1.  Sort the coin denominations in descending order.
    2.  Initialize `totalCoins = 0` and `remainingAmount = amount`.
    3.  Iterate through the sorted denominations:
        *   For the current denomination, calculate how many times it can fit into `remainingAmount`.
        *   Add this count to `totalCoins`.
        *   Subtract the value of these coins from `remainingAmount`.
    4.  If `remainingAmount` is 0 at the end, `totalCoins` is the greedy answer. Otherwise, it's impossible (by greedy).
*   **Time Complexity:** `O(D log D)` for sorting (if not pre-sorted) + `O(D)` for iteration, where `D` is the number of denominations. Dominant is `O(D log D)`.
*   **Space Complexity:** `O(D)` for storing sorted denominations and coins used.

---

### 4. Job Sequencing with Deadlines

*   **Problem Statement:** Given a set of jobs, each with a deadline `d_i` and a profit `p_i`. Each job takes unit time to complete. Find a sequence of jobs that can be performed to maximize the total profit, such that each job is completed by its deadline.
*   **Greedy Choice:** Sort jobs by **profit in descending order**. For each job, try to schedule it in the latest possible time slot (from 1 to its deadline) that is still available.
*   **Why it Works (Intuition):** By prioritizing higher-profit jobs, we ensure that the most valuable jobs are considered first. Placing a job in the latest possible free slot before its deadline keeps earlier slots open. This is beneficial because earlier slots might be the *only* available slots for other high-profit jobs with tighter deadlines.
*   **Algorithm Steps:**
    1.  Sort all jobs in descending order of their profits.
    2.  Determine the maximum deadline among all jobs. This will define the number of available time slots.
    3.  Create an array (or hash map) to represent the time slots, initially all empty. Let `slots[i]` denote the job scheduled for time `i+1`.
    4.  Iterate through the sorted jobs:
        *   For the current job, search for an available time slot starting from its deadline (`job.deadline - 1` if 0-indexed) down to 0.
        *   If a slot is found (i.e., `slots[i]` is empty), schedule the job in that slot, add its profit to `totalProfit`, and mark the slot as occupied. Then move to the next job.
*   **Time Complexity:** `O(N log N)` for sorting. The scheduling loop can be `O(N * MaxDeadline)` in the worst case (if `MaxDeadline` is large). A more efficient solution using Disjoint Set Union (DSU) or a Max-Heap can optimize the scheduling to `O(N log MaxDeadline)` or `O(N log N)`.
*   **Space Complexity:** `O(MaxDeadline)` for the time slots array, plus `O(N)` for sorted jobs and the result.

---

### 5. Gas Station Problem (Circular Tour)

*   **Problem Statement:** You have `N` gas stations on a circular route. `gas[i]` is the amount of gas at station `i`, and `cost[i]` is the cost to travel from station `i` to `i + 1`. Find the starting station index from which you can complete a full circular tour once, or return -1 if impossible.
*   **Greedy Choice:**
    1.  First, check if the `sum(gas)` is less than `sum(cost)`. If it is, return -1 immediately, as you don't have enough total gas for the journey.
    2.  If `sum(gas) >= sum(cost)`, a solution *must* exist. Iterate through the stations, keeping track of the `currentTripTank`. If `currentTripTank` ever drops below zero, it means the current starting point (or any prior point in this continuous segment) is not valid. Reset `currentTripTank` to 0 and set the next station (`i + 1`) as the new potential `startStation`.
*   **Why it Works (Intuition):**
    *   **Existence of Solution:** If total gas is greater than or equal to total cost, a solution always exists. This is a mathematical property related to sums in a circular array.
    *   **Finding the Start:** If you start at station `A` and run out of gas at station `B` (before reaching `A` again), then any station `S` between `A` and `B` (inclusive of `A`, exclusive of `B`) cannot be a valid starting point either. If you could have started at `S` and made it to `B`, you would have had a non-negative tank. But since starting at `A` led to a negative tank at `B`, and `S` is "behind" `B` in the failed segment, `S` must also fail. Therefore, if a trip from `startStation` fails at `i`, the next potential `startStation` must be `i + 1`. This effectively "skips" all impossible start points.
*   **Algorithm Steps:**
    1.  Initialize `totalGasInTank = 0` (for overall check), `currentTripTank = 0` (for current segment check), and `startStation = 0`.
    2.  Iterate from `i = 0` to `N-1`:
        *   Calculate `netGain = gas[i] - cost[i]`.
        *   Add `netGain` to `totalGasInTank`.
        *   Add `netGain` to `currentTripTank`.
        *   If `currentTripTank < 0`, reset `currentTripTank = 0` and set `startStation = i + 1`.
    3.  After the loop, if `totalGasInTank < 0`, return -1.
    4.  Otherwise, return `startStation`.
*   **Time Complexity:** `O(N)` because we iterate through the stations array once.
*   **Space Complexity:** `O(1)` as only a few auxiliary variables are used.

---
```