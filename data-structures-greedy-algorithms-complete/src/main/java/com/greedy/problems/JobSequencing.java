```java
package com.greedy.problems;

import com.greedy.utils.Pair;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * **Problem:** Job Sequencing with Deadlines and Profits
 *
 * Given a set of N jobs, where each job has a deadline and a profit.
 * Each job takes unit time to complete. We can only do one job at a time.
 * The goal is to find a sequence of jobs that maximizes the total profit.
 *
 * **Example:**
 * Jobs: (Job_id, Deadline, Profit)
 * J1: (A, 2, 100)
 * J2: (B, 1, 10)
 * J3: (C, 2, 15)
 * J4: (D, 1, 25)
 *
 * **Greedy Choice Property:**
 * To maximize total profit, it's intuitive to prioritize jobs with higher profits.
 * If two jobs have the same profit, the one with an earlier deadline might be considered
 * first to free up later slots.
 * The greedy strategy is:
 * 1. Sort all jobs in decreasing order of their profit.
 * 2. Iterate through the sorted jobs. For each job, try to schedule it into the latest
 *    possible time slot before or on its deadline, without conflicting with already
 *    scheduled jobs. The latest possible slot approach ensures earlier slots are kept free
 *    for jobs with even earlier deadlines if they appear later in the profit-sorted list.
 *
 * **Optimal Substructure:**
 * If an optimal sequence includes a job J, then the remaining jobs in the sequence
 * form an optimal sequence for the remaining available time slots.
 *
 * **Algorithm Steps:**
 * 1. Create a data structure to hold jobs, each with an ID, deadline, and profit.
 * 2. Sort the jobs in decreasing order of profit.
 * 3. Determine the maximum deadline among all jobs. This will help in creating a time slot array.
 * 4. Create a boolean array `timeSlots` of size `maxDeadline + 1`. Initialize all entries to false,
 *    representing available slots.
 * 5. Create a list to store the sequence of selected jobs.
 * 6. Iterate through the sorted jobs (from highest profit to lowest):
 *    a. For the current job, try to find an available time slot. Start checking from its deadline
 *       backwards to time slot 1.
 *    b. If an empty slot `i` (where `i <= deadline`) is found, mark `timeSlots[i]` as true,
 *       add the job to the selected jobs list, and break from the inner loop (as this job is scheduled).
 * 7. The total profit is the sum of profits of the selected jobs.
 */
public class JobSequencing {

    /**
     * Represents a single job with an ID, deadline, and profit.
     */
    public static class Job {
        String id;
        int deadline;
        int profit;

        public Job(String id, int deadline, int profit) {
            this.id = id;
            this.deadline = deadline;
            this.profit = profit;
        }

        public String getId() {
            return id;
        }

        public int getDeadline() {
            return deadline;
        }

        public int getProfit() {
            return profit;
        }

        @Override
        public String toString() {
            return "Job{" + id + ", D=" + deadline + ", P=" + profit + "}";
        }
    }

    /**
     * Solves the Job Sequencing Problem using a greedy approach.
     *
     * @param jobs A list of Job objects.
     * @return A list of selected jobs that maximize total profit, ordered by their scheduled time slot.
     *         Returns null if input jobs list is null.
     *
     * **Time Complexity:**
     * - Sorting jobs: O(N log N), where N is the number of jobs.
     * - Finding max deadline: O(N).
     * - Iterating through jobs and finding slots: N jobs, each potentially checking up to maxDeadline slots.
     *   Worst case: O(N * maxDeadline).
     * - Total: O(N log N + N * maxDeadline). In cases where maxDeadline is large (e.g., N), this can be O(N^2).
     *   If maxDeadline is small, it's closer to O(N log N).
     *
     * **Space Complexity:**
     * - O(N) for storing sorted jobs.
     * - O(maxDeadline) for the `timeSlots` array.
     * - O(N) for the result list.
     * - Total: O(N + maxDeadline).
     */
    public List<Job> findMaxProfitJobSequence(List<Job> jobs) {
        if (jobs == null || jobs.isEmpty()) {
            return Collections.emptyList();
        }

        // Step 2: Sort jobs in decreasing order of profit.
        // If profits are equal, tie-break with deadline (earlier deadline preferred, though not critical for correctness)
        List<Job> sortedJobs = new ArrayList<>(jobs);
        sortedJobs.sort(Comparator
                .comparingInt(Job::getProfit).reversed() // Primary sort: highest profit first
                .thenComparingInt(Job::getDeadline));    // Secondary sort: earlier deadline first (optional but good practice)

        // Step 3: Determine the maximum deadline to create time slot array.
        int maxDeadline = 0;
        for (Job job : jobs) {
            if (job.getDeadline() > maxDeadline) {
                maxDeadline = job.getDeadline();
            }
        }

        // Step 4: Create a boolean array to track available time slots.
        // index i represents time slot i. timeSlots[0] is unused, slots from 1 to maxDeadline.
        String[] scheduledJobs = new String[maxDeadline + 1]; // To store job IDs in their scheduled slots
        boolean[] timeSlots = new boolean[maxDeadline + 1];   // To mark if a slot is taken
        // Initialize with false (all slots free) is default for boolean array.

        List<Job> selectedJobs = new ArrayList<>();
        int totalProfit = 0;

        // Step 6: Iterate through sorted jobs.
        for (Job currentJob : sortedJobs) {
            // Step 6a: Try to find an available time slot for the current job.
            // Start from its deadline backwards to time slot 1.
            // This ensures we leave earlier slots open for jobs with even earlier deadlines.
            for (int i = Math.min(maxDeadline, currentJob.getDeadline()); i >= 1; i--) {
                if (!timeSlots[i]) { // If slot 'i' is free
                    timeSlots[i] = true;        // Mark slot as taken
                    scheduledJobs[i] = currentJob.getId(); // Schedule the job
                    selectedJobs.add(currentJob); // Add to the result list
                    totalProfit += currentJob.getProfit();
                    break; // Job scheduled, move to the next job
                }
            }
        }

        // The problem typically asks for the maximum profit and/or the sequence of job IDs.
        // We can return the list of selected Job objects, sorted by their ID for consistency
        // or by their scheduled slot if we want a time-ordered sequence.
        // Let's return the jobs ordered by their scheduled slot.
        // For that, we need to reconstruct from 'scheduledJobs' array.

        List<Job> finalSequence = new ArrayList<>();
        for (int i = 1; i <= maxDeadline; i++) {
            if (scheduledJobs[i] != null) {
                // Find the original Job object by ID (inefficient, but for final presentation)
                String jobId = scheduledJobs[i];
                finalSequence.add(jobs.stream().filter(j -> j.getId().equals(jobId)).findFirst().orElse(null));
            }
        }
        // Remove any nulls if lookup failed (shouldn't happen with correct IDs)
        finalSequence = finalSequence.stream().filter(java.util.Objects::nonNull).collect(Collectors.toList());

        // Note: Returning 'selectedJobs' directly (which is sorted by profit) is also valid,
        // but 'finalSequence' provides the actual execution order.
        return finalSequence;
    }

    /**
     * Finds the maximum profit from a list of jobs found by `findMaxProfitJobSequence`.
     * @param jobs The list of jobs selected by the greedy algorithm.
     * @return The total profit.
     */
    public int calculateTotalProfit(List<Job> jobs) {
        if (jobs == null) {
            return 0;
        }
        return jobs.stream().mapToInt(Job::getProfit).sum();
    }

    /**
     * Conceptual Brute-Force Approach for Job Sequencing.
     * This method explores all possible subsets of jobs and all possible permutations
     * for scheduling them to find the one with maximum profit.
     * It's computationally very expensive (NP-hard).
     *
     * **Time Complexity:** O(N! * N * maxDeadline) or worse, due to subset generation and permutation.
     * **Space Complexity:** O(N) for recursion stack and temporary lists.
     *
     * This is a simplified outline; a full implementation would be much more complex.
     *
     * @param jobs The list of all available jobs.
     * @param maxDeadline The maximum deadline among all jobs.
     * @return The maximum profit found.
     */
    public int findMaxProfitBruteForceConceptual(List<Job> jobs, int maxDeadline) {
        if (jobs == null || jobs.isEmpty()) {
            return 0;
        }

        // This would involve generating all subsets of jobs,
        // then for each subset, trying all permutations of scheduling them
        // while respecting deadlines and unit time constraint.
        // Then calculate profit for each valid schedule and find the maximum.

        // For simplicity, we'll just return -1 to indicate this is not implemented efficiently.
        // A true brute force would be exponential.
        System.out.println("Brute-force approach for Job Sequencing is extremely complex and slow (exponential).");
        System.out.println("Returning 0 as a placeholder for conceptual purposes.");
        return 0;
    }
}

```