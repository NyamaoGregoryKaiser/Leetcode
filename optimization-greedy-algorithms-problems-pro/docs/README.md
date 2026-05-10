# Greedy Algorithms - Problem Descriptions

This document provides a brief overview of the problems tackled in this project, outlining their core challenge and why a greedy approach is applicable (or sometimes not).

---

## 1. Activity Selection Problem

**Problem:** Given a set of `n` activities, each with a start time `s_i` and a finish time `f_i`. Select the maximum number of non-overlapping activities that can be performed by a single person or a single resource. Activities `i` and `j` are non-overlapping if `f_i <= s_j` or `f_j <= s_i`.

**Greedy Strategy:** Sort activities by their finish times. Always select the activity that finishes earliest among the remaining compatible activities.

**Why Greedy Works:** This strategy ensures that we leave the maximum possible time available for subsequent activities. By picking the earliest finishing activity, we maximize the "room" for future choices. This problem exhibits both the **Greedy Choice Property** and **Optimal Substructure Property**.

---

## 2. Coin Change Problem (Greedy for Canonical Systems)

**Problem:** Given a set of coin denominations (e.g., `[1, 5, 10, 25]` for US currency) and a target amount, find the minimum number of coins required to make up that amount.

**Greedy Strategy:** Sort denominations in descending order. Repeatedly take the largest possible denomination coin that is less than or equal to the remaining amount until the amount becomes zero.

**Why Greedy (Sometimes) Works:** The greedy approach for coin change is *not universally optimal*. It works only for specific "canonical" coin systems (like standard US or Euro currency systems) where taking the largest coin first never leads to a suboptimal solution. For arbitrary coin systems (e.g., `[1, 3, 4]` for an amount of `6`), a greedy approach (`4+1+1 = 3` coins) fails where Dynamic Programming (`3+3 = 2` coins) provides the optimal solution.

**Note:** The implementation in this project includes both the greedy approach (for canonical systems) and a dynamic programming approach (for arbitrary systems) to highlight this distinction.

---

## 3. Fractional Knapsack Problem

**Problem:** Given a set of items, each with a weight `w_i` and a value `v_i`, and a knapsack with a maximum capacity `W`. Maximize the total value of items in the knapsack, where items can be taken in fractions.

**Greedy Strategy:** Calculate the value-to-weight ratio (`v_i / w_i`) for each item. Sort the items in descending order based on this ratio. Iterate through the sorted items, taking as much of each item as possible (either whole or fractional) until the knapsack capacity is reached.

**Why Greedy Works:** Because items can be broken into fractions, prioritizing items that yield the most value per unit of weight is always optimal. If we were to take a lower `v/w` item instead of a higher `v/w` item (or part of it), we could always improve or maintain the total value by swapping a portion of the lower `v/w` item for the higher `v/w` one. This problem exhibits the **Greedy Choice Property** and **Optimal Substructure Property**.

**Contrast with 0/1 Knapsack:** In the 0/1 Knapsack problem (items must be taken whole or not at all), the greedy strategy fails, and dynamic programming or other complex algorithms are required.

---

## 4. Job Sequencing with Deadlines

**Problem:** Given a set of jobs, each with a deadline `d_i` and a profit `p_i`. Each job takes one unit of time. The goal is to select a subset of jobs and sequence them to maximize the total profit, such that each selected job is completed by its deadline. Only one job can be processed at a time.

**Greedy Strategy:** Sort all jobs in descending order of their profits. Iterate through the sorted jobs. For each job, try to schedule it in the latest possible available time slot that is before or at its deadline.

**Why Greedy Works:** By prioritizing high-profit jobs and scheduling them as late as possible (but still within their deadlines), we maximize the chance of including high-value jobs while keeping earlier time slots open for other jobs that might have tight deadlines. This approach ensures that we don't miss out on higher profits and efficiently utilize time slots. This problem also exhibits the **Greedy Choice Property** and **Optimal Substructure Property**.

---

## 5. Minimize Cash Flow Among a Given Set of Friends

**Problem:** Given a list of transactions where various people pay amounts to others, determine a minimized set of transactions that settles all debts with the minimum number of actual payments.

**Greedy Strategy:**
1.  Calculate the net balance for each person (total received - total paid).
    *   Positive balance: Creditor (owed money).
    *   Negative balance: Debtor (owes money).
2.  Repeatedly find the person who owes the maximum amount (max debtor) and the person who is owed the maximum amount (max creditor).
3.  The max debtor pays the max creditor an amount equal to the minimum of the debtor's absolute debt and the creditor's balance.
4.  Update their balances. At least one of them will have their balance become zero.
5.  Repeat until all balances are zero.

**Why Greedy Works:** This greedy strategy aims to resolve the largest outstanding financial discrepancies at each step. By settling the maximum possible amount between the most extreme debtor and creditor, we guarantee that at least one person's account is balanced, thus reducing the problem size and minimizing the total number of transactions required to reach equilibrium. This problem exhibits the **Greedy Choice Property** and **Optimal Substructure Property**.

---