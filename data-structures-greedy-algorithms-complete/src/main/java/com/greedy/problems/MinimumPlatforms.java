```java
package com.greedy.problems;

import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;

/**
 * **Problem:** Minimum Platforms Required
 *
 * Given arrival and departure times for all trains that arrive at a railway station.
 * Find the minimum number of platforms required for the station so that no train has to wait.
 *
 * **Constraints:**
 * - Each train requires exactly one platform.
 * - A train's arrival and departure are distinct events.
 * - All times are given in military (24-hour) format.
 * - Arrival time <= Departure time.
 *
 * **Example:**
 * Arrival:   [900, 940, 950, 1100, 1500, 1800]
 * Departure: [910, 1200, 1120, 1130, 1900, 2000]
 *
 * **Greedy Choice Property:**
 * At any point in time, the number of platforms required is the number of trains
 * currently at the station. To minimize the maximum platforms needed, we should
 * intelligently track arrivals and departures.
 * The greedy choice is to process events (arrivals or departures) in chronological order.
 * When a train arrives, it needs a platform. When a train departs, it frees up a platform.
 *
 * **Algorithm Steps (Sorting + Two Pointers):**
 * 1. Sort both the arrival times and departure times independently in non-decreasing order.
 * 2. Initialize `platformsNeeded = 0`, `maxPlatforms = 0`.
 * 3. Use two pointers, `i` for arrival times and `j` for departure times, both starting at 0.
 * 4. Iterate while `i < n` (number of trains) and `j < n`:
 *    a. If `arrival[i] <= departure[j]`:
 *       This means a train is arriving. It needs a platform. Increment `platformsNeeded`.
 *       Move to the next arrival: `i++`.
 *       Update `maxPlatforms = max(maxPlatforms, platformsNeeded)`.
 *    b. Else (`arrival[i] > departure[j]`):
 *       This means a train is departing. It frees up a platform. Decrement `platformsNeeded`.
 *       Move to the next departure: `j++`.
 * 5. Return `maxPlatforms`.
 *
 * **Alternative Algorithm (Using Priority Queue/Min-Heap):**
 * 1. Create a list of all events (arrival, departure) with their type. Or,
 *    sort trains by arrival time.
 * 2. Use a min-priority queue to keep track of departure times of currently occupied platforms.
 *    The top of the heap will be the earliest departure time among currently occupied platforms.
 * 3. Iterate through trains sorted by arrival time:
 *    a. While the priority queue is not empty AND the current train's arrival time
 *       is greater than or equal to the earliest departure time in the PQ:
 *       Remove from PQ (a platform becomes free).
 *    b. Add the current train's departure time to the PQ (it occupies a platform).
 *    c. The size of the PQ at this point represents the number of platforms currently in use.
 *       Update `maxPlatforms = max(maxPlatforms, pq.size())`.
 * 4. Return `maxPlatforms`.
 *
 * The sorting + two pointers approach is generally more efficient and simpler for this problem.
 */
public class MinimumPlatforms {

    /**
     * Solves the Minimum Platforms problem using the sorting and two-pointers greedy approach.
     *
     * @param arrival   An array of arrival times.
     * @param departure An array of departure times.
     * @return The minimum number of platforms required. Returns 0 if inputs are null/empty.
     *
     * **Time Complexity:**
     * - Sorting arrival times: O(N log N), where N is the number of trains.
     * - Sorting departure times: O(N log N).
     * - Two-pointer traversal: O(N).
     * - Total: O(N log N) due to sorting.
     *
     * **Space Complexity:**
     * - O(1) if sorting is in-place and input arrays are modified.
     * - O(N) if copies are made for sorting (e.g., using `Arrays.copyOf` or `ArrayList`).
     */
    public int findMinPlatformsTwoPointers(int[] arrival, int[] departure) {
        if (arrival == null || departure == null || arrival.length == 0 || departure.length == 0) {
            return 0;
        }

        int n = arrival.length;
        if (n != departure.length) {
            throw new IllegalArgumentException("Arrival and departure arrays must have the same length.");
        }

        // Step 1: Sort both arrival and departure arrays.
        // It's crucial to sort them independently.
        Arrays.sort(arrival);
        Arrays.sort(departure);

        int platformsNeeded = 0;
        int maxPlatforms = 0;

        // Step 3: Initialize two pointers.
        int i = 0; // Pointer for arrival array
        int j = 0; // Pointer for departure array

        // Step 4: Iterate using two pointers.
        while (i < n && j < n) {
            // If an arrival event happens before or at the same time as a departure event,
            // a new platform is needed.
            if (arrival[i] <= departure[j]) {
                platformsNeeded++;
                i++; // Move to next arrival
            }
            // If a departure event happens before an arrival event,
            // a platform is freed up.
            else { // arrival[i] > departure[j]
                platformsNeeded--;
                j++; // Move to next departure
            }
            // Update the maximum platforms needed so far.
            maxPlatforms = Math.max(maxPlatforms, platformsNeeded);
        }

        // After the loop, `maxPlatforms` holds the peak number of platforms needed.
        return maxPlatforms;
    }


    /**
     * Solves the Minimum Platforms problem using a greedy approach with a Min-Priority Queue.
     * This method sorts trains by arrival time and then manages platforms using a priority queue
     * of departure times.
     *
     * @param arrival   An array of arrival times.
     * @param departure An array of departure times.
     * @return The minimum number of platforms required. Returns 0 if inputs are null/empty.
     *
     * **Time Complexity:**
     * - Creating and sorting train objects: O(N log N).
     * - Iterating N trains, each involving PQ operations: O(N log N).
     * - Total: O(N log N).
     *
     * **Space Complexity:**
     * - O(N) for storing train objects and the priority queue.
     */
    public int findMinPlatformsPriorityQueue(int[] arrival, int[] departure) {
        if (arrival == null || departure == null || arrival.length == 0 || departure.length == 0) {
            return 0;
        }

        int n = arrival.length;
        if (n != departure.length) {
            throw new IllegalArgumentException("Arrival and departure arrays must have the same length.");
        }

        // Create a custom object to hold arrival and departure times for each train
        class Train {
            int arrivalTime;
            int departureTime;

            Train(int arr, int dep) {
                this.arrivalTime = arr;
                this.departureTime = dep;
            }
        }

        List<Train> trains = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            trains.add(new Train(arrival[i], departure[i]));
        }

        // Sort trains by their arrival times
        trains.sort(Comparator.comparingInt(t -> t.arrivalTime));

        // Priority queue to store departure times of trains currently on platforms.
        // It's a min-heap, so the earliest departure time is at the top.
        PriorityQueue<Integer> platformDepartureTimes = new PriorityQueue<>();

        int maxPlatforms = 0;

        for (Train train : trains) {
            // Free up platforms that are no longer needed before the current train arrives
            // A platform is freed if its train's departure time is less than or equal to
            // the current train's arrival time.
            while (!platformDepartureTimes.isEmpty() && platformDepartureTimes.peek() <= train.arrivalTime) {
                platformDepartureTimes.poll();
            }

            // Assign a platform to the current train by adding its departure time to the PQ
            platformDepartureTimes.offer(train.departureTime);

            // The current size of the priority queue indicates the number of platforms
            // currently in use. Update the maximum needed.
            maxPlatforms = Math.max(maxPlatforms, platformDepartureTimes.size());
        }

        return maxPlatforms;
    }


    /**
     * A "brute force" conceptual approach for Minimum Platforms.
     * This would involve trying all possible assignments of trains to platforms
     * and checking for conflicts, or simulating all possible orderings.
     * This is an NP-hard problem if we generalize to non-unit-time events and want minimum platforms.
     * For this specific problem, the greedy approaches are optimal and efficient.
     *
     * This method is a placeholder to show the contrast; it does not implement
     * an actual exponential brute force for this specific problem due to complexity.
     *
     * @param arrival   An array of arrival times.
     * @param departure An array of departure times.
     * @return A conceptual value indicating complexity.
     *
     * **Time Complexity:** Hypothetically exponential (e.g., O(N!) or O(N^N)).
     * **Space Complexity:** Exponential for storing states.
     */
    public int findMinPlatformsBruteForceConceptual(int[] arrival, int[] departure) {
        // A true brute-force approach would try all possible assignments of trains to platforms,
        // which is combinatorial and highly complex (e.g., trying to place N intervals into K bins).
        // For N trains, you might recursively try to place each train on an existing platform or a new one,
        // checking for overlaps. This quickly becomes an exponential time complexity (e.g., O(N * (N+K)^N)).

        System.out.println("Brute-force approach for Minimum Platforms is computationally infeasible for practical N.");
        System.out.println("The greedy methods are optimal and efficient for this problem.");
        return -1; // Indicate not implemented effectively
    }
}

```