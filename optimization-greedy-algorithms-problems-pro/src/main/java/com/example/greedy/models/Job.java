```java
package com.example.greedy.models;

/**
 * Represents a job with an ID, deadline, and profit.
 * Used in the Job Sequencing with Deadlines Problem.
 */
public class Job {
    public char id;
    public int deadline;
    public int profit;

    public Job(char id, int deadline, int profit) {
        this.id = id;
        this.deadline = deadline;
        this.profit = profit;
    }

    @Override
    public String toString() {
        return "Job{id=" + id + ", deadline=" + deadline + ", profit=" + profit + "}";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Job job = (Job) o;
        return id == job.id && deadline == job.deadline && profit == job.profit;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + deadline;
        result = 31 * result + profit;
        return result;
    }
}
```