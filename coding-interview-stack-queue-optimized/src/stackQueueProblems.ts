```typescript
// Helper functions (implementation in utils/)
import {Stack, Queue} from '../utils/dataStructures';

// Problem 1: Valid Parentheses
export function isValidParentheses(s: string): boolean {
  const stack = new Stack<string>();
  const mapping: { [key: string]: string } = {
    '(': ')',
    '{': '}',
    '[': ']',
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (mapping[char]) {
      stack.push(mapping[char]); // Push the closing bracket onto the stack
    } else {
      const last = stack.pop();
      if (last !== char) return false; // Mismatched brackets
    }
  }
  return stack.isEmpty(); // Stack should be empty if all brackets matched
}

// Problem 2: Queue using Stacks (Implementation using two stacks)
export class QueueFromStacks<T> {
  private stack1: Stack<T>;
  private stack2: Stack<T>;

  constructor() {
    this.stack1 = new Stack<T>();
    this.stack2 = new Stack<T>();
  }

  enqueue(item: T): void {
    this.stack1.push(item);
  }

  dequeue(): T | undefined {
    if (this.stack2.isEmpty()) {
      while (!this.stack1.isEmpty()) {
        this.stack2.push(this.stack1.pop()!); //Transfer items
      }
    }
    return this.stack2.pop();
  }

  isEmpty():boolean{
    return this.stack1.isEmpty() && this.stack2.isEmpty();
  }
}



// Problem 3: Largest Rectangle in Histogram (Implementation using stack)
export function largestRectangleArea(heights: number[]): number {
    const stack = new Stack<number>();
    let maxArea = 0;
    for (let i = 0; i <= heights.length; i++) {
      let h = (i === heights.length ? 0 : heights[i]); // Add a 0 at the end for handling remaining bars
      while (!stack.isEmpty() && h < heights[stack.peek()]) {
        let height = heights[stack.pop()];
        let width = stack.isEmpty() ? i : i - stack.peek() -1;
        maxArea = Math.max(maxArea, height * width);
      }
      stack.push(i);
    }
    return maxArea;
}

// Problem 4: Evaluate Reverse Polish Notation (Implementation using stack)
export function evalRPN(tokens: string[]): number {
  const stack = new Stack<number>();
  for (const token of tokens) {
    if (isNaN(Number(token))) { // Operator
      const operand2 = stack.pop()!;
      const operand1 = stack.pop()!;
      let result: number;
      switch (token) {
        case '+': result = operand1 + operand2; break;
        case '-': result = operand1 - operand2; break;
        case '*': result = operand1 * operand2; break;
        case '/': result = Math.trunc(operand1 / operand2); break; // Integer division
        default: throw new Error(`Invalid operator: ${token}`);
      }
      stack.push(result);
    } else { // Operand
      stack.push(Number(token));
    }
  }
  return stack.pop()!;
}
```