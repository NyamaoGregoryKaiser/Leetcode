```javascript
const {
    MyQueue,
    MyStack,
    isValid,
    maxSlidingWindow,
    trap
} = require('../../src/algorithms/stack-queue-problems');

// =====================================================================================
// Tests for MyQueue (Implement Queue using Stacks)
// =====================================================================================
describe('MyQueue', () => {
    let myQueue;

    beforeEach(() => {
        myQueue = new MyQueue();
    });

    test('should be empty initially', () => {
        expect(myQueue.empty()).toBe(true);
    });

    test('should push elements and peek correctly', () => {
        myQueue.push(1);
        expect(myQueue.empty()).toBe(false);
        expect(myQueue.peek()).toBe(1);
        myQueue.push(2);
        expect(myQueue.peek()).toBe(1); // Peek should still return the first element pushed
    });

    test('should pop elements in FIFO order', () => {
        myQueue.push(1);
        myQueue.push(2);
        myQueue.push(3);

        expect(myQueue.pop()).toBe(1);
        expect(myQueue.peek()).toBe(2);
        expect(myQueue.pop()).toBe(2);
        expect(myQueue.peek()).toBe(3);
        expect(myQueue.pop()).toBe(3);
        expect(myQueue.empty()).toBe(true);
    });

    test('should handle interleaved push and pop operations', () => {
        myQueue.push(1);
        myQueue.push(2);
        expect(myQueue.peek()).toBe(1); // [1, 2]
        expect(myQueue.pop()).toBe(1); // [2]
        myQueue.push(3); // [2, 3]
        expect(myQueue.peek()).toBe(2);
        expect(myQueue.pop()).toBe(2); // [3]
        myQueue.push(4); // [3, 4]
        expect(myQueue.pop()).toBe(3); // [4]
        expect(myQueue.pop()).toBe(4); // []
        expect(myQueue.empty()).toBe(true);
    });

    test('should return undefined for peek/pop on empty queue', () => {
        expect(myQueue.peek()).toBeUndefined();
        expect(myQueue.pop()).toBeUndefined();
        myQueue.push(1);
        myQueue.pop();
        expect(myQueue.peek()).toBeUndefined();
        expect(myQueue.pop()).toBeUndefined();
    });

    test('should handle a single element correctly', () => {
        myQueue.push(5);
        expect(myQueue.empty()).toBe(false);
        expect(myQueue.peek()).toBe(5);
        expect(myQueue.pop()).toBe(5);
        expect(myQueue.empty()).toBe(true);
    });
});

// =====================================================================================
// Tests for MyStack (Implement Stack using Queues)
// =====================================================================================
describe('MyStack', () => {
    let myStack;

    beforeEach(() => {
        myStack = new MyStack();
    });

    test('should be empty initially', () => {
        expect(myStack.empty()).toBe(true);
    });

    test('should push elements and top correctly', () => {
        myStack.push(1);
        expect(myStack.empty()).toBe(false);
        expect(myStack.top()).toBe(1);
        myStack.push(2);
        expect(myStack.top()).toBe(2); // Top should be the last element pushed
    });

    test('should pop elements in LIFO order', () => {
        myStack.push(1);
        myStack.push(2);
        myStack.push(3); // Stack: [1, 2, 3] (3 on top)

        expect(myStack.pop()).toBe(3); // Stack: [1, 2]
        expect(myStack.top()).toBe(2);
        expect(myStack.pop()).toBe(2); // Stack: [1]
        expect(myStack.top()).toBe(1);
        expect(myStack.pop()).toBe(1); // Stack: []
        expect(myStack.empty()).toBe(true);
    });

    test('should handle interleaved push and pop operations', () => {
        myStack.push(1); // Stack: [1]
        myStack.push(2); // Stack: [1, 2]
        expect(myStack.top()).toBe(2);
        expect(myStack.pop()).toBe(2); // Stack: [1]
        myStack.push(3); // Stack: [1, 3]
        expect(myStack.top()).toBe(3);
        expect(myStack.pop()).toBe(3); // Stack: [1]
        myStack.push(4); // Stack: [1, 4]
        expect(myStack.pop()).toBe(4); // Stack: [1]
        expect(myStack.pop()).toBe(1); // Stack: []
        expect(myStack.empty()).toBe(true);
    });

    test('should return undefined for top/pop on empty stack', () => {
        expect(myStack.top()).toBeUndefined();
        expect(myStack.pop()).toBeUndefined();
        myStack.push(1);
        myStack.pop();
        expect(myStack.top()).toBeUndefined();
        expect(myStack.pop()).toBeUndefined();
    });

    test('should handle a single element correctly', () => {
        myStack.push(5);
        expect(myStack.empty()).toBe(false);
        expect(myStack.top()).toBe(5);
        expect(myStack.pop()).toBe(5);
        expect(myStack.empty()).toBe(true);
    });
});

// =====================================================================================
// Tests for Valid Parentheses
// =====================================================================================
describe('isValid', () => {
    test('should return true for valid parentheses', () => {
        expect(isValid("()")).toBe(true);
        expect(isValid("()[]{}")).toBe(true);
        expect(isValid("{[]}")).toBe(true);
        expect(isValid("([{}])")).toBe(true);
        expect(isValid("")).toBe(true); // Empty string is valid
    });

    test('should return false for invalid parentheses', () => {
        expect(isValid("(")).toBe(false); // Unclosed open bracket
        expect(isValid("]")).toBe(false); // Unmatched close bracket
        expect(isValid("(]")).toBe(false); // Mismatched type
        expect(isValid("([)]")).toBe(false); // Incorrect order
        expect(isValid("{[}")).toBe(false); // Mismatched type and order
        expect(isValid("(((")).toBe(false); // Multiple unclosed
        expect(isValid(")))")).toBe(false); // Multiple unmatched closing
        expect(isValid("({[})])")).toBe(false); // Complex invalid
    });

    test('should handle long valid strings', () => {
        const longValid = "((([]){}[()]))".repeat(10);
        expect(isValid(longValid)).toBe(true);
    });

    test('should handle long invalid strings', () => {
        const longInvalid = "((([]){}[()]))" + "{";
        expect(isValid(longInvalid)).toBe(false);
        const longInvalid2 = "((([]){}[()]))" + "))";
        expect(isValid(longInvalid2)).toBe(false);
    });
});

// =====================================================================================
// Tests for Sliding Window Maximum
// =====================================================================================
describe('maxSlidingWindow', () => {
    test('should return correct max for basic cases', () => {
        expect(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([3, 3, 5, 5, 6, 7]);
        expect(maxSlidingWindow([1], 1)).toEqual([1]);
        expect(maxSlidingWindow([1, -1], 1)).toEqual([1, -1]);
    });

    test('should handle cases with k = 1', () => {
        expect(maxSlidingWindow([1, 2, 3, 4], 1)).toEqual([1, 2, 3, 4]);
        expect(maxSlidingWindow([5, 4, 3, 2, 1], 1)).toEqual([5, 4, 3, 2, 1]);
    });

    test('should handle cases where k equals array length', () => {
        expect(maxSlidingWindow([1, 3, -1, 5, 2], 5)).toEqual([5]);
        expect(maxSlidingWindow([10, 9, 8, 7, 6], 5)).toEqual([10]);
        expect(maxSlidingWindow([6, 7, 8, 9, 10], 5)).toEqual([10]);
    });

    test('should handle arrays with duplicate values', () => {
        expect(maxSlidingWindow([1, 3, 1, 2, 0, 5], 3)).toEqual([3, 3, 2, 5]);
        expect(maxSlidingWindow([2, 2, 2, 2, 2], 3)).toEqual([2, 2, 2]);
        expect(maxSlidingWindow([4, 3, 2, 3, 4], 3)).toEqual([4, 3, 4]);
    });

    test('should handle negative numbers', () => {
        expect(maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4)).toEqual([7, 7, 7, 7, 7]);
        expect(maxSlidingWindow([-1, -2, -3, -4], 2)).toEqual([-1, -2, -3]);
    });

    test('should handle empty array or invalid k', () => {
        expect(maxSlidingWindow([], 3)).toEqual([]);
        expect(maxSlidingWindow([1, 2, 3], 0)).toEqual([]); // k <= 0
        expect(maxSlidingWindow([1, 2, 3], 4)).toEqual([]); // k > nums.length
    });

    test('should handle large input arrays', () => {
        const largeArr = Array.from({
            length: 10000
        }, (_, i) => i); // [0, 1, ..., 9999]
        const largeK = 1000;
        const expectedLarge = Array.from({
            length: 10000 - largeK + 1
        }, (_, i) => i + largeK - 1); // Max will be the rightmost element
        expect(maxSlidingWindow(largeArr, largeK)).toEqual(expectedLarge);

        const largeArrDecreasing = Array.from({
            length: 10000
        }, (_, i) => 9999 - i); // [9999, ..., 0]
        const expectedDecreasing = Array.from({
            length: 10000 - largeK + 1
        }, (_, i) => 9999 - i); // Max will be the leftmost element of each window
        expect(maxSlidingWindow(largeArrDecreasing, largeK)).toEqual(expectedDecreasing);
    });
});

// =====================================================================================
// Tests for Trapping Rain Water
// =====================================================================================
describe('trap', () => {
    test('should return correct trapped water for basic cases', () => {
        expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
        expect(trap([4, 2, 0, 3, 2, 5])).toBe(9);
    });

    test('should return 0 for flat terrain', () => {
        expect(trap([0, 0, 0, 0, 0])).toBe(0);
        expect(trap([5, 5, 5, 5, 5])).toBe(0);
    });

    test('should return 0 for monotonic increasing terrain', () => {
        expect(trap([0, 1, 2, 3, 4])).toBe(0);
    });

    test('should return 0 for monotonic decreasing terrain', () => {
        expect(trap([4, 3, 2, 1, 0])).toBe(0);
    });

    test('should handle empty or single/two element arrays', () => {
        expect(trap([])).toBe(0);
        expect(trap([1])).toBe(0);
        expect(trap([1, 2])).toBe(0);
        expect(trap([2, 1])).toBe(0);
    });

    test('should handle U-shaped terrain', () => {
        expect(trap([5, 0, 5])).toBe(5);
        expect(trap([5, 0, 0, 5])).toBe(10);
        expect(trap([3, 0, 2, 0, 4])).toBe(7); // (3-0)*1 + (2-0)*1 + (4-0)*1 = 3+2+4 = 7 wrong
                                           //  min(3,2)-0 = 2, distance = 1 -> 2*1 = 2
                                           //  min(3,4)-0 = 3, distance = 3 -> 3*3 = 9 - (0+2+0) = 7
                                           // Correct breakdown:
                                           // i=2: prev=0 (height 0), left=3, right=2. min(3,2)-0 = 2. distance = 2-0-1=1. water = 2*1=2.
                                           // i=4: prev=2 (height 2), left=3, right=4. min(3,4)-2 = 1. distance = 4-0-1=3. water += 1*3 = 3. total = 2+3=5.
                                           // Need to re-think this.
                                           // The monotonic stack calculates areas between `leftIdx` and `i` for each `prevIdx` popped.
                                           // For [3,0,2,0,4]:
                                           // i=0: push(0)
                                           // i=1: height[1]=0 < height[0]=3. push(1). stack=[0,1]
                                           // i=2: height[2]=2 > height[1]=0.
                                           //    pop prevIdx=1. leftIdx=0. distance = 2-0-1=1. trappedHeight = min(height[2]=2, height[0]=3) - height[1]=0 = 2-0 = 2. water += 1*2 = 2.
                                           //    stack=[0]. height[2]=2 < height[0]=3. push(2). stack=[0,2]
                                           // i=3: height[3]=0 < height[2]=2. push(3). stack=[0,2,3]
                                           // i=4: height[4]=4 > height[3]=0.
                                           //    pop prevIdx=3. leftIdx=2. distance = 4-2-1=1. trappedHeight = min(height[4]=4, height[2]=2) - height[3]=0 = 2-0 = 2. water += 1*2 = 4.
                                           //    stack=[0,2]. height[4]=4 > height[2]=2.
                                           //    pop prevIdx=2. leftIdx=0. distance = 4-0-1=3. trappedHeight = min(height[4]=4, height[0]=3) - height[2]=2 = 3-2 = 1. water += 3*1 = 7.
                                           //    stack=[0]. height[4]=4 > height[0]=3.
                                           //    pop prevIdx=0. stack empty. break.
                                           //    push(4). stack=[4].
                                           // Result: 7. Correct.
    });

    test('should handle complex terrains', () => {
        expect(trap([5, 2, 1, 2, 1, 5])).toBe(14); // (5-2)*1 + (5-1)*1 + (5-2)*1 + (5-1)*1 + (5-2)*1 = 3+4+3+4+3 = 17? No
                                               // Correct calculation: min(5,5) - 2 = 3, distance 1 (for idx 1) -> 3
                                               // min(5,5) - 1 = 4, distance 1 (for idx 2) -> 4
                                               // min(5,5) - 2 = 3, distance 1 (for idx 3) -> 3
                                               // min(5,5) - 1 = 4, distance 1 (for idx 4) -> 4
                                               // Total = 3+4+3+4 = 14
        expect(trap([2, 0, 2])).toBe(2);
        expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
        expect(trap([6, 4, 2, 0, 3, 2, 0, 3, 1, 4, 5, 3, 2, 7, 5, 3, 0, 1, 2, 1])).toBe(83); // Large complex case
    });
});
```