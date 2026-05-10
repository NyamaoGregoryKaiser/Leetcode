package com.greedy.problems;

import com.greedy.utils.DataStructures.Job;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * **Problem: Job Sequencing with Deadlines**
 *
 * Given a set of jobs, where each job `i` has a deadline `d_i` and a profit `p_i`.
 * We want to find a sequence of jobs such that the total profit is maximized.
 * Each job takes one unit of time. A job can only be performed if its completion
 * time is less than or equal to its deadline. Only one job can be processed at a time.
 *
 * **Greedy Strategy:**
 * The greedy choice is to always select the job that offers the maximum profit,
 * provided it can be completed by its deadline.
 *
 * 1. Sort all jobs in descending order of their profits.
 * 2. Iterate through the sorted jobs. For each job:
 *    a. Find a time slot (from `deadline-1` down to `0`) where the job can be placed.
 *    b. If a slot is found, place the job there and mark the slot as occupied.
 *    c. Add the job's profit to the total profit.
 *
 * **Why this greedy strategy works (Intuition):**
 * **Greedy Choice Property:** By prioritizing jobs with higher profits, we ensure that
 * we always attempt to include the most valuable jobs first. If a highly profitable job `J`
 * can be scheduled, scheduling it is always beneficial. If `J` occupies a slot that could
 * have been used by a less profitable job `K`, swapping `J` for `K` (or replacing `K` with `J`
 * if `K` was already chosen) would either maintain or increase the total profit.
 * The earliest available slot strategy for a given deadline is also important: if a job
 * can be done at `t` or `t-1`, doing it at `t-1` leaves `t` open for another job,
 * potentially maximizing future options.
 *
 * **Optimal Substructure Property:** If a job `J` is chosen for a specific time slot,
 * the problem reduces to scheduling the remaining jobs in the remaining available time slots
 * to maximize their profit. The overall optimal solution is formed by combining the choice
 * for `J` with an optimal solution for the subproblem.
 *
 * **Example:**
 * Jobs: (a, 4, 20), (b, 1, 10), (c, 1, 40), (d, 1, 30)
 *
 * Sorted by Profit (descending): (c, 1, 40), (d, 1, 30), (a, 4, 20), (b, 1, 10)
 * Max Deadline = 4. Available slots: [_, _, _, _] (representing time slots 0, 1, 2, 3)
 *
 * 1. Process Job c (deadline=1, profit=40):
 *    - Try slot 0 (deadline-1): Available. Place c at slot 0.
 *    - Slots: [c, _, _, _]. Total Profit = 40.
 *
 * 2. Process Job d (deadline=1, profit=30):
 *    - Try slot 0 (deadline-1): Occupied.
 *    - No slot found <= deadline. Skip.
 *
 * 3. Process Job a (deadline=4, profit=20):
 *    - Try slot 3 (deadline-1): Available. Place a at slot 3.
 *    - Slots: [c, _, _, a]. Total Profit = 40 + 20 = 60.
 *
 * 4. Process Job b (deadline=1, profit=10):
 *    - Try slot 0 (deadline-1): Occupied.
 *    - No slot found <= deadline. Skip.
 *
 * Final Schedule: [c, _, _, a]. Max Profit = 60.
 */
public class JobSequencing {

    /**
     * Solves the Job Sequencing with Deadlines problem using a greedy approach.
     *
     * @param jobs An array of Job objects. Each job has an ID, deadline, and profit.
     * @return The maximum total profit that can be achieved.
     */
    public int findMaxProfit(Job[] jobs) {
        // Handle edge cases
        if (jobs == null || jobs.length == 0) {
            return 0;
        }

        // Step 1: Sort all jobs in descending order of their profits.
        // If profits are equal, sort by deadline ascending (optional, but can provide stable behavior).
        Arrays.sort(jobs, Collections.reverseOrder(Comparator.comparingInt(job -> job.profit)));

        // Find the maximum deadline to determine the size of the time slot array.
        int maxDeadline = 0;
        for (Job job : jobs) {
            if (job.deadline > maxDeadline) {
                maxDeadline = job.deadline;
            }
        }

        // `schedule` array will store the ID of the job scheduled at each time slot.
        // The index represents the time slot (0 to maxDeadline - 1).
        // Initialize with a sentinel value (e.g., null or a character like '0') to mark as empty.
        char[] schedule = new char[maxDeadline];
        Arrays.fill(schedule, '0'); // '0' signifies an empty slot

        int totalProfit = 0;
        List<Job> scheduledJobs = new ArrayList<>(); // To track which jobs are selected

        // Step 2 & 3: Iterate through the sorted jobs and try to schedule them.
        for (Job job : jobs) {
            // Find a free slot for this job, starting from its deadline-1 down to 0.
            // This greedy choice tries to place the job as late as possible
            // to keep earlier slots open for jobs with smaller deadlines.
            for (int i = Math.min(maxDeadline - 1, job.deadline - 1); i >= 0; i--) {
                if (schedule[i] == '0') { // If the slot is free
                    schedule[i] = job.id; // Schedule the job
                    totalProfit += job.profit;
                    scheduledJobs.add(job);
                    break; // Move to the next job
                }
            }
        }

        // Optional: Print the schedule and selected jobs
        // System.out.println("Scheduled jobs: " + scheduledJobs);
        // System.out.println("Time slots: " + Arrays.toString(schedule));

        return totalProfit;
    }

    /**
     * **Time Complexity Analysis:**
     * - Sorting jobs: O(N log N), where N is the number of jobs.
     * - Finding max deadline: O(N).
     * - Iterating through sorted jobs: O(N).
     * - Inside the loop, iterating through possible time slots: In the worst case, this inner loop
     *   can run up to `maxDeadline` times. So, O(N * maxDeadline).
     * - If `maxDeadline` is much smaller than N^2 (e.g., closer to N), the overall complexity
     *   would be closer to O(N * maxDeadline). If `maxDeadline` can be very large, this can be
     *   inefficient.
     * - Overall Time Complexity: O(N log N + N * maxDeadline). The dominant factor is usually `N log N`
     *   if `maxDeadline` is small, or `N * maxDeadline` if `maxDeadline` is large.
     *
     * **Space Complexity Analysis:**
     * - Storing jobs: O(N) for the input array.
     * - `schedule` array: O(maxDeadline) to store the job IDs for each time slot.
     * - `scheduledJobs` list: O(N) in the worst case (if all jobs are scheduled).
     * - Overall Space Complexity: O(N + maxDeadline).
     *
     * **Note on Optimizations/Variations:**
     * The slot finding (inner loop) can be optimized using a Disjoint Set Union (DSU) data structure
     * (also known as Union-Find). This allows finding the earliest free slot in nearly constant amortized time.
     * With DSU, the time complexity can be improved to O(N log N) (due to sorting) + O(N * alpha(maxDeadline))
     * where alpha is the inverse Ackermann function, which is practically a very small constant.
     * However, implementing DSU adds complexity to the code and might be overkill for a typical interview
     * unless specifically asked. The current approach is more straightforward for demonstrating the greedy logic.
     */
}