```javascript
/**
 * @fileoverview Implementation of the Gas Station Problem (Circular Tour) using a Greedy approach.
 *
 * Problem Description:
 * There are `N` gas stations along a circular route, where the `i`-th station has
 * `gas[i]` amount of gas. You have a car with an unlimited gas tank, and it costs
 * `cost[i]` to travel from station `i` to station `i + 1`. You begin the journey
 * with an empty tank at one of the gas stations.
 * Return the starting gas station's index if you can travel all the way around
 * the circuit once, otherwise return -1.
 *
 * Example:
 * gas =  [1, 2, 3, 4, 5]
 * cost = [3, 4, 5, 1, 2]
 *
 * Calculate net_gain = gas[i] - cost[i] for each station:
 * station 0: 1 - 3 = -2
 * station 1: 2 - 4 = -2
 * station 2: 3 - 5 = -2
 * station 3: 4 - 1 =  3
 * station 4: 5 - 2 =  3
 *
 * Total gain = -2 - 2 - 2 + 3 + 3 = 0. Since total_gain >= 0, a solution exists.
 *
 * Let's trace from different start points (implicitly):
 * Start at 0: current_tank = 0.
 * 0 -> 1: tank = 0 + (-2) = -2 (Fail, cannot start at 0)
 * Start at 1: current_tank = 0.
 * 1 -> 2: tank = 0 + (-2) = -2 (Fail, cannot start at 1)
 * ...
 * Start at 3: current_tank = 0.
 * 3 -> 4: tank = 0 + 3 = 3
 * 4 -> 0: tank = 3 + 3 = 6
 * 0 -> 1: tank = 6 + (-2) = 4
 * 1 -> 2: tank = 4 + (-2) = 2
 * 2 -> 3: tank = 2 + (-2) = 0 (Success! Started at 3, ended at 3 with 0 gas)
 *
 * Optimal Solution: 3
 *
 * Greedy Choice Property:
 * If a car can start at station `i` and run out of gas at station `j` (where `j < i` in a circular sense, or `j` is the first station after `i` where tank becomes negative), then it's impossible to start at any station between `i` and `j` (inclusive of `i`, exclusive of `j`) and complete the circuit. This is because any station `k` between `i` and `j-1` would also have resulted in a negative tank by station `j` or earlier, given that `i` itself couldn't make it past `j`.
 *
 * More formally: If `current_tank` drops below zero at station `j` after starting at `i`,
 * it means `sum(gas[k] - cost[k] for k from i to j-1)` is negative.
 * If we started at any `k` where `i < k < j`, then `sum(gas[p] - cost[p] for p from k to j-1)` would also be negative
 * (or `k` would have failed earlier). Thus, if we fail at `j` starting from `i`, the next potential
 * starting point must be `j+1`.
 *
 * A crucial property: If the total amount of gas available (`sum(gas)`) is greater than or equal to the total cost to travel (`sum(cost)`), then a solution *must* exist. There will be exactly one unique solution.
 *
 * Proof of Correctness (Intuition):
 * 1. Check if `sum(gas) < sum(cost)`. If so, no solution exists because you simply don't have enough gas in total to cover the entire trip. Return -1.
 *
 * 2. If `sum(gas) >= sum(cost)`, then a solution must exist.
 *    Iterate through the stations. Maintain a `current_tank` and `total_tank`.
 *    `total_tank` keeps track of the overall gas surplus/deficit for the entire trip.
 *    `current_tank` tracks the gas level if we hypothetically started at `start_node`.
 *
 *    When `current_tank` becomes negative, it means that the chosen `start_node`
 *    is not valid, and neither are any stations between `start_node` and the current `i`
 *    (as explained in the greedy choice property). So, we reset `current_tank` to 0
 *    and set the new `start_node` to `i + 1`.
 *
 *    Because we've already confirmed `sum(gas) >= sum(cost)`, we are guaranteed to find
 *    a `start_node` that will make `current_tank` non-negative by the end of the loop.
 *    This `start_node` will be the answer.
 */

/**
 * Finds the starting gas station index from which a car can complete a circular tour.
 *
 * @param {Array<number>} gas - An array where `gas[i]` is the amount of gas at station `i`.
 * @param {Array<number>} cost - An array where `cost[i]` is the cost to travel from station `i` to `i+1`.
 * @returns {number} The starting station's index (0-indexed) if a solution exists, otherwise -1.
 *
 * Time Complexity: O(N), where N is the number of gas stations. We iterate through the arrays once.
 * Space Complexity: O(1), as we only use a few auxiliary variables.
 */
function canCompleteCircuit(gas, cost) {
  // Edge case: If inputs are invalid or empty, return -1.
  if (!gas || !cost || gas.length === 0 || cost.length === 0 || gas.length !== cost.length) {
    return -1;
  }

  const n = gas.length;

  let totalGasInTank = 0;   // Tracks the net gas difference over the entire circuit.
  let currentTripTank = 0;  // Tracks the gas in the tank for the current potential trip starting at `startStation`.
  let startStation = 0;     // The potential starting station index.

  // Iterate through each station to calculate the net gas change and find a potential start point.
  for (let i = 0; i < n; i++) {
    // Calculate the net gain/loss at the current station.
    const netGain = gas[i] - cost[i];

    // Add this net gain to the total tank (for the entire circuit check).
    totalGasInTank += netGain;

    // Add this net gain to the current trip's tank.
    currentTripTank += netGain;

    // If the current trip's tank falls below zero, it means we cannot reach
    // station `i+1` (or beyond) from our current `startStation`.
    // According to the greedy property, any station between `startStation` and `i`
    // also cannot be the starting point. So, we must try starting from `i + 1`.
    if (currentTripTank < 0) {
      // Reset the current trip's tank to 0 for the new potential trip.
      currentTripTank = 0;
      // Set the next station as the new potential starting point.
      startStation = i + 1;
    }
  }

  // After iterating through all stations:
  // If `totalGasInTank` is less than 0, it means that the total amount of gas
  // available is not enough to cover the total cost of the entire circuit.
  // Therefore, no solution exists.
  if (totalGasInTank < 0) {
    return -1;
  } else {
    // If `totalGasInTank` is 0 or greater, a solution is guaranteed to exist.
    // The `startStation` we found by the greedy approach (where `currentTripTank`
    // never went negative when considering the rest of the loop implicitly)
    // is the unique starting point.
    return startStation;
  }
}

export default canCompleteCircuit;
```