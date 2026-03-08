import { Stack } from '../data-structures/stack';
import { Queue, Deque } from '../data-structures/queue'; // Assuming Deque is also exported by queue.ts
import {
    isValidParentheses,
    MinStack,
    MyQueue,
    MyStack,
    slidingWindowMaximum
} from './stack-queue-problems';

describe('Stack', () => {
    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>();
    });

    it('should be empty initially', () => {
        expect(stack.isEmpty()).toBe(true);
        expect(stack.size()).toBe(0);
    });

    it('should push elements and increase size', () => {
        stack.push(1);
        expect(stack.isEmpty()).toBe(false);
        expect(stack.size()).toBe(1);
        expect(stack.peek()).toBe(1);

        stack.push(2);
        expect(stack.size()).toBe(2);
        expect(stack.peek()).toBe(2);
    });

    it('should pop elements in LIFO order', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.pop()).toBe(3);
        expect(stack.size()).toBe(2);
        expect(stack.peek()).toBe(2);

        expect(stack.pop()).toBe(2);
        expect(stack.size()).toBe(1);
        expect(stack.peek()).toBe(1);

        expect(stack.pop()).toBe(1);
        expect(stack.size()).toBe(0);
        expect(stack.isEmpty()).toBe(true);
    });

    it('should throw error when popping from an empty stack', () => {
        expect(() => stack.pop()).toThrow("Stack is empty, cannot pop.");
    });

    it('should throw error when peeking an empty stack', () => {
        expect(() => stack.peek()).toThrow("Stack is empty, no top element.");
    });

    it('should handle mixed push and pop operations', () => {
        stack.push(10); // [10]
        stack.push(20); // [10, 20]
        expect(stack.peek()).toBe(20);
        stack.pop(); // [10]
        expect(stack.peek()).toBe(10);
        stack.push(30); // [10, 30]
        expect(stack.pop()).toBe(30);
        expect(stack.pop()).toBe(10);
        expect(stack.isEmpty()).toBe(true);
    });

    it('should return elements as array in correct order', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.toArray()).toEqual([1, 2, 3]);
        stack.pop();
        expect(stack.toArray()).toEqual([1, 2]);
    });
});

describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
        queue = new Queue<number>();
    });

    it('should be empty initially', () => {
        expect(queue.isEmpty()).toBe(true);
        expect(queue.size()).toBe(0);
    });

    it('should enqueue elements and increase size', () => {
        queue.enqueue(1);
        expect(queue.isEmpty()).toBe(false);
        expect(queue.size()).toBe(1);
        expect(queue.peek()).toBe(1);

        queue.enqueue(2);
        expect(queue.size()).toBe(2);
        expect(queue.peek()).toBe(1); // Peek should still be the first element enqueued
    });

    it('should dequeue elements in FIFO order', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        expect(queue.dequeue()).toBe(1);
        expect(queue.size()).toBe(2);
        expect(queue.peek()).toBe(2);

        expect(queue.dequeue()).toBe(2);
        expect(queue.size()).toBe(1);
        expect(queue.peek()).toBe(3);

        expect(queue.dequeue()).toBe(3);
        expect(queue.size()).toBe(0);
        expect(queue.isEmpty()).toBe(true);
    });

    it('should throw error when dequeuing from an empty queue', () => {
        expect(() => queue.dequeue()).toThrow("Queue is empty, cannot dequeue.");
    });

    it('should throw error when peeking an empty queue', () => {
        expect(() => queue.peek()).toThrow("Queue is empty, no front element.");
    });

    it('should handle mixed enqueue and dequeue operations', () => {
        queue.enqueue(10); // [10]
        queue.enqueue(20); // [10, 20]
        expect(queue.peek()).toBe(10);
        queue.dequeue(); // [20]
        expect(queue.peek()).toBe(20);
        queue.enqueue(30); // [20, 30]
        expect(queue.dequeue()).toBe(20);
        expect(queue.dequeue()).toBe(30);
        expect(queue.isEmpty()).toBe(true);
    });

    it('should return elements as array in correct order', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.toArray()).toEqual([1, 2, 3]);
        queue.dequeue();
        expect(queue.toArray()).toEqual([2, 3]);
    });
});

describe('Deque', () => {
    let deque: Deque<number>;

    beforeEach(() => {
        deque = new Deque<number>();
    });

    it('should be empty initially', () => {
        expect(deque.isEmpty()).toBe(true);
        expect(deque.size()).toBe(0);
    });

    it('should add to front', () => {
        deque.addFront(1); // [1]
        expect(deque.size()).toBe(1);
        expect(deque.peekFront()).toBe(1);
        expect(deque.peekBack()).toBe(1);

        deque.addFront(2); // [2, 1]
        expect(deque.size()).toBe(2);
        expect(deque.peekFront()).toBe(2);
        expect(deque.peekBack()).toBe(1);
    });

    it('should add to back', () => {
        deque.addBack(1); // [1]
        expect(deque.size()).toBe(1);
        expect(deque.peekFront()).toBe(1);
        expect(deque.peekBack()).toBe(1);

        deque.addBack(2); // [1, 2]
        expect(deque.size()).toBe(2);
        expect(deque.peekFront()).toBe(1);
        expect(deque.peekBack()).toBe(2);
    });

    it('should remove from front', () => {
        deque.addBack(1);
        deque.addBack(2);
        deque.addBack(3); // [1, 2, 3]

        expect(deque.removeFront()).toBe(1); // [2, 3]
        expect(deque.size()).toBe(2);
        expect(deque.peekFront()).toBe(2);

        expect(deque.removeFront()).toBe(2); // [3]
        expect(deque.size()).toBe(1);
        expect(deque.peekFront()).toBe(3);
    });

    it('should remove from back', () => {
        deque.addBack(1);
        deque.addBack(2);
        deque.addBack(3); // [1, 2, 3]

        expect(deque.removeBack()).toBe(3); // [1, 2]
        expect(deque.size()).toBe(2);
        expect(deque.peekBack()).toBe(2);

        expect(deque.removeBack()).toBe(2); // [1]
        expect(deque.size()).toBe(1);
        expect(deque.peekBack()).toBe(1);
    });

    it('should throw error when removing from empty deque', () => {
        expect(() => deque.removeFront()).toThrow("Deque is empty, cannot remove from front.");
        expect(() => deque.removeBack()).toThrow("Deque is empty, cannot remove from back.");
    });

    it('should throw error when peeking empty deque', () => {
        expect(() => deque.peekFront()).toThrow("Deque is empty, no front element.");
        expect(() => deque.peekBack()).toThrow("Deque is empty, no back element.");
    });

    it('should handle mixed operations correctly', () => {
        deque.addBack(1);    // [1]
        deque.addFront(2);   // [2, 1]
        deque.addBack(3);    // [2, 1, 3]
        expect(deque.peekFront()).toBe(2);
        expect(deque.peekBack()).toBe(3);
        expect(deque.size()).toBe(3);

        expect(deque.removeFront()).toBe(2); // [1, 3]
        expect(deque.removeBack()).toBe(3);  // [1]
        expect(deque.peekFront()).toBe(1);
        expect(deque.peekBack()).toBe(1);

        deque.addFront(4);   // [4, 1]
        expect(deque.removeBack()).toBe(1);  // [4]
        expect(deque.removeFront()).toBe(4); // []
        expect(deque.isEmpty()).toBe(true);
    });

    it('should resize correctly when capacity is exceeded', () => {
        const smallDeque = new Deque<number>(4); // Small capacity
        for (let i = 0; i < 5; i++) {
            smallDeque.addBack(i); // Should trigger resize
        }
        expect(smallDeque.size()).toBe(5);
        expect(smallDeque.toArray()).toEqual([0, 1, 2, 3, 4]);

        for (let i = 5; i < 10; i++) {
            smallDeque.addFront(i); // Should trigger resize
        }
        expect(smallDeque.size()).toBe(10);
        expect(smallDeque.toArray()).toEqual([9, 8, 7, 6, 5, 0, 1, 2, 3, 4]);
    });

    it('should handle elements as array in correct order', () => {
        deque.addFront(1);
        deque.addBack(2);
        deque.addFront(3);
        deque.addBack(4);
        expect(deque.toArray()).toEqual([3, 1, 2, 4]);
        deque.removeFront();
        expect(deque.toArray()).toEqual([1, 2, 4]);
        deque.removeBack();
        expect(deque.toArray()).toEqual([1, 2]);
    });
});

describe('isValidParentheses', () => {
    it('should return true for valid parentheses strings', () => {
        expect(isValidParentheses("()")).toBe(true);
        expect(isValidParentheses("()[]{}")).toBe(true);
        expect(isValidParentheses("{[]}")).toBe(true);
        expect(isValidParentheses("")).toBe(true); // Empty string is valid
        expect(isValidParentheses("((({{{[[[]]]}}})))")).toBe(true);
        expect(isValidParentheses("[()]{}")).toBe(true);
    });

    it('should return false for invalid parentheses strings', () => {
        expect(isValidParentheses("(]")).toBe(false);
        expect(isValidParentheses("([)]")).toBe(false);
        expect(isValidParentheses("{[")).toBe(false); // Unclosed
        expect(isValidParentheses("]")).toBe(false); // Closing without opening
        expect(isValidParentheses("(((")).toBe(false);
        expect(isValidParentheses("]}")).toBe(false);
        expect(isValidParentheses("({[})")).toBe(false); // Mismatched and interleaved
        expect(isValidParentheses("{{)}")).toBe(false); // Mismatched close
        expect(isValidParentheses("(()")).toBe(false); // Unclosed
        expect(isValidParentheses("((]])")).toBe(false); // Mismatched and wrong order
    });

    it('should handle strings with non-parentheses characters (assuming only valid chars given)', () => {
        // As per problem description, input only contains valid chars.
        // If other chars were allowed, would need to specify behavior.
        // For now, testing strict adherence to problem constraints.
        expect(isValidParentheses("{[()]}")).toBe(true);
    });

    it('should return false for odd length strings', () => {
        expect(isValidParentheses("(")).toBe(false);
        expect(isValidParentheses("{[}]")).toBe(false);
        expect(isValidParentheses("({(")).toBe(false);
    });
});

describe('MinStack', () => {
    it('should handle push, pop, top, and getMin operations correctly', () => {
        const minStack = new MinStack();

        minStack.push(-2); // Stack: [-2], MinStack: [-2]
        minStack.push(0);  // Stack: [-2, 0], MinStack: [-2]
        minStack.push(-3); // Stack: [-2, 0, -3], MinStack: [-2, -3]
        expect(minStack.getMin()).toBe(-3); // min: -3

        minStack.pop();    // Stack: [-2, 0], Popped: -3 (which was min), MinStack: [-2]
        expect(minStack.top()).toBe(0);     // top: 0
        expect(minStack.getMin()).toBe(-2); // min: -2

        minStack.push(-1); // Stack: [-2, 0, -1], MinStack: [-2, -1]
        expect(minStack.getMin()).toBe(-1); // min: -1

        minStack.push(-5); // Stack: [-2, 0, -1, -5], MinStack: [-2, -1, -5]
        expect(minStack.getMin()).toBe(-5); // min: -5

        minStack.pop();    // Stack: [-2, 0, -1], Popped: -5 (min), MinStack: [-2, -1]
        expect(minStack.getMin()).toBe(-1); // min: -1

        minStack.pop();    // Stack: [-2, 0], Popped: -1 (min), MinStack: [-2]
        expect(minStack.getMin()).toBe(-2); // min: -2

        minStack.pop();    // Stack: [-2], Popped: 0, MinStack: [-2] (0 was not min)
        expect(minStack.top()).toBe(-2);    // top: -2
        expect(minStack.getMin()).toBe(-2); // min: -2

        minStack.pop();    // Stack: [], Popped: -2 (min), MinStack: []
        // expect(() => minStack.top()).toThrow(); // Should throw error for empty stack
        // expect(() => minStack.getMin()).toThrow(); // Should throw error for empty stack
    });

    it('should handle duplicate minimum values correctly', () => {
        const minStack = new MinStack();
        minStack.push(1);   // S: [1], MS: [1]
        minStack.push(1);   // S: [1,1], MS: [1,1]
        expect(minStack.getMin()).toBe(1);
        minStack.push(0);   // S: [1,1,0], MS: [1,1,0]
        expect(minStack.getMin()).toBe(0);
        minStack.pop();     // S: [1,1], MS: [1,1]
        expect(minStack.getMin()).toBe(1);
        minStack.pop();     // S: [1], MS: [1]
        expect(minStack.getMin()).toBe(1);
        minStack.pop();     // S: [], MS: []
        // Expect errors on empty
    });

    it('should throw error when popping from an empty stack', () => {
        const minStack = new MinStack();
        expect(() => minStack.pop()).toThrow("Stack is empty, cannot pop.");
        minStack.push(1);
        minStack.pop();
        expect(() => minStack.pop()).toThrow("Stack is empty, cannot pop.");
    });

    it('should throw error when peeking an empty stack', () => {
        const minStack = new MinStack();
        expect(() => minStack.top()).toThrow("Stack is empty, no top element.");
        minStack.push(1);
        minStack.pop();
        expect(() => minStack.top()).toThrow("Stack is empty, no top element.");
    });

    it('should throw error when getting min from an empty stack', () => {
        const minStack = new MinStack();
        expect(() => minStack.getMin()).toThrow("Stack is empty, no top element."); // minStack.peek() will throw
        minStack.push(1);
        minStack.pop();
        expect(() => minStack.getMin()).toThrow("Stack is empty, no top element.");
    });
});

describe('MyQueue (Implement Queue using Stacks)', () => {
    it('should enqueue elements and dequeue in FIFO order', () => {
        const myQueue = new MyQueue<number>();
        expect(myQueue.empty()).toBe(true);

        myQueue.push(1); // inStack: [1], outStack: []
        myQueue.push(2); // inStack: [1, 2], outStack: []
        expect(myQueue.empty()).toBe(false);
        expect(myQueue.peek()).toBe(1); // inStack: [], outStack: [2, 1] -> peek 1

        myQueue.push(3); // inStack: [3], outStack: [2, 1]
        expect(myQueue.peek()).toBe(1); // outStack still has 1 at top

        expect(myQueue.pop()).toBe(1); // outStack: [2]
        expect(myQueue.peek()).toBe(2); // outStack: [2]

        myQueue.push(4); // inStack: [3, 4], outStack: [2]
        expect(myQueue.pop()).toBe(2); // outStack: []
        expect(myQueue.empty()).toBe(false);

        // outStack is empty, transfer from inStack
        // inStack: [3, 4] -> outStack: [4, 3]
        expect(myQueue.pop()).toBe(3); // outStack: [4]
        expect(myQueue.peek()).toBe(4);

        expect(myQueue.pop()).toBe(4); // outStack: []
        expect(myQueue.empty()).toBe(true);
    });

    it('should handle alternating push/pop operations', () => {
        const myQueue = new MyQueue<string>();
        myQueue.push("a");
        myQueue.push("b");
        expect(myQueue.pop()).toBe("a");
        myQueue.push("c");
        expect(myQueue.pop()).toBe("b");
        expect(myQueue.pop()).toBe("c");
        expect(myQueue.empty()).toBe(true);
    });

    it('should correctly report empty status', () => {
        const myQueue = new MyQueue<number>();
        expect(myQueue.empty()).toBe(true);
        myQueue.push(1);
        expect(myQueue.empty()).toBe(false);
        myQueue.pop();
        expect(myQueue.empty()).toBe(true);
        myQueue.push(2);
        myQueue.push(3);
        myQueue.peek(); // Should not affect empty status
        expect(myQueue.empty()).toBe(false);
        myQueue.pop();
        myQueue.pop();
        expect(myQueue.empty()).toBe(true);
    });

    it('should throw error when popping from an empty queue', () => {
        const myQueue = new MyQueue<number>();
        expect(() => myQueue.pop()).toThrow("Queue is empty, cannot pop.");
        myQueue.push(1);
        myQueue.pop();
        expect(() => myQueue.pop()).toThrow("Queue is empty, cannot pop.");
    });

    it('should throw error when peeking an empty queue', () => {
        const myQueue = new MyQueue<number>();
        expect(() => myQueue.peek()).toThrow("Queue is empty, no front element.");
        myQueue.push(1);
        myQueue.pop();
        expect(() => myQueue.peek()).toThrow("Queue is empty, no front element.");
    });
});

describe('MyStack (Implement Stack using Queues)', () => {
    it('should push elements and pop in LIFO order', () => {
        const myStack = new MyStack<number>();
        expect(myStack.empty()).toBe(true);

        myStack.push(1); // q1: [1], q2: []
        myStack.push(2); // q2: [2,1], then swap. q1: [2,1], q2: []
        expect(myStack.empty()).toBe(false);
        expect(myStack.top()).toBe(2);

        myStack.push(3); // q2: [3,2,1], then swap. q1: [3,2,1], q2: []
        expect(myStack.top()).toBe(3);

        expect(myStack.pop()).toBe(3); // q1: [2,1]
        expect(myStack.top()).toBe(2);

        myStack.push(4); // q2: [4,2,1], then swap. q1: [4,2,1], q2: []
        expect(myStack.pop()).toBe(4); // q1: [2,1]
        expect(myStack.empty()).toBe(false);

        expect(myStack.pop()).toBe(2); // q1: [1]
        expect(myStack.top()).toBe(1);

        expect(myStack.pop()).toBe(1); // q1: []
        expect(myStack.empty()).toBe(true);
    });

    it('should handle alternating push/pop operations', () => {
        const myStack = new MyStack<string>();
        myStack.push("a");
        myStack.push("b");
        expect(myStack.pop()).toBe("b");
        myStack.push("c");
        expect(myStack.pop()).toBe("c");
        expect(myStack.pop()).toBe("a");
        expect(myStack.empty()).toBe(true);
    });

    it('should correctly report empty status', () => {
        const myStack = new MyStack<number>();
        expect(myStack.empty()).toBe(true);
        myStack.push(1);
        expect(myStack.empty()).toBe(false);
        myStack.pop();
        expect(myStack.empty()).toBe(true);
        myStack.push(2);
        myStack.push(3);
        myStack.top(); // Should not affect empty status
        expect(myStack.empty()).toBe(false);
        myStack.pop();
        myStack.pop();
        expect(myStack.empty()).toBe(true);
    });

    it('should throw error when popping from an empty stack', () => {
        const myStack = new MyStack<number>();
        expect(() => myStack.pop()).toThrow("Stack is empty, cannot pop.");
        myStack.push(1);
        myStack.pop();
        expect(() => myStack.pop()).toThrow("Stack is empty, cannot pop.");
    });

    it('should throw error when peeking an empty stack', () => {
        const myStack = new MyStack<number>();
        expect(() => myStack.top()).toThrow("Stack is empty, no top element.");
        myStack.push(1);
        myStack.pop();
        expect(() => myStack.top()).toThrow("Stack is empty, no top element.");
    });
});

describe('slidingWindowMaximum', () => {
    it('should return the correct sliding window maximum for various inputs', () => {
        // Example 1
        expect(slidingWindowMaximum([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([3, 3, 5, 5, 6, 7]);
        // Example 2
        expect(slidingWindowMaximum([1], 1)).toEqual([1]);
        // Single element array, k=1
        expect(slidingWindowMaximum([5], 1)).toEqual([5]);
        // All elements in window
        expect(slidingWindowMaximum([1, 2, 3, 4, 5], 5)).toEqual([5]);
        // Decreasing sequence
        expect(slidingWindowMaximum([5, 4, 3, 2, 1], 3)).toEqual([5, 4, 3]);
        // Increasing sequence
        expect(slidingWindowMaximum([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5]);
        // Mixed sequence with negatives
        expect(slidingWindowMaximum([-7, -8, 7, 5, 7, 1, 6, 0], 4)).toEqual([7, 7, 7, 7, 7]);
        // All same elements
        expect(slidingWindowMaximum([10, 10, 10, 10, 10], 2)).toEqual([10, 10, 10, 10]);
        // Two elements, k=2
        expect(slidingWindowMaximum([1, 2], 2)).toEqual([2]);
        // Two elements, k=1
        expect(slidingWindowMaximum([1, 2], 1)).toEqual([1, 2]);
        // Long array, k=small
        expect(slidingWindowMaximum([1, 0, 1, 0, 1, 0, 1, 0, 1, 0], 2)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1]);
        // Long array, k=large
        expect(slidingWindowMaximum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)).toEqual([7, 8, 9, 10]);
    });

    it('should handle edge cases', () => {
        // Empty array
        expect(slidingWindowMaximum([], 0)).toEqual([]);
        expect(slidingWindowMaximum([], 1)).toEqual([]);
        // k is 0
        expect(slidingWindowMaximum([1, 2, 3], 0)).toEqual([]);
        // k is larger than array length
        expect(slidingWindowMaximum([1, 2, 3], 4)).toEqual([3]);
        expect(slidingWindowMaximum([10, 5, 20], 5)).toEqual([20]);
    });

    it('should handle multiple occurrences of the same max value', () => {
        expect(slidingWindowMaximum([1, 3, 1, 2, 0, 5], 3)).toEqual([3, 3, 2, 5]);
        expect(slidingWindowMaximum([4, 3, 2, 4, 1], 3)).toEqual([4, 4, 4]);
    });
});