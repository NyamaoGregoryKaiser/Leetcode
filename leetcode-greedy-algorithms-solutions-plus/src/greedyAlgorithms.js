```javascript
/**
 * @fileoverview Implementations of classic Greedy Algorithms.
 * This file contains optimal JavaScript solutions for several well-known
 * greedy problems, complete with detailed comments on logic, time, and
 * space complexity.
 */

const { DisjointSetUnion } = require('./utils/dataStructures');

/**
 * 1. Activity Selection Problem
 *
 * Problem Statement: Given a set of n activities, each with a start time `s[i]`
 * and a finish time `f[i]`. Select the maximum number of non-overlapping activities
 * that can be performed by a single person/machine.
 *
 * Greedy Choice: Always pick the activity that finishes earliest among the remaining
 * compatible activities.
 *
 * Justification: If we choose an activity that finishes earliest, we leave the maximum
 * possible time available for other activities. This local optimal choice leads to a
 * global optimal solution.
 *
 * @param {Array<Object>} activities An array of activity objects.
 *   Each object should have `start` and `end` properties (e.g., `{ start: 1, end: 4 }`).
 * @returns {Array<Object>} An array of selected activities that are non-overlapping
 *   and maximize the total count.
 *
 * Time Complexity:
 *   - O(N log N) for sorting the activities by their finish times.
 *   - O(N) for iterating through the sorted activities to select them.
 *   Total: O(N log N)
 *
 * Space Complexity:
 *   - O(N) for storing the sorted activities (if a new array is created) or
 *     O(log N) to O(N) for in-place sort depending on the algorithm's implementation.
 *   - O(K) where K is the number of selected activities, for the result array.
 *   Total: O(N)
 */
function activitySelection(activities) {
    if (!activities || activities.length === 0) {
        return [];
    }

    // Step 1: Sort activities by their finish times in ascending order.
    // If finish times are equal, sort by start times to ensure consistent output,
    // though for correctness, any order for equal finish times works.
    const sortedActivities = [...activities].sort((a, b) => {
        if (a.end !== b.end) {
            return a.end - b.end;
        }
        return a.start - b.start;
    });

    const selectedActivities = [];
    // The first activity to be selected is always the one that finishes earliest.
    selectedActivities.push(sortedActivities[0]);

    // `lastFinishTime` tracks the finish time of the most recently selected activity.
    let lastFinishTime = sortedActivities[0].end;

    // Step 2: Iterate through the remaining sorted activities.
    // Select an activity if its start time is greater than or equal to the finish time
    // of the previously selected activity (i.e., it does not overlap).
    for (let i = 1; i < sortedActivities.length; i++) {
        const currentActivity = sortedActivities[i];
        if (currentActivity.start >= lastFinishTime) {
            selectedActivities.push(currentActivity);
            lastFinishTime = currentActivity.end;
        }
    }

    return selectedActivities;
}

/**
 * 2. Fractional Knapsack Problem
 *
 * Problem Statement: Given weights and values of N items, put these items in a
 * knapsack of a fixed capacity W to get the maximum total value. You can take
 * fractions of items.
 *
 * Greedy Choice: Prioritize items with the highest value-to-weight ratio.
 * This ensures that we get the "most value per unit weight" into the knapsack.
 *
 * Justification: Since we can take fractions, it's always optimal to take as much
 * of the most "dense" valuable item as possible. If we pick an item with a lower
 * value-to-weight ratio instead of a higher one, we would either fill the knapsack
 * with less total value or take up more space for the same value, which is suboptimal.
 *
 * @param {Array<Object>} items An array of item objects.
 *   Each object should have `value` and `weight` properties
 *   (e.g., `{ value: 60, weight: 10 }`).
 * @param {number} capacity The maximum total weight the knapsack can hold.
 * @returns {number} The maximum total value that can be obtained.
 *
 * Time Complexity:
 *   - O(N log N) for sorting the items by their value-to-weight ratio.
 *   - O(N) for iterating through the sorted items to fill the knapsack.
 *   Total: O(N log N)
 *
 * Space Complexity:
 *   - O(N) for storing the items with calculated ratios (if creating new objects) or
 *     O(log N) to O(N) for in-place sort depending on the algorithm's implementation.
 *   Total: O(N)
 */
function fractionalKnapsack(items, capacity) {
    if (!items || items.length === 0 || capacity <= 0) {
        return 0;
    }

    // Step 1: Calculate the value-to-weight ratio for each item.
    // Store items with their ratios to facilitate sorting.
    const itemsWithRatios = items.map(item => ({
        ...item,
        ratio: item.value / item.weight
    }));

    // Step 2: Sort items by their value-to-weight ratio in descending order.
    itemsWithRatios.sort((a, b) => b.ratio - a.ratio);

    let currentCapacity = capacity;
    let totalValue = 0;

    // Step 3: Iterate through the sorted items and fill the knapsack.
    for (const item of itemsWithRatios) {
        if (currentCapacity <= 0) {
            break; // Knapsack is full
        }

        // If the entire item can fit, take it completely.
        if (item.weight <= currentCapacity) {
            totalValue += item.value;
            currentCapacity -= item.weight;
        } else {
            // If only a fraction of the item can fit, take that fraction.
            const fraction = currentCapacity / item.weight;
            totalValue += item.value * fraction;
            currentCapacity = 0; // Knapsack is now full
        }
    }

    return totalValue;
}

/**
 * 3. Job Sequencing with Deadlines
 *
 * Problem Statement: Given a set of N jobs, where each job `i` has a deadline `d[i]`
 * and a profit `p[i]`. Each job takes unit time. The goal is to find a sequence of
 * jobs that maximizes the total profit, such that each job is completed by its deadline.
 *
 * Greedy Choice: Sort jobs by profit in descending order. For each job, schedule it
 * in the latest possible available slot before or on its deadline.
 *
 * Justification: By prioritizing jobs with higher profits, we ensure that we try to
 * include the most valuable jobs first. Scheduling them in the latest possible slot
 * before their deadline leaves earlier slots free for other high-profit jobs that
 * might have tighter deadlines. This combination helps maximize total profit.
 *
 * Implementation Approaches:
 * 1.  **Simple Slot Allocation (Implemented Below - `jobSequencing`):**
 *     Iterate backwards from `job.deadline - 1` to `0` to find an available slot.
 *     Time: O(N * max_deadline), Space: O(max_deadline).
 *     This is effective when `max_deadline` is small relative to `N`.
 *
 * 2.  **Optimized with Disjoint Set Union (DSU) (Implemented Below - `jobSequencingOptimized`):**
 *     Use DSU to quickly find the latest available slot. Each slot `i` is a set.
 *     `find(i)` gives the representative of the set, which can be thought of as
 *     the earliest available slot if `i` is occupied, or `i` itself if available.
 *     Time: O(N log N + max_deadline * α(max_deadline)), Space: O(max_deadline).
 *     This is more efficient for larger `max_deadline` values.
 *
 * @param {Array<Object>} jobs An array of job objects.
 *   Each object should have `id` (string), `deadline` (integer), and `profit` (integer).
 *   (e.g., `{ id: 'a', deadline: 2, profit: 100 }`).
 * @returns {Object} An object containing `maxProfit` (number) and `jobSequence` (Array<string>).
 */
function jobSequencing(jobs) {
    if (!jobs || jobs.length === 0) {
        return { maxProfit: 0, jobSequence: [] };
    }

    // Step 1: Sort jobs by profit in descending order.
    // This is the primary greedy choice.
    const sortedJobs = [...jobs].sort((a, b) => b.profit - a.profit);

    // Determine the maximum deadline to initialize the time slots.
    const maxDeadline = Math.max(...jobs.map(job => job.deadline));

    // `slots` array to keep track of occupied time slots.
    // `slots[i]` will store the ID of the job scheduled in slot `i`.
    // Initialize with `null` or empty string to denote available slots.
    // The slots are 0-indexed, representing time units (e.g., slot 0, slot 1, ..., slot maxDeadline-1).
    const scheduledSlots = new Array(maxDeadline).fill(null);

    let totalProfit = 0;
    const jobSequence = [];

    // Step 2: Iterate through the sorted jobs.
    for (const job of sortedJobs) {
        // For each job, try to schedule it in the latest possible slot before or on its deadline.
        // We iterate backwards from `job.deadline - 1` down to `0`.
        for (let j = Math.min(job.deadline - 1, maxDeadline - 1); j >= 0; j--) {
            if (scheduledSlots[j] === null) {
                // Slot 'j' is available, schedule the job here.
                scheduledSlots[j] = job.id;
                totalProfit += job.profit;
                jobSequence.push(job.id); // Add job ID to the sequence (order of execution)
                break; // Move to the next job, this one is scheduled.
            }
        }
    }

    // The `jobSequence` array will contain jobs in the order they were selected
    // (highest profit first). To get the actual execution order by time slot,
    // we would filter and sort `scheduledSlots`. For this problem, we typically
    // just return the jobs that were selected, which is often what is expected.
    // Let's refine `jobSequence` to represent the order of execution.
    const finalSequence = scheduledSlots.filter(id => id !== null);

    return { maxProfit: totalProfit, jobSequence: finalSequence };
}

/**
 * 3. Job Sequencing with Deadlines (Optimized using Disjoint Set Union)
 *
 * This version uses the Disjoint Set Union (DSU) data structure to efficiently
 * find the latest available slot for each job.
 *
 * How DSU helps:
 * - We create a DSU for `maxDeadline + 1` elements. Each element `i` represents
 *   a time slot (or a pointer to the *earliest* available slot if `i` is occupied).
 * - `parent[i]` initially points to `i`.
 * - When a job is scheduled in slot `s`, we "occupy" slot `s`. This means we can't
 *   use `s` again. If we want to find the next available slot for a deadline `d`,
 *   and slot `d-1` is occupied, we effectively want to find `find(d-1)` which will
 *   give us the representative of the set of slots that `d-1` belongs to.
 *   By clever Union operations, `find(s)` can be made to return `s-1` if slot `s`
 *   is taken, or the earliest available slot before `s`.
 * - Specifically, when slot `s` is used, we `union(s, s-1)`. This means that if
 *   someone asks for `find(s)`, they will now get `find(s-1)`. This way, `find(deadline)`
 *   will always return the latest free slot `s <= deadline`.
 *
 * @param {Array<Object>} jobs An array of job objects.
 *   Each object should have `id` (string), `deadline` (integer), and `profit` (integer).
 * @returns {Object} An object containing `maxProfit` (number) and `jobSequence` (Array<string>).
 *
 * Time Complexity:
 *   - O(N log N) for sorting jobs.
 *   - O(max_deadline) for DSU initialization.
 *   - O(N * α(max_deadline)) for iterating through jobs and performing find/union operations.
 *     α is the inverse Ackermann function, which is extremely slow-growing, effectively constant.
 *   Total: O(N log N + max_deadline) (dominated by sorting and DSU initialization in practice).
 *
 * Space Complexity:
 *   - O(max_deadline) for DSU `parent` and `size` arrays.
 *   - O(N) for storing sorted jobs.
 *   Total: O(N + max_deadline)
 */
function jobSequencingOptimized(jobs) {
    if (!jobs || jobs.length === 0) {
        return { maxProfit: 0, jobSequence: [] };
    }

    // Step 1: Sort jobs by profit in descending order.
    const sortedJobs = [...jobs].sort((a, b) => b.profit - a.profit);

    // Determine the maximum deadline to initialize the DSU.
    // DSU will be 0-indexed, so if max deadline is D, we need D+1 elements (0 to D).
    const maxDeadline = Math.max(...jobs.map(job => job.deadline));
    const dsu = new DisjointSetUnion(maxDeadline + 1);

    // This array will store the job scheduled in each slot.
    // `scheduledSlots[i]` will hold the ID of the job scheduled in slot `i`.
    // It's initialized to null, representing empty slots.
    const scheduledSlots = new Array(maxDeadline + 1).fill(null);

    let totalProfit = 0;

    // Step 2: Iterate through the sorted jobs.
    for (const job of sortedJobs) {
        // Find the latest available slot for the current job.
        // We use `dsu.find(job.deadline)` to get the representative of the set
        // that `job.deadline` belongs to. Due to how we perform unions (union(slot, slot-1)),
        // this representative will be the latest free slot `s <= job.deadline`.
        // Note: DSU is 0-indexed, so `job.deadline` directly maps to the slot index.
        const availableSlot = dsu.find(job.deadline);

        // If `availableSlot` is greater than 0 (meaning a slot `s >= 1` is available)
        // AND `scheduledSlots[availableSlot]` is empty, we can schedule the job.
        // It's `availableSlot > 0` because slot 0 is the "before any slot" or "no slot available" marker
        // if all slots up to `availableSlot` are taken.
        // The DSU will point to the largest index that is still free. If it points to 0, it means no
        // slot can be taken before or on the deadline.
        if (availableSlot > 0) {
            // Schedule the job in this `availableSlot`.
            scheduledSlots[availableSlot] = job.id;
            totalProfit += job.profit;

            // Union `availableSlot` with `availableSlot - 1`.
            // This marks `availableSlot` as occupied. Now, if `find(availableSlot)` is called again,
            // it will return the representative of the set containing `availableSlot - 1`,
            // effectively pointing to the next available slot *before* `availableSlot`.
            dsu.union(availableSlot, availableSlot - 1);
        }
    }

    // Filter out nulls and 0-th element (which is never a job slot, only a DSU representative)
    // to get the final sequence of scheduled job IDs in execution order.
    const jobSequence = scheduledSlots.filter(id => id !== null);

    return { maxProfit: totalProfit, jobSequence };
}


module.exports = {
    activitySelection,
    fractionalKnapsack,
    jobSequencing,
    jobSequencingOptimized,
};
```