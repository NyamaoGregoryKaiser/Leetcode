```javascript
const { fibonacciRecursive, fibonacciDP, knapsackDP, lcsDP, coinChangeDP } = require('../src/dp');

test('Fibonacci Recursive', () => {
  expect(fibonacciRecursive(0)).toBe(0);
  expect(fibonacciRecursive(1)).toBe(1);
  expect(fibonacciRecursive(5)).toBe(5);
});

test('Fibonacci DP', () => {
  expect(fibonacciDP(0)).toBe(0);
  expect(fibonacciDP(1)).toBe(1);
  expect(fibonacciDP(5)).toBe(5);
});

// Add more tests for knapsack, LCS, and coin change...

```