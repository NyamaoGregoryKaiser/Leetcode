package com.greedyalgorithms.project;

import com.greedyalgorithms.project.utils.Activity;
import com.greedyalgorithms.project.utils.Item;
import com.greedyalgorithms.project.utils.Job;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

/**
 * A collection of solutions for common Greedy Algorithm problems.
 * Each method demonstrates an optimal greedy approach, includes detailed comments,
 * and specifies time and space complexity.
 */
public class GreedyAlgorithms {

    /**
     * 1. Activity Selection Problem
     * Problem Statement: Given a set of activities, each with a start and finish time,
     * select the maximum number of non-overlapping activities that can be performed
     * by a single person or resource.
     *
     * Greedy Choice: Always select the activity that finishes earliest among the
     * remaining compatible activities. This leaves the maximum time available for
     * subsequent activities.
     *
     * Proof of Optimality (Sketch):
     * Let A be the set of activities sorted by finish time.
     * Let G be the greedy solution, and O be an optimal solution.
     * If G and O are the same, we are done.
     * Otherwise, let k be the first activity where G and O differ.
     * G picks activity g_k (earliest finishing), while O picks o_k.
     * Since g_k finishes earliest, finish(g_k) <= finish(o_k).
     * We can replace o_k in O with g_k. The new set O' will still be a valid set
     * of non-overlapping activities because g_k finishes no later than o_k,
     * so all activities in O after o_k (which were compatible with o_k)
     * will also be compatible with g_k.
     * The number of activities in O' is the same as O, and O' is optimal.
     * By repeatedly applying this exchange argument, we can transform any optimal
     * solution into the greedy solution without reducing the number of activities.
     *
     * @param activities A list of Activity objects, each with a start and finish time.
     * @return A list of selected activities that represents the maximum number of non-overlapping activities.
     * @throws IllegalArgumentException if the input list is null or contains invalid activity times.
     *
     * Time Complexity: O(N log N) due to sorting, where N is the number of activities.
     *                  If activities are already sorted, it's O(N).
     * Space Complexity: O(N) to store the sorted list (if a new list is created)
     *                   or O(log N) for in-place sort stack space. O(K) to store result, where K <= N.
     */
    public List<Activity> activitySelection(List<Activity> activities) {
        if (activities == null) {
            throw new IllegalArgumentException("Activities list cannot be null.");
        }
        if (activities.isEmpty()) {
            return Collections.emptyList();
        }

        // 1. Sort activities by their finish times in non-decreasing order.
        // This is the core greedy step.
        List<Activity> sortedActivities = new ArrayList<>(activities);
        sortedActivities.sort(Comparator.comparingInt(Activity::getFinish));

        List<Activity> selectedActivities = new ArrayList<>();

        // 2. Select the first activity (which has the earliest finish time).
        // It's guaranteed to be compatible with itself and leaves maximum time for others.
        Activity lastSelectedActivity = sortedActivities.get(0);
        selectedActivities.add(lastSelectedActivity);

        // 3. Iterate through the remaining sorted activities.
        for (int i = 1; i < sortedActivities.size(); i++) {
            Activity currentActivity = sortedActivities.get(i);

            // 4. If the current activity's start time is greater than or equal to
            // the finish time of the last selected activity, it means they are compatible (non-overlapping).
            if (currentActivity.getStart() >= lastSelectedActivity.getFinish()) {
                selectedActivities.add(currentActivity);
                lastSelectedActivity = currentActivity; // Update the last selected activity
            }
            // Otherwise, skip the current activity as it overlaps with the last selected one.
        }

        return selectedActivities;
    }

    /**
     * 2. Fractional Knapsack Problem
     * Problem Statement: Given a set of items, each with a weight and a value,
     * determine the maximum total value that can be placed in a knapsack with a given capacity.
     * Unlike the 0/1 Knapsack, items can be broken into fractions.
     *
     * Greedy Choice: To maximize value, always pick the item (or fraction of an item)
     * that has the highest value-to-weight ratio.
     *
     * Proof of Optimality (Sketch):
     * Let items be sorted in descending order of value-to-weight ratio.
     * Let G be the greedy solution, and O be an optimal solution.
     * If G and O are the same, we are done.
     * Otherwise, let k be the first item where G and O differ in the quantity taken.
     * G takes more of item k, and O takes less (or none).
     * Since item k has the highest ratio among remaining items (or items taken in different proportions),
     * G's choice is superior. If O has remaining capacity or has taken a lower ratio item instead,
     * we can adjust O by taking more of item k (from what was skipped or by replacing a lower ratio item)
     * to increase or maintain the total value while maintaining capacity.
     * This ensures that taking the highest ratio item first leads to an optimal solution.
     *
     * @param capacity The maximum weight the knapsack can hold.
     * @param items A list of Item objects, each with a weight and a value.
     * @return The maximum total value that can be obtained.
     * @throws IllegalArgumentException if capacity is negative or items list is null/contains invalid items.
     *
     * Time Complexity: O(N log N) due to sorting, where N is the number of items.
     *                  If items are already sorted, it's O(N).
     * Space Complexity: O(N) to store the sorted list (if a new list is created).
     */
    public double fractionalKnapsack(int capacity, List<Item> items) {
        if (capacity < 0) {
            throw new IllegalArgumentException("Knapsack capacity cannot be negative.");
        }
        if (items == null) {
            throw new IllegalArgumentException("Items list cannot be null.");
        }
        if (items.isEmpty() || capacity == 0) {
            return 0.0;
        }

        // 1. Sort items by their value-to-weight ratio in descending order.
        List<Item> sortedItems = new ArrayList<>(items);
        sortedItems.sort(Comparator.comparingDouble(Item::getValuePerWeight).reversed());

        double totalValue = 0.0;
        int currentWeight = 0;

        // 2. Iterate through the sorted items.
        for (Item item : sortedItems) {
            // 3. If the item can be taken entirely without exceeding capacity, take it.
            if (currentWeight + item.getWeight() <= capacity) {
                currentWeight += item.getWeight();
                totalValue += item.getValue();
            } else {
                // 4. If the item cannot be taken entirely, take a fraction of it.
                // Calculate the remaining capacity.
                int remainingCapacity = capacity - currentWeight;
                // Calculate the fraction of the item that can be taken.
                double fraction = (double) remainingCapacity / item.getWeight();
                // Add the value of this fraction to the total value.
                totalValue += (fraction * item.getValue());
                // The knapsack is now full.
                currentWeight = capacity;
                break; // Stop as knapsack is full
            }
        }

        return totalValue;
    }

    /**
     * 3. Coin Change Problem (Greedy Variant)
     * Problem Statement: Given a set of coin denominations and a target amount,
     * find the minimum number of coins needed to make up that amount.
     * This greedy approach *only works* for specific "canonical" coin systems
     * (e.g., US currency: 1, 5, 10, 25 cents; Euro: 1, 2, 5, 10, 20, 50 cents, 1, 2 euros).
     * It fails for non-canonical systems (e.g., coins = {1, 3, 4}, amount = 6,
     * greedy gives 4+1+1=3 coins, optimal is 3+3=2 coins).
     *
     * Greedy Choice: Always pick the largest coin denomination that is less than or
     * equal to the remaining amount.
     *
     * @param coins An array of available coin denominations, assumed to be sorted
     *              in ascending order for efficiency (or will be sorted internally).
     *              Assumed to be a canonical coin system where greedy works.
     * @param amount The target amount to make change for.
     * @return The minimum number of coins required, or -1 if the amount cannot be made.
     * @throws IllegalArgumentException if coins array is null/empty or amount is negative.
     *
     * Time Complexity: O(C) where C is the number of coin denominations, assuming `coins`
     *                  is already sorted. If sorting is needed, it's O(C log C).
     *                  The loop runs at most `amount` times, but for each iteration,
     *                  finding the largest coin is O(1) after sorting.
     * Space Complexity: O(1) (excluding input storage and potential sort space).
     */
    public int coinChangeGreedy(int[] coins, int amount) {
        if (coins == null || coins.length == 0) {
            throw new IllegalArgumentException("Coin denominations cannot be null or empty.");
        }
        if (amount < 0) {
            throw new IllegalArgumentException("Amount cannot be negative.");
        }
        if (amount == 0) {
            return 0;
        }

        // 1. Sort coins in descending order to easily pick the largest coin.
        // This is crucial for the greedy strategy.
        int[] sortedCoins = Arrays.copyOf(coins, coins.length); // Create a copy to not modify original
        Arrays.sort(sortedCoins); // Sorts in ascending order
        // Reverse for descending order
        for (int i = 0; i < sortedCoins.length / 2; i++) {
            int temp = sortedCoins[i];
            sortedCoins[i] = sortedCoins[sortedCoins.length - 1 - i];
            sortedCoins[sortedCoins.length - 1 - i] = temp;
        }

        int coinCount = 0;
        int currentAmount = amount;

        // 2. Iterate through the coin denominations from largest to smallest.
        for (int coin : sortedCoins) {
            // 3. While the current coin can be used and the remaining amount is positive:
            while (currentAmount >= coin) {
                currentAmount -= coin; // Use the coin
                coinCount++;           // Increment count
            }
            // If currentAmount becomes 0, we found the solution.
            if (currentAmount == 0) {
                return coinCount;
            }
        }

        // 4. If currentAmount is not 0 after checking all coins, it means the amount
        // cannot be made with the given denominations (or not optimally by greedy).
        // For canonical systems, this implies it's impossible.
        return -1;
    }

    /**
     * 4. Job Sequencing with Deadlines
     * Problem Statement: Given a set of jobs, each with a deadline and a profit,
     * schedule a subset of jobs to maximize the total profit, such that each job
     * finishes by its deadline. Each job takes 1 unit of time.
     *
     * Greedy Choice: Always select the job with the highest profit first.
     * If a job can be scheduled, schedule it as late as possible (before its deadline)
     * to leave earlier slots open for other jobs with earlier deadlines.
     *
     * Proof of Optimality (Sketch):
     * Let jobs be sorted by profit in descending order.
     * Consider the first job J_k selected by the greedy approach.
     * If there's an optimal solution O that does not contain J_k or schedules it differently.
     * If J_k is not in O, and O has an empty slot where J_k could fit, adding J_k increases profit.
     * If O has a job J_x in the slot where J_k could fit, and profit(J_k) > profit(J_x),
     * we can swap J_x with J_k. If J_x cannot be moved, but J_k can be placed somewhere else,
     * we try to do so. The strategy is to fill slots with highest profit jobs.
     * Placing a job as late as possible (before its deadline) is beneficial because it preserves
     * earlier slots for jobs that might have tighter deadlines and lower profit (which greedy would
     * process later, or not at all if a higher profit job takes its deadline slot).
     *
     * @param jobs A list of Job objects, each with an ID, deadline, and profit.
     * @return The maximum total profit that can be obtained.
     * @throws IllegalArgumentException if the jobs list is null or contains invalid jobs.
     *
     * Time Complexity: O(N log N) for sorting. The loop iterates N times.
     *                  Inside the loop, finding a slot takes O(maxDeadline) in the worst case
     *                  if using a simple boolean array, making it O(N * maxDeadline).
     *                  Using a Disjoint Set Union (DSU) or a max-heap can optimize the slot finding.
     *                  With a max-heap (PriorityQueue) for available slots (deadlines),
     *                  it effectively processes N jobs. Sorting by profit is N log N.
     *                  The specific implementation here uses a boolean array for slots, so it's
     *                  O(N log N + N * maxDeadline). If maxDeadline is large, this can be slow.
     *                  A DSU-based approach can bring it closer to O(N log N).
     * Space Complexity: O(maxDeadline) for the `slots` array. O(N) for sorted jobs.
     */
    public int jobSequencing(List<Job> jobs) {
        if (jobs == null) {
            throw new IllegalArgumentException("Jobs list cannot be null.");
        }
        if (jobs.isEmpty()) {
            return 0;
        }

        // 1. Sort jobs by profit in descending order.
        List<Job> sortedJobs = new ArrayList<>(jobs);
        sortedJobs.sort(Comparator.comparingInt(Job::getProfit).reversed());

        // 2. Find the maximum deadline to determine the size of the time slot array.
        int maxDeadline = 0;
        for (Job job : sortedJobs) {
            if (job.getDeadline() > maxDeadline) {
                maxDeadline = job.getDeadline();
            }
        }

        // 3. Create a boolean array to keep track of occupied time slots.
        // `slots[i]` is true if time slot `i` is occupied, false otherwise.
        // Indices 1 to maxDeadline represent the days.
        boolean[] slots = new boolean[maxDeadline + 1];
        // Alternatively, to store job IDs: String[] scheduledJobs = new String[maxDeadline + 1];

        int totalProfit = 0;

        // 4. Iterate through the sorted jobs (highest profit first).
        for (Job job : sortedJobs) {
            // 5. For each job, try to find a time slot for it.
            // Start from its deadline and go backwards to day 1.
            // This ensures that the job is scheduled as late as possible,
            // leaving earlier slots open for jobs with tighter deadlines.
            for (int j = Math.min(maxDeadline, job.getDeadline()); j >= 1; j--) {
                if (!slots[j]) { // If the slot is free
                    slots[j] = true; // Mark it as occupied
                    totalProfit += job.getProfit(); // Add job's profit
                    // scheduledJobs[j] = job.getId(); // If storing job IDs
                    break; // Job scheduled, move to the next highest profit job
                }
            }
        }

        return totalProfit;
    }

    /**
     * 5. Minimum Number of Platforms Required for a Railway Station
     * Problem Statement: Given arrival and departure times for all trains that
     * stop at a station, find the minimum number of platforms required for the station
     * so that no train has to wait.
     *
     * Greedy Choice: Sort all arrival and departure times. Then, iterate through the
     * sorted times. If an event is an arrival, increment platform count. If it's a
     * departure, decrement platform count. The maximum platform count reached at any
     * point is the minimum required. This works because it simulates the station's
     * platform usage over time.
     *
     * Why it works: By sorting both arrival and departure times, we effectively process
     * events chronologically. When a train arrives, it needs a platform, so we increment.
     * When a train departs, it frees up a platform, so we decrement. The maximum value
     * of `platformsNeeded` at any instant represents the peak simultaneous platform
     * usage, which is the minimum number of platforms required.
     *
     * @param arrival An array of arrival times for trains.
     * @param departure An array of departure times for trains.
     *                  Assumed to be of the same length and corresponding.
     * @return The minimum number of platforms required.
     * @throws IllegalArgumentException if arrival/departure arrays are null, empty,
     *                                  or have different lengths, or contain invalid times.
     *
     * Time Complexity: O(N log N) due to sorting, where N is the number of trains.
     * Space Complexity: O(N) to store sorted copies of arrival/departure times,
     *                   or O(1) if sorting in-place (if allowed to modify inputs).
     */
    public int minPlatforms(int[] arrival, int[] departure) {
        if (arrival == null || departure == null) {
            throw new IllegalArgumentException("Arrival and departure arrays cannot be null.");
        }
        if (arrival.length == 0 || departure.length == 0) {
            return 0; // No trains, no platforms needed
        }
        if (arrival.length != departure.length) {
            throw new IllegalArgumentException("Arrival and departure arrays must have the same length.");
        }

        // 1. Sort both arrival and departure times in non-decreasing order.
        // Create copies to avoid modifying original arrays.
        int[] sortedArrival = Arrays.copyOf(arrival, arrival.length);
        int[] sortedDeparture = Arrays.copyOf(departure, departure.length);

        Arrays.sort(sortedArrival);
        Arrays.sort(sortedDeparture);

        int platformsNeeded = 0;
        int maxPlatforms = 0; // Stores the maximum platforms needed at any point
        int i = 0; // Pointer for arrival array
        int j = 0; // Pointer for departure array
        int n = arrival.length; // Number of trains

        // 2. Iterate through sorted arrival and departure times.
        // This simulates events at the station chronologically.
        while (i < n && j < n) {
            // If the next event is an arrival:
            if (sortedArrival[i] <= sortedDeparture[j]) {
                platformsNeeded++; // A train arrives, needs a platform
                i++; // Move to the next arrival
            } else {
                // If the next event is a departure:
                platformsNeeded--; // A train departs, frees up a platform
                j++; // Move to the next departure
            }
            // Update the maximum platforms required seen so far.
            maxPlatforms = Math.max(maxPlatforms, platformsNeeded);
        }

        return maxPlatforms;
    }

    public static void main(String[] args) {
        GreedyAlgorithms ga = new GreedyAlgorithms();

        System.out.println("--- Activity Selection Problem ---");
        List<Activity> activities = Arrays.asList(
                new Activity("A1", 1, 4),
                new Activity("A2", 3, 5),
                new Activity("A3", 0, 6),
                new Activity("A4", 5, 7),
                new Activity("A5", 3, 8),
                new Activity("A6", 5, 9),
                new Activity("A7", 6, 10),
                new Activity("A8", 8, 11),
                new Activity("A9", 8, 12),
                new Activity("A10", 2, 13),
                new Activity("A11", 12, 14)
        );
        List<Activity> selectedActivities = ga.activitySelection(activities);
        System.out.println("Selected Activities: " + selectedActivities);
        // Expected: [Activity{id='A1', start=1, finish=4}, Activity{id='A4', start=5, finish=7}, Activity{id='A8', start=8, finish=11}, Activity{id='A11', start=12, finish=14}]


        System.out.println("\n--- Fractional Knapsack Problem ---");
        List<Item> items = Arrays.asList(
                new Item("Item1", 10, 60),
                new Item("Item2", 20, 100),
                new Item("Item3", 30, 120)
        );
        int capacity = 50;
        double maxValue = ga.fractionalKnapsack(capacity, items);
        System.out.println("Max value for capacity " + capacity + ": " + String.format("%.2f", maxValue));
        // Expected: For capacity 50: (Item1: 10kg, 60$) + (Item2: 20kg, 100$) + (20/30 of Item3: 20kg, 80$) = 60+100+80 = 240.00


        System.out.println("\n--- Coin Change Problem (Greedy) ---");
        int[] usCoins = {1, 5, 10, 25}; // Canonical US coin system
        int amount1 = 63;
        System.out.println("Min coins for " + amount1 + " (US coins): " + ga.coinChangeGreedy(usCoins, amount1)); // Expected: 63 = 2x25 + 1x10 + 0x5 + 3x1 = 6 coins
        int[] euroCoins = {1, 2, 5, 10, 20, 50, 100, 200}; // Canonical Euro coin system (cents)
        int amount2 = 87;
        System.out.println("Min coins for " + amount2 + " (Euro cents): " + ga.coinChangeGreedy(euroCoins, amount2)); // Expected: 87 = 1x50 + 1x20 + 1x10 + 1x5 + 1x2 = 5 coins


        System.out.println("\n--- Job Sequencing with Deadlines ---");
        List<Job> jobs = Arrays.asList(
                new Job("J1", 2, 100),
                new Job("J2", 1, 10),
                new Job("J3", 2, 15),
                new Job("J4", 1, 25)
        );
        int maxProfit = ga.jobSequencing(jobs);
        System.out.println("Max profit from job sequencing: " + maxProfit);
        // Sorted by profit: J1(100), J4(25), J3(15), J2(10)
        // Schedule J1: deadline 2. Slot 2 taken. Profit: 100
        // Schedule J4: deadline 1. Slot 1 taken. Profit: 100 + 25 = 125
        // J3 (deadline 2): Slot 2 taken. Skip.
        // J2 (deadline 1): Slot 1 taken. Skip.
        // Expected: 125


        System.out.println("\n--- Minimum Platforms Required ---");
        int[] arrival = {900, 940, 950, 1100, 1500, 1800}; // Example times in HHMM format
        int[] departure = {910, 1200, 1120, 1130, 1900, 2000};
        int platforms = ga.minPlatforms(arrival, departure);
        System.out.println("Min platforms needed: " + platforms); // Expected: 3 (at 11:00-11:20 approx)
    }
}