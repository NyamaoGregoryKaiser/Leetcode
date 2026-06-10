```java
package com.techinterview.stackqueue.problems;

import java.util.LinkedList;
import java.util.Queue;

/**
 * Problem: Number of Recent Calls
 * You have a RecentCounter class which counts the number of recent requests within a specific time frame.
 *
 * Implement the RecentCounter class:
 * - RecentCounter() Initializes the counter with zero recent requests.
 * - int ping(int t) Adds a new request at time t, where t represents some time in milliseconds,
 *   and returns the number of requests that have happened in the past 3000 milliseconds
 *   (including the current request). Specifically, return the number of requests in the interval [t - 3000, t].
 *
 * It is guaranteed that every call to ping uses a strictly increasing value of t.
 */
public class RecentCounter {

    // A queue to store the timestamps of all recent requests.
    // LinkedList is chosen as it efficiently supports adding to the end (offer)
    // and removing from the front (poll) of the queue.
    private Queue<Integer> requests;

    /**
     * Constructor: Initializes the counter with zero recent requests.
     * Time Complexity: O(1)
     * Space Complexity: O(1) (for initial object creation)
     */
    public RecentCounter() {
        requests = new LinkedList<>();
    }

    /**
     * Adds a new request at time 't' and returns the number of requests
     * within the interval [t - 3000, t].
     *
     * @param t The timestamp of the current request in milliseconds.
     * @return The count of requests within the last 3000 milliseconds.
     *
     * Time Complexity: Amortized O(1).
     *   In the worst case, if many old requests fall out of the window,
     *   we might perform multiple 'poll' operations. However, each request
     *   is added to the queue once and removed from the queue once.
     *   Therefore, over a sequence of N pings, the total operations are O(N),
     *   leading to an amortized O(1) per ping.
     * Space Complexity: O(W) where W is the maximum number of requests that can
     *   fit within the 3000ms window. If requests come in very rapidly,
     *   the queue might hold many elements. In the worst case, it can be O(N)
     *   if all N requests fall within the window.
     */
    public int ping(int t) {
        // 1. Add the current request's timestamp to the queue.
        requests.offer(t);

        // 2. Remove all requests from the front of the queue that are outside
        //    the sliding window [t - 3000, t].
        //    Since 't' is strictly increasing, older requests will always be
        //    at the front of the queue (FIFO order).
        //    The condition 'requests.peek() < t - 3000' checks if the oldest
        //    request is older than the lower bound of our window.
        while (!requests.isEmpty() && requests.peek() < t - 3000) {
            requests.poll(); // Remove the outdated request
        }

        // 3. The remaining requests in the queue are all within the desired window.
        //    Return the current size of the queue.
        return requests.size();
    }

    /**
     * Alternative Approach: Using a `TreeMap` or `Segment Tree` (Overkill for this problem)
     *
     * While a queue provides an optimal solution for this "sliding window" problem
     * due to the strictly increasing 't' values, one could conceive of alternative
     * data structures if `t` was not strictly increasing or if more complex range
     * queries were needed (e.g., count requests in [t1, t2]).
     *
     * A `TreeMap<Integer, Integer>` could store `(timestamp, count_at_timestamp)`.
     * To find the count in `[t - 3000, t]`, you'd use `subMap()` and sum up values.
     * However, removing old entries would be less efficient than `Queue.poll()`,
     * and the complexity for `ping` would be O(logN) for adding, plus O(K logN)
     * for finding and potentially O(K) for summing if K elements are in range.
     *
     * For this specific problem with strictly increasing `t`, the `Queue` approach is
     * the most straightforward, efficient, and idiomatic solution.
     */
}
```