# Greedy Algorithms - Core Concepts and Explanations

Greedy algorithms are a class of algorithms that follow the problem-solving heuristic of making the locally optimal choice at each stage with the hope of finding a global optimum. In many problems, a greedy strategy does not produce an optimal solution, but for some specific problems, it does.

## When Does a Greedy Algorithm Work?

A greedy algorithm typically works for a problem if it possesses two key properties:

1.  **Greedy Choice Property:** A global optimal solution can be reached by making a locally optimal (greedy) choice. That is, a greedy choice made at any step of the algorithm must be part of some optimal solution. This property is often proven by showing that if an optimal solution does not include the greedy choice, it can be modified to include it without worsening the solution.

2.  **Optimal Substructure Property:** An optimal solution to the problem contains optimal solutions to subproblems. This is similar to what's required for Dynamic Programming, but with greedy algorithms, the choice made at each step *reduces* the problem to a subproblem, and the optimal solution to the original problem combines this choice with an optimal solution to the subproblem.

If both properties hold, a greedy strategy is likely to yield an optimal solution. If only the optimal substructure property holds, it usually suggests Dynamic Programming.

---

## Detailed Explanation for Each Problem

### 1. Activity Selection Problem

**Greedy Choice Property Intuition:**
Suppose we have a set of activities `S`. Let `a1` be the activity in `S` with the earliest finish time. Any optimal solution `A` can be modified to include `a1`.
*   If `A` already contains `a1`, we're good.
*   If `A` does not contain `a1`, let `ak` be the activity in `A` with the earliest finish time. Since `a1` finishes no later than `ak` (`f1 <= fk`), replacing `ak` with `a1` in `A` will result in a new set `A'` that is still a valid (non-overlapping) solution and has the same number of activities. This is because `a1` frees up time no later than `ak`, thus it is compatible with all activities in `A` that start after `ak` finishes. Hence, there is always an optimal solution that includes the activity with the earliest finish time.

**Optimal Substructure Property Intuition:**
After selecting `a1` (the activity with the earliest finish time), the problem is reduced to selecting the maximum number of non-overlapping activities from the set of activities `S'` that start *after* `a1` finishes. An optimal solution for `S'` combined with `a1` forms an optimal solution for `S`.

**Algorithm Steps:**
1.  Sort all activities by their finish times in non-decreasing order.
2.  Select the first activity from the sorted list.
3.  For each subsequent activity, if its start time is greater than or equal to the finish time of the previously selected activity, select it.

**Complexity:** O(N log N) for sorting, O(N) for selection. Total: O(N log N).

---

### 2. Coin Change Problem (Greedy vs. Dynamic Programming)

As discussed, the greedy strategy for Coin Change is *not* always optimal.

**Greedy Strategy (for canonical systems):**
1.  Sort denominations in descending order.
2.  Repeatedly take the largest coin less than or equal to the remaining amount.

**Greedy Choice Property (only for canonical systems):**
For canonical coin systems (e.g., US cents: 1, 5, 10, 25), it can be proven by contradiction that taking the largest possible coin at each step does not preclude an optimal solution. However, this proof is specific to the values of the denominations.

**Optimal Substructure Property (general):**
If an amount `A` can be optimally made with `k` coins, say `c1, c2, ..., ck`, then `A - c1` must be optimally made with `k-1` coins (`c2, ..., ck`). This property holds generally.

**Why Greedy Fails for Non-Canonical Systems (Example):**
Denominations: `{1, 3, 4}`, Target Amount: `6`
*   **Greedy:**
    1.  Take `4` (largest `D <= 6`). Remaining: `2`.
    2.  Take `1` (largest `D <= 2`). Remaining: `1`.
    3.  Take `1` (largest `D <= 1`). Remaining: `0`.
    *   Total coins: `4, 1, 1` (3 coins).
*   **Optimal (using DP):**
    *   `6 = 3 + 3` (2 coins).
The greedy choice of `4` prevents the optimal solution.

**Dynamic Programming for General Coin Change:**
The problem is a classic DP problem: `dp[i]` = minimum coins to make amount `i`.
`dp[i] = min(dp[i - coin_j] + 1)` for all coins `j` such that `coin_j <= i`.
This method always yields the optimal solution for any set of denominations.

**Complexity (Greedy):** O(D log D + Amount) for D denominations.
**Complexity (DP):** O(Amount * D).

---

### 3. Fractional Knapsack Problem

**Greedy Choice Property Intuition:**
Let `I` be the set of items. Calculate value-per-weight `v_i/w_i` for all items. Let `i_max` be an item with the highest `v/w` ratio.
Suppose there's an optimal solution `OPT` that doesn't take `i_max` entirely (or takes a lesser amount of it than possible) but takes some amount of an item `i_low` with a lower `v/w` ratio. We can replace a small portion of `i_low` with an equivalent weight of `i_max`. Since `i_max` has a higher `v/w` ratio, this replacement will either increase the total value or keep it the same, thus leading to another optimal solution that includes more of `i_max`. This shows that taking as much as possible of the highest `v/w` ratio item is always part of an optimal solution.

**Optimal Substructure Property Intuition:**
If we take a certain amount `x` of an item `i` (either whole or fractional), the problem reduces to filling the remaining knapsack capacity `W - x*w_i` with the remaining items (or remaining portions of `i` if `x` was fractional, which isn't generally how it's framed after taking a fraction to fill capacity). The optimal solution for this subproblem, combined with item `i` (or its taken fraction), forms an optimal solution for the original problem.

**Algorithm Steps:**
1.  For each item, compute its value-to-weight ratio (`v/w`).
2.  Sort all items in descending order based on their `v/w` ratio.
3.  Iterate through the sorted items:
    *   If the current item's weight is less than or equal to the remaining knapsack capacity, take the entire item and add its value to the total. Reduce capacity.
    *   Otherwise, take a fraction of the item equal to the remaining capacity. Add the proportional value to the total. The knapsack is now full, so stop.

**Complexity:** O(N log N) for sorting, O(N) for iterating. Total: O(N log N).

---

### 4. Job Sequencing with Deadlines

**Greedy Choice Property Intuition:**
Sort jobs by profit in descending order. Consider the highest profit job `J`. If `J` can be scheduled by its deadline, it should be scheduled. If not, then it cannot be part of any optimal solution that includes `J` because we are trying to maximize profit. By scheduling `J` in the latest possible slot before its deadline, we save earlier slots for other high-profit jobs that might have tighter deadlines. This greedy choice prioritizes maximum immediate gain while maintaining flexibility for future choices.

**Optimal Substructure Property Intuition:**
If a set of jobs `J_set` is an optimal sequence, and `J_k` is the first job scheduled in `J_set`, then the remaining `J_set - {J_k}` must be an optimal sequence for the remaining available time slots. This allows breaking down the problem into smaller, similar problems.

**Algorithm Steps:**
1.  Sort all jobs in descending order of their profits.
2.  Determine the maximum deadline among all jobs. This defines the maximum number of time slots available.
3.  Initialize an array (or list) representing time slots, marked as empty.
4.  Iterate through the sorted jobs:
    *   For each job, try to place it in a free time slot, starting from `deadline - 1` down to `0`.
    *   The first free slot found is where the job is placed. Mark this slot as occupied and add the job's profit to the total.
    *   If no free slot is found before its deadline, the job cannot be scheduled.

**Complexity:** O(N log N) for sorting. The slot finding involves a loop of N jobs, and an inner loop of at most `maxDeadline` iterations. So, O(N * maxDeadline). In the worst case, this can be O(N^2) if `maxDeadline` is proportional to N. Can be optimized to O(N log N) with a Disjoint Set Union (DSU) data structure for slot management.

---

### 5. Minimize Cash Flow

**Greedy Choice Property Intuition:**
The sum of all positive balances (total money owed to creditors) must equal the sum of all negative balances (total money owed by debtors). By identifying the maximum creditor (owed the most) and the maximum debtor (owes the most), and settling the minimum of their absolute values, we are directly addressing the largest imbalances. This single transaction reduces the number of participants with non-zero balances by at least one (either the debtor or creditor, or both, become balanced). This is a strong greedy choice because it reduces the overall "tension" in the system most effectively.

**Optimal Substructure Property Intuition:**
After a transaction between the max debtor and max creditor, their balances are updated. The problem then becomes minimizing cash flow for the remaining people with non-zero balances, which is a smaller instance of the same problem. The optimal solution to the overall problem combines this single transaction with the optimal solution of the reduced problem.

**Algorithm Steps:**
1.  Create a map `person -> net_balance`. Iterate through all initial transactions to compute the net balance for each person. A positive balance means they are a creditor, negative means a debtor.
2.  Loop while there are still people with non-zero balances:
    *   Find the person with the most negative balance (max debtor) and the person with the most positive balance (max creditor).
    *   Calculate the settlement amount: `min(abs(max_debtor_balance), max_creditor_balance)`.
    *   Record a new transaction: `max_debtor pays max_creditor` the `settlement_amount`.
    *   Update the balances of `max_debtor` and `max_creditor` by adding/subtracting the `settlement_amount`.
    *   Remove any person from the map whose balance becomes effectively zero (accounting for floating-point inaccuracies with an epsilon).

**Complexity:** O(M) for initial balance calculation (M transactions). Then, O(N) iterations (where N is the number of distinct people), and each iteration involves finding max/min in a map (O(N) for iteration, O(1) for map ops). Total: O(M + N^2).

---