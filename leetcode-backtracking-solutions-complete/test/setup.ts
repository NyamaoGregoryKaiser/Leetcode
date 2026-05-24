/**
 * @fileoverview
 * Jest setup file. Can be used for global test configurations,
 * polyfills, or mocking. Currently, it's mostly a placeholder
 * but can be extended if needed.
 */

// Example: If you need to mock a global API for all tests
// jest.mock('some-global-api', () => ({
//   someFunction: jest.fn(() => 'mocked value')
// }));

// Set a longer default timeout for Jest tests, especially for potentially slow backtracking problems on large inputs
// Note: This is a global setting. Individual test cases can override this.
jest.setTimeout(30 * 1000); // 30 seconds