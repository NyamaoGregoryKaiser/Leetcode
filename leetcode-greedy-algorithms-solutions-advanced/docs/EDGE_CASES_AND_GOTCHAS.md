```markdown
# ⚠️ Edge Cases and Gotchas for Greedy Algorithms

Understanding common pitfalls and edge cases is critical for robust algorithm design and interview success. Greedy algorithms, in particular, often have subtle conditions under which they succeed or fail.

---

## General Greedy Gotchas

1.  **When Greedy Fails (The Biggest Gotcha):** The most crucial point about greedy algorithms is that they are *not* universally optimal. Many problems that appear to be greedy actually require Dynamic Programming or other techniques. Always try to prove correctness or find a counterexample.
    *   **How to spot it:** If your greedy choice can "paint you into a corner" such that a local optimum prevents a better global optimum later, it's likely not a pure greedy problem.
    *   **Example:** Coin Change with non-canonical denominations (e.g., `[1, 3, 4]` for amount `6`).

2.  **Incorrect Greedy Choice:** Even if a problem *is* solvable by a greedy approach, choosing the wrong "locally optimal" property can lead to incorrect results.
    *   **How to spot it:** If your proposed greedy choice doesn't have a clear exchange argument or intuitive proof, it's suspect.
    *   **Example:** For Activity Selection, sorting by start time instead of finish time. Sorting by start time doesn't guarantee the most future time available.

3.  **Tie-breaking Rules:** When two or more choices yield the same "greedy" value, the tie-breaking rule can sometimes matter, although often it doesn't affect the *optimal count/total* but might affect *which specific items* are chosen.
    *   **How to handle:**
        *   If the problem asks for *any* optimal solution, a stable sort or arbitrary tie-breaking is fine.
        *   If it asks for a *specific* optimal solution (e.g., lexicographically smallest IDs), then your tie-breaking must reflect that.
    *   **Example:** Activity Selection with multiple activities ending at the same time. The order of these in the sorted list might depend on a secondary sort key (e.g., start time, or original ID).

---

## Problem-Specific Edge Cases & Gotchas

### 1. Activity Selection Problem

*   **Empty input:** An empty list of activities should result in an empty list of selected activities.
*   **Single activity:** If there's only one activity, it should always be selected.
*   **All activities overlap:** Only one activity (the one with the earliest finish time) should be selected.
*   **Activities with identical start/finish times:** The sort order should be stable or handle these consistently. If `(1,5)` and `(0,5)` exist, `(0,5)` (earlier start) might be preferred if finishes are equal. Our current implementation simply relies on `a.finish - b.finish` which might not be fully stable across JS engines for complex objects, but `Array.prototype.sort` is generally stable. For `a.finish === b.finish`, the original relative order is preserved.
*   **Zero start/finish times:** Activities starting at 0 or having duration 0 (start=finish) should be handled. If start=finish, it means it occupies a "point in time" and finishes immediately, allowing another activity to start at that same time. Our current `currentActivity.start >= lastFinishTime` covers this.

### 2. Fractional Knapsack Problem

*   **Empty items list:** Returns 0 value and an empty list of items.
*   **Zero capacity:** Returns 0 value and an empty list of items.
*   **Single item:** Handles cases where it fits fully or as a fraction.
*   **Items with zero weight:** This would lead to division by zero for the value-to-weight ratio. Usually, problem constraints specify positive weights. If not, these items could be considered "free" and always taken if `value > 0`, or filtered out if `value = 0`. Our implementation does not explicitly handle `weight = 0`, assuming `weight > 0`.
*   **Items with negative values:** Not typical for knapsack, but if allowed, a greedy choice would only pick positive value items.
*   **Floating point precision:** Calculations involving ratios and fractions can introduce tiny floating-point errors. Use `toFixed()` or `toBeCloseTo()` in tests for comparisons.

### 3. Coin Change Problem (Greedy Variant)

*   **THE BIGGEST GOTCHA:** As discussed, this is the prime example of where a greedy algorithm **fails** for non-canonical coin systems. Always be ready to discuss this limitation and suggest Dynamic Programming as the general solution.
*   **Amount is 0:** Returns 0 coins.
*   **Negative amount:** Returns an indicator of impossibility (e.g., -1).
*   **No denominations:** Returns -1.
*   **Amount impossible to make (even with greedy):** E.g., denominations `[2, 4]` for amount `5`. Returns -1.
*   **Denominations not sorted:** The algorithm must sort them internally.
*   **Smallest denomination is not 1:** If the smallest denomination is greater than 1, many amounts might be impossible to make (e.g., `[5, 10]` for amount `3`).

### 4. Job Sequencing with Deadlines

*   **Empty jobs list:** Returns 0 profit and an empty sequence.
*   **Single job:** If its deadline is >= 1, it should be scheduled.
*   **All jobs have deadline 1:** Only the single highest profit job can be scheduled.
*   **All jobs have the same deadline > 1:** The top `MaxDeadline` highest profit jobs will be scheduled.
*   **Max deadline is very large:** The `slots` array can become very large (`O(MaxDeadline)` space). While our current `O(N * MaxDeadline)` time complexity for slot finding is often acceptable for typical interview constraints, be aware that more optimized solutions exist (e.g., using a Disjoint Set Union data structure) for very sparse or very large deadline ranges.
*   **Jobs with profit 0 or negative:** Usually problems assume positive profits. If not, jobs with 0 or negative profit would typically not be chosen unless they enable other profitable jobs (which isn't the case in standard job sequencing).

### 5. Gas Station Problem (Circular Tour)

*   **Empty `gas` or `cost` arrays:** Returns -1 (or handle as per specific problem constraints, e.g., if N=0 is valid, what's expected?). Our implementation handles null/empty/mismatched arrays as -1.
*   **Single station:** Simple `gas[0] >= cost[0]` check.
*   **Total gas < total cost:** This is the primary check. If `sum(gas) < sum(cost)`, it's impossible, return -1. This is a crucial early exit.
*   **All gas/cost are 0:** Should return 0 (start at station 0), as you can complete the tour with no gas needed.
*   **Solution at the very end:** The `startStation` might only be finalized after the last iteration, correctly pointing to a station near the end of the array.
*   **Large numbers:** Ensure sum calculations don't overflow (JavaScript handles large integers well with `Number`, but it's a concern in other languages).

By keeping these edge cases and common mistakes in mind, you can write more robust and correct greedy algorithms, and also demonstrate a deeper understanding during an interview.
```