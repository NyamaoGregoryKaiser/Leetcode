```typescript
/**
 * @fileoverview Test suite for P2_MinStack.ts
 */

import { MinStackOptimal, MinStackTwoStacks } from '../src/problems/P2_MinStack';

describe('P2: Min Stack', () => {

    const runTestsForMinStack = (MinStackClass: new () => MinStackOptimal | MinStackTwoStacks, className: string) => {
        describe(`${className}`, () => {
            let minStack: MinStackOptimal | MinStackTwoStacks;

            beforeEach(() => {
                minStack = new MinStackClass();
            });

            test('should handle basic operations correctly', () => {
                minStack.push(-2);
                minStack.push(0);
                minStack.push(-3);

                expect(minStack.getMin()).toBe(-3); // min is -3
                expect(minStack.top()).toBe(-3);     // top is -3

                minStack.pop(); // pop -3
                expect(minStack.getMin()).toBe(-2); // min is -2
                expect(minStack.top()).toBe(0);      // top is 0

                minStack.pop(); // pop 0
                expect(minStack.getMin()).toBe(-2); // min is -2
                expect(minStack.top()).toBe(-2);     // top is -2
            });

            test('should handle pushing elements in increasing order', () => {
                minStack.push(10);
                expect(minStack.getMin()).toBe(10);
                minStack.push(20);
                expect(minStack.getMin()).toBe(10);
                minStack.push(30);
                expect(minStack.getMin()).toBe(10);
                expect(minStack.top()).toBe(30);

                minStack.pop(); // pop 30
                expect(minStack.getMin()).toBe(10);
                expect(minStack.top()).toBe(20);

                minStack.pop(); // pop 20
                expect(minStack.getMin()).toBe(10);
                expect(minStack.top()).toBe(10);

                minStack.pop(); // pop 10
                // Cannot call getMin/top on empty stack per constraint, but internal state should be clear
            });

            test('should handle pushing elements in decreasing order', () => {
                minStack.push(30);
                expect(minStack.getMin()).toBe(30);
                minStack.push(20);
                expect(minStack.getMin()).toBe(20);
                minStack.push(10);
                expect(minStack.getMin()).toBe(10);
                expect(minStack.top()).toBe(10);

                minStack.pop(); // pop 10
                expect(minStack.getMin()).toBe(20);
                expect(minStack.top()).toBe(20);

                minStack.pop(); // pop 20
                expect(minStack.getMin()).toBe(30);
                expect(minStack.top()).toBe(30);
            });

            test('should handle duplicate minimums correctly', () => {
                minStack.push(5);
                minStack.push(2);
                minStack.push(2); // Duplicate min
                minStack.push(3);
                expect(minStack.getMin()).toBe(2);
                expect(minStack.top()).toBe(3);

                minStack.pop(); // pop 3
                expect(minStack.getMin()).toBe(2);
                expect(minStack.top()).toBe(2);

                minStack.pop(); // pop 2 (one of the duplicates)
                expect(minStack.getMin()).toBe(2); // Still 2
                expect(minStack.top()).toBe(2);

                minStack.pop(); // pop 2 (the other duplicate)
                expect(minStack.getMin()).toBe(5); // Now 5
                expect(minStack.top()).toBe(5);
            });

            test('should handle mix of positive and negative numbers', () => {
                minStack.push(1);
                minStack.push(-5);
                minStack.push(0);
                minStack.push(-10);
                minStack.push(2);
                expect(minStack.getMin()).toBe(-10);
                expect(minStack.top()).toBe(2);

                minStack.pop(); // pop 2
                expect(minStack.getMin()).toBe(-10);
                expect(minStack.top()).toBe(-10);

                minStack.pop(); // pop -10
                expect(minStack.getMin()).toBe(-5);
                expect(minStack.top()).toBe(0);
            });

            test('should handle single element correctly', () => {
                minStack.push(42);
                expect(minStack.getMin()).toBe(42);
                expect(minStack.top()).toBe(42);
                minStack.pop();
                // Stack is now empty, cannot test further per constraints
            });

            test('should handle multiple push and pop sequences', () => {
                minStack.push(10); // [10], min 10
                minStack.push(5);  // [10, 5], min 5
                expect(minStack.getMin()).toBe(5);
                minStack.pop();    // [10], min 10
                expect(minStack.getMin()).toBe(10);
                minStack.push(8);  // [10, 8], min 8
                expect(minStack.getMin()).toBe(8);
                minStack.push(3);  // [10, 8, 3], min 3
                expect(minStack.getMin()).toBe(3);
                minStack.pop();    // [10, 8], min 8
                expect(minStack.getMin()).toBe(8);
                minStack.pop();    // [10], min 10
                expect(minStack.getMin()).toBe(10);
            });

            // Note: Per problem constraints, pop, top, and getMin are always called on non-empty stacks.
            // So, explicit error handling for empty stack operations is not strictly required by the problem,
            // but good practice for robust library code. Our solutions assume valid calls.
        });
    };

    runTestsForMinStack(MinStackOptimal, 'MinStackOptimal');
    runTestsForMinStack(MinStackTwoStacks, 'MinStackTwoStacks');
});
```