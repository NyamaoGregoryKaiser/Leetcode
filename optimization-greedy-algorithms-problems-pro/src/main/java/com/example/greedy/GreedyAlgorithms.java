```java
package com.example.greedy;

import com.example.greedy.models.Activity;
import com.example.greedy.models.Item;
import com.example.greedy.models.Job;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * A comprehensive collection of Greedy Algorithm problems and their optimal solutions.
 * Each method includes detailed comments, time, and space complexity analysis.
 */
public class GreedyAlgorithms {

    /**
     * 1. Activity Selection Problem
     * Given a set of activities, each with a start and finish time, select the maximum number of non-overlapping
     * activities that can be performed by a single person or machine.
     *
     * Greedy Choice: Always select the activity that finishes earliest among the remaining activities that do not
     * conflict with previously selected activities.
     *
     * Why it works (Intuition): Choosing the activity that finishes earliest leaves the maximum amount of time
     * available for subsequent activities, thus maximizing the overall count.
     *
     * @param activities A list of Activity objects, where each activity has a start and finish time.
     * @return A list of selected activities that are non-overlapping and maximum in count.
     *
     * Time Complexity: O(N log N) due to sorting, where N is the number of activities.
     * Space Complexity: O(N) for storing the sorted activities and the result list.
     */
    public List<Activity> selectMaxActivities(List<Activity> activities) {
        if (activities == null || activities.isEmpty()) {
            return Collections.emptyList();
        }

        // 1. Sort activities by their finish times.
        // This is the core greedy step.
        activities.sort(Comparator.comparingInt(a -> a.finish));

        List<Activity> selectedActivities = new ArrayList<>();

        // 2. Select the first activity (which has the earliest finish time).
        selectedActivities.add(activities.get(0));
        Activity lastSelectedActivity = activities.get(0);

        // 3. Iterate through the remaining activities.
        // For each activity, if its start time is greater than or equal to the finish time
        // of the last selected activity, then it does not overlap. Select it.
        for (int i = 1; i < activities.size(); i++) {
            Activity currentActivity = activities.get(i);
            if (currentActivity.start >= lastSelectedActivity.finish) {
                selectedActivities.add(currentActivity);
                lastSelectedActivity = currentActivity;
            }
        }

        return selectedActivities;
    }

    /**
     * 2. Fractional Knapsack Problem
     * Given a set of items, each with a weight and a value, and a knapsack with a maximum
     * weight capacity, determine the maximum total value that can be put into the knapsack.
     * Items can be broken into fractions.
     *
     * Greedy Choice: Always pick the item (or fraction of an item) that has the highest
     * value-to-weight ratio.
     *
     * Why it works (Intuition): To maximize value for a given weight capacity, we prioritize
     * items that give us the most value per unit of weight. Since fractions are allowed,
     * we can fill the knapsack perfectly with the most "dense" value items first.
     *
     * @param items    An array of Item objects, where each item has a weight and a value.
     * @param capacity The maximum weight capacity of the knapsack.
     * @return The maximum total value that can be obtained.
     *
     * Time Complexity: O(N log N) due to sorting, where N is the number of items.
     * Space Complexity: O(N) for storing the sorted items (or O(1) if sorting in-place
     *                  and not considering the input array itself for space complexity).
     */
    public double fractionalKnapsack(Item[] items, int capacity) {
        if (items == null || items.length == 0 || capacity <= 0) {
            return 0.0;
        }

        // 1. Sort items in descending order of their value-to-weight ratio.
        // This is the core greedy step.
        Arrays.sort(items, (a, b) -> Double.compare(b.getRatio(), a.getRatio()));

        double totalValue = 0.0;
        int currentWeight = 0;

        // 2. Iterate through the sorted items.
        for (Item item : items) {
            // If the item can be taken whole, take it.
            if (currentWeight + item.weight <= capacity) {
                currentWeight += item.weight;
                totalValue += item.value;
            } else {
                // If the item cannot be taken whole, take a fraction of it
                // to fill the remaining capacity.
                int remainingCapacity = capacity - currentWeight;
                double fraction = (double) remainingCapacity / item.weight;
                totalValue += item.value * fraction;
                currentWeight = capacity; // Knapsack is full
                break; // No more capacity left
            }
        }

        return totalValue;
    }

    /**
     * 3. Coin Change Problem (Greedy Variant)
     * Given a set of coin denominations (assumed to be a canonical set where greedy works,
     * e.g., US currency: 1, 5, 10, 25, 50, 100) and an amount, find the minimum number of
     * coins required to make up that amount.
     *
     * Greedy Choice: Always pick the largest denomination coin that is less than or equal
     * to the remaining amount.
     *
     * Why it works (Intuition for canonical sets): For canonical coin systems, taking the largest
     * possible coin at each step does not prevent a better solution later because the smaller
     * denominations can efficiently make up any remainder. This is not true for all coin sets
     * (e.g., {1, 3, 4} for amount 6; greedy picks 4, then 1, 1 (3 coins), optimal is 3, 3 (2 coins)).
     *
     * @param denominations An array of available coin denominations, sorted in ascending order.
     *                      (e.g., {1, 5, 10, 25}). Assumed to be canonical.
     * @param amount        The target amount to make change for.
     * @return The minimum number of coins, or -1 if the amount cannot be made.
     *
     * Time Complexity: O(D) where D is the number of denominations. Sorting is not required
     *                  if input is already sorted. If not sorted, O(D log D) to sort.
     * Space Complexity: O(1).
     */
    public int greedyCoinChange(int[] denominations, int amount) {
        if (amount < 0) {
            return -1; // Cannot make change for negative amount
        }
        if (amount == 0) {
            return 0; // 0 coins for 0 amount
        }
        if (denominations == null || denominations.length == 0) {
            return -1; // No coins available
        }

        // 1. Sort denominations in descending order.
        // This is necessary for the greedy choice of picking the largest coin first.
        // A copy is made to avoid modifying the input array if desired.
        int[] sortedDenominations = Arrays.copyOf(denominations, denominations.length);
        Arrays.sort(sortedDenominations); // Sorts ascending
        // Reverse to get descending order: iterate from end later or reverse array
        // For simplicity, we can just iterate from the end of the sorted array.

        int coinCount = 0;
        int remainingAmount = amount;

        // 2. Iterate through denominations from largest to smallest.
        for (int i = sortedDenominations.length - 1; i >= 0; i--) {
            int coin = sortedDenominations[i];
            // While the current coin can be used, use it.
            while (remainingAmount >= coin && coin > 0) { // coin > 0 prevents infinite loop with 0-denom coin
                remainingAmount -= coin;
                coinCount++;
            }
        }

        // If remainingAmount is 0, we successfully made change.
        // Otherwise, it's not possible with the given denominations using this greedy approach.
        // Note: For non-canonical coin sets, a dynamic programming approach might be needed
        //       to guarantee optimality. This greedy solution assumes canonical sets.
        return remainingAmount == 0 ? coinCount : -1;
    }

    /**
     * 4. Minimum Number of Platforms Problem
     * Given arrival and departure times of all trains that reach a railway station,
     * find the minimum number of platforms required for the station so that no train waits.
     * Each platform can only be used by one train at a time.
     *
     * Greedy Choice: At any point in time, we want to know the maximum number of trains
     * simultaneously present at the station. This maximum number will be our answer.
     * We process events (arrivals and departures) in chronological order.
     *
     * Why it works (Intuition): By processing events in sorted order, we can simulate
     * the station's state. An arrival increments the platforms needed, a departure
     * decrements it. The peak value reached during this simulation is the minimum
     * required platforms. If two events happen at the same time, it's better to
     * prioritize departures to free up a platform before a new arrival claims it.
     *
     * @param arrival   An array of arrival times.
     * @param departure An array of departure times.
     * @return The minimum number of platforms required.
     *
     * Time Complexity: O(N log N) due to sorting, where N is the number of trains.
     * Space Complexity: O(N) for storing sorted copies of arrival and departure arrays.
     */
    public int findMinPlatforms(int[] arrival, int[] departure) {
        if (arrival == null || departure == null || arrival.length == 0 || arrival.length != departure.length) {
            return 0; // Or throw an IllegalArgumentException
        }

        int n = arrival.length;

        // 1. Sort both arrival and departure arrays.
        // This allows us to process events in chronological order.
        Arrays.sort(arrival);
        Arrays.sort(departure);

        int platformsNeeded = 0;
        int maxPlatforms = 0;
        int i = 0; // Pointer for arrival array
        int j = 0; // Pointer for departure array

        // 2. Iterate through sorted arrival and departure times using two pointers.
        while (i < n && j < n) {
            // If an arrival event occurs before or at the same time as a departure event,
            // a new platform is needed.
            // If arrival == departure, prioritize departure (j++) to free up platform.
            // This is crucial to get the minimum platforms correctly.
            if (arrival[i] <= departure[j]) {
                platformsNeeded++;
                i++;
            } else { // A departure event occurs first, a platform becomes free.
                platformsNeeded--;
                j++;
            }
            // Update the maximum platforms needed encountered so far.
            maxPlatforms = Math.max(maxPlatforms, platformsNeeded);
        }

        return maxPlatforms;
    }

    /**
     * 5. Job Sequencing with Deadlines Problem
     * Given a set of jobs, each with an ID, a deadline, and a profit, find a sequence
     * of jobs that maximizes the total profit. Each job takes unit time to complete,
     * and can only be done on or before its deadline. Only one machine is available.
     *
     * Greedy Choice: Sort jobs by profit in descending order. Iterate through the sorted
     * jobs and schedule each job in the latest possible time slot (before or on its deadline)
     * that is still available.
     *
     * Why it works (Intuition): Prioritizing higher profit jobs ensures that if a choice
     * has to be made between two jobs for a time slot, the one with higher profit is preferred.
     * Scheduling a job in the latest possible slot leaves earlier slots free for other jobs
     * that might have earlier deadlines but lower profit (which might still be the next
     * best choice to fit).
     *
     * @param jobs An array of Job objects, where each job has an ID, deadline, and profit.
     * @return A list of Job IDs representing the optimal sequence for maximum profit.
     *
     * Time Complexity: O(N log N) due to sorting, plus O(N * max_deadline) in the worst case
     *                  for finding slots if max_deadline is large. If using a Disjoint Set Union
     *                  (DSU) data structure, it can be optimized to O(N log N + N * alpha(max_deadline)),
     *                  where alpha is the inverse Ackermann function, practically constant.
     *                  Here, we use a boolean array for simplicity, which leads to the N*max_deadline term.
     * Space Complexity: O(max_deadline) for the `slots` array, plus O(N) for the result list.
     */
    public List<Character> jobSequencingWithDeadlines(Job[] jobs) {
        if (jobs == null || jobs.length == 0) {
            return Collections.emptyList();
        }

        // 1. Sort jobs by profit in descending order.
        // This is the core greedy step.
        Arrays.sort(jobs, (a, b) -> Integer.compare(b.profit, a.profit));

        // 2. Determine the maximum deadline to initialize the time slots array.
        int maxDeadline = 0;
        for (Job job : jobs) {
            maxDeadline = Math.max(maxDeadline, job.deadline);
        }

        // `slots` array keeps track of occupied time slots.
        // slots[i] = true means time slot `i` is occupied.
        // Index `0` is unused, slots represent time from 1 to maxDeadline.
        boolean[] slots = new boolean[maxDeadline + 1];
        List<Character> scheduledJobs = new ArrayList<>();
        int totalProfit = 0; // Optional: track total profit

        // 3. Iterate through the sorted jobs.
        for (Job job : jobs) {
            // Try to schedule the job in the latest possible free slot before or at its deadline.
            // Iterating downwards from deadline ensures we leave earlier slots free for jobs
            // that might have earlier deadlines.
            for (int k = job.deadline; k >= 1; k--) {
                if (!slots[k]) { // If slot k is free
                    slots[k] = true; // Mark slot as occupied
                    scheduledJobs.add(job.id); // Add job to the scheduled list
                    totalProfit += job.profit; // Add profit
                    break; // Move to the next job
                }
            }
        }
        // System.out.println("Total profit: " + totalProfit); // For debugging/information
        return scheduledJobs;
    }
}
```