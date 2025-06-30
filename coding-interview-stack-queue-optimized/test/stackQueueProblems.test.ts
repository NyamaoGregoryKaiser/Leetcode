```typescript
import { isValidParentheses, QueueFromStacks, largestRectangleArea, evalRPN } from '../src/stackQueueProblems';

describe('Stack and Queue Problems', () => {
  it('should check for valid parentheses', () => {
    expect(isValidParentheses('()')).toBe(true);
    expect(isValidParentheses('()[]{}')).toBe(true);
    expect(isValidParentheses('(]')).toBe(false);
    expect(isValidParentheses('([)]')).toBe(false);
    expect(isValidParentheses('{[]}')).toBe(true);
    expect(isValidParentheses("([)]")).toBe(false);
  });

  it('should implement queue using stacks', () => {
    const queue = new QueueFromStacks<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.isEmpty()).toBe(true);
  });

  it('should find the largest rectangle in a histogram', () => {
    expect(largestRectangleArea([2, 1, 5, 6, 2, 3])).toBe(10);
    expect(largestRectangleArea([2, 4])).toBe(4);
    expect(largestRectangleArea([0,9])).toBe(9);
  });

  it('should evaluate reverse polish notation', () => {
    expect(evalRPN(["2", "1", "+", "3", "*"])).toBe(9);
    expect(evalRPN(["4", "13", "5", "/", "+" ])).toBe(6);
    expect(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+" ])).toBe(22);
  });
});

```