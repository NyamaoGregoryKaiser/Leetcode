```javascript
/**
 * @fileoverview Implementation of the Job Sequencing with Deadlines problem using a Greedy approach.
 *
 * Problem Description:
 * Given a set of jobs, where each job has a deadline and an associated profit.
 * Each job takes unit time to complete. We want to find a sequence of jobs
 * that can be performed to maximize the total profit, given that each job
 * must be completed by its deadline.
 *
 * Example:
 * Jobs: [
 *   { id: 'a', deadline: 2, profit: 100 },
 *   { id: 'b', deadline: 1, profit: 19 },
 *   { id: 'c', deadline: 2, profit: 27 },
 *   { id: 'd', deadline: 1, profit: 25 },
 *   { id: 'e', deadline: 3, profit: 15 }
 * ]
 *
 * Optimal Solution:
 * The greedy strategy would typically select jobs 'a', 'c', 'e' for a total profit of 142.
 * Job 'a' (profit 100) has deadline 2.
 * Job 'c' (profit 27) has deadline 2.
 * Job 'e' (profit 15) has deadline 3.
 *
 * Schedule:
 * Time Slot 1: Job 'a' (due to higher profit than 'd' and 'b' for deadline 1 slot)
 * Time Slot 2: Job 'c' (due to higher profit than 'b' for deadline 2 slot)
 * Time Slot 3: Job 'e'
 *
 * Note: If 'd' had a higher profit, e.g., 150, then 'd' would be chosen for slot 1,
 * and 'a' would be missed or pushed if possible (but here 'a' can't be pushed further than deadline 2).
 *
 * Greedy Choice Property:
 * The greedy strategy is to process jobs in decreasing order of their profits.
 * For each job, try to schedule it in the latest possible time slot (from 1 to its deadline)
 * that is still available. This is because scheduling a high-profit job later keeps
 * earlier slots free for other high-profit jobs with earlier deadlines.
 *
 * Proof of Correctness (Intuition):
 * Assume there is an optimal schedule `S` that does not follow the greedy strategy.
 * This means there exist two jobs `i` and `j` such that `profit[i] > profit[j]`,
 * but `j` is scheduled and `i` is either not scheduled or scheduled at an earlier slot
 * that could have been used by `i` (assuming `i` meets its deadline).
 *
 * If `j` is scheduled at time `t` and `i` is not scheduled, but `i` could have been
 * scheduled at `t'` (where `t' <= deadline[i]`) and `t'` was free (or occupied by a
 * lower-profit job than `i` that could be moved), then we can swap `i` and `j`
 * (or schedule `i` in `t'`) to achieve a higher or equal profit without violating deadlines.
 *
 * More formally, by sorting jobs by profit in descending order, we ensure that
 * we prioritize higher-profit jobs. When considering a job, we try to place it
 * in the latest possible free slot up to its deadline. This maximizes the chances
 * for other profitable jobs (which might have tighter deadlines) to be scheduled
 * in earlier slots. If we place a job `J` with profit `P` at time `t`, and `t` is the
 * latest possible free slot before `J.deadline`, this decision is locally optimal.
 * If there was another job `J'` with a lower profit `P'` scheduled at `t'`, and `J`
 * could have been scheduled at `t'`, but `J'` could not have been scheduled at `t`,
 * then swapping them would not decrease total profit.
 */

/**
 * Solves the Job Sequencing with Deadlines problem to maximize total profit.
 *
 * @param {Array<Object>} jobs - An array of job objects.
 *   Each job object must have 'id' (string), 'deadline' (number), and 'profit' (number).
 *   Example: [{ id: 'a', deadline: 2, profit: 100 }, { id: 'b', deadline: 1, profit: 19 }]
 * @returns {Object} An object containing:
 *   - {number} totalProfit: The maximum total profit achievable.
 *   - {Array<string>} sequencedJobs: An array of job IDs representing the optimal sequence.
 *
 * Time Complexity: O(N log N) due to sorting, plus O(N * MaxDeadline) for scheduling
 *                  in the worst case (iterating up to MaxDeadline for each job).
 *                  If MaxDeadline is large, this can approach O(N*N).
 *                  A more optimized approach using a Disjoint Set Union (DSU) or Max-Heap
 *                  can reduce the scheduling part to O(N log MaxDeadline) or O(N log N).
 *                  For typical interview constraints where MaxDeadline isn't excessively large,
 *                  the current array-based approach is often accepted.
 * Space Complexity: O(MaxDeadline) for the `slots` array, plus O(N) for sorted jobs and result.
 */
function jobSequencing(jobs) {
  // Edge case: No jobs or invalid input.
  if (!jobs || jobs.length === 0) {
    return { totalProfit: 0, sequencedJobs: [] };
  }

  // 1. Sort jobs by profit in descending order.
  // This is the primary greedy choice. High-profit jobs are considered first.
  const sortedJobs = [...jobs].sort((a, b) => b.profit - a.profit);

  // Find the maximum deadline to determine the size of our time slot array.
  const maxDeadline = Math.max(...jobs.map(job => job.deadline));

  // Initialize an array to keep track of available time slots.
  // `slots[i]` will store the ID of the job scheduled in time slot `i+1`.
  // Using `null` or `undefined` to denote an empty slot.
  // Slots are 1-indexed for deadlines, so array size is maxDeadline.
  const slots = new Array(maxDeadline).fill(null);

  let totalProfit = 0;
  const sequencedJobsIds = [];

  // 2. Iterate through the sorted jobs.
  for (const job of sortedJobs) {
    // Try to place the current job into the latest possible free slot
    // before or at its deadline.
    // We iterate backwards from `job.deadline - 1` down to `0` (representing slot 1).
    for (let i = Math.min(job.deadline - 1, maxDeadline - 1); i >= 0; i--) {
      if (slots[i] === null) {
        // Slot `i+1` is free, schedule this job.
        slots[i] = job.id;
        totalProfit += job.profit;
        sequencedJobsIds.push(job.id);
        break; // Move to the next job, this one is scheduled.
      }
    }
  }

  // Jobs were added in order of processing (highest profit first), but
  // the actual sequence of execution is determined by their assigned slots.
  // Filter out nulls and map to job IDs to get the chronological sequence.
  const finalSequencedJobs = slots.filter(jobId => jobId !== null);

  return { totalProfit, sequencedJobs: finalSequencedJobs };
}

export default jobSequencing;
```