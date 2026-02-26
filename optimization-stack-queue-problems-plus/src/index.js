```javascript
/**
 * @fileoverview Main entry point for the Stack and Queue Interview Project.
 * Exports all problem solutions and utility classes for easy access.
 */

// Export utility data structures
export { Stack } from './utils/stack.js';
export { Queue } from './utils/queue.js';

// Export solutions for Problem 1: Valid Parentheses
export {
    isValidParenthesesOptimal,
    isValidParenthesesBruteForce
} from './problems/problem1_valid_parentheses.js';

// Export solutions for Problem 2: Implement Queue using Stacks
export {
    MyQueueOptimal,
    MyQueueEagerTransfer
} from './problems/problem2_implement_queue_using_stacks.js';

// Export solutions for Problem 3: Moving Average from Data Stream
export {
    MovingAverageOptimal,
    MovingAverageCircularBuffer
} from './problems/problem3_moving_average_from_data_stream.js';

// Export solutions for Problem 4: Largest Rectangle in Histogram
export {
    largestRectangleAreaOptimal,
    largestRectangleAreaBruteForce
} from './problems/problem4_largest_rectangle_in_histogram.js';

// Export solutions for Problem 5: Min Stack
export {
    MinStackOptimal,
    MinStackMemoryOptimized,
    MinStackDiffOptimized
} from './problems/problem5_min_stack.js';
```