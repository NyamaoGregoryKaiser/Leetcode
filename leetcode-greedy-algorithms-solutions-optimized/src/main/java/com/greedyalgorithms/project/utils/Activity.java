package com.greedyalgorithms.project.utils;

/**
 * Helper class to represent an activity with a start and finish time.
 * Used primarily for the Activity Selection Problem.
 */
public class Activity {
    private String id; // Optional: for identification
    private int start;
    private int finish;

    /**
     * Constructs a new Activity object.
     * @param id The identifier for the activity.
     * @param start The start time of the activity.
     * @param finish The finish time of the activity.
     */
    public Activity(String id, int start, int finish) {
        if (start < 0 || finish < 0) {
            throw new IllegalArgumentException("Start and finish times cannot be negative.");
        }
        if (start > finish) {
            throw new IllegalArgumentException("Start time cannot be after finish time.");
        }
        this.id = id;
        this.start = start;
        this.finish = finish;
    }

    // --- Getters ---
    public String getId() {
        return id;
    }

    public int getStart() {
        return start;
    }

    public int getFinish() {
        return finish;
    }

    @Override
    public String toString() {
        return "Activity{" +
               "id='" + id + '\'' +
               ", start=" + start +
               ", finish=" + finish +
               '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Activity activity = (Activity) o;
        return start == activity.start && finish == activity.finish && id.equals(activity.id);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + start;
        result = 31 * result + finish;
        return result;
    }
}