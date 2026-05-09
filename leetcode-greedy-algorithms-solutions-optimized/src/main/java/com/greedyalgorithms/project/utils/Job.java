package com.greedyalgorithms.project.utils;

/**
 * Helper class to represent a job with an ID, deadline, and profit.
 * Used primarily for the Job Sequencing with Deadlines problem.
 */
public class Job {
    private String id;
    private int deadline;
    private int profit;

    /**
     * Constructs a new Job object.
     * @param id The identifier for the job.
     * @param deadline The deadline by which the job must be completed.
     * @param profit The profit earned if the job is completed by its deadline.
     */
    public Job(String id, int deadline, int profit) {
        if (deadline <= 0 || profit < 0) {
            throw new IllegalArgumentException("Deadline must be positive and profit cannot be negative.");
        }
        this.id = id;
        this.deadline = deadline;
        this.profit = profit;
    }

    // --- Getters ---
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
        return "Job{" +
               "id='" + id + '\'' +
               ", deadline=" + deadline +
               ", profit=" + profit +
               '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Job job = (Job) o;
        return deadline == job.deadline && profit == job.profit && id.equals(job.id);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + deadline;
        result = 31 * result + profit;
        return result;
    }
}