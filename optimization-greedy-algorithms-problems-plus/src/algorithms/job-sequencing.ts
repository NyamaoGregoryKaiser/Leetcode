```typescript
/**
 * src/algorithms/job-sequencing.ts
 *
 * This file implements the Job Sequencing with Deadlines problem using a greedy approach.
 *
 * Problem Description:
 * Given a set of `n` jobs, where each job `i` has a deadline `d_i` and a profit `p_i`.
 * Each job takes one unit of time to complete. We want to find a sequence of jobs that
 * maximizes the total profit, such that each selected job is completed by its deadline.
 * A job can only be completed at most once.
 *
 * Example:
 * Jobs:
 *   Job A: Deadline=2, Profit=100
 *   Job B: Deadline=1, Profit=19
 *   Job C: Deadline=2, Profit=27
 *   Job D: Deadline=1, Profit=25
 *   Job E: Deadline=3, Profit=15
 *
 * Greedy Choice: Sort jobs by profit in descending order. For each job, try to schedule
 *                it in the latest possible free slot before its deadline.
 *
 * Optimal Sequence (Greedy):
 * Jobs sorted by profit: A (100, D=2), C (27, D=2), D (25, D=1), B (19, D=1), E (15, D=3)
 * Max Deadline is 3. Available slots: [slot 1, slot 2, slot 3]
 *
 * 1. Process Job A (P=100, D=2):
 *    - Try slot 2 (D=2): Free. Schedule A in slot 2.
 *    - Scheduled Jobs: [_, A, _]
 *    - Total Profit: 100
 *
 * 2. Process Job C (P=27, D=2):
 *    - Try slot 2 (D=2): Taken by A.
 *    - Try slot 1 (D=1, < D=2): Free. Schedule C in slot 1.
 *    - Scheduled Jobs: [C, A, _]
 *    - Total Profit: 100 + 27 = 127
 *
 * 3. Process Job D (P=25, D=1):
 *    - Try slot 1 (D=1): Taken by C.
 *    - Job D cannot be scheduled (no free slot before or at deadline 1). Skip.
 *
 * 4. Process Job B (P=19, D=1):
 *    - Try slot 1 (D=1): Taken by C. Skip.
 *
 * 5. Process Job E (P=15, D=3):
 *    - Try slot 3 (D=3): Free. Schedule E in slot 3.
 *    - Scheduled Jobs: [C, A, E]
 *    - Total Profit: 127 + 15 = 142
 *
 * Final Schedule: [C, A, E] (Job C in slot 1, Job A in slot 2, Job E in slot 3)
 * Total Max Profit: 142
 */

/**
 * Represents a job with an ID, deadline, and profit.
 */
export interface Job {
    id: string;      // Unique identifier for the job
    deadline: number; // The latest time unit by which the job must be completed
    profit: number;  // The profit gained if the job is completed
}

/**
 * Solves the Job Sequencing with Deadlines problem using a greedy approach.
 *
 * The greedy strategy is based on prioritizing jobs with higher profits
 * and scheduling them as late as possible but still within their deadlines.
 *
 * Algorithm Steps:
 * 1. Sort all jobs in descending order of their profits.
 * 2. Determine the maximum deadline among all jobs. This defines the total number
 *    of available time slots (from 1 to `maxDeadline`).
 * 3. Initialize an array `slots` of size `maxDeadline + 1` (using 1-based indexing for slots)
 *    to keep track of occupied time slots. Initialize all slots as free (e.g., with null/0).
 * 4. Initialize `totalProfit` to 0 and `scheduledJobs` to an empty array.
 * 5. Iterate through the sorted jobs:
 *    a. For the current job, try to find a free time slot. Start checking from its
 *       `deadline` down to 1. The goal is to schedule it as late as possible
 *       to leave earlier slots open for jobs with smaller deadlines.
 *    b. If a free slot `j` is found such that `j <= job.deadline`:
 *       i. Mark slot `j` as occupied by this job.
 *       ii. Add `job.profit` to `totalProfit`.
 *       iii. Add the job `id` to `scheduledJobs`.
 *       iv. Break from the inner loop (this job is scheduled).
 * 6. Return the `totalProfit` and `scheduledJobs`.
 *
 * Time Complexity:
 * - Sorting jobs: O(N log N), where N is the number of jobs.
 * - Finding max deadline: O(N).
 * - Iterating through jobs: N jobs.
 * - For each job, iterating through slots from deadline down to 1: O(maxDeadline).
 * - Total Time Complexity: O(N log N + N * maxDeadline).
 *   If maxDeadline is large (e.g., proportional to N^2 or N), this can be O(N^3) or O(N^2).
 *   A more optimized approach for slot finding can use Disjoint Set Union (DSU) to achieve O(N log N)
 *   or O(N * alpha(maxDeadline)) where alpha is inverse Ackermann function (nearly constant).
 *   The current implementation uses a simple array scan, making it O(N * maxDeadline).
 *
 * Space Complexity:
 * - Storing sorted jobs: O(N).
 * - Storing `slots` array: O(maxDeadline).
 * - Storing `scheduledJobs`: O(N) in the worst case.
 * - Total Space Complexity: O(N + maxDeadline).
 *
 * @param jobs An array of Job objects.
 * @returns An object containing the maximum total profit and the IDs of the scheduled jobs.
 */
export function jobSequencing(jobs: Job[]): { totalProfit: number; scheduledJobs: string[] } {
    // Edge case: No jobs provided
    if (!jobs || jobs.length === 0) {
        return { totalProfit: 0, scheduledJobs: [] };
    }

    // 1. Sort jobs in descending order of their profits.
    const sortedJobs = [...jobs].sort((a, b) => b.profit - a.profit);

    // 2. Determine the maximum deadline to set up time slots.
    let maxDeadline = 0;
    for (const job of jobs) {
        if (job.deadline > maxDeadline) {
            maxDeadline = job.deadline;
        }
    }

    // 3. Initialize an array `slots` to keep track of occupied time slots.
    // `slots[i]` will store the ID of the job scheduled in time slot `i`.
    // We use `maxDeadline + 1` size for 1-based indexing up to maxDeadline.
    const slots: (string | null)[] = new Array(maxDeadline + 1).fill(null);

    let totalProfit = 0;
    const scheduledJobs: string[] = [];

    // 5. Iterate through the sorted jobs.
    for (const job of sortedJobs) {
        // Try to schedule the job in the latest possible free slot before its deadline.
        // We iterate from `job.deadline` downwards to 1.
        for (let i = Math.min(job.deadline, maxDeadline); i >= 1; i--) {
            // If the current slot `i` is free
            if (slots[i] === null) {
                slots[i] = job.id;       // Mark slot `i` as occupied by this job
                totalProfit += job.profit; // Add job's profit to total
                scheduledJobs.push(job.id); // Add job's ID to the list of scheduled jobs
                break; // Job scheduled, move to the next job
            }
        }
    }

    // Sort scheduled jobs by their slot assignment for deterministic output (optional)
    // The current implementation fills `scheduledJobs` in order of processing,
    // which corresponds to profit-descending order. If output needs to be by slot order,
    // an additional step is required:
    // const sortedBySlot = slots.slice(1).filter(id => id !== null).map(id => jobs.find(j => j.id === id)!);
    // return { totalProfit, scheduledJobs: sortedBySlot.map(j => j.id) };

    return { totalProfit, scheduledJobs: scheduledJobs.sort((a, b) => { // Sort for deterministic test output, not strictly necessary for profit.
        const jobA = jobs.find(j => j.id === a)!;
        const jobB = jobs.find(j => j.id === b)!;
        return jobB.profit - jobA.profit; // Maintain profit-descending order
    })};
}

// --- Alternative Implementation (using Disjoint Set Union for optimized slot finding) ---
/*
* The `find` operation in DSU can effectively find the latest free slot.
* If `parent[i]` stores the next available slot *before or at* `i`,
* then `find(i)` can quickly give you the latest free slot.
*
* DSU Enhanced `jobSequencing` (conceptual):
* function jobSequencingDSU(jobs: Job[]): { totalProfit: number; scheduledJobs: string[] } {
*   const sortedJobs = [...jobs].sort((a, b) => b.profit - a.profit);
*   let maxDeadline = 0;
*   for (const job of jobs) { maxDeadline = Math.max(maxDeadline, job.deadline); }
*
*   const dsu = new DisjointSetUnion<number>();
*   for (let i = 0; i <= maxDeadline; i++) {
*     dsu.makeSet(i); // Each slot is initially its own set (its parent is itself)
*   }
*
*   let totalProfit = 0;
*   const scheduledJobs: string[] = [];
*   const finalSlots: { [slot: number]: string } = {}; // To store actual slot assignments
*
*   for (const job of sortedJobs) {
*     // Find the latest free slot available for this job (<= job.deadline)
*     // In a DSU for job sequencing, `find(i)` typically gives you the *parent*
*     // of the set `i`, which is the representative. We want the *highest*
*     // available slot <= deadline. A common DSU modification is to have
*     // `parent[i]` point to the highest available slot `j < i`.
*     // Here we can use `find(min(job.deadline, maxDeadline))` to get the highest
*     // free slot below or equal to the job's deadline.
*     const availableSlot = dsu.find(Math.min(job.deadline, maxDeadline));
*
*     if (availableSlot > 0) { // Slot 0 is typically a dummy for "no slot available"
*       // Schedule the job in this slot
*       finalSlots[availableSlot] = job.id;
*       totalProfit += job.profit;
*       scheduledJobs.push(job.id);
*
*       // Union this slot with the slot before it, effectively marking it as taken
*       // and making the previous slot its new "representative" for future searches.
*       dsu.union(availableSlot, availableSlot - 1);
*     }
*   }
*   // Sort scheduledJobs by their original profit (desc) for consistent output,
*   // or by slot number if that's desired.
*   const finalScheduledJobIDs = Object.keys(finalSlots)
*                                     .sort((a, b) => parseInt(a) - parseInt(b))
*                                     .map(slot => finalSlots[parseInt(slot)]);
*
*   return { totalProfit, scheduledJobs: finalScheduledJobIDs };
* }
*
* This DSU approach reduces the slot search time from O(maxDeadline) to O(alpha(maxDeadline))
* per job, making the overall complexity O(N log N + N * alpha(maxDeadline)), which is
* significantly better when `maxDeadline` is large.
*/

// --- Brute Force vs. Optimized (Greedy) Discussion ---
/*
* Brute Force Approach:
*   A brute force approach would involve generating all possible permutations of jobs
*   and for each permutation, checking if it's a valid schedule (all jobs meet deadlines)
*   and calculating its total profit. The number of permutations is N!, which is
*   computationally infeasible for even small N.
*   Alternatively, one could use recursion with backtracking to explore all subsets
*   of jobs and all possible assignments to slots, but this would still be exponential.

* Optimized (Greedy) Approach:
*   The greedy strategy is proven to be optimal for the Job Sequencing with Deadlines
*   problem. The two key greedy choices are:
*   1. Prioritize jobs with higher profits. This ensures that if we have to make a choice
*      between two jobs for a single slot, we pick the one that yields more profit.
*   2. Schedule jobs in the latest possible free slot before their deadline. This is
*      crucial because it keeps earlier slots open for other high-profit jobs that might
*      have tighter deadlines. If a job `J` with deadline `D` is placed in slot `t < D`,
*      and slot `D` is available, placing `J` in slot `D` instead would have the same
*      profit but leave slot `t` open, potentially allowing another job with `deadline <= t`
*      to be scheduled. This exchange argument reinforces the optimality.
*/

// --- ASCII Art Diagram for Job Sequencing Logic ---
/*
Jobs:
 A: P=100, D=2
 B: P=19,  D=1
 C: P=27,  D=2
 D: P=25,  D=1
 E: P=15,  D=3

Sorted by Profit (desc): A (100,2), C (27,2), D (25,1), B (19,1), E (15,3)
Max Deadline = 3. Slots: [null, null, null] (Indices 1, 2, 3)

1. Process Job A (P=100, D=2)
   - Try slot i=2: slots[2] is null. Assign A to slot 2.
   - slots: [null, null, 'A'] -> [null, 'A', null] (corrected ASCII visual to reflect 1-indexed slots)
   - Total Profit: 100
   - Scheduled: ['A']

   Time Slots:
   1   2   3
   --- --- ---
   |   | A |
   --- --- ---

2. Process Job C (P=27, D=2)
   - Try slot i=2: slots[2] is 'A' (taken).
   - Try slot i=1: slots[1] is null. Assign C to slot 1.
   - slots: ['C', 'A', null]
   - Total Profit: 100 + 27 = 127
   - Scheduled: ['A', 'C']

   Time Slots:
   1   2   3
   --- --- ---
   | C | A |
   --- --- ---

3. Process Job D (P=25, D=1)
   - Try slot i=1: slots[1] is 'C' (taken).
   - No free slot <= deadline 1. Skip Job D.

   Time Slots: (No change)
   1   2   3
   --- --- ---
   | C | A |
   --- --- ---

4. Process Job B (P=19, D=1)
   - Try slot i=1: slots[1] is 'C' (taken).
   - No free slot <= deadline 1. Skip Job B.

   Time Slots: (No change)
   1   2   3
   --- --- ---
   | C | A |
   --- --- ---

5. Process Job E (P=15, D=3)
   - Try slot i=3: slots[3] is null. Assign E to slot 3.
   - slots: ['C', 'A', 'E']
   - Total Profit: 127 + 15 = 142
   - Scheduled: ['A', 'C', 'E']

   Time Slots:
   1   2   3
   --- --- ---
   | C | A | E |
   --- --- ---

Final Result:
Total Profit: 142
Scheduled Jobs: ['A', 'C', 'E'] (order depends on how `scheduledJobs` is accumulated or sorted)
*/
```