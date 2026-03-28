```javascript
/**
 * connectRopes.js
 *
 * Problem: Connect Ropes with Minimum Cost.
 *
 * Problem Description:
 * Given `n` ropes of different lengths, we need to connect these ropes into a single rope.
 * The cost of connecting two ropes is equal to the sum of their lengths.
 * We need to find the minimum cost to connect all ropes.
 *
 * Example 1:
 * Input: ropes = [4, 3, 2, 6]
 * Output: 29
 * Explanation:
 * 1. Connect ropes of length 2 and 3. Cost = 2 + 3 = 5. Ropes become [4, 5, 6]
 * 2. Connect ropes of length 4 and 5. Cost = 4 + 5 = 9. Ropes become [6, 9]
 * 3. Connect ropes of length 6 and 9. Cost = 6 + 9 = 15. Ropes become [15]
 * Total minimum cost = 5 + 9 + 15 = 29.
 *
 * Example 2:
 * Input: ropes = [1, 2, 3, 4, 5]
 * Output: 33
 * Explanation:
 * 1. Connect 1 and 2 (cost 3). Ropes: [3,3,4,5]
 * 2. Connect 3 and 3 (cost 6). Ropes: [4,5,6]
 * 3. Connect 4 and 5 (cost 9). Ropes: [6,9]
 * 4. Connect 6 and 9 (cost 15). Ropes: [15]
 * Total cost = 3 + 6 + 9 + 15 = 33.
 */

const MinHeap = require('./minHeap');

/**
 * Finds the minimum cost to connect all ropes using a Min-Heap.
 *
 * Approach:
 * This problem is a classic application of a Min-Heap (or a priority queue).
 * The strategy is always to merge the two smallest ropes available.
 *
 * Why this greedy approach works:
 * To minimize the total cost, we want to minimize the number of times longer ropes are involved
 * in connections. By repeatedly merging the two shortest available ropes, we ensure that:
 * - The smallest sums are incurred at each step.
 * - These small sums are then added to the pool of ropes, potentially to be merged again.
 * - The larger ropes are formed later in the process, reducing their "multiplicative factor"
 *   in the total cost (i.e., they are part of fewer early sums).
 *
 * Algorithm:
 * 1. Insert all rope lengths into a Min-Heap.
 * 2. Initialize `totalCost = 0`.
 * 3. While the heap has more than one rope:
 *    a. Extract the two smallest ropes (let their lengths be `l1` and `l2`).
 *    b. Calculate their connection cost: `cost = l1 + l2`.
 *    c. Add `cost` to `totalCost`.
 *    d. Insert the newly formed rope (with length `cost`) back into the heap.
 * 4. Once the heap contains only one rope (the final connected rope), the loop terminates.
 * 5. Return `totalCost`.
 *
 * Time Complexity: O(N log N)
 *   - N is the number of ropes.
 *   - Initializing the heap: O(N) if using `buildHeap` (not implemented here but possible),
 *     or O(N log N) if inserting elements one by one.
 *   - The main loop runs N-1 times (as each iteration reduces the heap size by 1).
 *   - Each iteration involves two `extractMin` operations and one `insert` operation,
 *     each taking O(log N) time (as the heap size varies up to N).
 *   - Total: (N-1) * (2 * O(log N) + O(log N)) = O(N log N).
 * Space Complexity: O(N)
 *   - The heap stores up to N elements.
 *
 * @param {number[]} ropes - An array of rope lengths.
 * @returns {number} The minimum cost to connect all ropes.
 */
function connectRopesWithMinCost(ropes) {
    if (!ropes || ropes.length === 0) {
        return 0;
    }
    if (ropes.length === 1) {
        return 0; // A single rope requires no connection cost.
    }

    const minHeap = new MinHeap();

    // Add all rope lengths to the min-heap
    for (const length of ropes) {
        minHeap.insert(length);
    }

    let totalCost = 0;

    // While there is more than one rope in the heap
    while (minHeap.size() > 1) {
        // Extract the two smallest ropes
        const firstSmallest = minHeap.extractMin();
        const secondSmallest = minHeap.extractMin();

        // Calculate the cost of connecting them
        const currentCost = firstSmallest + secondSmallest;
        totalCost += currentCost;

        // Insert the newly connected rope back into the heap
        minHeap.insert(currentCost);
    }

    return totalCost;
}

/**
 * Alternative Approach: Brute Force (Sorting and repeated merging - less efficient)
 *
 * 1. Sort the array of ropes.
 * 2. Repeatedly pick the two smallest, merge them, add cost, and re-insert/re-sort.
 *    This will involve sorting in each step, making it very inefficient.
 *
 * Time Complexity: O(N^2 log N) or O(N^3) depending on how sorting/insertion is managed.
 *   - Outer loop N times.
 *   - Inner sort O(N log N).
 *   - Or, O(N^2) if using insertion sort-like behavior to keep array sorted.
 * Space Complexity: O(1) or O(N) depending on sort.
 *
 * This approach is shown for contrast but is not practical for large inputs.
 */
function connectRopesWithMinCost_BruteForce(ropes) {
    if (!ropes || ropes.length === 0) {
        return 0;
    }
    if (ropes.length === 1) {
        return 0;
    }

    let currentRopes = [...ropes]; // Create a copy
    let totalCost = 0;

    while (currentRopes.length > 1) {
        // Sort the ropes to find the two smallest. This is the expensive part.
        currentRopes.sort((a, b) => a - b);

        const firstSmallest = currentRopes.shift(); // Remove smallest
        const secondSmallest = currentRopes.shift(); // Remove second smallest

        const currentMergeCost = firstSmallest + secondSmallest;
        totalCost += currentMergeCost;

        // Insert the new rope back, maintaining sorted order if possible (or just push and re-sort)
        currentRopes.push(currentMergeCost);
    }

    return totalCost;
}


module.exports = {
    connectRopesWithMinCost,
    connectRopesWithMinCost_BruteForce // For comparison
};
```