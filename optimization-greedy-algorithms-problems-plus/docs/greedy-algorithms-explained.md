# Understanding Greedy Algorithms

Greedy algorithms are a class of algorithms that follow a problem-solving heuristic of making the locally optimal choice at each stage with the hope of finding a global optimum. In many problems, a greedy strategy does not produce an optimal solution, but for a large class of problems, it does.

## What are Greedy Algorithms?

A greedy algorithm builds a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit. It never reconsiders its choices. This "take what you can get now" approach makes greedy algorithms simple to design and often very efficient.

### Key Properties for Greedy Optimality

For a greedy algorithm to yield an optimal solution, two properties are usually required:

1.  **Greedy Choice Property:** A global optimum can be reached by making a sequence of locally optimal (greedy) choices. In other words, there exists an optimal solution that starts with the greedy choice. If you make the greedy choice, the problem reduces to a subproblem that also has an optimal solution.

    *   **How to check:** Consider an optimal solution `O`. If the greedy choice `G` is not part of `O`, can you modify `O` to include `G` without worsening the solution (and possibly improving it)? This is often done using an "exchange argument" (see below).

2.  **Optimal Substructure:** An optimal solution to the problem contains optimal solutions to its subproblems. This is a property shared with Dynamic Programming problems, but for greedy algorithms, the optimal solution to a subproblem must extend an optimal solution to the original problem in a specific way.

    *   **How to check:** After making a greedy choice, what remains? If the remaining problem is a smaller instance of the same problem, and an optimal solution to the original problem can be constructed from the greedy choice plus an optimal solution to the subproblem, then it has optimal substructure.

### When to Use Greedy Algorithms

*   When the problem asks for optimization (min/max something).
*   When a "straightforward" or "obvious" choice at each step seems to work.
*   When you suspect that past choices don't affect future options in a way that would negate previous benefits (i.e., no need to backtrack).

### Limitations

*   Greedy algorithms often fail when the greedy choice property does not hold. The locally optimal choice might lead to a suboptimal global solution (e.g., the general Coin Change problem).
*   Proving the correctness (optimality) of a greedy algorithm can be challenging.

## Proof Techniques for Greedy Algorithms

The most common way to prove the correctness of a greedy algorithm is using an **Exchange Argument** (or "Greedy Stays Ahead").

**Exchange Argument Steps:**

1.  **Assume an Optimal Solution:** Assume, for contradiction, that there exists an optimal solution `O` that does NOT make the greedy choice at some point.
2.  **Identify the First Deviation:** Find the first point where `O` differs from the solution constructed by the greedy algorithm (`G`).
3.  **Construct a Modified Optimal Solution:** Show how to "exchange" part of `O` (the part that deviates from `G`) with the greedy choice without decreasing the overall optimality. This new solution `O'` should be at least as good as `O` (and therefore also optimal), but it makes the greedy choice.
4.  **Repeat (or Induction):** If `O'` still deviates from `G` at a later point, you can repeat the exchange process. This implies that there *must* exist an optimal solution that follows the greedy strategy completely.

## Implemented Greedy Problems

### 1. Activity Selection Problem

**Problem:** Select the maximum number of non-overlapping activities from a given set of activities, each with a start and finish time.

**Greedy Choice:** Always choose the activity that finishes earliest among the remaining compatible activities.

**Why it works (Intuition):** By picking the activity that finishes earliest, you maximize the remaining time available for subsequent activities. This leaves the "most room" for future compatible activities.

**ASCII Diagram:**
```
Activities:
  A: |---S_A---F_A---|
  B:       |---S_B---F_B---|
  C:                 |---S_C---F_C---|
  D:   |-----S_D-----F_D-----|  (overlaps A, B)

Sorted by Finish Time: A, B, C (assuming these are ordered by finish)
1. Pick A. Remaining time: after F_A.
2. Next compatible after F_A: B. Pick B. Remaining time: after F_B.
3. Next compatible after F_B: C. Pick C.
Result: A, B, C (3 activities)
```
**Proof Idea (Exchange Argument):** Suppose an optimal solution `O` does not pick the earliest-finishing activity `a_1`. Let `a_j` be the first activity in `O`. Since `a_1` finishes earliest, `f_1 <= f_j`. We can replace `a_j` with `a_1` in `O` to form a new solution `O'`. Since `f_1 <= f_j`, `a_1` finishes no later than `a_j`, thus `O'` is still valid and has at least as many activities as `O`. `O'` is an optimal solution that makes the greedy choice.

---

### 2. Fractional Knapsack Problem

**Problem:** Given items with values and weights, and a knapsack capacity, maximize total value by taking fractions of items.

**Greedy Choice:** Prioritize items with the highest value-to-weight ratio.

**Why it works (Intuition):** Since you can take fractions, you want to get the most "bang for your buck" for every unit of weight you add to the knapsack. The item with the highest value per unit of weight is the best choice at any moment.

**ASCII Diagram:**
```
Knapsack Capacity: [ ]
Items (Value/Weight, Ratio):
  A: (60/10), R=6
  B: (100/20), R=5
  C: (120/30), R=4

Sorted by Ratio (desc): A, B, C

Knapsack Filling:
Capacity: 50
+-------------------------------------------------+
|                                                 |
+-------------------------------------------------+

1. Take all of A (Weight 10, Value 60)
   Remaining Capacity: 40. Total Value: 60
   +-------------------------------------------------+
   |AAAAAAAAAA                                       |
   +-------------------------------------------------+

2. Take all of B (Weight 20, Value 100)
   Remaining Capacity: 20. Total Value: 60+100=160
   +-------------------------------------------------+
   |AAAAAAAAAABBBBBBBBBBBBBBBBBBBB                   |
   +-------------------------------------------------+

3. Take fraction of C (Weight 30, Value 120, Capacity 20 remaining)
   Fraction = 20/30 = 2/3. Weight taken = 20. Value added = (2/3)*120 = 80
   Remaining Capacity: 0. Total Value: 160+80=240
   +-------------------------------------------------+
   |AAAAAAAAAABBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCC |
   +-------------------------------------------------+

Max Value: 240
```
**Proof Idea (Exchange Argument):** Suppose an optimal solution `O` exists where an item `i` with `ratio_i` is chosen over an item `j` with `ratio_j`, but `ratio_j > ratio_i`, and it would have been possible to take more of `j`. We can remove a small weight `delta_w` of item `i` from `O` and add `delta_w` of item `j`. The total weight remains the same, but the value changes by `delta_w * ratio_j - delta_w * ratio_i`. Since `ratio_j > ratio_i`, this change is positive, meaning we increased the total value without exceeding capacity. This contradicts the optimality of `O`, unless `O` already prioritizes higher ratios.

---

### 3. Coin Change Problem (Greedy Variant)

**Problem:** Find the minimum number of coins to make a given `amount` using a set of `denominations`.

**Greedy Choice:** Always choose the largest denomination coin that is less than or equal to the remaining `amount`.

**Why it works (for canonical systems):** For standard currency systems (like US, Euro), this greedy choice property holds. The denominations are structured in a way that taking the largest possible coin never prevents an optimal solution.

**ASCII Diagram (for Amount=63, Denominations=[25, 10, 5, 1]):**
```
Amount: 63
Denominations: [25, 10, 5, 1] (sorted descending)

1. Current Amount = 63. Largest coin <= 63 is 25.
   Take 25. Amount = 38. Used: [25]
   Take 25. Amount = 13. Used: [25, 25]

2. Current Amount = 13. Largest coin <= 13 is 10.
   Take 10. Amount = 3. Used: [25, 25, 10]

3. Current Amount = 3. Largest coin <= 3 is 1.
   Take 1. Amount = 2. Used: [25, 25, 10, 1]
   Take 1. Amount = 1. Used: [25, 25, 10, 1, 1]
   Take 1. Amount = 0. Used: [25, 25, 10, 1, 1, 1]

Total Coins: 6
```
**Limitation:** This greedy approach is **not universally optimal**. For denominations like `{1, 3, 4}` and target `6`:
*   Greedy: `[4, 1, 1]` (3 coins)
*   Optimal: `[3, 3]` (2 coins)
In such cases, Dynamic Programming is required to find the true optimal solution. The greedy choice property does not hold.

---

### 4. Job Sequencing with Deadlines

**Problem:** Given jobs with deadlines and profits (each takes 1 unit time), maximize total profit by scheduling jobs by their deadline.

**Greedy Choice:** Sort jobs by profit in descending order. For each job, schedule it in the latest possible free slot before its deadline.

**Why it works (Intuition):** Prioritizing higher-profit jobs ensures that you maximize the profit contribution of each chosen job. Scheduling them as late as possible reserves earlier slots for other potentially high-profit jobs with tighter deadlines, which might not be able to use those later slots.

**ASCII Diagram (Example from `job-sequencing.ts`):**
```
Jobs:
 A: P=100, D=2
 B: P=19,  D=1
 C: P=27,  D=2
 D: P=25,  D=1
 E: P=15,  D=3

Sorted by Profit (desc): A (100,2), C (27,2), D (25,1), B (19,1), E (15,3)
Max Deadline = 3. Available Slots: [slot 1, slot 2, slot 3]

Process A (P=100, D=2): Find latest free slot <= 2. Slot 2 is free. Schedule A in slot 2.
   Slots: [_, A, _]
   Profit: 100

Process C (P=27, D=2): Find latest free slot <= 2. Slot 2 is taken. Slot 1 is free. Schedule C in slot 1.
   Slots: [C, A, _]
   Profit: 100 + 27 = 127

Process D (P=25, D=1): Find latest free slot <= 1. Slot 1 is taken. No free slots. Skip D.
   Slots: [C, A, _]
   Profit: 127

Process B (P=19, D=1): Find latest free slot <= 1. Slot 1 is taken. No free slots. Skip B.
   Slots: [C, A, _]
   Profit: 127

Process E (P=15, D=3): Find latest free slot <= 3. Slot 3 is free. Schedule E in slot 3.
   Slots: [C, A, E]
   Profit: 127 + 15 = 142

Final Scheduled Jobs (by slot order): [C, A, E]. Total Profit: 142.
```
**Proof Idea (Exchange Argument):** Suppose an optimal solution `O` does not schedule the highest profit job `J` or schedules it in an earlier slot than necessary (before its deadline `D`). If `J` is not in `O`, we can potentially replace a lower-profit job in `O` (that occupies a slot `s <= D`) with `J`, maintaining schedule validity and increasing profit. If `J` is in `O` but in slot `t < D` while slot `D` is free, we can move `J` to slot `D`, freeing `t` for another job that might only fit in an earlier slot, thus potentially increasing the number of jobs or maintaining it while keeping `J` scheduled. This logic shows that an optimal solution can always be transformed to match the greedy choices.

---