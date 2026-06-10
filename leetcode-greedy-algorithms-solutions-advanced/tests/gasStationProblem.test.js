```javascript
/**
 * @fileoverview Test suite for the Gas Station Problem (Circular Tour).
 */

import canCompleteCircuit from '../src/problems/gasStationProblem';

describe('canCompleteCircuit', () => {
  // Test Case 1: Basic scenario with a unique solution
  test('should return the correct starting station for a solvable circuit', () => {
    const gas = [1, 2, 3, 4, 5];
    const cost = [3, 4, 5, 1, 2];
    // Differences: [-2, -2, -2, 3, 3]
    // Total difference: -2-2-2+3+3 = 0. Solution exists.
    // currentTripTank:
    // start 0: -2 (fail) -> start=1, current=0
    // start 1: -2 (fail) -> start=2, current=0
    // start 2: -2 (fail) -> start=3, current=0
    // start 3: 3 -> current=3
    // start 4: 3 -> current=3+3=6
    // end of loop. Total >= 0, return startStation = 3.
    expect(canCompleteCircuit(gas, cost)).toBe(3);
  });

  // Test Case 2: No solution possible (total gas < total cost)
  test('should return -1 if no solution exists due to insufficient total gas', () => {
    const gas = [2, 3, 4];
    const cost = [3, 4, 3];
    // Differences: [-1, -1, 1]
    // Total difference: -1-1+1 = -1. No solution.
    expect(canCompleteCircuit(gas, cost)).toBe(-1);
  });

  // Test Case 3: Another solvable scenario
  test('should find solution for another solvable circuit', () => {
    const gas = [5, 1, 2, 3, 4];
    const cost = [4, 4, 1, 5, 1];
    // Differences: [1, -3, 1, -2, 3]
    // Total difference: 1-3+1-2+3 = 0. Solution exists.
    // currentTripTank:
    // start 0: 1 -> current=1
    // start 1: 1-3 = -2 (fail) -> start=2, current=0
    // start 2: 1 -> current=1
    // start 3: 1-2 = -1 (fail) -> start=4, current=0
    // start 4: 3 -> current=3
    // end of loop. Total >= 0, return startStation = 4.
    expect(canCompleteCircuit(gas, cost)).toBe(4);
  });

  // Test Case 4: Single station, solvable
  test('should work for a single station if gas >= cost', () => {
    const gas = [5];
    const cost = [3];
    // Differences: [2]
    // Total difference: 2. Solution exists.
    // currentTripTank: start 0: 2 -> current=2
    // end of loop. Total >= 0, return startStation = 0.
    expect(canCompleteCircuit(gas, cost)).toBe(0);
  });

  // Test Case 5: Single station, unsolvable
  test('should return -1 for a single station if gas < cost', () => {
    const gas = [3];
    const cost = [5];
    // Differences: [-2]
    // Total difference: -2. No solution.
    expect(canCompleteCircuit(gas, cost)).toBe(-1);
  });

  // Test Case 6: All stations have zero gas/cost (empty circuit)
  test('should return 0 for an empty circuit (all zeros)', () => {
    const gas = [0, 0, 0];
    const cost = [0, 0, 0];
    // Differences: [0, 0, 0]
    // Total difference: 0. Solution exists.
    // currentTripTank: always 0. startStation will remain 0.
    expect(canCompleteCircuit(gas, cost)).toBe(0);
  });

  // Test Case 7: Longer circuit with solution at the end
  test('should find solution at the last possible station for a longer circuit', () => {
    const gas = [6, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const cost = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    // Differences: [6, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    // Total: 6 - 9 = -3. No solution! Oh wait, `totalGasInTank` is sum of all differences.
    // My example is bad, total cost is 9, total gas is 6, so total diff is -3.
    // Let's create a scenario where total is >=0.
    const gas2 = [6, 0, 0, 0, 0, 0, 0, 0, 0, 4]; // Total gas = 10
    const cost2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // Total cost = 10
    // Differences: [5, -1, -1, -1, -1, -1, -1, -1, -1, 3]
    // Total difference: 0. Solution exists.
    // currentTripTank:
    // start 0: 5 -> 5
    //          -1 -> 4
    //          -1 -> 3
    //          -1 -> 2
    //          -1 -> 1
    //          -1 -> 0
    //          -1 -> -1 (fail) -> start=7, current=0
    // start 7: -1 -> -1 (fail) -> start=8, current=0
    // start 8: -1 -> -1 (fail) -> start=9, current=0
    // start 9: 3 -> 3
    // end of loop. Total >= 0, return startStation = 9.
    expect(canCompleteCircuit(gas2, cost2)).toBe(9);
  });

  // Test Case 8: Input arrays with differing lengths or null/undefined
  test('should return -1 for invalid inputs (differing lengths)', () => {
    expect(canCompleteCircuit([1], [1, 2])).toBe(-1);
    expect(canCompleteCircuit([1, 2], [1])).toBe(-1);
  });

  test('should return -1 for null/undefined inputs', () => {
    expect(canCompleteCircuit(null, [1, 2])).toBe(-1);
    expect(canCompleteCircuit([1, 2], undefined)).toBe(-1);
    expect(canCompleteCircuit(null, null)).toBe(-1);
  });
});
```